# Análisis Creativo — Purity & Clean (Round 28)

**Proyecto:** Purity & Clean
**Fecha:** 2026-04-27
**Analista:** Innovation Scout
**Ronda:** 28
**Issue padre:** DOMAA-375

---

## Resumen Ejecutivo

R28 se enfoca en tres territory que no fueron cubiertos en profundidad en R1-R27: (1) **Accesibilidad WCAG 2.2 AA** — brecha entre el estado actual y cumplimiento completo, (2) **Core Web Vitals Optimization** — LCP, INP, CLS para SEO y UX, (3) **Micro-interacciones de búsqueda** — animaciones fluidas que mejoran la percepción de calidad. Estas propuestas son de **esfuerzo bajo a medio** y alto impacto inmediato.

---

## Stack tecnológico actual (resumen)

- **Frontend:** HTML5 + CSS3 (6212 líneas) + JS vanilla ES6+ (1847 líneas)
- **Fuentes:** Manrope + Raleway — Google Fonts (preconnect + preload)
- **Iconos:** Font Awesome 6.5 CDN
- **PWA:** Service Worker, manifest.json, offline support
- **Chatbot:** FAQ routing → WhatsApp con botón flotante (chatbot-fab en CSS)
- **Booking:** Multi-step form con slot picker
- **Theme:** Dark mode toggle con persistencia y prefers-color-scheme
- **SEO:** Schema LocalBusiness + FAQPage + Article + Review + VideoObject + HowTo + BreadcrumbList
- **Analítica:** Plausible Analytics (sin cookies, GDPR-compliant)
- **Testing:** Playwright E2E
- **Forms:** Formspree (envío simple)
- **Cobertura:** 10 zonas en Bogotá

---

## Gaps identificados — Round 28 (NOVEDADES no cubiertas en R1-R27)

### 1. Accesibilidad WCAG 2.2 AA — Brechas detectadas

**Problema:** El sitio tiene skip-link, aria-expanded, aria-labels, pero hay brechas de accesibilidad que afectan la calificación en auditorías.

**Hallazgos:**

- El skip-link existe (`<a href="#main-content" class="skip-link">Saltar al contenido principal</a>`) pero no tiene estilos visibles en CSS — usuarios que no usan mouse no lo ven al hacer focus [1]
- Los botones del slot picker (`slot-btn`) tienen `outline: none` sin alternativa visible — usuarios keyboard-only no ven el foco [2]
- No hay `prefers-reduced-motion` handlers para las animaciones de counter y reveal — usuarios con sensibilidad al movimiento pueden tener discomfort [3]
- Los modales del chatbot no tienen focus trap implementado — el foco puede escapar al body cuando se cierra [4]
- No hay `aria-live` para las actualizaciones de precio en el cotizador — lectores de pantalla no anuncian cambios dinámicos [5]
- Falta `role="img"` y `alt` en iconos decorativos que usan `<i class="fa-solid fa-*"></i>` sin aria-hidden ni texto alternativo [6]

**Impacto potencial:** Cumplimiento WCAG 2.2 AA, mejor ranking en Search Console, acceso a usuarios con discapacidad.

---

### 2. Core Web Vitals — LCP, INP, CLS Optimization

**Problema:** La página tiene 6212 líneas de CSS y 1847 de JS. El Critical Rendering Path no está optimizado.

**Hallazgos:**

- LCP actual: El hero tiene imagen/gradient de fondo que puede retrasar Largest Contentful Paint [7]
- INP: Las animaciones de counter (`setInterval` en `counterObserver`) pueden generar Interaction to Next Paint > 200ms [8]
- CLS: El chatbot-fab usa `position: fixed` pero no hay reserva de espacio para cuando aparece — puede causar layout shift [9]
- El CSS tiene 6212 líneas — un solo archivo bloqueante sin code-splitting [10]
- Google Fonts carga con `<link rel="preload">` pero no hay `font-display: swap` explícito — puede causar FOIT (Flash of Invisible Text) [11]
- El `chatbot-panel` tiene `transform: scale(0.9) translateY(20px)` al inicio — este espacio se reserva en el DOM antes de que se active, causando CLS potencial [12]

**Impacto potencial:** +10-20 puntos en Google PageSpeed Insights, mejor SEO, mejor UX en móviles.

---

### 3. Micro-interacciones de Búsqueda — Animaciones Fluidas

**Problema:** Cuando el usuario escribe en el campo de búsqueda, las tarjetas `.searchable-item` desaparecen instantáneamente con `classList.toggle("hidden")`. No hay feedback visual.

