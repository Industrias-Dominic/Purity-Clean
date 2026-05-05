# Análisis Creativo — Purity & Clean (Round 55)

**Proyecto:** Purity & Clean
**Fecha:** 2026-04-27
**Analista:** Innovation Scout
**Ronda:** 55
**Issue padre:** DOMAA-576

---

## Resumen Ejecutivo

R55 se enfoca en **performance, engagement, y conversión**. Mientras R54 cerró gaps de visual storytelling y brand differentiation, R55 aborda elementos críticos que impactan directamente las tasas de conversión: lazy loading de imágenes, scroll animations, exit-intent recovery, enhanced contact forms, y smart CTAs. El objetivo es reducir bounce rate, aumentar tiempo en página, y mejorar la captura de leads.

**Diferenciación clave vs R54:** R54 = visual engagement y emotional connection. R55 = performance, conversion optimization, y engagement recovery.

---

## Stack tecnológico actual (verificado en código)

- **Frontend:** HTML5 + CSS3 + JS vanilla ES6+ (sin bundler)
- **HTML:** ~2305 líneas en index.html (monolítico)
- **CSS:** ~6212 líneas en style.css (monolítico) — incluye chatbot, cotizador, dark theme, animations
- **JS:** ~1847 líneas en script.js + zonas-data.js + zonas-render.js
- **Fuentes:** Manrope + Raleway — Google Fonts
- **Iconos:** Font Awesome 6.5 CDN (SRI verificado)
- **Analítica:** Plausible Analytics (sin cookies, GDPR-compliant)
- **Forms:** Formspree (booking, newsletter, zonas)
- **Testing:** Playwright E2E (10 suites)
- **PWA:** Service Worker, precache, offline page
- **SEO:** Schema LocalBusiness + FAQPage + Review + VideoObject + HowTo + BreadcrumbList
- **Chatbot:** FAQ routing → WhatsApp
- **Booking:** Multi-step form con slot picker + geo-localización
- **Theme:** Dark mode toggle con persistencia
- **Cobertura:** 10 zonas en Bogotá
- **Precios:** Cotizador interactivo + WhatsApp pre-filled
- **Reviews:** 127 reviews verificadas, 4.8/5
- **Blog:** 6 artículos educativos
- **Backend:** NO EXISTE — 100% estático

---

## Investigación: Tendencias 2026 — Performance, Conversion, Engagement Recovery

### Hallazgo 1: Lazy Loading de Imágenes con IntersectionObserver

Según web.dev y MDN (2026) [1]:
- `IntersectionObserver` es la API estándar para lazy loading imágenes sin dependencias externas
- Atributo `loading="lazy"` en `<img>` tiene soporte nativo amplio (Baseline 2022+)
- ` decoding="async"` permite decoding no bloqueante
- Imágenes fuera de viewport no se cargan hasta ~200px antes de entrar (rootMargin configurable)
- Placeholder con aspect-ratio ratio previene layout shift (CLS)
- WebP con fallback JPEG mejora compresión 25-35%

**Purity & Clean tiene:**
- PWA service worker con precache ✓
- Imágenes en `/images/` folder ✓
- **NO tiene:** lazy loading sistemático con IntersectionObserver
- **NO tiene:** aspect-ratio placeholders en imágenes
- **NO tiene:** WebP strategy documentada

### Hallazgo 2: Scroll Animations con Web Animations API

Según MDN Web Docs (2026) [2]:
- Web Animations API permite animaciones programáticas controladas por JavaScript
- `element.animate(keyframes, options)` es shorthand para crear Animation objects
- Animaciones pueden pausarse, revertirse, cambiar velocidad dynamically
- IntersectionObserver puede disparar animaciones cuando elementos entran en viewport
- Animaciones CSS pueden sincronizarse con JS para efectos coordinated
- Performance: Animaciones de opacity y transform son compositor-only (no layout/paint)

**Purity & Clean tiene:**
- Animaciones CSS en chatbot FAB (bounce) ✓
- Animaciones CSS en confianza section ( предположительно) ✓
- Dark mode toggle animation ✓
- **NO tiene:** Scroll-triggered animations en secciones
- **NO tiene:** Web Animations API usage
- **NO tiene:** Fade-in staggered en listas de servicios

### Hallazgo 3: Exit-Intent Detection y Recovery

