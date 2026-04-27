# Análisis Creativo — Purity & Clean (Round 39)

**Proyecto:** Purity & Clean
**Fecha:** 2026-04-27
**Analista:** Innovation Scout
**Ronda:** 39
**Issue padre:** DOMAA-435

---

## Resumen Ejecutivo

R39 se enfoca en **Rendimiento Web (Core Web Vitals), UX Micro-mejoras, y Testing Automation** — territory no cubierto en profundidad en R36-R38. El sitio tiene 6.212 líneas de CSS y 1.847 de JS con patterns que podrían optimizarse para Core Web Vitals. Las métricas clave son LCP < 2.5s, INP < 200ms, CLS < 0.1. El sitio usa Font Awesome 6.5 CDN, Google Fonts, y Plausible Analytics — todas oportunidades de optimización. Además hay gaps claros en Playwright testing coverage y CSS organization.

---

## Stack tecnológico actual (resumen R35-R38)

- **Frontend:** HTML5 + CSS3 + JS vanilla ES6+
- **CSS:** 6212 líneas style.css
- **JS:** 1847+ líneas script.js
- **Fuentes:** Manrope + Raleway — Google Fonts
- **Iconos:** Font Awesome 6.5 CDN (SRI verificado)
- **Analítica:** Plausible Analytics (sin cookies, GDPR-compliant)
- **Forms:** Formspree
- **Testing:** Playwright E2E (9 suites)
- **PWA:** Service Worker, push notifications, offline support
- **SEO:** Schema LocalBusiness + FAQPage + Article + Review + VideoObject + HowTo + BreadcrumbList
- **Chatbot:** FAQ routing → WhatsApp
- **Booking:** Multi-step form con slot picker
- **Theme:** Dark mode toggle con persistencia
- **Cobertura:** 10 zonas en Bogotá
- **Precios:** Cotizador interactivo + WhatsApp pre-filled
- **Reputación:** 127 reviews verificadas, 4.8/5
- **Rounds anteriores:** R36 (Baseline 2026 APIs), R37 (Apple Maps, TikTok Local, Video Reviews, Crisis Mgmt), R38 (Review Velocity, Multi-Platform Reviews, AI Summary Optimization, Customer Health Score)

---

## Investigación: Core Web Vitals y Performance

### Core Web Vitals — métricas que importan

Google define tres métricas clave para experiencia de usuario [1]:

| Métrica | Threshold | ¿Qué mide? |
|---------|-----------|------------|
| **LCP** (Largest Contentful Paint) | < 2.5s | Velocidad de carga del contenido principal |
| **INP** (Interaction to Next Paint) | < 200ms | Interactividad y capacidad de respuesta |
| **CLS** (Cumulative Layout Shift) | < 0.1 | Estabilidad visual — sin saltos de layout |

### LCP en Purity & Clean — oportunidades

El sitio actual tiene varios puntos que afectan LCP [1]:

1. **Font Awesome CDN** — icons cargan desde cdnjs.cloudflare.com. Cada icon es un request HTTP separate. Icon fonts son más pesados que SVGs inline.
2. **Google Fonts** — el sitio carga Manrope y Raleway desde Google Fonts.虽有 `preconnect` y `preload`, el fonts CSS puede optimizarce con `font-display: swap` y subsetting.
3. **Plausible Analytics** — el script `script.js` se carga en el `<head>`. Puede deferred o cargado asíncrono.
4. **Hero image** — el hero section usa background images. Si no hay image preload, el LCP puede verse afetado.
5. **Comparison sliders** — 6 imágenes before/after cargan lazy, pero el JS que las maneja está en el critical path.

### INP en Purity & Clean — oportunidades

