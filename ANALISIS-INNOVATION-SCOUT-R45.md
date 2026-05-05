# Análisis Creativo — Purity & Clean (Round 45)

**Proyecto:** Purity & Clean
**Fecha:** 2026-04-27
**Analista:** Innovation Scout
**Ronda:** 45
**Issue padre:** DOMAA-503

---

## Resumen Ejecutivo

R45 se enfoca en **gaps técnicos críticos no implementados** que fueron identificados en análisis anteriores pero nunca se materializaron en código. Específicamente:

1. **INP (Interaction to Next Paint)** — El Core Web Vital que reemplazó a FID en 2024, no está siendo medido ni optimizado
2. **Lighthouse CI** — Mentioned en R29 pero nunca configurado (sin `lighthouserc.js`, sin workflow de GitHub Actions)
3. **Speculation Rules API** — Mentioned como "cubierto" en R29 pero no existe en el HTML
4. **Web Vitals RUM** — Sin integración de `web-vitals` para medición real de usuarios
5. **Performance Budget** — Sin budget definido ni enforced

Estas no son ideas nuevas — son deudas técnicas de implementación que habían sido identificadas pero nunca se ejecutaron.

---

## Stack tecnológico actual (verificado en código)

- **Frontend:** HTML5 + CSS3 + JS vanilla ES6+
- **CSS:** ~6212 líneas style.css
- **JS:** ~1847 líneas script.js + config.js + zonas-data.js + zonas-render.js + reviews-data.js
- **Fuentes:** Manrope + Raleway — Google Fonts
- **Iconos:** Font Awesome 6.5 CDN (SRI verificado)
- **Analítica:** Plausible Analytics (sin cookies, GDPR-compliant)
- **Forms:** Formspree (booking, newsletter, zonas)
- **Testing:** Playwright E2E (10 suites)
- **PWA:** Service Worker, precache, offline page, push notifications (VAPID)
- **SEO:** Schema LocalBusiness + FAQPage + Article + Review + VideoObject + HowTo + BreadcrumbList
- **Chatbot:** FAQ routing → WhatsApp
- **Booking:** Multi-step form con slot picker
- **Theme:** Dark mode toggle con persistencia
- **Cobertura:** 10 zonas en Bogotá
- **Precios:** Cotizador interactivo + WhatsApp pre-filled
- **Reviews:** 127 reviews verificadas, 4.8/5
- **Blog:** 6 artículos educativos
- **Animaciones:** Counters, reveal on scroll, chatbot FAB bounce, comparison sliders
- **Service Worker:** Precaching (17 assets), cache-first strategy, offline fallback
- **Cookie Banner:** GDPR-compliant con consentimiento
- **PWA Install Banner:** Custom con accept/decline
- **Push Notifications:** VAPID-based, solicitando permiso
- **GitHub Actions:** Solo deploy a Pages (static.yml), sin Lighthouse CI

---

## Verificación de implementaciones prometidas en R29

R29 propuso varias implementaciones técnicas. Verifiqué el código y **NINGUNA está implementada**:

| Propuesta R29 | Estado | Evidencia |
|---------------|--------|----------|
| Lighthouse CI con `lighthouserc.js` | ❌ NO EXISTE | Sin archivo `lighthouserc.js`, sin workflow en `.github/workflows/lighthouse.yml` |
| Web Vitals dashboard | ❌ NO EXISTE | Sin `web-vitals` library en package.json, sin código de medición en index.html |
| Speculation Rules API | ❌ NO EXISTE | Sin标签 `<script type="speculationrules">` en index.html |
| Performance budget | ❌ NO EXISTE | Sin定义 de budget en ningún archivo |
| View Transitions API | ❌ NO EXISTE | Sin uso de `document.startViewTransition()` |
| Stripe Integration | ❌ NO EXISTE | Sin SDK de Stripe |
| WebSocket for real-time availability | ❌ NO EXISTE | Sin WebSocket implementation |

---

## Investigación: Core Web Vitals 2026

### INP (Interaction to Next Paint) — El metric que falta

Google reempló FID con INP como Core Web Vital en **marzo 2024**. El site NO mide INP.

Según web.dev (2025):
- **INP < 200ms** = buena responsividad
- **INP 200-500ms** = necesita mejora
- **INP > 500ms** = pobre responsividad

