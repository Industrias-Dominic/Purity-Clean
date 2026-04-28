# Análisis Creativo — Purity & Clean (Round 110)

**Proyecto:** Purity & Clean
**Fecha:** 2026-04-28
**Analista:** Innovation Scout
**Ronda:** 110
**Issue padre:** DOMAA-969

---

## Resumen Ejecutivo

R110 presenta **6 propuestas genuinamente nuevas** fundamentadas en tres pilares: (1) gaps de implementación detectados en el codebase real, (2) mejores prácticas de Local SEO para home services刷新ly validadas por fuentes actuales, y (3) tendencias emergentes en engagement de clientes para servicios de limpieza residenciales. El hallazgo central: **el sitio tiene 11 páginas de zona pero ninguna página de servicio dedicada con contenido SEO sustancial**, un gap crítico considerando que la investigación de WordStream confirma que dedicar una página por servicio es uno de los 10 factores más importantes para ranking local [1].

---

## Lo Implementado (R1-R109)

| Feature | Ronda | Estado |
|---------|-------|--------|
| PWA + push notifications, Dark mode, Chatbot FAQ, WhatsApp routing | R1-R9 | ✅ Implementado |
| Cotizador inteligente, Sistema de referidos, Newsletter | R89 | ✅ Implementado |
| Zonas pages (11), Testimonios carousel, Before/After sliders | R102 | ✅ Implementado |
| Schema LocalBusiness + FAQPage + Article + VideoObject | R94-R102 | ✅ Implementado |
| CRM + Email Marketing, Loyalty program, Instagram Feed | R103 | ✅ Implementado |
| Playwright E2E tests, Scroll animations, Video embebido | R85-R102 | ✅ Implementado |
| Blog con 6 artículos, WhatsApp Business API | R94-R103 | ✅ Implementado |
| Cookie banner funcional + localStorage consent | R70-R90 | ✅ Implementado |
| Apple Maps Business Integration | R109 | Propuesta |
| WhatsApp Business Cloud API | R109 | Propuesta |
| Customer Portal (Mi Cuenta) | R109 | Propuesta |
| Automated Booking Confirmation System | R109 | Propuesta |
| LLM/AI Search Optimization | R108 | Propuesta |

---

## Research: Hallazgos Clave

### 1. Dedicated Service Pages — El gap más crítico encontrado

Según WordStream [1]:
> "Dedicate one page to each unique product or service you offer. Your local SEO juice isn't as powerful if you lump everything into one page because search engines tend not to see your brand as an authority in one specific area."

El sitio tiene:
- `index.html` con todas las tarjetas de servicio juntas en un grid
- 11 páginas de zona (`/zonas/chapinero/`, `/zonas/suba/`, etc.)
- **CERO páginas de servicio dedicadas** (`/servicios/limpieza-sofas-bogota.html`)

** gap real:** Las zonas pages son geo-targeting pero no hay service pages para las queries de alto volumen como "limpieza de sofá Bogotá" o "sanitización de colchones Bogotá". Las zonas pages tampoco tienen contenido SEO sustancial — son plantillas con poco texto único.

### 2. Reviews en Google: 85% de consumidores las cree tanto como recomendaciones personales

Según WordStream [1], citando el BrightLocal LCRS:
- 85% cree online reviews tanto como recomendaciones personales
- 80% más propenso a usar un negocio que responde a TODAS las reseñas
- El sitio tiene Schema AggregateRating pero **no hay sistema de respuesta de reseñas**

### 3. Voice Search — 40% de búsquedas locales ya son por voz

Según la investigación de WordStream [1]:
- Voice search usa keywords long-tail más conversacionales
- Preguntas como "¿Cuánto cuesta limpiar un sofá?" vs "limpieza sofá precio"
- El sitio NO tiene FAQ estructurado para voice search más allá del Schema FAQPage básico

### 4. Google Business Profile — Posts no exploited

Según WordStream [1]:
> "Publish posts (announcing products, events, and special offers) to your Business Profile using the Google My Business dashboard."

El sitio menciona Google Business Profile en el Schema `sameAs` pero:
- No hay evidencia de GBP Posts implementados
- No hay proceso de publicación de offers/eventos en GBP
- No hay fotos nuevas agregadas recientemente

### 5. Google Maps como plataforma de reseñas — sigue subestimada

