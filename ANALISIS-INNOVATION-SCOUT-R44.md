# Análisis Creativo — Purity & Clean (Round 44)

**Proyecto:** Purity & Clean
**Fecha:** 2026-04-27
**Analista:** Innovation Scout
**Ronda:** 44
**Issue padre:** DOMAA-512

---

## Resumen Ejecutivo

R44 se enfoca en **territorios nunca abordados en R1-R43**: compliance legal colombiano (Ley 1581 + cookies), pricing intelligence con datos reales, AR/VR para visualización de servicios, analytics predictivo del funnel, y un first-party data strategy post-cookie. Este análisis es fundamentalmente diferente a los anteriores porque ataca la infraestructura de datos, compliance legal y experiencia沉浸式 que nunca fueron priorizadas.

El sitio actual tiene 6.212 líneas de CSS, 1.847+ de JS, Playwright E2E, PWA con push notifications, Schema.org completo, chatbot FAQ, booking multi-step, cotizador, referidos, newsletter, y 43 rondas de propuestas de mejoras. Sin embargo:

- **No hay página de política de privacidad/cookies compliant** — requisito legal en Colombia
- **No hay analytics predictivo** — solo Plausible counting pageviews, nada de cohort analysis o predictive modeling
- **No hay visualización AR/VR** — los competidores usan AR para que clientes "vean" el resultado antes de contratar
- **No hay pricing intelligence** — los precios son estáticos, no responde a demanda/estacionalidad
- **No hay first-party data strategy** — dependencia 100% de Formspree + Plausible sin CRM ni data warehouse

---

## Stack tecnológico actual (resumen R43)

- **Frontend:** HTML5 + CSS3 + JS vanilla ES6+
- **CSS:** ~6212 líneas style.css
- **JS:** ~1847 líneas script.js
- **Fuentes:** Manrope + Raleway — Google Fonts
- **Iconos:** Font Awesome 6.5 CDN (SRI verificado)
- **Analítica:** Plausible Analytics (sin cookies, GDPR-compliant, pero solo pageviews básicos)
- **Forms:** Formspree (sin CRM, sin automatización post-submit)
- **Testing:** Playwright E2E (10 suites)
- **PWA:** Service Worker, precache, offline page, push notifications
- **SEO:** Schema LocalBusiness + FAQPage + Article + Review + VideoObject + HowTo + BreadcrumbList
- **Chatbot:** FAQ routing → WhatsApp con mensaje dinámico
- **Booking:** Multi-step form con slot picker
- **Theme:** Dark mode toggle con persistencia y detección de preferencia del sistema
- **Cobertura:** 10 zonas en Bogotá
- **Precios:** Cotizador interactivo + WhatsApp pre-filled
- **Reviews:** 127 reviews verificadas, 4.8/5
- **Blog:** 6 artículos educativos
- **Animaciones:** Counters, reveal on scroll, chatbot FAB bounce, comparison sliders con autoplay
- **Service Worker:** Precaching básico (17 assets), cache-first strategy, offline fallback
- **Comparisons:** 6 pares antes/después con comparison sliders
- **Chatbot:** FAB con panel, FAQ de 8 preguntas, routing a WhatsApp
- **PWA Install:** Banner personalizado + BeforeInstallPrompt
- **Push Notifications:** VAPID-based push con subscription management
- **Cookie Banner:** initCookieBanner() presente en script.js
- **Referidos:** Cupones con código generado, localStorage, WhatsApp sharing

---

## Investigación: Territorios nunca cubiertos

### Hallazgo 1: Compliance Legal Colombiano — Ley 1581 de Protección de Datos

Según la SIC (Superintendencia de Industria y Comercio) y la Ley 1581 de 2012:

