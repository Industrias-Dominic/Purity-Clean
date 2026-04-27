# Análisis Creativo — Purity & Clean (Round 36)

**Proyecto:** Purity & Clean
**Fecha:** 2026-04-27
**Analista:** Innovation Scout
**Ronda:** 36
**Issue padre:** DOMAA-428

---

## Resumen Ejecutivo

R36 se enfoca en **modernización del frontend con Baseline 2026** — las nuevas capacidades de la plataforma web que ya están disponibles en todos los navegadores y que Purity & Clean no está aprovechando. Con 6.212 líneas de CSS y 1.847 de JS, el sitio tiene margen significativo para simplificar código, mejorar accesibilidad, y reducir dependencia de polyfills y librerías externas. Las nuevas APIs de navegación, popover y view transitions permiten reescribir componentes críticos con menos código y mejor rendimiento.

---

## Stack tecnológico actual (resumen R35)

- **Frontend:** HTML5 + CSS3 + JS vanilla ES6+
- **CSS:** 6212 líneas style.css
- **JS:** 1847+ líneas script.js (incluye chatbot, booking multi-step, search, theme toggle)
- **Fuentes:** Manrope + Raleway — Google Fonts
- **Iconos:** Font Awesome 6.5 CDN (SRI verificado)
- **Analítica:** Plausible Analytics (sin cookies, GDPR-compliant)
- **Forms:** Formspree
- **Testing:** Playwright E2E (9 suites)
- **PWA:** Service Worker, push notifications, offline support
- **SEO:** Schema LocalBusiness + FAQPage + Article + Review + VideoObject + HowTo + BreadcrumbList
- **Chatbot:** FAQ routing → WhatsApp con mensaje dinámico
- **Booking:** Multi-step form con slot picker
- **Theme:** Dark mode toggle con persistencia
- **Cobertura:** 10 zonas en Bogotá
- **Precios:** Cotizador interactivo + WhatsApp pre-filled
- **Reputación:** 127 reviews verificadas, 4.8/5

---

## Investigación: Lo nuevo en Baseline 2026 y 2025

### Baseline 2026 — Recién disponible

| Feature | Estado | Relevancia para Purity & Clean |
|---------|--------|-------------------------------|
| **Navigation API** | Baseline Feb 2026 | Reemplaza la lógica manual de multi-step form y manejo de historial del booking |
| **JS modules in service workers** | Baseline Feb 2026 | PWA caching más granular, mejor offline |
| **rcap, rch, rex, ric units** | Baseline 2026 | Tipografía responsive que escala con la raíz del documento |
| **CSS scroll-driven animations** | Baseline 2025 (ampliado 2026) | Animaciones en comparison sliders sin JS |
| **CSS `@layer`** | Baseline 2024 | Organización de CSS, reducir specificity wars |

### Baseline 2025 — Ahora Widely Available

| Feature | Estado | Relevancia |
|---------|--------|------------|
| **Popover API** | Baseline Ene 2025 | Reemplazar chatbot FAB y panel — semántica nativa, mejor accesibilidad |
| **`:has()` selector** | Baseline Dic 2023 | selectors más limpios, sin JS para estilos condicionales |
| **CSS Nesting** | Baseline Ago 2023 | CSSDRY, mejor organización del style.css |
| **Subgrid** | Baseline Sep 2023 | Layouts más precisos en zonas y grid de servicios |
| **`:user-valid` / `:user-invalid`** | Baseline Oct 2023 | Validación de formularios más accesible |
| **`<search>` element** | Baseline Oct 2023 | Semántica correcta para el campo de búsqueda |
| **View Transitions API** | Baseline (en rollout) | Animaciones suaves entre estados del comparison slider |

---

## Gaps identificados — Round 36 (NOVEDADES no cubiertas en R1-R35)

### 1. Chatbot FAB y panel usan CSS fijo + JS para accesibilidad — Popover API podría simplificar

