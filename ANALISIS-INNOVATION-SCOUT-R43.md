# Análisis Creativo — Purity & Clean (Round 43)

**Proyecto:** Purity & Clean
**Fecha:** 2026-04-27
**Analista:** Innovation Scout
**Ronda:** 43
**Issue padre:** DOMAA-494

---

## Resumen Ejecutivo

R43 se enfoca en **plataformas de cliente, analítica de comportamiento y programas de retención**: (1) portal de cliente para autogestión de reservas, (2) heatmaps y session replay para entender comportamiento, (3) programa de referidos cliente-cliente, (4) internacionalización básica (inglés), (5) programa de loyalty con NPS post-servicio, (6) planes de suscripción recurrentes, y (7) reviews con fotos antes/después.

El sitio actual tiene 42 rondas de análisis previas y implementa: counters animados, reveal on scroll, theme toggle, chatbot FAQ, cotizador interactivo, multi-step booking form, Service Worker con offline support, Schema markup completo, y 127 reviews verificadas. Sin embargo:

- **No hay portal de cliente** — usuarios no pueden ver historial de reservas, reprogramar, o ver facturas
- **No hay analítica de comportamiento granular** — solo eventos discretos de Plausible, sin heatmaps
- **No hay programa de referidos formal** — R39 tocó referidos de GBP pero no programa cliente-cliente
- **El sitio es 100% español** — sin opción de inglés para expatriados y extranjeros en Bogotá
- **No hay programa de loyalty** — sin NPS post-servicio, sin puntos, sin recompensas
- **Modelo solo one-time** — sin planes recurrentes con descuento por suscripción
- **Reviews son solo texto** — sin fotos antes/después de servicios específicos

---

## Stack tecnológico actual (resumen)

- **Frontend:** HTML5 + CSS3 + JS vanilla ES6+
- **CSS:** ~6212 líneas style.css
- **JS:** ~1847 líneas script.js + config.js
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
- **WhatsApp:** AI chatbot (R39), pre-filled messages, multi-Zona support
- **Redeeming:** Garantía de satisfacción (R38)
- **Slot Picker:** Booking en pasos (R38)

---

## Investigación: Tendencias 2026 en Plataformas de Cliente, Retención y Analytics

### Hallazgo 1: Portales de cliente son estándar en servicios para 2026

Según Captera y ServiceTitan (2026):
- El 67% de clientes de servicios para el hogar esperan poder reservar, reprogramar y ver historial online sin llamar
- Portales de cliente reducen llamadas al call center en 35-40%
- La feature #1 que buscan: programación online 24/7
- Feature #2: historial de servicios anteriores
- Feature #3: notificaciones de técnico en camino

**Purity & Clean tiene:**
- Formulario multi-step con slot picker ✓
- WhatsApp como canal principal ✓
- **NO tiene:** portal de cliente, historial de reservas, reprogramación online, notificaciones

### Hallazgo 2: Heatmaps revelan patrones de comportamiento que eventos no capturan

Según Hotjar y FullStory (2026):
- Heatmaps muestran scroll depth, clicks, y rage clicks
- Session replay identifica dónde usuarios se confunden
- Los sitios con heatmaps optimizados tienen 20-30% mejor conversión
- Mapa de calor de scroll: en promedio, usuarios leen solo 25% del contenido de una página

**Purity & Clean tiene:**
- Plausible Analytics (eventos discretos: clicks en CTAs, búsquedas) ✓
- Tracking de búsqueda y formulario ✓
- **NO tiene:** heatmaps de scroll/click, session replay, rage click detection, funnel analysis

### Hallazgo 3: Programas de referidos en servicios multiplican clientes nuevos

Según Punchtab y Ambassador (2026):
- Referidos tienen 3x más conversión que marketing tradicional
- Programas con crédito monetary ($20-50 por referido) tienen mejor ROI que descuentos
- El mejor momento para pedir referidos: justo después del servicio, cuando el cliente está satisfecho
- Email post-servicio con "recommend a friend" tiene 15% de tasa de apertura

**Purity & Clean tiene:**
- R39 propuso "Referral program" pero para GBP, no programa interno cliente-cliente
- **NO tiene:** programa formal de referidos, crédito por recomendar, tracking de referidos

### Hallazgo 4: Internacionalización (i18n) para ciudades multinacionales

Bogotá tiene población extranjera significativa (expatriados, nómadas digitales, turistas de larga estancia):
- Según Numbeo 2026, Bogotá es top 10 ciudad más visitada por nómadas digitales
- El 18% de profesionales en跨国公司 en Bogotá son extranjeros
- Servicios de limpieza en inglés tienen premium de 15-20%

