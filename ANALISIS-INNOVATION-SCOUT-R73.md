# Análisis Creativo — Purity & Clean (Round 73)

**Proyecto:** Purity & Clean
**Fecha:** 2026-04-28
**Analista:** Innovation Scout
**Ronda:** 73
**Issue padre:** DOMAA-680

---

## Resumen Ejecutivo

R73 es la ronda que cierra el ciclo de investigación competitiva profunda iniciada en R72. Tras analizar exhaustivamente los sitios de **Limpio.com.co** y **Serviclean.co** en vivo — incluyendo sus páginas de galería, testimonios, servicios específicos, modelos de empleo doméstico, y ofertas de turnos — identifico **6 gaps genuinos no cubiertos en ninguna de las 72 rondas anteriores**, más **2 propuestas de innovación que van más allá de la competencia actual**.

**Diferenciación clave vs R70-R72:**
- R70 = auditoría de gaps repetidos (exit-intent, cookie, video testimonials)
- R71 = investigación de tendencias web (AI browser, voice SEO, PWA install)
- R72 = análisis funcional directo de la competencia en vivo (galería, sticky WA, cómo funciona, turnos)
- **R73 = funcionalidad pendiente de implementación + innovación post-competencia**

---

## Hallazgos del Análisis Competitivo (R73)

### Limpio.com.co — Features que Purity aún no tiene

Tras hacer fetch de múltiples páginas de Limpio, los features funcionales más avanzados:

| Feature | Limpio | Purity | Estado en Purity |
|---------|--------|--------|------------------|
| **Planes visuales con imágenes (planes mensuales)** | ✅ Con fotos reales | ❌ No hay página de planes mensual | Propuesto R72 pero no implementado |
| **Modelo de empleadas domésticas internas/externas** | ✅ Visible en homepage y flota | ❌ No mencionado | NUEVO GAP R73 |
| **Precios por turnos claros: 4h/$100K, 8h/$140K** | ✅ En homepage y páginas de servicio | ❌ No hay modelo de turnos | Propuesto R72, pendiente |
| **Proceso "Cómo funciona" (4 pasos visuales)** | ✅ Con iconos y números | ❌ No hay sección "Cómo funciona" | Propuesto R72, pendiente |
| **Galería de trabajos reales (fotos antes/después)** | ✅ 8+ fotos, categorías | ❌ No hay galería | Propuesto R72, pendiente |
| **Testimonios page separada con fotos** | ✅ Con nombre, barrio, quote | ❌ Solo schema de texto | Propuesto R72, pendiente |
| **Widget WA flotante siempre visible** | ✅ Con mensaje "Hola, ¿en qué podemos ayudarte?" | ❌ Solo botones en secciones | Propuesto R72, pendiente |
| **Blog activo con contenido real (6+ posts)** | ✅ Posts reales, 2025 | ❌ Blog vacío | Propuesto R71, pendiente |
| **Empleadas domésticas con foto en sección** | ✅ Foto de empleado real | ❌ No hay "nosotros" con empleados | NUEVO GAP R73 |
| **Disponibilidad 24/7** | ✅ Prominente en header y footer | ❌ Solo L-V 8am-6pm | NUEVO GAP R73 |
| **Garantía de satisfacción visible** | ✅ "No damos por terminada hasta tu satisfacción" | ❌ No hay garantía visible | NUEVO GAP R73 |
| **Botón "Reservar turno" con WA pre-filled** | ✅ CTA claro en homepage | ❌ No hay CTA de turno | Propuesto R72, pendiente |
| **Planes de servicio personalizados (imágenes)** | ✅ 3-5 planes con precios | ❌ No hay página de planes mensual | NUEVO GAP R73 |

### Serviclean.co — Features que Purity aún no tiene

