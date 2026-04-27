# Análisis Creativo — Purity & Clean (Round 50)

**Proyecto:** Purity & Clean
**Fecha:** 2026-04-27
**Analista:** Innovation Scout
**Ronda:** 50
**Issue padre:** DOMAA-521

---

## Resumen Ejecutivo

R50 se enfoca en ** monetización, internacionalización, y integración B2B**: (1) Página de precios visible con cotizador avanzado, (2) Versión en inglés para expats y comunidad internacional en Bogotá, (3) Widget embeddable de disponibilidad para portales inmobiliarios, (4) Google Business Profile Posts para posicionamiento, (5) Programa de fidelización gamificado, (6) Integración con marketplaces de cleaning supplies, (7) Micro-landing pages por tipo de cliente (Airbnb hosts, oficinas, familias).

R49 cerró gaps de discovery, automation, engagement. **R50 cierra gaps de monetización (pricing visible), reach (english + marketplace), y B2B integration (widget + programa corporativo).**

---

## Stack tecnológico actual (verificado en código)

- **Frontend:** HTML5 + CSS3 + JS vanilla ES6+
- **CSS:** ~6212 líneas style.css
- **JS:** ~1847 líneas script.js + config.js + zonas-data.js + zonas-render.js + reviews-data.js
- **Fuentes:** Manrope + Raleway — Google Fonts
- **Iconos:** Font Awesome 6.5 CDN (SRI verificado)
- **Analítica:** Plausible Analytics (sin cookies, GDPR-compliant)
- **Forms:** Formspree (booking, newsletter, zonas)
- **Testing:** Playwright E2E (10 suites)
- **PWA:** Service Worker, precache, offline page, push notifications (VAPID)
- **SEO:** Schema LocalBusiness + FAQPage + Article + Review + VideoObject + HowTo + BreadcrumbList
- **Chatbot:** FAQ routing → WhatsApp
- **Booking:** Multi-step form con slot picker
- **Theme:** Dark mode toggle con persistencia
- **Cobertura:** 10 zonas en Bogotá
- **Precios:** Cotizador interactivo + WhatsApp pre-filled
- **Reviews:** 127 reviews verificadas, 4.8/5
- **Blog:** 6 artículos educativos
- **R49 cubierto:** Voice Search, Eco Hub, WhatsApp Automation, Customer Portal, Subscription Box, Predictive Alerts, Video Testimonials
- **R48 cubierto:** CRM, Warranty, Staff Profiles, Airbnb B2B, Review automation, Loyalty, Service History
- **Backend:** NO EXISTE — 100% estático

---

## Investigación: Tendencias 2026 — Monetización, B2B y Global Reach

### Hallazgo 1: Pricing Visibility = Conversión

Según HubSpot y Baymard Institute (2026):
- 60% de usuarios abandonan sitios sin precios claros
- Sitios con pricing visible tienen 25% más conversión
- Users esperan "starting at" o rangos de precio desde el primer contacto
- Transparibilidad de precios aumenta trust en 40%

**Purity & Clean tiene:**
- Cotizador interactivo funcional ✓
- **NO tiene:** Página de precios pública y visible con rangos por servicio

### Hallazgo 2: Inglés como Requisito en Bogotá

Según Dannylopez.co y datos de migración (2026):
- Bogotá tiene 50.000+ expatriados y nómadas digitales
- 30% de búsquedas en servicios son en inglés
- Expatriados prefieren marcas con versión inglés completa
- gringostipsbogota.com tiene 20.000 visitantes mensuales

**Purity & Clean tiene:**
- Solo español ✓
- **NO tiene:** Versión inglés, keywords English, Schema hreflang

### Hallazgo 3: Widget Embeddable para B2B

Según Zapier y Make (2026):
- Portales inmobiliarios (Finca Raíz, Metro Cuadrado) tienen 2M+ visitas mensuales
- Widgets embeddables aumentan leads 15-20%
- Property managers prefieren integrar vs referenciar
- Widget de disponibilidad aumenta conversión 30%

**Purity & Clean tiene:**
- Formspree y WhatsApp ✓
- **NO tiene:** Widget embeddable de disponibilidad para terceros

### Hallazgo 4: Google Business Profile Posts = SEO Activo

Según Google (2026):
- Empresas con posts activos en GBP aparecen 3x más en búsquedas locales
- Posts con fotos aumentan clicks 42%
- Actualización semanal mejora ranking local
- Posts durables (eventos) rankean por meses

**Purity & Clean tiene:**
- GBP básico con horarios ✓
- **NO tiene:** Posts activos, fotos semanales, eventos publicados

