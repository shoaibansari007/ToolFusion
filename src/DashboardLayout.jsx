import React from 'react';
import { Sun, Moon, Menu } from 'lucide-react';

export default function DashboardLayout({ tools, selectedTool, onSelectTool, children }) {
  // Set dark mode by default on first load
  React.useEffect(() => {
    if (!document.documentElement.classList.contains('dark')) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const [dark, setDark] = React.useState(() =>
    document.documentElement.classList.contains('dark')
  );
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  const toggleDark = () => {
    setDark((d) => {
      if (d) {
        document.documentElement.classList.remove('dark');
      } else {
        document.documentElement.classList.add('dark');
      }
      return !d;
    });
  };

  const Logo = (
    <span className="w-8 h-8 text-blue-600 dark:text-blue-400" aria-label="ToolFusion logo">
      <svg width="32" height="32" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
        <circle cx="24" cy="24" r="20" />
        <path d="M32 16l-8 8m0 0l-8 8m8-8l8 8m-8-8l-8-8" />
        <circle cx="24" cy="24" r="3" fill="currentColor"/>
      </svg>
    </span>
  );

  return (
    <div className="flex flex-col md:flex-row bg-gray-50 dark:bg-gray-900">
      {/* Mobile navbar */}
      <header className="flex md:hidden items-center justify-between px-4 py-3 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2">
          {Logo}
          <span className="text-2xl font-bold text-gray-900 dark:text-white">ToolFusion</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 shadow hover:ring-2 hover:ring-blue-400 dark:hover:ring-blue-600 transition-all focus:outline-none"
            onClick={toggleDark}
            type="button"
            aria-label="Toggle dark mode"
          >
            {dark ? <Sun className="w-6 h-6" strokeWidth={1} /> : <Moon className="w-6 h-6" strokeWidth={1} />}
          </button>
          <button
            className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 shadow hover:ring-2 hover:ring-blue-400 dark:hover:ring-blue-600 transition-all focus:outline-none"
            onClick={() => setSidebarOpen((v) => !v)}
            type="button"
            aria-label="Open sidebar menu"
          >
            <Menu className="w-6 h-6" strokeWidth={1} />
          </button>
        </div>
      </header>
      {/* Sidebar */}
      <aside
        className={`fixed z-40 top-0 left-0 h-full w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col p-4 transform transition-transform duration-200 md:static md:translate-x-0 md:flex md:h-screen md:w-64 md:overflow-y-auto custom-scrollbar
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}
        aria-label="Sidebar navigation"
      >
        <div className="flex items-center justify-between mb-8 md:mb-8">
          <div className="flex items-center gap-2 hidden md:flex">
            {Logo}
            <span className="text-2xl font-bold text-gray-900 dark:text-white">ToolFusion</span>
          </div>
          <button
            className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 shadow hover:ring-2 hover:ring-blue-400 dark:hover:ring-blue-600 transition-all focus:outline-none md:hidden"
            onClick={() => setSidebarOpen(false)}
            type="button"
            aria-label="Close sidebar menu"
          >
            <Menu className="w-6 h-6 rotate-90" strokeWidth={1} />
          </button>
          <button
            className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 shadow hover:ring-2 hover:ring-blue-400 dark:hover:ring-blue-600 transition-all focus:outline-none hidden md:flex"
            onClick={toggleDark}
            type="button"
            aria-label="Toggle dark mode"
          >
            {dark ? <Sun className="w-6 h-6" strokeWidth={1} /> : <Moon className="w-6 h-6" strokeWidth={1} />}
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto">
          <ul>
            {tools.map((tool) => (
              <li key={tool.id}>
                <button
                  className={`w-full text-left flex items-center gap-2 py-2 px-4 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 font-medium transition-colors ${selectedTool === tool.id ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200' : ''}`}
                  onClick={() => {
                    onSelectTool(tool.id);
                    setSidebarOpen(false);
                  }}
                  type="button"
                >
                  {tool.icon && <span className="text-lg">{tool.icon}</span>}
                  {tool.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
      {/* Main content */}
      <main className="flex-1 p-4 md:p-6 flex flex-col items-center justify-start md:ml-64 transition-all duration-200">
        {children}
      </main>
    </div>
  );
} 