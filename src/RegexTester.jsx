import React, { useState } from 'react';

export default function RegexTester() {
  const [text, setText] = useState('');
  const [regex, setRegex] = useState('');
  return (
    <div className="w-full max-w-2xl flex flex-col gap-4">
      <input
        className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
        placeholder="Regex pattern..."
        value={regex}
        onChange={e => setRegex(e.target.value)}
      />
      <textarea
        className="w-full h-24 p-3 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
        placeholder="Text to test..."
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <div className="bg-gray-100 dark:bg-gray-700 rounded p-4 min-h-[2rem] text-gray-700 dark:text-gray-200">
        <span className="font-semibold">Matches:</span> <span className="italic">(coming soon)</span>
      </div>
    </div>
  );
} 