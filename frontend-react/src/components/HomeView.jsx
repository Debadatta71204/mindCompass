import { useNavigate } from 'react-router-dom';
import { useTrack } from '../contexts/TrackContext';

const TRACK_LABELS = {
  dementia: 'Dementia / Major NCD',
  adhd: 'ADHD',
  mci: 'MCI',
};

const MODULE_TILES = [
  { id: 'screening', number: '01', name: 'Screening Check-In', blurb: 'A 5-question DSM-5 aligned informational self-check' },
  { id: 'companion', number: '02', name: 'Creative Wellness Hub', blurb: 'Music therapy streams + AI companion chat' },
  { id: 'education', number: '03', name: 'Caregiver Support', blurb: 'DSM-5 psychoeducation & referral pathways' },
  { id: 'soundlull', number: '04', name: 'Soundlull Therapy', blurb: 'Custom wizard-driven ambient soundscape player' },
];

export default function HomeView() {
  const { currentDisorder, setCurrentDisorder } = useTrack();
  const navigate = useNavigate();

  const label = TRACK_LABELS[currentDisorder] || '';
  const desc =
    currentDisorder === 'dementia' ? 'Navigate the modules below. All content is specific to the Dementia / Major NCD informational track.' :
    currentDisorder === 'adhd' ? 'Navigate the modules below. All content is specific to the ADHD informational track.' :
    currentDisorder === 'mci' ? 'Navigate the modules below. All content is specific to the Mild Cognitive Impairment (MCI) informational track.' :
    'Your track has been loaded. Use the sidebar to navigate the four informational modules.';

  function goBackToLanding() {
    setCurrentDisorder(null);
    navigate('/');
  }

  return (
    <div className="max-w-[800px] mx-auto text-center">
      <h2 className="font-display text-[2rem] font-bold text-txt-primary tracking-[-0.02em] mb-3">
        Welcome — {label} Track
      </h2>
      <p className="text-txt-secondary text-[0.95rem] max-w-[560px] mx-auto mb-8 leading-relaxed">
        {desc}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        {MODULE_TILES.map((m, idx) => (
          <button
            key={m.id}
            onClick={() => navigate(`/app/${m.id}`)}
            className={`home-module-tile page-enter stagger-${idx + 1}`}
          >
            <div className="font-display text-[1.75rem] font-bold text-emerald-mid opacity-60 leading-none mb-1.5">
              {m.number}
            </div>
            <div className="text-[0.88rem] font-semibold text-txt-primary mb-1">{m.name}</div>
            <div className="text-[0.75rem] text-txt-secondary leading-relaxed">{m.blurb}</div>
          </button>
        ))}
      </div>

      <button className="btn-secondary" onClick={goBackToLanding}>
        {'\u2190'} Change Track
      </button>
    </div>
  );
}
