import { useRef, useCallback, useState } from 'react';
import { MOOD_INTENSITY_MAP } from '../data/soundlull';

async function searchArchive(query) {
  try {
    const musicFilter = ' AND mediatype:audio AND (collection:opensource_audio OR collection:etree OR collection:audio_music OR genre:(electronic OR ambient OR instrumental OR meditation OR "new age") OR subject:(music OR song OR instrumental OR soundtrack))';
    const searchUrl = `https://archive.org/advancedsearch.php?q=${encodeURIComponent(query + musicFilter)}&fl[]=identifier,title&sort[]=downloads+desc&rows=30&page=1&output=json`;
    const res = await fetch(searchUrl);
    const data = await res.json();
    let docs = (data.response && data.response.docs) || [];
    const blockedTerms = ['podcast', 'interview', 'lecture', 'sermon', 'episode', 'broadcast', 'radio show', 'audiobook', 'reading', 'speech', 'talk', 'newscast'];
    docs = docs.filter((d) => {
      const t = (d.title || '').toLowerCase();
      return !blockedTerms.some((term) => t.includes(term));
    });
    return docs;
  } catch (e) {
    console.warn('Search archive error:', e);
    return [];
  }
}

async function fetchMetadata(identifier) {
  try {
    const res = await fetch(`https://archive.org/metadata/${identifier}`);
    return await res.json();
  } catch (e) {
    console.warn('Fetch metadata error:', e);
    return null;
  }
}

function loadCachedPlaylist(query) {
  const cacheKey = `soundlull_archive_${query.replace(/\s+/g, '_')}`;
  const cached = localStorage.getItem(cacheKey);
  if (cached) {
    try {
      const parsed = JSON.parse(cached);
      const CACHE_TTL = 24 * 60 * 60 * 1000;
      if (Date.now() - parsed.timestamp < CACHE_TTL) return parsed.playlist;
    } catch (e) {
      console.warn('Cache parsing error:', e);
    }
  }
  return null;
}

function cachePlaylist(query, plist) {
  const cacheKey = `soundlull_archive_${query.replace(/\s+/g, '_')}`;
  localStorage.setItem(cacheKey, JSON.stringify({ timestamp: Date.now(), playlist: plist }));
}

async function buildArchivePlaylist(query) {
  let docs = await searchArchive(query);
  if (docs.length < 5) {
    const simplifiedQuery = query.split(' ')[0] || 'ambient';
    const fallbackDocs = await searchArchive(simplifiedQuery);
    docs = [...docs, ...fallbackDocs];
  }
  const newPlaylist = [];
  const validFormats = ['MP3', 'VBR MP3', '128Kbps MP3', '64Kbps MP3'];
  for (let i = 0; i < docs.length; i++) {
    if (newPlaylist.length >= 20) break;
    const doc = docs[i];
    if (!doc.identifier) continue;
    const meta = await fetchMetadata(doc.identifier);
    if (!meta || !meta.files) continue;
    const mp3File = meta.files.find((f) => validFormats.includes(f.format));
    if (mp3File) {
      let duration = 300;
      if (mp3File.length && !isNaN(parseFloat(mp3File.length))) {
        duration = parseFloat(mp3File.length);
      } else if (meta.metadata && meta.metadata.length && !isNaN(parseFloat(meta.metadata.length))) {
        duration = parseFloat(meta.metadata.length);
      }
      newPlaylist.push({
        id: doc.identifier,
        title: (meta.metadata && meta.metadata.title) || doc.title || 'Unknown Audio Selection',
        url: `https://archive.org/download/${doc.identifier}/${mp3File.name}`,
        duration,
      });
    }
  }
  return newPlaylist;
}

async function fetchArchivePlaylist(query) {
  let plist = loadCachedPlaylist(query);
  if (plist && plist.length > 0) return plist;
  plist = await buildArchivePlaylist(query);
  if (plist.length > 0) cachePlaylist(query, plist);
  return plist;
}