1. **Search filter** — el search input usa `input` event listener que filtra en tiempo real. Si el grid es grande, cada keystroke dispara un re-render completo del DOM.
2. **Theme toggle** — el botón de tema oscuro actualiza `data-theme` en `<html>` y luego itera sobre todos los elementos con `data-theme` attribute. Esto causa layout thrashing si no hay batching.
3. **Chatbot FAB** — el chatbot panel toggle probablemente tiene listeners múltiples que afectan INP.
4. **Stats counters** — los contadores animados (`data-counter`) usan `requestAnimationFrame`. Si hay jank, afecta INP.
5. **Booking form multi-step** — el step transition puede causar layout shifts si no hay CSS `will-change`.

### CLS en Purity & Clean — oportunidades

1. **Web fonts** — si Google Fonts no tienen `font-display: swap`, el texto puede causar layout shift cuando carga la fuente.
2. **Dynamic content** — si el chatbot panel se despliega después del load, puede empujar contenido hacia abajo (CLS).
3. **Image lazy loading** — las imágenes de servicios cargan lazy. Si no tienen `aspect-ratio` definido, causan CLS cuando cargan.
4. **Comparison sliders** — las imágenes de before/after cargan lazy y pueden causar CLS si no hay placeholder con aspect-ratio.
5. **Ads/iframes** — si hay embeds de video YouTube, necesitan `aspect-ratio` para evitar CLS.

### Herramientas de medición

- **PageSpeed Insights** (pagespeed.web.dev) — datos reales de Chrome User Experience Report
- **web-vitals library** [1] — para medir en campo con `onLCP`, `onINP`, `onCLS`
- **Chrome DevTools** — Performance panel para lab testing
- **Lighthouse** — para audit automático

### Optimizaciones más efectivas según Google [1]

1. **LCP < 2.5s**: optimizar servidor (TTFB < 800ms), comprimir imágenes, preload critical resources, CSS inline critical
2. **INP < 200ms**: reducir JS main thread, usar `requestIdleCallback` para trabajo no crítico, breaks longos tasks en chunks
3. **CLS < 0.1**: definir `aspect-ratio` en imágenes, `font-display: swap` para fonts, no insertar contenido arriba del fold

---

## Gaps identificados — Round 39 (NOVEDADES no cubiertas en R1-R38)

### 1. Font Awesome CDN — demasiados HTTP requests para icons

**Problema:** Font Awesome 6.5 carga desde cdnjs.cloudflare.com. Cada icon es un glyph en un font file, lo que significa que para mostrar un icon se carga el font entero (~150kb+). Esto afecta LCP y consume bandwidth.

### 2. Búsqueda en tiempo real sin debounce — posible INP violation

**Problema:** El search input filtra en tiempo real con cada keystroke (`input` event). Si el usuario escribe rápido, cada carácter dispara un re-render completo de todas las tarjetas. Esto puede causar INP > 200ms en dispositivos lentos.

### 3. Sin `font-display: swap` explícito — CLS potencial en carga de fuentes

**Problema:** Las Google Fonts se cargan con `font-display: swap` implícito, pero no hay configuración explícita. Si la fuente carga más lento que el HTML, el texto causa CLS.

### 4. Imágenes sin `aspect-ratio` — CLS en lazy loading

**Problema:** Las imágenes de servicios y productos cargan lazy sin `aspect-ratio` definido. Cuando cargan, empujan el contenido hacia abajo, causando CLS.

### 5. Video embed de YouTube sin `aspect-ratio` — CLS en FAQ/video section

**Problema:** El video de YouTube (embed en index.html) usa iframe sin `aspect-ratio` container. Esto causa CLS cuando el iframe carga.

### 6. Sin testing de Core Web Vitals en CI — Playwright no mide performance

**Problema:** Las 9 suites de Playwright no incluyen métricas de Core Web Vitals. No hay forma de detectar regressions de performance en CI.

### 7. CSS de 6212 líneas sin `@layer` — deuda de mantenimiento (reiterado de R36)

**Problema:** Ya mencionado en R36 pero no implementado. CSS sin organization causa specificity conflicts y miedo a tocar cosas.

### 8. JS de 1847 líneas sin code splitting — todo el JS en un archivo

**Problema:** Todo el JavaScript (chatbot, booking, search, theme toggle, stats counters) está en un solo archivo de 1847 líneas. No hay code splitting, lo que significa que el browser descarga y parsea todo el JS incluso si el usuario solo usa el search.

