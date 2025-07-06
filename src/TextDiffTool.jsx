import React, { useState, useEffect } from 'react';

function diffLines(a, b) {
  const aLines = a.split('\n');
  const bLines = b.split('\n');
  const maxLen = Math.max(aLines.length, bLines.length);
  const result = [];
  for (let i = 0; i < maxLen; i++) {
    if (aLines[i] === bLines[i]) {
      result.push({ type: 'unchanged', text: aLines[i] ?? '' });
    } else if (aLines[i] === undefined) {
      result.push({ type: 'added', text: bLines[i] });
    } else if (bLines[i] === undefined) {
      result.push({ type: 'removed', text: aLines[i] });
    } else {
      result.push({ type: 'removed', text: aLines[i] });
      result.push({ type: 'added', text: bLines[i] });
    }
  }
  return result;
}

export default function TextDiffTool() {
  const [textA, setTextA] = useState('');
  const [textB, setTextB] = useState('');
  const [diff, setDiff] = useState([]);

  useEffect(() => {
    setDiff(diffLines(textA, textB));
  }, [textA, textB]);

  return (
    <div className="w-full max-w-2xl grid grid-cols-1 md:grid-cols-2 gap-4">
      <textarea
        className="w-full h-32 p-3 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
        placeholder="Text A..."
        value={textA}
        onChange={e => setTextA(e.target.value)}
      />
      <textarea
        className="w-full h-32 p-3 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
        placeholder="Text B..."
        value={textB}
        onChange={e => setTextB(e.target.value)}
      />
      <div className="md:col-span-2 bg-gray-100 dark:bg-gray-700 rounded p-4 min-h-[3rem] text-sm font-mono overflow-x-auto">
        <span className="font-semibold text-gray-700 dark:text-gray-200">Diff:</span>
        <div className="mt-2">
          {diff.length === 0 ? (
            <span className="italic text-gray-400">Enter text in both boxes to see the diff</span>
          ) : (
            diff.map((line, idx) => (
              <div key={idx} className={
                line.type === 'added' ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 rounded' :
                line.type === 'removed' ? 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 px-2 rounded' :
                'text-gray-700 dark:text-gray-200'
              }>
                {line.type === 'added' ? '+ ' : line.type === 'removed' ? '- ' : '  '}{line.text}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
} 