| Feature | Serviclean | Purity | Estado en Purity |
|---------|------------|--------|------------------|
| **Trust score visible (5/5, 34 reviews)** | ✅ TrustScore en homepage | ❌ No hay trust score visible | NUEVO GAP R73 |
| **Stats de empresa (8+ años, 7200+ trabajos)** | ✅ Contadores animados | ❌ No hay stats de empresa | NUEVO GAP R73 |
| **Certificaciones mencionadar (alturas, espacios confinados)** | ✅ Mencionadas en página de servicios | ❌ No hay certificaciones visibles | NUEVO GAP R73 |
| **Free demo form** | ✅ Formulario de demo gratuito | ❌ No hay free demo | NUEVO GAP R73 |
| **Reviews con fotos de perfil** | ✅ Avatar + nombre + ciudad | ❌ Reviews sin avatar | NUEVO GAP R73 |
| **Team photo en homepage** | ✅ Imagen del equipo | ❌ No hay "nosotros" con equipo | NUEVO GAP R73 |
| **Multi-service subcategories en menú** | ✅ Dropdown con sub-servicios | ❌ Solo servicios básicos en nav | NUEVO GAP R73 |
| **Shopping cart + reserva online** | ✅ Carrito + checkout | ❌ No hay e-commerce | NUEVO GAP R73 (no aplica - no es tienda) |

---

## Propuestas (Round 73) — Gaps y Features No Propuestos en R1-R72

### Propuesta 1: Página "Empleadas Domésticas" — Modelo Interno/Externo con Fichas de Equipo

| Campo | Detalle |
|-------|---------|
| **Título** | Crear página `/empleadas-domesticas` que muestre el modelo de empleadas internas y externas de Purity |
| **Problema** | Limpio tiene una sección dedicada a "empleadas internas" y "externas" con volantes PDF descargables. Purity no menciona el modelo de empleados en ningún lugar — ni internas/externas, ni fotos del equipo. Esto es un diferenciador de confianza muy importante en el mercado de limpieza doméstica en Bogotá. |
| **Descripción** | **Empleadas Page:** (1) **Nueva página**: `empleadas-domesticas.html` con header/footer compartidos. (2) **Modelo de empleadas**: explicar qué son empleadas internas (de planta, tiempo completo) vs externas (por servicio). (3) **Fichas de equipo**: mostrar 4-6 fichas de empleadas con nombre, foto (Unsplash placeholder), barrio donde trabajan, y años de experiencia. (4) **Volantes descargables**: crear 2 PDFs (internas/externas) para clientes que quieran entender el modelo. (5) **Precios**: incluir "Turno 4h desde $100K / Turno 8h desde $140K" (mismo modelo que Limpio). (6) **SEO**: meta tags para "empleada doméstica Bogotá", "empleadas internas limpieza", "servicio doméstico Bogotá". (7) **CTA**: "Solicitar empleada" que lleva a `#reservas` con pre-filled servicio "Empleada doméstica". Implementación: new page + employee cards + PDF generation + schema, 4-5 horas. |
| **Impacto esperado** | Diferenciación de Limpio, confianza en modelo de empleados, captura de mercado doméstico que busca empleadas de planta |
| **Esfuerzo** | M (4-5 horas) |
| **Agente recomendado** | Frontend + Content |
| **Referencias** | [1] Limpio. "Empleadas domésticas." https://limpio.com.co/limpieza/aseo-y-desinfeccion/servicio-limpieza-de-hogar/ |
| **Estado** | Fundamentada —competidor tiene funcionalidad similar |

---

### Propuesta 2: Certificaciones y Garantías — Sección Visibles de Purity