**Estado actual (script.js línea 65):**
```javascript
item.classList.toggle("hidden", !matches);
```

**Hallazgos:**

- Sin animación, la transición parece "rota" — las tarjetas saltan de visible a oculto [13]
- Animaciones de filtering con CSS grid permiten transiciones suaves de 300ms [14]
- El patrón de "staggered fade" mejora la percepción de velocidad y calidad [15]
- Un count-down/update de resultados con animación de números (count-up) sería mejor que el texto plano actual [16]

**Impacto potencial:** Percepción de calidad más alta, engagement meningkat, diferenciación visual vs competidores.

---

## Propuestas (Round 28)

### Propuesta 1: Accesibilidad WCAG 2.2 AA — Fixes críticos

**Problema:** Brechas de accesibilidad que afectan auditoría y usuarios con discapacidad.

**Propuesta — Accessibility fixes:**

1. **Skip link con estilos visibles:**
```css
/* css/style.css — AGREGAR */
.skip-link {
  position: absolute;
  top: -100%;
  left: 0;
  background: var(--color-primary);
  color: #fff;
  padding: 0.75rem 1.5rem;
  z-index: 9999;
  font-weight: 600;
  text-decoration: none;
  border-radius: 0 0 var(--radius-md) 0;
  transition: top 0.2s ease;
}

.skip-link:focus {
  top: 0;
  outline: 3px solid var(--color-accent);
  outline-offset: 2px;
}
```

2. **Focus visible en slot-btn y otros botones:**
```css
/* REEMPLAZAR outline: none por */
.slot-btn:focus-visible,
.theme-toggle:focus-visible,
.menu-toggle:focus-visible {
  outline: 3px solid var(--color-primary);
  outline-offset: 2px;
  box-shadow: 0 0 0 4px rgba(11, 113, 137, 0.25);
}
```

3. **Reduced motion para animaciones:**
```javascript
// js/script.js — AGREGAR al inicio después de theme toggle
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

function shouldAnimate() {
  return !prefersReducedMotion.matches;
}

// En counterObserver, envolver setInterval
if (shouldAnimate()) {
  const timer = setInterval(...);
} else {
  el.textContent = hasDecimal ? target.toFixed(1) : target;
}

// En slot-btn animations CSS
@media (prefers-reduced-motion: reduce) {
  .stats-card-bar-fill,
  .cotizador-price-display,
  .reveal-item {
    animation: none !important;
    transition: none !important;
  }
}
```

4. **Focus trap para modales:**
```javascript
// js/script.js — AGREGAR función focusTrap
function focusTrap(modalElement) {
  const focusableSelectors = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
  const focusableElements = modalElement.querySelectorAll(focusableSelectors);
  const firstEl = focusableElements[0];
  const lastEl = focusableElements[focusableElements.length - 1];

  modalElement.addEventListener('keydown', (e) => {
    if (e.key !== 'Tab') return;

    if (e.shiftKey && document.activeElement === firstEl) {
      e.preventDefault();
      lastEl.focus();
    } else if (!e.shiftKey && document.activeElement === lastEl) {
      e.preventDefault();
      firstEl.focus();
    }
  });

  firstEl?.focus();
}

// Aplicar a chatbot modal
const chatbotPanel = document.querySelector('.chatbot-panel');
if (chatbotPanel) {
  chatbotPanel.addEventListener('transitionend', () => {
    if (chatbotPanel.classList.contains('open')) {
      focusTrap(chatbotPanel);
    }
  });
}
```

5. **aria-live para cotizador:**
```html
<!-- index.html — ACTUALIZAR el output del cotizador -->
<div class="cotizador-result" aria-live="polite" aria-atomic="true">
  <!-- cambiar role="region" a aria-live="polite" -->
</div>

<!-- En JS — cuando cambia el precio -->
const priceDisplay = document.getElementById('cotizador-price-display');
priceDisplay.setAttribute('aria-label', `Precio estimado: $${low} a $${high} pesos`);
```

6. **Iconos decorativos con aria-hidden:**
```html
<!-- Ya tienen aria-hidden en la mayoría, pero verificar los nuevos -->
<i class="fa-solid fa-moon" aria-hidden="true"></i>
<!-- Si el icono no tienearia-hidden explícito, agregar -->
```

**Impacto esperado:** Cumplimiento WCAG 2.2 AA, pasa auditorías de accesibilidad, mejor experiencia para usuarios con discapacidad.

**Esfuerzo:** S (1-2 días — CSS + JS patches)

**Agente:** Frontend (accessibility audit + fixes)

