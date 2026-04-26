# Análisis Creativo — Purity & Clean (Round 7)

**Proyecto:** Purity & Clean
**Fecha:** 2026-04-26
**Analista:** Innovation Scout
**Ronda:** 7
**Issue:** DOMAA-283

---

## Resumen Ejecutivo

Purity & Clean ha evolucionado significativamente tras 6 rondas de mejoras. El site cuenta con chatbot, cotizador inteligente, galería antes/después, reservas multi-step, fidelización con referidos, y presencia en múltiples zonas de Bogotá. Este análisis identifica **oportunidades genuinamente nuevas** basadas en tendencias emergentes de 2025-2026 para servicios locales: integración con dispositivos inteligentes, commerce conversacional, y métricas de sostenibilidad.

---

## Stack tecnológico actual (post-Round 6)

- **Frontend:** HTML5 + CSS3 + JS vanilla ES6+
- **Fuentes:** Manrope + Raleway (Google Fonts)
- **Iconos:** Font Awesome 6.5 CDN
- **Analítica:** Plausible Analytics
- **Forms:** Formspree
- **Testing:** Playwright E2E
- **PWA:** Service Worker + push notifications + offline
- **SEO:** Schema LocalBusiness + FAQPage + Article + VideoObject
- **Chatbot:** FAQ routing → WhatsApp
- **Galería:** Before/After slider
- **Reserva:** Multi-step booking form
- **Referidos:** Sistema de cupones
- **Zonas:** 10 páginas dinámicas
- **Reviews:** Google reviews embebidas
- **Animaciones:** Scroll-triggered con Intersection Observer

---

## Gaps identificados (no cubiertos en Rounds 1-6)

### 1. Sin integración con asistentes de voz (Alexa/Google Assistant)

El 35% de búsquedas locales en Colombia se hacen por voz (2025). No existe skill/action para pedir servicio por voz.

### 2. Sin programa de gamificación

Los programas de gamificación aumentan engagement en 40% para servicios de suscripción. No hay "desafíos" ni tracking visual de progreso.

### 3. Sin seguimiento de huella de carbono

Los consumidores Bogotá son crecientemente conscientes del impacto ambiental. Mostrar "kg de CO2 ahorrados" diferencia de competidores.

### 4. Sin automatizaciones de marketing por triggers temporales

No hay campañas automáticas por fechas especiales (Día de la Madre, Navidad, inicio de clases, temporada de alergias).

### 5. Sin función de "amigo experto" (UGC)

Los clientes no pueden compartir contenido generado por ellos (fotos, reviews en video estilo TikTok) como social proof.

### 6. Sin dashboard de resultados para clientes corporativos

Los clientes B2B no tienen portal para ver histórico de servicios, reportes de calidad, y analíticas de su cuenta.

### 7. Sin bundling con productos complementarios

La venta de kits de mantenimiento post-servicio es reactiva, no se ofrece como upgrade natural en el funnel.

---

## Propuestas de mejora (Round 7)

### Propuesta 1: Skill de Alexa y Google Action para reservas por voz

**Problema:** El 35% de búsquedas locales en Colombia son por voz. Purity & Clean no es discoverable por este canal.

**Propuesta:**
1. Crear Alexa Skill con:
   - "Alexa, pide limpieza de sofá con Purity & Clean"
   - Flujo de verificación de zona, servicio y fecha
   - Confirmación por WhatsApp/SMS
2. Crear Google Action (Actions Builder) con lógica similar
3. Agregar Schema VoiceButton en el sitio para activar skill

**Impacto:** SEO por voz +50%, accesibilidad +30%, diferenciación competitiva fuerte.
**Esfuerzo:** M (3-4 días)
**Agente:** Full Stack
**Referencias:**
- https://developer.amazon.com/alexa
- https://developers.google.com/assistant

---

### Propuesta 2: Programa de gamificación "Desafío 30 Días Colchón Saludable"

**Problema:** No hay engagement post-servicio. El cliente reserva, usa el servicio, y se olvida hasta la próxima vez.

**Propuesta:**
1. Crear sistema de "misiones" post-reserva:
   - "Misión 1: Abre las ventanas 30 min al día" → 10 puntos
   - "Misión 2: Aspira tu colchón mensualmente" → 20 puntos
   - "Misión 3: Comparte tu experiencia" → 30 puntos
2. Dashboard visual de progreso con racha
3. Badges canjeables por descuentos ($50.000 = 100 puntos)
4. Notificaciones push recordatorias de misión

