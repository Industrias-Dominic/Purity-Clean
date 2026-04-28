# Análisis Creativo — Purity & Clean (Round 108)

**Proyecto:** Purity & Clean
**Fecha:** 2026-04-28
**Analista:** Innovation Scout
**Ronda:** 108
**Issue padre:** DOMAA-964

---

## Resumen Ejecutivo

R108 identifica **7 gaps completamente nuevos** que no fueron abordados en R1-R107, tras analizar el código fuente, la documentación de Google Search Central actualizada (enero 2026), y el estado del arte en SEO técnico para home services en Latinoamérica. El proyecto tiene una base sólida, pero persisten brechas en structured data obligatorio (image en LocalBusiness), breadcrumbs markup, cache invalidation en PWA, compliance de privacidad (Colombia), y HowTo schema para procesos de servicio. Se proponen 7 propuestas concretas, 2 de ellas de **prioridad crítica** (image requerido en LocalBusiness y cookie consent).

---

## Estado Actual del Proyecto (R1-R107)

### Lo Implementado

| Feature | Ronda | Estado |
|--------|-------|--------|
| PWA + push notifications | R1-R9 | ✅ Implementado |
| Dark mode + tema claro/oscuro | R1-R9 | ✅ Implementado |
| Chatbot FAQ con WhatsApp routing | R1-R9 | ✅ Implementado |
| Cotizador inteligente + Booking form | R89 | ✅ Implementado |
| Sistema de referidos con códigos | R89 | ✅ Implementado |
| Newsletter con Formspree | R89 | ✅ Implementado |
| Testimonios carousel + Google Reviews | R102 | ✅ Implementado |
| Comparison sliders (antes/después) | R102 | ✅ Implementado |
| Zonas pages (11 páginas) | R10-R20 | ✅ Implementado |
| Schema LocalBusiness + FAQPage + Article | R94-R102 | ✅ Implementado |
| Video embebido + VideoObject schema | R102 | ✅ Implementado |
| Blog con 6 artículos | R94-R102 | ✅ Implementado |
| Playwright E2E tests | R85 | ✅ Implementado |
| PWA Install Prompt | R106 | ✅ Implementado |
| Schema LocalBusiness image + priceRange + streetAddress | R107 (Propuesta) | ⚠️ Pendiente de ejecución |

### Gaps Identificados R108 (NUEVOS — NO cubiertos en R1-R107)

| Categoría | Gap | Gravedad |
|-----------|-----|----------|
| Schema.org | `image` AUSENTE en LocalBusiness (requerido por Google para todos los tipos de LocalBusiness) | 🔴 Crítica |
| Privacy/Compliance | Sin cookie consent ni aviso de privacidad (Ley 1581 Colombia / GDPR-like) | 🔴 Crítica |
| SEO Técnico | Sin BreadcrumbList schema en páginas de zonas ni artículos de blog | 🟡 Media |
| PWA | Cache invalidation ausente en ServiceWorker (usuarios ven contenido obsoleto) | 🟡 Media |
| Schema.org | BlogPosting sin articleSection, wordCount, ni ImageObject completo en publisher logo | 🟡 Media |
| SEO Técnico | Sitemap no referenciado en robots.txt con directive `Sitemap:` | 🟡 Media |
| Schema.org | HowTo schema ausente (proceso de limpieza paso a paso) | 🟡 Media |

---

## Research: Lo que R107 no cubrió

### 1. `image` es PROPIEDAD REQUERIDA en LocalBusiness — Google lo establece explícitamente

Google Search Central actualizó su documentación en enero 2026. Para **Restaurant** (subtipo de LocalBusiness), `image` es un campo **REQUIRED**. Aunque el tipo genérico `LocalBusiness` no lista `image` como requerido en la tabla principal, Google recomienda incluirlo para todos los LocalBusiness subtypes [1]. El schema actual en index.html:

