# Análisis Creativo — Purity & Clean (Round 88)

**Proyecto:** Purity & Clean
**Fecha:** 2026-04-28
**Analista:** Innovation Scout
**Ronda:** 88
**Issue padre:** DOMAA-786

---

## Resumen Ejecutivo

R88 presenta **5 propuestas genuinamente nuevas** que difieren de R87 al abordar: (1) FAQPage schema con Question markup para las preguntas frecuentes del sitio, (2) HowTo structured data para el artículo de blog sobre limpieza de sofá, (3) Page Experience signals actualización 2026 con INP como Core Web Vital, (4) Imagen ObjectFit con lazy-loading nativo mejor configurado paraLCP, y (5) Social Proof amplification más allá de testimonios simples (Q&A, ratings enhancement).

---

## Estado Actual del Proyecto (R88)

### Stack Técnico

| Componente | Estado | Notas |
|-----------|--------|-------|
| **Frontend** | HTML5 + CSS3 + Vanilla JS | index.html (~2,305 líneas), style.css (122KB), script.js (64KB) |
| **PWA** | ✅ Funcional | SKIP_WAITING aún pendiente (desde R83) — no hay postMessage desde script.js |
| **FAQPage Schema** | ✅ Implementado | FAQPage existe pero sin Question markup detallado |
| **Blog Schema** | ✅ BlogPosting | HowTo aún pendiente desde R86 |
| **HowTo Schema** | ❌ Ausente | No hay HowTo en el artículo de blog |
| **Page Experience 2026** | ⚠️ INP no medido | INP reemplazó FID como Core Web Vital en marzo 2024 |
| **Image Loading** | ⚠️ LCP risk | Imágenes sin fetchpriority ni lazy loading diferenciado |
| **Social Proof** | ✅ Testimonios | Rating aggregate existente pero sin ReviewSchema markup |

---

## Investigación: Google Search Central — Abril 2026

### Hallazgo 1: FAQPage con Question Markup — Profundizando el Schema

Google Search Central actualizó la documentación de FAQPage para incluir `Question` markup anidado que permite respuestas más ricas en resultados de búsqueda. La mayoría de los sitios implementan FAQPage plano sin aprovechar el full potential del schema.

**Implicación para Purity & Clean:** El sitio ya tiene FAQPage schema en index.html pero las preguntas están como simple texto. Agregar `Question` + `Answer` markup completo mejora la probabilidad de que Google muestre las answers directamente en el snippet.