**Problema:** El chatbot actual (FAB button + panel desplegable) está implementado con CSS fixed positioning y JS manual para manage focus, aria, y cierre. El Popover API (Baseline 2025) proporciona toda esa funcionalidad de forma nativa con mejor accesibilidad y menos código.

**Impacto potencial:** ~150 líneas de JS y CSS simplificadas, mejor soporte de screen readers, comportamiento nativo de dismiss.

### 2. Multi-step booking form usa manejo manual de estado — Navigation API podría mejorar

**Problema:** El formulario multi-step (reservas) rely on JS custom para manejar pasos, validación entre pasos, y feedback visual. La Navigation API permite manejo declarativo del historial del navegador, transiciones entre pasos, y soporte nativo de "volver" del navegador.

**Impacto potencial:** UX más fluida cuando el usuario usa el botón de "volver" del navegador, menos código de estado, mejor analytics de navegación.

### 3. CSS de 6212 líneas sin organización con `@layer` — deuda de mantenimiento

**Problema:** El CSS no usa Cascade Layers (`@layer`), lo que causa specificity conflicts y hace difícil agregar nuevos estilos sin romper existentes. Con `@layer`, se puede organizar en: reset, base, components, utilities.

**Impacto potencial:** CSS más mantenible, menos conflicts, facilita trabajo de agentes future.

### 4. Comparison sliders (6 pares antes/después) usan JS para animaciones — scroll-driven animations podrían reducir JS

**Problema:** Los comparison sliders actuales animan el "before/after" con JS que escucha scroll events. Las scroll-driven animations de CSS (Baseline 2025) permiten lo mismo con CSS puro y mejor performance.

**Impacto potencial:** Eliminación de listener de scroll por slider, 60fps animations, menos JS cargado.

### 5. Theme toggle manual podría usar `prefers-color-scheme` y CSS relative colors

**Problema:** El tema oscuro se maneja con JS + localStorage. La combinación de `prefers-color-scheme` en CSS y `color-mix()` con relative colors permite theming puro-CSS sin JavaScript para la preferencia inicial.

**Impacto potencial:** Tema inicial sin flash, menos JS, código más simple.

### 6. PWA service worker usa IIFE classic — modules enabled service worker podría mejorar caching

**Problema:** El service worker actual (sw.js) usa el formato legacy de IIFE. Con JS modules en service workers (Baseline 2026), se puede usar import maps y caching más granular basado en módulos.

**Impacto potencial:** Offline más rápido, mejor cache invalidation, soporte offline para más assets.

### 7. Campo de búsqueda no usa `<search>` element semántico

**Problema:** El campo de búsqueda en index.html usa `<input type="search">` pero no está envuelto en `<search>` (Baseline Oct 2023). La semántica correcta ayuda a screen readers y AI crawlers.

**Impacto potencial:** Mejor accesibilidad, mejor parsing por AI tools.

### 8. Validación de formularios manual — `:user-valid` / `:user-invalid` podría mejorar UX

**Problema:** La validación de formularios en script.js muestra errores con JS custom. Los pseudo-selectores `:user-valid` y `:user-invalid` (Baseline Oct 2023) permiten estilos que solo se aplican después de que el usuario interacted con el campo.

**Impacto potencial:** Validación más clara, mejor UX, menos código de validación.

---

## Propuestas (Round 36)

### Propuesta 1: Reemplazar chatbot FAB/Panel con Popover API

| Campo | Detalle |
|-------|---------|
| **Título** | Modernización del chatbot con Popover API — mejor accesibilidad y menos código |
| **Problema** | El chatbot actual requiere ~150 líneas de JS y CSS para manejar focus, aria, y dismiss. Popover API lo hace nativo. |
| **Descripción** | Reemplazar `.chatbot-fab` y `.chatbot-panel` con elementos HTML nativos `<button popover>` y `<div popover>`. El navegador maneja focus trapping, aria semantics, y dismiss automáticamente. Beneficios: (1) Sin JS para toggle, (2) `::backdrop` nativo para overlay, (3) Mejor screen reader support, (4) Keyboard native behavior. Impacto: ~100-150 líneas de CSS/JS eliminadas. |
| **Impacto esperado** | Reducción de código, mejor accesibilidad, menos mantenimiento |
| **Esfuerzo** | M |
| **Agente recomendado** | Frontend |
| **Referencias** | [1] https://web.dev/blog/popover-api [2] https://developer.mozilla.org/docs/Web/API/Popover_API |

