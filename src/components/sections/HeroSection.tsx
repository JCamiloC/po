"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";

// Sección Hero con partículas reactivas al cursor (placeholder simple canvas + efecto)
export const HeroSection: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const phrases = [
    "Full Stack Developer",
    "Especialista en soluciones cloud",
    "Integraciones API & Automatización",
    "Web Apps rápidas y escalables",
  ];
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIdx((i) => (i + 1) % phrases.length), 2400);
    return () => clearInterval(id);
  }, [phrases.length]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrame: number;
    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: 2 + Math.random() * 3,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
    }));

    const mouse = { x: -9999, y: -9999 };
    const handlePointer = (e: PointerEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener("pointermove", handlePointer);

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resize);
    resize();

    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        // simple repulsion
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 140) {
          p.x += dx / dist;
          p.y += dy / dist;
        } else {
          p.x += p.vx;
          p.y += p.vy;
        }
        // wrap
        if (p.x < 0) p.x = canvas.width; else if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height; else if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(59,130,246,0.6)"; // azul tailwind 500
        ctx.fill();
      });
      animationFrame = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("pointermove", handlePointer);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
  <section id="hero" aria-label="Sección de presentación" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      <div className="relative z-10 max-w-3xl px-4 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="text-4xl sm:text-6xl font-bold tracking-tight"
        >
          Hola, soy{" "}
          <span
            className="relative shimmer-text glow-pulse"
            style={{ textUnderlineOffset: "10px" }}
          >
            Juan Chaparro
          </span>
        </motion.h1>
        {/* Subtítulo dinámico con Framer Motion */}
        <div className="mt-3 h-8 sm:h-9 overflow-hidden" aria-live="polite">
          <AnimatePresence mode="wait">
            <motion.span
              key={idx}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="inline-block text-lg sm:text-xl font-medium text-blue-600 dark:text-blue-400"
            >
              {phrases[idx]}
            </motion.span>
          </AnimatePresence>
        </div>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.2, ease: "easeOut" }}
          className="mt-6 text-lg text-balance text-black/70 dark:text-white/70"
        >
          Desarrollo digital que impulsa tu negocio.
          <br className="hidden sm:block" />
          Soy Full Stack Developer especializado en construir soluciones innovadoras con tecnologías modernas, IA y entornos cloud.
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          className="mt-10 flex justify-center"
        >
          <div className="w-40 h-40 rounded-full bg-gradient-to-tr from-blue-500/40 to-purple-500/40 border border-white/20 backdrop-blur flex items-center justify-center text-sm text-white/80">
            Foto Perfil
          </div>
        </motion.div>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white dark:from-black to-transparent pointer-events-none" />
    </section>
  );
};

export default HeroSection;
