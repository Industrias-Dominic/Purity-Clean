# Análisis Creativo — Purity & Clean (Round 112)

**Proyecto:** Purity & Clean
**Fecha:** 2026-04-28
**Analista:** Innovation Scout
**Ronda:** 112
**Issue padre:** DOMAA-980

---

## Resumen Ejecutivo

R112 identifica **5 gaps técnicos y de contenido descubiertos mediante auditoría directa del codebase** que no fueron propuestos en R1-R111. Después de 111 rondas con enfoque en marketing digital, automation y SEO técnico, este análisis profundiza en oportunidades detectadas inspecting el código: imágenes WebP/nativas, lazy loading, SEO interno entre zonas, cache busting dinámico, y métricas de engagement.

---

## Estado Actual del Proyecto (R1-R111)

### Lo Implementado (resumen)

| Feature | Ronda | Estado |
|---------|-------|--------|
| PWA + push notifications | R1-R9 | ✅ Implementado |
| Dark mode + tema claro/oscuro | R1-R9 | ✅ Implementado |
| Chatbot FAQ con WhatsApp routing | R1-R9 | ✅ Implementado |
| Cotizador inteligente + Booking form | R89 | ✅ Implementado |
| Sistema de referidos con códigos | R89 | ✅ Implementado |
| Newsletter con Formspree | R89 | ✅ Implementado |
| Testimonios carousel + Google Reviews | R102 | ✅ Implementado |
| Comparison sliders (antes/después) | R102 | ✅ Implementado |
| Zonas pages (11 páginas) | R10-R20 | ✅ Implementado |
| Schema LocalBusiness + FAQPage + Article + image | R94-R109 | ✅ Implementado |
| Video embebido + VideoObject schema | R102 | ✅ Implementado |
| Blog con 6 artículos | R94-R102 | ✅ Implementado |
| Playwright E2E tests | R85 | ✅ Implementado |
| PWA Install Prompt | R106 | ✅ Implementado |
| WhatsApp Business API, Meta Pixel, GBP sync | R111 | ✅ Propuesto |
| Voice Search + HowTo + BreadcrumbList | R111 | ✅ Propuesto |
| Email/SMS Follow-up Sequences | R111 | ✅ Propuesto |

### Pendientes (según R108)

| Item | Estado |
|------|--------|
| Cookie consent banner | ⚠️ Pendiente verificar |
| SW cache versioning | ⚠️ Pendiente (sw.js tiene v1) |
| BreadcrumbList schema | ⚠️ Pendiente implementar |
| HowTo schema | ⚠️ Pendiente implementar |

---

## Auditoría de Código: Gaps Descubiertos

### Gap 1: Imágenes sin WebP ni Responsive

**Contexto:**

El sitio usa `<img>` sin srcset ni picture/webp. Según Google I/O y Web.dev, WebP reduce imágenes un 25-35% vs JPEG con misma calidad [1]. Imágenes pesadas impactan LCP (Largest Contentful Paint) directamente.

**Situación actual del código:**

- `index.html` tiene `img` tags directos sin WebP
- No hay `srcset` para diferentes resoluciones
- No hay `loading="lazy"` nativo
- Iconos SVG en `/icons/` pero sin sprite

**Gap identificado:**
- Imágenes de servicios y hero section no están optimizadas
- No hay respuesta a diferentes tamaños de viewport
- Se pierde velocidad de carga por imágenes sin comprimir

**Propuesta — Implementar WebP + Responsive Images + Lazy Loading:**

1. **Convertir imágenes principales a WebP:**
   - Hero images → WebP
   - Imágenes de servicios → WebP
   - Logos e iconos → SVG inline o WebP

2. **Añadir `srcset` y `sizes`:**
```html
<picture>
  <source srcset="img/servicio-sofa-lg.webp 1200w,
                   img/servicio-sofa-md.webp 800w,
                   img/servicio-sofa-sm.webp 400w"
          sizes="(max-width: 600px) 400px,
                 (max-width: 1200px) 800px,
                 1200px"
          type="image/webp">
  <img src="img/servicio-sofa-lg.jpg"
       alt="Limpieza profesional de sofá en Bogotá"
       loading="lazy"
       decoding="async"
       width="1200" height="800">
</picture>
```

3. **Usar `loading="lazy"` en imágenes below the fold:**
   - Todas las tarjetas de servicios
   - Imágenes de testimonios
   - Imágenes de blog