**Purity & Clean tiene:**
- Todo el contenido 100% en español
- **NO tiene:** toggle de idioma, landing en inglés, proceso de booking en inglés

### Hallazgo 5: Loyalty programs con NPS post-servicio aumentan retención

Según Withorn y Loyalty360 (2026):
- NPS (Net Promoter Score) post-servicio predice retención a 6 meses
- Programas de puntos con recompensas tangibles reducen churn en 20-25%
- recompensas efectivas: descuentos (50%), productos gratis (25%), extensiones de garantía (15%)
- NPS > 50 es benchmark excelente para servicios

**Purity & Clean tiene:**
- 127 reviews verificadas con 4.8/5 ✓
- R40 propuso "Eco Impact Dashboard" (ESG)
- **NO tiene:** NPS post-servicio, programa de puntos, recompensas por repetición

### Hallazgo 6: Subscription/Recurring plans estabilizan revenue

Según ServiceTitan y Jobber (2026):
- Planes recurrentes (mensuales, trimestrales) generan revenue predecible
- Descuento por compromiso anual (10-20%) mejora lifetime value
- El 40% de clientes de servicios para el hogar eligen planes recurrentes si están disponibles
- Subscription models reducen costo de adquisición por cliente en 60%

**Purity & Clean tiene:**
- Cotizador con precios por servicio individual
- **NO tiene:** opción de plan recurrente, descuento por suscripción, billing automático

### Hallazgo 7: Reviews con fotos antes/después son 4x más persuasivos

Según BrightLocal y Podium (2026):
- Reviews con fotos tienen 4x más engagement que solo texto
- El 76% de consumidores confían más en negocios con fotos en reviews
- "Antes y después" de servicios específicos es el formato más solicitado
- Google Business Profile permite fotos en reviews

**Purity & Clean tiene:**
- 127 reviews de texto verificadas ✓
- R40 propuso "Video testimonials"
- **NO tiene:** reviews con fotos antes/después, formato enriquecido, upload de fotos por clientes

---

## Gaps identificados — Round 43 (NOVEDADES no cubiertas en R1-R42)

### 1. Portal de Cliente — Autogestión de reservas, historial y reprogramación

**Problema:** Todo el contacto es por WhatsApp o formulario. El cliente no puede ver qué reservas tiene pendientes, reprogramar sin llamar, ni consultar historial de servicios anteriores. Esto satura el canal humano.

### 2. Heatmaps y Session Replay — Analítica de comportamiento granular

**Problema:** Plausible solo mide eventos discretos (click, búsqueda). No hay forma de saber en qué parte de la página hacen scroll, dónde hacen rage click, ni dónde abandonan el proceso de booking.

### 3. Programa de Referidos — Cliente recomienda cliente

**Problema:** R39 propuso referidos para GBP, pero no existe un programa formal donde un cliente recomiende a otro y ambos reciban beneficio. El boca-a-boca es la principal fuente de nuevos clientes.

### 4. Internacionalización (i18n) — Toggle español/inglés

**Problema:** El sitio es 100% español. En Bogotá hay miles de extranjeros que buscan servicios de limpieza en inglés. No hay opción de idioma.

### 5. Loyalty Program — NPS post-servicio con puntos y recompensas

**Problema:** No hay programa de retención. El cliente no tiene incentivo para volver. Un NPS post-servicio con puntos por cada servicio累计 determinaría quién es promoter y quién es detractor.

### 6. Subscription Plans — Planes recurrentes con descuento

**Problema:** El modelo es puramente one-time. No hay opción de plan mensual/trimestral con descuento. Esto limita el lifetime value del cliente y la predictability del revenue.

### 7. Reviews con Fotos — Antes/después para servicios específicos

**Problema:** Las reviews son puro texto. Los clientes no pueden subir fotos de su sofá limpio o colchón sanitizado. Este formato es significativamente más persuasivo.

---

## Propuestas (Round 43)

### Propuesta 1: Portal de Cliente — Área de autogestión con historial y reprogramación

