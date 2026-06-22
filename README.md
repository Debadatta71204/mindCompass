```
# MindCompass — Academic Cognitive Wellness Dashboard

MindCompass is an empathetic, full-stack informational prototype designed to provide structured psychoeducation and cognitive support tracking using a **DSM-5 aligned clinical framework**. Built as a B.Tech Computer Science and Engineering final year academic project, the platform translates abstract diagnostic criteria into actionable caregiver insights, focus-based environmental accommodations, and regional accessibility resources.

---

## 🧠 Core System Architecture & Features

The platform is structured into a Single Page Application (SPA) web client powered by an asynchronous Python microservices architecture:

### 1. Module 1: Screening Check-In
* An interactive, 5-question informational self-check modeled directly after DSM-5 diagnostic observation parameters.
* Provides real-time feedback loops without deploying heavy persistence layers to safeguard user privacy.

### 2. Module 2: Creative Wellness Hub
* **AI Companion Chat:** An ethically guardrailed conversational interface powered by `gemini-2.5-flash` to offer non-clinical emotional anchoring and creative storytelling.
* **Media Therapy Integration:** Curated background audio streams engineered to reduce cognitive load, featuring embed-friendly Lofi study mixes and continuous binaural focus beats tailored specifically to minimize attentional distractions.

### 3. Module 3: Caregiver Support & Psychoeducation
* Comprehensive clinical profile breakdowns mapping behaviors to specific neurocognitive and neurodevelopmental domain baselines.
* **Universal Accessibility (Localization):** High-fidelity translation nodes supporting 7 regional Indian languages: **English, Bengali (বাংলা), Hindi (हिन्दी), Tamil (தமிழ்), Telugu (తెలుగు), Kannada (ಕನ್ನಡ), and Odia (ଓଡ଼ିଆ)**.
* **Interactive Audio Synthesizer:** Built-in Text-to-Speech (TTS) integration using native browser engine hooks (`SpeechSynthesisUtterance`) formatted to read localized copy aloud with precise regional phonemic accents (e.g., `bn-IN`, `hi-IN`).

---

## 🛠️ Tech Stack & Dependencies

### Frontend
* **Language:** Pure Vanilla JavaScript (ES6+ Module Pattern), HTML5, CSS3
* **Design Paradigm:** Obsidian Dark Minimalist with high-contrast accent frameworks (Emerald/Cyan) and responsive flex-column layouts.
* **APIs Used:** Web Speech API (`window.speechSynthesis`), YouTube Embedded Players API.

### Backend
* **Framework:** FastAPI (Python 3.10+)
* **Server ASGI:** Uvicorn (Asynchronous Server Gateway Interface)
* **AI Engine SDK:** `google-genai` (utilizing the `gemini-2.5-flash` model pathway)
* **Cross-Origin Communication:** FastAPI `CORSMiddleware` configured for standard dev port forwarding.

---

## 🚀 Installation & Setup Guide

### Prerequisites
* Python 3.10 or higher installed.
* A modern web browser (Google Chrome or Microsoft Edge recommended for rich regional Indian TTS voice packs).
* A valid Google Gemini API Key.

### 1. Backend Server Setup
Navigate into your backend folder, initialize a secure virtual environment, and boot your ASGI application server:

```bash
# Navigate to backend directory
cd backend

# Create localized virtual environment
python -m venv .venv

# Activate the virtual environment (Windows PowerShell)
.venv\Scripts\Activate.ps1

# Install required architecture packages
pip install -r requirements.txt

# Create your environmental runtime key file
# Inside backend/.env add: GEMINI_API_KEY=your_actual_api_key_here

# Boot the FastAPI server via Uvicorn hot-reload tool
uvicorn main:app --reload
```

*The backend server will instantiate securely on port `8000` (`http://127.0.0.1:8000`).*

### 2. Frontend Server Setup

Open a separate, concurrent terminal window to launch your localized frontend HTTP server:

Bash

```
# Navigate to frontend folder from root
cd frontend

# Boot up Python's native lightweight HTTP module on port 5500
python -m http.server 5500
```

*Open your browser and navigate to **`http://localhost:5500`** to interact with the system dashboard.*

cd backend<br>
python -m venv .venv<br>
(might require to run Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope Process)<br>
.venv\Scripts\Activate.ps1<br>
pip install -r requirements.txt<br>
uvicorn main:app --reload<br><br>


cd frontend<br>
python -m http.server 5500<br>

## 🛡️ Critical Academic & Clinical Disclaimer

MindCompass is an academic prototype developed strictly for educational tracking, evaluation mapping, and informational awareness under university project parameters.

- **Not a Diagnostic Tool:** It does not provide clinical diagnoses, professional psychiatric opinions, medical recommendations, or structured treatments.
- **No Medical Authority:** The underlying AI companion structures are heavily guardrailed to offer non-medical care giving advice but can never replace a formal clinical assessment by a certified health specialist.
- In the event of acute distress or cognitive emergencies, users must seek immediate guidance from local emergency healthcare facilities and authorized medical practitioners.

## 📈 Future Development Roadmap

The platform architecture is built intentionally to easily accommodate three imminent scaling milestones:

1. **Multi-Agent Intelligent Orchestration (Backend):** Migrating from single-prompt tracking loops to a collaborative multi-agent architecture (using frameworks like CrewAI or LangChain). This includes a *Clinical Empathy Agent* to continuously scan for distress signals and an *Asynchronous RAG Pipeline* using an open-source Vector Database (e.g., ChromaDB) to fetch localized clinic maps.
2. **Gamified Cognitive Stimulation Therapy (Frontend):** Moving Module 2 beyond passive video listening by introducing interactive, client-side logical puzzles, category word-association mini-games, and memory grid challenges to actively train cognitive reserves.
3. **Cross-Platform Mobile Client Implementation:** Porting the core functional frontend models from Vanilla JS DOM structures into a unified **React Native (Expo CLI)** mobile application, swapping web synthesis triggers for native device utilities (`expo-speech` and `react-native-youtube-iframe`).