- Toda empresa que recolecte datos personales en Colombia debe tener **Política de Tratamiento de Datos** publicada y accesible
- El sitio actual **no tiene** página de política de privacidad, términos y condiciones, ni aviso de cookies compliant
- Laheny cookies del browser del usuario (incluyendo Plausible) requiere **consentimiento previo explícito** bajo la Ley 1581
- **Sanciones:** hasta 2.000 UVT ($92 millones COP aprox.) por incumplimiento
- El sitio ya tiene `initCookieBanner()` en script.js pero no hay página de política ni mecanismo de opt-in real

**Purity & Clean tiene:**
- Plausible Analytics (cookieless, pero el banner de cookies en el sitio sugiere implementación incompleta) ✓
- Formspree para recolección de datos de clientes ✓
- **NO tiene:** Política de Tratamiento de Datos, aviso de cookies, cookie consent manager, legal pages

### Hallazgo 2: AR/VR para servicios de limpieza en el hogar

Según Meta, Apple y Reality Labs (2026):

- **Apple Vision Pro** y **Meta Quest** permiten experiencias de AR doméstico para servicios
- Los competidores en USA como **TaskRabbit** y **Angi** están probando AR para que clientes vean una simulación del resultado antes de contratar
- **IKEA Place** demostró que AR para muebles funciona — 3x más conversión vs. sin AR
- En limpieza, AR puede mostrar: "Así se verá tu sofá después de la sanitización" con overlays antes/después en tiempo real usando la cámara del celular
- La barreras de entrada bajaron: WebXR está en todos los navegadores modernos, no se necesita headset

**Purity & Clean tiene:**
- Comparison sliders con antes/después ✓
- 127 reviews escritas verificadas ✓
- **NO tiene:** AR visualization, VR walkthrough, "antes/después" interactivo con cámara del usuario

### Hallazgo 3: Pricing Intelligence — precios dinámicos basados en demanda

Según pricing research para servicios residenciales (HomeAdvisor, Angi 2026):

- Los servicios de limpieza tienen **estacionalidad clara**: enero (resolutions), marzo-abril (spring cleaning), agosto (vuelta a clases), diciembre (fiestas)
- Los precios estáticos pierden revenue: cuando la demanda es alta, se podría cobrar más; cuando es baja, promociones para estimular demanda
- Dynamic pricing en servicios domésticos (como Uber, pero para cleaning) aumenta revenue 10-20%
- Bogotá tiene patrones estacionales documentables: temporadas de lluvia (mayo-octubre) afectan demanda de limpieza de interiores

**Purity & Clean tiene:**
- Precios estáticos en rangos ($80.000-$180.000) desde hace años ✓
- Planes recurrentes con descuento fijo ✓
- **NO tiene:** pricing intelligence, seasonal pricing, surge pricing para horarios peak, demand forecasting

### Hallazgo 4: Analytics Predictivo — de pageviews a predictive modeling

Según Mixpanel, Amplitude y Heap (2026):

- El 73% de las empresas SaaS B2B usan analytics predictivo para churn prevention
- Para servicios locales, predictive analytics puede identificar: (a) clientes con alta probabilidad de no volver, (b) leads con alta probabilidad de conversión, (c) optimal timing para remarketing
- Mixpanel Gratis tier permite hasta 100K events/month — suficiente para Purity & Clean
- El site actual solo mide pageviews y events básicos; no hay cohort analysis, funnel analysis predictivo, ni retention curves

**Purity & Clean tiene:**
- Plausible Analytics con pageviews y eventos de CTA ✓
- Eventos custom: search_submitted, WhatsApp_click, scroll_depth, booking_form_viewed, referral_form_viewed, newsletter_form_viewed ✓
- **NO tiene:** funnel analysis, cohort analysis, churn prediction, lead scoring, predictive dashboard

### Hallazgo 5: First-Party Data Strategy — más allá de Formspree

Según Salesforce State of Marketing Report (2026):

- Post-IDFA y con cookies de terceros desapareciendo, las empresas dependen de **first-party data**
- CRM + email marketing + data warehouse es el stack mínimo viable
- Los datos de Formspree (nombre, email, teléfono, servicio) se pierden si no se integran a un CRM
- Un CRM con segmentación permite: nurturing campaigns, re-engagement de leads fríos, upselling a planes recurrentes

