import React from 'react';

export default function StatsPanel({ analysis }) {
  if (!analysis) return null;
  const {
    charCount,
    wordCount,
    sentenceCount,
    paragraphCount,
    spaceCount,
    punctuationCount,
    readingTime,
    speakingTime,
    frequentWords,
  } = analysis;

  return (
    <div className="w-full max-w-2xl mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 flex flex-col gap-2">
        <div className="font-semibold text-gray-700 dark:text-gray-200">Characters</div>
        <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{charCount}</div>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 flex flex-col gap-2">
        <div className="font-semibold text-gray-700 dark:text-gray-200">Words</div>
        <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{wordCount}</div>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 flex flex-col gap-2">
        <div className="font-semibold text-gray-700 dark:text-gray-200">Sentences</div>
        <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{sentenceCount}</div>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 flex flex-col gap-2">
        <div className="font-semibold text-gray-700 dark:text-gray-200">Paragraphs</div>
        <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{paragraphCount}</div>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 flex flex-col gap-2">
        <div className="font-semibold text-gray-700 dark:text-gray-200">Spaces</div>
        <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{spaceCount}</div>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 flex flex-col gap-2">
        <div className="font-semibold text-gray-700 dark:text-gray-200">Punctuation</div>
        <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{punctuationCount}</div>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 flex flex-col gap-2">
        <div className="font-semibold text-gray-700 dark:text-gray-200">Reading Time</div>
        <div className="text-lg text-gray-900 dark:text-gray-100">{readingTime} min</div>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 flex flex-col gap-2">
        <div className="font-semibold text-gray-700 dark:text-gray-200">Speaking Time</div>
        <div className="text-lg text-gray-900 dark:text-gray-100">{speakingTime} min</div>
      </div>
      <div className="md:col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow p-4">
        <div className="font-semibold text-gray-700 dark:text-gray-200 mb-2">Most Frequent Words/Phrases</div>
        <ul className="flex flex-wrap gap-4">
          {frequentWords && frequentWords.length > 0 ? frequentWords.map((item, idx) => (
            <li key={idx} className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded px-3 py-1 text-sm">
              {item.word} ({item.count}, {item.density}%)
            </li>
          )) : <li className="text-gray-500">No data</li>}
        </ul>
      </div>
    </div>
  );
} 