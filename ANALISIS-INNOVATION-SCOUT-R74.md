# Análisis Creativo — Purity & Clean (Round 74)

**Proyecto:** Purity & Clean
**Fecha:** 2026-04-28
**Analista:** Innovation Scout
**Ronda:** 74
**Issue padre:** DOMAA-688

---

## Resumen Ejecutivo

R74 se distingue de las 73 rondas anteriores por adoptar la perspectiva del **modelo operativo de la empresa**: ¿Purity es una empresa con empleados propios o trabaja con contratistas? ¿Qué garantías tiene el cliente cuando llega un técnico a su casa? ¿Por qué debería confiar en Purity sobre un limpiador independiente encontrado por WhatsApp?

Los análisis anteriores se enfocaron en features, conversión, SEO y UX. Esta ronda identifica **gaps estratégicos en la credibilidad institucional** que los competidores capitalizan: modelo de empleados visible, años de experiencia destacados, garantías tangibles, y diferenciación clara entre servicio profesional y limpieza informal.

La evidencia: DOMAA-81 (WhatsApp real) sigue sin código efectivo. Limpio.com.co tiene 25+ años visibles. Serviclean tiene stats concretos (43 proyectos, 7200 trabajos). Purity tiene 73 rondas de análisis y cero implementaciones que resuelvan el problema de credibilidad core.

---

## Contexto: Estado Actual del Proyecto

### Lo Implementado (resumen R1-R73)
- PWA funcional, chatbot FAQ, comparison sliders, zona pages (11), blog (6 posts), newsletter, referidos, theme toggle, booking form multi-step, cotizador con geo-localización

### Lo Pendiente (pendientes de implementación)
- DOMAA-701: WhatsApp number `573001234567` sigue siendo placeholder — 100% de leads WA se pierden
- DOMAA-703: Sesión de priorización — CEO no ha seleccionado Top 10 para implementar
- DOMAA-702: Auditoría de implementación — muchos `done` sin código real

### Lo Que FALTA en el Proyecto (basado en benchmarking competitivo)

| Elemento | Purity | Limpio | Serviclean |
|----------|--------|---------|------------|
| Años de experiencia | ❌ No visible | ✅ "25+ años" | ✅ "8+ años" |
| Modelo de empleados | ❌ No descrito | ✅ "Empleadas domésticas" | ⚠️ "Personal" genérico |
| Stats de servicio | ❌ No hay | ❌ No hay | ✅ "7200 trabajos" |
| Garantía tangible | ❌ No hay | ⚠️ "Garantía de calidad" | ✅ "200% Satisfacción" |
| Precios claros por turno | ❌ No hay | ✅ "$100K/4h, $140K/8h" | ⚠️ Solo cotizar |
| Página corporativa/B2B | ❌ No hay | ❌ No hay | ⚠️ Solo servicios |
| Seguro de responsabilidad civil | ❌ No mentioned | ❌ No mentioned | ✅ Mentioned |

---

## Propuestas (Round 74) — Credibilidad Institucional

### Propuesta 1: Modelo de Servicio Transparente — Empleados vs Contratistas

| Campo | Detalle |
|-------|---------|
| **Título** | Implementar sección "Nuestro Equipo" que explique el modelo operativo de Purity |
| **Problema** | Purity no comunica si usa empleados propios o contratistas externos. Esta ambigüedad reduce confianza: el cliente no sabe quién entra a su casa, qué formación tiene, ni qué pasa si algo sale mal. Limpio resuelve esto con "empleadas domésticas capacitadas". |
| **Descripción** | **Modelo de Servicio Page:** (1) Nueva página `/equipo.html` o sección en homepage `#modelo`. (2) Contenido: "En Purity & Clean trabajamos con [empleados propios/contratistas certificados] que pasan por: verificación de antecedentes, capacitación en productos seguros, training en protocolo de servicio." (3) Si es empleados propios: hablar de beneficios, estabilidad, orgullo corporativo — diferenciador vs limpiador independiente. (4) Si es contratistas: hablar de estándares, control de calidad, supervisión. (5) Badge/claim: "Todos nuestros técnicos están asegurados contra daños a terceros." (6) CS: usar `config.js WHATSAPP_CONFIG.numero` para el número de contacto real. Implementación: nueva página o sección + copy + iconos + badge de seguro. Esfuerzo: S (3h). Agente: Frontend + Content. |
| **Impacto esperado** | Aumenta confianza inicial, reduce objeciones de seguridad, diferenciación clara vs limpiadores informales |
| **Esfuerzo** | S (3 horas) |
| **Agente recomendado** | Frontend + Content |
| **Referencias** | [1] Limpio empleado doméstico — https://limpio.com.co/limpieza/aseo-y-desinfeccion/servicio-limpieza-de-hogar/ [2] Serviclean team — https://serviclean.co/nosotros/ |
| **Estado** | Fundamentada — Ninguna de las 73 rondas propuso clarificar el modelo de empleados |

