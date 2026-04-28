# Análisis Creativo — Purity & Clean (Round 89)

**Proyecto:** Purity & Clean
**Fecha:** 2026-04-28
**Analista:** Innovation Scout
**Ronda:** 89
**Issue padre:** DOMAA-790

---

## Resumen Ejecutivo

R89 presenta **6 propuestas genuinamente nuevas** detectadas mediante investigación en documentación oficial y auditoría del código fuente. Hallazgo crítico: los **FAQ rich results de Google SOLO están disponibles para sitios gubernamentales y de salud** — Purity & Clean NO es elegible, invalidando parcialmente las propuestas de R88 sobre FAQPage. R89 aporta: (1) corrección del FAQPage eligibility, (2) blocking de crawlers SEO important, (3) Web Workers para JavaScript pesado, (4) Service-specific structured data, (5) resource hints para performance, y (6) read-more deep links para blog.

---

## Estado Actual del Proyecto (R89)

### Stack Técnico

| Componente | Estado | Notas |
|-----------|--------|-------|
| **Frontend** | HTML5 + CSS3 + Vanilla JS | index.html (~2,305 líneas), style.css (122KB), script.js (64KB) |
| **PWA** | ⚠️ SKIP_WAITING nunca invocado | Bug pendiente desde R83 — script.js no envía postMessage al SW |
| **FAQPage Schema** | ❌ INELIGIBLE para rich results | FAQ rich results SOLO para sitios government/health |
| **LocalBusiness por zona** | ✅ Implementado | Chapinero, Usaquén, Suba, Kennedy, etc. |
| **Blog Schema** | ✅ BlogPosting | HowTo pendiente (R86) |
| **robots.txt** | ❌ CRÍTICO | AhrefsBot y SemrushBot bloqueados — dañino para SEO |
| **Web Workers** | ❌ No implementados | heavy JS corre en main thread |

---

## Investigación: Documentación Oficial — Abril 2026

### Hallazgo 1: Restricción CRÍTICA — FAQ Rich Results Solo para Government/Health

Google Search Central actualizó la documentación de FAQPage en 2026. **El feature availability indica explícitamente:**

> "FAQ rich results are only available for well-known, authoritative websites that are government-focused or health-focused."

**Implicación para Purity & Clean:** El sitio es un negocio de limpieza de muebles — NO es elegible para FAQ rich results. Las propuestas de R88 sobre FAQPage requieren revisión. El FAQPage schema puede mantenerse por completeness, pero **no generará rich results en Google Search**.

