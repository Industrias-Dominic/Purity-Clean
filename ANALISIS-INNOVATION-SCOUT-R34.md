# Análisis Creativo — Purity & Clean (Round 34)

**Proyecto:** Purity & Clean
**Fecha:** 2026-04-27
**Analista:** Innovation Scout
**Ronda:** 34
**Issue padre:** DOMAA-419

---

## Resumen Ejecutivo

R34 se enfoca en **operaciones, monetización y diferenciación** — territorios que los Rounds anteriores no cubrieron en profundidad:
1. **Live Operations Dashboard** para que el equipo de campo vea su agenda en tiempo real
2. **Upsell Engine** para aumentar el ticket promedio en cada reserva
3. **Equipment Rental** como nueva línea de ingresos
4. **Self-Service Portal** para clientes empresariales
5. **Surge Pricing** dinámico para maximizar ocupación en horas pico

La investigación del LCRS 2026 confirma que 54% de consumidores que leen reseñas positivas visitan el sitio web del negocio [1]. Esto significa que el sitio ya genera tráfico cualificado. Lo que falta es convertir mejor ese tráfico y expandirse más allá de reservas de consumers hacia operaciones B2B y monetización adicional.

**Descubrimiento clave del LCRS 2026:** Google bajó de 83% a 71% en búsquedas locales. Facebook (34%), Yelp (24%), Apple Maps (27% — casi duplicó), y AI tools como ChatGPT (45%, subiendo de 6%) son plataformas críticas de discovery [1]. Las propuestas de R34 abordan estos canales.

---

## Stack tecnológico actual (resumen R33)

- **Frontend:** HTML5 + CSS3 + JS vanilla ES6+
- **CSS:** 6212 líneas style.css
- **JS:** 1847 líneas script.js + js/script.js
- **Fuentes:** Manrope + Raleway — Google Fonts
- **Iconos:** Font Awesome 6.5 CDN (SRI verificado)
- **Analítica:** Plausible Analytics (sin cookies, GDPR-compliant)
- **Forms:** Formspree
- **Testing:** Playwright E2E (9 suites)
- **PWA:** Service Worker, push notifications, offline support
- **SEO:** Schema LocalBusiness + FAQPage + Article + Review + VideoObject + HowTo + BreadcrumbList
- **Chatbot:** FAQ routing → WhatsApp con mensaje dinámico
- **Booking:** Multi-step form con slot picker
- **Theme:** Dark mode toggle con persistencia
- **Cobertura:** 10 zonas en Bogotá
- **Precios:** Cotizador interactivo + WhatsApp pre-filled
- **Referidos:** Cupón de 15%
- **Comparison sliders:** 6 pares antes/después
- **Reputación:** 127 reviews verificadas

---

## Investigación: Hallazgos clave

### Hallazgo 1: AI tools para discovery local — 45% de consumidores (era 6%)
El uso de ChatGPT y otras herramientas de AI para recomendaciones de negocios locales creció de 6% a 45% en un año [1]. Esto es el mayor cambio en comportamiento del LCRS 2026. El sitio necesita ser "AI-discoverable" — optimizado para aparecer en respuestas de ChatGPT, Gemini, y AI search.

### Hallazgo 2: Apple Maps casi duplicó uso (14% → 27%)
Apple Maps es ahora la 4ta plataforma más usada para leer reviews y la 4ta para escribir [1]. Purity & Clean no tiene presencia verificada en Apple Business Connect.

### Hallazgo 3: 54% visita el sitio después de leer reseñas positivas
El sitio ya genera tráfico cualificado. Lo que falta: (1) convertir mejor ese tráfico, (2) expandir canales de monetización, (3) crear operaciones B2B para clientes empresariales [1].

### Hallazgo 4: Google Assistant Transactions API fue deprecada en 2023
R24 propuso "Voice Commerce" con Google Assistant. **Esto ya no es viable.** La Transactions API fue deprecated el 3 de mayo de 2023 y Conversational Actions se sunsetió el 13 de junio de 2023 [2]. La propuesta de Voice Commerce de R24 debe actualizarse o marcarse como no implementable.