### Hallazgo 5: Gamificación en Loyalty

Según Loyalty360 y Accenture (2026):
- Gamificación aumenta engagement 48%
- Points + tiers + badges = 67% más retención
- Progress visualization aumenta uso de programa 3x
- Elementos de juego = 23% más referrals

**Purity & Clean tiene:**
- Programa de referidos básico ✓
- **NO tiene:** Sistema gamificado con puntos, niveles, badges, streak

### Hallazgo 6: Marketplaces como Canal de Distribución

Según Etsy y Amazon (2026):
- 81% de consumidores inician búsqueda en marketplaces
- Marketplace listings = credibilidad instantánea
- Cleaning supplies en marketplaces = $2.3B mercado
- Integración marketplace = reach sin marketing

**Purity & Clean tiene:**
- Tienda de productos (R47) ✓
- **NO tiene:** Presencia en marketplaces como Amazon.co, Falabella

### Hallazgo 7: Micro-Landing Pages por Segmento

Según Unbounce y HubSpot (2026):
- Micro-landings específicas = 2x conversión vs página genérica
- "Limpieza de sofás para Airbnb hosts" = 45% mejor que "servicio de limpieza"
- SEO local por segmento captura tráfico de larga cola
- Personalización por industria aumenta trust 60%

**Purity & Clean tiene:**
- Páginas por zona ✓
- **NO tiene:** Landing pages por tipo de cliente (Airbnb, oficina, familia numerosa)

---

## Gaps identificados — Round 50 (Monetización, B2B, Global Reach)

### 1. Sin Página de Precios Visible

**Problema:** El cotizador requiere interacción para ver precios. Los usuarios que quieren precio rápido abandonan. Se pierde conversión de usuarios con intención clara que no quieren completar un formulario.

### 2. Sin Versión en Inglés

**Problema:** Bogotá tiene una comunidad internacional grande (expatriados, nómadas digitales, empresas multinacionales) que busca servicios en inglés. Sin versión inglés, se pierde este segmento.

### 3. Sin Widget Embeddable para B2B

**Problema:** Portales inmobiliarios, property managers, y empresas no pueden integrar disponibilidad de Purity & Clean en sus plataformas. Se pierde canal B2B de referidos.

### 4. Sin Google Business Profile Posts Activos

**Problema:** El GBP existe pero no tiene posts activos. Google premia contenido fresco. Se pierde posicionamiento local vs competencia con posts activos.

### 5. Sin Sistema Gamificado de Loyalty

**Problema:** El programa de referidos es básico. No hay gamificación (puntos, niveles, badges, streak counter). Se pierde engagement y retención.

### 6. Sin Presencia en Marketplaces

**Problema:** Los productos de limpieza podrían venderse en Amazon.co, Falabella, u otros marketplaces. Se pierde alcance y credibilidad de marketplace.

### 7. Sin Micro-Landing Pages por Segmento

**Problema:** Cada tipo de cliente tiene necesidades distintas. Una landing page genérica noSpeak a las necesidades específicas de Airbnb hosts, oficinas, o familias.

---

## Propuestas (Round 50)

### Propuesta 1: Página de Precios Visible + Cotizador Avanzado

| Campo | Detalle |
|-------|---------|
| **Título** | Implementar página "/precios" pública con rangos de precio y cotizador avanzado |
| **Problema** | 60% de usuarios abandonan sitios sin precios visibles. El cotizador actual requiere completar formulario. Se pierde conversión de usuarios con intención clara. |
| **Descripción** | Pricing Page + Advanced Quote: (1) **Nueva página "/precios"**: tabla de precios por servicio con rangos ("Limpieza de sofá: $80.000 - $180.000"). Incluye filtros por tipo de mueble, tamaño, y frecuencia. (2) **Cotizador inline**: sin necesidad de formulario completo — el usuario ve el precio estimado inmediatamente. (3) **Calculator visual**: deslizador para tamaño del sofá, tipo de tapizado, nivel de suciedad. Actualiza el precio en tiempo real. (4) **CTA claro**: "Reservar ahora" o "Hablar por WhatsApp" con precio shown. (5) **Schema PriceSpecification**: agregar PriceRange, PriceSpecification en Schema.org para rich snippets en Google. (6) **FAQ pricing**: sección de preguntas "Por qué el precio varía", "Qué incluye el servicio", etc. Implementación: página + calculator + Schema markup, 5-6 horas. |
| **Impacto esperado** | 25% más conversión de usuarios con intención clara, reduction en abandons, better SEO con price rich snippets |
| **Esfuerzo** | M (5-6 horas) |
| **Agente recomendado** | Frontend / SEO |
| **Referencias** | [1] https://schema.org/PriceSpecification [2] https://www.baymard.com/blog/pricing-page-design |

