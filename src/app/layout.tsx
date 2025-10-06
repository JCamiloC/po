import type { Metadata } from "next";
import { Geist, Geist_Mono, Space_Grotesk, Manrope } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Navbar from "@/components/Navbar";
import ScrollProgress from "@/components/animations/ScrollProgress";
import ParticleBackground from "@/components/visuals/ParticleBackground";
import { I18nProvider } from "@/lib/i18n";
// Se reemplaza la fuente base por Manrope (moderna y legible). Se elimina el toggle temporal.

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  display: 'swap',
  weight: ['400','500','600','700']
});

const manrope = Manrope({
  variable: "--font-sans-modern",
  subsets: ["latin"],
  display: 'swap',
  weight: ['300','400','500','600','700','800']
});

export const metadata: Metadata = {
  title: {
    default: "Portafolio | Juan Chaparro",
    template: "%s | Portafolio Juan Chaparro"
  },
  description: "Portafolio personal con proyectos, tecnologías, testimonios y contacto.",
  openGraph: {
    title: "Portafolio | Juan Chaparro",
    description: "Explora mis proyectos, stack tecnológico y testimonios.",
    type: "website",
    locale: "es_ES",
    url: "https://tudominio.com",
    siteName: "Portafolio Juan Chaparro"
  },
  keywords: ["Juan Chaparro","portafolio","desarrollador","fullstack","Next.js","React"],
  authors: [{ name: "Juan Chaparro" }],
  creator: "Juan Chaparro"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
  <html lang="es" suppressHydrationWarning>
  <body className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} ${manrope.variable} antialiased font-sans`}> 
        <I18nProvider>
        {/* No-flash theme logic: aplica 'dark' antes de hidratar */}
        <Script id="theme-init" strategy="beforeInteractive">
          {`(() => {
  try {
    const s = localStorage.getItem('theme');
    const d = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const t = s || (d ? 'dark' : 'light');
    if (t === 'dark') document.documentElement.classList.add('dark');
  } catch {}
})();`}
        </Script>
        {/* Skip link para navegación con teclado */}
        <a href="#content" className="skip-link">Saltar al contenido</a>
        <ParticleBackground />
        <Navbar />
        <ScrollProgress />
        {children}
        {/* CTA flotante */}
        <a href="#contact" className="cta-sticky btn-glass" aria-label="Hablemos">
          Hablemos
        </a>
        {/* Enfocar la sección destino al navegar por hash (#id) para accesibilidad */}
        <Script id="hash-focus" strategy="afterInteractive">
          {`(() => {
  const focusTarget = () => {
    try {
      const id = decodeURIComponent(location.hash.slice(1));
      if (!id) return;
      var el = document.getElementById(id);
      if (el && typeof el.focus === 'function') el.focus({ preventScroll: true });
    } catch {}
  };
  if (location.hash) requestAnimationFrame(focusTarget);
  window.addEventListener('hashchange', () => requestAnimationFrame(focusTarget));
})();`}
        </Script>
        </I18nProvider>
      </body>
    </html>
  );
}
