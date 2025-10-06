"use client";
import React from 'react';
import { useLanguage } from '@/lib/i18n';

interface HighlightProps {
  text: string;
  words: { es: string[]; en: string[] };
  className?: string;
  highlightClassName?: string;
}

// Escapa caracteres especiales de regex
const esc = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

export const Highlight: React.FC<HighlightProps> = ({ text, words, className = '', highlightClassName = 'highlight-word' }) => {
  const { lang } = useLanguage();
  const list = (lang === 'es' ? words.es : words.en).filter(Boolean);
  if (!list.length) return <>{text}</>;
  // Construimos patrón (ordenar por longitud para capturar palabras largas primero)
  const sorted = [...list].sort((a,b) => b.length - a.length);
  const pattern = new RegExp(`(${sorted.map(esc).join('|')})`, 'gi');
  const parts = text.split(pattern);
  return (
    <span className={className}>
      {parts.map((part, i) => {
        if (!part) return null;
        const match = sorted.find(w => w.toLowerCase() === part.toLowerCase());
        return match ? (
          <mark key={i} className={highlightClassName}>{part}</mark>
        ) : (
          <React.Fragment key={i}>{part}</React.Fragment>
        );
      })}
    </span>
  );
};

export default Highlight;