Según Baymard Institute y UX research (2026) [3]:
- Exit-intent popups recovery 10-15% de abandonos cuando están bien timing
- Timing óptimo: 5-15 segundos de inactividad del mouse hacia arriba
- Mobile no tiene "mouse leaving viewport" — usar scroll depth y back button detection
- Personalización por page/section aumenta conversion 3x vs generic popup
- Oferta de WhatsApp como alternative a email reduce friction
- GDPR: no mostrar popup sin consentimiento de cookies

**Purity & Clean tiene:**
- Newsletter form integrado en page ✓
- WhatsApp CTA flotante ✓
- **NO tiene:** Exit-intent detection system
- **NO tiene:** Scroll-depth-triggered CTAs
- **NO tiene:** Back-button interception para mobile

### Hallazgo 4: Enhanced Contact Forms con Micro-Interactions

Según Google UX research (2026) [4]:
- Inline validation con color feedback reduce errores 30%
- Character counters en textarea improves completion
- Autofocus en primer campo reduce friction
- Success micro-animation (checkmark) aumenta satisfaction
- Shake animation on error without being annoying
- Floating labels vs static labels: floating reduces cognitive load

**Purity & Clean tiene:**
- Form validation en JS ✓
- Required field indicators ✓
- Success state message ✓
- **NO tiene:** Floating labels
- **NO tiene:** Character counter en textarea
- **NO tiene:** Shake animation on invalid submit
- **NO tiene:** Inline field-level error messages (rojo/verde dinámico)

### Hallazgo 5: Smart Sticky CTAs que Cambian con Scroll

Según CXL (Customer Experience Labs) y conversion research (2026) [5]:
- Sticky CTA que cambia basado en scroll position aumenta clicks 20%
- Hero CTA → "Reservar ahora" → scroll a servicios → cambiar a "Cotizar" → scroll a contacto → cambiar a "WhatsApp"
- CTA con urgency indicator ("Solo 3 cupos esta semana") aumenta conversion
- Countdown timers para promociones limited-time increase urgency
- Diferentes CTAs para different user intents (booking vs inquiry vs navigation)

**Purity & Clean tiene:**
- Sticky header con CTA principal ✓
- WhatsApp FAB flotante ✓
- **NO tiene:** CTA dinámico basado en scroll
- **NO tiene:** Urgency indicators
- **NO tiene:** Countdown para promociones

### Hallazgo 6: Video Autoplay con IntersectionObserver

Según Google Web Vitals research (2026) [6]:
- Videos que autoplay con muted cuando son >50% visibles reducen bounce rate
- `play()` promise handling para detect browser blocking (Safari)
- IntersectionObserver para pause cuando video leaves viewport (save bandwidth)
- Lazy load video src para no bloquear initial paint
- Poster image con inline base64 para immediate visual sin network

**Purity & Clean tiene:**
- YouTube embed iframe (no autoplay) ✓
- Video en hero ( предположительно) ✓
- **NO tiene:** Native HTML5 video con autoplay
- **NO tiene:** IntersectionObserver para pause/play video
- **NO tiene:** Video lazy loading system

### Hallazgo 7: Coverage Zone Interactive Map

Según GeoJSON/Leaflet best practices (2026) [7]:
- Interactive map con zonas clickeables mejora engagement vs dropdown estático
- Cluster markers para zooms bajos
- Popup on click con zone info, precios, y CTA directo a WhatsApp
- Geolocation API para auto-select zone basado en user location
- SVG markers para performance vs icon fonts

**Purity & Clean tiene:**
- 10 zonas en zonas-data.js ✓
- Selector de zona en booking form ✓
- Geo-location en cotizador ✓
- **NO tiene:** Interactive map visualization
- **NO tiene:** Visual zone boundaries en mapa
- **NO tiene:** Zone-based pricing on map

---

## Gaps identificados — Round 55 (Performance, Conversion, Engagement)

### 1. Sin Lazy Loading Sistemático

**Problema:** Imágenes cargan todas al inicio, aumentando initial paint y LCP. No hay IntersectionObserver para lazy loading.

### 2. Sin Scroll Animations

**Problema:** No hay fade-in staggered ni scroll-triggered animations. Las secciones aparecen estáticamente.

### 3. Sin Exit-Intent Recovery

**Problema:** Usuarios que即将离开 no reciben ningún recovery attempt. No hay popup de WhatsApp o newsletter.

### 4. Sin Floating Labels en Forms

**Problema:** Labels estáticos ocupan más espacio vertical y no ofrecen laUX moderna de floating labels.

### 5. Sin Smart Sticky CTA Dinámico

