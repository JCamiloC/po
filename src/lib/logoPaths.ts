// Mapea el id de tecnología -> ruta del SVG del logo en /public o CDN
// Sustituye estos paths con tus logos oficiales sin tocar el resto del código.
// Ejemplo: LOGO_PATHS['next'] = '/logos/next-official.svg'

export const LOGO_PATHS: Record<string, string | undefined> = {
  next: '/logos/next.svg',
  ts: '/logos/ts.svg',
  react: '/logos/react.svg',
  tailwind: '/logos/tailwind.svg',
  node: '/logos/node.svg',
  git: '/logos/git.svg',
  vercel: '/logos/vercel.svg',
  jest: '/logos/jest.svg',
  docker: '/logos/docker.svg',
  prisma: '/logos/prisma.svg',
  graphql: '/logos/graphql.svg',
  aws: '/logos/aws.svg',
  html: '/logos/html.svg',
  css: '/logos/css.svg',
  python: '/logos/python.svg',
  go: '/logos/go.svg',
  mongodb: '/logos/mongodb.svg',
  postgres: '/logos/postgres.svg',
  firebase: '/logos/firebase.svg',
  azure: '/logos/azure.svg',
  gcp: '/logos/gcp.svg',
};

// Puedes dejar undefined algún id para forzar el fallback a texto/círculo.
