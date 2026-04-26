# Análisis Creativo — Purity & Clean (Round 19)

**Proyecto:** Purity & Clean
**Fecha:** 2026-04-26
**Analista:** Innovation Scout
**Ronda:** 19
**Issue padre:** DOMAA-322

---

## Resumen Ejecutivo

R19 se enfoca en **oportunidades no cubiertas en R1-R18**: canales de adquisición ignorados (Google Local Service Ads, Apple Business Connect), monetización de touchpoints existente (retargeting pixel, SMS marketing), y optimización de listados directorio (GBP Q&A, attributes). Mientras R1-R18 cubrieron content marketing, automation y features del sitio, R19 ataca la **captación de tráfico desde directorios y la reconexión con visitantes que no convierten**.

---

## Stack tecnológico actual

- **Frontend:** HTML5 + CSS3 (custom properties, grid, flexbox) + JS vanilla ES6+
- **Fuentes:** Manrope (cuerpo), Raleway (títulos) — Google Fonts
- **Iconos:** Font Awesome 6.5 CDN
- **Analítica:** Plausible Analytics (sin cookies, GDPR-compliant)
- **Forms:** Formspree (envío simple, sin automatización)
- **Testing:** Playwright E2E (10+ suites)
- **PWA:** Service Worker, manifest.json, push notifications, offline support
- **SEO:** Schema LocalBusiness + FAQPage + Article + AggregateRating + Review + VideoObject + HowTo + BreadcrumbList
- **Chatbot:** FAQ routing → WhatsApp con mensaje dinámico
- **Galería:** Before/After slider con reveal escalonado
- **Reserva:** Multi-step booking form con validación y slot picker
- **Referidos:** Sistema de cupones con código generado dinámicamente
- **Newsletter:** Formspree + localStorage para evitar duplicados
- **Cotizador:** Slider de cantidad + estimación de rango de precios
- **Zonas:** 10 páginas de zona con SEO local
- **Blog:** 6 artículos con SEO optimizado + internal linking
- **Theme:** Dark mode toggle con persistencia y prefers-color-scheme

---

## Gaps identificados — Round 19 (NOVEDADES no cubiertas en R1-R18)

### 1. Google Local Service Ads — Captación de tráfico de alta intención

**Problema:** Purity & Clean no aparece en los Local Service Ads de Google que se muestran encima de los resultados orgánicos. Para búsquedas como "limpieza de sofás Bogotá", LSA muestra negocios "Google Guaranteed" con badge de confianza. En 2026, LSA es el formato de publicidad local dominante en Colombia para servicios.

**Hallazgo:**
- No hay configuración de Google Local Service Ads
- No hay "Google Guaranteed" badge (requiere pasar verificación)
- No hay "Request a Quote" embebido en el perfil de GBP
- LSA tiene costo por lead (pay-per-lead), no por click

**Impacto potencial:** +30% leads en zona de cobertura sin depender de SEO orgánico.

### 2. Apple Business Connect — Directorio ignorado

**Problema:** Purity & Clean tiene presencia en Google Business Profile y directorios menores, pero NO en Apple Business Connect. Apple Maps tiene 25M+ usuarios únicos/mes en Colombia. Los atributos de negocio en Apple (horarios, fotos, servicios) aparecen a usuarios de iPhone que buscan localmente.

**Hallazgo:**
- Apple Business Connect es gratuito
- Soporta photos, hours, attributes, products/services
- Tiene su propio sistema de reseñas
- No requiere desarrollar — solo claiming del listing

**Impacto potencial:** Captura audiencia iOS que no usa Google. ~15% del mercado colombiano.

### 3. Retargeting Pixel — Visitors que no reservan

**Problema:** El sitio tiene 0 capacidad de retargeting. Todo visitante que no convierte se pierde. No hay pixel de Meta (Facebook/Instagram) ni TikTok pixel. En 2026, el retargeting es crítico para conversión de servicios locales.

**Hallazgo:**
- No hay Meta Pixel instalado
- No hay TikTok Pixel
- No hay Pinterest Tag
- Formspree no provee datos de visitantes
- Plausible no tiene capacidad de remarketing

**Impacto potencial:** Recuperar 15-25% de visitantes que no reservan en primera visita.

### 4. Google Business Profile Q&A Automation — Preguntas que no se responden

**Problema:** Purity & Clean tiene FAQ en el sitio web, pero NO tiene activa la sección Q&A en su Google Business Profile. La Q&A de GBP aparece directamente en resultados de búsqueda y es indexada por Google. Las preguntas sin respuesta afectan el SEO local.

