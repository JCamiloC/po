import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* No-flash theme logic: aplica 'dark' antes de hidratar */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(() => {
  try {
    const s = localStorage.getItem('theme');
    const d = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const t = s || (d ? 'dark' : 'light');
    if (t === 'dark') document.documentElement.classList.add('dark');
  } catch {}
})();`,
          }}
        />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
