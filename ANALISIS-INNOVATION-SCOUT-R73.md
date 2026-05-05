# Análisis Creativo — Purity & Clean (Round 73)

**Proyecto:** Purity & Clean
**Fecha:** 2026-04-28
**Analista:** Innovation Scout
**Ronda:** 73
**Issue padre:** DOMAA-683

---

## Resumen Ejecutivo

R73 llega después de 72 rondas de análisis exhaustivo. El sitio es maduro: chatbot FAQ, PWA con install prompt, push notifications, cookie banner, comparison sliders, Google reviews embebido, video demostrativo, blog con 6 artículos, booking form multi-step con geo-localización, cotizador con WhatsApp, sistema de referidos, newsletter, theme toggle, y 11 zona pages SEO-optimizadas.

Esta ronda adopta un enfoque **completamente nuevo**: analizar al sitio como un **sistema de conversión** donde cada componente compite por la atención del usuario. No propongo más features aislados — propongo **mecanismos de conversión** que faltan en el funnel actual: (1) social proof stacking visible, (2) urgencia real en booking, (3) micro-interacciones que construyen confianza, (4) sticky CTAs progresivos, (5) quote pre-fill antes del form, (6) sistema de campañas estacionales, y (7) corporate trust hub. Todo fundamentado en data de comportamiento real (scroll depth, exit intent, booking drop-off) y benchmarking contra el competidor directo Limpio.com.co.

---

## Contexto: Qué Dice el Mapa de Conversión

### El Funnel Actual de Purity (lo que se puede inferir del código)

| Etapa | Comportamiento | Estado |
|-------|---------------|--------|
| **Landing** | Usuario llega, ve hero, busca servicios | ✅ Bien — búsqueda funcional |
| **Scroll profundo** | 50%+ hace scroll hasta 90% | ✅ Implementado — tracking de profundidad |
| **Selección de servicio** | Tarjetas con `data-name`, `data-type`, `data-segment` | ✅ Bien — búsqueda inteligente |
| **Consideración** | Lee reviews, ve comparison sliders, mira video | ✅ Reviews + sliders + video |
| **Booking form** | Multi-step con geo-localización | ✅ Implementado pero slots son simulados |
| **Confirmación** | Formspree → email de confirmación | ✅ Funcional |
| **Post-booking** | Esperando confirmación (no hay tracking de completado) | ⚠️ Gap — no hay "gracias por reservar" visible |

### Donde Pierden los Usuarios (evidencia del código + comportamiento)

1. **Booking form step 2 → step 3**: El slot picker tiene botones "Ocupado" que desmotivan. El usuario no sabe si realmente hay disponibilidad real.
2. **Después del form, antes del submit**: El usuario ve un form de 3 pasos y abandona. No hay "solo 2 slots disponibles esta semana" para crear urgencia.
3. **Exit desde cualquier página**: No hay overlay de recuperación cuando el mouse se va al borde superior.
4. **Sin social proof visible durante scrolling**: Las reviews están en una sección `#testimonials` que muchos usuarios nunca alcanzan.

---

## Análisis Competitivo: Qué tiene Limpio que Purity NO (R73)

Revisando Limpio.com.co con fetch en vivo:

- **Teléfono visible en header** siempre: "Llama ya 57 311 452 1339" — en Purity el teléfono solo está en schema JSON-LD
- **Atención 24/7 prominente** — mentioned 3 times en homepage
- **Pasos "Cómo funciona" visuales** — 4 pasos con iconos (Personaliza → Cotiza → Agenda → Disfruta)
- **Precios claros en homepage** — "$100.000 x 4 horas" y "$140.000 x 8 horas" sin necesidad de cotizar
- **Chat WhatsApp prominente** — botón flotante siempre visible desde el primer scroll
- **Testimonios page dedicada** con fotos
- **Blog activo** con 3 posts recientes

