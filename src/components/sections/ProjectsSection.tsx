"use client";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { PROJECTS } from "@/lib/data"; // p1 eliminado; lista inicia en p2 a p6
import { useLanguage } from "@/lib/i18n";
import Highlight from "@/components/ui/Highlight";
import ScrollReveal from "@/components/animations/ScrollReveal";

const CoverSlider: React.FC<{
  images: { id: string; src: string; alt: string }[];
  intervalMs?: number;
  className?: string;
  fitMode?: 'contain' | 'cover';
  showControls?: boolean;
  showDots?: boolean;
}> = ({ images, intervalMs = 4500, className = "", fitMode = 'contain', showControls = false, showDots = false }) => {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const isVisibleRef = useRef(true);
  // Drag / swipe state
  const startXRef = useRef<number | null>(null);
  const draggingRef = useRef(false);
  const [dragX, setDragX] = useState(0);
  const velocityRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!wrapRef.current) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => { isVisibleRef.current = e.isIntersecting; });
    });
    observer.observe(wrapRef.current);
    return () => observer.disconnect();
  }, []);

  const clearTimer = () => { if (timerRef.current) clearTimeout(timerRef.current); timerRef.current = null; };
  useEffect(() => {
    clearTimer();
    if (!images.length || paused) return;
    timerRef.current = setTimeout(() => {
      if (isVisibleRef.current) setIndex(i => (i + 1) % images.length);
    }, intervalMs);
    return clearTimer;
  }, [images.length, intervalMs, paused, index]);

  const current = images[index] || { id: 'ph', src: '/placeholder.svg', alt: '' };
  const objectClass = fitMode === 'contain' ? 'object-contain p-2' : 'object-cover';

  const go = (dir: number) => {
    setPaused(true);
    setIndex(i => (i + dir + images.length) % images.length);
    // restart autoplay after short delay
    setTimeout(() => setPaused(false), 600);
  };

  const onPointerDown = (e: React.PointerEvent) => {
    if (!images.length) return;
    // Evitar que un click en los controles de navegación inicie drag y bloquee el onClick
    if ((e.target as HTMLElement).closest('[data-slider-control]')) return;
    startXRef.current = e.clientX;
    draggingRef.current = true;
    setPaused(true);
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!draggingRef.current || startXRef.current == null) return;
    const dx = e.clientX - startXRef.current;
    setDragX(dx);
    velocityRef.current = dx; // simple velocity approximation
  };
  const endDrag = () => {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    const threshold = 50;
    const dx = dragX;
    setDragX(0);
    if (Math.abs(dx) > threshold) {
      if (dx < 0) setIndex(i => (i + 1) % images.length);
      else setIndex(i => (i - 1 + images.length) % images.length);
    }
    // resume autoplay after short delay
    setTimeout(() => setPaused(false), 300);
  };
  const onPointerUp = () => endDrag();
  const onPointerCancel = () => endDrag();

  return (
    <div
      ref={wrapRef}
      className={`relative w-full aspect-square overflow-hidden rounded-md bg-gradient-to-br from-slate-200/50 via-white/40 to-slate-100/30 dark:from-slate-800/60 dark:via-slate-900/50 dark:to-slate-800/40 touch-pan-y select-none ${className}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => !draggingRef.current && setPaused(false)}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerCancel}
    >
      {/* Skeleton */}
      {!loaded && (
        <div className="absolute inset-0 animate-pulse flex items-center justify-center text-xs tracking-wide text-black/40 dark:text-white/30 bg-black/5 dark:bg-white/5">
          Cargando…
        </div>
      )}
      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
          style={dragX ? { transform: `translateX(${dragX}px)` } : undefined}
        >
          <Image
            src={current.src}
            alt={current.alt}
            fill
            className={objectClass + " select-none"}
            sizes="(max-width:768px) 100vw, 33vw"
            draggable={false}
            onLoad={() => setLoaded(true)}
          />
        </motion.div>
      </AnimatePresence>
      {images.length > 1 && showControls && (
        <SliderControls go={go} />
      )}
      {images.length > 1 && showDots && (
        <Dots images={images} index={index} setIndex={(i:number)=>{ setIndex(i); setPaused(true); setTimeout(()=>setPaused(false),800); }} />
      )}
    </div>
  );
};

// Extracted to access translation context cleanly
const SliderControls: React.FC<{ go: (dir:number)=>void }> = ({ go }) => {
  const { t } = useLanguage();
  return (
    <>
      <button
        type="button"
        aria-label={t('slider_prev')}
        data-slider-control
        onClick={(e) => { e.stopPropagation(); go(-1); }}
        onPointerDown={(e) => e.stopPropagation()}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full backdrop-blur bg-black/45 hover:bg-black/70 text-white text-sm flex items-center justify-center transition"
      >&lt;</button>
      <button
        type="button"
        aria-label={t('slider_next')}
        data-slider-control
        onClick={(e) => { e.stopPropagation(); go(1); }}
        onPointerDown={(e) => e.stopPropagation()}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full backdrop-blur bg-black/45 hover:bg-black/70 text-white text-sm flex items-center justify-center transition"
      >&gt;</button>
    </>
  );
};

const Dots: React.FC<{ images:{id:string;src:string;alt:string}[]; index:number; setIndex:(i:number)=>void }> = ({ images, index, setIndex }) => {
  const { t } = useLanguage();
  return (
    <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-2 z-10">
      {images.map((img, i) => (
        <button
          key={img.id || i}
          aria-label={`${t('slider_go_to_image')} ${i + 1}`}
          onClick={() => setIndex(i)}
          className={`h-2.5 w-2.5 rounded-full transition ${i === index ? 'bg-blue-500 shadow-[0_0_0_4px_rgba(59,130,246,0.25)]' : 'bg-white/60 dark:bg-white/30 hover:bg-white/80'}`}
        />
      ))}
    </div>
  );
};

const Card: React.FC<{
  title: string;
  summary: string;
  stack: string[];
  images: { id: string; src: string; alt: string }[];
  onOpen: (images: { id: string; src: string; alt: string }[], title: string) => void;
}> = ({ title, summary, stack, images, onOpen }) => {
  const [hover, setHover] = useState(false);
  const { t } = useLanguage();

  return (
    <div
      className="group perspective focus:outline-none h-[460px] sm:h-[500px]"
      tabIndex={0}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onFocus={() => setHover(true)}
      onBlur={() => setHover(false)}
    >
      <motion.div
        className="relative size-full [transform-style:preserve-3d]"
        animate={{ rotateY: hover ? 180 : 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 25 }}
      >
        {/* Front */}
        <div className="absolute inset-0 rounded-xl overflow-hidden border border-black/10 dark:border-white/10 bg-white/60 dark:bg-white/5 backdrop-blur [backface-visibility:hidden] levitate flex flex-col">
            <CoverSlider images={images} className="flex-shrink-0" fitMode="contain" />
            <div className="p-4">
              <h3 className="font-semibold text-lg line-clamp-1">{title}</h3>
            </div>
          </div>
        {/* Back */}
        <div className="absolute inset-0 rounded-xl overflow-hidden border border-black/10 dark:border-white/10 bg-white/70 dark:bg-slate-900/70 backdrop-blur [transform:rotateY(180deg)] [backface-visibility:hidden] flex flex-col">
            <div className="p-4 flex flex-col h-full">
              <p className="text-sm text-black/70 dark:text-white/70 line-clamp-5">{summary}</p>
              <ul className="mt-3 flex flex-wrap gap-2 text-[11px]">
                {stack.map((s) => (
                  <li key={s} className="px-2 py-1 rounded bg-blue-500/10 text-blue-600 dark:text-blue-300 border border-blue-500/20">
                    {s}
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-4">
                <button onClick={() => onOpen(images, title)} className="btn-glass w-full">{t('project_view_demo')}</button>
              </div>
            </div>
          </div>
      </motion.div>
    </div>
  );
};

export const ProjectsSection: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImages, setModalImages] = useState<{ id: string; src: string; alt: string }[]>([]);
  const [modalTitle, setModalTitle] = useState("");
  const { t } = useLanguage();

  const openModal = (images: { id: string; src: string; alt: string }[], title: string) => {
    setModalImages(images.length ? images : [{ id: "ph", src: "/placeholder.svg", alt: title }]);
    setModalTitle(title);
    setModalOpen(true);
  };
  const closeModal = () => setModalOpen(false);

  return (
    <section id="projects" tabIndex={-1} aria-label="Proyectos" className="min-h-screen flex items-center py-24 scroll-mt-16">
      <div className="mx-auto max-w-7xl px-4">
        <ScrollReveal>
          <h2 className="text-3xl sm:text-4xl headline-lg font-display tracking-tight mb-10 headline-gradient">{t('projects_heading')}</h2>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <p className="text-black/70 dark:text-white/70 leading-relaxed mb-6">
            <Highlight
              text={t('projects_intro')}
              words={{
                es: ['valor','experiencias','resolver'],
                en: ['value','experiences','solve']
              }}
            />
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS.map((p) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <Card 
                title={p.title}
                summary={p.summary}
                stack={p.stack}
                images={p.images}
                onOpen={openModal}
              />
            </motion.div>
          ))}
          {/* CTA Card to testimonials */}
          <motion.div
            key="projects-cta-testimonials"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="h-[460px] sm:h-[500px]"
          >
            <div className="relative size-full rounded-xl overflow-hidden border border-black/10 dark:border-white/10 bg-gradient-to-br from-blue-50/70 via-white/60 to-indigo-100/50 dark:from-slate-800/70 dark:via-slate-800/60 dark:to-slate-900/60 backdrop-blur flex flex-col p-6">
              <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_30%_30%,rgba(59,130,246,0.25),transparent_65%)]" />
              <div className="relative flex flex-col h-full">
                <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-500 text-transparent bg-clip-text mb-4">{t('projects_cta_card_title')}</h3>
                <p className="text-sm text-black/70 dark:text-white/70 leading-relaxed pr-2">
                  <Highlight
                    text={t('projects_cta_card_text')}
                    words={{
                      es: ['testimonios','resultados','compromiso'],
                      en: ['feedback','results','commitment']
                    }}
                  />
                </p>
                <div className="mt-auto pt-6">
                  <a
                    href="#testimonials"
                    className="btn-glass inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium"
                    aria-label="Ir a testimonios"
                  >
                    {t('projects_cta_card_button')}
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M13 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Modal centrado con slider */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div
              className="relative max-w-3xl w-full rounded-xl overflow-hidden border border-white/10 bg-white/80 dark:bg-slate-900/80 backdrop-blur"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 border-b border-black/10 dark:border-white/10 flex items-center justify-between">
                <h3 className="font-semibold text-lg">{modalTitle}</h3>
                <button onClick={closeModal} aria-label={t('modal_close')} className="btn-glass">{t('modal_close')}</button>
              </div>
              <div className="p-6 flex items-center justify-center">
                <div className="w-full max-w-[560px] aspect-square">
                  <CoverSlider images={modalImages} intervalMs={6000} fitMode="contain" showControls showDots />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ProjectsSection;
