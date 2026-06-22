import { useTrack } from '../contexts/TrackContext';
import { theme } from '../theme';
import { Hexagon } from 'lucide-react';

const TRACK_LABELS = {
  dementia: 'Dementia / Major NCD',
  adhd: 'ADHD',
  mci: 'MCI',
};

export default function AppHeader() {
  const { currentDisorder } = useTrack();

  return (
    <header className="fixed top-10 left-0 right-0 z-[900] h-header bg-obsidian-surface border-b border-black/5 flex items-center justify-between px-6"
      style={{ backdropFilter: 'blur(12px)' }}>
      <div className="flex items-center gap-3">
        <Hexagon size={22} className="text-emerald-bright" fill={theme.accentGlow} strokeWidth={1.5}
          style={{ filter: `drop-shadow(0 0 12px ${theme.accentGlowLg})` }} />
        <span className="font-display text-[1.05rem] font-bold text-txt-primary tracking-[-0.01em]">MindCompass</span>
        <span className="text-[0.72rem] font-semibold px-[0.7rem] py-[0.2rem] rounded-full bg-emerald-glow border border-emerald-glow/30 text-emerald-mid tracking-[0.04em]">
          {TRACK_LABELS[currentDisorder] || '\u2014'}
        </span>
      </div>
      <div className="text-[0.7rem] text-[#c44545] tracking-[0.03em]">
        Academic Informational Prototype — Not a clinical tool
      </div>
    </header>
  );
}
