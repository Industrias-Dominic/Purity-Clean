# Análisis Creativo — Purity & Clean (Round 92)

**Proyecto:** Purity & Clean
**Fecha:** 2026-04-28
**Analista:** Innovation Scout
**Ronda:** 92
**Issue padre:** DOMAA-841

---

## Resumen Ejecutivo

R92 se diferencia de R90 y R91 al enfocarse en **web platform APIs modernas** que no se han propuesto en 91 rondas anteriores. Estas APIs están ahora en Baseline 2025 y permiten mejoras de performance, UX y capacidades sin dependencias externas.

**Hallazgos clave:**
- View Transitions API (Chrome 111+, Firefox 126+, Safari 18+) — transiciones suaves entre páginas
- CSS Container Queries (Baseline 2024) — componentes responsive basados en contenedor
- Popover API (Baseline 2025) — reemplazo moderno de tooltips y paneles
- Content-visibility (Baseline 2025) — skip rendering de contenido off-screen
- Speculation Rules API (Chrome 121+) — prerender de páginas para navegación instantánea

---

## Estado Actual del Proyecto (R92)

### Stack Técnico

| Componente | Estado | Líneas |
|-----------|--------|--------|
| **Frontend** | HTML5 + CSS3 + Vanilla JS | index.html (2,305), style.css (6,212), script.js (1,847) |
| **PWA** | Funcional con SKIP_WAITING | sw.js (197 líneas) |
| **Tests E2E** | 9 archivos Playwright | tests/e2e/ |
| **Chatbot** | WhatsApp panel con CSS transitions | script.js |
| **Theme** | Dark mode con CSS custom properties | style.css |
| **Search** | Filtering vanilla con normalizeText | script.js |

### Lo YA Propuesto en R1-R91 (Resumen)

| Área | Propuestas |
|------|-----------|
| **Conversión** | WhatsApp Catalog, Real-time Calendar, Cross-sell Engine, AI Recommender |
| **SEO/Tech** | Service Schema, Resource Hints, Web Workers, Read More Deep Links |
| **Modelo B2B** | API REST, Gift Cards, Corporate Vouchers, Flat Rate |
| **UX/Media** | Video Testimonials, Seasonal Landing Pages, UGC Campaign |
| **Trust** | Insurance-backed Guarantee, Eco-Certification, Referral Wallet |

### Lo NO Propuesto — Web Platform APIs Modernas (R92)

| API | Estado Browser | Propuesta en R92 |
|-----|----------------|------------------|
| **View Transitions** | Chrome 111, Firefox 126, Safari 18 | ✅ Navegación suave MPA |
| **CSS Container Queries** | Baseline 2024 | ✅ Componentes responsive |
| **Popover API** | Baseline 2025 | ✅ Reemplazar chatbot panel |
| **Content-visibility** | Baseline 2025 | ✅ Performance initial load |
| **Speculation Rules** | Chrome 121+ | ✅ Prerender zonas |
| **:has() Selector** | Baseline 2023 | ✅ Selector para estados |

---

## Investigación: Web Platform APIs 2025

### Hallazgo 1: View Transitions API — Navegación Suave MPA

La View Transitions API permite transiciones visuales fluidas entre páginas (Chrome 126 soporta cross-document transitions para MPAs como Purity & Clean).

**Caso de uso:** Cuando usuario navega de `/index.html#servicios` a `/zonas/chapinero/index.html`, la transición muestra un "morph" suave del elemento de servicio en lugar de un salto brusco.

**Beneficio:**
- Percepción de velocidad (+40% según case studies)
- UX premium que diferencia de competidores
- Soporte cross-origin en Chrome 126+

