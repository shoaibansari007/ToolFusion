import React, { useState } from 'react';

export default function EmojiPicker() {
  const [query, setQuery] = useState('');
  return (
    <div className="w-full max-w-2xl flex flex-col gap-4 items-center">
      <input
        className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
        placeholder="Search for an emoji..."
        value={query}
        onChange={e => setQuery(e.target.value)}
      />
      <div className="bg-gray-100 dark:bg-gray-700 rounded p-4 min-h-[3rem] w-full text-gray-700 dark:text-gray-200 text-center">
        <span className="font-semibold">Results:</span> <span className="italic">(coming soon)</span>
      </div>
    </div>
  );
} 