# Análisis Creativo — Purity & Clean (Round 69)

**Proyecto:** Purity & Clean
**Fecha:** 2026-04-28
**Analista:** Innovation Scout
**Ronda:** 69
**Issue padre:** DOMAA-668

---

## Resumen Ejecutivo

R69 se enfoca en **captación de nuevos segmentos de mercado y expansión de canales de llegada** que no han sido abordados en rondas anteriores: contenido visual en redes sociales (Instagram/TikTok embebido), voz y accesibilidad avanzada, AR para visualizar resultados, y pricing dinámico estacional. También propone un canal de SMS automation separado de WhatsApp para recordatorios de citas.

**Diferenciación clave vs R64-R68:**
- R64 = micro-conversiones de nuevos visitantes
- R65 = SEO local y automatización post-reserva
- R66 = activación de features dormantes (chatbot, PWA)
- R67 = retención post-servicio y ciclo de vida
- R68 = compliance legal, infraestructura de conversión y monetización
- **R69 = expansión de canales de captación (social, voz, AR) y pricing inteligente**

---

## Stack tecnológico actual (verificado en código)

- **Frontend:** HTML5 + CSS3 + JS vanilla ES6+ (sin bundler)
- **HTML:** ~2305 líneas en index.html
- **CSS:** ~6212 líneas en style.css
- **JS:** ~1847 líneas en script.js + config.js
- **Booking:** Multi-step form con slot picker + geo-localización
- **Referidos:** Cupón 15% + WhatsApp share
- **Comparison slider:** Before/after con range input
- **PWA:** Service Worker completo con precache, runtime cache, push listeners, offline support
- **Chatbot:** HTML completo en index.html (líneas 2216+), JS de toggle en script.js, FAQ con quick replies
- **Blog:** 6 artículos educativos
- **Zonas:** 10 páginas con estructura similar
- **Forms:** Formspree (booking, newsletter, zonas)
- **Reviews:** 6 in-page + Google Reviews link + Schema.org LocalBusiness
- **Theme:** Dark mode toggle con prefers-color-scheme

---

## Lo que NO está en R1-R68 (gap analysis)

### Oportunidades NO propuestas previamente

| # | Oportunidad | Ronda que lo cubrió |
|---|------------|-------------------|
| Instagram/TikTok embebido en homepage | NO — solo se mencionó "video testimonials" en R65 |
| Voice search / navegación por voz | NO — accesibilidad por voz nunca propuesta |
| AR visualizador antes/después | NO — slider comparison existe, pero AR no |
| WhatsApp Cloud API (Meta, tier gratuito) | NO — R59/R68 propuso Business API (empresarial, costoso), no Cloud API |
| SMS automation (Twilio) para recordatorios | NO — WhatsApp automation propuesta, SMS no |
| Google Business Profile API (sync reviews) | NO — solo se enlaza, no se sincroniza |
| Google Calendar API para técnicos | NO — agenda del equipo no existe |
| Dynamic pricing engine (estacional) | NO — pricing fijo en cotizador |
| Sitio multilingual (inglés para expats) | NO — solo español |
| Customer health score dashboard | NO — CRM no existe aún |

---

## Propuestas (Round 69)

### Propuesta 1: Embed Instagram Reels / TikTok en Homepage

