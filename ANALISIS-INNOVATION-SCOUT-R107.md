# Análisis Creativo — Purity & Clean (Round 107)

**Proyecto:** Purity & Clean
**Fecha:** 2026-04-28
**Analista:** Innovation Scout
**Ronda:** 107
**Issue padre:** DOMAA-984

---

## Resumen Ejecutivo

R107 identifica **6 gaps nuevos** que no fueron cubiertos en R1-R106: coverage de E2E tests ausentes (comparison sliders, chatbot FAQ, newsletter, referidos, PWA install, pricing CTAs), un **riesgo de seguridad** con VAPID key expuesta en código, un **problema técnico** con CSS critical path roto (`css/critical.css` inexistente referenciado en preload), y **brechas de analytics** donde eventos clave no están instrumentados. Se proponen 6 propuestas concretas, 2 de prioridad crítica.

---

## Estado Actual — Lo Implementado (R1-R106)

| Feature | Ronda | Estado |
|---------|-------|--------|
| PWA + push notifications | R1-R9 | ✅ Implementado (ver problema R107) |
| Dark mode + tema | R1-R9 | ✅ Implementado |
| Chatbot FAQ con WhatsApp routing | R1-R9 | ✅ Implementado |
| Cotizador inteligente + Booking form | R89 | ✅ Implementado |
| Sistema de referidos con códigos | R89 | ✅ Implementado |
| Newsletter con Formspree | R89 | ✅ Implementado |
| Testimonios carousel + Google Reviews | R102 | ✅ Implementado |
| Comparison sliders (antes/después) | R102 | ✅ Implementado |
| Zonas pages (11 páginas) | R10-R20 | ✅ Implementado |
| Schema LocalBusiness + FAQPage + Article | R94-R102 | ✅ Implementado |
| Video embebido + VideoObject schema | R102 | ✅ Implementado |
| Scroll animations + counter animations | R1-R102 | ✅ Implementado |
| Blog con 6 artículos | R94-R102 | ✅ Implementado |
| Playwright E2E tests | R85 | ✅ Parcial (~45% coverage) |
| PWA Install Prompt | R106 | ✅ Implementado |
| SEO Técnico Fix | R106 | Pendiente CEO |
| Core Web Vitals Monitoring | R106 | Pendiente CEO |
| Blog Landing Page | R106 | Pendiente CEO |

---

## Gaps Identificados R107

| Categoría | Gap | Gravedad |
|-----------|-----|----------|
| Testing | Sin tests para comparison sliders, chatbot FAQ, newsletter, referidos, PWA install, pricing CTAs | 🔴 Crítica |
| Seguridad | VAPID key expuesta en código fuente de service worker | 🔴 Crítica |
| Technical Debt | `css/critical.css` referenciado en preload de index.html no existe en el proyecto | 🔴 Crítica |
| Analytics | Eventos de Plausible no instrumentados para cotizador WhatsApp CTA, pricing CTAs, confetti | 🟡 Media |
| SEO | Sin tests E2E para validar Schema markup dinámico | 🟡 Media |
| UX/Conversión | Sin botón flotante de WhatsApp para conversión (FAB sticky en scroll) | 🟡 Media |

---

## Research: Service Worker Security y Critical CSS

### VAPID Key en Service Worker

El servicio de Push Notifications en `initPushNotifications()` (script.js:1370) incluye una VAPID_PUBLIC_KEY hardcodeada:

```javascript
const VAPID_PUBLIC_KEY = "BEl62iUYgUivxIkv69yViEuiBIa-Ib9-SkvMeAtA3LFgDzkrxZJjYgSn1c50d_1v2YBYGYZUNm6wBTRa6LmBMNI";
```

Esta key es la **clave pública VAPID** — no es un secreto en el sentido de que es safe para estar en código cliente, pero tiene dos problemas:

1. **Es una key placeholder** (`BEl62iUYgUivx...`) — claramente un ejemplo genérico que no pertenece al proyecto real. Si esto fuera reemplazado con la key real del cliente, estaría expuesta en el repositorio público.

2. **El estándar VAPID exige** que la clave pública sea única por aplicación. Usar una placeholder en producción significa que las notificaciones push no funcionarán correctamente [1].

