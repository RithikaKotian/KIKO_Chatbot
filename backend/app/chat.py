
import os
import re
import json
import requests

from dotenv import load_dotenv
from google import genai
from google.genai import types

load_dotenv()


# ==================================================
# CONFIGURATION
# ==================================================

GEMINI_MODEL = os.getenv(
    "GEMINI_MODEL",
    "gemini-3.8-flash"
)

OLLAMA_MODEL = os.getenv(
    "OLLAMA_MODEL",
    "gemma3:270m"
)

OLLAMA_URL = os.getenv(
    "OLLAMA_URL",
    "http://localhost:11434/api/chat"
)

GEMINI_TIMEOUT = 20_000
OLLAMA_TIMEOUT = 90


# ==================================================
# LANGUAGE SETTINGS
# ==================================================

LANG_NAME = {
    "en": "English",
    "kn": "Kannada",
    "hi": "Hindi"
}


# ==================================================
# BASIC SAFETY FILTER
# ==================================================

BLOCKED = re.compile(
    r"\b(sex|porn|suicide|self[- ]harm|kill yourself)\b",
    re.IGNORECASE
)


def is_unsafe(text: str) -> bool:
    return bool(BLOCKED.search(text))


def safety_reply(language: str) -> str:

    replies = {
        "en": "Let's talk about something fun and safe!",
        "kn": "ಬನ್ನಿ, ಸುರಕ್ಷಿತವಾದ ಮತ್ತು ಮೋಜಿನ ವಿಷಯದ ಬಗ್ಗೆ ಮಾತನಾಡೋಣ!",
        "hi": "चलो, किसी मज़ेदार और सुरक्षित विषय पर बात करते हैं!"
    }

    return replies.get(language, replies["en"])


# ==================================================
# AGE GROUP STYLE
# ==================================================

STYLE = {
    "1-3": (
        "Use extremely simple words and very short sentences. "
        "Be warm, gentle, playful and encouraging. "
        "Give only one or two simple ideas at a time."
    ),

    "4-6": (
        "Use simple language, short sentences and fun examples. "
        "Explain things in a friendly way."
    ),

    "7-10": (
        "Use clear, interesting explanations with useful details. "
        "Encourage curiosity and learning."
    )
}


# ==================================================
# SYSTEM PROMPT
# ==================================================

def system_prompt(age: str, language: str) -> str:

    age_style = STYLE.get(age, STYLE["4-6"])

    language_name = LANG_NAME.get(language, "English")

    return f"""
You are KIKO, a friendly AI learning companion
for children aged 1 to 10.

PERSONALITY:
- Be kind, cheerful, patient and encouraging.
- Talk naturally like a friendly teacher.
- Make learning enjoyable.
- Avoid unnecessary emojis and decorative symbols.
- Never sound rude or frightening.

CHILD'S AGE GROUP:
{age}

AGE-APPROPRIATE STYLE:
{age_style}

LANGUAGE:
Always respond in {language_name}.
Do not randomly switch languages.

ANSWER RULES:
- Answer the child's actual question.
- Do not repeat the welcome message for every question.
- Give useful and accurate information.
- Use simple examples.
- Keep answers easy to understand.
- For general questions, give around 3 to 5 useful
  points when appropriate.
- Do not make up facts.
- If unsure, say so honestly.
- Ask a friendly follow-up question when appropriate.
- Prefer clear sentences over decorative formatting.
- Do not read out Markdown symbols or emojis.

SAFETY:
- Never provide harmful or dangerous instructions.
- Do not ask children for personal information.
- If a child describes danger or distress,
  encourage them to speak to a trusted adult.
- Keep all content suitable for children.

You are KIKO. Help the child learn, explore and have fun!
"""


# ==================================================
# GEMINI CLIENT
# ==================================================

def get_gemini_client():

    api_key = os.getenv("GEMINI_API_KEY")

    if not api_key:
        raise RuntimeError("Gemini API key not configured")

    return genai.Client(
        api_key=api_key,
        http_options=types.HttpOptions(
            timeout=GEMINI_TIMEOUT,
            retry_options=types.HttpRetryOptions(
                attempts=1
            )
        )
    )


# ==================================================
# GEMINI CLOUD AI
# ==================================================

def ask_gemini(prompt: str, age: str, language: str):

    try:

        client = get_gemini_client()

        response = client.interactions.create(
            model=GEMINI_MODEL,
            input=prompt,
            system_instruction=system_prompt(age, language)
        )

        answer = (response.output_text or "").strip()

        if answer and not is_unsafe(answer):

            print("KIKO response source: Gemini")

            return answer

        print("Gemini returned an empty or blocked response.")

    except Exception as error:

        print("Gemini unavailable:", repr(error))

    return None


# ==================================================
# TRANSLATE COMPLETE CONVERSATION
# ==================================================

