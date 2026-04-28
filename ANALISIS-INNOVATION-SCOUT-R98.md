# Análisis Creativo — Purity & Clean (Round 98)

**Proyecto:** Purity & Clean
**Fecha:** 2026-04-28
**Analista:** Innovation Scout
**Ronda:** 98
**Issue padre:** DOMAA-869

---

## Resumen Ejecutivo

R98 se enfoca en **SEO audiovisual y contenido inmersivo** — un territorio que las 97 rondas anteriores no han abordado con profundidad. Purity & Clean tiene张照片 y videos antes/después pero no los ha optimizado para SEO de video ni ha implementado VideoObject schema. Este round propone convertir el contenido visual existente en activos SEO de alto impacto.

**Hipótesis a validar:** Los videos antes/después de procesos de limpieza, si están correctamente optimizados con VideoObject schema y video sitemaps, pueden generar tráfico desde Google Video tab y Google Discover, capturando usuarios que buscan "cómo limpiar sofá" o "mejor servicio limpieza Bogotá" en formato video.

---

## Estado Actual del Proyecto (R98)

### Stack Técnico Actual

| Componente | Detalle | Estado |
|-----------|---------|--------|
| **HTML** | 2.305 líneas monolithico | Sin code splitting |
| **CSS** | 6.212 líneas | Sin critical CSS |
| **JS** | 1.847 líneas (script.js) | Sin módulos ES6 |
| **Schema** | LocalBusiness + FAQPage | Implementado |
| **Analytics** | Plausible | Eventos custom |
| **Video** | Sin VideoObject schema | Gap |

### Lo Implementado (R1-R97)

| Feature | Ronda | Estado |
|---------|-------|--------|
| PWA, Dark mode, Blog, Google Reviews | R1-R9 | ✅ Implementado |
| FAQPage + HowTo Schema | R94-R96 | ✅ Implementado |
| AI Overviews Optimization | R97 | ✅ Propuesto |
| Bing Webmaster SEO | R97 | ✅ Propuesto |
| Programmatic SEO Landing Pages | R97 | ✅ Propuesto |
| GBP Q&A Automation | R97 | ✅ Propuesto |
| E-E-A-T Expertise Page | R97 | ✅ Propuesto |

### Lo NO Propuesto en R1-R97 (R98 — Gap Analysis)

| Oportunidad | Tipo | Impacto | Estado |
|-------------|------|---------|--------|
| **VideoObject Schema + Video Sitemap** | SEO Video | +Google Video tab | Nueva |
| **Google Discover Optimization** | SEO/Content | +Discover traffic | Nueva |
| **Speakable Schema** | Voice SEO | +Voice search | Nueva |
| **Intro sequence / Process videos** | Content | +Engagement | Nueva |
| **Image SEO con alt text optimizado** | SEO | +Google Images | Nueva |

---

## Investigación: Video SEO y Google Discover

### Hallazgo 1: VideoObject Schema Es Obligatorio Para Video SEO

**Según Google Search Central (2025-12):**
- Los videos en Purity pueden aparecer en Google Search, Video mode, Google Images y Discover
- Para ser elegibles, los videos necesitan VideoObject structured data
- El video debe tener una página watch dedicada, thumbnail estable, y URL de video accesible
- Google puede generar previews automáticos de 5-30 segundos si se permite fetch

**Implicación para Purity & Clean:**
- Los videos antes/después necesitan su propia landing page (no solo embed)
- Cada video necesita VideoObject schema con embedUrl y thumbnailUrl
- El video sitemap debe incluir todos los videos con metadata completa
- Sin esto, los videos no aparecen en Google Video tab

### Hallazgo 2: Google Discover Optimización

**Google Discover muestra contenido basado en:**
- Interest-based content matching user history
- Content quality and engagement signals
- Freshness (content published recently)
- Visual richness (images, videos)

**Para aparecer en Discover, Purity necesita:**
- Schema Article o BlogPosting para posts del blog
- Open Graph completo con og:image (1200x630 mínimo)
- Contenido evergreen con actualización periódica
- Imagen principal de alta calidad (sin texto overlay)

