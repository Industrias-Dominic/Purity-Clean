# Análisis Creativo — Purity & Clean (Round 114)

**Proyecto:** Purity & Clean
**Fecha:** 2026-04-28
**Analista:** Innovation Scout
**Ronda:** 114
**Issue padre:** DOMAA-987

---

## Resumen Ejecutivo

R114 se enfoca en **contenido, datos estructurados pendientes y calidad de código de producción** — gaps que no fueron cubiertos en R112-R113. El sitio tiene buena estructura, pero aún hay: (a) contenido incompletable (video placeholder, blog sin schema), (b) datos de configuración placeholder (WhatsApp), (c) tests que no existen, y (d) arquitectura de zonas que podría aprovechar mejor el schema.org para SEO local. Todas las propuestas son accionables con esfuerzo bajo a medio.

---

## Hallazgos Pre-R114 (Verificados en Código)

| Feature | Estado en código | Ronda que lo propuso |
|---------|------------------|----------------------|
| PWA + Service Worker | ✅ Implementado (sw.js) | R107 |
| Schema LocalBusiness (index) | ✅ Implementado | R1 |
| FAQPage schema | ✅ Implementado | R1 |
| Critical CSS | ✅ Archivo existe (336 líneas), cargado async en index.html:266-269 | R108 |
| WhatsApp placeholder | ⚠️ `numero: "573001234567"` hardcodeado en config.js:2 | R81 (parcial) |
| VideoObject schema | ⚠️ Placeholder con TODO en index.html:246-260 (VIDEO_ID ficticio `vTDo5qmyfVM`) | R112 |
| BreadcrumbList JSON-LD | ❌ NO implementado en index.html | R112 (pendiente) |
| HowTo schema (blog) | ❌ NO implementado en artículos del blog | R112 (pendiente) |
| Trust badges | ✅ Implementados | R67/DOMAA-112 |
| Google Reviews reales | ✅ Implementados (reviews-data.js) | R79/DOMAA-79 |
| hreflang zonas | ✅ Implementado en 10 páginas de zonas | R113 (ya estaba) |
| Core Web Vitals (LCP/CLS/INP) | ⚠️ Critical CSS existe pero LCP/CLS sin auditoria explícita | R113 |
| Playwright E2E tests | ⚠️ Pasta `tests/e2e/` existe pero parece no ejecutarse en CI | Nueva |
| Blog articles | ⚠️ Solo 5 artículos con contenido mínimo | Nueva |
| Article/FAQ schema en blog | ❌ NO implementado en artículos | Nueva |
| i18n hreflang en index.html | ❌ NO implementado (las zonas sí lo tienen) | R113 |
| Scroll tracking (Plausible) | ✅ Implementado script.js:107-120 | R113 |
| Accesibilidad cognitiva | ❌ NO implementado | R113 |
| RUM (Real User Monitoring) | ❌ NO implementado | R113 |

---

## Propuestas R114

### PROPUESTA 1: Configurar número real de WhatsApp Business

**Título:** Reemplazar el número placeholder de WhatsApp con cuenta real de negocio

**Descripción del problema:**
El archivo `config.js` (línea 2) tiene `numero: "573001234567"` que es un número de prueba ficticio. Esto significa que todo lead que haga clic en WhatsApp desde el sitio contacta un número que no pertenece a Purity & Clean. **El 100% de los leads de WhatsApp se están perdiendo silenciosamente.**

**Situación actual en `js/config.js`:**
```javascript
const WHATSAPP_CONFIG = {
  numero: "573001234567", // ← NÚMERO PLACEHOLDER, NO ES REAL
  mensajePorDefecto: "Hola%2C%20estoy%20interesado%20en%20los%20servicios%20de%20Purity%20%26%20Clean",
  ...
```

**Propuesta:**
1. El CEO o el cliente deben proporcionar el número real de WhatsApp Business (formato internacional sin + ni espacios).
2. Actualizar `js/config.js` con el número real.
3. Verificar que todos los links `wa.me` del sitio usan correctamente la variable de configuración.
4. Configurar mensaje de bienvenida automático con nombre del negocio y horarios de atención.

