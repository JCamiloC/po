## Portafolio Next.js (WIP)

Proyecto de portafolio moderno construido con Next.js (App Router), TypeScript, Tailwind CSS, Framer Motion y Three.js.

### Secciones Planificadas
1. Hero interactivo con partículas y navbar fijo.
2. Tecnologías con globo 3D (placeholder básico ya incluido).
3. Proyectos con doble slider (externo infinito + interno fade de imágenes).
4. Testimonios en loop horizontal.
5. Contacto con enlaces a redes y acciones (GitHub, LinkedIn, Email, Teléfono).

### Estado Actual
- Estructura inicial creada.
- Componentes placeholder de todas las secciones listos.
- Animaciones básicas y canvas de partículas implementado.
- Faltan: datos reales, optimizar accesibilidad, dark mode toggle, mejoras visuales del globo, SEO.
 - Nota: Todos los textos, imágenes (placeholder.svg) y rutas de perfil son temporales y deben reemplazarse con contenido real.

### Requisitos Previos
- Node.js 18+ recomendado.

### Instalación
```bash
npm install
```

### Desarrollo
```bash
npm run dev
```
Abrir http://localhost:3000

## Deploy en GitHub Pages

Este proyecto está configurado para export estático y Pages.

1. Habilita GitHub Pages en Settings → Pages → Source: GitHub Actions.
2. Asegúrate que la rama es `main`.
3. El workflow `.github/workflows/deploy.yml` hace:
	- `NEXT_PUBLIC_BASE_PATH=/<repo>` para servir bajo subruta.
	- `next export` y publica `out/`.

URLs:
- Producción: https://<tu-usuario>.github.io/<repo>/

Local export:
```bash
npm run export
```
El sitio queda en `out/`.

### Scripts
- dev: modo desarrollo con Turbopack.
- build: construcción producción.
- start: iniciar servidor producción.
- lint: ejecutar ESLint.

### Estructura Principal
```
src/
	app/          # App Router
	components/
		sections/   # Secciones del landing
		visuals/    # Componentes gráficos (Three.js, canvas)
	types/        # Tipos compartidos
```

### Próximos Pasos Sugeridos
- Añadir tema oscuro/claro toggle.
- Integrar datos dinámicos (ej. cargar proyectos desde archivo JSON o CMS ligero).
- Pulir el globo 3D (logos como sprites orbitando).
- Implementar testing ligero (Playwright / Jest + React Testing Library).
 - Añadir meta tags personalizadas y Open Graph.
 - Lazy load avanzado para Three.js y reducción de bundle.

### Licencia
Uso personal. Sustituir assets de placeholder por contenido propio.
