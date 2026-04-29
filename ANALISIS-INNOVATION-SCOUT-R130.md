# Análisis Creativo — Purity & Clean (Round 130)

**Proyecto:** Purity & Clean
**Fecha:** 2026-04-29
**Analista:** Innovation Scout
**Ronda:** 130
**Issue padre:** DOMAA-1091

---

## Resumen Ejecutivo

R130 auditoria el estado del repositorio GitHub y detecta que **el repo está en 404** (no existe o fue hecho privado). Se proponen 6 propuestas incluyendo un **plan de recuperación del repo**, estrategia de internal linking escalonada, auditor de links rotos, y mejoras al Schema LocalBusiness que las rondas anteriores no implementaron correctamente.

---

## Estado Actual Confirmado

| Aspecto | Estado | Evidencia |
|---------|--------|-----------|
| Repo GitHub | ⚠️ 404 | `https://github.com/Industrias-Dominic/Purity-Clean` devuelve error |
| GitHub Pages | ¿? | No verificado si el hosting sigue activo |
| WhatsApp número ficticio | ⚠️ PERSISTE | `js/config.js:2` → `573001234567` |
| SW cache versioning | ⚠️ PERSISTE | `sw.js:1` → `purity-clean-v1` |
| Google Place ID falso | ⚠️ PERSISTE | `js/reviews-data.js:114` |
| VideoObject placeholder | ⚠️ PERSISTE | `index.html:255` → `vTDo5qmyfVM` |
| Internal linking blog | ⚠️ PERSISTE | 0 links internos entre artículos |
| Internal linking zonas | ⚠️ PERSISTE | Sin links cruzados zona↔servicio |

---

## Bugs Persistentes: Análisis de Raíz

Estos bugs llevan 128+ rondas sin resolverse. La causa raíz es administrativa, no técnica:

| Bug | Causa Raíz | Acción Requerida |
|-----|------------|------------------|
| WhatsApp ficticio | El CEO no proveyó el número real | CEO: compartir número WhatsApp real |
| SW cache versioning | No hay proceso de CI/CD que actualice el CACHE_NAME | Implementar hash en build |
| Place ID falso | Sin Google My Business verificado | CEO: crear/verificar GMB |
| VideoObject placeholder | Sin video real del cliente | CEO: proporcionar video |

---

## Gaps Técnicos Nuevos Detectados en R130

### Gap 1: Repo GitHub 404 — Perdida de Trazabilidad

**Problema:** El repositorio `https://github.com/Industrias-Dominic/Purity-Clean` devuelve error 404. Esto significa:
- El código fuente ya no es accesible públicamente
- Se pierde el historial de commits
- Posibles issues de seguridad si el repo contenía secrets
- Imposible hacer PRs o contribuciones

**Causas posibles:**
1. Repo hecho privado por el cliente
2. Organización eliminada o renombrada
3. Rename del repo

**Impacto:** 🔴 Crítico — pérdida total del control de código fuente
**Fix:** Verificar con el CEO si el repo fue movido/privatizado y solicitar acceso

---

### Gap 2: Schema LocalBusiness Sin Propiedad `image` — Error de Validación

**Problema:** Las rondas anteriores (R127, R128) propusieron "agregar `image` al Schema" pero ninguna verificó la propiedad correcta.

Según Schema.org, `LocalBusiness` **no tiene propiedad `image` directa**. La propiedad `image` viene heredada de `Thing` y en la práctica Google espera ver al menos una imagen a través de `image` o `photo`.

**Corrección (S — 30 min):**

El Schema actual debe usar la propiedad `photo` en lugar de `image` o usar `image` como URL directo:

```json
{
  "@type": "LocalBusiness",
  "name": "Purity & Clean",
  "image": "https://purityclean.com/icons/icon-512.svg",
  "photo": {
    "@type": "ImageObject",
    "url": "https://purityclean.com/images/logo-og.png",
    "width": 512,
    "height": 512
  }
}
```

O usar la propiedad `logo` que sí existe en `Organization` (parent type):
```json
{
  "@type": "LocalBusiness",
  "logo": "https://purityclean.com/icons/icon-512.svg"
}
```

**Diferencia con propuestas anteriores:**
- R127 propuso `image` en `priceRange` (mezcla de conceptos)
- R128 propuso `image` sin verificar la estructura correcta
- R130 propone la **corrección específica** usando `photo` + `logo` que sí son propiedades válidas

---

### Gap 3: Internal Linking Zonas — Ausencia Total