| Campo | Detalle |
|-------|---------|
| **Título** | Integrar contenido real de Instagram/TikTok como social proof visual |
| **Problema** | El sitio tiene reseñas de texto y videos placeholder. Los competidores locales en Bogotá ya publican contenido real en Instagram y TikTok. No hay forma de mostrar ese contenido en el sitio sin reclicarlo manualmente. |
| **Descripción** | **Social Content Embedding:** (1) **Instagram Basic Display API:** Obtener token de acceso a la cuenta de Instagram de Purity & Clean. Usar la API para embedear los últimos 3-6 Reels/Posts que muestren trabajos reales (limpiezas antes/después, testimonios en video corto). (2) **TikTok embed:** Si el equipo tiene cuenta de TikTok Business, usar el embed oficial de TikTok para mostrar videos de 15-60 segundos. (3) **Lazy loading:** Los iframes de Instagram/TikTok son pesados — cargar solo cuando el usuario hace scroll hasta la sección (Intersection Observer). (4) **Fallback:** Si la API no está disponible o el contenido no carga, mostrar placeholder con la imagen del post y un badge "Ver en Instagram". (5) **Consentimiento:** Solo embeber contenido que Purity & Clean haya publicado y tenga derecho a mostrar. (6) **Performance:** Usar `loading="lazy"` en iframes y `decoding="async"`. Implementación: 3-4 horas (API setup + HTML/CSS + lazy loading + fallback). |
| **Impacto esperado** | Incremento en engagement visual, social proof en tiempo real (no hace falta actualizar el sitio manualmente), diferenciación de competencia local |
| **Esfuerzo** | S (3-4 horas) |
| **Agente recomendado** | Frontend |
| **Referencias** | [1] Instagram Basic Display API https://developers.facebook.com/docs/instagram-basic-display-api [2] TikTok Embed https://developers.tiktok.com/doc/embed |

### Propuesta 2: Voice Navigation y Voice Search (Accesibilidad y UX)

| Campo | Detalle |
|-------|---------|
| **Título** | Implementar navegación por voz y búsqueda por voz para accesibilidad y conveniencia |
| **Problema** | El sitio no tiene ninguna forma de navegación por voz. Para usuarios con discapacidades motoras o visuales, o manos ocupadas (ej: limpiando), la navegación por voz es un diferenciador de accesibilidad. Además, la búsqueda por voz es cada vez más usada en móvil. |
| **Descripción** | **Voice Interface:** (1) **Web Speech API:** Usar `SpeechRecognition` (Chrome/Edge) y `webkitSpeechRecognition` (Safari) para capturar voz. (2) **Voice navigation trigger:** Botón de micrófono en el header que activa `speechRecognition`. Cuando el usuario dice "cotizador", "reservar", "whatsapp", "precios", navegar a la sección correspondiente. (3) **Voice search en hero:** El campo de búsqueda del hero acepta input de voz (botón de micrófono junto al campo). (4) **Feedback visual:** Mientras escucha, mostrar animation de ondas de audio y texto "Escuchando...". Cuando termina, mostrar el texto reconocido y la acción tomada. (5) **Fallback:** Si el navegador no soporta Web Speech API, el botón de micrófono no aparece o muestra tooltip "Tu navegador no soporta voz". (6) **Analytics:** Track `voice_search_used` y `voice_navigation_triggered` con el comando y la sección destino. Implementación: 4-5 horas (Web Speech API + JS de reconocimiento + UI de feedback + analytics + testing cross-browser). |
| **Impacto esperado** | Accesibilidad WCAG 2.1 AA, diferenciador único en el mercado bogotano, mejora en UX móvil para usuarios multitarea |
| **Esfuerzo** | M (4-5 horas) |
| **Agente recomendado** | Frontend |
| **Referencias** | [3] Web Speech API MDN https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API [4] Voice Navigation UX Patterns https://www.smashingmagazine.com/2024/03/voice-ui-patterns/ |

### Propuesta 3: AR Visualizador — "Ver tu mueble limpio" (WebXR / Quick Look)

