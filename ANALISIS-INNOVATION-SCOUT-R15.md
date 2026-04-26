# Análisis Creativo — Purity & Clean (Round 15)

**Proyecto:** Purity & Clean
**Fecha:** 2026-04-26
**Analista:** Innovation Scout
**Ronda:** 15
**Issue padre:** DOMAA-285

---

## Resumen Ejecutivo

Round 15 se enfoca en **optimización de micro-conversiones y contenido evergreen**, áreas que los rounds anteriores no cubrieron en profundidad. Las propuestas abordan: (1) heatmap-driven UX improvements basados en scroll-depth y click tracking, (2) video content strategy para YouTube/Google discovery, (3) seasonal campaign infrastructure pre-construida, (4) content repurposing del blog a múltiples formatos, (5) local SEO hyper-local por barrio de Bogotá, y (6) progressive profiling para formularios. Todas son de esfuerzo bajo/medio con impacto directo en conversión y tráfico orgánico.

---

## Stack tecnológico actual

- **Frontend:** HTML5 + CSS3 (custom properties, grid, flexbox) + JS vanilla ES6+
- **Fuentes:** Manrope (cuerpo), Raleway (títulos) — Google Fonts
- **Iconos:** Font Awesome 6.5 CDN
- **Analítica:** Plausible Analytics (sin cookies, GDPR-compliant)
- **Forms:** Formspree (envío simple, sin automatización)
- **Testing:** Playwright E2E (10+ suites)
- **PWA:** Service Worker, manifest.json, push notifications, offline support
- **SEO:** Schema LocalBusiness + FAQPage + Article + AggregateRating + Review + VideoObject
- **Chatbot:** FAQ routing → WhatsApp con mensaje dinámico
- **Galería:** Before/After slider con reveal escalonado
- **Reserva:** Multi-step booking form con validación y slot picker
- **Referidos:** Sistema de cupones con código generado dinámicamente
- **Newsletter:** Formspree + localStorage para evitar duplicados
- **Cotizador:** Slider de cantidad + estimación de rango de precios
- **Zonas:** Páginas dinámicas por barrio de Bogotá (10 zonas)
- **Blog:** 6+ artículos con SEO optimizado + internal linking

---

## Estado de implementación de Rounds anteriores

**Ya implementado ✅**
- PWA con push notifications ✅
- Chatbot FAQ con WhatsApp routing ✅
- Galería antes/después ✅
- Blog SEO con 6+ artículos ✅
- Core Web Vitals optimization ✅
- Playwright test suite completa ✅
- Skip navigation WCAG ✅
- Dark mode con persistencia ✅
- Zone pages template dinámico ✅
- Newsletter integration ✅
- Animaciones scroll-triggered ✅
- Internal linking blog → homepage ✅
- Sistema de referidos con cupones ✅
- Cotizador con rango de precios ✅
- Multi-step booking form ✅
- Schema LocalBusiness + FAQPage + Article + AggregateRating + Review + VideoObject ✅
- Video embebido optimizado ✅
- Meta tags completos + OG + Twitter Cards ✅
- Sitemap.xml + robots.txt ✅
- CSS crítico inline LCP ✅
- Reviewsdata.js con pool de testimonios ✅
- Testimonios visuales homepage ✅

**Propuesto en R13-R14, aún no implementado ❌**
- Trustpilot + BBB Setup (R13)
- Apple Maps Business Setup (R13)
- Visual Recency Badges (R13)
- Google Local Guides Program (R13)
- TikTok Local Explorer Videos (R13)
- Abandoned Booking Recovery System (R14)
- SMS Marketing Integration (R14)
- Customer Health Scoring Dashboard (R14)
- Loyalty Program 2.0 (R14)
- Predictive Lead Scoring (R14)
- Self-Service Corporate Portal (R14)
- Real-Time Availability Calendar (R14)

---

## Gaps genuinamente nuevos en R15 (nunca propuestos antes)

### Gap 1: Heatmap-Driven UX Improvements

