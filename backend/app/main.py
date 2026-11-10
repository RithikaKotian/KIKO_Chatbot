
import json

from contextlib import asynccontextmanager

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

from .chat import reply_to, translate_conversation
from .db import get_db, init_db


# ==================================================
# APPLICATION LIFESPAN
# ==================================================

@asynccontextmanager
async def lifespan(_: FastAPI):
    init_db()
    yield


# ==================================================
# FASTAPI APPLICATION
# ==================================================

app = FastAPI(
    title="KIKO API",
    version="0.2.0",
    lifespan=lifespan
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173"
    ],
    allow_methods=["*"],
    allow_headers=["*"],
)


# ==================================================
# REQUEST MODELS
# ==================================================

class ChatIn(BaseModel):

    message: str = Field(
        min_length=1,
        max_length=300
    )

    age_group: str = "4-6"
    language: str = "en"
    history: list[dict] = Field(default_factory=list)


class TranslateChatIn(BaseModel):

    messages: list[dict] = Field(
        max_length=30
    )

    language: str


class SubmissionIn(BaseModel):

    contributor: str = Field(
        min_length=1,
        max_length=100
    )

    contact: str | None = None

    title: str = Field(
        min_length=1,
        max_length=150
    )

    language: str | None = None
    region: str | None = None
    village: str | None = None

    text: str = Field(min_length=20)

    permission_confirmed: bool


# ==================================================
# HEALTH CHECK
# ==================================================

@app.get("/api/health")
def health():

    return {
        "status": "ok"
    }


# ==================================================
# CHAT ENDPOINT
# ==================================================

@app.post("/api/chat")
def chat(body: ChatIn):

    if body.language not in ("en", "kn", "hi"):
        raise HTTPException(
            status_code=400,
            detail="Unsupported language"
        )

    return reply_to(
        body.message,
        body.age_group,
        body.language,
        body.history
    )


# ==================================================
# TRANSLATE COMPLETE CHAT ENDPOINT
# ==================================================

@app.post("/api/translate-chat")
def translate_chat(body: TranslateChatIn):

    if body.language not in ("en", "kn", "hi"):

        raise HTTPException(
            status_code=400,
            detail="Unsupported language"
        )

    try:

        translated = translate_conversation(
            body.messages,
            body.language
        )

        return {
            "messages": translated,
            "language": body.language
        }

    except Exception as error:

        print("Translation error:", repr(error))

        raise HTTPException(
            status_code=503,
            detail="Unable to translate conversation right now."
        )


# ==================================================
# STORIES
# ==================================================

@app.get("/api/stories")
def list_stories(age_group: str | None = None):

    sql = """
        SELECT id, title, age_group, category,
        source, license, verification, language
        FROM stories
    """

    args: tuple = ()

    if age_group:

        sql += " WHERE age_group=?"
        args = (age_group,)

    with get_db() as db:

        return [
            dict(row)
            for row in db.execute(sql, args)
        ]


@app.get("/api/stories/{story_id}")
def get_story(story_id: str):

    with get_db() as db:

        row = db.execute(
            "SELECT * FROM stories WHERE id=?",
            (story_id,)
        ).fetchone()

    if not row:

        raise HTTPException(
            status_code=404,
            detail="Story not found"
        )

    data = dict(row)

    data["pages"] = json.loads(
        data.pop("pages_json")
    )

    data["question"] = json.loads(
        data.pop("question_json") or "null"
    )

    return data


# ==================================================
# STORY SUBMISSIONS
# ==================================================

@app.post("/api/submissions", status_code=201)
def submit_story(body: SubmissionIn):

    if not body.permission_confirmed:

        raise HTTPException(
            status_code=400,
            detail="Permission to share must be confirmed"
        )

    with get_db() as db:

        cur = db.execute(
            """
            INSERT INTO submissions
            (
                contributor,
                contact,
                title,
                language,
                region,
                village,
                text,
                permission_confirmed
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, 1)
            """,

            (
                body.contributor,
                body.contact,
                body.title,
                body.language,
                body.region,
                body.village,
                body.text
            )
        )

    return {
        "id": cur.lastrowid,
        "status": "pending"
    }
