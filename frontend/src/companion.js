/**
 * MindCompass — companion.js
 * Module 2: Creative Wellness Hub
 * — Left column:  Disorder-specific YouTube music therapy streams
 * — Right column: AI Companion chat (calls backend /api/companion)
 *
 * Exports: renderCompanionModule(containerId, activeDisorder)
 */

// ─────────────────────────────────────────────────────────────────────
// Music Therapy Video Config
// ─────────────────────────────────────────────────────────────────────
const MUSIC_TRACKS = {
  dementia: [
    {
      id:    "Zy7c8v-g5f0",
      title: "Soothing Classical Piano",
      desc:  "Gentle classical compositions to evoke calm and comfort.",
      icon:  "🎹",
    },
    {
      id:    "VwzR8G_878o",
      title: "Familiar Oldies Collection",
      desc:  "Beloved familiar melodies to gently stimulate long-term memory recall.",
      icon:  "🎶",
    },
  ],
  adhd: [
    {
      id:    "1Rc7k4RQ7hs",
      title: "Binaural Focus Beats",
      desc:  "Binaural audio streams designed to support sustained attention and reduce mental restlessness.",
      icon:  "🎧",
    },
    {
      id:    "Xf3-4A-uEc8",
      title: "Deep Focus Lofi Mix",
      desc:  "Instrumental lofi study beats curated to support consistent focus during deep work sessions.",
      icon:  "🎮",
    },
  ],
  mci: [
    {
      id:    "WPni755-gTY",
      title: "Alpha Memory Waves",
      desc:  "Alpha-range (8–12 Hz) binaural audio to support a calm, alert mental state for cognitive activity.",
      icon:  "🌊",
    },
    {
      id:    "5qap5aO4i9A",
      title: "Acoustic Focus Rhythms",
      desc:  "Soft acoustic rhythms to provide a calm background environment during cognitive stimulation activities.",
      icon:  "🎸",
    },
  ],
};

const TRACK_META = {
  dementia: { label: "Dementia / Major NCD", icon: "🧠" },
  adhd:     { label: "ADHD",                 icon: "⚡" },
  mci:      { label: "MCI",                  icon: "🌱" },
};

// ─────────────────────────────────────────────────────────────────────
// Welcome messages per track
// ─────────────────────────────────────────────────────────────────────

const WELCOME_MESSAGES = {
  dementia: "Hello! I'm your MindCompass companion for the Dementia / Major NCD informational track. I'm here to chat, listen, and perhaps bring up some warm memories together. What's on your mind today?",
  adhd:     "Hey! 👋 I'm your MindCompass companion for the ADHD track. Ready to have some fun? Let's chat, play a quick story game, or just explore ideas together. **What shall we dive into first?**",
  mci:      "Hello! I'm your MindCompass companion for the MCI track. I love a good brain workout — want to try a word puzzle, a bit of trivia, or just have a chat? What sounds good to you today?",
};

// ─────────────────────────────────────────────────────────────────────
// Simple markdown → safe HTML renderer
// ─────────────────────────────────────────────────────────────────────

function simpleMarkdown(text) {
  // Escape HTML to prevent XSS
  const escapeHtml = (str) =>
    str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');

  let html = escapeHtml(text);

  // Bold: **text**
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  // Italic: *text*
  html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');
  // Bullet lists: lines starting with '- ' or '• '
  html = html.replace(/^[•\-]\s+(.+)$/gm, '<li>$1</li>');
  html = html.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>');
  // Newlines to <br>
  html = html.replace(/\n/g, '<br>');
  // Clean up <br> inside lists
  html = html.replace(/<br>(<\/?[uo]l>)/g, '$1');

  return `<div class="ai-message-content">${html}</div>`;
}

// ─────────────────────────────────────────────────────────────────────
// Main Export
// ─────────────────────────────────────────────────────────────────────