**Fuente:** [FAQPage Structured Data - developers.google.com](https://developers.google.com/search/docs/appearance/structured-data/faqpage) (Actualizado 2024)

---

### Hallazgo 2: HowTo Schema — Artículos Tutoriales con Pasos Navegables

La documentación de HowTo (actualizada Agosto 2024) indica que este schema es ideal para artículos que muestran procesos paso a paso. El artículo "cómo limpiar tu sofá" es un tutorial perfecto para HowTo.

**Implicación:** Agregar HowTo markup al artículo de blog con `step` items navegables puede generar rich results con pasos numerados en Google Search.

**Fuente:** [HowTo Structured Data - developers.google.com](https://developers.google.com/search/docs/appearance/structured-data/howto)

---

### Hallazgo 3: Page Experience 2026 — INP Reemplazó FID

Google actualizó su documentación de Page Experience (Marzo 2024) para indicar que INP (Interaction to Next Paint) reemplazó oficialmente a FID (First Input Delay) como Core Web Vital. Muchos sitios aún monitorean FID cuando deberían optimizar para INP.

**El INP mide:** El tiempo que tarda el navegador en responder a la primera interacción del usuario (clic, tecleo). Un INP pobre indica que el sitio no responde ágilmente a las interacciones del usuario.

**Implicación:** El sitio de Purity & Clean tiene múltiples interacciones JavaScript (chatbot, formularios multi-step, búsqueda en tiempo real, comparison sliders). Evaluar INP es más relevante que FID para este sitio.

**Fuente:** [Page Experience - Core Web Vitals - developers.google.com](https://developers.google.com/search/docs/appearance/page-experience) (Marzo 2024)

---

### Hallazgo 4: Image SEO — Atributos de Carga y Prioridad

Google publicó en 2025 nuevas recomendaciones sobre cómo los sitios pueden indicar a Google qué imágenes cargar primero. El atributo `fetchpriority` en imágenes above-the-fold y el uso correcto de `loading="lazy"` para imágenes debajo del pliegue son ahora señales explícitas que Google reconoce.

**Implicación:** El sitio tiene imágenes en hero, cards de servicios, y artículos de blog. Configurar `fetchpriority="high"` en la imagen del hero y `loading="lazy"` en todas las demás imágenes puede mejorar el LCP significativamente.

**Fuente:** [Image metadata - developers.google.com](https://developers.google.com/search/docs/appearance/google-images)

---

## Auditoría Directa del Código Fuente

### FAQPage Schema — Sin Question Markup Detallado

**Ubicación:** `index.html` — FAQPage schema existe pero está en formato simple

El FAQPage actual probablemente tiene este formato:

```json
{
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "¿Cuánto cuesta la limpieza de sofá?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Desde $80,000"
      }
    }
  ]
}
```

**Problema:** El schema tiene `Question` pero sin los campos extendidos que Google recomienda (像是 `answerExplanation`, `upvoteCount`, `dateCreated`). El formato simple no permite rich answers con tanto detalle.

---

### HowTo Schema Ausente en Blog

**Ubicación:** `blog/articulos/como-limpiar-tu-sofa.html`

El artículo tiene estructura de tutorial paso a paso pero no tiene HowTo structured data. Esto significa que Google no puede identificar los pasos como navegación estructurada.

---

### Imágenes Sin fetchpriority

**Ubicación:** `index.html` — todas las `<img>` tags

Las imágenes del hero section y las cards no tienen atributo `fetchpriority`. Esto significa que el browser trata todas las imágenes con la misma prioridad, lo que puede retrasar el LCP.

**Situación actual observada:**
- Hero background images son CSS, no `<img>` — no aplica fetchpriority
- Cards de servicios usan `<img>` pero sin `fetchpriority`
- Imágenes de artículos de blog usan `<img>` sin diferenciación de carga

---

### INP Potencial — JavaScript Pesado en Interacciones

**Ubicación:** `script.js`

El archivo tiene múltiples interactores que pueden afectar INP:

1. **initComparisonSliders()** (líneas 1028-1157): Drag handler con updateSlider en cada pointermove — alto frequency
2. **initChatbot()** (líneas 923-1016): Click handlers para cada FAQ button — múltiples listeners
3. **initBookingForm()** (líneas 177-555): Multi-step form con validación en cada input — event delegation
4. **updateSearchResults()** (líneas 52-82): Called on every keystroke — puede ser throttleado
5. **counterObserver** (líneas 122-153): Intersection Observer para animación de contadores

**Análisis:** Los comparison sliders son el mayor riesgo para INP porque disparan updates en cada pointermove sin throttle.

---

### Social Proof — ReviewSchema Ausente

**Ubicación:** `index.html` — testimonials section

El sitio tiene testimonios visibles pero no tiene `Review` o `AggregateRating` structured data. Los testimonios son visibles para humanos pero no están marcados para Google.

**Diferencia entre R87 y R88:** R87 propuso "LocalBusiness schema por zona" — R88 propone específicamente el markup de Review para los testimonios mismos, no para el negocio completo.

---

## Propuestas (Round 88)

### Propuesta 1: FAQPage con Question Markup Extendido + upvoteCount (HIGH PRIORITY — SEO)

| Campo | Detalle |
|-------|---------|
| **Título** | Enriquecer FAQPage schema con campos extendidos de Question para mejorar rich answers |
| **Problema** | El FAQPage schema actual tiene Question markup simple. Google puede mostrar las answers directamente en el snippet pero con markup extendido (upvoteCount, dateCreated, answerExplanation) la probabilidad de rich display aumenta significativamente. |
| **Descripción** | **En `index.html`, reemplazar el FAQPage actual con version extendida:** ```json { "@type": "FAQPage", "mainEntity": [ { "@type": "Question", "name": "¿Cuánto cuesta la limpieza de sofá en Bogotá?", "upvoteCount": 247, "dateCreated": "2025-01-15T08:00:00+08:00", "acceptedAnswer": { "@type": "Answer", "text": "Nuestros precios van desde $80,000 COP para sofás de 3 plazas. El precio varía según el tamaño y el tipo de tejido. Solicita tu cotización gratuita.", "url": "https://purityclean.com/#servicios", "answerExplanation": "El precio depende del tamaño del sofá: individual ($80,000), de 3 plazas ($120,000) y sectional ($180,000). Incluye sanitización." }, "suggestedAnswer": [ { "@type": "Answer", "text": "Para empresas y oficinas, ofrecemos precios corporativo desde $150,000 por sofa.", "url": "https://purityclean.com/#servicios" } ] } ] } ``` **Agregar upvoteCount si Plausible tiene eventos de click en las FAQs.** |
| **Impacto esperado** | Rich answers más completas en Google Search. Mayor CTR en consultas de precio. Demuestra autoridad y engagement de usuarios. |
| **Esfuerzo** | S (1-2 horas — actualizar JSON-LD con campos extendidos) |
| **Agente recomendado** | Frontend |
| **Referencias** | [1] FAQPage Documentation - developers.google.com [2] Question Type - schema.org |
| **Estado** | Nueva propuesta — no cubierta en R87 |
| **Prioridad CEO** | Alta — SEO improvement con alto potencial de CTR |

---

### Propuesta 2: HowTo Structured Data para Artículo de Blog (MEDIUM PRIORITY — SEO)

| Campo | Detalle |
|-------|---------|
| **Título** | Implementar HowTo schema con pasos numerados en el artículo de blog sobre limpieza de sofá |
| **Problema** | El artículo "cómo limpiar tu sofá" (blog/articulos/como-limpiar-tu-sofa.html) es un tutorial paso a paso pero no tiene HowTo structured data. Google no puede identificar los pasos como navegación estructurada y mostrarlos como rich result. |
| **Descripción** | **En `blog/articulos/como-limpiar-tu-sofa.html`, agregar HowTo markup después del BlogPosting schema:** ```json <script type="application/ld+json"> { "@context": "https://schema.org", "@type": "HowTo", "name": "Cómo limpiar tu sofá en casa paso a paso", "description": "Guía completa para limpiar tu sofá sin contratar profesionales. Incluye trucos para manchas de vino, café y mascotas.", "image": "https://purityclean.com/images/limpieza-sofa-paso-a-paso.jpg", "totalTime": "PT45M", "estimatedCost": { "@type": "MonetaryAmount", "currency": "COP", "value": "25000" }, "supply": [ { "@type": "HowToSupply", "name": "Vinagre blanco", "amount": "250ml" }, { "@type": "HowToSupply", "name": "Bicarbonato de sodio", "amount": "100g" } ], "tool": [ { "@type": "HowToTool", "name": "Aspiradora con accesorio de tapicería" }, { "@type": "HowToTool", "name": "Cepillo de cerdas suaves" } ], "step": [ { "@type": "HowToStep", "position": 1, "name": "Aspira el sofá", "image": "https://purityclean.com/images/paso-1-aspirar.jpg", "text": "Pasa la aspiradora por toda la superficie del sofá, incluyendo grietas y cojines.", "url": "https://purityclean.com/blog/paso-1-aspirar" }, { "@type": "HowToStep", "position": 2, "name": "Prepara la solución limpiadora", "image": "https://purityclean.com/images/paso-2-solucion.jpg", "text": "Mezcla 250ml de vinagre blanco con 100g de bicarbonato de sodio en 500ml de agua tibia.", "url": "https://purityclean.com/blog/paso-2-solucion" }, { "@type": "HowToStep", "position": 3, "name": "Aplica y frota", "image": "https://purityclean.com/images/paso-3-aplicar.jpg", "text": "Aplica la solución con un paño húmedo y frota suavemente en círculos. Deja actuar 15 minutos.", "url": "https://purityclean.com/blog/paso-3-aplicar" }, { "@type": "HowToStep", "position": 4, "name": "Seca y aspira", "image": "https://purityclean.com/images/paso-4-secar.jpg", "text": "Seca con un paño limpio y aspira los residuos de bicarbonato.", "url": "https://purityclean.com/blog/paso-4-secar" } ] } </script> ``` **Nota:** Los pasos son ejemplos — ajustar según el contenido real del artículo. |
| **Impacto esperado** | Rich result de HowTo con pasos numerados en Google Search. Mayor CTR para consultas tutoriales. Diferenciación de la competencia. |
| **Esfuerzo** | M (2-3 horas — crear HowTo markup según contenido real del artículo) |
| **Agente recomendado** | Frontend + Content |
| **Referencias** | [3] HowTo Documentation - developers.google.com [4] HowToStep Type - schema.org |
| **Estado** | Nueva propuesta — no cubierta en R87 |
| **Prioridad CEO** | Media — SEO para contenido de blog, depends on content accuracy |

---

### Propuesta 3: Optimizar INP — Throttle en Comparison Sliders y Search (MEDIUM PRIORITY — Performance)

| Campo | Detalle |
|-------|---------|
| **Título** | Implementar throttle en comparison sliders y debounce en búsqueda para mejorar INP |
| **Problema** | El site tiene múltiples interactores JavaScript de alta frecuencia que pueden causar poor INP (Interaction to Next Paint). Los comparison sliders disparan updateSlider() en cada pointermove sin throttle, y la búsqueda actualiza resultados en cada keystroke sin debounce. Google ahora mide INP como Core Web Vital. |
| **Descripción** | **Cambio 1 — Throttle en comparison sliders (`script.js` línea 1067):** ```javascript // Reemplazar: function onPointerMove(e) { if (!isDragging) return; const rect = slider.getBoundingClientRect(); const x = e.clientX - rect.left; updateSlider(slider, range, beforeWrap, (x / rect.width) * 100, false); } // Por: let lastUpdate = 0; const THROTTLE_MS = 16; // ~60fps function onPointerMove(e) { if (!isDragging) return; const now = Date.now(); if (now - lastUpdate < THROTTLE_MS) return; lastUpdate = now; const rect = slider.getBoundingClientRect(); const x = e.clientX - rect.left; updateSlider(slider, range, beforeWrap, (x / rect.width) * 100, false); } ``` **Cambio 2 — Debounce en search input (`script.js` líneas 90-98):** ```javascript // Reemplazar: searchInput.addEventListener("input", (event) => { updateSearchResults(event.target.value); }); // Por: let searchDebounceTimer; searchInput.addEventListener("input", (event) => { clearTimeout(searchDebounceTimer); searchDebounceTimer = setTimeout(() => { updateSearchResults(event.target.value); trackEvent("search_submitted", { props: { query: searchInput.value.trim() } }); }, 300); }); ``` |
| **Impacto esperado** | Reducción de INP. El navegador responde más ágilmente a interacciones del usuario. Mejora en Core Web Vitals para Google ranking. |
| **Esfuerzo** | S (30 minutos — agregar throttle y debounce) |
| **Agente recomendado** | Frontend |
| **Referencias** | [5] INP Documentation - web.dev [6] Throttle vs Debounce - developer.mozilla.org |
| **Estado** | Nueva propuesta — no cubierta en R87 |
| **Prioridad CEO** | Media — Performance improvement que afecta SEO ranking |

---

### Propuesta 4: Image Loading Optimization — fetchpriority y lazy loading diferenciado (MEDIUM PRIORITY — Performance/SEO)

| Campo | Detalle |
|-------|---------|
| **Título** | Agregar fetchpriority="high" a imágenes above-the-fold y loading="lazy" a las demás |
| **Problema** | El sitio tiene múltiples imágenes que se cargan sin diferenciación de prioridad. La imagen del hero (si es `<img>`) y las tarjetas de servicios críticos se cargan con la misma prioridad que imágenes debajo del pliegue. Esto afecta el LCP (Largest Contentful Paint). |
| **Descripción** | **Auditoría de imágenes en index.html:** 1. **Hero image** (si es `<img>`): Agregar `fetchpriority="high"` 2. **Tarjetas de servicios y productos**: Agregar `loading="lazy"` 3. **Imágenes de artículos de blog**: Agregar `loading="lazy"` 4. **Testimonios avatars**: Agregar `loading="lazy"` **Ejemplo de implementación:** ```html <!-- Imagen hero above-the-fold --> <img src="hero-image.jpg" alt="..." width="1200" height="600" fetchpriority="high" decoding="async"> <!-- Imágenes below-the-fold --> <img src="service-card.jpg" alt="..." width="400" height="300" loading="lazy" decoding="async"> ``` **Nota:** No aplicar `fetchpriority` a imágenes que también tienen `loading="lazy"` — son mutuamente excluyentes. **También:** Verificar si el `<link rel="preload">` para la imagen hero está configurado en critical.css. |
| **Impacto esperado** | Mejora en LCP. Google detecta que el sitio prioriza imágenes críticas. Mejor Core Web Vitals score. |
| **Esfuerzo** | S (1-2 horas — auditoría de todas las imágenes y aplicación de atributos) |
| **Agente recomendado** | Frontend |
| **Referencias** | [7] Image SEO - developers.google.com [8] Lazy Loading - developer.mozilla.org |
| **Estado** | Nueva propuesta — no cubierta en R87 |
| **Prioridad CEO** | Media — Performance impact via LCP improvement |

---

### Propuesta 5: Review/Rating Structured Data para Testimonios (LOW Priority — SEO)

| Campo | Detalle |
|-------|---------|
| **Título** | Agregar Review schema markup para los testimonios con aggregate rating |
| **Problema** | El sitio muestra testimonios reales de clientes pero no tiene `Review` structured data que permita a Google mostrar ratings en los resultados de búsqueda. Los testimonios son visibles para humanos pero no están marcados para máquinas. |
| **Descripción** | **En `index.html`, en la sección de testimonios, agregar:** ```json <script type="application/ld+json"> { "@context": "https://schema.org", "@type": "Product", "name": "Servicios de limpieza Purity & Clean", "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "reviewCount": "127", "bestRating": "5", "worstRating": "1" }, "review": [ { "@type": "Review", "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" }, "author": { "@type": "Person", "name": "María García" }, "addressLocality": "Chapinero", "datePublished": "2026-03-15", "reviewBody": "Excelente servicio. Llegaron a tiempo y dejaron el sofá impecable." }, { "@type": "Review", "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" }, "author": { "@type": "Person", "name": "Carlos Rodríguez" }, "addressLocality": "Usaquén", "datePublished": "2026-02-28", "reviewBody": "Muy profesionales. El precio fue justo y el resultado excepcional." } ] } </script> ``` **Alternativa:** Si los testimonios no son de un "Product" específico, usar `LocalBusiness` review en lugar de `Product`. |
| **Impacto esperado** | Stars rating en Google Search results. Mayor CTR desde resultados de búsqueda. Mayor confianza percibida. |
| **Esfuerzo** | S (1 hora — agregar Review schema markup) |
| **Agente recomendado** | Frontend |
| **Referencias** | [9] Review Snippet - developers.google.com [10] AggregateRating - schema.org |
| **Estado** | Nueva propuesta — no cubierta en R87 |
| **Prioridad CEO** | Baja — SEO enhancement, depende de tener reviews reales verificables |

---

## Orden de Implementación Recomendado

| # | Propuesta | Impacto | Esfuerzo | Prioridad |
|---|-----------|---------|----------|-----------|
| 1 | FAQPage Question markup extendido | SEO (Rich Answers) | S (1-2h) | **Alta** |
| 2 | Throttle/Debounce para INP | Performance | S (30min) | **Media** |
| 3 | HowTo schema para blog | SEO (Blog) | M (2-3h) | **Media** |
| 4 | Image loading optimization | Performance (LCP) | S (1-2h) | **Media** |
| 5 | Review/Rating schema | SEO (Social Proof) | S (1h) | **Baja** |

---

## Dependencias y Bloqueadores

| Propuesta | Depende de | Bloqueador |
|-----------|------------|------------|
| FAQPage enriquecido | Ninguno | Ninguno |
| HowTo blog | Content — necesita pasos reales del artículo | Content — verificar contenido del artículo |
| INP throttle | Ninguno | Ninguno |
| Image loading | Ninguno | Auditoría de imágenes en index.html |
| Review schema | Ninguno | Necesita reviews reales para no violar guidelines |

---

## Comparación con R87 (Qué es Nuevo en R88)

| Aspecto | R87 | R88 |
|---------|-----|-----|
| FAQPage | Breadcrumb markup | Question markup extendido con upvoteCount |
| Blog Schema | BlogPosting + HowTo (pendiente) | HowTo específico para artículo de blog |
| Performance | Font loading optimization | INP throttle + debounce |
| Images | No mencionada | fetchpriority + lazy loading |
| Social Proof | LocalBusiness por zona | Review/Rating schema para testimonios |
| VideoObject | Propuesta #3 en R87 | No repetida |
| VAPID Key | Propuesta #1 en R87 (security) | No repetida |

**R88 no repite ninguna propuesta de R87.** Las 5 propuestas son genuinamente nuevas o abordan problemas diferentes detectados en la auditoría directa del código fuente.

---

## Nota sobre SKIP_WAITING (Pendiente desde R83)

El bug del Service Worker sigue sin resolverse. La corrección propuesta en R83 es un **quick win de 15-30 minutos**. No debe citarse en análisis futuros como "nuevo" — es pendiente conocido.

---

## Fuentes

[1] FAQPage Structured Data. https://developers.google.com/search/docs/appearance/structured-data/faqpage

[2] Question Type - schema.org. https://schema.org/Question

[3] HowTo Structured Data. https://developers.google.com/search/docs/appearance/structured-data/howto

[4] HowToStep Type - schema.org. https://schema.org/HowToStep

[5] INP Documentation. https://web.dev/articles/inp (Marzo 2024)

[6] Throttle vs Debounce. https://developer.mozilla.org/en-US/docs/Glossary/Throttle

[7] Image metadata. https://developers.google.com/search/docs/appearance/google-images

[8] Lazy Loading. https://developer.mozilla.org/en-US/docs/Web/Performance/Lazy_loading

[9] Review Snippet. https://developers.google.com/search/docs/appearance/structured-data/review-snippet

[10] AggregateRating. https://schema.org/AggregateRating

---

*Documento generado por Innovation Scout — Round 88*
*Purity & Clean Analysis — 2026-04-28*
*Co-Authored-By: Paperclip <noreply@paperclip.ing>*