### 9. Plausible Analytics en `<head>` — potencial render blocking

**Problema:** El script de Plausible (`defer data-domain`) está en el `<head>`. Aunque usa `defer`, el parsing de `<head>` puede verse afectado.

### 10. Stats counters con `requestAnimationFrame` — jank en scroll

**Problema:** Los contadores animados usan `requestAnimationFrame` pero no hay throttle en scroll. Si el usuario scrollea rápido, los contadores pueden causar jank.

---

## Propuestas (Round 39)

### Propuesta 1: Reemplazar Font Awesome CDN con SVG sprites inline

| Campo | Detalle |
|-------|---------|
| **Título** | Optimización de iconos: de Font Awesome CDN a SVG inline sprites |
| **Problema** | Font Awesome carga ~150kb+ de font file para mostrar icons. Cada icon es un glyph en el font, no un asset individual. Esto afecta LCP y consume bandwidth innecesario. |
| **Descripción** | 1. **Crear SVG sprite sheet**: Extraer los ~20 icons que el sitio usa realmente (search, moon, bars, phone, whatsapp, chevron, etc.) y crear un SVG sprite con `<symbol>`. 2. **Reemplazar `<i class="fa-solid...">` con `<svg><use href="#icon-name"></use></svg>`**: Mantener el styling con CSS heredado. 3. **Beneficios**: SVGs inline pesan ~2-5kb total (vs 150kb+ del font), son resolution-independent, no causan FOUC. 4. **Fallback**: Mantener Font Awesome para browsers viejos (graceful degradation). 5. **Impacto en LCP**: Eliminar 1 request HTTP crítico y ~150kb de downloaded font. |
| **Impacto esperado** | LCP improvement ~100-200ms, reducción de bandwidth, mejor render en móviles |
| **Esfuerzo** | M |
| **Agente recomendado** | Frontend |
| **Referencias** | [1] https://web.dev/articles/optimize-lcp [2] https://developer.mozilla.org/docs/Web/SVG/Element/symbol |

### Propuesta 2: Debounce en search input + virtual scrolling para el grid

| Campo | Detalle |
|-------|---------|
| **Título** | Search con debounce y renderizamiento optimizado — evita INP violations |
| **Problema** | El search input filtra con cada keystroke sin debounce. En un grid de 12+ tarjetas, cada re-render itera sobre todos los elementos del DOM. Esto puede causar INP > 200ms cuando el usuario escribe rápido. |
| **Descripción** | 1. **Añadir debounce de 150ms**: El handler de `input` event usa `setTimeout` con 150ms para agrupar keystrokes. 2. **Usar `requestAnimationFrame` para el render**: En lugar de re-renderizar inmediatamente, agendar el render en el próximo frame. 3. **CSS `content-visibility: auto`**: Añadir `content-visibility: auto` a las tarjetas fuera del viewport para que el browser skip su rendering. 4. **Hidden items con `display: none`**: En lugar de remove/add al DOM, usar `display: none` para items que no matchean (el browser no los renderiza). 5. **Impacto**: Reduce el número de renders por búsqueda de ~N (una por keystroke) a ~2-3 (debounced), y reduce el trabajo de rendering por cada búsqueda. |
| **Impacto esperado** | INP improvement, especialmente en móviles y con muchos resultados |
| **Esfuerzo** | S |
| **Agente recomendado** | Frontend |
| **Referencias** | [1] https://web.dev/articles/optimize-inp [2] https://developer.mozilla.org/docs/Web/API/Window/requestAnimationFrame |

### Propuesta 3: `aspect-ratio` en todas las imágenes — eliminar CLS

