# Análisis Creativo — Purity & Clean (Round 82)

**Proyecto:** Purity & Clean
**Fecha:** 2026-04-28
**Analista:** Innovation Scout
**Ronda:** 82
**Issue padre:** DOMAA-760

---

## Resumen Ejecutivo

R82 se diferencia de R81 en que **R81 auditó features ya implementados vs no implementados** y propuso cosas técnicas (security headers, DRY zonas). R82 se enfoca en **lo que los competidores tienen que nosotros no** después de investigar Serviclean.co y Limpio.com.co en vivo:

- **Limpio.com.co**: precios claros por horas ($100K x 4h, $140K x 8h), página "Trabaja con nosotros", atención 24/7 visible, planes mensuales, galería de trabajos real
- **Serviclean.co**: años de experiencia (8+), logos de clientes corporativos, testimonios con fotos, booking integrado, TrustScore de Google visible

Las 5 propuestas de R82 apuntan a **cerrar la brecha con competidores** en trust, precios transparentes, y captación de talento.

---

## Auditoría Rápida — Qué Tiene Purity vs Competidores

| Feature | Purity & Clean | Limpio.com.co | Serviclean.co |
|---------|---------------|---------------|---------------|
| **Precios claros por hora** | ❌ Solo rangos | ✅ $100K x 4h, $140K x 8h | ❌ Solo "Cotizar" |
| **Años de experiencia** | ⚠️ En Schema.org | ✅ "25 años" | ✅ "8 años" (homepage) |
| **Galería de trabajos reales** | ❌ No tiene | ✅ 9 fotos en homepage | ❌ No visible |
| **Testimonios con fotos** | ⚠️ Solo texto | ✅ Testimonios page | ✅ TrustScore visible |
| **Trabaja con nosotros** | ❌ No existe | ✅ Página dedicada | ❌ No visible |
| **Atención 24/7** | ⚠️ Solo WhatsApp | ✅ "Los 7 días 24h" | ⚠️ Solo app |
| **Planes mensuales** | ⚠️ Cotizador | ✅ "Planes de turnos x mes" | ❌ No |
| **Logos clientes corporativos** | ❌ No tiene | ❌ No visible | ✅ 6+ logos |
| **Booking integrado** | ⚠️ Formspree multi-step | ✅ WhatsApp directo | ✅ WhatsApp directo |
| **Dirección física visible** | ⚠️ Solo en Schema.org | ✅ Footer con dirección | ❌ Solo teléfono |

---

## Propuestas R82 (Gaps vs Competidores)

### Propuesta 1: Sección de Precios por Horas tipo Limpio

| Campo | Detalle |
|-------|---------|
| **Título** | Añadir tabla de precios por hora/turno como Limpio ($100K x 4h, $140K x 8h) |
| **Problema** | Purity solo muestra rangos ($80K-$180K por sofá). Limpio muestra precios específicos por turno: "$100.000 por 4 horas, $140.000 por 8 horas". Los usuarios que quieren precio rápido no tienen referencia concreta. |
| **Descripción** | **Nueva sección `#pricing-turnos` después de `#pricing`:** 1. **Header**: "Planes de limpieza por turnos" con eyebrow "Tarifas transparentes" 2. **2-3 Pricing Cards**: - "Turno de 4 horas": $100.000 — ideal para mantenimiento mensual - "Turno de 8 horas": $140.000 — limpieza profunda completa - "Plan Mensual (4 turnos)": $360.000 — 10% off vs individuales 3. **Incluye**: materiales, productos, mano de obra. No hay costos ocultos. 4. **CTA**: "Reservar turno" → `#reservas` pre-selecciona servicio. 5. **Schema**: `Offer` para cada plan con `priceSpecification`. 6. **Mobile**: cards apiladas verticalmente. **Diferenciación vs Limpio**: Los precios de Purity son para servicios especializados (sofás, colchones), no limpieza general. Aclarar en copy: "Nuestros turnos incluyen limpieza profunda de áreas comunes + servicio especializado 선택". |
| **Impacto esperado** | Reducción de friction para usuarios que quieren precio rápido, captación de leads que van a Limpio por precios claros |
| **Esfuerzo** | S (2-3 horas — nueva sección + cards + schema) |
| **Agente recomendado** | Frontend |
| **Referencias** | [1] Limpio.com.co — sección "Limpieza por turnos" [2] Pricing psychology — precios redondos vs exactos |

---

### Propuesta 2: Sección "Trabaja con Nosotros" como Limpio

