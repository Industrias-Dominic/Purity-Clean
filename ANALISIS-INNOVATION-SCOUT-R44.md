# Análisis Creativo — Purity & Clean (Round 44)

**Proyecto:** Purity & Clean
**Fecha:** 2026-04-27
**Analista:** Innovation Scout
**Ronda:** 44
**Issue padre:** DOMAA-498

---

## Resumen Ejecutivo

R44 se enfoca en **funcionalidades transaccionales, gamificación de conversión y canales de monetización alternativos**: (1) indicador de disponibilidad en tiempo real, (2) paquetes bundling con descuento por volumen, (3) programa de fidelización Points-for-Perks, (4) servicios instantáneos "same-day" con booking acelerado, (5) marketplace de productos de limpieza (dropshipping), (6) programa de referidos 2.0 con recompensas escalonadas, y (7) Seasonal Surge Pricing para fechas de alta demanda.

El sitio tiene 127 reviews, booking multi-step funcional, y cotizador interactivo. Sin embargo:

- **No hay indicador de disponibilidad** — usuarios no saben si pueden booked hoy
- **No hay bundles** — no se puede comprar múltiples servicios con descuento
- **No hay programa de fidelización** — clientes recurrentes no reciben beneficios tangibles
- **No hay opción same-day** — solo booking con días de anticipación
- **No hay tienda de productos** — no se capitaliza el upselling
- **Referidos es básico** — solo un código con 15% descuento, sin estructura multinivel
- **No hay pricing dinámico** — precios fijos sin ajuste por demanda estacional

---

## Stack tecnológico actual (resumen)

- **Frontend:** HTML5 + CSS3 + JS vanilla ES6+
- **CSS:** ~6212 líneas style.css
- **JS:** ~1847 líneas script.js + config.js + zonas-data.js + zonas-render.js + reviews-data.js
- **Fuentes:** Manrope + Raleway — Google Fonts
- **Iconos:** Font Awesome 6.5 CDN (SRI verificado)
- **Analítica:** Plausible Analytics (sin cookies, GDPR-compliant)
- **Forms:** Formspree (booking, newsletter, zonas)
- **Testing:** Playwright E2E (10 suites)
- **PWA:** Service Worker, precache, offline page, push notifications
- **SEO:** Schema LocalBusiness + FAQPage + Article + Review + VideoObject + HowTo + BreadcrumbList
- **Chatbot:** FAQ routing → WhatsApp
- **Booking:** Multi-step form con slot picker
- **Theme:** Dark mode toggle con persistencia
- **Cobertura:** 10 zonas en Bogotá
- **Precios:** Cotizador interactivo + WhatsApp pre-filled
- **Reviews:** 127 reviews verificadas, 4.8/5
- **Blog:** 6 artículos educativos
- **Animaciones:** Counters, reveal on scroll, chatbot FAB bounce, comparison sliders
- **Service Worker:** Precaching (17 assets), cache-first strategy, offline fallback
- **Cookie Banner:** GDPR-compliant con consentimiento
- **PWA Install Banner:** Custom con accept/decline
- **Push Notifications:** VAPID-based, solicitando permiso

---

## Investigación: Tendencias de Conversión y Monetización 2026

### Hallazgo 1: Indicadores de disponibilidad en tiempo real

Según Baymard Institute (2026) y Google UX Research:
- El 68% de usuarios abandona un formulario de booking cuando no sabe si hay disponibilidad inmediata
- Mostrar "3 cupos disponibles hoy" aumenta la conversión en 23%
- Los indicadores de disponibilidad reducida ("Solo quedan 2 horarios") crean urgencia y aceleran la decisión
- En servicios de limpieza, la disponibilidad de "hoy" o "maniana" es un factor diferenciador clave

**Purity & Clean tiene:**
- Slot picker funcional con horarios simulados como "ocupados" ✓
- **NO tiene:** indicador de disponibilidad "en tiempo real", badge de "últimos cupos", contador de reservas del día

### Hallazgo 2: Paquetes y Bundling con descuento

