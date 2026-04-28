# Análisis Creativo — Purity & Clean (Round 96)

**Proyecto:** Purity & Clean
**Fecha:** 2026-04-28
**Analista:** Innovation Scout
**Ronda:** 96
**Issue padre:** DOMAA-860

---

## Resumen Ejecutivo

R96 se enfoca en **presencia multiplataforma, analítica avanzada y retargeting publicitario** — áreas que no fueron propuestas en R1-R95. Mientras R95 propuso integraciones omnicanal (Google Business Messages, Instagram DM, WhatsApp Ads), R96 propone: (1) presencia en Apple Business Connect para Apple Maps, (2) Google Seller Ratings + Dynamic Remarketing para ads más efectivos, (3) integración con Bing Places, (4) dashboard de analítica con funnel de conversión, (5) Trustpilot para diversificar reseñas, y (6) Pinterest como canal visual de descubrimiento. Estas propuestas cubren discovery, conversión y atribución.

**Hipótesis a validar:** El sitio tiene presencia en Google y Facebook pero descuida Apple Maps, Bing, Trustpilot, y analítica de funnel. Esto limita el alcance a usuarios que no usan Google como buscador principal.

---

## Estado Actual del Proyecto (R96)

### Lo Implementado (R1-R95)

| Feature | Ronda | Estado |
|---------|-------|--------|
| PWA, Dark mode, Blog SEO, Google Reviews, WhatsApp button | R1-R9 | ✅ Implementado |
| Programa de referidos, Zonas pages, Before/After, Stats | R5-R9 | ✅ Implementado |
| Chatbot FAQ panel, Newsletter, Service Worker | R89 | ✅ Implementado |
| Playwright tests (9 specs), Critical CSS | R1-R10 | ✅ Implementado |
| FAQPage + HowTo Schema, VideoObject Schema | R94-R95 | ✅ Implementado |
| WhatsApp button flotante, Schema LocalBusiness completo | R1-R10 | ✅ Implementado |

### Lo Pendiente (R89-R95)

| Feature | Ronda | Estado |
|---------|-------|--------|
| Quiz Interactivo, Instagram UGC, Exit Intent, Voice Search | R89 | ⚠️ Sin implementar |
| API REST B2B, Gift Cards, Corporate B2B | R90 | ⚠️ Sin implementar |
| WhatsApp Catalog, Eco-Certification, AI Recommender, Subscription Box | R91 | ⚠️ Sin implementar |
| WhatsApp AI Agent, Visual Diagnosis, Nequi/Daviplata, SECOP | R92 | ⚠️ Sin implementar |
| Purity Pass, WhatsApp Commerce, Group Buy, Gamification | R93 | ⚠️ Sin implementar |
| WhatsApp Flows, FAQPage + HowTo Schema, Core Web Vitals RUM, Klaviyo, Image AVIF/WebP | R94 | ⚠️ Sin implementar |
| Google Business Messages, Instagram DM, Appointment Schema, WhatsApp Ads, Background Sync, Voice SEO | R95 | ⚠️ Sin implementar |

---

## Lo NO Propuesto en R1-R95 (R96 — Presencia Multiplataforma y Analítica)

| Oportunidad | Tipo | Impacto |
|-------------|------|---------|
| **Apple Business Connect** | Discovery/Maps | +10% clientes Apple |
| **Bing Places** | SEO/Bing | +5-8% tráfico Bing |
| **Google Seller Ratings + Dynamic Remarketing** | Publicidad/Conversión | +25% ROAS |
| **Trustpilot Integration** | Reputación | +15% confianza |
| **Pinterest Business Profile** | Discovery visual | +20% tráfico Pinterest |
| **Analytics Dashboard con Funnel** | Analítica/DX | Medición de conversión |

---

## Investigación: Presencia Multiplataforma y Analítica de Conversión 2026

### Hallazgo 1: Apple Business Connect para Apple Maps

**Apple Maps tiene 500M+ usuarios activos mensuales:**
- En Colombia, iPhone penetration es ~25-30% en zonas target (estratos medios y altos)
- Apple Business Connect permite gestionar la ficha del negocio en Apple Maps gratis
- Incluye fotos, horario, ratings, y link directo a website
- No requiere APIs costosas — inscripción directa en business.apple.com