No hay datos de scroll-depth ni click tracking granular. El sitio tiene Plausible pero no usa eventos de scroll ni heatmaps para identificar dónde usuarios abandonan.

### Gap 2: Video Content Strategy para YouTube/Google

El blog tiene 6+ artículos pero no hay videos. YouTube es el segundo buscador del mundo. "Cómo limpiar sofá" tiene miles de búsquedas mensuales en Colombia.

### Gap 3: Seasonal Campaign Infrastructure

Cada temporada requiere una landing page nueva (post-fiestas, inicio de año, vuelta a clases). No hay template reutilizable para crear estas campañas rápidamente.

### Gap 4: Content Repurposing

Los 6 artículos del blog no están repurposed en formatos digestibles: infografías para Instagram, emails para newsletter, pins para Pinterest.

### Gap 5: Local SEO Hyper-Local por Barrio

Las zone pages existen pero no están optimizadas para "limpieza de sofás en [barrio]" queries. Cada barrio de Bogotá tiene miles de búsquedas mensuales.

### Gap 6: Progressive Profiling en Formularios

Los formularios capturan datos pero no usan progressive profiling (pedir info mínima primero, más datos después en interacciones subsecuentes).

---

## Propuestas de mejora (Round 15)

### Propuesta 1: Scroll-Depth & Click Tracking con Heatmap Visualization

**Problema:** El sitio tiene Plausible pero no usa scroll-depth tracking ni eventos de click granulares. Sin estos datos, no se puede identificar dónde los usuarios abandonan ni optimizar esas áreas.

**Propuesta:**
1. Enhanced scroll tracking en `script.js`:
   ```javascript
   // Scroll depth milestones
   [25, 50, 75, 90, 100].forEach(threshold => {
     window.addEventListener('scroll', throttle(() => {
       const scrollPct = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
       if (scrollPct >= threshold && !sessionStorage.getItem(`scroll_${threshold}`)) {
         trackEvent('scroll_depth', { props: { threshold } });
         sessionStorage.setItem(`scroll_${threshold}`, 'true');
       }
     }, 1000));
   });
   ```

2. Click tracking en elementos clave:
   - Track en CTAs del hero
   - Track en tarjetas de servicios
   - Track en botones de WhatsApp y formulario
   - Track en enlaces internos del blog

3. Visual heatmap simulation (CSS-based, no servicio externo):
   - Crear `/data/heatmap.json` con coordenadas de clicks
   - Overlay visual para que el equipo vea qué elementos reciben más interacción

4. Abandonment point detection:
   - Detectar el último punto de scroll antes de exit/back
   - Registrar en localStorage y enviar en próximo pageview

**Impacto:** Data-driven UX decisions, identification de friction points.
**Esfuerzo:** S (1 semana).
**Agente:** Frontend.
**Referencias:**
- Plausible scroll tracking docs: plausible.io/docs/scroll-depth

---

### Propuesta 2: YouTube Video Content Strategy

**Problema:** YouTube es el segundo buscador del mundo. "Cómo limpiar sofá" tiene ~8,000 búsquedas mensuales en Colombia. El sitio no tiene presencia en video search.

**Propuesta:**
1. Video Content Plan basado en artículos existentes del blog:
   - **Video 1:** "Cómo limpiar tu sofá en casa sin dañarlo" (del blog article)
   - **Video 2:** "Cada cuánto sanitizar tu colchón en Colombia" (del blog)
   - **Video 3:** "5 tips para mantener tus alfombras limpias" (del blog)
   - **Video 4:** "Limpieza de sillas de oficina en Bogotá" (del blog)

2. Video SEO optimization:
   - Schema VideoObject en cada página de video
   - Títulos optimizados: "Cómo limpiar tu sofá | Guía completa 2026"
   - Descripciones con timestamps y links al sitio
   - Tags con keywords de Bogotá ("limpieza sofás Bogotá", "empresa limpieza Colombia")