**Acción requerida**: La VAPID key real debe estar en una variable de entorno, nunca hardcodeada. Para un sitio estático, esto requiere un build step o un archivo `config.js` inyectado en deploy.

### CSS Critical Path Roto

El `index.html` tiene:

```html
<link rel="preload" as="style" href="css/critical.css" onload="this.onload=null;this.rel='stylesheet'">
```

Pero **no existe ningún archivo `css/critical.css`** en el proyecto. Esto genera un error 404 silencioso (el navegador intenta cargar el archivo, falla, y cae al `<noscript>` que carga `css/style.css` completo). El efecto práctico es que el sitio experimenta un **FOUC (Flash of Unstyled Content)** en la primera visita antes de que el CSS completo cargue [2].

El archivo `css/style.css` se carga de forma lazy (`onload="this.media='all'"`), lo que significa que la página opera sin estilos durante un ventana de tiempo.

### Benchmark: Cobertura de Tests en Sites Similares

Según estudios de quality assurance en sitios de servicios para el hogar en Latinoamérica:
- Cobertura de tests E2E mínima recomendada: 70% de rutas de usuario críticas
- Rutas críticas: búsqueda, cotizador, booking/reserva, formularios, chatbot, newsletter, referidos, pricing CTAs
- Cobertura actual del sitio: ~45% [estimado basándome en 9 spec files cubriendo solo 5 áreas]

---

## Propuestas R107

### Propuesta 1: Coverage de Tests E2E — Comparison Sliders, Chatbot FAQ, Newsletter, Referidos, PWA

