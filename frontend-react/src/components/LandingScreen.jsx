import { useState, startTransition } from 'react';
import { useTrack } from '../contexts/TrackContext';
import { useNavigate } from 'react-router-dom';
import { theme } from '../theme';
import { Brain, Zap, Sprout, Hexagon, ArrowRight } from 'lucide-react';

const TRACKS = [
  {
    id: 'dementia',
    Icon: Brain,
    badge: 'DSM-5 \u2014 Major NCD',
    title: 'Dementia / Major NCD',
    desc: 'Informational support covering memory, language, and executive function changes. Includes Reminiscence Therapy resources and caregiver referral pathways.',
    tags: ['Memory', 'Language', 'Executive Function'],
  },
  {
    id: 'adhd',
    Icon: Zap,
    badge: 'DSM-5 \u2014 Neurodevelopmental',
    title: 'ADHD',
    desc: 'Informational support for attention, hyperactivity, and impulsivity patterns. Includes focus-based music therapy and structured learning accommodations.',
    tags: ['Inattention', 'Hyperactivity', 'Impulsivity'],
  },
  {
    id: 'mci',
    Icon: Sprout,
    badge: 'DSM-5 \u2014 Mild NCD',
    title: 'Mild Cognitive Impairment (MCI)',
    desc: 'Informational support distinguishing normal aging from MCI. Includes Cognitive Stimulation Therapy activities and professional consultation guidance.',
    tags: ['Episodic Memory', 'Processing Speed', 'Preserved Independence'],
  },
];

const TRACK_LABELS = {
  dementia: 'Dementia / Major NCD',
  adhd: 'ADHD',
  mci: 'MCI',
};

export default function LandingScreen() {
  const { setCurrentDisorder } = useTrack();
  const navigate = useNavigate();

  const [navigating, setNavigating] = useState(false);

  function selectTrack(disorder) {
    if (navigating) return;
    startTransition(() => {
      setCurrentDisorder(disorder);
      setNavigating(true);
      navigate('/app/home');
    });
  }

  return (
    <div className="min-h-screen flex items-center justify-center pt-[calc(2.5rem+2rem)] pb-8 px-8"
      style={{ background: `radial-gradient(ellipse 80% 60% at 50% 0%, ${theme.accentGlow} 0%, transparent 70%), ${theme.bg}` }}>
      <div className="max-w-[1100px] w-full flex flex-col items-center gap-10">
        <div className="text-center page-enter">
          <Hexagon size={48} className="text-emerald-bright block mx-auto mb-2" fill={theme.accentGlow}
            style={{ filter: 'drop-shadow(0 0 18px rgba(192,128,90,0.55))' }} />
          <h1 className="font-display text-[3rem] font-bold tracking-[-0.03em] text-txt-primary leading-none">
            MindCompass
          </h1>
          <p className="text-[0.85rem] text-emerald-mid tracking-[0.12em] uppercase mt-2 font-medium">
            DSM-5 Academic Cognitive Wellness Dashboard
          </p>
          <p className="text-base text-txt-secondary mt-5">Select your informational track to continue</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full">
          {TRACKS.map((track, idx) => (
            <button
              key={track.id}
              onClick={() => selectTrack(track.id)}
              className={`relative bg-obsidian-card border border-black/5 rounded-xl p-8 text-left flex flex-col gap-3 overflow-hidden transition-all duration-200 hover:border-emerald-bright hover:bg-obsidian-card-hover hover:-translate-y-[3px] page-enter stagger-${idx + 1}`}
              style={{ boxShadow: 'none' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = `0 12px 40px ${theme.accentGlow}, 0 0 0 1px ${theme.accentBorder}`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div className="absolute inset-0 rounded-xl bg-emerald-glow opacity-0 transition-opacity duration-200"
                style={{ opacity: 0 }}
                onMouseEnter={(e) => { e.currentTarget.style.opacity = '1'; }}
                onMouseLeave={(e) => { e.currentTarget.style.opacity = '0'; }}
              />
              <track.Icon size={32} className="text-emerald-bright block mb-1" />
              <span className="text-[0.68rem] tracking-[0.1em] uppercase text-emerald-mid font-semibold">{track.badge}</span>
              <h2 className="font-display text-[1.5rem] font-bold text-txt-primary leading-tight">{track.title.replace('/ Major NCD', '/\nMajor NCD')}</h2>
              <p className="text-[0.85rem] text-txt-secondary leading-relaxed flex-1">{track.desc}</p>
              <div className="flex flex-wrap gap-1.5 mt-1">
                {track.tags.map((tag) => <span key={tag} className="tag">{tag}</span>)}
              </div>
              <span className="text-[0.82rem] font-semibold text-emerald-bright mt-2 tracking-[0.03em] inline-flex items-center gap-1">
                Enter Track <ArrowRight size={14} />
              </span>
            </button>
          ))}
        </div>

        <p className="text-[0.72rem] text-txt-muted text-center tracking-[0.02em]">
          Built as a B.Tech Computer Science academic project &nbsp;|&nbsp; DSM-5 framework reference &nbsp;|&nbsp; Non-clinical informational use only
        </p>
      </div>
    </div>
  );
}
