"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import clsx from "clsx";
import ThemeToggle from "./ThemeToggle";

// Navbar fijo superior
export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const base = "fixed top-0 inset-x-0 z-50 transition-colors backdrop-blur border-b";
  return (
    <nav
      className={clsx(
        base,
        scrolled
          ? "bg-white/70 dark:bg-black/40 border-black/10 dark:border-white/10"
          : "bg-transparent border-transparent"
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 flex h-14 items-center justify-between">
        <Link href="#" className="font-semibold tracking-tight text-lg">
          JC / Portafolio
        </Link>
        {/* Botón hamburguesa (mobile) */}
        <button
          className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg border border-black/10 dark:border-white/15 bg-white/70 dark:bg-white/10 backdrop-blur"
          aria-label="Abrir menú"
          aria-expanded={open}
          aria-controls="primary-menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">Menú</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>

        <ul
          id="primary-menu"
          className={clsx(
            "items-center gap-6 text-sm font-medium",
            "hidden md:flex"
          )}
        >
          {[
            { id: "hero", label: "Inicio" },
            { id: "tech", label: "Tecnologías" },
            { id: "projects", label: "Proyectos" },
            { id: "testimonials", label: "Testimonios" },
            { id: "contact", label: "Contacto" },
          ].map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                {item.label}
              </a>
            </li>
          ))}
          <li>
            <ThemeToggle />
          </li>
        </ul>

        {/* Menú desplegable móvil */}
        {open && (
          <div className="absolute top-14 left-0 right-0 md:hidden border-b border-black/10 dark:border-white/10 bg-white/90 dark:bg-black/70 backdrop-blur">
            <ul className="px-4 py-3 grid gap-3 text-sm">
              {[
                { id: "hero", label: "Inicio" },
                { id: "tech", label: "Tecnologías" },
                { id: "projects", label: "Proyectos" },
                { id: "testimonials", label: "Testimonios" },
                { id: "contact", label: "Contacto" },
              ].map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={() => setOpen(false)}
                    className="block py-2 hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li className="pt-2 border-t border-black/10 dark:border-white/10">
                <ThemeToggle />
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
