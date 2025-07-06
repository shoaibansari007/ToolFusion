import React, { useState } from 'react';

export default function Base64Tool() {
  const [text, setText] = useState('');
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  const [mode, setMode] = useState('');

  const handleEncode = () => {
    try {
      setResult(btoa(unescape(encodeURIComponent(text))));
      setError('');
      setMode('encode');
    } catch (e) {
      setResult('');
      setError('Encoding failed');
      setMode('encode');
    }
  };

  const handleDecode = () => {
    try {
      setResult(decodeURIComponent(escape(atob(text))));
      setError('');
      setMode('decode');
    } catch (e) {
      setResult('');
      setError('Decoding failed');
      setMode('decode');
    }
  };

  return (
    <div className="w-full max-w-2xl flex flex-col gap-4">
      <textarea
        className="w-full h-24 p-3 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
        placeholder={mode === 'decode' ? "Paste Base64 to decode..." : "Text to encode..."}
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <div className="flex gap-2">
        <button className="px-4 py-2 rounded bg-blue-500 text-white font-semibold hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed" type="button" onClick={handleEncode} disabled={!text}>Encode</button>
        <button className="px-4 py-2 rounded bg-green-500 text-white font-semibold hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed" type="button" onClick={handleDecode} disabled={!text}>Decode</button>
      </div>
      <div className="bg-gray-100 dark:bg-gray-700 rounded p-4 min-h-[2rem] text-gray-700 dark:text-gray-200 break-all">
        {error ? <span className="text-red-500">{error}</span> : result ? result : <span className="italic">Result will appear here</span>}
      </div>
    </div>
  );
} 