export type ProjectItem = {
  id: string;
  title: string;
  summary: string;
  stack: string[];
  images: { id: string; src: string; alt: string }[];
};

export type TestimonialItem = {
  id: string;
  company: string;
  author: string;
  role: string;
  content: string;
};

export const PROJECTS: ProjectItem[] = [
  {
    id: "p1",
    title: "Proyecto Uno",
    summary: "Descripción placeholder del proyecto uno.",
    stack: ["Next.js", "TypeScript"],
    images: [
      { id: "p1-1", src: "/placeholder.svg", alt: "Proyecto 1 imagen 1" },
      { id: "p1-2", src: "/placeholder.svg", alt: "Proyecto 1 imagen 2" },
      { id: "p1-3", src: "/placeholder.svg", alt: "Proyecto 1 imagen 3" },
    ],
  },
  {
    id: "p2",
    title: "Proyecto Dos",
    summary: "Descripción placeholder del proyecto dos.",
    stack: ["Three.js", "Tailwind"],
    images: [
      { id: "p2-1", src: "/placeholder.svg", alt: "Proyecto 2 imagen 1" },
      { id: "p2-2", src: "/placeholder.svg", alt: "Proyecto 2 imagen 2" },
    ],
  },
];

export const TESTIMONIALS: TestimonialItem[] = [
  { id: "t1", company: "Empresa A", author: "Juan Pérez", role: "CTO", content: "Gran profesional, aporta valor y calidad." },
  { id: "t2", company: "Empresa B", author: "María Gómez", role: "PM", content: "Entrega siempre a tiempo con excelente comunicación." },
  { id: "t3", company: "Startup C", author: "Luis Díaz", role: "CEO", content: "Innovador y muy orientado a resultados." },
  { id: "t4", company: "Agencia D", author: "Ana Ríos", role: "Lead Dev", content: "Código limpio y enfoque moderno en UX." },
];
