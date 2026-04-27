# Análisis Creativo — Purity & Clean (Round 37)

**Proyecto:** Purity & Clean
**Fecha:** 2026-04-27
**Analista:** Innovation Scout
**Ronda:** 37
**Issue padre:** DOMAA-431

---

## Resumen Ejecutivo

R37 se enfoca en **GEO (Generative Engine Optimization)**, **YouTube Strategy**, y **Digital PR** — tres vectores que R36 no cubrió y que son críticos para la visibilidad en AI search en 2026.

El hallazgo central del artículo "Why GEO is a reputation problem" [1] es que **GEO no es un problema técnico — es un problema de posicionamiento de marca**. El sitio puede estar bien optimizado técnicamente, pero si no hay una narrativa consistente del brand a través de múltiples superficies (YouTube, Reddit, blogs del sector, reseñas), los LLMs no recomendarán el negocio.

Purity & Clean tiene:
- 127 reseñas verificadas (fuente de autoridad)
- Schema LocalBusiness bien implementado
- Sitio con buen SEO tradicional

Lo que **no tiene**:
- Presencia en YouTube (YouTube es #1 en citations de AI Overviews con 23.29%) [2]
- Estrategia de Digital PR para construir autoridad
- Contenido optimizado para query fan-out (subtopics que los LLMs usan para generar respuestas)
- Reddit/búsquedas locales de Bogotá (Reddit es #4 con 9.37%) [2]

---

## Stack tecnológico actual (resumen R36)

- **Frontend:** HTML5 + CSS3 + JS vanilla ES6+
- **CSS:** ~6212 líneas style.css
- **JS:** ~1847 líneas script.js + js/script.js
- **Fuentes:** Manrope + Raleway — Google Fonts
- **Iconos:** Font Awesome 6.5 CDN (SRI verificado)
- **Analítica:** Plausible Analytics (sin cookies, GDPR-compliant)
- **Forms:** Formspree
- **Testing:** Playwright E2E (9 suites)
- **PWA:** Service Worker, push notifications, offline support
- **SEO:** Schema LocalBusiness + FAQPage + Article + Review + VideoObject + HowTo + BreadcrumbList
- **Chatbot:** FAQ routing → WhatsApp (chatbot-fab con panel)
- **Booking:** Multi-step form con slot picker simulado
- **Theme:** Dark mode toggle con persistencia
- **Cobertura:** 10 zonas en Bogotá
- **Precios:** Cotizador interactivo + WhatsApp pre-filled
- **Referidos:** Cupón de 15%
- **Comparison sliders:** 6 pares antes/después
- **Reputación:** 127 reviews verificadas, 4.8/5

---

## Investigación: Hallazgos clave

### Hallazgo 1: GEO es un problema de reputación, no técnico [1]

El artículo "Why GEO is a reputation problem" de Search Engine Land (Abril 2026) establece que:

> "GEO performance is shaped less by technical tweaks and more by how consistently your brand is positioned, categorized, and validated across the web."

**Implicación para Purity & Clean:** El sitio tiene buen SEO técnico pero la marca no está siendo construida a través de otras superficies. Los LLMs no pueden recomendar lo que no conocen fuera del sitio web.

### Hallazgo 2: YouTube es #1 en AI Overview citations (23.29%) [2]

El estudio de Surfer SEO muestra que YouTube domina las citas en AI Overviews:

| Dominio | Share |
|---------|-------|
| youtube.com | 23.29% |
| wikipedia.org | 18.41% |
| google.com | 16.38% |
| reddit.com | 9.37% |
| linkedin.com | 8.80% |

**Implicación para Purity & Clean:** YouTube es la plataforma más citada en AI-generated content. Purity & Clean NO tiene canal de YouTube.

### Hallazgo 3: Query Fan-Out — los LLMs buscan subtopics [3]

Google usa "query fan-out" para generar AI Overviews: cuando alguien pregunta "limpieza de sofás Bogotá", el LLM busca no solo esa query sino subtopics relacionados:
- "¿Cuánto cuesta limpiar un sofá?"
- "¿Cuánto tarda el servicio?"
- "¿Qué productos usan?"
- "¿Es seguro para niños?"

**Implicación para Purity & Clean:** El sitio necesita contenido que responda no solo la query principal sino TODOS los subtopics. Las FAQ son un buen inicio pero no suficiente.

### Hallazgo 4: 82% lee AI-generated review summaries [4]

La mayoría de consumidores ahora lee resúmenes de reseñas generados por AI. Estas summaries se alimentan de las reseñas en plataformas como Google, Facebook y **YouTube** (videos de reviews).

### Hallazgo 5: Digital PR para GEO [1]

Ross Hudgens destaca que "si ninguna de estas fuentes [homepage, product pages, comparative content, review websites, affiliates] se alinea con una narrativa consistente, será un desafío para los LLMs llegar a un consenso sobre tu marca."

**Implicación para Purity & Clean:** Se necesita una estrategia de Digital PR que consiga menciones en blogs del sector hogar, revistas locales de Bogotá, y plataformas de reseñas.

---

## Gaps identificados — Round 37 (NOVEDADES no cubiertas en R1-R36)

### 1. YouTube Channel Strategy — aprovechar 23.29% de AI citations

**Problema:** YouTube es #1 en citations de AI Overviews. Purity & Clean no tiene presencia en YouTube.

### 2. Query Fan-Out Content — cubrir todos los subtopics que los LLMs buscan

**Problema:** El sitio responde la query principal ("limpieza de sofás Bogotá") pero no los subtopics que los LLMs buscan para completar AI Overviews.

### 3. Digital PR para GEO — conseguir menciones en blogs del sector

**Problema:** Los LLMs forman opiniones basadas en menciones externas. Purity & Clean solo existe en su propio sitio web.

### 4. Reddit/Q&A Platform Presence — participar en comunidades locales

**Problema:** Reddit es #4 en AI citations. No hay presencia en comunidades locales de Bogotá.

### 5. LinkedIn Company Page Optimization — autoridad B2B

**Problema:** LinkedIn es #5 en citations. Purity & Clean no tiene presencia en LinkedIn.

---

## Propuestas (Round 37)

### Propuesta 1: YouTube Channel Strategy — contenido de antes/después + SEO local

| Campo | Detalle |
|-------|---------|
| **Título** | YouTube para GEO: canal de video con antes/después y SEO local |
| **Problema** | YouTube es #1 en AI Overview citations (23.29%). Sin YouTube, el negocio pierde visibilidad en AI search. |
| **Descripción** | Crear un canal de YouTube optimizado para SEO local y AI discovery: (1) **Contenido principal**: videos de 60-90 segundos de antes/después reales de trabajos (sofás, colchones, alfombras). Mostrar el proceso, no solo el resultado. (2) **SEO de videos**: título "Limpiamos sofás en [barrio], Bogotá - Antes y Después", descripción con dirección, horarios, links al sitio, schema VideoObject. (3) **Playlists por servicio**: sofas-bogota, colchones-bogota, alfombras-bogota. (4) **Thumbnails consistentes**: estilo unificado con logo Purity & Clean. (5) **CTA en video**: "Llámanos o escribe WhatsApp" al final. (6) **Live streaming**: demostrar el proceso de limpieza en vivo para engagement. (7) **Schema VideoObject** en el sitio para cada video. Tecnología: YouTube Studio (gratis), teléfono para grabar, edit app básica (CapCut). Sin costo de producción alto. |
| **Impacto esperado** | +15-20% visibilidad en AI Overviews para queries de limpieza en Bogotá; YouTube aparece como fuente en respuestas de ChatGPT/Perplexity |
| **Esfuerzo** | M |
| **Agente recomendado** | Marketing/Content (creación de contenido) + Frontend (agregar VideoObject schema) |
| **Referencias** | [2] Surfer SEO AI Citation Report, [3] Search Engine Land |

### Propuesta 2: Query Fan-Out Content Expansion — FAQ profunda + HowTo pages

| Campo | Detalle |
|-------|---------|
| **Título** | Query Fan-Out Content: expandir FAQ y HowTo para capturar subtopics de LLMs |
| **Problema** | Los LLMs usan query fan-out para generar respuestas completas. Si el sitio no cubre todos los subtopics, el LLM usa fuentes competidoras. |
| **Descripción** | Implementar contenido que cubra todos los subtopics que los LLMs buscan: (1) **FAQ expandida** en el sitio con preguntas que cubren subtopics: "¿Cuánto cuesta limpiar un sofá?", "¿Cuánto tarda el servicio?", "¿Qué productos usan?", "¿Es seguro para niños/pets?", "¿Cómo me preparo?", "¿Qué pasa si no quedo satisfecho?". (2) **HowTo pages**: crear páginas /como-limpiamos-sofos/, /como-limpiamos-colchones/ con proceso paso a paso, tiempos, productos, resultados esperados. (3) **Contenido E-E-A-T**: añadir experiencia real (fotos del equipo, videos del proceso, testimonios específicos). (4) **Semantic triples**: escribir oraciones en formato subject-predicate-object para que LLMs extraigan datos fácilmente. (5) **Actualización de FAQ Schema**: asegurar que todas las nuevas preguntas estén en FAQPage schema. Tecnología: HTML/CSS/JS existente puede manejarlo. Crear nuevas secciones en index.html o páginas dedicadas. |
| **Impacto esperado** | Mayor probabilidad de ser citado en AI Overviews para queries relacionadas con limpieza en Bogotá |
| **Esfuerzo** | S |
| **Agente recomendado** | Content (research + writing) + Frontend (schema + HTML) |
| **Referencias** | [3] Search Engine Land AI Overviews Guide |

### Propuesta 3: Digital PR Campaign — conseguir menciones en blogs del sector hogar

| Campo | Detalle |
|-------|---------|
| **Título** | Digital PR para GEO: conseguir menciones en blogs de hogar y vida en Bogotá |
| **Problema** | Los LLMs usan fuentes externas para formar opiniones. Sin menciones en blogs del sector, el negocio no existe en el ecosistema de información que alimenta AI search. |
| **Descripción** | Ejecutar una campaña de Digital PR para conseguir menciones en superficies que los LLMs usan: (1) **Blogs objetivo**:portal del hogar, revistas de decoración Bogotá, blogs de vida sana, sitios de reseñas locales (TripAdvisor Colombia, Guía localities.co). (2) **Ángulos de pitch**: historias de interés humano ("cómo una familia bogotana eliminó ácaros del colchón de su hijo"), datos interesantes ("80% de las familias en Bogotá no limpian sus sofás correctamente"). (3) **Press release**: comunicar apertura de nuevas zonas, certificación de productos, premios ganados. (4) **Partnerships**: ofrecer servicios gratuitos a cambio de review honesta en blogs de influencers de hogar. (5) **Guest posting**: escribir 1-2 artículos en blogs del sector con link al sitio. (6) **Monitoring**: usar Google Alerts para detectar menciones no linkeadas y solicitar link. Tecnología: Outreach manual, Google Alerts (gratis), relations con medios locales. Sin costo de herramientas. |
| **Impacto esperado** | Conseguir 5-10 menciones en blogs del sector en 3 meses; aumenta autoridad de marca en ojos de LLMs |
| **Esfuerzo** | M |
| **Agente recomendado** | Marketing (Digital PR) + CEO (decisión sobre partnerships) |
| **Referencias** | [1] Search Engine Land - GEO is a reputation problem |

### Propuesta 4: Reddit/Q&A Platform Presence — participar en comunidades locales

| Campo | Detalle |
|-------|---------|
| **Título** | Reddit/Quora Presence: participar en comunidades de Bogotá y hogar |
| **Problema** | Reddit es #4 en AI citations (9.37%). Las comunidades de Reddit son fuentes primarias para LLMs sobre recomendaciones locales. |
| **Descripción** | Establecer presencia auténtica en Reddit y Quora: (1) **Crear cuenta** de Purity & Clean (no 个人, sino business) si las reglas lo permiten. (2) **Comunidades objetivo**: r/bogota, r/colombia, r/homemaintenance, r/cleaningtips. (3) **Participación auténtica**: responder preguntas sobre limpieza de muebles con tips genuinos (no promoción directa), compartir expertise. (4) **Perfil con link**: el perfil de Reddit puede incluir link al sitio web. (5) **Monitorear menciones**: buscar "Purity Clean" o "limpieza de sofás Bogotá" en Reddit para responder. (6) **AMA (Ask Me Anything)**: si hay suficiente autoridad, hacer un AMA sobre limpieza profesional. Tecnología: Reddit y Quora son gratis. Sin herramientas especializadas. |
| **Impacto esperado** | Construir presencia en ecosistemas que alimentan LLMs; +5-10 respuestas en Reddit/Quora por mes |
| **Esfuerzo** | S |
| **Agente recomendado** | Marketing (participación activa) |
| **Referencias** | [2] Surfer SEO AI Citation Report |

### Propuesta 5: LinkedIn Company Page — autoridad B2B y profesional

| Campo | Detalle |
|-------|---------|
| **Título** | LinkedIn Company Page: construir perfil profesional para autoridad B2B |
| **Problema** | LinkedIn es #5 en AI citations (8.80%). Para servicios B2B (oficinas, empresas), LinkedIn es fuente de recomendación. |
| **Descripción** | Crear y optimizar LinkedIn Company Page: (1) **Crear Company Page** en LinkedIn si no existe: logo, descripción, dirección, website, horarios. (2) **Contenido regular**: posts semanales sobre tips de limpieza, antes/después (con permiso de clientes), testimonios,招聘信息. (3) **Empleados como advocates**: que el equipo comparta contenido desde sus perfiles personales. (4) **Portfolio de servicios B2B**: crear showcase de servicios corporativos (hoteles, oficinas, clínicas). (5) **LinkedIn Articles**: escribir artículos sobre limpieza profesional, tendencias del sector. (6) **Connections**: conectar con Decision makers en empresasbogotanas que puedan necesitar servicios corporativos. Tecnología: LinkedIn (gratis para Company Page).Scheduling tool opcional (Hootsuite, Buffer). |
| **Impacto esperado** | +10-15% autoridad de marca en LinkedIn; aparece en recomendaciones B2B en LinkedIn y ChatGPT |
| **Esfuerzo** | S |
| **Agente recomendado** | Marketing (contenido + gestión de LinkedIn) |
| **Referencias** | [2] Surfer SEO AI Citation Report |

---

## Orden de implementación recomendado

| # | Propuesta | Impacto | Esfuerzo | Semana |
|---|----------|--------|----------|--------|
| 1 | YouTube Channel | Alto | Medio | 1-4 |
| 2 | Query Fan-Out Content | Alto | Bajo | 1-2 |
| 3 | LinkedIn Company Page | Medio | Bajo | 1-2 |
| 4 | Reddit/Q&A Presence | Medio | Bajo | 2-3 |
| 5 | Digital PR Campaign | Alto | Medio | 3-6 |

**Top 3 para implementar primero:** 1, 2, 3 (de mayor impacto en GEO con esfuerzo bajo-medio).

---

## Diferencia clave: R36 vs R37

R36 iba por **AI discovery y review intelligence** — cómo aparecer en AI search y gestionar reseñas proactivamente.

**R37 va por ecosystem visibility** — cómo el negocio existe fuera de su sitio web en superficies que los LLMs usan como fuentes (YouTube, Reddit, LinkedIn, blogs del sector).

El artículo de DiNardi [1] lo resume perfectamente:

> "GEO is a brand positioning and category alignment exercise, not a technical SEO audit."

Purity & Clean puede tener el mejor sitio web del mundo, pero si YouTube, Reddit, LinkedIn, y blogs del sector no hablan del negocio, los LLMs no lo recomiendan.

---

## Síntesis: Por qué R37 es diferente

R1-R36 se enfocaron en el sitio como centro de gravedad. R37 reconoce que **en la era de AI search, el negocio necesita existir en múltiples superficies simultáneamente**.

Los LLMs no solo indexan sitios web — indexan YouTube (23.29%), Reddit (9.37%), LinkedIn (8.80%), y blogs del sector. Purity & Clean tiene 127 reseñas y un sitio bien construido, pero:

1. **No tiene YouTube** — pierde 23.29% de oportunidades de citation
2. **No tiene presencia en Reddit** — pierde 9.37%
3. **No tiene LinkedIn** — pierde 8.80%
4. **No tiene Digital PR** — no existe en el ecosistema de información más amplio

En 2026, donde los consumidores usan YouTube, Reddit, y LinkedIn para investigar decisiones de compra, y donde los LLMs extraen información de estas plataformas para generar recomendaciones, **Purity & Clean necesita expandirse más allá de su sitio web**.

---

## Fuentes

[1] DiNardi, G. (2026). "Why GEO is a reputation problem." Search Engine Land. https://searchengineland.com/geo-reputation-problem-475342

[2] Surfer SEO. (2026). "AI Citation Report." https://surferseo.com/blog/ai-citation-report/

[3] Weyant, C. (2026). "AI Overviews optimization guide." Search Engine Land. https://searchengineland.com/guide/how-to-optimize-for-ai-overviews

[4] BrightLocal. (2026). "Local Consumer Review Survey 2026." https://www.brightlocal.com/local-consumer-review-survey/

---

*Documento generado por Innovation Scout — Round 37*
*Purity & Clean Analysis — 2026-04-27*
*Co-Authored-By: Paperclip <noreply@paperclip.ing>*