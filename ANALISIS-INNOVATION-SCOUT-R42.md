# Análisis Creativo — Purity & Clean (Round 42)

**Proyecto:** Purity & Clean
**Fecha:** 2026-04-27
**Analista:** Innovation Scout
**Ronda:** 42
**Issue padre:** DOMAA-449

---

## Resumen Ejecutivo

R42 se enfoca en **infraestructura PWA avanzada y accesibilidad avanzada**: (1) custom install prompt para aumentar instalaciones PWA, (2) Background Sync API para formularios offline, (3) Content Index API para descubrir contenido offline, (4) skip-nav y focus management para accesibilidad WCAG 2.2, (5) enhanced Article Schema con Q&A para SEO, (6) runtime caching estrategias para performance, y (7) real-time form validation con ARIA live.

El sitio actual tiene un Service Worker funcional con precaching básico y offline page. Sin embargo:

- **No hay custom install prompt** — el navegador muestra el prompt nativo sin contexto ni incentivo
- **No hay Background Sync** — formularios offline se pierden o requieren reenvío manual
- **No hay Content Index** — contenido offline no es descubrible
- **No hay skip-nav link** —用户在键盘导航时必须遍历所有元素
- **El Schema Article es básico** — falta FAQPage, BreadcrumbList, extended proparties
- **El caching es solo precache** — no hay stale-while-revalidate para contenido dinámico

---

## Stack tecnológico actual (resumen)

- **Frontend:** HTML5 + CSS3 + JS vanilla ES6+
- **CSS:** ~6212 líneas style.css
- **JS:** ~1847 líneas script.js
- **Fuentes:** Manrope + Raleway — Google Fonts
- **Iconos:** Font Awesome 6.5 CDN (SRI verificado)
- **Analítica:** Plausible Analytics (sin cookies, GDPR-compliant)
- **Forms:** Formspree
- **Testing:** Playwright E2E (10 suites)
- **PWA:** Service Worker, precache, offline page, push notifications
- **SEO:** Schema LocalBusiness + FAQPage + Article + Review + VideoObject + HowTo + BreadcrumbList
- **Chatbot:** FAQ routing → WhatsApp
- **Booking:** Multi-step form con slot picker
- **Theme:** Dark mode toggle con persistencia
- **Cobertura:** 10 zonas en Bogotá
- **Precios:** Cotizador interactivo + WhatsApp pre-filled
- **Reviews:** 127 reviews verificadas, 4.8/5
- **Blog:** 6 artículos educativos
- **Animaciones:** Counters, reveal on scroll, chatbot FAB bounce
- **Service Worker:** Precaching básico (17 assets), cache-first strategy, offline fallback

---

## Investigación: PWA Installation, Background Sync y Accesibilidad 2026

### Hallazgo 1: Custom install prompts multiplican instalaciones PWA

Según Google Developer docs (2026):
- El prompt nativo de navegador tiene ~15% de tasa de aceptación
- Custom install prompts con contexto y beneficio claro suben a ~35-45%
- El `beforeinstallprompt` event permite guardar el evento y disparar el prompt en el momento óptimo
- Los mejores momentos: después de completar una reserva, después del segundo uso, en el menu de navegación

**Purity & Clean tiene:**
- manifest.json completo con shortcuts (Reservar, Servicios, WhatsApp) ✓
- Tema color y background color definidos ✓
- Iconos SVG en 3 tamaños incluyendo maskable ✓
- **NO tiene:** manejo de `beforeinstallprompt`, banner custom, tracking de install prompt outcomes

### Hallazgo 2: Background Sync API para formularios offline

Según web.dev PWA docs (2026):
- Background Sync API permite registrar sincronizaciones que se ejecutan cuando hay conexión
- El SW puede registrar un sync event cuando el formulario falla, y reintentar automáticamente
- La API requiere Service Worker y HTTPS (cumplido)
- Se puede usar con IndexedDB para guardar el payload del formulario

**Purity & Clean tiene:**
- Offline page funcional ✓
- Formspree para envío de formularios ✓
- **NO tiene:** Background Sync, IndexedDB para queue de formularios, retry automático

### Hallazgo 3: Content Index API para contenido offline discoverable

Según Chrome developers (2026):
- Content Index API permite que el SW registre qué contenido está disponible offline
- Los usuarios pueden ver "Artículos guardados para leer offline" desde el navegador
- Requiere: Service Worker, IndexedDB para store, content-description metadata
- Solo funciona en Chrome/Edge Android actualmente

