"use client";
import { useEffect } from "react";

export default function TechRedirectPage() {
  useEffect(() => {
    // Relative redirect works under basePath and locally
    window.location.replace("../#tech");
  }, []);
  return (
    <main className="p-8">
      <p>Redirigiendo a Tecnologías… Si no ocurre, <a href="../#tech" className="text-blue-600">haz clic aquí</a>.</p>
    </main>
  );
}