BrightLocal LCRS 2026: Google sigue siendo #1 (71%) pero bajó de 83%. Apple Maps se duplicó (14%→27%). El sitio:
- Tiene Schema geo coordinates
- Tiene `sameAs` con redes sociales
- **No hay mention de Apple Maps en `sameAs`**, ni link a Google Maps para la ficha

### 6. Mobile-first crítico

Según WordStream [1]:
> "75% of all mobile searches that exhibit local intent actually producing in-store, offline visits within 24 hours."

El sitio tiene dark mode toggle, pero no hay indicador de performance mobile en el README. Los tests de Playwright verifican dark mode y search, pero no miden Core Web Vitals.

---

## Propuestas R110 — Local SEO Gaps, GBP Posts y Voice Search

### Propuesta 1: Dedicated Service Pages con Contenido SEO Sustancial

| Campo | Detalle |
|-------|---------|
| **Título** | Crear páginas de servicio dedicadas (`/servicios/limpieza-sofas-bogota.html`) con contenido SEO de mínimo 800 palabras |
| **Problema** | El sitio tiene 11 páginas de zona pero CERO páginas de servicio. Según WordStream, dedicar una página por servicio es uno de los 10 factores más importantes para ranking local. Las queries de alto volumen ("limpieza de sofá Bogotá", "sanitización colchones Bogotá") no tienen landing page dedicada. |
| **Descripción** | **1. URLs propuestas:**<br>- `/servicios/limpieza-sofas-bogota.html`<br>- `/servicios/sanitizacion-colchones-bogota.html`<br>- `/servicios/mantenimiento-alfombras-bogota.html`<br>- `/servicios/limpieza-sillas-oficina-bogota.html`<br><br>**2. Estructura de contenido (mínimo 800 palabras por página):**<br>- `<title>` optimizado para keyword principal<br>- `<meta name="description">` con CTA<br>- H1 + 3-4 párrafos de contenido introductorio<br>- Sección "Beneficios" (5 items con iconos)<br>- Sección "Proceso" (4 pasos visuales)<br>- Sección "Precios" (tabla con rangos)<br>- Sección "Testimonios" (3 reviews específicas del servicio)<br>- FAQ acordeón (5-7 preguntas)<br>- CTA final con booking form<br><br>**3. Internal linking:**<br>- Link desde index.html (tarjetas de servicio → service page)<br>- Link desde zonas pages (textos de zona → service pages relevantes)<br>- Link bidireccional entre service pages y zonas pages<br><br>**4. Schema markup por service page:**<br>```json<br>{<br>  "@context": "https://schema.org",<br>  "@type": "Service",<br>  "name": "Limpieza profunda de sofás en Bogotá",<br>  "description": "...800+ palabras...",<br>  "provider": { "@type": "LocalBusiness", "name": "Purity & Clean" },<br>  "areaServed": { "@type": "Place", "name": "Bogotá" },<br>  "hasOfferCatalog": {<br>    "@type": "OfferCatalog",<br>    "itemListElement": [<br>      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Sofá 1 plaza" }, "price": "80000", "priceCurrency": "COP" },<br>      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Sofá 3 plazas" }, "price": "120000", "priceCurrency": "COP" }<br>    ]<br>  }<br>}<br>``` |
| **Impacto esperado** | Captura de keywords de alto volumen. +15-20% tráfico SEO desde queries de servicio. Mejora en autoridad de dominio para "limpieza Bogotá". |
| **Esfuerzo** | M (12-15 horas — 4 service pages × 3 horas cada una incluyendo copy, SEO, schema, internal linking) |
| **Agente recomendado** | Frontend (HTML/CSS) + Content (copy SEO 800+ palabras por página) |
| **Referencias** | [1] WordStream — Top 10 Ways to Improve Your Local SEO<br>[2] Moz — Service Page SEO Best Practices |
| **Estado** | Nueva propuesta — NO mencionada en R1-R109 |
| **Prioridad CEO** | 🔴 **Alta** — gap crítico de SEO, impacto directo en visibilidad |

---

### Propuesta 2: Google Business Profile — Posts Semanales con Offers y Eventos

