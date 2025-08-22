"use client";
// Loop horizontal de testimonios
import { TESTIMONIALS } from "@/lib/data";
const testimonials = TESTIMONIALS;

export const TestimonialsSection: React.FC = () => {
  const track = [...testimonials, ...testimonials];
  return (
  <section id="testimonials" aria-label="Testimonios" className="py-32 bg-gradient-to-b from-white via-white to-blue-50 dark:from-black dark:via-black dark:to-blue-950/30">
      <div className="mx-auto max-w-7xl px-4">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-10">Testimonios</h2>
        <div className="overflow-hidden">
          <div className="flex gap-8 animate-[marquee_45s_linear_infinite] [--gap:2rem]">
            {track.map((t, idx) => (
              <figure
                key={t.id + idx}
                className="w-72 shrink-0 p-5 rounded-xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur"
              >
                <blockquote className="text-sm leading-relaxed text-black/70 dark:text-white/70">{t.content}</blockquote>
                <figcaption className="mt-4 text-xs font-medium">
                  <div>{t.author} · {t.role}</div>
                  <div className="text-black/50 dark:text-white/40">{t.company}</div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
export default TestimonialsSection;
