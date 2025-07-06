import React, { useState } from 'react';

export default function UuidGenerator() {
  const [uuid, setUuid] = useState('');
  return (
    <div className="w-full max-w-2xl flex flex-col gap-4 items-center">
      <button className="px-4 py-2 rounded bg-blue-500 text-white font-semibold hover:bg-blue-600 w-fit" type="button">Generate UUID</button>
      <div className="bg-gray-100 dark:bg-gray-700 rounded p-4 min-h-[2rem] w-full text-gray-700 dark:text-gray-200 text-center">
        <span className="font-semibold">UUID:</span> <span className="italic">(coming soon)</span>
      </div>
    </div>
  );
} 