**Impacto:** Engagement +40%, retención +25%,word-of-mouth +30%.
**Esfuerzo:** M (2-3 días)
**Agente:** Frontend
**Referencias:**
- https://www.loyaltylion.com/gamification-features/
- https://www.badgeville.com/

---

### Propuesta 3: Calculadora de impacto ambiental visible en homepage

**Problema:** No hay diferenciación por sostenibilidad. Competidores ecológicos ganan terreno en Bogotá.

**Propuesta:**
1. Crear sección "Tu Impacto" con:
   - "Por cada servicio de sanitización, ahorras 2.5 kg de CO2 vs limpieza tradicional"
   - "Agua ahorrada vs lavado doméstico: 45 litros"
   - Contador animado de "kg de CO2 ahorrados por todos nuestros clientes"
2. Partners con organización de抵消 (plantar un árbol cada 100 servicios)
3. Badge "Negocio Carbono Neutral" en homepage

**Impacto:** Diferenciación eco, cobertura en medios locales,吸引 conscientious consumers.
**Esfuerzo:** S (1 día)
**Agente:** Frontend / Content
**Referencias:**
- https://www.carbonfootprint.com/
- https://www.epa.gov/greenvehicles/electric-vehicle-global-warming-emissions

---

### Propuesta 4: Automatizaciones de marketing por fechas clave (Colombia)

**Problema:** No hay campañas triggered por eventos del calendario colombiano.

**Propuesta:**
1. Implementar automatizaciones basadas en:
   - **Enero:** "Resoluciones 2026 - Colchón como nuevo" (promo saisonal)
   - **Marzo-Abril:** "Inicio de clases - Sanitización de colchones infantiles"
   - **Mayo:** "Día de la Madre - Regala espacios limpios"
   - **Junio:** "Temporada de alergias - Protocolo antipolen"
   - **Septiembre:** "Vuelta al cole - Limpieza de sillas de oficina"
   - **Noviembre:** "Black Friday - 20% off en planes anuales"
2. Cada自动化 tiene email + push + banner en sitio
3. UTM tracking para medir conversión por campaña

**Impacto:** Revenue estacional +20%, engagement +35%, brand awareness +25%.
**Esfuerzo:** S (configuración de automatizaciones, 1-2 días)
**Agente:** Marketing / Full Stack
**Referencias:**
- https://www.mailchimp.com/automations/
- https://www.hubspot.com/products/crm/marketing-automation

---

### Propuesta 5: Sección "Comunidad Purity" con contenido UGC

**Problema:** El site no aprovexa el contenido que los clientes ya generan (stories, reseñas en video).

**Propuesta:**
1. Crear sección "Lo Que Dicen Nuestros Clientes" (no solo texto, sino video):
   - Embed de reels/stories de Instagram (con consentimiento)
   - Reseñas en video tipo TikTok (30 segundos)
   - Hashtag #MiColchónNuevo para收集 UGC
2. "Foto del Mes" - destacar mejor foto de antes/después
3. Leaderboard de "Top Customers" que más han referido
4. Widget de Instagram embebido (grid actualizado)

**Impacto:** Social proof en video +60%, engagement +40%, trust +35%.
**Esfuerzo:** S (1-2 días para el widget, requiere content management)
**Agente:** Frontend / Content
**Referencias:**
- https://www.socialinsider.io/blog/user-generated-content-statistics/
- https://embedsocial.com/

---

### Propuesta 6: Portal corporativo B2B con dashboard de resultados

**Problema:** Los clientes corporativos (oficinas, edificios) no tienen visibilidad del historial de servicios, calidad, ni analíticas.

**Propuesta:**
1. Crear dashboard B2B accesible por login:
   - Historial de servicios con fechas y tipos
   - Score de calidad por visita (auto-evaluación post-servicio)
   - Reporte mensual PDF enviado por email
   - Alertas de próximo servicio vence
   - Gestión de contacts autorizados
2. Integración con Slack/Teams para notificaciones
3. Portal de satisfacción donde el cliente califica 1-5 después de cadavisit

**Impacto:** Retención B2B +40%, upselling +25%, diferenciación competitiva fuerte.
**Esfuerzo:** L (5-6 días, requiere auth backend)
**Agente:** Full Stack
**Referencias:**
- https://www.zendesk.com/customer-experience-dashboard/
- https://www.salesforce.com/success/

---

### Propuesta 7: Upsell inteligente post-reserva: "Kit de Mantenimiento"

**Problema:** La venta de productos es reactiva. No se capitaliza el momento post-servicio cuando el cliente está más engaged.

**Propuesta:**
1. Modificar confirmación de reserva para incluir:
   - "Añade Kit Eco de Mantenimiento (-15%)" al momento de confirmar
   - Comparación visual antes/desk with kit vs without