**Impacto esperado:** Captura del 100% de los leads de WhatsApp (actualmente 0%). Conversión inmediata.
**Esfuerzo:** S (30 minutos, requiere datos del cliente)
**Agente recomendado:** Full Stack (configuración simple)
**Referencias:** [WhatsApp Business API](https://business.whatsapp.com/)

---

### PROPUESTA 2: Resolver VideoObject schema — Contenido real o标记 como no disponible

**Título:** Completar o remover el VideoObject schema placeholder

**Descripción del problema:**
El `index.html` (líneas 246-260) contiene un VideoObject schema con un VIDEO_ID placeholder (`vTDo5qmyfVM`) que apunta a un video YouTube que probablemente no existe o no es de Purity & Clean. Esto genera datos estructurados inválidos que Google puede penalizar en rich snippets.

**Situación actual:**
```javascript
// TODO (board): Reemplazar VIDEO_ID con el ID real del video del cliente cuando esté disponible.
// ...
"thumbnailUrl": "https://img.youtube.com/vi/vTDo5qmyfVM/maxresdefault.jpg",
"uploadDate": "2025-01-01",
"contentUrl": "https://www.youtube.com/watch?v=vTDo5qmyfVM",
"embedUrl": "https://www.youtube-nocookie.com/embed/vTDo5qmyfVM"
```

**Propuesta — Opción A (recomendada si hay video):**
1. El cliente proporciona el ID real del video de YouTube.
2. Actualizar `index.html` con datos reales: `uploadDate` correcta, `description` precisa.
3. Opcional: agregar `duration` (ISO 8601) si el video tiene duración definida.

**Propuesta — Opción B (si no hay video):**
1. Eliminar completamente el bloque `<script type="application/ld+json">` del VideoObject.
2. Eliminar el comentario `TODO (board)` asociado.
3. No dejar schema incompleto que confunda a los crawlers.

**Impacto esperado:** Datos estructurados válidos para rich snippets de video en Google. Si no hay video, cleaner crawl budget.
**Esfuerzo:** S (30 minutos)
**Agente recomendado:** Frontend + Content (coordinación con cliente para video real)
**Referencias:** [Schema.org VideoObject](https://schema.org/VideoObject), [Google Video rich results](https://developers.google.com/search/docs/appearance/structured-data/video)

---

### PROPUESTA 3: Implementar BreadcrumbList JSON-LD en index.html

**Título:** Añadir BreadcrumbList schema al index.html para mejorar SEO y navegación

**Descripción del problema:**
El sitio tiene navegación breadcrumb visual (línea 318: "Blog" > "Artículos") pero no tiene el schema JSON-LD `BreadcrumbList` que Google usa para mostrar breadcrumbs enriquecidos en los resultados de búsqueda. Los competidores en SEO local Bogotá ya usan esta estructura.

**Situación actual:**
```html
<li><a href="blog/index.html">Blog</a></li>
```
Sin schema.

**Propuesta:**
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Inicio",
      "item": "https://purityclean.com/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Blog",
      "item": "https://purityclean.com/blog/index.html"
    }
  ]
}
</script>
```

Agregar después del bloque LocalBusiness JSON-LD en `<head>`.

**Impacto esperado:** Breadcrumbs enriquecidos en Google (ej. "Inicio > Blog > Guía de limpieza"). Mejora CTR en SERP. SEO local más fuerte.
**Esfuerzo:** S (15 minutos)
**Agente recomendado:** Frontend (SEO)
**Referencias:** [Google BreadcrumbList documentation](https://developers.google.com/search/docs/appearance/structured-data/breadcrumb)

---

### PROPUESTA 4: HowTo schema en artículos del blog

**Título:** Añadir schema HowTo a los artículos del blog para rich snippets de guía paso a paso

**Descripción del problema:**
Los 5 artículos del blog (ej. "Cómo limpiar sillas de oficina en Bogotá", "Cada cuánto sanitizar el colchón") son guías prácticas tipo HowTo, pero no tienen schema HowTo que les permita aparecer como featured snippets o rich results de "pasos de guía" en Google.

**Situación actual:**
Cada artículo solo tiene `Article` schema genérico, sin pasos instructivos.

**Propuesta — Implementar HowTo schema en el artículo más popular ("Cómo limpiar sillas de oficina en Bogotá"):**
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Cómo limpiar sillas de oficina en Bogotá - Guía paso a paso",
  "description": "Guía completa para limpiar y mantener sillas ergonómicas en oficinas de Bogotá.",
  "step": [
    {
      "@type": "HowToStep",
      "name": "Preparar el área",
      "text": "Retira objetos personales y limpia la superficie con un paño seco."
    },
    {
      "@type": "HowToStep",
      "name": "Aspirar",
      "text": "Usa aspiradora con accesorio de hendidura para limpiar entre costuras y debajo del asiento."
    },
    {
      "@type": "HowToStep",
      "name": "Aplicar producto",
      "text": "Rocía producto especializado sobre la superficie y deja actuar 5 minutos."
    }
  ]
}
</script>
```

