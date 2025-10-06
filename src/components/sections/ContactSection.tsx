"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope, FaPhone, FaCheck } from "react-icons/fa";
import ScrollReveal from "@/components/animations/ScrollReveal";
import { useLanguage } from "@/lib/i18n";
import Highlight from "@/components/ui/Highlight";

export const ContactSection: React.FC = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const { t } = useLanguage();

  const copy = async (text: string, setter: (v: boolean) => void) => {
    const markCopied = () => { setter(true); setTimeout(() => setter(false), 1800); };
    try {
      await navigator.clipboard.writeText(text);
      markCopied();
    } catch {
      try {
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.style.position = 'fixed';
        ta.style.top = '-1000px';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
        markCopied();
      } catch {
        // fallback final: no se pudo copiar
      }
    }
  };

  const isMobile = () => {
    if (typeof navigator === "undefined") return false;
    return /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  };
  return (
  <section id="contact" tabIndex={-1} aria-label={t('nav_contact')} className="min-h-screen flex items-center py-24 relative scroll-mt-16">
        {/* Región accesible para lectores de pantalla */}
        <div className="sr-only" aria-live="polite" aria-atomic="true">
          {copiedEmail ? t('contact_live_email') : copiedPhone ? t('contact_live_phone') : ""}
        </div>
        <div className="mx-auto max-w-3xl px-4 text-center">
          <ScrollReveal>
            <h2 className="text-3xl sm:text-4xl headline-lg font-display tracking-tight mb-6 headline-gradient">{t('contact_heading')}</h2>
          </ScrollReveal>
          <ScrollReveal delay={0.08}>
            <p className="text-black/70 dark:text-white/70 mb-10">
              <Highlight
                text={t('contact_intro_full')}
                words={{
                  es: ['escalables','consultoría','idea'],
                  en: ['scalable','consulting','idea']
                }}
              />
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.12} y={10}>
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href="https://github.com/JCamiloC"
                target="_blank"
                className="flex items-center gap-2 px-5 py-3 rounded-lg bg-black text-white dark:bg-white dark:text-black text-sm font-medium hover:scale-[1.03] transition"
                rel="noopener noreferrer"
                aria-label={`${t('contact_github_aria')}: JCamiloC`}
                title={`GitHub: JCamiloC`}
              >
                <FaGithub /> GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/jcamiloc"
                target="_blank"
                className="flex items-center gap-2 px-5 py-3 rounded-lg bg-blue-600 text-white text-sm font-medium hover:scale-[1.03] transition"
                rel="noopener noreferrer"
                aria-label={`${t('contact_linkedin_aria')}: Juan Camilo`}
                title="LinkedIn: jcamiloc"
              >
                <FaLinkedin /> LinkedIn
              </a>
              <a
                href="mailto:cerinzajuanc@gmail.com"
                onClick={(e) => { copy("cerinzajuanc@gmail.com", setCopiedEmail); if (!isMobile()) e.preventDefault(); }}
                className="flex items-center gap-2 px-5 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-medium hover:scale-[1.03] transition"
                aria-label={`${t('contact_email_aria')}: cerinzajuanc@gmail.com`}
                title={t('contact_email_aria')}
              >
                <FaEnvelope /> {t('contact_button_email')}
              </a>
              <a
                href="tel:+573506765125"
                onClick={(e) => { copy("+573506765125", setCopiedPhone); if (!isMobile()) e.preventDefault(); }}
                className="flex items-center gap-2 px-5 py-3 rounded-lg bg-emerald-600 text-white text-sm font-medium hover:scale-[1.03] transition"
                aria-label={`${t('contact_phone_aria')}: +57 350 676 5125`}
                title={t('contact_phone_aria')}
              >
                <FaPhone /> {t('contact_button_phone')}
              </a>
            </div>
          </ScrollReveal>
        </div>
        {/* Toast visual de copiado */}
        <AnimatePresence>
          {(copiedEmail || copiedPhone) && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.98 }}
              transition={{ duration: 0.18 }}
              className="fixed top-6 right-6 z-50 px-4 py-3 rounded-lg border border-white/10 bg-black/80 text-white shadow-lg backdrop-blur"
              role="status"
              aria-live="polite"
            >
              <div className="flex items-center gap-2">
                <FaCheck className="text-emerald-400" />
                <span>{copiedEmail ? t('contact_toast_email') : t('contact_toast_phone')}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
    </section>
  );
};
export default ContactSection;