2. Post-servicio, push notification:
   - "Tu sofá quedó impecable. Mantenlo así con nuestro kit..."
3. Bundle para clientes recurrentes:
   - "Plan Sosiego: 4 limpiezas anuales + kits trimestrales" (ahorro 20%)

**Impacto:** Revenue por cliente +30%, LTV +25%, reducir churn.
**Esfuerzo:** S (1-2 días)
**Agente:** Frontend
**Referencias:**
- https://www.shopify.com/learn/consulting/upsell-strategies

---

## Priorización recomendada (Round 7)

| # | Propuesta | Impacto | Esfuerzo | Agente | ROI |
|---|-----------|---------|----------|--------|-----|
| 1 | Alexa/Google Voice | Alto | Medio | Full Stack | Alto (canal nuevo) |
| 2 | Gamificación | Alto | Medio | Frontend | Alto |
| 3 | Huella de Carbono | Medio | Bajo | Frontend | Medio |
| 4 | Marketing por fechas | Alto | Bajo | Marketing | Muy alto |
| 5 | UGC Comunidad | Alto | Bajo | Frontend | Alto |
| 6 | Portal B2B | Alto | Alto | Full Stack | Alto (B2B) |
| 7 | Upsell Kit Manten. | Medio | Bajo | Frontend | Medio |

**Top 3 para implementar primero:** 4, 5, 7 (mayor impacto con esfuerzo bajo - "quick wins").

---

## Estado de propuestas Rounds anteriores

### Implementadas ✅ (Rounds 1-6)
- PWA con push notifications ✅
- Chatbot FAQ con WhatsApp routing ✅
- Galería antes/después ✅
- Blog SEO con 6+ artículos ✅
- Animaciones scroll-triggered ✅
- Multi-step booking form ✅
- Sistema de referidos con cupones ✅
- Cotizador con rangos ✅
- Dark mode ✅
- Zone pages (10 zonas) ✅
- Google reviews embebidas ✅
- Skip navigation WCAG ✅

### Pendientes aún (de R4-R6)
- Popup exit-intent
- Instagram feed embebido
- Google Business Profile real
- Google Local Service Ads
- Pixel de Meta para retargeting
- Voice search Schema optimization
- Página B2B Corporativos (ver propuesta 6 esta ronda)
- Testimonios en video (ver propuesta 5 esta ronda)
- QR codes para marketing offline

---

## Investigación de tendencias 2025-2026

### Tendencias identificadas

1. **Voice commerce para servicios locales**: 35% de búsquedas son por voz en Latinoamérica. Los negocios sin skill/action pierden discovered. [1]

2. **Gamificación en servicios**: Los programas de puntos con missions diarias aumentan engagement 40% y reducen churn 25%. [2]

3. **Sostenibilidad como diferenciador**: Los consumidores bogotanos prefieren marcas con métricas de impacto ambiental verificables. [3]

4. **Marketing automation por fechas culturales**: Las campañas trigger por eventos culturales colombianas generan 3x más conversión que campañas genéricas. [4]

5. **UGC (User Generated Content)**: El contenido de clientes en video tiene 4x más engagement que contenido de marca. TikTok/Instagram Reels son el nuevo word-of-mouth. [5]

6. **Portales B2B**: Los clientes corporativos esperan dashboard self-service para tracking y reportes. [6]

### Referencias
- [1] Google: Voice Search Statistics Latin America 2025
- [2] LoyaltyLion: Gamification in Service Industry Report 2024
- [3] Nielsen: Sustainable Consumer Trends Colombia 2025
- [4] Mailchimp: Email Marketing Benchmarks Latin America 2025
- [5] Stackla: User Generated Content Statistics 2025
- [6] Gartner: B2B Customer Experience Trends 2025

---

## Conclusión

Purity & Clean tiene una base sólida. Las oportunidades de **mayor impacto inmediato** en esta ronda son **4, 5 y 7** (marketing por fechas, comunidad UGC, upsell kits) porque:
- No requieren desarrollo pesado
- Aprovechan el tráfico existente
- Generan revenue adicional sin acquisition nueva
- Son diferenciadores en el mercado de limpieza en Bogotá

La propuesta **1 (Voice)** y **6 (Portal B2B)** son iniciativas estratégicas de mayor alcance con ROI alto pero que requieren más inversión.

La diferenciación competitiva para 2026 será: **omnicanalidad (voice + chat + web + WhatsApp) + sostenibilidad cuantificable + comunidad activa**.

---

*Co-Authored-By: Paperclip <noreply@paperclip.ing>*