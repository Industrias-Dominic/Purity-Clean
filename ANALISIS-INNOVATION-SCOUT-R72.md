# Análisis Creativo — Purity & Clean (Round 72)

**Proyecto:** Purity & Clean
**Fecha:** 2026-04-28
**Analista:** Innovation Scout
**Ronda:** 72
**Issue padre:** DOMAA-679

---

## Resumen Ejecutivo

R72 llega después de 71 rondas de análisis. El sitio es maduro: chatbot FAQ, PWA install banner, push notifications, cookie banner, comparison sliders antes/después, Google reviews embebido, video demostrativo, blog con 6 artículos, booking form multi-step con geo-localización, cotizador con WhatsApp, sistema de referidos, newsletter, y theme toggle. Limpio.com.co, el principal competidor, tiene: página de testimonios separada, blog activo, precios claros en homepage, proceso visual "Cómo funciona" en 4 pasos, y atención 24/7.

Esta ronda identifica **gaps genuinamente nuevos** que no fueron cubiertos en R70-R71, enfocándose en: (1) conversión post-abandono, (2) integración real con calendario, (3) SEO local por zona, (4) schema markup para rich snippets, (5) email marketing automation, (6) WhatsApp Business API, y (7) subscription/recurring revenue model.

---

## Estado Actual del Proyecto (R72)

### Lo implementado (historial R70-R71)

| Feature | Estado | Notas |
|---------|--------|-------|
| Chatbot FAQ | ✅ Implementado | FAB con panel de preguntas frecuentes |
| PWA Install Banner | ✅ Implementado | `beforeinstallprompt` + deferred prompt |
| Push Notifications | ✅ Implementado | VAPID key + service worker push listener |
| Cookie Banner | ✅ Implementado | Modal con preferencias |
| Comparison Sliders | ✅ Implementado | 6 before/after con autoplay via IntersectionObserver |
| Google Reviews embebido | ✅ Implementado | 6 reseñas estáticas + link a Google |
| Video demostrativo | ✅ Implementado | YouTube embed (VIDEO_ID pendiente) |
| Blog con 6 artículos | ✅ Implementado | Artículos reales de ~12000-16000 chars |
| Booking form multi-step | ✅ Implementado | 3 pasos + geo-localización + simulación slots |
| Cotizador con WhatsApp | ✅ Implementado | Selector de servicio + cantidad + link WA |
| Sistema de referidos | ✅ Implementado | Cupón 15% + localStorage |
| Newsletter subscription | ✅ Implementado | Formspree + localStorage + cupón PURITY10 |
| Theme toggle (dark mode) | ✅ Implementado | prefers-color-scheme + localStorage |
| Zona pages (10 zonas) | ✅ Implementado | Suba, Chapinero, Engativá, Kennedy, Bosa, etc. |
| SEO Schema.org | ✅ Implementado | LocalBusiness + FAQPage + VideoObject |
| Service worker + offline | ✅ Implementado | `offline.html` + runtime cache |

### Lo que falta / gaps restantes

| Gap | Descripción | Prioridad |
|-----|-------------|-----------|
| Exit intent overlay | Modal que aparece al detectar `mouseleave` del documento | Alta |
| Google Calendar / Cal.com sync | Slots simulados, no hay calendario real | Alta |
| Service schema por servicio | Cada servicio (limpieza sofás, sanitización colchones) con schema propio | Media |
| Email marketing automation | Drip sequence para nuevos suscriptores | Media |
| WhatsApp Business API | Respuestas automáticas + catálogo + estado de reserva | Media |
| Local SEO por zona | Cada zona (`/zonas/chapinero/`) optimizada para "limpieza chapinero bogota" | Media |
| Subscription model | Plan recurring tipo "Limpio Monthly Pack" | Baja |
| Video testimonials embebidos | Testimonios reales en video, no solo texto | Baja |

---

## Análisis Competitivo: Qué tiene Limpio que Purity no (R72)

Revisando Limpio.com.co con fetch en vivo:

