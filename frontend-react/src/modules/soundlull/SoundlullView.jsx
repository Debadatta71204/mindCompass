import { useState, useCallback, useEffect, useRef } from 'react';
import { useTrack } from '../../contexts/TrackContext';
import { SOUNDLULL_CATALOG } from '../../data/soundlull';
import { useAudioPlayer } from '../../hooks/useAudioPlayer';
import { theme } from '../../theme';

const STEPS = {
  MOOD: 'mood',
  INTENSITY: 'intensity',
  DURATION: 'duration',
  LOADING: 'loading',
  PLAYER: 'player',
  FEEDBACK: 'feedback',
  COMPLETE: 'complete',
};

export default function SoundlullView() {
  const { currentDisorder } = useTrack();
  const trackProfile = currentDisorder || 'General';

  const [step, setStep] = useState(STEPS.MOOD);
  const [selectedMood, setSelectedMood] = useState('');
  const [selectedIntensity, setSelectedIntensity] = useState('');
  const [selectedDuration, setSelectedDuration] = useState(null);
  const [playlist, setPlaylist] = useState([]);

  const {
    isPlaying, track, trackIndex, trackCount, timeRemaining,
    formatTime, buildPlaylist, start, stop, toggle, shiftTrack,
  } = useAudioPlayer();

  const playlistRef = useRef(playlist);
  playlistRef.current = playlist;

  const handleEnd = useCallback(() => {
    stop();
    setStep(STEPS.FEEDBACK);
  }, [stop]);

  const handleError = useCallback(() => {
    shiftTrack(1, playlistRef.current, handleEnd, handleError);
  }, [shiftTrack, handleEnd]);

  useEffect(() => {
    if (step !== STEPS.LOADING) return;
    let cancelled = false;
    (async () => {
      const plist = await buildPlaylist(selectedMood, selectedIntensity, selectedDuration);
      if (cancelled) return;
      setPlaylist(plist);
      if (plist.length > 0) {
        setStep(STEPS.PLAYER);
      } else {
        setStep(STEPS.FEEDBACK);
      }
    })();
    return () => { cancelled = true; };
  }, [step, selectedMood, selectedIntensity, selectedDuration, buildPlaylist]);

  useEffect(() => {
    if (step === STEPS.PLAYER && playlist.length > 0 && !track) {
      start(playlist, handleEnd, handleError);
    }
  }, [step, playlist, track, start, handleEnd, handleError]);

  function restart() {
    stop();
    setSelectedMood('');
    setSelectedIntensity('');
    setSelectedDuration(null);
    setPlaylist([]);
    setStep(STEPS.MOOD);
  }

  function renderMoodStep() {
    return (
      <div>
        <p className="text-emerald-bright text-base font-medium mb-6">Step 1 &nbsp;·&nbsp; Select Target Neurological State</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {SOUNDLULL_CATALOG.moods.map((m) => (
            <div
              key={m.id}
              className={`home-module-tile soundlull-selectable p-7 rounded-xl transition-all duration-200 ${selectedMood === m.id ? 'active-gold' : ''}`}
              onClick={() => setSelectedMood(m.id)}
            >
              <div className="text-[2.5rem] mb-4">{m.icon}</div>
              <div className="font-display text-[1.3rem] text-txt-primary font-semibold">{m.label}</div>
              <div className="mt-2.5 text-[0.9rem] leading-relaxed text-txt-secondary">{m.desc}</div>
            </div>
          ))}
        </div>
        <div className="mt-10 text-right">
          <button className="btn-primary px-8 py-3.5 font-display font-semibold" disabled={!selectedMood} onClick={() => setStep(STEPS.INTENSITY)}
            style={!selectedMood ? { opacity: 0.2, cursor: 'not-allowed' } : {}}>
            Continue Engine {'\u2192'}
          </button>
        </div>
      </div>
    );
  }

  function renderIntensityStep() {
    return (
      <div>
        <p className="text-emerald-bright text-base font-medium mb-6">Step 2 &nbsp;·&nbsp; Select Acoustic Density Limit</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {SOUNDLULL_CATALOG.intensities.map((i) => (
            <div
              key={i.id}
              className={`home-module-tile soundlull-selectable p-7 rounded-xl ${selectedIntensity === i.id ? 'active-gold' : ''}`}
              onClick={() => setSelectedIntensity(i.id)}
            >
              <div className="text-[2.2rem] mb-3.5">{'\u{1F39A}\uFE0F'}</div>
              <div className="font-display text-[1.3rem] text-txt-primary font-semibold">{i.label}</div>
              <div className="mt-2.5 text-[0.9rem] text-txt-secondary leading-relaxed">{i.desc}</div>
              <span className="inline-block mt-4 text-[0.75rem] bg-emerald-glow text-emerald-bright px-3 py-1.5 rounded-md font-semibold uppercase tracking-[0.05em]">{i.level}</span>
            </div>
          ))}
        </div>
        <div className="mt-10 flex justify-between">
          <button className="btn-secondary px-7 py-3.5 font-display" onClick={() => setStep(STEPS.MOOD)}>{'\u2190'} Back</button>
          <button className="btn-primary px-8 py-3.5 font-display" disabled={!selectedIntensity} onClick={() => setStep(STEPS.DURATION)}
            style={!selectedIntensity ? { opacity: 0.2, cursor: 'not-allowed' } : {}}>
            Continue Engine {'\u2192'}
          </button>
        </div>
      </div>
    );
  }

  function renderDurationStep() {
    return (
      <div>
        <p className="text-emerald-bright text-base font-medium mb-6">Step 3 &nbsp;·&nbsp; Configure Spatial Time Architecture</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {SOUNDLULL_CATALOG.durations.map((d) => (
            <div
              key={d.mins}
              className={`home-module-tile soundlull-selectable p-8 rounded-xl text-center ${selectedDuration === d.mins ? 'active-gold' : ''}`}
              onClick={() => setSelectedDuration(d.mins)}
            >
              <div className="text-[2.5rem] mb-3.5">{'\u23F1\uFE0F'}</div>
              <div className="font-display text-[1.4rem] text-txt-primary font-bold">{d.label}</div>
              <div className="mt-1.5 text-[0.8rem] text-txt-muted">Continuous Down-Regulation</div>
            </div>
          ))}
        </div>
        <div className="mt-10 flex justify-between">
          <button className="btn-secondary px-7 py-3.5 font-display" onClick={() => setStep(STEPS.INTENSITY)}>{'\u2190'} Back</button>
          <button className="btn-primary px-9 py-3.5 font-display font-bold"
            disabled={!selectedDuration}
            onClick={() => setStep(STEPS.LOADING)}
            style={!selectedDuration ? { opacity: 0.2, cursor: 'not-allowed' } : {
              background: `linear-gradient(135deg, ${theme.accent}, #a86e4a)`,
              border: 'none',
              boxShadow: `0 4px 20px rgba(192,128,90,0.25)`,
            }}>
            Initialize Waveform {'\u{1F9D8}\u2728'}
          </button>
        </div>
      </div>
    );
  }

  function renderLoadingStep() {
    return (
      <div className="text-center py-24 px-8 bg-obsidian-card rounded-[16px] border border-[rgba(192,128,90,0.3)]">
        <div className="structural-orb-glow text-[4rem] mb-6">{'\u{1F31F}'}</div>
        <h3 className="font-display text-[2rem] text-txt-primary font-semibold m-0">Executing Playlist Selection Pass...</h3>
        <p className="mt-3 text-txt-secondary text-[1.05rem] leading-relaxed">Running greedy selection strategy across candidate metadata fields.</p>
      </div>
    );
  }

  function renderPlayerStep() {
    return (
      <div className="max-w-[620px] mx-auto mt-5 rounded-[16px] border border-[rgba(192,128,90,0.3)] p-10"
        style={{ background: `linear-gradient(180deg, ${theme.card} 0%, rgba(20,24,33,0.95) 100%)` }}>

        <div className="flex justify-between items-center mb-6 pb-4 border-b border-[rgb(61,49,36,0.12)]">
          <div>
            <div className="text-emerald-bright tracking-[0.12em] uppercase text-[0.75rem] font-extrabold">Algorithmic Workspace Active</div>
            <p className="text-[0.85rem] text-txt-muted mt-1">
              Profile Context: <span className="text-txt-primary font-semibold">{trackProfile.toUpperCase()}</span>
            </p>
          </div>
          <div className="bg-emerald-glow border border-[rgba(192,128,90,0.2)] py-2 px-4 rounded-lg">
            <div className="text-[0.7rem] text-emerald-bright font-bold">SESSION REMAINING</div>
            <div className="font-display text-[1.3rem] font-bold text-txt-primary text-right">{formatTime(timeRemaining)}</div>
          </div>
        </div>

        <h4 className="font-display text-[1.2rem] font-semibold text-txt-primary mb-2">{track?.title || 'Resolving stream node...'}</h4>
        <p className="text-[0.85rem] text-txt-secondary mb-8">
          Sequence: <span className="text-emerald-bright font-semibold">{trackIndex + 1} / {trackCount}</span>
          {' '}&middot;{' '}Sound Target: <span className="uppercase font-semibold text-txt-primary">{selectedMood} ({selectedIntensity})</span>
        </p>

        <div className="w-full bg-[#3d312433] h-2 rounded-full overflow-hidden mb-9">
          <div id="player-progress-bar" className="h-full rounded-full" style={{ width: '0%', background: 'linear-gradient(90deg, #c0805a 0%, #d4a860 100%)' }} />
        </div>

        <div className="flex justify-center gap-6 items-center">
          <button className="btn-secondary px-6 py-3.5 rounded-md" onClick={() => shiftTrack(-1, playlistRef.current, handleEnd, handleError)}>
            {'\u2039'} Prev
          </button>
          <button className={`btn-primary rounded-full w-[68px] h-[68px] inline-flex items-center justify-center p-0 text-[1.8rem] bg-emerald-bright border-none text-[${theme.bg}]`}
            onClick={toggle}>
            {isPlaying ? '\u23F8' : '\u25B6'}
          </button>
          <button className="btn-secondary px-6 py-3.5 rounded-md" onClick={() => shiftTrack(1, playlistRef.current, handleEnd, handleError)}>
            Next {'\u203A'}
          </button>
        </div>

        <div className="mt-10 pt-6 border-t border-[rgb(61,49,36,0.12)] text-center">
          <button className="btn-secondary text-[#c44545] border-[rgba(196,69,69,0.25)] text-[0.85rem] px-5 py-2.5"
            onClick={() => { stop(); setStep(STEPS.FEEDBACK); }}>
            Terminate Flow Early {'\u2715'}
          </button>
        </div>
      </div>
    );
  }

  function renderFeedbackStep() {
    return (
      <div className="max-w-[550px] mx-auto mt-8 p-10 rounded-[16px] bg-obsidian-card border border-[rgba(192,128,90,0.3)]">
        <h3 className="font-display text-[1.7rem] text-txt-primary font-bold text-center">Post-Session Reflection</h3>
        <p className="text-txt-secondary text-center mb-8">How has your focus baseline adjusted?</p>
        <div className="flex flex-col gap-3.5">
          {[
            '\u2728 Deeply Restored & Clearheaded',
            '\u{1F60C} Grounded & Intentionally Still',
            '\u{1F610} Neutral / No Clear Change',
          ].map((label) => (
            <button key={label} className="text-left p-[18px] rounded-md text-txt-primary border border-black/10 transition-all hover:border-emerald-bright hover:bg-obsidian-card-hover"
              style={{ background: 'rgba(61,49,36,0.02)' }}
              onClick={() => setStep(STEPS.COMPLETE)}>
              {label}
            </button>
          ))}
        </div>
      </div>
    );
  }

  function renderCompleteStep() {
    return (
      <div className="text-center py-20 px-8 bg-obsidian-card rounded-[16px] border border-[rgba(192,128,90,0.3)] max-w-[600px] mx-auto mt-10">
        <div className="text-[4rem] mb-5">{'\u{1F3C6}'}</div>
        <h2 className="font-display text-[2rem] text-txt-primary font-bold m-0">Acoustic Waveform Logged</h2>
        <p className="text-txt-secondary text-base mt-3 mb-9">Session parameters successfully integrated into your profile logs.</p>
        <button className="btn-primary px-9 py-3.5" onClick={restart}>Begin New Cycle {'\u21BA'}</button>
      </div>
    );
  }

  return (
    <div>
      <div className="module-header" style={{ marginBottom: '36px', paddingBottom: '24px', borderBottom: '1px solid rgb(61,49,36,0.12)' }}>
        <div style={{ color: '#c0805a', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', fontSize: '0.78rem' }}>
          {'\u{1F30A}'} Module 04 &nbsp;·&nbsp; Advanced Bio-Acoustics
        </div>
        <h2 className="font-display text-[2.4rem] text-txt-primary font-bold mt-1.5">Soundlull Care Engine</h2>
      </div>

      {step === STEPS.MOOD && renderMoodStep()}
      {step === STEPS.INTENSITY && renderIntensityStep()}
      {step === STEPS.DURATION && renderDurationStep()}
      {step === STEPS.LOADING && renderLoadingStep()}
      {step === STEPS.PLAYER && renderPlayerStep()}
      {step === STEPS.FEEDBACK && renderFeedbackStep()}
      {step === STEPS.COMPLETE && renderCompleteStep()}
    </div>
  );
}
