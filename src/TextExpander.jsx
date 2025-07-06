import React, { useState, useEffect } from 'react';

// Example abbreviation map
const ABBREVIATIONS = {
  brb: 'be right back',
  asap: 'as soon as possible',
  btw: 'by the way',
  idk: 'I don\'t know',
  tbh: 'to be honest',
  imho: 'in my humble opinion',
  fyi: 'for your information',
  lol: 'laugh out loud',
  thx: 'thanks',
  np: 'no problem',
  omw: 'on my way',
  gtg: 'got to go',
  ttyl: 'talk to you later',
};

function expandText(text) {
  return text.replace(/\b([a-zA-Z]{2,6})\b/g, (match) => {
    const lower = match.toLowerCase();
    return ABBREVIATIONS[lower] ? ABBREVIATIONS[lower] : match;
  });
}

export default function TextExpander() {
  const [text, setText] = useState('');
  const [expanded, setExpanded] = useState('');

  useEffect(() => {
    setExpanded(expandText(text));
  }, [text]);

  return (
    <div className="w-full max-w-2xl flex flex-col gap-4">
      <textarea
        className="w-full h-24 p-3 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
        placeholder="Type shortcuts/abbreviations..."
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <div className="bg-gray-100 dark:bg-gray-700 rounded p-4 min-h-[2rem] text-gray-700 dark:text-gray-200">
        <span className="font-semibold">Expanded:</span> {expanded ? <span>{expanded}</span> : <span className="italic">Type to see expanded text</span>}
      </div>
    </div>
  );
} 