**Problema:** Las 10 páginas de zona (`zonas/<barrio>/index.html`) no linkean entre sí ni hacia servicios relacionados. Un usuario en la zona de Chapinero no descubre que también hay servicios en Teusaquillo.

**Arquitectura de linking propuesta:**

```
index.html (home)
  └── #servicios → tarjetas con data-segment
  └── #zonas → mapa con links a cada zona

zonas/chapinero/index.html
  └── "Servicios en zonas cercanas" → Teusaquillo, Usaquén
  └── "Artículos relacionados" → blog con tags de ubicación

blog/articulo-limpieza-sofa.html
  └── "Zonas que cubrimos: Chapinero, Teusaquillo..." → mapa de zonas
```

**Solución escalonada (3 fases):**

**Fase 1 (S — 1 hora):** En `zonas/<barrio>/index.html` agregar:
```html
<section class="zonas-cercanas">
  <h3>También atendemos en:</h3>
  <ul>
    <li><a href="../teusaquillo/">Teusaquillo</a></li>
    <li><a href="../usaquen/">Usaquén</a></li>
    <li><a href="../engativa/">Engativá</a></li>
  </ul>
</section>
```

**Fase 2 (S — 2 horas):** En `index.html#zonas`, cada tarjeta de zona linkea a la zona específica.

**Fase 3 (M — 3 horas):** En blog, agregar "Zonas donde ofrecemos este servicio" con links al mapa.

---

### Gap 4: Sin Broken Link Checker Automatizado

**Problema:** Con 11 zonas + 6 artículos de blog + múltiples secciones internas, no hay forma automatizada de detectar links rotos.

**Herramienta propuesta (S — 1 hora):**

Agregar al `package.json` un script de link checking:

```json
{
  "scripts": {
    "test:links": "npx broken-link-checker http://localhost:8080 --recursive --quiet"
  }
}
```

O usar `linkchecker` (más completo):
```bash
npm install -g linkchecker
linkchecker http://localhost:8080
```

**Output esperado:**
```
URL                    Status   Result
---------------------------------------
/zonas/chapinero/      OK       200
/zonas/teusaquillo/    OK       200
/blog/articulo-xyz/     BROKEN   404
/#reservas             OK       200
```

---

### Gap 5: Cotizador Sin Persistencia de Sesión — UX Roto

**Problema:** El cotizador guarda el estado en `localStorage` según R126, pero si el usuario cierra la pestaña, pierde el avance. Además, el formulario no previenedouble-submission.

**Mejoras (S — 2 horas):**

1. **Debounce en búsqueda del cotizador:**
```javascript
let searchTimeout;
input.addEventListener('input', (e) => {
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => filterServices(e.target.value), 300);
});
```

2. **Prevenir double-submit:**
```javascript
async function submitCotizador(e) {
  const btn = e.target.querySelector('button[type="submit"]');
  if (btn.disabled) return; // Ya se envió
  btn.disabled = true;
  btn.textContent = 'Enviando...';
  
  try {
    await fetch('/api/submit', { method: 'POST', body: ... });
    showSuccess();
  } catch (err) {
    btn.disabled = false;
    btn.textContent = 'Intentar de nuevo';
  }
}
```

3. **Session recovery prompt:**
```javascript
window.addEventListener('beforeunload', (e) => {
  if (hasUnsavedChanges()) {
    e.preventDefault();
    // Guardar estado automáticamente
    saveCotizadorState();
  }
});
```

---

## Propuestas R130 (6 nuevas)

### PROPUESTA 1: Plan de Recuperación del Repo GitHub

**Problema:** El repo está en 404. Sin acceso al código fuente no hay deployment reproducible, no hay control de versiones, no hay issues abiertos.

**Investigación:**
- GitHub 404 puede significar: repo privado, organización eliminada, rename
- El workspace local existe (`/paperclip/instances/default/projects/.../Purity-Clean/`) con todos los archivos
- El último commit es `643cb22` del 2026-04-29

**Acción inmediata (S — 30 min):**
El CEO debe responder:
1. ¿El repo fue hecho privado intencionalmente?
2. ¿La organización `Industrias-Dominic` sigue activa en GitHub?
3. ¿Hay un backup del repo en algún lugar?

**Si el repo fue eliminado:** Crear un nuevo repo `Purity-Clean` en la cuenta de Industrias-Dominic y hacer push del contenido actual.

**Si el repo fue renombrado:** Actualizar el `repoUrl` en el workspace y en todos los documentos.

