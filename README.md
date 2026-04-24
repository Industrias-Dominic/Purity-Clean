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

## Formularios Formspree

El proyecto utiliza Formspree para gestionar formularios sin backend. Los IDs de formulario se configuran en `js/config.js`:

```javascript
const FORMSPREE_CONFIG = {
  booking: "xwpkjvvw",     // Formulario de reservas online
  newsletter: "xbzykezv",  // Formulario de suscripcion al newsletter
  zona: "xnepyzll"         // Formularios de cotizacion por zona
};
```

Los formularios en el HTML ya tienen los endpoints de Formspree configurados:
- `index.html#reservas`: `https://formspree.io/f/xwpkjvvw`
- `index.html#newsletter`: `https://formspree.io/f/xbzykezv`
- `zonas/*/index.html`: `https://formspree.io/f/xnepyzll`

El archivo `js/script.js` usa los IDs de `FORMSPREE_CONFIG` para construir las URLs de envío en tiempo de ejecución. Si `FORMSPREE_CONFIG` no está definido o falta un ID, el formulario cae a comportamiento simulado (sin envío real).

Si en el futuro se conecta un formulario a un backend (p. ej. Netlify Forms, AWS Lambda), documentar las variables aqui:

| Variable | Descripcion | Ejemplo |
|----------|-------------|---------|
| `FORMSPREE_ID` | Endpoint de Formspree para el formulario de contacto | `xyzabc` |

## Funcionalidades

### Búsqueda rápida

Campo en el hero que filtra dinámicamente tarjetas de servicios y productos por nombre, tipo y segmento. Sin dependencias externas.

### Formulario de contacto

Validación en cliente (nombre, email, teléfono, tipo de cliente). Envío a Formspree para procesamiento real. Si el endpoint no está disponible, cae a simulación con mensaje de éxito.

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

Los formularios están configurados con Formspree (IDs en `js/config.js`). Si el envío falla, el código cae a simulación y muestra éxito tras 1.2s. Verificar en la consola del navegador si hay errores de red hacia `formspree.io`.

Para cambiar el ID de un formulario, editar `FORMSPREE_CONFIG` en `js/config.js`.

### La búsqueda no filtra correctamente

Verificar que cada `.searchable-item` tenga los atributos `data-name`, `data-type` y `data-segment`. El texto se normaliza con `normalizeText()` (minúsculas, sin acentos).

### Tema oscuro no persiste

El tema se guarda en `localStorage` bajo la clave `theme`. Si persiste el valor incorrecto, inspeccionar `localStorage.getItem('theme')` en la consola del navegador.

## Licencia

Propiedad de Purity & Clean. Todos los derechos reservados.
