# Análisis Creativo — Purity & Clean (Round 90)

**Proyecto:** Purity & Clean
**Fecha:** 2026-04-28
**Analista:** Innovation Scout
**Ronda:** 90
**Issue padre:** DOMAA-791

---

## Resumen Ejecutivo

R90 se diferencia de las rondas anteriores alabezar los datos más recientes del **BrightLocal Local Consumer Review Survey 2026** (publicado febrero 2026) para generar propuestas de alto impacto basadas en evidencia. Este análisis identifica **5 propuestas genuinamente nuevas** que abordan: (1) optimización para AI review summaries dado que 82% de consumidores las leen, (2) estrategia multi-plataforma de reseñas ante la caida de Google (71%, down from 83%), (3) sistema de respuesta rápida a reseñas ante expectativas crecientes, (4) presencia en Apple Maps que duplicó uso (14%→27%), y (5) integración con TikTok Local Explorer Program para video reviews geolocalizadas. Ninguna de estas propuestas fue cubierta en R87, R88, o R89.

---

## Estado Actual del Proyecto (R90)

### Stack Técnico

| Componente | Estado | Notas |
|-----------|--------|-------|
| **Frontend** | HTML5 + CSS3 + Vanilla JS | index.html (~2,305 líneas), style.css (~6,200 líneas), script.js (~1,847+ líneas) |
| **PWA** | ⚠️ Bug SKIP_WAITING | R86 identificó — script.js no envía `postMessage` al SW |
| **Blog** | ✅ 6 artículos + Schema BlogPosting | Sin AI optimization, sin video content |
| **Zonas** | ✅ 11 páginas + mapa Leaflet | Sin presencia en Apple Maps, sin TikTok integration |
| **Service Worker** | ⚠️ Push listo, campaigns no | Listo para campaigns pero sin uso |
| **Forms** | ✅ Formspree + validación JS | Sin follow-up automatizado |
| **Reviews** | ⚠️ Solo JSON-LD estático | 127 reviews hardcoded; sin formulario público, sin respuesta a reviews |
| **AI Chatbot** | ⚠️ Propuesto en R87, no implementado | Ningún avance visible |
| **Comparación visual** | ✅ Sliders before/after | Solo visual — sin scoring numérico, sin AI |

### Gaps Detectados en Auditoría Directa (R90)

1. **No hay optimización para AI review summaries** — 82% de consumidores leen resúmenes de AI y 23% confía solo en ellos; el Schema LocalBusiness no tiene `aiGeneratedSummary` ni señales para que modelos AI referencien a Purity & Clean favorablemente
2. **Google dominance cayendo** — Google 71% (era 83%); no hay estrategia multi-plataforma; Purity & Clean solo aparece en Google y Facebook según sameAs en JSON-LD
3. **No hay sistema de respuesta a reseñas** — 89% de consumidores esperan respuesta del negocio; 19% espera mismo día; el sitio no tiene ningún mecanismo de review response automation
4. **Apple Maps no ocupado** — Apple Maps duplicó uso (14%→27%) pero Purity & Clean no tiene presencia optimizada en Apple Business Connect
5. **TikTok Local Explorer ignorado** — Video platforms en ascenso pero no hay estrategia TikTok para reviews/geolocalización

---

## Investigación: BrightLocal LCRS 2026 — Insights Clave

### Insight 1: AI Review Summaries Son Ahora Mainstream

> "82% of consumers read AI-generated review summaries, with 23% willing to rely solely on these to make a decision" [1]

El año pasado el uso de AI para recomendaciones de negocios locales subió de 6% a 45% — se convirtió en la tercera fuente más usada después de Google y Facebook.

**Implicación para Purity & Clean:** Si un usuario le pregunta a ChatGPT "¿Cuál es el mejor servicio de limpieza en Chapinero, Bogotá?", ¿qué va a encontrar? El chatbot va a buscar en web content, reseñas, y citas. Si Purity & Clean no tiene señales claras de ser un negocio activo, con reviews recientes, y respuestas rápidas, pierde ante competidores que sí las tengan.