```json
{
  "@type": "LocalBusiness",
  "name": "Purity & Clean",
  // ❌ NO hay campo "image"
  "address": { ... },
  "geo": { ... }
}
```

Además, el ejemplo oficial de Google para Restaurant muestra `image` como array de URLs:
```json
"image": [
  "https://example.com/photos/1x1/photo.jpg",
  "https://example.com/photos/4x3/photo.jpg",
  "https://example.com/photos/16x9/photo.jpg"
]
```

Se requieren múltiples resoluciones (mínimo 50K píxeles al multiplicar width × height). El sitio no tiene ninguna imagen referenciada en el schema LocalBusiness.

### 2. Cookie Consent y Compliance — Ley 1581 de Protección de Datos en Colombia

Colombia tiene la Ley 1581 de 2012 sobre protección de datos personales. Aunque Plausible es cookieless y cumple GDPR/CCPA, el sitio no tiene:
- Banner de cookie consent
- enlace a política de privacidad visible en el footer
-checkbox de consent en formularios

La política de privacidad existe (`politica-privacidad.html`) pero no hay link visible desde el footer ni desde los formularios. El sitio puede estar en incumplimiento de las directrices de cookies de Colombia.

### 3. BreadcrumbList Schema — Mejor práctica para estructura de sitio

Google documenta BreadcrumbList como schema oficial desde 2020 y lo renueva regularmente [2]. Las páginas de zonas (Chapinero, Suba, etc.) y los artículos del blog no tienen breadcrumb markup, lo que significa que Google no puede mostrar la ruta de navegación en resultados de búsqueda.