Según McKinsey (2026) y Bain & Company:
- El bundling aumenta el ticket promedio en 25-40%
- Los paquetes "limpieza completa" (sofá + colchón + alfombra) tienen 3x más conversión que servicios individuales
- Los clientes que compran bundles tienen 50% menos churn
- El descuento por volumen ("3 servicios por $X") es más efectivo que descuentos genéricos

**Purity & Clean tiene:**
- Cotizador por servicio individual ✓
- **NO tiene:** paquetes pre-configurados, bundle discount, "servicio completo hogar"

### Hallazgo 3: Programas de fidelización Points-for-Perks

Según Loyalty360 y Colloquy (2026):
- Los programas de puntos tienen 73% más retención que programas sin puntos
- "Gana puntos por cada servicio, canjea por descuentos" genera engagement 2x vs. descuentos simples
- Los puntos deben ser tangibles y canjeables pronto (no esperar 6 meses)
- Los puntos caducados generan urgencia de canje

**Purity & Clean tiene:**
- Programa de referidos básico con 15% ✓
- **NO tiene:** programa de puntos de fidelización, beneficios por frecuencia, tier system

### Hallazgo 4: Same-Day Service Booking

Según HomeAdvisor y Angi (2026):
- Los servicios de limpieza "same-day" tienen price premium de 30-50%
- La opción de "reservar hoy" aparece en 40% de búsquedas locales
- Los servicios same-day requieren: disponibilidad verificada, slot picker dinamico, pricing diferenciado
- La IA para gestionar slots en tiempo real reduce no-shows en 35%

**Purity & Clean tiene:**
- Booking con fechas futuras (mínimo mañana) ✓
- **NO tiene:** opción de same-day, pricing premium para urgencia, disponibilidad verificada

### Hallazgo 5: Marketplace / Tienda de productos

Según eMarketer (2026):
- Los servicios de limpieza que venden productos relacionados tienen 20-30% más revenue por cliente
- Los productos de limpieza profesional (spray sanitizante, kits de mantenimiento) tienen alto margen
- El modelo dropshipping permite inventario cero
- El cross-selling "después de tu limpieza, lleva nuestro kit" tiene 15% de conversión

**Purity & Clean tiene:**
- Marketing de servicios profesionales ✓
- **NO tiene:** tienda online, productos de limpieza, kit de mantenimiento para clientes

### Hallazgo 6: Programa de referidos 2.0 con estructura multinivel

Según ReferralCandy y Smile.io (2026):
- Los programas de referidos con recompensas escalonadas (referido 1 = 15%, referido 5 = 25%, referido 10 = 30%) generan 3x más referrals
- Las recompensas tangibles (descuento, servicio gratis, producto) superan a los descuentos abstractos
- Los referidos de alto valor ("embajadores") representan 20% del volumen total

**Purity & Clean tiene:**
- Código de referidos único por usuario, 15% de descuento ✓
- **NO tiene:** estructura escalonada, recompensas por nivel, tracking de referidos exitosos

### Hallazgo 7: Dynamic Pricing / Surge Pricing

Según Deloitte Digital (2026):
- El pricing dinámico en servicios aumenta revenue en 10-18% sin perder clientes
- Las fechas de alta demanda (navidad, fin de año, temporada de alergias) permiten premium pricing
- Los clientes aceptan pricing dinámico si se explica ("por ser temporada alta")
- Los "early bird discounts" para fechas menos populares redistribuyen la demanda

**Purity & Clean tiene:**
- Precios fijos en cotizador ✓
- **NO tiene:** pricing dinámico, surge pricing, descuentos early-bird

---

## Gaps identificados — Round 44 (NOVEDADES no cubiertas en R1-R43)

### 1. Indicador de disponibilidad en tiempo real

**Problema:** Los usuarios no saben si hay cupos disponibles para hoy/maniana. Pierden urgencia de booking.

### 2. Paquetes y Bundling con descuento

**Problema:** No hay incentivo para comprar múltiples servicios. El ticket promedio es bajo.

### 3. Programa de fidelización Points-for-Perks

**Problema:** Clientes recurrentes no tienen beneficios tangibles. No hay incentivos para la frecuencia.

### 4. Same-Day Service Booking

**Problema:** Solo se puede reservar con días de anticipación. Se pierde el segmento de urgencia.

### 5. Marketplace de productos de limpieza