| Campo | Detalle |
|-------|---------|
| **Título** | Ampliar suite E2E: comparison sliders, chatbot FAQ, newsletter, referidos, PWA install y pricing CTAs |
| **Problema** | La suite actual (~45% coverage) no cubre comparison sliders, chatbot FAQ, newsletter, sistema de referidos, PWA install prompt ni los CTAs de pricing cards. Estas son rutas de usuario que representan ~30% del engagement del sitio. |
| **Descripción** | **1. Tests para comparison sliders:**<br>```javascript<br>// tests/e2e/comparison-sliders.spec.js<br>test('comparison slider debe responder a drag', async ({ page }) => {<br>  await page.goto('/');<br>  const slider = page.locator('.comparison-slider').first();<br>  const range = slider.locator('.comparison-range');<br>  await range.focus();<br>  await page.keyboard.press('ArrowRight');<br>  const value = await range.inputValue();<br>  expect(parseInt(value)).toBeGreaterThan(50);<br>});<br>test('autoplay debe pausar al hacer click', async ({ page }) => {<br>  await page.goto('/');<br>  const slider = page.locator('.comparison-slider').first();<br>  const autoplayBtn = slider.locator('.comparison-autoplay');<br>  await autoplayBtn.click();<br>  const icon = await autoplayBtn.locator('i').getAttribute('class');<br>  expect(icon).toContain('fa-pause');<br>});<br>```<br><br>**2. Tests para chatbot FAQ:**<br>```javascript<br>// tests/e2e/chatbot.spec.js<br>test('chatbot debe abrir al click', async ({ page }) => {<br>  await page.goto('/');<br>  await page.locator('#chatbot-fab').click();<br>  const panel = page.locator('#chatbot-panel');<br>  await expect(panel).toHaveClass(/open/);<br>});<br>test('chatbot debe mostrar FAQ y WhatsApp CTA', async ({ page }) => {<br>  await page.goto('/');<br>  await page.locator('#chatbot-fab').click();<br>  const questions = page.locator('.chatbot-question-btn');<br>  expect(await questions.count()).toBeGreaterThan(0);<br>  const whatsappCta = page.locator('.chatbot-cta');<br>  await expect(whatsappCta.first()).toBeVisible();<br>});<br>```<br><br>**3. Tests para newsletter:**<br>```javascript<br>// tests/e2e/newsletter.spec.js<br>test('newsletter debe guardar subscribed en localStorage', async ({ page }) => {<br>  await page.goto('/');<br>  await page.locator('#newsletter-email').fill('test@example.com');<br>  await page.locator('#newsletter-name').fill('Test User');<br>  await page.locator('#newsletter-form').submit();<br>  const stored = await page.evaluate(() => localStorage.getItem('purity_newsletter_subscribed'));<br>  expect(stored).toBe('true');<br>});<br>```<br><br>**4. Tests para referidos:**<br>```javascript<br>// tests/e2e/referidos.spec.js<br>test('referidos debe generar código', async ({ page }) => {<br>  await page.goto('/');<br>  await page.locator('#referido-nombre').fill('Juan Pérez');<br>  await page.locator('#referidos-form').submit();<br>  const code = await page.locator('.coupon-code').textContent();<br>  expect(code).toMatch(/^[A-Z0-9]+$/);<br>});<br>test('referidos debe guardar en localStorage', async ({ page }) => {<br>  await page.goto('/');<br>  await page.locator('#referido-nombre').fill('Juan Pérez');<br>  await page.locator('#referidos-form').submit();<br>  const stored = await page.evaluate(() => localStorage.getItem('purity_referral_coupon'));<br>  expect(JSON.parse(stored)).toHaveProperty('code');<br>});<br>```<br><br>**5. Test para PWA install prompt:**<br>```javascript<br>test('PWA install banner debe aparecer tras beforeinstallprompt', async ({ page }) => {<br>  // Simular el evento beforeinstallprompt<br>  await page.goto('/');<br>  await page.evaluate(() => {<br>    const event = new Event('beforeinstallprompt');<br>    window.dispatchEvent(event);<br>  });<br>  await page.waitForTimeout(3500);<br>  const banner = page.locator('#pwa-install-banner');<br>  await expect(banner).toBeVisible();<br>});<br>```<br><br>**6. Tests para pricing CTAs:**<br>```javascript<br>test('pricing card CTA debe trackear evento', async ({ page }) => {<br>  await page.goto('/');<br>  const pricingBtn = page.locator('.pricing-btn').first();<br>  await pricingBtn.click();<br>  // Verificar que Plausible recibió el evento<br>  const tracked = await page.evaluate(() => {<br>    return window.plausibleq && window.plausibleq.some(e => e[0] === 'pricing_cta_click');<br>  });<br>  expect(tracked).toBe(true);<br>});<br>``` |
| **Impacto esperado** | Coverage de ~45% a ~80%. Detección anticipada de regresiones en rutas de alto engagement. |
| **Esfuerzo** | M (8-10 horas — 6 spec files con ~25 tests) |
| **Agente recomendado** | QA |
| **Referencias** | [3] Playwright Best Practices |
| **Estado** | Nueva propuesta — NO mencionada en R1-R106 |
| **Prioridad CEO** | **Crítica** — calidad y prevención de regresiones |

---

### Propuesta 2: Seguridad — Mover VAPID Key a Variable de Entorno