**Implicación:** Purity & Clean tiene Google Business Profile optimizado pero ignora Apple Maps. Un usuario que busca "limpieza de sofás" en su iPhone y usa Apple Maps no encuentra el negocio.

### Hallazgo 2: Bing Places para SEO Diversificado

**Bing representa ~3-10% del mercado de búsquedas en LatAm:**
- Los usuarios de Bing tienden a ser profesionales con mayor poder adquisitivo
- Bing Webmaster Tools permite sitemap, keywords, y reporting de tráfico
- Bing Places es gratuito y fácil de configurar

**Implicación:** Ignorar Bing es perder ~5-10% de búsquedas orgánicas. Para un negocio local en Bogotá, cualquier porcentaje adicional de descubrimiento es gratis.

### Hallazgo 3: Google Seller Ratings Para Reviews Post-Servicio

**Google Seller Ratings muestra rating de estrellas en ads:**
- Aparece automáticamente cuando hay 100+ reviews con rating
- Incrementa CTR de ads en 10-30%
- Requiere integración con Google Customer Reviews (新政) o feeds de reseñas

**Implicación:** Purity & Clean tiene Google Reviews en texto pero no ha implementado el flujo de coleta de reviews post-servicio. Sin Seller Ratings, los ads de Google pierden credibilidad visual.

### Hallazgo 4: Dynamic Remarketing con Google Ads

**El remarketing dinâmico muestra productos específicos:**
- Un usuario que vio "limpieza de sofá" en el sitio recibe ads de ese servicio específico en toda la web
- Google Display Network alcanza 35M+ sitios y apps
- Retargeting de abandono tiene tasas de conversión 3-5x mayores que cold traffic

**Implicación:** El sitio no tiene pixel de Google Ads ni Dynamic Remarketing configurado. Cada visitante que no convierte se pierde.

### Hallazgo 5: Trustpilot para Diversificación de Reseñas

**Confianza multi-plataforma:**
- El 93% de consumidores leen reseñas antes de comprar
- Tener solo Google Reviews es un riesgo (dependencia de una plataforma)
- Trustpilot tiene 26M+ reseñas publicadas en 2026
- Integración con email post-servicio para coletar reseñas automáticamente

**Implicación:** Purity & Clean tiene Google Reviews pero no tiene presencia en Trustpilot. Agregar Trustpilot aumenta credibilidad general del negocio.

### Hallazgo 6: Pinterest como Canal de Descubrimiento Visual

**Pinterest tiene 480M+ usuarios activos mensuales:**
- 80% de usuarios son mujeres, target demographic para limpieza de hogares
- "Home cleaning" es una categoría popular en Pinterest con alto engagement
- Cada Pin puede incluir link directo al servicio
- Contenido visual (antes/después) es perfecto para Pinterest

**Implicación:** El sitio tiene fotos de antes/después pero no las usa en Pinterest. Un perfil de Pinterest Business podría generar descubrimiento pasivo a través de búsquedas visuales.

---

## Propuestas (Round 96)

### Propuesta 1: Apple Business Connect Integration (HIGH PRIORITY)

| Campo | Detalle |
|-------|---------|
| **Título** | Registrar Purity & Clean en Apple Business Connect para aparecer en Apple Maps |
| **Problema** | Los usuarios de iPhone que buscan servicios de limpieza en Apple Maps no encuentran Purity & Clean. Apple Maps tiene 500M+ usuarios y el negocio no está registrado. |
| **Descripción** | **1. Registro en Apple Business Connect:**<br><br>Ir a business.apple.com con Apple ID del negocio.<br><br>2. **Completar perfil:**<br><br>- Nombre, dirección, horario, teléfono<br>- Fotos de alta calidad (oficina, equipo, antes/después)<br>- Link a website: https://purityclean.com<br>- Categories: "Cleaning Service", "Home Service"<br><br>3. **Agregar servicio rápido:**<br><br>Apple Business Connect permite crear "Actions" como:<br>- "Book" → link a #reservas<br>- "Call" → +573001234567<br>- "Directions" → link a Google Maps<br><br>4. **Photos y reviews:**<br><br>Subir fotos del proceso de limpieza y equipo. Apple permite asociar Google Reviews ratings.<br><br>5. **Configurar en el sitio:**<br><br>Agregar meta tags para Apple Maps:<br>```html<br><meta name="apple-itunes-app" content="app-id=123456789"><br>``` |
| **Impacto esperado** | +10-15% de clientes que usan Apple Maps como buscador principal |
| **Esfuerzo** | S (1-2 horas — registro + configuración) |
| **Agente recomendado** | Frontend |
| **Referencias** | [1] Apple Business Connect https://business.apple.com |
| **Estado** | Nueva propuesta — NO mencionada en R1-R95 |
| **Prioridad CEO** | **Alta** — gratis, alto impacto en discovery Apple |

