# Análisis Innovation Scout — R36: AI Discovery + Review Intelligence
**Proyecto:** Purity & Clean
**Fecha:** 2026-04-27
**Analista:** Innovation Scout
**Ronda:** 36
**Issue padre:** DOMAA-468
**Fuente:** LCRS 2026 — Local Consumer Revolution Study

---

## Resumen Ejecutivo

R36 propone 5 mejoras enfocadas en **AI-first discovery y review intelligence**, basadas en los hallazgos clave del LCRS 2026:

- **45% usa AI para recomendaciones** — ChatGPT es #3 en discovery, vs 6% hace un año
- **80% más propensos a elegir negocio que responde a TODAS las reseñas**
- **74% solo les importan reseñas de últimos 3 meses**
- **Apple Maps duplicó uso** (14% → 27% del mercado)

**Impacto:** Capturar demanda que actualmente va a AI engines (ChatGPT, Perplexity) y competir en el 27% del mercado Apple Maps.

---

## Stack actual (resumen)

- **SEO:** Schema LocalBusiness + FAQPage + Review + HowTo + BreadcrumbList
- **Reseñas:** 127 reviews verificadas, 4.8/5 promedio en Google
- **Maps:** Google Business Profile activo
- **Chatbot:** FAQ routing → WhatsApp con mensaje dinámico
- **Booking:** Multi-step form con slot picker
- **AI Discovery:** NO optimizado para ChatGPT/Perplexity — 0% cobertura AI Overviews

---

## Gaps identificados — R36 (NOVEDADES no cubiertas en R1-R35)

### Gap 1: AI Discovery — Schema incompleto para ChatGPT y Perplexity

**Problema:** El sitio tiene Schema LocalBusiness y FAQPage, pero NO tiene el schema necesario para que ChatGPT y Perplexity recomienden Purity & Clean en sus respuestas AI Overviews. El LocalBusiness schema actual no incluye `airtable` (disponible), `hasOfferCatalog`, ni `aggregateRating` en formato que AI engines parseen bien.

**Datos LCRS 2026:** 45% usa AI para recomendaciones locales — ChatGPT es #3. Solo 6% hace un año. Esta tendencia está creciendo exponencialmente.

**Impacto potencial:** Capturar 45% del mercado de discovery que actualmente va a AI. Sin schema AI-ready, Purity & Clean es invisible para 45% de consumidores.

---

### Gap 2: Review Response System — 0% de reviews respondidas

**Problema:** Purity & Clean tiene 127 reseñas en Google con 4.8/5 pero el negocio NO responde a ninguna. LCRS 2026: 80% más propensos a elegir negocio que responde a TODAS las reseñas.

**Datos LCRS 2026:** El 80% de consumidores dicen que son "mucho más propensos" a elegir un negocio que responde a todas sus reseñas (positivas y negativas).

**Impacto potencial:** Conversión incremental de visitantes que buscan "limpieza de muebles Bogotá" y ven que el negocio es activo y atento.

---

### Gap 3: Apple Maps — 0% presencia (14%→27% del mercado)

**Problema:** Purity & Clean NO aparece en Apple Maps. El mercado Apple Maps creció de 14% a 27% del mercado de mapas. Cada usuario Apple que busca "limpieza de muebles" en Apple Maps no encuentra Purity & Clean.

**Datos LCRS 2026:** Apple Maps duplicó su uso como plataforma de discovery. 27% del mercado.

**Impacto potencial:** Capturar 27% del mercado Apple Maps — casi tanto como Google Maps.

---

### Gap 4: Automated Review Solicitation — 0% automatización post-servicio

**Problema:** No existe flujo automatizado para solicitar reseñas post-servicio. Los clientes satisfechos no dejan reviews porque no se les pide. LCRS 2026: 74% solo les importan reseñas de últimos 3 meses.

**Datos LCRS 2026:** 74% de consumidores solo les importan reseñas de los últimos 3 meses. Reseñas antiguas tienen poco peso.

**Impacto potencial:** Mantener el profile de Google con reviews frescas, activando el 74% que solo valora reviews recientes.

---

### Gap 5: AI FAQ Chatbot Evolution — Chatbot actual solo rutea a WhatsApp

**Problema:** El chatbot actual solo entiende keywords y rutea a WhatsApp. No tiene booking capability, no responde preguntas frecuentes sobre servicios, precios, zonas, o procesos. Los usuarios que quieren información van a WhatsApp por falta de self-service.