---

### Propuesta 2: Trust Builders Visibles — Stats, Garantía y Certificaciones

| Campo | Detalle |
|-------|---------|
| **Título** | Implementar sección de trust builders con stats, garantía y certificaciones |
| **Problema** | Serviclean muestra "8+ años, 43 proyectos, 7200 trabajos, +50 empleados, 11 premios" en su homepage. Purity no tiene nada equivalente. Las stats de empresa son credibilidad barata y alta conversión. |
| **Descripción** | **Trust Stats Section:** (1) Nueva sección `#stats` o integrada en `#nosotros`. (2) Stats hardcodeados temporalmente (actualizar cada quarter): "Más de [X] servicios realizados", "[X] años en el mercado", "[X] clientes satisfechos", "[X] zonas de Bogotá". (3) Badge de garantía: "Garantía de satisfacción — si no estás feliz, regresamos sin costo". Similar a Serviclean "200% satisfacción" pero menos agresivo. (4) Iconos de certificaciones si aplica: INVIMA, EPA, ISO, etc. (5) CS: no inventar números falsos — usar datos reales o rangos conservadores. Si no hay datos, usar "100+ hogares atendidos en Bogotá". Implementación: CSS grid de stats + iconos + badge garantía. Esfuerzo: S (2-3h). Agente: Frontend. |
| **Impacto esperado** | Aumenta credibilidad early in the journey, reduce bounce rate, diferenciación visible sobre competidores |
| **Esfuerzo** | S (2-3 horas) |
| **Agente recomendado** | Frontend |
| **Referencias** | [3] Serviclean stats — https://serviclean.co/ [4] Trust signals ecommerce — https://baymard.com/lists/design-patterns-for-trust-signals |
| **Estado** | Fundamentada — propuesta genuinamente nueva (R1-R73 no propusieron stats de empresa visibles) |

---

### Propuesta 3: Precios Claros por Tipo de Servicio — Transparenciación de Costos

| Campo | Detalle |
|-------|---------|
| **Título** | Implementar tabla de precios clara para servicios estándar |
| **Problema** | Purity tiene un cotizador interactivo pero no muestra precios de referencia. Limpio muestra "$100.000 x 4 horas" y "$140.000 x 8 horas" en su homepage. El usuario sin tiempo para cotizar abandona. |
| **Descripción** | **Pricing Transparency Section:** (1) Nueva sección `#precios` con tabla de precios base: "Limpieza básica por hora: desde $XX.XXX/hora", "Limpieza profunda: desde $XX.XXX", "Sanitización: desde $XX.XXX". (2) Disclaimer: "Precio final depende de metros cuadrados, tipo de mueble y condición. Cotiza gratis en 2 minutos." (3) vs: comparación con "limpiador informal" highlight el valor de profesional: "Seguro contra daños, productos certificados, resultado garantizado". (4) En booking form: mostrar "Precio estimado: $80.000 - $150.000 según el servicio" antes de填 form. (5) Mobile: pricing cards colapsables. Implementación: pricing section + CSS cards + disclaimer + pre-cotizador en hero. Esfuerzo: S (3h). Agente: Frontend. |
| **Impacto esperado** | Reduce abandono por incertidumbre de precio, incrementa conversion, compite directamente con Limpio |
| **Esfuerzo** | S (3 horas) |
| **Agente recomendado** | Frontend |
| **Referencias** | [5] Limpio pricing por hora — https://limpio.com.co/limpieza/aseo-y-desinfeccion/ [6] Service pricing transparency — https://www.servicehub.com/pricing-transparency/ |
| **Estado** | Fundamentada — propuesta nueva, pricing transparency no fue propuesta en R1-R73 |