### Propuesta 2: Navigation API para el formulario multi-step de reservas

| Campo | Detalle |
|-------|---------|
| **Título** | Implementar Navigation API en el booking flow para UX nativa de "volver" |
| **Problema** | El booking multi-step actual pierde el estado cuando el usuario presiona "volver" del navegador porque no hay historial entries. Navigation API permite asociar cada paso con un history entry y manejar transiciones. |
| **Descripción** | Migrar el sistema de pasos del booking a Navigation API: (1) Cada paso del formulario dispara `navigation.navigate()` con su propio state, (2) El botón "volver" del navegador restaura el paso anterior con el state correcto, (3) Transiciones animadas entre pasos con View Transitions API, (4) Analytics tracking cuando el usuario abandona el flow. Compatibilidad: todos los navegadores modernos (Chrome 102+, Safari 16.4+, Firefox 126+). |
| **Impacto esperado** | UX más fluida, menos abandonos de booking por uso accidental del botón "volver", mejor analytics |
| **Esfuerzo** | M |
| **Agente recomendado** | Frontend |
| **Referencias** | [1] https://web.dev/blog/baseline-navigation-api [2] https://developer.mozilla.org/docs/Web/API/Navigation_API |

### Propuesta 3: Organizar CSS con Cascade Layers (`@layer`) para reducir deuda técnica

| Campo | Detalle |
|-------|---------|
| **Título** | Refactorizar CSS con `@layer` — de 6212 líneas caóticas a arquitectura mantenible |
| **Problema** | CSS de 6212 líneas sin layers causa specificity conflicts, estilos hard de sobreescribir, y miedo a tocar cosas. Cada cambio requiere trabajo-around de specificity. |
| **Descripción** | Reorganizar el CSS en layers: (1) `@layer reset, base, components, utilities, theme;` (2) Mover variables CSS a `:root` layer, (3) Componentes (botones, cards, chatbot) en `components`, (4) Utilidades (hidden, flex helpers) en `utilities`, (5) Theme (dark mode) en `theme`. Cascade Layers permiten sobreescribir sin specificity wars. Beneficio: nuevo código puede agregar estilos sin conocer el estado actual del archivo. |
| **Impacto esperado** | CSS mantenible, menos conflictos, onboarding de nuevos agentes más rápido |
| **Esfuerzo** | L |
| **Agente recomendado** | Frontend |
| **Referencias** | [1] https://web.dev/blog/cascade-layers [2] https://developer.mozilla.org/docs/Web/CSS/@layer |

### Propuesta 4: Scroll-driven animations para comparison sliders — elimina JS de scroll

| Campo | Detalle |
|-------|---------|
| **Título** | Reemplazar listeners de scroll con CSS scroll-driven animations en los 6 comparison sliders |
| **Problema** | Los 6 comparison sliders antes/después usan `window.addEventListener('scroll', ...)` para animaciones. Esto causa jank en scroll y múltiples listeners. Scroll-driven animations (Baseline 2025) hacen lo mismo en CSS puro. |
| **Descripción** | Reemplazar los listeners de scroll de cada comparison slider con `animation-timeline: scroll()` de CSS. El slider se anima cuando entra al viewport sin JS. Soporte: Chrome, Edge, Firefox (experimental). Para Safari: fallback progresivo con JS. Beneficio: 0 listeners de scroll, 60fps animations, código declarativo. |
| **Impacto esperado** | Mejor performance en scroll, código más simple, menos JS en critical path |
| **Esfuerzo** | S |
| **Agente recomendado** | Frontend |
| **Referencias** | [1] https://developer.mozilla.org/docs/Web/CSS/animation-timeline [2] https://web.dev/blog/scroll-driven-animations |

