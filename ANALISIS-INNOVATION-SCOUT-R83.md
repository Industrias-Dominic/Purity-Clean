# Análisis Creativo — Purity & Clean (Round 83)

**Proyecto:** Purity & Clean
**Fecha:** 2026-04-28
**Analista:** Innovation Scout
**Ronda:** 83
**Issue padre:** DOMAA-766

---

## Resumen Ejecutivo

R83 analiza el estado actual del sitio tras las correcciones de R82 y encuentra 5 propuestas genuinamente nuevas. El sitio ya tiene: chatbot FAQ implementado (CHATBOT_FAQ en config.js + script.js líneas 960-1015), critical.css prelinkeado, trust badges, service worker con SKIP_WAITING, blog completo con TOC/reading-progress/schema Article+BlogPosting. Las propuestas nuevas se concentran en: (1) HowTo Schema en artículos de blog, (2) deduplicación DRY de las 13 páginas de zonas con template dinámicas, (3) mejora en meta descriptions de zonas, (4) structured data adicional (Service y BreadcrumbList), y (5) mejorar el proceso de "cómo funciona" para diferenciarse de Serviclean.co.

---

## Estado Actual del Proyecto (R83)

### Stack Técnico

| Componente | Estado | Notas |
|-----------|--------|-------|
| **Frontend** | HTML5 + CSS3 + Vanilla JS | index.html (2,305 líneas), style.css (6,212 líneas), script.js (1,847 líneas) |
| **PWA** | ✅ Implementado | Service Worker v1 con SKIP_WAITING handler (sw.js líneas 153-157) |
| **Critical CSS** | ✅ Preload listo | link rel="preload" en index.html, CSS Variables idénticas en critical.css y style.css |
| **Testing** | ✅ Playwright configurado | 9 specs |
| **SEO** | ✅ Schema.org + OG + FAQPage + Article + BlogPosting | JSON-LD completo |
| **Analytics** | ✅ Plausible (cookieless) | Sin cookies |
| **Formspree** | ✅ Integración real | Booking y newsletter operativos |
| **Booking** | ✅ Formulario multi-step | Con stepper visual y geolocalización |
| **Dark mode** | ✅ Con prefers-color-scheme | localStorage persistence |
| **Trust Badges** | ✅ Implementado | Sección #confianza |
| **Google Reviews** | ✅ Implementado | Sección testimonios |
| **WhatsApp** | ✅ Link operativo | Número real de negocio |
| **Zonas SEO** | ✅ 10+ landing pages | Chapinero, Usaquén, etc. |
| **Comparison Sliders** | ✅ Implementado | Unsplash |
| **Chatbot FAB** | ✅ IMPLEMENTADO | CHATBOT_FAQ en config.js + initChatbot() en script.js |
| **Blog** | ✅ TOC + reading progress + schema | Artículos con Article + BlogPosting JSON-LD |
| **Security Headers** | ❌ NO implementados | GitHub Pages no soporta `_headers` |
| **localStorage Consent** | ❌ NO implementado | GDPR/Ley 1581 gap |
| **Service Worker** | ⚠️ v1 con SKIP_WAITING | Pero no fuerza update tras deploy |

### Progreso de Implementación (R1 → R83)

| Dominio | Implementado | Pendiente |
|---------|-------------|-----------|
| Trust signals / Badges | ✅ | - |
| Formularios reales | ✅ | - |
| Booking UX | ✅ | - |
| SEO local (zonas) | ✅ | - |
| Comparison Sliders | ✅ | - |
| CSS crítico | ✅ R82 corrigió | - |
| Chatbot FAB | ✅ R82 corrigió | - |
| Blog schema | ✅ Article + BlogPosting | - |
| Service Worker SKIP_WAITING | ✅ Ya existe | Falta postMessage en script.js |
| Security headers | ❌ | Necesita migrate hosting |
| localStorage consent | ❌ | GDPR gap |
| Service Worker v2 | ⚠️ Handler existe | No se fuerza SKIP_WAITING tras deploy |

---

## Investigación: Benchmark Competitivo y Gaps Reales

### Benchmark Competitivo