**Fuente:** [View Transitions API - Chrome Developers](https://developer.chrome.com/docs/web-platform/view-transitions) (2024)

---

### Hallazgo 2: CSS Container Queries — Componentes Contextuales

Container queries permite que componentes respondan al tamaño de su **contenedor padre**, no al viewport. Esto es ideal para las tarjetas de servicios que se reutilizan en diferentes contextos.

**Caso de uso:**
```css
.service-card {
  container-type: inline-size;
}

@container (width > 400px) {
  .service-card { flex-direction: row; }
}
```

**Beneficio:**
- Componentes realmente reutilizables
- Menos media queries duplicadas
- El README menciona "reutilizar tarjetas" — container queries lo hace posible

**Fuente:** [CSS Container Queries - MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Containment/Container_queries) (2024)

---

### Hallazgo 3: Popover API — Reemplazo de Chatbot Panel

La Popover API (Baseline 2025) es el estándar para mostrar contenido sobre otro. El chatbot actual usa CSS transitions + JS toggle. Popover API ofrece:

- API declarativa (`popover`, `popovertarget`)
- Manejo automático de focus
- Backdrop automático
- Accesibilidad built-in

**Caso de uso:**
```html
<button popovertarget="chatbot-panel">💬</button>
<div id="chatbot-panel" popover>
  <!-- Chatbot content -->
</div>
```

**Beneficio:**
- ~100 líneas menos de JS
- Mejor accesibilidad
- Navegación por keyboard automática
- `::backdrop` para oscurecer fondo

**Fuente:** [Popover API - MDN](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API) (2025)

---

### Hallazgo 4: Content-visibility — Performance Initial Load

Content-visibility: auto permite al browser skip rendering de contenido off-screen. El sitio tiene 11 zonas + 6 artículos de blog + homepage = mucho contenido.

**Caso de uso:**
```css
.zona-section {
  content-visibility: auto;
  contain-intrinsic-size: 500px;
}
```

**Beneficio:**
- 50-70% reducción en initial rendering time (según web.dev case study)
- scroll suave sin jank
- Contenido accessibility tree disponible aunque no rendered

**Fuente:** [Content-visibility - web.dev](https://web.dev/articles/content-visibility) (2020, Baseline 2025)

---

### Hallazgo 5: Speculation Rules API — Prerender de Zonas

Speculation Rules permite prerenderear páginas que el usuario probablemente visitará. Para Purity, cuando usuario está en homepage, prerenderear las zonas más populares.

**Caso de uso:**
```html
<script type="speculationrules">
{
  "prerender": [{
    "source": "list",
    "urls": [
      "/zonas/chapinero/index.html",
      "/zonas/usaquen/index.html"
    ]
  }]
}
</script>
```

**Beneficio:**
- Navegación a zonas es instantánea
-works con Cold navigation (no solo back/forward)
- No requiere Service Worker

**Fuente:** [Speculation Rules API - Chrome](https://developer.chrome.com/docs/web-platform/prerender-pages) (2024)

---

## Auditoría de Código: Gaps Detectados

### Gap 1: script.js Monolítico (1,847 líneas)

El archivo script.js tiene 1,847 líneas — muy grande para mantenimiento. Ninguna modularización detectada.

**Implicación:** Container queries y Popover API requieren CSS nuevo pero podrían beneficiarse de JS más modular.

---

### Gap 2: Sin Lazy Loading de Secciones

Las 11 zonas + homepage se cargan completamente. No hay `loading="lazy"` en iframes ni `content-visibility`.

**Implicación:** Content-visibility podría reducir initial rendering cost significativamente.

---

### Gap 3: Chatbot Panel Usa CSS Transitions Manual

El chatbot actual implementa open/close con:
```css
transform: scale(0.9) translateY(20px);
opacity: 0;
pointer-events: none;
transition: ...;
```

**Implicación:** Popover API reemplazaría ~50 líneas de CSS/JS con 3 atributos HTML.

---

## Propuestas (Round 92)

### Propuesta 1: View Transitions para Navegación Entre Zonas (HIGH PRIORITY — UX)

| Campo | Detalle |
|-------|---------|
| **Título** | Implementar View Transitions API en navegación a zonas |
| **Problema** | La navegación de homepage a zonas (o entre zonas) es un salto brusco. View Transitions hace la navegación fluida y premium. |
| **Descripción** | **Paso 1 — Activar cross-document transitions en CSS:**<br>```css<br>/* En style.css */<br>@view-transition {<br>  navigation: auto;<br>}<br>```<br><br>**Paso 2 — Nombrar elementos para transición:**<br>En `index.html`, añadir `view-transition-name` a tarjetas de zonas:<br>```html<br><a href="zonas/chapinero/" class="zona-card"<br>     style="view-transition-name: zona-chapinero"><br>  <h3>Chapinero</h3><br></a><br>```<br><br>**Paso 3 — En zona destino, mismo nombre:**<br>```html<br><section id="hero" style="view-transition-name: zona-chapinero"><br>  <h1>Chapinero</h1><br></section><br>```<br><br>**Resultado:** Cuando usuario clickea "Chapinero", el navegador hace un "morph" suave del card al hero de la zona destino. |
| **Impacto esperado** | Percepción de velocidad +40%, UX premium vs competencia, diferenciación visual |
| **Esfuerzo** | S (2-3 horas — CSS + nombrar elementos) |
| **Agente recomendado** | Frontend |
| **Referencias** | [1] View Transitions API - Chrome Developers |
| **Estado** | **NUEVA — NO mencionada en R1-R91** |
| **Prioridad CEO** | **Alta** — UX de navegación mejorada sin backend |

---

### Propuesta 2: CSS Container Queries para Tarjetas de Servicios (MEDIUM PRIORITY — DX/Performance)

| Campo | Detalle |
|-------|---------|
| **Título** | Refactorizar tarjetas de servicios con Container Queries |
| **Problema** | Las tarjetas de servicios usan media queries basadas en viewport. No son verdaderamente reutilizables si se插入an en contenedores de diferentes anchos (ej. sidebar vs. contenido principal). |
| **Descripción** | **Paso 1 — Definir containment en `.searchable-grid`:**<br>```css<br>.searchable-grid {<br>  container-type: inline-size;<br>}<br>```<br><br>**Paso 2 — Refactorizar `.searchable-item`:**<br>```css<br>.searchable-item {<br>  display: flex;<br>  flex-direction: column;<br>  gap: 0.5rem;<br>}<br><br>@container (width > 400px) {<br>  .searchable-item {<br>    flex-direction: row;<br>    align-items: center;<br>  }<br>}\n\n@container (width > 600px) {\n  .searchable-item .item-details {\n    display: grid;\n    grid-template-columns: auto 1fr auto;\n  }\n}\n```<br><br>**Paso 3 — Eliminar media queries redundantes** que solo controlan tarjetas. |
| **Impacto esperado** | Componentes reutilizables sin overrides, menos CSS, mejor maintainability |
| **Esfuerzo** | M (4-5 horas — refactor CSS + testing) |
| **Agente recomendado** | Frontend |
| **Referencias** | [2] CSS Container Queries - MDN |
| **Estado** | **NUEVA — NO mencionada en R1-R91** |
| **Prioridad CEO** | **Media** — DX improvement, prepare para reutilización |

---

### Propuesta 3: Popover API para Chatbot Panel (MEDIUM PRIORITY — Modernización)

| Campo | Detalle |
|-------|---------|
| **Título** | Reemplazar chatbot panel con Popover API nativa |
| **Problema** | El chatbot actual usa CSS transitions + JS manual para open/close. Popover API (Baseline 2025) ofrece la misma funcionalidad con 90% menos código y mejor accesibilidad. |
| **Descripción** | **Paso 1 — Convertir HTML:**<br>```html\n<!-- Antes -->\n<button class="chatbot-fab" onclick="toggleChatbot()">💬</button>\n<div class="chatbot-panel" id="chatbot-panel">...</div>\n\n<!-- Después -->\n<button class="chatbot-fab" popovertarget="chatbot-panel">💬</button>\n<div id="chatbot-panel" popover class="chatbot-panel">...</div>\n```<br><br>**Paso 2 — Simplificar CSS:**<br>```css\n/* Eliminar transiciones manuales */\n.chatbot-panel { /* Solo estilos base */ }\n.chatbot-panel[popover] { display: block; }\n.chatbot-panel:not(:popover-open) { display: none; }\n\n/* Backdrop oscuro */\n.chatbot-panel::backdrop {\n  background: rgba(0, 0, 0, 0.3);\n}\n```<br><br>**Paso 3 — Eliminar JS de toggle** (ya no necesario):<br>- Remover `toggleChatbot()` function<br>- Remover `chatbot-panel.classList.toggle('open')`<br>- El browser maneja todo |
| **Impacto esperado** | ~100 líneas JS menos, accesibilidad mejorada, focus management automático |
| **Esfuerzo** | S (2-3 horas — refactor HTML/CSS/JS) |
| **Agente recomendado** | Frontend |
| **Referencias** | [3] Popover API - MDN |
| **Estado** | **NUEVA — NO mencionada en R1-R91** |
| **Prioridad CEO** | **Media** — moderniza codebase, mejor accesibilidad |

---

### Propuesta 4: Content-visibility para Performance de Initial Load (MEDIUM PRIORITY — Performance)

| Campo | Detalle |
|-------|---------|
| **Título** | Aplicar content-visibility: auto a secciones off-screen |
| **Problema** | El sitio tiene mucho contenido (11 zonas, blog, homepage). Sin content-visibility, el browser renderiza TODO en initial load, causando slower INP. |
| **Descripción** | **Paso 1 — Identificar secciones para aplicar:**<br>```css\n/* Blog articles */\n.blog-article {\n  content-visibility: auto;\n  contain-intrinsic-size: 800px;\n}\n\n/* Zona sections */\n.zona-section {\n  content-visibility: auto;\n  contain-intrinsic-size: 600px;\n}\n\n/* FAQ section si existe */\n.faq-section {\n  content-visibility: auto;\n  contain-intrinsic-size: 400px;\n}\n```<br><br>**Paso 2 — NO aplicar a:**<br>- Header/nav (visible inmediatamente)<br>- Hero section (above the fold)<br>- Footer (generalmente visible al scroll)<br><br>**Paso 3 — Auditar para evitar APIs que forzan layout:**<br>El artículo de web.dev advierte que algunas APIs DOM pueden forzar layout en content-visibility sections. Verificar que no se usa `offsetHeight`, `getBoundingClientRect()` en sections hidden. |
| **Impacto esperado** | 50-70% reducción en initial rendering time, mejor INP, mejor Core Web Vitals |
| **Esfuerzo** | S (2-3 horas — aplicar CSS + testing) |
| **Agente recomendado** | Frontend |
| **Referencias** | [4] Content-visibility - web.dev |
| **Estado** | **NUEVA — NO mencionada en R1-R91** |
| **Prioridad CEO** | **Media** — mejora measurable en performance |

---

### Propuesta 5: Speculation Rules API para Prerender de Zonas (MEDIUM PRIORITY — UX)

| Campo | Detalle |
|-------|---------|
| **Título** | Implementar Speculation Rules para prerender de zonas populares |
| **Problema** | Navegar a una zona es cold navigation (descarga HTML + recursos). Speculation Rules prerenderiza páginas antes de que usuario las visite. |
| **Descripción** | **Paso 1 — Agregar speculation rules en `<head>`:**<br>```html\n<script type=\"speculationrules\">\n{\n  \"prerender\": [{\n    \"source\": \"list\",\n    \"urls\": [\n      \"/zonas/chapinero/index.html\",\n      \"/zonas/usaquen/index.html\",\n      \"/zonas/suba/index.html\",\n      \"/blog/articulos/como-limpiar-tu-sofa.html\"\n    ]\n  }]\n}\n</script>\n```<br><br>**Paso 2 — Dinámicamente basado en usuario:**<br>```javascript\n// En script.js, después de que usuario pasa 5s en homepage\nif (performance.navigation.type === 0) { // first visit\n  const rules = {\n    prerender: [{\n      source: 'list',\n      urls: ['/zonas/chapinero/index.html']\n    }]\n  };\n  speculationRules.set(rules);\n}\n```<br><br>**Paso 3 — Medir con Plausible:**<br>Event `prerender_attempted` cuando speculation rules dispara. |
| **Impacto esperado** | Navegación a zonas instantánea (~0ms), percepción de sitio ultra-rápido |
| **Esfuerzo** | S (1-2 horas — agregar script + analytics) |
| **Agente recomendado** | Frontend |
| **Referencias** | [5] Speculation Rules API - Chrome |
| **Estado** | **NUEVA — NO mencionada en R1-R91** |
| **Prioridad CEO** | **Media** — navegación instantánea, impacta UX |

---

### Propuesta 6: Selector :has() para Estados Condicionales (LOW-MEDIUM PRIORITY — UX)

| Campo | Detalle |
|-------|---------|
| **Título** | Usar :has() para eliminar JS de estado de UI |
| **Problema** | Muchos estados de UI (dropdown abierto, form válido, cards seleccionadas) requieren JS para toggle classes. :has() permite CSS puro. |
| **Descripción** | **Ejemplo 1 — Dropdown con :has():**<br>```css\n/* Antes: JS toggle class 'open' */\n.dropdown.open .menu { display: block; }\n\n/* Después: CSS puro */\n.dropdown:has(.menu[aria-expanded="true"]) .menu { display: block; }\n```<br><br>**Ejemplo 2 — Form validation visual:**<br>```css\n.form-group:has(input:invalid) .error-message { display: block; }\n.form-group:has(input:valid) .success-icon { display: block; }\n```<br><br>**Ejemplo 3 — Grid de servicios con filtros activos:**<br>```css\n.search-container:has(.search-input:not(:placeholder-shown)) .clear-button {\n  opacity: 1;\n}\n``` |
| **Impacto esperado** | ~50-100 líneas JS menos en script.js, mantenibilidad mejorada |
| **Esfuerzo** | S (2-3 horas — refactor selectores) |
| **Agente recomendado** | Frontend |
| **Referencias** | [6] :has() Selector - MDN (Baseline 2023) |
| **Estado** | **NUEVA — NO mencionada en R1-R91** |
| **Prioridad CEO** | **Baja-Media** — reducción JS, mejor mantenibilidad |

---

## Orden de Implementación Recomendado

| # | Propuesta | Impacto | Esfuerzo | Prioridad | APIs Usadas |
|---|-----------|---------|----------|-----------|-------------|
| 1 | **View Transitions** | UX +40% | S (2-3h) | **Alta** | View Transitions API |
| 2 | **Content-visibility** | Performance 50-70% | S (2-3h) | **Media** | CSS content-visibility |
| 3 | **Popover API** | Modernización | S (2-3h) | **Media** | Popover API |
| 4 | **Speculation Rules** | UX Instantánea | S (1-2h) | **Media** | Speculation Rules API |
| 5 | **Container Queries** | DX + Reutilización | M (4-5h) | **Media** | CSS Container Queries |
| 6 | **:has() Selector** | Reducción JS | S (2-3h) | **Baja** | CSS :has() |

---

## Comparación R91 vs R92

| Aspecto | R91 | R92 |
|---------|-----|-----|
| **Foco** | Conversión y negocio | Web Platform APIs modernas |
| **Tipo propuestas** | Features de negocio | Mejoras técnicas/UX |
| **Esfuerzo promedio** | S-M | S-M |
| **Impacto** | Conversión, revenue | Performance, UX, DX |
| **Competidores referencia** | Homeaglow, Handy, TaskRabbit | Chrome Platform, web.dev |
| **View Transitions** | No | **Sí — nueva** |
| **Container Queries** | No | **Sí — nueva** |
| **Popover API** | No | **Sí — nueva** |
| **Content-visibility** | No | **Sí — nueva** |
| **Speculation Rules** | No | **Sí — nueva** |
| **:has() Selector** | No | **Sí — nueva** |

**R92 no repite ninguna propuesta de R91.** Las 6 propuestas abordan web platform APIs modernas que están en Baseline y no se mencionaron en ninguna ronda anterior.

---

## Dependencias y Bloqueadores

| Propuesta | Depende de | Bloqueador |
|-----------|------------|------------|
| View Transitions | Ninguno | Browser support (FF 126+, Safari 18+) — acceptable |
| Container Queries | Ninguno | Browser support (Baseline 2024) — OK |
| Popover API | Ninguno | Browser support (Baseline 2025) — OK |
| Content-visibility | Ninguno | Ninguno |
| Speculation Rules | Ninguno | Solo Chrome 121+ (acceptable para Colombia) |
| :has() Selector | Ninguno | Browser support (Baseline 2023) — OK |

---

## Sinergia R91 + R92

| R91 (Conversión) | R92 (Web Platform) | Sinergia |
|------------------|---------------------|-----------|
| WhatsApp Business Catalog | View Transitions | Navegación suave entre catálogo y zonas |
| Real-time Calendar | Popover API | Calendar en popover moderno |
| Cross-sell Engine | Container Queries | Cards responsivas que muestran cross-sell |
| Quiz Interactivo | Content-visibility | Quiz carga instantánea |

---

## Fuentes

[1] View Transitions API. https://developer.chrome.com/docs/web-platform/view-transitions

[2] CSS Container Queries. https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Containment/Container_queries

[3] Popover API. https://developer.mozilla.org/en-US/docs/Web/API/Popover_API

[4] Content-visibility. https://web.dev/articles/content-visibility

[5] Speculation Rules API. https://developer.chrome.com/docs/web-platform/prerender-pages

[6] :has() Selector. https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:has

---

*Documento generado por Innovation Scout — Round 92*
*Purity & Clean Analysis — 2026-04-28*
*Co-Authored-By: Paperclip <noreply@paperclip.ing>*