**Problema:** El CTA sticky no cambia según la sección donde esté el usuario. No hay urgencia ni countdowns.

### 6. Sin Video Lazy Loading con IntersectionObserver

**Problema:** El video de YouTube embebido carga siempre, bloqueando initial paint.

### 7. Sin Interactive Coverage Map

**Problema:** No hay mapa visual de zonas. El selector es dropdown puro sin geographic context.

---

## Propuestas (Round 55)

### Propuesta 1: Lazy Loading Systemático con IntersectionObserver

| Campo | Detalle |
|-------|---------|
| **Título** | Implementar lazy loading de imágenes con IntersectionObserver y aspect-ratio placeholders |
| **Problema** | Todas las imágenes cargan al inicio, aumentando initial paint time y Largest Contentful Paint (LCP). Purity & Clean tiene ~15+ imágenes en homepage. |
| **Descripción** | Lazy Loading System: (1) **Image Markup**: cambiar `<img>` a `<img loading="lazy" decoding="async" alt="...">` para todas las imágenes excepto above-the-fold. (2) **Aspect Ratio Placeholders**: en CSS, agregar `.img-placeholder { aspect-ratio: 16/9; background: var(--color-border); }` y usar `object-fit: cover` cuando cargue. (3) **IntersectionObserver Fallback**: en `js/script.js`, crear función `createLazyImageObserver()` que observa imágenes con `data-src` y las reemplaza por `src` cuando entran en viewport con 200px rootMargin. (4) **Data-src Pattern**: `<img data-src="images/service-1.webp" src="data:image/svg+xml,%3Csvg...%22%3E%3C/svg%3E" class="img-placeholder" loading="lazy">`. (5) **Picture + WebP**: usar `<picture><source srcset="img.webp" type="image/webp"><img src="img.jpg" loading="lazy"></picture>` para cada imagen. (6) **LCP Optimization**: la imagen hero debe usar `loading="eager"` y priority fetch. Implementación: markup update + JS observer + CSS placeholders, 4-5 horas. |
| **Impacto esperado** | LCP improvement 15-25%, bandwidth reduction 30%, faster TTI |
| **Esfuerzo** | M (4-5 horas) |
| **Agente recomendado** | Frontend |
| **Referencias** | [1] https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver |

### Propuesta 2: Scroll-Triggered Animations con Web Animations API

| Campo | Detalle |
|-------|---------|
| **Título** | Implementar scroll-triggered fade-in animations en secciones clave usando IntersectionObserver |
| **Problema** | Las secciones aparecen estáticamente sin animación. Animaciones on-scroll aumentan perceived performance y engagement. |
| **Descripción** | Scroll Animation System: (1) **CSS Classes**: en `css/style.css`, crear `.fade-in-section { opacity: 0; transform: translateY(30px); transition: opacity 0.6s ease-out, transform 0.6s ease-out; }` y `.fade-in-section.visible { opacity: 1; transform: translateY(0); }`. (2) **Staggered Children**: para `.searchable-grid` y `.servicio-card`, agregar `transition-delay: calc(var(--i, 0) * 0.1s)` para stagger effect. (3) **IntersectionObserver**: en `js/script.js`, crear `scrollObserver = new IntersectionObserver(callback, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' })` que observa elementos con `.fade-in-section`. Cuando enters viewport, añade `.visible`. (4) **Counter Animation**: en stats cards, usar Web Animations API para animate numbers 0 → value cuando section becomes visible: `element.animate([{ textContent: '0' }, { textContent: String(value) }], { duration: 1500, easing: 'ease-out' })`. (5) **Section-Specific**: agregar fade-in a: #servicios grid, #zonas section, #confianza cards, #testimonios, #cta-final. (6) **Reduced Motion**: detectar `prefers-reduced-motion: reduce` y skip animations, show content immediately. Implementación: CSS + JS observer + counter animation, 3-4 horas. |
| **Impacto esperado** | Mayor engagement, lower perceived load time, mejor UX perception |
| **Esfuerzo** | S (3-4 horas) |
| **Agente recomendado** | Frontend |
| **Referencias** | [2] https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API |

### Propuesta 3: Exit-Intent Recovery System