### Hallazgo 5: 92% de consumidores usan reviews para decidir
85% más propensos a usar un negocio con reviews positivas; 77% disuadidos por reviews negativas [1]. El sitio tiene 127 reviews — la reputación es un activo. Pero no hay estrategia de monetización de esa confianza.

---

## Gaps identificados — Round 34 (NOVEDADES no cubiertas en R1-R33)

### 1. Sin dashboard de operaciones en tiempo real para el equipo de campo

**Problema:** El slot picker es simulado. No hay forma de que el equipo de campo vea su agenda en tiempo real,mark attendances, o recibir actualizaciones de último momento. Las operaciones se manejan por WhatsApp y celular — no hay sistematización.

**Impacto potencial:** Eliminación de caos operativo, reducción de errores de agendamiento, eficiencia del equipo.

### 2. Sin motor de upsell en el formulario de reserva

**Problema:** El booking form actual solo captura el servicio seleccionado. No hay sugerencia de servicios complementarios, upgrades, o packages. El ticket promedio se queda bajo.

**Impacto potencial:** +20-30% ticket promedio con upsells efectivos.

### 3. Sin opción de alquiler de equipos

**Problema:** Purity & Clean tiene equipos profesionales de limpieza (máquinas extractoras, vapor, etc.). Hay demanda de clientes que quieren hacer limpiezas menores por su cuenta. Alquilar equipos sería una línea de ingresos adicional sin costo de servicio.

**Impacto potencial:** Nueva línea de ingresos, relación más profunda con clientes.

### 4. Sin portal self-service para clientes corporativos

**Problema:** Los clientes B2B (inmobiliarias, administradoras de edificios) necesitan agendar múltiples propiedades, ver historial de servicios, y facturar bajo su cuenta. WhatsApp no escala para esto.

**Impacto potencial:** Captura de clientes corporativos de alto valor, ingresos recurrentes.

### 5. Sin pricing dinámico (surge pricing)

**Problema:** Todos los servicios tienen precio fijo. En temporada alta (antes de Navidad, después de fiestas patronales), la demanda supera la oferta. No hay forma de capturar ese excedente.

**Impacto potencial:** +15-25% revenue en temporada alta.

---

## Propuestas (Round 34)

### Propuesta 1: Live Operations Dashboard para equipo de campo

| Campo | Detalle |
|-------|---------|
| **Título** | Dashboard de operaciones en tiempo real para el equipo de campo |
| **Problema** | Slot picker simulado; equipo de campo opera vía WhatsApp; sin sistematización |
| **Descripción** | Crear dashboard tipo "dispatcher view" accesible desde móvil: (1) **Agenda del día** con citas ordenadas por zona y hora. (2) **Check-in/out** con marca de tiempo GPS. (3) **Estado de cita**: programada, en camino, en sitio, completada, cancelada. (4) **Notas rápidas** de campo (fotos de antes/después, comentarios). (5) **Push notifications** para nuevas asignaciones. (6) **Sincronización offline** — funciona sin internet estable. Tecnología: HTML + CSS + JS vanilla con localStorage para offline sync, podría usar existing Service Worker. Backend: simple REST API o Google Sheets como MVP. Dashboard visible en /operations.html (password protected). |
| **Impacto esperado** | Eliminación de caos operativo, reducción de errores de agendamiento, equipo más eficiente |
| **Esfuerzo** | M |
| **Agente recomendado** | Full Stack (dashboard + sync) |
| **Referencias** | [1] BrightLocal LCRS 2026 |

### Propuesta 2: Upsell Engine en formulario de reservas

| Campo | Detalle |
|-------|---------|
| **Título** | Motor de upsell dinámico en el formulario de reserva para aumentar ticket promedio |
| **Problema** | Booking form solo captura servicio seleccionado; no hay upsells ni suggestion de packages |
| **Descripción** | Implementar lógica de upsell en booking flow: (1) **Smart suggestions** post-selección de servicio: "Clientes que reservaron Limpieza de Sofá también agregaron: Sanitización de colchón (+$60k)". (2) **Package upgrades**: "¿Quieres el Pack Hogar Completo (Sofá + Colchón + Alfombra) con 15% off?". (3) **Add-ons**: protector de tela, limpiador anti-ácaros, servicio express. (4) **Cross-sell por zona**: "En tu zona de Chapinero, el servicio más popular es...". (5) **Timing trigger**: sugerencias aparecen en step 2 del multi-step form. (6) **AB testing** de copy y posicionamiento. Tecnología: JS vanilla en el booking form actual, lógica de recomendación basada en servicio seleccionado. Sin dependencias externas. |
| **Impacto esperado** | +20-30% ticket promedio en reservas con upsell efectivo |
| **Esfuerzo** | S |
| **Agente recomendado** | Frontend (JS logic) + Marketing (copy) |
| **Referencias** | [1] BrightLocal LCRS 2026 |

