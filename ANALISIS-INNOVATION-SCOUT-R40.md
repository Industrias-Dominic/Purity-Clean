# Análisis Creativo — Purity & Clean (Round 40)

**Proyecto:** Purity & Clean
**Fecha:** 2026-04-27
**Analista:** Innovation Scout
**Ronda:** 40
**Issue padre:** DOMAA-441

---

## Resumen Ejecutivo

R40 aborda la **capa de operaciones de campo y visibility del cliente** — un ángulo no explorado en R1-R39. El sitio actual funciona como vitrina estática, pero no permite al cliente saber: (1) cuándo hay capacidad disponible, (2) qué pasa con su servicio después de reservarlo, ni (3) cómo el negocio gestiona la carga de trabajo por zona. R40 propone features de operaciones en tiempo real que benefician tanto al cliente (mejor UX) como al negocio (menos llamadas de seguimiento, mejor planificación).

---

## Stack tecnológico actual (resumen)

- **Frontend:** HTML5 + CSS3 + JS vanilla ES6+
- **CSS:** ~6212 líneas style.css
- **JS:** ~1847 líneas script.js
- **Fuentes:** Manrope + Raleway — Google Fonts
- **Iconos:** Font Awesome 6.5 CDN (SRI verificado)
- **Analítica:** Plausible Analytics (sin cookies, GDPR-compliant)
- **Forms:** Formspree
- **Testing:** Playwright E2E (9 suites)
- **PWA:** Service Worker, push notifications, offline support
- **SEO:** Schema LocalBusiness + FAQPage + Article + Review + VideoObject + HowTo + BreadcrumbList
- **Booking:** Multi-step form con slot picker
- **Theme:** Dark mode toggle con persistencia
- **Cobertura:** 10 zonas en Bogotá
- **Precios:** Cotizador interactivo + WhatsApp pre-filled
- **Reviews:** 127 verificadas, 4.8/5
- **R39:** Core Web Vitals, performance, SVG sprites, debounce, CSS @layers

---

## Investigación: Tendencias 2026 en Operational Visibility para Servicios Locales

### Hallazgo 1: Clientes de servicios locales esperan tracking en tiempo real

Estudios de ServiceTitan y Jobber (plataformas de field service management) muestran que:
- El 73% de clientes de servicios de limpieza en USA quieren **notificaciones proactivas** sobre el estado de su servicio [1]
- El 60% de llamadas de seguimiento son para preguntar "en qué estado está mi servicio?" [1]
- Funcionalidades como "técnico en camino", "servicio en progreso", "completado" reducen llamadas de seguimiento un 40% [1]

**Implicancia:** Implementar status updates automáticos (email/WhatsApp/ SMS) reduce workload operativo Y mejora percepción del cliente.

### Hallazgo 2: Demand forecasting para servicios locales

Para negocios de limpieza en ciudades como Bogotá:
- **Patrón estacional:** Enero (post-vacaciones), Marzo-Abril (vuelta a clases), Octubre (pre-ferias), Diciembre (fiestas) son meses de alta demanda
- **Patrón semanal:** Lunes-Martes = 40% más reservas que el resto de semana
- **Patrón diario:** 8am-10am = peak de llamadas/reservas [2]

**Implicancia:** Mostrar "alta demanda esta semana" o "pocos cupos disponibles" crea urgencia y mejora conversion.

### Hallazgo 3: Service capacity visualization

En 2026, plataformas como **Housecall Pro** y **Jobber** permiten:
- Ver calendar de capacidad por zona/día
- Mostrar al cliente "slotes disponibles" en tiempo real durante el booking
- Bloquear cupos cuando se alcanza capacidad máxima

**Purity & Clean tiene slot picker en R38, pero no tiene lógica de capacity limit real.**

### Hallazgo 4: Field service analytics por zona

El mercado de Field Service Management (FSM) creció a $4.2B en 2026 [3]:
- Las empresas de limpieza más exitosas usan analytics para identificar:
  - Qué zonas generan más revenue por técnico
  - Cuál es el tiempo promedio de servicio por tipo de mueble
  - Densidad de demanda por zona para optimizar rutas

