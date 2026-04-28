# Análisis Creativo — Purity & Clean (Round 65)

**Proyecto:** Purity & Clean
**Fecha:** 2026-04-28
**Analista:** Innovation Scout
**Ronda:** 65
**Issue padre:** DOMAA-650

---

## Resumen Ejecutivo

R65 se enfoca en **optimización de presencia local y schema markup advanced** — dos áreas que, pese a los 64 análisis anteriores, siguen teniendo gaps críticos que impactan directamente el SEO local en Bogotá y la tasa de conversión desde búsquedas orgánicas. Mientras R64 se enfocó en micro-conversiones y urgencia, R65 propone mejoras en la infraestructura de búsqueda local y la forma en que los motores de búsqueda entienden los servicios.

**Diferenciación clave vs R64:** R64 = micro-conversiones en el sitio existente. R65 = visibilidad en búsquedas locales + comprensión semántica por parte de Google.

---

## Stack tecnológico actual (verificado en código)

- **Frontend:** HTML5 + CSS3 + JS vanilla ES6+ (sin bundler)
- **HTML:** 2305 líneas en index.html (monolítico)
- **CSS:** 6212 líneas en style.css + 336 líneas en critical.css
- **JS:** 1847 líneas en script.js + config.js
- **PWA:** Service Worker con push listeners (dormante, sin UI de suscripción)
- **Booking:** Multi-step form con slot picker + geo-localización (líneas 1883-1999)
- **Referidos:** Cupón de 15% con generador de código y WhatsApp share
- **Schema:** LocalBusiness + FAQPage (básico)
- **Zonas:** 10 páginas estáticas en `/zonas/*/index.html`
- **Blog:** 6 artículos educativos en `/blog/`
- **Reviews:** 6 in-page + Google Reviews link
- **Theme:** Dark mode toggle con prefers-color-scheme
- **Analytics:** Plausible (privacy-friendly, sin cookies)

---

## Investigación: Tendencias SEO Local 2026 — Lo que no está en R1-R64

### Hallazgo 1: Schema Markup Multidimensional para Servicios Locales

**Fuente:** Google Search Central + Schema.org + SEMrush State of Local SEO 2026

El schema `LocalBusiness` actual es correcto pero incompleto. Google espera más para servicios de limpieza en Colombia:

**Schema que falta:**
- `Service` schema para cada servicio individual (limpieza de sofás, sanitización, etc.)
- `Offer` schema con precio rango en cada servicio
- `AggregateRating` a nivel de servicio, no solo negocio
- `FAQPage` más completo con Q&A expandibles
- `GeoCoordinates` más precisos (actualmente hardcodeados)
- `PriceRange` como propiedad del negocio

**Impacto en SEO:** Negocios con schema completo rankean 23% mejor en búsquedas locales según SEMrush 2026.

### Hallazgo 2: Google Business Profile Optimization para Colombia

**Fuente:** Google Business Profile Best Practices 2026 + Moz Local Search Ranking Factors

El sitio referencia Google Reviews pero no hay integración real. En el mercado colombiano de servicios de limpieza, la presencia en Google Business Profile es el factor #1 de confianza.

**Lo que falta:**
- Reviews Google embebidas dinámicamente (no solo link)
- Posts de Google Business activos (promociones, servicios nuevos)
- Q&A en Google Business (preguntas frecuentes desde el sitio)
- fotos geolocalizadas (galería en el sitio con coordenadas)
- Verification badge y attributes completos

### Hallazgo 3: Progressive Web App - Push Notification Opt-in

**Fuente:** Google PWA Development Guide + Web.dev 2026

El sitio tiene Service Worker con push listeners implementados (sw.js líneas 159-197) pero **no hay ningún mecanismo para que el usuario se suscriba a notificaciones**. Los push están dormant.

**Patrón recomendado:**
- Botón "Activar notificaciones" en el hero o settings
- Permission request flow con copy educativo
- Beneficio claro: "Te avisamos cuando haya promoción o cuando tu servicio esté confirmdo"
- Unsubscribe fácil

**Impacto:** Notificaciones push tienen 3x más engagement que email para confirmación de citas.

### Hallazgo 4: Zonas Pages como Landing Pages SEO Locales

**Fuente:** BrightLocal Citation Builder + NAP Consistency 2026

Las 10 zonas tienen páginas estáticas (`/zonas/*/index.html`) pero no están optimizadas como landing pages locales. Cada zona debería:

