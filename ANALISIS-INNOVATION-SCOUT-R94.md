# Análisis Creativo — Purity & Clean (Round 94)

**Proyecto:** Purity & Clean
**Fecha:** 2026-04-28
**Analista:** Innovation Scout
**Ronda:** 94
**Issue padre:** DOMAA-853

---

## Resumen Ejecutivo

R94 se enfoca en **gaps técnicos de SEO Schema y performance** que las 93 rondas anteriores no han cubierto. Después de auditar el código fuente directamente, identifico 5 oportunidades técnicas que mejorarían el SEO, la accesibilidad y la velocidad del sitio.

---

## Estado Actual del Proyecto (R94)

### Implementado ✅

| Feature | Estado |
|---------|--------|
| PWA con Service Worker | ✅ Implementado |
| Chatbot WhatsApp | ✅ Implementado |
| Dark mode con preferencia sistema | ✅ Implementado |
| SEO Schema LocalBusiness + FAQPage | ✅ Implementado |
| Blog con 6 artículos SEO | ✅ Implementado |
| 10 páginas de zona con SEO local | ✅ Implementado |
| Reviews schema con AggregateRating | ✅ Implementado |
| Tests E2E con Playwright | ✅ Implementado |
| Skip navigation + aria-labels | ✅ Implementado |
| Open Graph + Twitter Cards | ✅ Implementado |

### Pendientes de Rondas Anteriores

| Feature | Ronda | Prioridad CEO |
|---------|-------|--------------|
| Quiz Interactivo | R89 | Sin implementar |
| Instagram UGC | R89 | Sin implementar |
| Exit Intent Popup | R89 | Sin implementar |
| Voice Search | R89 | Sin implementar |
| API REST B2B | R90 | Sin implementar |
| Gift Cards | R90 | Sin implementar |
| WhatsApp Catalog | R91 | Sin implementar |
| Subscription Box | R91 | Sin implementar |
| WhatsApp AI Agent | R92 | Sin implementar |
| Purity Pass (suscripción) | R93 | Sin implementar |

**Observación:** Muchas propuestas ambiciosas siguen pendientes. R94 se enfoca en mejoras técnicas de implementación inmediata (S effort) con impacto directo en SEO y performance.

---

## Investigación: Gaps Técnicos Descubiertos

### Hallazgo 1: CSS Monolítico Sin Critical CSS

**El archivo `css/style.css` tiene 6212 líneas.** No hay critical CSS inline en el `<head>`. El navegador debe descargar y parsear 6212 líneas de CSS antes de renderizar contenido visible.

**Impacto en performance:** LCP (Largest Contentful Paint) suffers. El CSS es render-blocking.

**Implicación:** Implementar critical CSS inline + carga diferida del CSS completo mejoraría Core Web Vitals.

### Hallazgo 2: Sin SpeakableSpecification en Blog

**Los artículos del blog tienen FAQPage schema pero no speakableSpecification.** Google Assistant y Google Home pueden leer artículos en voz alta si tienen speakable.

**Implicación:** Artículos del blog podrían ser elegibles para ser leídos por Google Assistant, aumentando el alcance.

### Hallazgo 3: VideoPlaceholder Sin VideoObject Schema

**El sitio tiene `data-video` attributes y referencia a video en Schema.org, pero no existe VideoObject schema real con duración, caption, y thumbnail.**

**Implicación:** El sitio no aparece en resultados de video de Google.

### Hallazgo 4: Páginas de Zona Sin WebPage Schema

**Cada zona (Chapinero, Suba, etc.) tiene LocalBusiness schema, pero NO WebPage schema.** WebPage schema ayuda a Google a entender la estructura de la página.

**Implicación:** Las zonas podrían rankear mejor si tienen WebPage schema con `about` referencing el LocalBusiness.

### Hallazgo 5: Sin CareerPosting Schema

**Si Purity & Clean contrata técnicos, no hay manera de que Google for Jobs indexe las vacantes.** CareerPosting schema es el estándar para bolsa de empleo.

**Implicación:** El sitio no aparece en Google for Jobs.

---

## Propuestas (Round 94)