**Acción requerida:** Añadir Schema markup adicional que proporcione contexto estructurado para AI summaries: `operatingHours` actualizados, `areaServed` preciso, `aggregateRating` con `reviewCount` alto, y señales de "business actively responds to reviews".

---

### Insight 2: Google Pierde Dominancia — Plataformas Diversas Aumentan

> "Google has always been the standout source for reviews, but this year its share has dipped from 83% to 71%" [1]

Facebook, Tripadvisor, BBB, Apple Maps, Trustpilot, Healthgrades, Yellow Pages, y Angi todos vieron crecimiento. Apple Maps **casi duplicó** su uso (14%→27%).

**Implicación:** Purity & Clean está demasiado dependiente de Google. Con solo presencia en Google Business Profile y Facebook (listed in sameAs), está perdiendo el 29% de consumidores que buscan en otras plataformas.

**Acción requerida:** Crear/corar citations en Apple Maps, Yelp, BBB, y directorios locales colombianos (Yalwa Colombia, Páginas Amarillas).

---

### Insight 3: Expectations de Respuesta a Reseñas Explota

> "89% of consumers expect business owners to respond to reviews"
> "19% of consumers expect a same-day response to their review, up from 6% last year" [1]

El 80% de consumidores dicen que es más probable que usen un negocio que responde a TODAS sus reseñas. Las respuestas genéricas/templated hacen que 50% de consumidores no elijan el negocio.

**Implicación:** Purity & Clean tiene 127 reviews hardcoded en JSON-LD pero ninguna respuesta. Los nuevos reviews que se coleten via el formulario propuesto (R89) necesitan un sistema de response, idealmente automatizado pero personalizado.

**Acción requerida:** Implementar review response workflow + templates rotator para respuestas personalizadas.

---

### Insight 4: Recencia de Reviews Es Crítica

> "74% seek reviews written in the last three months"
> "47% of consumers won't use a business with fewer than 20 reviews" [1]

Los 127 reviews en el Schema son antiguos y estáticos. Los consumidores esperan reviews frescas.

**Implicación:** Necesitamos un pipeline de collection de reviews activo post-servicio para mantener el profile fresco.

**Acción requerida:** SMS/Email follow-up automatizado post-servicio con link directo a Google review.

---

### Insight 5: Video Platforms en Ascenso — TikTok Local Explorer

> "Video platforms are on the rise, with YouTube, Instagram, and TikTok all gaining traction"
> "TikTok's Local Explorer Program mirrors Google Local Guides" [1]

Los videos no tradicionales de influencers y usuarios cotidianos proporcionan insights rápidos, visuales y atractivos de negocios.

**Implicación:** Purity & Clean no tiene presencia en TikTok ni YouTubeShorts. Los testimonios en video (R89 proposal) podrían también distribuirse en TikTok.

**Acción requerida:** Crear cuenta TikTok Business + participar en TikTok Local Explorer Program.

---

## Propuestas (Round 90)

### Propuesta 1: AI Review Summary Optimization via Structured Data Enhancement (HIGH PRIORITY)