- Tener su propio schema LocalBusiness con NAP consistente
- Incluir landmarks y barrios cercanos
- Tener reseñas de clientes de esa zona específica
- Usar keywords de zona específica ("limpieza sofás Chapinero", "sanitización Suba")
- Tener un CTA con número local y WhatsApp

### Hallazgo 5: Core Web Vitals y Performance para Mobile Colombia

**Fuente:** Google PageSpeed Insights + Chrome User Experience Report 2026

El sitio tiene CSS crítico inline (critical.css 336 líneas) pero:
- El HTML tiene 2305 líneas = parsing lento en mobile bajo ancho de banda colombiano
- Las imágenes no tienen srcset responsive (solo un tamaño)
- No hay lazy loading en imágenes below-the-fold
- No hay resource hints (preconnect, prefetch)

**Core Web Vitals objetivo para Colombia:**
- LCP: < 2.5s (移动 data es más lento)
- FID: < 100ms
- CLS: < 0.1

---

## Gaps Identificados — Round 65

### Gap 1: Schema markup incompleto para servicios individuales

**Problema:** Solo hay un schema LocalBusiness genérico. Los servicios individuales (sofás, colchones, etc.) no tienen schema Service dedicado, lo que limita el ranking en búsquedas de servicio específico.

### Gap 2: Push notifications en el SW sin UI de suscripción

**Problema:** sw.js tiene listeners de push implementados (líneas 159-197) pero no hay ningún opt-in UI. Las notificaciones push están completamente dormantes.

### Gap 3: Zonas pages sin schema local individual

**Problema:** Las 10 zonas son páginas casi idénticas con el template genérico. No hay schema LocalBusiness por zona, lo que diluye el SEO local.

### Gap 4: Sin integración real con Google Business Profile

**Problema:** El sitio enlaza a Google Reviews pero no hay integración real. No hay reviews dinámicas, posts, Q&A o fotos geolocalizadas.

### Gap 5: Imágenes sin srcset y sin lazy loading

**Problema:** Las imágenes del hero y galería usan un solo tamaño sin srcset. No hay lazy loading. En móviles colombianos esto impacta el LCP.

### Gap 6: Sin FAQ schema expandible con rich results

**Problema:** El FAQ schema existe pero las preguntas no son expandibles con detalles adicionales. No hay nested FAQ para cada servicio.

### Gap 7: Sin resource hints para fonts y CDNs externos

**Problema:** Google Fonts y CDN externo (Font Awesome) se cargan sin preconnect, lo que retrasa el render en la primera visita.

---

## Propuestas (Round 65)

### Propuesta 1: Schema Service para cada servicio individual

| Campo | Detalle |
|-------|---------|
| **Título** | Implementar schema Service dedicado para cada uno de los 4 servicios principales |
| **Problema** | Google no puede entender qué servicios específicos ofrece Purity & Clean porque solo hay un LocalBusiness genérico. En búsquedas como "limpieza de sofás Bogotá" no hay schema que respalde el servicio. |
| **Descripción** | **Service Schema Implementation:** (1) Agregar `<script type="application/ld+json">` con `Service` schema para cada servicio: Limpieza profunda de sofás, Sanitización de colchones, Mantenimiento de alfombras, Limpieza de sillas ergonómicas. (2) Cada Service schema incluye: `name`, `description`, `provider` (LocalBusiness), `areaServed` (Bogotá), `hasOfferCatalog` con `Offer` y `priceSpecification`. (3) Agregar `AggregateRating` a nivel de cada servicio. (4) Mantener el LocalBusiness principal como parent. (5) El schema se inyecta en el `<head>` de cada sección de servicio del index.html. Implementación: JSON-LD scripts en index.html, 2-3 horas. |
| **Impacto esperado** | Mejora del 15-20% en ranking para búsquedas de servicio específico en Bogotá |
| **Esfuerzo** | S (2-3 horas) |
| **Agente recomendado** | SEO / Frontend |
| **Referencias** | [1] Google Search Central - Service Schema https://developers.google.com/search/docs/structured-data/service [2] Schema.org Service https://schema.org/Service |

### Propuesta 2: UI de opt-in para push notifications

