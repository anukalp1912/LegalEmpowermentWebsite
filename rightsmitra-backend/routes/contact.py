"""Contact form endpoint."""

from __future__ import annotations

from datetime import datetime, timezone

from flask import Blueprint, jsonify

from routes.helpers import generate_id, request_json
from storage import insert


contact = Blueprint("contact", __name__)


@contact.post("/api/contact")
def submit_contact():
    body = request_json()
    required = ("name", "email", "issue", "message")
    if any(not isinstance(body.get(field), str) or not body[field].strip() for field in required):
        return jsonify(error="name, email, issue and message are required"), 400

    message_id = generate_id("msg")
    insert(
        "contact_messages",
        {
            "id": message_id,
            "name": body["name"],
            "email": body["email"],
            "phone": body.get("phone") or None,
            "issue": body["issue"],
            "message": body["message"],
            "created_at": datetime.now(timezone.utc).isoformat().replace("+00:00", "Z"),
        },
    )
    print(f"[Contact] New message from {body['name']} <{body['email']}>: {body['issue']}", flush=True)
    return jsonify(
        success=True,
        id=message_id,
        message="Your message has been received. We will get back to you within 24 hours.",
    ), 201