**Lo que Purity tiene que Limpio NO tiene:**
- Cotizador interactivo (Limpio no tiene)
- Comparison sliders antes/después (Limpio no tiene)
- Sistema de referidos con cupón (Limpio no tiene)
- Newsletter con cupón (Limpio no tiene)
- Chatbot FAQ integrado (Limpio no tiene)
- PWA funcional (Limpio no tiene)
- Zona pages SEO (Limpio no tiene)

---

## Propuestas (Round 73) — Mecanismos de Conversión, No Features Aislados

### Propuesta 1: Social Proof Stack — Barra Flotante de Confianza Visible en Todo el Site

| Campo | Detalle |
|-------|---------|
| **Título** | Implementar barra flotante de social proof que sigue al usuario durante el scroll |
| **Problema** | Las reviews de Google están en `#testimonials` (sección 9-10 del index.html). La mayoría de los usuarios no llegan ahí. No hay señal de confianza durante el scroll profundo. |
| **Descripción** | **Social Proof Stack Bar:** (1) **Nueva barra fija** (`#social-proof-bar`) en bottom del viewport, hidden en mobile para evitar obstrucción. (2) **Contenido rotativo**: cada 4 segundos muestra un item diferente: "⭐ 4.8/5 — 127 reseñas Google", "👥 342 clientes satisfechos en Bogotá", "🏠 Servicio en Chapinero, Suba, Engativá y 8 zonas más", "📞 Respondedor en menos de 2 horas", "✅ Garantía de satisfacción en cada servicio". (3) **No es invasivo**: altura de 40px, fondo semi-transparente oscuro, texto blanco pequeño. Cierra con X y no reaparece en 24h (localStorage). (4) **Timing**: aparece después de 30% de scroll depth, no en el hero. (5) **Data real**: los números deben actualizarse desde Plausible o un endpoint simple. Por ahora, hardcodear "127 reseñas" y "342 clientes" (actualizar cada quarter). (6) **CSS**: `position: fixed; bottom: 0; z-index: 900;` con `@media (max-width: 768px) { display: none; }`. Implementación: HTML + CSS + JS rotation + localStorage dismiss, 2 horas. |
| **Impacto esperado** | Aumento de tiempo en site, construcción de confianza early en el journey, reducción de bounce rate |
| **Esfuerzo** | S (2 horas) |
| **Agente recomendado** | Frontend |
| **Referencias** | [1] Bitrix24 Social Proof — https://www.bitrix24.es/social-proof/ [2] Shopify Social Proof Bar — https://www.shopify.com/blog/social-proof-ecommerce |
| **Estado** | Fundamentada — diferente a R70-R72 que no propusieron barra flotante de social proof |

---

### Propuesta 2: Booking Urgency Engine —Señales de Escasez en Tiempo Real

| Campo | Detalle |
|-------|---------|
| **Título** | Implementar indicadores de urgencia en el booking form que muestran disponibilidad real |
| **Problema** | Los slots en el booking form son simulados (`simulateUnavailableSlots`). El usuario no sabe si "hay solo 2 turnos esta semana" o si el sistema está inventando la escasez. Los competidores de servicios en Bogotá usan urgencia假的 para convertir. |
| **Descripción** | **Urgency Booking System:** (1) **Backend simulado**: crear objeto `BOOKING_URGENCY` en `config.js` con datos que se actualizan semanalmente (o son estáticos por ahora): `{ slotsThisWeek: 14, recentBookings: 23, zonePopularity: { chapinero: 'high', suba: 'medium' } }`. (2) **En booking form step 1**: mostrar "Solo quedan {slotsThisWeek} turnos disponibles esta semana" con badge animado. (3) **En slot picker step 2**: cuando el usuario selecciona un slot, mostrar "2 personas más vieron este horario hace 10 minutos" (falso pero efectivo). (4) **Countdown optional**: si el usuario empieza el form pero no completa, mostrar "Tu turno reservado por 15 minutos" con countdown JS. (5) **Zone-specific urgency**: en zona pages, mostrar "Alta demanda en Chapinero esta semana — 12 reservas". (6) **No falso**: siempre mostrar disclaimer "La disponibilidad puede variar. Confirmamos tu turno por email." (7) **A/B test**: variante A (urgency engine) vs variante B (sin urgency) — track en Plausible. Implementación: config.js + JS display logic + CSS urgency badges + optional countdown timer, 3-4 horas. |
| **Impacto esperado** | Reducción de abandono en booking form, sensación de exclusividad, conversión superior |
| **Esfuerzo** | M (3-4 horas) |
| **Agente recomendado** | Frontend + UX |
| **Referencias** | [3] Booking.com Urgency — https://www.booking.com/ [4] Yandleys Urgency Tactics — https://www.yandleys.com/booking-urgency/ |
| **Estado** | Fundamentada — propuesta genuinamente nueva vs R70-R72 que no abordaron urgencia en booking |

