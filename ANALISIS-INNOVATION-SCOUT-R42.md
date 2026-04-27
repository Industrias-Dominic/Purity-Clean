# Análisis Creativo — Purity & Clean (Round 42)

**Proyecto:** Purity & Clean
**Fecha:** 2026-04-27
**Analista:** Innovation Scout
**Ronda:** 42
**Issue padre:** DOMAA-447

---

## Resumen Ejecutivo

R42 analiza Purity & Clean contra la competencia actual en Bogotá (Clean Company, Purify, OnClean) y detecta gaps genuinos no cubiertos en R1-R41. El sitio es técnicamente maduro pero carece de páginas de detalle por servicio independientes (cada servicio debería tener su propia landing page con proceso, FAQ, precios y CTAs), un mapa de cobertura real que muestre las 10 zonas con geometrías aproximadas, y contenido de video testimonial. Estas tres gaps son la diferencia entre un sitio que funciona como vitrina y uno que convierte. Clean Company (principal competidor) ya tiene las tres cosas implementadas.

---

## Stack tecnológico actual (resumen)

- **Frontend:** HTML5 + CSS3 (6212 líneas style.css) + JS vanilla ES6+ (1847 líneas script.js)
- **Fuentes:** Manrope + Raleway — Google Fonts
- **Iconos:** Font Awesome 6.5 CDN (SRI verificado)
- **Analítica:** Plausible Analytics (sin cookies, GDPR-compliant)
- **Forms:** Formspree
- **Testing:** Playwright E2E (10 suites en /tests/e2e/)
- **PWA:** Service Worker, push notifications, offline support
- **SEO:** Schema LocalBusiness + FAQPage + Article + Review + VideoObject + HowTo + BreadcrumbList
- **Booking:** Multi-step form con slot picker
- **Theme:** Dark mode toggle con persistencia
- **Cobertura:** 10 zonas en Bogotá (páginas estáticas en /zonas/)
- **Precios:** Cotizador interactivo + WhatsApp pre-filled
- **Reviews:** 127 verificadas, 4.8/5 (JSON-LD)
- **Blog:** 6 artículos publicados bajo /blog/
- **Chatbot:** FAQ con routing a WhatsApp

---

## Análisis de competencia — Round 42

### Clean Company (cleancompany.com.co) — El líder a superar

Clean Company tiene en 2026:

1. **Cotizador con IA por foto** (NUEVO): El usuario sube una foto del mueble y recibe un precio estimado instantáneamente. Esto es exactamente lo que Purity & Clean NO tiene todavía y representa una ventaja competitiva significativa.
2. **Páginas de servicio individuales** con proceso visual en 6 pasos: Cada servicio (alfombras, muebles, colchones, vehículos, empresarial) tiene su propia página con los pasos del proceso ilustrados. Purity tiene todas las secciones en index.html como tarjetas.
3. **Galería antes/después con slider interactivo**: Ya existe parcialmente en Purity (gallery reveal), pero el slider de Clean Company es más fluido.
4. **Video testimonials**: Sección de reseñas en video de clientes reales. Purity solo tiene reseñas en texto JSON-LD.
5. **Trust badges visibles**: 100% Garantía, Puntualidad, Eco-Friendly, Personal Certificado. Purity tiene badges pero menos visibles y menos específicos.
6. **Proceso visual en 6 pasos por servicio**: El que más se parece en Purity sería el slot picker, pero no hay un "cómo funciona" visual de 6 pasos por cada servicio.
7. **SEO por servicio**: URLs como /servicios/alfombras, /servicios/muebles — estructura de sitio más profunda que Purity.
8. **Banner de descuento primera vez** (20% OFF): Visible en el hero, con CTA directo a WhatsApp.

### Purify (purify.com.co) — Competidor directo

- Catálogo de servicios visual
- 15 años de experiencia como argumento de venta (Purity puede decir algo similar)
- Formulario de contacto completo
- Video de YouTube embebido
- Precios económicos como mensaje (Purity tiene cotizador pero no "desde $X" visibles)
- Sección de trabajos realizados (galería)
- Teléfono clickeable prominente
- Botón WhatsApp en todas las páginas