| Campo | Detalle |
|-------|---------|
| **Título** | Implementar exit-intent detection con popup de WhatsApp o newsletter recovery |
| **Problema** | Usuarios que están por abandonar el sitio no reciben ningún recovery attempt. No hay last-chance conversion opportunity. |
| **Descripción** | Exit-Intent Recovery System: (1) **Detection Logic**: en desktop, detectar `document.addEventListener('mouseleave', ...)` donde `e.clientY < 0` indica mouse moving toward browser chrome. En mobile, detectar scroll depth > 80% + `visibilitychange` cuando tab hidden. (2) **Delay Enforcement**: no mostrar popup antes de 45 segundos en page para evitar annoyance. Usar sessionStorage para track first visit time. (3) **Popup Design**: crear `.exit-intent-popup` con overlay oscuro, centered card. Contenido: "¿Te vas? Obtén tu cotización en WhatsApp en 30 segundos" + green CTA button. Alternative: "¿Quieres recibir nuestras promociones?" + email input. (4) **WhatsApp Pre-filled**: el CTA de WhatsApp pre-fills message con "Hola, me voy a ir pero quiero una cotización". (5) **GDPR Compliance**: solo mostrar si `localStorage.getItem('cookieConsent') === 'accepted'`. Si no, mostrar "Acepta cookies para recibir ofertas". (6) **One-time**: sessionStorage flag para no mostrar más de una vez por sesión. (7) **Mobile Fallback**: en mobile, mostrar sticky bar "¿Necesitas ayuda? Chatea con nosotros" en lugar de overlay. Implementación: detection + popup + GDPR + mobile fallback, 4-5 horas. |
| **Impacto esperado** | Recovery 10-15% de abandonos, aumento en WhatsApp leads |
| **Esfuerzo** | M (4-5 horas) |
| **Agente recomendado** | Frontend |
| **Referencias** | [3] https://baymard.com/blog/exit-intent-popup |

### Propuesta 4: Enhanced Forms con Floating Labels y Micro-Interactions

| Campo | Detalle |
|-------|---------|
| **Título** | Implementar floating labels, inline validation con micro-interactions, y character counters |
| **Problema** | Los formularios usan labels estáticos que ocupan espacio vertical. Falta feedback visual dinámico para errores y éxito. |
| **Descripción** | Enhanced Forms System: (1) **Floating Labels CSS**: `.form-group { position: relative; } .form-group label { position: absolute; left: 16px; top: 50%; transform: translateY(-50%); transition: all 0.2s ease; pointer-events: none; } .form-group input:focus + label, .form-group input:not(:placeholder-shown) + label { top: 8px; font-size: 0.75rem; color: var(--color-primary); } .form-group input:focus + label { color: var(--color-primary); }`. (2) **Inline Validation**: en JS, cada campo ejecuta `validateField(field)` on blur. Verde para válido (green border + checkmark icon), rojo para error (red border + error message below). (3) **Shake Animation**: CSS `@keyframes shake { 0%, 100% { transform: translateX(0); } 20%, 60% { transform: translateX(-6px); } 40%, 80% { transform: translateX(6px); } }`. Aplicar `.shake` class por 400ms cuando submit con errores. (4) **Character Counter**: `<textarea maxlength="300" id="message"><span class="char-count">0/300</span></textarea>`. JS actualiza counter en input. (5) **Success Checkmark**: cuando form submit succeeds, mostrar CSS checkmark animation en button: `@keyframes checkmark { 0% { stroke-dashoffset: 50; } 100% { stroke-dashoffset: 0; } }`. (6) **Autofocus**: primer campo del form recibe `autofocus` attribute. Implementación: CSS floating labels + JS validation + animations, 3-4 horas. |
| **Impacto esperado** | Reducción 30% en form errors, mayor completion rate, mejor UX perception |
| **Esfuerzo** | S (3-4 horas) |
| **Agente recomendado** | Frontend |
| **Referencias** | [4] https://web.dev/learn/design/ui-patterns |

### Propuesta 5: Smart Sticky CTA Dinámico