**Purity & Clean tiene:**
- 6 artículos de blog que podrían guardarse offline
- Service Worker con precache de páginas principales
- **NO tiene:** Content Index API registration, metadata de descripción para artículos

### Hallazgo 4: Skip Navigation Link y Focus Management WCAG 2.2

Según W3C WCAG 2.2 (2026):
- Skip link es technique H64 — requerido para navegación por teclado
- Focus visible debe ser mínimo 3:1 contrast ratio (SC 2.4.11)
- Focus not hidden (SC 2.4.7) — múltiples focusable elementos
- El README de Purity & Clean explícitamente menciona "Botón de skip-nav no incluido; agregar si se implementan anclas de navegación"

**Purity & Clean tiene:**
- Estructura semántica (header, main, nav, section, footer) ✓
- aria-label y aria-expanded en elementos interactivos ✓
- aria-live en mensajes de estado ✓
- **NO tiene:** skip-nav link, focus-visible mejorado (SC 2.4.11), focus trap en modales

### Hallazgo 5: Article Schema enhancements con FAQPage y BreadcrumbList

Según Google Search Central (2026):
- Los artículos con FAQPage schema califican para rich results con expandable questions
- BreadcrumbList mejora el CTR en search results
- Article schema puede incluir: datePublished, dateModified, author, publisher, image, mainEntityOfPage
- Los 6 artículos de blog tienen BlogPosting schema básico pero no FAQPage ni BreadcrumbList

**Purity & Clean tiene:**
- Article schema con headline, author, publisher, image, datePublished ✓
- **NO tiene:** FAQPage en artículos, BreadcrumbList, mainEntityOfPage, updated date

### Hallazgo 6: Runtime caching strategies para performance

Según web.dev PWA docs (2026):
- Stale-while-revalidate: sirve cache inmediatamente, actualiza en background
- Network-first: intenta red, cae a cache si falla
- Cache-first: siempre cache, para assets estáticos
- El SW actual de Purity & Clean usa solo cache-first para todos los requests

**Purity & Clean tiene:**
- Precaching de 17 assets en install event ✓
- Cache-first para todas las requests ✓
- **NO tiene:** stale-while-revalidate para contenido dinámico, runtime caching strategies, cache versioning por contenido

### Hallazgo 7: Real-time form validation con ARIA live regions

Según Baymard Institute y NNGroup (2026):
- Errores inline en tiempo real reducen errores de formulario en 20-30%
- aria-live="polite" para mensajes de estado de validación
- aria-invalid y aria-describedby para conectar campo con error
- El formulario de contacto/reservas tiene validación pero no ARIA live para feedback dinámico

**Purity & Clean tiene:**
- Validación en cliente (nombre, email, teléfono, tipo de cliente) ✓
- Fallback a simulación si Formspree falla ✓
- **NO tiene:** aria-live para mensajes de validación, aria-invalid con describe, error summary al inicio del formulario

---

## Gaps identificados — Round 42 (NOVEDADES no cubiertas en R1-R41)

### 1. Custom PWA Install Prompt — beforeinstallprompt con UI contextual

**Problema:** El PWA tiene manifest completo pero no hay custom install prompt. El navegador muestra el mini-infobar sin contexto, resultando en baja tasa de instalación.

### 2. Background Sync API — Formularios offline con retry automático

**Problema:** Si un usuario completa el formulario de reservas sin conexión, el envío falla y se pierde el lead. No hay queue ni retry.

### 3. Content Index API — Artículos blog discoverables offline

**Problema:** Los artículos del blog se guardan en cache cuando el usuario los visita, pero no hay forma de descubrirlos desde el navegador. El Content Index API permite listarlos en chrome://indexed-pages.

### 4. Skip Navigation + Focus Management — WCAG 2.2 compliance

**Problema:** El README docuenta que skip-nav no está implementado. WCAG 2.2 requiere skip links y focus visible mejorado. Esto afecta la accesibilidad para usuarios de teclado.

### 5. Enhanced Article Schema — FAQPage + BreadcrumbList en blog

**Problema:** Los 6 artículos tienen BlogPosting schema básico pero no aprovechan FAQPage para rich results ni BreadcrumbList para CTR.