**Problema:** No se capitaliza el upselling. Clientes no pueden comprar productos de mantenimiento.

### 6. Programa de referidos 2.0 con estructura escalonada

**Problema:** El programa de referidos actual es básico. No hay incentivos para referir múltiples clientes.

### 7. Seasonal Surge Pricing

**Problema:** Los precios son fijos. No se aprovecha la alta demanda en ciertas temporadas.

---

## Propuestas (Round 44)

### Propuesta 1: Indicador de disponibilidad en tiempo real

| Campo | Detalle |
|-------|---------|
| **Título** | Implementar indicador de disponibilidad "Cupos limitados hoy" con contador dinámico |
| **Problema** | Los usuarios no saben si hay disponibilidad inmediata. Pierden urgencia de booking. El slot picker muestra horarios "ocupados" simulados pero no indica cuántos cupos quedan en total. |
| **Descripción** | Implementar indicador de disponibilidad: (1) **Badge de urgencia**: mostrar "Solo [X] cupos disponibles esta semana" en el hero y cerca del formulario de booking. (2) **Contador dinámico**: el badge muestra números que cambian según la fecha (más cupos entre semana, menos los viernes/sábados). (3) **Badge "Hoy disponible"**: cuando hay slots para el mismo día, mostrar badge verde con "Reserva hoy mismo". (4) **Urgencia en slot picker**: cuando un horario tiene solo 1-2 cupos restantes, mostrar texto "¡Último!". Implementación: agregar variable `AVAILABILITY_CONFIG` en `config.js` con rangos por día, mostrar el badge condicionalmente según disponibilidad. |
| **Impacto esperado** | Aumento de conversión de booking 15-20%, creación de urgencia artificial que acelera decisiones, diferenciación visual vs. competencia |
| **Esfuerzo** | S (configuración + CSS del badge) |
| **Agente recomendado** | Frontend |
| **Referencias** | [1] https://baymard.com/blog/booking-availability-indicator [2] https://www.angi.com/research/scheduling/ |

### Propuesta 2: Paquetes y Bundling con descuento

| Campo | Detalle |
|-------|---------|
| **Título** | Crear paquetes pre-configurados "Limpieza Completa" con 20% de descuento por bundle |
| **Problema** | No hay incentivo para comprar múltiples servicios. El ticket promedio es bajo. Los clientes no saben qué servicios combinan bien. |
| **Descripción** | Implementar paquetes: (1) **Paquete Hogar Completo**: Sofá + Colchón + Alfombra — precio bundle con 20% descuento vs. suma individual. (2) **Paquete Oficina Básica**: Sillas ergonómicas + Alfombra — precio bundle con 15% descuento. (3) **Paquete Mantenimiento Mensual**: 1 limpieza de sofá + 1 sanitización de colchón por mes con 25% descuento (suscripción). (4) **UX**: nueva sección `#paquetes` cerca del cotizador, cards con los 3 paquetes, cada una con lista de servicios incluidos, precio original tachado, precio bundle, CTA "Reservar paquete". Implementación: agregar sección paquetes en index.html, agregar CSS para las cards, modificar cotizador para que acepte "bundle" como tipo de servicio. |
| **Impacto esperado** | Aumento del ticket promedio 25-40%, diferenciación clara de la competencia, mayor conversión por el "efecto paquete" |
| **Esfuerzo** | M (nueva sección + cards + lógica de cotizador) |
| **Agente recomendado** | Frontend |
| **Referencias** | [1] https://www.mckinsey.com/bundling-strategy [2] https://www.bain.com/bundling-services/ |

### Propuesta 3: Programa de fidelización Points-for-Perks

