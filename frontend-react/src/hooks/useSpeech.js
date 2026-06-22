import { useCallback } from 'react';

const LOCALE_MAP = {
  en: 'en-US', bn: 'bn-IN', hi: 'hi-IN',
  ta: 'ta-IN', te: 'te-IN', kn: 'kn-IN', or: 'or-IN',
};

export function useSpeech() {
  const speak = useCallback((text, languageCode) => {
    if (!window.speechSynthesis) return;

    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
    }

    const cleanText = text.replace(/<\/?[^>]+(>|$)/g, '');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = LOCALE_MAP[languageCode] || 'en-US';

    const voices = window.speechSynthesis.getVoices();
    const matchedVoice = voices.find((v) => v.lang.startsWith(utterance.lang));
    if (matchedVoice) utterance.voice = matchedVoice;

    window.speechSynthesis.speak(utterance);
  }, []);

  return { speak };
}
