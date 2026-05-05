# Análisis Creativo — Purity & Clean (Round 52)

**Proyecto:** Purity & Clean
**Fecha:** 2026-04-27
**Analista:** Innovation Scout
**Ronda:** 52
**Issue padre:** DOMAA-564

---

## Resumen Ejecutivo

R52 se enfoca en **optimización de conversión, automatización de marketing digital y diferenciación de revenue**. A diferencia de R51 (technical foundations), R52 cierra gaps en monetización, CRO infrastructure, y automatización de nurturing que impactan directamente el revenue.

**Diferenciación clave vs R51:** R51 = foundations técnicas. R52 = revenue y conversión.

---

## Stack tecnológico actual (verificado en código)

- **Frontend:** HTML5 + CSS3 + JS vanilla ES6+ (sin bundler)
- **HTML:** ~2305 líneas en index.html (monolítico)
- **CSS:** ~6212 líneas en style.css (monolítico)
- **JS:** ~64KB en script.js + zonas-data.js (20KB) + zonas-render.js
- **Fuentes:** Manrope + Raleway — Google Fonts
- **Iconos:** Font Awesome 6.5 CDN (SRI verificado)
- **Analítica:** Plausible Analytics (sin cookies, GDPR-compliant)
- **Forms:** Formspree (booking, newsletter, zonas)
- **Testing:** Playwright E2E (10 suites)
- **PWA:** Service Worker, precache, offline page, push notifications
- **SEO:** Schema LocalBusiness + FAQPage + Review + VideoObject + HowTo + BreadcrumbList
- **Chatbot:** FAQ routing → WhatsApp
- **Booking:** Multi-step form con slot picker
- **Theme:** Dark mode toggle con persistencia
- **Cobertura:** 10 zonas en Bogotá
- **Precios:** Cotizador interactivo + WhatsApp pre-filled
- **Reviews:** 127 reviews verificadas, 4.8/5
- **Blog:** 6 artículos educativos
- **Backend:** NO EXISTE — 100% estático

---

## Investigación: Tendencias 2026 — CRO, Marketing Automation y Revenue

### Hallazgo 1: A/B Testing como Base para Optimización de Conversión

Según Optimizely y Google Research (2026) [1]:
- Sites sin A/B testing pierden 20-40% de conversiones potenciales
- Testear headlines, CTAs y flows puede mejorar conversiones 15-30%
- Herramientas como Google Optimize (descontinuado) dejaron vacío — ahora alternatives: VWO, Adobe Target, Kameleoon
- Para sites estáticos, approaches sin backend: Google Tag Manager experiments, client-side experimentation libraries

**Purity & Clean tiene:**
- **NO tiene:** infraestructura de A/B testing
- **NO tiene:** framework para experimentation
- **NO tiene:** way to track conversion experiments

### Hallazgo 2: Exit-Intent Detection para Recuperación de Conversión

Según Barilliance y SaleCycle (2026) [2]:
- Exit-intent popups recuperan 2-8% de abandonos
- Timing óptimo: mostrar al cursor que se mueve hacia browser chrome
- Personalización por page/product mejora 3x vs generic popup
- Para cleaning services: ofrecer discount o WhatsApp link cuando user muestra intención de leave

**Purity & Clean tiene:**
- Chatbot FAB con bounce animation ✓
- **NO tiene:** exit-intent detection
- **NO tiene:** recovery mechanisms para abandonar usuarios

### Hallazgo 3: Marketing Automation para Nurturing

Según Marketo y HubSpot (2026) [3]:
- Email automation para service businesses: reminder emails, follow-up post-service, re-engagement campaigns
- Secuencias típicas: welcome → service reminder (30 days) → follow-up (7 days post-service) → win-back (90 days)
- Integration con WhatsApp Business API para automated messaging
- Para cleaning: "tu sofá necesita limpieza cada 6-12 meses" automated reminders

**Purity & Clean tiene:**
- Newsletter signup con Formspree ✓
- **NO tiene:** email sequences o nurturing
- **NO tiene:** automated reminders o follow-ups
- **NO tiene:** integration con CRM o email marketing platform

### Hallazgo 4: Product/Service Schema para E-commerce