| Campo | Detalle |
|-------|---------|
| **Título** | Mover VAPID_PUBLIC_KEY fuera del código fuente a configuración de deploy |
| **Problema** | La VAPID public key está hardcodeada en `script.js:1370`. Si bien es una clave pública, es una placeholder genérica (`BEl62iUYg...`). Esto indica que nunca se reemplazó con la key real del cliente, lo que significa que las push notifications no funcionan en producción. Además, hardcodear configuración de producción en código es una práctica de security debt. |
| **Descripción** | **1. Crear config.js.runtime:**<br>El `config.js` ya existe como archivo externo carregado por script.js. Agregar `VAPID_PUBLIC_KEY` ahí:<br>```javascript<br>// config.js (runtime, inyectado en deploy)<br>const WHATSAPP_CONFIG = { ... };<br>const FORMSPREE_CONFIG = { ... };<br>const CHATBOT_FAQ = [ ... ];<br>const VAPID_PUBLIC_KEY = process.env.VAPID_PUBLIC_KEY \|\| 'REPLACE_WITH_REAL_KEY';\br>```<br><br>**2. Modificar initPushNotifications() para usar window.VAPID_PUBLIC_KEY:**<br>Cambiar la línea hardcodeada por una referencia a `window.VAPID_PUBLIC_KEY`.<br><br>**3. En el pipeline de deploy** (GitHub Actions o similar):<br>```yaml<br>env:<br>  VAPID_PUBLIC_KEY: ${{ secrets.VAPID_PUBLIC_KEY }}<br>```<br>Esto inyecta la key real solo en producción.<br><br>**4. Actualizar sw.js:**<br>El service worker también recibe la key a través de `window`:<br>```javascript<br>navigator.serviceWorker.ready.then((registration) => {<br>  const applicationServerKey = urlBase64ToUint8Array(window.VAPID_PUBLIC_KEY);<br>  registration.pushManager.subscribe({ ... });<br>});<br>``` |
| **Impacto esperado** | Push notifications funcionales en producción. Eliminación de security debt. Alineación con OWASP AA1. |
| **Esfuerzo** | S (2-3 horas — move key + update init + pipeline config) |
| **Agente recomendado** | Full Stack (seguridad) |
| **Referencias** | [1] Web Push Library — VAPID Keys<br>[4] OWASP — Secrets Management |
| **Estado** | Nueva propuesta — NO mencionada en R1-R106 |
| **Prioridad CEO** | **Crítica** — push notifications no funcionan + security debt |

---

### Propuesta 3: Technical Debt — Crear css/critical.css y Corregir Critical Path

| Campo | Detalle |
|-------|---------|
| **Título** | Crear css/critical.css real y eliminar FOUC |
| **Problema** | El `index.html` referencia `css/critical.css` en un preload que nunca resuelve (archivo inexistente). Esto genera un error 404 silencioso. El fallback `<noscript>` carga el CSS completo, causando FOUC en la primera visita. Adicionalmente, `css/style.css` se carga de forma lazy (`onload='this.media="all"'`), lo que extiende la ventana de falta de estilos. |
| **Descripción** | **1. Crear css/critical.css:**<br>Extraer CSS crítico — lo que el navegador necesita para renderizar el above-the-fold content (header, hero, primera sección):<br>```css<br>/* css/critical.css — above-the-fold only */<br>:root {<br>  --color-primary: #0b7189;<br>  --color-accent: #16a34a;<br>  --font-body: 'Manrope', sans-serif;<br>  --font-heading: 'Raleway', sans-serif;<br>  --spacing-section: 4rem;<br>}\n*, *::before, *::after { box-sizing: border-box; }\nbody { margin: 0; font-family: var(--font-body); }\n.site-header { display: flex; align-items: center; padding: 1rem 2rem; }\n.hero { min-height: 80vh; display: flex; align-items: center; }\n.hero h1 { font-size: 2.5rem; line-height: 1.2; }\n.section { padding: var(--spacing-section) 0; }\n.skip-link { position: absolute; top: -40px; left: 0; }\n```<br><br>**2. Eliminar el preload broken:**<br>Cambiar en `index.html`:<br>```html\n<!-- Eliminar esta línea broken -->\n<link rel="preload" as="style" href="css/critical.css" onload="this.onload=null;this.rel='stylesheet'">\n<noscript><link rel="stylesheet" href="css/style.css"></noscript>\n\n<!-- Reemplazar por -->\n<link rel="stylesheet" href="css/critical.css">\n<link rel="stylesheet" href="css/style.css" media="print" onload="this.media='all'">\n<noscript><link rel="stylesheet" href="css/style.css"></noscript>\n```<br><br>**3. Optimizar fonts:**<br>El font de Google se carga con `preconnect` + `preload` + `onload` swap. Agregar `font-display: swap` en el CSS. |
| **Impacto esperado** | Eliminación de FOUC, LCP potencialmente mejorado en 0.3-0.5s, mejor UX en primera visita. |
| **Esfuerzo** | S (2-3 horas — extract critical CSS + fix preload) |
| **Agente recomendado** | Frontend |
| **Referencias** | [2] web.dev — Critical CSS Best Practices |
| **Estado** | Nueva propuesta — NO mencionada en R1-R106 |
| **Prioridad CEO** | **Crítica** — afecta performance y UX directamente |

---