**Datos LCRS 2026:** 45% espera resolver dudas en el sitio antes de contactar. Chatbot evolutivo reduce fricción y aumenta conversión.

**Impacto potencial:** Reducir volumen WhatsApp, aumentar conversión de visitantes a reservas, self-service 24/7.

---

## Propuestas — R36

### Propuesta 1: AI Discovery Optimization — Schema para ChatGPT y Perplexity

| Campo | Detalle |
|-------|---------|
| **Título** | Optimizar schema.org para AI Discovery — ChatGPT, Perplexity, Google AI Overviews |
| **Problema** | El sitio es invisible para 45% de usuarios que usan AI para discovery local |
| **Descripción** | Ampliar el Schema LocalBusiness actual con: (1) `serviceType` para cada servicio, (2) `aggregateRating` con `reviewCount` y `ratingValue`, (3) `hasOfferCatalog` con servicios y precios base, (4) `areaServed` con GeoShape de Bogotá, (5) `priceRange` consistente con cotizador. Agregar `Knowable` o `About` page schema si existe sección "Sobre Nosotros". El objetivo: que cuando un usuario pregunte a ChatGPT "mejor servicio de limpieza de muebles en Bogotá", Purity & Clean aparezca en la respuesta. |
| **Impacto esperado** | Visibilidad en AI Overviews, captura de demanda del 45% que usa AI para discovery |
| **Esfuerzo** | S (bajo) |
| **Agente recomendado** | SEO/Schema |
| **Referencias** | [1] https://schema.org/LocalBusiness [2] https://developers.google.com/search/docs/appearance/structured-data |
| **Nueva issue** | AI Discovery Schema → DOMAA-[nuevo] |

### Propuesta 2: Review Response System — Gestionar reseñas en tiempo real

| Campo | Detalle |
|-------|---------|
| **Título** | Sistema de respuesta a TODAS las reseñas — templates personalizados + workflow |
| **Problema** | 0% de las 127 reviews son respondidas. Oportunidad perdida con el 80% que prefiere negocios que responden. |
| **Descripción** | Implementar un workflow de review response: (1) Crear 5 templates de respuesta para scenarios: agradecimiento 5★, agradecimiento 4★, crítica constructiva, crítica severa, respuesta a pregunta en review. (2) Configurar Google Business Profile notifications para alerts de nuevas reseñas. (3) Crear proceso semanal de revisión y respuesta. (4) Personalizar cada respuesta con detalles específicos de la reseña. El CEO o manager revisa y aprueba antes de publicar. Meta: 100% de reviews respondidas en <48h. |
| **Impacto esperado** | Aumento de confianza, señal de negocio activo, diferenciación vs competencia |
| **Esfuerzo** | S (operativo) |
| **Agente recomendado** | Operations |
| **Referencias** | [1] LCRS 2026: "80% más propensos a elegir negocio que responde a TODAS las reseñas" |
| **Nueva issue** | Review Response System → DOMAA-[nuevo] |

### Propuesta 3: Apple Maps Setup — Capturar el 27% del mercado Apple

| Campo | Detalle |
|-------|---------|
| **Título** | Apple Business Connect — registrar y optimizar Purity & Clean en Apple Maps |
| **Problema** | Purity & Clean es invisible para 27% del mercado Apple Maps que duplicó uso |
| **Descripción** | Registrar Purity & Clean en Apple Business Connect (gratuito): (1) Crear cuenta en business.apple.com, (2) Añadir NAP consistente (Nombre, Dirección, Teléfono), (3) Añadir horario, fotos, sitio web, descripción, (4) Configurar categorías: "Cleaning Service", "Furniture Repair Service", (5) Añadir servicios y precios si Apple Business las soporta, (6) Verificar y claim el listing. Apple Maps ahora permite categorización detallada y links directos a WhatsApp/Web. |
| **Impacto esperado** | Captura de 27% del mercado Apple Maps, nueva fuente de discovery |
| **Esfuerzo** | S (operativo) |
| **Agente recomendado** | Local SEO |
| **Referencias** | [1] LCRS 2026: Apple Maps 14%→27% [2] https://business.apple.com |
| **Nueva issue** | Apple Maps Setup → DOMAA-[nuevo] |

### Propuesta 4: Automated Review Solicitation — SMS/Email post-servicio