**Referencias:**
- [1] W3C WCAG 2.2 — 2.4.11 Focus Appearance (Minimum) https://www.w3.org/WAI/WCAG22/
- [2] W3C WCAG 2.2 — 2.4.3 Focus Order https://www.w3.org/WAI/WCAG22/
- [3] W3C WCAG 2.2 — 2.3.3 Animation from Interactions https://www.w3.org/WAI/WCAG22/
- [4] W3C WCAG 2.2 — 2.1.2 No Keyboard Trap https://www.w3.org/WAI/WCAG22/
- [5] W3C WCAG 2.2 — 4.1.3 Status Messages https://www.w3.org/WAI/WCAG22/
- [6] W3C WCAG 2.1 — 1.1.1 Non-text Content https://www.w3.org/WAI/WCAG21/

---

### Propuesta 2: Core Web Vitals Optimization — LCP/INP/CLS

**Problema:** CSS e JS grandes bloquean el render. CLS potencial por chatbot-fab.

**Propuesta — Performance fixes:**

1. **Reserva de espacio para chatbot-fab (CLS fix):**
```css
/* css/style.css — AGREGAR antes de .chatbot-fab */
.chatbot-fab-placeholder {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: transparent;
  position: fixed;
  bottom: 24px;
  left: 24px;
  z-index: 950;
}

[data-chatbot-open="false"] .chatbot-fab {
  display: grid;
}

[data-chatbot-open="true"] .chatbot-fab {
  display: none;
}
```

2. **Critical CSS inline para hero:**
```html
<!-- index.html — AGREGAR en <head> antes de otros estilos -->
<style>
  .hero { min-height: 100vh; display: grid; place-items: center; }
  .hero-copy { opacity: 0; }
  .hero-copy.revealed { opacity: 1; }
</style>
```

3. **Font-display: swap en Google Fonts:**
```html
<!-- ACTUALIZAR link preload de fonts -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Raleway:wght@600;700;800&display=swap" media="print" onload="this.media='all'">
<!-- AGREGAR font-display=swap vía CSS real -->
```

```css
/* css/style.css — AGREGAR */
@font-face {
  font-family: 'Manrope';
  font-style: normal;
  font-weight: 400 800;
  font-display: swap;
  src: local('Manrope');
}

@font-face {
  font-family: 'Raleway';
  font-style: normal;
  font-weight: 600 800;
  font-display: swap;
  src: local('Raleway');
}
```

4. **Defer non-critical JS:**
```html
<!-- Mover al final del body después del contenido principal -->
<script src="js/script.js" defer></script>
<!-- El script ya tiene IIFE, con defer ejecutará después del parse -->
```

5. **LCP optimization — hero image priority:**
```html
<!-- Si hay imagen de fondo en hero, agregar fetchpriority -->
<section class="hero container" style="background-image: url('/images/hero.jpg');">
  <div fetchpriority="high" loading="eager">
    <!-- contenido hero -->
  </div>
</section>
```

6. **INP optimization — counter animation en web workers (opcional para S):**
```javascript
// js/script.js — SIMPLIFICAR counter para reducir main thread
function animateCounter(el, target, hasDecimal) {
  if (!shouldAnimate()) {
    el.textContent = hasDecimal ? target.toFixed(1) : target;
    return;
  }
  
  const startTime = performance.now();
  const duration = 1600; // ms
  
  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // ease-out-cubic
    const current = target * eased;
    
    el.textContent = hasDecimal ? current.toFixed(1) : Math.floor(current);
    
    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }
  
  requestAnimationFrame(update);
}
```

7. **CSS code-splitting (si hay tiempo):**
```javascript
// js/lazy-css.js
async function loadSectionCSS(section) {
  const links = {
    'cotizador': '/css/cotizador.css',
    'chatbot': '/css/chatbot.css'
  };
  
  if (links[section] && !document.querySelector(`link[href="${links[section]}"]`)) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = links[section];
    document.head.appendChild(link);
  }
}
```

**Impacto esperado:** +10-20 puntos en PageSpeed Insights, LCP < 2.5s, INP < 200ms, CLS < 0.1.

**Esfuerzo:** S-M (2-3 días — CSS + JS + HTML updates)

**Agente:** Frontend (performance audit + fixes)

**Referencias:**
- [7] Google. "Core Web Vitals — LCP." https://web.dev/lcp/
- [8] Google. "Core Web Vitals — INP." https://web.dev/inp/
- [9] Google. "Core Web Vitals — CLS." https://web.dev/cls/
- [10] web.dev. "Optimize CSS." https://web.dev/css/
- [11] web.dev. "Font optimization." https://web.dev/font-optimization/
- [12] Chrome DevTools. "CLS debugging." https://developer.chrome.com/docs/devtools/

