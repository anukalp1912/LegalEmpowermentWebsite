"""Case creation and retrieval endpoints."""

from __future__ import annotations

from datetime import datetime, timezone

from flask import Blueprint, jsonify, request

from routes.helpers import current_user, generate_id, request_json
from storage import filter_rows, find, insert


cases = Blueprint("cases", __name__)


@cases.get("/api/cases")
def list_cases():
    user = current_user()
    owner_id = request.args.get("owner_id") or (user or {}).get("user_id")
    if not owner_id:
        return jsonify(error="owner_id query param required (guest_id or user_id)"), 400
    rows = filter_rows("cases", lambda case: case.get("owner_id") == owner_id)
    rows.sort(key=lambda case: case.get("created_at", ""), reverse=True)
    return jsonify(cases=rows)


@cases.get("/api/cases/<case_id>")
def get_case(case_id: str):
    case = find("cases", lambda item: item.get("case_id") == case_id)
    return (jsonify(case), 200) if case else (jsonify(error="Case not found"), 404)


@cases.post("/api/cases")
def create_case():
    body = request_json()
    user = current_user()
    owner_id = body.get("owner_id") or (user or {}).get("user_id")
    issue_summary = body.get("issue_summary")
    if not owner_id:
        return jsonify(error="owner_id is required"), 400
    if not isinstance(issue_summary, str) or not issue_summary:
        return jsonify(error="issue_summary is required"), 400

    created_at = datetime.now(timezone.utc).isoformat().replace("+00:00", "Z")
    case_id = generate_id("case")
    insert(
        "cases",
        {
            "case_id": case_id,
            "owner_id": owner_id,
            "issue_summary": issue_summary[:120],
            "category": body.get("category"),
            "language": body.get("language") or "en",
            "full_conversation_log": body.get("full_conversation_log") or [],
            "guidance_response": None,
            "verdict": None,
            "notice_generated": False,
            "region": body.get("region"),
            "created_at": created_at,
        },
    )
    return jsonify(case_id=case_id, owner_id=owner_id, timestamp=created_at), 201