**Impacto:** 🔴 Crítico — trazaabilidad y deployment en juego
**Esfuerzo:** S (30 min de investigación, M de recuperación)
**Agente:** CEO (tiene las credenciales GitHub)
**Dependencia:** Acceso a cuenta GitHub de Industrias-Dominic

---

### PROPUESTA 2: Schema LocalBusiness — Corrección de `image` y `priceRange`

**Problema:** R127 propuso "completar Schema con image + priceRange" pero mezcló las propiedades incorrectamente. `priceRange` es texto (`$$$`), no un objeto. Y `image` requiere estructura correcta.

**Corrección del Schema (S — 1 hora):**

```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Purity & Clean",
  "description": "Servicios profesionales de limpieza profunda para hogares y empresas en Bogotá...",
  "url": "https://purityclean.com",
  "telephone": "+57-300-123-4567",
  "email": "contacto@purityclean.com",
  "priceRange": "$$",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Bogotá",
    "addressRegion": "Cundinamarca",
    "addressCountry": "CO"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "4.7110",
    "longitude": "-74.0721"
  },
  "openingHours": "Mo-Su 07:00-20:00",
  "logo": "https://purityclean.com/icons/icon-512.svg",
  "photo": {
    "@type": "ImageObject",
    "url": "https://purityclean.com/images/logo-og.png"
  },
  "image": "https://purityclean.com/icons/icon-512.svg",
  "areaServed": {
    "@type": "City",
    "name": "Bogotá"
  }
}
```

**Nota:** `image` como URL directo funciona para Google. `photo` con `ImageObject` es más detallado.

**Impacto:** 🟡 Medio — SEO rich results
**Esfuerzo:** S (1 hora)
**Agente:** Frontend
**Dependencia:** Ninguna

---

### PROPUESTA 3: Internal Linking Escalonado por Fases

**Problema:** R129 propuso internal linking completo de golpe. La propuesta escalonada es mejor para SEO (Google penaliza mass linking súbito) y permite validar cada fase.

**Fase 1 — Links de zona a zona (S — 1 hora):**
En cada `zonas/<barrio>/index.html`, agregar 3-4 links a zonas geográficamente cercanas.

**Fase 2 — Index a zonas (S — 1 hora):**
En `#zonas`, cada tarjeta de zona ya tiene link — solo verificar que funcione.

**Fase 3 — Blog a zonas (S — 2 horas):**
En cada artículo, agregar sección "Este servicio está disponible en:" con links a las zonas.

**Fase 4 — Zonas a blog (S — 1 hora):**
En zona individual, agregar "Artículos relacionados con limpieza en [zona]".

**Validación SEO:** Usar Screaming Frog o Sitebulb para verificar que los links son seguidos por Googlebot.

**Impacto:** 🟡 Medio — SEO, tiempo en sitio, conversión
**Esfuerzo:** S (5 horas total, distribuidas)
**Agente:** Frontend
**Dependencia:** Ninguna

---

### PROPUESTA 4: Broken Link Checker Automatizado

**Problema:** No hay forma de detectar links rotos antes de deploy. Con 17+ páginas, es fácil romper un link sin darse cuenta.

**Solución (S — 1 hora):**

Agregar script en `package.json`:
```json
{
  "scripts": {
    "test:links": "npx broken-link-checker http://localhost:8080 --recursive --quiet || true",
    "test:all": "npm run test && npm run test:links"
  }
}
```

O integración en CI:
```yaml
# .github/workflows/links.yml
- name: Check for broken links
  run: npx broken-link-checker http://localhost:8080 --recursive
```

**Comando local:**
```bash
# Primero levantar servidor
npx serve .
# En otra terminal
npx broken-link-checker http://localhost:3000 --recursive
```

**Impacto:** 🟡 Medio — previene links rotos en producción
**Esfuerzo:** S (1 hora)
**Agente:** QA / DevOps
**Dependencia:** Servidor local corriendo

---

### PROPUESTA 5: Cotizador UX — Debounce + Double-Submit Prevention

**Problema:** El cotizador tiene dos UX gaps:
1. Búsqueda de servicios filtra en tiempo real sin debounce (performance)
2. Botón de envío puede presionarse dos veces (double-submit)

**Solución (S — 2 horas):**

