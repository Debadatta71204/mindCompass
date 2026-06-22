import { useState, useRef, useEffect, useCallback } from 'react';
import { useTrack } from '../../contexts/TrackContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { MUSIC_TRACKS, TRACK_META, WELCOME_MESSAGES } from '../../data/companion';
import { sendCompanionMessage, sendVoiceMessage } from '../../utils/api';
import { simpleMarkdown } from '../../utils/markdown';
import { useVoiceRecorder } from '../../hooks/useVoiceRecorder';
import { Music, MessageCircle, Mic, MicOff, AlertTriangle } from 'lucide-react';

export default function CompanionView() {
  const { currentDisorder } = useTrack();
  const { currentLanguage } = useLanguage();
  const disorder = currentDisorder?.toLowerCase() || 'mci';
  const tracks = MUSIC_TRACKS[disorder] || MUSIC_TRACKS.mci;
  const meta = TRACK_META[disorder] || TRACK_META.mci;
  const welcome = WELCOME_MESSAGES[disorder] || WELCOME_MESSAGES.mci;

  const [messages, setMessages] = useState([{ role: 'ai', content: welcome }]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatLogRef = useRef(null);
  const inputRef = useRef(null);

  const { isRecording, isSupported, error: micError, startRecording, stopRecording } = useVoiceRecorder();

  useEffect(() => {
    if (chatLogRef.current) {
      chatLogRef.current.scrollTop = chatLogRef.current.scrollHeight;
    }
  }, [messages]);

  async function handleSend() {
    const text = input.trim();
    if (!text || loading) return;

    setInput('');
    setMessages((prev) => [...prev, { role: 'user', content: text }]);
    setLoading(true);

    try {
      const data = await sendCompanionMessage(text, disorder, currentLanguage);
      setMessages((prev) => [...prev, { role: 'ai', content: data.reply || "I'm here with you. Could you tell me a little more?" }]);
    } catch (error) {
      let errorMsg;
      if (error.message?.includes('fetch') || error.message?.includes('Failed to fetch') || error.name === 'TypeError') {
        errorMsg = '<strong>Connection Error:</strong> Could not reach the MindCompass backend.<br>Please ensure the FastAPI server is running:<br><code style="color:#a86e4a;font-size:0.78rem;">cd backend &amp;&amp; uvicorn main:app --reload</code>';
      } else {
        errorMsg = `<strong>Error:</strong> ${error.message?.replace(/</g, '&lt;') || 'Unknown error'}`;
      }
      setMessages((prev) => [...prev, { role: 'ai', content: errorMsg, isError: true }]);
    }

    setLoading(false);
    setTimeout(() => inputRef.current?.focus(), 100);
  }

  async function handleVoiceToggle() {
    if (isRecording) {
      const blob = await stopRecording();
      if (!blob) return;

      setMessages((prev) => [...prev, { role: 'user', content: '[Voice] Voice message' }]);
      setLoading(true);

      try {
        const data = await sendVoiceMessage(blob, disorder, currentLanguage);
        setMessages((prev) => [...prev, { role: 'ai', content: data.reply || "I'm here with you. Could you tell me a little more?" }]);
      } catch (error) {
        let errorMsg;
        if (error.message?.includes('fetch') || error.message?.includes('Failed to fetch') || error.name === 'TypeError') {
          errorMsg = '<strong>Connection Error:</strong> Could not reach the MindCompass backend.<br>Please ensure the FastAPI server is running:<br><code style="color:#a86e4a;font-size:0.78rem;">cd backend &amp;&amp; uvicorn main:app --reload</code>';
        } else {
          errorMsg = `<strong>Error:</strong> ${error.message?.replace(/</g, '&lt;') || 'Unknown error'}`;
        }
        setMessages((prev) => [...prev, { role: 'ai', content: errorMsg, isError: true }]);
      }

      setLoading(false);
    } else {
      await startRecording();
    }
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  function handleInput(e) {
    setInput(e.target.value);
    e.target.style.height = 'auto';
    e.target.style.height = Math.min(e.target.scrollHeight, 100) + 'px';
  }

  return (
    <div>
      <div className="module-header">
        <div className="module-eyebrow">{meta.icon} Module 2 &nbsp;·&nbsp; {meta.label} Track</div>
        <h2 className="module-title">Creative Wellness Hub</h2>
        <p className="module-subtitle">
          Music therapy streams selected for your informational track, alongside an AI companion
          chat for creative and cognitive wellness activities.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        {/* Music Column */}
        <div>
          <div className="text-[0.75rem] tracking-[0.1em] uppercase text-emerald-mid font-semibold mb-3 flex items-center gap-1.5">
            <Music size={14} /> Recommended Streams
          </div>

          {tracks.map((track) => (
            <div key={track.id} className="bg-obsidian-card border border-black/5 rounded-lg overflow-hidden mb-4">
              <div className="px-4 py-[0.6rem] text-[0.78rem] font-semibold text-txt-secondary flex items-center gap-1.5">
                <span>{track.icon}</span>
                <span>{track.title}</span>
                <span className="text-txt-muted font-normal text-[0.72rem] ml-auto">Music Therapy</span>
              </div>
              <p className="text-[0.72rem] text-txt-muted px-4 pb-[0.6rem] leading-relaxed">{track.desc}</p>
              <div className="relative w-full pb-[56.25%] h-0 overflow-hidden bg-black">
                <iframe
                  className="absolute top-0 left-0 w-full h-full border-none"
                  src={`https://www.youtube.com/embed/${track.id}?rel=0&modestbranding=1`}
                  title={`${track.title} — Music Therapy Stream`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
            </div>
          ))}

          <div className="text-[0.72rem] text-txt-muted mt-2 leading-relaxed">
            These streams are curated for informational support. Music therapy is a complementary
            wellness activity and does not replace professional clinical intervention.
          </div>
        </div>

        {/* Chat Column */}
        <div>
          <div className="text-[0.75rem] tracking-[0.1em] uppercase text-emerald-mid font-semibold mb-3 flex items-center gap-1.5">
            <MessageCircle size={14} /> AI Companion Chat
          </div>

          <div className="bg-obsidian-card border border-black/5 rounded-lg flex flex-col h-[580px] overflow-hidden">
            <div ref={chatLogRef} className="flex-1 overflow-y-auto p-5 flex flex-col gap-4 scroll-smooth">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`max-w-[82%] px-4 py-3 rounded-md text-[0.85rem] leading-relaxed break-words ${
                    msg.role === 'user'
                      ? 'self-end bg-emerald-glow border border-[rgba(192,128,90,0.3)] text-txt-primary rounded-br-[4px]'
                      : msg.isError
                      ? 'self-start border border-danger-border rounded-bl-[4px]'
                      : 'self-start bg-obsidian-panel border border-black/5 text-txt-primary rounded-bl-[4px]'
                  }`}
                  style={msg.isError ? { background: 'rgba(196,69,69,0.08)', color: '#c44545' } : {}}
                >
                  {msg.role === 'ai' && (
                    <div className="text-[0.68rem] tracking-[0.1em] uppercase text-emerald-mid font-semibold mb-[0.3rem]">
                      MindCompass AI
                    </div>
                  )}
                  <div dangerouslySetInnerHTML={{ __html: msg.role === 'ai' && !msg.isError ? simpleMarkdown(msg.content) : msg.content }} />
                </div>
              ))}

              {loading && (
                <div className="chat-bubble ai loading self-start bg-obsidian-panel border border-black/5 text-txt-primary rounded-bl-[4px] max-w-[82%] px-4 py-3 rounded-md">
                  <div className="text-[0.68rem] tracking-[0.1em] uppercase text-emerald-mid font-semibold mb-[0.3rem]">
                    MindCompass AI
                  </div>
                  <div className="flex gap-1">
                    {[0, 1, 2].map((i) => (
                      <div key={i} className="w-[7px] h-[7px] rounded-full bg-emerald-mid animate-bounce"
                        style={{ animationDelay: `${i * 0.15}s` }} />
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="text-[0.68rem] text-txt-muted text-center tracking-[0.02em] py-2 px-4 border-y border-black/5 flex items-center justify-center gap-1">
              <AlertTriangle size={12} /> AI responses are informational only &nbsp;·&nbsp; Not a clinical tool &nbsp;·&nbsp; No medical advice
            </div>

            <div className="border-t border-black/5 p-3.5 flex gap-2.5 items-end">
              {isSupported && (
                <button
                  onClick={handleVoiceToggle}
                  disabled={loading}
                  className={`flex-shrink-0 w-[40px] h-[40px] rounded-md flex items-center justify-center text-lg transition-all duration-200 ${
                    isRecording
                      ? 'bg-[rgba(196,69,69,0.12)] text-[#c44545] animate-pulse border border-[rgba(196,69,69,0.3)]'
                      : 'bg-obsidian-input border border-black/10 text-txt-muted hover:border-emerald-bright hover:text-emerald-bright'
                  } disabled:opacity-40 disabled:cursor-not-allowed`}
                  title={isRecording ? 'Stop recording' : 'Start recording'}
                  aria-label={isRecording ? 'Stop recording' : 'Start recording'}
                >
                  {isRecording ? <MicOff size={18} /> : <Mic size={18} />}
                </button>
              )}

              {isRecording ? (
                <div className="flex-1 bg-obsidian-input border border-[rgba(196,69,69,0.3)] rounded-md text-[#c44545] text-[0.88rem] px-3.5 py-[0.65rem] min-h-[40px] flex items-center gap-2">
                  <span className="w-[8px] h-[8px] rounded-full bg-[#c44545] animate-pulse" />
                  <span>Listening...</span>
                </div>
              ) : (
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={handleInput}
                  onKeyDown={handleKeyDown}
                  placeholder="Type a message\u2026"
                  rows={1}
                  maxLength={600}
                  disabled={loading}
                  className="flex-1 bg-obsidian-input border border-black/10 rounded-md text-txt-primary text-[0.88rem] px-3.5 py-[0.65rem] resize-none min-h-[40px] max-h-[100px] outline-none transition-all focus:border-emerald-bright placeholder:text-txt-muted leading-relaxed"
                />
              )}

              {!isRecording && (
                <button
                  onClick={handleSend}
                  disabled={loading || !input.trim()}
                  className="px-[1.1rem] py-[0.65rem] rounded-md bg-emerald-bright text-white font-bold text-[0.82rem] transition-all flex-shrink-0 hover:bg-emerald-mid disabled:bg-emerald-dim disabled:cursor-not-allowed whitespace-nowrap"
                >
                  Send
                </button>
              )}
            </div>
          </div>

          <p className="text-[0.68rem] text-txt-muted mt-2 leading-relaxed">
            Powered by Google Gemini (gemini-2.5-flash) via local backend.
            Ensure the FastAPI backend is running at <code className="text-emerald-mid">http://127.0.0.1:8000</code>.
          </p>
        </div>
      </div>
    </div>
  );
}
