import React, { useState } from 'react';

export default function Notes() {
  const [note, setNote] = useState('');
  return (
    <div className="w-full max-w-2xl flex flex-col gap-4">
      <textarea
        className="w-full h-32 p-3 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
        placeholder="Write your note here..."
        value={note}
        onChange={e => setNote(e.target.value)}
      />
    </div>
  );
} 