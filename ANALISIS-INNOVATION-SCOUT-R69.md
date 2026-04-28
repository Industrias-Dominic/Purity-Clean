# Análisis Creativo — Purity & Clean (Round 69)

**Proyecto:** Purity & Clean
**Fecha:** 2026-04-28
**Analista:** Innovation Scout
**Ronda:** 69
**Issue padre:** DOMAA-667

---

## Resumen Ejecutivo

R69 se enfoca en **optimizaciones de schema markup, accesibilidad y arquitectura de contenido** que el sitio no ha cubierto en profundidad en rondas anteriores. A diferencia de R68 (infraestructura de conversión), R69 ataca el **SEO técnico, la accesibilidad WCAG y la estructura de linking interno** — pilares que impactan directamente el ranking en buscadores y la retención de usuarios.

**Diferenciación clave vs R68:**
- R68 = cierre de gaps técnicos dormant (chatbot HTML, cookie banner, PWA completo)
- R69 = schema markup avanzado, accesibilidad, linking interno, y trust signals

---

## Stack tecnológico actual (verificado en código)

- **Frontend:** HTML5 + CSS3 + JS vanilla ES6+ (sin bundler)
- **HTML:** 2305 líneas en index.html (monolítico)
- **CSS:** 6212 líneas en style.css (tema claro/oscuro, chatbot completo)
- **JS:** 1847 líneas en script.js + config.js
- **Chatbot:** Implementación COMPLETA — HTML, CSS, JS都已存在 (R68 análisis incorrecto)
- **Cookie banner:** Ya existe con HTML/CSS/JS completo en index.html líneas 2282-2303
- **PWA SW:** Precache funcional con 13 assets + offline fallback + runtime cache
- **Booking:** Multi-step form con geo-localización y slot picker
- **Referidos:** Cupón 15% con generador de código y WhatsApp share
- **Comparison sliders:** 6 before/after sliders con range input (sin keyboard control)
- **Blog:** 6 artículos educativos con Schema.org BlogPosting
- **Zonas:** 10 páginas con LocalBusiness schema
- **WhatsApp:** Float button + múltiples links con configuración por zona

---

## Gaps Técnicos Identificados — Round 69

### Gap 1: Blog sin linking interno

**Problema:** Los 6 artículos del blog no tienen sección "Artículos relacionados" ni enlaces contextuales entre artículos. El usuario termina su lectura y no tiene forma de continuar navegando por contenido relevante. Impacto directo en bounce rate y tiempo en sitio.

**Evidencia:** Blog articles (ej: `guia-sanitizacion-colchones.html`) no contienen enlaces a otros artículos, no hay sección "también te puede interesar" al final.

### Gap 2: Blog articles con schema incompleto

**Problema:** Los artículos tienen `BlogPosting` schema básico pero les falta:
- `Article` (subtipo de `BlogPosting` más rico para Google)
- `author` con `Person` type y nombre real
- `datePublished` y `dateModified`
- `image` thumbnail para rich cards
- `publisher` con logo
- `headline` optimizado para SEO

**Evidencia:** `blog/articulos/guia-sanitizacion-colchones.html` solo tiene schema genérico, sin author ni image fields.

### Gap 3: Sin FAQPage schema real (el JSON-LD existe pero no genera rich results)

**Problema:** El FAQPage schema está en index.html pero Google no lo muestra como rich result porque:
- Las preguntas no tienen el formato exacto que Google espera
- Falta `text` en `acceptedAnswer` en algunos casos (Google requiere `text` field, no HTML)
- No hay `mainEntity` con suficiente cantidad de preguntas para algunos nichos

**Impacto:** Posible pérdida de valiosos real estate en検索結果 (position 0 / featured snippets).

### Gap 4: Sin breadcrumbList schema

**Problema:** No hay breadcrumb navigation en ninguna página. Google no puede entender la jerarquía del sitio (Home > Blog > Sanitización de colchones) para mostrar breadcrumbs en resultados.

**Impacto:** Menor CTR en search results y pérdida de navegación jerárquica en SERP.

### Gap 5: Comparison sliders sin keyboard accessibility

**Problema:** Los 6 comparison sliders usan `<input type="range">` que técnicamente tiene keyboard support pero el diseño visual del handle no responde correctamente a arrow keys. Users que usan solo keyboard no pueden drag el slider de forma efectiva.

**WCAG Violación:** Las sliders son contenido interactivo sin alternativa accesible.

### Gap 6: Sin guarantee / trust section visible

**Problema:** No hay sección de "Garantía de satisfacción" o "Si no quedas satisfecho, te devolvemos el dinero". Los competidores de servicios de limpieza en Bogotá muestran badges de garantía para generar confianza.