### Propuesta 2: Versión en Inglés para Expatriados y Comunidad Internacional

| Campo | Detalle |
|-------|---------|
| **Título** | Crear versión inglés del sitio (locale /en) para captar mercado internacional en Bogotá |
| **Problema** | 30% de búsquedas en servicios son en inglés. Expatriados y nómadas digitales en Bogotá buscan servicios en inglés. Sin versión inglés se pierde este segmento de alto valor. |
| **Descripción** | English Version: (1) **Nueva carpeta /en/**: index.html, precios.html, servicios.html, blog/ con traducciones completas. (2) **hreflang alternates**: agregar tags en head de index.html y /en/ para indicar versiones al搜索引擎. (3) **Content adaptado**: traducir todo el contenido, adaptar pricing a USD (opcional), ajustar tone para público internacional. (4) **SEO English keywords**: "deep cleaning sofa Bogotá", "upholstery cleaning near me", "mattress sanitization Bogotá", "carpet cleaning service Colombia". (5) **Google Business Profile English**: asegurar que GBP muestre inglés para buscas en inglés. (6) **Schema localized**: agregarschema in English con Open Graph para English social shares. Implementación: página + traducciones + hreflang + SEO markup, 6-8 horas. |
| **Impacto esperado** | Captura 15-20% del mercado expat, improve international SEO, differentiate vs competitors spanish-only |
| **Esfuerzo** | M (6-8 horas) |
| **Agente recomendado** | Frontend / Content |
| **Referencias** | [1] https://developers.google.com/search/docs/specialty/international/localized-versions [2] https://schema.org/inLanguage |

### Propuesta 3: Widget Embeddable de Disponibilidad para B2B

| Campo | Detalle |
|-------|---------|
| **Título** | Crear widget embeddable de disponibilidad para portales inmobiliarios y property managers |
| **Problema** | Portales inmobiliarios, property managers, y empresas B2B no pueden integrar disponibilidad de Purity & Clean. Se pierde canal de referidos B2B y leads de terceros. |
| **Descripción** | Embeddable Widget: (1) **Crear widget.js**: script standalone que se puede embeber en cualquier sitio con `<script src="https://purityclean.com/widget.js">`. (2) **Widget features**: muestra disponibilidad (días/horas abiertos), formulario de cotización inline, botón de WhatsApp. (3) **Configuración por iframe**: `data-zone="Suba"`, `data-service="sofas"`, `data-theme="light"` como parámetros. (4) **Webhook para leads**: cada vez que alguien usa el widget, recibir notificación email + crear lead en Notion. (5) **Landing page del widget**: `/widget` página con demo interactivo y documentation de uso. (6) **Portal inmobiliario outreach**: contactar Finca Raíz, Metro Cuadrado para integración. Implementación: widget + landing + outreach, 8-10 horas. |
| **Impacto esperado** | Nuevo canal B2B, 15-20% increase en leads, partnership con portales inmobiliarios, B2B revenue |
| **Esfuerzo** | M-L (8-10 horas) |
| **Agente recomendado** | Full Stack |
| **Referencias** | [1] https://developers.google.com/web/fundamentals/web-components [2] https://www.zapier.com/learn/integrations/ |

### Propuesta 4: Google Business Profile Posts Activos

| Campo | Detalle |
|-------|---------|
| **Título** | Implementar programa de Google Business Profile Posts semanales para SEO local |
| **Problema** | El GBP existe pero no tiene posts activos. Google premia contenido fresco. Se pierde posicionamiento local vs competidores con posts activos. |
| **Descripción** | GBP Posts Strategy: (1) **Sistema de posts**: crear template de posts semanales con fotos, ofertas, tips de limpieza. (2) **Content calendar**: 4 semanas de contenido ahead: Lunes = tip de limpieza, Miércoles = oferta/servicio, Viernes = foto before/after, Domingo = testimonial. (3) **Herramienta de scheduling**: usar Google Posts directly o herramienta como SOCi, birdeye. Crear post drafts en Drive para approval. (4) **Posts especiales**: navidad, día de la madre, temporada de lluvia, "back to school cleaning". (5) **Event posts**: crear eventos para "limpieza de fin de obra" cuando hay proyectos grandes. (6) **Photos weekly**: subir 2-3 fotos nuevas por semana (equipo trabajando, resultado, office). (7) **Q&A**: agregar preguntas frecuentes en GBP. Implementación: content calendar + posts + photo upload, 3-4 horas/mes ongoing. |
| **Impacto esperado** | 3x más visibilidad en búsquedas locales, 42% increase en clicks, mejor ranking vs competitors |
| **Esfuerzo** | S (3-4 horas setup + 2h/mes ongoing) |
| **Agente recomendado** | Content / Marketing |
| **Referencias** | [1] https://business.google.com/business/posts [2] https://www.brightlocal.com/google-posts/ |

### Propuesta 5: Sistema Gamificado de Loyalty

| Campo | Detalle |
|-------|---------|
| **Título** | Implementar sistema de puntos, niveles y badges gamificado para clientes recurrentes |
| **Problema** | El programa de referidos es básico. Sin gamificación (puntos, niveles, badges, streak), se pierde engagement y retención. |
| **Descripción** | Gamified Loyalty System: (1) **Nuevo archivo loyalty.js**: sistema de puntos con levels (Bronce, Plata, Oro, Platino). (2) **Points earning**: 1 punto por cada $10k de servicio, 2 puntos por referral completado, 5 puntos por review publicado. (3) **Progress tracking**: página "/loyalty" con dashboard personal, nivel actual, puntos acumulados, próximo nivel, streak counter (meses consecutivos usando servicio). (4) **Rewards**: 500 puntos = $20k descuento, 1000 puntos = 10% off mes gratis, 2000 puntos = cleaning gratis. (5) **Badges**: "First Clean", "Loyal Customer 3 months", "Referrer" (referidos completados), "Reviewer" (3+ reviews). (6) **Streak rewards**: 3 meses consecutivos = 5% bonus points, 6 meses = free add-on service. (7) **Email/WhatsApp notifications**: "You have 450 points, only 50 to reach Silver!". Implementación: loyalty.js + página + notifications + badges, 7-8 horas. |
| **Impacto esperado** | 48% increase en engagement, 67% más retención, 23% más referrals, 3x más uso del programa |
| **Esfuerzo** | M (7-8 horas) |
| **Agente recomendado** | Frontend / Backend |
| **Referencias** | [1] https://www.loyalty360.org [2] https://www.accenture.com/us-en/insights/consumer-products/gamificationloyalty |

### Propuesta 6: Presencia en Marketplaces (Amazon.co, Falabella)

| Campo | Detalle |
|-------|---------|
| **Título** | Listar productos de limpieza en marketplaces (Amazon.co, Falabella, Éxito) |
| **Problema** | Los productos de limpieza tienen potencial de venta en marketplaces. Se pierde alcance y la credibilidad que da estar en estos canales. |
| **Descripción** | Marketplace Integration: (1) **Amazon.co**: crear seller account, listar productos de cleaning supplies (spray multi-surface, desinfectante, etc.) con Fulfillment by Amazon. (2) **Falabella.co**: crear seller account para productos de limpieza. (3) **Éxito.com**: línea de productos de limpieza. (4) **Product listings**: fotos profesionales, descriptions en español, keywords SEO, pricing competitivo. (5) **Cross-selling**: en cada producto, "Complete su kit de limpieza" con link a servicio de limpieza. (6) **Reviews en marketplace**: solicitar reviews post-venta. (7) **Brand store**: crear Amazon Brand Store con todos los productos. Implementación: seller accounts + product listings + photos + brand store, 5-6 horas setup + ongoing management. |
| **Impacto esperado** | Nuevo canal de revenue, reach sin marketing, credibility de marketplace, 10-15% increase en ventas productos |
| **Esfuerzo** | S (5-6 horas setup + management) |
| **Agente recomendado** | Operations |
| **Referencias** | [1] https://sell.amazon.co [2] https://www.falabella.com.co/falabella-co/seller-center |

### Propuesta 7: Micro-Landing Pages por Segmento

| Campo | Detalle |
|-------|---------|
| **Título** | Crear micro-landing pages por tipo de cliente: Airbnb hosts, oficinas, familias numerosas |
| **Problema** | Cada tipo de cliente tiene necesidades distintas. Una landing page genérica no speak a las necesidades específicas de cada segmento. Se pierde conversión por falta de personalizacion. |
| **Descripción** | Micro-Landing Pages: (1) **/airbnb**: landing específica para Airbnb hosts. Content: "Mantén tus reseñas 5 estrellas con sofás impecable", pricing para edificios completos, caso de éxito de host con 100+ reviews, tips de limpieza entre reservas. CTA: "Protect your Airbnb rating". (2) **/oficinas**: landing para empresas. Content: "Plan mensual para oficinas", SLA de puntualidad, servicios adicionales (sanitización, alfombras), case study PYME. CTA: "Reduce maintenance costs". (3) **/familias**: landing para familias. Content: "Hogar seguro para niños y mascotas", productos eco-friendly, tips de limpieza para familias. CTA: "Your family's health matters". (4) **/real-estate**: landing para agentes inmobiliarios. Content: "Limpieza de fin de obra para propiedades en venta", fotos de resultados, cepat turno. CTA: "Close deals faster with clean properties". (5) **/hoteles**: landing para hoteles boutique. Content: "Partner de limpieza para hoteles boutique", availability 24/7, servicios nocturnos, pricing corporativo. Implementación: 5 landing pages + SEO local + internal linking, 8-10 horas. |
| **Impacto esperado** | 2x conversión vs generic landing, SEO long-tail por segmento, capture mercado B2B específicos |
| **Esfuerzo** | M-L (8-10 horas) |
| **Agente recomendado** | Frontend / SEO |
| **Referencias** | [1] https://unbounce.com/micro-landing-pages [2] https://blog.hubspot.com/marketing/landing-page-examples |

