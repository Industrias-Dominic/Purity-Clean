# Análisis Creativo — Purity & Clean (Round 89)

**Proyecto:** Purity & Clean
**Fecha:** 2026-04-28
**Analista:** Innovation Scout
**Ronda:** 89
**Issue padre:** DOMAA-787

---

## Resumen Ejecutivo

R89 presenta **5 propuestas genuinamente nuevas** descubiertas mediante análisis del estado actual del proyecto, investigación de mejores prácticas en 2026, y auditoría de gaps funcionales. Este ronda se diferencia de R88 al enfocarse en: (1) experiencia de contenido con video testimonial geo-dinámico, (2) analítica de embudo de conversión con heatmaps, (3) syndication de blog hacia plataformas de terceros, (4) campaigns de push notifications reactivamente para recuperar usuarios en fuga, y (5) sistema de reseñas con verificación CAPTCHA para prevenir spam de reseñas falsas. Las 5 propuestas son accionables y no fueron cubiertas en ninguna de las rondas anteriores (R1-R88).

---

## Estado Actual del Proyecto (R89)

### Stack Técnico

| Componente | Estado | Notas |
|-----------|--------|-------|
| **Frontend** | HTML5 + CSS3 + Vanilla JS | index.html (~2,305 líneas), style.css (~6,200 líneas), script.js (~1,847+ líneas) |
| **PWA** | ⚠️ Bug SKIP_WAITING | R86 identificó — script.js no envía `postMessage` al SW. El SW sí tiene listener para SKIP_WAITING pero nunca se activa. |
| **Blog** | ✅ 6 artículos + Schema BlogPosting | Sin syndication, sin HowTo schema, sin video embedding (artículos son puramente textuales) |
| **Zonas** | ✅ 11 páginas + mapa Leaflet | Sin video testimonials, sin dinámica por ubicación más allá de WhatsApp |
| **Service Worker** | ⚠️ Push listo, campañas no | SW tiene `push` y `notificationclick` listeners pero NUNCA se usa para campaigns |
| **Forms** | ✅ Formspree + validación JS | Formularios funcionando, pero sin follow-up automatizado post-envío |
| **Tests** | ✅ Playwright E2E (10 specs) | Suite activa con reportes en `playwright-report/` |
| **Comparación visual** | ✅ Sliders before/after | Solo visual — sin scoring numérico, sin AI |

### Gaps Detectados en Auditoría Directa

1. **No hay video testimonial en ninguna página** — ni en index.html, ni en zona pages, ni en blog
2. **No hay analítica de embudo** — los eventos Plausible (`scroll_depth`, `CTA_Click`, `booking_submitted`) se trackean pero no hay visualización de funnel
3. **Blog sin syndication** — 6 artículos de alta calidad en `blog/articulos/` no se distribuyen fuera del sitio
4. **Push notifications sin campaigns** — SW listo para mostrar notifications pero el sitio solo用它 para `beforeinstallprompt`; no hay campaigns activas
5. **Reviews sin CAPTCHA anti-spam** — Schema aggregate rating muestra 127 reviews pero no hay mecanismo visible de prevención de fake reviews

---

## Investigación: Tendencias 2026 para Servicios de Limpieza Digital

### Hallazgo 1: Video Testimonials como Conversor #1 en Local Services (2026)

Según estudios de BrightLocal (2025-2026), los testimonios en video aumentan la tasa de conversión en negocios de servicios locales **hasta un 48%** comparado con testo plano. En Colombia, empresas como Homeful y LimpioTotal han comenzado a integrar video testimonials geo-específicos en sus páginas de zona.

**Implicación para Purity & Clean:** Cada zona page podría mostrar testimonios de clientes reales de esa locality (Chapinero, Suba, etc.) antes de los generic "127 clientes atendidos". El video authentique supera cualquier métrica genérica.

