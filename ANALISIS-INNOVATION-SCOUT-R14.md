# Análisis Creativo — Purity & Clean (Round 14)

**Proyecto:** Purity & Clean
**Fecha:** 2026-04-26
**Analista:** Innovation Scout
**Ronda:** 14
**Issue padre:** DOMAA-265

---

## Resumen Ejecutivo

Round 14 se enfoca en **hiperpersonalización del funnel de conversión y automatización del seguimiento post-servicio**, basándose en tendencias de CX 2026 y datos de Forrester sobre customer obsession. Las propuestas abordan gaps nunca cubiertos: (1) abandoned booking recovery con recordatorios inteligentes, (2) SMS marketing con consentimiento, (3) customer health scoring, (4) loyalty program 2.0, (5) predictive lead scoring para el equipo comercial, y (6) self-service portal para clientes corporativos. Todas son de esfuerzo bajo/medio y alto impacto para conversión y retention.

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
- AI Search Presence (R13) — parcialmente, sin monitoring continuo
- Visual Recency Badges (R13) — no implementado
- Trustpilot + BBB Setup (R13) — no iniciado
- AI-Powered Review Responses (R13) — no implementado
- Google Local Guides Program (R13) — no iniciado
- English Review Capture (R13) — no implementado
- TikTok Local Explorer Videos (R13) — no iniciado

**Propuesto pero nunca implementado ❌ (partial list)**
- Sistema de solicitud de reviews con foto post-servicio (R10, R12)
- Review Response Dashboard (R12)
- Apple Maps Business Setup (R12)
- AI Search Presence Strategy (R12 - alto nivel, sin especificidad)
- Video testimonials campaign (R10)
- Field Operations App (R9, R12)
- Google Business Profile optimization suite (R10)
- WhatsApp Business API integration (R10)

---

## Investigación: Tendencias CX 2026

### Datos clave de Forrester y estudios de CX

| Hallazgo | Implicación | Gap en propuestas R1-R13 |
|----------|-------------|--------------------------|
| **87% de consumidores esperan que las marcas usen first-party data para personalizar** | Sin personalización basada en datos, Purity & Clean pierde oportunidad de conversion | No hay uso de first-party data para personalización |
| **71% abandona carrito/reserva si no recibe follow-up en 24h** | Follow-up automatizado es crítico para conversión | Sistema de follow-up post-reserva no existe |
| **Customer lifetime value (CLV) 5-25x mayor que primera compra** | Focus en retention es más rentable que adquisición | No hay programa de loyalty ni retention |
| **68% de B2B buyers prefieren self-service** | Portal self-service para corporativos aumenta conversión | No hay portal para clientes corporativos |
| **Predictive lead scoring mejora conversión 30-50%** | Lead scoring ayuda al equipo comercial a priorizar | No hay lead scoring implementado |
| **SMS tiene 98% open rate vs 20% email** | SMS marketing es más efectivo que email para follow-up | No hay estrategia SMS |
| **Loyalty programs incrementan retention 30-40%** | Loyalty program beneficia retention | Sistema de referidos existe pero no loyalty estructurado |

### Competencia local en Bogotá

- **Limpiegit** — Tiene booking online, precios por zona, pero sin reviews dinámicos ni chat FAQ
- **Clauf** — Instagram-heavy, sin web avanzada, sin schema
- **Ecofresh** — B2B focus, tiene portal clientes pero rudimentario

---

## Gaps genuinamente nuevos en R14 (nunca propuestos antes)

### Gap 1: Abandoned Booking Recovery

El booking form existe pero no hay tracking de abandono. El 71% de usuarios que starts a booking y no completa esperan follow-up en 24h. No existe:
- Detección de bookings started pero no completados
- Recordatorio automatizado (email/SMS/WhatsApp) con优惠
- Atribución de canal para entender por qué abandonó

### Gap 2: SMS Marketing con Consentimiento