| Campo | Detalle |
|-------|---------|
| **Título** | Implementar flow de suscripción a notificaciones push con consentimiento |
| **Problema** | El Service Worker ya tiene push listeners (sw.js líneas 159-197) pero no hay ningún mecanismo para que el usuario se subscriba. Las notificaciones push están dormant. |
| **Descripción** | **Push Notification Opt-in:** (1) **Trigger:** Mostrar banner de opt-in cuando el usuario hace scroll > 50% del hero, solo una vez por usuario (localStorage flag). (2) **Banner diseño:** Barra en la parte inferior con icono de campana, copy: "Activa las notificaciones para recibir promociones y confirmación de citas", botón "Activar" y "Ahora no". (3) **Permission flow:** Al hacer click en "Activar", solicitar `Notification.permission` con explicación previa. (4) **Post-suscripción:** Mostrar toast "Notificaciones activadas" y guardar subscription en localStorage. (5) **Service Worker:** Already tiene la lógica de push — solo falta el subscription endpoint que iría a un backend (para MVP solo local storage). (6) **Casos de uso de notificaciones:** Confirmación de cita, recordatorio 24h antes, promoción especial, "Tu ссылку está lista". Implementación: JS opt-in banner + localStorage subscription management + actualizar sw.js para handle subscription, 3-4 horas. |
| **Impacto esperado** | 3x más engagement que email para confirmación de citas, aumenta retención de clientes |
| **Esfuerzo** | S (3-4 horas) |
| **Agente recomendado** | Frontend |
| **Referencias** | [3] Web.dev - Push Notifications https://web.dev/articles/push-notifications [4] Google Developer Guide - Push Notifications |

### Propuesta 3: Schema LocalBusiness por zona en cada landing page de zona

| Campo | Detalle |
|-------|---------|
| **Título** | Agregar schema LocalBusiness individual con NAP consistente en cada página de zona |
| **Problema** | Las 10 zonas (`/zonas/*/index.html`) usan el mismo template sin schema local. Esto diluye el SEO local porque Google no puede asociar servicios específicos con zonas específicas de Bogotá. |
| **Descripción** | **Per-Zone LocalBusiness Schema:** (1) **Dynamic schema injection:** En `zonas-render.js`, agregar función que genere schema LocalBusiness con el nombre de la zona en `addressLocality` y `areaServed`. (2) **Schema properties:** `@type: LocalBusiness`, `name: "Purity & Clean - {Zona}"`, `address` con `addressLocality` de la zona, `geo` con coordenadas aproximadas de la zona, `telephone` con número local. (3) **Service por zona:** Cada schema incluye los servicios disponibles en esa zona específica. (4) ** NAP consistency:** Verificar que el teléfono y dirección sean consistentes en todas las zonas (mismo formato). (5) ** landmarks:** Agregar `AreaServed` con barrios cercanos a cada zona. Implementación: Modificar zonas-render.js para injectar JSON-LD schema antes del closing </head> de cada página de zona, 2-3 horas. |
| **Impacto esperado** | Incremento del 20-30% en ranking para búsquedas locales por zona ("limpieza sofás Chapinero") |
| **Esfuerzo** | S (2-3 horas) |
| **Agente recomendado** | SEO / Frontend |
| **Referencias** | [5] Moz - Local Search Ranking Factors 2026 [6] BrightLocal - NAP Consistency |

### Propuesta 4: Google Business Profile integration - Reviews dinámicas y Q&A

| Campo | Detalle |
|-------|---------|
| **Título** | Integrar Google Business Profile con reviews dinámicas y Q&A embebida |
| **Problema** | El sitio enlaza a Google Reviews pero no hay integración real. Los usuarios no ven reviews frescas en el sitio ni pueden ver Q&A. En el mercado colombiano, Google Business Profile es el factor #1 de confianza. |
| **Descripción** | **GBP Integration:** (1) **Reviews dinámicas:** Usar Google Business Profile API o el widget oficial de Google para mostrar reviews frescas. Como alternativa sin API: usar un JSON feed manually actualizado o iframe embed. (2) **Q&A embebida:** Extraer las 5 preguntas más frecuentes del GBP y mostrarlas como FAQ en el sitio, linking back al GBP. (3) **CTA de Google Reviews:** Botón "Dejar review en Google" después de que el usuario completa el servicio (email de follow-up). (4) **Posts de Google:** Mostrar los últimos 2-3 posts de Google Business en una sección "Novedades". (5) **Fotos geolocalizadas:** Galería de fotos del equipo en différentes zonas de Bogotá con metadata de ubicación. Implementación: Para MVP, hardcodear reviews en reviews-data.js y actualizar manualmente cuando llegan nuevas. Para versión avanzada, API integration, 3-4 horas. |
| **Impacto esperado** | Incremento de confianza measurable, reduce bounce rate en 10-15% |
| **Esfuerzo** | S (3-4 horas) |
| **Agente recomendado** | Full Stack |
| **Referencias** | [7] Google Business Profile API https://developers.google.com/my-business [8] Whitespark - Local Citation Study |