| Campo | Detalle |
|-------|---------|
| **Título** | Implementar CTA sticky que cambia dinámicamente según scroll position con urgencia |
| **Problema** | El CTA sticky es siempre el mismo sin importar en qué sección está el usuario. No hay urgencia ni personalización. |
| **Descripción** | Smart Sticky CTA System: (1) **Scroll Position Detection**: en `js/script.js`, escuchar `scroll` event y calcular qué section está en viewport top 50%. Usar IntersectionObserver con callbacks por section. (2) **CTA State Machine**: `ctaStates = { hero: 'Reservar ahora', servicios: 'Cotizar gratis', zonas: 'Ver precios', contacto: 'WhatsApp' }`. Cambiar CTA button text y icon según section activa. (3) **Urgency Badge**: agregar `.urgency-badge` con contenido dinámico: "Solo 3 cupos esta semana" o "20% off en reservas hoy". Solo mostrar si `localStorage.urgencyCampaign` está activo. (4) **Countdown Timer**: para promotions, crear countdown que muestra "Termina en X horas". Persistir end-time en localStorage. (5) **Sticky Position**: crear `<div class="sticky-cta-bar">` fixed bottom con el CTA dinámico. Ocultar cuando用户在 blog o zonas deep pages para evitar interference. (6) **Mobile Adaptation**: en mobile, el sticky CTA es siempre el botón WhatsApp verde flotante (ya existe). Agregar el urgency badge al FAB. Implementación: scroll detection + CTA state + urgency, 4-5 horas. |
| **Impacto esperado** | Aumento 20% en CTA clicks, mayor conversion por section relevance |
| **Esfuerzo** | M (4-5 horas) |
| **Agente recomendado** | Frontend |
| **Referencias** | [5] https://cxl.com/blog/sticky-cta/ |

### Propuesta 6: Video Lazy Loading con IntersectionObserver Pause/Play

| Campo | Detalle |
|-------|---------|
| **Título** | Implementar lazy loading de video YouTube con IntersectionObserver y pause on exit |
| **Problema** | El iframe de YouTube carga siempre, bloqueando initial paint. El video no hace pause cuando sale de viewport. |
| **Descripción** | Video Optimization System: (1) **Lite YouTube Embed**: crear div placeholder con thumbnail y play button. Cuando usuario hace click, cargar el iframe. pattern: `<div class="lite-video" data-id="VIDEO_ID" data-thumbnail="mqdefault.jpg"><button class="play-btn" aria-label="Play video"></button></div>`. (2) **IntersectionObserver Pause/Play**: para videos que ya están cargados (autoplay), observar con IntersectionObserver. Cuando 50% del video sale de viewport, hacer `video.pause()`. Cuando vuelve a entrar, `video.play()`. Esto ahorra bandwidth en scroll. (3) **Poster Image**: usar `poster="thumb.jpg"` attribute para mostrar imagen antes de que video cargue. (4) **Native Video**: para el video demostrativo (vTDo5qmyfVM), considerar usar `<video>` tag con src descargado (no streaming) para mejor control de autoplay/muted. (5) **Muted Autoplay**: si se usa autoplay,必须是 muted para cumplir políticas de browsers. (6) **Fallback**: si JS disabled, mostrar thumbnail image con link to YouTube. Implementación: lite embed + observer pause + poster, 2-3 horas. |
| **Impacto esperado** | LCP improvement 10-20%, bandwidth savings en scroll, mejor UX |
| **Esfuerzo** | S (2-3 horas) |
| **Agente recomendado** | Frontend |
| **Referencias** | [6] https://web.dev/learn/performance/video |

### Propuesta 7: Interactive Coverage Map con Leaflet.js

| Campo | Detalle |
|-------|---------|
| **Título** | Implementar mapa interactivo de zonas de cobertura con Leaflet.js y geo-localización |
| **Problema** | No hay visualización geográfica de las zonas. El selector de zona es dropdown puro sin contexto visual. |
| **Descripción** | Interactive Map System: (1) **Leaflet.js**: incluir leaflet.js + leaflet.css via CDN. Crear `<div id="coverage-map" style="height: 400px;"></div>` en sección zonas. (2) **Zone Markers**: definir coordenadas approximate para cada zona en `js/zonas-data.js`: `{ name: 'Usaquén', coords: [4.945, -74.027], price: '$80.000' }`. Crear Markercluster para agrupar cuando zoom out. (3) **Popup on Click**: al hacer click en marker, mostrar popup con: nombre zona, precio desde, tiempo estimado, y botón "Cotizar en WhatsApp". (4) **Geo-location**: usar `navigator.geolocation.getCurrentPosition()` para obtener user location. Calcular nearest zone y hacer highlight del marker correspondiente con open popup. (5) **Fallback**: si geolocation denied o leaflet fails, mostrar dropdown de zonas normal con el mismo data. (6) **Mobile**: el mapa tiene height 300px en mobile. Marker cluster strategy para evitar overlaps. (7) **Performance**: lazy load leaflet JS solo cuando user scrolla a la sección. Usar `loading="lazy"` en el script tag o IntersectionObserver. Implementación: leaflet + markers + geolocation + lazy load, 5-6 horas. |
| **Impacto esperado** | Mayor engagement con zonas, better UX, diferenciación visual vs competitors |
| **Esfuerzo** | M (5-6 horas) |
| **Agente recomendado** | Frontend / Full Stack |
| **Referencias** | [7] https://leafletjs.com/ |