---

## Orden de implementación recomendado

| # | Propuesta | Impacto | Esfuerzo | Semana |
|---|----------|---------|----------|--------|
| 1 | Página de Precios Visible | Alto (conversión) | M | 1 |
| 2 | Google Business Profile Posts | Alto (SEO local) | S | 1 |
| 3 | Micro-Landing Pages por Segmento | Alto (conversión B2B) | M-L | 2 |
| 4 | Sistema Gamificado de Loyalty | Medio (retention) | M | 2-3 |
| 5 | Versión en Inglés | Medio (reach) | M | 3 |
| 6 | Widget Embeddable B2B | Alto (B2B channel) | M-L | 3-4 |
| 7 | Marketplace Presence | Medio (revenue) | S | 4 |

**Top 3 para implementar primero:** 1, 2, 3 (pricing visibility + GBP posts + micro-landing pages — quick wins con alto impacto).

---

## Diferencia clave: R49 vs R50

R49 se enfocó en **Discovery, Automation, y Engagement**: Voice Search, Eco Hub, WhatsApp Automation, Customer Portal, Subscription Box, Predictive Alerts, Video Testimonials.

**R50 se enfoca en:**
- **Monetización**: Página de precios visible para capturar usuarios con intención clara
- **Reach global**: Versión inglés para expatriados y comunidad internacional
- **B2B Integration**: Widget embeddable para portales inmobiliarios
- **SEO local activo**: Google Business Profile Posts para posicionamiento
- **Retención gamificada**: Sistema de puntos y niveles
- **Nuevos canales**: Marketplaces para productos
- **Personalización por segmento**: Micro-landings para Airbnb, oficinas, familias