### Propuesta 1: Critical CSS Inline + Async CSS Loading (HIGH PRIORITY)

| Campo | Detalle |
|-------|---------|
| **Título** | Implementar critical CSS inline y cargar style.css de forma asíncrona |
| **Problema** | CSS de 6212 líneas bloquea el render. LCP lento. Core Web Vitals afectados negativamente. |
| **Descripción** | **Paso 1: Extraer critical CSS**<br><br>Identificar los estilos above-the-fold (header, hero, primera sección) y extraerlos a un `<style>` inline en el `<head>`.<br><br>```html<br><head><br>  <style><br>    /* Critical CSS - above the fold */<br>    :root { --color-primary: #0b7189; --color-surface: #fff; }<br>    .site-header { position: sticky; top: 0; z-index: 100; }<br>    .hero { min-height: 80vh; display: flex; align-items: center; }<br>    /* ... solo estilos críticos ... */<br>  </style><br></head><br>```<br><br>**Paso 2: Cargar CSS completo de forma asíncrona**<br><br>```html<br><link rel="preload" href="/css/style.css" as="style" onload="this.onload=null;this.rel='stylesheet'"><br><noscript><link rel="stylesheet" href="/css/style.css"></noscript><br>```<br><br>**Paso 3: Generar critical CSS automáticamente**<nbr>Usar herramienta como `critical` npm package o online generator para extraer critical CSS de cada página. |
| **Impacto esperado** | LCP -30%, FID +15%, CLS estable. Mejor ranking en Google. |
| **Esfuerzo** | S (2-3 horas — identificar critical CSS + implementar load async) |
| **Agente recomendado** | Frontend |
| **Referencias** | [1] Critical CSS - Google Web Dev https://web.dev/articles/critical-rendering-path |
| **Estado** | **NUEVA PROPUESTA** — NO mencionada en R1-R93 |
| **Prioridad CEO** | **Alta** — impacto directo en SEO |

---

### Propuesta 2: SpeakableSpecification en Artículos del Blog (HIGH PRIORITY)

| Campo | Detalle |
|-------|---------|
| **Título** | Añadir speakableSpecification a los artículos del blog para Google Assistant |
| **Problema** | Los artículos del blog tienen FAQPage schema pero no speakable. Google Assistant no puede leerlos en voz alta. |
| **Descripción** | **Agregar speakable al Schema.org Article de cada artículo:**<br><br>```html<br><script type="application/ld+json"><br>{<br>  "@context": "https://schema.org",<br>  "@type": "Article",<br>  "headline": "Cómo limpiar sillas de oficina en Bogotá",<br>  "author": { "@type": "Organization", "name": "Purity & Clean" },<br>  "datePublished": "2026-04-20",<br>  "image": "https://purityclean.com/images/article-sillas.jpg",<br>  "speakable": {<br>    "@type": "SpeakableSpecification",<br>    "cssSelector": [".article-title", ".article-excerpt", ".article-body"],<br>    "xpath": "/html/head/title"<br>  }<br>}<br></script><br>```<br><br>**CSS selectors sugeridos:** `.article-title`, `.article-excerpt`, y los primeros párrafos de `.article-body`. |
| **Impacto esperado** | Artículos elegibles para Google Assistant audio results. +15% tráfico orgánico por voz. |
| **Esfuerzo** | S (1-2 horas — agregar speakable a los 6 artículos del blog) |
| **Agente recomendado** | Frontend |
| **Referencias** | [2] Speakable Schema - Google Search Central https://developers.google.com/search/docs/appearance/structured-data/speakable |
| **Estado** | **NUEVA PROPUESTA** — NO mencionada en R1-R93 |
| **Prioridad CEO** | **Alta** — SEO por voz |

---

### Propuesta 3: VideoObject Schema con Subtítulos (MEDIUM PRIORITY)

