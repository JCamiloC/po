// Datos de tecnologías y logos (puedes reemplazar luego con SVG reales)
export interface TechLogo {
  id: string;
  label: string;
  color: string; // color de fallback círculo
}

export const TECHNOLOGIES: TechLogo[] = [
  { id: "next", label: "Next.js", color: "#000000" },
  { id: "ts", label: "TS", color: "#3178c6" },
  { id: "react", label: "React", color: "#61dafb" },
  { id: "tailwind", label: "TW", color: "#38bdf8" },
  { id: "node", label: "Node", color: "#3c873a" },
  { id: "git", label: "Git", color: "#f34f29" },
  { id: "vercel", label: "Vercel", color: "#000000" },
  { id: "jest", label: "Jest", color: "#99425b" },
  { id: "docker", label: "Docker", color: "#0db7ed" },
  { id: "prisma", label: "Prisma", color: "#2d3748" },
  { id: "graphql", label: "GQL", color: "#e10098" },
  { id: "aws", label: "AWS", color: "#ff9900" },
];