| Campo | Detalle |
|-------|---------|
| **Título** | Crear página `/empleo.html` o sección "Trabaja con nosotros" |
| **Problema** | Limpio tiene `[Trabaja con nosotros](https://limpio.com.co/oferta-de-empleo/)` prominente en el nav. Purity no tiene nada para capturar visitantes que buscan empleo en limpieza. En Bogotá el mercado laboral de limpieza es grande — perder estos leads es perder reach. |
| **Descripción** | **Opción A: Nueva página `empleo.html`** (recomendado para SEO local) 1. **Header**: "Trabaja con Purity & Clean — Únete al equipo de limpieza líder en Bogotá" 2. **Por qué elegirnos**: 8+ años en el mercado,training certificado, ambiente de trabajo estable 3. **Requisitos comunes**: disponibilidad de horarios, vehículo propio (opcional), experiencia en limpieza de muebles 4. **Formulario**: nombre, teléfono, zona de residencia, disponibilidad, experiencia previa. Envío a Formspree. 5. **CTA WhatsApp**: "O llama directo al +57 300 123 4567" 6. **SEO**: meta tags, Schema `JobPosting` con requisitos y ubicación **Opción B: Sección en index.html** (más rápido) Crear `#empleo` section después de `#testimonials` con resumen y link a "Ver todas las vacantes" → page o Formspree. |
| **Impacto esperado** | Captación de leads de empleo, mejora de SEO local ("trabajo limpieza Bogotá"), diferenciación vs competidores que no tienen empleo visible |
| **Esfuerzo** | S (2-3 horas — página o sección) |
| **Agente recomendado** | Frontend + Content |
| **Referencias** | [3] Limpio empleo page — https://limpio.com.co/oferta-de-empleo/ |

---

### Propuesta 3: Exhibir Años de Experiencia en Homepage (como Serviclean)

| Campo | Detalle |
|-------|---------|
| **Título** | Crear badge/ticker "8+ años de experiencia" prominente en hero |
| **Problema** | Serviclean dice "Los mejores precios en limpieza durante 8 años consecutivos" en homepage. Purity tiene 4.8/5 rating y 127 reviews pero no dice hace cuánto existe. Experiencia = trust. |
| **Descripción** | **En el hero section, añadir ticker o badge:** ```html <div class="hero-experience-badge"> <i class="fa-solid fa-award" aria-hidden="true"></i> <span>8+ años de experiencia</span> </div> ``` **Posición**: después del h1, antes del subtitle. **Estilo**: fondo semi-transparente, borde sutil, icono de trophy/award. **CSS existente**: el badge puede usar `--color-primary` y estilo consistente con trust badges. **Alternativa**: si los años de experiencia no están verificados, usar "127 reseñas verificadas" o "850+ clientes serviced" como trust metric alternativo. |
| **Impacto esperado** | Trust inmediato para visitantes novos, diferenciación vs nuevos entrants al mercado |
| **Esfuerzo** | S (30 min — HTML y CSS del badge) |
| **Agente recomendado** | Frontend |
| **Referencias** | [4] Serviclean homepage — "8 años consecutivos" |

---

### Propuesta 4: Galería de Trabajos Real (Como Limpio - 9 Fotos)

| Campo | Detalle |
|-------|---------|
| **Título** | Crear sección de galería "Antes y Después" con fotos reales |
| **Problema** | Limpio tiene una sección "Galería de trabajos realizados" con 9 fotos de antes/después en homepage. Purity no tiene fotos reales de trabajos — solo imágenes de stock o placeholder. Galería de trabajos = prueba social visual que convierte. |
| **Descripción** | **Nueva sección `#galeria-trabajos` después de `#testimonials`:** 1. **Grid de 6-9 imágenes**: fotos de before/after de sofás, colchones, alfombras limpiados. Si no hay fotos reales aún, usar placeholders con texto "Foto de [servicio] — próximo agregaremos" y collected photographer. 2. **Lightbox**: al click, ampliar imagen con antes/después slider (usar plugin como `twentytwenty` o vanilla). 3. **Labels**: cada imagen tiene label del servicio: "Limpieza profunda sofá sector Chapinero", "Sanitización colchón Suba", etc. 4. **Lazy loading**: para performance, cargar imágenes con lazy. 5. **Schema**: `ImageGallery` o `Carousel` markup. **Nota de realismo**: Para implementar esta feature se necesitan fotos reales. Suggest al CEO: "Pedir al equipo técnico que tome fotos antes/después en cada servicio durante 2 semanas". |
| **Impacto esperado** | Prueba social visual poderosa, diferenciación vs competencia que solo tiene texto, mejor engagement |
| **Esfuerzo** | M (3-4 horas sin fotos, requiere fotos reales) |
| **Agente recomendado** | Frontend + Content (necesita fotos del equipo) |
| **Referencias** | [5] Limpio gallery — https://limpio.com.co/galeria/ |

---