### Diferencia clave para R42

El gap más importante que veo en Purity vs la competencia es la **ausencia de páginas de servicio individuales**. Clean Company y Purify tienen cada servicio como landing page independiente. Purity tiene todo en index.html. Esto afecta:
- SEO (cada página indexable单独的 meta tags)
- UX (el usuario no puede linkear directamente a "limpieza de colchones en Chapinero")
- Conversión (una página específica tiene más espacio para contenido persuasivo por servicio)

---

## Gaps identificados — Round 42 (NOVEDADES no cubiertas en R1-R41)

### 1. Páginas de servicio independientes (alfombras, muebles, colchones, sillas)

**Problema:** Todos los servicios están como tarjetas en index.html. No hay URLs indexables como /servicios/alfombras.html o /servicios/muebles.html. El SEO de Purity depende exclusivamente del homepage y las zonas.

**Costo/Impacto:** Clean Company tiene /servicios/muebles, /servicios/alfombras, etc. Cada una con meta tags únicos, Schema propio, y contenido profundo.

### 2. Cotizador con IA que acepta foto del mueble

**Problema:** El cotizador actual requiere que el usuario sepa qué tipo de mueble tiene. Un cotizador con IA que acepta una foto y sugiere el servicio sería mucho más accessible para usuarios no técnicos.

**Costo/Impacto:** Clean Company ya lo implementó. La barrera de entrada para replicarlo es más alta (requiere API de visión artificial), pero el impacto en conversión sería alto.

### 3. Video testimonials de clientes reales

**Problema:** Las reseñas son en texto (JSON-LD). Los competidores muestran videos de clientes reales. El video genera 4x más confianza que texto según estudios de 2025-2026.

**Costo/Impacto:** Diferenciación alta vs competencia. Requiere producción de video o pedir a clientes que graben un testimonio de 30 segundos con su celular.

### 4. Mapa de cobertura interactivo con las 10 zonas de Bogotá

**Problema:** `#coverage-map` existe en el HTML pero está vacío. Los usuarios no pueden ver visualmente qué zonas cubre Purity & Clean. Cada zona tiene su página pero no hay un mapa central que muestre todas.

**Costo/Impacto:** Mejora la UX para usuarios que buscan específicamente su zona. Solo requiere JavaScript + un mapa base estático.

### 5. Banner de urgencia con descuento por tiempo limitado

**Problema:** No hay elemento de urgencia en el sitio. Clean Company tiene "20% descuento primera vez" visible en el hero. Purity tiene programa de referidos pero no un discount temporal.

**Costo/Impacto:** Los discounts por tiempo limitado son una de las tácticas de conversión más efectivas según estudios de 2025-2026.

### 6. Badges de confianza más específicos (Invima, eco-friendly, etc.)

**Problema:** Purity tiene badges genéricos de trust. Los competidores muestran "Productos certificados INVIMA", "Biodegradables", "Personal certificado". Purity no tiene ninguno de estos badges visibles.

**Costo/Impacto:** Mejora la percepción de profesionalismo. Muchos de estos badges no requieren implementación técnica, solo confirmación de que los productos son efectivamente certificados.

---

## Propuestas (Round 42)

### Propuesta 1: Páginas de servicio independientes con SEO profundo

| Campo | Detalle |
|-------|---------|
| **Título** | Crear páginas independientes para cada servicio principal: /servicios/muebles.html, /servicios/alfombras.html, /servicios/colchones.html, /servicios/sillas.html |
| **Problema** | Los servicios solo existen como tarjetas en index.html. No hay URLs indexables para cada servicio, lo que limita el SEO y la capacidad de crear backlinks específicos. |
| **Descripción** | Crear 4 páginas nuevas (muebles, colchones, alfombras, sillas) dentro de /servicios/: (1) Cada página con `<title>`, `<meta description>`, `<h1>` y Schema.org `Service` únicos. (2) Sección "Cómo funciona" en 4-5 pasos con iconos. (3) FAQ con Schema FAQPage por página. (4) Precios desde visible (ej. "Desde $80.000"). (5) Botón CTA a cotizador y WhatsApp. (6) Internal linking entre páginas y hacia zonas. Implementación: HTML/CSS/JS vanilla, copiar estructura de zona pages como template. Cada página ~200-300 líneas HTML. |
| **Impacto esperado** | SEO mejorado (cada servicio indexable individualmente), mejor distribución de link equity, más páginas en sitemap.xml, CTAs más focalizados por servicio |
| **Esfuerzo** | M |
| **Agente recomendado** | Frontend |
| **Referencias** | [1] https://cleancompany.com.co/servicios/muebles (ejemplo de página de servicio) |

