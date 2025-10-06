"use client";
import { useLanguage } from "@/lib/i18n";
import { useTransition } from "react";

const LanguageToggle: React.FC = () => {
  const { lang, toggle } = useLanguage();
  const [pending, startTransition] = useTransition();
  const next = lang === 'es' ? 'EN' : 'ES';
  return (
    <button
      type="button"
      onClick={() => startTransition(toggle)}
      aria-label={lang === 'es' ? 'Cambiar a inglés' : 'Switch to Spanish'}
      className="relative inline-flex items-center justify-center w-10 h-10 rounded-lg border border-black/10 dark:border-white/15 bg-white/70 dark:bg-white/10 backdrop-blur text-[11px] font-semibold tracking-wide hover:ring-1 hover:ring-blue-500/40 transition disabled:opacity-60"
      disabled={pending}
    >
      {pending ? '…' : next}
    </button>
  );
};
export default LanguageToggle;