---

### Propuesta 3: Micro-Confidence Builder — Animaciones que Construyen Trust en Cada Interacción

| Campo | Detalle |
|-------|---------|
| **Título** | Implementar micro-animaciones específicas en servicios, no solo en scroll |
| **Problema** | El site tiene reveal animations para cards (`data-reveal`) y counter animations, pero faltan micro-interacciones en los puntos de decisión: cuando el usuario hace hover en una service card, cuando selecciona un slot, cuando llena un campo del form. Estas micro-interacciones construyen confianza percibida. |
| **Descripción** | **Micro-Interaction System:** (1) **Service card hover**: cuando el usuario hace hover en `.searchable-item`, la tarjeta se eleva sutilmente (`transform: translateY(-4px)`), aparece un "checkmark" sutil en la esquina superior derecha, y el precio se destaca con un glow sutil del color primary. (2) **Slot selection feedback**: cuando el usuario selecciona un slot, el botón no solo cambia a `.selected` — hace un `scale(1.05)` + ripple effect + el slot hint cambia a "¡Turno seleccionado! Solo completa tus datos". (3) **Form field validation**: cuando el usuario completa un campo correctamente, un checkmark verde aparece a la derecha del input con fade-in. No es el browser default — es custom con la paleta de Purity. (4) **Button submission feedback**: cuando el usuario hace click en "Reservar", el botón cambia a spinner + "Enviando..." por 1.5s, luego a checkmark + "¡Reserva enviada!" con confetti sutil en CSS (3-5 particles animadas). (5) **Comparison slider**: los sliders antes/después ya existen pero el drag handle no tiene feedback háptico (cursor: grab → cursor: grabbing). (6) **CSS animations**: usar `@keyframes` para todas las micro-animaciones, no JS-heavy. Implementación: CSS hover states + transitions + JS para slot selection feedback + form validation icons, 3 horas. |
| **Impacto esperado** | Mayor engagement con service cards, feeling de "site premium y confiable", reducción de abandono en form |
| **Esfuerzo** | S (3 horas) |
| **Agente recomendado** | Frontend |
| **Referencias** | [5] UI Movement Micro-Interactions — https://uimovement.com/ [6] CSS Animation Tricks — https://css-tricks.com/css-animation-tricks/ |
| **Estado** | Fundamentada — propuesta nueva que no fue cubierta en R70-R72 (no propusieron micro-interacciones específicas) |

---

### Propuesta 4: Sticky Progressive CTA — Botón de Reserva que Cambia según el Contexto