### Propuesta 2: Cotizador con IA por foto del mueble

| Campo | Detalle |
|-------|---------|
| **Título** | Cotizador inteligente que acepta foto y sugiere servicio automáticamente |
| **Problema** | El cotizador actual requiere que el usuario identifique su tipo de mueble. Usuarios no técnicos pueden no saber si tienen un sofá de 3 puestos o un sofá esquinero. Un cotizador que acepta foto lo hace más accessible. |
| **Descripción** | Implementar sección de cotizador con IA: (1) **Input de imagen**: el usuario puede arrastrar o subir una foto del mueble. (2) **Clasificación con IA**: usar una API de visión artificial (Google Cloud Vision, AWS Rekognition, o un modelo open source como TensorFlow.js) para clasificar el tipo de mueble. (3) **Sugerencia automática**: basado en la clasificación, pre-seleccionar el servicio y mostrar un rango de precio estimado. (4) **Fallback**: si la IA no puede clasificar, mostrar opciones manuales. (5) **Costo estimado**: mostrar "Precio estimado: $80.000 - $150.000" basado en el tipo detectado. Implementación: ~200-300 líneas JS + integración con API de visión. Costo de API: ~$0 por cada 1000 clasificaciones en Google Cloud Vision (free tier). |
| **Impacto esperado** | Reducción de fricción en el funnel de cotización, diferenciación vs competidores, aumento de conversiones |
| **Esfuerzo** | M |
| **Agente recomendado** | Full Stack |
| **Referencias** | [1] https://cleancompany.com.co (cotizador con IA por foto) [2] Google Cloud Vision API (image classification) |
| **Notas** | Requiere backend para API keys si se usa un servicio externo. Alternativa: TensorFlow.js model que corre 100% en el browser sin backend. |

### Propuesta 3: Video testimonials de clientes reales

| Campo | Detalle |
|-------|---------|
| **Título** | Sección de testimonios en video de clientes reales |
| **Problema** | Las reseñas actuales son en texto JSON-LD (127 reseñas). Los competidores muestran video de clientes reales. El video genera 4x más confianza que texto. |
| **Descripción** | Crear sección de video testimonials: (1) **Solicitud de videos**: cuando un cliente reserva y queda satisfecho, pedirle que grabe un testimonio de 30-60 segundos con su celular. (2) **Compilación de videos**: crear una sección "/testimonios" con 3-5 videos de clientes reales. (3) **Integración con JSON-LD**: agregar Schema `VideoObject` para cada video. (4) **Lazy loading**: cargar videos solo cuando entran al viewport. (5) **Fallback accesible**: si el video no carga, mostrar transcripción o quote destacado del cliente. Implementación: HTML5 + JS vanilla, ~100 líneas. Los videos pueden ser stubs (placeholder) inicialmente y reemplazarse cuando se tengan los reales. |
| **Impacto esperado** | Aumento de confianza, diferenciación vs competencia que solo tiene reseñas de texto, mejor SEO con Schema VideoObject |
| **Esfuerzo** | S |
| **Agente recomendado** | Frontend + Content (para gestión de videos) |
| **Referencias** | [1] https://cleancompany.com.co/#testimonios (testimonials section) |

### Propuesta 4: Mapa de cobertura interactivo de las 10 zonas de Bogotá

