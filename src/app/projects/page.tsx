"use client";
import { useEffect } from "react";

export default function ProjectsRedirectPage() {
  useEffect(() => {
    window.location.replace("../#projects");
  }, []);
  return (
    <main className="p-8">
      <p>Redirigiendo a Proyectos… Si no ocurre, <a href="../#projects" className="text-blue-600">haz clic aquí</a>.</p>
    </main>
  );
}
