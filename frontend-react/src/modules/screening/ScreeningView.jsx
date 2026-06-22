import { useState } from 'react';
import { useTrack } from '../../contexts/TrackContext';
import { QUESTIONS, getScoreProfile, TRACK_META } from '../../data/screening';

export default function ScreeningView() {
  const { currentDisorder } = useTrack();
  const disorder = currentDisorder?.toLowerCase() || 'mci';
  const questions = QUESTIONS[disorder] || QUESTIONS.mci;
  const meta = TRACK_META[disorder] || TRACK_META.mci;

  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const [result, setResult] = useState(null);
  const [validationError, setValidationError] = useState('');

  function handleSelect(qIndex, value) {
    const newAnswers = [...answers];
    newAnswers[qIndex] = value;
    setAnswers(newAnswers);
    setValidationError('');
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (answers.some((a) => a === null)) {
      setValidationError('Please answer all 5 questions before submitting.');
      setTimeout(() => setValidationError(''), 4000);
      return;
    }

    const totalScore = answers.reduce((sum, val) => sum + val, 0);
    const perQuestion = questions.map((q, i) => ({ domain: q.domain, score: answers[i] }));
    const profile = getScoreProfile(totalScore, disorder);

    setResult({ totalScore, perQuestion, profile });
  }

  function handleReset() {
    setAnswers(Array(questions.length).fill(null));
    setResult(null);
    setValidationError('');
  }

  return (
    <div>
      <div className="module-header">
        <div className="module-eyebrow">Module 1 &nbsp;·&nbsp; {meta.label} Track</div>
        <h2 className="module-title">Informational Screening Check-In</h2>
        <p className="module-subtitle">
          Answer honestly based on your own observations or those of a trusted caregiver.
          This is a 5-question informational self-report tool, not a clinical assessment.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="max-w-[700px]" noValidate>
        {questions.map((q, i) => (
          <div
            key={i}
            className="bg-obsidian-card border border-black/5 rounded-lg p-6 mb-4 transition-all duration-200 focus-within:border-[rgba(192,128,90,0.3)]"
            style={answers[i] === null && validationError ? { borderColor: '#c44545' } : {}}
          >
            <div className="text-[0.68rem] tracking-[0.1em] uppercase text-emerald-mid font-semibold mb-1.5">
              Question {i + 1} of 5 &nbsp;·&nbsp; {q.domain}
            </div>
            <p className="text-[0.92rem] font-medium text-txt-primary mb-4 leading-relaxed">{q.text}</p>
            <div className="flex gap-3 flex-wrap">
              {[
                { value: 0, label: 'Never / Rarely' },
                { value: 1, label: 'Sometimes' },
                { value: 2, label: 'Frequently' },
              ].map((opt) => (
                <label
                  key={opt.value}
                  className={`flex items-center gap-2 px-4 py-[0.45rem] rounded-full border text-[0.82rem] cursor-pointer transition-all duration-200 ${
                    answers[i] === opt.value
                      ? 'border-emerald-bright bg-emerald-glow text-emerald-bright font-semibold'
                      : 'border-black/10 bg-obsidian-input text-txt-secondary hover:border-[rgba(192,128,90,0.3)] hover:text-txt-primary hover:bg-obsidian-panel'
                  }`}
                >
                  <input
                    type="radio"
                    name={`q${i}`}
                    value={opt.value}
                    checked={answers[i] === opt.value}
                    onChange={() => handleSelect(i, opt.value)}
                    className="accent-emerald-bright"
                  />
                  {opt.label}
                </label>
              ))}
            </div>
          </div>
        ))}

        <div className="clinical-warning-box">
          <p className="text-[0.85rem] text-danger-red font-semibold leading-relaxed">
            Warning: This informational screening tool does not verify or diagnose conditions.
            These signs suggest professional evaluation may be beneficial if you have concerns.
            All responses are processed locally and are not stored or transmitted.
          </p>
        </div>

        {validationError && (
          <p className="text-danger-red text-[0.85rem] font-semibold mt-2">{validationError}</p>
        )}

        <button type="submit" className="btn-primary mt-6">
          Submit &amp; View Profile {'\u2192'}
        </button>
      </form>

      {result && (
        <div className="mt-6">
          <div className="bg-obsidian-card border border-black/5 rounded-lg p-6">
            <div className="flex items-end gap-4 mb-4">
              <div>
                <div className="font-display text-[3rem] font-bold text-emerald-bright leading-none">
                  {result.totalScore}<span className="text-[1.25rem] opacity-50">/10</span>
                </div>
                <div className="text-[0.8rem] text-txt-muted mt-1 tracking-[0.05em]">INFORMATIONAL PROFILE SCORE</div>
              </div>
              <div className="bg-obsidian-panel border border-[rgba(192,128,90,0.3)] px-3.5 py-[0.35rem] rounded-full text-[0.78rem] font-bold text-emerald-bright mb-[0.6rem]">
                {result.profile.label}
              </div>
            </div>

            <div className="flex gap-2 mb-5 items-end">
              {result.perQuestion.map((q, i) => {
                const pct = (q.score / 2) * 100;
                const colour = q.score === 0 ? '#b8a494' : q.score === 1 ? '#d4a860' : '#c44545';
                return (
                  <div key={i} className="flex-1 flex flex-col gap-1 items-center">
                    <div className="w-full h-1.5 bg-obsidian-input rounded-[3px] overflow-hidden">
                      <div className="h-full rounded-[3px] transition-[width] duration-[0.6s]" style={{ width: `${pct}%`, background: colour }} />
                    </div>
                    <span className="text-[0.62rem] text-txt-muted text-center tracking-[0.03em]">{q.domain}</span>
                  </div>
                );
              })}
            </div>

            <p className="text-[0.9rem] text-txt-secondary leading-relaxed">{result.profile.description}</p>

            <div className="clinical-warning-box mt-5">
              <p className="text-[0.85rem] text-danger-red font-semibold leading-relaxed">
                <strong>Clinical Boundary Notice:</strong> This informational screening tool does not verify
                or diagnose conditions. These signs suggest professional evaluation may be beneficial if
                you have concerns. Please consult a qualified healthcare professional for any clinical assessment.
              </p>
            </div>

            <button className="btn-secondary mt-5" onClick={handleReset}>
              Reset & Try Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