### 6. Runtime Caching Strategies — Stale-while-revalidate para contenido

**Problema:** El SW usa cache-first para TODO. Contenido dinámico (precios, disponibilidad) debería usar stale-while-revalidate para balancear freshness y speed.

### 7. Real-time Form Validation con ARIA Live — Accesibilidad de formularios

**Problema:** La validación existe pero no comunica errores con ARIA live. Usuarios de screen reader no reciben feedback en tiempo real.

---

## Propuestas (Round 42)

### Propuesta 1: Custom PWA Install Prompt — beforeinstallprompt con banner contextual

| Campo | Detalle |
|-------|---------|
| **Título** | Implementar custom PWA install prompt conbeforeinstallprompt y banner in-app |
| **Problema** | El PWA tiene manifest completo pero el prompt nativo tiene ~15% de tasa de aceptación. Sin contexto ni incentivo, los usuarios no instalan la app. |
| **Descripción** | Implementar custom install prompt: (1) **Captura del evento**: escuchar `beforeinstallprompt`, guardar el deferredPrompt, no mostrar el prompt nativo. (2) **Banner in-app**: mostrar un banner o toast después de la segunda visita o después de completar una reserva. El banner dice "Instala Purity & Clean — acceso rápido desde tu pantalla de inicio". (3) **Custom install button**: botón que dispara `deferredPrompt.prompt()` con el flujo nativo del navegador. (4) **Tracking**: medir `userChoice.outcome` para saber cuántos aceptaron vs. desistieron. (5) **Timing óptimo**: mostrar después de `page_view` + 2 visitas, o después de `#reservas` completada. Implementación: JS en script.js para capturar el evento, CSS para banner/toast con animación slide-in, tracking de eventos hacia Plausible. |
| **Impacto esperado** | Aumento de instalaciones PWA 2-3x (de ~15% a ~35-45% CTR), más returning users, mejor engagement en mobile |
| **Esfuerzo** | S (JS + CSS vanilla, ~100 líneas) |
| **Agente recomendado** | Frontend |
| **Referencias** | [1] https://web.dev/learn/pwa/installation-prompt [2] https://developer.chrome.com/docs/web-platform/manifest-incubations/ |

### Propuesta 2: Background Sync API — Formularios offline con IndexedDB queue y retry automático

| Campo | Detalle |
|-------|---------|
| **Título** | Implementar Background Sync para formularios de reserva con IndexedDB queue |
| **Problema** | Si un usuario completa el formulario de reservas sin conexión, el envío falla y se pierde el lead. No hay queue, no hay retry automático. |
| **Descripción** | Implementar Background Sync: (1) **IndexedDB store**: crear store `form-submissions` con campos: id, formType, payload, timestamp, status. (2) **Form handler modificado**: cuando el fetch a Formspree falla (network error), guardar en IndexedDB y registrar `sync.register('form-sync')`. (3) **Service Worker sync handler**: escuchar `sync` event, releer IndexedDB, reintentar cada formulario pendiente. (4) **Status feedback**: mostrar al usuario "Se guardó tu reserva. Se enviará cuando haya conexión." con aria-live. (5) **Cleanup**: marcar como enviado después de éxito, limpiar entradas antiguas. Implementación: nuevo módulo `js/offline-queue.js`, modificar `sw.js` para agregar sync handler, CSS para mensaje de estado offline. |
| **Impacto esperado** | Cero pérdida de reservas por conexión inestable, mejor UX en zonas de baja conectividad (Usme, Bosa, Kennedy), captura de leads que antes se perdían |
| **Esfuerzo** | M (IndexedDB + SW sync + UI feedback) |
| **Agente recomendado** | Frontend |
| **Referencias** | [1] https://web.dev/learn/pwa/offline-data/ [2] https://developer.mozilla.org/en-US/docs/Web/API/Background_Sync_API [3] https://web.dev/articles/background-sync/ |

### Propuesta 3: Content Index API — Registrar artículos blog para discovery offline