El site tiene interactividad significativa (booking multi-step, cotizador, chatbot FAB, búsqueda en tiempo real) — todas son oportunidades de INP alto si no están optimizadas.

**El problema:** Sin medir INP con `web-vitals`, no hay forma de saber si hay regresiones. El FID original solo medía la primera interacción — INP mide TODAS las interacciones durante la sesión del usuario.

### Speculation Rules API — Navegación instantánea

Chrome 109+ soporta `<script type="speculationrules">` para prerender páginas. Beneficios:
- **Near-instant navigation** — páginas prerendered cargan como si ya estuvieran abiertas
- **Mejor INP** — porque la página ya cargó antes de la interacción
- **Mejor LCP** — el contenido ya está listo cuando el usuario llega

**El problema:** El site tiene 10 páginas de zona (`/zonas/*`) que son navegaciones comunes desde el homepage. Sin speculation rules, cada navegación es una carga completa.

### Lighthouse CI — Quality Gate automático

Según web.dev (2020), Lighthouse CI:
- Detecta regresiones de performance antes de producción
- Establece performance budgets enforceable como parte del CI/CD
- "Lighthouse CI integration reduces performance regressions by 80%"

**El problema:** No existe `lighthouserc.js`, no existe workflow de Lighthouse en GitHub Actions. El único workflow es deploy a Pages.

---

## Gaps identificados — Round 45 (TÉCNICOS, NO cubiertos en R1-R44 como implementación)

### 1. Sin medición de INP (Interaction to Next Paint)

**Problema:** INP es el Core Web Vital de responsividad desde 2024. El site no lo mide ni lo optimiza. Con 1,847 líneas de JS y interactividad compleja (chatbot, cotizador, slot picker), es probable que haya interacciones lentas sin detección.

### 2. Lighthouse CI no implementado

**Problema:** R29 propuso Lighthouse CI pero nunca se implementó. No hay:
- `lighthouserc.js` en la raíz del proyecto
- GitHub Action de Lighthouse CI
- Budget de performance definido
- Alertas de regresión

### 3. Speculation Rules API no implementada

**Problema:** R29 mencionó "Speculation Rules API" como cubierta pero no existe en el código. Las 10 páginas de zona (`/zonas/*`) no se prerenderan, perdiendo navegación instantánea.

### 4. Sin Web Vitals RUM (Real User Monitoring)

**Problema:** Plausible da pageviews pero no Core Web Vitals de campo. Sin `web-vitals` library integrada, no hay datos reales de:
- LCP ( Largest Contentful Paint) de usuarios reales
- INP de usuarios reales
- CLS (Cumulative Layout Shift) de usuarios reales

### 5. Sin Performance Budget

**Problema:** No hay budget definido para métricas de performance. No hay forma de saber si un PR introduce regresiones de performance.

---

## Propuestas (Round 45)

### Propuesta 1: Integración de web-vitals library para RUM

| Campo | Detalle |
|-------|---------|
| **Título** | Integrar `web-vitals` library para medir Core Web Vitals de usuarios reales (LCP, INP, CLS) |
| **Problema** | Plausible Analytics no proporciona Core Web Vitals de campo. Sin datos RUM, no hay visibilidad de cómo experimentan los usuarios reales las métricas de performance. |
| **Descripción** | 1. **Instalar library**: `npm install web-vitals`. 2. **Agregar código de medición** en `index.html` antes del cierre de `</body>`: import `{onLCP, onINP, onCLS}` desde 'web-vitals' y enviar a Plausible como eventos custom. 3. **Configurar**: LCP threshold < 2.5s, INP threshold < 200ms, CLS threshold < 0.1. 4. **Dashboard**: crear sección interna en Plausible para visualizar tendencias. Alternativa sin código: usar Google Tag Manager con web-vitals tag. Implementación: ~30 líneas de JS, 1 hora de trabajo. |
| **Impacto esperado** | Visibilidad de Core Web Vitals reales, detección de regresiones antes de que impacten SEO, datos para optimizaciones basadas en usuarios reales |
| **Esfuerzo** | S (1-2 horas) |
| **Agente recomendado** | Frontend |
| **Referencias** | [1] https://github.com/GoogleChrome/web-vitals [2] https://web.dev/articles/inp |

