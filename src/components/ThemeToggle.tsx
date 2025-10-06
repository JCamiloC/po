"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

// Toggle de tema persistente usando localStorage y clase 'dark' en <html>
export const ThemeToggle: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof window === "undefined") return "light";
    const stored = window.localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    return (stored as "light" | "dark") || (prefersDark ? "dark" : "light");
  });

  // Mount: apply initial theme once
  useEffect(() => {
    setMounted(true);
    applyTheme(theme);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- we only want initial run
  }, []);

  // When theme changes via button, apply side effects
  useEffect(() => {
    if (!mounted) return;
    const root = document.documentElement;
    if (theme === "dark") root.classList.add("dark"); else root.classList.remove("dark");
    window.localStorage.setItem("theme", theme);
  }, [theme, mounted]);

  const applyTheme = (t: "light" | "dark") => setTheme(t);

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