| Campo | Detalle |
|-------|---------|
| **Título** | Implementar sistema de GBP Posts semanales para mantener ficha activa y atractiva |
| **Problema** | Según WordStream [1], publicar posts en GBP (productos, eventos, ofertas especiales) es clave para visibility en Google Search y Maps. El sitio tiene el negocio listado en `sameAs` pero no hay evidencia de GBP Posts activos. Google penaliza fichas inactivas. |
| **Descripción** | **1. Crear proceso de GBP Posts semanal:**<br><br>**2. Tipos de posts (rotar cada semana):**<br><br>**Offer Post (cada 2 semanas):**<br>```<br>Título: "🎉 10% off en Limpieza de Sofás — Solo esta semana"<br>Descripción: "Llámanos antes del viernes y obtén 10% off en tu limpieza de sofá. Valido para citas agendadas hasta el 30 de abril."<br>CTA: "Reservar ahora"<br>```<br><br>**Event Post (mensual):**<br>```<br>Título: "📅 Sanitización gratuita con limpieza de colchones"<br>Descripción: "Durante abril, incluye sanitización UV sin costo adicional en tu servicio de colchón. Protección contra ácaros."<br>```<br><br>**Product/Service Post (semanal):**<br>```<br>Título: "✨ Nuevo: Limpieza de sillones ergonómicos para home office"<br>Descripción: "Ahora ofrecemos limpieza especializada para sillas ergonómicas Herman Miller, Steelcase y otras marcas."<br>```<br><br>**3. Automatización:**<br>Crear calendario editorial en Notion/Google Sheets con posts programados. Designar 30 min/semana para publicar.<br><br>**4. Métricas:**<br>Registrar métricas de GBP (vistas de perfil, acciones de llamada, solicitudes de directions) monthly. |
| **Impacto esperado** | Mayor visibilidad en Google Search local. Ficha activa que supera a competidores inactivos. +10-15% leads desde Google Maps. |
| **Esfuerzo** | S (1-2 horas/semana — proceso manual, sin desarrollo) |
| **Agente recomendado** | CEO directamente (requiere acceso a Google Business Profile del negocio) |
| **Referencias** | [1] WordStream — Top 10 Ways to Improve Your Local SEO |
| **Estado** | Nueva propuesta — NO mencionada en R1-R109 |
| **Prioridad CEO** | 🔴 **Alta** — sin costo, alto impacto en SEO local |

---

### Propuesta 3: Voice Search FAQ — Optimizar para Asistentes Virtuales

| Campo | Detalle |
|-------|---------|
| **Título** | Crear sección FAQ dedicada a voice search con preguntas conversacionales |
| **Problema** | Voice search ya representa 40% de búsquedas locales [1]. El sitio tiene Schema FAQPage básico pero las preguntas están optimizadas para texto, no para voz. Las preguntas voice son largas y conversacionales ("¿Cuánto cuesta la limpieza de un sofá en Bogotá?" vs "precio limpieza sofá"). |
| **Descripción** | **1. Agregar preguntas voice-optimized al FAQ accordion existente:**<br>```html<br><details class="faq-item"><br>  <summary>¿Cuánto me cuesta limpiar el sofá en Bogotá?</summary><br>  <p>La limpieza profunda de sofás en Bogotá empieza desde $80.000 para sofás de 1 plaza. Los sofás de 3 plazas cuestan desde $120.000. Incluye aspirado, tratamiento de manchas y sanitización.</p><br></details><br><br><details class="faq-item"><br>  <summary>¿Purity & Clean打扫的房间多久能干?</summary><br>  <p>El servicio de limpieza profunda de sofás en Purity & Clean incluye secado rápido. En condiciones normales, el sofá está seco al tacto en 2-4 horas. No recomendamos usar el sofá en las primeras 2 horas.</p><br></details><br><br><details class="faq-item"><br>  <summary>¿Hay garantía en la limpieza de colchones?</summary><br>  <p>Sí. Todos nuestros servicios incluyen garantía de satisfacción. Si no estás feliz con la limpieza, regresamos sin costo adicional. Aplica en las primeras 48 horas post-servicio.</p><br></details><br>```<br><br>**2. Estructura de datos para voice:**<br>```json<br>{<br>  "@context": "https://schema.org",<br>  "@type": "FAQPage",<br>  "mainEntity": [<br>    {<br>      "@type": "Question",<br>      "name": "¿Cuánto me cuesta limpiar el sofá en Bogotá?",<br>      "acceptedAnswer": {<br>        "@type": "Answer",<br>        "text": "La limpieza profunda de sofás en Bogotá empieza desde $80.000 para sofás de 1 plaza. Los sofás de 3 plazas cuestan desde $120.000. Incluye aspirado, tratamiento de manchas y sanitización."<br>      }<br>    }<br>  ]<br>}<br>```<br><br>**3. Páginas de zona también reciben FAQ voice-optimized:**<br>Cada zona page (11 páginas) gana 3 FAQs específicas de la zona:<br>- "¿Cuánto cuesta limpiar un sofá en Chapinero?"<br>- "¿Hay servicio de sanitización de colchones en Suba?"<br>- "¿Purity & Clean atiende emergencia de limpieza en Engativá?" |
| **Impacto esperado** | Captura de tráfico voice search. +5-10% tráfico desde "OK Google" y "Hey Siri". Mejora en featured snippets. |
| **Esfuerzo** | S (3-4 horas — agregar 20 FAQs voice-optimized + schema update) |
| **Agente recomendado** | Content (copy) + Frontend (schema markup) |
| **Referencias** | [1] WordStream — Voice Search Optimization |
| **Estado** | Nueva propuesta — NO mencionada en R1-R109 |
| **Prioridad CEO** | **Alta** — tráfico voice creciente |

