"""Offline rule-based guidance endpoint."""

from __future__ import annotations

import json
import os
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


def get_ai_guidance(query: str, category: str | None, language: str) -> dict | None:
    try:
        # An environment variable is a value configured outside the code, so
        # secrets such as an API key do not need to be stored in this file.
        api_key = os.environ.get("ANTHROPIC_API_KEY")
        if not api_key:
            return None

        # An API key is a secret credential that authorizes this app to call
        # Anthropic's service.
        import anthropic

        language_names = {
            "en": "English",
            "hi": "Hindi",
            "ta": "Tamil",
            "bn": "Bengali",
            "te": "Telugu",
            "mr": "Marathi",
        }
        language_name = language_names.get(language, "English")
        system_prompt = f"""
You are a legal-guidance assistant for RightsMitra helping Indian workers
understand their workplace rights. Respond in {language_name}. Be simple,
encouraging, and practical. Reference relevant Indian labor laws where useful.
Always remind the user that this is general guidance and not a substitute for
a lawyer. Respond ONLY with valid JSON matching exactly this shape:
{{"category": string, "guidance_points": string[], "next_steps": string[], "disclaimer": string}}
"""
        client = anthropic.Anthropic(api_key=api_key)
        response = client.messages.create(
            model="claude-sonnet-4-6",
            max_tokens=1000,
            system=system_prompt,
            messages=[
                {
                    "role": "user",
                    "content": (
                        f"Worker's question: {query}\n"
                        f"Detected category: {category or 'General'}"
                    ),
                }
            ],
        )
        response_text = response.content[0].text.strip()
        if response_text.startswith("```"):
            response_text = response_text.removeprefix("```json").removeprefix("```")
            response_text = response_text.removesuffix("```").strip()
        result = json.loads(response_text)
        result["source"] = "ai"
        return result
    except Exception as error:
        print(f"AI guidance failed: {error}")
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
    result = get_ai_guidance(query, category, language) or guidance_result(category)
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