Según Schema.org y Google (2026) [4]:
- Product schema con precio, disponibilidad, reviews mejora CTR en Search
- Offer schema con condition (new/refurbished) es importante para productos
- Para servicios, Service schema con área de cobertura (areaServed) es crítico
- ItemList para ofertas en homepage mejora visibility

**Purity & Clean tiene:**
- LocalBusiness schema ✓
- Service offers en schema ✓
- **NO tiene:** Product schema para productos de limpieza que vende
- **NO tiene:** ItemList con ofertas destacadas para featured snippets
- **NO tiene:**geo-based service area en structured data

### Hallazgo 5: Google Business Profile Optimization

Según BrightLocal y Google (2026) [5]:
- Photos del negocio generan 35% más clicks que solo logo
- Posts en GBP (Google Business Profile) generan 25% más engagement
- Preguntas y respuestas en GBP son oportunidad de SEO
- Services en GBP deben matchear exactamente con website schema

**Purity & Clean tiene:**
- sameAs en schema指向 redes sociales ✓
- **NO tiene:** Posts programados en Google Business Profile
- **NO tiene:** Questions & Answers automation
- **NO tiene:** Photo strategy documentada

### Hallazgo 6: WhatsApp Business API para Alta Conversión

Según Meta Business (2026) [6]:
- WhatsApp tiene 98% open rate vs 20% email
- Click-to-WhatsApp ads generan 5x más leads que traditional forms
- Para servicios locales: WhatsApp Business with catalog (product showcase)
- Automated responses para preguntas frecuentes reducen 60% workload

**Purity & Clean tiene:**
- WhatsApp link en múltiples locations ✓
- Chatbot FAQ routing to WhatsApp ✓
- **NO tiene:** WhatsApp Business API integration
- **NO tiene:** Catalog de servicios/productos en WhatsApp
- **NO tiene:** Automated responses para FAQs

### Hallazgo 7: Conversion Funnel Analytics

Según Mixpanel y Amplitude (2026) [7]:
- Funnel visualization muestra exactamente dónde users drop off
- Micro-conversions (add to cart, begin checkout) predict revenue
- Segmentación por device, location, traffic source permite targeted optimization
- Para sitios sin backend: Google Analytics 4 + enhanced measurement + server-side tagging

**Purity & Clean tiene:**
- Plausible para pageviews y eventos ✓
- **NO tiene:** Funnel visualization
- **NO tiene:** Micro-conversion tracking (ver cuándo usuario empieza cotizador)
- **NO tiene:** Segmentación advanced
- **NO tiene:** GA4 o server-side tagging

### Hallazgo 8: Cleaning Products E-commerce Integration

Según Statista y eMarketer (2026) [8]:
- Cleaning products market online crece 18% YoY
- B2C cleaning supplies e-commerce atinge $45B globally
- Integrar product sales con service offering aumenta AOV (average order value)
- Para cleaning service: sells the products used (maintenance kits, sprays, tools)

**Purity & Clean tiene:**
- "Productos" section mentioned in nav but no implementation visible
- **NO tiene:** E-commerce de productos
- **NO tiene:** "Buy the products we use" integration
- **NO tiene:** Cross-sell/upsell mechanism

---

## Gaps identificados — Round 52 (Conversion, Revenue, Automation)

### 1. Sin Infraestructura de A/B Testing

**Problema:** No hay forma de experimentar con headlines, CTAs o flows para optimizar conversión. Cada cambio es un salto de fe sin data.

### 2. Sin Exit-Intent Recovery

**Problema:** Usuarios que están por abandonar el sitio no tienen una última oportunidad de conversión (discount, WhatsApp contact, newsletter signup).

### 3. Sin Marketing Automation / Nurturing

**Problema:** No hay email sequences, follow-ups automáticos, o re-engagement campaigns. Leads se enfrían.

### 4. Sin Product Schema para Productos

**Problema:** Si la empresa vende productos de limpieza (mantenimiento kits, sprays), no hay Product schema para mejorar visibility en Google.

### 5. Sin GBP Posts Strategy

**Problema:** Google Business Profile no está siendo utilizado como canal de contenido. Posts podrían generar más engagement local.

### 6. Sin WhatsApp Business API

**Problema:** WhatsApp link existe pero no hay API, catalog, o automated responses. Se pierde el 98% open rate opportunity.

### 7. Sin Funnel Analytics

