// Datos de tecnologías y logos (puedes reemplazar luego con SVG reales)
export interface TechLogo {
  id: string;
  label: string;
  color: string; // color de fallback círculo
  icon?: string; // ruta a SVG en /public/logos
}

export const TECHNOLOGIES: TechLogo[] = [
  { id: "next", label: "Next.js", color: "#000000", icon: "/logos/next.svg" },
  { id: "ts", label: "TS", color: "#3178c6", icon: "/logos/ts.svg" },
  { id: "react", label: "React", color: "#61dafb", icon: "/logos/react.svg" },
  { id: "tailwind", label: "TW", color: "#38bdf8", icon: "/logos/tailwind.svg" },
  { id: "node", label: "Node", color: "#3c873a", icon: "/logos/node.svg" },
  { id: "git", label: "Git", color: "#f34f29", icon: "/logos/git.svg" },
  { id: "vercel", label: "Vercel", color: "#000000", icon: "/logos/vercel.svg" },
  { id: "jest", label: "Jest", color: "#99425b", icon: "/logos/jest.svg" },
  { id: "docker", label: "Docker", color: "#0db7ed", icon: "/logos/docker.svg" },
  { id: "prisma", label: "Prisma", color: "#2d3748", icon: "/logos/prisma.svg" },
  { id: "graphql", label: "GQL", color: "#e10098", icon: "/logos/graphql.svg" },
  { id: "aws", label: "AWS", color: "#ff9900", icon: "/logos/aws.svg" },
  { id: "html", label: "HTML", color: "#e34f26", icon: "/logos/html.svg" },
  { id: "css", label: "CSS", color: "#264de4", icon: "/logos/css.svg" },
  { id: "python", label: "Python", color: "#3776ab", icon: "/logos/python.svg" },
  { id: "go", label: "Go", color: "#00add8", icon: "/logos/go.svg" },
  { id: "mongodb", label: "MongoDB", color: "#116149", icon: "/logos/mongodb.svg" },
  { id: "postgres", label: "PostgreSQL", color: "#336791", icon: "/logos/postgres.svg" },
  { id: "firebase", label: "Firebase", color: "#ffca28", icon: "/logos/firebase.svg" },
  { id: "azure", label: "Azure", color: "#0078d4", icon: "/logos/azure.svg" },
  { id: "gcp", label: "GCP", color: "#4285f4", icon: "/logos/gcp.svg" },
];