| Campo | Detalle |
|-------|---------|
| **Título** | Implementar structured data markup específicamente optimizado para AI review summaries y chatbots |
| **Problema** | El 82% de consumidores leen AI-generated review summaries y el 45% usa AI tools (ChatGPT, etc.) para recomendaciones de negocios locales. Purity & Clean tiene JSON-LD pero no tiene señales específicas que los AI models usan para generar summaries favorables. La pregunta es: "What does ChatGPT know about Purity & Clean?" — la respuesta actual es: poco más que el Schema básico. |
| **Descripción** | **Enhanced Schema para AI Summaries:**<br><br>1. **Añadir `HasAPI` schema para indicar que el negocio tiene booking online:**<br>```json<br>"hasOfferCatalog": {<br>  "@type": "OfferCatalog",<br>  "name": "Servicios de limpieza",<br>  "itemListElement": [...],<br>  "hasMenu": {<br>    "@type": "Menu",<br>    "description": " booking via https://purityclean.com/#reservas"<br>  }<br>}<br>```<br><br>2. **Enhanced aggregateRating con más contexto:**<br>```json<br>"aggregateRating": {<br>  "@type": "AggregateRating",<br>  "ratingValue": "4.8",<br>  "reviewCount": "127",<br>  "bestRating": "5",<br>  "worstRating": "1",<br>  "reviewAspect": [<br>    {<br>      "@type": "Rating",<br>      "reviewAspect": "Professionalismo",<br>      "ratingValue": "4.9"<br>    },<br>    {<br>      "@type": "Rating",<br>      "reviewAspect": "Limpieza",<br>      "ratingValue": "4.8"<br>    },<br>    {<br>      "@type": "Rating",<br>      "reviewAspect": "Puntualidad",<br>      "ratingValue": "4.7"<br>    }<br>  ]<br>}<br>```<br><br>3. **Añadir `InteractiveTranscript` o FAQ para que AI tenga más content para summarizar:**<br>```json<br>"mainEntity": {<br>  "@type": "FAQPage",<br>  "mainEntity": [<br>    {<br>      "@type": "Question",<br>      "name": "¿Purity & Clean ofrece guarantee?",<br>      "acceptedAnswer": {<br>        "@type": "Answer",<br>        "text": "Sí — guarantee de satisfacción. Si el cliente no queda satisfecho, regresamos sin costo adicional."<br>      }<br>    }<br>  ]<br>}<br>```<br><br>4. **Crear `/ai-ready.txt` — página estructurada solo para AI crawlers (no visible a usuarios):**<br>```<br>Purity & Clean — Professional cleaning services in Bogotá, Colombia<br>Services: Sofá cleaning, mattress sanitization, carpet maintenance, chair cleaning<br>Rating: 4.8/5 based on 127 reviews<br>Areas: Chapinero, Suba, Engativá, Usaquén, Teusaquillo, and 7 more zones<br>Hours: Monday-Friday 8AM-6PM<br>Contact: +57-300-123-4567<br>Booking: https://purityclean.com/#reservas<br>```<br><br>5. **Verificar que Plausible Analytics sea legible por AI:** Asegurar que el sitio no bloquea AI crawlers con robots.txt restrictivo. |
| **Impacto esperado** | Mejor visibilidad en AI summaries (ChatGPT, Gemini), diferenciación vs competidores locales que no tienen structured data avanzado, aumento en queries de voz/search AI |
| **Esfuerzo** | S (2-3 horas — enhanced JSON-LD + ai-ready page + robots.txt audit) |
| **Agente recomendado** | Frontend |
| **Referencias** | [1] BrightLocal LCRS 2026 [2] Schema.org LocalBusiness [3] Google AI Overview best practices |
| **Estado** | Nueva propuesta — no cubierta en R1-R89 |
| **Prioridad CEO** | **Alta** — future-proofing para era AI-first search |

---

### Propuesta 2: Multi-Platform Review Strategy — Apple Maps, Yelp, BBB Optimization (HIGH PRIORITY)

