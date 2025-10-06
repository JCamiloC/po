/**
 * Helper para construir rutas a archivos estáticos dentro de /public
 * Resuelve correctamente cuando el sitio se sirve bajo un basePath (GitHub Pages).
 * Ej: asset('/projects/img.png') -> '/repoName/projects/img.png' si NEXT_PUBLIC_BASE_PATH='/repoName'
 */
export function asset(path: string): string {
  const base = process.env.NEXT_PUBLIC_BASE_PATH || '';
  if (!path.startsWith('/')) path = '/' + path;
  return `${base}${path}`;
}

/** Versión para múltiples imágenes (conserva otras props) */
export function mapImagePaths<T extends { src: string }>(items: T[]): T[] {
  return items.map(i => ({ ...i, src: asset(i.src) }));
}