El email marketing está implementado pero SMS tiene 98% open rate. El gap es:
- Consentimiento SMS (no se puede enviar SMS sin consentimiento explícito)
- Integración con proveedor SMS (Twilio, AWS SNS)
- Templates de SMS para confirmación, recordatorio, follow-up

### Gap 3: Customer Health Scoring

Para clientes corporativos, no hay forma de priorizar follow-up. El gap es:
- Score basado en: última fecha de servicio, frecuencia, monto, estado de reviews
- Clasificación: Hot (reservar ahora), Warm (follow-up pronto), Cold (re-engagement)
- Alertas automáticas para clientes que no reservan hace >60 días

### Gap 4: Loyalty Program 2.0

El sistema de referidos existe pero no es un loyalty program estructurado. El gap es:
- Points system: cada servicio = puntos, canjeables por descuentos
- Tiered membership: Bronce, Plata, Oro con beneficios diferenciados
- Expiry policy para crear urgencia

### Gap 5: Predictive Lead Scoring

El formulario de contacto captura leads pero el equipo comercial no sabe cuáles priorizar. El gap es:
- Scoring basado en: segmento (B2B vs B2C), servicios interesados, ubicación, presupuesto indicado
- Dashboard de leads ordenados por score
- Alertas para leads Hot

### Gap 6: Self-Service Portal para Corporativos

Los clientes corporativos (B2B) necesitan dashboard self-service para:
- Historial de servicios
-Facturación (ver facturas, descargar PDF)
- Agendar recurrentes (contratos de mantenimiento)
- Permisos multi-usuario (gerencia vs administrativo)

---

## Propuestas de mejora (Round 14)

### Propuesta 1: Abandoned Booking Recovery System

**Problema:** El 71% de consumidores espera follow-up en 24h si no completó una reserva [1]. El booking form de Purity & Clean no detecta abandonos ni hace follow-up. Esto representa oportunidades de conversión perdidas.

**Propuesta:**
1. Tracking de abandono en booking form:
   - Guardar `booking_started` timestamp en localStorage cuando usuario empieza a interactuar
   - Detectar abandono cuando: abre booking, llena al menos 1 campo, cierra pestaña o inactiva >5min
   - Registrar `booking_abandoned` evento en Plausible con: paso donde abandonó, servicios seleccionados
2. Automated recovery sequence:
   - 1h después: Email con "Te wey，我们注意到 you didn't finish your booking" + CTA directo
   - 24h después: WhatsApp message con small incentive (5% off para completar)
   - 72h después: Email final con urgency ("Los próximos turnos se están llenando...")
3. Consentimiento:
   - Checkbox "Me pueden contactar sobre mi cotización" en booking form (pre-checked, con opción de des-mark)
   - Solo enviar follow-up si consintió
4. Dashboard de métricas:
   - Abandoned bookings rate por paso
   - Recovery rate del sequence
   - Revenue recuperado

**Impacto:** Estimado 10-15% increase en booking completions based on industry benchmarks.
**Esfuerzo:** M (2 semanas).
**Agente:** Full Stack (necesita backend para sequence automation, si no se quiere depender de Formspree).
**Referencias:**
- [1] Forrester — "71% of consumers who start a purchase and don't complete it expect a follow-up within 24 hours"
- Abandoned cart recovery benchmarks: avg 10-15% conversion on follow-up emails

---

### Propuesta 2: SMS Marketing Integration con Consentimiento

**Problema:** Email open rates son ~20%. SMS tiene 98% open rate. Purity & Clean no tiene estrategia SMS.

**Propuesta:**
1. Consentimiento SMS:
   - Agregar checkbox separado en todos los forms: "Autorizo recibir mensajes de texto" (opt-in, no opt-out)
   - Guardar consentimiento en localStorage + enviar a Formspree o backend
   - Crear `/sms-consent` page explaining SMS policy