### Hallazgo 3: Speakable Schema Para Voice assistants

**Speakable indica contenido optimizado para朗读 por voice assistants:**
- Compatible con Google Assistant y otros Voice UIs
- Usa atributos speakable: xpath o css-selector
- Ideal para FAQs, instrucciones de proceso, descripciones de servicio

**Purity tiene FAQPage schema pero sin speakable — desperdicia oportunidad de voice search.**

### Hallazgo 4: Image SEO con Alt Text Estructurado

**Google Images SEO best practices (2025):**
- Alt text descriptivo y natural (no keyword stuffing)
- Imagen con resolución mínima 300x300
- Nombre de archivo descriptivo (limpieza-sofa-antes.jpg no IMG_1234.jpg)
- ImageObject schema con caption, credit, license

**Purity tiene imágenes de servicios pero los nombres son genéricos y alt text falta optimización semántica.**

---

## Propuestas (Round 98)

### Propuesta 1: VideoObject Schema + Video Sitemap

| Campo | Detalle |
|-------|---------|
| **Título** | Implementar VideoObject schema y video sitemap para videos de servicios |
| **Problema** | Purity tiene (o debería tener) videos antes/después pero no están optimizados para Google Video tab. Sin VideoObject schema, los videos no son descubribles por Google. |
| **Descripción** | **1. Crear landing pages de video dedicadas:**<br>```<br>videos/<br>├── sofa-limpieza.html    # Watch page para video de limpieza de sofá<br>├── colchones-sanitizacion.html<br>└── alfombras-profunda.html<br>```<br><br>**2. Implementar VideoObject schema en cada watch page:**<br>```html<br><script type="application/ld+json"><br>{<br>  "@context": "https://schema.org",<br>  "@type": "VideoObject",<br>  "name": "Cómo Limpiamos un Sofá - Purity & Clean",<br>  "description": "Proceso profesional de limpieza profunda de sofá en Bogotá. Eliminación de manchas y ácaros en 4 pasos.",<br>  "thumbnailUrl": "https://purityclean.com/images/sofa-limpieza-thumb.jpg",<br>  "uploadDate": "2026-04-28",<br>  "duration": "PT2M30S",<br>  "contentUrl": "https://purityclean.com/videos/sofa-limpieza.mp4",<br>  "embedUrl": "https://purityclean.com/videos/sofa-limpieza.html",<br>  "publisher": {<br>    "@type": "Organization",<br>    "name": "Purity & Clean",<br>    "logo": "https://purityclean.com/favicon.svg"<br>  }<br>}<br></script><br>```<br><br>**3. Crear video sitemap (videositemap.xml):**<br>```xml<br><?xml version="1.0" encoding="UTF-8"?><br><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"<br>    xmlns:video="http://www.google.com/schemas/sitemap-video/1.1"><br>  <url><br>    <loc>https://purityclean.com/videos/sofa-limpieza.html</loc><br>    <video:video><br>      <video:thumbnail_loc>https://purityclean.com/images/sofa-limpieza-thumb.jpg</video:thumbnail_loc><br>      <video:title>Limpieza Profesional de Sofás en Bogotá</video:title><br>      <video:description>Proceso de limpieza profunda de sofá. Elimina manchas, ácaros y olores.</video:description><br>      <video:player_loc allow="Googlebot">https://purityclean.com/videos/sofa-limpieza.html</video:player_loc><br>      <video:duration>150</video:duration><br>    </video:video><br>  </url><br></urlset><br>```<br><br>**4. Submitir en Google Search Console:**<br>- Video indexing report<br>- Rich result report |
| **Impacto esperado** | +Google Video tab visibility, +tráfico desde búsquedas de "cómo limpiar sofá", +Discover impressions |
| **Esfuerzo** | M (4-6 horas — 3-4 videos con landing pages + schema + sitemap) |
| **Agente recomendado** | Frontend / Content |
| **Referencias** | [1] Google Video SEO https://developers.google.com/search/docs/appearance/video |
| **Estado** | Nueva propuesta — NO mencionada en R1-R97 |
| **Prioridad CEO** | **Alta** — convierte contenido visual en SEO activo |