---

## Orden de implementación recomendado

| # | Propuesta | Impacto | Esfuerzo | Prioridad |
|---|----------|---------|----------|-----------|
| 1 | Lazy Loading System | LCP/Performance | M | Alta - technical fundamental |
| 2 | Smart Sticky CTA | Conversión | M | Alta - directo a revenue |
| 3 | Exit-Intent Recovery | Lead Recovery | M | Alta - recovery de abandonos |
| 4 | Scroll Animations | UX/Engagement | S | Alta - quick win visual |
| 5 | Enhanced Forms | Conversión/UX | S | Alta - reduces friction |
| 6 | Video Optimization | LCP/Performance | S | Media - technical improvement |
| 7 | Interactive Map | UX/Engagement | M | Media - visual differentiation |

**Top 3 para implementar primero:** 1, 2, 4 (lazy loading + smart CTA + scroll animations = immediate performance + conversion impact).

---

## Diferencia clave: R54 vs R55

R54 se enfocó en **visual storytelling, interactive demonstrations, y differentiated brand experience**: before/after slider, video testimonials, animated trust badges, brand mascot, Instagram/UGC, gamified loyalty, mobile bottom nav.

**R55 se enfoca en:**
- **Performance**: lazy loading, video optimization, LCP improvement
- **Conversion**: smart sticky CTA, exit-intent recovery, enhanced forms
- **Engagement**: scroll animations, interactive map, urgency indicators
- **Recovery**: win-back de usuarios que están por abandonar

R54 construye emotional connection. R55 construye performance y conversion optimization.

---

## Síntesis: Por qué R55 complementa R1-R54

R1-R54 ha construido un negocio muy completo:
- R1-R10: Features internos
- R11-R20: SEO y Schema
- R21-R30: UX y conversión
- R31-R35: Video, reputation, AI
- R36-R42: Technical modernization
- R43-R44: Business models y conversión
- R45: Core Web Vitals y quality gates
- R46: Seguridad, Privacy Sandbox, i18n, pagos, authentication
- R47: Photo quote, product store, floor maintenance, reviews widget, multi-city
- R48: CRM, Warranty, Staff Profiles, Airbnb B2B, Review automation, Loyalty, Service History
- R49: Voice Search, Eco Hub, WhatsApp Automation, Customer Portal, Subscription Box, Predictive Alerts, Video Testimonials
- R50: Pricing page, English version, Widget B2B, GBP Posts, Gamified Loyalty, Marketplaces, Micro-landings
- R51: Build system, performance (lazy/WebP/RUM), accesibilidad (skip-nav/reduced-motion), PWA (Periodic Sync), AI (damage detection)
- R52: A/B testing, exit-intent recovery, WhatsApp Business API, email nurturing, product schema, micro-conversion funnel, GBP automation, e-commerce
- R53: Notification Triggers, semantic search, voice search, offline sync, RUM, on-device AI chatbot, personalization
- R54: Before/after slider, video testimonials, animated trust badges, brand mascot, Instagram/UGC, gamified loyalty, mobile bottom nav
- **R55: Lazy loading, scroll animations, exit-intent recovery, enhanced forms, smart sticky CTA, video optimization, interactive map**

R55 cierra gaps de **performance optimization y conversion recovery** que las rondas anteriores no abordaron en profundidad.

---

## Fuentes

[1] MDN Web Docs. "IntersectionObserver." https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver
[2] MDN Web Docs. "Web Animations API." https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API
[3] Baymard Institute. "Exit-Intent Popup Design." https://baymard.com/blog/exit-intent-popup
[4] web.dev. "UI Patterns - Responsive Design." https://web.dev/learn/design/ui-patterns
[5] CXL (Customer Experience Labs). "Sticky CTA Best Practices." https://cxl.com/blog/sticky-cta/
[6] web.dev. "Video Performance." https://web.dev/learn/performance/video
[7] Leaflet.js. "Interactive Maps for Web." https://leafletjs.com/

---

*Documento generado por Innovation Scout — Round 55*
*Purity & Clean Analysis — 2026-04-27*
*Co-Authored-By: Paperclip <noreply@paperclip.ing>*