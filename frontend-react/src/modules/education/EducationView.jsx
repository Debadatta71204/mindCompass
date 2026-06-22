import { useEffect, useRef } from 'react';
import { useTrack } from '../../contexts/TrackContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { EDUCATION_DATA } from '../../data/education';
import { useSpeech } from '../../hooks/useSpeech';

const TRACK_ICONS = {
  dementia: '',
  adhd: '',
  mci: '',
};

export default function EducationView() {
  const { currentDisorder } = useTrack();
  const { currentLanguage } = useLanguage();
  const { speak } = useSpeech();
  const containerRef = useRef(null);

  const disorder = currentDisorder?.toLowerCase() || 'mci';
  const trackIcon = TRACK_ICONS[disorder] || '';
  const trackData = EDUCATION_DATA[disorder];

  useEffect(() => {
    if (!containerRef.current) return;
    const buttons = containerRef.current.querySelectorAll('.speaker-btn');
    buttons.forEach((btn) => {
      const handler = (e) => {
        e.stopPropagation();
        speak(btn.getAttribute('data-text'), currentLanguage);
      };
      btn.addEventListener('click', handler);
      btn._handler = handler;
    });
    return () => {
      buttons.forEach((btn) => {
        if (btn._handler) btn.removeEventListener('click', btn._handler);
      });
    };
  }, [currentLanguage, speak, trackData]);

  if (!trackData || !trackData[currentLanguage]) {
    return (
      <div>
        <div className="module-header">
          <div className="module-eyebrow">{trackIcon} Module 3 &nbsp;·&nbsp; {disorder.toUpperCase()} Track</div>
          <h2 className="module-title">Caregiver Support &amp; Psychoeducation</h2>
        </div>
        <p className="text-danger-red">Disorder data or selected language translation not found.</p>
      </div>
    );
  }

  const data = trackData[currentLanguage];

  return (
    <div ref={containerRef}>
      <div className="module-header">
        <div className="module-eyebrow">{trackIcon} Module 3 &nbsp;·&nbsp; {disorder.toUpperCase()} Track</div>
        <h2 className="module-title">
          {data.title}
          <button className="speaker-btn bg-transparent border-none cursor-pointer text-[1.15rem] ml-2 p-1 px-1.5 rounded-md inline-flex items-center justify-center transition-all hover:bg-white/5 hover:scale-[1.18] active:scale-[0.92] align-middle"
            data-text={data.title}>
            [Speak]
          </button>
        </h2>
        <p className="module-subtitle">
          DSM-5 aligned informational content to help you understand the cognitive domain,
          relevant support strategies, and appropriate professional referral pathways.
        </p>
      </div>

      <div className="max-w-[860px]">
        {data.sections.map((section, i) => (
          <section key={i} className="bg-obsidian-card border border-black/5 rounded-lg p-7 mb-5">
            <div className="text-[0.68rem] tracking-[0.12em] uppercase text-emerald-mid font-semibold mb-2">{section.eyebrow}</div>
            <h3 className="font-display text-[1.15rem] font-bold text-txt-primary mb-3 tracking-[-0.01em]">
              {section.title}
              <button className="speaker-btn bg-transparent border-none cursor-pointer text-[1.15rem] ml-2 p-1 px-1.5 rounded-md inline-flex items-center justify-center transition-all hover:bg-white/5 hover:scale-[1.18] active:scale-[0.92] align-middle"
                data-text={section.title}>
                [Speak]
              </button>
            </h3>
            <div className="text-[0.88rem] text-txt-secondary leading-relaxed">
              <div dangerouslySetInnerHTML={{ __html: section.body }} />
              <button className="speaker-btn bg-transparent border-none cursor-pointer text-[1.15rem] ml-2 p-1 px-1.5 rounded-md inline-flex items-center justify-center transition-all hover:bg-white/5 hover:scale-[1.18] active:scale-[0.92] align-middle"
                data-text={section.body}>
                [Speak]
              </button>
            </div>

            {section.pathway && (
              <div className="mt-4 bg-obsidian-panel border border-[rgba(192,128,90,0.3)] rounded-md p-4">
                <div className="text-[0.78rem] tracking-[0.08em] uppercase text-emerald-bright font-bold mb-2">
                  Recommended Consultation Pathways
                </div>
                <div className="text-[0.88rem] text-txt-secondary leading-relaxed pt-2.5">
                  {section.pathway}
                  <button className="speaker-btn bg-transparent border-none cursor-pointer text-[1.15rem] ml-2 p-1 px-1.5 rounded-md inline-flex items-center justify-center transition-all hover:bg-white/5 hover:scale-[1.18] active:scale-[0.92] align-middle"
                    data-text={section.pathway}>
                    [Speak]
                  </button>
                </div>
              </div>
            )}
          </section>
        ))}

        <div className="mt-6 bg-danger-bg border border-danger-border rounded-md p-4 text-[0.82rem] text-[#c44545] leading-relaxed">
          <strong className="text-danger-red">Warning: Academic Informational Prototype — Critical Disclaimer:</strong>
          {' '}All content in this module is for educational and informational purposes only, produced as a
          student academic project. It does not constitute clinical advice, professional opinion, medical
          recommendation, or a clinical diagnosis. The content references the DSM-5 framework for
          academic context only. Nothing on this platform should be used as a substitute for professional
          clinical assessment, diagnosis, or treatment. If you have any concerns about your cognitive
          health or that of someone you support, please consult a qualified healthcare professional promptly.
          In the event of an emergency, contact your local emergency services immediately.
        </div>
      </div>
    </div>
  );
}