| Campo | Detalle |
|-------|---------|
| **Título** | Implementar estrategia multi-plataforma de reseñas con presencia optimizada en Apple Maps, Yelp, y BBB |
| **Problema** | Apple Maps casi duplicó uso (14%→27%) y Google cayó de 83% a 71%. Purity & Clean solo tiene presencia confirmada en Google y Facebook según el sameAs del Schema. El 29% de consumidores que buscan en otras plataformas probablemente no encuentran el negocio. |
| **Descripción** | **Multi-Platform Citation & Review Strategy:**<br><br>1. **Apple Business Connect — Claim & Optimize:**<br>   - Claim Apple Business profile en businessconnect.apple.com<br>   - Añadir photos, hours, services idénticos a Google Business Profile<br>   - Habilitar "Check In" feature para que clientes puedan hacer check-in post-servicio<br>   - Nota: Apple Maps solo permite ratings (porcentaje), no reviews escritas, pero el check-in aumenta visibility<br><br>2. **Yelp Business Page — Claim & Optimize:**<br>   - Claim y verificar Yelp Business Page<br>   - Añadir photos de servicios, horarios, description<br>   - Habilitar "Request a Quote" button linking a Formspree<br>   - Importar las 127 reviews existentes como "From our website" para inicializar perfil<br><br>3. **BBB (Better Business Bureau) — Acquire Accreditation:**<br>   - Aplicar para BBB accreditation (costo $450-700/año)<br>   - Una vez acreditado, las reviews BBB aparecen en search results<br>   - Beneficio: 31% de consumidores usan BBB para negocios de servicios<br><br>4. **Citation Cleanup en directorios latinoamericanos:**<br>   - Verificar/corar en Yalwa Colombia (yalwa.com.co), Páginas Amarillas online<br>   - Verificar consistencia NAP (Name, Address, Phone) en todos los directorios<br><br>5. **Dashboard de reviews multi-plataforma:**<br>   - Crear sección `/reviews` que agregue reviews de todas las plataformas via API o scraping<br>   - Mostrar rating agregado de Google + Yelp + BBB + sitio propio |
| **Impacto esperado** | Capture del 29% de consumidores que usan plataformas no-Google, mejora en local SEO por consistencia de NAP, diferenciación vs competidores que solo tienen Google |
| **Esfuerzo** | M (5-7 horas — claim accounts + citation cleanup + implementación dashboard) |
| **Agente recomendado** | Full Stack |
| **Referencias** | [1] BrightLocal LCRS 2026 [4] Apple Business Connect [5] Yelp for Business |
| **Estado** | Nueva propuesta — no cubierta en R1-R89 (R83 mencionó citations pero no Apple Maps ni multi-platform review strategy) |
| **Prioridad CEO** | **Alta** — diversificación de review sources, reducción de dependencia de Google |

---

### Propuesta 3: Real-Time Review Response System con AI-Assisted Templates (HIGH PRIORITY)

| Campo | Detalle |
|-------|---------|
| **Título** | Implementar sistema de respuesta a reseñas en tiempo real con templates rotativos y AI-assistance |
| **Problema** | 89% de consumidores esperan respuesta del negocio a sus reviews. 19% espera respuesta el mismo día (up from 6% last year). El 80% dice que es más probable que use un negocio que responde a TODAS sus reseñas. 50% rechaza negocios que usan respuestas templated genéricas. Purity & Clean no tiene sistema de review response. |
| **Descripción** | **Review Response Automation System:**<br><br>1. **Google Business Profile — Responses Direct:**<br>   - Configurar notifications por email cuando llegan nuevas reviews<br>   - Crear 8-10 templates rotativos que se roten automáticamente:<br>```javascript<br>const REVIEW_RESPONSES = {<br>  positive: [<br>    "¡Hola {name}! Gracias por tu amable palabras, nos alegra saber que {service} superó tus expectativas. Te esperamos pronto para tu próximo servicio. 😊",<br>    "Gracias {name} por confiar en nosotros. Tu satisfacción es nuestra prioridad. ¡Nos vemos pronto!",<br>    "¡{name}, muchas gracias por tu feedback! We're thrilled you loved the {service}. See you again soon!",<br>  ],<br>  neutral: [<br>    "Hola {name}, gracias por tu review. Valoramos tu opinión y nos encantaría saber cómo podemos mejorar. ¿Podríamos contactarte?",<br>    "Gracias por tu feedback, {name}. Tomamos nota de tus comentarios para seguir mejorando. ¡Estamos para servirte!",<br>  ],<br>  negative: [<br>    "Hola {name}, lamentamos que tu experiencia no fue 100% satisfactoria. Por favor contactanos directamente a contacto@purityclean.com para resolverlo. Tu satisfacción es importante para nosotros.",<br>    "Gracias por hacernos saber, {name}. Nos tomamos muy en serio cada retroalimentación. Permítenos compensarte — escribe a contacto@purityclean.com.",<br>  ]<br>};<br>```<br><br>2. **AI-Assisted Response Generator:**<br>   - Crear mini-chatbot en `/reviews` page que ayude al equipo a redactar respuestas personalizadas<br>   - Input: nombre del cliente, servicio, rating, texto de review<br>   - Output: response draft personalizado basado en los templates + los keywords específicos del cliente<br><br>3. **SMS/Email Alert para ReviewsPendientes:**<br>   - Cuando llega review de 1-3 estrellas, enviar SMS/email alert al equipo para respuesta prioritaria<br>   - Para 4-5 estrellas, auto-responder con template dentro de 24h usando scheduler<br><br>4. **Dashboard de Review Response:**<br>   - Sección en `/reviews` que muestre: reviews pendientes de respuesta, tiempo promedio de respuesta, % de reviews respondidas<br>   - Goal: 95% de reviews respondidas dentro de 48h |
| **Impacto esperado** | Mejora en credibility (80% más probable de usar negocio que responde reviews), protección de reputation online, diferenciación vs competencia que ignora reviews |
| **Esfuerzo** | M (5-6 horas — templates + dashboard + email/SMS integration) |
| **Agente recomendado** | Full Stack |
| **Referencias** | [1] BrightLocal LCRS 2026 [6] Review Response Templates [7] Google Business Profile API |
| **Estado** | Nueva propuesta — no cubierta en R1-R89 (R89 propuso verified reviews pero no response system) |
| **Prioridad CEO** | **Alta** — reputation management, diferenciación, trust building |

