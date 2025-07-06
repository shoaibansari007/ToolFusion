import React, { useState } from 'react';

export default function UnitConverter() {
  const [value, setValue] = useState('');
  const [result, setResult] = useState('');
  const [unit, setUnit] = useState('length');
  return (
    <div className="w-full max-w-2xl flex flex-col gap-4">
      <select className="w-40 p-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100" value={unit} onChange={e => setUnit(e.target.value)}>
        <option value="length">Length</option>
        <option value="weight">Weight</option>
        <option value="temperature">Temperature</option>
      </select>
      <div className="flex gap-2">
        <input
          className="flex-1 p-3 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          placeholder="Value..."
          value={value}
          onChange={e => setValue(e.target.value)}
        />
        <input
          className="flex-1 p-3 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          placeholder="Result..."
          value={result}
          readOnly
        />
      </div>
      <div className="italic text-gray-500 dark:text-gray-400">(Conversion logic coming soon)</div>
    </div>
  );
} 