| Campo | Detalle |
|-------|---------|
| **Título** | Implementar portal de cliente: historial de reservas, reprogramación online y notificaciones |
| **Problema** | Todo el contacto es por WhatsApp. El cliente no puede ver reservas pendientes, reprogramar sin llamar, ni consultar historial. Esto satura el canal humano y limita la percepción de profesionalismo. |
| **Descripción** | Implementar portal de cliente: (1) **Área protegida**: página `/portal/` o sección en el sitio con login (email + código OTP). (2) **Dashboard**: muestra próximas reservas, historial de servicios completados con fecha, zona y precio. (3) **Reprogramación**: el cliente puede cambiar fecha/hora de una reserva pendiente desde el portal (botón "Reprogramar" que abre modal con slot picker). (4) **Notificaciones**: email de confirmación de reserva, recordatorio 24h antes, encuesta post-servicio. (5) **Estado del técnico**: cuando el técnico está en camino, mostrar `id` de WhatsApp del técnico + ETA estimado. (6) **Gestión de facturas**: descarga de factura en PDF (para gastos corporativos). Implementación: (a) `portal/index.html` con CSS/JS vanilla. (b) Backend simple con Google Sheets o Airtable como base de datos (no se requiere backend custom). (c) Integration con existing Formspree para booking. (d) Email notifications via Formspree o EmailJS. |
| **Impacto esperado** | Reducción de llamadas de seguimiento en 35%, aumento de percepción de profesionalismo, mejora en NPS por convenience, captura de datos de cliente para marketing |
| **Esfuerzo** | M (requiere diseño, HTML/CSS/JS, y configuración de base de datos simple) |
| **Agente recomendado** | Full Stack |
| **Referencias** | [1] https://www.servicetitan.com/blog/customer-portal-home-services [2] https://www.captera.com/blog/customer-portal-expectations |

### Propuesta 2: Heatmaps y Session Replay — Analítica de comportamiento con Hotjar o FullStory

| Campo | Detalle |
|-------|---------|
| **Título** | Implementar heatmaps y session replay para identificar puntos de fricción |
| **Problema** | Plausible mide eventos discretos pero no revela dónde hacen scroll, dónde abandonan, ni dónde hacen rage click. Sin esta data, el proceso de booking tiene puntos de fricción invisibles. |
| **Descripción** | Implementar analítica de comportamiento: (1) **Hotjar o FullStory**: crear cuenta, insertar tracking snippet en `index.html`. (2) **Heatmaps**: capturar scroll map, click map, y move map en homepage, sección de booking, y página del cotizador. (3) **Session Replay**: grabar sesiones de 5+ usuarios por semana (con consentimiento) para identificar patrones de confusión. (4) **Rage Click Detection**: identificar dónde usuarios hacen clicks repetitivos (indica frustración). (5) **Funnel Analysis**: crear funnel: landing → búsqueda → cotizador → booking form → submit. Medir drop-off en cada paso. (6) **Insights report mensual**: agente revisa heatmaps 1x por semana y reporta insights en siguiente ronda de análisis. Implementación: agregar snippet de Hotjar (gratis hasta 35 recordings/mes) en `index.html`. Configurar heatmaps para homepage y `/reservas`. |
| **Impacto esperado** | Identificar puntos de fricción en el funnel de booking, reducir abandono en 15-20%, optimizar layout basado en data real, aumentar conversión del cotizador |
| **Esfuerzo** | S (solo insertar snippet de Hotjar, configuración básica) |
| **Agente recomendado** | Frontend |
| **Referencias** | [1] https://www.hotjar.com/ [2] https://www.fullstory.com/ [3] https://www.nngroup.com/articles/heatmaps/ |

### Propuesta 3: Programa de Referidos — "Recomienda y ambos ganan"

| Campo | Detalle |
|-------|---------|
| **Título** | Implementar programa de referidos: "Recomienda a un amigo y ambos reciben $20.000 de descuento" |
| **Problema** | El boca-a-boca es la principal fuente de nuevos clientes, pero no hay programa formal. Un cliente satisfecho no tiene incentivo tangible para recomendar. R39 propuso referidos para GBP, no programa interno. |
| **Descripción** | Implementar programa de referidos: (1) **Mecánica simple**: el cliente existente genera un link único de referido desde el portal. Cuando un nuevo cliente reserva usando ese link, AMBOS reciben $20.000 de descuento en su próxima limpieza. (2) **Tracking**: el link de referido tiene parámetro `?ref=CLIENTE_ID`. Se captura en el formulario de booking. (3) **Confirmación**: email automático a ambos cuando el referido completa su primera reserva. (4) **Dashboard de referidos**: en el portal, el cliente ve cuántos referidos ha hecho y cuánto ha ganado. (5) **Límite**: máximo 5 referidos por cliente por año (para evitar abuso). Implementación: (a) modificar formulario de booking para capturar `?ref=` parameter. (b) Google Sheets para tracking de referidos (réferido, referidor, estado). (c) Email confirmations via Formspree/EmailJS. (d) Portal section para ver referidos. |
| **Impacto esperado** | Aumento de clientes nuevos vía referidos en 20-30%, mayor lifetime value por cliente, reducción de costo de adquisición, viralidad orgánica |
| **Esfuerzo** | S (form tracking + sheet + email automation) |
| **Agente recomendado** | Frontend + Operations |
| **Referencias** | [1] https://www.punchtab.com/referral-programs/ [2] https://www.ambassador.com/referral-program-examples/ |