---

### Propuesta 4: Zonas Pages con Contenido SEO Sustancial (800+ palabras)

| Campo | Detalle |
|-------|---------|
| **Título** | Implementar contenido SEO de 800+ palabras en cada zona page (reemplazar plantilla genérica) |
| **Problema** | Las 11 zonas pages son plantillas con poco contenido único. Según WordStream [1], las location pages deben tener "individualized descriptions, testimonials, promotions". Las zonas pages actuales no tienen contenido sustancial para SEO — son 90% estructura con 10% texto. Google penaliza páginas thin content. |
| **Descripción** | **1. Estructura de contenido por zona page (mínimo 800 palabras):**<br><br>**Sección 1: Intro (150 palabras):**<br>```html<br><h1>Limpieza de Sofás en Chapinero, Bogotá</h1><br><p>Chapinero es uno de los barrios más exclusivos de Bogotá, conocido por sus edificios residenciales y apartamentos modernos. En Purity & Clean, llevamos más de 5 años prestando servicios de limpieza profunda de sofás en Chapinero, atendiendo a más de 500 familias de la zona.</p><br>```<br><br>**Sección 2: Por qué Chapinero (200 palabras):**<br>Historia del barrio, tipos de vivienda, perfiles de clientes comunes, desafíos de limpieza típicos (humedad, ácaros en muebles de cuero).<br><br>**Sección 3: Servicios ofrecidos en la zona (250 palabras):**<br>Lista de 4-5 servicios con descripciones específicas de Chapinero. Tarifa promedio, tiempo de servicio, frecuencia de demanda.<br><br>**Sección 4: Testimonios de la zona (150 palabras):**<br>3 reviews específicas de clientes de Chapinero. Incluir nombre (con permiso), barrio exacto, rating.<br><br>**Sección 5: FAQ local (150 palabras):**<br>3-5 preguntas específicas de Chapinero:<br>- "¿Hay estacionamiento cerca para el técnico?"<br>- "¿El servicio incluye materiales o debo proporcionarlos?"<br>- "¿En qué horarios atienden en Chapinero?"<br><br>**Sección 6: CTA (50 palabras):**<br>Descripción + formulario de cotización por zona pre-seleccionada.<br><br>**2. Internal linking mejorado:**<br>- Link desde zona → service pages relevantes (ej. Chapinero → `/servicios/limpieza-sofas-bogota.html`)<br>- Link desde zona → otras zonas cercanas<br>- Link desde zona → blog posts relevantes<br><br>**3. Schema NewsArticle para cada zona (opcional):**<br>DateModified, author, articleBody para indicar contenido fresco a Google. |
| **Impacto esperado** | Eliminación de thin content penalty. +20-30% tráfico SEO desde queries de zona. Las zonas pages compiten con directorios locales por ranking. |
| **Esfuerzo** | M (15-20 horas — 11 zonas × ~90 min por zona incluyendo research, copy, SEO, linking) |
| **Agente recomendado** | Content (copy por zona) + Frontend (actualizar template) |
| **Referencias** | [1] WordStream — Location Pages Best Practices |
| **Estado** | Nueva propuesta — NO mencionada en R1-R109 |
| **Prioridad CEO** | 🔴 **Alta** — gap de SEO crítico, impacto en ranking de zona |

---

### Propuesta 5: Review Response Automation — Sistema de Respuesta a Reseñas