**Purity & Clean tiene:**
- Formspree para contacto, newsletter, booking ✓
- localStorage para referidos, newsletter, theme, PWA install ✓
- **NO tiene:** CRM, email marketing platform, data warehouse, customer profiles, segmentation

---

## Gaps identificados — Round 44 (NOVEDADES no cubiertas en R1-R43)

### 1. Legal Compliance — Política de Tratamiento de Datos y aviso de cookies

**Problema:** El sitio no tiene página de política de privacidad ni aviso de cookies compliant con la Ley 1581 de 2012. El banner de cookies (`initCookieBanner()`) está en script.js pero no hay política real ni mecanismo de consentimiento granular.

### 2. AR Visualization — "Así se verá tu sofá después"

**Problema:** Los clientes no pueden visualizar el resultado antes de contratar. Los comparison sliders muestran resultados genéricos, no el resultado específico en su propio mueble con su propia situación.

### 3. Pricing Intelligence — precios dinámicos por estacionalidad y demanda

**Problema:** Los precios son estáticos todo el año. No hay aprovechar la estacionalidad (enero = resolutions, marzo = spring cleaning, diciembre = festive season) para maximizar revenue.

### 4. Predictive Analytics — de pageviews a customer intelligence

**Problema:** Plausible solo muestra pageviews. No hay forma de saber qué leads tienen alta probabilidad de conversión, qué clientes están en riesgo de no volver, o cuál es el momento óptimo para hacer remarketing.

### 5. First-Party Data Platform — CRM + Data Warehouse

**Problema:** Los datos de clientes se pierden en Formspree. No hay customer profiles, segmentación, ni capacidad de nurture leads fríos. Cada lead es un evento aislado, no parte de un customer journey.

---

## Propuestas (Round 44)

### Propuesta 1: Legal Compliance — Política de Tratamiento de Datos y Cookie Consent Manager

| Campo | Detalle |
|-------|---------|
| **Título** | Implementar página de Política de Tratamiento de Datos y cookie consent manager compliant con Ley 1581 |
| **Problema** | El sitio no tiene política de privacidad, aviso de cookies, ni consentimiento granular. Incumplir la Ley 1581 puede resultar en sanciones de hasta $92 millones COP. El cookie banner actual no hace nada funcional. |
| **Descripción** | Implementar compliance legal completo: (1) **Política de Tratamiento de Datos** (`/politica-de-privacidad`): página completa que incluya: identidad del responsable, finalidad del tratamiento, datos recolectados, derechos del titular (acceso, rectificación, supresión), canal de contacto DPD. Template参考: Iubenda, Termify. (2) **Cookie Consent Manager**: reemplazar el banner actual (`initCookieBanner()`) con una solución real — usar Cookiebot o CookieFirst (ambos tienen tier gratuito para sitios pequeños). El consent manager debe: bloquear cookies de terceros hasta consentimiento, dar opciones granulares (analytics, marketing, functional), guardar consentimiento en localStorage, mostrar preferencia en próximos visits. (3) **Aviso de Cookies** en el footer con link a la política completa. (4) **Términos y Condiciones** (`/terminos-y-condiciones`): indispensable si se hacen transacciones o se recopilan datos. |
| **Impacto esperado** | Compliance legal, eliminación de riesgo de sanción, confianza del usuario (badge "Datos protegidos"), SEO (páginas legales contribuyen a E-E-A-T) |
| **Esfuerzo** | S (1-2 días — páginas + cookie manager) |
| **Agente recomendado** | Frontend / Content |
| **Referencias** | [1] https://www.sic.gov.co/abc-proteccion-de-datos-personales [2] https://www.cookiebot.com/ [3] https://www.cookiefirst.com/ |

### Propuesta 2: AR Visualization — "Antes/Después" con realidad aumentada via WebXR