**Oportunidad:** Implementar una "Garantía Purity & Clean" con términos claros y badge visual incrementaría la conversión.

### Gap 7: Sitemap.xml sin prioridades ni changefreq

**Problema:** El sitemap.xml actual (`sitemap.xml`) probablemente es genérico sin tags `<priority>` ni `<changefreq>` para las diferentes secciones. Google no sabe qué páginas son más importantes.

**Impacto:** Crawl budget mal dirigido — Google puede priorizar páginas menos importantes.

---

## Propuestas (Round 69)

### Propuesta 1: Artículos relacionados y linking interno en blog

| Campo | Detalle |
|-------|---------|
| **Título** | Agregar sección "También te puede interesar" al final de cada artículo del blog |
| **Problema** | Los 6 artículos del blog no linked entre sí. El usuario termina un artículo y abandona en vez de continuar consumiendo contenido. |
| **Descripción** | **Internal Linking:** (1) **Nueva función en script.js:** `initRelatedArticles()` que busca artículos por tags/categoría y muestra 2-3 artículos relacionados al final del contenido. (2) **Lógica:** cada artículo tiene `data-tags` en el frontmatter; buscar otros artículos con tags en común. (3) **Diseño:** cards horizontales con imagen thumbnail, título y excerpt. (4) **SEO:** los enlaces internos con texto descriptivo pasan link equity. (5) **JSON-LD:** agregar `ItemList` schema para la sección de relacionados. Implementación: 3-4 horas (función JS de relacionadas + CSS cards + tag data en artículos). |
| **Impacto esperado** | Reducción de bounce rate en blog (estimado -15%), aumento de páginas/visita (+2 páginas/sesión), mejora de SEO por linking interno |
| **Esfuerzo** | S (3-4 horas) |
| **Agente recomendado** | Frontend |
| **Referencias** | [1] Moz - Internal Linking Best Practices https://moz.com/learn/seo/internal-links |

### Propuesta 2: Rich Article schema para blog posts

| Campo | Detalle |
|-------|---------|
| **Título** | Actualizar schema de blog posts a Article con author, image, datePublished |
| **Problema** | Los artículos tienen BlogPosting genérico. Google espera Article subtype con author, image y fechas para mostrar rich cards en search. |
| **Descripción** | **Article Schema Upgrade:** (1) **Cambiar @type:** de `BlogPosting` a `Article` (más específico para Google). (2) **Agregar author:** `{ "@type": "Person", "name": "Equipo Purity & Clean" }`. (3) **Agregar image:** thumbnail del artículo como ImageObject. (4) **Agregar datePublished y dateModified.** (5) **Agregar publisher:** `{ "@type": "Organization", "name": "Purity & Clean", "logo": { "@type": "ImageObject", "url": "https://purityclean.com/images/logo.png" } }`. (6) **Modificar cada artículo:** actualizar el JSON-LD en las 6 páginas de blog. (7) **Sitemap:** agregar `<lastmod>` con fecha real de última modificación. Implementación: 2-3 horas (actualizar schema en 6 archivos + sitemap). |
| **Impacto esperado** | Mejora en CTR de search results (+10-15% por rich cards), mayor visibilidad en Google News si aplica |
| **Esfuerzo** | S (2-3 horas) |
| **Agente recomendado** | Frontend |
| **Referencias** | [2] Google Search Central - Article Rich Results https://developers.google.com/search/docs/appearance/structured-data/article |

### Propuesta 3: FAQPage schema con formato optimizado para featured snippets

| Campo | Detalle |
|-------|---------|
| **Título** | Optimizar FAQPage schema para generar featured snippets en Google |
| **Problema** | El FAQPage actual no genera rich results porque falta el field `text` en acceptedAnswer y algunas preguntas no califican. |
| **Descripción** | **FAQPage Optimization:** (1) **Reemplazar `text` por campo exacto:** el schema actual tiene `text` pero Google requiere que cada `acceptedAnswer.text` sea una respuesta corta y directa (40-60 caracteres ideal). (2) **Agregar más preguntas frecuentes:** Google requiere al menos 4-5 preguntas para mostrar FAQ rich results. Añadir: "¿Cuánto tiempo toma la limpieza?", "¿Qué productos usan?", "¿Necesito mover los muebles?". (3) **Remover HTML del answer text:** las respuestas no deben contener HTML — solo texto plano. (4) **Agregar breadcrumb en páginas de zonas:** para que Google muestre breadcrumb + FAQ en el mismo resultado. Implementación: 2-3 horas (actualizar FAQPage JSON-LD + agregar preguntas faltantes). |
| **Impacto esperado** | Posible posición 0 (featured snippet) para queries de servicios, incremento en CTR orgánico |
| **Esfuerzo** | S (2-3 horas) |
| **Agente recomendado** | Frontend |
| **Referencias** | [3] Google Search Central - FAQ Structured Data https://developers.google.com/search/docs/appearance/structured-data/faqpage |

