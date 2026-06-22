/**
 * MindCompass Module 4 — soundlull.js
 * 100% Operational Algorithmic Audio Therapy Engine
 */

// --- 1. PORTED DIRECTLY FROM moodMappings.ts ---
const MOOD_INTENSITY_MAP = {
  calm: {
    low:  { searchQuery: 'ambient calm',              targetTags: ['meditation', 'healing', 'soft'] },
    high: { searchQuery: 'meditation ambient',         targetTags: ['healing', 'relaxation', 'calm'] },
  },
  focus: {
    low:  { searchQuery: 'ambient focus instrumental', targetTags: ['focus', 'ambient', 'instrumental'] },
    high: { searchQuery: 'lofi study instrumental',    targetTags: ['focus', 'lofi', 'study'] },
  },
  rest: {
    low:  { searchQuery: 'ambient nature sleep',       targetTags: ['sleep', 'nature', 'soft'] },
    high: { searchQuery: 'binaural sleep ambient',     targetTags: ['sleep', 'binaural', 'deep'] },
  }
};

// --- 2. DYNAMIC INTERNET ARCHIVE PLAYLIST ENGINE ---

async function searchArchive(query) {
  try {
    const musicFilter = ' AND mediatype:audio AND (collection:opensource_audio OR collection:etree OR collection:audio_music OR genre:(electronic OR ambient OR instrumental OR meditation OR new age) OR subject:(music OR song OR instrumental OR soundtrack))';
    const searchUrl = `https://archive.org/advancedsearch.php?q=${encodeURIComponent(query + musicFilter)}&fl[]=identifier,title&sort[]=downloads+desc&rows=30&page=1&output=json`;
    const res = await fetch(searchUrl, { signal: AbortSignal.timeout ? AbortSignal.timeout(15000) : undefined });
    const data = await res.json();
    let docs = (data.response && data.response.docs) || [];

    const blockedTerms = ['podcast', 'interview', 'lecture', 'sermon', 'episode', 'broadcast', 'radio show', 'audiobook', 'reading', 'speech', 'talk', 'newscast'];
    docs = docs.filter(d => {
      const t = (d.title || '').toLowerCase();
      return !blockedTerms.some(term => t.includes(term));
    });

    return docs;
  } catch (e) {
    console.warn("Search archive error:", e);
    return [];
  }
}

async function fetchMetadata(identifier) {
  try {
    const res = await fetch(`https://archive.org/metadata/${identifier}`, { signal: AbortSignal.timeout ? AbortSignal.timeout(15000) : undefined });
    return await res.json();
  } catch (e) {
    console.warn("Fetch metadata error:", e);
    return null;
  }
}

function loadCachedPlaylist(query) {
  const cacheKey = `soundlull_archive_${query.replace(/\s+/g, '_')}`;
  const cached = localStorage.getItem(cacheKey);
  if (cached) {
    try {
      const parsed = JSON.parse(cached);
      const CACHE_TTL = 24 * 60 * 60 * 1000;
      if (Date.now() - parsed.timestamp < CACHE_TTL) {
        return parsed.playlist;
      }
    } catch (e) {
      console.warn("Cache parsing error:", e);
    }
  }
  return null;
}

function cachePlaylist(query, plist) {
  const cacheKey = `soundlull_archive_${query.replace(/\s+/g, '_')}`;
  localStorage.setItem(cacheKey, JSON.stringify({ timestamp: Date.now(), playlist: plist }));
}

async function buildArchivePlaylist(query) {
  let docs = await searchArchive(query);

  if (docs.length < 5) {
    const simplifiedQuery = query.split(' ')[0] || 'ambient';
    const fallbackDocs = await searchArchive(simplifiedQuery);
    docs = [...docs, ...fallbackDocs];
  }

  const newPlaylist = [];
  const validFormats = ['MP3', 'VBR MP3', '128Kbps MP3', '64Kbps MP3'];

  for (let i = 0; i < docs.length; i++) {
    if (newPlaylist.length >= 20) break;
    const doc = docs[i];
    if (!doc.identifier) continue;

    const meta = await fetchMetadata(doc.identifier);
    if (!meta || !meta.files) continue;

    const mp3File = meta.files.find(f => validFormats.includes(f.format));
    if (mp3File) {
      let duration = 300;
      if (mp3File.length && !isNaN(parseFloat(mp3File.length))) {
        duration = parseFloat(mp3File.length);
      } else if (meta.metadata && meta.metadata.length && !isNaN(parseFloat(meta.metadata.length))) {
        duration = parseFloat(meta.metadata.length);
      }

      newPlaylist.push({
        id: doc.identifier,
        title: (meta.metadata && meta.metadata.title) || doc.title || "Unknown Audio Selection",
        url: `https://archive.org/download/${doc.identifier}/${mp3File.name}`,
        duration: duration
      });
    }
  }
  return newPlaylist;
}