### Propuesta 5: Service Worker con JS modules — PWA offline más granular

| Campo | Detalle |
|-------|---------|
| **Título** | Migrar service worker a modules graph — mejor caching y offline coverage |
| **Problema** | El sw.js actual usa IIFE closure que no permite import dinámico. Con modules enabled service workers (Baseline 2026), se puede usar `importScripts()` con módulos y dependency graph para cache invalidation precisa. |
| **Descripción** | Actualizar sw.js para usar service worker modules: (1) Crear `sw.js` como module entry point, (2) Dividir caching en módulos: `cache-static.js`, `cache-fonts.js`, `cache-images.js`, (3) Usar `import.meta.url` para resolve paths relativos, (4) `start_url` en manifest para Android splash screen correcto. Beneficio: cache invalidation sin borrar todo el cache, mejor offline para assets específicos. |
| **Impacto esperado** | Offline más rápido y preciso, mejor PWA score en Lighthouse, cache persistent |
| **Esfuerzo** | M |
| **Agente recomendado** | Frontend/PWA |
| **Referencias** | [1] https://developer.mozilla.org/docs/Web/API/ServiceWorkerContainer/register#module [2] https://web.dev/blog/baseline-navigation-api |

### Propuesta 6: Form validation con `:user-valid` / `:user-invalid` — UX nativa

| Campo | Detalle |
|-------|---------|
| **Título** | Reemplazar validación JS de formularios con CSS `:user-valid` / `:user-invalid` |
| **Problema** | La validación de formularios en script.js requiere JS custom para mostrar/ocultar errores, cambiar border colors, y manage aria-invalid. Los pseudo-selectores de Constraint Validation API lo hacen CSS puro. |
| **Descripción** | Actualizar los inputs de los formularios (booking, newsletter, cotizador) para usar: (1) Atributos `required`, `type`, `pattern` nativo, (2) Estilos con `:user-valid` (verde, check icon) y `:user-invalid` (rojo, shake animation), (3) `aria-describedby` para связь con error messages, (4) Eliminar el JS de validación de forms en script.js. Compatibilidad: todos los navegadores modernos. |
| **Impacto esperado** | Menos JS, validación más accesible, mejor UX nativa |
| **Esfuerzo** | S |
| **Agente recomendado** | Frontend |
| **Referencias** | [1] https://developer.mozilla.org/docs/Web/CSS/:user-valid [2] https://developer.mozilla.org/docs/Web/HTML/Constraint_validation |

### Propuesta 7: Semantic `<search>` element para el campo de búsqueda

| Campo | Detalle |
|-------|---------|
| **Título** | Envolver el campo de búsqueda en `<search>` para semántica correcta |
| **Problema** | El campo de búsqueda actual es `<input type="search">` sin wrapper semántico. `<search>` (Baseline Oct 2023) es el elemento correcto que comunica a screen readers y AI crawlers que esto es un widget de búsqueda. |
| **Descripción** | Envolver el campo de búsqueda en `<search id="site-search">` y actualizar selectors en CSS/JS para apuntar al nuevo wrapper. El elemento `<search>` no tiene estilos por defecto y es transparente para CSS. Beneficio: semántica correcta para accessibility, mejor parsing por AI tools que indexan el sitio. |
| **Impacto esperado** | Mejor accesibilidad, mejor AI discoverability (los LLMs parsean mejor el DOM), mejor semantics |
| **Esfuerzo** | S |
| **Agente recomendado** | Frontend |
| **Referencias** | [1] https://developer.mozilla.org/docs/Web/HTML/Element/search [2] https://web.dev/blog/baseline-navigation-api |

