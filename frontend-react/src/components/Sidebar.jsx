import { NavLink, useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useTrack } from '../contexts/TrackContext';
import { theme } from '../theme';

const NAV_ITEMS = [
  { id: 'home', label: 'Home', sub: 'Reset Track', icon: '' },
  { id: 'screening', label: 'Module 1', sub: 'Screening Check-In', icon: '' },
  { id: 'companion', label: 'Module 2', sub: 'Creative Wellness Hub', icon: '' },
  { id: 'education', label: 'Module 3', sub: 'Caregiver Support', icon: '' },
  { id: 'soundlull', label: 'Module 4', sub: 'Soundlull Therapy', icon: '' },
];

export default function Sidebar() {
  const { currentLanguage, setCurrentLanguage } = useLanguage();
  const { setCurrentDisorder, currentDisorder } = useTrack();
  const navigate = useNavigate();

  function handleHomeClick(e) {
    e.preventDefault();
    setCurrentDisorder(null);
    setCurrentLanguage('en');
    navigate('/');
  }

  return (
    <nav className="w-sidebar flex-shrink-0 bg-obsidian-surface border-r border-black/5 py-5 px-3 flex flex-col gap-1 sticky top-[calc(2.5rem+3.5rem)] h-[calc(100vh-2.5rem-3.5rem)] overflow-y-auto">
      <div className="text-[0.62rem] tracking-[0.12em] uppercase text-txt-muted px-3 py-1 font-semibold">
        NAVIGATION
      </div>

      <div className="px-3 py-3 mb-3.5 mx-1 rounded-lg border border-black/10 flex flex-col gap-2"
        style={{ background: theme.borderSubtle }}>
        <label className="text-[0.8rem] text-txt-secondary font-medium tracking-[0.05em] flex items-center gap-1.5">
          Lang / ভাষা:
        </label>
        <select
          value={currentLanguage}
          onChange={(e) => setCurrentLanguage(e.target.value)}
          className="w-full bg-obsidian-input text-txt-primary border border-emerald-glow/30 py-2 px-3 rounded-md cursor-pointer font-body text-[0.85rem] outline-none transition-all focus:border-emerald-mid focus:shadow-[0_0_4px_rgba(192,128,90,0.2)]"
        >
          <option value="en">English</option>
          <option value="bn">বাংলা (Bengali)</option>
          <option value="hi">हिन्दी (Hindi)</option>
          <option value="ta">தமிழ் (Tamil)</option>
          <option value="te">తెలుగు (Telugu)</option>
          <option value="kn">ಕನ್ನಡ (Kannada)</option>
          <option value="or">ଓଡ଼ିଆ (Odia)</option>
        </select>
      </div>

      <div className="text-[0.62rem] tracking-[0.12em] uppercase text-txt-muted px-3 py-1 mt-6 font-semibold">
        MODULES
      </div>

      {NAV_ITEMS.map((item) => {
        if (item.id === 'home') {
          return (
            <a
              key={item.id}
              href="/"
              onClick={handleHomeClick}
              className="block py-[0.65rem] px-3 rounded-md text-txt-secondary text-[0.85rem] font-medium transition-all duration-200 text-left w-full hover:bg-obsidian-panel hover:text-txt-primary hover:no-underline no-underline"
            >
              <span>{item.label}</span>
              <span className="block text-[0.68rem] text-txt-muted font-normal">{item.sub}</span>
            </a>
          );
        }

        return (
          <NavLink
            key={item.id}
            to={`/app/${item.id}`}
            className={({ isActive }) =>
              `block py-[0.65rem] px-3 rounded-md text-txt-secondary text-[0.85rem] font-medium transition-all duration-200 text-left w-full hover:bg-obsidian-panel hover:text-txt-primary hover:no-underline no-underline ${
                isActive ? '!text-emerald-mid !border !border-emerald-glow/30 bg-emerald-glow' : ''
              }`
            }
          >
            <span>{item.label}</span>
            <span className="block text-[0.68rem] text-txt-muted font-normal">{item.sub}</span>
          </NavLink>
        );
      })}

      <div className="mt-auto pt-4 px-3 border-t border-black/5 text-[0.65rem] text-txt-muted leading-relaxed tracking-[0.02em]">
        <p>DSM-5 Framework</p>
        <p>Non-Clinical Use Only</p>
      </div>
    </nav>
  );
}