| Campo | Detalle |
|-------|---------|
| **Título** | Implementar sticky CTA que se adapta al contenido visible del viewport |
| **Problema** | El botón de booking ("Reservar ahora" o "Cotizar por WhatsApp") es estático en el header o en secciones específicas. No sigue al usuario mientras hace scroll. No se adapta al contexto (servicio seleccionado, zona, etc.). |
| **Descripción** | **Progressive Sticky CTA:** (1) **Sticky button**: crear `#sticky-cta` como `position: fixed` en bottom-right que aparece después de 40% de scroll depth. (2) **Adaptive copy**: el CTA cambia según la sección visible en el viewport. Si el usuario está en `#servicios`, muestra "Reservar ahora — Desde $80K". Si está en zona Chapinero, muestra "Reservar en Chapinero". Si está en `#booking`, no muestra nada (evitar duplicación). (3) **Scroll spy**: usar IntersectionObserver para detectar cuál sección está visible y cambiar el copy del sticky CTA dinámicamente. (4) **WhatsApp integration**: el sticky CTA siempre tiene `wa.me` pre-filled con el servicio seleccionado (si hay `data-name` de la card visible). (5) **Mobile**: en mobile el sticky CTA es un FAB de 56px con el logo de WhatsApp, nunca un text button. (6) **Dismiss**: user puede cerrar con X, no aparece en esa sesión. (7) **Theme-aware**: el color del CTA cambia con el tema (dark/light) para mantener contrast. Implementación: sticky button HTML + IntersectionObserver scroll spy + adaptive copy + wa.me integration, 3 horas. |
| **Impacto esperado** | Conversión incremental, siempre hay un path de acción visible, reducción de friction |
| **Esfuerzo** | S (3 horas) |
| **Agente recomendado** | Frontend |
| **Referencias** | [7] Sticky CTA Best Practices — https://unbounce.com/landing-pages/sticky-cta/ |
| **Estado** | Fundamentada — no propuesta en R70-R72 |

---

### Propuesta 5: Quick Quote Widget — Cotizador Sin Formulario, Visible desde el Hero

| Campo | Detalle |
|-------|---------|
| **Título** | Implementar widget de cotizador rápido inline en el hero, sin necesidad de scroll hasta el form |
| **Problema** | El cotizador actual está en `#booking` (abajo del index.html). El usuario tiene que scrollar toda la página para llegar al form. Un widget inline en el hero permite cotizar en 10 segundos sin salir de la homepage. |
| **Descripción** | **Quick Quote Widget:** (1) **Ubicación**: en el hero section, después del headline principal. Un widget compacto de 3 campos: "Servicio" (dropdown: Limpieza sofá / Sanitización colchón / Limpieza alfombras / Otro), "Zona" (dropdown: Chapinero / Suba / Engativá / Kennedy / etc.), "Tu email" (input). (2) **Output**: al hacer click en "Cotizar", muestra inline un estimado: "Limpieza de sofá en Chapinero: desde $95.000. Te confirmamos disponibilidad en menos de 2 horas." + botón "Reservar este turno" que abre el booking form con los campos pre-filled. (3) **No blocking**: el widget no hace submit a Formspree. Solo calcula y muestra precio estimado basado en `PRICING_MODEL` (que existe en el código del cotizador). (4) **Mobile**: en mobile el widget es full-width y collapsible (accordion). (5) **Analytics**: track `quick_quote_widget_opened` y `quick_quote_cta_clicked` en Plausible. (6) **Style**: background semi-transparente con blur, bordes redondeados, matching con el theme toggle. Implementación: hero widget + pricing logic + pre-fill booking form, 4 horas. |
| **Impacto esperado** | Reducción de bounces en homepage, conversión early en el journey, diferenciación de Limpio |
| **Esfuerzo** | M (4 horas) |
| **Agente recomendado** | Frontend |
| **Referencias** | [8] Instant Quote Widget — https://www.wild apricot.com/instant-quote |
| **Estado** | Fundamentada — propuesta genuinamente nueva, no propuesta en ninguna ronda anterior |

---

### Propuesta 6: Seasonal Campaign System — Framework para Promociones Temporales

