"use client";
import dynamic from "next/dynamic";
import { Suspense, useEffect, useMemo, useState } from "react";
import { useReducedMotion } from "framer-motion";
import ScrollReveal from "@/components/animations/ScrollReveal";
import Highlight from "@/components/ui/Highlight";
import { useLanguage } from "@/lib/i18n";
// Carga dinámica del placeholder del globo (cliente) para evitar SSR
const TechGlobe = dynamic(() => import("../visuals/TechGlobe"), { ssr: false });

export const TechnologiesSection: React.FC = () => {
  const reduce = useReducedMotion();
  const { t } = useLanguage();
  const techs = useMemo(
    () => ["Next.js", "TypeScript", "React", "Tailwind", "Cloud", "Node", "Docker", "Git", "IA"],
    []
  );
  const [active, setActive] = useState<number>(-1);

  useEffect(() => {
    if (reduce) return; // respetar reduce motion: sin animación
    let last = -1;
    const pick = () => {
      let n = Math.floor(Math.random() * techs.length);
      if (n === last) n = (n + 1) % techs.length;
      last = n;
      setActive(n);
    };
    pick();
    const base = 2200;
    const id = window.setInterval(() => {
      pick();
    }, base);
    return () => window.clearInterval(id);
  }, [reduce, techs.length]);
  return (
  <section id="tech" tabIndex={-1} aria-label={t('nav_tech')} className="relative py-32 min-h-[80vh] flex items-center scroll-mt-16">
      <div className="mx-auto max-w-7xl px-4 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <ScrollReveal>
              <h2 className="text-3xl sm:text-4xl headline-lg font-display tracking-tight mb-6 headline-gradient">{t('tech_heading')}</h2>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <p className="text-black/70 dark:text-white/70 leading-relaxed mb-4">
                <Highlight
                  text={t('tech_intro')}
                  words={{
                    es: ['stack','escalables','IA','cloud'],
                    en: ['stack','scalable','AI','cloud']
                  }}
                />
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.15}>
              <ul className="grid grid-cols-3 gap-4 text-sm opacity-80">
                {techs.map((t, i) => (
                  <li
                    key={t}
                    className={
                      `neon-chip rounded border border-black/10 dark:border-white/15 px-3 py-2 text-center ` +
                      (i === active && !reduce ? "neon-active" : "")
                    }
                  >
                    {t}
                  </li>
                ))}
              </ul>
            </ScrollReveal>
          </div>
          <div className="relative">
            <Suspense fallback={<div className="h-80 flex items-center justify-center">{t('tech_loading')}</div>}>
              <TechGlobe />
            </Suspense>
          </div>
      </div>
    </section>
  );
};
export default TechnologiesSection;
