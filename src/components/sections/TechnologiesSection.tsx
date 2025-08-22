"use client";
import dynamic from "next/dynamic";
import { Suspense } from "react";
// Carga dinámica del placeholder del globo (cliente) para evitar SSR
const TechGlobe = dynamic(() => import("../visuals/TechGlobe"), { ssr: false });

export const TechnologiesSection: React.FC = () => {
  return (
  <section id="tech" aria-label="Tecnologías" className="relative py-32 min-h-[80vh] flex items-center">
      <div className="mx-auto max-w-7xl px-4 grid md:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-6">Tecnologías</h2>
          <p className="text-black/70 dark:text-white/70 leading-relaxed mb-4">
            Visualización conceptual tipo globo interactivo (placeholder). Aquí
            se mostrarán logos distribuidos alrededor de una esfera 3D.
          </p>
          <ul className="grid grid-cols-3 gap-4 text-sm opacity-80">
            {['Next.js','TypeScript','React','Tailwind','Three.js','Node','Vercel','Git','Framer'].map(t => (
              <li key={t} className="rounded border border-black/10 dark:border-white/15 px-3 py-2 text-center">{t}</li>
            ))}
          </ul>
        </div>
        <div className="relative">
          <Suspense fallback={<div className="h-80 flex items-center justify-center">Cargando...</div>}>
            <TechGlobe />
          </Suspense>
        </div>
      </div>
    </section>
  );
};
export default TechnologiesSection;