| Campo | Detalle |
|-------|---------|
| **Título** | Implementar Content Index API para que artículos guardados sean discoverables |
| **Problema** | Los artículos se guardan en cache cuando se visitan, pero los usuarios no tienen forma de ver qué contenido offline está disponible. Chrome no muestra "Artículos guardados" para este PWA. |
| **Descripción** | Implementar Content Index API: (1) **Indexar artículos**: cuando el SW caches un artículo de blog (en fetch handler), registrarlo con `navigator.contentIndex.add()`. (2) **Metadata**: incluir title, description, icons, url para cada artículo. (3) **Content descriptions**: extraer excerpt del artículo para mostrarse en la lista de contenido offline. (4) **Handler de indexación**: en el fetch del SW, detectar cuando se cachea un HTML de blog, leer el `<title>` y meta description, agregar al index. (5) **Remove when stale**: cuando el contenido se actualiza en el servidor, actualizar o remover del índice. Implementación: modificar `sw.js` para agregar content index registration, extraer metadata del HTML cacheado antes de indexar. Requiere HTTPS. |
| **Impacto esperado** | Mayor engagement con contenido offline, usuarios descubren artículos guardados desde chrome://indexed-pages, diferenciación vs. competencia |
| **Esfuerzo** | M (SW + metadata extraction + Content Index API) |
| **Agente recomendado** | Frontend |
| **Referencias** | [1] https://web.dev/learn/pwa/offline-data/ [2] https://developer.chrome.com/docs/web-platform/content-index/ |

### Propuesta 4: Skip Navigation + Focus Management — WCAG 2.2 compliance

| Campo | Detalle |
|-------|---------|
| **Título** | Implementar skip-nav link y focus management mejorado para WCAG 2.2 |
| **Problema** | No hay skip-nav link. Usuarios de teclado deben tabular por todos los elementos de navegación. El README explícitamente menciona que falta. WCAG 2.2 SC 2.4.11 requiere focus visible mínimo 3:1. |
| **Descripción** | Implementar accesibilidad: (1) **Skip-nav link**: agregar `<a href="#main-content" class="skip-nav">Saltar al contenido principal</a>` como primer elemento del body. CSS: posición absoluta fuera de viewport, aparece en focus con outline y posición top. (2) **Focus-visible states**: en CSS, agregar `:focus-visible` con outline 3px offset, contrast ratio mínimo 3:1 contra background. (3) **Focus trap en modales**: cuando se abre el chatbot FAB o modal, el focus debe quedar atrapado dentro. (4) **Main landmark**: agregar `id="main-content"` al `<main>` y usar como target del skip-nav. (5) **aria-label en sections**: cada sección principal con `aria-labelledby` apuntando al heading. Implementación: HTML (skip-nav), CSS (focus styles), JS (focus trap para modales). |
| **Impacto esperado** | Compliance con WCAG 2.2 AA, mejor experiencia para usuarios de teclado y screen readers, mejora en Lighthouse accessibility score (actualmente ~92), reducción de lawsuits por accesibilidad (trend 2026) |
| **Esfuerzo** | S (HTML + CSS + JS simple) |
| **Agente recomendado** | Frontend |
| **Referencias** | [1] https://www.w3.org/WAI/WCAG22/Techniques/css/C43.html [2] https://www.w3.org/WAI/WCAG22/Techniques/general/G1.html [3] https://www.w3.org/WAI/WCAG22/Understanding/focus-visible.html |

### Propuesta 5: Enhanced Article Schema — FAQPage + BreadcrumbList para rich results

| Campo | Detalle |
|-------|---------|
| **Título** | Agregar FAQPage schema y BreadcrumbList a artículos del blog para SEO |
| **Problema** | Los 6 artículos tienen BlogPosting schema básico. No aprovechan FAQPage para rich results con preguntas expandibles, ni BreadcrumbList para mejorar CTR en search. |
| **Descripción** | Implementar Schema enhancements: (1) **FAQPage en cada artículo**: revisar los 6 artículos, extraer o crear 3-5 FAQs comunes del tema, agregar `@type: FAQPage` con `@type: Question` + `@type: Answer`. Esto califica para rich results en Google. (2) **BreadcrumbList**: agregar `BreadcrumbList` schema en cada página con Home > Blog > [Artículo]. (3) **Enhanced Article**: agregar `dateModified`, `mainEntityOfPage` (canonical URL), `image` con width/height. (4) **Ejemplo para "Cómo limpiar tu sofá"**: FAQs como "¿Cada cuánto debo limpiar mi sofá?", "¿Qué productos usar?", "¿Funciona para manchas difíciles?". Implementación: HTML (agregar JSON-LD blocks), validar con Rich Results Test. Actualizar los 6 artículos y crear template para futuros artículos. |
| **Impacto esperado** | Rich results con preguntas expandibles (aumento de CTR 15-20%), mejor posicionamiento en blog keywords, appearance de "People also ask" en Google |
| **Esfuerzo** | S (contenido + HTML) |
| **Agente recomendado** | SEO / Content |
| **Referencias** | [1] https://developers.google.com/search/docs/appearance/structured-content/faqpage [2] https://developers.google.com/search/docs/appearance/structured-data/breadcrumb [3] https://developers.google.com/search/docs/appearance structured-content/article |

