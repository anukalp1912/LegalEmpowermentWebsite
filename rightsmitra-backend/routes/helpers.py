"""Helpers shared by route modules."""

from __future__ import annotations

import re
import secrets
import time
from typing import Any

from flask import request


def request_json() -> dict[str, Any]:
    payload = request.get_json(silent=False)
    return payload if isinstance(payload, dict) else {}


def generate_id(prefix: str) -> str:
    return f"{prefix}_{int(time.time() * 1000)}_{secrets.token_hex(3)}"


def valid_phone(phone: Any) -> bool:
    return isinstance(phone, str) and bool(re.fullmatch(r"\+?[0-9]{10,15}", phone))


def current_user() -> dict[str, Any] | None:
    from token_helper import verify

    header = request.headers.get("Authorization", "")
    return verify(header[7:]) if header.startswith("Bearer ") else None