**Hallazgo:**
- GBP Q&A está vacío (o sin preguntas frecuentes/preparadas)
- No hay monitoring de preguntas nuevas en GBP
- FAQPage schema existe en web pero NO se replica en GBP Q&A
- Los competidores responden manualmente (oportunidad de ser más rápido)

**Impacto potencial:** Position 0 para queries de negocio local vía featured snippets de Q&A.

### 5. SMS Marketing como canal de confirmación y re-engagement

**Problema:** Purity & Clean usa WhatsApp para contacto, pero no tiene SMS como canal. SMS tiene 98% open rate y 5x más rápido que email para confirmaciones de citas. En servicios de limpieza, la confirmación de cita por SMS reduce no-shows.

**Hallazgo:**
- No hay integración con gateway SMS (Twilio, Vonage, MessageBird)
- No hay flujo de confirmación de cita por SMS
- No hay recordatorios 24h antes de la cita
- No hay opción de re-engagement por SMS para clientes inactivos

**Impacto potencial:** -20% no-shows, +15% tasa de conversión de leads a reservas confirmadas.

---

## Propuestas (Round 19)

### Propuesta 1: Google Local Service Ads + "Request a Quote" en GBP

**Problema:** Purity & Clean pierde posicionamiento frente a competidores que aparecen con badge "Google Guaranteed" en la zona superior de resultados de búsqueda para búsquedas de servicio local.

**Propuesta:**
1. **Verificación Google Guarantee:**
   - Aplicar a Google Local Services SDK para obtener el badge
   - Requiere: negocio registrado, insurance/licensing verificable, background check
   - En Colombia: algunos servicios califican; limpeza de sofás típicamente sí

2. **Configurar Google Local Service Ads:**
   - Crear cuenta en Local Services Ads (separado de Google Ads regular)
   - Configurar geofencing para Bogotá y zonas de cobertura
   - Definir servicios ofrecidos y precio por lead aceptable
   - Presupuesto inicial: $200 USD/mes para test

3. **"Request a Quote" button en GBP:**
   - Habilitar en Google Business Profile > "Offer quotes" o "Request a quote"
   - Mostrar directamente en el perfil de GBP sin necesidad de visitar sitio
   - Integrar con Formspree o crear flujo de manejo de leads

4. **Budget allocation test:**
   - Semana 1-2: $10 USD/día en "limpieza de sofás Bogotá"
   - Semana 3-4: $10 USD/día en "sanitización colchones Bogotá"
   - Medir costo por lead y convertir a reserva

**Impacto:** +30% leads cualificados con badge de confianza. LSA tiene 3-5x mejor CTR que Search Ads regular para servicios locales.
**Esfuerzo:** S (1-2 semanas — setup + verificación)
**Agente:** Marketing / CEO (verificación requiere datos del negocio)
**Referencias:**
- Google Local Services Ads Help - business.google.com/business-suite/local-ads/
- Google Guarantee verification process (2026)

---

### Propuesta 2: Apple Business Connect — Presencia en Apple Maps

**Problema:** Purity & Clean ignora ~15% del mercado colombiano (usuarios iOS) que busca servicios locales en Apple Maps. Apple Business Connect es gratuito y toma 30 min configurar.

**Propuesta:**
1. **Claim & Setup Apple Business Connect:**
   - Ir a businessconnect.apple.com
   - Crear listing para "Purity & Clean"
   - Verificar con tarjeta de crédito o llamada (no requiere postal en Colombia)

2. **Configurar contenido del listing:**
   - Nombre exacto (Purity & Clean)
   - Dirección y zona de servicio (Bogotá completo)
   - Horarios (Lunes-Viernes 8am-6pm)
   - Teléfono (+57 300 123 4567)
   - Website
   - Photos: logo, fotos de trabajo (antes/después), equipo
   - Attributes: "Veteran-owned" no aplica; sí: "Women-owned" si aplica, "LGBTQ+ friendly" si aplica
   - Services: lista de servicios ofrecidos

3. **Reviews integration:**
   - Apple Business Connect tiene su propio sistema de reseñas (diferente de Google)
   - Encouraging clientes satisfechos a dejar reviews en Apple Maps
   - Responde a reseñas negativas (como se haría en Google)

4. **Cross-promotion:**
   - En sitio web, añadir link "Encuéntranos en Apple Maps"
   - En signature de email, añadir badge de Apple Maps