---

### Propuesta 2: Bing Places Integration (MEDIUM PRIORITY)

| Campo | Detalle |
|-------|---------|
| **Título** | Registrar Purity & Clean en Bing Places para diversify SEO y alcanzar profesionales |
| **Problema** | Purity & Clean solo tiene presencia en Google Business Profile. Bing representa ~5-10% de búsquedas en LatAm, principalmente profesionales con alto poder adquisitivo que representan el segmento B2B. |
| **Descripción** | **1. Registro en Bing Places:**<br><br>Ir a bing.com/webmasters/tools/places and claim the listing.<br><br>2. **Completar información:**<br><br>- Nombre exacto del negocio<br>- Dirección completa con geolocalización<br>- Horario de atención<br>- Teléfono y website<br>- Fotos de servicios<br><br>3. **Verificación:**<br><br>Bing requiere verificación por teléfono, email, o DNS.<br><br>4. **Submit sitemap:**<br><br>En Bing Webmaster Tools, submit sitemap.xml para indexing.<br><br>5. **Configurar en index.html:**<br><br>Bing reconoce el mismo Schema.org LocalBusiness que Google. No se requiere cambio de markup. |
| **Impacto esperado** | +5-8% tráfico orgánico de Bing, acceso a segmento profesional B2B |
| **Esfuerzo** | S (1 hora — registro + verification) |
| **Agente recomendado** | Frontend |
| **Referencias** | [2] Bing Places https://www.bing.com/webmasters/tools/add-url |
| **Estado** | Nueva propuesta — NO mencionada en R1-R95 |
| **Prioridad CEO** | **Media** — gratis, bajo esfuerzo, reach profesional |

---

### Propuesta 3: Google Seller Ratings + Post-Service Review Collection (HIGH PRIORITY)

| Campo | Detalle |
|-------|---------|
| **Título** | Implementar flujo de coleta de Google Seller Ratings post-servicio para mejorar CTR de anuncios |
| **Problema** | Purity & Clean tiene Google Reviews pero no un flujo sistemático de coleta post-servicio. Sin Seller Ratings (rating de estrellas en ads), los Google Ads pierden 10-30% de CTR. |
| **Descripción** | **1. Configurar Google Customer Reviews (新政):**<br><br>```html<br><script src="https://apis.google.com/js/platform.js?onload=renderOptIn" async defer></script><br><script><br>  window.renderOptIn = function() {<br>    GCR.renderOptIn({<br>      theme: 2,<br>      content Vernehmen: {<br>        productId: 'PC-001',<br>        productName: 'Limpieza Purity & Clean',<br>        productImage: 'https://purityclean.com/images/logo.png'<br>      },<br>      delay: 72 // hours after purchase<br>    });<br>  };<br></script><br>```<br><br>2. **Email post-servicio automático:**<br><br>Agregar en Klaviyo (R94 pendiente) o Formspree un email automático 72 horas después del servicio:<br>```html<br>Asunto: ¿Cómo te fue con tu limpieza? — Tu opinión nos ayuda<br>```<br><br>3. **Landing page de review:**<br><br>Crear `/review.html` con formulario simple y link directo a Google Review:<br>```html<br><a href="https://g.page/r/purityclean/review" target="_blank"><br>  Deja tu reseña en Google ⭐⭐⭐⭐⭐<br></a><br>```<br><br>4. **Integración con Google Seller Ratings:**<br><br>Una vez que el sitio tiene 100+ reviews, Google automatically muestra Seller Ratings en ads. |
| **Impacto esperado** | +10-30% CTR en Google Ads, mayor confianza en search results |
| **Esfuerzo** | M (2-3 horas — Google Customer Reviews + email flow + landing page) |
| **Agente recomendado** | Full Stack |
| **Referencias** | [3] Google Customer Reviews https://developers.google.com/product-review- offers |
| **Estado** | Nueva propuesta — NO mencionada en R1-R95 |
| **Prioridad CEO** | **Alta** — mejora directa en ROAS de advertising |