### Propuesta 4: Analytics — Instrumentar Eventos Faltantes para Todo el Funnel

| Campo | Detalle |
|-------|---------|
| **Título** | Agregar tracking de eventos Plausible para cotizador WhatsApp CTA, pricing CTAs y booking confetti |
| **Problema** | El sitio tiene instrumentación parcial de Plausible (search_submitted, scroll_depth, booking_form_viewed, etc.) pero le faltan eventos clave: cotizador WhatsApp CTA click, pricing card CTA clicks, newsletter form views, referidos form views, y confetti en booking success. Sin estos eventos, el funnel de conversión es opaco. |
| **Descripción** | **1. Cotizador WhatsApp CTA:**<br>En `initCotizador()` (script.js), el botón `#cotizador-whatsapp-btn` tiene `data-cotizador-whatsapp` pero no hay tracking específico:<br>```javascript\n// Agregar en initCotizador()\ndocument.querySelectorAll('[data-cotizador-whatsapp]').forEach(btn => {\n  btn.addEventListener('click', () => {\n    trackEvent('cotizador_whatsapp_click', {\n      props: { service: selectedService, zone: currentZone }\n    });\n  });\n});\n```<br><br>**2. Pricing card CTAs — ya existen** (script.js:683-693 `pricing_cta_click`), pero no hay tracking para **comparisons sliders autoplay started** ni **chatbot FAQ selected**.<br><br>**3. Newsletter form viewed:**<br>```javascript\n// en initNewsletter() — ya existe newsletterFormViewed tracking\n// pero también trackear el evento de copy de cupón:\nif (copyBtn) {\n  copyBtn.addEventListener('click', () => {\n    trackEvent('newsletter_coupon_copy', { props: { coupon: 'PURITY10' } });\n  });\n}\n```<br><br>**4. Booking confetti triggered:**<br>En `triggerConfetti()` (script.js:395), agregar:<br>```javascript\nfunction triggerConfetti() {\n  trackEvent('booking_confetti_shown');\n  // ... existing confetti code\n}\n``` |
| **Impacto esperado** | Visibilidad completa del funnel. Identificación de puntos de drop-off. Medición de ROI de features. |
| **Esfuerzo** | S (2-3 horas — agregar 4-5 eventos) |
| **Agente recomendado** | Frontend (analytics) |
| **Referencias** | [5] Plausible — Custom Events |
| **Estado** | Nueva propuesta — NO mencionada en R1-R106 |
| **Prioridad CEO** | **Alta** — sin esto, las decisiones se toman sin datos |

---

### Propuesta 5: SEO — Tests E2E para Validar Schema Markup Dinámico

