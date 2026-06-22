"""
MindCompass Backend — FastAPI + Google GenAI
Academic Cognitive Wellness Dashboard (Non-Clinical DSM-5 Informational Prototype)
"""

import os
from fastapi import FastAPI, HTTPException, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from google import genai
from google.genai import types


# 1. This line imports the dotenv library
from dotenv import load_dotenv

# 2. This line tells Python to open your .env file and read the keys inside it
load_dotenv()
# ─────────────────────────────────────────────
# App Initialisation
# ─────────────────────────────────────────────

app = FastAPI(
    title="MindCompass API",
    description="Academic cognitive wellness companion backend (informational only, non-clinical).",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Google GenAI client — reads GEMINI_API_KEY from environment automatically
try:
    client = genai.Client()
except Exception as e:
    client = None
    print(f"CRITICAL WARNING: Gemini API Client failed to initialize. Error: {e}")
# ─────────────────────────────────────────────
# Request Schema
# ─────────────────────────────────────────────

class CompanionRequest(BaseModel):
    message: str
    mode: str  # 'dementia' | 'adhd' | 'mci'
    lang: str  # "en" | "bn" | "hi" | "ta" | "te" | "kn" | "or" <-- NEW FIELD
LANGUAGE_NAMES = {
    "en": "English",
    "bn": "Bengali (বাংলা)",
    "hi": "Hindi (हिन्दी)",
    "ta": "Tamil (தமிழ்)",
    "te": "Telugu (తెలుగు)",
    "kn": "Kannada (ಕನ್ನಡ)",
    "or": "Odia (ଓଡ଼ିଆ)"
}
# ─────────────────────────────────────────────
# System Prompt Builder
# ─────────────────────────────────────────────

BASE_SYSTEM_INSTRUCTION = """
You are MindCompass Companion, an academic, informational wellness assistant built as a
student research prototype. You operate strictly within non-clinical support roles
(Stages 1–4: Observation, Informational Screening, Creative Intervention, Referral Pathways).

ABSOLUTE ETHICAL GUARDRAILS — NEVER VIOLATE THESE:
1. You MUST NOT formulate, suggest, imply, or confirm any clinical diagnosis for the user.
2. You MUST NOT label any user with a psychiatric or neurological disorder.
3. You MUST NOT recommend, comment on, or discuss any prescription psychiatric medications
   (including but not limited to Ritalin, Adderall, Concerta, Donepezil, Memantine,
   Rivastigmine, or any cholinesterase inhibitors).
4. You MUST NOT claim or imply that any creative therapy, activity, puzzle, or intervention
   provided in this platform can cure, reverse, halt, or clinically treat cognitive decline
   or any mental health condition.
5. If the user appears to be in distress or crisis, gently remind them to reach out to a
   qualified healthcare professional or a trusted adult immediately.
6. Always frame your responses as informational and supportive, never clinical or prescriptive.
7. Keep responses warm, encouraging, and appropriately brief.
"""

TRACK_INSTRUCTIONS = {
    "dementia": """
You are specifically supporting a user in the Dementia / Major Neurocognitive Disorder
informational track. Apply the following approach:

- Use warm, short, comforting validation sentences. Acknowledge and validate the user's
  feelings before providing information.
- Draw on Reminiscence Therapy concepts: gently invite the user to recall and share
  long-term autobiographical memories (favourite songs from their youth, a memorable
  family meal, a cherished holiday, a skill they once practised). These long-term memory
  pathways are typically more preserved and can be a source of joy and connection.
- Keep sentences short (under 15 words where possible), use simple vocabulary, and
  avoid jargon.
- Never rush the user. Use ellipses and open-ended prompts to give them space.
- Example tone: "That sounds wonderful. Tell me more about that memory..."
""",
    "adhd": """
You are specifically supporting a user in the ADHD informational track. Apply the
following approach:

- Use concise, energetic, and structured responses. Where appropriate, use **bold** text
  and short bullet points to make key information visually scannable.
- Engage the user with high-novelty cooperative story-making games to harness their
  creativity and counter dopaminergic focus deficits. For example: "Let's build a story
  together — you give me the next sentence!"
- Keep each response punchy and under 120 words. Break longer explanations into clearly
  labelled chunks.
- Celebrate micro-wins and small efforts enthusiastically.
- Provide immediate, concrete engagement hooks at the end of each response.
- Example tone: "Great idea! Here's what we can do: **Step 1** — pick a hero character.
  Who do you choose?"
""",
    "mci": """
You are specifically supporting a user in the Mild Cognitive Impairment (MCI)
informational track. Apply the following approach:

- Operate as a Cognitive Stimulation Therapy (CST) partner. Your primary tools are:
  light trivia questions, word puzzles (anagrams, word association chains, category
  fluency tasks), and strategic riddle choices.
- Offer 1–2 gentle cognitive challenges per response, always framing them as fun
  activities rather than tests.
- Encourage the user to take their time and remind them that there are no wrong answers
  in a supportive context.
- Celebrate engagement over accuracy. The goal is stimulation, not performance.
- Keep responses friendly, conversational, and clear.
- Example: "Here's a fun one: Can you name 5 things you'd find in a kitchen?
  Take your time — I'm in no rush!"
""",
}


def build_system_prompt(mode: str) -> str:
    """Combine the universal ethical base with the track-specific guidance."""
    track_instruction = TRACK_INSTRUCTIONS.get(
        mode.lower(),
        "\nProvide warm, general informational wellness support."
    )
    return BASE_SYSTEM_INSTRUCTION + "\n\nTRACK-SPECIFIC GUIDANCE:" + track_instruction


# ─────────────────────────────────────────────
# Companion Endpoint
# ─────────────────────────────────────────────



@app.post("/api/companion")
async def companion(request: CompanionRequest):
    """
    Accepts a user message, the active disorder track (mode), and preferred language (lang).
    Returns a track-adapted, ethically guardrailed, and language-accurate AI response.
    """
    clean_mode = request.mode.lower().strip()
    clean_lang = request.lang.lower().strip() if request.lang else "en"

    if clean_mode not in ("dementia", "adhd", "mci"):
        raise HTTPException(
            status_code=400,
            detail="Invalid mode. Must be one of: 'dementia', 'adhd', 'mci'."
        )

    # 1. Fetch your pre-existing base system prompt matching the disorder track
    base_system_prompt = build_system_prompt(clean_mode)

    # 2. Get the target language name
    target_language = LANGUAGE_NAMES.get(clean_lang, "English")

    # 3. Create a strict multilingual directive forcing Gemini to reply in the correct language
    language_directive = (
        f"\n\nCRITICAL LANGUAGE BOUNDARY: The user has selected their language as {target_language}. "
        f"You MUST draft your entire conversational response or story response STRICTLY in {target_language}. "
        f"Do not mix or default back to English unless the selected language is explicitly English."
    )

    # Combine them into a single robust instruction
    compiled_system_prompt = base_system_prompt + language_directive

    try:
        # Note: If gemini-3.5-flash throws a 404 error on your environment, swap it to "gemini-2.5-flash"
        response = client.models.generate_content(
            model="gemini-2.5-flash", 
            contents=request.message,
            config={
                "system_instruction": compiled_system_prompt,
                "max_output_tokens": 512,
                "temperature": 0.75,
            },
        )

        reply_text = response.text if response.text else "I'm here with you. Could you tell me a little more?"

        return {"reply": reply_text, "mode": request.mode, "lang": clean_lang}

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"AI generation error: {str(e)}"
        )