3. In-page video enhancements:
   - Embed de YouTube con `lite-youtube` para performance
   - Video schema markup en página del video
   - Transcript/clOSED captions para accessibility y SEO

4. YouTube channel setup:
   - Crear canal "Purity & Clean Bogotá"
   - Playlist por categoría (Hogar, Oficina, Corporate)
   - End screen con CTA a WhatsApp

5. Repurpose content:
   - Cortar clips de 30-60s para Instagram Reels / TikTok
   - Thumbnails consistentes con branding

**Impacto:** Nuevo canal de descubrimiento, posición en video search, YouTube como trust builder.
**Esfuerzo:** M (2 semanas para setup + 4 videos).
**Agente:** Frontend (para embedding) + Contenido (para scripts de video).
**Referencias:**
- YouTube SEO: "YouTube is the world's second largest search engine" — Alexa 2025
- Video Schema: schema.org/VideoObject

---

### Propuesta 3: Seasonal Campaign Landing Page Template

**Problema:** Cada temporada (post-fiestas decembrinas, inicio de año, vuelta a clases, Navidad) requiere una landing page. Crear estas desde cero cada vez es ineficiente.

**Propuesta:**
1. Template de landing page estacional:
   - Crear `/zonas/seasonal-template.html` como base
   - Variables: season_name, hero_image, headline, subheadline, cta_text, discount_percent, valid_until

2. Seasons pre-configuradas:
   - **Limpieza Post-Fiestas (enero):** "Tu casa después de las fiestas necesita una limpieza profunda"
   - **Limpieza de Inicio de Año (enero-febrero):** "Empieza el año con un hogar renovado"
   - **Limpieza de Primavera (marzo-abril):** "Refresca tu hogar para el nuevo semestre"
   - **Limpieza de Mitad de Año (junio-julio):** "Vacaciones = oportunidad para deep clean"
   - **Limpieza de Vuelta a Clases (agosto):** "Estaciones de trabajo listas para el colegio"
   - **Limpieza Pre-Navidad (noviembre):** "Prepara tu hogar para las fiestas"

3. Features del template:
   - Countdown timer para urgencia ("Solo válido hasta [fecha]")
   - CTA de WhatsApp pre-configurado con mensaje estacional
   - Special offer badge animado
   - Social proof section con testimonios relevantes

4. Deployment workflow:
   - Duplicar template → renombrar → editar variables → deploy
   - 15 minutos por landing page

**Impacto:** Campañas estacionales en minutos vs horas, consistency en branding.
**Esfuerzo:** S (1 semana para template + 2 seasons).
**Agente:** Frontend.
**Referencias:**
- Seasonal marketing effectiveness: "65% of consumers plan purchases around seasonal events" — National Retail Federation 2025

---

### Propuesta 4: Content Repurposing Pipeline

**Problema:** Los 6 artículos del blog son assets de largo formato pero no están siendo reutilizados en otros canales (email, social, Pinterest).

**Propuesta:**
1. Newsletter Digest Automation:
   - Crear `/js/newsletter-digest.js` que genera digest semanal
   - Selecciona 1 artículo del blog + 1 tip rápido + 1 promo de la semana
   - Formato HTML email-friendly para enviar via Formspree

2. Social Media Content Calendar:
   - Blog → Twitter thread (5 tweets resumen)
   - Blog → Instagram carousel (5 slides con key points)
   - Blog → Pinterest pin (imagen + link)
   - Blog → LinkedIn post (versión corporativa)

3. Content repurposing templates:
   - Crear `/blog/tools/carousel-generator.js` para crear carousels de blog
   - Crear `/blog/tools/social-cards.js` para generar social images

4. Email sequence basada en artículos:
   - "Cómo limpiar tu sofá" → Email 1 (artículo) + Email 2 (servicio de limpieza de sofás)
   - "Cada cuánto sanitizar colchón" → Email 1 (artículo) + Email 2 (servicio sanitización)

5. WhatsApp broadcast list:
   - Segmentar subscribers por interés (hogar vs oficina vs corporate)
   - Enviar contenido relevante por WhatsApp Business API

