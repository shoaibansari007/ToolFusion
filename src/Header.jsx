import React from "react";
import { Sun, Moon } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Header() {
  // Dark mode logic (same as DashboardLayout)
  React.useEffect(() => {
    if (!document.documentElement.classList.contains("dark")) {
      document.documentElement.classList.add("dark");
    }
  }, []);
  const [dark, setDark] = React.useState(() =>
    document.documentElement.classList.contains("dark")
  );
  const toggleDark = () => {
    setDark((d) => {
      if (d) {
        document.documentElement.classList.remove("dark");
      } else {
        document.documentElement.classList.add("dark");
      }
      return !d;
    });
  };

  // Kolkata clock
  const [time, setTime] = React.useState(() => new Date());
  React.useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const navigate = useNavigate();

  // Format time for Kolkata
  const getKolkataTime = (date, withSeconds = true) => {
    return date.toLocaleTimeString("en-IN", {
      hour12: false,
      timeZone: "Asia/Kolkata",
      hour: "2-digit",
      minute: "2-digit",
      ...(withSeconds ? { second: "2-digit" } : {})
    });
  };

  // Logo SVG (from DashboardLayout)
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
    <header className="w-full flex items-center justify-between px-4 md:px-8 py-3 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm sticky top-0 z-50">
      {/* Left: Dark mode toggle */}
      <div className="flex items-center">
        <button
          className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 shadow hover:ring-2 hover:ring-blue-400 dark:hover:ring-blue-600 transition-all focus:outline-none"
          onClick={toggleDark}
          type="button"
          aria-label="Toggle dark mode"
        >
          {dark ? <Sun className="w-6 h-6" strokeWidth={1} /> : <Moon className="w-6 h-6" strokeWidth={1} />}
        </button>
      </div>
      {/* Center: Logo (clickable) */}
      <div
        className="flex items-center justify-center cursor-pointer select-none hover:opacity-80 transition-opacity"
        onClick={() => navigate("/")}
        role="button"
        tabIndex={0}
        aria-label="Go to home"
        onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') navigate('/'); }}
      >
        {Logo}
        <span className="ml-2 text-2xl font-bold text-gray-900 dark:text-white">ToolFusion</span>
      </div>
      {/* Right: Kolkata clock */}
      <div className="flex items-center text-lg font-mono text-gray-700 dark:text-gray-200 min-w-[80px] justify-end">
        {/* Mobile: no seconds, no IST */}
        <span className="block sm:hidden">{getKolkataTime(time, false)}</span>
        {/* Desktop: full time with seconds and IST */}
        <span className="hidden sm:flex items-center">{getKolkataTime(time, true)}<span className="ml-2 text-xs text-gray-400 dark:text-gray-500">IST</span></span>
      </div>
    </header>
  );
} 