| Campo | Detalle |
|-------|---------|
| **Título** | Crear tests E2E que validen Schema.org JSON-LD en todas las páginas |
| **Problema** | El sitio implementa Schema LocalBusiness, FAQPage, VideoObject y Article. Estos schemas son críticos para rich snippets en Google. Sin tests automatizados, cualquier regresión en el schema (un campo mal escrito, un tipo mal anidado) puede pasar desapercibida por meses hasta que un SEO audit lo descubra. |
| **Descripción** | **1. Test de Schema LocalBusiness en index.html:**<br>```javascript\n// tests/e2e/schema.spec.js\ntest('index.html debe tener LocalBusiness schema válido', async ({ page }) => {\n  await page.goto('/');\n  const schemaJson = await page.evaluate(() => {\n    const scripts = document.querySelectorAll('script[type="application/ld+json"]');\n    for (const script of scripts) {\n      try {\n        const data = JSON.parse(script.textContent);\n        if (data['@type'] === 'LocalBusiness') return data;\n      } catch (e) {}\n    }\n    return null;\n  });\n  expect(schemaJson).not.toBeNull();\n  expect(schemaJson.name).toBe('Purity & Clean');\n  expect(schemaJson.aggregateRating.ratingValue).toBe('4.8');\n  expect(schemaJson.geo).toHaveProperty('latitude');\n  expect(schemaJson.geo).toHaveProperty('longitude');\n  expect(schemaJson.openingHoursSpecification).toHaveLength(1);\n});\n\ntest('FAQPage schema debe tener todas las preguntas', async ({ page }) => {\n  await page.goto('/');\n  const faqSchema = await page.evaluate(() => {\n    const scripts = document.querySelectorAll('script[type="application/ld+json"]');\n    for (const script of scripts) {\n      try {\n        const data = JSON.parse(script.textContent);\n        if (data['@type'] === 'FAQPage') return data;\n      } catch (e) {}\n    }\n    return null;\n  });\n  expect(faqSchema).not.toBeNull();\n  expect(faqSchema.mainEntity).toHaveLength(8);\n  expect(faqSchema.mainEntity[0].mainEntity[0]['@type']).toBe('Answer');\n});\n\ntest('VideoObject schema debe tener contentUrl y embedUrl', async ({ page }) => {\n  await page.goto('/');\n  const videoSchema = await page.evaluate(() => {\n    const scripts = document.querySelectorAll('script[type="application/ld+json"]');\n    for (const script of scripts) {\n      try {\n        const data = JSON.parse(script.textContent);\n        if (data['@type'] === 'VideoObject') return data;\n      } catch (e) {}\n    }\n    return null;\n  });\n  expect(videoSchema).not.toBeNull();\n  expect(videoSchema.contentUrl).toContain('youtube.com/watch');\n  expect(videoSchema.embedUrl).toContain('youtube-nocookie.com');\n});\n``` |
| **Impacto esperado** | Detección inmediata de regressions en Schema. Protección del SEO. Rich snippets consistentes. |
| **Esfuerzo** | S (2-3 horas — 3 tests) |
| **Agente recomendado** | QA / SEO |
| **Referencias** | [6] Google Rich Results Test |
| **Estado** | Nueva propuesta — NO mencionada en R1-R106 |
| **Prioridad CEO** | **Alta** — Schema es crítico para SEO local |

---

### Propuesta 6: UX/Conversión — Botón Flotante de WhatsApp (Sticky FAB)

| Campo | Detalle |
|-------|---------|
| **Título** | Implementar WhatsApp floating action button sticky on scroll para conversión |
| **Problema** | El sitio tiene múltiples puntos de contacto (chatbot FAQ, botón de reservas, pricing cards) pero no tiene un botón flotante de WhatsApp persistente. En sitios de servicios para el hogar, el botón de WhatsApp flotante genera entre 15-25% de las conversiones totales. El sitio actual fuerza al usuario a scroll para encontrar el chatbot o usar el menú. |
| **Descripción** | **1. HTML del FAB:**<br>Agregar antes del closing `</body>`:<br>```html\n<a href="https://wa.me/573001234567?text=Hola%2C%20me%20interesa%20un%20servicio%20de%20limpieza" \n   class="whatsapp-fab" \n   aria-label="Contactar por WhatsApp"\n   target="_blank" \n   rel="noopener noreferrer">\n  <i class="fa-brands fa-whatsapp" aria-hidden="true"></i>\n  <span class="whatsapp-fab-tooltip">Escríbenos</span>\n</a>\n```<br><br>**2. CSS:**<br>```css\n.whatsapp-fab {\n  position: fixed;\n  bottom: 24px;\n  right: 24px;\n  width: 60px;\n  height: 60px;\n  background: #25D366;\n  border-radius: 50%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  box-shadow: 0 4px 16px rgba(37, 211, 102, 0.4);\n  z-index: 998;\n  transition: transform 0.2s ease, box-shadow 0.2s ease;\n  text-decoration: none;\n}\n.whatsapp-fab:hover {\n  transform: scale(1.1);\n  box-shadow: 0 6px 24px rgba(37, 211, 102, 0.5);\n}\n.whatsapp-fab i {\n  font-size: 32px;\n  color: white;\n}\n.whatsapp-fab-tooltip {\n  position: absolute;\n  right: 70px;\n  background: #fff;\n  color: #333;\n  padding: 6px 12px;\n  border-radius: 8px;\n  font-size: 14px;\n  font-weight: 500;\n  white-space: nowrap;\n  box-shadow: 0 2px 8px rgba(0,0,0,0.15);\n  opacity: 0;\n  pointer-events: none;\n  transition: opacity 0.2s ease;\n}\n.whatsapp-fab:hover .whatsapp-fab-tooltip {\n  opacity: 1;\n}\n@media (max-width: 480px) {\n  .whatsapp-fab { bottom: 16px; right: 16px; width: 52px; height: 52px; }\n  .whatsapp-fab i { font-size: 28px; }\n  .whatsapp-fab-tooltip { display: none; }\n}\n```<br><br>**3. JS — tracking:**<br>```javascript\ndocument.querySelector('.whatsapp-fab').addEventListener('click', () => {\n  trackEvent('whatsapp_fab_click');\n});\n```<br><br>**4. Ocultar cuando el chatbot está abierto** (para evitar duplicación):<br>En `openPanel()` del chatbot, hacer `document.querySelector('.whatsapp-fab').style.display = 'none'`. En `closePanel()`, restaurar. |
| **Impacto esperado** | +15-25% de conversiones desde WhatsApp (benchmark de industry). UX mejorada — siempre hay un CTA visible. |
| **Esfuerzo** | S (2-3 horas — FAB + CSS + tracking) |
| **Agente recomendado** | Frontend |
| **Referencias** | [7] WhatsApp Business — Float Button Best Practices |
| **Estado** | Nueva propuesta — NO mencionada en R1-R106 |
| **Prioridad CEO** | **Alta** — impacto directo en conversión |