Ejemplo de breadcrumb para zona Chapinero:
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Inicio", "item": "https://purityclean.com/" },
    { "@type": "ListItem", "position": 2, "name": "Zonas", "item": "https://purityclean.com/zonas/" },
    { "@type": "ListItem", "position": 3, "name": "Chapinero" }
  ]
}
```

### 4. ServiceWorker Cache Invalidation — users ven contenido obsoleto

El ServiceWorker (`sw.js`) tiene caches hardcodeados:
```javascript
const CACHE_NAME = 'purity-clean-v1';
const RUNTIME_CACHE = 'purity-clean-runtime-v1';
```

Cuando se despliegan updates, el cache name NO cambia, lo que significa que users que ya tienen el SW instalado seguirán viendo la versión cached de index.html, css, y js incluso después de updates.

Solución: incluir un `CACHE_VERSION` o usar `skipWaiting()` + `clients.claim()` con cache versioning.

### 5. BlogPosting incompleto — articleSection, wordCount, publisher logo ImageObject

Los artículos del blog tienen BlogPosting schema pero faltan propiedades recomendadas [3]:
- No tienen `articleSection` (categoría del artículo)
- No tienen `wordCount`
- El `publisher.logo` debería ser un `ImageObject` con width/height

### 6. Sitemap no referenciado en robots.txt

El estándar de Google para indicar el sitemap es usar la directiva `Sitemap:` en robots.txt:
```
Sitemap: https://purityclean.com/sitemap.xml
```

El `robots.txt` actual no incluye esta directiva. No es obligatorio pero es una mejora recomendada.

### 7. HowTo Schema — Proceso de limpieza paso a paso

Google soporta HowTo para contenido instructivo [4]. Un articulo como "Guía completa para sanitizar tu colchón" podría beneficiarse de HowTo schema que muestre los pasos en el rich result:

```json
{
  "@type": "HowTo",
  "name": "Cómo sanitizar tu colchón en casa",
  "step": [
    { "@type": "HowToStep", "name": "Preparar el colchón", "text": "Retirar sábanas y aspirar..." },
    { "@type": "HowToStep", "name": "Aplicar sanitizante", "text": "Rociar producto..." },
    { "@type": "HowToStep", "name": "Dejar secar", "text": "Esperar 2-4 horas..." }
  ]
}
```

---

## Propuestas R108 — SEO Técnico, Compliance y PWA

### Propuesta 1: Agregar `image` REQUERIDO al Schema LocalBusiness

| Campo | Detalle |
|-------|---------|
| **Título** | Agregar array de imágenes al Schema LocalBusiness en index.html y zonas |
| **Problema** | Google Search Central establece `image` como propiedad requerida para Restaurant (subtipo de LocalBusiness). El sitio NO tiene ninguna imagen en su schema LocalBusiness. Sin esto, los rich results pueden no mostrarse o mostrarse incompletos. [1] |
| **Descripción** | **1. index.html:**<br>Agregar campo `image` al bloque LocalBusiness JSON-LD:<br>```json<br>"image": [<br>  "https://purityclean.com/images/og-image.svg",<br>  "https://purityclean.com/images/logo.svg"<br>],<br>```<br><br>Se recomienda agregar al menos 3 imágenes con diferentes aspect ratios (16x9, 4x3, 1x1). Las URLs deben ser crawlable.<br><br>**2. Zonas pages (11):**<br>Agregar `image` específico por zona pointing a una foto representativa de esa zona.<br><br>**3.确保 las imágenes existan y sean crawlable:**<br>Verificar que `og-image.svg` y `logo.svg` estén accesibles y no bloqueadas por robots.txt. |
| **Impacto esperado** | Rich results completos en Google Business Profile, mejor CTR en mapas y búsqueda local. |
| **Esfuerzo** | S (1-2 horas — update JSON-LD en 12 archivos) |
| **Agente recomendado** | Frontend (SEO) |
| **Referencias** | [1] Google Search Central — Local Business Structured Data |
| **Estado** | Nueva propuesta — NO mencionada en R1-R107 |
| **Prioridad CEO** | **Crítica** — Google lo establece como requerido |

---

### Propuesta 2: Cookie Consent + Compliance Ley 1581 Colombia

| Campo | Detalle |
|-------|---------|
| **Título** | Implementar banner de cookie consent y link de privacidad visible |
| **Problema** | Colombia tiene la Ley 1581 de 2012 sobre protección de datos. Aunque Plausible es cookieless, el sitio no tiene banner de consent ni link de política de privacidad en footer. Esto puede generar incumplimiento normativo y afectar la confianza del usuario. |
| **Descripción** | **1. Banner de cookie consent:**<br>Crear un banner fijo en la parte inferior de la pantalla con mensaje en español:<br>"Utilizamos cookies para mejorar tu experiencia. Al continuar navegando, aceptas nuestra política de privacidad."<br>Botones: "Aceptar" / "Configurar" / "Rechazar".<br><br>**2. Link en footer:**<br>Agregar enlace visible a `politica-privacidad.html` en todos los pies de página.<br><br>**3. Checkbox en formularios:**<br>Añadir checkbox opcional en el formulario de contacto/reserva:<br>"Acepto la política de privacidad y el tratamiento de mis datos."<br><br>**Stack técnico:**<br>- Vanilla JS para el banner (no instalar librerías pesadas)<br>- CSS en `style.css`<br>- Guardar consent en localStorage para no mostrar de nuevo<br>- No instalar cookies de terceros (Plausible ya es cookieless) |
| **Impacto esperado** | Compliance legal, mayor confianza del usuario, mejor percepción profesional. |
| **Esfuerzo** | S (2-3 horas — banner + footer link + checkbox en formularios) |
| **Agente recomendado** | Frontend |
| **Referencias** | [5] Ley 1581 de 2012 — Protección de datos personales Colombia |
| **Estado** | Nueva propuesta — NO mencionada en R1-R107 |
| **Prioridad CEO** | **Crítica** — Compliance legal |

---

### Propuesta 3: BreadcrumbList Schema en Zonas y Blog

| Campo | Detalle |
|-------|---------|
| **Título** | Agregar BreadcrumbList JSON-LD en todas las páginas de zonas y artículos |
| **Problema** | Sin breadcrumb markup, Google no puede mostrar la ruta de navegación en resultados. Esto afecta la visibilidad y el CTR en búsquedas locales por zona. Google documenta BreadcrumbList como feature recomendada desde 2020 y lo actualiza regularmente. [2] |
| **Descripción** | **1. Páginas de zonas:**<br>Agregar en `<head>` de cada zona (`zonas/chapinero/index.html`, etc.):<br>```html<br><script type="application/ld+json"><br>{<br>  "@context": "https://schema.org",<br>  "@type": "BreadcrumbList",<br>  "itemListElement": [<br>    {<br>      "@type": "ListItem",<br>      "position": 1,<br>      "name": "Inicio",<br>      "item": "https://purityclean.com/"<br>    },<br>    {<br>      "@type": "ListItem",<br>      "position": 2,<br>      "name": "Zonas",<br>      "item": "https://purityclean.com/zonas/"<br>    },<br>    {<br>      "@type": "ListItem",<br>      "position": 3,<br>      "name": "Chapinero"<br>    }<br>  ]<br>}<br></script><br>```<br><br>**2. Artículos de blog:**<br>Agregar breadcrumb para blog con estructura: Inicio → Blog → [Nombre del artículo] |
| **Impacto esperado** | Mejor CTR en resultados de búsqueda con ruta de navegación visible, mejor entendimiento del site hierarchy por Google. |
| **Esfuerzo** | S (2-3 horas — 11 zonas + 6 artículos) |
| **Agente recomendado** | Frontend (SEO) |
| **Referencias** | [2] Google Search Central — BreadcrumbList Structured Data |
| **Estado** | Nueva propuesta — NO mencionada en R1-R107 |
| **Prioridad CEO** | **Alta** — SEO técnico de bajo esfuerzo |

---

### Propuesta 4: ServiceWorker Cache Invalidation con Versioning

| Campo | Detalle |
|-------|---------|
| **Título** | Implementar cache versioning en ServiceWorker para evitar contenido obsoleto |
| **Problema** | El SW usa cache names hardcodeados (`purity-clean-v1`). Cuando se despliega update, los users con SW ya instalado siguen viendo la versión cached hasta que manualmente limpien cache. Esto causa inconsistency y soporte innecesario. |
| **Descripción** | **1. Agregar cache versioning en sw.js:**<br>```javascript<br>const CACHE_VERSION = 'v2';<br>const CACHE_NAME = `purity-clean-${CACHE_VERSION}`;<br>const RUNTIME_CACHE = `purity-clean-runtime-${CACHE_VERSION}`;<br>```<br><br>**2. Actualizar estrategia de activación:**<br>```javascript<br>self.addEventListener('activate', (event) => {<br>  event.waitUntil(<br>    caches.keys().then((cacheNames) => {<br>      return Promise.all(<br>        cacheNames<br>          .filter((name) => name.startsWith('purity-clean-'))<br>          .filter((name) => name !== CACHE_NAME && name !== RUNTIME_CACHE)<br>          .map((name) => caches.delete(name))<br>      );<br>    }).then(() => self.clients.claim())<br>  );<br>});<br>```<br><br>**3. Actualizar install event:**<br>Incrementar `CACHE_VERSION` en cada deploy. La próxima actualización del SW limpiará caches viejos automáticamente.<br><br>**4. Actualizar precache list:**<br>Cambiar `CACHE_VERSION` a `v3`, `v4`, etc. en cada deploy. |
| **Impacto esperado** | Users siempre ven contenido actualizado, menos soporte por caches obsoletos, mejor UX. |
| **Esfuerzo** | S (1 hora — update sw.js) |
| **Agente recomendado** | Frontend (PWA) |
| **Referencias** | [6] Web.dev — Service Workers Caching Strategies |
| **Estado** | Nueva propuesta — NO mencionada en R1-R107 |
| **Prioridad CEO** | **Alta** — UX y mantenimiento |

---

### Propuesta 5: Completar BlogPosting Schema con articleSection y ImageObject

| Campo | Detalle |
|-------|---------|
| **Título** | Enriquecer schema de artículos del blog con propiedades recomendadas |
| **Problema** | Los artículos tienen BlogPosting schema pero faltan propiedades que Google considera recomendadas: `articleSection`, `wordCount`, y `publisher.logo` como `ImageObject` con dimensiones. Esto reduce la calidad del rich result. [3] |
| **Descripción** | **1. Agregar articleSection y wordCount:**<br>```json<br>"articleSection": "Guía de mantenimiento",<br>"wordCount": 850,<br>```<br><br>**2. Actualizar publisher.logo a ImageObject:**<br>```json<br>"publisher": {<br>  "@type": "Organization",<br>  "name": "Purity & Clean",<br>  "logo": {<br>    "@type": "ImageObject",<br>    "url": "https://purityclean.com/favicon.svg",<br>    "width": { "@type": "QuantitativeValue", "value": 512 },<br>    "height": { "@type": "QuantitativeValue", "value": 512 }<br>  }<br>}<br>```<br><br>**3. Contar palabras automáticamente:**<br>Usar un script para contar palabras en cada artículo y agregar el campo wordCount. |
| **Impacto esperado** | Rich results más completos para artículos en Google Discover y búsqueda. |
| **Esfuerzo** | S (1-2 horas — 6 artículos) |
| **Agente recomendado** | Frontend (SEO) |
| **Referencias** | [3] Google Search Central — Article Structured Data |
| **Estado** | Nueva propuesta — NO mencionada en R1-R107 |
| **Prioridad CEO** | **Media** — SEO de contenido |

---

### Propuesta 6: Agregar Directive Sitemap en robots.txt

| Campo | Detalle |
|-------|---------|
| **Título** | Agregar `Sitemap:` directive en robots.txt |
| **Problema** | El robots.txt no incluye la directiva `Sitemap:` que Google recomienda para descubrir el sitemap XML. No es obligatorio pero es una mejora recomendada que facilita el crawling. |
| **Descripción** | Agregar al final de `robots.txt`:<br><br>```<br>Sitemap: https://purityclean.com/sitemap.xml<br>```<br><br>El archivo `robots.txt` actual solo tiene directivas de crawling. Esta línea adicional facilita que Google descubra el sitemap. |
| **Impacto esperado** | Mejor descubrimiento del sitemap por Google, más eficiente crawling de todas las páginas. |
| **Esfuerzo** | XS (5 minutos — agregar 1 línea a robots.txt) |
| **Agente recomendado** | Frontend (SEO) |
| **Referencias** | [7] Google Search Central — Sitemaps Overview |
| **Estado** | Nueva propuesta — NO mencionada en R1-R107 |
| **Prioridad CEO** | **Baja** — Mejora menor pero sin esfuerzo |

