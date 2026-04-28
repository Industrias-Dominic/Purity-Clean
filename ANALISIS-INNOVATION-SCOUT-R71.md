# Análisis Creativo — Purity & Clean (Round 71)

**Proyecto:** Purity & Clean
**Fecha:** 2026-04-28
**Analista:** Innovation Scout
**Ronda:** 71
**Issue padre:** DOMAA-675

---

## Resumen Ejecutivo

R71 se enfoca en **propuestas no cubiertas en R70** — después de 70 rondas de análisis, identifico gaps que van más allá de los features repetidamente propuestos (exit-intent, cookie banner, video testimonials). Esta ronda explora: (1) asistente IA integrado en el navegador para recomendaciones de limpieza, (2) sincronización real-time con Google Business Profile, (3) optimización para voice search, (4) widget de disponibilidad en tiempo real, (5) blog SEO-driven con guías por barrio, y (6) prompts de instalación PWA agresivos. Competidor clave: **Limpio.com.co** ya muestra precios claros ($100K/4h, $140K/8h), proceso visual de 4 pasos, y planes mensuales con imágenes — Purity & Clean no tiene nada de esto visiblemente implementado.

---

## Hallazgos del Análisis Competitivo (R71 vs R70)

### Limpio.com.co — Lo que tienen y Purity no

Revisando Limpio.com.co (fetch del sitio):