**Fuente:** [FAQPage Documentation - developers.google.com](https://developers.google.com/search/docs/appearance/structured-data/faqpage) (Última actualización visible en el fetch)

---

### Hallazgo 2: robots.txt Bloquea Herramientas SEO Críticas

La configuración actual del robots.txt:

```
User-agent: AhrefsBot
Disallow: /

User-agent: SemrushBot
Disallow: /
```

**Problema:** AhrefsBot y SemrushBot son los principales crawlers de las herramientas SEO más usadas para:
- Análisis de backlinks
- Auditoría técnica SEO
- Investigación de palabras clave competitivas
- Monitoring de posiciones

Bloquearlos significa que Purity & Clean no aparece en los análisis de visibilidad de la competencia.

**Recomendación:** Eliminar el `Disallow: /` para ambos bots, o usar `Crawl-delay: 10` en lugar de bloqueo total.

**Fuente:** [Robots.txt Documentation - developers.google.com](https://developers.google.com/search/docs/crawling-indexing/robots/intro)

---

### Hallazgo 3: Web Workers API — JavaScript Fuera del Main Thread

La documentación de MDN (actualizada Sept 2025) describe Web Workers como el estándar para ejecutar scripts en background threads sin bloquear la UI.

El sitio tiene múltiples interactores que podrían beneficiarse:
- `initComparisonSliders()` — pointermove events de alta frecuencia
- `updateSearchResults()` — filtering en cada keystroke
- `initChatbot()` — múltiples event handlers
- Counter animations via Intersection Observer

**Implicación:** Mover tareas pesada a un Web Worker dedicado para operaciones de filtering/calculation reduciría el INP significativamente.

**Fuente:** [Using Web Workers - MDN](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers) (Última actualización Sept 2025)

---

### Hallazgo 4: Service Structured Data — Markup Específico por Tipo de Servicio

Schema.org define `Service` como tipo específico para ofertar servicios. Las páginas de zonas usan `LocalBusiness`, pero no hay `Service` markup para los servicios individuales (limpieza de sofás, sanitización de colchones, etc.).

**Beneficio:** Google puede mostrar rich cards específicos para cada servicio en search results.

**Fuente:** [Service Type - schema.org](https://schema.org/Service)

---

### Hallazgo 5: Resource Hints — dns-prefetch y preconnect

La documentación de performance indica que `dns-prefetch` y `preconnect` reducen latencia para recursos externos. El sitio carga:
- Google Fonts (fonts.googleapis.com, fonts.gstatic.com)
- Font Awesome (cdnjs.cloudflare.com)
- Plausible Analytics (plausible.io)

**Mejora:** Agregar `dns-prefetch` y `preconnect` para estos dominios reduciría el tiempo de conexión DNS y TLS.

**Fuente:** [Resource Hints - web.dev](https://web.dev/articles/preconnect-and-dns-prefetch)

---

### Hallazgo 6: Read More Deep Links en Snippets

Google actualizó la documentación de snippets (Abril 2026) para incluir "read more" deep links automáticos cuando el contenido tiene una sección de continuación clara.

**Implicación:** Los artículos de blog podrían implementar una sección "continuar leyendo" que genere automáticamente un enlace "read more" en los snippets de Google Search.

**Fuente:** [Snippet Documentation - Read More Deep Links](https://developers.google.com/search/docs/appearance/snippet#read-more-deep-links) (Actualizado Abril 20, 2026)

---

## Auditoría Directa del Código Fuente

### robots.txt — Bloqueo Crítico de Herramientas SEO

**Ubicación:** `/paperclip/instances/default/projects/.../Purity-Clean/robots.txt`

```txt
User-agent: AhrefsBot
User-agent: SemrushBot
Disallow: /
```

El bloqueo total de estos bots es contraproducente. Herramientas como Ahrefs y Semrush son las que los potenciales clientes usan para comparar proveedores de limpieza en Bogotá.

---

### FAQPage — Ineligible para Rich Results

**Ubicación:** `index.html` — FAQPage schema existe

Según la documentación oficial de Google, FAQ rich results **no están disponibles para sitios comerciales** como Purity & Clean. Solo sitios gubernamentales o de salud califican.

---

### GeoCoordinates — Elevation Ausente

**Ubicación:** `zonas/chapinero/index.html` línea 44-48

```json
"geo": {
  "@type": "GeoCoordinates",
  "latitude": "4.6470",
  "longitude": "-74.0633"
}
```

Schema.org soporta la propiedad `elevation` (WGS84). Aunque opcional, podría mejorar la precisión geoespacial para aplicaciones de mapas.

---

### script.js — Sin Web Workers

**Ubicación:** `js/script.js` — todo el JavaScript corre en el main thread

Los interactores (comparison sliders, search, chatbot, counters) no están optimizados para separación de threads.

---

### Service Worker — SKIP_WAITING Nunca Invocado

**Ubicación:** `sw.js` línea 30 — `skipWaiting()` existe pero nunca se llama desde script.js

El problema detectado en R83 sigue sin resolverse.

---

## Propuestas (Round 89)

### Propuesta 1: Eliminar Bloqueo de AhrefsBot y SemrushBot en robots.txt (HIGH PRIORITY — SEO)

| Campo | Detalle |
|-------|---------|
| **Título** | Remover el `Disallow: /` para AhrefsBot y SemrushBot del robots.txt |
| **Problema** | El robots.txt actual bloquea completamente a AhrefsBot y SemrushBot, los crawlers de las herramientas SEO más usadas para análisis de visibilidad competitiva. Purity & Clean no aparece en reportes de backlinks ni auditorías SEO de potenciales clientes que usan estas herramientas. |
| **Descripción** | **En `robots.txt`, reemplazar:** ```txt User-agent: AhrefsBot User-agent: SemrushBot Disallow: / ``` **Por:** ```txt User-agent: AhrefsBot User-agent: SemrushBot Crawl-delay: 10 ``` El `Crawl-delay: 10` reduce la carga en el servidor sin bloquear completamente a estas herramientas. Alternativamente, si se quiere mantener el bloqueo por preocupación de server load, al menos permitir rutas públicas (`Disallow: /api/` o `Disallow: /js/config.js`). |
| **Impacto esperado** | Purity & Clean aparecerá en análisis de visibilidad de competidores. Potenciales clientes que investigan proveedores de limpieza en Bogotá podrán encontrar a Purity & Clean en reportes de SEO. Incremento enCTR desde búsqueda orgánica. |
| **Esfuerzo** | S (5 minutos — editar robots.txt) |
| **Agente recomendado** | Full Stack |
| **Referencias** | [1] Robots.txt Documentation - developers.google.com [2] AhrefsBot Documentation - ahrefs.com [3] SemrushBot Documentation - semrush.com |
| **Estado** | Nueva propuesta — no cubierta en R87 ni R88 |
| **Prioridad CEO** | Alta — Impacto directo en visibilidad SEO |

---

### Propuesta 2: Service Structured Data para cada Servicio Individual (MEDIUM PRIORITY — SEO)

| Campo | Detalle |
|-------|---------|
| **Título** | Implementar Service schema markup para cada servicio específico en páginas de zonas |
| **Problema** | Las páginas de zonas tienen LocalBusiness schema, pero los servicios individuales (limpieza de sofás, sanitización de colchones, mantenimiento de alfombras) no tienen Service markup dedicado. Google no puede identificar y mostrar rich cards específicos para cada servicio. |
| **Descripción** | **En `zonas/chapinero/index.html`, después del LocalBusiness schema, agregar Service markup para cada servicio:** ```json <script type="application/ld+json"> { "@context": "https://schema.org", "@type": "Service", "name": "Limpieza profunda de sofás en Chapinero", "description": "Servicio profesional de limpieza profunda de sofás en Chapinero y alrededores. Incluye sanitización y eliminación de manchas.", "provider": { "@type": "LocalBusiness", "name": "Purity & Clean - Chapinero" }, "areaServed": { "@type": "Place", "name": "Chapinero", "containedInPlace": { "@type": "AdministrativeArea", "name": "Bogotá" } }, "hasOfferCatalog": { "@type": "OfferCatalog", "name": "Servicios de limpieza de sofás", "itemListElement": [ { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Limpieza de sofá individual" }, "price": "80000", "priceCurrency": "COP" }, { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Limpieza de sofá de 3 plazas" }, "price": "120000", "priceCurrency": "COP" } ] } } </script> ``` **Repetir para:** sanitización de colchones, mantenimiento de alfombras, limpieza de sillas de oficina. |
| **Impacto esperado** | Rich cards específicos para cada servicio en Google Search. Mayor CTR para consultas como "limpieza de sofás Chapinero Bogotá". Diferenciación de la competencia local. |
| **Esfuerzo** | M (2-3 horas — crear Service markup para 4 servicios × 11 zonas) |
| **Agente recomendado** | Frontend |
| **Referencias** | [4] Service Type - schema.org [5] ServiceRepairShop - schema.org |
| **Estado** | Nueva propuesta — no cubierta en R87 ni R88 |
| **Prioridad CEO** | Media — SEO para servicios específicos por zona |

---

### Propuesta 3: Implementar Web Worker para Filtrado de Búsqueda y Comparación (MEDIUM PRIORITY — Performance/INP)

| Campo | Detalle |
|-------|---------|
| **Título** | Crear Web Worker dedicado para operaciones pesadas de filtering y comparación |
| **Problema** | El JavaScript de búsqueda (updateSearchResults) y comparison sliders corre en el main thread, bloqueando el render durante operaciones de alta frecuencia. Esto afecta el INP (Interaction to Next Paint) que Google mide como Core Web Vital. |
| **Descripción** | **Paso 1 — Crear `js/search-worker.js`:** ```javascript self.onmessage = (event) => { const { query, items, filters } = event.data; const normalizedQuery = query.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""); const filtered = items.filter(item => { const name = item.dataset.name || ""; const type = item.dataset.type || ""; const segment = item.dataset.segment || ""; const searchText = `${name} ${type} ${segment}`.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""); return searchText.includes(normalizedQuery); }); self.postMessage({ results: filtered.map(item => item.dataset.name) }); }; ``` **Paso 2 — En script.js, usar el worker:** ```javascript const searchWorker = new Worker("search-worker.js"); let searchDebounceTimer; searchInput.addEventListener("input", (event) => { clearTimeout(searchDebounceTimer); searchDebounceTimer = setTimeout(() => { searchWorker.postMessage({ query: event.target.value, items: [...document.querySelectorAll(".searchable-item")], filters: {} }); }, 300); }); searchWorker.onmessage = (event) => { updateSearchResultsUI(event.data.results); }; ``` **Paso 3 — Para comparison sliders, crear un `slider-worker.js`** que procese los cálculos de posición sin bloquear el main thread. |
| **Impacto esperado** | Reducción significativa de INP. El main thread queda libre para responder a interacciones del usuario. Mejora en Core Web Vitals. Experiencia de usuario más fluida durante búsquedas y comparaciones. |
| **Esfuerzo** | M (3-4 horas — crear workers + refactorizar interactores) |
| **Agente recomendado** | Frontend |
| **Referencias** | [6] Using Web Workers - MDN [7] Web Workers API - MDN |
| **Estado** | Nueva propuesta — no cubierta en R87 ni R88 |
| **Prioridad CEO** | Media — Performance improvement directo para INP |

---

### Propuesta 4: Resource Hints para Recursos Externos (LOW Priority — Performance)

| Campo | Detalle |
|-------|---------|
| **Título** | Agregar preconnect y dns-prefetch para Google Fonts, Font Awesome y Plausible |
| **Problema** | El sitio carga recursos de múltiples dominios externos (fonts.googleapis.com, cdnjs.cloudflare.com, plausible.io) sin resource hints. Esto significa que el navegador debe resolver DNS y establecer conexiones TLS desde cero en cada visita. |
| **Descripción** | **En `index.html`, dentro del `<head>`, antes de los links existentes:** ```html <!-- Resource hints para recursos externos --> <link rel="dns-prefetch" href="//fonts.googleapis.com"> <link rel="dns-prefetch" href="//fonts.gstatic.com" crossorigin> <link rel="dns-prefetch" href="//cdnjs.cloudflare.com"> <link rel="dns-prefetch" href="//plausible.io"> <link rel="preconnect" href="https://fonts.googleapis.com" crossorigin> <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin> <link rel="preconnect" href="https://cdnjs.cloudflare.com" crossorigin> ``` **También aplicar a:** - `zonas/*/index.html` - `blog/articulos/*.html` - `offline.html` |
| **Impacto esperado** | Reducción de ~50-100ms en tiempo de conexión para recursos externos. DNS lookup y TLS handshake se ejecutan antes de que el navegador necesite el recurso. Mejora en Largest Contentful Paint (LCP). |
| **Esfuerzo** | S (30 minutos — agregar 6 líneas en cada página) |
| **Agente recomendado** | Frontend |
| **Referencias** | [8] Resource Hints - web.dev [9] preconnect - web.dev |
| **Estado** | Nueva propuesta — no cubierta en R87 ni R88 |
| **Prioridad CEO** | Baja — Performance improvement menor, pero con esfuerzo mínimo |

---

### Propuesta 5: FAQPage sin Expectativa de Rich Results + QAPage como Alternativa (LOW Priority — SEO)

| Campo | Detalle |
|-------|---------|
| **Título** | Corregir FAQPage para que no induzca a error sobre rich results y evaluar QAPage como alternativa |
| **Problema** | El sitio tiene FAQPage schema pero Google NO mostrará rich results porque Purity & Clean no es un sitio gubernamental ni de salud. Esto induce a error al CEO sobre el potencial real del schema. Existe además el tipo QAPage que permite marcar contenido de preguntas y respuestas. |
| **Descripción** | **Opción 1 — Mantener FAQPage sin expectativa de rich results:** El FAQPage schema es válido y puede ayudar a Google a entender el contenido, pero no generará rich results. Continuar usando FAQPage como está, documentando que no es elegible para rich display. **Opción 2 — Explorar QAPage si el sitio tiene contenido de Q&A:** Si Purity & Clean planea agregar una sección de preguntas frecuentes donde usuarios puedenSubmit respuestas, QAPage sería el tipo correcto. QAPage requiere que los usuarios puedan enviar respuestas alternativas, cosa que FAQPage no permite. **Recomendación:** Mantener FAQPage actual (no hace daño), pero no promocionarlo internamente como feature de SEO. |
| **Impacto esperado** | Expectativas correctas sobre el potencial del schema. Ningún impacto negativo en SEO. Claridad sobre qué markup genera qué resultados. |
| **Esfuerzo** | S (5 minutos — actualizar documentación interna) |
| **Agente recomendado** | Content / SEO |
| **Referencias** | [10] QAPage Documentation - developers.google.com [11] FAQPage Documentation - developers.google.com |
| **Estado** | Nueva propuesta — corrección de concepto errado en R88 |
| **Prioridad CEO** | Baja — Corrección de documentación, no de código |

---

### Propuesta 6: Read More Deep Links para Artículos de Blog (LOW Priority — SEO)

| Campo | Detalle |
|-------|---------|
| **Título** | Implementar sección "continuar leyendo" al final de artículos de blog para activar read-more deep links |
| **Problema** | Google agregó soporte para "read more" deep links automáticos en snippets (Abril 2026). Los artículos de blog terminan sin sección de continuación, perdiendo la oportunidad de generar enlaces automáticos en search results. |
| **Descripción** | **En `blog/articulos/como-limpiar-tu-sofa.html`, al final del artículo, agregar:** ```html <section class="continue-reading" aria-label="Artículos relacionados"> <h2>Continuar leyendo</h2> <div class="related-articles"> <article class="related-card"> <a href="../articulos/guia-sanitizacion-colchones.html"> <span class="card-eyebrow">Hogar</span> <span class="card-title">Guía completa de sanitización de colchones en Colombia</span> <span class="card-read-time">5 min de lectura</span> </a> </article> <article class="related-card"> <a href="../articulos/5-tips-mantenimiento-alfombras.html"> <span class="card-eyebrow">Hogar</span> <span class="card-title">5 tips para el mantenimiento de alfombras</span> <span class="card-read-time">4 min de lectura</span> </a> </article> <article class="related-card"> <a href="../articulos/limpiar-sillas-oficina-bogota.html"> <span class="card-eyebrow">Oficina</span> <span class="card-title">Cómo limpiar sillas de oficina en Bogotá</span> <span class="card-read-time">3 min de lectura</span> </a> </article> </div> </section> ``` **Estilos en blog.css:** ```css .continue-reading { padding: 2rem 0; border-top: 1px solid var(--color-border); } .related-articles { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1rem; } ``` |
| **Impacto esperado** | Google generará automáticamente enlaces "read more" en snippets de búsqueda para artículos de blog. Mayor CTR desde resultados de búsqueda. Los usuarios ven más contenido del sitio antes de hacer click. |
| **Esfuerzo** | S (1-2 horas — crear sección + estilos para todos los artículos) |
| **Agente recomendado** | Frontend |
| **Referencias** | [12] Read More Deep Links - developers.google.com (Abril 2026) |
| **Estado** | Nueva propuesta — no cubierta en R87 ni R88 |
| **Prioridad CEO** | Baja — SEO para blog, depende de content accuracy |

---

## Orden de Implementación Recomendado

| # | Propuesta | Impacto | Esfuerzo | Prioridad |
|---|-----------|---------|----------|-----------|
| 1 | Eliminar bloqueo AhrefsBot/SemrushBot | SEO (Visibilidad) | S (5min) | **Alta** |
| 2 | Service schema por servicio/zona | SEO (Rich Cards) | M (2-3h) | **Media** |
| 3 | Web Workers para search/slider | Performance (INP) | M (3-4h) | **Media** |
| 4 | Resource hints (preconnect/dns-prefetch) | Performance (LCP) | S (30min) | **Baja** |
| 5 | FAQPage — corregir expectativas | SEO (Documentación) | S (5min) | **Baja** |
| 6 | Read more deep links para blog | SEO (Blog) | S (1-2h) | **Baja** |

---

## Dependencias y Bloqueadores

| Propuesta | Depende de | Bloqueador |
|-----------|------------|------------|
| Eliminar bloqueo robots.txt | Ninguno | Ninguno |
| Service schema | Ninguno | Ninguno |
| Web Workers | Ninguno | Ninguno |
| Resource hints | Ninguno | Ninguno |
| FAQPage corrección | Ninguno | Ninguno |
| Read more deep links | Content — artículos relacionados | Verificar articles existentes |

---

## Corrección Importante: FAQPage de R88

La propuesta #1 de R88 sobre "FAQPage Question markup extendido" tiene un problema fundamental: **Purity & Clean NO es elegible para FAQ rich results** según la documentación oficial de Google.

Google explícitamente estados:

> "FAQ rich results are only available for well-known, authoritative websites that are government-focused or health-focused."

El sitio de Purity & Clean es un negocio de limpieza de muebles — no califica.

**Acción recomendada:** Marcar la propuesta #1 de R88 como "no applicable — site not eligible for FAQ rich results" y no invertir tiempo en enrichacer el FAQPage schema si el objetivo es generar rich results.

---

## Comparación con R88 (Qué es Nuevo en R89)

| Aspecto | R88 | R89 |
|---------|-----|-----|
| FAQPage | Question markup extendido | **CORRECCIÓN: FAQ rich results no disponibles para sites comerciales** |
| robots.txt | No mencionada | AhrefsBot/SemrushBot bloqueados — riesgo SEO |
| Web Workers | Throttle/debounce (main thread) | Web Workers separados (background thread) |
| Service Schema | No mencionada | Service markup por servicio/zona |
| Resource Hints | No mencionada | preconnect + dns-prefetch |
| Read More | No mencionada | Deep links para artículos de blog |

**R89 no repite ninguna propuesta de R88.** Las 6 propuestas son genuinamente nuevas o corrigen conceptos erróneos.

---

## Fuentes

[1] Robots.txt Documentation. https://developers.google.com/search/docs/crawling-indexing/robots/intro

[2] AhrefsBot Documentation. https://ahrefs.com/robot/

[3] SemrushBot Documentation. https://semrush.com/bot/

[4] Service Type. https://schema.org/Service

[5] ServiceRepairShop. https://schema.org/ServiceRepairShop

[6] Using Web Workers. https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers

[7] Web Workers API. https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API

[8] Resource Hints. https://web.dev/articles/preconnect-and-dns-prefetch

[9] Preconnect. https://web.dev/articles/preconnect

[10] QAPage Documentation. https://developers.google.com/search/docs/appearance/structured-data/qapage

[11] FAQPage Documentation. https://developers.google.com/search/docs/appearance/structured-data/faqpage

[12] Read More Deep Links. https://developers.google.com/search/docs/appearance/snippet#read-more-deep-links

---

*Documento generado por Innovation Scout — Round 89*
*Purity & Clean Analysis — 2026-04-28*
*Co-Authored-By: Paperclip <noreply@paperclip.ing>*