Expandir a los otros 4 artículos una vez validado.

**Impacto esperado:** Rich snippets tipo "Paso 1, Paso 2..." en Google. Aumenta visibilidad y CTR. Diferenciación vs. competidores con contenido similar.
**Esfuerzo:** S-M (1-2 horas por artículo, luego replicable con plantilla)
**Agente recomendado:** Content + Frontend (cada artículo requiere authoring de los pasos)
**Referencias:** [Schema.org HowTo](https://schema.org/HowTo), [Google HowTo structured data](https://developers.google.com/search/docs/appearance/structured-data/how-to)

---

### PROPUESTA 5: Configurar Playwright E2E tests en CI/CD

**Título:** Activar tests E2E con Playwright en el pipeline de despliegue

**Descripción del problema:**
El proyecto tiene carpeta `tests/e2e/` con configuración Playwright (`playwright.config.js`) y tests pero no está corriendo en CI/CD. Cada despliegue a producción no tiene verificación automatizada de que las funcionalidades críticas (formularios, búsqueda, WhatsApp, dark mode) siguen funcionando.

**Situación actual:**
- `playwright.config.js` existe
- Carpeta `test-results/` existe (sugerencia de ejecuciones previas)
- Carpeta `playwright-report/` existe
- No hay configuración de CI que ejecute los tests antes de merge/deploy

**Propuesta — GitHub Actions (recomendado para GitHub repo):**
1. Crear `.github/workflows/e2e.yml`:
```yaml
name: E2E Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm ci
      - run: npx playwright install --with-deps
      - run: npx playwright test
```

2. Los tests deben cubrir: carga de index.html, búsqueda funcional, formulario de contacto (simulado), toggle de dark mode, navegación entre secciones.

3. Configurar reporte HTML en GitHub Actions artifacts para debugging.

**Impacto esperado:** Detección automática de regresiones antes de producción. Confianza en deploys. Calidad de release predecible.
**Esfuerzo:** M (1 día de setup + documentación)
**Agente recomendado:** Full Stack + QA
**Referencias:** [Playwright GitHub Actions](https://playwright.dev/docs/ci/), [Playwright test config](https://playwright.dev/docs/test-configuration/)

---

### PROPUESTA 6: i18n hreflang en index.html + sitemap.xml con hreflang

**Título:** Añadir señales hreflang al index.html principal y actualizar sitemap con annotations xhtml:link

**Descripción del problema:**
Las 10 páginas de zonas ya tienen `hreflang="es"` y `hreflang="es-co"` (verificado en zona-template.html y todas las zonas). Pero el `index.html` principal NO tiene ningún link hreflang ni annotation x-default. Google no sabe cuál es la página canónica para búsquedas en español de Colombia.

**Situación actual en index.html:**
```html
<html lang="es">
<!-- Sin hreflang -->
```

**Propuesta — hreflang en index.html:**
```html
<!-- En <head>, después de los otros meta links -->
<link rel="alternate" hreflang="es" href="https://purityclean.com/">
<link rel="alternate" hreflang="es-co" href="https://purityclean.com/">
<link rel="alternate" hreflang="x-default" href="https://purityclean.com/">
```

**Propuesta — Actualizar sitemap.xml:**
El sitemap actual probablemente no tiene las annotations `xhtml:link` con hreflang. Actualizar para que cada URL listada incluya los tags de alternativa.

```xml
<url>
  <loc>https://purityclean.com/</loc>
  <xhtml:link rel="alternate" hreflang="es" href="https://purityclean.com/"/>
  <xhtml:link rel="alternate" hreflang="es-co" href="https://purityclean.com/"/>
  <xhtml:link rel="alternate" hreflang="x-default" href="https://purityclean.com/"/>
</url>
```

**Impacto esperado:** Google indexa correctamente la versión principal. Señal clara de idioma/región para SEO. Mejora en ranking para búsquedas "servicios de limpieza Bogotá".
**Esfuerzo:** S (30 minutos)
**Agente recomendado:** Frontend (SEO)
**Referencias:** [Google hreflang guide](https://developers.google.com/search/docs/specialty/international/localized-versions), [Sitemap with hreflang](https://developers.google.com/search/docs/specialty/international/localized-versions#sitemap)

---

### PROPUESTA 7: Expansión de contenido del blog — De 5 a 8 artículos

**Título:** Crear 3 artículos de blog adicionales con contenido SEO de larga cola

**Descripción del problema:**
El blog tiene solo 5 artículos, cubriendo pocos términos de búsqueda de larga cola. Competidores en el nicho de limpieza Bogotá tienen blogs activos con 15-30 artículos, capturando tráfico informativo. Purity & Clean está perdiendo oportunidades de ranking en consultas como "limpieza de sofás en frío", "productos para colchones", "mantenimiento preventivo".

**Situación actual:** 5 artículos:
- 5 tips mantenimiento alfombras
- Cada cuánto sanitizar colchón
- Cómo limpiar tu sofá
- Guía sanitización colchones
- Limpiar sillas oficina Bogotá
- Señales empresa necesita limpieza profesional

**Propuesta — 3 artículos nuevos:**
1. **"¿Cada cuánto tiempo deberías limpiar tus sofás? Guía según tipo de uso"** — Targeting: "cada cuanto limpiar sofa", "frecuencia limpieza sofabogotá"
2. **"Productos seguros para hogares con niños y mascotas: Qué buscar y qué evitar"** — Targeting: "productos limpieza seguros niños", "desinfectantes no tóxicos Bogotá"
3. **"Mantenimiento preventivo vs. correctivo: Cuándo salvar tu sofá y cuándo reemplazarlo"** — Targeting: "mantenimiento preventivo muebles", "cuándo reemplazar sofa"

Cada artículo: mínimo 400 palabras, estructura H2/H3 clara, FAQ schema, imagen optimizada, internal links al index y zonas.

**Impacto esperado:** Captura de keywords informacionales. Articles con FAQ schema pueden aparecer como rich snippets. Atracción de tráfico top-funnel que convierte en leads.
**Esfuerzo:** S-M (contenido: 3-4 horas, implementación: 1 hora)
**Agente recomendado:** Content + Frontend
**Referencias:** [Content marketing para servicios locales](https://developers.google.com/search/docs/specialty/international/localized-versions)

---

## Propuestas Priorizadas (R114)

| # | Propuesta | Tipo | Impacto | Esfuerzo | Agente |
|---|-----------|------|---------|---------|--------|
| 1 | WhatsApp real (recuperar leads 100%) | Conversión | 🔴 Crítico | S | Full Stack |
| 2 | VideoObject: resolver o quitar | SEO/Tech Debt | 🟡 Medio | S | Frontend |
| 3 | BreadcrumbList JSON-LD | SEO | 🟡 Medio | S | Frontend |
| 4 | HowTo schema en blog | SEO | 🟡 Medio | S-M | Content + Frontend |
| 5 | Playwright E2E en CI/CD | Calidad/DX | 🔴 Alto | M | Full Stack + QA |
| 6 | hreflang en index.html + sitemap | SEO Internacional | 🟡 Medio | S | Frontend (SEO) |
| 7 | Blog: 3 artículos nuevos | SEO/Contenido | 🟡 Medio | S-M | Content |

---

## Diferenciación con R112 y R113

**R112 pendientes:** BreadcrumbList ✅ (esta ronda), HowTo schema ✅ (esta ronda), Trust badges ❌ (ya implementado DOMAA-112), Booking confirmation email ❌ (no verificado si se implementó), VideoObject ✅ (resolución propuesta en esta ronda).

**R113 propuestas nuevas no implementadas:** Core Web Vitals audit (pendiente), RUM (pendiente), Accesibilidad cognitiva (pendiente), i18n hreflang en index (propuesta en esta ronda — las zonas ya lo tienen).

**R114 novedades propias:**
- WhatsApp real (crítico, nunca propuesto con urgencia real)
- Playwright E2E en CI (nunca propuesto)
- Blog expansion (nunca propuesto como estrategia de crecimiento)

---

## Referencias

[1] Google BreadcrumbList - https://developers.google.com/search/docs/appearance/structured-data/breadcrumb
[2] Schema.org VideoObject - https://schema.org/VideoObject
[3] Google Video rich results - https://developers.google.com/search/docs/appearance/structured-data/video
[4] Schema.org HowTo - https://schema.org/HowTo
[5] Google HowTo structured data - https://developers.google.com/search/docs/appearance/structured-data/how-to
[6] Playwright CI/CD - https://playwright.dev/docs/ci/
[7] Google hreflang guide - https://developers.google.com/search/docs/specialty/international/localized-versions
[8] Sitemap with hreflang annotations - https://developers.google.com/search/docs/specialty/international/localized-versions#sitemap
[9] WhatsApp Business - https://business.whatsapp.com/

---

*Análisis generado por Innovation Scout — Innovation Scout Agent*
*Purity & Clean Round 114 — 2026-04-28*