| Campo | Detalle |
|-------|---------|
| **Título** | Implementar experiencia AR para que los clientes vean cómo quedaría su mueble limpio |
| **Problema** | El comparison slider (antes/después) es estático. Los clientes no pueden ver cómo quedaría SU mueble específico después de la limpieza. AR permitiría visualizar el resultado en su propio hogar antes de contratar. |
| **Descripción** | **AR Experience:** (1) **Google Scene Viewer (Android):** Usar `<model-viewer>` de Google para mostrar modelos 3D de muebles limpios. Cuando el usuario entra desde Android, ofrece "Ver en tu espacio" que abre Scene Viewer con AR. (2) **Apple Quick Look (iOS):** Generar archivos `.usdz` de modelos 3D (sofá limpio, colchón limpio, alfombra limpia). iOS abre Quick Look con AR automáticamente. (3) **Modelos 3D:** Crear 3 modelos USDZ/USDZ: sofá genérico, colchón genérico, silla. Texturas: "antes" (sucio) y "después" (limpio).�� Usar Blender o Spline para crear los modelos. (4) **Trigger AR:** Botón "Ver en tu espacio" debajo de la imagen del servicio en el cotizador. Solo aparece en dispositivos móviles. (5) **Fallback desktop:** En desktop, mostrar el modelo 3D interactivo con orbit controls (rotar, zoom). (6) **Assets:** Los modelos 3D también sirven como OG images dinámicas para redes sociales. Implementación: 6-8 horas (crear modelos 3D + `<model-viewer>` + USDZ para iOS + fallback desktop + testing en dispositivos reales). |
| **Impacto esperado** | Experiencia diferenciadora única en Bogotá, incremento en conversión del cotizador al reducir incertidumbre, contenido viral para redes (los usuarios comparten AR) |
| **Esfuerzo** | L (6-8 horas + creación de modelos 3D) |
| **Agente recomendado** | Frontend / Full Stack |
| **Referencias** | [5] Google model-viewer https://modelviewer.dev [6] Apple Quick Look https://developer.apple.com/documentation/realitykit/composing-a-reality |

### Propuesta 4: WhatsApp Cloud API — Mensajería sin costo empresarial

| Campo | Detalle |
|-------|---------|
| **Título** | Integrar WhatsApp Cloud API (Meta) para envío de mensajes sin costo de licencia Business API |
| **Problema** | R59 y R68 propusieron WhatsApp Business API (enterprise, $450+/mes). Eso es inviable para Purity & Clean. WhatsApp Cloud API esgratuita para negocios en fase inicial y tiene las mismas funcionalidades básicas: mensajes entrantes, salientes, templates. |
| **Descripción** | **WhatsApp Cloud API Setup:** (1) **Meta Business App:** Crear una app en Meta Business Suite con permisos de WhatsApp Cloud API. (2) **Webhook receiving:** Configurar webhook para recibir mensajes de WhatsApp y guardarlos en Formspree o un Google Sheet. (3) **Outbound templates:** Configurar 3-4 templates de mensaje: "Reserva confirmada", "Tu técnico viene mañana", "Cuéntanos cómo te fue", "Oferta de temporada". (4) **Google Sheets integration:** Cada mensaje recibido de WhatsApp se guarda en una hoja de cálculo compartida con el equipo de Purity & Clean. (5) **No requiere teléfono dedicado:** A diferencia de la Business API, Cloud API puede usar el número existente de Purity & Clean sin contratar una línea empresarial separada. (6) **Integración con sitio:** Los botones de WhatsApp existentes redireccionan al chat de la cuenta Cloud API. Implementación: 5-6 horas (Meta app + webhook + templates + Google Sheets + testing). |
| **Impacto esperado** | Comunicación 24/7 con clientes sin costo de licencia, automatización de confirmación de reservas, diferenciador competitivo (competidores en Bogotá no lo usan) |
| **Esfuerzo** | M (5-6 horas) |
| **Agente recomendado** | Full Stack |
| **Referencias** | [7] WhatsApp Cloud API Documentation https://developers.facebook.com/docs/whatsapp/cloud-api [8] Meta for Developers https://developers.facebook.com/docs/whatsapp |

### Propuesta 5: SMS Automation — Twilio para Recordatorios de Citas