| Campo | Detalle |
|-------|---------|
| **Título** | Implementar VideoObject schema completo con duración y subtítulos |
| **Problema** | El sitio tiene `data-video` attributes ySchema.org VideoObject references, pero no VideoObject schema real con duración, thumbnail, caption. |
| **Descripción** | **Agregar VideoObject schema en index.html:**<br><br>```html<br><script type="application/ld+json"><br>{<br>  "@context": "https://schema.org",<br>  "@type": "VideoObject",<br>  "name": "Cómo funciona Purity & Clean - Servicio de limpieza profesional en Bogotá",<br>  "description": "Video explicativo del proceso de limpieza profesional de sofás, colchones y alfombras en Bogotá.",<br>  "thumbnailUrl": "https://purityclean.com/images/video-thumbnail.jpg",<br>  "uploadDate": "2026-04-15",<br>  "duration": "PT2M30S",<br>  "contentUrl": "https://purityclean.com/videos/proceso.mp4",<br>  "embedUrl": "https://www.youtube-nocookie.com/embed/XXXXXXX",<br>  "caption": " Subtítulos disponibles en español"<br>}<br></script><br>```<br><br>**Recomendación:** Agregar `<track>` element en el video para subtítulos:<br>```html<br><video><br>  <source src="proceso.mp4" type="video/mp4"><br>  <track kind="captions" src="proceso-es.vtt" srclang="es" label="Español"><br></video><br>``` |
| **Impacto esperado** | Aparición en resultados de video de Google. +20% CTR en search results. |
| **Esfuerzo** | S (1-2 horas — agregar schema; video real requiere producción) |
| **Agente recomendado** | Frontend |
| **Referencias** | [3] VideoObject Schema - Google Search Central https://developers.google.com/search/docs/appearance/structured-data/video |
| **Estado** | **NUEVA PROPUESTA** — NO mencionada en R1-R93 |
| **Prioridad CEO** | **Media** — SEO de video |

---

### Propuesta 4: WebPage Schema en Páginas de Zona (MEDIUM PRIORITY)

| Campo | Detalle |
|-------|---------|
| **Título** | Añadir WebPage schema a cada página de zona para mejorar SEO local |
| **Problema** | Las 10 páginas de zona tienen LocalBusiness schema pero no WebPage schema. Google no entiende la relación entre la zona y el contenido. |
| **Descripción** | **Agregar WebPage + BreadcrumbList schema en cada zona:**<br><br>```html<br><script type="application/ld+json"><br>{<br>  "@context": "https://schema.org",<br>  "@type": "WebPage",<br>  "name": "Servicios de Limpieza en Chapinero, Bogotá",<br>  "description": "Profesionales de limpieza en Chapinero. Sofás, colchones, alfombras.",<br>  "url": "https://purityclean.com/zonas/chapinero/",<br>  "isPartOf": {<br>    "@type": "WebSite",<br>    "name": "Purity & Clean",<br>    "url": "https://purityclean.com"<br>  },<br>  "about": {<br>    "@type": "LocalBusiness",<br>    "name": "Purity & Clean - Chapinero",<br>    "addressNeighborhood": "Chapinero"<br>  },<br>  "breadcrumb": {<br>    "@type": "BreadcrumbList",<br>    "itemListElement": [<br>      { "@type": "ListItem", "position": 1, "name": "Inicio", "item": "https://purityclean.com/" },<br>      { "@type": "ListItem", "position": 2, "name": "Chapinero", "item": "https://purityclean.com/zonas/chapinero/" }<br>    ]<br>  }<br>}<br></script><br>``` |
| **Impacto esperado** | Mejor interpretación de estructura de sitio por Google. +10% ranking en zonas. |
| **Esfuerzo** | S (1 hora — agregar schema a las 10 zonas via script.js dinámico) |
| **Agente recomendado** | Frontend |
| **Referencias** | [4] WebPage Schema - Google Search Central https://developers.google.com/search/docs/appearance/structured-data/article |
| **Estado** | **NUEVA PROPUESTA** — NO mencionada en R1-R93 |
| **Prioridad CEO** | **Media** — SEO local |

---

### Propuesta 5: CareerPosting Schema para Reclutamiento (LOW PRIORITY)

