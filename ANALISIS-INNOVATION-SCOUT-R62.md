# Análisis Creativo — Purity & Clean (Round 62)

**Proyecto:** Purity & Clean
**Fecha:** 2026-04-27
**Analista:** Innovation Scout
**Ronda:** 62
**Issue padre:** DOMAA-598

---

## Resumen Ejecutivo

R62 se enfoca en **CSS Moderno 2026** y **Google Business Profile API** — dos áreas que no fueron cubiertas en R61 (Chrome Web Platform APIs). Estas propuestas son de **esfuerzo bajo a medio** (S-M) con **impacto alto en UX, SEO y diferenciación competitiva**. El enfoque es incremental y realista para el equipo actual.

**Diferenciación clave vs R61:** R61 = Chrome Web Platform APIs (View Transitions, Speculation Rules, Document PiP, Compute Pressure, LoAF, WebGPU, Navigation API). R62 = CSS Moderno nativo + Google Business Profile API Automation. R62 no necesita JavaScript complejo ni APIs experimentales — solo CSS nativo bien usado y automatización de GBP.

---

## Stack tecnológico actual (verificado en código)

- **Frontend:** HTML5 + CSS3 + JS vanilla ES6+ (sin bundler)
- **HTML:** 2305 líneas en index.html (monolítico)
- **CSS:** 6212 líneas en style.css (monolítico, sin @layer ni arquitectura modular)
- **JS:** 1847 líneas en script.js + zonas-data.js + zonas-render.js
- **PWA:** Service Worker con precache, offline page, push notifications (dormante)
- **Cobertura:** 10 zonas en Bogotá (fontibon, engativa, suba, etc.)
- **Fuentes:** Manrope + Raleway — Google Fonts
- **Iconos:** Font Awesome 6.5 CDN
- **Forms:** Formspree (booking, newsletter, zonas)
- **Testing:** Playwright E2E (10 suites)
- **SEO:** Schema LocalBusiness + FAQPage + Review + VideoObject + HowTo + BreadcrumbList + Article
- **Chatbot:** FAQ routing → WhatsApp (menú predefinido)
- **Reviews:** 127 reviews verificadas, 4.8/5
- **Blog:** 6 artículos educativos
- **Booking:** Multi-step form con slot picker + geo-localización
- **Theme:** Dark mode toggle con persistencia
- **Backend:** NO EXISTE — 100% estático
- **Map:** SVG coverage map sin implementar en JS
- **Animaciones:** IntersectionObserver + data-reveal (scroll animations basadas en JS)
- **Animaciones CSS:** Transition/keyframes, sin scroll-driven animations
- **Responsive:** Media queries tradicionales, sin container queries

---

## Investigación: CSS Moderno 2026 — Estado del Arte

### Hallazgo 1: Scroll-Driven Animations API — Animaciones de Scroll Nativas en CSS

