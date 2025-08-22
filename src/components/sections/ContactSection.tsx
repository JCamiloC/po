"use client";
import { FaGithub, FaLinkedin, FaEnvelope, FaPhone } from "react-icons/fa";

export const ContactSection: React.FC = () => {
  return (
  <section id="contact" aria-label="Contacto" className="py-32">
      <div className="mx-auto max-w-3xl px-4 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-6">Contáctame</h2>
        <p className="text-black/70 dark:text-white/70 mb-10">
          Aquí irán tus datos reales. Los botones son placeholders para tu GitHub, LinkedIn, email y teléfono.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <a
            href="https://github.com/tu-usuario"
            target="_blank"
            className="flex items-center gap-2 px-5 py-3 rounded-lg bg-black text-white dark:bg-white dark:text-black text-sm font-medium hover:scale-[1.03] transition"
            rel="noreferrer"
          >
            <FaGithub /> GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/tu-usuario"
            target="_blank"
            className="flex items-center gap-2 px-5 py-3 rounded-lg bg-blue-600 text-white text-sm font-medium hover:scale-[1.03] transition"
            rel="noreferrer"
          >
            <FaLinkedin /> LinkedIn
          </a>
          <a
            href="mailto:tu-correo@example.com"
            className="flex items-center gap-2 px-5 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-medium hover:scale-[1.03] transition"
          >
            <FaEnvelope /> Email
          </a>
          <a
            href="tel:+573000000000"
            className="flex items-center gap-2 px-5 py-3 rounded-lg bg-emerald-600 text-white text-sm font-medium hover:scale-[1.03] transition"
          >
            <FaPhone /> Teléfono
          </a>
        </div>
      </div>
    </section>
  );
};
export default ContactSection;