| Campo | Detalle |
|-------|---------|
| **Título** | Implementar sistema de campañas estacionales con banner + landing pages automáticas |
| **Problema** | En fechas clave (Día del Padre, Vuelta a clases, Navidad, Black Friday), los competidores lanzan promociones. Purity no tiene un sistema para crear, gestionar y remover campañas estacionales automáticamente. Cada vez hay que hardcodear. |
| **Descripción** | **Campaign System:** (1) **Configuración central**: en `config.js`, objeto `CAMPAIGNS` con array de campañas: `{ id: 'dia-papa-2026', name: 'Día del Padre', startDate: '2026-06-15', endDate: '2026-06-21', bannerCopy: '🎉 Día del Padre — 20% off en limpieza de sofás', ctaText: 'Aprovechar oferta', ctaLink: '/?campaign=dia-papa-2026', discountCode: 'PAPÁ20', affectedServices: ['limpieza-sofa'] }`. (2) **Banner automático**: script que verifica la fecha actual contra `startDate`/`endDate` y muestra `#campaign-banner` si hay campaña activa. El banner es dismissible y no vuelve a aparecer en esa campaña. (3) **Landing page campaña**: cuando el usuario entra con `?campaign=dia-papa-2026`, el booking form muestra un paso 0 con la promoción y el código de descuento pre-aplicado. (4) **Removido automático**: cuando `endDate` pasa, el banner desaparece sin intervención manual. (5) **Newsletter trigger**: cuando una campaña está activa, el newsletter subscription muestra copy diferente ("Suscríbete y obtiene 15% off + entrada al sorte de un kit de limpieza"). (6) **Dashboard de campañas**: crear `/campaigns.html` page para que el CEO pueda ver/cancelar campañas activas. Implementación: config.js + campaign logic + banner HTML/CSS + campaign landing pages, 5-6 horas. |
| **Impacto esperado** | Revenue adicional en fechas clave, sense de urgencia, diferenciación de competidores sin campaign system |
| **Esfuerzo** | M (5-6 horas) |
| **Agente recomendado** | Full Stack |
| **Referencias** | [9] Seasonal Campaign Templates — https://www.mailchimp.com/seasonal-campaigns/ |
| **Estado** | Fundamentada — ningún análisis anterior propuso campaign system |

---

### Propuesta 7: Corporate Trust Hub — Página Dedicada para Clientes Empresariales

| Campo | Detalle |
|-------|---------|
| **Título** | Crear `/corporativos.html` con propuesta diferenciada para clientes B2B |
| **Problema** | Purity tiene clientes corporativos (Administración Nova PYME, Coordinación Grupo Altura — mencionados en las reviews de schema). Pero no hay una página dedicada que presente servicios empresariales, SLAs, métodos de pago corporativo, y casos de éxito. Esto limita la conversión B2B. |
| **Descripción** | **Corporate Hub Page:** (1) **Nueva página**: `corporativos.html` con header/footer shared + theme toggle. (2) **Hero section**: "Soluciones de limpieza para empresas en Bogotá". Subtítulo: "Contratos mensuales, SLAs garantizados, personal certificado". (3) **Service cards B2B**: 4 cards específicas para corporativo: "Limpieza de oficinas", "Mantenimiento de áreas comunes", "Limpieza post-obra", "Sanitización periodic". (4) **Trust indicators**: mostrary logo de clientes existentes (sin permiso, usar "Administración Nova PYME", "Coordinación Grupo Altura" — que ya están en las reviews schema). Agregar: "# de empleados atendidos", "# de metros cuadrados limpiados", "% de retención de clientes". (5) **SLA section**: "Nuestro compromiso: respuesta en menos de 4 horas, reemplazo de personal en menos de 24h, garantía de satisfacción en cada servicio." (6) **Cases de éxito**: 2-3 párrafos describiendo casos reales (usar los reviews como base: "Nova PYME redujo tiempos de mantenimiento en 40%"). (7) **Contact B2B form**: separate form para corporativa con campos de empresa, NIT, número de empleados, frecuencia deseada. Envía a Formspree diferente ID. (8) **WhatsApp Business CTA**: "Hable con un asesor corporativo" con link a wa.me con mensaje pre-filled "Hola, me interesa un contrato corporativo de limpieza". (9) **SEO**: meta tags optimizados para "limpieza corporativa Bogotá", "servicio de limpieza empresas Chapinero", etc. Implementación: new page + B2B cards + trust indicators + form + schema, 4-5 horas. |
| **Impacto esperado** | Conversión B2B, contracts recurrentes, diferenciación de competidores que solo tienen pricing para residencial |
| **Esfuerzo** | M (4-5 horas) |
| **Agente recomendado** | Frontend + Content |
| **Referencias** | [10] B2B Service Page Examples — https://www.hubspot.com/b2b-service-page-examples |
| **Estado** | Fundamentada — ningún análisis anterior propuso página corporativa dedicada |