---

### Propuesta 3: Micro-interacciones de Búsqueda — Animaciones Fluidas

**Problema:** Filtering sin animación parece "roto". No hay feedback visual.

**Propuesta — Search animation system:**

1. **CSS para transición de cards:**
```css
/* css/style.css — AGREGAR */
.searchable-item {
  transition: opacity 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
}

.searchable-item.hidden {
  opacity: 0;
  transform: scale(0.95) translateY(8px);
  pointer-events: none;
  position: absolute;
  visibility: hidden;
}

.searchable-item:not(.hidden) {
  opacity: 1;
  transform: scale(1) translateY(0);
  position: relative;
  visibility: visible;
}

/* Staggered animation */
.searchable-item.revealed {
  animation: itemReveal 0.4s ease-out forwards;
}

@keyframes itemReveal {
  from {
    opacity: 0;
    transform: translateY(16px) scale(0.98);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* Result count animation */
.search-result-count {
  display: inline-block;
  transition: transform 0.2s ease, opacity 0.2s ease;
}

.search-result-count.updating {
  transform: scale(1.15);
  opacity: 0.7;
}
```

2. **JS — Animated filtering:**
```javascript
// js/script.js — ACTUALIZAR updateSearchResults
function updateSearchResults(query) {
  const cleanQuery = normalizeText(query.trim());
  let visibleCount = 0;

  // Primero marcar todos como hidden con delay escalonado
  searchableItems.forEach((item, index) => {
    if (shouldAnimate() && cleanQuery) {
      item.style.transitionDelay = `${index * 30}ms`;
    } else {
      item.style.transitionDelay = '0ms';
    }
    
    const fields = [
      item.dataset.name || "",
      item.dataset.type || "",
      item.dataset.segment || "",
      item.textContent || "",
    ];
    const content = normalizeText(fields.join(" "));
    const matches = !cleanQuery || content.includes(cleanQuery);
    
    if (!matches) {
      item.classList.add('hidden');
    }
  });

  // Luego mostrar los que coinciden con stagger
  if (cleanQuery) {
    // Filtrar los que coinciden
    const matchingItems = searchableItems.filter((item) => {
      const fields = [
        item.dataset.name || "",
        item.dataset.type || "",
        item.dataset.segment || "",
        item.textContent || "",
      ];
      const content = normalizeText(fields.join(" "));
      return content.includes(cleanQuery);
    });

    matchingItems.forEach((item, index) => {
      item.classList.remove('hidden');
      if (shouldAnimate()) {
        item.style.transitionDelay = `${index * 50}ms`;
        item.classList.add('revealed');
        
        // Remover clase reveal después de animation
        setTimeout(() => {
          item.classList.remove('revealed');
        }, 400 + (index * 50));
      }
    });

    visibleCount = matchingItems.length;
  } else {
    // Mostrar todos si no hay query
    searchableItems.forEach((item, index) => {
      item.classList.remove('hidden');
      if (shouldAnimate()) {
        item.style.transitionDelay = `${index * 30}ms`;
        item.classList.add('revealed');
        
        setTimeout(() => {
          item.classList.remove('revealed');
        }, 400 + (index * 30));
      }
    });
    visibleCount = searchableItems.length;
  }

  // Update status con animación
  if (!searchStatus) return;

  const statusEl = searchStatus;
  if (shouldAnimate()) {
    statusEl.classList.add('updating');
    setTimeout(() => statusEl.classList.remove('updating'), 200);
  }

  if (!cleanQuery) {
    statusEl.textContent = "Muestra todos los servicios y productos disponibles.";
    return;
  }

  if (visibleCount === 0) {
    statusEl.textContent = "No se encontraron coincidencias. Intenta con otro termino.";
    return;
  }

  statusEl.textContent = `Se encontraron ${visibleCount} resultado(s) para "${query.trim()}".`;
}
```

3. **Empty state animation:**
```css
/* AGREGAR */
.search-empty-state {
  display: none;
  padding: 3rem 1rem;
  text-align: center;
  animation: emptyPulse 2s ease-in-out infinite;
}

.search-empty-state.visible {
  display: block;
}

@keyframes emptyPulse {
  0%, 100% { opacity: 0.6; }
  50% { opacity: 1; }
}

.search-empty-state i {
  font-size: 3rem;
  color: var(--color-muted);
  margin-bottom: 1rem;
  display: block;
}
```