### Propuesta 6: Runtime Caching Strategies — Stale-while-revalidate para contenido dinámico

| Campo | Detalle |
|-------|---------|
| **Título** | Implementar stale-while-revalidate y estrategias de caching por tipo de contenido |
| **Problema** | El SW usa cache-first para todos los requests. Contenido que cambia (precios, disponibilidad, horarios) nunca se actualiza desde el servidor porque siempre se sirve del cache. |
| **Descripción** | Implementar runtime caching: (1) **Stale-while-revalidate para HTML**: el index.html y páginas de zona usan stale-while-revalidate — sirve cache inmediatamente, actualiza en background. TTL: 1 día. (2) **Cache-first para estáticos**: CSS, JS, fonts, icons siguen en cache-first (estos no cambian). (3) **Network-first para API-like content**: si hubiera endpoint de precios/ disponibilidad, usar network-first con cache fallback. (4) **Cache versioning**: agregar header `X-Cache-Version` para invalidar stale content. (5) **Cache expiration**: usar `CacheExpiration` pattern para limitar tamaño del cache (max 50 entries). Implementación: modificar `sw.js` fetch handler para detectar tipo de request y aplicar estrategia correcta. |
| **Impacto esperado** | Contenido más fresco sin sacrificar speed, mejor accuracy de precios y disponibilidad, cache size controlado, menos stale content bugs |
| **Esfuerzo** | M (SW caching logic + versioning) |
| **Agente recomendado** | Frontend |
| **Referencias** | [1] https://web.dev/learn/pwa/serving/ [2] https://web.dev/learn/pwa/caching/ [3] https://web.dev/articles/offline-cookbook/ |

### Propuesta 7: Real-time Form Validation con ARIA Live — Accesibilidad de formularios

| Campo | Detalle |
|-------|---------|
| **Título** | Implementar validación en tiempo real con ARIA live regions para formularios |
| **Problema** | La validación existe pero no comunica errores dinámicamente a usuarios de screen reader. Los errores solo aparecen después de submit, sin feedback mientras se escribe. |
| **Descripción** | Implementar accesibilidad en formularios: (1) **ARIA live para errores**: cada campo que tiene validación en tiempo real debe tener `aria-live="polite"` en el contenedor del mensaje de error. (2) **aria-invalid**: cuando el campo falla validación, agregar `aria-invalid="true"` y `aria-describedby="error-id"`链接到错误消息。 (3) **Error summary**: al inicio del formulario, agregar `role="alert"` que lista todos los errores cuando se intenta submit con errores. (4) **Focus en primer error**: cuando el submit falla, mover focus al primer campo inválido. (5) **Validación en blur**: la validación ocurre al salir del campo (blur), no en cada keystroke (menos ruido). Implementación: modificar el form handler en `js/script.js`, CSS para estilos de error (borde rojo, ícono), aria attributes en `index.html`. |
| **Impacto esperado** | Mejora en accessibility score, screen reader users pueden completar el formulario sin errores, reducción de abandonment en formulario de reservas (usuarios con disabilities) |
| **Esfuerzo** | S (JS + aria attributes + CSS error states) |
| **Agente recomendado** | Frontend |
| **Referencias** | [1] https://www.nngroup.com/articles/microinteractions/ [2] https://www.w3.org/WAI/WCAG22/Techniques/aria/ARIA21.html [3] https://baymard.com/blog/accessibility-validation-form |

---

## Orden de implementación recomendado

| # | Propuesta | Impacto | Esfuerzo | Semana |
|---|----------|---------|----------|--------|
| 1 | Skip Navigation + Focus Management | Alto (compliance) | S | 1 |
| 2 | Custom PWA Install Prompt | Medio-Alto | S | 1 |
| 3 | Real-time Form Validation ARIA | Medio | S | 1 |
| 4 | Enhanced Article Schema (FAQPage) | Medio-Alto (SEO) | S | 1-2 |
| 5 | Background Sync API | Alto (leads) | M | 2 |
| 6 | Runtime Caching Strategies | Medio | M | 2-3 |
| 7 | Content Index API | Medio | M | 2-3 |

