"use client";
import React, { createContext, useContext, useState, useMemo } from 'react';

type Lang = 'es' | 'en';
type Dict = Record<string, { es: string; en: string }>;

const dict: Dict = {
  nav_home: { es: 'Inicio', en: 'Home' },
  nav_tech: { es: 'Tecnologías', en: 'Tech' },
  nav_projects: { es: 'Proyectos', en: 'Projects' },
  nav_testimonials: { es: 'Testimonios', en: 'Testimonials' },
  nav_contact: { es: 'Contacto', en: 'Contact' },
  hero_title_prefix: { es: 'Hola, soy', en: 'Hi, I am' },
  hero_sub_1: { es: 'Full Stack Developer', en: 'Full Stack Developer' },
  hero_sub_2: { es: 'Especialista en soluciones cloud', en: 'Cloud solutions specialist' },
  hero_sub_3: { es: 'Integraciones API & Automatización', en: 'API Integrations & Automation' },
  hero_sub_4: { es: 'Web Apps rápidas y escalables', en: 'Fast & scalable Web Apps' },
  hero_paragraph_1: { es: 'Desarrollo digital que impulsa tu negocio.', en: 'Digital development that drives your business.' },
  hero_paragraph_2: { es: 'Soy Full Stack Developer especializado en construir soluciones innovadoras con tecnologías modernas, IA y entornos cloud.', en: 'I\'m a Full Stack Developer focused on building innovative solutions with modern technologies, AI and cloud environments.' },
  testimonials_heading: { es: 'Lo que dicen sobre mí', en: 'What people say about me' },
  testimonials_intro: { es: 'La mejor manera de validar mi trabajo es a través de la experiencia de quienes han colaborado conmigo.', en: 'The best way to validate my work is through the experience of those who have collaborated with me.' },
  contact_heading: { es: '¿Hablamos de tu próximo proyecto?', en: 'Shall we talk about your next project?' },
  contact_intro: { es: 'Estoy disponible para colaborar en desarrollos a medida, consultoría técnica y soluciones escalables.', en: 'I am available to collaborate on custom builds, technical consulting and scalable solutions.' },
  projects_heading: { es: 'Proyectos con impacto real', en: 'Projects with real impact' },
  projects_intro: { es: 'Cada línea de código tiene un propósito: resolver problemas y crear experiencias digitales que generen valor. Aquí algunos proyectos.', en: 'Every line of code has a purpose: solve problems and create digital experiences that deliver value. Here are some projects.' },
  projects_cta_card_title: { es: '¿Quieres saber qué dicen de mí?', en: 'Want to know what they say about me?' },
  projects_cta_card_text: { es: 'Explora testimonios reales sobre comunicación, resultados y compromiso.', en: 'Explore real feedback about communication, results and commitment.' },
  projects_cta_card_button: { es: 'Adelante', en: 'Go' },
  testimonials_cta_more_title: { es: 'Y muchos más', en: 'And many more' },
  testimonials_cta_more_text: { es: 'Experiencias positivas que impulsan resultados. ¿Hablamos sobre tu proyecto?', en: 'Positive experiences driving results. Shall we talk about your project?' },
  testimonials_toggle_hint: { es: 'Tap / Hover para ver testimonio', en: 'Tap / Hover to view testimonial' },
  btn_lets_talk: { es: 'Hablemos', en: 'Let\'s talk' },
  tech_heading: { es: 'Tecnologías que impulsan soluciones modernas', en: 'Technologies powering modern solutions' },
  tech_intro: { es: 'Trabajo con un stack sólido y actualizado que me permite construir aplicaciones eficientes, seguras y escalables. Desde frameworks frontend potentes hasta arquitecturas cloud e integración con IA, elijo la herramienta adecuada para cada desafío.', en: 'I work with a solid, up‑to‑date stack to build efficient, secure and scalable applications. From strong frontend frameworks to cloud architectures and AI integration, I pick the right tool for each challenge.' },
  tech_loading: { es: 'Cargando...', en: 'Loading...' },
  modal_close: { es: 'Cerrar', en: 'Close' },
  project_view_demo: { es: 'Ver Demo', en: 'View Demo' },
  contact_intro_full: { es: 'Estoy disponible para colaborar en desarrollos a medida, consultoría técnica y soluciones escalables para empresas y startups. Conversemos sobre cómo puedo ayudarte a llevar tu idea al siguiente nivel.', en: 'I am available to collaborate on custom development, technical consulting and scalable solutions for companies and startups. Let\'s talk about how I can help take your idea to the next level.' },
  contact_toast_email: { es: 'Email copiado', en: 'Email copied' },
  contact_toast_phone: { es: 'Teléfono copiado', en: 'Phone copied' },
  contact_live_email: { es: 'Email copiado al portapapeles', en: 'Email copied to clipboard' },
  contact_live_phone: { es: 'Teléfono copiado al portapapeles', en: 'Phone copied to clipboard' },
  contact_github_aria: { es: 'Abrir GitHub', en: 'Open GitHub' },
  contact_linkedin_aria: { es: 'Abrir LinkedIn', en: 'Open LinkedIn' },
  contact_email_aria: { es: 'Enviar correo', en: 'Send email' },
  contact_phone_aria: { es: 'Llamar por teléfono', en: 'Call phone number' },
  contact_button_email: { es: 'Email', en: 'Email' },
  contact_button_phone: { es: 'Teléfono', en: 'Phone' },
};

interface I18nCtx {
  lang: Lang;
  t: (k: keyof typeof dict) => string;
  toggle: () => void;
}
const I18nContext = createContext<I18nCtx | null>(null);

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<Lang>('es');
  const toggle = () => setLang(l => (l === 'es' ? 'en' : 'es'));
  const value = useMemo(() => {
    const t = (k: keyof typeof dict) => dict[k][lang];
    return { lang, t, toggle };
  }, [lang]);
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

export const useLanguage = () => {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useLanguage must be used within I18nProvider');
  return ctx;
};
