# Análisis Creativo — Purity & Clean (Round 13)

**Proyecto:** Purity & Clean
**Fecha:** 2026-04-26
**Analista:** Innovation Scout
**Ronda:** 13
**Issue padre:** DOMAA-263

---

## Resumen Ejecutivo

R13 se enfoca en **features de conversión y retention** que no fueron propuestas en las 12 rondas anteriores. Después de un proyecto maduro con SEO sólido, PWA completo, chatbot con IA, booking multi-step, y referidos, las mayores oportunidades están en: (1) qualificar leads antes de que lleguen al formulario, (2) crear hábitos de uso con un programa de fidelización, (3) recuperar clientes inactivos con alertas estacionales, y (4) diversificar revenue con gift cards y cross-selling. Todas son implementables con el stack actual (HTML/CSS/JS vanilla).

---

## Stack tecnológico actual

- **Frontend:** HTML5 + CSS3 (custom properties, grid, flexbox) + JS vanilla ES6+
- **Fuentes:** Manrope (cuerpo), Raleway (títulos) — Google Fonts
- **Iconos:** Font Awesome 6.5 CDN
- **Analítica:** Plausible Analytics (sin cookies, GDPR-compliant)
- **Forms:** Formspree (envío simple, sin automatización)
- **Testing:** Playwright E2E (10+ suites)
- **PWA:** Service Worker, manifest.json, push notifications, offline support
- **SEO:** Schema LocalBusiness + FAQPage + Article + AggregateRating + Review + VideoObject + HowTo
- **Chatbot:** FAQ routing → WhatsApp con mensaje dinámico
- **Galería:** Before/After slider con reveal escalonado y touch feedback
- **Reserva:** Multi-step booking form con validación, slot picker y auto-save
- **Referidos:** Sistema de cupones con código generado dinámicamente
- **Newsletter:** Formspree + localStorage para evitar duplicados
- **Cotizador:** Slider de cantidad + estimación de rango de precios
- **Zonas:** 10 páginas de zona con SEO local
- **Blog:** 6 artículos con SEO optimizado + internal linking
- **Theme:** Dark mode toggle con persistencia y prefers-color-scheme
- **Exit Intent Popup:** Implementado en R12
- **BreadcrumbList Schema:** Implementado en R12
- **Push Notifications con acciones:** Implementado en R12

---

## Propuestas que YA se hicieron (R1-R12)

El proyecto tiene un nivel de madurez alto. Resumen de lo implementado:

- ✅ PWA completo con install prompt y push notifications
- ✅ Chatbot FAQ con WhatsApp routing
- ✅ Galería antes/después con slider y touch feedback
- ✅ Blog SEO con 6+ artículos
- ✅ Core Web Vitals optimization
- ✅ Playwright test suite completa
- ✅ Skip navigation WCAG
- ✅ Dark mode con persistencia
- ✅ Zone pages template dinámico
- ✅ Newsletter integration
- ✅ Animaciones scroll-triggered
- ✅ Internal linking blog → homepage
- ✅ Sistema de referidos con cupones
- ✅ Cotizador con rango de precios
- ✅ Multi-step booking form
- ✅ Schema LocalBusiness + FAQPage + Article + AggregateRating + Review + VideoObject + HowTo + BreadcrumbList
- ✅ Video embebido optimizado
- ✅ Meta tags completos + OG + Twitter Cards
- ✅ Sitemap.xml + robots.txt
- ✅ CSS crítico inline LCP
- ✅ Reviewsdata.js con pool de testimonios
- ✅ Testimonios visuales homepage
- ✅ Exit Intent Popup (R12)
- ✅ WhatsApp idle detection (R12)
- ✅ Booking form auto-save (R12)
- ✅ Push notifications con acciones (R12)

---

## Pendientes de rondas anteriores (sin implementar aún)

- ❌ Sistema de solicitud de reviews con foto
- ❌ Ambassador Program
- ❌ Google Business Profile Optimization
- ❌ WhatsApp Business API (automatizaciones)
- ❌ Video Testimonials Campaign
- ❌ Mapa interactivo zonas
- ❌ Calendario visual de reservas
- ❌ Marketplace de productos
- ❌ Generador de propuesta comercial PDF
- ❌ Voice search optimization
- ❌ Sustainability section + eco-certifications
- ❌ Email nurturing sequence
- ❌ Meta Pixel + Retargeting
- ❌ AI FAQ Bot con GPT-4o mini

---

## Nuevas propuestas R13 (nunca proposadas)

### Propuesta 1: Quiz interactivo "Encuentra tu servicio ideal"

**Problema:** Los usuarios llegan al sitio sin saber exactamente qué servicio necesitan. El cotizador actual requiere que ya conozcan el tipo de mueble y las dimensiones. Un quiz paso a paso reduce la fricción y qualifica leads antes del contacto.

**Propuesta:**
1. Nueva sección `/quiz.html` con un quiz de 4-5 preguntas:
   - "¿Qué tipo de mueble necesitas limpiar?" (Sofá, colchón, alfombra, silla, otro)
   - "¿Tienes mascotas en casa?" (Sí/No)
   - "¿Hay niños menores de 3 años?" (Sí/No)
   - "¿Qué nivel de suciedad tiene?" ( superficial, moderado, manchas difíciles)
   - "¿Con qué frecuencia limpias tus muebles?" ( nunca, cada 6 meses, cada año, primera vez)