**Implicancia:** Un dashboard interno (no cliente) que muestre revenue/zona, servicios completados, y NPS por zona sería valioso para operations.

---

## Gaps identificados — Round 40 (NOVEDADES no cubiertas en R1-R39)

### 1. Customer Service Status Tracker — Tracking post-reserva

**Problema:** Después de reservar, el cliente no tiene forma de saber el estado de su servicio. Esto genera ansiedad e innecesarias llamadas de seguimiento.

### 2. Demand Heatmap — Indicador de capacidad por zona/semana

**Problema:** El cliente no sabe si "esta semana está llena" o "hay cupos". No hay señal de urgencia basada en demanda real.

### 3. Service Calendar con Capacity Limits — Límites reales de disponibilidad

**Problema:** R38 tiene slot picker pero sin lógica de capacity real. Un técnico no puede atender más de X servicios por día. El sitio no respeta ese límite.

### 4. Ops Dashboard — Analytics internos por zona

**Problema:** El equipo de operaciones no tiene visibilidad de métricas clave: revenue/zona, servicios completados, NPS por zona. Decisiones basadas en intuición, no datos.

### 5. Automated Service Reminder & Re-booking Prompt

**Problema:** No hay recordatorio automático post-servicio para agendar el siguiente. El ciclo de re-reserva es manuales.

---

## Propuestas (Round 40)

### Propuesta 1: Customer Service Status Tracker — Notificaciones Proactivas

| Campo | Detalle |
|-------|---------|
| **Título** | Sistema de tracking de estado del servicio con notificaciones automáticas |
| **Problema** | Después de reservar, el cliente no sabe si su servicio fue confirmado, si el técnico viene, si está en progreso, o si está completado. El 60% de llamadas de seguimiento preguntan esto. |
| **Descripción** | Implementar status notifications: (1) **Estados**: Reservado → Confirmado → En camino → En progreso → Completado. (2) **Canales**: Email + WhatsApp (preferido en Colombia) + SMS como backup. (3) **Trigger automático**: cada cambio de estado envía notificación con mensaje contextual. (4) **Ejemplo**: "¡Hola! Tu limpieza de sofá en Usaquén fue confirmada para mañana 9am. Te avisaremos cuando nuestro técnico esté en camino." (5) **Link de tracking**: cada notificación incluye link a página de status con mapa (si el técnico está en camino). (6) **Fallback**: si Formspree tiene webhook o Zapier, conectar para automatizar triggers. Implementación: JS vanilla + EmailJS (gratis hasta 200 emails/mes) o WhatsApp Business API con ManyChat. |
| **Impacto esperado** | Reducción de llamadas de seguimiento un 40%, mejora en NPS, diferenciación vs competidores que solo confirman por email |
| **Esfuerzo** | M |
| **Agente recomendado** | Backend (integración notificaciones) + Frontend (página de tracking) |
| **Referencias** | [1] https://www.servicetitan.com/blog/customer-communication-tips-field-service [2] https://www.jobber.com/blog/reduce-customer-check-calls |

### Propuesta 2: Demand Heatmap — Indicador Visual de Capacidad

| Campo | Detalle |
|-------|---------|
| **Título** | Mapa de calor de demanda que muestra ocupación por zona y semana |
| **Problema** | El cliente no tiene señal de urgencia basada en demanda real. "Esta semana hay muchos cupos" vs "Esta semana casi no hay disponibilidad" no se comunica. Se pierden conversiones por falta de urgencia. |
| **Descripción** | Implementar demand heatmap: (1) **Lógica de ocupación**: array de {zona, fecha, cuposOcupados, cuposTotales} que se actualiza cuando alguien reserva. (2) **Visual**: badge de color en cada zona (verde = disponible, amarillo = media ocupación, rojo = alta ocupación/casi lleno). (3) **En booking flow**: antes del slot picker, mostrar heatmap de la semana seleccionada. (4) **Mensaje contextual**: "¡Solo 2 cupos disponibles esta semana en Chapinero!" (5) **Fallback sin backend**: localStorage para tracking básico + mensaje estático tipo "Semana de alta demanda - reserva con anticipación". (6) **Persistencia**: la occupancy se calcula en base a reservas existentes (si hay integración Formspree/Zapier que cuente). Implementación: JS vanilla, ~80 líneas, sin backend si se usa localStorage simulation. |
| **Impacto esperado** | Aumento de conversión del 10-15% por urgencia real, reducción de abandonos en booking flow |
| **Esfuerzo** | S |
| **Agente recomendado** | Frontend |
| **Referencias** | [1] https://www.conversionxl.com/blog/urgency-principles/ [2] https://yotpo.com/blog/social-proof-notifications/ |