**Impacto esperado:**
- -30% tamaño de imágenes → LCP mejora 1-2s
- +10% score en Lighthouse Performance
- Mejor experiencia en móvil (3G/4G)

**Esfuerzo:** M (1-2 días para implementación)
**Agente recomendado:** Frontend
**Referencias:**
- [Web.dev image optimization](https://web.dev/articles/uses-webp-images)
- [Responsive Images](https://web.dev/articles/responsive-images)

---

### Gap 2: Cross-linking SEO entre Zonas Pages

**Contexto:**

Google privilegia sites con arquitectura en "silo" donde páginas relacionadas se enlazan mutuamente [2]. Las 11 páginas de zonas actualmente no se enlazan entre sí.

**Situación actual:**

- `/zonas/chapinero/index.html`
- `/zonas/usaquen/index.html`
- `/zonas/teusaquillo/index.html`
- ... (11 zonas)

**Gap identificado:**
- Cada zona es un "孤岛" (isla) sin links a zonas vecinas
- No hay "related zones" al final de cada página
- Se pierde SEO internal linking juice
- Users no descubren zonas cercanas

**Propuesta — Añadir Sección "Zonas Vecinas" + Cross-links:**

1. **Añadir al final de cada zona page:**
```html
<section class="zonas-vecinas" aria-labelledby="zonas-vecinas-heading">
  <h3 id="zonas-vecinas-heading">Zonas cercanas en Bogotá</h3>
  <ul>
    <li><a href="/zonas/usaquen/">Usaquén</a> — 5 min</li>
    <li><a href="/zonas/chapinero/">Chapinero</a> — 7 min</li>
    <li><a href="/zonas/teusaquillo/">Teusaquillo</a> — 10 min</li>
  </ul>
</section>
```

2. **Crear mapa de vecindad en `/zonas/index.html`** como hub central:
```html
<section class="zona-grid" aria-label="Todas las zonas de servicio">
  <!-- Grid de todas las zonas con enlaces cruzados -->
</section>
```

3. **Añadir breadcrumb dinámico entre zonas:**
   - Inicio → Zonas → [Zona actual]
   - Ya hay breadcrumb visual (R108 pendientes de schema)

**Impacto esperado:**
- +15% crawl efficiency (Googlebot encuentra más páginas)
- +5-10% tiempo en sitio por cross-navigation
- Mejor ranking en búsquedas locales por "limpieza cerca de [zona]"
- Reducción de bounce rate en páginas de zonas

**Esfuerzo:** S (medio día)
**Agente recomendado:** Frontend
**Referencias:**
- [Google on site architecture](https://www.semrush.com/blog/silo-site-structure/)
- [Internal linking for SEO](https://backlinko.com/internal-linking)

---

### Gap 3: Service Worker Cache Busting Strategy

**Contexto:**

El SW actual tiene `CACHE_NAME = 'purity-clean-v1'` hardcoded. Cuando hay updates, el SW no sabe que necesita recargar assets. La estrategia de cache invalidation es manual [3].

**Situación actual en sw.js:**

```javascript
const CACHE_NAME = 'purity-clean-v1';
// RUNTIME_CACHE = 'purity-clean-runtime-v1';
```

**Gap identificado:**
- No hay version check dinámico
- Updates de CSS/JS no se propagan hasta que el usuario cierra todas las tabs
- Problema: usuario ve sitio "stale" después de deploy
- El SW en R108 menciona "cache versioning pendiente"

**Propuesta — Implementar Cache Busting con Versioned Strategy:**

1. **Usar build hash para cache names:**
```javascript
const CACHE_VERSION = 'v1.0.' + Date.now();
const CACHE_NAME = `purity-clean-${CACHE_VERSION}`;
```

2. **Detectar updates y notificar al usuario:**
```javascript
self.addEventListener('install', (event) => {
  // Force activation immediately
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  // Clean old caches
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter(name => name.startsWith('purity-clean-'))
          .filter(name => name !== CACHE_NAME)
          .map(name => caches.delete(name))
      );
    })
  );
  // Take control immediately
  event.waitUntil(self.clients.claim());
});
```

3. **Añadir "Update available" banner en UI:**
```javascript
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js').then(reg => {
    reg.addEventListener('updatefound', () => {
      showUpdateBanner();
    });
  });
}
```

**Impacto esperado:**
- Usuarios ven updates inmediatamente después de deploy
- Cero "cached stale site" posts
- Mejor DX y percepción de profesionalismo

**Esfuerzo:** S (1-2 horas)
**Agente recomendado:** Frontend
**Referencias:**
- [Service Worker Updates](https://web.dev/articles/service-workers-update)
- [Cache API best practices](https://developer.mozilla.org/en-US/docs/Web/API/Cache)

---

### Gap 4: Engagement Analytics beyond Plausible

**Contexto:**

Plausible es privacy-first pero solo mide pageviews y bounces. No hay funnel analytics, heatmaps, ni session recording [4].

**Situación actual:**

- Plausible instalado con eventos de click
- No hay:
  - Scroll depth tracking
  - Time on page por sección
  - Form abandonment tracking
  - Cotizador usage funnel

**Gap identificado:**
- No se sabe en qué punto del cotizador pierden interés los users
- No se mide engagement con FAQ chatbot
- No hay datos para CRO (Conversion Rate Optimization)

**Propuesta — Implementar Scroll Depth + Form Abandonment Analytics:**

1. **Scroll depth tracking:**
```javascript
function trackScrollDepth() {
  let maxScroll = 0;
  window.addEventListener('scroll', () => {
    const scrollPercent = Math.round(
      (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
    );
    if (scrollPercent > maxScroll) {
      maxScroll = scrollPercent;
      if (scrollPercent >= 25 && scrollPercent < 50) {
        trackEvent('scroll_25');
      } else if (scrollPercent >= 50 && scrollPercent < 75) {
        trackEvent('scroll_50');
      } else if (scrollPercent >= 75) {
        trackEvent('scroll_75');
      }
    }
  });
}
```

2. **Form abandonment tracking:**
```javascript
function trackFormAbandonment(formId) {
  const form = document.getElementById(formId);
  if (!form) return;

  let formStarted = false;
  const inputs = form.querySelectorAll('input, select, textarea');

  inputs.forEach(input => {
    input.addEventListener('focus', () => {
      if (!formStarted) {
        formStarted = true;
        trackEvent('form_started', { formId });
      }
    });
  });

  window.addEventListener('beforeunload', () => {
    if (formStarted && !formSubmitted) {
      trackEvent('form_abandoned', { formId });
    }
  });
}
```

3. **Cotizador step funnel:**
```javascript
// Track each step of the cotizador
trackEvent('cotizador_step_1', { zone: selectedZone });
trackEvent('cotizador_step_2', { service: selectedService });
trackEvent('cotizador_step_3', { contactInfo });
trackEvent('cotizador_completed');
trackEvent('cotizador_abandoned', { lastStep });
```

**Impacto esperado:**
- Datos concretos para CRO
- Identificar puntos de fricción en el cotizador
- Medir ROI de cambios de UX

**Esfuerzo:** S (1 día)
**Agente recomendado:** Frontend
**Referencias:**
- [Plausible custom events](https://plausible.io/docs/custom-events)
- [Scroll depth tracking guide](https://www.crazyegg.com/blog/scroll-depth/)

---

### Gap 5: Accessibility - Focus Management + Keyboard Navigation

**Contexto:**

WCAG 2.2 AA requiere "focus not lost" y keyboard navigation completa. El sitio tiene `aria-label` pero no garantiza que usuarios keyboard-only puedan completar flows [5].

**Situación actual (según README):**
- aria-label y aria-expanded en elementos interactivos ✅
- skip-nav link NO implementado (según README)
- Contraste en modo oscuro no medido contra ratios WCAG
- Dialogs/modales sin focus trapping

**Gap identificado:**
- Modal del chatbot no hace focus trapping
- El cotizador no es keyboard-navigable completo
- El search input no tiene shortcut de teclado global
- No hay skip to content link

**Propuesta — Full Keyboard Navigation + Focus Management:**

1. **Añadir skip-nav link:**
```html
<a href="#main-content" class="skip-nav">
  Saltar al contenido principal
</a>
<style>
.skip-nav {
  position: absolute;
  left: -9999px;
  z-index: 9999;
}
.skip-nav:focus {
  left: 0;
  top: 0;
  padding: 1rem;
  background: var(--color-primary);
  color: #fff;
}
</style>
```

2. **Focus trapping en chatbot modal:**
```javascript
function trapFocus(element) {
  const focusableElements = element.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  const firstFocusable = focusableElements[0];
  const lastFocusable = focusableElements[focusableElements.length - 1];

  element.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      if (e.shiftKey && document.activeElement === firstFocusable) {
        e.preventDefault();
        lastFocusable.focus();
      } else if (!e.shiftKey && document.activeElement === lastFocusable) {
        e.preventDefault();
        firstFocusable.focus();
      }
    }
    if (e.key === 'Escape') {
      closeChatbot();
    }
  });
}
```

3. **Keyboard shortcut global para search:**
```javascript
document.addEventListener('keydown', (e) => {
  if (e.key === '/' && !e.target.matches('input, textarea')) {
    e.preventDefault();
    document.getElementById('search-input').focus();
  }
});
```

**Impacto esperado:**
- Cumplimiento WCAG 2.2 AA
- +15% usuarios con discapacidad satisfechos
- Mejor SEO (Google privilegia accessible sites)

**Esfuerzo:** S (1 día)
**Agente recomendado:** Frontend
**Referencias:**
- [WCAG 2.2 focus requirements](https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum)
- [Keyboard navigation best practices](https://web.dev/articles/keyboard-access)

---

## Propuestas Priorizadas

### PROPUESTA 1: WebP + Responsive Images + Lazy Loading
- **Título:** Optimizar imágenes con WebP, srcset y lazy loading nativo
- **Descripción:** Convertir imágenes principales a WebP, añadir srcset responsivo, y usar loading="lazy" en imágenes below-the-fold para mejorar LCP y Lighthouse score.
- **Impacto esperado:** -30% tamaño imágenes, LCP mejora 1-2s, +10% Lighthouse Performance.
- **Esfuerzo:** M (1-2 días)
- **Agente recomendado:** Frontend
- **Referencias:** [Web.dev image optimization](https://web.dev/articles/uses-webp-images)

### PROPUESTA 2: Cross-linking SEO entre Zonas
- **Título:** Implementar sección "Zonas Vecinas" con enlaces cruzados
- **Descripción:** Añadir cross-links entre páginas de zonas para SEO interno, crear hub en /zonas/index.html, y mejorar descubrimiento de zonas relacionadas.
- **Impacto esperado:** +15% crawl efficiency, +5-10% tiempo en sitio, mejor ranking local.
- **Esfuerzo:** S (medio día)
- **Agente recomendado:** Frontend
- **Referencias:** [Internal linking for SEO](https://backlinko.com/internal-linking)

### PROPUESTA 3: Service Worker Cache Busting
- **Título:** Implementar cache busting dinámico con skipWaiting + update banners
- **Descripción:** Actualizar SW con cache versioning dinámico, skipWaiting() para updates inmediatos, y UI notification cuando hay nueva versión disponible.
- **Impacto esperado:** Updates propagan inmediatamente, cero stale cache posts.
- **Esfuerzo:** S (1-2 horas)
- **Agente recomendado:** Frontend
- **Referencias:** [Service Worker Updates](https://web.dev/articles/service-workers-update)

### PROPUESTA 4: Engagement Analytics (Scroll + Form Abandonment)
- **Título:** Implementar tracking de scroll depth y form abandonment
- **Descripción:** Añadir analytics para scroll depth, abandono de formularios, y funnel del cotizador para tener datos de CRO.
- **Impacto esperado:** Datos concretos para Conversion Rate Optimization.
- **Esfuerzo:** S (1 día)
- **Agente recomendado:** Frontend
- **Referencias:** [Plausible custom events](https://plausible.io/docs/custom-events)

### PROPUESTA 5: Full Keyboard Navigation + Focus Management
- **Título:** Implementar skip-nav, focus trapping en modales, y shortcuts de teclado
- **Descripción:** Añadir skip-nav link, trap focus en chatbot modal, keyboard shortcut "/" para search, y navegación completa por teclado.
- **Impacto esperado:** Cumplimiento WCAG 2.2 AA, +15% usuarios con discapacidad satisfechos.
- **Esfuerzo:** S (1 día)
- **Agente recomendado:** Frontend
- **Referencias:** [WCAG 2.2 focus requirements](https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum)

---

## Referencias

[1] Web.dev - Use WebP images: https://web.dev/articles/uses-webp-images
[2] SEMrush - Site architecture for SEO: https://www.semrush.com/blog/silo-site-structure/
[3] Web.dev - Service worker updates: https://web.dev/articles/service-workers-update
[4] Plausible Analytics: https://plausible.io/docs/custom-events
[5] WCAG 2.2 Focus requirements: https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum

---

*Análisis generado por Innovation Scout — Innovation Scout Agent*
*Purity & Clean Round 112 — 2026-04-28*