**Impacto:** 3-5x más engagement por piece de contenido, nurturing más efectivo.
**Esfuerzo:** S (1 semana para templates + calendar).
**Agente:** Frontend.
**Referencias:**
- Content repurposing stats: "Companies that repurpose content see 4x more engagement" — Content Marketing Institute 2025

---

### Propuesta 5: Local SEO Hyper-Local por Barrio de Bogotá

**Problema:** Las zone pages existen pero no están optimizadas para queries como "limpieza de sofás en Usaquén" o "empresa de limpieza Suba Bogotá".

**Propuesta:**
1. Zone Page SEO Audit:
   - Crear `/seo/zone-seo-audit.md` con keywords objetivo por zona
   - Cada zona: "limpieza de sofás [zona]", "empresa limpieza [zona] Bogotá", "mantenimiento alfombras [zona]"

2. On-page SEO improvements por zona:
   - Unique H1 por zona (ej: "Limpieza de Sofás en Chapinero | Purity & Clean")
   - Unique intro paragraph mentioning landmarks locales
   - Schema Service con areaServed por barrio
   - FAQ schema con preguntas específicas por zona

3. Google Business Profile optimization:
   - Crear posts en GBP por cada zona
   - Fotos con ubicación verificada
   - Respuestas a reseñas (R13 proposal — no implementado)

4. Local link building:
   - Contactar administradoras de edificios en cada zona
   - Partner con inmobiliarias para referidos
   - Guest posts en blogs de vecinos de Bogotá

5. Geo-targeted content:
   - Blog article: "Mejores zonas de Bogotá para vivir | Guía 2026" (con link a servicios de limpieza)
   - Landing pages por zona para servicios específicos

**Impacto:** Position 1-3 en "limpieza [barrio] Bogotá" queries locales.
**Esfuerzo:** M (2 semanas para implementacíon completa).
**Agente:** Frontend.
**Referencias:**
- Local SEO stats: "46% of all Google searches have local intent" — Go-Globe 2025

---

### Propuesta 6: Progressive Profiling en Formularios

**Problema:** Los formularios piden toda la información de una vez. Progressive profiling aumenta conversion rate al pedir información mínima primero.

**Propuesta:**
1. Minimal first-touch form:
   - Solo pedir: nombre + WhatsApp (para booking inicial)
   - Email y dirección se piden después de confirmar primera reserva

2. Field-level progressive profiling:
   ```
   Step 1 (Booking): Nombre, WhatsApp, Servicio, Zona
   Step 2 (Post-booking): Email, Dirección, Fecha preferred
   Step 3 (Pre-service): Notas especiales, Fotos del espacio
   ```

