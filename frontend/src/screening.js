/**
 * MindCompass — screening.js
 * Module 1: DSM-5 Informational Screening Check-In
 * Exports: renderScreeningModule(containerId, activeDisorder)
 *
 * NON-CLINICAL: This tool produces an informational self-report profile only.
 * It does NOT diagnose any condition.
 */

// ─────────────────────────────────────────────────────────────────────
// DSM-5 Aligned Question Banks
// ─────────────────────────────────────────────────────────────────────

const QUESTIONS = {
  dementia: [
    {
      domain: "Memory",
      text: "Do you (or does someone you support) frequently misplace items in unusual places, or repeat the same question or story within a short time period without realising it?",
    },
    {
      domain: "Language",
      text: "Are there noticeable difficulties finding the right word mid-conversation, or substituting incorrect or vague words for familiar terms (e.g., calling a 'watch' a 'time thing')?",
    },
    {
      domain: "Executive Function",
      text: "Has it become significantly harder to plan multi-step tasks such as managing household bills, preparing a complex meal, or following a schedule that previously felt routine?",
    },
    {
      domain: "Perceptual-Motor Skills",
      text: "Are there new difficulties with spatial orientation — such as getting disoriented in familiar environments, misjudging distances, or struggling to navigate a well-known route?",
    },
    {
      domain: "Independence Impact",
      text: "Do the changes in thinking or memory create meaningful interference with the ability to manage daily tasks independently (e.g., finances, appointments, self-care)?",
    },
  ],

  adhd: [
    {
      domain: "Inattention",
      text: "Is it frequently difficult to sustain focused attention on tasks or activities — such as losing track of details, making careless errors, or becoming easily sidetracked?",
    },
    {
      domain: "Hyperactivity",
      text: "Is there a persistent sense of physical or mental restlessness — such as fidgeting, difficulty remaining seated when expected to, or feeling driven 'like a motor' that can't slow down?",
    },
    {
      domain: "Impulsivity",
      text: "Are there recurring difficulties with impulsivity — such as blurting out answers before questions are finished, interrupting others' conversations, or making quick decisions without considering consequences?",
    },
    {
      domain: "Cross-Setting Presence",
      text: "Do the attention or behaviour patterns appear consistently across two or more settings (e.g., both at home AND at school or work), rather than only in one specific environment?",
    },
    {
      domain: "Timeline / Age of Onset",
      text: "Were noticeable signs of inattention, hyperactivity, or impulsivity first observed before the age of 12 years?",
    },
  ],

  mci: [
    {
      domain: "Episodic Memory",
      text: "Have you noticed a gradual, subtle change in your ability to recall recent events, appointments, or conversations — even when trying — compared to how memory felt a few years ago?",
    },
    {
      domain: "Processing Speed",
      text: "Does it seem to take noticeably longer to follow fast-paced conversations, process new information, or respond in situations that previously felt easy and automatic?",
    },
    {
      domain: "Attention Modulation",
      text: "Has there been an increased vulnerability to distraction or a harder time shifting attention between tasks when compared to your cognitive baseline from earlier years?",
    },
    {
      domain: "Compensatory Strategy Use",
      text: "Do you find yourself relying more heavily on external aids — such as written reminders, phone notes, calendar alerts, or asking others to repeat information — to compensate for memory slips?",
    },
    {
      domain: "Preserved Autonomy",
      text: "Despite any mild cognitive changes you may notice, are you completely capable of managing all daily activities independently (finances, driving, appointments, household tasks)?",
    },
  ],
};

