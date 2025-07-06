import React, { useState } from 'react';
import CryptoJS from 'crypto-js';

export default function EncryptDecrypt() {
  const [text, setText] = useState('');
  const [password, setPassword] = useState('');
  const [result, setResult] = useState('');
  const [mode, setMode] = useState('');

  const handleEncrypt = () => {
    if (!text || !password) return;
    try {
      const ciphertext = CryptoJS.AES.encrypt(text, password).toString();
      setResult(ciphertext);
      setMode('encrypt');
    } catch (e) {
      setResult('Encryption failed');
      setMode('encrypt');
    }
  };

  const handleDecrypt = () => {
    if (!text || !password) return;
    try {
      const bytes = CryptoJS.AES.decrypt(text, password);
      const plaintext = bytes.toString(CryptoJS.enc.Utf8);
      setResult(plaintext || 'Decryption failed');
      setMode('decrypt');
    } catch (e) {
      setResult('Decryption failed');
      setMode('decrypt');
    }
  };

  return (
    <div className="w-full max-w-2xl flex flex-col gap-4">
      <textarea
        className="w-full h-24 p-3 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
        placeholder={mode === 'decrypt' ? "Paste encrypted text here..." : "Text to encrypt..."}
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <input
        className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
        type="password"
        placeholder="Password..."
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <div className="flex gap-2">
        <button className="px-4 py-2 rounded bg-blue-500 text-white font-semibold hover:bg-blue-600" type="button" onClick={handleEncrypt} disabled={!text || !password}>Encrypt</button>
        <button className="px-4 py-2 rounded bg-green-500 text-white font-semibold hover:bg-green-600" type="button" onClick={handleDecrypt} disabled={!text || !password}>Decrypt</button>
      </div>
      <div className="bg-gray-100 dark:bg-gray-700 rounded p-4 min-h-[2rem] text-gray-700 dark:text-gray-200 break-all">
        <span className="font-semibold">Result:</span> {result ? <span>{result}</span> : <span className="italic">Enter text and password, then Encrypt or Decrypt</span>}
      </div>
    </div>
  );
} 