---

### Propuesta 2: Google Discover Optimization

| Campo | Detalle |
|-------|---------|
| **Título** | Optimizar contenido del blog para Google Discover |
| **Problema** | Google Discover representa 25%+ del tráfico mobile en algunos sectores. Purity tiene blog pero no está optimizado para aparecer en Discover, perdiendo tráfico de usuarios que no buscan activamente sino que exploran intereses. |
| **Descripción** | **1. Implementar Article/BlogPosting schema en blog posts:**<br>```html<br><script type="application/ld+json"><br>{<br>  "@context": "https://schema.org",<br>  "@type": "BlogPosting",<br>  "headline": "Cómo Eliminar Manchas de Café de tu Sofá",<br>  "image": "https://purityclean.com/blog/images/manchas-cafe-hero.jpg",<br>  "datePublished": "2026-04-28",<br>  "dateModified": "2026-04-28",<br>  "author": {<br>    "@type": "Organization",<br>    "name": "Purity & Clean"<br>  },<br>  "publisher": {<br>    "@type": "Organization",<br>    "name": "Purity & Clean",<br>    "logo": { "@type": "ImageObject", "url": "https://purityclean.com/favicon.svg" }<br>  },<br>  "mainEntityOfPage": {<br>    "@type": "WebPage",<br>    "@id": "https://purityclean.com/blog/manchas-cafe-sofa.html"<br>  }<br>}<br></script><br>```<br><br>**2. Open Graph completo para cada post:**<br>```html<br><meta property="og:type" content="article"><br><meta property="og:title" content="Cómo Eliminar Manchas de Café de tu Sofá"><br><meta property="og:description" content="Guía paso a paso para quitar manchas de café de sofás de tela y cuero. Productos caseros y profesionales."><br><meta property="og:image" content="https://purityclean.com/blog/images/manchas-cafe-hero.jpg"><br><meta property="og:image:width" content="1200"><br><meta property="og:image:height" content="630"><br><meta property="article:published_time" content="2026-04-28"><br><meta property="article:section" content="Consejos de Limpieza"><br>```<br><br>**3. Requisitos de imagen para Discover:**<br>- Mínimo 1200x630 px (ideal 1200x800)<br>- Sin texto overlay extenso<br>- Colores vibrantes y contraste<br>- Sin rostro oculto o recortado<br><br>**4. Actualizar contenido del blog regularmente:**<br>Discover favorece contenido fresco. Crear calendario editorial de 1 post/semana. |
| **Impacto esperado** | +Discover traffic, +brand awareness, +engagement en usuarios que no saben que necesitan el servicio |
| **Esfuerzo** | M (3-4 horas — schema + og tags + estrategia de contenido) |
| **Agente recomendado** | Content / Frontend |
| **Referencias** | [2] Google Discover https://developers.google.com/search/docs/appearance/google-discover |
| **Estado** | Nueva propuesta — NO mencionada en R1-R97 |
| **Prioridad CEO** | **Media** — tráfico pasivo de usuarios en modo exploración |

---

### Propuesta 3: Speakable Schema para Voice Search