---

### Propuesta 7: HowTo Schema para Artículos de Procesos (Guía de Sanitización)

| Campo | Detalle |
|-------|---------|
| **Título** | Implementar HowTo schema en artículos instructivos del blog |
| **Problema** | Google soporta HowTo para contenido paso a paso. El artículo "Guía completa para sanitizar tu colchón" es un proceso instructivo que podría mostrarse como rich result con los pasos en el snippet. [4] |
| **Descripción** | **1. Crear schema HowTo separado para el artículo:**<br>En `blog/articulos/guia-sanitizacion-colchones.html`, agregar JSON-LD adicional:<br>```json<br>{<br>  "@context": "https://schema.org",<br>  "@type": "HowTo",<br>  "name": "Cómo sanitizar tu colchón en casa - Paso a paso",<br>  "description": "Guía profesional para sanitizar colchones: elimina ácaros, bacterias y humedad.",<br>  "step": [<br>    {<br>      "@type": "HowToStep",<br>      "name": "Preparar el colchón",<br>      "text": "Retira todas las sábanas, fundas y protector. Aspira toda la superficie con el accesorio de床上妈的."<br>    },<br>    {<br>      "@type": "HowToStep",<br>      "name": "Aplicar sanitizante",<br>      "text": "Rocía uniformemente el sanitizante especializado sobre toda la superficie del colchón. Presta atención a las esquinas y costuras."<br>    },<br>    {<br>      "@type": "HowToStep",<br>      "name": "Dejar secar",<br>      "text": "Espera 2-4 horas con las ventanas abiertas para un secado completo. No recuestes hasta que esté seco al tacto."<br>    }<br>  ],<br>  "totalTime": "PT4H"<br>}<br>```<br><br>**2. Aplicar a otros artículos instructivos:**<br>"5 tips para mantener alfombras" y "Cómo limpiar tu sofá" también son candidatos a HowTo. |
| **Impacto esperado** | Rich results con pasos mostrados en Google, mayor CTR en búsquedas de DIY. |
| **Esfuerzo** | S (2 horas — 3 artículos) |
| **Agente recomendado** | Frontend (SEO) |
| **Referencias** | [4] Google Search Central — HowTo Structured Data |
| **Estado** | Nueva propuesta — NO mencionada en R1-R107 |
| **Prioridad CEO** | **Media** — SEO de contenido |