// Score interpretation bands
const SCORE_PROFILES = {
  dementia: [
    { max: 3,  label: "Low Concern", description: "Your responses indicate few of the informational markers associated with this track. Continue monitoring and maintain regular general health check-ups." },
    { max: 6,  label: "Moderate Profile", description: "Your responses suggest a moderate number of informational markers. While this is not diagnostic, it may be worthwhile discussing your observations with a qualified healthcare professional." },
    { max: 10, label: "Elevated Profile", description: "Your responses indicate several informational markers present across multiple domains. We strongly recommend arranging a consultation with a Geriatrician or Neurologist for a comprehensive professional evaluation." },
  ],
  adhd: [
    { max: 3,  label: "Low Concern", description: "Your responses indicate few of the informational markers associated with this track. If you have specific concerns, a brief conversation with a general practitioner is a good starting point." },
    { max: 6,  label: "Moderate Profile", description: "Your responses suggest a moderate number of informational markers. Consider discussing environmental accommodation strategies with a Psychiatrist or Pediatrician." },
    { max: 10, label: "Elevated Profile", description: "Your responses indicate several informational markers across multiple DSM-5 domains. Professional evaluation by a Psychiatrist or Developmental Pediatrician is recommended for a thorough assessment." },
  ],
  mci: [
    { max: 3,  label: "Low Concern", description: "Your responses suggest minimal informational markers. Some mild cognitive shifts are a natural part of normal aging. Stay cognitively active and attend routine health reviews." },
    { max: 6,  label: "Moderate Profile", description: "Your responses suggest some informational markers that may warrant attention. Consider scheduling a cognitive screening with your general practitioner for a baseline comparison." },
    { max: 10, label: "Elevated Profile", description: "Your responses indicate several informational markers. Given that MCI can have variable trajectories, a professional evaluation by a Neurologist or Geriatric Specialist is advisable for personalised guidance." },
  ],
};

function getScoreProfile(score, disorder) {
  const bands = SCORE_PROFILES[disorder] || SCORE_PROFILES.mci;
  return bands.find(b => score <= b.max) || bands[bands.length - 1];
}

// ─────────────────────────────────────────────────────────────────────
// Markdown-to-HTML (minimal, safe, no external deps)
// ─────────────────────────────────────────────────────────────────────
const TRACK_META = {
  dementia: { label: "Dementia / Major NCD", icon: "🧠" },
  adhd:     { label: "ADHD",                 icon: "⚡" },
  mci:      { label: "MCI",                  icon: "🌱" },
};

// ─────────────────────────────────────────────────────────────────────
// Main Export
// ─────────────────────────────────────────────────────────────────────

/**
 * Render the DSM-5 informational screening form into the given container.
 * @param {string} containerId  - ID of the HTML element to render into
 * @param {string} activeDisorder - 'dementia' | 'adhd' | 'mci'
 */