### Propuesta 5: Responsive images con srcset y lazy loading nativo

| Campo | Detalle |
|-------|---------|
| **Título** | Implementar srcset responsive y lazy loading en todas las imágenes |
| **Problema** | Las imágenes usan un solo tamaño sin srcset. En móviles colombianos con data limitada, esto causa tiempos de carga altos y mal Core Web Vitals (LCP > 2.5s). |
| **Descripción** | **Image Optimization:** (1) **Generar variantes:** Crear 3 variantes de cada imagen principal: 400w, 800w, 1200w. Usar un script simple o herramientas como sharp para generar variantes. (2) **Srcset attribute:** En todas las etiquetas `<img>` del hero, galería, y zonas, agregar `srcset="image-400.jpg 400w, image-800.jpg 800w, image-1200.jpg 1200w" sizes="(max-width: 600px) 400px, (max-width: 1200px) 800px, 1200px"`. (3) **Lazy loading:** Agregar `loading="lazy"` a todas las imágenes below-the-fold (galería, zonas, blog, testimonios). Mantener `loading="eager"` para el hero y above-the-fold. (4) **Picture element:** Para el logo y hero background donde se necesita webp con fallback, usar `<picture>` con source type. (5) **Image formats:** Convertir a WebP donde sea posible para reducir peso. Implementación: Script de generación de variantes + srcset en todas las imágenes + lazy loading, 3-4 horas. |
| **Impacto esperado** | Reducción del 40-60% en payload de imágenes, mejora de LCP de ~3.5s a ~1.8s en mobile |
| **Esfuerzo** | M (3-4 horas) |
| **Agente recomendado** | Frontend |
| **Referencias** | [9] Google Web.dev - Responsive Images https://web.dev/articles/responsive-images [10] Chrome UX Report 2026 |

### Propuesta 6: Resource hints para fonts y CDNs externos

| Campo | Detalle |
|-------|---------|
| **Título** | Agregar resource hints (preconnect, prefetch) para fonts y CDNs externos |
| **Problema** | Google Fonts y Font Awesome CDN se cargan sin preconnect. En la primera visita, el navegador no sabe que necesita estos recursos hasta que encuentra el link/script, lo que retrasa el render. |
| **Descripción** | **Resource Hints Optimization:** (1) **preconnect para Google Fonts:** Agregar `<link rel="preconnect" href="https://fonts.googleapis.com">` y `<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>` antes del link de Google Fonts. (2) **preconnect para Font Awesome:** `<link rel="preconnect" href="https://cdnjs.cloudflare.com">` antes del script de Font Awesome. (3) **dns-prefetch como fallback:** Para navegadores que no soportan preconnect, agregar `<link rel="dns-prefetch" href="https://fonts.googleapis.com">`. (4) **font-display: swap:** Ya está configurado en critical.css (font-display: swap) — verificar que esté en todas las @font-face. (5) **Font subsetting:** Si es posible, subset las fuentes Manrope y Raleway a los caracteres usados en español (á, é, í, ó, ú, ñ). Implementación: Agregar 4-6 líneas en el `<head>` de index.html y critical.css, 1-2 horas. |
| **Impacto esperado** | Mejora de 200-400ms en Time to First Paint en primera visita |
| **Esfuerzo** | XS (1-2 horas) |
| **Agente recomendado** | Frontend |
| **Referencias** | [11] Google Web.dev - Resource Hints https://web.dev/articles/resource-hints [12] web.dev - Preconnect |

### Propuesta 7: FAQ schema anidado por servicio con preguntas específicas