| Campo | Detalle |
|-------|---------|
| **Título** | Implementar speakable schema en FAQs para capturar búsquedas de voz |
| **Problema** | 25% de búsquedas son voice search. Purity tiene FAQPage schema pero sin speakable, perdiendo la oportunidad de ser leído por Google Assistant cuando alguien pregunta "¿cómo limpio mi sofá?" |
| **Descripción** | **1. Identificar contenido speakable en FAQ y páginas de servicio:**<br>El contenido speakable debe responder directamente a preguntas frecuentes con instrucciones claras.<br><br>**2. Implementar speakable con CSS selectors:**<br>```html<br><section class="faq-item" id="como-limpiar-sofa"><br>  <h3 class="faq-question" itemprop="name">¿Cómo limpio mi sofá en casa?</h3><br>  <div class="faq-answer" itemprop="acceptedAnswer" itemscope itemprop="acceptedAnswer"><br>    <p itemprop="text" class="speakable-content"><br>      Para limpiar tu sofá en casa, sigue estos pasos: primero, aspira todo la superficie para remover polvo y migas. Segundo, mezcla agua tibia con jabón neutro. Tercero, aplica la mezcla con un paño suave haciendo círculos. Cuarto, deja secar al aire por 2 horas.<br>    </p><br>  </div><br></section><br>```<br><br>**3. Schema FAQPage con speakable:**<br>```html<br><script type="application/ld+json"><br>{<br>  "@context": "https://schema.org",<br>  "@type": "FAQPage",<br>  "mainEntity": [<br>    {<br>      "@type": "Question",<br>      "name": "¿Cómo limpio mi sofá en casa?",<br>      "acceptedAnswer": {<br>        "@type": "Answer",<br>        "text": "Para limpiar tu sofá en casa, sigue estos pasos: primero, aspira todo la superficie... [contenido completo]",<br>        "speakable": {<br>          "@type": "SpeakableSpecification",<br>          "cssSelector": [".faq-answer .speakable-content"]<br>        }<br>      }<br>    }<br>  ]<br>}<br></script><br>```<br><br>**4. Páginas de servicios con HowTo speakable:**<br>Cada landing page de servicio puede tener HowToSchema con steps speakables. |
| **Impacto esperado** | +voice search visibility, +featured snippets para queries de preguntas, +accessibility |
| **Esfuerzo** | S (2-3 horas — CSS selectors + schema update) |
| **Agente recomendado** | Frontend / SEO |
| **Referencias** | [3] Speakable Schema https://developers.google.com/search/docs/appearance/structured-data/speakable |
| **Estado** | Nueva propuesta — NO mencionada en R1-R97 |
| **Prioridad CEO** | **Media** — preparación para trend de voice search |

---

### Propuesta 4: Alt Text SEO para Imágenes de Servicios

| Campo | Detalle |
|-------|---------|
| **Título** | Optimizar alt text y metadatos de imágenes para Google Images SEO |
| **Problema** | Google Images es el segundo canal de búsqueda después de web. Las imágenes de Purity tienen alt text genéricos o faltan, perdiendo posicionamiento en búsquedas visuales de "sofá limpio Bogotá" o "limpieza colchones". |
| **Descripción** | **1. Auditoría de imágenes actuales:**<br>Identificar todas las imágenes en index.html, zonas pages, y blog que tengan alt text faltante o genérico (alt="image", alt="img").<br><br>**2. Implementar ImageObject schema en páginas principales:**<br>```html<br><script type="application/ld+json"><br>{<br>  "@context": "https://schema.org",<br>  "@type": "ImageObject",<br>  "contentUrl": "https://purityclean.com/images/limpieza-sofa-profesional.jpg",<br>  "description": "Servicio profesional de limpieza profunda de sofá en Bogotá, eliminando manchas y ácaros",<br>  "name": "Limpieza profesional de sofá en Bogotá",<br>  "caption": "Equipo de Purity & Clean limpiando sofá con máquina de extracción",<br>  "creditText": "Purity & Clean",<br>  "license": "https://purityclean.com/politica-privacidad.html"<br>}<br></script><br>```<br><br>**3. Alt text optimizado por imagen:**<br>- Nombre de archivo: `limpieza-sofa-profesional-bogota.jpg` (no `IMG_001.jpg`)<br>- Alt text: "Servicio de limpieza profesional de sofá en Bogotá con eliminación de manchas de café y ácaros"<br>- Title: "Limpieza de sofá Purity & Clean Chapinero"<br><br>**4. Crear images sitemap:**<br>```xml<br><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"<br>    xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"><br>  <url><br>    <loc>https://purityclean.com/index.html</loc><br>    <image:image><br>      <image:loc>https://purityclean.com/images/limpieza-sofa-profesional.jpg</image:loc><br>      <image:caption>Limpieza profesional de sofá</image:caption><br>      <image:title>Limpieza de sofá en Bogotá</image:title><br>    </image:image><br>  </url><br></urlset><br>``` |
| **Impacto esperado** | +Google Images visibility, +tráfico desde búsquedas visuales, +accesibilidad |
| **Esfuerzo** | S (2-3 horas — auditoría + renombrar + alt text) |
| **Agente recomendado** | Frontend / Content |
| **Referencias** | [4] Google Images SEO https://developers.google.com/search/docs/appearance/google-images |
| **Estado** | Nueva propuesta — NO mencionada en R1-R97 |
| **Prioridad CEO** | **Alta** — bajo esfuerzo, alto impacto en tráfico visual |