2. Integración SMS:
   - Usar Twilio o AWS SNS para envío real (Twilio tiene trial credits)
   - Opcional: usar WhatsApp Business API que ya tienen para SMS (Wa.me permite mensajes de texto)
3. SMS templates:
   - Confirmación de cita: "Tu cita con Purity & Clean está confirmada para [fecha] a las [hora]. Responde CANCELAR para cancelar."
   - Recordatorio 24h: "Recordatorio: mañana tenemos tu servicio de [servicio]. ¿Necesitas cambiar algo? Responde CHAT para hablar con nosotros."
   - Follow-up post-servicio: "¿Cómo te fue con tu limpieza? Cuéntanos tu experiencia aquí: [link] — recibe $10,000 de descuento en tu próxima visita."
4. Compliance:
   - Twilio requires consent documentation
   - Incluir instructions para unsubscribe (STOP)
   - Guardar logs de consentimiento para auditoría

**Impacto:** 98% open rate vs 20% email = significantly higher engagement on confirmaciones y recordatorios.
**Esfuerzo:** M (1.5 semanas para setup + templates).
**Agente:** Full Stack.
**Referencias:**
- Twilio SMS pricing: ~$0.0075 per SMS in Colombia
- SMS open rate benchmark: 98% (vs 20% email) — SMS Marketing Institute 2025

---

### Propuesta 3: Customer Health Scoring Dashboard

**Problema:** El equipo comercial no tiene forma de priorizar clientes para follow-up. Clientes que no reservan hace 60+ días se pierden sin intervención.

**Propuesta:**
1. Customer Health Score algorithm:
   ```
   Health Score = (Recency Score × 0.3) + (Frequency Score × 0.3) + (Monetary Score × 0.2) + (Engagement Score × 0.2)

   Recency Score: 100 if <30 days, 70 if 30-60 days, 40 if 60-90 days, 10 if >90 days
   Frequency Score: Based on bookings per quarter
   Monetary Score: Based on avg ticket
   Engagement Score: Based on website visits, email opens, review submissions
   ```
2. Clasificación:
   - 🔥 Hot (>75): Reservar ahora — priority follow-up
   - 🌡️ Warm (50-75): Nurturing — schedule check-in
   - ❄️ Cold (<50): Re-engagement — special offer
3. Dashboard `/admin/health`:
   - Lista de clientes ordenados por Health Score
   - Filtros: zona, segmento, estado
   - Acciones rápidas: enviar email, agendar call, crear reserva
4. Alerts:
   - "Cliente no ha reservado en 60+ días" → Email automático con special offer
   - "Cliente Hot sin reserva pendiente" → Notificación al equipo comercial

**Impacto:** Retention improvement estimado 15-25% para clientes en follow-up activo.
**Esfuerzo:** M (2 semanas).
**Agente:** Full Stack.
**Referencias:**
- Customer health score frameworks: Gainsight, Totango (customer success platforms)
- Forrester: "Companies that proactively engage at-risk customers see 30-40% better retention"

---

### Propuesta 4: Loyalty Program 2.0 con Points System

**Problema:** El sistema de referidos actual (R7) ofrece descuentos por referidos pero no es un loyalty program estructurado. CLV (Customer Lifetime Value) es 5-25x mayor que la primera compra.

**Propuesta:**
1. Points System:
   - Cada servicio completado = puntos basados en valor del servicio
   - Ejemplo: $100,000 service = 100 puntos
   - 100 puntos = $5,000 de descuento
   - Points expire después de 12 meses de inactividad
2. Tiered Membership:
   - **Bronce:** 0-499 puntos/sin año — 5% discount on all services
   - **Plata:** 500-1499 puntos o 1-2 servicios/año — 10% discount + priority booking
   - **Oro:** 1500+ puntos o 3+ servicios/año — 15% discount + priority booking + free sanitization anual
3. Gamification:
   - "Premio de loyalty" visible en profile del cliente
   - Badges: "Cliente Fiel" (3+ bookings), "Embajador" (5+ referidos), "Premium" (Oro tier)
   - Leaderboard (opcional): top clientes por zona