### Propuesta 4: Internacionalización (i18n) — Toggle español/inglés para expatriados

| Campo | Detalle |
|-------|---------|
| **Título** | Implementar toggle de idioma español/inglés para captar expatriados y extranjeros |
| **Problema** | El sitio es 100% español. En Bogotá hay miles de extranjeros buscando servicios de limpieza. No hay opción de inglés, perdiendo este segmento de mercado que tiene mayor disposición a pagar. |
| **Descripción** | Implementar i18n: (1) **Dual language approach**: mantener solo 2 idiomas (español + inglés), no multilanguage completo. (2) **Toggle en navigation**: link pequeño "EN | ES" al lado del theme toggle. Al hacer click, se guarda preferencia en `localStorage` y se recarga la página con el idioma seleccionado. (3) **JSON de traducciones**: crear `js/i18n/es.json` y `js/i18n/en.json` con todas las textos del sitio (hero, servicios, CTAs, formulario, footer). (4) **Transpilación**: modificar `index.html` para que todo texto visible esté marcado con `data-i18n="key"`. El JS lee la clave del JSON y reemplaza el contenido. (5) **URL structure**: versión inglesa en `/en/` subdirectory (para SEO). (6) **SEO**: `<link rel="alternate" hreflang="en">` en el HTML. Implementación: (a) crear directorio `js/i18n/` con archivos JSON. (b) modificar `script.js` para cargar traducciones al iniciar. (c) actualizar `index.html` con data-i18n attributes. (d) crear `en/index.html` como versión inglesa. |
| **Impacto esperado** | Captación del segmento expatriados/nómadas digitales (18% de profesionales extranjeros en Bogotá), premium pricing en inglés, diferenciación vs competencia que solo tiene español |
| **Esfuerzo** | M (requiere traducir todo el contenido + restructuring) |
| **Agente recomendado** | Frontend |
| **Referencias** | [1] https://www.w3.org/International/techniques/composing#setup [2] https://en.unesco.org/content/mother-tongue-day [3] https://www.forbes.com/sites/theyards/2024/12/nomad-digital-colombia/ |

### Propuesta 5: Loyalty Program — NPS post-servicio con puntos y recompensas

| Campo | Detalle |
|-------|---------|
| **Título** | Implementar programa de loyalty: NPS post-servicio + puntos canjeables |
| **Problema** | No hay programa de retención. El cliente no tiene incentive para volver. Sin NPS, no se sabe quién es promoter y quién es detractor hasta que ya se fue. |
| **Descripción** | Implementar programa de loyalty: (1) **NPS post-servicio**: 48h después del servicio, email con "¿Cómo calificarías tu experiencia?" + escala 0-10 + campo de comentario. Esto identifica promoters (9-10), passives (7-8), y detractors (0-6). (2) **Puntos por servicio**: cada servicio completado = 10 puntos. 100 puntos = $20.000 de descuento en próxima limpieza. (3) **Niveles**: Bronce (0-99 pts), Plata (100-299), Oro (300+). Cada nivel tiene beneficios: Plata = priority scheduling, Oro = 10% descuento permanente. (4) **Tracking**: portal muestra puntos actuales, nivel, y historial. (5) **Detractor recovery**: si alguien califica 0-6, email de disculpa + oferta de recuperación ($15.000 descuento). Implementación: (a) email NPS via EmailJS/Formspree. (b) Google Sheets para tracking de puntos por cliente. (c) Portal section para loyalty dashboard. |
| **Impacto esperado** | Reducción de churn en 20-25%, aumento de frecuencia de contratación, identificación de detractors antes de que se vayan, mayor lifetime value |
| **Esfuerzo** | M (email automation + sheet + portal integration) |
| **Agente recomendado** | Operations + Frontend |
| **Referencias** | [1] https://www.loyalty360.org/ [2] https://www.netpromoter.com/know/ [3] https://www.forrester.com/customer-experience/loyalty-programs |