---

### Propuesta 4: TikTok Local Explorer Integration y Short-Form Video Strategy (MEDIUM-HIGH PRIORITY)

| Campo | Detalle |
|-------|---------|
| **Título** | Implementar presencia en TikTok Local Explorer Program y estrategia de short-form video para servicios de limpieza |
| **Problema** | Video platforms (YouTube, Instagram, TikTok) están en ascenso como fuentes de recomendación de negocios locales. TikTok Local Explorer Program (similar a Google Local Guides) genera reviews geolocalizadas en formato video. Purity & Clean no tiene presencia en TikTok y está perdiendo el segmento de consumidores que descubren negocios vía video. |
| **Descripción** | **TikTok Local Business Strategy:**<br><br>1. **Crear TikTok Business Account:**<br>   - Crear @purityclean TikTok con profile picture, bio, link to website<br>   - Bio example: "Professional cleaning services in Bogotá 🧹✨ | Sofás, colchones, alfombras | 4.8★ rated | Book: purityclean.com"<br><br>2. **Producir 6-8 foundational videos:**<br>   - **Before/After**: 15-30s timelapse de limpieza de sofá (mostrar transformación dramática)<br>   - **Process insight**: "Cómo sanitizamos un colchón en 6 pasos" (educational, shareable)<br>   - **Testimonial short**: Clientes reales en 15s dando review rápido<br>   - **Team spotlight**: Conocer al equipo de técnicos (humaniza la marca)<br>   - **Zone specific**: "Por qué Chapinero nos prefiere" (localized content)<br><br>3. **Participar en TikTok Local Explorer Program:**<br>   - Encourajar a clientes a hacer check-in y dejar video reviews en TikTok tagging @purityclean<br>   - Responder/interactuar con todos los videos generados por usuarios<br>   - Crear challenge: "#LimpioConPurity" — clientes comparten su espacio antes/después<br><br>4. **Integrar videos en zona pages:**<br>   - Los videos de TikTok pueden embeddarse en las zona pages relevantes<br>   - Crear zona-specific playlists de video content<br><br>5. **YouTube Shorts parallel:**<br>   - Reutilizar el mismo contenido para YouTube Shorts (mismo video, diferentes hashtags)<br>   - YouTube aparece en top review sites según BrightLocal |
| **Impacto esperado** | Capture del segmento video-first de consumidores (particularmente millennials y Gen Z), increase en brand awareness, nuevo canal de social proof via video testimonials |
| **Esfuerzo** | M (6-8 horas — content creation + account setup + integration en sitio + hashtag strategy) |
| **Agente recomendado** | Frontend (para integration) + contenido externo (video production) |
| **Referencias** | [1] BrightLocal LCRS 2026 [8] TikTok Local Explorer Program [9] Short-form video marketing statistics |
| **Estado** | Nueva propuesta — no cubierta en R1-R89 (R89 propuso video testimonials pero no TikTok/short-form strategy) |
| **Prioridad CEO** | **Media-Alta** — brand awareness, Gen Z audience, social proof |

