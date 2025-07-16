import React, { useState } from "react";
import DashboardLayout from "./DashboardLayout";
import TextEditor from "./TextEditor";
import StatsPanel from "./StatsPanel";
import { analyzeText } from "./utils/textUtils";
import TextSummarizer from "./TextSummarizer";
import TextDiffTool from "./TextDiffTool";
import EncryptDecrypt from "./EncryptDecrypt";
import TextToSpeech from "./TextToSpeech";
import SpeechToText from "./SpeechToText";
import Translator from "./Translator";
import TextExpander from "./TextExpander";
import JsonFormatter from "./JsonFormatter";
import Base64Tool from "./Base64Tool";
import UrlTool from "./UrlTool";
import MarkdownPreviewer from "./MarkdownPreviewer";
import RegexTester from "./RegexTester";
import UuidGenerator from "./UuidGenerator";
import LoremIpsum from "./LoremIpsum";
import Notes from "./Notes";
import TodoList from "./TodoList";
import ClipboardHistory from "./ClipboardHistory";
import UnitConverter from "./UnitConverter";
import TimeZoneConverter from "./TimeZoneConverter";
import AsciiArt from "./AsciiArt";
import EmojiPicker from "./EmojiPicker";
import RandomQuote from "./RandomQuote";
import PdfTextViewer from "./PdfTextViewer";
import CsvToTable from "./CsvToTable";
import "./App.css";
// Import Lucide icons
import {
  FileEdit,
  Brain,
  Diff,
  Lock,
  Volume2,
  Mic,
  Languages,
  Expand,
  Code2,
  Hash,
  Link2,
  FileText,
  Search,
  Key,
  File,
  StickyNote,
  CheckSquare,
  ClipboardList,
  Ruler,
  Globe,
  Type,
  Smile,
  MessageCircle,
  FileScan,
  Table2,
  Home as HomeIcon
} from 'lucide-react';
import ToolGrid from "./ToolGrid";
import { Routes, Route, useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Header from "./Header";

// Placeholder components for other tools
const Placeholder = ({ label }) => (
  <div className="w-full max-w-2xl text-center text-gray-500 dark:text-gray-300 text-xl py-20">{label} coming soon...</div>
);

// Utility to slugify category
function slugify(str) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

const tools = [
  { id: "text-editor", label: "Text Editor", icon: <FileEdit strokeWidth={1} size={35} />, keywords: ["editor", "text", "write", "notepad", "document"], category: "Text Utilities" },
  { id: "text-summarizer", label: "Text Summarizer", icon: <Brain strokeWidth={1} size={35} />, keywords: ["summarize", "summary", "shorten", "condense", "tl;dr"], category: "Text Utilities" },
  { id: "text-diff", label: "Text Diff Tool", icon: <Diff strokeWidth={1} size={35} />, keywords: ["diff", "compare", "difference", "changes"], category: "Text Utilities" },
  { id: "encryption", label: "Encrypt/Decrypt", icon: <Lock strokeWidth={1} size={35} />, keywords: ["encrypt", "decrypt", "password", "secure", "crypto"], category: "Development Tools" },
  { id: "tts", label: "Text to Speech", icon: <Volume2 strokeWidth={1} size={35} />, keywords: ["tts", "speak", "audio", "voice", "read aloud"], category: "Text Utilities" },
  { id: "stt", label: "Speech to Text", icon: <Mic strokeWidth={1} size={35} />, keywords: ["stt", "speech", "voice", "dictate", "transcribe"], category: "Text Utilities" },
  { id: "translator", label: "Translator", icon: <Languages strokeWidth={1} size={35} />, keywords: ["translate", "language", "convert", "transliterate"], category: "Text Utilities" },
  { id: "expander", label: "Text Expander", icon: <Expand strokeWidth={1} size={35} />, keywords: ["expand", "longer", "elaborate", "extend"], category: "Text Utilities" },
  { id: "json", label: "JSON Formatter", icon: <Code2 strokeWidth={1} size={35} />, keywords: ["json", "format", "prettify", "beautify", "parse"], category: "Development Tools" },
  { id: "base64", label: "Base64 Encode/Decode", icon: <Hash strokeWidth={1} size={35} />, keywords: ["base64", "encode", "decode", "binary", "convert"], category: "Development Tools" },
  { id: "url", label: "URL Encode/Decode", icon: <Link2 strokeWidth={1} size={35} />, keywords: ["url", "encode", "decode", "link", "web"], category: "Development Tools" },
  { id: "markdown", label: "Markdown Previewer", icon: <FileText strokeWidth={1} size={35} />, keywords: ["markdown", "preview", "md", "render", "format"], category: "Development Tools" },
  { id: "regex", label: "Regex Tester", icon: <Search strokeWidth={1} size={35} />, keywords: ["regex", "regexp", "test", "pattern", "match"], category: "Development Tools" },
  { id: "uuid", label: "UUID Generator", icon: <Key strokeWidth={1} size={35} />, keywords: ["uuid", "guid", "unique", "id", "identifier"], category: "Development Tools" },
  { id: "lorem", label: "Lorem Ipsum", icon: <File strokeWidth={1} size={35} />, keywords: ["lorem", "ipsum", "dummy", "placeholder", "text"], category: "Development Tools" },
  { id: "notes", label: "Notes", icon: <StickyNote strokeWidth={1} size={35} />, keywords: ["note", "notepad", "memo", "jot", "write"], category: "Productivity Tools" },
  { id: "todo", label: "To-Do List", icon: <CheckSquare strokeWidth={1} size={35} />, keywords: ["todo", "task", "list", "checklist", "reminder"], category: "Productivity Tools" },
  { id: "clipboard", label: "Clipboard History", icon: <ClipboardList strokeWidth={1} size={35} />, keywords: ["clipboard", "copy", "paste", "history", "buffer"], category: "Productivity Tools" },
  { id: "unit", label: "Unit Converter", icon: <Ruler strokeWidth={1} size={35} />, keywords: ["unit", "convert", "measurement", "length", "weight"], category: "Productivity Tools" },
  { id: "timezone", label: "Time Zone Converter", icon: <Globe strokeWidth={1} size={35} />, keywords: ["timezone", "time", "convert", "clock", "zone"], category: "Productivity Tools" },
  { id: "ascii", label: "ASCII Art", icon: <Type strokeWidth={1} size={35} />, keywords: ["ascii", "art", "text", "draw", "character"], category: "Fun/Creative Tools" },
  { id: "emoji", label: "Emoji Picker", icon: <Smile strokeWidth={1} size={35} />, keywords: ["emoji", "emoticon", "smiley", "icon", "symbol"], category: "Fun/Creative Tools" },
  { id: "quote", label: "Random Quote", icon: <MessageCircle strokeWidth={1} size={35} />, keywords: ["quote", "random", "inspire", "motivation", "saying"], category: "Fun/Creative Tools" },
  { id: "pdf", label: "PDF/Text Viewer", icon: <FileScan strokeWidth={1} size={35} />, keywords: ["pdf", "text", "viewer", "read", "document"], category: "Document Tools" },
  { id: "csv", label: "CSV to Table", icon: <Table2 strokeWidth={1} size={35} />, keywords: ["csv", "table", "spreadsheet", "data", "convert"], category: "Document Tools" },
];
// Add categorySlug to each tool
const toolsWithSlug = tools.map(tool => ({ ...tool, categorySlug: slugify(tool.category) }));

function ToolView({ tools }) {
  const { category, toolId } = useParams();
  const navigate = useNavigate();
  const [analysis, setAnalysis] = useState(null);

  // Only for Text Editor
  const handleTextChange = (text) => {
    setAnalysis(analyzeText(text));
  };

  // Find the tool by toolId
  const tool = tools.find(t => t.id === toolId);
  let mainPanel = null;
  switch (toolId) {
    case "text-editor":
      mainPanel = <>
        <TextEditor onTextChange={handleTextChange} />
        <StatsPanel analysis={analysis} />
      </>;
      break;
    case "text-summarizer":
      mainPanel = <TextSummarizer />;
      break;
    case "text-diff":
      mainPanel = <TextDiffTool />;
      break;
    case "encryption":
      mainPanel = <EncryptDecrypt />;
      break;
    case "tts":
      mainPanel = <TextToSpeech />;
      break;
    case "stt":
      mainPanel = <SpeechToText />;
      break;
    case "translator":
      mainPanel = <Translator />;
      break;
    case "expander":
      mainPanel = <TextExpander />;
      break;
    case "json":
      mainPanel = <JsonFormatter />;
      break;
    case "base64":
      mainPanel = <Base64Tool />;
      break;
    case "url":
      mainPanel = <UrlTool />;
      break;
    case "markdown":
      mainPanel = <MarkdownPreviewer />;
      break;
    case "regex":
      mainPanel = <RegexTester />;
      break;
    case "uuid":
      mainPanel = <UuidGenerator />;
      break;
    case "lorem":
      mainPanel = <LoremIpsum />;
      break;
    case "notes":
      mainPanel = <Notes />;
      break;
    case "todo":
      mainPanel = <TodoList />;
      break;
    case "clipboard":
      mainPanel = <ClipboardHistory />;
      break;
    case "unit":
      mainPanel = <UnitConverter />;
      break;
    case "timezone":
      mainPanel = <TimeZoneConverter />;
      break;
    case "ascii":
      mainPanel = <AsciiArt />;
      break;
    case "emoji":
      mainPanel = <EmojiPicker />;
      break;
    case "quote":
      mainPanel = <RandomQuote />;
      break;
    case "pdf":
      mainPanel = <PdfTextViewer />;
      break;
    case "csv":
      mainPanel = <CsvToTable />;
      break;
    default:
      mainPanel = <div className="w-full max-w-2xl text-center text-gray-500 dark:text-gray-300 text-xl py-20">Tool coming soon...</div>;
  }

  return (
    <div className="min-h-screen bg-blue-50 dark:bg-gray-900 flex flex-col items-center px-4 py-10">
      <div className="w-full max-w-6xl flex justify-start mb-4">
        <button
          className="flex items-center justify-center w-10 h-10 rounded-full bg-white dark:bg-gray-700 border border-blue-100 dark:border-gray-700 text-gray-800 dark:text-gray-100 shadow hover:bg-blue-50 dark:hover:bg-gray-800 hover:border-blue-400 dark:hover:border-blue-500 transition-all focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600"
          onClick={() => navigate("/")}
          type="button"
          aria-label="Go to home"
        >
          <HomeIcon className="w-6 h-6" strokeWidth={1} />
        </button>
      </div>
      <div className="w-full max-w-4xl flex flex-col items-center bg-white dark:bg-gray-900 border border-blue-100 dark:border-gray-700 rounded-2xl shadow-lg p-4 sm:p-8">
        {mainPanel}
      </div>
    </div>
  );
}

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<ToolGrid tools={toolsWithSlug} asLink />} />
        <Route path="/:category/:toolId" element={<ToolView tools={toolsWithSlug} />} />
      </Routes>
      <footer className="w-full text-center py-2 text-gray-400 dark:text-gray-700 text-sm bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      Designed and Developed by{' '}
        <a
          href="https://github.com/shoaibansari007"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 dark:text-blue-300/30 hover:underline font-semibold"
        >
          @shoaibansari007
        </a>
      </footer>
    </>
  );
}

// Update ToolGrid to use Link if asLink prop is true
ToolGrid.defaultProps = {
  asLink: false,
};

export default App;