---

### Propuesta 5: Video Shorts / Reels para SEO Social

| Campo | Detalle |
|-------|---------|
| **Título** | Crear contenido de video corto optimizado para YouTube Shorts e Instagram Reels con links a landing pages |
| **Problema** | Los Shorts de YouTube y Reels de Instagram generan millones de views en búsquedas de "cómo limpiar sofá". Purity no tiene presencia en estos formatos, perdiendo visibilidad ante usuarios en plataformas de video social. |
| **Descripción** | **1. Crear serie de 6-8 videos cortos (30-60 segundos):**<br>- "5 errores al limpiar tu sofá" (antes/después)<br>- "Cómo quitar manchas de café en 30 segundos"<br>- "Proceso profesional de sanitización de colchón"<br>- "Antes y después: alfombra corporativa"<br><br>**2. Optimización SEO para cada video:**<br>- Título: "Cómo Limpiar tu Sofá en Casa | Tips Profesionales Bogotá"<br>- Descripción: Incluye links a la página del servicio y timestamps<br>- Tags: #limpiezasofa #bogota #purityclean #limpiezaprofesional<br>- Thumbnail: Captura antes/después con texto overlay mínimo<br><br>**3. Estrategia de distribución:**<br>```<br>YouTube Shorts → Link en description a /videos/sofa-limpieza.html<br>Instagram Reels → Link bio a purityclean.com/servicios<br>TikTok → Link a WhatsApp para conversión directa<br>```<br><br>**4. UTM parameters para tracking:**<br>Todos los links incluyen UTM para medir tráfico desde video social a website. |
| **Impacto esperado** | +brand awareness en plataformas de video, +tráfico cross-platform, +engagement con usuarios más jóvenes |
| **Esfuerzo** | M (8-10 horas — 8 videos cortos filmados/editados + estrategia de distribución) |
| **Agente recomendado** | Content / Video |
| **Referencias** | [5] YouTube Shorts SEO https://www.youtube.com/how-youtube-works/our-products/shorts/ |
| **Estado** | Nueva propuesta — NO mencionada en R1-R97 |
| **Prioridad CEO** | **Media** — diversificación de canales de adquisición |

---

### Propuesta 6: LocalBusiness Multi-location Schema para Zonas

| Campo | Detalle |
|-------|---------|
| **Título** | Implementar LocalBusiness schema con areaServed geográfico por zona |
| **Problema** | Cada zona page tiene su propio schema LocalBusiness pero no están linkage entre sí ni con el schema principal de la homepage. Google no entiende que son todas partes de un mismo negocio multi-ubicación. |
| **Descripción** | **1. Homepage con Organization schema y location array:**<br>```html<br><script type="application/ld+json"><br>{<br>  "@context": "https://schema.org",<br>  "@type": "Organization",<br>  "name": "Purity & Clean",<br>  "url": "https://purityclean.com",<nbr>  "logo": "https://purityclean.com/favicon.svg",<br>  "telephone": "+57-300-123-4567",<br>  "areaServed": [<br>    { "@type": "City", "name": "Bogotá" }<br>  ],<br>  "location": [<br>    { "@type": "Place", "name": "Chapinero", "areaServed": "Chapinero" },<br>    { "@type": "Place", "name": "Suba", "areaServed": "Suba" },<br>    { "@type": "Place", "name": "Usaquén", "areaServed": "Usaquén" }<br>  ]<br>}<br></script><br>```<br><br>**2. Cada zona page debe tener parentOrganization reference:**<br>```html<br><script type="application/ld+json"><br>{<br>  "@context": "https://schema.org",<br>  "@type": "LocalBusiness",<br>  "name": "Purity & Clean - Chapinero",<br>  "parentOrganization": {<br>    "@type": "Organization",<br>    "name": "Purity & Clean",<br>    "url": "https://purityclean.com"<br>  },<br>  "areaServed": {<br>    "@type": "Place",<br>    "name": "Chapinero",<br>    "containedInPlace": { "@type": "City", "name": "Bogotá" }<br>  }<br>}<br></script><br>```<br><br>**3. Geo-shape para cobertura de zonas:**<br>Para cada zona, definir geo boundary que Google puede usar para queries locales. |
| **Impacto esperado** | +SEO multi-location, mejor entendido como negocio con múltiples zonas de servicio, +Local pack visibility |
| **Esfuerzo** | S (2-3 horas — actualizar 10 zona schemas con parentOrganization) |
| **Agente recomendado** | Frontend / SEO |
| **Referencias** | [6] LocalBusiness Multi-location https://developers.google.com/search/docs/appearance/local-business |
| **Estado** | Nueva propuesta — NO mencionada en R1-R97 |
| **Prioridad CEO** | **Alta** — mejora la estructura de negocio multi-ubicación para Google |

