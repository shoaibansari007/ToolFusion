// Utility functions for text analysis

const punctuationRegex = /[.,!?;:()\[\]{}'"\-]/g;
const sentenceRegex = /[^.!?\s][^.!?]*(?:[.!?](?!['"]?\s|$)[^.!?]*)*[.!?]?['"]?(?=\s|$)/g;
const wordRegex = /\b\w+\b/g;

export function analyzeText(text) {
  const charCount = text.length;
  const words = text.match(wordRegex) || [];
  const wordCount = words.length;
  const sentences = text.match(sentenceRegex) || [];
  const sentenceCount = sentences.length;
  const paragraphs = text.split(/\n{2,}/).filter(p => p.trim().length > 0);
  const paragraphCount = paragraphs.length;
  const spaceCount = (text.match(/ /g) || []).length;
  const punctuationCount = (text.match(punctuationRegex) || []).length;
  const readingTime = wordCount > 0 ? (wordCount / 200).toFixed(2) : '0.00';
  const speakingTime = wordCount > 0 ? (wordCount / 130).toFixed(2) : '0.00';

  // Frequency analysis
  const freqMap = {};
  words.forEach(word => {
    const w = word.toLowerCase();
    freqMap[w] = (freqMap[w] || 0) + 1;
  });
  const frequentWords = Object.entries(freqMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([word, count]) => ({
      word,
      count,
      density: ((count / wordCount) * 100).toFixed(2),
    }));

  return {
    charCount,
    wordCount,
    sentenceCount,
    paragraphCount,
    spaceCount,
    punctuationCount,
    readingTime,
    speakingTime,
    frequentWords,
  };
}

export function toUpperCase(text) {
  return text.toUpperCase();
}

export function toLowerCase(text) {
  return text.toLowerCase();
}

export function toSentenceCase(text) {
  return text
    .toLowerCase()
    .replace(/(^\s*\w|[.!?]\s*\w)/g, c => c.toUpperCase());
}

export function toTitleCase(text) {
  return text.toLowerCase().replace(/\b\w/g, c => c.toUpperCase());
}

export function toInverseCase(text) {
  return text
    .split('')
    .map(c => (c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase()))
    .join('');
} 