def translate_conversation(messages: list, language: str):

    if language not in LANG_NAME:
        raise ValueError("Unsupported language")

    language_name = LANG_NAME[language]

    if not messages:
        return []

    clean_messages = []

    for item in messages:

        if not isinstance(item, dict):
            continue

        role = item.get("role")
        content = item.get("content")

        if role not in ("user", "assistant"):
            continue

        if not isinstance(content, str):
            continue

        clean_messages.append({
            "role": role,
            "content": content
        })

    if not clean_messages:
        return []

    client = get_gemini_client()

    prompt = f"""
Translate the following complete conversation into {language_name}.

IMPORTANT RULES:
1. Translate every message.
2. Preserve the original order.
3. Preserve the speaker role.
4. Preserve the original meaning and information.
5. Do not summarize or shorten messages.
6. Use natural, child-friendly {language_name}.
7. Do not add new information.
8. Preserve names and technical terms where appropriate.
9. Return ONLY valid JSON.
10. Do not use Markdown code fences.

CONVERSATION:
{json.dumps(clean_messages, ensure_ascii=False)}

EXPECTED FORMAT:
[
  {{"role": "user", "content": "translated message"}},
  {{"role": "assistant", "content": "translated reply"}}
]
"""

    response = client.interactions.create(
        model=GEMINI_MODEL,
        input=prompt
    )

    output = (response.output_text or "").strip()

    output = re.sub(r"^```(?:json)?\s*", "", output)
    output = re.sub(r"\s*```$", "", output)

    translated = json.loads(output)

    if not isinstance(translated, list):
        raise ValueError("Invalid translation response")

    if len(translated) != len(clean_messages):
        raise ValueError("Translation message count mismatch")

    result = []

    for original, translated_item in zip(
        clean_messages,
        translated
    ):

        if not isinstance(translated_item, dict):
            raise ValueError("Invalid translated message")

        if translated_item.get("role") != original["role"]:
            raise ValueError("Translation role mismatch")

        content = translated_item.get("content")

        if not isinstance(content, str) or not content.strip():
            raise ValueError("Empty translated message")

        result.append({
            "role": original["role"],
            "content": content.strip()
        })

    print(f"Conversation translated into {language_name}")

    return result


# ==================================================
# OLLAMA LOCAL AI
# ==================================================

def ask_ollama(prompt: str, age: str, language: str):

    try:

        response = requests.post(
            OLLAMA_URL,

            json={
                "model": OLLAMA_MODEL,

                "messages": [
                    {
                        "role": "system",
                        "content": system_prompt(age, language)
                    },
                    {
                        "role": "user",
                        "content": prompt
                    }
                ],

                "stream": False
            },

            timeout=OLLAMA_TIMEOUT
        )

        response.raise_for_status()

        data = response.json()

        answer = (
            data.get("message", {})
            .get("content", "")
            .strip()
        )

        if answer and not is_unsafe(answer):

            print("KIKO response source: Ollama")

            return answer

        print("Ollama returned an empty or blocked response.")

    except Exception as error:

        print("Ollama unavailable:", repr(error))

    return None


# ==================================================
# FALLBACK RESPONSES
# ==================================================

def rule_reply(message: str, language: str):

    message = message.lower()

    if language == "kn":

        return (
            "ಅದು ಒಳ್ಳೆಯ ಪ್ರಶ್ನೆ! "
            "ಇನ್ನಷ್ಟು ತಿಳಿದುಕೊಳ್ಳಲು ಪ್ರಯತ್ನಿಸೋಣ."
        )

    if language == "hi":

        return (
            "यह बहुत अच्छा सवाल है! "
            "चलो, इसके बारे में और जानें।"
        )

    if "butterfly" in message:

        return (
            "Butterflies are beautiful insects.\n\n"
            "1. Butterflies have six legs.\n"
            "2. They taste using their feet.\n"
            "3. Their wings have tiny colourful scales."
        )

    if "hello" in message or "hi" in message:

        return (
            "Hello, little explorer! "
            "What would you like to learn today?"
        )

    return (
        "That's an interesting question! "
        "I'm having trouble connecting to my AI brain "
        "right now. Can you try asking me again?"
    )


# ==================================================
# CONVERSATION HISTORY
# ==================================================

def conversation_text(message: str, history: list) -> str:

    parts = []

    for item in history[-6:]:

        if not isinstance(item, dict):
            continue

        role = item.get("role", "user")
        content = item.get("content", "")

        if role not in ("user", "assistant"):
            continue

        if not isinstance(content, str):
            continue

        if role == "assistant":
            parts.append(f"KIKO: {content}")
        else:
            parts.append(f"Child: {content}")

    parts.append(f"Child: {message}")
    parts.append("KIKO:")

    return "\n".join(parts)


# ==================================================
# MAIN CHAT FUNCTION
# ==================================================

def reply_to(
    message: str,
    age: str = "4-6",
    language: str = "en",
    history: list = None
):

    message = message.strip()

    if not message:

        return {
            "reply": "Ask me something!",
            "navigate": None,
            "source": "fallback"
        }

    if history is None:
        history = []

    if is_unsafe(message):

        return {
            "reply": safety_reply(language),
            "navigate": None,
            "source": "safety"
        }

    prompt = conversation_text(message, history)

    # Try Gemini first
    answer = ask_gemini(prompt, age, language)

    if answer:

        return {
            "reply": answer,
            "navigate": None,
            "source": "gemini"
        }

    # Try Ollama
    answer = ask_ollama(prompt, age, language)

    if answer:

        return {
            "reply": answer,
            "navigate": None,
            "source": "ollama"
        }

    # Final fallback
    answer = rule_reply(message, language)

    return {
        "reply": answer,
        "navigate": None,
        "source": "fallback"
    }