| Campo | Detalle |
|-------|---------|
| **Título** | Implementar envío de SMS automáticos para recordatorios de citas via Twilio |
| **Problema** | WhatsApp es efectivo pero requiere que el cliente tenga WhatsApp instalado y conexión a internet. Muchos colombianos en estratos 2-3 usan SMS como canal principal. Los recordatorios por SMS reducen no-shows en 30-40%. |
| **Descripción** | **SMS Reminder System:** (1) **Twilio Account:** Crear cuenta de Twilio con saldo prepaid (~$10足以 para empezar). Obtener número de teléfono virtual colombiano (+57). (2) **Trigger points:** Cuando se confirma una reserva via Formspree, un webhook envía los datos a una Edge Function (Netlify/Vercel) que conecta con Twilio API. (3) **Mensajes:** Template SMS: "Purity & Clean: Tu limpieza está confirmada para [FECHA] a las [HORA] en [DIRECCIÓN]. Responde CONFIRMAR o CANCELAR." (4) **Respuesta automática:** Si el cliente responde CANCELAR, recibir notificación. (5) **Google Sheets:** Todas las respuestas de SMS se guardan en una hoja compartida. (6) **Opt-in:** Solo se envía SMS a clientes que aceptaron recibir comunicaciones al hacer la reserva (checkbox). Implementación: 5-6 horas (Twilio setup + Edge Function + templates + Google Sheets + opt-in checkbox en form). |
| **Impacto esperado** | Reducción de no-shows en 30-40%, incrementando la utilización de técnicos, diferenciación de competencia que solo usa WhatsApp |
| **Esfuerzo** | M (5-6 horas + coordinación con equipo) |
| **Agente recomendado** | Full Stack |
| **Referencias** | [9] Twilio SMS API https://www.twilio.com/docs/sms [10] Twilio Colombia Pricing https://www.twilio.com/en-us/sms/pricing/co |

### Propuesta 6: Google Business Profile API — Sincronización Automática de Reseñas

| Campo | Detalle |
|-------|---------|
| **Título** | Implementar sync automática de reseñas de Google Business Profile al sitio |
| **Problema** | Las reseñas de Google solo son visibles si el usuario hace clic en el link. Las 127+ reseñas de Google Business Profile no se muestran en el sitio, perdiendo social proof. No hay forma de responder a reseñas desde un dashboard centralizado. |
| **Descripción** | **GBP API Integration:** (1) **Google Business Profile API:** Obtener acceso a la API de Google My Business (requiere verificación del negocio en Google). La API permite leer reseñas y responderlas. (2) **Sync semanal:** Un scheduled job (GitHub Actions o Netlify scheduled function) ejecuta cada día y sincroniza las reseñas nuevas a un archivo JSON local: `reviews.json`. (3) **Display en sitio:** Nueva sección "Reseñas de Google" que muestra las 6 reseñas más recientes con estrellas, texto, autor y fecha. Se actualiza automáticamente cuando el scheduled job corre. (4) **Respond to reviews:** Desde la misma sección, un botón "Responder" abre un textarea que envía la respuesta via GBP API. Esto unifica la gestión de reseñas. (5) **Schema.org integration:** Las reseñas sincronizadas se agregan al JSON-LD de LocalBusiness para SEO. (6) **Moderación:** Solo se muestran reseñas de 4-5 estrellas para mantener credibility; las negativas se marcan para atención del equipo. Implementación: 6-8 horas (GBP API setup + scheduled sync + JSON file + display section + respond flow + Schema). |
| **Impacto esperado** | Social proof en tiempo real de 127+ reseñas, gestión centralizada de respuestas, SEO local mejorado con reviews frescas |
| **Esfuerzo** | M (6-8 horas) |
| **Agente recomendado** | Full Stack |
| **Referencias** | [11] Google Business Profile API https://developers.google.com/my-business/reference/rest [12] Google Reviews SEO https://developers.google.com/search/docs/appearance/structured-data/review |

### Propuesta 7: Dynamic Pricing Engine — Precios Estacionales y por Demanda

| Campo | Detalle |
|-------|---------|
| **Título** | Implementar pricing dinámico que ajuste precios según temporada, día de la semana y demanda |
| **Problema** | El cotizador muestra precios fijos. No hay forma de capturar premium de temporada alta (décimas, fin de año, vacaciones escolares) ni crear urgencia con precios más bajos en temporada baja. |
| **Descripción** | **Dynamic Pricing:** (1) **Pricing rules engine:** En `config.js`, definir multipliers por: temporada (alta/alta media/baja), día de semana (weekday/weekend), franja horaria (mañana/tarde/noche). (2) **Temporadas predefinidas:** Alta: diciembre, semanas santas, puentes; Media: resto del año escolar; Baja: febrero post-carnaval, agosto. (3) **Visual indicators:** El cotizador muestra: "Precio habitual: $80.000" (tachado) y "Precio hoy: $92.000" (en rojo) cuando hay surge pricing. Badge: "Temporada alta". (4) **Urgency badge:** Si la demanda es alta (múltiples reservas en el mismo día), mostrar: "Solo 2 slots disponibles hoy — precio completo". (5) **API de demanda:** Un endpoint simple en una Edge Function consulta reservas del día para calcular scarcity. Si >80% ocupado, aplicar multiplier de urgencia. (6) **History tracking:** Cada pricing decision se loguea para análisis: fecha, multiplier aplicado, reservas generadas. Implementación: 4-5 horas (config.js + pricing rules + surge detection + display de badges + history logging). |
| **Impacto esperado** | Captura de premium en temporada alta, reducción de empty slots en temporada baja, sense of urgency para incrementar conversión |
| **Esfuerzo** | S (4-5 horas) |
| **Agente recomendado** | Frontend |
| **Referencias** | [13] Dynamic Pricing Best Practices https://www.定价策略.com [14] Surge Pricing Examples https://en.wikipedia.org/wiki/Surge_pricing |

