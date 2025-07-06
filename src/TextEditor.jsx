import React, { useState } from 'react';
import {
  toUpperCase,
  toLowerCase,
  toSentenceCase,
  toTitleCase,
  toInverseCase,
} from './utils/textUtils';

export default function TextEditor({ onTextChange }) {
  const [text, setText] = useState('');

  const handleChange = (e) => {
    setText(e.target.value);
    onTextChange(e.target.value);
  };

  const handleTransform = (fn) => {
    const newText = fn(text);
    setText(newText);
    onTextChange(newText);
  };

  const handleClear = () => {
    setText('');
    onTextChange('');
  };

  const handleCopy = async () => {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(text);
      // Optionally, show a toast/notification here
    }
  };

  return (
    <div className="w-full max-w-2xl">
      {/* Case conversion and utility buttons */}
      <div className="flex flex-wrap gap-2 mb-3">
        <button
          className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 hover:bg-blue-200 dark:hover:bg-blue-800 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={() => handleTransform(toUpperCase)}
          type="button"
          disabled={!text}
        >
          UPPERCASE
        </button>
        <button
          className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 hover:bg-blue-200 dark:hover:bg-blue-800 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={() => handleTransform(toLowerCase)}
          type="button"
          disabled={!text}
        >
          lowercase
        </button>
        <button
          className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 hover:bg-blue-200 dark:hover:bg-blue-800 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={() => handleTransform(toSentenceCase)}
          type="button"
          disabled={!text}
        >
          Sentence case
        </button>
        <button
          className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 hover:bg-blue-200 dark:hover:bg-blue-800 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={() => handleTransform(toTitleCase)}
          type="button"
          disabled={!text}
        >
          Title Case
        </button>
        <button
          className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 hover:bg-blue-200 dark:hover:bg-blue-800 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={() => handleTransform(toInverseCase)}
          type="button"
          disabled={!text}
        >
          iNVERSE cASE
        </button>
        <button
          className="px-3 py-1 rounded bg-red-200 dark:bg-red-700 text-red-900 dark:text-red-100 hover:bg-red-300 dark:hover:bg-red-800 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handleClear}
          type="button"
          disabled={!text}
        >
          Clear
        </button>
        <button
          className="px-3 py-1 rounded bg-green-200 dark:bg-green-700 text-green-900 dark:text-green-100 hover:bg-green-300 dark:hover:bg-green-800 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handleCopy}
          type="button"
          disabled={!text}
        >
          Copy
        </button>
      </div>
      <textarea
        className="w-full h-48 p-4 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-vertical shadow-sm text-base"
        placeholder="Paste or type your text here..."
        value={text}
        onChange={handleChange}
        spellCheck={false}
      />
    </div>
  );
} 