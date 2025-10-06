"use client";
import React from 'react';

const FontDisplayToggle: React.FC = () => {
  const onClick = () => {
    document.body.classList.toggle('use-alt-display');
  };
  return (
    <button
      type="button"
      onClick={onClick}
      className="fixed bottom-6 left-6 z-50 px-3 py-2 rounded-md bg-black/60 dark:bg-white/10 text-white text-xs backdrop-blur border border-white/15 hover:scale-[1.03] transition"
      aria-label="Alternar fuente de titulares"
    >
      Fuente H
    </button>
  );
};

export default FontDisplayToggle;