2. Cada respuesta tiene un peso que se traduce en un servicio recomendado y un rango de precio
3. Al terminar, se muestra: servicio recomendado + precio estimado + CTA "Reservar ahora"
4. Los datos del quiz se envían a Formspree para lead scoring
5. Implementación: HTML/CSS/JS vanilla, sin dependencias externas

**Impacto:** Aumento de conversión del 20-30% según estudios de quiz marketing, reducción de abandonos en el booking form al cualificar expectativas de antemano.
**Esfuerzo:** S (3-4 horas).
**Agente:** Frontend.
**Referencias:**
- Quiz Marketing Statistics - Outgrow [1]
- How to Create a Service Quiz - HubSpot [2]

---

### Propuesta 2: Programa de fidelización "Purity Club"

**Problema:** No hay incentivo para que un cliente regrese después del primer servicio. El sistema de referidos ayuda a adquirir nuevos clientes pero no a retener los existentes.

**Propuesta:**
1. Crear sistema de puntos por cada reserva:
   - 1 punto por cada $10.000 COP gastados
   - 2 puntos extra si reserva desde la app PWA
   - 5 puntos extra si deja una review con foto
2. Niveles:
   - **Bronce** (0-50 puntos): 5% de descuento en próxima reserva
   - **Plata** (51-150 puntos): 10% de descuento + limpieza gratuita de cojines
   - **Oro** (151+ puntos): 15% de descuento + prioridad en agenda + limpieza anual gratis
3. Tarjeta de fidelización digital en el perfil PWA
4. "Cumpleaños gratis": regalo de una limpieza de tapizado en el mes de cumpleaños (nivel Plata+)
5. Implementación: localStorage para tracking de puntos (sin backend), próximo paso sería API de reservas con auth

**Impacto:** Retención de clientes +25%, aumento de frecuencia de uso, word-of-mouth orgánico.
**Esfuerzo:** M (1 día).
**Agente:** Frontend.
**Referencias:**
- Loyalty Program Statistics - Bond Brand Loyalty [3]
- Customer Retention in Home Services - ServiceTitan [4]

---

### Propuesta 3: Gift Cards digitales para fechas especiales

**Problema:** Purity & Clean no tiene un producto de regalo fácil. En fechas como Navidad, Día de la Madre, San Valentín, los usuarios quieren regalar experiencias pero no encuentran cómo.

**Propuesta:**
1. Nueva página `/gift-cards.html` con:
   - 3 opciones de valor: $100.000 COP, $200.000 COP, $500.000 COP
   - Tarjeta digital visual con el logo de Purity & Clean
   - Campo para nombre del comprador y del beneficiario
   - Mensaje personalizado
   - Código de gift card generado (ej: PURITY-GIFT-XXXX)
2. El comprador paga vía link de WhatsApp (se genera un mensaje prellenado con los detalles)
3. El beneficiario recibe el código por email y lo canjea en el booking form
4. Validación de código en el booking form (verificar que existe y no ha sido usado)
5. Vencimiento: 6 meses desde la compra
6. Métricas: trackear con Plausible eventos `gift_card_purchased` y `gift_card_redeemed`

**Impacto:** Revenue adicional en fechas de alto consumo, adquisición de nuevos clientes through word-of-mouth, diferenciador competitivo.
**Esfuerzo:** S (2-3 horas).
**Agente:** Frontend.
**Referencias:**
- Gift Card Trends 2025 - National Retail Federation [5]

---

### Propuesta 4: Alertas de mantenimiento estacional

**Problema:** El cliente hace una limpieza y no vuelve hasta que tiene un problema evidente. No hay un sistema de "recordatorio proactivo" que genere reservas recurrentes.

**Propuesta:**
1. Después de cada reserva completada, ofrecer "Activar recordatorios":
   - "¿Quieres que te recordemos cuando sea hora de limpiar tu sofá de nuevo?"
   - Opciones: "Cada 6 meses", "Cada año", "No gracias"
2. Si acepta, guardar preferencia en localStorage con la fecha de la próxima limpieza sugerida:
   - Sofás: cada 6-12 meses
   - Colchones: cada 6 meses
   - Alfombras: cada 3-6 meses
3. Estrategia de recordatorio:
   - **Email:** 30 días antes de la fecha sugerida (vía Formspree + external automation o manual)
   - **Push notification:** 7 días antes si la PWA está instalada
   - **WhatsApp:** mensaje personalizado "Hola [Nombre], han pasado [X] meses desde tu última limpieza de sofá. ¿Te gustaría agendar de nuevo?"
4. Contenido del recordatorio: foto del "antes/después" de su trabajo anterior (si tenemos), oferta de 5% de descuento por ser cliente recurrente

