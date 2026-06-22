export const MOOD_INTENSITY_MAP = {
  calm: {
    low: { searchQuery: 'ambient calm', targetTags: ['meditation', 'healing', 'soft'] },
    high: { searchQuery: 'meditation ambient', targetTags: ['healing', 'relaxation', 'calm'] },
  },
  focus: {
    low: { searchQuery: 'ambient focus instrumental', targetTags: ['focus', 'ambient', 'instrumental'] },
    high: { searchQuery: 'lofi study instrumental', targetTags: ['focus', 'lofi', 'study'] },
  },
  rest: {
    low: { searchQuery: 'ambient nature sleep', targetTags: ['sleep', 'nature', 'soft'] },
    high: { searchQuery: 'binaural sleep ambient', targetTags: ['sleep', 'binaural', 'deep'] },
  },
};

export const SOUNDLULL_CATALOG = {
  moods: [
    { id: 'calm', label: 'Deep Stillness', icon: '\u{1F30A}', desc: 'Settle an overactive mind with stabilizing low-frequency layers.' },
    { id: 'focus', label: 'Sustained Clarity', icon: '\u26A1', desc: 'Binaural audio structures curated to reinforce attention thresholds.' },
    { id: 'rest', label: 'Sleep & Recovery', icon: '\u{1F30C}', desc: 'Soft ambient configurations designed to lower cognitive strain.' },
  ],
  intensities: [
    { id: 'low', label: 'Gentle / Soft Background', level: 'Ambient Base', desc: 'Light, transparent background textures for passive grounding.' },
    { id: 'high', label: 'Deep / Immersive Focus', level: 'Full Binary Sync', desc: 'Immersive full-spectrum audio synchronization for active regulation.' },
  ],
  durations: [
    { mins: 5, label: '5 Minute Session' },
    { mins: 15, label: '15 Minute Session' },
    { mins: 30, label: '30 Minute Session' },
  ],
};
