"use client";
import { useEffect } from "react";

export default function ContactRedirectPage() {
  useEffect(() => {
    window.location.replace("../#contact");
  }, []);
  return (
    <main className="p-8">
      <p>Redirigiendo a Contacto… Si no ocurre, <a href="../#contact" className="text-blue-600">haz clic aquí</a>.</p>
    </main>
  );
}