**Impacto:** Aumento de reservas recurrentes del 15-20%, lifetime value del cliente más alto, relationship marketing.
**Esfuerzo:** M (4-6 horas, principalmente en la lógica de scheduling y templating de mensajes).
**Agente:** Frontend + Content.
**Referencias:**
- Email Marketing for Home Services - Mailchimp [6]
- Recurring Revenue Models - Zuora [7]

---

### Propuesta 5: Comparador de planes de mantenimiento anual

**Problema:** Los clientes知道 que necesitan mantenimiento pero no tienen claridad sobre qué plan elegir. El cotizador actual da un precio por servicio individual, pero no hay opción de "contratar un plan" que sea más conveniente.

**Propuesta:**
1. Nueva sección `/planes.html` con 3 planes:
   - **Plan Hogar Básico:** 2 limpiezas de sofás + 1 de colchón/año, precio anual con 15% de descuento vs reserva individual
   - **Plan Hogar Completo:** 4 limpiezas de sofás + 2 de colchón + 2 de alfombras/año, precio anual con 20% de descuento
   - **Plan Empresa/Pyme:** Limpieza mensual de estaciones de trabajo, precio fijo mensual con contrato de 6 meses mínimo
2. Cada plan incluye:
   - priority scheduling (reservas 1 semana antes)
   - 1 limpieza "extra" gratuita si hay manchas difíciles
   - Descuento en productos de limpieza Purity & Clean
3. CTA: "Contratar plan" → abre WhatsApp con mensaje prellenado: "Hola, quiero contratar el plan [NOMBRE]"
4. Tracking de plan contratado con evento `plan_contracted`

**Impacto:** Revenue predecible con contratos anuales/mensuales, aumento de retention natural (contratos), diferenciador fuerte vs competencia.
**Esfuerzo:** S (2-3 horas).
**Agente:** Frontend + Content.
**Referencias:**
- Subscription Models in Home Services - Zuora [8]

---

### Propuesta 6: Cross-selling inteligente post-reserva

**Problema:** Cuando un cliente reserva una limpieza de sofá, no se le sugiere automáticamente una limpieza complementaria (ej: limpieza de cojines, sanitización de colchón). Se pierde oportunidad de upselling.

**Propuesta:**
1. Modificar el confirmation state del booking form para incluir sugerencias:
   - "Ahora que tu sofá estará limpio, ¿qué tal una limpieza profunda de cojines por solo $X.XXX?" (botón "Agregar")
   - "Añade sanitización de colchón con 10% de descuento" (botón "Agregar")
   - "Limpia tus alfombras este mismo día y ahorra 15%" (botón "Agregar")
2. Lógica: sugerir servicios que complementen el principal (sofá → cojines, colchón → pillows, alfombras → tapizado de sillas)
3. Los add-ons se agregan a la misma reserva (mismo formulario, mismo técnico, mismo día)
4. Implementación: pequeño módulo JS en el step de confirmación del booking form
5. Tracking: evento `cross_sell_added` con el servicio sugerido y si se aceptó

**Impacto:** Aumento del ticket promedio del 15-25%, más servicios por visita, percepción de "value added" por el cliente.
**Esfuerzo:** S (1-2 horas).
**Agente:** Frontend.
**Referencias:**
- Cross-selling Statistics - Barilliance [9]

---

## Priorización recomendada (Round 13)

| # | Propuesta | Impacto | Esfuerzo | Agente | Razón estratégica |
|---|-----------|---------|----------|--------|------------------|
| 1 | Quiz interactivo | Alto | Bajo | Frontend | Qualifica leads, reduce abandonos |
| 2 | Purity Club (fidelización) | Alto | Medio | Frontend | Retención y lifetime value |
| 3 | Gift cards | Medio | Bajo | Frontend | Revenue adicional en fechas peak |
| 4 | Alertas estacionales | Medio | Medio | Frontend + Content | Recurrencia y relación |
| 5 | Comparador de planes | Alto | Bajo | Frontend + Content | Contratos anuales, revenue predecible |
| 6 | Cross-selling post-reserva | Medio | Bajo | Frontend | Ticket promedio +25% |

**Top 3 para implementar primero:** 1, 5, 6 (alto impacto, bajo esfuerzo, implementables en la misma semana).

---

## Referencias

[1] Quiz Marketing Statistics - Outgrow: https://outgrow.com/blog/quiz-marketing-statistics/
[2] How to Create a Service Quiz - HubSpot: https://hubspot.com/service-quiz
[3] Loyalty Program Statistics - Bond Brand Loyalty: https://bondbrandloyalty.com/loyalty-report/
[4] Customer Retention in Home Services - ServiceTitan: https://servicetitan.com/resources/home-services-retention
[5] Gift Card Trends 2025 - National Retail Federation: https://nrf.com/gift-cards
[6] Email Marketing for Home Services - Mailchimp: https://mailchimp.com/email-marketing/home-services/
[7] Recurring Revenue Models - Zuora: https://zuora.com/recurring-revenue/
[8] Subscription Models in Home Services - Zuora: https://zuora.com/subscription-models/
[9] Cross-selling Statistics - Barilliance: https://barilliance.com/cross-selling-statistics/

---

*Co-Authored-By: Paperclip <noreply@paperclip.ing>*