| Campo | Detalle |
|-------|---------|
| **Título** | Prevenir CLS: añadir `aspect-ratio` y placeholders a todas las imágenes lazy-loaded |
| **Problema** | Las imágenes lazy-loaded sin `aspect-ratio` causan CLS cuando cargan. Esto afecta el Core Web Vital de estabilidad visual. |
| **Descripción** | 1. **Añadir `aspect-ratio` a todas las imágenes**: Usar CSS `aspect-ratio: 16/9` o `4/3` según el tipo de imagen. 2. **Background-color placeholder**: Mientras la imagen carga, mostrar un background-color que填补 el espacio. 3. **Para comparison sliders**: Cada par before/after tiene dos imágenes. Definir aspect-ratio para ambas para evitar shift cuando cargan. 4. **Para el video embed**: Enviar el iframe en un container con `aspect-ratio: 16/9` y `max-width: 100%`. 5. **Verificar con Chrome DevTools**: Usar Layout Shift panel para identificar y fixear shifts restantes. |
| **Impacto esperado** | CLS cercano a 0, mejor Core Web Vitals score |
| **Esfuerzo** | S |
| **Agente recomendado** | Frontend |
| **Referencias** | [1] https://web.dev/articles/optimize-cls [2] https://web.dev/articles/rendering-performance |

### Propuesta 4: `font-display: swap` y Google Fonts optimization

| Campo | Detalle |
|-------|---------|
| **Título** | Google Fonts: optimizar con font-display: swap y subsetting |
| **Problema** | Google Fonts sin configuración explícita pueden causar FOUC (flash of unstyled text) y CLS si el text reflows cuando carga la fuente. |
| **Descripción** | 1. **Añadir `&display=swap` a la Google Fonts URL**:确保 fonts renders inmediatamente con fallback y swap sin FOUC. 2. **Subset la fonts a caracteres necesarios**: Si el sitio solo usa español, subset a `latin` only (ahorra ~30% del font size). 3. **font-display: optional para body text**: Para texto que no necesita la fuente específica, usar `font-display: optional` para evitar cualquier layout shift. 4. **Preload critical fonts**: Usar `<link rel="preload">` para la fuente del hero (Raleway 700) para que esté lista antes del render. 5. **Variable fonts**: Considerar usar variable fonts (Manrope y Raleway tienen versions variables) para reducir el número de HTTP requests. |
| **Impacto esperado** | Menos CLS, mejor LCP, sin FOUC |
| **Esfuerzo** | S |
| **Agente recomendado** | Frontend |
| **Referencias** | [1] https://web.dev/articles/optimize-lcp [2] https://developer.mozilla.org/docs/Web/API/Window/requestAnimationFrame |

### Propuesta 5: Code splitting del JavaScript — lazy load de chatbot y booking

| Campo | Detalle |
|-------|---------|
| **Título** | JavaScript modular: code splitting para chatbot, booking, y cotizador |
| **Problema** | El sitio carga 1847 líneas de JS en un solo archivo. El usuario que solo quiere ver información no necesita el chatbot, el booking form, ni el cotizador. Esto aumenta TTFB efectivo y parsing time. |
| **Descripción** | 1. **Dividir en módulos**: Crear archivos separados para: `chatbot.js` (~200 líneas), `booking.js` (~300 líneas), `cotizador.js` (~150 líneas), `search.js` (~100 líneas), `theme.js` (~50 líneas). 2. **Lazy loading con `type="module"` y dynamic import**: Los scripts no críticos se cargan con `import()`. 3. **`<script type="module">` para main.js**: El archivo principal queda liviano y solo importa los módulos cuando se necesitan. 4. **Intersection Observer para lazy load**: Los componentes below-the-fold (chatbot FAB, cotizador) se cargan cuando entran al viewport. 5. **Build step**: Se necesita un bundler simple (esbuild o rollup) para crear el bundle de producción. **Nota**: Esto añade build complexity — evaluar si el beneficio justifica el setup. Si no hay build step actualmente, usar dynamic `import()` sin bundler (nativo). |
| **Impacto esperado** | Reducción de JS parsing time inicial, mejor INP, mejor TTI (Time to Interactive) |
| **Esfuerzo** | L (requiere build setup o refactoring) |
| **Agente recomendado** | Frontend |
| **Referencias** | [1] https://web.dev/articles/optimize-inp [2] https://developer.mozilla.org/docs/Web/JavaScript/Guide/Modules |