export function useAudioPlayer() {
  const audioRef = useRef(null);
  const timerRef = useRef(null);
  const timeoutRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [track, setTrack] = useState(null);
  const [trackIndex, setTrackIndex] = useState(0);
  const [trackCount, setTrackCount] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(0);

  const formatTime = (secs) => {
    if (secs <= 0) return '00:00';
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const loadTrackInstance = useCallback((playlist, idx, onEnd, onError) => {
    clearTimeout(timeoutRef.current);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.onerror = null;
      audioRef.current.oncanplay = null;
      audioRef.current.src = '';
      audioRef.current = null;
    }

    const t = playlist[idx];
    if (!t) {
      onEnd();
      return;
    }

    const audio = new Audio(t.url);
    audioRef.current = audio;
    setTrack(t);
    setTrackIndex(idx);

    timeoutRef.current = setTimeout(() => {
      if (audio.readyState < 3) onError();
    }, 15000);

    audio.onerror = () => onError();
    audio.oncanplay = () => {
      clearTimeout(timeoutRef.current);
      audio.play().catch(() => {});
      setIsPlaying(true);
    };

    audio.addEventListener('timeupdate', () => {
      if (audio.duration) {
        const el = document.getElementById('player-progress-bar');
        if (el) el.style.width = `${(audio.currentTime / audio.duration) * 100}%`;
      }
    });

    audio.addEventListener('ended', () => {
      const nextIdx = idx + 1;
      if (nextIdx >= playlist.length) {
        onEnd();
      } else {
        loadTrackInstance(playlist, nextIdx, onEnd, onError);
      }
    });
  }, []);

  const buildPlaylist = useCallback(async (mood, intensity, durationMins) => {
    const intensityConfig = MOOD_INTENSITY_MAP[mood]?.[intensity] || { searchQuery: 'ambient' };
    const query = intensityConfig.searchQuery;
    const fullPlaylist = await fetchArchivePlaylist(query);
    if (!fullPlaylist || fullPlaylist.length === 0) return [];

    const playlist = [];
    let totalTargetSeconds = durationMins * 60;
    let accumulatedSeconds = 0;
    let safeguardLoop = 0;

    while (accumulatedSeconds < totalTargetSeconds && safeguardLoop < 15) {
      for (let i = 0; i < fullPlaylist.length; i++) {
        if (accumulatedSeconds >= totalTargetSeconds) break;
        playlist.push(fullPlaylist[i]);
        accumulatedSeconds += fullPlaylist[i].duration;
      }
      safeguardLoop++;
    }

    return playlist;
  }, []);

  const start = useCallback((playlist, onEnd, onError) => {
    setTrackCount(playlist.length);
    setTimeRemaining(playlist.reduce((a, t) => a + t.duration, 0));

    let failures = 0;
    const handleError = () => {
      clearTimeout(timeoutRef.current);
      failures++;
      if (failures >= playlist.length) {
        onEnd();
      } else {
        loadTrackInstance(playlist, trackIndex + 1, onEnd, handleError);
      }
    };

    loadTrackInstance(playlist, 0, onEnd, handleError);

    timerRef.current = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          stop();
          onEnd();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, [loadTrackInstance]);

  const toggle = useCallback(() => {
    if (!audioRef.current) return;
    if (audioRef.current.paused) {
      audioRef.current.play();
      setIsPlaying(true);
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  }, []);

  const shiftTrack = useCallback((dir, playlist, onEnd, onError) => {
    const nextIdx = trackIndex + dir;
    if (nextIdx >= playlist.length) {
      onEnd();
    } else if (nextIdx < 0) {
      loadTrackInstance(playlist, 0, onEnd, onError);
    } else {
      loadTrackInstance(playlist, nextIdx, onEnd, onError);
    }
  }, [trackIndex, loadTrackInstance]);

  const stop = useCallback(() => {
    clearInterval(timerRef.current);
    clearTimeout(timeoutRef.current);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.onerror = null;
      audioRef.current.oncanplay = null;
      audioRef.current = null;
    }
    setIsPlaying(false);
    setTrack(null);
  }, []);

  return {
    isPlaying,
    track,
    trackIndex,
    trackCount,
    timeRemaining,
    formatTime,
    buildPlaylist,
    start,
    stop,
    toggle,
    shiftTrack,
  };
}