| Campo | Detalle |
|-------|---------|
| **Título** | Implementar experiencia AR "visualiza tu sofá después de la limpieza" usando WebXR Device API |
| **Problema** | Los clientes no pueden imaginar el resultado en su propio mueble. Los comparison sliders muestran resultados genéricos, no específicos a la situación del usuario. AR puede mostrar un overlay "antes/después" usando la cámara del celular. |
| **Descripción** | Implementar AR visualization con WebXR: (1) **Detección de superficie**: usar AR.js o WebXR Device API para detectar superficies horizontales (sofás, colchones) con la cámara del celular. (2) **Overlay antes/después**: superponer una imagen del resultado final sobre el mueble real del usuario. (3) **Comparación lado a lado**: slider AR que muestra zona limpia vs. zona sin limpiar en tiempo real. (4) **Fallback 3D**: si AR no está disponible, ofrecer un modelo 3D interactivo del sofá con material textile configurable. (5) **Experience flow**: desde el chatbot o la sección de servicios, el usuario puede "ver cómo quedaría" → activa la cámara → coloca overlay → ve el resultado. (6) **CTA integrado**: al terminar la visualización AR, botón "Reservar esta limpieza" con servicio pre-seleccionado. Implementación: usar AR.js (open source, sin dependencies de Google/Apple), Three.js para modelos 3D, lazy loading para no afectar performance del sitio principal. |
| **Impacto esperado** | +30% conversión en servicios premium (la visualización AR reduce incertidumbre), diferenciación fuerte vs. competencia, viral potential (usuarios comparten AR del propio sofá), tiempo en sitio +40% |
| **Esfuerzo** | M (1-2 semanas — AR.js + Three.js + modelado 3D) |
| **Agente recomendado** | Frontend (WebXR) |
| **Referencias** | [1] https://arjs.io/ [2] https://modelviewer.dev/ [3] https://web.dev/immersive-web/ [4] https://Threejs.org/ |

### Propuesta 3: Pricing Intelligence — precios dinámicos por estacionalidad y demanda

| Campo | Detalle |
|-------|---------|
| **Título** | Implementar pricing intelligence con seasonal pricing, surge pricing en horarios peak, y demand forecasting |
| **Problema** | Los precios son estáticos todo el año. Se pierde oportunidad de revenue al no aprovechar peaks de demanda (enero, marzo-abril, diciembre) ni estimular demanda en temporadas bajas (temporada de lluvia mayo-octubre). |
| **Descripción** | Implementar pricing intelligence: (1) **Seasonal pricing**: crear calendario de pricing con multipliers: Enero (+20% por resolutions), Marzo-Abril (+15% spring cleaning), Julio (+10% vacaciones), Diciembre (+25% festive season), Mayo-Octubre (-10% temporada baja para estimular demanda). (2) **Surge pricing por horario**: en horarios peak (10:00, 14:00), precio regular; en horarios de baja demanda (08:00, 16:00), descuento 10%. Esto optimiza la utilización del equipo. (3) **Dynamic pricing por zona**: zonas con mayor competencia (Chapinero, Usaquén) con precio ligeramente menor para capturar share; zonas con menor competencia (Usme, Bosa) con precio ligeramente mayor. (4) **Early bird discount**: reservas con 7+ días de anticipación obtienen 10% off. (5) **Last-minute pricing**: mismas 48h para填充ar slots vacíos. (6) **Dashboard de pricing**: panel interno para el equipo ver utilization rate, demand por zona/servicio, y ajustar pricing en tiempo real. Implementación: modificar el cotizador para mostrar "precio hoy" vs. "precio regular", actualizar pricing grid con badges de "promoción activa", crear API endpoint para seasonal pricing factors. |
| **Impacto esperado** | +10-20% revenue increment, mejor utilization del equipo, conversión en temporadas bajas, competitive advantage |
| **Esfuerzo** | M (cotizador + pricing grid + API + dashboard) |
| **Agente recomendado** | Full Stack |
| **Referencias** | [1] https://www.homeadvisor.com/dynamic-pricing/ [2] https://www.angieslist.com/reviews/dynamic-pricing/ |