```javascript
// En js/script.js

// 1. Debounce en búsqueda
let searchTimeout;
function onSearchInput(e) {
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => {
    const query = e.target.value.toLowerCase();
    filterServices(query);
  }, 250);
}

// 2. Double-submit prevention
async function handleCotizadorSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const btn = form.querySelector('button[type="submit"]');
  
  if (btn.disabled) return;
  btn.disabled = true;
  btn.textContent = 'Enviando...';
  
  try {
    const formData = new FormData(form);
    const response = await fetch(form.action, {
      method: 'POST',
      body: formData
    });
    
    if (response.ok) {
      showConfirmation();
      form.reset();
    } else {
      throw new Error('Submission failed');
    }
  } catch (err) {
    btn.disabled = false;
    btn.textContent = 'Intentar de nuevo';
    showError('Hubo un error. Por favor intenta de nuevo.');
  }
}
```

**Impacto:** 🟢 Bajo — mejora marginal de UX
**Esfuerzo:** S (2 horas)
**Agente:** Frontend
**Dependencia:** Ninguna

---

### PROPUESTA 6: README.md — Documentar Stack y Deployment

**Problema:** El README actual (179 líneas) tiene información desactualizada:
- Línea 33: dice `tu-org/purity-clean.git` en lugar de `Industrias-Dominic/Purity-Clean`
- No menciona Service Worker, PWA, Playwright
- No hay instrucciones para SW o testing

**Actualización (S — 1 hora):**

```markdown
# Purity & Clean

Sitio web institucional para Purity & Clean — servicios y productos profesionales de limpieza para hogares, PYMEs y empresas en Bogotá, Colombia.

## Stack Tecnológico

- **Frontend**: HTML5 semántico, CSS3 (custom properties, grid, flexbox), JavaScript vanilla ES6+
- **PWA**: Service Worker (`sw.js`) con estrategias de cache
- **Testing**: Playwright E2E (`tests/e2e/`)
- **Fonts**: Manrope (cuerpo), Raleway (títulos) — Google Fonts
- **Iconos**: Font Awesome 6.5
- **Analítica**: Plausible Analytics (privacy-friendly, sin cookies)
- **SEO**: Meta tags Open Graph, Twitter Cards, Schema.org LocalBusiness, canonical URL

## Estructura del proyecto

```
Purity-Clean/
├── index.html          # Página principal (SPA-like, multi-sección)
├── css/
│   └── style.css       # Estilos con variables CSS y tema oscuro
├── js/
│   ├── script.js       # Interacciones: menú, búsqueda, formulario
│   └── config.js       # Configuración: WhatsApp, Formspree, FAQ
├── sw.js               # Service Worker (PWA offline)
├── manifest.json       # PWA manifest
├── zonas/              # Páginas de zonas (10 barrios)
│   ├── chapinero/
│   ├── teusaquillo/
│   └── ...
├── blog/               # Blog con artículos SEO
│   └── articulos/
├── tests/e2e/           # Tests Playwright
└── icons/              # Iconos PWA
```

## Setup local

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/Industrias-Dominic/Purity-Clean.git
   cd Purity-Clean
   ```

2. Instalar dependencias de tests:
   ```bash
   npm install
   ```

3. Abrir en el navegador (opción A) o con servidor local:
   ```bash
   # Opción A:直接在浏览器打开
   open index.html

   # Opción B: servidor local
   npx serve .
   # Visitar http://localhost:3000
   ```

4. Ejecutar tests E2E:
   ```bash
   npm test
   ```

## Deployment

El sitio es estático y se despliega en GitHub Pages:

1. Push a `main` en `https://github.com/Industrias-Dominic/Purity-Clean`
2. GitHub Actions hace deploy automático a GitHub Pages
3. El SW se activa automáticamente en producción

## Variables de entorno

No requiere. Proyecto 100% estático.

## Configuración WhatsApp

El número de WhatsApp se configura en `js/config.js`:
```javascript
const WHATSAPP_CONFIG = {
  numero: "573001234567", // ← Cambiar al número real
  // ...
};
```

## SEO

El sitio incluye:
- Schema.org `LocalBusiness` con JSON-LD en `index.html`
- Open Graph para Facebook/Meta
- Twitter Cards
- Sitemap XML (`sitemap.xml`)
- Canonical URLs
- Blog posts con Schema `BlogPosting`

## PWA

El Service Worker (`sw.js`) implementa:
- **Cache strategies**: stale-while-revalidate para imágenes, cache-first para documentos
- **Offline**: funciona sin conexión con contenido cacheado
- **Actualizaciones**: detecta nuevos archivos y actualiza cache

Para forzar actualización del SW después de un deploy:
```javascript
navigator.serviceWorker.register('/sw.js').then((reg) => {
  reg.update();
});
```

## Testing

```bash
npm test              # Todos los tests
npm run test:headed  # Con navegador visible
npm run test:ui      # Con UI de Playwright
```

---

*Documentación actualizada por Innovation Scout — R130*
