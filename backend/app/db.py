"""SQLite storage (prototype). Swap for PostgreSQL in production — the SQL here is plain and portable."""
import json
import sqlite3
from pathlib import Path

DB_PATH = Path(__file__).resolve().parent.parent / "kiko.db"
SEED = Path(__file__).resolve().parent / "data" / "stories.json"

SCHEMA = """
CREATE TABLE IF NOT EXISTS stories (
  id TEXT PRIMARY KEY, title TEXT NOT NULL, age_group TEXT NOT NULL, category TEXT,
  source TEXT NOT NULL, license TEXT NOT NULL, verification TEXT NOT NULL DEFAULT 'pending',
  language TEXT NOT NULL DEFAULT 'en', moral TEXT, question_json TEXT, pages_json TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS submissions (
  id INTEGER PRIMARY KEY AUTOINCREMENT, contributor TEXT NOT NULL, contact TEXT,
  title TEXT NOT NULL, language TEXT, region TEXT, village TEXT, text TEXT NOT NULL,
  permission_confirmed INTEGER NOT NULL, status TEXT NOT NULL DEFAULT 'pending',
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
"""


def get_db() -> sqlite3.Connection:
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


def init_db() -> None:
    with get_db() as db:
        db.executescript(SCHEMA)
        if db.execute("SELECT COUNT(*) FROM stories").fetchone()[0] == 0 and SEED.exists():
            for s in json.loads(SEED.read_text(encoding="utf-8")):
                db.execute(
                    "INSERT INTO stories VALUES (?,?,?,?,?,?,?,?,?,?,?)",
                    (s["id"], s["title"], s["age_group"], s["category"], s["source"], s["license"],
                     s["verification"], s["language"], s["moral"], json.dumps(s["question"]), json.dumps(s["pages"])),
                )