### Propuesta 8: Relative color syntax y color-mix() para theming puro-CSS

| Campo | Detalle |
|-------|---------|
| **Título** | Eliminar JS de theme toggle con CSS relative colors y prefers-color-scheme |
| **Problema** | El theme toggle actual usa JS para aplicar `data-theme="dark"` y persistir en localStorage. CSS relative color syntax permite calcular colores del tema desde variables base, eliminando la necesidad de JS para la lógica de tema inicial. |
| **Descripción** | Actualizar `:root` para usar relative colors: `--surface: color-mix(in oklch, var(--base) 15%, white);` y `data-theme="dark"` simplemente actualiza `--base`. Combinado con `@media (prefers-color-scheme: dark)`, el tema inicial se maneja 100% en CSS. JS solo needed para el toggle button que invierte el tema (y aún así puede usar `prefers-color-scheme` como fallback). Beneficio: sin flash de tema incorrecto, menos JS, código declarativo. |
| **Impacto esperado** | Sin FOUC (flash of unstyled content), menos JS, mejor performance |
| **Esfuerzo** | M |
| **Agente recomendado** | Frontend |
| **Referencias** | [1] https://developer.mozilla.org/docs/Web/CSS/CSS_colors/Relative_color_syntax [2] https://web.dev/blog/css-color-mix |

---

## Orden de implementación recomendado

| # | Propuesta | Impacto | Esfuerzo | Semana |
|---|----------|---------|----------|--------|
| 1 | Semantic `<search>` element | Bajo | S | 1 |
| 2 | CSS `:user-valid` / `:user-invalid` | Medio | S | 1 |
| 3 | Cascade Layers `@layer` | Medio | L | 1-2 |
| 4 | Scroll-driven animations | Medio | S | 1-2 |
| 5 | Popover API para chatbot | Alto | M | 2 |
| 6 | Navigation API para booking | Alto | M | 2-3 |
| 7 | CSS relative colors para theme | Medio | M | 2-3 |
| 8 | Service worker modules | Medio | M | 3 |

**Top 3 para implementar primero:** 1, 2, 4 (quick wins, bajo esfuerzo, alto impacto en modernidad).

---

## Diferencia clave: R35 vs R36

R35 iba por **discovery y reputación en la era AI** — Apple Maps, AI discoverability, review response.

**R36 va por la modernización técnica del frontend** — aprovechando las nuevas capacidades de Baseline 2026 y 2025 para simplificar código, mejorar rendimiento, y reducir deuda técnica.

El sitio actual tiene 6.212 líneas de CSS y 1.847 de JS con patterns que datan de 2022-2023. Baseline 2025-2026 trae APIs que permiten reescribir componentes críticos con:
- Menos código (Popover vs JS custom)
- Mejor accesibilidad (Navigation API, `:user-valid`)
- Mejor performance (scroll-driven animations, service worker modules)
- Mejor mantenibilidad (Cascade Layers)

---

## Fuentes

[1] web.dev. "Baseline 2026." https://web.dev/baseline/2026
[2] web.dev. "Popover API." https://web.dev/blog/popover-api
[3] web.dev. "Navigation API." https://web.dev/blog/baseline-navigation-api
[4] MDN. "CSS :user-valid and :user-invalid." https://developer.mozilla.org/docs/Web/CSS/:user-valid
[5] MDN. "CSS @layer." https://developer.mozilla.org/docs/Web/CSS/@layer
[6] MDN. "Scroll-driven animations." https://developer.mozilla.org/docs/Web/CSS/animation-timeline
[7] web.dev. "CSS color-mix()." https://web.dev/blog/css-color-mix
[8] MDN. "HTML `<search>` element." https://developer.mozilla.org/docs/Web/HTML/Element/search

---

*Documento generado por Innovation Scout — Round 36*
*Purity & Clean Analysis — 2026-04-27*
*Co-Authored-By: Paperclip <noreply@paperclip.ing>*