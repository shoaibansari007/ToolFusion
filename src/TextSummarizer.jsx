import React, { useState, useEffect } from 'react';

function summarizeText(text) {
  if (!text) return '';
  // Split into sentences
  const sentences = text.match(/[^.!?\n]+[.!?\n]+/g) || [];
  if (sentences.length <= 2) return text.trim();
  // Score sentences by length (simple extractive summary)
  const sorted = [...sentences].sort((a, b) => b.length - a.length);
  // Take top 2-3 sentences
  return sorted.slice(0, 3).join(' ').trim();
}

export default function TextSummarizer() {
  const [text, setText] = useState('');
  const [summary, setSummary] = useState('');

  useEffect(() => {
    setSummary(summarizeText(text));
  }, [text]);

  return (
    <div className="w-full max-w-2xl">
      <textarea
        className="w-full h-32 p-3 border border-gray-300 dark:border-gray-700 rounded mb-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
        placeholder="Paste or type your text to summarize..."
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <div className="bg-gray-100 dark:bg-gray-700 rounded p-4 min-h-[3rem] text-gray-700 dark:text-gray-200">
        <span className="font-semibold">Summary:</span> {summary ? <span>{summary}</span> : <span className="italic">Enter text to see summary</span>}
      </div>
    </div>
  );
} 