export function renderScreeningModule(containerId, activeDisorder) {
  const container = document.getElementById(containerId);
  if (!container) {
    console.error(`[MindCompass] Screening container #${containerId} not found.`);
    return;
  }

  const disorder = activeDisorder?.toLowerCase() || 'mci';
  const questions = QUESTIONS[disorder];
  const meta = TRACK_META[disorder] || TRACK_META.mci;

  if (!questions) {
    container.innerHTML = `<p style="color:var(--danger-red);">Unknown disorder track: "${disorder}".</p>`;
    return;
  }

  // Build question cards HTML
  const questionCards = questions.map((q, i) => /* html */`
    <div class="question-card" role="group" aria-labelledby="q${i}-text">
      <div class="question-number">Question ${i + 1} of 5 &nbsp;·&nbsp; ${q.domain}</div>
      <p class="question-text" id="q${i}-text">${q.text}</p>
      <div class="radio-options" role="radiogroup" aria-label="${q.domain} frequency">
        <label class="radio-label">
          <input type="radio" name="q${i}" value="0" required />
          Never / Rarely
        </label>
        <label class="radio-label">
          <input type="radio" name="q${i}" value="1" />
          Sometimes
        </label>
        <label class="radio-label">
          <input type="radio" name="q${i}" value="2" />
          Frequently
        </label>
      </div>
    </div>
  `).join('');

  // Full module HTML
  container.innerHTML = /* html */`
    <div class="module-header">
      <div class="module-eyebrow">${meta.icon} Module 1 &nbsp;·&nbsp; ${meta.label} Track</div>
      <h2 class="module-title">Informational Screening Check-In</h2>
      <p class="module-subtitle">
        Answer honestly based on your own observations or those of a trusted caregiver.
        This is a 5-question informational self-report tool, not a clinical assessment.
      </p>
    </div>

    <form class="screening-form" id="screening-form" novalidate>
      ${questionCards}

      <div class="clinical-warning-box" role="note" aria-label="Clinical boundary warning">
        <span class="warning-icon">⚠️</span>
        <p class="clinical-warning-text">
          Before submitting: This informational screening tool does not verify or diagnose conditions.
          These signs suggest professional evaluation may be beneficial if you have concerns.
          All responses are processed locally and are not stored or transmitted.
        </p>
      </div>

      <button
        type="submit"
        class="btn-primary submit-screening-btn"
        id="screening-submit-btn"
      >
        Submit &amp; View Profile →
      </button>
    </form>

    <div id="screening-result" style="display:none;" aria-live="polite"></div>
  `;

  // ── Event: Form Submit ────────────────────────────────────────────
  const form   = document.getElementById('screening-form');
  const result = document.getElementById('screening-result');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Validate: all questions answered
    let allAnswered = true;
    for (let i = 0; i < questions.length; i++) {
      const selected = form.querySelector(`input[name="q${i}"]:checked`);
      if (!selected) {
        allAnswered = false;
        // Highlight unanswered card
        const cards = form.querySelectorAll('.question-card');
        if (cards[i]) {
          cards[i].style.borderColor = 'var(--danger-red)';
          cards[i].scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        break;
      }
    }

    if (!allAnswered) {
      const existingErr = document.getElementById('validation-err');
      if (!existingErr) {
        const err = document.createElement('p');
        err.id = 'validation-err';
        err.style.cssText = 'color:var(--danger-red);font-size:0.85rem;margin-top:0.5rem;font-weight:600;';
        err.textContent = '⚠ Please answer all 5 questions before submitting.';
        form.querySelector('.submit-screening-btn').before(err);
        setTimeout(() => err.remove(), 4000);
      }
      return;
    }

    // Calculate total score
    let totalScore = 0;
    const perQuestion = [];
    for (let i = 0; i < questions.length; i++) {
      const val = parseInt(form.querySelector(`input[name="q${i}"]:checked`).value, 10);
      totalScore += val;
      perQuestion.push({ domain: questions[i].domain, score: val });
    }

    const profile = getScoreProfile(totalScore, disorder);

    // Score bar segments
    const barSegments = perQuestion.map(q => {
      const pct  = (q.score / 2) * 100;
      const colour = q.score === 0 ? '#2d4a38' : q.score === 1 ? '#7a6c00' : '#7a0000';
      return /* html */`
        <div style="flex:1; display:flex; flex-direction:column; gap:0.25rem; align-items:center;">
          <div style="width:100%; height:6px; background:var(--bg-input); border-radius:3px; overflow:hidden;">
            <div style="width:${pct}%; height:100%; background:${colour}; border-radius:3px; transition:width 0.6s ease;"></div>
          </div>
          <span style="font-size:0.62rem; color:var(--text-muted); text-align:center; letter-spacing:0.03em;">${q.domain}</span>
        </div>
      `;
    }).join('');

    // Render result
    result.style.display = 'block';
    result.innerHTML = /* html */`
      <div class="screening-result-card" role="region" aria-label="Screening result">
        <div style="display:flex; align-items:flex-end; gap:1rem; margin-bottom:1rem;">
          <div>
            <div class="score-display">${totalScore}<span style="font-size:1.25rem; opacity:0.5;">/10</span></div>
            <div class="score-label">INFORMATIONAL PROFILE SCORE</div>
          </div>
          <div style="background:var(--bg-panel); border:1px solid var(--border-accent); padding:0.35rem 0.85rem; border-radius:100px; font-size:0.78rem; font-weight:700; color:var(--emerald-bright); margin-bottom:0.6rem;">
            ${profile.label}
          </div>
        </div>

        <div style="display:flex; gap:0.5rem; margin-bottom:1.25rem; align-items:flex-end;">
          ${barSegments}
        </div>

        <p class="score-profile-text">${profile.description}</p>

        <div class="clinical-warning-box" style="margin-top:1.25rem;" role="alert">
          <span class="warning-icon">🚨</span>
          <p class="clinical-warning-text">
            <strong>Clinical Boundary Notice:</strong> This informational screening tool does not verify
            or diagnose conditions. These signs suggest professional evaluation may be beneficial if
            you have concerns. Please consult a qualified healthcare professional for any clinical assessment.
          </p>
        </div>

        <button
          class="btn-secondary"
          style="margin-top:1.25rem;"
          onclick="document.getElementById('screening-form').reset(); document.getElementById('screening-result').style.display='none'; document.querySelectorAll('.question-card').forEach(c=>c.style.borderColor='');"
        >
          ↺ Reset & Try Again
        </button>
      </div>
    `;

    result.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  // Clear border highlights on change
  form.addEventListener('change', (e) => {
    if (e.target.type === 'radio') {
      const card = e.target.closest('.question-card');
      if (card) card.style.borderColor = '';
    }
  });
}