### Propuesta 6: Playwright con Web Vitals tracking en CI

| Campo | Detalle |
|-------|---------|
| **Título** | Core Web Vitals en CI: añadir métricas de performance a Playwright |
| **Problema** | Las 9 suites de Playwright no miden Core Web Vitals. No hay forma de detectar regressions de performance automáticamente. |
| **Descripción** | 1. **Añadir `web-vitals` library al proyecto**: `import {onLCP, onINP, onCLS} from 'web-vitals'` en el test setup. 2. **Custom Playwright reporter**: Crear un reporter que capture y loguear los valores de LCP, INP, CLS en cada test. 3. **Assertions en tests críticos**: En el test del hero, asserts que LCP < 2.5s. En el test del booking form, assert que INP < 200ms. En el test de scroll, assert que CLS < 0.1. 4. **Threshold alerts**: Si algún metric supera el threshold, el test falla con mensaje claro. 5. **Dashboard de métricas**: Guardar los resultados en un artifact o CSV para tracking histórico. 6. **Playwright test runner con `--project=chromium`**: Usar Chromium para las métricas (Chrome UX Report data solo está disponible para Chrome). |
| **Impacto esperado** | Detección automática de regressions de performance, mejor confidence en deploys |
| **Esfuerzo** | M |
| **Agente recomendado** | QA / Frontend |
| **Referencias** | [1] https://web.dev/articles/vitals-measurement-best-practices [2] https://github.com/GoogleChrome/web-vitals |

### Propuesta 7: Theme toggle con CSS-only approach + batched DOM updates

| Campo | Detalle |
|-------|---------|
| **Título** | Eliminar layout thrashing del theme toggle — batched DOM updates |
| **Problema** | El theme toggle actual probablemente itera sobre múltiples elementos con `data-theme` attribute actualizando estilos inline uno por uno. Esto causa layout thrashing (lecturas y escrituras intercaladas al DOM). |
| **Descripción** | 1. **Single `data-theme` en `<html>`**: En lugar de actualizar cada elemento, solo actualizar `data-theme` en `<html>`. Todo el CSS responde a `[data-theme="dark"]` sin JS adicional. 2. **Si hay actualizaciones por elemento**: Usar `requestAnimationFrame` para batching: collect todos los cambios, aplicarlos en un solo frame. 3. **Evitar `window.getComputedStyle()` en el loop**: Si se usa para leer valores, causa layout thrashing. Guardar valores antes del loop. 4. **Impacto**: Elimina múltiples forced reflows por toggle, mejora INP. |
| **Impacto esperado** | INP improvement en theme toggle, menos jank |
| **Esfuerzo** | S |
| **Agente recomendado** | Frontend |
| **Referencias** | [1] https://web.dev/articles/optimize-inp [2] https://developers.google.com/web/fundamentals/performance/rendering |

### Propuesta 8: CSS `@layer` — arquitectura de 6212 líneas (reiterado, alta prioridad)

| Campo | Detalle |
|-------|---------|
| **Título** | Organizar CSS con Cascade Layers — arquitectura mantenible |
| **Problema** | Ya propuesto en R36 pero no implementado. CSS de 6212 líneas sin layers causa specificity conflicts, estilos hard de sobreescribir, y miedo a tocar cosas. |
| **Descripción** | 1. **Crear layers en cascade**: `@layer reset, base, components, utilities, theme` al inicio del archivo. 2. **Mover CSS existente a layers**: Los estilos de reset van a `reset`, variables CSS a `base`, componentes (cards, botones, chatbot) a `components`, helpers a `utilities`, dark mode a `theme`. 3. **Nuevos estilos siempre en layer correcto**: Los nuevos cambios se añaden al layer correspondiente sin necesidad de luchar contra specificity. 4. **Impacto**: CSS más mantenible, onboarding de nuevos agentes más rápido, menos regressions. |
| **Impacto esperado** | Mejor DX, menos specificity wars, CSS más mantenible |
| **Esfuerzo** | L (migración gradual) |
| **Agente recomendado** | Frontend |
| **Referencias** | [1] https://web.dev/blog/cascade-layers [2] https://developer.mozilla.org/docs/Web/CSS/@layer |