/**
 * Render the Creative Wellness Hub into the given container.
 * @param {string} containerId   - ID of the HTML element to render into
 * @param {string} activeDisorder - 'dementia' | 'adhd' | 'mci'
 */
export function renderCompanionModule(containerId, activeDisorder) {
  const container = document.getElementById(containerId);
  if (!container) {
    console.error(`[MindCompass] Companion container #${containerId} not found.`);
    return;
  }

  const disorder = activeDisorder?.toLowerCase() || 'mci';
  const tracks   = MUSIC_TRACKS[disorder] || MUSIC_TRACKS.mci;
  const meta     = TRACK_META[disorder]   || TRACK_META.mci;
  const welcome  = WELCOME_MESSAGES[disorder] || WELCOME_MESSAGES.mci;

  // Build YouTube embed cards for the left column
  const videoCards = tracks.map(track => /* html */`
    <div class="video-card">
      <div class="video-card-label">
        <span>${track.icon}</span>
        <span>${track.title}</span>
        <span style="color:var(--text-muted);font-weight:400;font-size:0.72rem;margin-left:auto;">Music Therapy</span>
      </div>
      <p style="font-size:0.72rem;color:var(--text-muted);padding:0 1rem 0.6rem;line-height:1.4;">${track.desc}</p>
      <div class="iframe-wrapper">
        <iframe
          src="https://www.youtube.com/embed/${track.id}?rel=0&modestbranding=1"
          title="${track.title} — Music Therapy Stream"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
          loading="lazy"
        ></iframe>
      </div>
    </div>
  `).join('');

  // Initial welcome bubble
  const welcomeBubbleHTML = /* html */`
    <div class="chat-bubble ai" id="welcome-bubble">
      <div class="ai-label">⬡ MindCompass AI</div>
      ${simpleMarkdown(welcome)}
    </div>
  `;

  // Full module HTML
  container.innerHTML = /* html */`
    <div class="module-header">
      <div class="module-eyebrow">${meta.icon} Module 2 &nbsp;·&nbsp; ${meta.label} Track</div>
      <h2 class="module-title">Creative Wellness Hub</h2>
      <p class="module-subtitle">
        Music therapy streams selected for your informational track, alongside an AI companion
        chat for creative and cognitive wellness activities.
      </p>
    </div>

    <div class="hub-grid">

      <!-- LEFT COLUMN: Music Therapy -->
      <div class="music-column">
        <div class="music-column-title">🎵 Recommended Streams</div>
        ${videoCards}
        <div style="font-size:0.72rem;color:var(--text-muted);margin-top:0.5rem;line-height:1.5;">
          ℹ These streams are curated for informational support. Music therapy is a complementary
          wellness activity and does not replace professional clinical intervention.
        </div>
      </div>

      <!-- RIGHT COLUMN: AI Companion Chat -->
      <div class="chat-column">
        <div class="chat-column-title">💬 AI Companion Chat</div>

        <div class="chat-panel" id="chat-panel">

          <div class="chat-log" id="chat-log" role="log" aria-label="AI companion conversation" aria-live="polite">
            ${welcomeBubbleHTML}
          </div>

          <div class="chat-api-notice" role="note">
            ⚠ AI responses are informational only &nbsp;·&nbsp; Not a clinical tool &nbsp;·&nbsp; No medical advice
          </div>

          <div class="chat-input-area">
            <textarea
              id="chat-input"
              class="chat-input"
              placeholder="Type a message…"
              rows="1"
              aria-label="Message input"
              maxlength="600"
            ></textarea>
            <button
              id="chat-send-btn"
              class="chat-send-btn"
              aria-label="Send message"
            >
              Send
            </button>
          </div>

        </div><!-- /chat-panel -->

        <p style="font-size:0.68rem;color:var(--text-muted);margin-top:0.5rem;line-height:1.5;">
          Powered by Google Gemini (gemini-1.5-flash) via local backend.
          Ensure the FastAPI backend is running at <code style="color:var(--emerald-mid);">http://127.0.0.1:8000</code>.
        </p>
      </div>

    </div><!-- /hub-grid -->
  `;

  // ── Chat Event Listeners ──────────────────────────────────────────

  const chatLog     = document.getElementById('chat-log');
  const chatInput   = document.getElementById('chat-input');
  const sendBtn     = document.getElementById('chat-send-btn');

  /** Append a bubble to the chat log */
  function appendBubble(role, htmlContent) {
    const bubble = document.createElement('div');
    bubble.classList.add('chat-bubble', role);

    if (role === 'ai') {
      const label = document.createElement('div');
      label.className = 'ai-label';
      label.textContent = '⬡ MindCompass AI';
      bubble.appendChild(label);
    }

    const content = document.createElement('div');
    content.innerHTML = htmlContent;
    bubble.appendChild(content);

    chatLog.appendChild(bubble);
    chatLog.scrollTop = chatLog.scrollHeight;
    return bubble;
  }

  /** Show a typing indicator while waiting for API */
  function showLoadingBubble() {
    const bubble = document.createElement('div');
    bubble.classList.add('chat-bubble', 'ai', 'loading');
    bubble.id = 'loading-bubble';

    const label = document.createElement('div');
    label.className = 'ai-label';
    label.textContent = '⬡ MindCompass AI';

    const dots = document.createElement('div');
    dots.className = 'dots';
    dots.innerHTML = '<div class="dot"></div><div class="dot"></div><div class="dot"></div>';

    bubble.appendChild(label);
    bubble.appendChild(dots);
    chatLog.appendChild(bubble);
    chatLog.scrollTop = chatLog.scrollHeight;
    return bubble;
  }

  /** Main send handler */
  async function sendMessage() {
    const messageText = chatInput.value.trim();
    if (!messageText) return;

    // Lock UI
    chatInput.value = '';
    chatInput.disabled = true;
    sendBtn.disabled = true;
    chatInput.style.height = 'auto';

    // Render user bubble
    appendBubble('user', `<span>${messageText.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</span>`);

    // Typing indicator
    const loadingBubble = showLoadingBubble();

    try {
      const response = await fetch('http://127.0.0.1:8000/api/companion', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({
          message: messageText,
          mode:    disorder, // Keeps your pre-existing track variable intact
          lang:    window.currentLanguage || 'en' // NEW: Safely attaches the active global language selection state
        }),
      });

      // Remove loading bubble
      loadingBubble.remove();

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.detail || `Server error ${response.status}`);
      }

      const data = await response.json();
      const replyText = data.reply || "I'm here with you. Could you tell me a little more?";

      appendBubble('ai', simpleMarkdown(replyText));

    } catch (error) {
        loadingBubble.remove();

        let errorMessage;
        if (error.message.includes('fetch') || error.message.includes('Failed to fetch') || error.name === 'TypeError') {
          errorMessage = `<strong>Connection Error:</strong> Could not reach the MindCompass backend.<br>
            Please ensure the FastAPI server is running:<br>
            <code style="color:var(--emerald-mid);font-size:0.78rem;">cd backend &amp;&amp; uvicorn main:app --reload</code>`;
        } else {
          errorMessage = `<strong>Error:</strong> ${error.message.replace(/</g, '&lt;')}`;
        }

        const errBubble = appendBubble('ai', `<span style="color:var(--danger-red);">${errorMessage}</span>`);
        errBubble.style.borderColor = 'var(--danger-border)';
        errBubble.style.background  = 'var(--danger-bg)';
    }

    // Unlock UI
    chatInput.disabled = false;
    sendBtn.disabled   = false;
    chatInput.focus();
  }

  // Button click
  sendBtn.addEventListener('click', sendMessage);

  // Enter to send (Shift+Enter = newline)
  chatInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });

  // Auto-resize textarea
  chatInput.addEventListener('input', () => {
    chatInput.style.height = 'auto';
    chatInput.style.height = Math.min(chatInput.scrollHeight, 100) + 'px';
  });
}