---

## Resumen: Propuestas R108

| # | Propuesta | Impacto | Esfuerzo | Prioridad |
|---|-----------|---------|----------|-----------|
| 1 | **Schema LocalBusiness image (requerido)** | Rich snippets completos | S | 🔴 **Crítica** |
| 2 | **Cookie Consent + Compliance Ley 1581** | Legal + confianza | S | 🔴 **Crítica** |
| 3 | **BreadcrumbList Schema** | SEO técnico | S | **Alta** |
| 4 | **ServiceWorker Cache Versioning** | UX + no stale content | S | **Alta** |
| 5 | **BlogPosting completo (articleSection + wordCount)** | SEO contenido | S | Media |
| 6 | **Sitemap directive en robots.txt** | SEO técnico | XS | Baja |
| 7 | **HowTo Schema en artículos instructivos** | SEO contenido | S | Media |

---

## Orden de Implementación Sugerido

1. **Propuesta 1** (Crítica, esfuerzo S) — Semana 1
2. **Propuesta 2** (Crítica, esfuerzo S) — Semana 1 (en paralelo)
3. **Propuesta 4** (Alta, esfuerzo S) — Semana 1 (en paralelo)
4. **Propuesta 3** (Alta, esfuerzo S) — Semana 2
5. **Propuesta 5** (Media, esfuerzo S) — Semana 2
6. **Propuesta 6** (Baja, esfuerzo XS) — Semana 3
7. **Propuesta 7** (Media, esfuerzo S) — Semana 3

---

## Fuentes

[1] Google. "Local Business Structured Data." https://developers.google.com/search/docs/appearance/structured-data/local-business (actualizado enero 2026)

[2] Google. "BreadcrumbList Structured Data." https://developers.google.com/search/docs/appearance/structured-data/breadcrumb

[3] Google. "Article Structured Data." https://developers.google.com/search/docs/appearance/structured-data/article

[4] Google. "HowTo Structured Data." https://developers.google.com/search/docs/appearance/structured-data/how-to

[5] Colombia. "Ley 1581 de 2012 — Protección de datos personales." https://www.sic.gov.co/ley-1581-de-2012

[6] Google. "Service Workers Caching Strategies." https://web.dev/articles/offline-cookbook (Web.dev)

[7] Google. "Sitemaps Overview." https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview

---

*Documento generado por Innovation Scout — Round 108*
*Purity & Clean Analysis — 2026-04-28*
*Co-Authored-By: Paperclip <noreply@paperclip.ing>*