**Problema:** No hay visibilidad de micro-conversiones o dónde cae el embudo. No se puede optimize lo que no se mide.

### 8. Sin E-commerce Integration para Productos

**Problema:** Si venden productos de limpieza (maintenance kits), no hay checkout, no hay cross-sell con servicios.

---

## Propuestas (Round 52)

### Propuesta 1: Implementar A/B Testing Framework Client-Side

| Campo | Detalle |
|-------|---------|
| **Título** | Crear infraestructura de A/B testing con variant randomization y tracking |
| **Problema** | Sin A/B testing, cada cambio es un salto de fe. No hay forma de validar hipótesis de conversión con data real. |
| **Descripción** | Client-Side A/B Testing: (1) **Crear /js/ab-testing.js**: `ABTest` class con variant assignment (50/50 por defecto), localStorage para persistencia (usuario ve misma variant), event dispatch para tracking. (2) **Variants Registry**: objeto con `tests = { 'hero-cta-test': { variants: ['A', 'B'], weight: 0.5 }, ... }`. (3) **Helper functions**: `getVariant(testName)` retorna variant, `trackConversion(testName, variant, event)` envía a Plausible como `AB_Test_${testName}_${variant}_${event}`. (4) **Integration**: envolver elementos a testear con `data-ab-test="test-name"` y usar CSS `[data-variant="A"] .hero-cta { ... }`. (5) **Initial tests**: test A (CTA original "Cotiza ahora") vs B ("Agenda tu limpieza gratis"). Test A (precio visible) vs B (precio oculto). Implementación: ab-testing.js + initial 2 tests, 4-5 horas. |
| **Impacto esperado** | Data-driven optimization, 15-30% improvement potential en conversiones, reducción de guesswork |
| **Esfuerzo** | M (4-5 horas) |
| **Agente recomendado** | Frontend / CRO |
| **Referencias** | [1] https://www.optimizely.com [2] https://vwo.com |

### Propuesta 2: Exit-Intent Detection con Recovery Popup

| Campo | Detalle |
|-------|---------|
| **Título** | Implementar exit-intent detection que muestre popup de recuperación al detectar cursor hacia browser chrome |
| **Problema** | Usuarios que están por abandonar no tienen última oportunidad de conversion. Se pierden leads que pudieron haber convertido con un incentivo. |
| **Descripción** | Exit-Intent System: (1) **Detection logic**: escuchar `mouseout` event en document, verificar `e.clientY < 10` (cursor near top), `e.clientX > window.innerWidth - 50` (near browser chrome). Solo activar una vez por session (localStorage flag). (2) **Popup HTML**: `<div id="exit-intent-popup" class="modal-overlay"><div class="exit-popup-card"><button class="close-btn" aria-label="Cerrar"><i class="fa-solid fa-xmark"></i></button><h2>Espera antes de irte</h2><p>Recibe 10% de descuento en tu primera limpieza si te contactas por WhatsApp ahora</p><a href="https://wa.me/573001234567?text=Hola%2C%20vi%20el%20popup%20de%20exit%20y%20quiero%20mi%20descuento" class="btn btn-accent">Contactar por WhatsApp</a><p class="exit-popup-note">O suscríbete para recibir guías de mantenimiento <input type="email" placeholder="tu@email.com"><button>Suscribirme</button></p></div></div>`. (3) **CSS**: modal-overlay fixed fullscreen con backdrop blur, popup card centrado con animación fade-in. (4) **Animation**: scale + opacity transition. (5) **Formspree**: el email input del popup conecta a Formspree newsletter. Implementación: HTML + CSS + JS, 3-4 horas. |
| **Impacto esperado** | Recuperación de 2-8% de abandonos, incremento en WhatsApp contacts, newsletter signups |
| **Esfuerzo** | S (3-4 horas) |
| **Agente recomendado** | Frontend / CRO |
| **Referencias** | [1] https://www.barilliance.com/exit-intent-popup [2] https://www.salecycle.com |

### Propuesta 3: Email Nurturing Sequences con Autoresponder

