"""Small SQLite datastore with the same predicate-based API as before."""

from __future__ import annotations

import json
from typing import Any, Callable

from database import get_connection


TABLES = {"users", "otps", "cases", "contact_messages"}
PRIMARY_KEYS = {
    "users": "user_id",
    "otps": "phone_number",
    "cases": "case_id",
    "contact_messages": "id",
}
JSON_COLUMNS = {"full_conversation_log", "guidance_response"}


def _validate_table(table: str) -> None:
    if table not in TABLES:
        raise ValueError(f"Unknown data table: {table}")


def _from_database(table: str, row: dict[str, Any]) -> dict[str, Any]:
    result = dict(row)
    if table == "cases":
        for column in JSON_COLUMNS:
            if result[column] is not None:
                result[column] = json.loads(result[column])
        if result["notice_generated"] is not None:
            result["notice_generated"] = bool(result["notice_generated"])
    return result


def _to_database(table: str, row: dict[str, Any]) -> dict[str, Any]:
    result = dict(row)
    if table == "cases":
        for column in JSON_COLUMNS:
            if column in result and result[column] is not None:
                result[column] = json.dumps(result[column])
        if "notice_generated" in result and result["notice_generated"] is not None:
            result["notice_generated"] = int(result["notice_generated"])
    return result


def load(table: str) -> list[dict[str, Any]]:
    _validate_table(table)
    with get_connection() as connection:
        rows = connection.execute(f"SELECT * FROM {table}").fetchall()
    return [_from_database(table, dict(row)) for row in rows]


def save(table: str, rows: list[dict[str, Any]]) -> None:
    """Replace a table's contents, preserving the legacy storage API."""
    _validate_table(table)
    with get_connection() as connection:
        connection.execute(f"DELETE FROM {table}")
        for row in rows:
            values = _to_database(table, row)
            columns = list(values)
            placeholders = ", ".join("?" for _ in columns)
            connection.execute(
                f"INSERT INTO {table} ({', '.join(columns)}) VALUES ({placeholders})",
                [values[column] for column in columns],
            )


def find(table: str, predicate: Callable[[dict[str, Any]], bool]) -> dict[str, Any] | None:
    return next((row for row in load(table) if predicate(row)), None)


def filter_rows(
    table: str, predicate: Callable[[dict[str, Any]], bool]
) -> list[dict[str, Any]]:
    return [row for row in load(table) if predicate(row)]


def insert(table: str, row: dict[str, Any]) -> dict[str, Any]:
    _validate_table(table)
    values = _to_database(table, row)
    columns = list(values)
    placeholders = ", ".join("?" for _ in columns)
    with get_connection() as connection:
        connection.execute(
            f"INSERT INTO {table} ({', '.join(columns)}) VALUES ({placeholders})",
            [values[column] for column in columns],
        )
    return row


def upsert(
    table: str,
    predicate: Callable[[dict[str, Any]], bool],
    row: dict[str, Any],
) -> dict[str, Any]:
    existing = find(table, predicate)
    if existing is None:
        return insert(table, row)
    merged = {**existing, **row}
    _update_row(table, existing[PRIMARY_KEYS[table]], merged)
    return merged


def _update_row(table: str, primary_key_value: Any, row: dict[str, Any]) -> None:
    values = _to_database(table, row)
    primary_key = PRIMARY_KEYS[table]
    assignments = ", ".join(f"{column} = ?" for column in values if column != primary_key)
    parameters = [values[column] for column in values if column != primary_key]
    parameters.append(primary_key_value)
    with get_connection() as connection:
        connection.execute(
            f"UPDATE {table} SET {assignments} WHERE {primary_key} = ?",
            parameters,
        )


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
            _update_row(table, row[PRIMARY_KEYS[table]], row)
            changed += 1
    return changed


def remove(table: str, predicate: Callable[[dict[str, Any]], bool]) -> int:
    rows = load(table)
    primary_key = PRIMARY_KEYS[table]
    matching = [row for row in rows if predicate(row)]
    with get_connection() as connection:
        connection.executemany(
            f"DELETE FROM {table} WHERE {primary_key} = ?",
            [(row[primary_key],) for row in matching],
        )
    return len(matching)
