"""Minimal signed token helper (HMAC-SHA256, JWT-like payload format)."""

from __future__ import annotations

import base64
import hashlib
import hmac
import json
import os
import time
from typing import Any


DEFAULT_TTL_SECONDS = 30 * 24 * 60 * 60


def _base64url(value: bytes) -> str:
    return base64.urlsafe_b64encode(value).decode("ascii").rstrip("=")


def _decode_base64url(value: str) -> bytes:
    return base64.urlsafe_b64decode(value + "=" * (-len(value) % 4))


def sign(payload: dict[str, Any], ttl_seconds: int = DEFAULT_TTL_SECONDS) -> str:
    secret = os.environ.get("JWT_SECRET", "dev-secret-change-in-production").encode()
    body = _base64url(
        json.dumps({**payload, "exp": int(time.time()) + ttl_seconds}, separators=(",", ":")).encode()
    )
    signature = hmac.new(secret, body.encode(), hashlib.sha256).digest()
    return f"{body}.{_base64url(signature)}"


def verify(value: str | None) -> dict[str, Any] | None:
    if not value or value.count(".") != 1:
        return None
    body, supplied_signature = value.split(".", 1)
    secret = os.environ.get("JWT_SECRET", "dev-secret-change-in-production").encode()
    expected_signature = _base64url(
        hmac.new(secret, body.encode(), hashlib.sha256).digest()
    )
    if not hmac.compare_digest(supplied_signature, expected_signature):
        return None
    try:
        payload = json.loads(_decode_base64url(body).decode("utf-8"))
    except (ValueError, UnicodeDecodeError):
        return None
    if payload.get("exp") and time.time() > payload["exp"]:
        return None
    return payload