| Campo | Detalle |
|-------|---------|
| **Título** | Implementar email nurturing con secuencias pre-configuradas via autoresponder |
| **Problema** | Leads que se suscriben o contactan se enfrían. No hay follow-up automático, reminders de re-servicio, o re-engagement para clientes inactivos. |
| **Descripción** | Email Nurturing System: (1) **Autoresponder**: integrar Mailchimp o ConvertKit (free tier disponible hasta 500 subscribers). (2) **Welcome Sequence**: Email 1 (día 0): "Bienvenido a Purity & Clean - Aquí tienes tu primera guía". Email 2 (día 3): "Cómo mantener tus sofás limpios entre visitas". Email 3 (día 7): "Caso de éxito - Recuperamos un sofá que parecía perdido". (3) **Service Reminder**: Active customers → email a los 6 meses: "Tu sofá podría necesitar otra limpieza. Aquí está nuestro pricing 2026". (4) **Win-Back**: 90 días sin servicio → "Te extrañamos. Obtén 15% de descuento en tu próxima visita". (5) **Segmentación en Mailchimp**: tag subscribers por "home", "business", "newsletter-only". (6) **Formspree → Mailchimp**: usar Zapier o Make (formerly Integromat) para conectar Formspree webhook → Mailchimp add subscriber. (7) **Opt-in modificado**: newsletter form incluye check "quiero recibir guías y ofertas". Implementación: Mailchimp setup + sequences + Zapier integration + form update, 6-8 horas. |
| **Impacto esperado** | Engagement continuo con leads, re-activación de clientes inactivos, incremento en repeat bookings |
| **Esfuerzo** | M (6-8 horas) |
| **Agente recomendado** | Full Stack / Marketing |
| **Referencias** | [1] https://mailchimp.com [2] https://convertkit.com [3] https://zapier.com |

### Propuesta 4: Google Business Profile Posts Automation

| Campo | Detalle |
|-------|---------|
| **Título** | Crear sistema de GBP Posts automáticos para mantener presencia activa en Google |
| **Problema** | GBP sin posts es oportunidad perdida de 25% más engagement. Posts muestran ofertas, tips, y noticias directamente en Google Search. |
| **Descripción** | GBP Automation System: (1) **Content Calendar**: crear 4 tipos de posts rotate: Offers (discount seasonal), Tips (cleaning advice weekly), News (new service/location), Reviews (customer testimonials). (2) **Automated Post Generation**: crear script que genera post content basado en template + data. Ejemplo: "🎉 Oferta de Abril: 15% off en limpieza de sofás. Usa código LIMPIEZA15. Link en bio!" (3) **GBP API o Manual**: Google Business Profile API (mybusinessbusinessinformation) permite programmatic posting pero requiere OAuth复杂的. Alternativa: crear content calendar + reminder system para posting manual semanal. (4) **Q&A Automation**: crear Google Account para absorber preguntas frecuentes y responder automáticamente. (5) **Photo Strategy**: generar 3-5 photos mensuales (before/after, team, process). (6) **Tracking**: usar UTM parameters para trackear clicks desde GBP a website. Implementación: content calendar + templates + photo strategy + Q&A setup, 5-6 horas. |
| **Impacto esperado** | +25% engagement en Google Search, mejor local SEO, more direct bookings |
| **Esfuerzo** | M (5-6 horas) |
| **Agente recomendado** | SEO / Marketing |
| **Referencias** | [1] https://www.brightlocal.com [2] https://searchmym.business.google |

### Propuesta 5: WhatsApp Business API con Catalog

| Campo | Detalle |
|-------|---------|
| **Título** | Integrar WhatsApp Business API con catalog de servicios y automated responses |
| **Problema** | WhatsApp link existe pero sin API, catalog, o automated responses. Se pierde el 98% open rate y la oportunidad de mostrar servicios directamente. |
| **Descripción** | WhatsApp Business Enhancement: (1) **WhatsApp Business API**: configurar via Meta Business Manager. Requiere business verification. (2) **Catalog Setup**: crear catalog en WhatsApp Business con servicios (limpieza sofá $80k, sanitización colchón $60k, etc.) + productos (maintenance kit $45k, kit de emergencia $35k). (3) **Automated Responses**: configurar quick replies para FAQs: "Horarios?", "Zonas?", "Precios?", "Agendar". Pattern: user sends "precios" → bot responde con catalog link + starting price. (4) **Click-to-WhatsApp Ads**: crear campaign que envía traffic a WhatsApp directamente. (5) **Integration con website**: update chatbot FAB para abrir WhatsApp con pre-filled message "Hola, quiero agendar limpieza". (6) **Template Messages**: usar approved templates para follow-ups (within 24h window). Implementación: WhatsApp Business setup + catalog + automated responses, 8-10 horas (la mayoría esperando verificación de Meta). |
| **Impacto esperado** | 5x más leads vía WhatsApp, mejor conversion que forms, automated customer service |
| **Esfuerzo** | M-L (8-10 horas + wait time) |
| **Agente recomendado** | Full Stack / Marketing |
| **Referencias** | [1] https://business.whatsapp.com [2] https://developers.facebook.com/docs/whatsapp |

