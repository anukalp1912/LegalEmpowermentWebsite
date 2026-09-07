"""SQLite database setup for the RightsMitra backend."""

from __future__ import annotations

import sqlite3
from pathlib import Path


DATA_DIR = Path(__file__).parent / "data"
DATABASE_PATH = DATA_DIR / "rightsmitra.db"


def get_connection() -> sqlite3.Connection:
    """Return a connection whose rows can be accessed like dictionaries."""
    connection = sqlite3.connect(DATABASE_PATH)
    connection.row_factory = sqlite3.Row
    return connection


def init_db() -> None:
    """Create the database tables if they do not already exist."""
    DATA_DIR.mkdir(parents=True, exist_ok=True)
    with get_connection() as connection:
        # A table schema describes each table's columns and the kind of data
        # each column stores. A primary key uniquely identifies each row.
        connection.executescript(
            """
            CREATE TABLE IF NOT EXISTS users (
                user_id TEXT PRIMARY KEY,
                phone_number TEXT UNIQUE,
                preferred_language TEXT,
                created_at TEXT
            );

            CREATE TABLE IF NOT EXISTS otps (
                phone_number TEXT PRIMARY KEY,
                code TEXT,
                expires_at INTEGER,
                attempts INTEGER
            );

            CREATE TABLE IF NOT EXISTS cases (
                case_id TEXT PRIMARY KEY,
                owner_id TEXT,
                issue_summary TEXT,
                category TEXT,
                language TEXT,
                full_conversation_log TEXT,
                guidance_response TEXT,
                verdict TEXT,
                notice_generated INTEGER,
                region TEXT,
                created_at TEXT
            );

            CREATE TABLE IF NOT EXISTS contact_messages (
                id TEXT PRIMARY KEY,
                name TEXT,
                email TEXT,
                phone TEXT,
                issue TEXT,
                message TEXT,
                created_at TEXT
            );
            """
        )