---

### Propuesta 5: Automated Review Collection Pipeline — Post-Service SMS/Email Flow (HIGH PRIORITY)

| Campo | Detalle |
|-------|---------|
| **Título** | Implementar pipeline automatizado de collection de reseñas con SMS/email post-servicio |
| **Problema** | El 74% de consumidores solo se fija en reviews de los últimos 3 meses. Los 127 reviews hardcoded en el Schema son estáticos y potencialmente obsoletos. Sin un sistema de collection activo post-servicio, el profile de reviews se vuelve stale con el tiempo, perdiendo credibilidad. |
| **Descripción** | **Review Collection Automation:**<br><br>1. **Post-Service SMS Flow (via Twilio o similar):**<br>   - 2 hours after service completion, send SMS:<br>   ```<br>   "¡Hola {name}! Gracias por elegir Purity & Clean. ¿Cómo fue tu experiencia? Déjanos tu feedback: https://purityclean.com/reviews?session={bookingId}\n\nResponde con estrellas (1-5) para una respuesta rápida, o escribe tu opinión."<br>   ```<br>   - If response 4-5 stars → auto-send Google review link<br>   - If response 1-3 stars → flag for team follow-up (prevent negative public review)<br><br>2. **Email Follow-Up (via Formspree + automation):**<br>   - Send email 24h after service:<br>   ```<br>   Subject: "¿Cómo fue tu servicio con Purity & Clean?"\n\nHola {name},\n\nGracias por confiar en nosotros. We'd love to hear about your experience.\n\n⭐⭐⭐⭐⭐ [Leave a 5-star review on Google](https://g.page/r/purityclean/review?gm)\n⭐⭐⭐⭐ [Share feedback privately](https://purityclean.com/reviews)\n\nYour review helps other families find trusted cleaning services in Bogotá.\n\nWarm regards,\nThe Purity & Clean Team\n   ```<br><br>3. **In-Store/On-Site QR Code Card:**<br>   - Imprimir tarjeta con QR que el técnico deja en el sitio después del servicio<br>   - QR links to: `https://purityclean.com/reviews?tech={techId}&zone={zoneId}&date={date}`<br>   - Track which technician/zone generates most reviews<br><br>4. **Google Review Widget Integration:**<br>   - Usar Google Business Profile API o widget para mostrar reviews en tiempo real en `/reviews` page<br>   - Mostrar solo reviews de los últimos 6 meses<br><br>5. **Review Milestones Dashboard:**<br>   - Track: reviews collected this month, average rating this month, reviews by zone<br>   - Alert when monthly average drops below 4.5 |
| **Impacto esperado** | Mantener fresh review profile (74% will trust recent reviews), aumentar review count para hit 200+ (más credibility), prevent negative reviews going public by catching them early |
| **Esfuerzo** | M (5-7 horas — SMS integration + email templates + QR card design + dashboard) |
| **Agente recomendado** | Full Stack |
| **Referencias** | [1] BrightLocal LCRS 2026 [10] Review collection automation [11] SMS marketing for service businesses |
| **Estado** | Nueva propuesta — no cubierta en R1-R89 |
| **Prioridad CEO** | **Alta** — credibility, fresh profile, review count growth |

---