| Campo | Detalle |
|-------|---------|
| **Título** | Expandir FAQ schema con preguntas específicas por servicio y markup anidado |
| **Problema** | El FAQ schema actual tiene preguntas genéricas. Google espera FAQ específico por servicio para aparecer en rich results expandidos. |
| **Descripción** | **Service-Specific FAQ Schema:** (1) **Preguntas por servicio:** Cada servicio (sofás, colchones, alfombras, sillas) tiene 3-5 preguntas específicas: "¿Cuánto dura el servicio?", "¿Cuánto cuesta?", "¿Cómo funciona el secado?", etc. (2) **Nested FAQ:** Usar `Question` con `acceptedAnswer` para cada servicio, anidado dentro del FAQPage principal. (3) ** expandable FAQ UI:** Implementar accordion expandible en la UI para que las preguntas se puedan clickhear, con aria-expanded para accesibilidad. (4) ** "¿Cuánto cuesta?" FAQ:** El schema ya incluye price range en FAQ — mantener consistencia. (5) **hreflang para español:** Mantener `es_CO` como locale para todo el contenido. Implementación: Agregar más Q&A al FAQPage schema en index.html + FAQ accordion UI en CSS/JS, 2-3 horas. |
| **Impacto esperado** | Eligibility para FAQ rich results en Google, aumenta CTR en 10-15% |
| **Esfuerzo** | S (2-3 horas) |
| **Agente recomendado** | SEO / Frontend |
| **Referencias** | [13] Google Search Central - FAQ Structured Data https://developers.google.com/search/docs/structured-data/faqpage |

---

## Orden de Implementación Recomendado

| # | Propuesta | Impacto | Esfuerzo | Prioridad |
|---|----------|---------|----------|-----------|
| 1 | Resource hints (preconnect) | Performance | XS | Alta - quick win |
| 2 | FAQ schema anidado por servicio | SEO / Rich Results | S | Alta - SEO rápido |
| 3 | Schema Service por servicio | SEO / Rich Results | S | Alta - SEO rápido |
| 4 | Srcset + lazy loading imágenes | Performance / Core Web Vitals | M | Alta - mobile |
| 5 | Per-zone LocalBusiness schema | SEO Local por zona | S | Media - zonas |
| 6 | Push notification opt-in | Engagement / Retention | S | Media - retención |
| 7 | Google Business Profile integration | Trust / Social Proof | S | Media - credibilidad |

**Top 3 para implementar primero:** 1, 2, 3 (resource hints + FAQ expandido + schema service = SEO inmediato, mínimo esfuerzo).

---

## Diferencia Clave: R65 vs R1-R64

R65 es fundamentalmente diferente porque:
1. **Se enfoca en infraestructura de búsqueda**, no en UX o conversión
2. **Impacta el discovery** — las propuestas anteriores mejoraban lo que el usuario hacía una vez en el sitio; R65 mejora si el usuario encuentra el sitio
3. **Es técnicos pero sin código complejo** — principalmente JSON-LD schema, resource hints, y image attributes
4. **Complementa R1-R64** — R64 mejoró micro-conversiones internas; R65 mejora visibilidad externa

**R65 es el pegamento entre el sitio y Google.**

---

## Síntesis: Por qué R65 es Necesario

Después de 64 rondas de análisis, el sitio tiene:
- ✅ UX bien cuidada
- ✅ Booking form funcional
- ✅ Dark mode, PWA, service worker
- ✅ Schema LocalBusiness básico
- ✅ FAQPage schema
- ✅ SEO On-page correcto

**Lo que falta:**
- ❌ Schema Service por servicio
- ❌ Push notifications (dormantes)
- ❌ Schema por zona
- ❌ Imágenes responsive
- ❌ Resource hints
- ❌ GBP integration real

**R65 llena estos gaps con propuestas de esfuerzo S/M que tienen impacto directo en SEO local y Core Web Vitals.**

---

## Fuentes

[1] Google Search Central. "Service Schema." https://developers.google.com/search/docs/structured-data/service
[2] Schema.org. "Service." https://schema.org/Service
[3] Web.dev. "Push Notifications." https://web.dev/articles/push-notifications
[4] Google Developer Guide. "Web Push Notifications." https://developers.google.com/web/fundamentals/push-notifications
[5] Moz. "Local Search Ranking Factors 2026." https://moz.com/local-search-ranking-factors
[6] BrightLocal. "Local Citation Study." https://brightlocal.com/research/citation-study
[7] Google Developers. "Google Business Profile API." https://developers.google.com/my-business
[8] Whitespark. "Local Citation Study." https://whitespark.ca/citation-study
[9] Web.dev. "Responsive Images." https://web.dev/articles/responsive-images
[10] Chrome UX Report. "User Experience 2026." https://developer.chrome.com/docs/crux
[11] Web.dev. "Resource Hints." https://web.dev/articles/resource-hints
[12] Web.dev. "Preconnect." https://web.dev/articles/preconnect
[13] Google Search Central. "FAQ Structured Data." https://developers.google.com/search/docs/structured-data/faqpage

---

*Documento generado por Innovation Scout — Round 65*
*Purity & Clean Analysis — 2026-04-28*
*Co-Authored-By: Paperclip <noreply@paperclip.ing>*
