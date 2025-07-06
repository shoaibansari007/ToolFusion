import React, { useState, useEffect } from 'react';

export default function JsonFormatter() {
  const [text, setText] = useState('');
  const [formatted, setFormatted] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!text.trim()) {
      setFormatted('');
      setError('');
      return;
    }
    try {
      const obj = JSON.parse(text);
      setFormatted(JSON.stringify(obj, null, 2));
      setError('');
    } catch (e) {
      setFormatted('');
      setError('Invalid JSON');
    }
  }, [text]);

  const handleCopy = async () => {
    if (!formatted) return;
    await navigator.clipboard.writeText(formatted);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  return (
    <div className="w-full max-w-2xl flex flex-col gap-4">
      <textarea
        className="w-full h-32 p-3 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 font-mono"
        placeholder="Paste JSON here..."
        value={text}
        onChange={e => setText(e.target.value)}
        spellCheck={false}
      />
      <div className="flex items-center gap-2">
        <button
          className="px-3 py-1 rounded bg-blue-500 text-white font-medium hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
          type="button"
          onClick={handleCopy}
          disabled={!formatted}
        >
          Copy
        </button>
        {copied && <span className="text-green-600 text-sm">Copied!</span>}
      </div>
      <div className="bg-gray-100 dark:bg-gray-700 rounded p-4 min-h-[3rem] font-mono text-gray-700 dark:text-gray-200 overflow-x-auto whitespace-pre-wrap">
        {error ? <span className="text-red-500">{error}</span> : formatted ? formatted : <span className="italic">Formatted JSON will appear here</span>}
      </div>
    </div>
  );
} 