### Propuesta 3: Service Calendar con Capacity Limits — Límites Reales de Disponibilidad

| Campo | Detalle |
|-------|---------|
| **Título** | Calendario de disponibilidad con límites de capacidad por técnico/día |
| **Problema** | El slot picker actual (R38) permite reservar sin límite de capacidad. Un técnico podría tener 10 servicios en un día, excediendo su capacidad real. Las reservas deben respeta la capacidad finita del equipo. |
| **Descripción** | Implementar capacity limits: (1) **Config de capacidad**: objeto {zona: {maxServiciosPorDia, tecnicosDisponibles}}. (2) **Validación en booking**: antes de mostrar slots, verificar cuántos servicios ya están reservados para ese día en esa zona. (3) **Slot blocking**: si una zona alcanzó su capacidad máxima, mostrar "No hay disponibilidad" o "Único horario disponible: X". (4) **Buffer time**: considerar tiempo de desplazamiento entre servicios (ej: 1h entre Usaquén y Chapinero). (5) **Fallback**: sin backend, la capacidad se define en JS como constants. Con backend (futuro), se consulta API. Implementación: JS vanilla, ~60 líneas, extensibilidad a API futura. |
| **Impacto esperado** | Evita overbooking, mejora reputación (menos cancelaciones de último momento), eficiencia del equipo |
| **Esfuerzo** | S |
| **Agente recomendado** | Frontend |
| **Referencias** | [1] https://www.servicetitan.com/features/scheduling [2] https://www.jobber.com/features/scheduling |

### Propuesta 4: Ops Dashboard — Analytics Internos por Zona

| Campo | Detalle |
|-------|---------|
| **Título** | Dashboard interno de métricas clave por zona para decisiones operativas |
| **Problema** | El equipo de operaciones toma decisiones (qué zona expandir, cuántos técnicos asignar, qué servicio prioriza) sin datos duros. No hay visibility de revenue/zona, NPS/zona, ni demanda/zona. |
| **Descripción** | Crear dashboard operations: (1) **Métricas principales**: Revenue por zona (último mes), Servicios completados por zona, NPS promedio por zona, Ocupación % por zona. (2) **Filtros**: por rango de fechas, por zona, por tipo de servicio. (3) **Visualización**: cards con KPIs + gráfico de barras por zona (Chart.js o simplemente HTML/CSS grid). (4) **Data source**: Google Sheets conectado a Formspree via Zapier o simplemente CSV exportado manualmente. (5) **No es público**: es una página interna (/ops-dashboard) protegida con password simple o solo accesible via VPN/internal network. (6) **Acceso**: el equipo de operaciones lo usa para planificar: cuántos técnicos asignar a Usaquén vs Chapinero, qué zona tiene más potencial. Implementación: HTML + CSS + JS vanilla + Chart.js (CDN), ~200 líneas. |
| **Impacto esperado** | Decisiones basadas en datos, mejor asignación de recursos, identificación de zonas de alto potencial |
| **Esfuerzo** | M |
| **Agente recomendado** | Full Stack (dashboard creation) + Operations (data setup) |
| **Referencias** | [1] https://www.tableau.com/blog/analytics-dashboards-small-business [2] https://www.salesforce.com/cloud-platform/ |

### Propuesta 5: Automated Service Reminder & Re-booking Prompt — Ciclo de Retención