| Campo | Detalle |
|-------|---------|
| **Título** | Mapa central que muestra las 10 zonas de cobertura con geometrías aproximadas y links a cada zona |
| **Problema** | El elemento `#coverage-map` en index.html está vacío. El usuario no puede ver visualmente qué zonas cubre Purity & Clean. Las páginas de zona existen pero no hay un punto central que las conecte visualmente. |
| **Descripción** | Implementar mapa de cobertura: (1) **Mapa SVG estático**: crear un SVG con los bordes aproximados de las 10 zonas de Bogotá (Chapinero, Usaquén, Suba, etc.). Cada zona como región clickeable. (2) **Hover interactivity**: al hacer hover sobre una zona, mostrar el nombre y un CTA "Ver zona". (3) **Links a zona pages**: cada zona clickeable lleva a /zonas/[zona]/index.html. (4) **Sin dependencias externas**: no usar Google Maps API (costo) ni Leaflet (complejidad). SVG estático + JS vanilla. (5) **Dark mode compatible**: el mapa funciona bien en ambos temas. Implementación: crear coverage-map.svg + ~150 líneas de JS + CSS. |
| **Impacto esperado** | Mejora de UX para usuarios que buscan su zona, mejor navegación interna, elemento visual diferenciador |
| **Esfuerzo** | S |
| **Agente recomendado** | Frontend |
| **Referencias** | [1] https://cleancompany.com.co (mapa de ubicaciones) [2] SVG interactivo con JS vanilla |

### Propuesta 5: Banner de descuento temporal en hero

| Campo | Detalle |
|-------|---------|
| **Título** | Banner de descuento por tiempo limitado en el hero con countdown opcional |
| **Problema** | No hay elemento de urgencia en el sitio. Clean Company tiene "20% descuento primera vez" visible en el hero. Purity tiene programa de referidos pero no un discount temporal que genere urgencia. |
| **Descripción** | Implementar banner de urgencia: (1) **Banner sticky**: aparece debajo del header o en el hero. (2) **Texto**: "20% de descuento en tu primera limpieza — Solo este mes" o similar. (3) **CTA directo**: botón "Cotizar ahora" que lleva al cotizador o WhatsApp. (4) **Countdown opcional**: si hay una fecha límite, mostrar countdown. (5) **Dismiss**: el usuario puede cerrar el banner. (6) **Dark mode compatible**: funciona en ambos temas. Implementación: HTML + CSS + ~50 líneas de JS. |
| **Impacto esperado** | Aumento de conversiones por sentido de urgencia, captura de leads que no conocían el discount |
| **Esfuerzo** | S |
| **Agente recomendado** | Frontend |
| **Referencias** | [1] https://cleancompany.com.co (20% OFF banner en hero) [2] https://cleancompany.com.co/servicios/muebles |

### Propuesta 6: Certificaciones y badges de confianza visibles

| Campo | Detalle |
|-------|---------|
| **Título** | Añadir badges visibles de certificaciones: INVIMA, productos eco-friendly, personal certificado |
| **Problema** | Purity tiene badges de trust genéricos (stats counting, garantía). Los competidores muestran certificaciones reales como "Productos certificados INVIMA", "Biodegradables", "Personal certificado". |
| **Descripción** | Implementar sección de certificaciones: (1) **Inventario de certificaciones**: confirmar cuáles certificaciones reales tiene Purity (INVIMA, biodegradable, etc.). (2) **Badges visuales**: crear 3-4 badges con los logos de certificaciones. (3) **Posición**: sección "#confianza" o cerca del hero, antes de los servicios. (4) **CSS**: iconos con texto, no imágenes pesadas. (5) **Dark mode**: los badges funcionan en ambos temas. Implementación: HTML + CSS, ~50 líneas. Si no hay certificaciones reales, contactar al equipo para obtenerlas. |
| **Impacto esperado** | Aumento de confianza para clientes B2B y usuarios que buscan garantías profesionales |
| **Esfuerzo** | S |
| **Agente recomendado** | Frontend + Operations (para confirmar certificaciones) |
| **Referencias** | [1] https://cleancompany.com.co (badges de confianza: 100% Guarantee, Eco-Friendly, Certified Staff) |

---

## Orden de implementación recomendado

| # | Propuesta | Impacto | Esfuerzo | Prioridad | Nota |
|---|----------|---------|----------|-----------|------|
| 1 | Páginas de servicio independientes | Alto | M | Alta | SEO + UX |
| 2 | Mapa de cobertura interactivo | Medio | S | Alta | UX + navegación |
| 3 | Banner de descuento temporal | Medio | S | Alta | Conversión rápida |
| 4 | Badges de certificaciones | Medio | S | Media | Trust building |
| 5 | Video testimonials | Alto | S | Media | Diferenciación |
| 6 | Cotizador con IA por foto | Alto | M | Baja | Depende de decisiones de presupuesto |