# ─────────────────────────────────────────────
# Companion Voice Endpoint
# ─────────────────────────────────────────────


@app.post("/api/companion/voice")
async def companion_voice(
    audio: UploadFile = File(...),
    mode: str = Form(...),
    lang: str = Form("en"),
):
    """
    Accepts an audio recording, sends it inline to Gemini, and returns a
    track-adapted, ethically guardrailed, language-accurate AI response.
    """
    clean_mode = mode.lower().strip()
    clean_lang = lang.lower().strip() if lang else "en"

    if clean_mode not in ("dementia", "adhd", "mci"):
        raise HTTPException(
            status_code=400,
            detail="Invalid mode. Must be one of: 'dementia', 'adhd', 'mci'."
        )

    base_system_prompt = build_system_prompt(clean_mode)
    target_language = LANGUAGE_NAMES.get(clean_lang, "English")
    language_directive = (
        f"\n\nCRITICAL LANGUAGE BOUNDARY: The user has selected their language as {target_language}. "
        f"You MUST draft your entire conversational response or story response STRICTLY in {target_language}. "
        f"Do not mix or default back to English unless the selected language is explicitly English."
    )
    compiled_system_prompt = base_system_prompt + language_directive

    try:
        audio_bytes = await audio.read()

        audio_part = types.Part.from_bytes(
            data=audio_bytes,
            mime_type=audio.content_type or "audio/webm",
        )

        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=[
                audio_part,
                "The user has sent an audio message. Listen to it carefully and respond conversationally.",
            ],
            config={
                "system_instruction": compiled_system_prompt,
                "max_output_tokens": 512,
                "temperature": 0.75,
            },
        )

        reply_text = response.text if response.text else "I'm here with you. Could you tell me a little more?"

        return {"reply": reply_text, "mode": clean_mode, "lang": clean_lang}

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Voice AI generation error: {str(e)}"
        )


# ─────────────────────────────────────────────
# Health Check
# ─────────────────────────────────────────────

@app.get("/")
async def health_check():
    return {
        "status": "MindCompass API is running.",
        "disclaimer": "This is a non-clinical academic informational prototype only."
    }