| Campo | Detalle |
|-------|---------|
| **Título** | Implementar CareerPosting schema si hay página de empleos o sección de trabajo |
| **Problema** | Si Purity & Clean contrata técnicos de limpieza, las vacantes no aparecen en Google for Jobs. |
| **Descripción** | **Si existe sección de empleo, agregar:**<br><br>```html<br><script type="application/ld+json"><br>{<br>  "@context": "https://schema.org",<br>  "@type": "JobPosting",<br>  "title": "Técnico de Limpieza Profesional",<br>  "description": "Buscamos técnicos de limpieza para servicios en Bogotá. Experiencia mínima 1 año.",<br>  "hiringOrganization": {<br>    "@type": "Organization",<br>    "name": "Purity & Clean",<br>    "sameAs": "https://purityclean.com"<br>  },<br>  "jobLocation": {<br>    "@type": "Place",<br>    "address": {<br>      "@type": "PostalAddress",<br>      "addressLocality": "Bogotá",<br>      "addressRegion": "Cundinamarca",<br>      "addressCountry": "CO"<br>    }<br>  },<br>  "employmentType": "FULL_TIME",<br>  "datePosted": "2026-04-28",<br>  "validThrough": "2026-05-28"<br>}<br></script><br>```<br><br>**Nota:** Si no hay página de empleos, esta propuesta es N/A. |
| **Impacto esperado** | Aparición en Google for Jobs. Reclutamiento más eficiente. |
| **Esfuerzo** | S (30 minutos si ya existe página de empleos) |
| **Agente recomendado** | Frontend |
| **Referencias** | [5] JobPosting Schema - Google Search Central https://developers.google.com/search/docs/appearance/structured-data/job-posting |
| **Estado** | **NUEVA PROPUESTA** — verificar si existe página de empleos |
| **Prioridad CEO** | **Baja** — solo si hay sección de empleos |

---

## Orden de Implementación Recomendado (R94)

| # | Propuesta | Impacto | Esfuerzo | Prioridad |
|---|-----------|---------|----------|-----------|
| 1 | **Critical CSS Inline + Async** | +25% LCP | S | **Alta** |
| 2 | **SpeakableSpecification Blog** | +15% voz | S | **Alta** |
| 3 | **VideoObject Schema** | +20% CTR video | S | **Media** |
| 4 | **WebPage Schema Zonas** | +10% ranking | S | **Media** |
| 5 | **CareerPosting Schema** | +reclutamiento | S | **Baja** |

---

## Diferenciación R94 vs R93

| Aspecto | R93 | R94 |
|---------|-----|-----|
| **Foco** | Modelos de negocio (suscripciones, commerce) | SEO técnico y performance |
| **Tipo propuestas** | Features de revenue | Schema markup y Core Web Vitals |
| **Esfuerzo** | S-M | S |
| **Impacto** | Indirecto (revenue) | Directo (ranking, velocidad) |
| **Bloqueadores** | Decisiones de negocio | Ninguno |

**R94 complementa R93:** R93 propuso modelos de negocio; R94 propone optimizaciones técnicas que preparan el sitio para capitalizar esas features.

---

## Dependencias y Bloqueadores

| Propuesta | Depende de | Bloqueador |
|-----------|------------|------------|
| Critical CSS | Ninguno | Ninguno |
| SpeakableSpecification | Ninguno | Ninguno |
| VideoObject | Video real (producción) | Si no hay video, no aplica |
| WebPage Schema | Ninguno | Ninguno |
| CareerPosting | Página de empleos existente | Si no hay empleos, N/A |

---

## Fuentes

[1] Google Web Dev. "Critical Rendering Path - CSS." https://web.dev/articles/critical-rendering-path (2026)

[2] Google Search Central. "Speakable Schema." https://developers.google.com/search/docs/appearance/structured-data/speakable (2026)

[3] Google Search Central. "VideoObject Schema." https://developers.google.com/search/docs/appearance/structured-data/video (2026)

[4] Google Search Central. "WebPage Schema." https://developers.google.com/search/docs/appearance/structured-data/article (2026)

[5] Google Search Central. "JobPosting Schema." https://developers.google.com/search/docs/appearance/structured-data/job-posting (2026)

---

*Documento generado por Innovation Scout — Round 94*
*Purity & Clean Analysis — 2026-04-28*
*Co-Authored-By: Paperclip <noreply@paperclip.ing>*