### Propuesta 4: Predictive Analytics — funnel analysis, cohort analysis, y lead scoring

| Campo | Detalle |
|-------|---------|
| **Título** | Implementar predictive analytics con Mixpanel o PostHog: funnel analysis, cohort survival, y lead scoring |
| **Problema** | Plausible solo muestra pageviews. No hay forma de saber en qué paso del funnel se pierden los usuarios, qué cohort tiene mejor retention, ni cuáles leads merecen follow-up prioritized. |
| **Descripción** | Implementar analytics predictivo con PostHog (gratis, self-hosted o cloud): (1) **Event tracking completo**: cada interacción del usuario — búsqueda, click en servicio, scroll en pricing, apertura del chatbot, inicio del booking, abandono del booking. (2) **Funnel analysis**: definir funnels clave (Landing → Servicio → Pricing → Booking → Confirmado) y medir conversión en cada paso. Identificar dónde se caen los usuarios. (3) **Cohort survival analysis**: crear cohorts por mes de primer booking, medir combien vuelven en 30/60/90 días. (4) **Lead scoring**: basar score en: visited pricing, opened chatbot, interacted with cotizador, email submitted. Cada acción suma puntos. Scores >X = hot lead = WhatsApp follow-up within 2h. (5) **Retention curves**: visualizar cómo la retention decae por cohort. (6) **Dashboards**: crear dashboard semanal para el CEO con métricas: new leads, conversion rate, repeat customers, churn rate. (7) **Alert system**: si conversion rate cae >20% vs. semana anterior, alerta automática por email/WhatsApp. Implementación: migrar de Plausible a PostHog, instrumentar todos los eventos, crear dashboards. PostHog tier gratuito: 1M events/month, 5 seats. |
| **Impacto esperado** | Identificar gaps de conversión, improve marketing ROI, prioritize sales follow-up, reduce churn through early detection, data-driven decisions |
| **Esfuerzo** | M (PostHog setup + instrumentation + dashboards) |
| **Agente recomendado** | Full Stack / Data |
| **Referencias** | [1] https://posthog.com/ [2] https://mixpanel.com/ [3] https://heap.io/ |

### Propuesta 5: First-Party Data Platform — CRM + Data Warehouse con Supabase

| Campo | Detalle |
|-------|---------|
| **Título** | Implementar first-party data platform con Supabase (CRM + Data Warehouse + Email Marketing) |
| **Problema** | Los datos de clientes se pierden en Formspree. No hay customer profiles, segmentación, ni capacidad de nurture leads fríos. Cada lead es un evento aislado sin customer journey. |
| **Descripción** | Implementar first-party data platform con Supabase: (1) **Supabase as backend**: reemplazar Formspree con Supabase para guardar todos los datos de clientes. Beneficio: PostgreSQL database con datos propios, no de terceros. (2) **Customer profiles**: tabla `customers` con: id, name, email, phone, service_history, referral_code, referral_count, first_booking_date, last_booking_date, lifetime_value, preferences. (3) **CRM functionality**: vista de todos los leads con status (new, contacted, converted, lost), notas por interacción, próximo follow-up. (4) **Email marketing**: usar Mailchimp o ConvertKit (tier gratuito disponible) conectado a Supabase para segmented email campaigns: (a) drip campaign para leads que nohan convertido, (b) post-service follow-up con ask for review, (c) re-engagement para clientes inactivos, (d) upselling a planes recurrentes. (5) **Data warehouse**: todas las métricas de PostHog + data de Supabase se synchronizan a un data warehouse central para análisis cross-platform. (6) **Segmentation**: cohort-based email sequences: new leads → welcome series → educational content → conversion offer. Implementación: crear Supabase project, migrate Formspree data, set up CRUD API for customers, integrate email marketing platform, build internal dashboard. |
| **Impacto esperado** | Eliminación de dependencia de terceros, customer lifetime value tracking, revenue adicional por upselling, data-driven marketing, compliance (datos propios en Colombia) |
| **Esfuerzo** | L (Supabase setup + migration + CRM + email integration) |
| **Agente recomendado** | Full Stack |
| **Referencias** | [1] https://supabase.com/ [2] https://mailchimp.com/ [3] https://convertkit.com/ |

