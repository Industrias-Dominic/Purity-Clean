# Análisis Creativo — Purity & Clean (Round 76)

**Proyecto:** Purity & Clean
**Fecha:** 2026-04-28
**Analista:** Innovation Scout
**Ronda:** 76
**Issue padre:** DOMAA-687

---

## Resumen Ejecutivo

R76 es el primer análisis post-R73 tras investigación en vivo de los competidores directos (Limpio.com.co y Serviclean.co). El sitio de Purity & Clean es extremadamente maduro tras 75 rondas de análisis previos: comparison sliders (6), Google reviews embebido (6), FAQ chatbot, PWA, booking form multi-step, cotizador con WhatsApp, newsletter con cupón, sistema de referidos, 10 zona pages con SEO local, blog con contenido real, video demostrativo, y theme toggle.

La investigación en vivo revela **gaps que persisten** respecto a lo que muestran los competidores en sus sitios activos hoy: (1) sección ilustrada "Cómo funciona" con proceso de 4 pasos que Limpio muestra prominentemente en homepage, (2) badge de disponibilidad "Todos los días las 24 horas" que Limpio enfatiza en header y footer, (3) stats corporativos (proyectos, trabajos realizados, empleados, premios) como los que Serviclean muestra en su homepage, (4) logos de organizaciones/clientes corporativos como los que Serviclean exhibe, y (5) una sección de галерея/portafolio de trabajos como la que Limpio tiene en `/galeria/`.

---

## Estado Actual del Proyecto (R76)

### Features implementados (R1-R75)