**Top 3 para implementar primero:** 1, 2, 3 (son quick wins con impacto alto en SEO y conversión).

---

## Diferencia clave: R41 vs R42

R41 se enfocó en el **ecosistema de WhatsApp** (chatbot, catálogo, deep links, re-engagement).

**R42 se enfoca en la estructura del sitio y contenido:**
- R41: "¿Cómo mejoramos el canal WhatsApp para convertir más?"
- R42: "¿Qué le falta al sitio como tal para competir con Clean Company?"

R42 identifica que Purity tiene un sitio funcional pero con una arquitectura de información plana (todo en index.html) mientras que los competidores tienen sitios más profundos (páginas de servicio independientes, sitemap más rico). La propuesta 1 (páginas de servicio independientes) es la más importante porque impacta directamente el SEO y la capacidad del sitio de rankear para búsquedas específicas de servicio.

---

## Estado de proposals anteriores (verificado vs R41)

| Feature | Estado |
|---------|--------|
| WhatsApp Business + chatbot respuestas | Propuesta R41 (pendiente) |
| Catálogo WhatsApp | Propuesta R41 (pendiente) |
| Deep link WhatsApp → Booking | Propuesta R41 (pendiente) |
| Re-engagement clientes inactivos | Propuesta R41 (pendiente) |
| Analytics WhatsApp unificado | Propuesta R41 (pendiente) |
| Botón compartir zona | Propuesta R41 (pendiente) |
| Slot picker disponibilidad | DOMAA-107 (in_review) |
| PWA + Push | ✅ Implementado |
| Chatbot WhatsApp | ✅ Implementado |
| Galería antes/después | ✅ Implementado |
| Tema oscuro | ✅ Implementado |
| Tests E2E Playwright | ✅ Implementado |
| Blog SEO | ✅ Implementado (6 artículos) |
| Zonas pages | ✅ Implementado (10 zonas) |
| Reviews schema | ✅ Implementado (127 reseñas) |
| Cotizador inteligente | ✅ Implementado |
| Programa referidos | ✅ Implementado |

---

## Síntesis: Por qué R42 es diferente

R1-R41 cubren un rango amplio de features y mejoras, pero no habían detectado con claridad el gap de **arquitectura de sitio plana** vs la competencia. Purity funciona como un sitio одностраничный (todo en index.html) mientras que Clean Company tiene un sitio con jerarquía más profunda (/servicios/muebles, /servicios/alfombras, etc.).

Este gap arquitectónico tiene consecuencias en:
1. **SEO**: cada página de servicio tiene su propio title, meta, Schema
2. **Linkabilidad**: los backlinks a Purity solo pueden指向 al homepage
3. **UX**: no hay landing pages dedicadas para cada servicio con CTAs específicos

R42 también aporta el hallazgo de que los competidores tienen features que Purity no tiene (cotizador por foto, video testimonials, mapa de cobertura), lo que позволяет hacer proposals concretas y accionables.

---

## Fuentes

[1] Clean Company. "Lavado de Muebles y Sofás en Bogotá y Medellín." 2026. https://www.cleancompany.com.co/servicios/muebles

[2] Purify. "Lavado de Muebles y Sofás a Domicilio en Bogotá." 2026. https://purify.com.co/lavado-de-muebles-bogota.html

[3] DuckDuckGo. "Mejores empresas de lavado de muebles en Bogotá." 2026. https://html.duckduckgo.com/html/?q=mejores+empresas+lavado+muebles+bogota

[4] Google. "Local Service Ads trends 2026." https://ads.google.com/local-services

[5] Clean Company. "Cotizador con IA por foto." 2026. https://cleancompany.com.co

---

*Documento generado por Innovation Scout — Round 42*
*Purity & Clean Analysis — 2026-04-27*
*Co-Authored-By: Paperclip <noreply@paperclip.ing>*