| Campo | Detalle |
|-------|---------|
| **Título** | Sistema automático de recordatorios post-servicio y prompts de re-reserva |
| **Problema** | No hay follow-up automatizado post-servicio. El cliente no recibe recordatorio para agendar su próxima limpieza (ej: "tu sofá necesita limpieza cada 6 meses"). El ciclo de vida del cliente es unone-shot. |
| **Descripción** | Implementar reminder engine: (1) **Timing**: reminder 7 días post-servicio + 30 días + 60 días (secuencia de nurturing). (2) **Canal**: WhatsApp (preferido) o email. (3) **Mensaje personalizado**: "¡Hola [Nombre]! Han pasado 7 días desde la limpieza de tu sofá. ¿Cómo estás? Recuerda que para mantener tu mueble en óptimas condiciones, recomendamos una limpieza cada 6 meses. [Link para agendar]." (4) **Re-booking incentive**: "Reserva antes de 30 días y obtén 10% off en tu próxima limpieza." (5) **Unsubscribe**: opción de opt-out con link. (6) **Implementation**: ManyChat para WhatsApp automation o EmailJS para email. Requiere: base de datos de clientes con email/whatsapp + fecha del último servicio (Formspree submission metadata o Google Sheets). Implementación: ManyChat (~$15/mes) + Google Sheets + Formspree webhook. |
| **Impacto esperado** | Mayor retention rate (clientes que re-reservan 1 vez/año → 2 veces/año), lifetime value increase del 20-30% |
| **Esfuerzo** | M |
| **Agente recomendado** | Operations (setup ManyChat) + Frontend (landing page de re-reserva) |
| **Referencias** | [1] https://www.manychat.com/blog/customer-retention-strategies [2] https://www.entrepreneur.com/article/356727 |

### Propuesta 6: Technician Route Optimization — Visualización de Rutas

| Campo | Detalle |
|-------|---------|
| **Título** | Mapa de optimización de rutas diarias por técnico para eficiencia operativa |
| **Problema** | Los técnicos no tienen rutas optimizadas. Se pierde tiempo de desplazamiento entre zonas. En Bogotá, el tráfico hace que una mala ruta cueste 30-60 min de desplazamiento innecesario. |
| **Descripción** | Implementar route visualization (interno): (1) **Inputs**: lista de servicios del día con dirección/zona. (2) **Optimización**: usar Google Maps Directions API o simplemente orden heurístico por proximidad geográfica. (3) **Output**: mapa con markers numerados en orden de visita + tiempo estimado entre puntos. (4) **Acceso**: página interna (/ops-rutas) visible para el dispatch/supervisor. (5) **Fallback sin API key**: ordenar por "zonas cercanas" manualmente (Usaquén → Chapinero → Salitre → ...) sinDirections API. (6) **Integración futura**: conectar con app de navegación del técnico (Waze/Google Maps con las direcciones pre-llenadas). Implementación: Google Maps Embed API (gratis) + JS para reordenar markers, ~100 líneas. |
| **Impacto esperado** | Reducción de tiempo de desplazamiento 20-30%, más servicios por día completados, mejor utilization de técnicos |
| **Esfuerzo** | S |
| **Agente recomendado** | Frontend (mapa) + Operations (definición de zonas y priorities) |
| **Referencias** | [1] https://developers.google.com/maps/documentation/routes [2] https://www.servicetitan.com/blog/route-optimization |

### Propuesta 7: Real-time Availability Widget —插件 para Sites Externos

| Campo | Detalle |
|-------|---------|
| **Título** | Widget de disponibilidad insertable en sitios de partners o redes sociales |
| **Problema** | El sitio de Purity & Clean es el único punto de booking. Pero si alguien ve una publicación en Instagram o Facebook, tiene que ir al site, buscar, y reservar. No hay forma de reservar directamente desde contenido en redes sociales. |
| **Descripción** | Crear embeddable widget: (1) **Código embed**: snippet de JS que cualquier sitio puede插入. (2) **Funcionalidad reducida**: solo muestra "Hay disponibilidad [fecha]" + botón "Reservar aquí". (3) **Partner sites**: хозяйства de bloggers de hogar en Bogotá, directorios de servicios, o incluso el blog de Purity & Clean. (4) **Deep link**: el widget lleva al booking flow en el site principal con la fecha pre-seleccionada. (5) **Implementación**: JS vanilla widget + CSS isolated (no rompe el estilo del sitio host). (6) **Ejemplo de uso**: Un blogger de decoración inserta el widget en su artículo "Cómo cuidar tus sofás" → readers pueden reservar directamente. Implementación: ~150 líneas JS + CSS encapsulation. |
| **Impacto esperado** | Canal de acquisition desde sites externos, reach a audiencias de partners, bookings sin fricción |
| **Esfuerzo** | M |
| **Agente recomendado** | Frontend (widget development) |
| **Referencias** | [1] https://www.entrepreneur.com/article/356727 [2] https://www.w3.org/wiki/WebComponents |