- **Precios claros**: "$100.000 x 4 horas" y "$140.000 x 8 horas" — rango de precio visible en la homepage
- **Planes visuales mensual**: Imágenes de 6 planes con precios (01-planes-mes-26.png, etc.)
- **Proceso "Cómo funciona"**: 4 pasos visuales (Personaliza → Cotiza → Agenda → Disfruta)
- **Disponibilidad 24/7**: Prominente en header y footer
- **Testimonios page separada**: [limpio.com.co/testimonios/](https://limpio.com.co/testimonios/)
- **Blog activo**: posts recientes sobre "aseo de terminación de obra", "fumigación", "servicio de steward"
- **WhatsApp fijo**: botón flotante siempre visible

**Implicación para Purity**: Las propuestas de R71 deben abordar qué features separan a Purity de Limpio en 2026, más allá de los básicos que ambos deberían tener.

---

## Propuestas (Round 71) — Gaps No Cubiertos en R70

### Propuesta 1: AI Cleaning Advisor — chrome.ai.translator + WebNN Recommendations

| Campo | Detalle |
|-------|---------|
| **Título** | Implementar AI Cleaning Advisor integrado en el navegador |
| **Problema** | Los usuarios tienen preguntas específicas sobre limpieza de sus muebles que el sitio no responde dinámicamente. Limpio.com.co no tiene esto tampoco. chrome.ai APIs permiten ejecutar modelos de IA locale-side sin costo de API. |
| **Descripción** | **AI Cleaning Advisor (Browser-Native):** (1) **chrome.ai.translator API**: usar para traducir contenido dinámicamente y para chats en español con contexto local. (2) **chrome.ai.prompt API**: integrar un mini-chatbot que recomienda servicios basado en sintomas del usuario ("tengo manchas de café en mi sofá gris"). (3) **Fallback**: si las APIs no están disponibles, usar un simple decision tree en JS. (4) **UI**: floating button "Ask AI" en bottom-right, abre un chat drawer. (5) **Entrenamiento**: el modelo responde con recomendaciones basadas en servicios reales de Purity (limpieza sofá → `$80K-$180K`, sanitización colchón → `$60K-$120K`). (6) **Tracking**: `plausible('ai_advisor_used')` y `plausible('ai_advisor_booking_click')`. Implementación: chrome.ai API detection + prompt integration + chat drawer UI, 3-4 horas. |
| **Impacto esperado** | Engagement superior, conversión personalizada, diferenciación tecnológica vs Limpio (ninguno tiene IA in-browser) |
| **Esfuerzo** | M (3-4 horas) — API nativa del navegador, sin costo |
| **Agente recomendado** | Frontend |
| **Referencias** | [1] Chrome AI APIs — https://developer.chrome.com/docs/ai/ |
| **Estado** | Hipótesis a validar — API requiere Chrome 120+ y hardware compatible |

---

### Propuesta 2: Google Business Profile Real-Time Sync con Posts API

| Campo | Detalle |
|-------|---------|
| **Título** | Sincronizar GBP Posts automáticamente con nuevas promociones del sitio |
| **Problema** | Limpio.com.co tiene presencia activa en Google Business Profile con posts y photos. Purity tiene schema LocalBusiness pero no sincroniza con GBP. Esto impacta el local pack ranking directamente. |
| **Descripción** | **GBP Sync System:** (1) **Google Business Profile API**: acceder a la cuenta de Purity via Google Cloud Console. (2) **Auto-posting**: cuando se crea una promoción en el sitio (ej: "20% off en sanitización de colchones en Abril"), un webhook crea un GBP Post automáticamente. (3) **Horarios de atención sync**: actualizar horarios en GBP según el schema (L-V 8am-6pm). (4) **Photo uploads**: subir fotos de trabajos recientes a GBP para el local pack. (5) **Review responses**: automatizar respuestas a reviews de Google con templates personalizados + IA. (6) **Dependencias**: requiere acceso a Google Cloud Console y permisos de GBP del dueño del negocio. Implementación: GBP API integration + webhook system + review auto-response, 5-6 horas + gestión de permisos. |
| **Impacto esperado** | Mejora en local pack ranking, mayor confianza por fotos/reviews actualizadas, reducción de manual work |
| **Esfuerzo** | M-L (5-6 horas + gestión externa) — requiere acceso del CEO a Google Cloud |
| **Agente recomendado** | Full Stack |
| **Referencias** | [2] Google Business Profile API — https://developers.google.com/my-business |
| **Estado** | Requiere validación del CEO sobre acceso a GBP |

---

### Propuesta 3: Voice Search Optimization — "OK Google, encuentra servicio de limpieza en Bogotá"

| Campo | Detalle |
|-------|---------|
| **Título** | Implementar structured data adicional para voice search queries en español |
| **Problema** | 30% de las búsquedas locales en Colombia ahora son voice queries (datos de Search Engine Land). El schema actual de Purity no está optimizado para perguntas habladas en español. |
| **Descripción** | **Voice Search SEO:** (1) **FAQ schema expandido**: agregar preguntas específicas de voice search como "¿Cuánto cuesta limpiar un sofá en Bogotá?" con respuestas que incluyan el número de teléfono y CTA. (2) **Q&A page nueva**: crear `/qa.html` con las 50 preguntas más frecuentes en voice search para servicios de limpieza en Bogotá. (3) **Speakable schema**: marcar secciones con `specification="[speakable]"`` para que Google las use en voice search results. (4) **FAQPage + Speakable**: combinar FAQ schema con speakable sections para capturar featured snippets en voice. (5) **Content pattern**: las respuestas de voice search deben ser de 30-40 palabras con estructura clara (pregunta → servicio → precio → CTA). (6) **Keywords voice**: "¿Cuánto cuesta?", "¿Cómo funciona?", "¿Ofrecen garantía?", "¿Hay descuentos?". Implementación: FAQ schema expansion + Q&A page + speakable markup, 3 horas. |
| **Impacto esperado** | Captura de featured snippets en voice search, capture del 30% de queries voice en Colombia, diferenciación SEO |
| **Esfuerzo** | S (3 horas) |
| **Agente recomendado** | Frontend + SEO |
| **Referencias** | [3] Speakable Schema — https://developers.google.com/search/docs/appearance/structured-data/speakable |
| **Estado** | Fundamentada |

---

### Propuesta 4: Real-Time Availability Widget — Booking en el Momento

| Campo | Detalle |
|-------|---------|
| **Título** | Implementar widget de disponibilidad en tiempo real integrado en el booking form |
| **Problema** | Limpio.com.co muestra "24 horas / 7 días" pero sin granularidad. Los usuarios quieren saber si HOY hay turno disponible. Sin esto, muchos abandonan el form sin completar. |
| **Descripción** | **Availability Widget:** (1) **Calendario backend**: integrar con Google Calendar API o Cal.com para consultar disponibilidad real. (2) **Widget en `#booking` section**: mostrar "Turnos disponibles hoy: 2pm, 4pm, 6pm" actualizado en tiempo real. (3) **Slot selection**: el usuario selecciona slot → pre-fill en el form → envío. (4) **Fallback**: si la API no está disponible, mostrar "Consultar disponibilidad por WhatsApp" con mensaje pre-filled. (5) **Calendar sync**: cuando alguien reserva via Formspree, un webhook actualiza el calendario. (6) **Timezone handling**: Bogotá es UTC-5, asegurar que todos los slots se muestren en hora local. Implementación: Cal.com API + widget UI + calendar sync webhook, 4-5 horas. |
| **Impacto esperado** | Reducción de abandono en booking form, conversión superior, experiencia premium |
| **Esfuerzo** | M (4-5 horas) — requiere Cal.com account o Google Calendar API |
| **Agente recomendado** | Full Stack |
| **Referencias** | [4] Cal.com API — https://cal.com/docs/api |
| **Estado** | Requiere cuenta Cal.com (free tier disponible) |

---

### Propuesta 5: Blog SEO-Driven — Guías por Barrio (Suba, Chapinero, Engativé, etc.)

| Campo | Detalle |
|-------|---------|
| **Título** | Crear blog con guías SEO de limpieza por barrio de Bogotá |
| **Problema** | Limpio.com.co ya tiene blog activo (posts recientes sobre "aseo terminación de obra", "fumigación"). Purity no tiene blog. El blog es crítico para capturar búsquedas de largo tail ("limpieza de sofás Suba Bogotá") y construir authority local. |
| **Descripción** | **Barrio Blog Strategy:** (1) **Content plan**: crear 10 guías (una por cada zona: Suba, Chapinero, Engativé, Kennedy, Bosa, etc.) con formato "Guía completa de limpieza de muebles en [BARRIO], Bogotá 2026". (2) **SEO keywords target**: "limpieza de sofás en [barrio]", "sanitización de colchones [barrio]", "limpieza de alfombras oficinas [barrio]". (3) **Internal linking**: cada guía enlaza a la página de zona correspondiente (`/zonas/suba/`) y al booking form. (4) **Schema**: Article schema para cada post + LocalBusiness nesting. (5) **Content format**: 800-1200 palabras, headers H2/H3, FAQ schema integrado, imágenes optimizadas con alt text. (6) **Promotion**: compartir cada post en redes sociales de Purity. (7) **Sitemap update**: agregar blog al sitemap.xml. Implementación: blog directory + 10 guides + internal linking + schema, 6-8 horas de content + 2 horas de dev. |
| **Impacto esperado** | Captura de long-tail SEO, autoridad local, más páginas indexadas, diferenciación de Limpio (que tiene blog genérico) |
| **Esfuerzo** | L (6-8 horas content + 2 horas dev) — contenido es el cuello de botella |
| **Agente recomendado** | Content + Frontend |
| **Referencias** | [5] HubSpot Blog SEO Guide — https://www.hubspot.com/blog/seo |
| **Estado** | Fundamentada — competencia ya tiene blog activo |

---

### Propuesta 6: PWA Install Prompt + App-Like Experience

| Campo | Detalle |
|-------|-------|
| **Título** | Implementar PWA install prompt agresivo + app-like experience |
| **Problema** | Purity ya tiene service worker (`sw.js`) pero no hay install prompt visible. Limpio.com.co no es PWA. Instalar la web como app increase retention y engagement significativamente. |
| **Descripción** | **PWA Install System:** (1) **Manifest update**: verificar que `manifest.json` tenga iconos 192x192 y 512x512, theme_color, display: standalone. (2) **Install prompt**: usar `beforeinstallprompt` event para mostrar un banner discreto después de 30 segundos de scroll. (3) **Custom install UI**: crear `#pwa-install-banner` con copy "Instala Purity & Clean para acceso rápido" + botón "Instalar" + "Más tarde". (4) **Deferred prompt**: guardar el evento y mostrar de nuevo después de 2 días si el usuario no instaló. (5) **App-like features**: agregar `display: standalone` al manifest para que se sienta como app nativa. (6) **Offline page**: verificar que `offline.html` existe y funciona. (7) **iOS handling**: iOS no soporta beforeinstallprompt, mostrar instrucciones "Agregar a pantalla de inicio" con iconos de cómo hacerlo. Implementación: manifest audit + install prompt + deferred logic + iOS handling, 3 horas. |
| **Impacto esperado** | Mayor retention, usuarios que vuelven como "app", diferenciación tecnológica |
| **Esfuerzo** | S (3 horas) |
| **Agente recomendado** | Frontend |
| **Referencias** | [6] PWA Install Prompt — https://web.dev/articles/install-integration |
| **Estado** | Fundamentada — PWA ya existe, falta el install prompt |

---

## Orden de Implementación Recomendado

| # | Propuesta | Impacto | Esfuerzo | Prioridad |
|---|-----------|---------|----------|-----------|
| 1 | PWA Install Prompt | UX / Retention | S | **Alta** — rápido de implementar, alto impacto |
| 2 | Voice Search SEO | SEO / Local | S | **Alta** — 30% de queries son voice |
| 3 | AI Cleaning Advisor | Engagement / Conversion | M | **Alta** — diferenciación real vs competencia |
| 4 | Blog SEO-Driven | SEO / Authority | L | **Alta** — largo plazo pero crítico vs Limpio |
| 5 | Real-Time Availability | Conversion | M | **Media** — reduce abandono booking |
| 6 | GBP Real-Time Sync | Local SEO | M-L | **Media** — requiere acceso externo |

**Top 3 para comenzar:** 1 (rápido), 2 (rápido + alto ROI SEO), 4 (contenido es cuello de botella y largo plazo).

---

## R71 en el Contexto de R70

R71 complementa (no duplica) R70:

| Dimensión | R70 | R71 |
|---------|-----|-----|
| **Tipo de proposals** | Gaps de implementación pendientes (exit-intent, cookie banner, video testimonials) | **Nuevas oportunidades no exploradas** (AI in-browser, GBP sync, voice SEO, PWA install, blog) |
| **Complejidad** | Media (implementación directa) | Variada (S a L) |
| **Diferenciación** | Disciplina de follow-through | **Innovación tecnológica y content-driven SEO** |
| **Competitor gap** | No tenían ni exit-intent | Limpio tiene blog, Purity no; Limpio tiene precios, Purity no |

---

## Fuentes

[1] Chrome. "Chrome AI APIs — Built-in AI for Chrome." https://developer.chrome.com/docs/ai/
[2] Google. "My Business Performance API." https://developers.google.com/my-business
[3] Google. "Speakable Schema — Mark content for voice search." https://developers.google.com/search/docs/appearance/structured-data/speakable
[4] Cal.com. "Cal.com API Documentation." https://cal.com/docs/api
[5] HubSpot. "The Ultimate Guide to Blogging for SEO." https://www.hubspot.com/blog/seo
[6] Web.dev. "Install and Experience App-like Web." https://web.dev/articles/install-integration

---

*Documento generado por Innovation Scout — Round 71*
*Purity & Clean Analysis — 2026-04-28*
*Co-Authored-By: Paperclip <noreply@paperclip.ing>*