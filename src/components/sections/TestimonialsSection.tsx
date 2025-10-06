"use client";
import { TESTIMONIALS } from "@/lib/data";
import ScrollReveal from "@/components/animations/ScrollReveal";
import { useLanguage } from "@/lib/i18n";
import { useState } from "react";

export const TestimonialsSection: React.FC = () => {
  const { t } = useLanguage();
  return (
  <section id="testimonials" tabIndex={-1} aria-label="Testimonios" className="min-h-screen flex items-center py-24 scroll-mt-16">
      <div className="mx-auto max-w-7xl px-4">
        <ScrollReveal>
          <h2 className="text-3xl sm:text-4xl headline-lg font-display tracking-tight mb-10 headline-gradient">{t('testimonials_heading')}</h2>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <p className="text-black/70 dark:text-white/70 leading-relaxed mb-4">
            {t('testimonials_intro')}
          </p>
        </ScrollReveal>

  <div className="relative min-h-[380px] rounded-2xl bg-gradient-to-b from-white/60 to-white/20 dark:from-slate-900/40 dark:to-slate-900/10 backdrop-blur overflow-hidden testimonials-wrap">
          {/* Burbujas */}
          <ul className="absolute inset-0 pointer-events-none">
            {TESTIMONIALS.map((item, i) => (
              <li
                key={item.id}
                className={`bubble bubble-${i % 5}`}
                aria-hidden="true"
              />
            ))}
          </ul>

          {/* Grid interactivo: 3 + 3 + CTA */}
          <InteractiveTestimonialsGrid />
        </div>
      </div>
    </section>
  );
};

const InteractiveTestimonialsGrid: React.FC = () => {
  const { t } = useLanguage();
  // Estado para controlar cuál tarjeta está mostrando autor (id -> bool)
  const [flipped, setFlipped] = useState<Record<string, boolean>>({});

  const toggle = (id: string) => {
    setFlipped(f => ({ ...f, [id]: !f[id] }));
  };

  // Tomamos solo 6 (3 + 3) y dejamos una tarjeta final de CTA
  const items = TESTIMONIALS.slice(0, 6);

  return (
    <div className="relative z-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 p-6">
      {items.map((item) => {
        const showMeta = !!flipped[item.id];
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => toggle(item.id)}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(item.id); } }}
            className="relative group rounded-2xl overflow-hidden border border-black/10 dark:border-white/10 bg-white/60 dark:bg-slate-900/60 backdrop-blur px-3 py-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60 transition shadow-sm hover:shadow-md"
            aria-pressed={showMeta}
            aria-label={showMeta ? `Autor: ${item.author}` : `Testimonio de ${item.author}`}
          >
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-white/40 to-transparent dark:from-white/5" />
            {/* Contenido animado */}
            <div className="relative min-h-[140px] flex flex-col">
              <div className={`flex-1 transition-opacity duration-300 ${showMeta ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                <p className="text-xs sm:text-sm leading-snug text-black/70 dark:text-white/70 line-clamp-7">
                  {item.content}
                </p>
              </div>
              <div className={`flex-1 absolute inset-0 flex flex-col justify-center items-start gap-1 transition-opacity duration-300 ${showMeta ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                <p className="font-medium text-sm text-black dark:text-white">{item.author}</p>
                <p className="text-xs text-black/70 dark:text-white/60">{item.role}</p>
                {item.company && <p className="text-[10px] uppercase tracking-wide text-black/50 dark:text-white/40">{item.company}</p>}
                <span className="mt-2 inline-flex items-center text-[10px] px-2 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-300 border border-blue-500/20">{t('testimonials_toggle_hint')}</span>
              </div>
            </div>
          </button>
        );
      })}
      {/* Tarjeta CTA final */}
      <div className="col-span-2 sm:col-span-3 lg:col-span-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
        <div className="hidden lg:block" />
        <div className="hidden lg:block" />
        <div className="hidden lg:block" />
        <div className="hidden sm:block lg:hidden" />
        <div className="hidden sm:block lg:hidden" />
        <a
          href="#contact"
          className="group relative rounded-2xl overflow-hidden border border-blue-500/30 bg-gradient-to-br from-blue-500/15 via-indigo-500/15 to-transparent dark:from-blue-500/20 dark:via-indigo-500/20 dark:to-transparent backdrop-blur p-6 flex flex-col justify-center items-start gap-3 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60 transition min-h-[160px] lg:col-span-2 sm:col-span-2 col-span-2"
          aria-label="Ir a contacto"
        >
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-gradient-to-br from-blue-500/20 to-indigo-500/20 pointer-events-none" />
          <h3 className="text-lg font-semibold text-blue-700 dark:text-blue-300">{t('testimonials_cta_more_title')}</h3>
            <p className="text-sm text-black/70 dark:text-white/70 max-w-[26ch]">{t('testimonials_cta_more_text')}</p>
            <span className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 dark:text-blue-300 group-hover:underline">
              {t('btn_lets_talk')}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </span>
        </a>
      </div>
    </div>
  );
};
export default TestimonialsSection;