---

### Propuesta 4: Página "Cómo Funciona" — Reducir Fricción de Primera Visita

| Campo | Detalle |
|-------|---------|
| **Título** | Implementar sección "Cómo Funciona" en 4 pasos visuales |
| **Problema** | Limpio tiene "Personaliza → Cotiza → Agenda → Disfruta" en su homepage. Serviclean tiene "Reserva fácil → Seguro y confianza → Personal experimentado → 200% Satisfacción". Purity no tiene ningún flujo visual de cómo funciona el servicio. El usuario que llega por primera vez no sabe qué esperar. |
| **Descripción** | **Cómo Funciona Section:** (1) Nueva sección `#como-funciona` con 4 pasos ilustrados: "1. Cotiza tu servicio", "2. Confirmamos disponibilidad", "3. Llegamos a tu puerta", "4. Disfruta de un hogar limpio". (2) Iconos para cada paso (Font Awesome). (3) Tiempo estimado: "El proceso de cotización toma menos de 2 minutos". (4) CTAs integrados: "Cotizar ahora" → scroll a booking form. (5) Mobile: vertical cards con números. (6) Dark mode compatible. Implementación: section HTML + CSS grid para pasos + iconos + CTAs. Esfuerzo: S (2h). Agente: Frontend. |
| **Impacto esperado** | Reduce anxiety del usuario nuevo, aumenta comprensión del valor,走路 del booking form |
| **Esfuerzo** | S (2 horas) |
| **Agente recomendado** | Frontend |
| **Referencias** | [7] Limpio cómo funciona — https://limpio.com.co/ [8] User flow clarity — https://uxdesign.cc/ |
| **Estado** | Fundamentada — "cómo funciona" no fue propuesto en R1-R73 |

---

### Propuesta 5: Floating WhatsApp Chat — Siempre Visible en Todas las Páginas

| Campo | Detalle |
|-------|---------|
| **Título** | Implementar widget flotante de WhatsApp visible en todas las páginas sin desplazamiento |
| **Problema** | En Purity, el botón WhatsApp está en header o al final. En mobile, después de scroll, el usuario pierde acceso al canal de conversión. Limpio tiene chat flotante siempre visible. |
| **Descripción** | **Floating WhatsApp Widget:** (1) Crear `#whatsapp-floating` con `position: fixed; bottom: 20px; right: 20px;`. (2) Mostrar después de 10% de scroll (no en hero para evitar obstrucción). (3) Icono de WhatsApp + texto "¿Necesitas ayuda?" o el saludo segun hora del día (`WHATSAPP_CONFIG.saludoPorHora`). (4) Animación de entrada: slide-up con ease-out. (5) En zonas pages: pre-filled con mensaje de la zona (`WHATSAPP_CONFIG.zonas`). (6) Mobile: 56px FAB. Desktop: botón más grande con icono. (7) Solo aparece una vez por sesión (localStorage). Implementación: widget HTML/CSS/JS + integration con `WHATSAPP_CONFIG`. Esfuerzo: S (2h). Agente: Frontend. |
| **Impacto esperado** | Canal de comunicación siempre accesible, incremento en conversiones desde mobile |
| **Esfuerzo** | S (2 horas) |
| **Agente recomendado** | Frontend |
| **Referencias** | [9] WhatsApp floating button — https://business.whatsapp.com/features |
| **Estado** | Fundamentada — widget flotante propuesto parcialmente en R64 pero nunca implementado |

---

### Propuesta 6: Corporate/B2B Trust Hub — Página para Clientes Empresariales