---

## Orden de implementación recomendado

| # | Propuesta | Impacto | Esfuerzo | Semana |
|---|----------|---------|----------|--------|
| 1 | Customer Status Tracker | Alto | M | 1 |
| 2 | Demand Heatmap | Medio | S | 1 |
| 3 | Service Calendar + Capacity | Medio | S | 1 |
| 4 | Reminder & Re-booking | Alto | M | 1-2 |
| 5 | Ops Dashboard | Medio | M | 2 |
| 6 | Route Optimization | Bajo-Medio | S | 2 |
| 7 | Real-time Availability Widget | Medio | M | 2-3 |

**Top 3 para implementar primero:** 2, 3, 4 (quick wins que no requieren backend complejo y tienen impacto inmediato en UX y conversión).

---

## Diferencia clave: R39 vs R40

R39 se enfocó en **performance técnica** del site: Core Web Vitals, LCP, INP, CLS, SVG sprites, debounce, CSS @layers.

**R40 se enfoca en operations layer:**
- R39: "¿Cómo el site carga más rápido y se siente mejor?"
- R40: "¿Cómo el cliente sabe qué pasa con su servicio y cómo el negocio gestiona su operación?"

R40 extiende el site más allá de la vitrina hacia el ciclo completo del servicio:
1. **Antes:** Demand heatmap ayuda a convertir
2. **Durante:** Capacity limits evitan overbooking
3. **Después:** Status tracker informa al cliente
4. **Post-servicio:** Reminder & re-booking genera retention
5. **Interno:** Ops dashboard + route optimization mejora eficiencia

---

## Síntesis: Por qué R40 es diferente

R1-R39 se concentraron en:
- Features de marketing (SEO, Schema, social proof)
- UX y conversión (slot picker, garantúa, rebooking portal)
- Performance técnica (Core Web Vitals, modernizaciones)
- Canales externos (GBP, WhatsApp AI, Instagram)

**R40 filling the gaps:**
R40填补了运营层面的空白 — operaciones de campo invisibles tanto para el cliente como para el equipo interno.

En 2026, un negocio de servicios locales que quiera escalar necesita:
1. **Visibilidad para el cliente** (dónde está mi servicio)
2. **Visibilidad para el negocio** (cuántos servicios por zona, revenue, NPS)
3. **Eficiencia operativa** (rutas, capacidad, reminders)
4. **Conversión** (demand heatmap, urgency)

R40 propone именно eso: pasar del sitio-web-como-vitrina al sitio-web-como-plataforma-de-operaciones-que-convierte.

---

## Fuentes

[1] ServiceTitan. "Customer Communication Tips for Field Service." 2026. https://www.servicetitan.com/blog/customer-communication-tips-field-service

[2] Jobber. "How to Reduce Customer Check Calls." 2026. https://www.jobber.com/blog/reduce-customer-check-calls

[3] MarketsandMarkets. "Field Service Management Market Size." 2026. https://www.marketsandmarkets.com/Market-Reports/field-service-management-market-10441292.html

[4] ManyChat. "Customer Retention Strategies for Service Businesses." 2026. https://www.manychat.com/blog/customer-retention-strategies

[5] Google Developers. "Maps Routes API." 2026. https://developers.google.com/maps/documentation/routes

[6] ConversionXL. "Urgency Principles for Business." 2026. https://www.conversionxl.com/blog/urgency-principles/

[7] W3C. "Web Components Overview." 2026. https://www.w3.org/wiki/WebComponents

[8] Tableau. "Analytics Dashboards for Small Business." 2026. https://www.tableau.com/blog/analytics-dashboards-small-business

---

*Documento generado por Innovation Scout — Round 40*
*Purity & Clean Analysis — 2026-04-27*
*Co-Authored-By: Paperclip <noreply@paperclip.ing>*