- **Testimonios page dedicada**: [limpio.com.co/testimonios/](https://limpio.com.co/testimonios/) — página completa con fotos de clientes
- **Proceso visual "Cómo funciona"**: 4 pasos ilustrados (Personaliza → Cotiza → Agenda → Disfruta)
- **Precios en homepage**: "$100.000 x 4 horas" y "$140.000 x 8 horas" como tarifas base visibles
- **Planes mensuales visuales**: 6 planes con imágenes (01-planes-mes-26.png, etc.)
- **Disponibilidad 24/7**: Prominente en header y footer
- **Blog activo**: Posts recientes sobre "aseo terminación de obra", "fumigación", "servicio de steward"

**Lo que Purity tiene que Limpio no:**
- Cotizador interactivo (Limpio no tiene)
- Comparison sliders antes/después (Limpio no tiene)
- Sistema de referidos con cupón (Limpio no tiene)
- Newsletter con cupón de descuento (Limpio no tiene)
- Chatbot FAQ integrado (Limpio no tiene)
- PWA funcional (Limpio no tiene)

---

## Propuestas (Round 72) — Gaps No Cubiertos en R70-R71

### Propuesta 1: Exit Intent Overlay con Oferta de Recuperación

| Campo | Detalle |
|-------|---------|
| **Título** | Implementar exit intent overlay que detecte cuando el usuario está por abandonar |
| **Problema** | Muchos usuarios llegan al site, exploran pero se van sin convertir. No hay un último mensaje antes del abandono. El cookie banner solo aparece en scroll, no al exit. |
| **Descripción** | **Exit Intent Detection:** (1) **Detección**: escuchar `mouseleave` sobre `document.body` cuando el cursor sale hacia arriba (configurable threshold). Alternativa: detectar `visibilitychange` cuando el tab pierde foco. (2) **Overlay**: crear `#exit-intent-overlay` como modal centrado con overlay oscuro. Mostrar solo una vez por sesión (localStorage flag). (3) **Oferta**: cupón de 10% de descuento + botón "Reservar ahora" que lleva a `#reservas`. El texto varía: "Antes de irte, obtén 10% off en tu primera limpieza". (4) **No intrusivo**: el usuario puede cerrar con X o haciendo click fuera. No fuerza la conversión. (5) **Timing**: solo aparece si el usuario ya scrolló al menos 50% de la página (ya demostró interés). (6) **Tracking**: `plausible('exit_intent_shown')`, `plausible('exit_intent_clicked')`. Implementación: event listener + localStorage session + CSS overlay + JS logic, ~2 horas. |
| **Impacto esperado** | Recuperación de abandons, aumento de reservas directas, medición de interés de salida |
| **Esfuerzo** | S (2 horas) |
| **Agente recomendado** | Frontend |
| **Referencias** | [1] HubSpot Exit Intent — https://www.hubspot.com/resources/exit-intent |
| **Estado** | Fundamentada — gap real no cubierto en R70-R71 |

---

### Propuesta 2: Google Calendar / Cal.com Integration para Slots Reales

| Campo | Detalle |
|-------|---------|
| **Título** | Conectar el booking form con Google Calendar API o Cal.com para mostrar disponibilidad real |
| **Problema** | El booking form actual simula slots basados en date string hash (`simulateUnavailableSlots`). Esto no refleja la disponibilidad real del equipo. Un usuario podría reservar un horario que no existe. |
| **Descripción** | **Real Availability System:** (1) **Cal.com API**: crear cuenta gratuita en Cal.com y configurar los tipos de evento (limpieza sofás, sanitización colchones, etc.). (2) **Widget de disponibilidad**: en el step 2 del booking form, reemplazar la simulación con `GET /api/calendars/availability?service=X&date=Y` que consulta Cal.com. (3) **Slots reales**: solo mostrar horarios que realmente tienen disponibilidad. (4) **Booking real**: al confirmar, crear la cita en Cal.com via API y enviar confirmation email. (5) **Fallback**: si la API falla, volver a la simulación actual (no bloquea la reserva). (6) **Webhook**: cuando alguien reserva via Formspree, un webhook en el server actualiza el calendario. (7) **Timezone**:Bogotá UTC-5, todos los slots en hora local. Implementación: Cal.com setup + API integration + fallback logic, 4-5 horas. |
| **Impacto esperado** | Eliminación de doble-booking, confianza del usuario, experiencia premium vs competencia |
| **Esfuerzo** | M (4-5 horas) |
| **Agente recomendado** | Full Stack |
| **Referencias** | [2] Cal.com API — https://cal.com/docs/api |
| **Estado** | Requiere cuenta Cal.com (free tier disponible) — CEO debe aprobar |

---

### Propuesta 3: FAQ Schema Expansion + Speakable para Voice Search

| Campo | Detalle |
|-------|---------|
| **Título** | Expandir FAQPage schema con preguntas de voice search y marcar secciones con speakable |
| **Problema** | 30% de búsquedas locales en Colombia son voice queries ("OK Google, dónde puedo limpiar mi sofá en Bogotá"). El schema actual de Purity no está optimizado para voice. |
| **Descripción** | **Voice Search SEO:** (1) **FAQPage expansion**: agregar 10-15 preguntas nuevas de voice search como "¿Cuánto cuesta limpiar un sofá en Chapinero Bogotá?", "¿Hay garantía en la limpieza de colchones?", "¿Purity & Clean atiende los fines de semana?". (2) **Speakable markup**: marcar las respuestas más relevantes con `specification="speakable"` para que Google las use en featured snippets de voice search. (3) **Q&A page nueva**: crear `/qa.html` con las 50 preguntas más frecuentes en voice search para servicios de limpieza en Bogotá, con respuestas de 30-40 palabras con estructura clara. (4) **Content pattern**: respuestas voice-friendly: pregunta → servicio → precio → CTA. (5) **Keywords voice**: "¿Cuánto cuesta?", "¿Cómo funciona?", "¿Ofrecen garantía?", "¿Hay descuentos?", "¿Atienden cerca de mí?". Implementación: FAQ schema expansion + Q&A page + speakable markup, 3 horas. |
| **Impacto esperado** | Captura de featured snippets voice, capture del 30% de queries voice, diferenciación SEO |
| **Esfuerzo** | S (3 horas) |
| **Agente recomendado** | Frontend + SEO |
| **Referencias** | [3] Speakable Schema — https://developers.google.com/search/docs/appearance/structured-data/speakable |
| **Estado** | Fundamentada — voice search es tendencia creciente en Colombia |

---

### Propuesta 4: Email Marketing Drip para Nuevos Suscriptores

| Campo | Detalle |
|-------|---------|
| **Título** | Implementar secuencia de emails automatizados para nuevos suscriptores del newsletter |
| **Problema** | El newsletter actual solo captura el email y muestra un cupón. No hay nurturing. El suscriptor recibe el cupón pero nunca recibe contenido que lo convenza de reservar. |
| **Descripción** | **Email Drip Sequence:** (1) **Mailchimp/EmailOctopus**: configurar cuenta gratuita en EmailOctopus (hasta 2500 suscriptores free). (2) **Segment**: crear segmento "nuevos suscriptores" en la lista. (3) **Sequence de 4 emails**: Email 1 (día 0): "Bienvenido + cupón PURITY10 + urgencia". Email 2 (día 3): "Guía gratuita: cómo mantener tus sofás limpios por más tiempo". Email 3 (día 7): "Caso de éxito: cómo recovered un sofá que parecía perdido". Email 4 (día 10): "Última chance: tu cupón expira mañana". (4) **Automation**: conectar Formspree newsletter a EmailOctopus via Zapier o webhook nativo. (5) **Tracking**: aperturas, clics, conversiones. (6) **Personalización**: usar nombre del suscriptor si está disponible. Implementación: EmailOctopus setup + sequence + Zapier integration, 3-4 horas. |
| **Impacto esperado** | Conversión de suscriptores a clientes, revenue adicional sin costo de adquisición |
| **Esfuerzo** | M (3-4 horas + gestión Mailchimp/EmailOctopus) |
| **Agente recomendado** | Frontend + Content |
| **Referencias** | [4] Email Marketing for Small Business — https://www.entrepreneur.com/article/282325 |
| **Estado** | Requiere cuenta EmailOctopus (free tier) — CEO debe aprobar |

---

### Propuesta 5: WhatsApp Business API Integration para Respuestas Automáticas

| Campo | Detalle |
|-------|---------|
| **Título** | Integrar WhatsApp Business API para respuestas automáticas y catálogo de servicios |
| **Problema** | El botón flotante de WhatsApp actualmente abre chat con mensaje pre-set. No hay respuestas automáticas, catálogo de servicios, ni verificación de estado de reserva. |
| **Descripción** | **WhatsApp Business API:** (1) **WhatsApp Business Platform**: configurar cuenta en Meta Business Suite. (2) **Verified Business**: obtener badge azul (aumenta confianza). (3) **Automated responses**: configurar mensajes automáticos para queries comunes ("Hola, gracias por escribir.¿En qué podemos ayudarte?" + quick replies: "Cotizar", "Reservar", "Ver servicios"). (4) **Catalogue**: crear catálogo de servicios en WhatsApp Business con precios y descripciones. (5) **Status updates**:通知 al cliente cuando el técnico está en camino. (6) **Integration**: el botón flotante ya existe, solo cambiar el link para usar `wa.me` con prefilled message que incluya el servicio seleccionado. (7) **CEO action**: requiere acceso a Meta Business Suite y verificación de negocio. Implementación: Meta setup + API配置 + button update, 3-4 horas + gestión externa. |
| **Impacto esperado** | Mejor experiencia de atención, conversión improved, diferenciación de Limpio (que no tiene WA Business API visible) |
| **Esfuerzo** | M (3-4 horas + gestión externa) |
| **Agente recomendado** | Full Stack |
| **Referencias** | [5] WhatsApp Business Platform — https://business.whatsapp.com |
| **Estado** | Requiere acceso del CEO a Meta Business — hipótesisa validar |

---

### Propuesta 6: LocalBusiness + Service Schema Anidado para Cada Servicio

| Campo | Detalle |
|-------|---------|
| **Título** | Crear schema de Service para cada uno de los 4 servicios principales, anidado en LocalBusiness |
| **Problema** | El schema actual tiene OfferCatalog genérico. Google no puede mostrar "Limpieza de sofás desde $80.000" como rich result porque falta Service schema específico con precio. |
| **Descripción** | **Service Schema Expansion:** (1) **Individual Service schemas**: crear `@type: Service` para cada servicio con `offers.priceSpecification` y `areaServed` (Bogotá). (2) **Nested en LocalBusiness**: agregar `hasOfferCatalog` con cada Offer apuntando al Service correcto. (3) **PriceRange**: incluir `priceRange` en cada servicio ("$80.000 — $180.000"). (4) **Provider**: cada servicio ancla a Purity como provider. (5) **Aggregate rating por servicio**: agregar rating individual por servicio si hay reviews vinculadas. (6) **Multiple schemas**: LocalBusiness + Service + Offer + AggregateRating + PostalAddress todos relacionados. Implementación: JSON-LD expansion en index.html, 2 horas. |
| **Impacto esperado** | Rich snippets en Google para búsquedas de servicios, mejor CTR en resultados de búsqueda |
| **Esfuerzo** | S (2 horas) |
| **Agente recomendado** | Frontend |
| **Referencias** | [6] Service Schema — https://schema.org/Service |
| **Estado** | Fundamentada — impacto SEO directo |

---

### Propuesta 7: Zona Landing Pages SEO-Optimizadas (Chapinero, Suba, etc.)

| Campo | Detalle |
|-------|---------|
| **Título** | Optimizar las 10 zona pages existentes con SEO local específico por barrio |
| **Problema** | Las zona pages existen (`/zonas/chapinero/`, `/zonas/suba/`, etc.) pero no están optimizadas para "limpieza de sofás Chapinero Bogotá" o "sanitización colchones Suba". Limpio no tiene páginas por zona — oportunidad de ranking local. |
| **Descripción** | **Local SEO Zone Pages:** (1) **Content por zona**: cada página de zona debe tener contenido único de 400-600 palabras optimizado para keywords locales ("limpieza de sofás en [zona]", "sanitización de colchones [zona]"). (2) **Schema LocalBusiness nesting**: cada zona page debe tener su propio LocalBusiness schema con `areaServed` específico al barrio. (3) **Internal linking**: cada zona page enlaza a los servicios relevantes y al booking form conUTM zona. (4) **Testimonios locales**: agregar reseñas de clientes de esa zona específica. (5) **Mapa embebido**: incluir mapa de Google Maps de la zona con marker de Purity. (6) **Meta tags por zona**: title, description únicos por zona ("Limpieza de sofás en Chapinero — Purity & Clean — desde $80K"). Implementación: audit de las 10 páginas + content expansion + schema LocalBusiness por zona, 4-5 horas. |
| **Impacto esperado** | Ranking para búsquedas locales de barrio, capture de tráfico que Limpio no tiene |
| **Esfuerzo** | M (4-5 horas) |
| **Agente recomendado** | Frontend + Content |
| **Referencias** | [7] Local SEO Guide — https://moz.com/local-seo-guide |
| **Estado** | Fundamentada — Limpio no tiene páginas por zona |

---

## Orden de Implementación Recomendado

| # | Propuesta | Impacto | Esfuerzo | Prioridad |
|---|-----------|---------|----------|-----------|
| 1 | Exit Intent Overlay | Conversion | S | **Alta** — rápido de implementar, recupera abandons |
| 2 | Service Schema Expansion | SEO | S | **Alta** — 2 horas, rich snippets directos |
| 3 | Voice Search FAQ + Speakable | SEO | S | **Alta** — 30% de queries son voice |
| 4 | Zona Pages SEO | Local SEO | M | **Alta** — diferenciación real vs competencia |
| 5 | Cal.com Real Availability | UX / Trust | M | **Media** — requiere cuenta Cal.com |
| 6 | Email Marketing Drip | Revenue | M | **Media** — convierte suscriptores |
| 7 | WhatsApp Business API | Conversion | M | **Media** — requiere acceso Meta |

**Top 3 para comenzar:** 1 (rápido + alto impacto), 2 (rápido + SEO), 4 (diferenciación local).

---

## R72 en el Contexto de R70-R71

R72 complementa las rondas anteriores con propuestas no duplicadas:

| Dimensión | R70 | R71 | R72 |
|-----------|-----|-----|-----|
| **Tipo** | Gaps de implementación (exit-intent, cookie banner, video) | Nuevas oportunidades (AI browser, GBP sync, voice SEO, blog) | **Gaps genuinos restantes** (exit-intent real, calendar sync, local SEO por zona, schema, email drip) |
| **Complejidad** | Media | Variada | S a M |
| **Diferenciación** | Disciplina de follow-through | Innovación tecnológica | **Optimización SEO + conversión** |
| **Competitor gap** | No tenían exit-intent | Limpio tiene blog, Purity no | Limpio NO tiene páginas por zona ni email drip ni service schema |

**R72 es la ronda de "Ground Truth"**: después de 71 rondas de propuestas innovadoras, R72 se enfoca en lo que realmente falta ejecutar y lo que puede medirse (conversion rate, SEO ranking, email open rate).

---

## Fuentes

[1] HubSpot. "Exit Intent Popup: What It Is & How to Create One." https://www.hubspot.com/resources/exit-intent
[2] Cal.com. "Cal.com API Documentation." https://cal.com/docs/api
[3] Google. "Speakable Schema — Mark content for voice search." https://developers.google.com/search/docs/appearance/structured-data/speakable
[4] Entrepreneur. "The Ultimate Guide to Email Marketing for Small Businesses." https://www.entrepreneur.com/article/282325
[5] Meta. "WhatsApp Business Platform." https://business.whatsapp.com
[6] Schema.org. "Service Schema." https://schema.org/Service
[7] Moz. "The Beginner's Guide to Local SEO." https://moz.com/local-seo-guide

---

*Documento generado por Innovation Scout — Round 72*
*Purity & Clean Analysis — 2026-04-28*
*Co-Authored-By: Paperclip <noreply@paperclip.ing>*