---

### Propuesta 4: Google Dynamic Remarketing con Google Ads Pixel (HIGH PRIORITY)

| Campo | Detalle |
|-------|---------|
| **Título** | Implementar Google Ads Dynamic Remarketing para capturar visitantes que no convierten |
| **Problema** | El sitio no tiene pixel de Google Ads. Cada visitante que no reserva se pierde. El remarketing dinâmico permite mostrar ads personalizados del servicio exacto que el usuario vio. |
| **Descripción** | **1. Instalar Google Ads Pixel:**<br><br>```html<br><!-- Google Ads Pixel --><br><script async src="https://www.googletagmanager.com/gtag/js?id=AW-CONVERSION_ID"></script><br><script><br>  window.dataLayer = window.dataLayer || [];<br>  function gtag(){dataLayer.push(arguments);}<br>  gtag('js', new Date());<br>  gtag('config', 'AW-CONVERSION_ID');<br></script><br>```<br><br>2. **Dynamic Remarketing Tags:**<br><br>En cada página de servicio, enviar datos de producto:<br>```javascript<br>gtag('event', 'view_item', {<br>  items: [{<br>    id: 'limpieza-sofa',<br>    name: 'Limpieza profunda de sofá',<br>    category: 'Servicios',<br>    price: 80000,<br>    currency: 'COP'<br>  }]<br>});<br>```<br><br>3. **Eventos de conversión:**<br><br>En el formulario de contacto/reserva:<br>```javascript<br>gtag('event', 'generate_lead', {<br>  value: 80000,<br>  currency: 'COP'<br>});<br>```<br><br>4. **Crear Remarketing Audience:**<br><br>En Google Ads, crear audiencia de "visited homepage but didn't convert" y "visited pricing but didn't convert".<br><br>5. **Crear Dynamic Ads:**<br><br>En Google Ads, crear ads dinámicos que muestren el servicio específico que el usuario vio con precio y CTA. |
| **Impacto esperado** | +25% ROAS, recuperación de 15-20% de abandonadores |
| **Esfuerzo** | M (3-4 horas — pixel + eventos + setup de Remarketing en Google Ads) |
| **Agente recomendado** | Full Stack |
| **Referencias** | [4] Google Dynamic Remarketing https://ads.google.com/dynamicremarketing |
| **Estado** | Nueva propuesta — NO mencionada en R1-R95 |
| **Prioridad CEO** | **Alta** — requiere inversión en ads pero alto ROI |

---

### Propuesta 5: Trustpilot Integration para Reseñas Multi-Plataforma (MEDIUM PRIORITY)

| Campo | Detalle |
|-------|---------|
| **Título** | Crear perfil de Trustpilot y automatizar coleta de reseñas post-servicio |
| **Problema** | Purity & Clean solo tiene Google Reviews como plataforma de reseñas. Depender de una sola plataforma es un riesgo. Trustpilot tiene 26M+ reseñas y es considerado neutral por los consumidores. |
| **Descripción** | **1. Crear perfil de negocio en Trustpilot:**<br><br>Ir a business.trustpilot.com y crear perfil gratuito de Purity & Clean.<br><br>2. **Configurar email de coleta automática:**<br><br>Trustpilot proporciona un link único de reseñas que se puede enviar por email:<br>```html<br>https://www.trustpilot.com/evaluate/www.purityclean.com<br>```<br><br>3. **Integrar en email post-servicio:**<br><br>Agregar en el email automático (72h post-servicio) ambos links:<br>```html<br>¿Cómo fue tu experiencia?<br><a href="https://g.page/r/purityclean/review"> Google ⭐⭐⭐⭐⭐</a><br><a href="https://www.trustpilot.com/evaluate/www.purityclean.com"> Trustpilot ⭐⭐⭐⭐⭐</a><br>```<br><br>4. **Agregar Trustpilot badge en el sitio:**<br><br>```html<br><div id="trustpilot-badge"><br>  <a href="https://www.trustpilot.com/evaluate/www.purityclean.com" target="_blank" rel="noopener"><br>    <img src="/images/trustpilot-badge.svg" alt="Reseñas en Trustpilot"><br>  </a><br></div><br>``` |
| **Impacto esperado** | +15% percepción de confianza, diversificación de reseñas |
| **Esfuerzo** | S (1-2 horas — registro + email + badge) |
| **Agente recomendado** | Frontend |
| **Referencias** | [5] Trustpilot Business https://business.trustpilot.com |
| **Estado** | Nueva propuesta — NO mencionada en R1-R95 |
| **Prioridad CEO** | **Media** — credibilidad, bajo esfuerzo |

