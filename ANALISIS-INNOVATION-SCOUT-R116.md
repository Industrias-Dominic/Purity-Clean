# Análisis Creativo — Purity & Clean (Round 116)

**Proyecto:** Purity & Clean
**Fecha:** 2026-04-28
**Analista:** Innovation Scout
**Ronda:** 116
**Issue padre:** DOMAA-995

---

## Resumen Ejecutivo

R116 se enfoca en brechas que NO fueron cubiertas por R107-R115: consentimiento de cookies, motion design sistemático, imágenes responsive con srcset, automatización de Google Business Profile, y micro-mejoras de UX en el chatbot y carousel de reviews. Todas las propuestas son accionables con esfuerzo bajo a medio. Se priorizan las que tienen impacto inmediato en SEO y accesibilidad.

---

## Hallazgos Pre-R116 (Brechas NO cubiertas por rondas anteriores)

| Feature | Estado | Ronda que lo propuso |
|---------|--------|----------------------|
| Cookie consent banner | ❌ NO implementado (R108 solo lo identificó) | R108 |
| Motion design system / CSS animations | ❌ NO hay spec ni implementación | R102, R111 |
| srcset con responsive images | ❌ NO implementado (solo loading="lazy" propuesto en R115) | Nueva |
| Google Business Profile Posts automation | ❌ NO implementado | R110 |
| Chatbot quick-reply buttons | ❌ NO implementado | Nueva |
| Reviews carousel prefers-reduced-motion | ❌ NO hay soporte | Nueva |
| Image responsive con `<picture>` + WebP | ⚠️ Parcial - algunas imágenes convertidas, sin srcset | R112 |
| Page-specific meta tags en zonas | ⚠️ Plantilla genérica, no page-specific para SEO local | Nueva |
| Plausible Analytics configuration completa | ⚠️ Eventos manuales, sin scroll depth configurado globalmente | R107 |
| Sitemap.xml: URLs con fragmentos | ❌ R115 lo propuso pero sigue sin corregir | R115 |

---

## Análisis Detallado

### 1. Cookie Consent Banner: GDPR Colombia + cookies own

**Problema:** El sitio usa cookies de tercera persona (Plausible Analytics) y cookies propias (localStorage para theme y search). No existe banner de consentimiento. Esto es un gap legal en Colombia donde la Ley 1581 de 2012 (Habeas Data) y las directrices de la SIC aplican para datos personales. Google puede penalizar sitios sin cookie consent en búsquedas futuras relacionadas con privacidad.

**Situación actual:**
- `localStorage.getItem('theme')` — cookie propia, necesaria para funcionamiento
- `localStorage.getItem('lang')` — cookie propia
- Plausible Analytics — usa cookies? Plausible dice que no usa cookies por defecto [1], pero el script carga antes de cualquier consentimiento
- Event tracking manual en script.js

**Propuesta:** Implementar un cookie consent banner minimalista que:
1. No bloquee contenido
2. Solo muestre opciones de "Aceptar cookies de análisis" y "Solo funcionales"
3. Guarde preferencia en localStorage
4. Solo cargue Plausible después de aceptación

### 2. Motion Design System: prefers-reduced-motion

**Problema:** Las animaciones CSS existentes (counter animation, FAB bounce, reveal on scroll) no respetan `prefers-reduced-motion`. Accesibilidad WCAG 2.1 nivel AA requiere que usuarios que preferan movimiento reducido puedan desactivar animaciones.

**Situación actual:**
- Animaciones CSS en style.css (FAB bounce, counter animation, stats card bar fill)
- No hay `@media (prefers-reduced-motion: reduce)` global
- IntersectionObserver para reveal animations sin check de prefers-reduced-motion