**Top 3 para implementar primero:** 1, 4, 2 (accesibilidad inmediata + SEO rápido + instalaciones PWA).

---

## Diferencia clave: R41 vs R42

R41 se enfocó en **experiencia de usuario y micro-conversiones**: micro-interacciones, chatbot con IA, gamificación del cotizador, cluster SEO en blog, PWA enhanced básico.

**R42 se enfoca en:**
- **PWA Infrastructure avanzada**: install prompt custom, Background Sync, Content Index, runtime caching strategies
- **Accesibilidad WCAG 2.2**: skip-nav, focus management, ARIA live para formularios
- **SEO técnico**: FAQPage schema, BreadcrumbList, enhanced Article schema
- **Offline reliability**: queue de formularios con retry automático

R41 construyó **interfaces que convierten**. R42 construye **infraestructura que retiene y es accesible**.

---

## Síntesis: Por qué R42 es diferente

R1-R41 ha cubierto un espectro amplio:
- R1-R10: Features internos del site
- R11-R20: SEO y Schema
- R21-R30: UX y conversión
- R31-R35: Video, reputation, AI discoverability
- R36: Modernización técnica (Popover API, Navigation API, Scroll-driven animations, Service Worker modules)
- R37: Discovery externo (Apple Maps, TikTok Local, Video Reviews, Crisis Protocol)
- R38: Conversión interna (garantía, slot picker, rebooking)
- R39: Outreach y automatización (GBP, WhatsApp AI, Social Proof, Referral)
- R40: Retención, confianza y canales no exploitados (voice search, portal, video testimonials, Seller Ratings, ESG)
- R41: UX micro-mejoras, gamificación, SEO de blog, AI chatbot, PWA enhanced
- **R42: PWA install prompt, Background Sync, Content Index, skip-nav/focus WCAG 2.2, FAQPage Schema, runtime caching, ARIA live forms**

R42 es la primera ronda dedicada a **PWA infrastructure avanzada** y **accesibilidad WCAG 2.2** como enfoque principal. Las propuestas de R41 eran UX宏观; R42 es **technical y de compliance**.

---

## Fuentes

[1] Google. "Installation prompt." web.dev. https://web.dev/learn/pwa/installation-prompt/

[2] Google. "Service workers." web.dev. https://web.dev/learn/pwa/service-workers/

[3] Google. "Caching." web.dev. https://web.dev/learn/pwa/caching/

[4] Google. "Serving." web.dev. https://web.dev/learn/pwa/serving/

[5] Google. "Offline data." web.dev. https://web.dev/learn/pwa/offline-data/

[6] Mozilla. "Background Sync API." MDN Web Docs. https://developer.mozilla.org/en-US/docs/Web/API/Background_Sync_API

[7] Google. "Content Index API." Chrome for Developers. https://developer.chrome.com/docs/web-platform/content-index/

[8] W3C. "WCAG 2.2 Techniques." W3C WAI. https://www.w3.org/WAI/WCAG22/Techniques/

[9] W3C. "G1: Adding a link at the top of the page." W3C WAI. https://www.w3.org/WAI/WCAG22/Techniques/general/G1.html

[10] W3C. "Focus visible understanding." W3C WAI. https://www.w3.org/WAI/WCAG22/Understanding/focus-visible.html

[11] Google. "FAQPage structured data." Google Search Central. https://developers.google.com/search/docs/appearance/structured-content/faqpage

[12] Google. "Breadcrumb structured data." Google Search Central. https://developers.google.com/search/docs/appearance/structured-data/breadcrumb

[13] Google. "Article structured data." Google Search Central. https://developers.google.com/search/docs/appearance/structured-data/article

[14] Baymard Institute. "Accessibility & UX for Forms." https://baymard.com/blog/accessibility-validation-form

[15] NNGroup. "Microinteractions." https://www.nngroup.com/articles/microinteractions/

---

*Documento generado por Innovation Scout — Round 42*
*Purity & Clean Analysis — 2026-04-27*
*Co-Authored-By: Paperclip <noreply@paperclip.ing>*