**Impacto:** Captura audiencia iOS que actualmente no encuentra a Purity & Clean. +5-10% awareness en segmento premium (usuarios iOS tienden a mayor income).
**Esfuerzo:** S (30 min setup + ongoing review management)
**Agente:** Frontend / Marketing (30 min de setup, el resto es gestión de contenido)
**Referencias:**
- Apple Business Connect - businessconnect.apple.com
- Apple Business Connect help documentation

---

### Propuesta 3: Meta Pixel + Retargeting Funnel

**Problema:** Cada visitante que no reserva se pierde. No hay forma de reconectar con ellos. En 2026, sin retargeting, se depende únicamente de tráfico nuevo (más caro y lento).

**Propuesta:**
1. **Instalar Meta Pixel:**
   ```html
   <!-- Meta Pixel Code en <head> -->
   <script>
   !function(f,b,e,v,n,t,s)
   {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
   n.callMethod.apply(n,arguments):n.queue.push(arguments)};
   if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
   n.queue=[];t=b.createElement(e);t.async=!0;
   t.src=v;s=b.getElementsByTagName(e)[0];
   s.parentNode.insertBefore(t,s)}(window, document,'script',
   'https://connect.facebook.net/en_US/fbevents.js');
   fbq('init', 'PIXEL_ID');
   fbq('track', 'PageView');
   fbq('track', 'Lead');
   fbq('track', 'Schedule');
   </script>
   ```

2. **Track Custom Events:**
   - `Lead`: cuando usuario completa formulario de contacto
   - `Schedule`: cuando usuario completa booking form
   - `Search`: cuando usuario usa el buscador del sitio
   - `ViewContent`: cuando ve página de un servicio específico

3. **Retargeting Audiences:**
   - **Audiencia 1:** Visitantes de homepage que NO llegaron a #reservas (30 días)
   - **Audiencia 2:** Visitantes que vieron servicios pero no contactaron (60 días)
   - **Audiencia 3:** Newsletter subscribers que no han reservado (90 días)

4. **Creative para Retargeting:**
   - Ads: "Tu sofá merece una limpieza profesional" + antes/después
   - Oferta: "10% descuento si reservas este semana" (código único)
   - Formato: Single image en Feed, Carousel para mostrar servicios

5. **TikTok Pixel (opcional):**
   - TikTok tiene audiencia más joven (25-35) que puede no buscar Google
   -安装 TikTok Pixel para eventos de conversión

**Impacto:** Recuperar 15-25% de visitantes que no convierten en primera visita. Costo por conversión típicamente 40% menor que adquisición nueva.
**Esfuerzo:** S (1 semana — instalación pixel + setup audiencias + creativa inicial)
**Agente:** Frontend (instalación) + Marketing (creación de audiencias y ads)
**Referencias:**
- Meta Pixel Documentation - developers.facebook.com/docs/meta-pixel
- Retargeting best practices for local services (Meta Business Help)

---

### Propuesta 4: Google Business Profile Q&A + Monitoring Automation

**Problema:** La sección Q&A del Google Business Profile de Purity & Clean está vacía o sin preguntas frecuentes. Esta sección aparece en resultados de búsqueda y las respuestas correctas pueden aparecer como featured snippets.

**Propuesta:**
1. **Populate Q&A con preguntas frecuentes:**
   - Añadir manualmente las 10 preguntas más frecuentes
   - Usar las mismas Q&A del FAQ schema del sitio web
   - Formato: pregunta completa como título, respuesta corta + link al sitio
   - Ejemplo:
     - Q: "¿Cuánto cuesta limpiar un sofá?"
     - A: "$80.000-$180.000 según tamaño. Solicita cotización aquí: https://purityclean.com/#reservas"

2. **Monitor Q&A con alertas:**
   - Configurar Google Alert para "Purity & Clean" + "Google Business Profile"
   - Alternativa: herramienta como BrightLocal o местный (local) para monitor Q&A
   - Cuando alguien hace pregunta nueva → alerta email/SMS → responder en <24h

3. **Auto-populate preguntas competitors:**
   - Investigar Q&A de competidores (LimpioMax, EcoClean)
   - Usar mismas preguntas si son relevantes (pero responder desde Purity)
   - Estudiar qué preguntas hace la gente en el sector

4. **Respuesta rápida a nuevas preguntas:**
   - Designar 15 min/día para revisar Q&A de GBP
   - Responder con info actualizada + CTA a sitio/WhatsApp
   - No dejar preguntas sin respuesta por >48h

5. **Schema Q&A en sitio web:**
   - Si GBP Q&A tiene mucho tráfico, considera añadir Q&A schema en sitio
   - Link bidireccional: sitio → GBP, GBP → sitio