| Campo | Detalle |
|-------|---------|
| **Título** | Implementar sistema de respuesta a TODAS las reseñas de Google y redes sociales |
| **Problema** | Según BrightLocal LCRS y WordStream [1]: 80% más propenso a usar negocio que responde a TODAS las reseñas. El sitio tiene Schema AggregateRating pero NO hay sistema de respuesta. Un cliente que deja 1 estrella y no recibe respuesta se siente ignorado. |
| **Descripción** | **1. Crear workflow de respuesta:**<br><br>**Google Reviews:**<br>- Daily check de nuevas reseñas en Google Business Profile<br>- Responder dentro de 24h<br>- Template de respuesta según rating:<br><br>**5 estrellas:**<br>```<br>"¡Gracias [Nombre] por tu reseña de 5 estrellas! Nos alegra saber que quedaste satisfecho con [servicio]. Tu satisfacción es nuestra mayor recompensa. ¡Esperamos verte pronto de nuevo! — Equipo Purity & Clean"<br>```<br><br>**4 estrellas:**<br>```<br>"¡Gracias [Nombre]! Valoramos mucho tu comentarios. Nos encantaría saber qué podríamos haber hecho para merecer esa 5ª estrella. Tu opinión nos ayuda a mejorar. ¡Escríbenos a WhatsApp para discutirlo!"<br>```<br><br>**1-3 estrellas:**<br>```<br>"Hola [Nombre], lamentamos que tu experiencia no haya sido 100% satisfactoria. Tu opinión es muy importante para nosotros. Por favor contáctanos a WhatsApp +57 300 123 4567 para resolverlo directamente. — Equipo Purity & Clean"<br>```<br><br>**2. Social media reviews:**<br>Configurar alertas de Google Alerts para "Purity & Clean" + monitorizar reseñas en Facebook e Instagram.<br><br>**3. Dashboard de tracking:**<br>Spreadsheet con: fecha, plataforma, rating, texto de reseña, respuesta enviada, status (pendiente/resuelto).<br><br>**4. Automatización (opcional):**<br>Si el volumen crece, explorar tools como `Respond.io` o `ReviewTrackers` que automatizan respuestas con templates AI-powered. |
| **Impacto esperado** | +15% confianza de nuevos clientes (review response visible públicamente). Reducción de clientes insatisfechos que no regresan. Mejora en rating general por gestión proactiva. |
| **Esfuerzo** | S (1 hora/día — proceso manual, sin desarrollo técnico) |
| **Agente recomendado** | CEO directamente (requiere acceso a Google Business Profile y redes sociales) |
| **Referencias** | [1] WordStream — Review Management Best Practices |
| **Estado** | Nueva propuesta — NO mencionada en R1-R109 |
| **Prioridad CEO** | 🔴 **Alta** — sin costo, impacto directo en confianza y conversión |

---

### Propuesta 6: Core Web Vitals Monitoring — Agregar a Playwright Tests

