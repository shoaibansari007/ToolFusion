import React, { useState } from 'react';

export default function TodoList() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  return (
    <div className="w-full max-w-2xl flex flex-col gap-4">
      <div className="flex gap-2">
        <input
          className="flex-1 p-3 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          placeholder="Add a new task..."
          value={task}
          onChange={e => setTask(e.target.value)}
        />
        <button className="px-4 py-2 rounded bg-blue-500 text-white font-semibold hover:bg-blue-600" type="button">Add</button>
      </div>
      <ul className="list-disc pl-6 text-gray-800 dark:text-gray-200">
        {tasks.length === 0 ? <li className="italic text-gray-400">No tasks yet</li> : null}
        {/* Tasks will go here */}
      </ul>
    </div>
  );
} 