### Propuesta 2: Configurar Lighthouse CI con GitHub Actions

| Campo | Detalle |
|-------|---------|
| **Título** | Configurar Lighthouse CI con `lighthouserc.js` y GitHub Action para detección de regresiones |
| **Problema** | R29 propuso Lighthouse CI pero nunca se implementó. No hay forma de detectar regresiones de performance en PRs. |
| **Descripción** | 1. **Crear `lighthouserc.js`** en raíz con configuración básica: `staticDistDir: '.'`, `url: ['http://localhost:8080']`, `assertions: { 'categories:performance': ['warn', {minScore: 0.9}] }`. 2. **Crear `.github/workflows/lighthouse.yml`** con workflow que corre en cada PR y reporta resultados como status check. 3. **Performance budget**: definir budget para LCP < 2.5s, INP < 200ms, CLS < 0.1 en assertions. 4. **Opcional**: instalar GitHub App de Lighthouse CI para comentarios automáticos en PRs. Implementación: 1 archivo de config + 1 workflow, medio día de trabajo. |
| **Impacto esperado** | Reducción de regresiones de performance en 80%, detección temprana en CI, visibility en cada PR |
| **Esfuerzo** | S (medio día) |
| **Agente recomendado** | QA / DevOps |
| **Referencias** | [1] https://web.dev/lighthouse-ci [2] https://github.com/GoogleChrome/lighthouse-ci |

### Propuesta 3: Implementar Speculation Rules API para navegación prerender

| Campo | Detalle |
|-------|---------|
| **Título** | Implementar Speculation Rules API para prerender de páginas de zona |
| **Problema** | Las 10 páginas de zona (`/zonas/*`) requieren navegación completa. Sin prerender, cada click a una zona es carga desde cero. |
| **Descripción** | 1. **Agregar speculation rules en `index.html`** antes del cierre de `</head>`: `<script type="speculationrules"> { "prerender": [{ "where": { "href_matches": "/zonas/*" }, "eagerness": "moderate" }] } </script>`. 2. **Reglas conservadoras**: eagerness "moderate" solo prerender cuando el usuario hace hover sobre un link por 200ms o en mobile después de scroll. 3. **Verificar**: usar Chrome DevTools > Application > Pre-rendering para ver qué páginas se prerenderan. 4. **Monitorizar**: trackear eventos de activación de prerender en Plausible. Implementación: 1 bloque de JSON en HTML, 1 hora. |
| **Impacto esperado** | Navegación a zonas instantánea, mejor INP percibido, mejor UX mobile |
| **Esfuerzo** | S (1 hora) |
| **Agente recomendado** | Frontend |
| **Referencias** | [1] https://developer.chrome.com/docs/web-platform/prerender-pages [2] https://web.dev/blog/speculation-rules |

### Propuesta 4: Definir y enforce Performance Budget

| Campo | Detalle |
|-------|---------|
| **Título** | Definir performance budget para LCP, INP, TBT y attach a Lighthouse CI assertions |
| **Problema** | Sin budget no hay forma objetiva de definir "aceptable" vs "regresión". |
| **Descripción** | 1. **Definir budgets** en `lighthouserc.js` assertions: LCP < 2.5s (p75), INP < 200ms (p75), TBT < 200ms, FCP < 1.8s, Speed Index < 3.4s. 2. **Budget de tamaño**: JS total < 200KB gzip, CSS total < 50KB gzip, HTML < 100KB. 3. **Assertions estrictas**: `error` level para categorías de performance < 0.9 score. 4. **Budget tracking**: crear dashboard simple en Plausible o Google Sheets con budgets por sprint. Implementación: agregar 20-30 líneas al `lighthouserc.js`, 2 horas. |
| **Impacto esperado** | Definición clara de "buena performance", prevención de regresiones, data para roadmap de optimización |
| **Esfuerzo** | S (2 horas) |
| **Agente recomendado** | QA / Frontend |
| **Referencias** | [1] https://web.dev/performance-budgets [2] https://developer.chrome.com/docs/lighthouse/performance/performance-budgets |

### Propuesta 5: Optimización de INP para interactivos principales

