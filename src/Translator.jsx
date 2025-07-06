import React, { useState } from 'react';

const LANGS = [
  { code: 'es', label: 'Spanish' },
  { code: 'fr', label: 'French' },
  { code: 'de', label: 'German' },
  { code: 'zh', label: 'Chinese' },
  { code: 'hi', label: 'Hindi' },
];

export default function Translator() {
  const [text, setText] = useState('');
  const [output, setOutput] = useState('');
  const [lang, setLang] = useState('es');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleTranslate = async () => {
    setLoading(true);
    setError('');
    setOutput('');
    try {
      const res = await fetch('https://libretranslate.de/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          q: text,
          source: 'en',
          target: lang,
          format: 'text',
        }),
      });
      if (!res.ok) throw new Error('API error');
      const data = await res.json();
      setOutput(data.translatedText);
    } catch (e) {
      setError('Translation failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl flex flex-col gap-4">
      <div className="flex gap-2">
        <textarea
          className="w-1/2 h-24 p-3 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          placeholder="Text to translate..."
          value={text}
          onChange={e => setText(e.target.value)}
        />
        <textarea
          className="w-1/2 h-24 p-3 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          placeholder="Translation..."
          value={output}
          readOnly
        />
      </div>
      <div className="flex gap-2 items-center">
        <select className="w-32 p-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100" value={lang} onChange={e => setLang(e.target.value)}>
          {LANGS.map(l => <option key={l.code} value={l.code}>{l.label}</option>)}
        </select>
        <button
          className="px-4 py-2 rounded bg-blue-500 text-white font-semibold hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
          type="button"
          onClick={handleTranslate}
          disabled={!text || loading}
        >
          {loading ? 'Translating...' : 'Translate'}
        </button>
      </div>
      {error && <div className="text-red-500 text-sm">{error}</div>}
    </div>
  );
} 