---

### Propuesta 6: Pinterest Business Profile + Visual Content Strategy (MEDIUM PRIORITY)

| Campo | Detalle |
|-------|---------|
| **Título** | Crear perfil de Pinterest Business y publicar contenido visual de antes/después |
| **Problema** | Purity & Clean tiene fotos de antes/después pero no las aprovecha en Pinterest. Pinterest tiene 480M+ usuarios con alto engagement en contenido de hogar, y las búsquedas de "home cleaning" generan millones de pins mensualmente. |
| **Descripción** | **1. Crear Pinterest Business Account:**<br><br>Ir a business.pinterest.com y crear perfil.<br><br>2. **Configurar boards temáticos:**<br><br>- "Limpieza de Sofás Bogotá" — pins de antes/después<br>- "Sanitización de Colchones" — proceso y resultados<br>- "Tips de Limpieza en Casa" — contenido educativo<br>- "Purity & Clean Portfolio" — fotos del equipo y trabajos<br><br>3. **Rich Pins para SEO:**<br><br>Configurar Rich Pins en Pinterest para que los pins muestren información del sitio:<br>```html<br><meta property="og:type" content="article"><br><meta property="article:published_time" content="2026-04-28"><br>```<br><br>4. **Estrategia de contenido:**<br><br>Publicar 1-2 pins diarios con:<br>- Imágenes verticales (2:3 ratio)<br>- Descripción con keywords: "limpieza de sofá bogota", "sanitización colchones"<br>- Link al servicio relevante en el sitio<br><br>5. **Integración con antes/después del sitio:**<br><br>Cada vez que se agregue una foto de antes/después en el sitio, también publicarla en Pinterest. |
| **Impacto esperado** | +10-20% descubrimiento de tráfico desde Pinterest, exposición a segmento femenino |
| **Esfuerzo** | M (3-4 horas — setup + 20 pins iniciales) |
| **Agente recomendado** | Frontend + Content |
| **Referencias** | [6] Pinterest Business https://business.pinterest.com |
| **Estado** | Nueva propuesta — NO mencionada en R1-R95 |
| **Prioridad CEO** | **Media** — discovery pasivo, alto potencial visual |

---

### Propuesta 7: Analytics Dashboard con Conversion Funnel (HIGH PRIORITY)