async function fetchArchivePlaylist(query) {
  let plist = loadCachedPlaylist(query);
  if (plist && plist.length > 0) return plist;

  plist = await buildArchivePlaylist(query);
  if (plist.length > 0) {
    cachePlaylist(query, plist);
  }
  return plist;
}

const SOUNDLULL_CATALOG = {
  moods: [
    { id: "calm", label: "Deep Stillness", icon: "🌊", desc: "Settle an overactive mind with stabilizing low-frequency layers." },
    { id: "focus", label: "Sustained Clarity", icon: "⚡", desc: "Binaural audio structures curated to reinforce attention thresholds." },
    { id: "rest", label: "Sleep & Recovery", icon: "🌌", desc: "Soft ambient configurations designed to lower cognitive strain." }
  ],
  intensities: [
    { id: "low", label: "Gentle / Soft Background", level: "Ambient Base", desc: "Light, transparent background textures for passive grounding." },
    { id: "high", label: "Deep / Immersive Focus", level: "Full Binary Sync", desc: "Immersive full-spectrum audio synchronization for active regulation." }
  ],
  durations: [
    { mins: 5, label: "5 Minute Session" },
    { mins: 15, label: "15 Minute Session" },
    { mins: 30, label: "30 Minute Session" }
  ]
};

export function renderSoundlullModule(containerId, activeDisorder) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const trackProfile = activeDisorder || "General";

  // State Pipeline
  let currentSubStep = "mood"; 
  let selectedMood = "";
  let selectedIntensity = "";
  let selectedDuration = null;
  
  let playlist = []; 
  let currentTrackIdx = 0;
  let audioInstance = null;
  let timeRemaining = 0; 
  let sessionTimerInterval = null;
  let consecutiveFailures = 0;
  let trackLoadTimeout = null;

  function renderWizard() {
    let subContent = "";

    // ── STEP 1: MOOD SELECTOR ──
    if (currentSubStep === "mood") {
      const cards = SOUNDLULL_CATALOG.moods.map(m => `
        <div class="home-module-tile soundlull-selectable ${selectedMood === m.id ? 'active-gold' : ''}" data-id="${m.id}" style="padding: 28px; border-radius: 12px; transition: all 0.25s ease;">
          <div style="font-size: 2.5rem; margin-bottom: 16px;">${m.icon}</div>
          <div style="font-family: 'Space Grotesk', sans-serif; font-size: 1.3rem; color: #fff; font-weight: 600;">${m.label}</div>
          <div style="margin-top: 10px; font-size: 0.9rem; line-height: 1.5; color: #a0aec0;">${m.desc}</div>
        </div>
      `).join('');
      subContent = `
        <p class="module-subtitle" style="margin-bottom: 24px; color: var(--emerald-bright); font-size: 1rem; font-weight: 500;">Step 1 &nbsp;·&nbsp; Select Target Neurological State</p>
        <div class="home-module-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 24px;">${cards}</div>
        <div style="margin-top: 40px; text-align: right;">
          <button class="btn-primary" id="wizard-next-btn" ${!selectedMood ? 'disabled style="opacity:0.2; cursor:not-allowed;"' : ''} style="padding: 14px 32px; font-weight: 600; font-family: 'Space Grotesk', sans-serif;">Continue Engine →</button>
        </div>
      `;
    }

    // ── STEP 2: INTENSITY SELECTOR ──
    else if (currentSubStep === "intensity") {
      const cards = SOUNDLULL_CATALOG.intensities.map(i => `
        <div class="home-module-tile soundlull-selectable ${selectedIntensity === i.id ? 'active-gold' : ''}" data-id="${i.id}" style="padding: 28px; border-radius: 12px;">
          <div style="font-size: 2.2rem; margin-bottom: 14px;">🎚️</div>
          <div style="font-family: 'Space Grotesk', sans-serif; font-size: 1.3rem; color: #fff; font-weight: 600;">${i.label}</div>
          <div style="margin-top: 10px; font-size: 0.9rem; color: #a0aec0; line-height: 1.5;">${i.desc}</div>
          <span style="display: inline-block; margin-top: 16px; font-size: 0.75rem; background: rgba(0, 224, 122, 0.1); color: var(--emerald-bright); padding: 6px 12px; border-radius: 6px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">${i.level}</span>
        </div>
      `).join('');
      subContent = `
        <p class="module-subtitle" style="margin-bottom: 24px; color: var(--emerald-bright); font-size: 1rem; font-weight: 500;">Step 2 &nbsp;·&nbsp; Select Acoustic Density Limit</p>
        <div class="home-module-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px;">${cards}</div>
        <div style="margin-top: 40px; display: flex; justify-content: space-between;">
          <button class="btn-secondary" id="wizard-back-btn" style="padding: 14px 28px; font-family: 'Space Grotesk', sans-serif;">← Back</button>
          <button class="btn-primary" id="wizard-next-btn" ${!selectedIntensity ? 'disabled style="opacity:0.2; cursor:not-allowed;"' : ''} style="padding: 14px 32px; font-family: 'Space Grotesk', sans-serif;">Continue Engine →</button>
        </div>
      `;
    }

    // ── STEP 3: DURATION SELECTOR ──
    else if (currentSubStep === "duration") {
      const cards = SOUNDLULL_CATALOG.durations.map(d => `
        <div class="home-module-tile soundlull-selectable ${selectedDuration === d.mins ? 'active-gold' : ''}" data-id="${d.mins}" style="padding: 32px 24px; border-radius: 12px; text-align: center;">
          <div style="font-size: 2.5rem; margin-bottom: 14px;">⏱️</div>
          <div style="font-family: 'Space Grotesk', sans-serif; font-size: 1.4rem; color: #fff; font-weight: 700;">${d.label}</div>
          <div style="margin-top: 6px; font-size: 0.8rem; color: #718096;">Continuous Down-Regulation</div>
        </div>
      `).join('');
      subContent = `
        <p class="module-subtitle" style="margin-bottom: 24px; color: var(--emerald-bright); font-size: 1rem; font-weight: 500;">Step 3 &nbsp;·&nbsp; Configure Spatial Time Architecture</p>
        <div class="home-module-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 24px;">${cards}</div>
        <div style="margin-top: 40px; display: flex; justify-content: space-between;">
          <button class="btn-secondary" id="wizard-back-btn" style="padding: 14px 28px; font-family: 'Space Grotesk', sans-serif;">← Back</button>
          <button class="btn-primary" id="wizard-start-btn" ${!selectedDuration ? 'disabled style="opacity:0.2; cursor:not-allowed;"' : ''} style="padding: 14px 36px; font-family: 'Space Grotesk', sans-serif; background: linear-gradient(135deg, var(--emerald-bright), #00b366); border: none; box-shadow: 0 4px 20px rgba(0, 224, 122, 0.25); font-weight:700;">Initialize Waveform 🧘✨</button>
        </div>
      `;
    }

    // ── STEP 4: LOADING TRANSITION ──
    else if (currentSubStep === "loading") {
      subContent = `
        <div style="text-align:center; padding: 6rem 2rem; background: var(--bg-card); border-radius: 16px; border: 1px solid var(--border-accent);">
          <div class="structural-orb-glow" style="font-size: 4rem; margin-bottom: 24px;">🌟</div>
          <h3 style="font-family: 'Space Grotesk', sans-serif; font-size: 2rem; color: #fff; font-weight: 600; margin: 0;">Executing Playlist Selection Pass...</h3>
          <p style="margin-top: 12px; color: #a0aec0; font-size: 1.05rem; line-height: 1.6;">Running greedy selection strategy across candidate metadata fields.</p>
        </div>
      `;
      setTimeout(async () => {
        await runClientSidePlaylistBuilder();
        currentSubStep = "player";
        renderWizard();
        startAudioEngine();
      }, 2000);
    }

    // ── STEP 5: CORE AUDIO PLAYER ──
    else if (currentSubStep === "player") {
      const track = playlist[currentTrackIdx] || { title: "Resolving stream node...", url: "" };
      subContent = `
        <div class="question-card" style="max-width: 620px; margin: 20px auto; padding: 40px; border-radius: 16px; border: 1px solid var(--border-accent); background: linear-gradient(180deg, var(--bg-card) 0%, rgba(20,24,33,0.95) 100%);">
          
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; border-bottom: 1px solid #2d3748; padding-bottom: 16px;">
            <div>
              <div style="color: var(--emerald-bright); letter-spacing: 0.12em; text-transform: uppercase; font-size: 0.75rem; font-weight: 800;">Algorithmic Workspace Active</div>
              <p style="font-size: 0.85rem; color: #718096; margin: 4px 0 0 0;">Profile Context: <span style="color:#fff; font-weight:600;">${trackProfile.toUpperCase()}</span></p>
            </div>
            <div style="background: rgba(0, 224, 122, 0.08); border: 1px solid rgba(0, 224, 122, 0.2); padding: 8px 16px; border-radius: 8px;">
              <div style="font-size: 0.7rem; color: var(--emerald-bright); font-weight: 700;">SESSION REMAINING</div>
              <div id="session-countdown-clock" style="font-family: 'Space Grotesk', sans-serif; font-size: 1.3rem; font-weight: 700; color: #fff; text-align: right;">${formatTime(timeRemaining)}</div>
            </div>
          </div>

          <h4 style="font-family: 'Space Grotesk', sans-serif; font-size: 1.2rem; margin: 0 0 8px 0; color: #fff; font-weight: 600;" id="player-track-title">${track.title}</h4>
          <p style="font-size:0.85rem; color: #a0aec0; margin: 0 0 32px 0;">Sequence: <span style="color: var(--emerald-bright); font-weight:600;">${currentTrackIdx + 1} / ${playlist.length}</span> &middot; Sound Target: <span style="text-transform: uppercase; font-weight: 600; color: #fff;">${selectedMood} (${selectedIntensity})</span></p>
          
          <div style="width: 100%; background: #1a202c; height: 8px; border-radius: 100px; overflow: hidden; margin-bottom: 36px; position: relative;">
            <div id="player-progress-bar" style="width: 0%; height: 100%; background: linear-gradient(90deg, var(--emerald-bright) 0%, #00ffcc 100%); border-radius: 100px;"></div>
          </div>

          <div style="display:flex; justify-content:center; gap:24px; align-items:center;">
            <button class="btn-secondary" id="player-prev" style="padding: 14px 24px; border-radius: 10px;">&lsaquo; Prev</button>
            <button class="btn-primary" id="player-toggle" style="border-radius: 50%; width: 68px; height: 68px; display: inline-flex; align-items: center; justify-content: center; padding: 0; font-size: 1.8rem; background: var(--emerald-bright); border: none; color: #0a0e17;">⏸</button>
            <button class="btn-secondary" id="player-next" style="padding: 14px 24px; border-radius: 10px;">Next &rsaquo;</button>
          </div>

          <div style="margin-top: 40px; border-top: 1px solid #2d3748; padding-top: 24px; text-align: center;">
            <button class="btn-secondary" id="player-exit" style="color:#fc8181; border-color: rgba(252, 129, 129, 0.25); font-size: 0.85rem; padding: 10px 20px;">Terminate Flow Early ✕</button>
          </div>
        </div>
      `;
    }

    // ── STEP 6: REFLECTION ──
    else if (currentSubStep === "feedback") {
      subContent = `
        <div class="question-card" style="max-width: 550px; margin: 30px auto; padding: 40px; border-radius: 16px; background: var(--bg-card); border: 1px solid var(--border-accent);">
          <h3 class="edu-section-title" style="font-family: 'Space Grotesk', sans-serif; text-align:center; font-size: 1.7rem; color: #fff; font-weight: 700;">Post-Session Reflection</h3>
          <p class="module-subtitle" style="text-align:center; margin-bottom:32px; color: #a0aec0;">How has your focus baseline adjusted?</p>
          <div style="display:flex; flex-direction:column; gap:14px;">
            <button class="radio-label feedback-opt" style="text-align: left; padding: 18px; border-radius: 10px; color: #fff; background: rgba(255,255,255,0.01);">✨ Deeply Restored & Clearheaded</button>
            <button class="radio-label feedback-opt" style="text-align: left; padding: 18px; border-radius: 10px; color: #fff; background: rgba(255,255,255,0.01);">😌 Grounded & Intentionally Still</button>
            <button class="radio-label feedback-opt" style="text-align: left; padding: 18px; border-radius: 10px; color: #fff; background: rgba(255,255,255,0.01);">😐 Neutral / No Clear Change</button>
          </div>
        </div>
      `;
    }

    // ── STEP 7: COMPLETION SUMMARY ──
    else if (currentSubStep === "complete") {
      subContent = `
        <div style="text-align:center; padding: 5rem 2rem; background: var(--bg-card); border-radius: 16px; border: 1px solid var(--border-accent); max-width: 600px; margin: 40px auto;">
          <div style="font-size: 4rem; margin-bottom: 20px;">🏆</div>
          <h2 class="home-welcome-heading" style="font-family: 'Space Grotesk', sans-serif; font-size: 2rem; color: #fff; font-weight: 700; margin: 0;">Acoustic Waveform Logged</h2>
          <p class="module-subtitle" style="margin: 12px auto 36px auto; color: #a0aec0; font-size: 1rem;">Session parameters successfully integrated into your profile logs.</p>
          <button class="btn-primary" id="soundlull-restart" style="padding: 14px 36px;">Begin New Cycle ↺</button>
        </div>
      `;
    }

    container.innerHTML = `
      <div class="module-header" style="margin-bottom: 36px; border-bottom: 1px solid #2d3748; padding-bottom: 24px;">
        <div class="module-eyebrow" style="color: var(--emerald-bright); font-weight: 800; letter-spacing: 0.12em; text-transform: uppercase; font-size: 0.78rem;">🌊 Module 04 &nbsp;·&nbsp; Advanced Bio-Acoustics</div>
        <h2 class="module-title" style="font-family: 'Space Grotesk', sans-serif; font-size: 2.4rem; color: #fff; font-weight: 700; margin-top: 6px;">Soundlull Care Engine</h2>
      </div>
      <div>${subContent}</div>
    `;

    attachWizardListeners();
  }

  // --- 3. DYNAMIC ARCHIVE PLAYLIST ASSEMBLY ---
  async function runClientSidePlaylistBuilder() {
    const intensityConfig = MOOD_INTENSITY_MAP[selectedMood]?.[selectedIntensity] || { searchQuery: 'ambient' };
    const query = intensityConfig.searchQuery;

    let fullPlaylist = [];
    try {
      fullPlaylist = await fetchArchivePlaylist(query);
    } catch (e) {
      console.warn("Playlist fetch error:", e);
    }

    if (!fullPlaylist || fullPlaylist.length === 0) {
      playlist = [];
      timeRemaining = selectedDuration * 60;
      return;
    }

    playlist = [];
    let totalTargetSeconds = selectedDuration * 60;
    let accumulatedSeconds = 0;
    let safeguardLoop = 0;

    while (accumulatedSeconds < totalTargetSeconds && safeguardLoop < 15) {
      for (let i = 0; i < fullPlaylist.length; i++) {
        if (accumulatedSeconds >= totalTargetSeconds) break;
        const candidate = fullPlaylist[i];

        playlist.push({
          title: candidate.title,
          url: candidate.url,
          duration: candidate.duration
        });
        accumulatedSeconds += candidate.duration;
      }
      safeguardLoop++;
    }

    timeRemaining = totalTargetSeconds;

  }

  function attachWizardListeners() {
    container.querySelectorAll('.soundlull-selectable').forEach(card => {
      card.addEventListener('click', () => {
        const id = card.getAttribute('data-id');
        if (currentSubStep === "mood") selectedMood = id;
        if (currentSubStep === "intensity") selectedIntensity = id;
        if (currentSubStep === "duration") selectedDuration = parseInt(id, 10);
        renderWizard();
      });
    });

    const nextBtn = document.getElementById('wizard-next-btn');
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        currentSubStep = currentSubStep === "mood" ? "intensity" : "duration";
        renderWizard();
      });
    }

    const backBtn = document.getElementById('wizard-back-btn');
    if (backBtn) {
      backBtn.addEventListener('click', () => {
        currentSubStep = currentSubStep === "intensity" ? "mood" : "intensity";
        renderWizard();
      });
    }

    const startBtn = document.getElementById('wizard-start-btn');
    if (startBtn) {
      startBtn.addEventListener('click', () => {
        currentSubStep = "loading";
        renderWizard();
      });
    }

    if (currentSubStep === "player") {
      document.getElementById('player-toggle').addEventListener('click', () => {
        if (audioInstance.paused) {
          audioInstance.play();
          document.getElementById('player-toggle').textContent = "⏸";
        } else {
          audioInstance.pause();
          document.getElementById('player-toggle').textContent = "▶";
        }
      });

      document.getElementById('player-next').addEventListener('click', () => shiftTrack(1));
      document.getElementById('player-prev').addEventListener('click', () => shiftTrack(-1));
      document.getElementById('player-exit').addEventListener('click', stopAudioEngine);
    }

    container.querySelectorAll('.feedback-opt').forEach(btn => {
      btn.addEventListener('click', () => {
        currentSubStep = "complete";
        renderWizard();
      });
    });

    const restartBtn = document.getElementById('soundlull-restart');
    if (restartBtn) {
      restartBtn.addEventListener('click', () => {
        selectedMood = "";
        selectedIntensity = "";
        selectedDuration = null;
        currentSubStep = "mood";
        playlist = [];
        currentTrackIdx = 0;
        renderWizard();
      });
    }
  }

  function startAudioEngine() {
    currentTrackIdx = 0;
    loadTrackInstance();

    sessionTimerInterval = setInterval(() => {
      if (audioInstance && !audioInstance.paused) {
        timeRemaining--;
        const clockEl = document.getElementById('session-countdown-clock');
        if (clockEl) clockEl.textContent = formatTime(timeRemaining);

        if (timeRemaining <= 0) {
          stopAudioEngine();
        }
      }
    }, 1000);
  }

  function loadTrackInstance() {
    clearTimeout(trackLoadTimeout);

    if (audioInstance) {
      audioInstance.pause();
      audioInstance.onerror = null;
      audioInstance.oncanplay = null;
      audioInstance.src = "";
      audioInstance = null;
    }

    const track = playlist[currentTrackIdx];
    if (!track) {
      stopAudioEngine();
      return;
    }

    audioInstance = new Audio(track.url);

    trackLoadTimeout = setTimeout(() => {
      if (audioInstance && audioInstance.readyState < 3) {
        handleTrackError();
      }
    }, 15000);

    audioInstance.onerror = handleTrackError;

    audioInstance.oncanplay = () => {
      clearTimeout(trackLoadTimeout);
      consecutiveFailures = 0;
      audioInstance.play().catch(() => {
        const toggleBtn = document.getElementById('player-toggle');
        if (toggleBtn) toggleBtn.textContent = "▶";
      });
    };

    audioInstance.addEventListener('timeupdate', () => {
      const progressBar = document.getElementById('player-progress-bar');
      if (progressBar && audioInstance.duration) {
        const pct = (audioInstance.currentTime / audioInstance.duration) * 100;
        progressBar.style.width = `${pct}%`;
      }
    });

    audioInstance.addEventListener('ended', () => {
      shiftTrack(1);
    });

    const titleEl = document.getElementById('player-track-title');
    if (titleEl) titleEl.textContent = track.title;
  }

  function handleTrackError() {
    console.warn("Track failed to load or play.");
    clearTimeout(trackLoadTimeout);
    consecutiveFailures++;

    if (consecutiveFailures >= playlist.length) {
      stopAudioEngine();
      return;
    }

    shiftTrack(1);
  }

  function shiftTrack(dir) {
    currentTrackIdx += dir;
    if (currentTrackIdx >= playlist.length) {
      stopAudioEngine();
      return;
    }
    if (currentTrackIdx < 0) currentTrackIdx = 0;

    loadTrackInstance();
  }

  function stopAudioEngine() {
    clearInterval(sessionTimerInterval);
    clearTimeout(trackLoadTimeout);
    if (audioInstance) {
      audioInstance.pause();
      audioInstance.onerror = null;
      audioInstance.oncanplay = null;
      audioInstance = null;
    }
    if (currentSubStep === "player" || currentSubStep === "loading") {
      currentSubStep = "feedback";
      renderWizard();
    }
  }

  function formatTime(secs) {
    if (secs <= 0) return "00:00";
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  }

  renderWizard();
}