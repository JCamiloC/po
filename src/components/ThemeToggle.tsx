"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

// Toggle de tema persistente usando localStorage y clase 'dark' en <html>
export const ThemeToggle: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    setMounted(true);
    const stored = window.localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initial = (stored as "light" | "dark") || (prefersDark ? "dark" : "light");
    applyTheme(initial);
  }, []);

  const applyTheme = (t: "light" | "dark") => {
    setTheme(t);
    const root = document.documentElement;
    if (t === "dark") root.classList.add("dark"); else root.classList.remove("dark");
    window.localStorage.setItem("theme", t);
  };

  if (!mounted) return null;
  const isDark = theme === "dark";

  return (
    <button
      aria-label="Cambiar tema"
      className="relative inline-flex items-center justify-center w-10 h-10 rounded-lg border border-black/10 dark:border-white/15 bg-white/70 dark:bg-white/10 backdrop-blur text-xs font-medium"
      onClick={() => applyTheme(isDark ? "light" : "dark")}
    >
      <motion.span
        key={theme}
        initial={{ rotate: -90, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        exit={{ rotate: 90, opacity: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 18 }}
        className="block"
      >
        {isDark ? "🌙" : "☀️"}
      </motion.span>
    </button>
  );
};

export default ThemeToggle;
