"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PROJECTS } from "@/lib/data";

// Slider externo infinito horizontal + slider interno fade de imágenes
const sampleProjects = PROJECTS;

interface InternalSliderProps { images: { id: string; src: string; alt: string }[] }
const InternalSlider: React.FC<InternalSliderProps> = ({ images }) => {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 2500);
    return () => clearInterval(id);
  }, [images.length]);
  return (
    <div className="relative w-full aspect-[4/3] overflow-hidden rounded-lg bg-black/5 dark:bg-white/5">
      <AnimatePresence mode="wait">
        <motion.img
          key={images[index].id}
          src={images[index].src}
          alt={images[index].alt}
          className="absolute inset-0 w-full h-full object-contain p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        />
      </AnimatePresence>
    </div>
  );
};

export const ProjectsSection: React.FC = () => {
  // duplicamos para efecto infinito
  const track = [...sampleProjects, ...sampleProjects];
  return (
  <section id="projects" aria-label="Proyectos" className="py-32 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-10">Proyectos</h2>
        <div className="relative">
          <div className="[--duration:50s] animate-[marquee_var(--duration)_linear_infinite] flex gap-10 will-change-transform">
            {track.map((p, i) => (
              <div
                key={p.id + i}
                className="w-72 shrink-0 p-4 rounded-xl border border-black/10 dark:border-white/10 bg-white/60 dark:bg-white/5 backdrop-blur"
              >
                <InternalSlider images={p.images} />
                <h3 className="mt-4 font-semibold text-lg">{p.title}</h3>
                <p className="text-xs text-black/60 dark:text-white/60 line-clamp-3 leading-relaxed">
                  {p.summary}
                </p>
                <ul className="mt-3 flex flex-wrap gap-2 text-[10px]">
                  {p.stack.map((s) => (
                    <li
                      key={s}
                      className="px-2 py-1 rounded bg-blue-500/10 text-blue-600 dark:text-blue-300 border border-blue-500/20"
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