### Propuesta 9: Defer Plausible Analytics script — menor render blocking

| Campo | Detalle |
|-------|---------|
| **Título** | Optimizar carga de Plausible — defer para evitar impact en INP |
| **Problema** | El script de Plausible ya usa `defer`, pero hay formas de asegurar que no afecta el parsing del `<head>` ni el INP. |
| **Descripción** | 1. **Mover al final del `<body>`**: En lugar de `<head>`, mover el script de Plausible al final de `<body>` donde no blocking el parse del HTML. 2. **Usar `requestIdleCallback`**: Cargar Plausible después de que la página está interactiva usando `requestIdleCallback`. 3. **Verificar con Chrome DevTools**: Medir si el defer realmente está working y si hay impact medible. 4. **Fallback**: Mantener el `data-domain` attribute para que Plausible funcione correctamente. |
| **Impacto esperado** | Mejor INP, especialmente en dispositivos lentos |
| **Esfuerzo** | S |
| **Agente recomendado** | Frontend |
| **Referencias** | [1] https://web.dev/articles/optimize-inp |

---

## Orden de implementación recomendado

| # | Propuesta | Impacto | Esfuerzo | Semana |
|---|----------|---------|----------|--------|
| 1 | `aspect-ratio` en imágenes (CLS) | Alto | S | 1 |
| 2 | `font-display: swap` + subset | Medio | S | 1 |
| 3 | Debounce + virtual scrolling en search | Alto | S | 1 |
| 4 | SVG sprites para icons | Alto | M | 1-2 |
| 5 | Theme toggle batched | Medio | S | 1-2 |
| 6 | Defer Plausible | Bajo | S | 1 |
| 7 | Playwright Web Vitals CI | Alto | M | 2 |
| 8 | CSS `@layer` migration | Medio | L | 2-3 |
| 9 | Code splitting JS | Medio | L | 3 |

**Top 3 para implementar primero:** 1, 3, 4 (quick wins con impacto directo en Core Web Vitals).

---

## Diferencia clave: R38 vs R39

R38 se enfocó en **reputación multi-plataforma y AI visibility** — Apple Maps, video reviews, review velocity, ChatGPT summaries.

**R39 se enfoca en rendimiento técnico y experiencia de usuario a nivel de browser** — Core Web Vitals, CLS, INP, LCP, optimization de recursos. El sitio tiene mucho margen para mejorar en métricas que Google usa para ranking y experiencia de usuario.

Las 10 propuestas de R39 son **complementarias a R36-R38** (donde se propuso la modernización del frontend con Baseline 2026 APIs y las mejoras de reputación). R39 va por la capa de rendimiento que sostiene todo lo demás.

---

## Fuentes

[1] Google. "Web Vitals." web.dev. https://web.dev/vitals/

[2] Google. "Optimize LCP." web.dev. https://web.dev/articles/optimize-lcp

[3] Google. "Optimize INP." web.dev. https://web.dev/articles/optimize-inp

[4] Google. "Optimize CLS." web.dev. https://web.dev/articles/optimize-cls

[5] Google. "User-centric Performance Metrics." web.dev. https://web.dev/articles/user-centric-performance-metrics

[6] Chrome. "Web Vitals Measurement Best Practices." web.dev. https://web.dev/articles/vitals-measurement-best-practices

[7] Google. "How to measure Web Vitals in the field." web.dev. https://web.dev/articles/vitals-field-measurement-best-practices

[8] GitHub. "web-vitals library." GoogleChrome. https://github.com/GoogleChrome/web-vitals

---

*Documento generado por Innovation Scout — Round 39*
*Purity & Clean Analysis — 2026-04-27*
*Co-Authored-By: Paperclip <noreply@paperclip.ing>*