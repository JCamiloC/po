"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import clsx from "clsx";
import ThemeToggle from "./ThemeToggle";

// Navbar fijo superior
export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

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
  <ul className="flex gap-6 text-sm font-medium items-center">
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
      </div>
    </nav>
  );
};

export default Navbar;