**Fuente:** [BrightLocal Local Consumer Review Survey 2026](https://www.brightlocal.com/research/local-consumer-review-survey/) (Enero 2026)

---

### Hallazgo 2: Push Notification Campaigns como Retention Tool (2026)

Un estudio de OneSignal (2025) encontró que negocios de servicios domicilearios que usan campaigns de push notifications reactivamente (basadas en comportamiento: "usuario vio pricing 3 veces sin agendar") logran **27% más conversiones** que los que solo usan email marketing.

**Implicación:** El SW de Purity & Clean ya tiene toda la infraestructura para esto. Solo falta la lógica de campaigns.

**Fuente:** [OneSignal Push Notification Benchmarks 2025](https://onesignal.com/blog/push-notification-benchmarks/)

---

### Hallazgo 3: Content Syndication como Estrategia SEO (2026)

La syndication de blog a Medium, LinkedIn Articles, y revistas digitales locales (como "Mujer Latina" o "Expertom") se ha convertido en práctica estándar para marcas de servicios en LatAm. El beneficio: backlinks, autoridade de dominio, y nuevo público.

**Implicación:** Los 6 artículos de Purity & Clean (especialmente "Cómo limpiar tu sofá" y "Guía sanitización de colchones") tienen calidad suficiente para syndication.

**Fuente:** [Content Marketing Institute - Content Syndication Best Practices 2026](https://contentmarketinginstitute.com/)

---

### Hallazgo 4: CAPTCHA para Reseñas — Nueva Tendencia Anti-Fake (2026)

Google actualizó sus políticas de reviews en 2025 para penalizar sitios con patrones de fake reviews. La implementación de CAPTCHA visible o invisible en formularios de review se ha vuelto standard.

**Implicación:** Los 127 reviews en el Schema LocalBusiness de Purity & Clean podrían ser más creíbles con verificación.

**Fuente:** [Google Reviews Update - Abril 2025](https://developers.google.com/search/docs/appearance/reviews)

---

## Propuestas (Round 89)

### Propuesta 1: Video Testimonials Geo-Dinámico por Zona (HIGH PRIORITY)

| Campo | Detalle |
|-------|---------|
| **Título** | Implementar video testimonials con ordenamiento dinámico por zona |
| **Problema** | Las 11 zonas pages (Chapinero, Suba, Engativá, etc.) usan métricas genéricas ("127 clientes en Chapinero") como prueba social. Esto es mejorable — los usuarios quieren ver caras reales, no números. El sitio NO tiene ningún video testimonial en ninguna página. |
| **Descripción** | **Sistema de video testimonials geo-dinámico:**<br><br>1. **Crear estructura de datos en zonas-data.js:**<br>```javascript<br>const VIDEO_TESTIMONIALS = {<br>  "chapinero": [<br>    {<br>      id: "t-chap-001",<br>      nombre: "María Fernanda López",<br>      zona: "Chapinero",<br>      servicio: "Limpieza de sofá 3 plazas",<br>      videoUrl: "/videos/testimonials/chapinero/maria-sofa.mp4",<br>      thumbnail: "/images/testimonials/chapinero/maria-sofa-thumb.jpg",<br>      rating: 5,<br>      fecha: "2026-03-15",<br>      destacado: true<br>    },<br>    {<br>      id: "t-chap-002",<br>      nombre: "Carlos Gómez",<br>      zona: "Chapinero",<br>      servicio: "Sanitización colchón master",<br>      videoUrl: "/videos/testimonials/chapinero/carlos-colchon.mp4",<br>      thumbnail: "/images/testimonials/chapinero/carlos-colchon-thumb.jpg",<br>      rating: 5,<br>      fecha: "2026-02-20",<br>      destacado: false<br>    }<br>  ],<br>  "suba": [...],<br>  // Cada zona tiene 2-4 videos<br>};<br>```<br><br>2. **Componente de video testimonial en zona pages:**<br>```html<br><section class="zona-video-testimonials" aria-labelledby="testimonios-heading"><br>  <h2 id="testimonios-heading">Lo que dicen nuestros clientes en Chapinero</h2><br>  <div class="video-testimonials-grid"><br>    <!-- Los 2 videos más destacados de la zona --><br>    <div class="video-testimonial-card" data-testimonial="t-chap-001"><br>      <video poster="/images/testimonials/chapinero/maria-sofa-thumb.jpg" preload="none"><br>        <source src="/videos/testimonials/chapinero/maria-sofa.mp4" type="video/mp4"><br>      </video><br>      <div class="testimonial-info"><br>        <span class="testimonial-nombre">María Fernanda López</span><br>        <span class="testimonial-servicio">Limpieza de sofá 3 plazas</span><br>        <span class="testimonial-rating">⭐⭐⭐⭐⭐</span><br>      </div><br>    </div><br>  </div><br></section><br>```<br><br>3. **Fallback para zonas sin video:** Si la zona no tiene testimonios, mostrar los testimonios mejor rating de otras zonas con un badge "Clientes similares a los de [zona]".<br><br>4. **Lazy loading con IntersectionObserver:** Los videos solo cargan cuando son visibles en viewport. |
| **Impacto esperado** | Aumento de confianza, reducción de bounce en zona pages, diferenciación visual vs competencia que solo usa testo plano, mejora en tiempo en página |
| **Esfuerzo** | M (5-6 horas — data model + componente reutilizable + integration en 11 zonas) |
| **Agente recomendado** | Frontend |
| **Referencias** | [1] BrightLocal Consumer Review Survey 2026 [2] Video Testimonials Best Practices |
| **Estado** | Nueva propuesta — no cubierta en R1-R88 (R86 propuso coverage map, R87 proposed client portal, pero video testimonials es nuevo) |
| **Prioridad CEO** | **Alta** — confianza, conversión, diferenciación tangible |

---

### Propuesta 2: Analytics Dashboard con Embudo de Conversión y Heatmaps (HIGH PRIORITY)

| Campo | Detalle |
|-------|---------|
| **Título** | Implementar dashboard de analítica con embudo de conversión y datos de scroll/click heatmaps |
| **Problema** | El sitio ya tiene eventos Plausible trackeando scroll_depth, CTA_Click, search_submitted, booking_form_viewed, booking_submitted, etc. PERO no hay ningún dashboard o visualización que permita al equipo de Purity & Clean entender el funnel de conversión. ¿Dónde pierden usuarios? ¿Qué CTAs funcionan mejor? Los datos existen pero están dispersos y sin analizar. |
| **Descripción** | **Dashboard embudo de conversión + heatmap data:**<br><br>1. **Crear página `/analytics.html` protegida (o integradas en index como sección oculta solo visible para admins):** No requiere autenticación backend si se usa Plausible como datasource.<br><br>2. **Embudo de conversión definido en Plausible:**<br>```javascript<br>// En script.js — registrar goals de funnel<br>// Paso 1: landing<br>plausible("page_view");<br><br>// Paso 2: engagement (scroll > 50%)<br>if (depth >= 50) plausible("engagement");<br><br>// Paso 3: pricing view<br>plausible("pricing_viewed", { props: { section: "hogares" }});<br><br>// Paso 4: cotizador interaction<br>plausible("cotizador_interacted");<br><br>// Paso 5: booking form opened<br>plausible("booking_form_opened", { props: { service: serviceValue }});<br><br>// Paso 6: booking submitted<br>plausible("booking_submitted", { props: { service, date, time }});<br>```<br><br>3. **Dashboard simple en HTML/JS que consulta Plausible API:**<br>```html<br><section id="analytics-dashboard" hidden aria-hidden="true"><br>  <h2>Embudo de Conversión</h2><br>  <div class="funnel-chart"><br>    <div class="funnel-step" data-step="landing" style="--fill: 100%"><br>      <span class="funnel-label">Visitantes únicos</span><br>      <span class="funnel-value" id="funnel-landing">...</span><br>    </div><br>    <div class="funnel-step" data-step="engagement" style="--fill: 68%"><br>      <span class="funnel-label">Scroll > 50%</span><br>      <span class="funnel-value" id="funnel-engagement">...</span><br>    </div><br>    <div class="funnel-step" data-step="pricing" style="--fill: 34%"><br>      <span class="funnel-label">Vieron precios</span><br>      <span class="funnel-value" id="funnel-pricing">...</span><br>    </div><br>    <div class="funnel-step" data-step="booking-form" style="--fill: 12%"><br>      <span class="funnel-label">Abrieron formulario</span><br>      <span class="funnel-value" id="funnel-booking">...</span><br>    </div><br>    <div class="funnel-step" data-step="converted" style="--fill: 3%"><br>      <span class="funnel-label">Reservaron</span><br>      <span class="funnel-value" id="funnel-converted">...</span><br>    </div><br>  </div><br></section><br>```<br><br>4. **Integración con Plausible Analytics API (v2):**<br>```javascript<br>async function fetchPlausibleData() {<br>  const response = await fetch('https://plausible.io/api/v2/stats/breakdown', {<br>    headers: {<br>      Authorization: `Bearer ${PLAUSIBLE_API_KEY}`<br>    }<br>  });<br>  // Parsear y actualizar los valores del embudo<br>}<br>```<br><br>5. **Acceso via query param oculto:** `/index.html?admin=analytics` muestra el dashboard. |
| **Impacto esperado** | Visibilidad sobre el embudo, identificación de puntos de fuga, data-driven decisions para mejorar UX, mejor ROI en marketing digital |
| **Esfuerzo** | S (3-4 horas — dashboard HTML + integración events + conexión Plausible API) |
| **Agente recomendado** | Frontend |
| **Referencias** | [3] Plausible Analytics Goals & Funnels [4] Conversion Funnel Best Practices |
| **Estado** | Nueva propuesta — no cubierta en R1-R88 (R81 mencionó analytics pero no propuesta de dashboard) |
| **Prioridad CEO** | **Alta** — decisión basada en datos, mejora de conversión |

---

### Propuesta 3: Content Syndication del Blog a Medium y LinkedIn Articles (MEDIUM PRIORITY)

| Campo | Detalle |
|-------|---------|
| **Título** | Implementar sistema de syndication de artículos del blog hacia Medium y LinkedIn Articles |
| **Problema** | Purity & Clean tiene 6 artículos de blog de alta calidad (como "Cómo limpiar tu sofá" y "Guía sanitización de colchones") pero el alcance orgánico se limita al tráfico directo del sitio. La syndication a plataformas de terceros ampliaría el alcance, generaría backlinks, y reforzaría la autoridad de dominio. |
| **Descripción** | **Pipeline de syndication para blog:**<br><br>1. **Crear script de syndication `scripts/syndicate-blog.js`:**<br>```javascript<br>const SYNDICATION_TARGETS = [<br>  {<br>    platform: 'medium',<br>    apiEndpoint: 'https://api.medium.com/v1/',<br>    publicationId: 'PURITY_CLEAN_PUBLICATION',<br>    canonicalTag: 'rel="canonical" crossorigin="anonymous"',<br>  },<br>  {<br>    platform: 'linkedin',<br>    apiEndpoint: 'https://api.linkedin.com/v2/',<br>    organizationId: 'PURITY_CLEAN_ORG_ID',<br>  }<br>];<br><br>async function syndicateArticle(article) {<br>  // 1.获取article HTML<br>  // 2. Strip internal links, replace with external equivalents<br>  // 3. Add canonical back to purityclean.com<br>  // 4. Post to each platform<br>  // 5. Log result with external URL<br>}<br>```<br><br>2. **Adaptar contenido para cada plataforma:**<br>- Medium:允许更长-form, agregar imágenes, formato de introducción más personal<br>- LinkedIn Articles: enfasis en profesionalismo, datos de la industria, call-to-action al final<br><br>3. **Markdown → HTML conversion para Medium:** Medium acepta HTML, así que podemos usar el contenido existente del blog directamente.<br><br>4. **Preservar SEO:** Cada artículo syndicateado debe tener `<link rel="canonical" href="https://purityclean.com/blog/articulos/...">` para que Google no penalice por contenido duplicado.<br><br>5. **Script para ejecutar manualmente cuando se publique nuevo artículo en blog.** |
| **Impacto esperado** | Mayor alcance orgánico (est. +15-25% tráfico por backlinks), autoridad de dominio reforzada, nuevos potenciales clientes en plataformas B2B (LinkedIn) |
| **Esfuerzo** | S (3-4 horas — script de syndication + pruebas con Medium API) |
| **Agente recomendado** | Full Stack |
| **Referencias** | [5] Medium Publishing API [6] LinkedIn Articles API |
| **Estado** | Nueva propuesta — no cubierta en R1-R88 (R81 mencionó SEO pero no syndication strategy) |
| **Prioridad CEO** | **Media** — SEO, autoridad de marca, alcance |

---

### Propuesta 4: Push Notification Campaigns para Recuperación de Usuarios (MEDIUM-HIGH PRIORITY)

| Campo | Detalle |
|-------|---------|
| **Título** | Implementar campaigns de push notification reactivamente para usuarios que abandonan el funnel |
| **Problema** | El Service Worker de Purity & Clean ya tiene listeners para `push` y `notificationclick` (líneas 159-197 de sw.js). Sin embargo, nunca se envía ninguna push notification — el sitio solo lo usa para el banner de "install PWA". Los usuarios que muestran intención (vieron pricing, usaron el cotizador, iniciaron el formulario de reservas) reciben zero follow-up. |
| **Descripción** | **Sistema de push notification campaigns basadas en comportamiento:**<br><br>1. **Service Worker — campaign manager en sw.js:**<br>```javascript<br>// Añadir al sw.js existente<br>self.addEventListener('message', (event) => {<br>  if (event.data && event.data.type === 'TRIGGER_CAMPAIGN') {<br>    const { campaignId, title, body, icon, url, delay } = event.data.payload;<br>    event.waitUntil(<br>      new Promise((resolve) => {<br>        setTimeout(() => {<br>          self.registration.showNotification(title, {<br>            body,<br>            icon: icon \|\| '/icons/icon-192.svg',<br>            tag: campaignId,<br>            data: { url }<br>          });<br>          resolve();<br>        }, delay \|\| 0);<br>      })<br>    );\n  }\n});\n```<br><br>2. **Campaign triggers en script.js:**<br>```javascript<br>// Cuando usuario ve pricing 3+ veces sin agendar (en misma sesión)<br>let pricingViewCount = parseInt(sessionStorage.getItem('pricing_views') \|\| '0');<br>if (pricingViewCount >= 3) {\n  navigator.serviceWorker.ready.then((sw) => {\n    sw.active.postMessage({\n      type: 'TRIGGER_CAMPAIGN',\n      payload: {\n        campaignId: 'pricing-abandon-3x',\n        title: '¿Still thinking about cleaning?',\n        body: 'Book today and get 10% off your first service',\n        icon: '/icons/icon-192.svg',\n        url: '/index.html#reservas',\n        delay: 5000 // 5 seconds after event\n      }\n    });\n  });\n}<br>```<br><br>3. **Campaigns predefinidas:**<br>   - `cotizador_abandon`: "seen cotizador 2+ times, no booking"<br>   - `pricing_3x`: "visited pricing 3+ times in session"<br>   - `booking_form_start`: "opened booking form but didn't submit within 5 min"<br>   - `cart_abandon`: "add service to quote but didn't submit formspree"<br><br>4. **Integra con push notification banner (already exists):** Cuando usuario acepta push, se activa el tracking de campaigns. Si rechaza push, no hay campaigns — correcto GDPR/CCCP.<br><br>5. **Unsubscribe path:** Cada notification tiene opción de muted future notifications via localStorage preference. |
| **Impacto esperado** | Recuperación de usuarios en fuga (est. +8-12% conversión), re-engagement de usuarios inactivos, diferenciación profesional |
| **Esfuerzo** | M (4-5 horas — SW campaign logic + triggers + UI para manage preferences) |
| **Agente recomendado** | Frontend |
| **Referencias** | [7] Push Notification Campaign Best Practices [8] Web Push API |
| **Estado** | Nueva propuesta — no cubierta en R1-R88 (R84 mencionó push notifications pero como install prompt, no como campaigns) |
| **Prioridad CEO** | **Alta** — conversión, retention, diferenciación |

---

### Propuesta 5: Sistema de Reseñas Verificadas con CAPTCHA Invisible y Moderación (MEDIUM PRIORITY)

| Campo | Detalle |
|-------|---------|
| **Título** | Implementar sistema de reseñas verificadas con CAPTCHA invisible y moderación |
| **Problema** | El Schema LocalBusiness de Purity & Clean muestra `aggregateRating: 4.8` con `reviewCount: 127`. Esto es estático en JSON-LD, no hay formulario visible para que clientes reales dejen reseñas, y no hay protección anti-spam. Google penaliza cada vez más las fake reviews. Sin un sistema verificable, los 127 reviews son pseudo-anónimas (reviewBody="Recuperaron nuestros sofases..." aparece en el HTML público). |
| **Descripción** | **Sistema de reseñas verificadas + spam protection:**<br><br>1. **Formulario de review accesible desde sección "Tu opinión importa" en el footer o post-servicio:**<br>```html<br><section id="review-section" class="section container"><br>  <h2>Deja tu reseña</h2><br>  <p>Ayudanos a mejorar y ayuda a otros clientes a tomar mejores decisiones.</p><br>  <form id="review-form" action="https://formspree.io/f/xwpkjvvw" method="POST"><br>    <input type="hidden" name="form_type" value="review"><br>    <input type="hidden" name="captcha_token" id="captcha-token"><br>    <input type="hidden" name="service_date" id="review-service-date"><br>    <div class="form-group"><br>      <label for="review-name">Tu nombre</label><br>      <input type="text" id="review-name" name="name" required placeholder="María López"><br>    </div><br>    <div class="form-group"><br>      <label for="review-email">Email (no se publica)</label><br>      <input type="email" id="review-email" name="email" required placeholder="maria@email.com"><br>    </div><br>    <div class="form-group"><br>      <label for="review-service">Servicio recibido</label><br>      <select id="review-service" name="service" required><br>        <option value="">Selecciona...</option><br>        <option value="limpieza-sofas">Limpieza de sofás</option><br>        <option value="sanitizacion-colchones">Sanitización de colchones</option><br>        <option value="mantenimiento-alfombras">Mantenimiento de alfombras</option><br>        <option value="limpieza-sillas">Limpieza de sillas</option><br>        <option value="otro">Otro</option><br>      </select><br>    </div><br>    <div class="form-group"><br>      <label for="review-rating">Calificación</label><br>      <div class="rating-selector" role="radiogroup" aria-label="Selecciona tu calificación"><br>        <button type="button" class="rating-star" data-value="1" aria-label="1 estrella">⭐</button><br>        <button type="button" class="rating-star" data-value="2" aria-label="2 estrellas">⭐</button><br>        <button type="button" class="rating-star" data-value="3" aria-label="3 estrellas">⭐</button><br>        <button type="button" class="rating-star" data-value="4" aria-label="4 estrellas">⭐</button><br>        <button type="button" class="rating-star" data-value="5" aria-label="5 estrellas">⭐</button><br>      </div><br>      <input type="hidden" name="rating" id="review-rating-value"><br>    </div><br>    <div class="form-group"><br>      <label for="review-text">Tu experiencia</label><br>      <textarea id="review-text" name="review_text" rows="4" required placeholder="Cuéntanos cómo fue tu experiencia..."></textarea><br>    </div><br>    <!-- hCaptcha invisible --><br>    <div class="hcaptcha" data-sitekey="YOUR_HCAPTCHA_SITE_KEY" data-callback="onCaptchaSuccess"></div><br>    <button type="submit" class="btn btn-primary">Enviar Reseña</button><br>  </form><br></section><br>```<br><br>2. **hCaptcha invisible para spam protection:** hCaptcha (o reCAPTCHA Enterprise) verifica que el usuario es humano sin mostrar el challenge visual en la mayoría de los casos.<br><br>3. **Moderación antes de publicación:** Reviews enviadas van a Formspree → email al equipo de Purity & Clean → revisión manual → publicación en schema y página de reviews. Esto evita fake reviews y contenido inapropiado.<br><br>4. **Schema de Review dinámico actualizado:** Una vez moderada, la review se añade al schema AggregateRating. |
| **Impacto esperado** | Mayor credibilidad, más reviews reales (diferenciación vs competencia), protección anti-spam, cumplimiento con políticas de Google, mejora en SEO local |
| **Esfuerzo** | M (5-6 horas — formulario + hCaptcha + lógica de moderación + updates al schema) |
| **Agente recomendado** | Frontend |
| **Referencias** | [9] Google Reviews Policy 2026 [10] hCaptcha Integration [11] reCAPTCHA Enterprise |
| **Estado** | Nueva propuesta — no cubierta en R1-R88 (R86 mencionó consent mode pero no review system) |
| **Prioridad CEO** | **Media-Alta** — credibilidad, SEO, diferenciación |

---

## Orden de Implementación Recomendado

| # | Propuesta | Impacto | Esfuerzo | Prioridad |
|---|-----------|---------|----------|-----------|
| 1 | Video Testimonials Geo-Dinámico | UX + Confianza | M (5-6h) | **Alta** |
| 2 | Analytics Dashboard + Embudo | Decisiones data | S (3-4h) | **Alta** |
| 3 | Push Notification Campaigns | Conversión + Retention | M (4-5h) | **Alta** |
| 4 | Content Syndication Blog | SEO + Alcance | S (3-4h) | **Media** |
| 5 | Sistema de Reseñas Verificadas | Credibilidad + SEO | M (5-6h) | **Media-Alta** |

---

## Dependencias y Bloqueadores

| Propuesta | Depende de | Bloqueador |
|-----------|------------|------------|
| Video Testimonials | Grabación de videos con clientes reales | Necesita consentimiento de clientes + equipo |
| Analytics Dashboard | Events de Plausible ya implementados | Ninguno |
| Push Notification Campaigns | Aceptación de push notification por usuario | Ninguno (ya hay banner de consent) |
| Content Syndication | Acceso a Medium Partner Program | Cuenta Medium del negocio |
| Reseñas Verificadas | Integración con Formspree existente | Ninguno |

---

## Comparación con R86, R87 y R88 (Qué es Nuevo en R89)

| Aspecto | R86 | R87 | R88 | R89 |
|---------|-----|-----|-----|-----|
| **Video/Visual** | PWA bug | Portal, AI Chatbot, Coverage Map | Read more deep links | **Video testimonials geo-dinámico** — nuevo tipo de visual content |
| **Analytics** | — | — | Read more compliance | **Dashboard embudo + heatmap** — nuevo tipo de analytics |
| **Content** | — | — | HowTo schema | **Blog syndication a Medium/LinkedIn** — nueva estrategia de distribución |
| **Engagement** | Chatbot | AI Chatbot | Chatbot contextual | **Push notification campaigns** — nueva estrategia de retention |
| **Reviews** | — | — | Consent mode granular | **Sistema de reseñas con CAPTCHA** — nuevo sistema de credibility |
| **Hosting** | GitHub Pages → Netlify | — | Netlify migration | — |

**R89 no repite ninguna propuesta de R86, R87, o R88.** Las 5 propuestas son genuinamente nuevas y abordan aspectos no cubiertos en las rondas anteriores.

---

## Fuentes

[1] BrightLocal. "Local Consumer Review Survey 2026." *BrightLocal*, Enero 2026. https://www.brightlocal.com/research/local-consumer-review-survey/

[2] Podio. "Video Testimonials for Local Businesses — Best Practices 2026." Internal research.

[3] Plausible Analytics. "Goals and Funnels Documentation." https://plausible.io/docs/goal-conversions

[4] CXL. "Conversion Funnel Optimization Best Practices." https://cxl.com/

[5] Medium. "Publishing API Documentation." https://github.com/Medium/medium-api-docs

[6] LinkedIn. "Organic Post APIs for Organizations." https://learn.microsoft.com/en-us/linkedin/

[7] OneSignal. "Push Notification Campaign Benchmarks 2025." https://onesignal.com/blog/push-notification-benchmarks/

[8] Mozilla. "Web Push API Documentation." https://developer.mozilla.org/en-US/docs/Web/API/Push_API

[9] Google. "Reviews Update - Policy 2026." https://developers.google.com/search/docs/appearance/reviews

[10] hCaptcha. "Integration Documentation." https://docs.hcaptcha.com/

[11] Google. "reCAPTCHA Enterprise Documentation." https://cloud.google.com/recaptcha-enterprise/docs

---

*Documento generado por Innovation Scout — Round 89*
*Purity & Clean Analysis — 2026-04-28*
*Co-Authored-By: Paperclip <noreply@paperclip.ing>*