| Campo | Detalle |
|-------|---------|
| **Título** | Optimizar INP del chatbot FAB, cotizador y slot picker — los 3 interactivos más lentos |
| **Problema** | Los interactivos principales (chatbot, cotizador, slot picker) están en el hot path de conversión. Si tienen INP > 200ms, impactan directamente la conversión y SEO. |
| **Descripción** | 1. **Medir primero**: con web-vitals integrado (Propuesta 1), identificar cuál de los 3 tiene peor INP. 2. **Optimizaciones comunes**: (a) Long Tasks: break up tasks > 50ms con `setTimeout(0)` o `scheduler.yield()`, (b) Event handler optimization: diferir trabajo no-critical de event handlers, (c) CSS animations: asegurar que animaciones usen `transform` y `opacity` (compositor properties), no disparen layout/paint. 3. **Chatbot FAB**: el evento `click` dispara múltiples acciones (toggle, focus, scroll). Separar en frames usando `requestAnimationFrame`. 4. **Cotizador**: el cálculo de precio no debería bloquear el render del resultado. Usar `requestIdleCallback` para cálculos pesados. Implementación: estimado 1-2 días para las 3 optimizaciones, dependiendo de qué revele la medición. |
| **Impacto esperado** | Reducción de INP 20-40%, mejor UX en interactivos, mejor Core Web Vitals para SEO |
| **Esfuerzo** | M (1-2 días) |
| **Agente recomendado** | Frontend |
| **Referencias** | [1] https://web.dev/articles/inp [2] https://web.dev/articles/optimize-inp |

---

## Orden de implementación recomendado

| # | Propuesta | Impacto | Esfuerzo | Semana |
|---|----------|---------|----------|--------|
| 1 | web-vitals RUM | Alto (visibilidad) | S | 1 |
| 2 | Lighthouse CI | Alto (prevención) | S | 1 |
| 3 | Speculation Rules | Medio (UX) | S | 1 |
| 4 | Performance Budget | Medio (enforcement) | S | 1-2 |
| 5 | Optimización INP | Alto (conversión) | M | 2-3 |

**Nota:** Las propuestas 1-4 son prerequisitos para la 5 — no se puede optimizar INP sin medirlo primero (Propuesta 1).

---

## Diferencia clave: R44 vs R45

R44 se enfocó en **mecanismos de conversión transaccional**: indicadores de disponibilidad, bundles, programa de puntos, same-day booking, marketplace, referidos 2.0, surge pricing.

**R45 se enfoca en:**
- **Technical debt de implementación**: features prometidas en R29 que nunca se implementaron
- **Core Web Vitals 2026**: INP es el metric que importa, no FID
- **Quality Gates**: Lighthouse CI para prevenir regresiones
- **RUM**: datos reales de usuarios, no solo lab data

R44 construyó **funcionalidades de revenue**. R45 construye **infraestructura de calidad y medición** que permite sostener y mejorar lo que ya está construido.

---

## Síntesis: Por qué R45 es diferente

R1-R44 cubrió MUCHAS ideas. R45 es la primera ronda que verifica **qué se implementó realmente vs qué se propuso**. El resultado: las 5 propuestas de R45 son técnicamente específicas, implementables esta semana, y abordan deuda técnica real.

---

## Fuentes

[1] Google Chrome Team. "Interaction to Next Paint (INP)." web.dev, actualizado September 2, 2025. https://web.dev/articles/inp

[2] Barry Pollard. "Prerender pages in Chrome for instant page navigations." Chrome for Developers, actualizado January 23, 2026. https://developer.chrome.com/docs/web-platform/prerender-pages

[3] Katie Hempenius. "Performance monitoring with Lighthouse CI." web.dev, actualizado July 27, 2020. https://web.dev/lighthouse-ci

[4] GoogleChrome. "web-vitals JavaScript library." GitHub. https://github.com/GoogleChrome/web-vitals

[5] Google. "Lighthouse performance budgets." Chrome for Developers. https://developer.chrome.com/docs/lighthouse/performance/performance-budgets

---

*Documento generado por Innovation Scout — Round 45*
*Purity & Clean Analysis — 2026-04-27*
*Co-Authored-By: Paperclip <noreply@paperclip.ing>*