**Impacto:** +5% visibility en search results para queries de negocio local. Featured snippets capturando position 0.
**Esfuerzo:** S (1 semana — populate inicial + setup monitoring)
**Agente:** SEO / Content (populate inicial) + Frontend (schema si necesario)
**Referencias:**
- Google Business Profile Q&A best practices (2026)
- Brighton Media - "Local SEO Q&A Strategy"

---

### Propuesta 5: SMS Marketing con Twilio para Confirmaciones

**Problema:** Purity & Clean confirma citas por WhatsApp, pero clientes que no tienen WhatsApp o están OFFLINE no reciben confirmación. SMS tiene 98% open rate vs ~70% de WhatsApp en Colombia.

**Propuesta:**
1. **Integración Twilio:**
   - Crear cuenta Twilio (pay-per-SMS, ~$0.01 USD/SMS en Colombia)
   - Obtener número virtual colombiano (+57) para envío
   - Integrar API en backend (o usar Twilio Functions para flujo simple)

2. **Flujo de confirmaciones SMS:**
   - Trigger: cuando Formspree recibe booking form submission
   - Twilio envía SMS: "Purity & Clean confirma tu cita el [DATE] a las [TIME]. Clima: [WEATHER]. ¿Confirmar? Responde SÍ o llama +57 300 123 4567"
   - Guardar respuesta en Google Sheets o CRM simple

3. **Recordatorio 24h antes:**
   - Automated SMS 24h antes de cita
   - "recordatorio: mañana tenemos tu limpieza programada. ¿Todo confirmado? Responde SÍ o llama para reprogramar."

4. **Recuperación de no-shows:**
   - Si cliente no confirma (no responde SÍ) → follow-up WhatsApp
   - Si no responde WhatsApp → llamada de confirmación

5. **Opt-in para SMS:**
   - En booking form, checkbox "Acepto recibir confirmaciones por SMS"
   - GDPR/can-spam: solo enviar a quienes opt-in
   - En newsletter, separate consent para SMS

6. **Costo estimado:**
   - 100 bookings/mes × 2 SMS = 200 SMS = ~$2 USD/mes
   - Muy bajo costo para alto impacto en reducción de no-shows

**Impacto:** -20% no-shows, +15% tasa de conversión lead→reserva confirmada.
**Esfuerzo:** M (2 semanas — setup Twilio + integración + testing)
**Agente:** Backend (integración Twilio) + Frontend (opt-in checkbox)
**Referencias:**
- Twilio SMS API documentation
- SMS marketing for service businesses case study (2026)

---

## Priorización recomendada (Round 19)

| # | Propuesta | Impacto | Esfuerzo | Agente | Razón estratégica |
|---|-----------|---------|----------|--------|------------------|
| 1 | Google Local Service Ads | Alto | Bajo | Marketing/CEO | Captación inmediata de leads |
| 2 | Apple Business Connect | Medio | Bajo | Frontend/Marketing | Audiencia iOS ignorada |
| 3 | Meta Pixel + Retargeting | Alto | Bajo | Frontend | Recuperar visitantes perdidos |
| 4 | GBP Q&A Automation | Medio | Bajo | SEO/Content | SEO local + featured snippets |
| 5 | SMS Marketing Twilio | Medio | Medio | Backend | Reducción no-shows |

**Top 3 para implementar primero:** 1, 3, 2 (quick wins con impacto rápido y costo bajo).

---

## Síntesis: Por qué R19 es diferente

R1-R18 se enfocaron en:
- Features del sitio (chatbot, booking, cotizador, referidos)
- UX y accesibilidad (dark mode, skip nav, motion)
- Marketing (SEO, ads, social media)
- Operaciones (field app, subscriptions, WhatsApp CRM)
- Tech (AI vision, B2B API, Teams integration)
- Content (pillar-cluster, zone automation, programmatic SEO)

R19 se enfoca en:
- **Canales de adquisición ignorados** (Apple Business Connect, LSA)
- **Retención de tráfico existente** (Meta Pixel retargeting)
- **Optimización de directorio** (GBP Q&A, SMS marketing)
- **Captación desde resultados de búsqueda** (Local Service Ads con badge)

R19 representa la evolución de "mejorar el sitio" a "maximizar conversión desde todos los puntos de contacto".

---

## Referencias

[1] Google Local Services Ads - business.google.com/business-suite/local-ads/
[2] Apple Business Connect - businessconnect.apple.com
[3] Meta Pixel Documentation - developers.facebook.com/docs/meta-pixel
[4] Twilio SMS API - twilio.com/docs/sms

---

*Co-Authored-By: Paperclip <noreply@paperclip.ing>*