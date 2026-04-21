# Purity & Clean

Sitio web institucional para Purity & Clean — servicios y productos profesionales de limpieza para hogares, PYMEs y empresas en Bogotá, Colombia.

## Estructura del proyecto

```
Purity-Clean/
├── index.html        # Página principal (SPA-like, multi-sección)
├── css/
│   └── style.css    # Estilos con variables CSS y tema oscuro
├── js/
│   └── script.js    # Interacciones: menú, búsqueda, formulario, analítica
├── robots.txt       # Directrices para crawlers
├── sitemap.xml      # Sitemap XML
└── README.md        # Este archivo
```

## Tecnologías

- **Frontend**: HTML5 semántico, CSS3 (custom properties, grid, flexbox), JavaScript vanilla ES6+
- **Fuentes**: Manrope (cuerpo), Raleway (títulos) — Google Fonts
- **Iconos**: Font Awesome 6.5
- **Analítica**: Plausible Analytics (privacy-friendly)
- **SEO**: Meta tags Open Graph, Twitter Cards, Schema.org LocalBusiness, canonical URL

## Setup local

No se requiere build. El proyecto es estático.

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/tu-org/purity-clean.git
   cd purity-clean
   ```

2. Abrir en el navegador:
   ```bash
   # Opción A:直接在浏览器打开
   open index.html

   # Opción B: servidor local con Python
   python3 -m http.server 8080
   # Luego visitar http://localhost:8080

   # Opción C: servidor local con Node
   npx serve .
   ```

3. Verificar que el formulario y la búsqueda funcionen correctamente.

## Despliegue

El sitio es estático y se puede desplegar en cualquier hosting de archivos estáticos.

### Netlify

Arrastrar la carpeta `Purity-Clean` a [app.netlify.com/drop](https://app.netlify.com/drop) o conectar el repositorio via Git.

### Vercel

```bash
npm i -g vercel
vercel --prod
```

### GitHub Pages

1. Ir a **Settings > Pages** del repositorio.
2. Seleccionar rama `main` y carpeta raíz (`/ (root)`).
3. Guardar. El sitio estará disponible en `https://tu-usuario.github.io/purity-clean/`.

### CDN / object storage

Subir `index.html`, `css/style.css`, `js/script.js`, `robots.txt` y `sitemap.xml` al bucket de tu proveedor (Cloudflare R2, AWS S3, GCS, etc.) y configurar el CDN para servir `index.html` como documento raíz.

## Variables de entorno

No aplica. El proyecto no tiene backend ni API.

Si en el futuro se conecta un formulario a un backend (p. ej. Netlify Forms, Formspree, AWS Lambda), documentar las variables aqui:

| Variable | Descripcion | Ejemplo |
|----------|-------------|---------|
| `FORMSPREE_ID` | Endpoint de Formspree para el formulario de contacto | `xyzabc` |

## Funcionalidades

### Búsqueda rápida

Campo en el hero que filtra dinámicamente tarjetas de servicios y productos por nombre, tipo y segmento. Sin dependencias externas.

### Formulario de contacto

Validación en cliente (nombre, email, teléfono, tipo de cliente). Envío simulado con retardo de 1.2s y mensaje de éxito. Para producción, reemplazar por integración real (Netlify Forms, Formspree, etc.).

### Tema oscuro

Toggle en la navegación que alterna `--data-theme="dark"` en `<html>`. Preferencias guardadas en `localStorage`.

### Menú responsive

Menú hamburger en móviles, visible como fila en escritorio. Toggle con aria-expanded para accesibilidad.

### Analítica

Eventos de click hacia Plausible cuando el usuario interactúa con CTAs y tarjetas. No usa cookies, cumple GDPR.

## SEO y metadata

El `index.html` incluye:

- Meta tags completos (description, keywords, author, robots)
- Open Graph para Facebook/Meta
- Twitter Cards
- Schema.org `LocalBusiness` con JSON-LD (servicios, geo, horarios, ratings)
- Canonical URL y sitemap reference

## Accesibilidad

- Estructura semántica (`<header>`, `<main>`, `<nav>`, `<section>`, `<footer>`)
- `aria-label` y `aria-expanded` en elementos interactivos
- `aria-live` en mensajes de estado (búsqueda, errores de formulario, éxito)
- Botón de skip-nav no incluido; agregar si se implementan anclas de navegación

## Mantenimiento

### Actualizar productos o servicios

Editar las tarjetas en `index.html` (sección `.searchable-grid`). Mantener los atributos `data-name`, `data-type` y `data-segment` para que la búsqueda funcione.

### Cambiar colores

Editar las variables CSS en `:root` de `css/style.css`. Los colores oscuros se definen en `[data-theme="dark"]`.

### Agregar secciones

1. Añadir la estructura HTML en `index.html` dentro de `<main>`.
2. Agregar estilos en `css/style.css` siguiendo las convenciones existentes.
3. Si la sección incluye tarjetas buscables, agregar la clase `searchable-item` y los atributos `data-*` correspondientes.

## Troubleshooting

### El formulario no envía nada

El comportamiento actual es simulado (solo UI). Para habilitar envío real:
- **Netlify Forms**: agregar `data-netlify="true"` al `<form>`.
- **Formspree**: cambiar `action` a `https://formspree.io/f/{FORMSPREE_ID}`.

### La búsqueda no filtra correctamente

Verificar que cada `.searchable-item` tenga los atributos `data-name`, `data-type` y `data-segment`. El texto se normaliza con `normalizeText()` (minúsculas, sin acentos).

### Tema oscuro no persiste

El tema se guarda en `localStorage` bajo la clave `theme`. Si persiste el valor incorrecto, inspeccionar `localStorage.getItem('theme')` en la consola del navegador.

## Licencia

Propiedad de Purity & Clean. Todos los derechos reservados.