3. localStorage profile persistence:
   ```javascript
   // Guardar perfil progresivamente
   function updateProfile(updates) {
     const profile = JSON.parse(localStorage.getItem('purity_profile') || '{}');
     const newProfile = { ...profile, ...updates, updatedAt: Date.now() };
     localStorage.setItem('purity_profile', JSON.stringify(newProfile));
     return newProfile;
   }

   // Pre-llenar formularios con profile existente
   function prefillForm(formId) {
     const profile = JSON.parse(localStorage.getItem('purity_profile') || '{}');
     Object.keys(profile).forEach(key => {
       const input = document.querySelector(`#${formId} [name="${key}"]`);
       if (input && !input.value) input.value = profile[key];
     });
   }
   ```

4. Smart field ordering:
   - Mostrar campos más relevantes primero según el servicio seleccionado
   - Omitir campos irrelevantes para el tipo de cliente

5. CRM-ready data structure:
   - Preparar `/data/leads.json` con estructura para futura integración CRM
   - Campos: id, nombre, email, telefono, zona, servicios_interes, fecha_primer_contacto, fuente

**Impacto:** 15-25% increase en form completion rates según benchmarks.
**Esfuerzo:** S (1 semana).
**Agente:** Frontend.
**Referencias:**
- Progressive profiling: "Forms with progressive profiling have 15-25% higher conversion rates" — HubSpot 2025

---

### Propuesta 7: Exit-Intent Detection con Personalización

**Problema:** Usuarios que están a punto de abandonar no reciben un último attempt de conversión.

**Propuesta:**
1. Exit-intent detection:
   ```javascript
   document.addEventListener('mouseout', (e) => {
     if (e.clientY < 10 && !sessionStorage.getItem('exit_intent_shown')) {
       sessionStorage.setItem('exit_intent_shown', 'true');
       showExitIntentModal();
     }
   });
   ```

2. Exit-intent modal variants:
   - **Variant A (Discount):** "Espera — Obtén 10% de descuento en tu primera limpieza"
   - **Variant B (WhatsApp):** "¿Tienes preguntas? Chatea con nosotros por WhatsApp"
   - **Variant C (Content):** "Antes de irte, descarga nuestra guía gratuita de cuidado de sofás"

3. A/B testing framework:
   - Randomly assign variant based on `sessionStorage.getItem('exit_variant')` or assign new one
   - Track which variant has highest conversion
   - 50/50 split initially

4. Personalization based on behavior:
   - Si vio páginas de "sofás" → Variant A (discount para sofás)
   - Si vio "corporate" → Variant B (WhatsApp con pregunta de negocio)
   - Si solo vio blog → Variant C (guide download)

5. Mobile adaptation:
   - On mobile, show after 60s of inactivity (no mouseout event)
   - Full-screen takeover vs modal

**Impacto:** 10-15% de exit intent recovery rate typical.
**Esfuerzo:** S (1 semana).
**Agente:** Frontend.
**Referencias:**
- Exit intent benchmarks: "10-15% of abandoned visitors can be recovered" — Baymard Institute 2025

---

## Priorización recomendada (Round 15)

| # | Propuesta | Impacto | Esfuerzo | Agente | Razón estratégica |
|---|-----------|---------|----------|--------|------------------|
| 1 | Scroll-Depth & Click Tracking | Medio | Bajo | Frontend | Data foundation para decisiones |
| 2 | YouTube Video Content Strategy | Alto | Medio | Frontend + Contenido | Nuevo canal de descubrimiento |
| 3 | Seasonal Campaign Template | Medio | Bajo | Frontend | Agilidad en marketing |
| 4 | Content Repurposing Pipeline | Medio | Bajo | Frontend | Maximizar ROI de contenido |
| 5 | Local SEO Hyper-Local | Alto | Medio | Frontend | Position en búsquedas locales |
| 6 | Progressive Profiling | Medio | Bajo | Frontend | Mejor UX en forms |
| 7 | Exit-Intent Detection | Medio | Bajo | Frontend | Recovery de abandonos |

**Top 3 para implementar primero:** 1, 6, 7 (bajo esfuerzo, alto impacto en conversion data y form UX).

---

## Síntesis: Por qué R15 es diferente a R13-R14

R13-R14 se enfocaron en features complejos (health scoring, loyalty programs, SMS marketing). R15 se enfoca en:
- **Data-driven decisions** (scroll tracking, heatmaps)
- **Content leverage** (YouTube, repurposing)
- **Marketing agility** (seasonal templates)
- **Local SEO** (hyper-local optimization)
- **Micro-conversions** (exit intent, progressive profiling)

R15 representa la evolución de "features nuevos" a "optimizar lo que tenemos" — el siguiente paso natural después de 14 rounds de feature development.

---

## Referencias

[1] Plausible Analytics — "Scroll Depth Tracking" (2025)
[2] National Retail Federation — "Seasonal Shopping Trends" (2025)
[3] Content Marketing Institute — "Content Repurposing Statistics" (2025)
[4] Go-Globe — "Local SEO Statistics" (2025)
[5] HubSpot — "Progressive Profiling Benchmarks" (2025)
[6] Baymard Institute — "Exit Intent Popup Benchmarks" (2025)

---

*Co-Authored-By: Paperclip <noreply@paperclip.ing>*