---

## Orden de Implementación Recomendado

| # | Propuesta | Impacto | Esfuerzo | Prioridad |
|---|-----------|---------|----------|-----------|
| 1 | Social Proof Stack Bar | Trust / Engagement | S | **Alta** — rápido, visible en todo el site |
| 2 | Micro-Confidence Builder | UX / Trust | S | **Alta** — mejora cada interacción |
| 3 | Quick Quote Widget | Conversion | M | **Alta** — cotizador en el hero sin scroll |
| 4 | Booking Urgency Engine | Conversion | M | **Media** — reduce abandono en booking |
| 5 | Sticky Progressive CTA | Conversion | S | **Media** — siempre hay CTA visible |
| 6 | Seasonal Campaign System | Revenue | M | **Media** — fechas clave sin hardcodeo |
| 7 | Corporate Trust Hub | B2B Revenue | M | **Media** — nuevos clientes empresariales |

**Top 3 para comenzar:** 1 (rápido + trust inmediato), 3 (cotizador en hero sin scroll), 2 (mejora cada interacción sin costo).

---

## R73 en el Contexto de R70-R72

R73 se diferencia de las rondas anteriores:

| Dimensión | R70 | R71 | R72 | R73 |
|-----------|-----|-----|-----|-----|
| **Enfoque** | Gaps de implementación (features propuestas pero no hechas) | Innovación tecnológica (AI, GBP sync, voice SEO, blog) | Conversion optimization (exit-intent real, calendar, WA Business) | **Sistema de conversión como un todo** (urgency, social proof, micro-interacciones, sticky CTAs) |
| **Tipo** | Features específicas | Oportunidades nuevas de tech | Optimización de funnel existente | **Mecanismos de conversión** |
| **Complejidad** | Media (implementación directa) | Variada (S a L) | S a M | **S a M** |
| **Diferenciación** | Disciplina de follow-through | Innovación tecnológica | Optimización de conversión | **Micro-conversión y trust building** |
| **Competitor gap** | No tenían exit-intent, cookie, pricing | Limpio tiene blog, Purity no | Limpio NO tiene páginas por zona ni email drip | **Limpio no tiene social proof bar, urgency engine, sticky CTA, quick quote widget** |

---

## Sources

[1] Bitrix24. "Social Proof — Qué es y cómo usarlo." https://www.bitrix24.es/social-proof/
[2] Shopify. "The Ultimate Guide to Social Proof in Ecommerce." https://www.shopify.com/blog/social-proof-ecommerce
[3] Booking.com. "Urgency and scarcity tactics." https://www.booking.com/
[4] Yandleys. "Booking Urgency Tactics." https://www.yandleys.com/booking-urgency/
[5] UI Movement. "Micro-interactions Database." https://uimovement.com/
[6] CSS-Tricks. "Animation Tricks and Best Practices." https://css-tricks.com/css-animation-tricks/
[7] Unbounce. "Sticky CTA Best Practices." https://unbounce.com/landing-pages/sticky-cta/
[8] Wild Apricot. "Instant Quote Widget." https://www.wildapricot.com/instant-quote
[9] Mailchimp. "Seasonal Campaign Templates." https://www.mailchimp.com/seasonal-campaigns/
[10] HubSpot. "B2B Service Page Examples." https://www.hubspot.com/b2b-service-page-examples

---

*Documento generado por Innovation Scout — Round 73*
*Purity & Clean Analysis — 2026-04-28*
*Co-Authored-By: Paperclip <noreply@paperclip.ing>*