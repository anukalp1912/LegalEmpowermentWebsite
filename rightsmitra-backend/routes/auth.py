"""Authentication endpoints: simulated OTP login and guest sessions."""

from __future__ import annotations

import random
import time
from datetime import datetime, timezone

from flask import Blueprint, jsonify

from routes.helpers import current_user, generate_id, request_json, valid_phone
from storage import find, insert, remove, update, upsert
from token_helper import sign


auth = Blueprint("auth", __name__)
OTP_TTL_SECONDS = 300
MAX_ATTEMPTS = 5


@auth.post("/api/auth/send-otp")
@auth.post("/api/send-otp")  # Kept for the existing static frontend.
def send_otp():
    body = request_json()
    phone = body.get("phone")
    if not valid_phone(phone):
        return jsonify(error="Valid phone number required"), 400

    code = f"{random.randint(0, 999999):06d}"
    upsert(
        "otps",
        lambda row: row.get("phone_number") == phone,
        {
            "phone_number": phone,
            "code": code,
            "expires_at": int(time.time() * 1000) + OTP_TTL_SECONDS * 1000,
            "attempts": 0,
        },
    )
    print(f"[OTP] {phone} => {code} (expires in 5 min)", flush=True)
    return jsonify(success=True, message="OTP sent", expires_in_seconds=OTP_TTL_SECONDS)


@auth.post("/api/auth/verify-otp")
@auth.post("/api/verify-otp")  # Legacy frontend path.
def verify_otp():
    body = request_json()
    phone = body.get("phone")
    otp = body.get("otp", body.get("code"))
    guest_id = body.get("guest_id", body.get("guest_session_id"))
    if not phone or not otp:
        return jsonify(error="phone and otp are required"), 400

    row = find("otps", lambda item: item.get("phone_number") == phone)
    if not row:
        return jsonify(error="No OTP requested for this number"), 400
    attempts = int(row.get("attempts", 0))
    if attempts >= MAX_ATTEMPTS:
        return jsonify(error="Too many attempts, request a new OTP"), 429
    if int(time.time() * 1000) > row.get("expires_at", 0):
        return jsonify(error="OTP expired"), 400
    if str(row.get("code")) != str(otp):
        update("otps", lambda item: item.get("phone_number") == phone, {"attempts": attempts + 1})
        return jsonify(error="Incorrect OTP"), 400

    remove("otps", lambda item: item.get("phone_number") == phone)
    user = find("users", lambda item: item.get("phone_number") == phone)
    if not user:
        user = insert(
            "users",
            {
                "user_id": generate_id("user"),
                "phone_number": phone,
                "preferred_language": body.get("preferred_language") or "en",
                "created_at": datetime.now(timezone.utc).isoformat().replace("+00:00", "Z"),
            },
        )
    if guest_id:
        update("cases", lambda case: case.get("owner_id") == guest_id, {"owner_id": user["user_id"]})

    return jsonify(
        success=True,
        token=sign({"user_id": user["user_id"], "phone_number": user["phone_number"]}),
        user=user,
    )


@auth.post("/api/auth/guest")
def create_guest():
    return jsonify(
        guest_id=generate_id("guest"),
        guest_flag=True,
        created_at=datetime.now(timezone.utc).isoformat().replace("+00:00", "Z"),
    )