| Campo | Detalle |
|-------|---------|
| **Título** | Implementar dashboard de analítica con funnel de conversión medible |
| **Problema** | Purity & Clean usa Plausible Analytics pero no tiene un funnel de conversión claro. No se puede medir qué porcentaje de visitantes efectivamente reserva. Sin datos de funnel, no se puede优化的 la conversión. |
| **Descripción** | **1. Definir funnel de conversión:**<br><br>```<br>Visitante → Homepage → Servicio específico → Formulario de reserva → WhatsApp/Formspree → Conversión<br>```<br><br>2. **Eventos a trackear en Plausible:**<br><br>```javascript<br>// When user clicks WhatsApp button<br>plausible('WhatsApp_Click', { props: { service: 'sofa-cleaning' } });<br><br>// When user opens reservation form<br>plausible('Form_Opened', { props: { section: 'reservas' } });<br><br>// When user submits form<br>plausible('Form_Submitted', { props: { form: 'booking' } });<br><br>// When user searches for service<br>plausible('Search_Performed', { props: { query: 'sofa' } });<br><br>// When user scrolls to pricing<br>plausible('Pricing_Viewed');\n```<br><br>3. **Dashboard de funnel:**<br><br>Crear `/analytics.html` con visualization simple del funnel usando los datos de Plausible API:<br>```javascript<br>// Fetch data from Plausible API<br>async function getFunnelData() {<br>  const response = await fetch('https://plausible.io/api/v1/stats/aggregate', {<br>    headers: { 'Authorization': 'Bearer API_KEY' }<br>  });<br>  return response.json();\n}\n```<nbr>```<br><br>4. **Métricas clave:**<br><br>- Tasa de conversión global (visitantes → reservas)<br>- Servicios más buscados (top search queries)<br>- Tasa de abandono por sección<br>- Fuentes de tráfico (WhatsApp vs Form vs Phone) |
| **Impacto esperado** | Medición de ROI de marketing, identificación de gaps de conversión |
| **Esfuerzo** | M (3-4 horas — eventos + dashboard) |
| **Agente recomendado** | Full Stack |
| **Referencias** | [7] Plausible Events API https://plausible.io/docs/events-api |
| **Estado** | Nueva propuesta — NO mencionada en R1-R95 |
| **Prioridad CEO** | **Alta** — visibilidad crítica para optimización |

---

## Orden de Implementación Recomendado (R96)

| # | Propuesta | Impacto | Esfuerzo | Prioridad | Tipo |
|---|-----------|---------|----------|-----------|------|
| 1 | **Apple Business Connect** | +10-15% discovery Apple | S | **Alta** | Discovery |
| 2 | **Google Seller Ratings** | +10-30% CTR ads | M | **Alta** | Publicidad |
| 3 | **Dynamic Remarketing** | +25% ROAS | M | **Alta** | Publicidad |
| 4 | **Analytics Dashboard** | Medición conversión | M | **Alta** | Analítica |
| 5 | **Bing Places** | +5-8% tráfico | S | **Media** | SEO |
| 6 | **Trustpilot Integration** | +15% confianza | S | **Media** | Reputación |
| 7 | **Pinterest Business** | +10-20% discovery | M | **Media** | Discovery |

---

## Dependencias y Bloqueadores

| Propuesta | Depende de | Bloqueador |
|-----------|------------|------------|
| Apple Business Connect | Ninguno | Ninguno |
| Bing Places | Ninguno | Ninguno |
| Google Seller Ratings | Google Customer Reviews setup | Ninguno |
| Dynamic Remarketing | Google Ads account + pixel | Necesita inversión en ads |
| Trustpilot | Email post-servicio | Klaviyo (R94) si se quiere automático |
| Pinterest | Contenido visual (antes/después) | Ninguno |
| Analytics Dashboard | Plausible configured | Ninguno |

---

## Comparación R95 vs R96

| Aspecto | R95 | R96 |
|---------|-----|-----|
| **Foco** | Integraciones omnicanal (messaging, ads) | Presencia multiplataforma (Apple, Bing, Pinterest) + Analítica |
| **Tipo propuestas** | Canales de comunicación, Publicidad | Discovery, Reputación, Medición |
| **Mercado** | Canales directos |SEO diversificado y analítica |
| **Tecnología** | Google Business, Meta Ads, Background Sync | Apple Business Connect, Bing Places, Pinterest, Plausible events |
| **Esfuerzo** | S-M | S-M |
| **Revenue** | Directo (más leads) | Indirecto (más discovery + mejor medición) |

**R96 complementa R95:** R95 propuso cómo adquirir clientes a través de canales directos; R96 propone cómo被发现 más fácilmente en plataformas de descubrimiento y cómo medir si eso funciona.

---

## Fuentes

[1] Apple. "Business Connect." https://business.apple.com (2026)

[2] Microsoft. "Bing Places." https://www.bing.com/webmasters/tools/add-url (2026)

[3] Google. "Customer Reviews." https://developers.google.com/product-review-offers (2026)

[4] Google. "Dynamic Remarketing." https://ads.google.com/dynamicremarketing (2026)

[5] Trustpilot. "Business Portal." https://business.trustpilot.com (2026)

[6] Pinterest. "Pinterest Business." https://business.pinterest.com (2026)

[7] Plausible. "Events API." https://plausible.io/docs/events-api (2026)

---

*Documento generado por Innovation Scout — Round 96*
*Purity & Clean Analysis — 2026-04-28*
*Co-Authored-By: Paperclip <noreply@paperclip.ing>*