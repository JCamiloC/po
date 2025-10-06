"use client";
import { useEffect, useRef } from "react";

// Fondo de partículas global, accesible y respetuoso con reduce motion
export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let raf = 0;
    let particles: { x: number; y: number; r: number; vx: number; vy: number }[] = [];
    const mouse = { x: -9999, y: -9999 };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const count = Math.floor((canvas.width * canvas.height) / 45000);
      const N = Math.max(30, Math.min(140, count));
      particles = Array.from({ length: N }, () => {
        // distribución ponderada: más pequeños que grandes
        const u = Math.random();
        const r = u * u * 3.5 + 1; // 1px a ~4.5px, sesgado a pequeño
        return {
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          r,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
        };
      });
    };
    resize();
    window.addEventListener("resize", resize);

    const handlePointer = (e: PointerEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener("pointermove", handlePointer);

    const drawConnections = (pulse: number) => {
      const D = 110; // distancia máxima para conectar
      const D2 = D * D;
      const maxLines = 1200; // cap de líneas por frame
      let drawn = 0;
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < D2) {
            const d = Math.sqrt(d2);
            const t = 1 - d / D; // 0..1 cuanto más cerca, mayor
            const sizeFactor = Math.min(1, (a.r + b.r) / 8);
            const baseAlpha = Math.min(0.22, 0.06 + t * 0.16) * sizeFactor;
            const alpha = Math.min(0.25, baseAlpha * pulse);
            const color = `rgba(96,165,250,${alpha})`;
            ctx.strokeStyle = color; // azul con alfa según distancia/tamaño
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
            drawn++;
            if (drawn >= maxLines) return;
          }
        }
      }
    };

    const loop = () => {
      if (document.hidden) {
        raf = requestAnimationFrame(loop);
        return;
      }
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const now = performance.now() * 0.001;
      // Pulso muy sutil (92%..100%) cuando no hay reduce motion
      const pulse = media.matches ? 1 : 0.92 + 0.08 * (0.5 + 0.5 * Math.sin(now * 0.9));
      if (media.matches) {
        // Solo render, no animar si reduce motion
        particles.forEach((p) => {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(96,165,250,0.25)";
          ctx.fill();
        });
        // Dibujar conexiones estáticas en reduce motion
        drawConnections(1);
        raf = requestAnimationFrame(loop);
        return;
      }
      particles.forEach((p) => {
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          p.x += (dx / (dist || 1)) * 0.8;
          p.y += (dy / (dist || 1)) * 0.8;
        } else {
          p.x += p.vx;
          p.y += p.vy;
        }
        if (p.x < 0) p.x = canvas.width; else if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height; else if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        const alpha = Math.min(0.5, 0.18 + (p.r / 5) * 0.25);
        ctx.fillStyle = `rgba(96,165,250,${alpha})`; // blue-400 con alpha por tamaño
        ctx.fill();
      });
      // Conexiones dinámicas
      drawConnections(pulse);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", handlePointer);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 pointer-events-none"
      aria-hidden="true"
    />
  );
}
