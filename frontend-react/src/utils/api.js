const API_BASE = 'http://127.0.0.1:8000';

export async function sendCompanionMessage(message, mode, lang = 'en') {
  const response = await fetch(`${API_BASE}/api/companion`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, mode, lang }),
  });

  if (!response.ok) {
    const errData = await response.json().catch(() => ({}));
    throw new Error(errData.detail || `Server error ${response.status}`);
  }

  return response.json();
}

export async function sendVoiceMessage(audioBlob, mode, lang = 'en') {
  const formData = new FormData();
  formData.append('audio', audioBlob, 'recording.webm');
  formData.append('mode', mode);
  formData.append('lang', lang);

  const response = await fetch(`${API_BASE}/api/companion/voice`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const errData = await response.json().catch(() => ({}));
    throw new Error(errData.detail || `Server error ${response.status}`);
  }

  return response.json();
}