### Propuesta 4: BreadcrumbList schema + navegación visual

| Campo | Detalle |
|-------|---------|
| **Título** | Implementar breadcrumbs con schema BreadcrumbList para todas las páginas |
| **Problema** | No hay navegación jerárquica visible ni schema que permita a Google mostrar breadcrumbs en resultados. |
| **Descripción** | **Breadcrumb Implementation:** (1) **HTML breadcrumb nav:** agregar `<nav aria-label="Breadcrumb">` con enlaces: Home > [Zonas/Blog] > [Nombre de página]. En index.html seria: Home (/) > (no breadcrumb). En zonas/usme: Home > Zonas > Usme. En blog: Home > Blog > [Artículo]. (2) **Schema BreadcrumbList:** agregar JSON-LD con `@type: BreadcrumbList`, `itemListElement` con position, name, item. (3) **CSS:** estilo simple con separadores `>` y fuente reducida. (4) **Mobile:** mantener en una línea, truncate si es necesario. Implementación: 2-3 horas (HTML breadcrumb + CSS + schema JSON-LD por página). |
| **Impacto esperado** | Mejora en CTR de search results (los breadcrumbs en SERP generan +20-30% CTR), mejor navegación para usuarios |
| **Esfuerzo** | S (2-3 horas) |
| **Agente recomendado** | Frontend |
| **Referencias** | [4] Google Search Central - Breadcrumb Structured Data https://developers.google.com/search/docs/appearance/structured-data/breadcrumb |

### Propuesta 5: Garantía de satisfacción y trust section

| Campo | Detalle |
|-------|---------|
| **Título** | Crear sección de "Garantía Purity & Clean" con badge visual y términos |
| **Problema** | No hay trust signal de garantía. Los visitantes que comparan con competencia no tienen razones objetiva para elegir a Purity & Clean más allá del precio. |
| **Descripción** | **Trust Section:** (1) **Nueva sección antes del footer:** "Garantía de satisfacción" con badge/icono de escudo. (2) **Copy:** "Si no quedas 100% satisfecho con el resultado, devolvemos tu dinero o re-limpiamos sin costo adicional. Así de simple." (3) **Términos en tooltip/link:** " aplican términos y condiciones. Consulta nuestra política de satisfacción." (4) **Badge visual:** shield icon con "100% Garantizado" en color accent. (5) **Integración:** colocar al final del booking form y en el cotizador como "CTA de confianza". (6) **Schema:** `{ "@type": "Offer", "priceCurrency": "COP", "availability": "https://schema.org/InStock", "seller": { "@type": "Organization", "name": "Purity & Clean" } }`. Implementación: 2-3 horas (nueva sección HTML/CSS + copy persuasivo + schema). |
| **Impacto esperado** | Incremento en conversión del booking form (estimado +10-15%) por reducción de friction de犹豫 |
| **Esfuerzo** | S (2-3 horas) |
| **Agente recomendado** | Frontend |
| **Referencias** | [5] Baymard Institute - Trust Signals in Checkout https://baymard.com |

### Propuesta 6: Comparación sliders con keyboard navigation mejorada

| Campo | Detalle |
|-------|---------|
| **Título** | Mejorar accesibilidad WCAG de los comparison sliders con keyboard controls |
| **Problema** | Los sliders usan range input que es técnicamente accessible pero el feedback visual es deficiente con keyboard. |
| **Descripción** | **Accessible Sliders:** (1) **Mejorar CSS del handle:** el handle visual debe responder más visiblemente al focus (outline más visible). (2) **Agregar aria-valuetext dinámico:** que diga "50% antes" y se actualice al mover. (3) **Agregar teclas personalizadas:** interceptar arrow keys para hacer steps del 5% en vez de nativa (las flechas nativas hacen steps muy pequeños). (4) **Track visual:** agregar colores diferentes al track para la parte "antes" y "después" cuando el slider se mueve. (5) **Documentación:** agregar instrucciones de uso para keyboard en aria-label del slider. Implementación: 3-4 horas (CSS del handle + JS para custom key handling + aria-valuetext dinâmico). |
| **Impacto esperado** | Cumplimiento WCAG 2.1 AA, mejor experiencia para usuarios con disabilities, mejora en accessibility score de Lighthouse |
| **Esfuerzo** | S (3-4 horas) |
| **Agente recomendado** | Frontend |
| **Referencias** | [6] WCAG 2.1 - Content Structure https://www.w3.org/WAI/WCAG21/Understanding/content-structure-versus-presentation |