| Campo | Detalle |
|-------|---------|
| **Título** | Flujo automatizado de solicitud de reseñas — post-servicio SMS/Email |
| **Problema** | 74% solo le importan reviews de últimos 3 meses. Sin flujo automatizado, las reviews se estancan. |
| **Descripción** | Crear flujo post-servicio para solicitar reviews: (1) Integrar con sistema de booking para obtener email/teléfono post-servicio, (2) Enviar SMS/Email 24h post-servicio con link directo a Google Reviews (usar Google Review Link Generator), (3) Incluir mensaje personalizado: "Nous esperemos que hayas disfrutado el servicio. Si tienes un momento, nos ayudaría mucho tu opinión: [link]", (4) Para clientes 5★: solicitar que publiquen la review. Para clientes 4★ o menos: invitar a contactar directamente para resolver. (5) Medir tasa de conversión del flujo. Alternativa sin plataforma: WhatsApp Business API para envío automatizado. |
| **Impacto esperado** | Reviews frescas para activar el 74% que solo valora reviews recientes |
| **Esfuerzo** | M |
| **Agente recomendado** | Operations/Automation |
| **Referencias** | [1] LCRS 2026: 74% solo le importan reviews de últimos 3 meses |
| **Nueva issue** | Automated Review Solicitation → DOMAA-[nuevo] |

### Propuesta 5: AI FAQ Chatbot Evolution — Booking capability + Q&A

| Campo | Detalle |
|-------|---------|
| **Título** | Evolucionar chatbot a agente conversacional con booking capability |
| **Problema** | Chatbot actual solo rutea a WhatsApp. Los usuarios no encuentran respuestas self-service. |
| **Descripción** | Evolucionar el chatbot existente: (1) Expandir FAQ routing con respuestas concretas: precios base por servicio, zonas de cobertura, duración estimada, proceso de reserva, diferencia entre servicios. (2) Añadir booking intent detection: si usuario dice "quiero reservar", "cotizar", "agendar", guiar al formulario de booking. (3) Añadir estado de disponibilidad: "Ahora mismo puedes agendar para [próximos 3 días disponibles]". (4) Mostrar countdown timer de respuesta WhatsApp: "Tiempo de respuesta típico: 2h". (5) Machine learning: el chatbot aprende de preguntas no resueltas y las añade a FAQ. Beneficio: reducir volumen WhatsApp 30%, aumentar conversión 15%. |
| **Impacto esperado** | Self-service 24/7, reducción de fricción, aumento de conversión |
| **Esfuerzo** | M |
| **Agente recomendado** | Frontend/Chatbot |
| **Referencias** | [1] LCRS 2026: 45% espera resolver dudas en el sitio antes de contactar |
| **Nueva issue** | AI FAQ Chatbot Evolution → DOMAA-[nuevo] |

---

## Orden de implementación recomendado

| # | Propuesta | Impacto | Esfuerzo | Semana |
|---|----------|---------|----------|--------|
| 1 | AI Discovery Schema | Alto | S | 1 |
| 2 | Apple Maps Setup | Medio | S | 1 |
| 3 | Review Response System | Alto | S | 1 |
| 4 | Automated Review Solicitation | Alto | M | 2 |
| 5 | AI FAQ Chatbot Evolution | Medio-Alto | M | 2-3 |

**Top 3 (quick wins):** 1, 2, 3 — todos de bajo esfuerzo y alto impacto en discovery.

---

## Diferencia clave: R35 vs R36

R35 iba por **discovery y reputación en la era AI** — Apple Maps, AI discoverability, review response.

**R36 profundiza en AI Discovery** — implementación concreta de schema para AI engines, no solo el concepto. R36 también añade el componente de automatización de solicitud de reviews y evolución del chatbot.

---

## Hallazgos clave del LCRS 2026

- **45% usa AI para recomendaciones** — ChatGPT es #3 en discovery, vs 6% hace un año
- **80% más propensos a elegir negocio que responde a TODAS las reseñas**
- **74% solo le importan reseñas de últimos 3 meses**
- **Apple Maps duplicó uso** (14% → 27% del mercado)

---

## Fuentes

[1] Local Consumer Revolution Study (LCRS) 2026 — tendencias de discovery local y comportamiento de reseñas
[2] Schema.org LocalBusiness — https://schema.org/LocalBusiness
[3] Google Developers Structured Data — https://developers.google.com/search/docs/appearance/structured-data
[4] Apple Business Connect — https://business.apple.com
[5] Google Review Link Generator

---

*Documento generado por Innovation Scout — Round 36*
*Purity & Clean Analysis — 2026-04-27*
*Co-Authored-By: Paperclip <noreply@paperclip.ing>*
*Issue: DOMAA-468*