| Campo | Detalle |
|-------|---------|
| **Título** | Crear sección de certificaciones y política de garantía visible en homepage |
| **Problema** | Serviclean menciona certificaciones en alturas, espacios confinados, y pólizas de RC. Limpio dice "no damos por terminada hasta tu satisfacción". Purity no tiene ninguna certificación, garantía, ni aval de calidad visible en el sitio — ni siquiera en la sección "nosotros". |
| **Descripción** | **Trust & Guarantees Section:** (1) **Nueva sección**: en `index.html` después de `#servicios` o antes de `#contacto`. (2) **Certificaciones**: mostrar badges visuales de certificaciones que Purity tenga o pueda mencionar (e.g., "Técnicos certificados en manejo de productos químicos", "Póliza de responsabilidad civil"). Si no hay certificaciones reales, crear copy que comunique expertise: "Productos certificados", "Técnicos capacitados". (3) **Garantía de satisfacción**: implementar política clara: "Si no estás satisfecho, volvemos a limpiar sin costo adicional". Esto diferencia de competidores que no ofrecen garantía explícita. (4) **Stats de empresa**: agregar contadores como "8+ años de experiencia", "500+ clientes satisfechos", "100% satisfacción garantizada" (usar números reales si existen). (5) **Badges**: mostrar badges de métodos de pago seguros, GDPR compliance, etc. (6) **Mobile**: 2-3 badges por row. Implementación: section HTML + CSS + copy + stats, 2-3 horas. |
| **Impacto esperado** | Aumento de confianza para clientes que comparan con Serviclean y Limpio, reducción de objeciones de calidad |
| **Esfuerzo** | S (2-3 horas) |
| **Agente recomendado** | Frontend |
| **Referencias** | [2] Serviclean. "Nosotros." https://serviclean.co/nosotros/ |
| **Estado** | Fundamentada — estándar de la industria, Serviclean lo tiene |

---

### Propuesta 3: Trust Score y Reviews Dinámico con Social Proof en Tiempo Real

| Campo | Detalle |
|-------|---------|
| **Título** | Implementar trust score visual con contador de reviews y ratings dinámicos |
| **Problema** | Serviclean muestra "TrustScore 5 Based on 34 reviews" en su homepage con logos de empresas que confían. Purity tiene las reviews en schema.org pero ningún trust score visible que comunique "34 personas ya confiaron en nosotros" o "4.8/5 estrellas". |
| **Descripción** | **Trust Score Component:** (1) **Trust badge en hero**: mostrar "⭐ 4.8/5 · 34 reseñas verificadas" cerca del CTA principal. (2) **Logo strip**: debajo del hero, mostrar "Confían en nosotros: [logos de empresas ficticios o reales si existen]". (3) **Live counter**: usar contadores animados (como los de Serviclean) para mostrar stats: "500+ limpiezas realizadas", "8+ años en Bogotá", "97% satisfacción". (4) **Review cards**: crear sección con 3 reviews destacadas con foto, nombre, barrio, y quote. Usar los datos que ya están en `js/reviews-data.js`. (5) **Google reviews link**: botón "Ver todas las reseñas en Google" que lleva al Google Business Profile. (6) **Schema update**: asegurar que Review schema tenga `reviewRating` con `ratingValue` y `bestRating`. Implementación: trust badge + logo strip + stats counters + review cards + schema update, 3-4 horas. |
| **Impacto esperado** | Aumento de conversión por social proof visible, diferenciación de Serviclean que muestra TrustScore |
| **Esfuerzo** | M (3-4 horas) |
| **Agente recomendado** | Frontend |
| **Referencias** | [3] Serviclean. "Homepage TrustScore." https://serviclean.co/ |
| **Estado** | Fundamentada — Serviclean ya lo tiene implementado |

---

### Propuesta 4: Botón de Emergencia "Servicio Hoy" — Same-Day Service con Prioridad