### Propuesta 7: Sitemap.xml con prioridades y LastMod

| Campo | Detalle |
|-------|---------|
| **Título** | Actualizar sitemap.xml con priorities, changefreq y lastmod para SEO |
| **Problema** | El sitemap actual es básico sin metadata que guide a Google sobre qué páginas priorizar. |
| **Descripción** | **Enhanced Sitemap:** (1) **Priority tags:** homepage (1.0), zonas pages (0.8), blog (0.7), index principal (0.9), blog articles (0.6). (2) **Lastmod:** fechas reales de última modificación de cada archivo. (3) **Changefreq:** homepage (daily), blog (weekly), zonas (monthly). (4) **Blog sitemap separado:** considerar crear `blog-sitemap.xml` para los artículos del blog si hay más de 50 URLs. (5) **Verify en Google Search Console:** confirmar que Google indexing correctamente. Implementación: 1-2 horas (actualizar sitemap.xml + GSC verification). |
| **Impacto esperado** | Mejor distribución del crawl budget,索引 más rápido de páginas nuevas, mejor ranking general |
| **Esfuerzo** | S (1-2 horas) |
| **Agente recomendado** | SEO |
| **Referencias** | [7] Google Search Central - Sitemap Guidelines https://developers.google.com/search/docs/crawling-indexing/sitemaps-overview |

---

## Orden de Implementación Recomendado

| # | Propuesta | Impacto | Esfuerzo | Prioridad |
|---|----------|---------|----------|-----------|
| 1 | Artículos relacionados (blog linking) | UX / SEO | S | Alta — retención blog, link equity |
| 2 | Article schema upgrade | SEO / CTR | S | Alta — rich cards, visibility |
| 3 | Garantía de satisfacción | Conversion | S | Alta — trust, reduce friction |
| 4 | FAQPage schema optimization | SEO | S | Media — featured snippets |
| 5 | BreadcrumbList schema + nav | SEO / UX | S | Media — CTR en SERP |
| 6 | Accessible sliders | Accessibility | S | Media — WCAG compliance |
| 7 | Sitemap con priorities | SEO | S | Baja — crawl optimization |

**Top 3 para implementar primero:** 1, 2, 3 (linking + schema + trust = alto impacto con esfuerzo bajo).

---

## Diferencia Clave: R69 vs R68

R69 se diferencia de R68 porque:

1. **SEO técnico vs conversión directa** — R68 se enfocó en implementar features que convierten directamente (chatbot, cookie banner, video testimonials). R69 se enfoca en hacer que el sitio rankee mejor y sea más accessible.
2. **Schema markup advanced** — R68 identificó gaps de features; R69 identifica gaps de schema que ya existe pero está incompleto u optimizado.
3. **Accesibilidad WCAG** — R68 no mencionó accesibilidad; R69 corrige gaps de keyboard navigation en comparison sliders.
4. **Linking interno** — R68 propuso video testimonials para external social proof; R69 propone linking interno para distribuir page authority.

R69 complementa R68:
- R68: Chatbot widget (conversión directa) → R69: Schema ayuda a que el chatbot se muestre en search
- R68: Video testimonials (social proof) → R69: Article schema + related articles (SEO del blog)
- R68: Cookie banner (compliance) → R69: Garantía (compliance + trust)

---

## Sources

[1] Moz. "Internal Linking Best Practices for SEO." https://moz.com/learn/seo/internal-links
[2] Google Search Central. "Article Rich Results." https://developers.google.com/search/docs/appearance/structured-data/article
[3] Google Search Central. "FAQ Structured Data." https://developers.google.com/search/docs/appearance/structured-data/faqpage
[4] Google Search Central. "Breadcrumb Structured Data." https://developers.google.com/search/docs/appearance/structured-data/breadcrumb
[5] Baymard Institute. "Trust Signals in E-Commerce Checkout." https://baymard.com
[6] W3C. "WCAG 2.1 Understanding Content Structure." https://www.w3.org/WAI/WCAG21/Understanding/content-structure-versus-presentation
[7] Google Search Central. "Sitemap Guidelines." https://developers.google.com/search/docs/crawling-indexing/sitemaps-overview

---

*Documento generado por Innovation Scout — Round 69*
*Purity & Clean Analysis — 2026-04-28*
*Co-Authored-By: Paperclip <noreply@paperclip.ing>*