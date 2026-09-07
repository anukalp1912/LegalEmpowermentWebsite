"""Flask entry point for the RightsMitra backend."""

from __future__ import annotations

import os

from flask import Flask, jsonify
from flask_cors import CORS
from dotenv import load_dotenv

from database import init_db
from routes.auth import auth
from routes.cases import cases
from routes.contact import contact
from routes.guidance import guidance


# Load local development settings from .env before creating the Flask app.
load_dotenv()
if not os.environ.get("ANTHROPIC_API_KEY"):
    print("Warning: ANTHROPIC_API_KEY is not set; guidance will use offline fallback only.")
init_db()


def create_app() -> Flask:
    app = Flask(__name__)
    CORS(app, resources={r"/api/*": {"origins": "*"}})
    app.register_blueprint(auth)
    app.register_blueprint(guidance)
    app.register_blueprint(cases)
    app.register_blueprint(contact)

    @app.get("/api/health")
    def health():
        return jsonify(status="ok", service="rightsmitra-backend")

    return app


app = create_app()


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int(os.environ.get("PORT", "4000")), debug=False)