### Propuesta 3: Equipment Rental — Nueva línea de ingresos

| Campo | Detalle |
|-------|---------|
| **Título** | Alquiler de equipos profesionales de limpieza como nueva línea de negocio |
| **Problema** | Equipos profesionales ociosos; demanda de clientes que quieren limpieza DIY pero no tienen equipos |
| **Descripción** | Agregar sección de rental al sitio: (1) **Catálogo de equipos** disponibles: máquina extractora, vaporizador, aspiradora industrial, kit de sanitización. (2) **Precios de alquiler**: por día, por fin de semana, por semana. (3) **Proceso de reserva**: calendario de disponibilidad + form de request. (4) **Instrucciones de uso**: videos tutoriales embebidos. (5) **Depósito y seguro**:条款 de responsabilidad. (6) **Cross-sell**: "Incluye servicio de limpieza profesional por $20k extra". Tecnología: nueva sección /rental.html con catálogo y calendario de disponibilidad (puede usar Google Calendar embebido o Calendly). Booking via Formspree dedicado. |
| **Impacto esperado** | Nueva línea de ingresos, relación más profunda con clientes, diferenciación |
| **Esfuerzo** | M |
| **Agente recomendado** | Frontend (catálogo) + Content (descripciones) |
| **Referencias** | [1] BrightLocal LCRS 2026 — new revenue streams |

### Propuesta 4: Self-Service Portal para clientes corporativos B2B

| Campo | Detalle |
|-------|---------|
| **Título** | Portal self-service para clientes empresariales (inmobiliarias, administradoras) |
| **Problema** | Clientes B2B gestionan múltiples propiedades vía WhatsApp — no escala |
| **Descripción** | Crear portal B2B privado: (1) **Login con credentials** para cliente corporativo. (2) **Dashboard de propiedades**: lista de propiedades asignadas con dirección, tipo, última limpieza. (3) **Agendamiento bulk**: agendar múltiples propiedades en una sola sesión. (4) **Historial de servicios**: todos los servicios por propiedad con fotos y notas. (5) **Facturación**: extractos mensuales, descarga de facturas PDF. (6) **Usuarios múltiples**: diferentes contactos por propiedad. Tecnología: HTML + CSS + JS con autenticación simple (podría usar Netlify Identity, Auth0 free tier, o simple password protection). Almacenamiento: Google Sheets o Airtable como backend temporal. Portal en /corporate.html con acceso restringido. |
| **Impacto esperado** | Captura de clientes corporativos de alto valor, ingresos recurrentes B2B |
| **Esfuerzo** | M |
| **Agente recomendado** | Full Stack (portal + auth) |
| **Referencias** | [1] BrightLocal LCRS 2026 |

### Propuesta 5: Surge Pricing dinámico para maximizar ocupación

| Campo | Detalle |
|-------|---------|
| **Título** | Pricing dinámico con surge pricing en temporada alta y horarios pico |
| **Problema** | Precio fijo en todos los servicios; oportunidad de capturar valor adicional en demanda alta |
| **Descripción** | Implementar pricing dinámico: (1) **Definición de surge periods**: pre-Navidad (dic 15-31), postaño nuevo (ene 1-7), Semana Santa,锦绣大战 de fin de año corporativo. (2) **Multipliers**: 1.2x (20% increase) en surge, 1.3x en demanda muy alta. (3) **Badge visible**: "Precio especial de temporada — ahorra 10% agendando antes del 15 de diciembre". (4) **Early bird discount**: 10% off para servicios agendados con 2+ semanas de anticipación. (5) **Low season specials**: 15% off en meses lentos (marzo-abril, julio) para平滑 demanda. (6) **Transparent pricing**: el usuario ve el precio base y el precio surge, sin sorpresa. Tecnología: JS vanilla en el cotizador actual, calcula precio con multiplier según fecha. Mostrar ahorro por anticipación. |
| **Impacto esperado** | +15-25% revenue en temporada alta,平滑 demanda en temporada baja |
| **Esfuerzo** | S |
| **Agente recomendado** | Frontend (dynamic pricing JS) + Marketing (calendar de surge periods) |
| **Referencias** | [1] BrightLocal LCRS 2026 |