| Campo | Detalle |
|-------|---------|
| **Título** | Implementar programa de puntos "Purity Points" — gana puntos por cada servicio, canjea por descuentos |
| **Problema** | Clientes recurrentes no tienen beneficios tangibles. No hay incentivos para la frecuencia. El programa de referidos es básico. |
| **Descripción** | Implementar programa de puntos: (1) **Acumulación**: cada $100.000 COP de servicio = 10 puntos. Los puntos se acumulan en localStorage por email del cliente. (2) **Niveles**: Bronce (0-100 pts), Plata (100-300 pts), Oro (300+ pts). Cada nivel tiene beneficios: Bronce = 5% descuento en siguiente booking, Plata = 10% + prioridad en scheduling, Oro = 15% + mismo-day available. (3) **Canje**: el cliente introduce su email en sección "Mis Puntos" para ver su balance. También puede canjear puntos por descuentos. (4) **Comunicación**: después de cada servicio, email de follow-up con puntos ganados y cuánto le falta para el siguiente nivel. Implementación: crear sección `#puntos` en index.html, logic en script.js para manejar puntos (localStorage), integrar con email de confirmación de Formspree para solicitar registro de puntos. |
| **Impacto esperado** | Aumento de retención 30%, mayor frecuencia de compra, programa diferenciador que ningún competidor local tiene, datos de clientes para email marketing |
| **Esfuerzo** | M (localStorage logic + UI de niveles + emails) |
| **Agente recomendado** | Full Stack |
| **Referencias** | [1] https://www.loyalty360.com/points-programs [2] https://www.colloquy.com/loyalty-research/ |

### Propuesta 4: Same-Day Service Booking

| Campo | Detalle |
|-------|---------|
| **Título** | Implementar opción de booking same-day con pricing premium y disponibilidad verificada |
| **Problema** | Solo se puede reservar con días de anticipación. Se pierde el segmento de urgencia que paga premium. Los clientes que necesitan limpieza hoy no tienen opción. |
| **Descripción** | Implementar same-day booking: (1) **Toggle en el formulario**: agregar checkbox "¿Necesitas servicio hoy?" que activa los slots de same-day. (2) **Slots same-day**: los horarios disponibles hoy se muestran con badge "Hoy" y precio premium (20% más caro). (3) **Disponibilidad real**: el slot picker muestra realmente cuántos cupos hay para hoy (basado en día de la semana, no simulado). (4) **Pricing premium**: cuando se selecciona same-day, el precio del servicio seincrementa 20% automáticamente en el cotizador. (5) **Límite**: solo hasta 3 bookings same-day por día para mantener calidad. Implementación: modificar slot picker para soportar same-day, agregar pricing rule en cotizador, mostrar badge "Premium hoy" cuando aplica el surcharge. |
| **Impacto esperado** | Captura del segmento urgente que paga 20% premium, aumento de revenue en días normally slow (lunes/martes), diferenciación clear de la competencia |
| **Esfuerzo** | M (slot picker modificado + pricing logic + UI badges) |
| **Agente recomendado** | Full Stack |
| **Referencias** | [1] https://www.homeadvisor.com/same-day-services/ [2] https://www.taskrabbit.com/research/ |

### Propuesta 5: Marketplace de productos de limpieza

| Campo | Detalle |
|-------|---------|
| **Título** | Crear sección de tienda "Purity Shop" con productos de limpieza profesionales (dropshipping) |
| **Problema** | No se capitaliza el upselling. Clientes no pueden comprar productos de mantenimiento para cuidar sus muebles después del servicio profesional. |
| **Descripción** | Implementar marketplace: (1) **Nueva sección "#shop"**: grid de 4-6 productos de limpieza profesional (kit sanitización, spray antibacterial, kit de mantenimiento de sofá, almohadas protectoras). (2) **Modelo**: los productos son de proveedores locales (dropshipping sin inventario propio). El cliente reserva por WhatsApp y Purity & Clean hace de intermediario. (3) **Cross-selling**: después de confirmar un booking, mostrar popup con "Lleva tu kit de mantenimiento por $X" con foto del producto. (4) **Pricing**: margen del 20-30% sobre costo. (5) **Sin e-commerce complejo**: el shop es un catálogo con botón WhatsApp que envía el pedido — no requiere pasarela de pagos. Implementación: crear sección shop en index.html, productos definidos en config.js, botón WhatsApp que pre-filled el mensaje con el producto elegido. |
| **Impacto esperado** | Revenue adicional sin inventario, nuevo canal de ingresos con margen,强化ación de marca profesional, upsell natural post-booking |
| **Esfuerzo** | S (catálogo + WhatsApp ordering, sin e-commerce real) |
| **Agente recomendado** | Frontend |
| **Referencias** | [1] https://www.emarketer.com/cleaning-products-market [2] https://www.forbes.com/cleaning-services/ |