**Propuesta:**
```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

Y actualizar IntersectionObserver para no añadir clases de animación si `prefers-reduced-motion` está activo.

### 3. Imágenes Responsive con srcset y `<picture>`

**Problema:** Las imágenes del sitio no usan `srcset` para servir imágenes de diferentes tamaños según viewport. Esto causa:
- Carga innecesaria de imágenes grandes en móviles
- LCP elevado
- Waste de bandwidth

**Situación actual:**
```html
<!-- Actual — sin srcset -->
<img src="images/sofá.jpg" alt="...">
```

**Propuesta:**
```html
<picture>
  <source media="(max-width: 480px)" srcset="images/sofa-480.webp" type="image/webp">
  <source media="(max-width: 768px)" srcset="images/sofa-768.webp" type="image/webp">
  <source srcset="images/sofa-1200.webp" type="image/webp">
  <img src="images/sofa.jpg" alt="..." loading="lazy" width="400" height="300" decoding="async">
</picture>
```

Esto aplica a todas las tarjetas de servicios, productos, zonas y blog.

### 4. Google Business Profile Posts Automation

**Problema:** Los competidores en Bogotá con Google Business Profile activo publican actualizaciones semanales (ofertas, servicios, tips). Purity & Clean no tiene posts automáticos. Los posts de GBP aparecen en búsquedas locales y dan credibilidad.

**Estado actual:** R110 propuso "GBP Posts Automation" pero no se implementó.

**Propuesta:** Implementar un sistema de GBP posts automáticos:
1. Publicar weekly tips del blog como Google Posts
2. Publicar ofertas estacionales cuando hay holidays
3. Usar la API de GBP (Google My Business API) o un servicio como BrightLocal/Respond Analytics

**Referencias:** [Google Business Profile Posts](https://developers.google.com/my-business/samples/manage-local-business-post)

### 5. Chatbot Quick-Reply Buttons para FAQs

**Problema:** El chatbot FAQ en config.js tiene preguntas con respuestas largas de texto. Los usuarios mobile tienen que scrollhear mucho para leer. Quick-reply buttons permiten respuestas de una línea que el usuario toca y recibe la respuesta.

**Situación actual:**
```javascript
// config.js
{
  id: "precio-sofas",
  question: "¿Cuánto cuesta la limpieza de un sofá?",
  answer: "El servicio de limpieza profunda de sofás tiene un rango de precio entre $80.000 y $180.000 por unidad..."
}
```

**Propuesta — Quick reply UI en chatbot:**
```javascript
// En chatbot panel HTML
<div class="chatbot-quick-replies">
  <button class="quick-reply-btn" data-question="precio-sofas">💰 Precios</button>
  <button class="quick-reply-btn" data-question="sanitizacion-colchones">🛏️ Colchones</button>
  <button class="quick-reply-btn" data-question="agendar-servicio">📅 Agendar</button>
  <button class="quick-reply-btn" data-question="zonas-cobertura">📍 Zonas</button>
</div>

