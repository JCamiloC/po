// Tipos compartidos para el portafolio
export interface Technology {
  id: string;
  name: string;
  category?: string;
  url?: string;
  icon?: string; // nombre del icono o ruta
}

export interface ProjectImage {
  id: string;
  src: string;
  alt: string;
}

export interface Project {
  id: string;
  title: string;
  summary: string;
  stack: string[];
  images: ProjectImage[]; // para el slider interno
}

export interface Testimonial {
  id: string;
  company: string;
  author: string;
  role: string;
  content: string;
  avatar?: string; // ruta a imagen
}
