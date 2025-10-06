"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef, useMemo } from "react";
import { useLanguage } from "@/lib/i18n";
import Highlight from "@/components/ui/Highlight";
import Image from "next/image";
// Parallax images removed for performance

// Sección Hero sin canvas propio: fondo de partículas es global en el layout
export const HeroSection: React.FC = () => {
  const { t } = useLanguage();
  const phrases = useMemo(() => [
    t('hero_sub_1'),
    t('hero_sub_2'),
    t('hero_sub_3'),
    t('hero_sub_4'),
  ], [t]);
  const [idx, setIdx] = useState(0);
  const avatarRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const id = setInterval(() => setIdx((i) => (i + 1) % phrases.length), 2400);
    return () => clearInterval(id);
  }, [phrases.length]);

  // Parallax suave sobre la silueta (sólo pointer fino y sin reduced motion)
  useEffect(() => {
    const wrap = avatarRef.current;
    if (!wrap) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const fine = window.matchMedia('(pointer:fine)').matches;
    if (reduce || !fine) return;
    const img = wrap.querySelector<HTMLImageElement>('img.hero-avatar');
    if (!img) return;
    const handle = (e: PointerEvent) => {
      const r = wrap.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = (e.clientX - cx) / r.width; // -0.5..0.5 aprox
      const dy = (e.clientY - cy) / r.height;
      img.style.transform = `translate(${dx * 18}px, ${dy * 20}px)`;
    };
    window.addEventListener('pointermove', handle);
    return () => window.removeEventListener('pointermove', handle);
  }, []);

  return (
    <section
      id="hero"
      tabIndex={-1}
      aria-label="Sección de presentación"
      className="relative min-h-screen flex items-center overflow-hidden scroll-mt-16"
    >
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 grid lg:grid-cols-[1fr_auto] gap-12 items-center">
        <div className="text-center lg:text-left max-w-2xl mx-auto lg:mx-0">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            className="text-4xl sm:text-6xl headline-lg font-display tracking-tight headline-gradient headline-pulse"
          >
            {t('hero_title_prefix')} {' '}
            <span
              className="relative shimmer-text glow-pulse"
              style={{ textUnderlineOffset: '10px' }}
            >
              Juan Chaparro
            </span>
          </motion.h1>
          <div className="mt-3 h-8 sm:h-9 overflow-hidden" aria-live="polite">
            <AnimatePresence mode="wait">
              <motion.span
                key={idx}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="inline-block text-lg sm:text-xl font-medium text-blue-600 dark:text-blue-400"
              >
                {phrases[idx]}
              </motion.span>
            </AnimatePresence>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.2, ease: 'easeOut' }}
            className="mt-6 text-lg text-balance text-black/70 dark:text-white/70"
          >
            <Highlight
              text={`${t('hero_paragraph_1')} ${t('hero_paragraph_2')}`}
              words={{
                es: ['innovación','cloud','automatización','escalables'],
                en: ['innovation','cloud','automation','scalable']
              }}
            />
          </motion.p>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.25, ease: 'easeOut' }}
          ref={avatarRef}
          className="hero-avatar-wrap mx-auto lg:mx-0"
          aria-hidden="true"
        >
          <div className="hero-avatar-glow" />
          <Image
            src="/profile/ghibli.png"
            alt="Ilustración estilo Ghibli de Juan Chaparro"
            width={640}
            height={900}
            priority
            draggable={false}
            className="hero-avatar select-none"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