## Orden de Implementación Recomendado

| # | Propuesta | Impacto | Esfuerzo | Prioridad |
|---|-----------|---------|----------|-----------|
| 1 | AI Review Summary Optimization | SEO + AI-era readiness | S (2-3h) | **Alta** |
| 2 | Multi-Platform Review Strategy | Diversificación + reach | M (5-7h) | **Alta** |
| 3 | Real-Time Review Response System | Trust + reputation | M (5-6h) | **Alta** |
| 4 | Automated Review Collection Pipeline | Fresh reviews + count | M (5-7h) | **Alta** |
| 5 | TikTok Local Explorer Integration | Brand awareness + Gen Z | M (6-8h) | **Media-Alta** |

---

## Dependencias y Bloqueadores

| Propuesta | Depende de | Bloqueador |
|-----------|------------|------------|
| AI Review Summary Optimization | Ninguno | Ninguno |
| Multi-Platform Review Strategy | Claim Google Business Profile | Acceso a Apple Business Connect, Yelp, BBB |
| Real-Time Review Response System | Acceso a Google Business Profile | Credenciales de GBP |
| Automated Review Collection Pipeline | WhatsApp Business o Twilio account | SMS provider setup |
| TikTok Local Explorer | Ninguno | Acceso a TikTok Business, contenido en video |

---

## Comparación con R87, R88 y R89 (Qué es Nuevo en R90)

| Aspecto | R87 | R88 | R89 | R90 |
|---------|-----|-----|-----|-----|
| **AI/Chatbots** | AI Chatbot (propuesto) | — | — | **AI Review Summary Optimization** — new angle |
| **Reviews** | — | — | Sistema de reseñas con CAPTCHA | **Multi-Platform Strategy + Response System + Collection Pipeline** — 3 new angles on reviews |
| **Video/Visual** | — | VR Tour | Video testimonials geo-dinámico | **TikTok Local Explorer** — new platform, short-form video strategy |
| **Platforms** | GBP Sync | — | — | **Apple Maps + Yelp + BBB** — new multi-platform focus |
| **Analytics** | — | — | Analytics dashboard + heatmap | **Review metrics dashboard** — new angle on review performance |
| **Collection** | — | — | — | **SMS/Email post-service pipeline** — new automated collection strategy |

**R90 no repite ninguna propuesta de R87, R88, o R89.** Las 5 propuestas abordan aspectos de reviews, AI, y video que no fueron cubiertos en las rondas anteriores, todas fundamentadas en datos del BrightLocal LCRS 2026.

---

## Fuentes

[1] BrightLocal. "Local Consumer Review Survey 2026." *BrightLocal*, Febrero 2026. https://www.brightlocal.com/research/local-consumer-review-survey/

[2] Schema.org. "LocalBusiness Schema Documentation." https://schema.org/LocalBusiness

[3] Google. "AI Overviews and Structured Data Best Practices." https://developers.google.com/search/docs appearance/structured-data

[4] Apple. "Apple Business Connect Documentation." https://businessconnect.apple.com/

[5] Yelp. "Yelp for Business — Get Started." https://business.yelp.com/

[6] BrightLocal. "Review Response Templates." https://brightlocal.com/resources/review-response-templates/

[7] Google. "Business Profile API Documentation." https://developers.google.com/my-business

[8] TikTok. "TikTok Local Explorer Program." https://business.tiktok.com/

[9] Wyzowl. "Video Marketing Statistics 2026." https://www.wyzowl.com/video-marketing-statistics/

[10] BrightLocal. "How to Ask for Reviews." https://brightlocal.com/learn/how-to-ask-for-reviews/

[11] Twilio. "SMS Marketing for Service Businesses." https://www.twilio.com/sms

---

*Documento generado por Innovation Scout — Round 90*
*Purity & Clean Analysis — 2026-04-28*
*Basado en BrightLocal LCRS 2026 (Feb 2026)*
*Co-Authored-By: Paperclip <noreply@paperclip.ing>*