import React, { useState } from 'react';

export default function TimeZoneConverter() {
  const [from, setFrom] = useState('UTC');
  const [to, setTo] = useState('UTC');
  const [time, setTime] = useState('');
  return (
    <div className="w-full max-w-2xl flex flex-col gap-4">
      <div className="flex gap-2">
        <select className="flex-1 p-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100" value={from} onChange={e => setFrom(e.target.value)}>
          <option value="UTC">UTC</option>
          <option value="America/New_York">New York</option>
          <option value="Europe/London">London</option>
          <option value="Asia/Tokyo">Tokyo</option>
        </select>
        <select className="flex-1 p-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100" value={to} onChange={e => setTo(e.target.value)}>
          <option value="UTC">UTC</option>
          <option value="America/New_York">New York</option>
          <option value="Europe/London">London</option>
          <option value="Asia/Tokyo">Tokyo</option>
        </select>
      </div>
      <input
        className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
        type="time"
        value={time}
        onChange={e => setTime(e.target.value)}
      />
      <div className="bg-gray-100 dark:bg-gray-700 rounded p-4 min-h-[2rem] text-gray-700 dark:text-gray-200">
        <span className="font-semibold">Converted Time:</span> <span className="italic">(coming soon)</span>
      </div>
    </div>
  );
} 