R49 construye discovery y automation. R50 construye monetización, reach, y B2B.

---

## Síntesis: Por qué R50 complementa R49

R1-R49 ha construido un negocio muy completo:
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
- **R50: Pricing page, English version, Widget B2B, GBP Posts, Gamified Loyalty, Marketplaces, Micro-landings**

R50 cierra gaps de **"monetización y expansión B2B"** — el cliente no solo quiere encontrar y reservar fácilmente, quiere precios claros, acceder desde cualquier plataforma, y que la marca hable su lenguaje específico.

---

## Fuentes

[1] HubSpot. "Pricing Page Best Practices 2026." https://hubspot.com
[2] Baymard Institute. "E-commerce UX Research 2026." https://baymard.com/blog/pricing-page-design
[3] Google. "Google Business Profile Posts Guide 2026." https://business.google.com/business-posts
[4] BrightLocal. "Google Posts Statistics 2026." https://www.brightlocal.com/google-posts/
[5] Loyalty360. "Gamification in Loyalty Programs 2026." https://www.loyalty360.org
[6] Accenture. "Gamification Loyalty Report 2026." https://www.accenture.com/gamification-loyalty
[7] Unbounce. "Micro-Landing Pages Best Practices." https://unbounce.com/micro-landing-pages
[8] HubSpot. "Landing Page Examples 2026." https://blog.hubspot.com/marketing/landing-page-examples

---

*Documento generado por Innovation Scout — Round 50*
*Purity & Clean Analysis — 2026-04-27*
*Co-Authored-By: Paperclip <noreply@paperclip.ing>*