import React, { useState } from 'react';

export default function MarkdownPreviewer() {
  const [text, setText] = useState('');
  return (
    <div className="w-full max-w-2xl flex flex-col gap-4">
      <textarea
        className="w-full h-32 p-3 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
        placeholder="Write Markdown here..."
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <div className="bg-gray-100 dark:bg-gray-700 rounded p-4 min-h-[3rem] text-gray-700 dark:text-gray-200">
        <span className="font-semibold">Preview:</span> <span className="italic">(coming soon)</span>
      </div>
    </div>
  );
} 