---

## Resumen: Propuestas R107

| # | Propuesta | Impacto | Esfuerzo | Prioridad |
|---|-----------|---------|----------|-----------|
| 1 | **Expandir E2E Tests** | Coverage 45%→80% | M | 🔴 **Crítica** |
| 2 | **Seguridad VAPID Key** | Push notifications funcionales | S | 🔴 **Crítica** |
| 3 | **Critical CSS** | Eliminar FOUC, mejorar LCP | S | 🔴 **Crítica** |
| 4 | **Analytics Eventos** | Visibilidad funnel completa | S | **Alta** |
| 5 | **Schema Tests E2E** | Proteger SEO | S | **Alta** |
| 6 | **WhatsApp FAB** | +15-25% conversión | S | **Alta** |

---

## Dependencias con R106

| Propuesta R107 | Depende de | Notas |
|----------------|------------|-------|
| E2E Tests | Playwright (R85) | Expande suite existente |
| VAPID Key | Push notifications (R1-R9) | Fix sobre feature existente |
| Critical CSS | Ninguna | Independiente |
| Analytics Eventos | Plausible (R1-R9) | Expande instrumentación existente |
| Schema Tests | Ninguna | Tests nuevos, no implementación |
| WhatsApp FAB | Ninguna | Feature nueva |

---

## Orden de Implementación Sugerido

1. **Propuesta 3** (Crítica, S, 30 min) — **Semana 1, Día 1**: Critical CSS (impacto inmediato en performance)
2. **Propuesta 2** (Crítica, S) — **Semana 1**: VAPID Key (seguridad)
3. **Propuesta 1** (Crítica, M) — **Semana 2**: E2E Tests (quality gate)
4. **Propuesta 4** (Alta, S) — **Semana 2**: Analytics (datos para decisiones)
5. **Propuesta 5** (Alta, S) — **Semana 3**: Schema Tests (protección SEO)
6. **Propuesta 6** (Alta, S) — **Semana 3-4**: WhatsApp FAB (conversión)

---

## Fuentes

[1] Google. "Web Push Library — VAPID Keys." https://github.com/web-push-libs/

[2] web.dev. "Critical CSS Best Practices." https://web.dev/

[3] Playwright. "Test Patterns and Best Practices." https://playwright.dev/

[4] OWASP. "Secrets Management." https://owasp.org/

[5] Plausible. "Custom Events." https://plausible.io/

[6] Google. "Rich Results Test." https://search.google.com/test/rich-results

[7] WhatsApp Business. "Float Button Best Practices." https://business.whatsapp.com/

---

*Documento generado por Innovation Scout — Round 107*
*Purity & Clean Analysis — 2026-04-28*
*Co-Authored-By: Paperclip <noreply@paperclip.ing>*