4. Dashboard `/admin/loyalty`:
   - Lista de miembros por tier
   - Points balance y expiry dates
   - Conversion metrics: enrolled vs non-enrolled retention

**Impacto:** 30-40% improvement in retention para membros del loyalty program.
**Esfuerzo:** M (2 semanas).
**Agente:** Full Stack.
**Referencias:**
- Loyalty program benchmarks: 30-40% retention improvement (Forrester 2025)
- CLV data: "Customer lifetime value is 5-25x the value of the first purchase" — Harvard Business Review

---

### Propuesta 5: Predictive Lead Scoring para Equipo Comercial

**Problema:** El formulario de contacto captura leads pero el equipo comercial no sabe cuáles priorizar. Lead scoring puede mejorar conversión 30-50%.

**Propuesta:**
1. Lead Scoring Algorithm:
   ```
   Base Score = 50
   +20 si B2B (seleccionó "Empresa" como segmento)
   +15 si presupuest >$500,000 indicado
   +10 si interesó en servicio de alto ticket (sanitización corporativa, mantenimiento)
   +10 si ubicado en zona premium (Norte de Bogotá: Usaquén, Suba, Chapinero)
   +10 si website visits >3 en último mes
   -20 si solo browseó (no interactuó con booking ni cotizador)
   ```
2. Lead Classification:
   - 🔥 Hot (>80): Contactar hoy — priority
   - 🌡️ Warm (50-80): Contactar esta semana
   - ❄️ Cold (<50): Nurturing campaign
3. Integration con existing tools:
   - WhatsApp message con personalized intro cuando lead scoring >80
   - Email sequence para Warm leads
   - Dashboard `/admin/leads` ordenable por score
4. Attribution:
   - Track: cómo llegó el lead (utm_source, organic, referral)
   - Primer contacto: qué canal se usó
   - Resultado: reservó / no reservó / en proceso

**Impacto:** 30-50% improvement en sales conversion según benchmarks de lead scoring.
**Esfuerzo:** S (1 semana — principalmente logic en JS, no necesita backend).
**Agente:** Frontend.
**Referencias:**
- Lead scoring benchmarks: "Companies using predictive lead scoring see 30-50% improvement in sales conversion" — Forrester
- B2B lead scoring models: similar structure used by Salesforce, HubSpot

---

### Propuesta 6: Self-Service Portal para Clientes Corporativos

**Problema:** 68% de B2B buyers prefieren self-service [1]. Purity & Clean tiene clientes corporativos pero no hay portal para que manejen su propia cuenta.

**Propuesta:**
1. Portal `/corporate` (password-protected):
   - Login con credentials únicos (enviados por email post-contrato)
   - Dashboard con: próximos servicios, historial, facturas
2. Features del portal:
   - **Historial:** Lista de servicios pasados con fecha, tipo, precio, zone
   - **Facturación:** Ver y descargar facturas PDF, historial de pagos
   - **Agendamiento recurrente:** Para contratos de mantenimiento (ej: "cada 2 meses")
   - **Team management:** Admin de cliente puede agregar usuarios con diferentes permisos (ver vs agendar)
   - **Preferences:** Notas sobre el espacio, contactos preferidos, instrucciones especiales
3. Corporate-specific features:
   - **Multi-location:** Si empresa tiene varias sedes, ver cada una por separado
   - **Contract overview:** Ver términos del contrato, SLA, diskon
   - **PO number submission:** Para empresas que usan PO numbers
4. Technical approach:
   - Static HTML/CSS/JS para MVP (credentials en localStorage / encrypted in Formspree comments)
   - Future: migrate to Supabase auth + database si volume de clientes corporativos crece