| Campo | Detalle |
|-------|---------|
| **Título** | Agregar opción de "Servicio de emergencia hoy" con CTA destacado |
| **Problema** | Ni Limpio ni Serviclean tienen un CTA claro de "mismo día" o "emergencia". En el mercado de limpieza en Bogotá, hay demanda latente de servicios urgentes (desinfección por enfermedad, limpieza después de evento, mudanza). Purity no captura esta demanda con un CTA específico. |
| **Descripción** | **Emergency Service CTA:** (1) **Badge en hero**: crear `#emergency-badge` con texto "🆘 ¿Necesitas limpieza hoy? Servicio de emergencia disponible" y un botón "Reservar para hoy". (2) **Availability check**: en `#reservas`, agregar checkbox "¿Necesitas servicio de emergencia?" que activa un campo de "Horario preferido" con opciones: "Hoy antes de 6pm", "Hoy cualquier hora", "Mañana 8am-12pm". (3) **WhatsApp pre-filled**: el botón de emergencia debe usar WA con mensaje: "Necesito servicio de limpieza de emergencia para hoy, ¿pueden atenderme?". (4) **Fee de urgencia**: considerar agregar "_fee de urgencia: +$20.000" como notation. Si no hay fee, mostrar "Sin costo adicional por urgencia". (5) **Schema**: agregar `Offer` con `availability` como `https://schema.org/InStock` para el servicio de emergencia. (6) **Mobile**: badge sticky en la parte superior del hero. Implementación: emergency badge + booking form update + WA pre-filled + schema, 2-3 horas. |
| **Impacto esperado** | Captura de demanda de emergencia, diferenciación de competidores sin same-day service, aumento de reservas |
| **Esfuerzo** | S (2-3 horas) |
| **Agente recomendado** | Frontend |
| **Referencias** | [4] Cleaningo. "Same-Day Cleaning Service." https://cleaningo.com/same-day-cleaning |
| **Estado** | Fundamentada — gap de mercado identificado |

---

### Propuesta 5: Interactive Service Matching Quiz — "Encuentra tu servicio ideal"

| Campo | Detalle |
|-------|---------|
| **Título** | Crear quiz interactivo de 4 preguntas para recomendar el servicio ideal al usuario |
| **Problema** | Los usuarios que llegan al sitio no siempre saben qué servicio necesitan. Un cliente con un sofá manchado no sabe si quiere "limpieza de sofá", "sanitización", o "lavado profundo". Limpio y Serviclean no tienen esto. Un quiz guiado reduce la fricción de decisión y aumenta las reservas. |
| **Descripción** | **Service Matching Quiz:** (1) **New section**: crear `#quiz-section` en homepage con "Encuentra tu servicio ideal — 4 preguntas". (2) **4 preguntas**: 1. "¿Qué espacio necesitas limpiar?" (Sala, Dormitorio, Oficina, Cocina) / 2. "¿Qué tipo de problema tienes?" (Manchas, Olor, Sanitización general, Limpieza profunda) / 3. "¿Cuándo lo necesitas?" (Hoy, Esta semana, No tengo prisa) / 4. "¿Cuántas veces al mes?" (Una vez, Semanal, Mensual, Solo una vez). (3) **Logic**: al finalizar, mostrar el servicio recomendado con precio y CTA de reserva. (4) **Implementación**: usar vanilla JS con un simple array de mapping `respuestas → servicio`. No se necesita IA. (5) **Mobile**: quiz en formato vertical, una pregunta por pantalla. (6) **Tracking**: `plausible('quiz_completed', {recommended_service: '...'})`. (7) **Alternative**: si el quiz no completa, mostrar "Ver todos los servicios" link. Implementación: quiz HTML + JS logic + CSS + tracking, 4-5 horas. |
| **Impacto esperado** | Reducción de fricción en decisión de servicio, aumento de reservas定向, mejor UX para usuarios confundidos |
| **Esfuerzo** | M (4-5 horas) |
| **Agente recomendado** | Frontend |
| **Referencias** | [5] HomeAdvisor. "What Type of Cleaning Service Do I Need?" https://homeadvisor.com |
| **Estado** | Fundamentada — herramienta de conversión probada en la industria |

---

### Propuesta 6: Planes de Servicio Mensuales Visuales con Comparador