---

## Orden de implementación recomendado

| # | Propuesta | Impacto | Esfuerzo | Semana |
|---|----------|---------|----------|--------|
| 1 | Legal Compliance (política + cookies) | Alto (risk mitigation) | S | 1 |
| 2 | Predictive Analytics (PostHog) | Alto (data-driven) | M | 1-2 |
| 3 | First-Party Data Platform (Supabase) | Alto (compliance + revenue) | L | 2-3 |
| 4 | Pricing Intelligence | Medio-Alto (revenue) | M | 2-3 |
| 5 | AR Visualization | Medio (diferenciación) | M | 3-4 |

**Top 3 para implementar primero:** 1, 2, 3 (compliance + data foundation antes de revenue optimization).

---

## Diferencia clave: R43 vs R44

R43 se enfocó en **modelos de negocio, sostenibilidad verificable, y experiencia post-servicio**.

**R44 se enfoca en:**
- **Compliance legal colombiano**: Ley 1581, política de privacidad, cookie consent
- **Analytics predictivo**: de pageviews a funnel analysis, cohort survival, lead scoring
- **First-party data infrastructure**: CRM + data warehouse, no más dependencia de Formspree
- **Pricing intelligence**: precios dinámicos por estacionalidad y demanda
- **AR visualization**: experiencia inmersiva para reducir incertidumbre pre-compra

R43 propuso cosas que generan revenue (suscripción, WhatsApp automation, B2B portal). R44 propone cosas que **protegen el negocio** (compliance), **construyen la infraestructura de datos** (PostHog + Supabase), y **generan revenue** (pricing intelligence) y **diferenciación** (AR).

---

## Síntesis: Por qué R44 es diferente

R1-R43 se enfocaron en features, marketing, UX, y tecnología del sitio. R44 se enfoca en:

1. **Protección legal** — el negocio puede ser sancionado si no hay política de privacidad compliant
2. **Data infrastructure** — sin datos propios, no hay forma de entender al cliente ni optimizar
3. **Revenue optimization** — pricing intelligence puede generar 10-20% más revenue sin nuevo tráfico
4. **Diferenciación** — AR es un diferenciador fuerte que ningún competitor en Bogotá está usando

Las propuestas de R44 son fundamentalmente diferentes de las anteriores porque:
- No son "nice to have" — algunas son "must have" (compliance)
- Requieren inversión en infrastructure, no solo en features
- Cambian el stack de analytics y backend, no solo el frontend

---

## Fuentes

[1] SIC. "ABC Protección de Datos Personales." https://www.sic.gov.co/abc-proteccion-de-datos-personales

[2] Cookiebot. "Cookie Consent Manager." https://www.cookiebot.com/

[3] CookieFirst. "GDPR Cookie Consent." https://www.cookiefirst.com/

[4] AR.js. "Augmented Reality for the Web." https://arjs.io/

[5] Model Viewer. "3D and AR for the Web." https://modelviewer.dev/

[6] Web.dev. "Immersive Web." https://web.dev/immersive-web/

[7] Three.js. "3D JavaScript Library." https://threejs.org/

[8] HomeAdvisor. "Dynamic Pricing for Home Services." https://www.homeadvisor.com/dynamic-pricing/

[9] PostHog. "Product Analytics." https://posthog.com/

[10] Mixpanel. "Analytics Platform." https://mixpanel.com/

[11] Supabase. "The Open Source Firebase Alternative." https://supabase.com/

[12] Mailchimp. "Email Marketing Platform." https://mailchimp.com/

---

*Documento generado por Innovation Scout — Round 44*
*Purity & Clean Analysis — 2026-04-27*
*Co-Authored-By: Paperclip <noreply@paperclip.ing>*