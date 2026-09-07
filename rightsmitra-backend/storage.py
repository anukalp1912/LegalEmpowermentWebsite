"""Small JSON-file datastore used instead of a database.

Each table is a JSON array in the data directory. This keeps the project easy
to understand while still giving every route a shared persistence layer.
"""

from __future__ import annotations

import json
import os
from pathlib import Path
from typing import Any, Callable


DATA_DIR = Path(
    os.environ.get("RIGHTSMITRA_DATA_DIR", Path(__file__).parent / "data")
)
TABLE_FILES = {
    "users": DATA_DIR / "users.json",
    "otps": DATA_DIR / "otps.json",
    "cases": DATA_DIR / "cases.json",
    "contact_messages": DATA_DIR / "contact_messages.json",
}


def _path(table: str) -> Path:
    try:
        return TABLE_FILES[table]
    except KeyError as exc:
        raise ValueError(f"Unknown data table: {table}") from exc


def load(table: str) -> list[dict[str, Any]]:
    path = _path(table)
    if not path.exists():
        return []
    with path.open("r", encoding="utf-8") as file:
        rows = json.load(file)
    if not isinstance(rows, list):
        raise ValueError(f"{path} must contain a JSON array")
    return rows


def save(table: str, rows: list[dict[str, Any]]) -> None:
    path = _path(table)
    DATA_DIR.mkdir(parents=True, exist_ok=True)
    temporary_path = path.with_suffix(".json.tmp")
    with temporary_path.open("w", encoding="utf-8") as file:
        json.dump(rows, file, indent=2)
        file.write("\n")
    temporary_path.replace(path)


def find(table: str, predicate: Callable[[dict[str, Any]], bool]) -> dict[str, Any] | None:
    return next((row for row in load(table) if predicate(row)), None)


def filter_rows(
    table: str, predicate: Callable[[dict[str, Any]], bool]
) -> list[dict[str, Any]]:
    return [row for row in load(table) if predicate(row)]


def insert(table: str, row: dict[str, Any]) -> dict[str, Any]:
    rows = load(table)
    rows.append(row)
    save(table, rows)
    return row


def upsert(
    table: str,
    predicate: Callable[[dict[str, Any]], bool],
    row: dict[str, Any],
) -> dict[str, Any]:
    rows = load(table)
    for index, existing in enumerate(rows):
        if predicate(existing):
            rows[index] = {**existing, **row}
            save(table, rows)
            return rows[index]
    rows.append(row)
    save(table, rows)
    return row


def update(
    table: str,
    predicate: Callable[[dict[str, Any]], bool],
    updates: dict[str, Any],
) -> int:
    rows = load(table)
    changed = 0
    for row in rows:
        if predicate(row):
            row.update(updates)
            changed += 1
    save(table, rows)
    return changed


def remove(table: str, predicate: Callable[[dict[str, Any]], bool]) -> int:
    rows = load(table)
    kept = [row for row in rows if not predicate(row)]
    save(table, kept)
    return len(rows) - len(kept)