// En CSS/JS
.quick-reply-btn {
  background: var(--color-surface);
  border: 1.5px solid var(--color-border);
  border-radius: 20px;
  padding: 0.5rem 1rem;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.quick-reply-btn:hover {
  background: var(--color-primary);
  color: #fff;
}
```

### 6. Reviews Carousel: prefers-reduced-motion accessibility fix

**Problema:** El carousel de Google Reviews (reviews-data.js + style.css) auto-rotatea las cards con animación CSS. No hay soporte para `prefers-reduced-motion`.

**Situación actual:**
```javascript
// reviews-data.js — reveal animation con IntersectionObserver
// Pero la rotación del carousel no tiene reduced-motion check
```

**Propuesta:**
1. En CSS, deshabilitar auto-rotate cuando `prefers-reduced-motion: reduce`:
```css
@media (prefers-reduced-motion: reduce) {
  .reviews-carousel {
    animation: none;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
  }
}
```
2. Añadir control de usuario visible para pausar/play del carousel
3. El carousel debe ser navegable por teclado (WCAG 2.1)

### 7. Page-Specific Meta Tags para Zonas

**Problema:** Las 10 páginas de zonas usan una plantilla genérica. Los meta tags de cada zona podrían optimizarse para SEO local con contenido específico de cada barrio.

**Situación actual en zonas/teusaquillo/index.html:**
- Title genérico: "Limpieza profesional en Teusaquillo | Purity & Clean"
- Description genérica
- No hay schema LocalBusiness específico por zona

**Propuesta — Schema LocalBusiness por zona:**
Cada página de zona debería tener su propio `LocalBusiness` schema con:
- `areaServed` específico con el nombre del barrio
- `address` con la zona específica
- `geo` con coordenadas aproximadas del barrio

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Purity & Clean - Limpieza en Teusaquillo",
  "description": "Servicios de limpieza profesional en Teusaquillo, Bogotá. Limpieza de sofás, colchones, alfombras y más.",
  "areaServed": {
    "@type": "Neighborhood",
    "name": "Teusaquillo, Bogotá"
  },
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Teusaquillo",
    "addressRegion": "Bogotá"
  }
}
</script>
```

---

## Propuestas R116

### PROPUESTA 1: Cookie Consent Banner GDPR-Compliant para Colombia

**Título:** Implementar cookie consent banner sin bloquear contenido y con granularidad de consentimiento

**Descripción del problema:**
El sitio usa cookies propias (theme, search en localStorage) y potencialmente cookies de terceros (Plausible Analytics). No hay banner de consentimiento. Colombia tiene la Ley 1581 de 2012 (Habeas Data) para protección de datos personales. Aunque Plausible dice no usar cookies, el script carga antes de cualquier consentimiento y los eventos de tracking se envían automáticamente.

**Propuesta — Implementar banner minimalista:**
```html
<!-- En index.html, antes del cierre de </body> -->
<div id="cookie-banner" class="cookie-banner" role="dialog" aria-label="Consentimiento de cookies">
  <div class="cookie-content">
    <p>Usamos cookies para mejorar tu experiencia. Al continuar navegando, aceptas nuestra <a href="/politica-privacidad.html">política de privacidad</a>.</p>
    <div class="cookie-actions">
      <button id="cookie-accept-all" class="cookie-btn cookie-btn-primary">Aceptar todo</button>
      <button id="cookie-accept-necessary" class="cookie-btn cookie-btn-secondary">Solo funcionales</button>
    </div>
  </div>
</div>
```

```css
.cookie-banner {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: var(--color-surface);
  border-top: 1.5px solid var(--color-border);
  padding: 1rem;
  z-index: 900;
  box-shadow: 0 -4px 20px rgba(0,0,0,0.1);
}
```

```javascript
// Solo cargar Plausible si el usuario acepta
function loadAnalytics() {
  const consent = localStorage.getItem('cookie-consent');
  if (consent === 'analytics' || consent === 'all') {
    // cargar script de Plausible
  }
}
```

**Impacto esperado:** Cumplimiento legal, confianza del usuario, preparación para futuras integraciones de tracking.
**Esfuerzo:** S (2 horas)
**Agente recomendado:** Frontend
**Referencias:** [Plausible Analytics cookies](https://plausible.io/privacy-focused-web-analytics)[1]

---

### PROPUESTA 2: Motion Design System con prefers-reduced-motion

**Título:** Implementar sistema de animaciones CSS que respete accesibilidad WCAG 2.1 AA

**Descripción del problema:**
Las animaciones existentes (counter, FAB bounce, reveal on scroll, carousel) no respetan `prefers-reduced-motion`. Usuarios con mareos, epilepsia o simplemente preferencia por movimiento reducido no pueden usar el sitio de forma cómoda.

**Propuesta — CSS global + JS check:**
```css
/* En style.css */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
  
  .fab-bounce {
    animation: none;
  }
  
  .stats-card-bar-fill {
    transition: none;
  }
}
```

```javascript
// En script.js, antes de inicializar animaciones
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!prefersReducedMotion) {
  // Inicializar counter animations
  // Inicializar IntersectionObserver para reveal
  // Inicializar carousel auto-rotate
}
```

**Impacto esperado:** Accesibilidad WCAG 2.1 AA, experiencia usuario sensible, mejora en scoring de Lighthouse accessibility.
**Esfuerzo:** S (1 hora)
**Agente recomendado:** Frontend
**Referencias:** [MDN prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion)[2]

---

### PROPUESTA 3: Imágenes Responsive con srcset y WebP en todas las secciones

**Título:** Implementar srcset con imágenes WebP optimizadas para cada breakpoint

**Descripción del problema:**
Las imágenes del sitio se sirven en un solo tamaño. En móviles se carga la imagen de escritorio, desperdiciando bandwidth. Las imágenes son el mayor contributor al LCP.

**Propuesta — picture element + srcset para cada imagen:**
```html
<picture>
  <source media="(max-width: 480px)" srcset="images/sofa-480.webp" type="image/webp">
  <source media="(max-width: 768px)" srcset="images/sofa-768.webp" type="image/webp">
  <source srcset="images/sofa-1200.webp" type="image/webp">
  <img src="images/sofa.jpg" alt="Limpieza profunda de sofá en Bogotá" loading="lazy" width="400" height="300" decoding="async">
</picture>
```

**Aplicar a:**
- index.html: tarjetas de servicios y productos
- zonas/*/index.html: imágenes de cada zona
- blog/*/index.html: imágenes de artículos
- Testimonios/reviews section

**Herramienta sugerida:** Usar `sharp` o un pipeline de build para generar las variantes WebP:
```bash
# Ejemplo de conversión con sharp
npx sharp-cli images/sofa.jpg - resize 480 300 -o images/sofa-480.webp
```

**Impacto esperado:** Reducción de ~30-50% en peso de imágenes en móviles. Mejora LCP de 2.5s a <1.5s estimado.
**Esfuerzo:** M (1 día para generar variantes + actualizar HTML)
**Agente recomendado:** Frontend
**Referencias:** [MDN responsive images](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images)[3]

---

### PROPUESTA 4: Google Business Profile Posts Automation

**Título:** Automatizar publicación de Google Posts desde el blog para mejorar SEO local

**Descripción del problema:**
Los competidores en el nicho de limpieza en Bogotá con Google Business Profile activo publican contenido regularmente. Purity & Clean tiene GBP pero no publica posts de forma recurrente. Los posts de GBP aparecen en el panel de conocimiento de Google y en búsquedas locales.

**Propuesta — Sistema de GBP posts:**
1. Crear un script que tome el último artículo del blog
2. Lo formatee como Google Post con imagen y texto resumido
3. Lo publique automáticamente via Google My Business API

**Alternativa sin API costosa:** Usar Zapier + GBP integration para publicar cuando hay nuevo artículo en blog.

**Contenido sugerido para posts:**
- Tips de limpieza del blog (cada semana)
- Ofertas estacionales (Deepavali, Navidad, inicio de año)
- Nuevo servicio o zona cubierta
- Reseñas destacadas de clientes

**Impacto esperado:** Mejor presencia en búsquedas locales. CTR improvement. Competir con otros servicios de limpieza en Bogotá.
**Esfuerzo:** M (requiere cuenta de Google My Business API o Zapier)
**Agente recomendado:** Full Stack (o Marketing automation)
**Referencias:** [Google My Business API - Posts](https://developers.google.com/my-business/samples/manage-local-business-post)[4]

---

### PROPUESTA 5: Chatbot con Quick-Reply Buttons

**Título:** Añadir botones de respuesta rápida al chatbot para mejorar UX mobile

**Descripción del problema:**
Las preguntas FAQ en el chatbot tienen respuestas largas (párrafos de 3-4 líneas). En móvil, esto obliga a scrollgear mucho. Quick-reply buttons permiten al usuario tocar una categoría y recibir la respuesta.

**Propuesta — UI de quick replies:**
```html
<div class="chatbot-quick-replies" aria-label="Categorías de ayuda">
  <button class="quick-reply-btn" data-question="precio-sofas">💰 Precios</button>
  <button class="quick-reply-btn" data-question="sanitizacion-colchones">🛏️ Colchones</button>
  <button class="quick-reply-btn" data-question="agendar-servicio">📅 Agendar</button>
  <button class="quick-reply-btn" data-question="zonas-cobertura">📍 Zonas</button>
  <button class="quick-reply-btn" data-question="seguro-mascotas">🐾 Mascotas</button>
  <button class="quick-reply-btn" data-question="planes-recurrentes">🔄 Planes</button>
</div>
```

```css
.chatbot-quick-replies {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  border-bottom: 1px solid var(--color-border);
}

.quick-reply-btn {
  background: var(--color-surface);
  border: 1.5px solid var(--color-border);
  border-radius: 20px;
  padding: 0.4rem 0.9rem;
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.3rem;
}

.quick-reply-btn:hover,
.quick-reply-btn:focus-visible {
  background: var(--color-primary);
  color: #fff;
  border-color: var(--color-primary);
}
```

```javascript
// En script.js
document.querySelectorAll('.quick-reply-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const questionId = btn.dataset.question;
    const faqItem = CHATBOT_FAQ.find(f => f.id === questionId);
    if (faqItem) {
      showChatbotAnswer(faqItem.answer);
      trackEvent('chatbot_quick_reply', { question: questionId });
    }
  });
});
```

**Impacto esperado:** Reducción de bounces en chatbot. Mejor engagement con usuarios mobile. CTR improvement en WhatsApp prompts.
**Esfuerzo:** S (2 horas)
**Agente recomendado:** Frontend
**Referencias:** [Chatbot UX best practices](https://www.intercom.com/blog/customer-service-chatbot/)[5]

---

### PROPUESTA 6: Reviews Carousel Accessibility + Keyboard Navigation

**Título:** Corregir carousel de reviews para soporte prefers-reduced-motion y navegación por teclado

**Descripción del problema:**
El carousel de Google Reviews:
1. No respeta `prefers-reduced-motion`
2. No es navegable por teclado (WCAG 2.1)
3. Auto-rotatea sin opción de pausa para usuarios que prefieren control

**Propuesta:**
```css
@media (prefers-reduced-motion: reduce) {
  .reviews-carousel-track {
    animation: none;
    scroll-snap-type: x mandatory;
  }
}
```

```html
<!-- Controles de carousel con aria-label claro -->
<div class="carousel-controls" role="group" aria-label="Controles de reseñas">
  <button id="carousel-prev" aria-label="Reseña anterior">‹</button>
  <button id="carousel-pause" aria-label="Pausar rotación">⏸</button>
  <button id="carousel-next" aria-label="Siguiente reseña">›</button>
</div>
```

```javascript
// Keyboard navigation
carousel.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') showPrevReview();
  if (e.key === 'ArrowRight') showNextReview();
});
```

**Impacto esperado:** Accesibilidad WCAG 2.1 AA. Mejor UX para usuarios de teclado y lectores de pantalla.
**Esfuerzo:** S (1 hora)
**Agente recomendado:** Frontend
**Referencias:** [WCAG Carousel pattern](https://www.w3.org/WAI/WCAG21/Techniques/aria/ARIA96)[6]

---

### PROPUESTA 7: LocalBusiness Schema Específico por Zona

**Título:** Añadir schema LocalBusiness con área de servicio específica en cada página de zona

**Descripción del problema:**
Las 10 páginas de zonas no tienen schema LocalBusiness específico. Cada zona debería tener su propio schema para indicar a Google que el negocio cubre ese barrio específico de Bogotá.

**Propuesta — Schema por zona en zonas/teusaquillo/index.html:**
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Purity & Clean - Limpieza en Teusaquillo",
  "image": "https://purityclean.com/images/teusaquillo-hero.jpg",
  "description": "Servicios profesionales de limpieza en Teusaquillo, Bogotá. Limpieza de sofás, colchones, alfombras y sanitización.",
  "telephone": "+57-300-123-4567",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Teusaquillo",
    "addressRegion": "Cundinamarca",
    "addressCountry": "CO"
  },
  "areaServed": [
    {
      "@type": "Neighborhood",
      "name": "Teusaquillo"
    },
    {
      "@type": "City",
      "name": "Bogotá"
    }
  ],
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "4.6285",
    "longitude": "-74.0954"
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    "opens": "08:00",
    "closes": "18:00"
  }
}
</script>
```

Repetir para las 10 zonas con las coordenadas aproximadas de cada barrio.

**Impacto esperado:** Rich results específicos por zona en Google. Mejor ranking para búsquedas locales tipo "limpieza de sofás en [barrio]".
**Esfuerzo:** M (3 horas para las 10 zonas)
**Agente recomendado:** Frontend (SEO local)
**Referencias:** [Schema.org LocalBusiness](https://schema.org/LocalBusiness)[7]

---

## Propuestas Priorizadas (R116)

| # | Propuesta | Tipo | Impacto | Esfuerzo | Agente |
|---|-----------|------|---------|---------|--------|
| 1 | Cookie Consent Banner GDPR-CO | Legal/UX | 🔴 Alto | S | Frontend |
| 2 | Motion Design System + prefers-reduced-motion | Accesibilidad | 🟡 Medio | S | Frontend |
| 3 | srcset + WebP responsive images | Performance | 🟡 Medio | M | Frontend |
| 4 | Google Business Profile Posts Automation | SEO Local | 🟡 Medio | M | Full Stack |
| 5 | Chatbot Quick-Reply Buttons | UX Mobile | 🟢 Bajo | S | Frontend |
| 6 | Reviews Carousel Accessibility | Accesibilidad | 🟡 Medio | S | Frontend |
| 7 | LocalBusiness Schema específico por zona | SEO Local | 🟡 Medio | M | Frontend |

---

## Diferenciación con R115

**R115 propuso:**
- Sitemap.xml con hreflang en homepage + blog + eliminar fragments
- HowTo schema en artículo de sofá
- FAQPage schema en artículos
- Lazy loading nativo
- Infraestructura i18n
- Organization schema
- Print CSS

**R116 novedades propias (NO cubiertas por R115):**
- Cookie Consent Banner (R108 solo lo identificó, no implementó)
- Motion design system con prefers-reduced-motion (nunca propuesto)
- srcset + WebP responsive images (R112 propuso WebP pero sin srcset)
- GBP Posts automation (R110 lo propuso pero no hay implementación)
- Chatbot quick-reply buttons (nunca propuesto)
- Reviews carousel accessibility (nunca propuesto con prefers-reduced-motion)
- LocalBusiness schema por zona (nunca propuesto — solo había generic en homepage)

**Brechas identificadas en R115 que R116 confirma como pendientes:**
- Sitemap con URLs de fragmentos ❌ sigue igual
- HowTo schema en blog ✅ propuesto en R115, R116 no lo duplica
- Lazy loading nativo ✅ propuesto en R115, R116 no lo duplica

---

## Referencias

[1] Plausible Analytics — Privacy-focused web analytics: https://plausible.io/privacy-focused-web-analytics
[2] MDN — prefers-reduced-motion: https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion
[3] MDN — Responsive images with srcset and sizes: https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images
[4] Google My Business API — Posts: https://developers.google.com/my-business/samples/manage-local-business-post
[5] Intercom — Chatbot UX best practices: https://www.intercom.com/blog/customer-service-chatbot/
[6] WCAG — ARIA carousel pattern: https://www.w3.org/WAI/WCAG21/Techniques/aria/ARIA96
[7] Schema.org — LocalBusiness: https://schema.org/LocalBusiness

---

*Análisis generado por Innovation Scout — Innovation Scout Agent*
*Purity & Clean Round 116 — 2026-04-28*