| Feature | Purity & Clean | Serviclean.co | Limpieza Experta |
|---------|-----------------|---------------|------------------|
| Proceso "Cómo funciona" | ❌ No visible en homepage | ✅ 4 pasos con iconos | ✅ 3 pasos con callouts |
| FAQ page dedicada | ❌ Solo JSON-LD | ❌ No visible | ✅ /faq/ con 6 Q&A |
| Shipping / Delivery info | ❌ N/A (servicio local) | ❌ No visible | ❌ No visible |
| Blog con HowTo schema | ❌ Solo Article/BlogPosting | ❌ Sin blog | ❌ Blog sin schema |
| Zonas con meta description | ⚠️ Posible vacío | ❌ No visible | ❌ No visible |
| Breadcrumb JSON-LD | ❌ No implementado | ❌ No visible | ❌ No visible |
| Service Schema | ❌ No implementado | ❌ No visible | ❌ No visible |

### Hallazgos Clave de la Competencia

**Serviclean.co** (https://serviclean.co):
- Tiene tienda WooCommerce (productos de limpieza)
- Sección "Cómo funciona" clara: Cotiza → Limpieza → Relájate
- Trust score con 34 reseñas
- Números de WhatsApp operativos
- **No tienen chatbot, no tienen blog funcional**

**Limpieza Experta** (https://limpiezaexperta.com):
- FAQ page dedicada (/nosotros/faq/)
- Proceso visual "Así trabajamos"
- Catálogo de servicios completo (6 tipos)
- Blog con artículos pero SIN structured data
- **No tienen chatbot, no tienen Schema rico**

### Gaps Genuinos Detectados en R83

1. **HowTo Schema en blog** — Artículos como "Cómo limpiar tu sofá" son candidatos perfectos para HowTo schema (step-by-step). El site ya tiene Article + BlogPosting pero falta HowTo.

2. **13 páginas de zonas con código duplicado** — Las páginas en `zonas/*/index.html` repiten estructura. DOMAA-111 creó un template pero el código sigue duplicado en 13 archivos.

3. **Meta descriptions en zonas** — Las zonas pages pueden tener meta descriptions genéricas o faltantes.

4. **BreadcrumbList JSON-LD** — No implementado. Serviclean.co y Limpieza Experta tampoco lo tienen.

5. **Service Schema para cada servicio** — El LocalBusiness schema tiene servicios, pero un Service schema individual sería más explícito para Google.

6. **Forzar SKIP_WAITING en script.js** — El SW tiene el handler pero script.js NO envía el mensaje postMessage para forzar el update.

---

## Propuestas (Round 83)

### Propuesta 1: HowTo Schema en Artículos de Blog (Media Prioridad)

| Campo | Detalle |
|-------|---------|
| **Título** | Agregar HowTo structured data a los artículos de blog tipo guía |
| **Problema** | Los artículos del blog como "Cómo limpiar tu sofá" y "Guía completa para sanitizar tu colchón" son guías paso a paso. Google reconoce HowTo schema para rich snippets, pero el sitio solo usa Article + BlogPosting. La competencia no tiene HowTo schema — oportunidad de diferenciación. |
| **Descripción** | En cada artículo de blog (los 6 artículos actuales), dentro del `<script type="application/ld+json">` de BlogPosting, AGREGAR un segundo bloque JSON-LD de tipo HowTo. Ejemplo para `como-limpiar-tu-sofa.html`: ```json { "@context": "https://schema.org", "@type": "HowTo", "name": "Cómo limpiar tu sofá en casa sin dañarlo", "description": "Guía paso a paso para limpiar sofás con métodos profesionales.", "step": [ { "@type": "HowToStep", "name": "Paso 1: Aspirado profundo", "text": "Retira los cojines y aspira cada superficie usando el accesorio de rendija para costuras." }, { "@type": "HowToStep", "name": "Paso 2: Limpieza de manchas", "text": "Mezcla agua tibia con detergente neutro. Presiona suavemente sobre la mancha sin frotar." }, { "@type": "HowToStep", "name": "Paso 3: Limpieza general", "text": "Rocía ligeramente la mezcla sobre toda la superficie y pasa un trapo microfibra." }, { "@type": "HowToStep", "name": "Paso 4: Secado correcto", "text": "Abre ventanas para ventilación cruzada. Usa secador de pelo en aire frío a 30cm." } ], "totalTime": "PT8M", "tool": { "@type": "HowToTool", "name": "Aspiradora con accesorio de tapicería" }, "supply": [ { "@type": "HowToSupply", "name": "Trapo microfibra" }, { "@type": "HowToSupply", "name": "Jabón neutro" }, { "@type": "HowToSupply", "name": "Vinagre blanco" } ] } ``` **Nota:** Para artículos que NO son guías paso a paso (ej: "7 señales de que tu empresa necesita..."), no agregar HowTo — solo mantener Article/BlogPosting. |
| **Impacto esperado** | Posibles rich snippets en Google para búsquedas de guías de limpieza. Diferenciación vs competencia que no tiene HowTo. Impacto SEO moderado-alto. |
| **Esfuerzo** | S (1-2 horas — JSON-LD en 3-4 artículos que son guías) |
| **Agente recomendado** | Frontend |
| **Referencias** | [1] HowTo schema — developers.google.com [2] How-to content — searchcentral.google.com |
| **Estado** | Fundamentada — gap genuino identificado en R83. Artículos tipo guía son candidatos ideales. |

---

### Propuesta 2: Deduplicar las 13 Páginas de Zonas con JS Template (HIGH PRIORITY)

| Campo | Detalle |
|-------|---------|
| **Título** | Reemplazar 13 archivos zonas/*.html duplicados con una única página dinámica basada en URL |
| **Problema** | DOMAA-111 creó un sistema de template para generar páginas de zonas dinámicamente, pero los 13 archivos `zonas/*/index.html` siguen existiendo como copias independientes. Cada vez que se necesita cambiar la estructura (header, footer, CTA, estructura de contenido), hay que editar 13 archivos. Esto es una violación de DRY y fuente de deuda técnica. |
| **Descripción** | **Opción A (recomendada):** Un solo archivo `zonas/index.html` que lee el pathname y renderiza contenido dinámicamente: ```javascript // En zonas/index.html (o nuevo archivo zonas.js) const ZONA_DATA = { 'chapinero': { nombre: 'Chapinero', meta: 'Servicios de limpieza en Chapinero...', descripcion: '...', servicios: [...] }, 'usaquen': { ... }, // etc para las 13 zonas }; function getZonaFromPath() { const parts = window.location.pathname.split('/'); return parts[parts.length - 2] || 'chapinero'; // fallback } function renderZona() { const zona = getZonaFromPath(); const data = ZONA_DATA[zona]; if (!data) { window.location.href = '/zonas'; return; } // Renderizar contenido dinámicamente desde ZONA_DATA document.getElementById('zona-nombre').textContent = data.nombre; document.querySelector('meta[name="description"]').content = data.meta; // etc } ``` **Opción B:** Mantener las 13 páginas pero con includes PHP/server-side (pero el site es estático, así que no aplica). **Acciones:** 1. Crear `js/zonas-data.js` con el diccionario ZONA_DATA 2. Crear `zonas/index.html` como template único 3. Redirects 301 de cada `zonas/{zona}/index.html` al template 4. Actualizar sitemap.xml para apuntar a la estructura nueva **Archivo zonas/index.html ejemplo:** ```html <!doctype html> <html lang="es"> <head> <meta charset="UTF-8"> <meta name="viewport" content="width=device-width, initial-scale=1.0"> <title>Servicios de limpieza en {ZONA} | Purity & Clean</title> <meta name="description" content="{META_DESCRIPTION}"> <link rel="canonical" href="https://purityclean.com/zonas/{zona}/"> <!-- JSON-LD LocalBusiness + Service --> </head> <body> <header>...</header> <main id="zona-content" data-zona="{ZONA}"> <h1>Servicios de limpieza en {ZONA}</h1> <p>{DESCRIPCION}</p> <!-- Servicios por zona --> </main> <footer>...</footer> <script src="../js/script.js"></script> <script src="../js/zonas-data.js"></script> </body> </html> ``` |
| **Impacto esperado** | Eliminación de deuda técnica significativa. Mantenimiento simplificado. Consistencia entre zonas. Preparación para expansión futura de zonas sin duplicar código. |
| **Esfuerzo** | M (4-5 horas — crear data file + template + redirects) |
| **Agente recomendado** | Frontend / Full Stack |
| **Referencias** | [3] DRY principle — wikipedia.org [4] Single source of truth pattern |
| **Estado** | Fundamentada — brecha técnica genuina detectada. 13 archivos duplicados. |

---

### Propuesta 3: BreadcrumbList + Service JSON-LD para SEO Local (Media Prioridad)

| Campo | Detalle |
|-------|---------|
| **Título** | Implementar BreadcrumbList schema en index.html y Service schema explícito |
| **Problema** | El sitio tiene LocalBusiness schema completo pero no tiene BreadcrumbList (mejora navegación en Google) ni Service schema individual para cada servicio (más explícito que OfferCatalog). La competencia no tiene ninguno de los dos. |
| **Descripción** | **BreadcrumbList en index.html** (después del FAQPage JSON-LD): ```json { "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [ { "@type": "ListItem", "position": 1, "name": "Inicio", "item": "https://purityclean.com/" }, { "@type": "ListItem", "position": 2, "name": "Servicios", "item": "https://purityclean.com/#servicios" } ] } ``` **Service schema individual** (agregar después de LocalBusiness): ```json { "@context": "https://schema.org", "@type": "Service", "name": "Limpieza profunda de sofás", "description": "Servicio profesional de limpieza profunda para sofás y muebles tapizados.", "provider": { "@type": "LocalBusiness", "name": "Purity & Clean" }, "areaServed": { "@type": "City", "name": "Bogotá" }, "hasOfferCatalog": { "@type": "OfferCatalog", "offers": { "@type": "Offer", "priceSpecification": { "@type": "PriceSpecification", "minPrice": "80000", "priceCurrency": "COP" } } } } ``` Repetir Service schema para cada servicio principal (sofás, colchones, alfombras, sillas de oficina). |
| **Impacto esperado** | Mejor navegación en Google Search Console. Mayor claridad semántica para Googlebot. Posibles rich snippets de breadcrumb en resultados. Impacto SEO moderado. |
| **Esfuerzo** | S (1-2 horas — JSON-LD) |
| **Agente recomendado** | Frontend |
| **Referencias** | [5] BreadcrumbList schema — developers.google.com [6] Service schema — developers.google.com |
| **Estado** | Fundamentada — SEO incremental con esfuerzo mínimo. |

---

### Propuesta 4: Forzar SKIP_WAITING en Service Worker (LOW Priority — quick win)

| Campo | Detalle |
|-------|---------|
| **Título** | Agregar postMessage en script.js para forzar SKIP_WAITING tras registro del SW |
| **Problema** | El service worker (`sw.js` líneas 153-157) ya tiene el handler `self.addEventListener('message', ...)` que recibe `SKIP_WAITING`. Pero `script.js` NUNCA envía este mensaje. Los usuarios con el SW antiguo cacheado no reciben actualizaciones hasta que cierren TODAS las pestañas. |
| **Descripción** | **En `js/script.js`, al final del archivo, después del registro del Service Worker:** ```javascript // Force SW update after registration if ('serviceWorker' in navigator) { navigator.serviceWorker.register('/sw.js').then((registration) => { if (registration.active) { registration.active.postMessage({ type: 'SKIP_WAITING' }); } }); } ``` Esto fuerza que el SW activo se actualice inmediatamente cuando el usuario visita con una versión nueva del SW. Combinado con el cache invalidation (CACHE_NAME update), garantiza que los usuarios siempre vean la versión más reciente. **Alternativa (si no funciona):** En el evento `controllerchange` del SW: ```javascript navigator.serviceWorker.addEventListener('controllerchange', () => { window.location.reload(); }); ``` Esto recarga la página cuando el SW toma control. |
| **Impacto esperado** | Usuarios ven contenido actualizado inmediatamente tras deploy. Elimina la necesidad de cerrar todas las pestañas para ver cambios. PWA que realmente funciona. |
| **Esfuerzo** | S (15 minutos — agregar postMessage) |
| **Agente recomendado** | Frontend |
| **Referencias** | [7] Service Worker update — developer.chrome.com |
| **Estado** | Fundamentada — código del handler ya existe, solo falta invocarlo. Quick win. |

---

### Propuesta 5: Revisar Meta Descriptions en Páginas de Zonas (LOW Priority)

| Campo | Detalle |
|-------|---------|
| **Título** | Auditar y completar meta descriptions de las 10+ páginas de zonas |
| **Problema** | Las páginas de zonas (Chapinero, Usaquén, Suba, etc.) pueden tener meta descriptions genéricas o duplicadas. Google penaliza descriptions duplicadas o demasiado cortas. Este es un gap de SEO técnico que no requiere cambios en código, solo revisión de contenido. |
| **Descripción** | **Auditoría requerida:** 1. Revisar cada `zonas/{zona}/index.html` — verificar que `<meta name="description">` existe y es única para esa zona 2. Cada description debe: - Tener entre 120-160 caracteres - Incluir el nombre de la zona - Describir el servicio específico para esa zona - Incluir un CTA implícito 3. Verificar que el `<title>` sigue el patrón "Servicios de limpieza en {ZONA} | Purity & Clean" 4. Confirmar que el canonical URL apunta a la página específica, no a una genérica **Ejemplo de meta description buena para Chapinero:** `<meta name="description" content="Servicios de limpieza profesional en Chapinero. Limpieza de sofás, colchones y alfombras con garantía de 7 días. Reserva online o por WhatsApp.">` **Ejemplo malo (genérico):** `<meta name="description" content="Servicios de limpieza a domicilio en Bogotá. Calidad garantizada.">` **Herramienta:** Usar `grep -r 'meta name="description"' zonas/` para listar todas las páginas y detectar duplicados o vacíos. |
| **Impacto esperado** | Mejora SEO técnico de páginas de zonas. Evita penalizaciones de Google por duplicate/missing descriptions. Impacto bajo pero sin esfuerzo de código. |
| **Esfuerzo** | S (30 minutos — auditoría y ajuste de textos) |
| **Agente recomendado** | SEO / Content |
| **Referencias** | [8] Meta description guidelines — developers.google.com |
| **Estado** | Fundamentada — gap de SEO técnico. No requiere código, solo content review. |

---

## Orden de Implementación Recomendado

| # | Propuesta | Impacto | Esfuerzo | Prioridad |
|---|-----------|---------|----------|-----------|
| 1 | HowTo Schema en artículos de blog | SEO + Rich snippets | S (1-2h) | **Alta** |
| 2 | Deduplicar 13 páginas de zonas | DX + Mantenibilidad | M (4-5h) | **Alta** |
| 3 | BreadcrumbList + Service JSON-LD | SEO | S (1-2h) | **Media** |
| 4 | Forzar SKIP_WAITING en SW | UX post-deploy | S (15min) | **Media** |
| 5 | Revisar meta descriptions en zonas | SEO técnico | S (30min) | **Baja** |

---

## Nota sobre el Estado del Proyecto

R83 marca un punto de inflexión: el sitio Purity & Clean ha implementado la gran mayoría de propuestas técnicas de las rondas anteriores. Las propuestas restantes se dividen en:

1. **Con esfuerzo pequeño/medio, impacto alto**: HowTo schema, deduplicación de zonas, BreadcrumbList
2. **Quick wins**: SKIP_WAITING force, meta descriptions
3. **Bloqueados por infraestructura**: Security headers (requiere cambiar de GitHub Pages)

El site es técnicamente maduro. El siguiente paso natural es consolidación (menos deuda técnica) antes de proponer nuevas features.

---

## Fuentes

[1] HowTo Schema Documentation. https://developers.google.com/search/docs/appearance/structured-content/how-to
[2] How-to Content Guidelines. https://developers.google.com/search/docs/specialty/content/how-to-content
[3] DRY Principle. https://en.wikipedia.org/wiki/Don%27t_repeat_yourself
[4] Single Source of Truth Pattern. https://martinfowler.com/bliki/SingleSourceOfTruth.html
[5] BreadcrumbList Schema. https://developers.google.com/search/docs/appearance/structured-data/breadcrumb
[6] Service Schema. https://developers.google.com/search/docs/appearance/structured-data/service
[7] Service Worker Update Pattern. https://developer.chrome.com/docs/workbox/fundamentals/service-worker-lifecycle
[8] Meta Description Guidelines. https://developers.google.com/search/docs/appearance/snippet

---

*Documento generado por Innovation Scout — Round 83*
*Purity & Clean Analysis — 2026-04-28*
*Co-Authored-By: Paperclip <noreply@paperclip.ing>*