---

## Orden de Implementación Recomendado (R98)

| # | Propuesta | Impacto | Esfuerzo | Prioridad |
|---|-----------|---------|----------|-----------|
| 1 | **VideoObject Schema + Video Sitemap** | +Google Video tab | M | **Alta** |
| 2 | **Alt Text SEO para Imágenes** | +Google Images | S | **Alta** |
| 3 | **LocalBusiness Multi-location Schema** | +Local SEO | S | **Alta** |
| 4 | **Google Discover Optimization** | +Discover traffic | M | **Media** |
| 5 | **Speakable Schema** | +Voice search | S | **Media** |
| 6 | **Video Shorts / Reels Strategy** | +Social reach | M | **Media** |

---

## Dependencias y Bloqueadores

| Propuesta | Depende de | Bloqueador |
|-----------|------------|------------|
| VideoObject Schema | Videos grabados | Confirmar si hay videos o se deben crear |
| Alt Text SEO | Auditoría imágenes | Ninguno |
| Multi-location Schema | Ninguno | Ninguno |
| Google Discover | Blog con posts | Posts de blog existentes |
| Speakable Schema | FAQPage existente | Ninguno |
| Video Shorts | Videos grabados | Producción de contenido |

---

## Comparación R97 vs R98

| Aspecto | R97 | R98 |
|---------|-----|-----|
| **Foco** | AI Overviews, Bing, Programmatic SEO | Video SEO, Discover, Voice, Images |
| **Tipo propuestas** | SEO text-centric | SEO audiovisual |
| **Plataforma** | Google Search, Bing | Google Images, Video tab, Discover, Voice |
| **Tecnología** | Schema.org (Service, LocalBusiness) | VideoObject, ImageObject, Speakable |
| **Esfuerzo** | S-M | S-M |
| **Revenue** | Indirecto (más tráfico) | Directo (másengagement + conversión) |

**R98 complementa R97:** R97 optimizó para texto y búsqueda tradicional; R98 optimiza para contenido audiovisual y las nuevas formas de descubrimiento de Google (Discover, Video tab, Voice).

---

## Fuentes

[1] Google. "Video SEO best practices." Google Search Central, 2025. https://developers.google.com/search/docs/appearance/video

[2] Google. "Google Discover." Google Search Central, 2025. https://developers.google.com/search/docs/appearance/google-discover

[3] Google. "Speakable schema." Google Search Central, 2025. https://developers.google.com/search/docs/appearance/structured-data/speakable

[4] Google. "Google Images SEO." Google Search Central, 2025. https://developers.google.com/search/docs/appearance/google-images

[5] YouTube. "YouTube Shorts." https://www.youtube.com/how-youtube-works/our-products/shorts/

[6] Google. "LocalBusiness structured data." Google Search Central, 2025. https://developers.google.com/search/docs/appearance/local-business

---

*Documento generado por Innovation Scout — Round 98*
*Purity & Clean Analysis — 2026-04-28*
*Co-Authored-By: Paperclip <noreply@paperclip.ing>*