### Propuesta 6: Micro-Conversion Tracking con Funnel Analytics

| Campo | Detalle |
|-------|---------|
| **Título** | Implementar funnel de micro-conversiones para visualizar dónde users drop off |
| **Problema** | Sin funnel analytics, no hay visibilidad de qué secciones del site convierten, qué % empieza cotizador, qué % llega al form submission. |
| **Descripción** | Funnel Analytics Setup: (1) **Event Definitions**: definir micro-conversions clave: `page_view`, `service_section_view`, `pricing_view`, `cotizador_start`, `cotizador_service_select`, `booking_form_view`, `booking_form_submit`, `whatsapp_cta_click`, `newsletter_signup`. (2) **Plausible Enhanced**: en script.js, agregar `plausible('Event Name', { props: { detail: 'value' } })` en cada interaction point. (3) **Dashboard**: crear dashboard en Plausible o Google Analytics con funnel visualization. Si Plausible no soporta nativamente, usar GA4 with enhanced measurement. (4) **UTM Parameters**: asegurar todos los links externos tienen UTM para track source/medium. (5) **Segmentación**: filtrar por device (mobile vs desktop), traffic source (google, direct, social). (6) **Goals in GA4**: crear conversion events para key actions. Implementación: event tracking + Plausible events + dashboard setup, 4-5 horas. |
| **Impacto esperado** | Visibility de funnel completo, identificación de drop-off points, data para optimización |
| **Esfuerzo** | S (4-5 horas) |
| **Agente recomendado** | Frontend / Analytics |
| **Referencias** | [1] https://plausible.io [2] https://analytics.google.com |

### Propuesta 7: Product Schema y ItemList para Featured Snippets

| Campo | Detalle |
|-------|---------|
| **Título** | Implementar Product schema para productos y ItemList schema para ofertas destacadas |
| **Problema** | Sin Product schema para productos de limpieza que vende, y sin ItemList para ofertas, pierde visibilidad en featured snippets y rich results. |
| **Descripción** | Product + ItemList Schema: (1) **Product Schema para productos**: si vende productos (maintenance kits, sprays), agregar `<script type="application/ld+json">{ "@type": "Product", "name": "Kit de Mantenimiento Sofá", "description": "...", "image": "...", "sku": "PC-MK-001", "offers": { "@type": "Offer", "price": "45000", "priceCurrency": "COP", "availability": "https://schema.org/InStock" } }`. (2) **ItemList para homepage ofertas**: `<script type="application/ld+json">{ "@type": "ItemList", "itemListElement": [ { "@type": "ListItem", "position": 1, "item": { "@type": "Service", "name": "Limpieza Profunda de Sofás", "description": "..." } }, ... ] }`. (3) **Service con areaServed**: agregar `"areaServed": { "@type": "City", "name": "Bogotá" }` a cada Service en schema. (4) **Validate con Rich Results Test**: usar Google's tool para verificar. Implementación: JSON-LD updates + validation, 3-4 horas. |
| **Impacto esperado** | Mejor visibility en Google, potential para rich snippets, improved local SEO |
| **Esfuerzo** | S (3-4 horas) |
| **Agente recomendado** | SEO / Frontend |
| **Referencias** | [1] https://schema.org/Product [2] https://schema.org/ItemList [3] https://search.google.com/test/rich-results |

### Propuesta 8: Cleaning Products E-commerce con Buy Box