**Fuentes:** [Scroll-driven animations - Chrome Developers](https://developer.chrome.com/docs/css-ui/scroll-driven-animations) + [CSS Scroll Animations - MDN](https://developer.mozilla.org/docs/Web/CSS/CSS_scroll-driven_animations) + [Bringing scroll-driven animations to browsers - Chrome Blog](https://blog.chromium.org/2023/11/bringing-scroll-driven-animations-to-chrome.html)

La Scroll-Driven Animations API permite crear animaciones que se desplazan con el scroll del usuario **sin JavaScript**. El timeline de la animación está vinculado directamente a la posición de scroll de un elemento contenedor.

**Cómo funciona:**
```css
@keyframes slide-in {
  from { transform: translateX(-100%); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
}

.scroll-reveal {
  animation: slide-in linear;
  animation-timeline: scroll(root);
  animation-range: entry 0% entry 100%;
}
```

**Diferencia con el approach actual de Purity & Clean:**
- **Actual:** IntersectionObserver observa elementos, cuando entran al viewport aplica `.is-visible` → CSS transitions/animation-play-state
- **Scroll-Driven:** La animación está definida puramente en CSS, el navegador calcula el progreso basado en la posición de scroll
- **Beneficio:** 0 JavaScript para animaciones de scroll, 60fps constante, no hay "jank" entre el final del IntersectionObserver y el inicio de la animación

**Purity & Clean tiene:**
- IntersectionObserver en `script.js` con `data-reveal`, `data-reveal-delay`, `data-reveal-distance` ✓
- Animaciones CSS triggereadas por `.is-visible` ✓
- **NO tiene:** Scroll-driven animations nativas CSS
- **NO tiene:** Fallback para reduced-motion basado en scroll position

**Potencial para Purity & Clean:**
- Reemplazar el IntersectionObserver de scroll animations con `@keyframes scroll-driven`
- Eliminar ~50 líneas de JavaScript de animaciones
- Las animaciones existentes (fade-in, slide-up, scale-in) son perfectamente implementables con scroll-driven animations

### Hallazgo 2: Container Queries — Responsive Basado en el Contenedor, No en el Viewport

**Fuentes:** [Container Queries - Chrome Developers](https://developer.chrome.com/docs/css-ui/css-container-queries) + [CSS Container Queries - MDN](https://developer.mozilla.com/docs/Web/CSS/CSS_container_queries)

Las Container Queries permiten escribir CSS que responde al **tamaño del contenedor padre**, no al viewport. Esto es revolucionaro para componentes reutilizables.

**Cómo funciona:**
```css
.card-wrapper {
  container-type: inline-size;
  container-name: card-container;
}

@container card-container (min-width: 400px) {
  .card {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
}
```

**Diferencia con media queries:**
- **Media query:** `@media (min-width: 768px)` — se aplica cuando el viewport es > 768px globalmente
- **Container query:** `@container (min-width: 400px)` — se aplica cuando el **contenedor específico** es > 400px

**Purity & Clean tiene:**
- Media queries tradicionales en todo el CSS ✓
- Cards grid responsive ✓
- **NO tiene:** Container queries para компонент card
- **NO tiene:** Componentes que se adapten a su contenedor específico

**Potencial para Purity & Clean:**
- Las zone cards del mapa podrían ser container-queried — si el contenedor es pequeño (sidebar), muestran layout vertical; si es grande (main content), muestran layout horizontal
- El cotizador podría adaptarse al contenedor donde se renderiza (en el hero vs en sección dedicada)
- El pricing card podría adaptarse al ancho disponible en su contenedor

### Hallazgo 3: `:has()` Selector — El "Parent Selector" que Cambia Todo

**Fuentes:** [`::has()` - MDN](https://developer.mozilla.org/docs/Web/CSS/:has) + [CSS :has() - Chrome Developers](https://developer.chrome.com/docs/css-ui/css-has)

El selector `:has()` permite seleccionar un elemento basándose en sus **descendientes**. Es el primer selector que permite "seleccionar el padre" en CSS.

**Casos de uso:**
```css
/* Selecciona un article que contiene un figure */
article:has(figure) { border: 1px solid #ccc; }

/* Selecciona un section que NO contiene un botón */
section:not(:has(button)) { padding: 1rem; }

/* Selecciona un card que está hovereado Y contiene un .price */
.card:has(.price):hover { box-shadow: 0 8px 24px rgba(0,0,0,0.12); }
```

**Purity & Clean tiene:**
- Selectores CSS tradicionales (clases, IDs, pseudo-clases) ✓
- **NO tiene:** `:has()` para estilizar basándose en contenido
- **NO tiene:** Estilización condicional basada en contenido

**Potencial para Purity & Clean:**
- **Pricing cards:** Unificar styling de pricing-card cuando contiene `.savings-badge` — `.pricing-card:has(.savings-badge)` para agregar accent border
- **Cards con tags:** `.card:has(.tag)` recibe padding especial para el tag
- **Cotizador:** `.cotizador-option:has(input:checked)` para highlight de opción seleccionada
- **FAQ items:** `.faq-item:has(.faq-answer)` para mostrar expandido

### Hallazgo 4: CSS `@layer` — Arquitectura CSS Modular

**Fuentes:** [CSS @layer - MDN](https://developer.mozilla.org/docs/Web/CSS/@layer) + [Organizing large CSS files - Chrome Developers](https://developer.chrome.com/docs/css-ui/organizing-large-css-files)

La `@layer` at-rule permite definir capas de cascada explícitamente, resolviendo conflictos de especificidad de forma predecible.

**Cómo funciona:**
```css
@layer reset, base, components, utilities;

@layer reset {
  * { box-sizing: border-box; margin: 0; padding: 0; }
}

@layer base {
  body { font-family: system-ui; }
  a { color: inherit; }
}

@layer components {
  .card { border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.08); }
}

@layer utilities {
  .sr-only { position: absolute; width: 1px; height: 1px; }
}
```

**Purity & Clean tiene:**
- CSS monolítico de 6212 líneas ✓
- **NO tiene:** Arquitectura @layer
- **NO tiene:** Separación de concerns (reset, base, components, utilities)
- Consecuencia: especificidad difícil de predecir, overrides accidental

**Potencial para Purity & Clean:**
- Dividir style.css en layers: reset → typography → layout → components → utilities
- Eliminar conflictos de especificidad con `!important` innecesarios
- Hacer el CSS más mantenible a largo plazo

### Hallazgo 5: Google Business Profile API — Automatización de Posts, Reviews y Q&A

**Fuentes:** [Google Business Profile API](https://developers.google.com/my-business) + [GBP API Documentation](https://developers.google.com/my-business/content/overview) + [Managing GBP programmatically](https://developers.google.com/my-business/guides/overview)

La Google Business Profile API permite a negocios gestionar su presencia en Google Search y Maps programáticamente: posts, reviews, Q&A, photos, business hours.

**Capacidades:**
- **Posts:** Crear posts con ofertas, eventos, actualizaciones
- **Reviews:** Responder a reviews, obtener review statistics
- **Q&A:** Publicar preguntas frecuentes
- **Photos:** Subir fotos del trabajo realizado
- **Notifications:** Webhook para nuevas reviews/preguntas

**Purity & Clean tiene:**
- Google Business Profile manual (gestión desde Google My Business) ✓
- Reviews 127 verificadas en Schema.org (en el HTML) ✓
- **NO tiene:** Automatización GBP API
- **NO tiene:** Posts programáticos en Google Search
- **NO tiene:** Respuesta automática a reviews

**Potencial para Purity & Clean:**
- Automatizar posts cuando se agrega un nuevo artículo al blog
- Automatizar respuesta a nuevas reviews con template personalizado
- Publicar ofertas estacionales (Black Friday, Navidad) vía API
- Sincronizar fotos del antes/después del servicio

### Hallazgo 6: Style Queries — Container Queries para Estilos, No Solo Tamaños

**Fuentes:** [Style Queries - Chrome Developers](https://developer.chrome.com/docs/css-ui/style-queries) + [CSS Style Queries - Chrome Status](https://chromestatus.com/features/5673196702046208)

Las Style Queries permiten aplicar estilos basándose en el **valor de una propiedad CSS del contenedor**, no solo su tamaño.

**Cómo funciona:**
```css
@container style(--theme: dark) {
  .card { background: #1a1a1a; color: #fff; }
}

@container style(--variant: featured) {
  .card { border: 2px solid var(--color-primary); }
}
```

**Purity & Clean tiene:**
- Container queries de tamaño (disponibles en Chrome 105+) ✓
- CSS custom properties para theming ✓
- **NO tiene:** Style queries
- **NO tiene:** Theming dinámico por contenedor

**Potencial para Purity & Clean:**
- El theme toggle ya existente podría propagar `--theme: dark` a un container, y las secciones consultar `@container style(--theme: dark)` para ajustar colores
- Cards de zona podrían consultar `style(--zone-type: premium)` para aplicar estilos premium sin duplicar CSS

### Hallazgo 7: `:focus-visible` vs `:focus` — Accesibilidad Sin Compromiso

**Fuentes:** [`:focus-visible` - MDN](https://developer.mozilla.org/docs/Web/CSS/:focus-visible) + [Implementing focus-visible - Google Developers](https://developer.google.com/web/updates/2021/06/focus-visible)

El selector `:focus-visible` aplica estilos de focus **solo cuando el usuario navega con teclado**, no cuando hace click/tap. Esto permite tener focus rings accesibles para keyboard users sin ensuciar la UI para mouse users.

**Purity & Clean tiene:**
- `:focus` básico en algunos elementos ✓
- **NO tiene:** `:focus-visible` implementado correctamente
- **NO tiene:** Diferenciación entre keyboard focus y mouse focus
- **Consecuencia:** Focus rings visibles todo el tiempo, o focus rings faltantes cuando son necesarios

**Potencial para Purity & Clean:**
- Reemplazar `:focus` con `:focus-visible` globalmente
- Implementar focus ring visible para keyboard navigation
- Eliminar focus rings en click/tap para mejor UX visual

---

## Gaps identificados — Round 62 (CSS Moderno + GBP API)

### Gap 1: Animaciones de Scroll Basadas en JS en Lugar de CSS Nativo

**Problema:** El IntersectionObserver en script.js observa cada elemento `data-reveal`, añade/quita `.is-visible`. Esto es ~50 líneas de JS que podrían eliminarse con scroll-driven animations CSS nativas.

### Gap 2: Sin Container Queries — Responsive de Viewport, No de Componente

**Problema:** Todas las media queries responden al viewport, no al contenedor. Los componentes no se adaptan a dónde se renderizan.

### Gap 3: Sin `:has()` — Estilización Sin Contexto de Contenido

**Problema:** No se puede estilizar un `.pricing-card` basándose en si contiene `.savings-badge`. Se duplica CSS o se usa JS.

### Gap 4: CSS Monolítico Sin Arquitectura `@layer`

**Problema:** 6212 líneas en style.css sin capas. Especificidad impredecible, difícil mantener, `!important` usado como hack.

### Gap 5: Sin Automatización de Google Business Profile

**Problema:** Los posts de Google, respuestas a reviews, Q&A se hacen manualmente. No hay integración con el CMS del sitio.

### Gap 6: Sin Style Queries — Theming Estático

**Problema:** El dark mode toggle modifica `data-theme` en `<html>` pero no hay container-level theming dinámico.

### Gap 7: Sin `:focus-visible` — Focus Inconsistente

**Problema:** Focus rings aparecen en click (no necesarios) y faltan en keyboard nav (sí necesarios).

---

## Propuestas (Round 62)

### Propuesta 1: Scroll-Driven Animations para Reemplazar IntersectionObserver

| Campo | Detalle |
|-------|---------|
| **Título** | Implementar Scroll-Driven Animations API para eliminar ~50 líneas de JS de IntersectionObserver |
| **Problema** | Las animaciones de scroll usan IntersectionObserver en JS (~50 líneas en script.js). Cada elemento tiene `data-reveal` + `.is-visible`. Esto puede reemplazarse con CSS nativo. |
| **Descripción** | Scroll-Driven Animations: (1) **CSS Keyframes con timeline scroll**: definir `@keyframes` con `animation-timeline: scroll(root)` o `view()`. (2) **Animaciones existentes migradas**: las animaciones `fade-in`, `slide-up`, `scale-in` se reescriben como scroll-driven. (3) **Fallback**: mantener IntersectionObserver como fallback para Firefox (que aún no soporta scroll-driven animations). Usar `@supports (animation-timeline: scroll())` para feature detection. (4) **Preserve data-reveal-delay**: el delay se preserva con `animation-delay`. (5) **Preserve data-reveal-distance**: se translada a `start` y `end` del `animation-range`. (6) **Remove is-visible JS logic**: eventualmente se puede remover la lógica de `.is-visible` de IntersectionObserver cuando scroll-driven esté estable. Implementación: reescribir 3-4 @keyframes como scroll-driven + feature detection + fallback, 3-4 horas. |
| **Impacto esperado** | Eliminación de ~50 líneas de JS, 60fps consistente en animaciones, mejor performance en dispositivos low-end |
| **Esfuerzo** | S (3-4 horas) |
| **Agente recomendado** | Frontend |
| **Referencias** | [1] https://developer.chrome.com/docs/css-ui/scroll-driven-animations [2] https://blog.chromium.org/2023/11/bringing-scroll-driven-animations-to-chrome.html |

### Propuesta 2: Container Queries para Zone Cards y Cotizador

| Campo | Detalle |
|-------|---------|
| **Título** | Implementar Container Queries para zone cards y cotizador adaptativo |
| **Problema** | Las zone cards del mapa y el cotizador usan media queries basadas en viewport. Si se renderizan en un contenedor angosto (ej: sidebar), no se adaptan correctamente. |
| **Descripción** | Container Queries: (1) **Zone Cards**: el `.map-zone-card` se envuelve en un container con `container-type: inline-size`. Las cards dentro usan `@container (min-width: 200px)` para cambiar de vertical a horizontal layout. (2) **Cotizador Panel**: el `.cotizador-panel` se convierte en container. `@container (max-width: 400px)` activa stacked layout en lugar de side-by-side. (3) **Pricing Cards**: cada pricing card es un container que responde a su propio ancho, permitiendo que se muestren en grids variables sin depender del viewport. (4) **Zone List**: la `.map-zone-list` usa container queries para cambiar de grid 4 columnas a 2 columnas a 1 columna según el espacio disponible. (5) **Fallback**: usar `@supports (container-type: inline-size)` para feature detection. Implementación: container queries para 3 componentes principales + fallback, 2-3 horas. |
| **Impacto esperado** | Componentes que se adaptan a su contexto real, no al viewport. Mejor layout en mobile y sidebar. |
| **Esfuerzo** | S (2-3 horas) |
| **Agente recomendado** | Frontend |
| **Referencias** | [3] https://developer.chrome.com/docs/css-ui/css-container-queries |

### Propuesta 3: `:has()` Selector para Pricing Cards y FAQ Items

| Campo | Detalle |
|-------|---------|
| **Título** | Implementar `:has()` selector para estilización condicional de componentes |
| **Problema** | Pricing cards que contienen `.savings-badge` necesitan styling especial. Actualmente se usa `.pricing-feature--combo` como clase helper. Con `:has()` se puede estilizar automáticamente basándose en el contenido. |
| **Descripción** | `:has()` selector: (1) **Pricing Cards con savings badge**: `.pricing-card:has(.savings-badge)` recibe un borde accent y padding extra para el badge flotante. (2) **Cards con tag**: `.card:has(.tag)` ajusta el padding del header para evitar overlap con el tag. (3) **FAQ items expandidos**: `.faq-item:has(.faq-answer.is-open)` muestra el chevron rotado. (4) **Cotizador options seleccionadas**: `.cotizador-option:has(input:checked)` aplica background highlight sin JS. (5) **Card hover con price**: `.card:has(.price):hover` aplica shadow premium. (6) **Browser support**: Chrome 105+, Safari 15.4+, Firefox 121+. 93%+ de usuarios. Implementación: `:has()` para 5-6 casos de uso + fallback de clase helper, 2-3 horas. |
| **Impacto esperado** | CSS más limpio y semántico, eliminación de clases helper, componentes que se adaptan a su estado real |
| **Esfuerzo** | S (2-3 horas) |
| **Agente recomendado** | Frontend |
| **Referencias** | [4] https://developer.chrome.com/docs/css-ui/css-has |

### Propuesta 4: CSS `@layer` Architecture para style.css

| Campo | Detalle |
|-------|---------|
| **Título** | Implementar arquitectura CSS `@layer` para modularizar style.css de 6212 líneas |
| **Problema** | style.css tiene 6212 líneas sin capas. Los conflictos de especificidad se resuelven con `!important` o selectores hiper-específicos. Imposible saber qué override qué. |
| **Descripción** | CSS @layer Architecture: (1) **Definir layers**: `@layer reset, base, typography, layout, components, utilities` (orden = prioridad más baja → más alta). (2) **Migrar gradualmente**: mover CSS existente a las capas correspondientes. (3) **Reset layer**: normalize.css-like rules (box-sizing, margin reset, etc.). (4) **Base layer**: element selectors (body, a, img, form elements). (5) **Typography layer**: fonts, text styles. (6) **Layout layer**: grid, flexbox, container definitions. (7) **Components layer**: .card, .btn, .section, .hero, .nav. (8) **Utilities layer**: .sr-only, .visually-hidden, .text-center. (9) **Vendor/third-party layer**: Font Awesome overrides. (10) **New CSS goes to appropriate layer**: nueva funcionalidad va directo a la layer correcta. (11) **Refactorizar specificity**: los problemas de especificidad actuales se resuelven poniendo todo en layers. `!important` solo se usa en utilities layer si es necesario. Implementación: diseñar layers + migrar por fases (empezar con reset + base) + refactorizar selectores problemáticos, 5-7 horas. |
| **Impacto esperado** | CSS mantenible a largo plazo, especificidad predecible, eliminación de !important hacks, nueva funcionalidad más fácil de agregar |
| **Esfuerzo** | M (5-7 horas) |
| **Agente recomendado** | Frontend |
| **Referencias** | [5] https://developer.chrome.com/docs/css-ui/organizing-large-css-files |

### Propuesta 5: Google Business Profile API — Automatización de Posts y Reviews

| Campo | Detalle |
|-------|---------|
| **Título** | Implementar Google Business Profile API para automatización de posts, respuestas a reviews y Q&A |
| **Problema** | Los posts en Google Search (ofertas, eventos), las respuestas a reviews y las Q&A se gestionan manualmente. No hay conexión con el CMS del sitio. |
| **Descripción** | GBP API Integration: (1) **OAuth Setup**: obtener credenciales OAuth para la cuenta de Google Business del cliente. (2) **Post Automation**: cuando se publica un nuevo artículo en el blog (via GitHub webhook o manual), crear un GBP Post automáticamente con título + snippet + link. (3) **Review Response Templates**: respuestas predefinidas para reviews positivas/neutrales/negativas. El community manager personaliza y responde. (4) **Q&A Automation**: las FAQ del sitio se publican como Q&A en GBP (sincronización unidireccional). (5) **Offer Posts**: crear posts de oferta cuando hay promo estacional (configurar en variables de entorno). (6) **Stats Dashboard**: integrar estadísticas de GBP (views, clicks, calls) en el dashboard existente si lo hay. (7) **Scope control**: NO publicar reviews automaticadas (Google lo penaliza). Solo crear draft de respuesta para aprobación humana. Implementación: OAuth + Post API + Review response templates + Q&A sync, 5-7 horas. |
| **Impacto esperado** | Presencia en Google Search más activa y actualizada, engagement con clientes, diferenciación competitiva (pocos competidores en Bogotá usan GBP API) |
| **Esfuerzo** | M (5-7 horas) |
| **Agente recomendado** | Backend / Full Stack |
| **Referencias** | [6] https://developers.google.com/my-business/content/overview [7] https://developers.google.com/my-business/guides/overview |

### Propuesta 6: Style Queries para Theming Dinámico por Contenedor

| Campo | Detalle |
|-------|---------|
| **Título** | Implementar Style Queries para theming dinámico propagado a nivel de contenedor |
| **Problema** | El dark mode toggle modifica `data-theme` en `<html>`. Los estilos oscuros usan `[data-theme="dark"]` como selector global. No hay forma de activar theming a nivel de sección individual. |
| **Descripción** | Style Queries: (1) **CSS Custom Properties en root**: definir `--theme` como custom property en el root. (2) **Propagar a secciones**: cada `<section>`lee `--theme` y la propaga como inline style. (3) **Style Query en container**: ```css @container style(--theme: dark) { .card { background: #1a1a1a; color: #fff; } } ``` Las cards dentro de un section con `--theme: dark` se auto-estilan. (4) **Toggle por sección**: el theme toggle podría permitir "oscurecer solo esta sección" con Style Queries. (5) **Browser support**: Chrome 111+ (Style Queries), Firefox noch no, Safari 17.2+. Feature detection obligatorio. (6) **Fallback**: el sistema actual de `[data-theme]` funciona como fallback para Safari/Firefox. Implementación: CSS custom properties propagation + style query + feature detection, 3-4 horas. |
| **Impacto esperado** | Theming más granular y flexible, secciones oscuras independientes, foundation para tema por zona |
| **Esfuerzo** | S (3-4 horas) |
| **Agente recomendado** | Frontend |
| **Referencias** | [8] https://developer.chrome.com/docs/css-ui/style-queries [9] https://chromestatus.com/features/5673196702046208 |

### Propuesta 7: `:focus-visible` para Keyboard Navigation Accesible

| Campo | Detalle |
|-------|---------|
| **Título** | Implementar `:focus-visible` correctamente para keyboard users sin ensuciar la UI para mouse users |
| **Problema** | Los focus rings aparecen tanto en keyboard nav como en mouse click. O se ocultan globalmente (mala accesibilidad) o se muestran siempre (UI sucia). |
| **Descripción** | `:focus-visible` Implementation: (1) **Reset :focus**: `*:focus { outline: none; }` — removemos el focus ring por default. (2) **Keyboard-only focus ring**: `*:focus-visible { outline: 2px solid var(--color-primary); outline-offset: 2px; }` — el ring solo aparece cuando el browser determina que es keyboard navigation. (3) **Form inputs special case**: inputs siempre muestran focus ring (son interactivos via keyboard siempre). (4) **Buttons special case**: `<button>` muestra focus ring en keyboard, no en click. (5) **Skip link**: el `.skip-link` ya tiene focus styling — verificar que usa `:focus-visible`. (6) **Chatbot FAB**: el FAB del chatbot debe mostrar focus ring cuando se navega con teclado. (7) **Audit**: grep por `:focus` en todo el CSS y reemplazar con `:focus-visible` donde corresponda. Implementación: CSS reset :focus + :focus-visible en todos los interactivos + audit completo, 2-3 horas. |
| **Impacto esperado** | Accesibilidad WCAG 2.1 AA para keyboard users, UI limpia para mouse users, ningún compromiso |
| **Esfuerzo** | S (2-3 horas) |
| **Agente recomendado** | Frontend / QA |
| **Referencias** | [10] https://developer.mozilla.org/docs/Web/CSS/:focus-visible [11] https://developer.google.com/web/updates/2021/06/focus-visible |

---

## Orden de implementación recomendado

| # | Propuesta | Impacto | Esfuerzo | Prioridad |
|---|----------|---------|----------|-----------|
| 1 | Scroll-Driven Animations (reemplazar IntersectionObserver) | Performance / DX | S | Alta - quick win |
| 2 | `:focus-visible` | Accesibilidad / UX | S | Alta - WCAG compliance |
| 3 | Container Queries (zone cards + cotizador) | UX / Responsive | S | Alta - layout flexibility |
| 4 | `:has()` selector (pricing cards + FAQ) | DX / CSS Quality | S | Alta - cleaner CSS |
| 5 | CSS `@layer` Architecture | DX / Maintainability | M | Media - technical debt |
| 6 | Style Queries (theming dinámico) | UX / Theming | S | Media - enhancement |
| 7 | Google Business Profile API | SEO / Marketing | M | Media - diferenciación |

**Top 3 para implementar primero:** 1, 2, 3 (Scroll-Driven + focus-visible + Container Queries = performance + accesibilidad + responsive).

---

## Diferencia clave: R62 vs R61

R61 propuso Chrome Web Platform APIs experimentales (View Transitions, Speculation Rules, Document PiP, Compute Pressure, LoAF, WebGPU, Navigation API). **R62 propone CSS nativo moderno ya disponible** (Scroll-Driven Animations, Container Queries, `:has()`, `@layer`, Style Queries) **y GBP API** para automatización de presencia en Google.

**R61 = bleeding edge APIs de Chrome 126+. R62 = CSS que ya está en Firefox/Safari/Chrome** con soporte 93%+, más automatización de marketing.

R62 complementa R61: las propuestas de R61 (View Transitions, Prerender) son infrastructure-level. Las de R62 (Scroll-Driven, Container Queries, GBP API) son implementation-level y más accesibles para implementar en el equipo actual.

---

## Síntesis: Por qué R62 complementa R1-R61

R1-R61 ha construido un proyecto muy completo. R62 cierra gaps de **CSS nativo moderno** y **automatización de marketing**:

- R1-R10: Features básicos
- R11-R20: SEO y Schema.org
- R21-R30: UX y conversión
- R31-R35: Video, reputation, AI
- R36-R42: Technical modernization
- R43-R44: Business models y conversión
- R45: Core Web Vitals
- R46: Seguridad, privacidad, i18n
- R47: Photo quote, product store
- R48: CRM, warranty, staff profiles, Airbnb B2B
- R49: Voice search, eco hub, WhatsApp automation
- R50: Pricing page, English version, GBP posts
- R51: Build system, performance, accesibilidad
- R52: A/B testing, exit-intent, email nurturing
- R53: Notifications, semantic search, RUM, on-device AI
- R54: Before/after slider, video testimonials
- R55: Lazy loading, scroll animations, enhanced forms
- R56: PWA push notifications dormant
- R57: CSS architecture, PWA install, modular JS
- R58: Background sync, visual booking, cross-browser PWA
- R59: WebMCP, Chrome AI APIs, Popover, DSD
- R60: On-device AI chatbot, subscription + loyalty
- R61: Chrome Web Platform APIs (View Transitions, Prerender, PiP, Compute Pressure, LoAF, WebGPU)

**R62 cierra la brecha de CSS nativo moderno y automatización GBP:**
- R62 introduce Scroll-Driven Animations, Container Queries, `:has()`, Style Queries, `@layer` — todas las features CSS que no requieren JavaScript
- R62 introduce GBP API automation — marketing programático que genera presencia en Google Search
- Estas propuestas son implementables con esfuerzo S-M y no requieren reescribir el proyecto

---

## Fuentes

[1] Chrome Developers. "Scroll-driven animations." https://developer.chrome.com/docs/css-ui/scroll-driven-animations
[2] Chromium Blog. "Bringing scroll-driven animations to browsers." https://blog.chromium.org/2023/11/bringing-scroll-driven-animations-to-chrome.html
[3] Chrome Developers. "Container Queries." https://developer.chrome.com/docs/css-ui/css-container-queries
[4] Chrome Developers. "CSS :has()." https://developer.chrome.com/docs/css-ui/css-has
[5] Chrome Developers. "Organizing large CSS files." https://developer.chrome.com/docs/css-ui/organizing-large-css-files
[6] Google Developers. "Google Business Profile API Overview." https://developers.google.com/my-business/content/overview
[7] Google Developers. "GBP API Guides." https://developers.google.com/my-business/guides/overview
[8] Chrome Developers. "Style Queries." https://developer.chrome.com/docs/css-ui/style-queries
[9] Chrome Platform Status. "CSS Style Queries." https://chromestatus.com/features/5673196702046208
[10] MDN. ":focus-visible." https://developer.mozilla.org/docs/Web/CSS/:focus-visible
[11] Google Web Updates. "Implementing focus-visible." https://developer.google.com/web/updates/2021/06/focus-visible

---

*Documento generado por Innovation Scout — Round 62*
*Purity & Clean Analysis — 2026-04-27*
*Co-Authored-By: Paperclip <noreply@paperclip.ing>*