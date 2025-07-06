import React, { useState, useRef } from 'react';

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition || null;

export default function SpeechToText() {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const recognitionRef = useRef(null);
  const [error, setError] = useState('');

  const handleStart = () => {
    setError('');
    if (!SpeechRecognition) {
      setError('Speech recognition is not supported in this browser.');
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = true;
    recognition.continuous = true;
    recognition.onresult = (event) => {
      let finalTranscript = '';
      for (let i = 0; i < event.results.length; ++i) {
        finalTranscript += event.results[i][0].transcript;
      }
      setTranscript(finalTranscript);
    };
    recognition.onerror = (event) => {
      setError('Speech recognition error: ' + event.error);
      setIsRecording(false);
    };
    recognition.onend = () => {
      setIsRecording(false);
    };
    recognitionRef.current = recognition;
    recognition.start();
    setIsRecording(true);
  };

  const handleStop = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      recognitionRef.current = null;
    }
    setIsRecording(false);
  };

  return (
    <div className="w-full max-w-2xl flex flex-col gap-4 items-center">
      <div className="flex gap-2">
        <button
          className="px-4 py-2 rounded bg-blue-500 text-white font-semibold hover:bg-blue-600 w-fit disabled:opacity-50 disabled:cursor-not-allowed"
          type="button"
          onClick={handleStart}
          disabled={isRecording}
        >
          Start Recording 🎤
        </button>
        <button
          className="px-4 py-2 rounded bg-red-500 text-white font-semibold hover:bg-red-600 w-fit disabled:opacity-50 disabled:cursor-not-allowed"
          type="button"
          onClick={handleStop}
          disabled={!isRecording}
        >
          Stop Recording ■
        </button>
      </div>
      <div className="bg-gray-100 dark:bg-gray-700 rounded p-4 min-h-[2rem] w-full text-gray-700 dark:text-gray-200">
        <span className="font-semibold">Transcript:</span> {transcript ? <span>{transcript}</span> : <span className="italic">{error || 'Click Start and speak...'}</span>}
      </div>
    </div>
  );
} 