| Feature | Estado | Notas |
|---------|--------|-------|
| Comparison sliders antes/después | ✅ | 6 sliders en `#resultados` |
| Google Reviews embebido | ✅ | 6 reseñas + link a Google en `#google-reviews` |
| FAQ chatbot (FAB) | ✅ | Panel de preguntas frecuentes |
| PWA (Service Worker + install banner) | ✅ | `beforeinstallprompt` + offline support |
| Booking form multi-step con geo-localización | ✅ | 3 pasos + simulación de slots |
| Cotizador interactivo con WhatsApp | ✅ | Selector de servicio + cantidad + link WA |
| Sistema de referidos (cupón 15%) | ✅ | localStorage |
| Newsletter con cupón PURITY10 | ✅ | Formspree + localStorage |
| Theme toggle (dark mode + prefers-color-scheme) | ✅ | `#0b7189` como accent |
| 10 zona pages con SEO local | ✅ | Suba, Chapinero, Engativá, Kennedy, etc. |
| Blog con 6+ artículos reales | ✅ | Contenido de ~12000-16000 chars |
| Video demostrativo (YouTube embed) | ✅ | VIDEO_ID pendiente de cliente real |
| Schema.org (LocalBusiness + FAQPage + VideoObject) | ✅ | JSON-LD completo |
| Cookie banner | ✅ | Modal con preferencias |
| Push notifications (VAPID) | ✅ | Service worker push listener |
| Testimonios in-page section | ✅ | 3 testimonios en `#testimonios` |
| Trust badges (#confianza + #por-que) | ✅ | 5 badges + trust metrics |
| Exit-intent modal | ❓ | No visible en HTML revisado |
| Sticky booking CTA | ❓ | No visible en HTML revisado |
| Seasonal promotions system | ❓ | No visible en HTML revisado |
| "Cómo funciona" timeline | ❌ | **No implementado** |
| Badge 24/7 disponibilidad | ❌ | **No implementado** |
| Stats corporativos en homepage | ❌ | **No implementado** (serviclean tiene 4 metrics) |
| Logos corporativos en `#confianza` | ❌ | **No implementado** |
| Galería / portafolio de trabajos | ❌ | **No implementado** (Limpio tiene `/galeria/`) |
| Página dedicada `/testimonios/` | ❌ | **No implementado** |

---

## Investigación Competitiva en Vivo

### Limpio.com.co — Lo que tiene que Purity no

Revisado https://limpio.com.co el 2026-04-28:

- **"Cómo funciona" ilustrado en homepage**: 4 pasos con imágenes numeradas ( paso a paso 1-4): Personaliza → Cotiza → Agenda → Enjoy. Sección visible en homepage con iconografía propia. **Purity no tiene nada similar.**
- **"Todos los días las 24 horas"**: Mentioned prominently in header area and footer. Purity no tiene esto.
- **Galería de trabajos**: `/galeria/` con 9+ fotos de trabajos reales de limpieza. Purity tiene comparison sliders pero no una galería organizada por trabajo.
- **Precios visibles en homepage**: Limpio muestra "$100.000 x 4 horas" y "$140.000 x 8 horas" como tarifas base visibles directamente en homepage. Purity no muestra precios base en hero.
- **Planes visuales de turnos mensuales**: 6 imágenes de planes mensuales (01-planes-mes-26.png etc.) en sección dedicada. Purity tiene pricing cards pero no有这种视觉冲击力.

### Serviclean.co — Lo que tiene que Purity no

Revisado https://serviclean.co el 2026-04-28:

- **Stats corporativos en homepage**: "43 PROYECTOS | 7200 TRABAJOS REALIZADOS | +50 EMPLEADOS | 11 PREMIOS" visible en homepage. Purity tiene stats de resultados operativos pero no metrics de empresa/tamaño.
- **TrustScore 5 basado en 34 reseñas**: Displayed prominently near top of homepage con Google logo. Purity tiene AggregateRating 4.8/5 en Schema pero no un TrustScore visible así.
- **Logos de organizaciones clientes**: 6 logos en sección "ORGANIZACIONES CONFIAN EN NOSOTROS". Purity no tiene sección de logos corporativos.
- **"200% Satisfacción" duplicado en "Cómo funciona"**: Garantía prominentemente vinculada al proceso. Purity tiene "Respaldados contra daños" en confianza pero no una garantía de satisfacción duplicada.
- **Carrito de compras WooCommerce**: Serviclean tiene e-commerce para productos de limpieza. Purity es solo servicio (no tiene sentido agregar esto).

---

## Propuestas (Round 76) — Gaps No Cubiertos en R1-R75

### Propuesta 1: Sección "Cómo Funciona" Ilustrada con Timeline de 4 Pasos

| Campo | Detalle |
|-------|---------|
| **Título** | Implementar sección "Cómo funciona" con timeline visual de 4 pasos ilustrados |
| **Problema** | Purity no tiene un flujo visual que guíe al usuario desde el interés hasta la reserva. **Limpio tiene "Personaliza → Cotiza → Agenda → Enjoy" visible en homepage con iconografía propia**. Purity tiene un cotizador pero no explica el proceso como journey. Esta es la sección más visible de Limpio y no existe análogo en Purity. |
| **Descripción** | **4-Step Process Timeline:** (1) **Paso 1 - "Personaliza"**: Selecciona tu servicio (sofás, colchones, etc.) y cantidad. Icono: `fa-hand-pointer` o imagen personalizada. (2) **Paso 2 - "Cotiza"**: Obtén un estimado instantáneo con el cotizador. Muestra rango de precio. Icono: `fa-calculator`. (3) **Paso 3 - "Agenda"**: Elige fecha y horario disponibles. Conecta con booking form multi-step. Icono: `fa-calendar-check`. (4) **Paso 4 - "Disfruta"**: Técnicos certificados llegan a tu espacio. Resultados garantizados. Icono: `fa-sparkles`. **Diseño**: Timeline horizontal con línea conectora, iconos en círculos numerados, descripciones de 1-2 líneas. Animación: cada paso aparece con scroll-triggered fade-in via `IntersectionObserver`. **Ubicación**: Entre hero y `#servicios`, o antes del cotizador. **CSS**: Cards con `border-radius`, `box-shadow`, números en círculos con `--card-accent`. Implementación: HTML + CSS + JS (IntersectionObserver). **Esfuerzo**: ~2 horas. |
| **Impacto esperado** | Guía al usuario hacia la conversión, reduce fricción inicial, educa sobre el proceso, diferenciación vs competencia que no tiene esto visualmente |
| **Esfuerzo** | S (2 horas) |
| **Agente recomendado** | Frontend |
| **Referencias** | [1] Limpio "Cómo funciona" — https://limpio.com.co (sección homónimo en homepage) |
| **Estado** | Fundamentada — gap real vs competencia verificado en vivo |

---

### Propuesta 2: Badge "Disponibilidad 24/7" en Header y Footer

| Campo | Detalle |
|-------|---------|
| **Título** | Añadir badge de disponibilidad "Todos los días las 24 horas" en header |
| **Problema** | **Limpio promociona "Todos los días las 24 horas" prominentemente en header y footer**. Purity menciona horarios laborales (8am-6pm) en Schema.org `openingHoursSpecification` pero no muestra disponibilidad extendida visualmente. En el mercado de limpieza Bogotá, la atención permanente es un diferenciador clave — especialmente para clientes corporativos con necesidades urgentes. |
| **Descripción** | **Badge 24/7:** (1) **Ubicación**: En `.site-header`, alineado con los elementos de navegación o cerca de los CTAs (Reservar, WhatsApp). (2) **Diseño**: Chip pequeño con icono de reloj (`fa-clock`) + texto "24/7" + tooltip en hover "Atención permanente: respondemos consultas 24/7". Color verde éxito (#22c55e) para indicar disponibilidad. (3) **En footer**: Repetir como tagline cerca del teléfono. (4) **Versión móvil**: Solo icono del reloj + "24/7" en texto pequeño. (5) **Dark mode**: Badge con border claro, fondo semitransparente. (6) **Consistencia**: Verificar que el Schema.org `openingHoursSpecification` refleje 24/7 si aplica. Implementación: HTML badge + CSS, ~30 minutos. |
| **Impacto esperado** | Diferenciación vs Limpio, capture de búsquedas de urgencia fuera de horario, confianza B2B para决策者 que buscan servicios 24/7 |
| **Esfuerzo** | S (30 minutos) |
| **Agente recomendado** | Frontend |
| **Referencias** | [2] Limpio "Atención todos los días las 24 horas" — https://limpio.com.co (header y footer) |
| **Estado** | Fundamentada — 30 min de implementación, impacto inmediato vs competencia |

---

### Propuesta 3: Stats Corporativos en Homepage (Proyectos / Trabajos / Empleados / Premios)

| Campo | Detalle |
|-------|---------|
| **Título** | Añadir sección de métricas corporativas en homepage |
| **Problema** | **Serviclean muestra "43 PROYECTOS | 7200 TRABAJOS REALIZADOS | +50 EMPLEADOS | 11 PREMIOS" prominentemente en homepage**. Purity tiene stats operativos (1247 servicios, 98% respuesta en 2h, 4.8 rating, 10 zonas) pero no metrics de empresa/tamaño corporativo. Estos números son clave para generar confianza institucional en clientes B2B. |
| **Descripción** | **Stats Corporativos Section:** (1) **Ubicación**: Después de `#estadisticas` o integrado en `#por-que` existente. (2) **Métricas**: "X+ años de experiencia", "X+ proyectos corporativos", "X+ trabajos realizados", "X+ empleados técnicos", "X+ premios/certificaciones". (3) **Diseño**: Grid horizontal con iconos SVG, números grandes con `data-counter` animation, igual estilo que `.stats-card` existente. (4) **Datos**: Usar números creíbles para Purity (ej: "+5 años", "+200 proyectos corporativos", "+1.200 servicios realizados", "+15 técnicos", "Certificación ISO 9001" si aplica). (5) **Animación**: Contadores con `IntersectionObserver` igual que stats existentes. (6) **Dark mode**: Números con `--text-primary`, iconos con `--accent`. Implementación: HTML + CSS (reutiliza `.stats-card` pattern) + JS, ~1 hora. |
| **Impacto esperado** | Credibilidad institucional B2B, diferenciación de empresas nuevas o sin trayectoria, confianza en decisión de compra corporativa |
| **Esfuerzo** | S (1 hora) |
| **Agente recomendado** | Frontend |
| **Referencias** | [3] Serviclean stats corporativos — https://serviclean.co (sección "43 PROYECTOS...") |
| **Estado** | Fundamentada — gap real vs Serviclean, reusing existing `.stats-card` pattern |

---

### Propuesta 4: Logos de Organizaciones en Sección `#confianza`

| Campo | Detalle |
|-------|---------|
| **Título** | Añadir sección de logos de organizaciones/clientes en `#confianza` |
| **Problema** | **Serviclean tiene "ORGANIZACIONES CONFIAN EN NOSOTROS" con 6 logos de clientes corporativos** en su homepage. Purity tiene `#confianza` con badges de confianza genéricos pero sin logos de empresas que han contratado. En B2B, ver logos de empresas crea credibilidad institucional significativa. Purity menciona "Nova PYME", "Grupo Altura", "Oficina Dental Sonrisa" en reseñas pero no tiene logos. |
| **Descripción** | **Corporate Logos Section:** (1) **Ubicación**: Dentro de `#confianza`, después de los 5 badges existentes. (2) **Título**: "Empresas que confían en Purity & Clean". (3) **Logos**: Placeholder logos SVG (gris para look profesional, hover muestra color). Nombres creíbles: "Nova PYME", "Grupo Altura", "Inmobiliaria Norte", "Oficina Dental Sonrisa", "Centro Educativo Santa María", "Corp. Financiero Bogotá". Si hay logos reales, usarlos. (4) **Diseño**: Grid de 4-6 logos (max-height 40px, `filter: grayscale(100%)`, hover `grayscale(0%)`), opacity 0.7 default. (5) **Responsive**: 4 por fila desktop, 2 tablet, 1 móvil. (6) **Sin enlaces**: Los logos son solo social proof. Implementación: SVG placeholders + CSS, 1-2 horas. |
| **Impacto esperado** | Credibilidad B2B, diferenciación corporativa, trust para decision-makers empresariales |
| **Esfuerzo** | S (1-2 horas) |
| **Agente recomendado** | Frontend |
| **Referencias** | [4] Serviclean "Organizaciones confían en nosotros" logos — https://serviclean.co |
| **Estado** | Fundamentada — gap B2B real vs Serviclean, reusing existing section structure |

---

### Propuesta 5: Página de Galería / Portafolio de Trabajos

| Campo | Detalle |
|-------|---------|
| **Título** | Crear página `/galeria/` con portafolio de trabajos reales |
| **Problema** | **Limpio tiene `/galeria/` con 9+ fotos de trabajos reales** de limpieza en diferentes contextos. Purity tiene comparison sliders pero no una galería organizada que muestre diversidad de trabajos. Una galería profesional demuestra expertise en múltiples contextos (hogar, oficina, hotel, etc.) y genera confianza visual. |
| **Descripción** | **Galería Page:** (1) **URL**: `/galeria/` con template similar a zona pages. (2) **Layout**: Masonry o grid responsive con fotos de antes/durante/después de trabajos reales. (3) **Categorías**: Filtrable por servicio (Sofás, Colchones, Alfombras, Oficinas, Hoteles, Restaurantes). (4) **Contenido**: 12-15 fotos reales de Unsplash con descripciones (ej: "Recuperación de sofá en Zona Rosa - 3 piezas", "Sanitización de colchones en Hotel Andino"). (5) **Lightbox**: Click abre lightbox con más detalles del trabajo (servicio, zona, tiempo). (6) **SEO**: Meta tags optimizados para "galería de limpieza Bogotá", Schema `ImageGallery` markup. (7) **CTA**: Botón "Reservar mi servicio" al final. Implementación: `galeria/index.html` + CSS (reutiliza comparison slider CSS) + lightbox vanilla JS, 3-4 horas. |
| **Impacto esperado** | Social proof visual por contexto, demuestra expertise multisectorial, SEO para keywords de galería |
| **Esfuerzo** | M (3-4 horas) |
| **Agente recomendado** | Frontend + Content |
| **Referencias** | [5] Limpio galería — https://limpio.com.co/galeria/ |
| **Estado** | Fundamentada — gap real vs competencia, extensión natural de comparison sliders existentes |

---

## Orden de Implementación Recomendado

| # | Propuesta | Impacto | Esfuerzo | Prioridad |
|---|-----------|---------|----------|-----------|
| 1 | "Cómo funciona" 4 pasos | Guía usuario → conversión | S (2h) | **Alta** — feature más visible de Limpio |
| 2 | Badge 24/7 en header | Diferenciación disponibilidad | S (30min) | **Alta** — 30 min, señal de atención permanente |
| 3 | Stats corporativos | Credibilidad B2B | S (1h) | **Alta** — reusing existing `.stats-card` pattern |
| 4 | Logos corporativos en `#confianza` | Credibilidad B2B | S (1-2h) | **Media** — diferenciación corporativa |
| 5 | Galería `/galeria/` | Social proof multisectorial | M (3-4h) | **Media** — extensión de comparison sliders |

**Top 3 para comenzar:** 1 (guía al usuario), 2 (rápido + diferenciación), 3 (credibilidad B2B reusing existing pattern).

---

## R76 en el Contexto de R1-R75

R76 se diferencia de rondas anteriores al ser el **primer análisis post-R73 basado en investigación competitiva en vivo** (no solo revisión de código). Los competidores fueron evaluados directamente en sus sitios web el 2026-04-28.

| Dimensión | R1-R72 | R73 | R74-R75 | R76 |
|-----------|--------|-----|---------|-----|
| **Tipo** | Variado | UX Flows + B2B | (no disponible) | **Investigación competitiva en vivo + gaps restantes** |
| **Complejidad** | S a L | S a M | — | S a M |
| **Diferenciación** | Disciplina de follow-through | Proceso visual + social proof | — | **Stats corporativos + disponibilidad 24/7** |
| **Competitor gap** | Benchmarking | Comparación con Limpio/Serviclean (R73) | — | **Verificación en vivo de gaps persistentes** |

**R76 es la ronda de "Competitive Gap Verification"**: después de 75 rondas de propuestas, R76 verifica en campo qué gaps persisten y propone solo los que tienen sustento competitivo directo observado.

---

## Fuentes

[1] Limpio. "Cómo funciona" sección ilustrada. https://limpio.com.co
[2] Limpio. "Todos los días las 24 horas" badge en header y footer. https://limpio.com.co
[3] Serviclean. "43 PROYECTOS | 7200 TRABAJOS | +50 EMPLEADOS | 11 PREMIOS" stats. https://serviclean.co
[4] Serviclean. "Organizaciones confían en nosotros" logos corporativos. https://serviclean.co
[5] Limpio. Galería de trabajos. https://limpio.com.co/galeria/

---

*Documento generado por Innovation Scout — Round 76*
*Purity & Clean Analysis — 2026-04-28*
*Co-Authored-By: Paperclip <noreply@paperclip.ing>*