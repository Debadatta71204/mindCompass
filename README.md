# MindCompass — Academic Cognitive Wellness Dashboard

DSM-5 aligned academic informational prototype for cognitive wellness support.

---

## Prerequisites

- **Python 3.10+** with pip
- **Node.js 18+** with npm
- **Google Gemini API key** (get one at [ai.google.dev](https://ai.google.dev))
- Modern browser (Chrome/Edge recommended for Indian TTS voice packs)

---

## Setup & Run

### 1. Backend (FastAPI)

```bash
cd backend

# Create virtual environment
python -m venv .venv

# Activate (Windows PowerShell)
.venv\Scripts\Activate.ps1
# If blocked: Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope Process

# Activate (macOS / Linux)
source .venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create API key file
echo GEMINI_API_KEY=your_api_key_here > .env

# Start server
uvicorn main:app --reload


Backend runs on **http://127.0.0.1:8000**

### 2. Frontend (React + Tailwind)

```bash
cd frontend-react

# Install dependencies
npm install

# Start dev server
npm run dev
```

Frontend runs on **http://localhost:5173**

### 3. Original Vanilla JS Frontend (optional)

```bash
cd frontend
python -m http.server 5500
```

Runs on **http://localhost:5500**

---

## Voice Chat

Module 2 (Creative Wellness Hub) supports voice input:

1. Click the mic button in the chat input
2. Allow microphone permission
3. Speak your message — tap mic again to stop
4. Audio is sent directly to Gemini for a spoken response

---

## Modules

| Module | Description |
|---|---|
| **Screening Check-In** | 5-question DSM-5 aligned self-check |
| **Creative Wellness Hub** | Music therapy streams + AI chat (text & voice) |
| **Caregiver Support** | DSM-5 psychoeducation in 7 Indian languages with TTS |
| **Soundlull Therapy** | Wizard-driven ambient soundscape player |

---

## Disclaimer

This is an **academic informational prototype**. It does NOT provide clinical diagnoses, medical advice, or treatment recommendations. Always consult a qualified healthcare professional.