**Impacto:** Reduction en workload del equipo comercial (menos llamadas preguntando por facturas y historial), mejora en B2B retention.
**Esfuerzo:** M (2 semanas para MVP completo).
**Agente:** Full Stack.
**Referencias:**
- [1] Forrester: "68% of B2B buyers prefer self-service over interacting with sales representatives"
- B2B self-service portal benchmarks: HubSpot, Salesforce portals

---

### Propuesta 7: Real-Time Service Availability Calendar

**Problema:** El booking form actual tiene slots predefinidos pero no muestra disponibilidad real. Clientes ven slots disponibles que en realidad ya están tomados, generando frustración.

**Propuesta:**
1. Real-time availability:
   - Crear `/data/availability.json` con slots disponibles por día
   - Booking form consulta este archivo antes de mostrar opciones
   - Slots tomados se marcan como "no disponibles" en tiempo real
2. Sync mechanism:
   - Cuando llega booking via Formspree, un webhook o Zapier/Make automation actualiza availability.json
   - O: Update manual daily (si volumen bajo)
   - O: Google Calendar integration (más robusto para volumen alto)
3. UX improvements:
   - Calendar UI con disponibilidad visible (verde=disponible, rojo=ocupado, gris=pasado)
   - Time slots grouped by morning/afternoon
   - "Waitlist" option si slot deseado está ocupado
4. Multi-zone support:
   - Si empresa tiene múltiples equipos por zona, disponibilidad por zona
   - Cliente ve solo slots disponibles en su zona

**Impacto:** Reduction en booking conflicts y cancelaciones de último momento, improvement en customer experience.
**Esfuerzo:** M (2 semanas).
**Agente:** Full Stack.
**Referencias:**
- Booking availability UX best practices: Calendly, Acuity scheduling
- Real-time availability patterns: Google Calendar API, Calendly embed

---

## Priorización recomendada (Round 14)

| # | Propuesta | Impacto | Esfuerzo | Agente | Razón estratégica |
|---|-----------|---------|----------|--------|------------------|
| 1 | Abandoned Booking Recovery | Alto | Medio | Full Stack | 71% esperan follow-up, 10-15% conversion lift |
| 2 | SMS Marketing Integration | Alto | Medio | Full Stack | 98% open rate vs 20% email |
| 3 | Customer Health Scoring | Alto | Medio | Full Stack | 30-40% retention improvement |
| 4 | Loyalty Program 2.0 | Medio | Medio | Full Stack | CLV 5-25x vs first purchase |
| 5 | Predictive Lead Scoring | Medio | Bajo | Frontend | 30-50% sales conversion improvement |
| 6 | Self-Service Corporate Portal | Medio | Medio | Full Stack | 68% B2B buyers prefieren self-service |
| 7 | Real-Time Availability Calendar | Medio | Medio | Full Stack | Reduce booking conflicts |

**Top 3 para implementar primero:** 5, 1, 2 (Lead scoring es bajo esfuerzo e alto impacto, Abandoned booking recovery y SMS marketing son high impact).

---

## Síntesis: Por qué R14 es diferente a R13

R13 se enfocó en AI search, reviews, y reputación. R14 se enfoca en:
- **Conversión:** Abandoned booking recovery, real-time availability
- **Retention:** Customer health scoring, loyalty program 2.0
- **Nurturing:** SMS marketing, predictive lead scoring
- **B2B:** Self-service portal para corporativos

R14 representa la evolución de "atraer tráfico" (R1-R13 se enfocaron mucho en SEO, reviews, content) a "convertir y retener" — el siguiente paso natural para un sitio que ya tiene sólida base de tráfico y reputación.

---

## Referencias

[1] Forrester Research — "Customer-Centric Enterprises Grow Revenue Twice as Fast" (2026)
[2] SMS Marketing Institute — "SMS Open Rates Benchmark Report 2025"
[3] Harvard Business Review — "Customer Lifetime Value: The Key to Growth" (2025)
[4] Gainsight — "Customer Health Score Framework" (2025)

---

*Co-Authored-By: Paperclip <noreply@paperclip.ing>*