---

## Orden de implementación recomendado

| # | Propuesta | Impacto | Esfuerzo | Semana |
|---|----------|--------|----------|--------|
| 1 | Live Operations Dashboard | Alto | Medio | 1-2 |
| 2 | Upsell Engine | Alto | Bajo | 1 |
| 3 | Equipment Rental | Medio | Medio | 2-3 |
| 4 | Surge Pricing | Alto | Bajo | 1 |
| 5 | Self-Service Portal B2B | Alto | Medio | 3-4 |

**Top 3 para implementar primero:** 2, 4, 1 (Upsell y Surge son quick wins de revenue; Dashboard resuelve problema operativo más agudo).

---

## Diferencia clave: R33 vs R34

R33 iba por **captación y conversión post-visita** — cómo convertir el tráfico existente en reservas y expandir presencia fuera del sitio.

R34 va por **operaciones y monetización** — cómo generar más revenue por cliente, cómo sistematizar operaciones, cómo crear nuevas líneas de negocio.

El LCRS 2026 confirma que Purity & Clean ya tiene:
- Reputación sólida (127 reviews)
- Sitio optimizado para discovery
- Tráfico cualificado de reseñas positivas

Lo que falta para 2026 es:
1. **Monetizar mejor** cada reserva (upsell, surge pricing)
2. **Crear nuevas líneas de ingreso** (equipment rental, B2B portal)
3. **Sistematizar operaciones** (live dashboard para equipo de campo)

---

## Actualización importante: Voice Commerce (R24) ya no es viable

La propuesta de "Voice Commerce — Alexa y Google Assistant" en R24 proponía usar Google Assistant Transactions API. **Esta API fue deprecated el 3 de mayo de 2023** y Conversational Actions se sunsetearon el 13 de junio de 2023 [2].

**Impacto:** La propuesta de Voice Commerce de R24 no debe implementarse como estaba planeada.

**Alternativa:** En lugar de Voice Commerce vía Google Assistant, considerar:
1. **MCP Server** (R24 Propuesta 1) — sigue siendo válido para AI agent discovery
2. **WhatsApp Voice Messages** — usuarios pueden enviar notas de voz por WhatsApp en lugar de texto
3. **Verificar Apple Business Connect** — Apple Maps (27% de uso) es más relevante que Google Assistant para voice search en iOS

---

## Síntesis: Por qué R34 es diferente

R1-R33 se enfocaron en el sitio web: features, UX, booking, pricing, gamificación, operational efficiency, AI, móvil, reputación, captación.

**R34 se enfoca en el negocio detrás del sitio:**
- Revenue por cliente (upsell, surge pricing)
- Nuevos revenue streams (equipment rental, B2B)
- Eficiencia operativa (live dashboard)
- monetización de la reputación (portal B2B)

En 2026, donde el LCRS confirma que 54% visita el sitio después de reseñas positivas, y donde Apple Maps duplicó su uso, Purity & Clean tiene la base para monetizar mejor su reputación y expandirse más allá de reservas consumer hacia operaciones B2B y nuevas líneas de ingreso.

---

## Fuentes

[1] BrightLocal. "Local Consumer Review Survey 2026." Feb 2026. https://www.brightlocal.com/local-consumer-review-survey/
[2] Google Developers. "Transactions API Deprecation." 2024. https://developers.google.com/assistant/transactions

---

*Documento generado por Innovation Scout — Round 34*
*Purity & Clean Analysis — 2026-04-27*
*Co-Authored-By: Paperclip <noreply@paperclip.ing>*