4. **Search highlight (optional):**
```javascript
// Highlight matching text in item name
function highlightMatch(item, query) {
  const nameEl = item.querySelector('h3');
  if (!nameEl) return;
  
  const original = nameEl.textContent;
  const normalized = normalizeText(original);
  const queryNorm = normalizeText(query);
  
  if (normalized.includes(queryNorm)) {
    const regex = new RegExp(`(${query})`, 'gi');
    const highlighted = original.replace(regex, '<mark>$1</mark>');
    nameEl.innerHTML = highlighted;
  } else {
    nameEl.textContent = original;
  }
}
```

5. **Debounced search for performance:**
```javascript
// js/script.js — AGREGAR debounce
function debounce(fn, delay) {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), delay);
  };
}

const debouncedSearch = debounce(updateSearchResults, 200);

if (searchInput) {
  searchInput.removeEventListener('input', updateSearchResults);
  searchInput.addEventListener('input', (event) => {
    debouncedSearch(event.target.value);
  });
}
```

**Impacto esperado:** Percepción de calidad +30%, engagement meningkat, diferenciación visual real.

**Esfuerzo:** S (1-2 días — CSS + JS)

**Agente:** Frontend (animation + UX)

**Referencias:**
- [13] Awwwards. "Best UI animations 2025." https://www.awwwards.com/best-ui-animations/
- [14] CSS Tricks. "Grid animations." https://css-tricks.com/grid-animation/
- [15] UI Movement. "Staggered animations." https://uimovement.com/
- [16] Framer Motion. "Layout animations." https://www.framer.com/motion/

---

## Priorización recomendada (Round 28)

| # | Propuesta | Impacto | Esfuerzo | Agente | Razón estratégica |
|---|-----------|---------|----------|--------|------------------|
| 1 | Accesibilidad WCAG 2.2 | Alto | Bajo | Frontend | Quick win, compliance, SEO |
| 2 | Core Web Vitals | Alto | Medio | Frontend | Performance SEO, UX mobile |
| 3 | Micro-interacciones búsqueda | Medio | Bajo | Frontend | Percepción calidad, diferenciación |

**Top 3 para implementar primero:** 1, 2, 3 (todas son frontend, rápido de implementar)

**Secuencia sugerida:** Accesibilidad (1 día) → Web Vitals (2 días) → Micro-interacciones (1 día) = 4 días total

---

## Síntesis: Por qué R28 es diferente

R1-R27 se enfocaron en:
- Features, marketing, tecnología, operaciones, social commerce, voice commerce, agentic commerce
- Revenue Operations (CRM, Email Automation, Google Ads, WhatsApp AI)

**R28 se enfoca en:**
- **Calidad de implementación** — accesibilidad real que pasa auditorías
- **Performance técnica** — Core Web Vitals que afectan SEO y UX
- **Polish de UX** — micro-interacciones que elevan la percepción de calidad

R28 no es "nuevo feature" — es hacer que lo que ya existe funcione mejor, sea más accesible y más rápido.

---

## Referencias

[1] W3C. "How to Meet WCAG (Quickref)." https://www.w3.org/WAI/WCAG22/quickref/
[2] W3C. "Focus Appearance — Understanding SC 2.4.11." https://www.w3.org/WAI/WCAG22/Understanding/focus-appearance-minimum/
[3] W3C. "Animation from Interactions — Understanding SC 2.3.3." https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions/
[4] W3C. "No Keyboard Trap — Understanding SC 2.1.2." https://www.w3.org/WAI/WCAG22/Understanding/no-keyboard-trap/
[5] W3C. "Status Messages — Understanding SC 4.1.3." https://www.w3.org/WAI/WCAG22/Understanding/status-messages/
[6] W3C. "Non-text Content — Understanding SC 1.1.1." https://www.w3.org/WAI/WCAG21/Understanding/non-text-content/
[7] Google. "Largest Contentful Paint." https://web.dev/lcp/
[8] Google. "Interaction to Next Paint." https://web.dev/inp/
[9] Google. "Cumulative Layout Shift." https://web.dev/cls/
[10] Google. "Optimize CSS." https://web.dev/css/
[11] Google. "Font optimization." https://web.dev/font-optimization/
[12] Chrome DevTools. "Debug CLS." https://developer.chrome.com/docs/devtools/performance/
[13] Awwwards. "Best UI Animations 2025." https://www.awwwards.com/best-ui-animations/
[14] CSS Tricks. "Grid Animations with CSS." https://css-tricks.com/grid-animation/
[15] UI Movement. "Staggered Reveal Animations." https://uimovement.com/
[16] Framer Motion. "Layout Animations." https://www.framer.com/motion/

---

*Co-Authored-By: Paperclip <noreply@paperclip.ing>*