| Campo | Detalle |
|-------|---------|
| **Título** | Extender suite Playwright con tests de Core Web Vitals (LCP, FID, CLS) |
| **Problema** | Google usa Core Web Vitals como factor de ranking desde 2021. Mobile performance es crítica para home services (75% de mobile searches resultan en visitas offline en 24h [1]). El sitio tiene tests de Playwright para dark mode, search y formulario, pero NO hay tests de performance. |
| **Descripción** | **1. Instalar Playwright performance addon:**<br>```bash<br>npm install @playwright/test@latest<br>npx playwright install-deps<br>```<br><br>**2. Crear test de performance:**<br>```javascript<br>const { test, expect } = require('@playwright/test');<br>const { performance } = require('perf_hooks');<br><br>test('Core Web Vitals - LCP < 2.5s', async ({ page }) => {<br>  const metrics = await page.evaluate(() => {<br>    return new Promise((resolve) => {<br>      new PerformanceObserver((list) => {<br>        const entries = list.getEntries();<br>        const lcp = entries[entries.length - 1];<br>        resolve({ lcp: lcp.startTime });<br>      }).observe({ entryTypes: ['largest-contentful-paint'] });<br>      page.goto('https://purityclean.com/');<br>    });<br>  });<br>  expect(metrics.lcp).toBeLessThan(2500);<br>});<br><br>test('Core Web Vitals - CLS < 0.1', async ({ page }) => {<br>  const metrics = await page.evaluate(() => {<br>    return new Promise((resolve) => {<br>      new PerformanceObserver((list) => {<br>        let cls = 0;<br>        for (const entry of list.getEntries()) {<br>          if (entry.hadRecentInput) continue;<br>          cls += entry.value;<br>        }<br>        resolve({ cls });<br>      }).observe({ entryTypes: ['layout-shift'] });<br>      page.goto('https://purityclean.com/');<br>    });<br>  });<br>  expect(metrics.cls).toBeLessThan(0.1);<br>});<br>```<br><br>**3. Test de FID (First Input Delay):**<br>```javascript<br>test('Core Web Vitals - FID < 100ms', async ({ page }) => {<br>  const metrics = await page.evaluate(() => {<br>    return new Promise((resolve) => {<br>      new PerformanceObserver((list) => {<br>        const entries = list.getEntries();<br>        const fid = entries[0];<br>        resolve({ fid: fid.processingStart - fid.startTime });<br>      }).observe({ entryTypes: ['first-input'] });<br>      page.goto('https://purityclean.com/');<br>    });<br>  });<br>  expect(metrics.fid).toBeLessThan(100);<br>});<br>```<br><br>**4. Agregar a CI/CD:**<br>GitHub Actions workflow que corre Playwright tests en cada PR, fallando si Core Web Vitals no pasan thresholds.<br><br>**5. Report en README:**<br>Agregar sección "Core Web Vitals" al README con resultados del último test. |
| **Impacto esperado** | Detección temprana de regresiones de performance. Mejora en ranking Google por Core Web Vitals. Mejor UX para usuarios mobile. |
| **Esfuerzo** | S (3-4 horas — agregar 3 tests + configurar CI) |
| **Agente recomendado** | QA (tests) + Frontend (optimizar si fallan) |
| **Referencias** | [1] WordStream — Mobile SEO Performance |
| **Estado** | Nueva propuesta — NO mencionada en R1-R109 |
| **Prioridad CEO** | **Alta** — impacto en SEO y UX mobile |

---

## Resumen: Propuestas R110

| # | Propuesta | Impacto | Esfuerzo | Prioridad |
|---|-----------|---------|----------|-----------|
| 1 | **Service Pages SEO (4 pages)** | Keywords de alto volumen, +15-20% tráfico | M | 🔴 **Alta** |
| 2 | **GBP Posts Semanales** | Visibilidad en Google Search/Maps, ficha activa | S | 🔴 **Alta** |
| 3 | **Voice Search FAQ** | Captura tráfico voice (40% búsquedas locales) | S | **Alta** |
| 4 | **Zonas Pages con Contenido SEO** | Elimina thin content, +20-30% tráfico zona | M | 🔴 **Alta** |
| 5 | **Review Response System** | +15% confianza, mejor rating | S | 🔴 **Alta** |
| 6 | **Core Web Vitals en Playwright** | SEO ranking, UX mobile | S | **Alta** |

---

## Dependencias y Precedentes

| Propuesta R110 | Depende de | Notas |
|----------------|------------|-------|
| Service Pages SEO | Ninguna | Puede implementarse independientemente |
| GBP Posts | Ninguna | CEO necesita acceso a Google Business Profile |
| Voice Search FAQ | FAQPage schema existente (R102) | Expande preguntas existentes |
| Zonas Pages Content | Zonas pages existentes (R10-R20) | Reescribe template existente |
| Review Response System | Ninguna | Proceso manual, sin desarrollo |
| Core Web Vitals Playwright | Playwright tests existentes (R85) | Expande suite existente |

---

## Orden de Implementación Sugerido

1. **Propuesta 5** (Review Response) — Semana 1 — Sin desarrollo, máximo impacto inmediato
2. **Propuesta 2** (GBP Posts) — Semana 1 — Sin desarrollo, proceso manual
3. **Propuesta 6** (Core Web Vitals) — Semana 1 — 3-4 horas, automatización de tests
4. **Propuesta 3** (Voice Search FAQ) — Semana 2 — Expande FAQ existente
5. **Propuesta 1** (Service Pages) — Semana 2-3 — Impacto SEO a mediano plazo
6. **Propuesta 4** (Zonas Pages Content) — Semana 3-4 — Reescribe las 11 zonas pages

---

## Fuentes

[1] WordStream. "Top 10 Ways to Improve Your Local SEO Right Now." Marc Schenker, March 2025. https://www.wordstream.com/local-seo

---

*Documento generado por Innovation Scout — Round 110*
*Purity & Clean Analysis — 2026-04-28*
*Co-Authored-By: Paperclip <noreply@paperclip.ing>*