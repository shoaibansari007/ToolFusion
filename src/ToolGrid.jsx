import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function ToolGrid({ tools, onSelectTool, asLink }) {
  const [search, setSearch] = useState("");

  // Filter tools by search (label or keywords)
  const filteredTools = tools.filter(tool => {
    const query = search.toLowerCase();
    const labelMatch = tool.label.toLowerCase().includes(query);
    const keywordMatch = tool.keywords && tool.keywords.some(kw => kw.toLowerCase().includes(query));
    return labelMatch || keywordMatch;
  });

  // Group filtered tools by category
  const categories = {};
  filteredTools.forEach(tool => {
    if (!categories[tool.category]) categories[tool.category] = [];
    categories[tool.category].push(tool);
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col items-center px-4 py-10">
      <div className="w-full max-w-xl mb-10 sticky top-[64px] z-30 bg-gray-50 dark:bg-transparent pt-4 pb-4">
        <input
          type="text"
          className="w-full text-2xl md:text-3xl px-6 py-5 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 bg-blue-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600 placeholder-gray-400 dark:placeholder-gray-500"
          placeholder="Search tools..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          autoFocus
        />
      </div>
      <div className="w-full max-w-6xl flex flex-col gap-12">
        {Object.keys(categories).length === 0 ? (
          <div className="col-span-full text-center text-gray-400 dark:text-gray-500 text-xl py-20">No tools found.</div>
        ) : (
          Object.entries(categories).map(([category, toolsInCategory]) => (
            <div key={category} className="bg-blue-50 dark:bg-gray-800 rounded-2xl shadow-lg border border-blue-100 dark:border-gray-700 p-3 sm:p-6">
              <h2 className="text-lg sm:text-2xl font-bold mb-6 text-blue-800 dark:text-blue-300">{category}</h2>
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-8">
                {toolsInCategory.map(tool => (
                  asLink ? (
                    <Link
                      key={tool.id}
                      to={`/${tool.categorySlug}/${tool.id}`}
                      className="flex flex-col items-center justify-center p-4 rounded-2xl shadow group bg-white dark:bg-gray-900 border border-blue-100 dark:border-gray-700 hover:bg-blue-50 dark:hover:bg-gray-800 hover:border-blue-400 dark:hover:border-blue-500 transition-all focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600"
                      aria-label={tool.label}
                    >
                      <span className="mb-4 text-[100px] text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">{tool.icon}</span>
                      <span className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white text-center">{tool.label}</span>
                    </Link>
                  ) : (
                    <button
                      key={tool.id}
                      className="flex flex-col items-center justify-center p-4 rounded-2xl shadow group bg-white dark:bg-gray-900 border border-blue-100 dark:border-gray-700 hover:bg-blue-50 dark:hover:bg-gray-800 hover:border-blue-400 dark:hover:border-blue-500 transition-all focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600"
                      onClick={() => onSelectTool(tool.id)}
                      type="button"
                      aria-label={tool.label}
                    >
                      <span className="mb-4 text-[100px] text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">{tool.icon}</span>
                      <span className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white text-center">{tool.label}</span>
                    </button>
                  )
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
} 