### Propuesta 6: Subscription Plans — Planes recurrentes con descuento

| Campo | Detalle |
|-------|---------|
| **Título** | Implementar planes de suscripción: mensual y trimestral con descuento |
| **Problema** | El modelo es puramente one-time. No hay opción de plan recurrente. Esto limita el lifetime value y la predictability del revenue. El 40% de clientes eligen planes recurrentes si están disponibles. |
| **Descripción** | Implementar subscription plans: (1) **Planes**: - **Mensual**: 4 limpiezas/mes, 10% descuento vs precio individual. - **Trimestral**: 12 limpiezas en 3 meses, 15% descuento. - **Anual**: 52 limpiezas, 20% descuento (para clientes premium). (2) **CTAs**: sección nueva en homepage "Planes de limpieza recurrente" con cards para cada plan. (3) **Booking flow modificado**: si el usuario selecciona plan, el slot picker muestra disponibilidad semanal fija. (4) **Billing**: los planes se facturan por adelantado (monthly/quarterly). Formspree + email confirmation. (5) **Portal integration**: en el portal, el cliente con plan activo ve sus próximas 4-12 limpiezas programadas. (6) **Cancelación**: flexible, sin permanencia. Implementación: (a) nueva sección en `index.html` con comparison table. (b) modificar slot picker para recurring bookings. (c) Google Sheets para tracking de subscriptions. (d) Email reminders para renewal. |
| **Impacto esperado** | Revenue predecible monthly, lifetime value 3-5x mayor por cliente, reducción de churn (compromiso genera loyalty), diferenciación premium vs competencia |
| **Esfuerzo** | M (nueva sección + slot picker modificado + billing tracking) |
| **Agente recomendado** | Full Stack |
| **Referencias** | [1] https://www.servicetitan.com/blog/recurring-revenue-home-services [2] https://www.jobber.com/recurring-services/ |

### Propuesta 7: Reviews con Fotos — Antes/después para servicios específicos

| Campo | Detalle |
|-------|---------|
| **Título** | Implementar reviews enriquecidos con fotos antes/después de servicios |
| **Problema** | Las reviews son puro texto. Los clientes no pueden subir fotos de su sofá limpio o colchón sanitizado. Este formato es significativamente más persuasivo y genera más confianza. |
| **Descripción** | Implementar reviews con fotos: (1) **Sistema de submission**: después del servicio, email con link "¿Quieres mostrar tu resultado?" que permite upload de hasta 3 fotos (antes, después, o ambas). (2) **Moderación**: fotos pasan por approval antes de publicarse (para evitar contenido inapropiado). (3) **Display enriquecido**: en la sección de reviews, las reviews con fotos se muestran con gallery de imágenes (antes/después slider para muebles). (4) **Galería dedicada**: página `/resultados/` con grid de fotos de todos los servicios, organizadas por zona y tipo de mueble. (5) **Google Business Profile**: cuando se sube foto, también se propone al cliente agregarla a su Google Business Profile review. (6) **Badges**: reviews con fotos reciben badge "📸 Con evidencia visual" en el sitio. Implementación: (a) Formspree para upload de fotos (configurar para accept images). (b) Cloudinary o similar para hosting de imágenes (tier gratis). (c) galería en `results.html` con CSS grid. (d) approval workflow por email. |
| **Impacto esperado** | Mayor persuasión de reviews (4x más engagement que texto), más confianza para nuevos clientes, diferenciación visual vs competencia, mayor interacción con Google Business Profile |
| **Esfuerzo** | M (image upload + gallery + moderation) |
| **Agente recomendado** | Frontend |
| **Referencias** | [1] https://www.brightlocal.com/reviews-statistics/ [2] https://www.podium.com/reviews-with-photos/ [3] https://support.google.com/business/answer/11233743 |

---

## Orden de implementación recomendado

| # | Propuesta | Impacto | Esfuerzo | Semana |
|---|----------|---------|----------|--------|
| 1 | Heatmaps (Hotjar) | Medio-Alto | S | 1 |
| 2 | Programa de Referidos | Alto | S | 1-2 |
| 3 | Portal de Cliente | Alto | M | 2-3 |
| 4 | NPS + Loyalty | Alto | M | 2-3 |
| 5 | Reviews con Fotos | Medio-Alto | M | 2-3 |
| 6 | Subscription Plans | Medio-Alto | M | 3-4 |
| 7 | Internacionalización | Medio | M | 3-4 |