| Campo | Detalle |
|-------|---------|
| **Título** | Crear página `/corporativos.html` para clientes B2B con SLAs y casos de éxito |
| **Problema** | Purity no tiene página dedicada para clientes corporativos. Serviclean menciona "limpieza empresarial" pero sin page B2B dedicada. Purity tiene reviews de empresas (Administración Nova PYME, Coordinación Grupo Altura) pero no capitaliza esto. |
| **Descripción** | **Corporate Hub Page:** (1) Nueva página `corporativos.html`. (2) Hero: "Soluciones de limpieza para empresas en Bogotá — Contratos mensuales, SLAs garantizados, personal certificado". (3) Services B2B: "Limpieza de oficinas", "Mantenimiento de áreas comunes", "Limpieza post-obra", "Sanitización periódica". (4) Trust indicators: mostrar logos de clientes reales (con permiso) o nombres: "Administración Nova PYME", "Coordinación Grupo Altura". Stats: "# empleados atendidos", "mts² limpiados", "% retención". (5) SLA section: "Nuestro compromiso: respuesta en menos de 4h, reemplazo de personal en menos de 24h, garantía de satisfacción". (6) B2B contact form: empresa, NIT, número de empleados, frecuencia deseada → Formspree. (7) WhatsApp B2B: "Hable con un asesor corporativo" con pre-filled message. Implementación: new page + B2B cards + form + schema markup. Esfuerzo: M (4-5h). Agente: Frontend + Content. |
| **Impacto esperado** | Conversión B2B, contratos recurrentes, diferenciación de mercado |
| **Esfuerzo** | M (4-5 horas) |
| **Agente recomendado** | Frontend + Content |
| **Referencias** | [10] B2B service page examples — https://www.hubspot.com/b2b-service-page-examples |
| **Estado** | Fundamentada — R73 propuso Corporate Trust Hub pero no fue priorizado/implementado |

---

## Orden de Implementación Recomendado

| # | Propuesta | Impacto | Esfuerzo | Prioridad |
|---|-----------|---------|----------|-----------|
| 1 | Modelo de Servicio Transparente | Trust / Credibilidad | S (3h) | **Alta** — resuelve ambigüedad crítica |
| 2 | Trust Stats + Garantía | Trust / Credibilidad | S (2-3h) | **Alta** — credibilidad instantánea |
| 3 | Floating WhatsApp Widget | Conversion | S (2h) | **Alta** — canal siempre abierto |
| 4 | Precios Claros por Servicio | Conversion | S (3h) | **Alta** — compite con Limpio |
| 5 | Cómo Funciona (4 pasos) | UX / Friction | S (2h) | **Media** — reduce ansiedad nueva |
| 6 | Corporate/B2B Hub | B2B Revenue | M (4-5h) | **Media** — nuevo segmento |

**Top 3 inmediatos (sinergia):** 1 + 2 + 3 = Credibilidad + Stats + Canal abierto = trifecta de trust en mobile.

---

## R74 en el Contexto de R73

R73 se enfocó en mecanismos de conversión (social proof bar, urgency engine, sticky CTAs). R74 se enfoca en **credibilidad institucional base** que debe existir antes de que los mecanismos de conversión funcionen:

| Dimensión | R73 | R74 |
|-----------|-----|-----|
| **Enfoque** | Micro-conversiones y urgencia | Credibilidad institucional y transparencia |
| **Tipo** | Mecanismos de conversión | Fundamentos de confianza |
| **Complejidad** | S a M | S a M |
| **Diferenciación** | Compite en urgencia y social proof | Compite en legitimidad y transparencia |
| **Competitor gap** | Limpio tiene urgency, Purity no | Limpio tiene modelo claro, Purity no |

---

## Fuentes

[1] Limpio. "Servicio de Limpieza de Hogar." https://limpio.com.co/limpieza/aseo-y-desinfeccion/servicio-limpieza-de-hogar/
[2] Serviclean. "Nosotros." https://serviclean.co/nosotros/
[3] Serviclean. Homepage stats. https://serviclean.co/
[4] Baymard Institute. "Design Patterns for Trust Signals." https://baymard.com/lists/design-patterns-for-trust-signals
[5] Limpio. "Limpieza por turnos." https://limpio.com.co/
[6] ServiceHub. "Pricing Transparency for Services." https://www.servicehub.com/pricing-transparency/
[7] Limpio. "Cómo funciona." https://limpio.com.co/
[8] UX Design. "User Flow Clarity." https://uxdesign.cc/
[9] WhatsApp Business. "Floating Button Feature." https://business.whatsapp.com/features
[10] HubSpot. "B2B Service Page Examples." https://www.hubspot.com/b2b-service-page-examples

---

*Documento generado por Innovation Scout — Round 74*
*Purity & Clean Analysis — 2026-04-28*
*Co-Authored-By: Paperclip <noreply@paperclip.ing>*