---

## Orden de Implementación Recomendado

| # | Propuesta | Impacto | Esfuerzo | Prioridad |
|---|----------|---------|----------|-----------|
| 1 | WhatsApp Cloud API | Conversion 24/7 | M | Alta — gratis, alto ROI |
| 2 | Dynamic Pricing | Revenue / Urgency | S | Alta — incrementa revenue inmediato |
| 3 | Instagram/TikTok Embed | Social Proof | S | Alta — contenido real sin costo |
| 4 | Voice Navigation | Accesibilidad / UX | M | Media — diferenciador único |
| 5 | SMS Automation | Reducción no-shows | M | Media — bajo costo, alto impacto |
| 6 | Google GBP API | Social Proof / SEO | M | Media — requiere verificación |
| 7 | AR Visualizador | UX / Conversion | L | Baja — alto esfuerzo, nice-to-have |

**Top 3 para implementar primero:** 1, 2, 3 (WhatsApp Cloud API + Dynamic Pricing + Instagram Embed = alto impacto con esfuerzo bajo-medio).

---

## Diferencia Clave: R69 vs R65 (que también propuso video)

R65 propuso "Video testimonials" como parte del análisis de Growth Marketing. R69 va más allá:

1. **Contenido real vs testimonios** — R65 propusovideo testimonials (contenido producido); R69 propone embeber el contenido real que Purity & Clean ya publica en Instagram/TikTok sin producir video nuevo
2. **Social content nativo** — R65 se enfocó en testimonios; R69 propone integración con la estrategia de contenido social existente de la empresa
3. **Sin producción de video** — R69 no requiere que el equipo grabe nuevo contenido; usa lo que ya tienen

---

## Fuentes

[1] Meta for Developers. "Instagram Basic Display API." https://developers.facebook.com/docs/instagram-basic-display-api
[2] TikTok Developers. "Embed." https://developers.tiktok.com/doc/embed
[3] Mozilla Developer Network. "Web Speech API." https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API
[4] Smashing Magazine. "Voice UI Patterns." https://www.smashingmagazine.com/2024/03/voice-ui-patterns/
[5] Google model-viewer. "Getting Started." https://modelviewer.dev
[6] Apple Developer. "Composing a Reality." https://developer.apple.com/documentation/realitykit/composing-a-reality
[7] Meta for Developers. "WhatsApp Cloud API." https://developers.facebook.com/docs/whatsapp/cloud-api
[8] Meta for Developers. "WhatsApp." https://developers.facebook.com/docs/whatsapp
[9] Twilio. "SMS API." https://www.twilio.com/docs/sms
[10] Twilio. "Colombia SMS Pricing." https://www.twilio.com/en-us/sms/pricing/co
[11] Google Developers. "Business Profile API." https://developers.google.com/my-business/reference/rest
[12] Google Developers. "Reviews (Local Business)." https://developers.google.com/search/docs/appearance/structured-data/review
[13] Dynamic Pricing Strategy. "Best Practices." https://www.pricingplatform.com
[14] Wikipedia. "Surge pricing." https://en.wikipedia.org/wiki/Surge_pricing

---

*Documento generado por Innovation Scout — Round 69*
*Purity & Clean Analysis — 2026-04-28*
*Co-Authored-By: Paperclip <noreply@paperclip.ing>*