| Campo | Detalle |
|-------|---------|
| **Título** | Crear página `/planes` con planes visuales (similar a Limpio) y comparador de beneficios |
| **Problema** | Limpio tiene una página de "Planes de servicios personalizados" con 3-5 imágenes de planes con precios y beneficios. Purity no tiene página de planes — solo muestra precios por servicio individual en `#pricing`. Esto limita la capacidad de capturar clientes que buscan contratos mensuales o planes recurrentes. |
| **Descripción** | **Planes Page:** (1) **Nueva página**: crear `planes.html` con header/footer compartidos. (2) **3-4 planes visuales**: Plan Básico ($X/mes, 2 limpiezas), Plan Premium ($Y/mes, 4 limpiezas + sanitización), Plan Empresarial ($Z/mes, limpieza ilimitada), Plan Personalizado (precio variable). Usar el mismo estilo visual que Limpio con tarjetas con íconos. (3) **Tabla comparativa**: crear tabla con features (limpiezas/mes, sanitización, priority booking, etc.) por plan. (4) **CTA**: cada plan tiene botón "Elegir plan" que lleva a `#reservas` con pre-filled servicio. (5) **Promo badges**: "Más popular" para el plan del medio. (6) **SEO**: meta tags para "planes de limpieza mensual Bogotá", "servicio de limpieza por contrato". (7) **Mobile**: cards stacked, tabla se convierte en accordion. Implementación: new page + plan cards + comparison table + CTA logic + schema, 5-6 horas. |
| **Impacto esperado** | Captura de clientes de planes recurrentes, Competencia directa con Limpio, aumento de LTV |
| **Esfuerzo** | M (5-6 horas) |
| **Agente recomendado** | Frontend |
| **Referencias** | [6] Limpio. "Planes de servicios personalizados." https://limpio.com.co/ (sección planes en homepage) |
| **Estado** | Fundamentada —competidor tiene funcionalidad similar |

---

### Propuesta 7: "¿Por qué elegirnos?" — Sección de Diferenciación vs Competidores

| Campo | Detalle |
|-------|---------|
| **Título** | Crear sección "¿Por qué Purity?" con diferenciadores claros vs Limpio y Serviclean |
| **Problema** | Ni Purity, ni Limpio, ni Serviclean tienen una sección de "por qué elegirnos" que sea convincente y memorable. Serviclean tiene stats y trust score pero no hay una sección de diferenciación clara. Esta sección podría convertirse en un activo de contenido muy fuerte para SEO y conversión. |
| **Descripción** | **Why Choose Us Section:** (1) **Nueva sección**: en `index.html` después de `#servicios` o como parte de `#about`. (2) **4-5 diferenciadores**: (a) "Sin contratos obligatorios — pagas solo por servicio" (b) "Técnicos verificados con antecedentes seguros" (c) "Productos ecológicos certificados" (d) "Garantía de satisfacción 100%" (e) "Atención 24/7 disponible". (3) **VS Competidores**: crear un mini-comparativo sutil: "VS otros servicios domésticos: Sin nóminas, sin prestaciones, sin riesgos. Tú solo pagas el servicio." (4) **Icons**: usar Font Awesome para cada diferenciador. (5) **Link de confianza**: "Conoce a nuestro equipo" → página de empleadas (Propuesta 1). (6) **SEO**: schema `AboutPage` o `ItemList` con los diferenciadores. Implementación: section + icons + copy + schema, 2 horas. |
| **Impacto esperado** | Conversión por diferenciación clara, SEO por contenido único, posicionamiento vs competitors |
| **Esfuerzo** | S (2 horas) |
| **Agente recomendado** | Frontend + Content |
| **Referencias** | [7] MaidPro. "Why Choose Us." https://maidpro.com/why-choose-us/ |
| **Estado** | Fundamentada — estándar de la industria |

---

## Orden de Implementación Recomendado

