"""Offline rule-based guidance endpoint."""

from __future__ import annotations

from datetime import datetime, timezone

from flask import Blueprint, jsonify

from routes.helpers import current_user, generate_id, request_json
from storage import insert


guidance = Blueprint("guidance", __name__)
DISCLAIMER = (
    "This is general guidance. For specific legal advice about your situation, "
    "please consult a qualified labor lawyer or legal aid organization."
)
GUIDANCE = {
    "Salary Withheld": [
        "Under the Payment of Wages Act, 1936, withholding salary is illegal.",
        "Your employer must pay you within specified periods (usually by the 7th of next month).",
        "You can file a complaint with the District Labor Officer (DLO).",
        "Collect evidence: salary slips, employment contract, bank statements.",
        "Send a formal written demand to your employer with dates and amounts.",
    ],
    "Fired Without Notice": [
        "Under the Industrial Employment (Standing Orders) Act, termination requires notice.",
        "Illegal termination can result in compensation: at least 15 days wages.",
        "Document everything: termination date, reasons given, any communications.",
        "File a complaint with the Conciliation Officer within 60 days.",
    ],
    "Excessive Hours": [
        "The Factories Act limits work to 48 hours per week with mandatory rest.",
        "Overtime must be compensated at 1.5x or 2x the regular wage depending on state.",
        "You are entitled to at least one rest day per week.",
        "Document your working hours for evidence.",
    ],
    "No Contract": [
        "While written contracts are ideal, absence doesn't deny you worker rights.",
        "All labor laws apply regardless of a written agreement.",
        "You remain entitled to minimum wage, leave, and safety protections.",
        "Document your employment: salary receipts, communications, witnesses.",
    ],
    "Workplace Injury": [
        "Your employer is liable for workplace injuries under the Workmen's Compensation Act.",
        "Report the injury immediately to your employer and seek a medical certificate.",
        "You may claim disability compensation and medical expenses.",
        "Notify the appropriate labor authority about the incident.",
    ],
    "Sexual Harassment": [
        "Sexual harassment is a serious crime under the IPC and POSH Act.",
        "Report immediately to your employer's Internal Complaints Committee.",
        "File a complaint with the police if the harassment is severe.",
        "Contact the Women Helpline: 181 for immediate support.",
    ],
}


def match_category(text: str) -> str | None:
    lowered = text.lower()
    for category in GUIDANCE:
        if category.lower() in lowered or category.lower().split()[0] in lowered:
            return category
    return None


def guidance_result(category: str | None) -> dict:
    return {
        "category": category or "General",
        "guidance_points": GUIDANCE.get(
            category,
            [
                "Document everything: keep records of employment communications, payments, and incidents.",
                "Know your rights: workers in India have protections under various labor laws.",
                "Contact your District Labor Officer or a worker helpline for formal assistance.",
            ],
        ),
        "next_steps": [
            "Contact the District Labor Officer in your area for formal assistance.",
            "Call a worker helpline for support.",
            "Consult with a legal aid organization for free legal advice.",
        ],
        "disclaimer": DISCLAIMER,
        "source": "offline-fallback",
    }


@guidance.post("/api/guidance")
def post_guidance():
    body = request_json()
    query = body.get("query")
    if not isinstance(query, str) or not query.strip():
        return jsonify(error="query is required"), 400

    language = body.get("language") or "en"
    category = match_category(query)
    result = guidance_result(category)
    user = current_user()
    owner_id = body.get("owner_id") or (user or {}).get("user_id") or "anonymous"
    case_id = generate_id("case")
    created_at = datetime.now(timezone.utc).isoformat().replace("+00:00", "Z")
    insert(
        "cases",
        {
            "case_id": case_id,
            "owner_id": owner_id,
            "issue_summary": query[:120],
            "category": result["category"],
            "language": language,
            "full_conversation_log": [{"type": "text", "text": query, "ts": created_at}],
            "guidance_response": result,
            "verdict": None,
            "notice_generated": False,
            "region": None,
            "created_at": created_at,
        },
    )
    return jsonify(case_id=case_id, **result)