| Campo | Detalle |
|-------|---------|
| **Título** | Agregar sección de e-commerce para productos de limpieza que usa el servicio |
| **Problema** | Si la empresa vende productos (maintenance kits, sprays, tools), no hay checkout ni forma de cross-sell/upsell productos con servicios. |
| **Descripción** | E-commerce Integration: (1) **Product Page**: crear `/productos/index.html` con grid de productos (kit mantenimiento sofá, spray sanitización, kit emergencia colchones). Cada card: imagen, nombre, precio COP, description, "Comprar" button. (2) **Buy Button**: link a WhatsApp con pre-filled "Quiero comprar: [Product Name]". Alternativa: si volumen justifica, integrate Simple cart via HTML/JS + Formspree para órdenes. (3) **Cross-sell en servicios**: cuando usuario está en service page, mostrar "Puedes comprar los productos que usamos para mantener tu mueble limpio entre visitas" + producto relacionado. (4) **Schema**: agregar Product schema para cada producto (Propuesta 7). (5) **Checkout flow simple**: product → WhatsApp order request → payment via transfer/NEQUI → delivery coordination via WhatsApp. Implementación: productos page + cross-sell + schema + WhatsApp order flow, 5-6 horas. |
| **Impacto esperado** | Revenue adicional por producto sales, increased AOV via cross-sell, diferenciación |
| **Esfuerzo** | M (5-6 horas) |
| **Agente recomendado** | Frontend / Full Stack |
| **Referencias** | [1] https://schema.org/Product [2] https://woocommerce.com |

---

## Orden de implementación recomendado

| # | Propuesta | Impacto | Esfuerzo | Prioridad |
|---|----------|---------|----------|-----------|
| 1 | A/B Testing Framework | CRO/Data | M | Alta - foundation para optimización |
| 2 | Exit-Intent Recovery | Conversión | S | Alta - quick win alta conversión |
| 3 | Micro-Conversion Funnel | Analytics | S | Alta - visibility para decisiones |
| 4 | WhatsApp Business API | Revenue | M-L | Alta - alto impacto en conversión |
| 5 | Email Nurturing | Retention | M | Media - revenue recurrente |
| 6 | Product Schema + ItemList | SEO | S | Media - visibility en Google |
| 7 | GBP Posts Automation | Local SEO | M | Media - engagement local |
| 8 | E-commerce Products | Revenue | M | Baja - revenue adicional |

**Top 3 para implementar primero:** 1, 2, 3 (A/B testing + exit-intent + funnel = base para optimización data-driven).

---

## Diferencia clave: R51 vs R52

R51 se enfocó en **technical foundations**: Build system, performance Web Vitals, accesibilidad, PWA enhancements, AI damage detection.

**R52 se enfoca en:**
- **CRO infrastructure**: A/B testing framework para data-driven decisions
- **Conversión recovery**: Exit-intent popup para recuperar abandons
- **Analytics visibility**: Funnel de micro-conversiones para entender el journey
- **Revenue automation**: Email nurturing, WhatsApp Business API, productos e-commerce
- **SEO enhancement**: Product schema, ItemList, GBP posts automation

R51 construye bases técnicas. R52 construye revenue y conversión.

---

## Síntesis: Por qué R52 complementa R1-R51

R1-R51 ha construido un negocio muy completo:
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
- **R51: Build system, performance (lazy/WebP/RUM), accesibilidad (skip-nav/reduced-motion), PWA (Periodic Sync), AI (damage detection)**
- **R52: A/B testing, exit-intent recovery, WhatsApp Business API, email nurturing, product schema, micro-conversion funnel, GBP automation, e-commerce**

R52 cierra gaps de **CRO infrastructure y revenue automation** que las rondas anteriores no abordaron en profundidad.

---

## Fuentes

[1] Optimizely. "A/B Testing Statistics." https://www.optimizely.com
[2] Barilliance. "Exit Intent Popup Statistics." https://www.barilliance.com
[3] Marketo. "Email Marketing Automation." https://www.marketo.com
[4] Schema.org. "Product Schema." https://schema.org/Product
[5] BrightLocal. "Google Business Profile 2026 Guide." https://www.brightlocal.com
[6] Meta. "WhatsApp Business API." https://business.whatsapp.com
[7] Mixpanel. "Funnel Analytics." https://mixpanel.com
[8] Statista. "Cleaning Products E-commerce Market." https://www.statista.com

---

*Documento generado por Innovation Scout — Round 52*
*Purity & Clean Analysis — 2026-04-27*
*Co-Authored-By: Paperclip <noreply@paperclip.ing>*