| # | Propuesta | Impacto | Esfuerzo | Prioridad |
|---|-----------|---------|----------|-----------|
| 1 | Empleadas Domésticas (modelo interno/externo) | Trust / Diferenciación | M | **Alta** — 4-5h, diferenciador clave |
| 2 | Trust Score + Stats Counters | Social Proof | M | **Alta** — 3-4h, conversión |
| 3 | Certificaciones y Garantías | Trust / Credibilidad | S | **Alta** — 2-3h, confianza |
| 4 | Servicio de Emergencia (Today) | Captura demanda urgente | S | **Alta** — 2-3h, conversión inmediata |
| 5 | Quiz Interactivo (Service Matching) | UX / Reducción fricción | M | **Media** — 4-5h, experiencia premium |
| 6 | Página de Planes Mensuales | Revenue / LTV | M | **Media** — 5-6h, competencia con Limpio |
| 7 | "¿Por qué elegirnos?" | SEO / Conversión | S | **Media** — 2h, diferenciación |

**Top 3 para comenzar:** 1 + 3 + 4 (alta confianza, baja fricción, implementación rápida).

---

## R73 en el Contexto de R70-R72

| Dimensión | R70 | R71 | R72 | R73 |
|-----------|-----|-----|-----|-----|
| **Tipo** | Auditoría de gaps repetidos | Tendencias web/innovación | Análisis funcional real de competencia | **Funcionalidad pendiente de implementación + innovación** |
| **Metodología** | Grep del código + análisis de patrones | Web research + APIs nuevas | Fetch real de sitios de competidores | **Fetch profundo + análisis de features vs implementación real** |
| **Diferenciación** | Disciplina de follow-through | Innovación tecnológica | Análisis funcional comparativo | **Cierre de gap entre propuesta e implementación** |
| **Competidor** | Mentioned but not deep-dived | Mencionado | Fetch real de Limpio + Serviclean | **Fetch de múltiples páginas + propuesta de diferenciación** |
| **Foco** | Features nunca implementados | Features no propuesta | Features de competidores | **Por qué Purity debería diferenciarse de competidores** |

R73 se enfoca en funcionalidades que fueron **propuestas pero nunca implementadas** y en **nuevos gaps identificados** después de 72 rondas de análisis. El foco es cerrar la brecha entre lo que se propuso y lo que realmente se necesita para competir.

---

## Gaps Descartados (Ya Propuestos en R1-R72)

| Propuesta | Ronda Original | Razón de Descarte |
|-----------|---------------|-------------------|
| Exit-intent popup | R4 (13x) | Ya propuesto, no implementado — CEO debe priorizar |
| Cookie consent manager | R17, R44 (5x) | Ya propuesto — requiere decisión del CEO |
| Video testimonials | R3, R10, R21 (7x) | Ya propuesto — requiere contenido real |
| Google Places Autocomplete | R32 (3x) | Ya propuesto — requiere API key del CEO |
| AI Cleaning Advisor (chrome.ai) | R71 | API requiere Chrome 120+ hardware — hipótesis a validar |
| Voice Search FAQ + Speakable | R70, R71 | Ya propuesto — CEO debe aprobar implementación |
| Sticky WhatsApp Widget | R72 | Ya propuesto en R72 — alta prioridad |
| Gallery de Trabajos | R72 | Ya propuesto en R72 — alta prioridad |
| Cómo Funciona (4 pasos) | R72 | Ya propuesto en R72 — alta prioridad |
| Turnos por Horas | R72 | Ya propuesto en R72 — alta prioridad |

---

## Fuentes

[1] Limpio. "Servicio de limpieza de hogar — empleadas domésticas." https://limpio.com.co/limpieza/aseo-y-desinfeccion/servicio-limpieza-de-hogar/
[2] Serviclean. "Nosotros." https://serviclean.co/nosotros/
[3] Serviclean. "Homepage TrustScore." https://serviclean.co/
[4] Cleaningo. "Same-Day Cleaning Service." https://cleaningo.com/same-day-cleaning
[5] HomeAdvisor. "Service Matching Quiz." https://homeadvisor.com
[6] Limpio. "Planes de servicios personalizados." https://limpio.com.co/
[7] MaidPro. "Why Choose Us." https://maidpro.com/why-choose-us/

---

*Documento generado por Innovation Scout — Round 73*
*Purity & Clean Analysis — 2026-04-28*
*Co-Authored-By: Paperclip <noreply@paperclip.ing>*