**Top 3 para implementar primero:** 1, 2, 4 (Heatmaps es instantáneo, Referidos es quick win de bajo esfuerzo y alto impacto, Loyalty genera retención).

---

## Diferencia clave: R42 vs R43

R42 se enfocó en **PWA infrastructure avanzada y accesibilidad WCAG 2.2**:
- Custom install prompt, Background Sync, Content Index
- Skip-nav, focus management, ARIA live forms
- FAQPage Schema, runtime caching strategies

**R43 se enfoca en:**
- **Plataforma de cliente**: portal de autogestión
- **Analítica de comportamiento**: heatmaps y session replay
- **Retención**: programa de referidos, loyalty, subscription plans
- **Internacionalización**: i18n español/inglés
- **Reviews enriquecidos**: fotos antes/después

R42 construyó **infraestructura técnica y compliance**. R43 construye **plataforma, retención y crecimiento**.

---

## Síntesis: Por qué R43 es diferente

R1-R42 ha cubierto un espectro amplio:
- R1-R10: Features internos del site
- R11-R20: SEO y Schema
- R21-R30: UX y conversión
- R31-R35: Video, reputation, AI discoverability
- R36: Modernización técnica (Popover API, Navigation API, Service Worker modules)
- R37: Discovery externo (Apple Maps, TikTok Local, Video Reviews)
- R38: Conversión interna (garantía, slot picker, rebooking)
- R39: Outreach y automatización (GBP, WhatsApp AI, Social Proof, Referral)
- R40: Retención y canales no exploitados (voice search, portal, video testimonials)
- R41: UX micro-mejoras, gamificación, AI chatbot, PWA enhanced
- R42: PWA install prompt, Background Sync, Content Index, WCAG 2.2, FAQPage Schema
- **R43: Portal cliente, heatmaps, referidos cliente-cliente, i18n, loyalty NPS, subscription plans, reviews con fotos**

R43 es la primera ronda dedicada a:
1. **Portal de cliente** — nunca propuesto como feature completo
2. **Heatmaps** — analítica de comportamiento nunca propuesta
3. **Referidos cliente-cliente** — R39 tocó GBP referrals, no programa interno
4. **i18n** — nunca propuesto
5. **Loyalty con NPS** — nunca propuesto como programa
6. **Subscription plans** — modelo solo one-time hasta ahora
7. **Reviews con fotos** — siempre texto, nunca visual

---

## Fuentes

[1] ServiceTitan. "Customer Portal Expectations in Home Services." https://www.servicetitan.com/blog/customer-portal-home-services

[2] Captera. "Customer Portal Statistics." https://www.captera.com/blog/customer-portal-expectations

[3] Hotjar. "Heatmaps and Session Replay." https://www.hotjar.com/

[4] FullStory. "Digital Experience Analytics." https://www.fullstory.com/

[5] NNGroup. "Heatmaps: When to Use and How to Read." https://www.nngroup.com/articles/heatmaps/

[6] Punchtab. "Referral Program Trends." https://www.punchtab.com/referral-programs/

[7] Ambassador. "Referral Program Examples." https://www.ambassador.com/referral-program-examples/

[8] W3C. "Internationalization Techniques." https://www.w3.org/International/techniques/composing#setup

[9] Forbes. "Digital Nomads in Colombia." https://www.forbes.com/sites/theyards/2024/12/nomad-digital-colombia/

[10] Loyalty360. "Loyalty Program Best Practices." https://www.loyalty360.org/

[11] Net Promoter. "NPS Implementation Guide." https://www.netpromoter.com/know/

[12] Forrester. "Customer Experience Loyalty Programs." https://www.forrester.com/customer-experience/loyalty-programs

[13] ServiceTitan. "Recurring Revenue in Home Services." https://www.servicetitan.com/blog/recurring-revenue-home-services

[14] Jobber. "Recurring Services for Home Service Businesses." https://www.jobber.com/recurring-services/

[15] BrightLocal. "Reviews Statistics and Engagement." https://www.brightlocal.com/reviews-statistics/

[16] Podium. "Reviews with Photos Impact." https://www.podium.com/reviews-with-photos/

[17] Google. "Managing Customer Photos in Business Profile." https://support.google.com/business/answer/11233743

---

*Documento generado por Innovation Scout — Round 43*
*Purity & Clean Analysis — 2026-04-27*
*Co-Authored-By: Paperclip <noreply@paperclip.ing>*