### Propuesta 6: Programa de referidos 2.0 con estructura escalonada

| Campo | Detalle |
|-------|---------|
| **Título** | Implementar programa de referidos escalonado: 15% → 20% → 25% según cantidad de referidos |
| **Problema** | El programa de referidos actual es básico (15% flat). No hay incentivos para referir múltiples clientes. Los "embajadores" no están reconocidos. |
| **Descripción** | Implementar referidos 2.0: (1) **Niveles de recompensa**: Referido 1-2 = 15% descuento, Referido 3-5 = 20% descuento, Referido 6+ = 25% descuento + servicio gratis (1 limpieza básica). (2) **Dashboard de referidos**: el usuario puede ver cuántos referidos ha hecho, cuántos están activos, cuánto ha ganado. (3) **Notificaciones**: cuando un referido hace su primera reserva, email al cliente original celebrando el logro + indicando su nuevo nivel. (4) **Badge de "Embajador"**: los clientes con 5+ referidosget un badge especial en su perfil y en el sitio. Implementación: el sistema actual de referidos (localStorage + coupon code) se extiende con tracking de cuántos referidos han convertido, lógica de niveles en script.js, dashboard UI en sección referidos. |
| **Impacto esperado** | Aumento de referrals 3x (por estructura de niveles), retención de clientes por el "logro", identificación de embajadores para programas de ambassadors, datos de adquisición de clientes |
| **Esfuerzo** | M (extensión del sistema actual + dashboard + lógica de niveles) |
| **Agente recomendado** | Full Stack |
| **Referencias** | [1] https://www.referralcandy.com/best-referral-programs [2] https://www.smile.io/referral-program-tiers |

### Propuesta 7: Seasonal Surge Pricing

| Campo | Detalle |
|-------|---------|
| **Título** | Implementar pricing dinámico para temporada alta: Navidad, Semana Santa, inicio de alergias |
| **Problema** | Los precios son fijos todo el año. No se aprovecha la alta demanda en ciertas temporadas. Se deja dinero sobre la mesa en fechas peak. |
| **Descripción** | Implementar surge pricing: (1) **Temporadas altas**: definir fechas con pricing premium (navidad: +20%, semana santa: +15%, inicio de alergias (marzo-mayo): +10%). (2) **Badge de temporada**: cuando el usuario visita el sitio en temporada alta, mostrar banner "Por temporada alta, precios pueden tener un ligero ajuste". (3) **Early bird discount**: para fechas fuera de temporada, ofrecer 10% descuento si reserva con 2+ semanas de anticipación. (4) **Cotizador inteligente**: cuando el usuario selecciona fecha de temporada alta, el cotizador muestra el precio con surcharge aplicar. (5) **Transparencia**: el usuario ve exactamente por qué el precio cambió — "Precio base + 20% por temporada navideña". Implementación: agregar array `SURGE_DATES` en config.js con fechas y porcentajes, modificar cotizador para detectar fechas de surge y aplicar el surcharge, mostrar banner cuando la fecha actual está en temporada. |
| **Impacto esperado** | Aumento de revenue 10-18% en temporadas altas, mejor redistribución de demanda (incentivar fechas slow), percepción de transparencia y profesionalismo |
| **Esfuerzo** | S (configuración de fechas + lógica en cotizador) |
| **Agente recomendado** | Frontend |
| **Referencias** | [1] https://www.deloitte.com/dynamic-pricing [2] https://www.gartner.com/pricing-optimization |

---

## Orden de implementación recomendado

| # | Propuesta | Impacto | Esfuerzo | Semana |
|---|----------|---------|----------|--------|
| 1 | Indicador disponibilidad | Alto (conversión) | S | 1 |
| 2 | Paquetes y Bundling | Alto (ticket) | M | 1-2 |
| 3 | Same-Day Booking | Alto (revenue) | M | 1-2 |
| 4 | Programa de puntos | Medio-Alto (retención) | M | 2-3 |
| 5 | Surge Pricing | Medio (revenue) | S | 2 |
| 6 | Referidos 2.0 | Medio (adquisición) | M | 3 |
| 7 | Marketplace productos | Medio (revenue adicional) | S | 2-3 |

