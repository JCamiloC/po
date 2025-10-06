"use client";
import { useEffect } from "react";

export default function TestimonialsRedirectPage() {
  useEffect(() => {
    window.location.replace("../#testimonials");
  }, []);
  return (
    <main className="p-8">
      <p>Redirigiendo a Testimonios… Si no ocurre, <a href="../#testimonials" className="text-blue-600">haz clic aquí</a>.</p>
    </main>
  );
}