### Propuesta 5: Indicador "Atención 24/7" en Header y Footer (Como Limpio)

| Campo | Detalle |
|-------|---------|
| **Título** | Añadir badge "24/7" o "Atención todos los días" en header y footer |
| **Problema** | Limpio dice "Todos los días las 24 horas" en su header y footer. Purity no tiene ningún indicador de disponibilidad horaria más allá del Schema.org JSON-LD que no es visible para el usuario. |
| **Descripción** | **En el header (cerca del teléfono o WhatsApp):** ```html <span class="availability-badge"> <i class="fa-solid fa-clock" aria-hidden="true"></i> 24/7 | Lunes a viernes 8am-6pm </span> ``` **En el footer (después de contacto):** ```html <p class="footer-hours"> <i class="fa-regular fa-clock" aria-hidden="true"></i> Atención: Lunes a viernes 8am-6pm | Sábados 8am-1pm | Domingos: solo vía app </p> ``` **Si realmente es 24/7**: cambiar a "Atención 24/7 — Llama o escribe WhatsApp ahora". **Si no es 24/7**: ser honesto y decir horarios reales. La honesty también es trust signal. |
| **Impacto esperado** | Claridad para usuarios fuera de horario, reducción de llamadas fuera de horario, mejor experiencia mobile |
| **Esfuerzo** | S (30 min — HTML y CSS) |
| **Agente recomendado** | Frontend |
| **Referencias** | [6] Limpio header — "Todos los días las 24 horas" |

---

## Orden de Implementación Recomendado R82

| # | Propuesta | Gap Competitivo | Esfuerzo | Prioridad |
|---|-----------|-----------------|----------|-----------|
| 1 | **Precios por turnos** | Limpio tiene precios claros | S (2-3h) | **Alta** — recuperación de leads |
| 2 | **Trabaja con nosotros** | Limpio tiene página empleo | S (2-3h) | **Alta** — reach mercado laboral |
| 3 | **Años de experiencia** | Serviclean lo muestra | S (30min) | **Media** — trust inmediato |
| 4 | **Galería de trabajos** | Limpio tiene fotos reales | M (3-4h + fotos) | **Media** — prueba social visual |
| 5 | **Badge 24/7 / horarios** | Limpio lo muestra | S (30min) | **Media** — claridad horaria |

**Top 2 para implementar esta semana:** Propuestas 1 y 2 (alto impacto en leads + empleo, esfuerzo bajo).

---

## Comparación Visual: Qué Tiene Purity vs Qué Necesita

```
Purity & Clean                    Limpio.com.co                    Serviclean.co
─────────────────────────────────────────────────────────────────────────────
✅ Trust badges con counters       ✅ Precios por turno ($100K/$140K)  ✅ Años de experiencia (8+)
✅ Garantía 200%                   ✅ Trabaja con nosotros             ✅ Logos corporativos
✅ Pricing section con rangos      ✅ Galería de trabajos (9 fotos)   ✅ TrustScore reviews
✅ Chatbot FAQ                     ✅ 24/7 atención                    ✅ Booking integrado
✅ Blog con 6 artículos           ✅ Planes mensuales                 ✅ Stats counters
❌ Sin precios por hora           ✅ Dirección física footer          ❌ Sin badge experiencia
❌ Sin página empleo              ❌ Sin años experiencia             ❌ Sin galería visible
❌ Sin galería fotos              ❌ Sin ratings TrustScore           ❌ Sin página empleo
❌ Sin badge 24/7                 ❌ Sin chatbot                      ❌ Sin prices visibles
```

---

## Nota sobre Propsuestas R81 vs R82

| Tipo | R81 | R82 |
|------|-----|-----|
| **Origen** | Auditoría interna del código | Investigación competitiva en vivo |
| **Foco** | Lo que nunca se implementó (security headers, DRY) | Lo que competidores tienen y nosotros no |
| **Tono** | "Esto se propuso 13 veces y nunca se hizo" | "Competidor tiene X — deberíamos tener X también" |
| **Items repetidos** | Security headers, exit-intent, consent | Solo precios y empleo (nuevos) |

---

## Fuentes

[1] Limpio.com.co — Sección "Limpieza por turnos" (precios por hora) — https://limpio.com.co
[2] Pricing psychology — precios redondos y estrategia de precios
[3] Limpio empleo page — https://limpio.com.co/oferta-de-empleo/
[4] Serviclean.co — Homepage con "8 años de experiencia"
[5] Limpio gallery — https://limpio.com.co/galeria/
[6] Limpio header — "Todos los días las 24 horas"

---

*Documento generado por Innovation Scout — Round 82*
*Purity & Clean Analysis — 2026-04-28*
*Co-Authored-By: Paperclip <noreply@paperclip.ing>*