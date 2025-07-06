import React, { useState, useRef } from 'react';

export default function TextToSpeech() {
  const [text, setText] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const utteranceRef = useRef(null);

  // Helper to get a female voice
  function getFemaleVoice() {
    const voices = window.speechSynthesis.getVoices();
    // Try to find a female voice (by name or gender if available)
    const female = voices.find(v => v.name.toLowerCase().includes('female') || (v.gender && v.gender === 'female'))
      || voices.find(v => v.name.toLowerCase().includes('woman'))
      || voices.find(v => v.name.toLowerCase().includes('girl'));
    // Fallback: pick the first voice with 'en' language and 'female' in name, or just the first English voice
    return female || voices.find(v => v.lang.startsWith('en') && v.name.toLowerCase().includes('female')) || voices.find(v => v.lang.startsWith('en')) || voices[0];
  }

  const handlePlay = () => {
    if (!text) return;
    if (utteranceRef.current) {
      window.speechSynthesis.cancel();
    }
    const utterance = new window.SpeechSynthesisUtterance(text);
    // Set female voice if available
    const voices = window.speechSynthesis.getVoices();
    const femaleVoice = getFemaleVoice();
    if (femaleVoice) utterance.voice = femaleVoice;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    utteranceRef.current = utterance;
    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  const handleStop = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  return (
    <div className="w-full max-w-2xl flex flex-col gap-4">
      <textarea
        className="w-full h-24 p-3 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
        placeholder="Text to speak..."
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <div className="flex gap-2">
        <button
          className="px-4 py-2 rounded bg-blue-500 text-white font-semibold hover:bg-blue-600 w-fit disabled:opacity-50 disabled:cursor-not-allowed"
          type="button"
          onClick={handlePlay}
          disabled={!text || isSpeaking}
        >
          Play ▶️
        </button>
        <button
          className="px-4 py-2 rounded bg-red-500 text-white font-semibold hover:bg-red-600 w-fit disabled:opacity-50 disabled:cursor-not-allowed"
          type="button"
          onClick={handleStop}
          disabled={!isSpeaking}
        >
          Stop ■
        </button>
      </div>
    </div>
  );
} 