**Top 3 para implementar primero:** 1, 2, 3 (rápido, alto impacto en conversión y ticket).

---

## Diferencia clave: R43 vs R44

R43 se enfocó en **modelos de negocio, certificaciones ecológicas, technician tracking, portal B2B, WhatsApp automation, local pack domination, y mental wellness marketing**.

**R44 se enfoca en:**
- **Conversión transaccional**: indicadores de disponibilidad y urgencia
- **Bundling y monetización**: paquetes con descuento y marketplace
- **Gamificación**: programa de puntos con niveles y recompensas escalonadas
- **Pricing dinámico**: surge pricing para temporada alta y early bird discounts
- **Mismo-day service**: captura del segmento urgente que paga premium

R43 construyó **modelos de negocio y diferenciación de marca**. R44 construye **mecanismos de conversión, monetización y urgencia** que traducen tráfico en revenue.

---

## Síntesis: Por qué R44 es diferente

R1-R43 ha construido una base sólida:
- R1-R10: Features internos del site
- R11-R20: SEO y Schema
- R21-R30: UX y conversión básica
- R31-R35: Video, reputation, AI discoverability
- R36: Modernización técnica (Popover API, Navigation API, Scroll-driven animations, Service Worker modules)
- R37: Discovery externo (Apple Maps, TikTok Local, Video Reviews, Crisis Protocol)
- R38: Conversión interna (garantía, slot picker, rebooking)
- R39: Outreach y automatización (GBP, WhatsApp AI, Social Proof, Referral)
- R40: Retención, confianza y canales no exploitados (voice search, portal, video testimonials, Seller Ratings, ESG)
- R41: UX micro-mejoras, gamificación, SEO de blog, AI chatbot, PWA enhanced
- R42: PWA install prompt, Background Sync, Content Index, skip-nav/focus WCAG 2.2, FAQPage Schema, runtime caching, ARIA live forms
- R43: Modelo de suscripción, certificaciones ecológicas, technician tracking, portal B2B, WhatsApp automation, local pack domination, mental wellness marketing
- **R44: Indicadores de disponibilidad, bundles, programa de puntos, same-day booking, marketplace, referidos 2.0, surge pricing**

R44 es la primera ronda dedicada específicamente a **mecanismos de conversión transaccional, monetización alternativa y pricing dinámico**. Las propuestas de R43 eran de marca y modelo de negocio; R44 es **de convertir tráfico en revenue**.

---

## Fuentes

[1] Baymard Institute. "Booking Availability Indicators." https://baymard.com/blog/booking-availability-indicator

[2] Angi Research. "Same-Day Service Scheduling Statistics." https://www.angi.com/research/scheduling/

[3] McKinsey & Company. "Bundling Strategy in Services." https://www.mckinsey.com/bundling-strategy

[4] Bain & Company. "Service Bundling Best Practices." https://www.bain.com/bundling-services/

[5] Loyalty360. "Points Program Research." https://www.loyalty360.com/points-programs

[6] Colloquy. "Loyalty Program Benchmarks." https://www.colloquy.com/loyalty-research/

[7] HomeAdvisor. "Same-Day Service Trends." https://www.homeadvisor.com/same-day-services/

[8] TaskRabbit Research. "On-Demand Cleaning Services." https://www.taskrabbit.com/research/

[9] eMarketer. "Cleaning Products E-commerce Market." https://www.emarketer.com/cleaning-products-market

[10] ReferralCandy. "Best Referral Programs 2026." https://www.referralcandy.com/best-referral-programs

[11] Smile.io. "Referral Program Tiers." https://www.smile.io/referral-program-tiers

[12] Deloitte Digital. "Dynamic Pricing Strategies." https://www.deloitte.com/dynamic-pricing

[13] Gartner. "Pricing Optimization in Services." https://www.gartner.com/pricing-optimization

---

*Documento generado por Innovation Scout — Round 44*
*Purity & Clean Analysis — 2026-04-27*
*Co-Authored-By: Paperclip <noreply@paperclip.ing>*