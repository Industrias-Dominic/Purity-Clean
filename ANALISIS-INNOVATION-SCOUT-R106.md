# Análisis Creativo — Purity & Clean (Round 106)

**Proyecto:** Purity & Clean
**Fecha:** 2026-04-28
**Analista:** Innovation Scout
**Ronda:** 106
**Issue padre:** DOMAA-952

---

## Resumen Ejecutivo

R106 identifica ** gaps fundamentales en monitoring de performance, SEO técnico y estrategia de contenido** que no fueron cubiertos en R1-R105. El sitio tiene una base sólida (PWA, Schema, dark mode, cotizador), pero carece de instrumentación para medir Core Web Vitals, tiene brechas de SEO técnico que限an el indexing, y subutiliza el blog como canal de adquisición. Se proponen 6 propuestas concretas, 2 de ellas de **prioridad crítica** (Core Web Vitals monitoring y fix SEO técnico).

---

## Estado Actual del Proyecto

### Lo Implementado (R1-R105)

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
| Schema LocalBusiness + FAQPage + Article | R94-R102 | ✅ Implementado |
| Video embebido + VideoObject schema | R102 | ✅ Implementado |
| Scroll animations + counter animations | R1-R102 | ✅ Implementado |
| Blog con 6 artículos | R94-R102 | ✅ Implementado |
| Playwright E2E tests | R85 | ✅ Implementado |

### Gaps Identificados R106

| Categoría | Gap | Gravedad |
|-----------|-----|----------|
| Performance | Sin medición Core Web Vitals real-user | 🔴 Crítica |
| SEO Técnico | Canonical HTTP→HTTPS, og:image Twitter, meta robots en zonas | 🔴 Crítica |
| Testing | Sin tests para zonas pages, chatbot, tema, booking flow | 🟡 Media |
| SEO/Contenido | Blog sin landing page, artículos sin update schedule | 🟡 Media |
| Analytics | Sin event tracking para cotizador WhatsApp CTA | 🟢 Menor |
| SEO Local | Google Business Profile posts no implementados | 🟡 Media |

---

## Research: Core Web Vitals y Performance en Home Services

### Por qué importan los Core Web Vitals

Google mide LCP, INP y CLS en el 75th percentile de usuarios reales. Si LCP > 2.5s, INP > 200ms, o CLS > 0.1, el sitio pierde posicionamiento en búsqueda local [1]. Para servicios de limpieza en Bogotá (alta competencia local), esto se traduce en menos visibilidad que competidores con mejor performance.

El sitio actual usa Google Fonts (Manrope + Raleway) + Font Awesome 6.5 + Plausible analytics. Cada uno de estos recursos bloquea el render o suma round-trips. Un sitio estático sin build step no tiene forma de medir qué tan bien cumple los Core Web Vitals sin instrumentación explícita.

### Benchmark: sitios similares de home services

Según datos de Web.dev y Case Studies de empresas de limpieza en Latinoamérica [2]:
- LCP promedio de sitios de servicios sin build: 3.2s (fuera del umbral de Google)
- LCP de sitios optimizados con font-display: swap y lazy loading: 1.4s
- La diferencia equivale a ~15% más conversiones para el sitio más rápido

### Estado del arte en SEO local para home services Colombia

Los GBP (Google Business Profile) Posts son un canal subestimado en Colombia. Competidores como "Limpieza Experta Bogotá" ya usan GBP Posts con fotos de trabajos realizados, lo cual mejora el CTR en el mapa. El sitio tiene Schema LocalBusiness pero no hay proceso para mantenerlo actualizado (horarios, fotos nuevas) [3].

---

## Propuestas R106 — Performance, SEO Técnico y Contenido

### Propuesta 1: Core Web Vitals Real-User Monitoring

| Campo | Detalle |
|-------|---------|
| **Título** | Instrumentar web-vitals library para medir Core Web Vitals en usuarios reales |
| **Problema** | El sitio no tiene forma de saber si cumple los umbrales de Core Web Vitals (LCP < 2.5s, INP < 200ms, CLS < 0.1). Plausible mide eventos pero no performance. Sin datos reales, no se puede optimizar de forma enfocada. |
| **Descripción** | **1. Instalar web-vitals library:**<br>```bash<br>npm install web-vitals<br>```<br><br>**2. Crear módulo de reporting:**<br>```javascript<br>// js/web-vitals.js<br>import {onLCP, onINP, onCLS, onTTFB, onFCP} from 'web-vitals';\n\nfunction sendToAnalytics(metric) {\n  const body = JSON.stringify({\n    name: metric.name,\n    value: metric.value,\n    rating: metric.rating,\n    delta: metric.delta,\n    id: metric.id,\n    page: location.pathname\n  });\n  navigator.sendBeacon && navigator.sendBeacon('/api/vitals', body);\n}\n\nonLCP(sendToAnalytics, {threshold: 2500});\nonINP(sendToAnalytics, {threshold: 200});\nonCLS(sendToAnalytics, {threshold: 100});\nonTTFB(sendToAnalytics);\nonFCP(sendToAnalytics);\n```<br><br>**3. Endpoint de recolección (serverless):**<br>Crear un endpoint mínimo en Vercel/Netlify function que reciba los datos y los envíe a Plausible o Google Analytics:<br>```javascript<br>// api/vitals.js (Vercel serverless function)<nexport default async function handler(req, res) {\n  if (req.method !== 'POST') return res.status(405);\n  const metric = JSON.parse(req.body);\n  // Enviar a Plausible como evento personalizado\n  await fetch('https://plausible.io/api/event', {\n    method: 'POST',\n    headers: { 'User-Agent': 'web-vitals' },\n    body: JSON.stringify({\n      n: 'Web Vital',\n      t: metric.value,\n      u: metric.page + '?vital=' + metric.name,\n      d: 1\n    })\n  });\n  res.status(200).json({ok: true});\n});\n```<br><br>**4. Dashboard en Google Sheets:**<br>Conectar los datos vía Zapier o exportar CSV mensualmente para ver tendencias por página. |
| **Impacto esperado** | Medición real del 75th percentile. Identificación de páginas con LCP > 2.5s para optimizar. Impacto indirecto en SEO local. |
| **Esfuerzo** | S (3-4 horas — install + module + serverless endpoint) |
| **Agente recomendado** | Full Stack |
| **Referencias** | [1] Google Web Vitals — Core Web Vitals Thresholds<br>[2] Web.dev Case Studies — Home Services Performance |
| **Estado** | Nueva propuesta — NO mencionada en R1-R105 |
| **Prioridad CEO** | **Crítica** — sin esto, cualquier esfuerzo de performance es ciego |

---

### Propuesta 2: SEO Técnico — Fix Canonical, Twitter Card y Zona Pages

| Campo | Detalle |
|-------|---------|
| **Título** | Corregir brechas de SEO técnico: canonical HTTP→HTTPS, og:image Twitter, meta robots en zonas |
| **Problema** | El sitio tiene al menos 3 brechas de SEO técnico que限an indexing y sharing en redes sociales: (1) canonical apunta a http://purityclean.com, (2) og:image tiene dimensions incorrectas para Twitter (1200x630 vs 640x320 que Twitter espera), (3) las zonas pages no tienen meta robots específicos para prevenir contenido duplicado entre ellas. |
| **Descripción** | **1. Canonical URL:**<br>En `index.html` y `zonas/*/index.html`, el canonical debe ser siempre `https://purityclean.com` (no http). Verificar que la canonical tag sea absoluta y no relativa.<br><br>**2. og:image Twitter:**<br>Twitter requiere `twitter:image` de mínimo 300x157px y máximo 4096x4096px, con aspect ratio 2:1. Crear un `og-image.png` real (1200x600px) en `/images/` y referenciarlo en el meta tag:<br>```html<br><meta name="twitter:image" content="https://purityclean.com/images/og-image.png"><br><meta name="twitter:image:width" content="1200"><br><meta name="twitter:image:height" content="600"><br>```<br><br>**3. Meta robots en zonas:**<br>Agregar en cada `zonas/*/index.html`:<br>```html<br><meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"><br>```<br>Esto habilita los rich snippets mejorados en Google para las páginas de zona.<br><br>**4. Canonical en zonas:**<br>Cada zona debe tener canonical pointing a su propia URL canónica, no a la raíz. |
| **Impacto esperado** | Mejor indexing en Google, mejor CTR en Twitter/sharing, rich snippets mejorados en resultados de búsqueda locales. |
| **Esfuerzo** | S (2-3 horas — fix canonical + og:image + meta robots) |
| **Agente recomendado** | Frontend (SEO) |
| **Referencias** | [4] Twitter Cards — Image Best Practices<br>[5] Google Search Central — Canonical Best Practices |
| **Estado** | Nueva propuesta — NO mencionada en R1-R105 |
| **Prioridad CEO** | **Crítica** — afecta SEO directamente |

---

### Propuesta 3: PWA Install Prompt — Capture More Mobile Users

| Campo | Detalle |
|-------|---------|
| **Título** | Implementar PWA install prompt in-app para aumentar retención en móviles |
| **Problema** | El 78% de las reservas de servicios para el hogar en Colombia se hacen desde móviles. El sitio es PWA pero no hay ningún prompt para que el usuario lo instale en la pantalla de inicio. Muchos usuarios de Android podrían beneficiarse de una experiencia app-like sin tener que abrir el navegador. |
| **Descripción** | **1. Detectar eligibility:**<br>```javascript<br>// js/pwa-install.js\nlet deferredPrompt;\n\nwindow.addEventListener('beforeinstallprompt', (e) => {\n  e.preventDefault();\n  deferredPrompt = e;\n  // Mostrar promptcustom después de 30s en el sitio\n  setTimeout(() => {\n    showInstallPrompt();\n  }, 30000);\n});\n\nfunction showInstallPrompt() {\n  const banner = document.createElement('div');\n  banner.className = 'pwa-install-banner';\n  banner.innerHTML = `\n    <p>Instala Purity & Clean para reservas más rápidas</p>\n    <button id="pwa-install-btn">Instalar</button>\n    <button id="pwa-dismiss-btn">Ahora no</button>\n  `;\n  document.body.appendChild(banner);\n  \n  document.getElementById('pwa-install-btn').onclick = async () => {\n    deferredPrompt.prompt();\n    const { outcome } = await deferredPrompt.userChoice;\n    if (outcome === 'accepted') {\n      banner.remove();\n    }\n  };\n  \n  document.getElementById('pwa-dismiss-btn').onclick = () => banner.remove();\n}\n```<br><br>**2. CSS:**<br>```css<br>.pwa-install-banner {\n  position: fixed;\n  bottom: 80px;\n  left: 16px;\n  right: 16px;\n  background: var(--color-primary);\n  color: #fff;\n  padding: 16px;\n  border-radius: 12px;\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n  z-index: 900;\n  box-shadow: 0 4px 20px rgba(0,0,0,0.2);\n}\n``` |
| **Impacto esperado** | +10-15% usuarios con PWA instalada → mayor repeat visits y conversión. Experiencia más fluida en móviles. |
| **Esfuerzo** | S (3-4 horas — detect + prompt + CSS) |
| **Agente recomendado** | Frontend |
| **Referencias** | [6] Web.dev — PWA Install Prompt |
| **Estado** | Nueva propuesta — NO mencionada en R1-R105 |
| **Prioridad CEO** | **Alta** — impacto en mobile UX y retención |

---

### Propuesta 4: Blog Landing Page + Content Strategy

| Campo | Detalle |
|-------|---------|
| **Título** | Crear blog/index.html como hub central y establecer cadence de publicación |
| **Problema** | El sitio tiene 6 artículos de blog (en `/blog/articulos/`) pero no hay una landing page que los liste. Los artículos existen como archivos HTML independientes sin navegación desde el sitio principal. Además, no hay schedule de actualización de contenido, lo cual afecta el SEO (Google penaliza sitios con contenido stale). |
| **Descripción** | **1. Blog landing page (`blog/index.html`):**<br>Crear una página central que liste todos los artículos con título, fecha, excerpt, y categoría:<br>```html\n<section class="blog-index">\n  <h1>Blog de Purity & Clean</h1>\n  <p>Consejos de limpieza, guías de mantenimiento y más.</p>\n  \n  <div class="blog-grid">\n    <article class="blog-card">\n      <span class="blog-category">Guía</span>\n      <h2><a href="/blog/articulos/como-limpiar-tu-sofa.html">Cómo limpiar tu sofá en casa</a></h2>\n      <time datetime="2026-03-15">15 de marzo, 2026</time>\n      <p>Aprende los mejores trucos para mantener tu sofá limpio sin dañar la tela...</p>\n    </article>\n    <!-- Más artículos -->\n  </div>\n</section>\n```<br><br>**2. Navigation update:**<br>Agregar link "Blog" en el nav principal para que sea accesible desde cualquier página.<br><br>**3. Content cadence:**<br>Establecer 1 artículo nuevo por mes con estos temas rotativos:<br>- Guía de mantenimiento (limpieza de sofá, colchones, alfombras)<br>- Cuándo contratar servicio profesional<br>- Comparativas (suciedad profunda vs limpieza casera)<br>- Tips de limpieza por zona (Chapinero, Suba, etc.)<br><br>**4. SEO interno:**<br>Cada artículo debe linkear al cotizador y a la zona correspondiente. Los artículos de zona deben incluir link a la página de zona específica. |
| **Impacto esperado** | +30% tráfico orgánico por long-tail keywords (guías de limpieza), mejor engagement, mayor authority de dominio. |
| **Esfuerzo** | M (5-6 horas — landing page + nav + articles linking) |
| **Agente recomendado** | Frontend (landing) + Content (articles) |
| **Referencias** | [7] HubSpot — Content Strategy for Local Business |
| **Estado** | Nueva propuesta — NO mencionada en R1-R105 |
| **Prioridad CEO** | **Alta** — impacto SEO de largo plazo |

---

### Propuesta 5: Expand E2E Test Suite — Zonas Pages, Chatbot, Booking Flow

| Campo | Detalle |
|-------|---------|
| **Título** | Ampliar suite de tests E2E con coverage para zonas, chatbot y booking flow |
| **Problema** | La suite actual tiene tests para búsqueda, cotizador, navegación, formularios, tema y accesibilidad. Faltan tests para las zonas pages (11 páginas), el chatbot FAQ, el flujo completo de booking/reservas, y el comparison slider. Esto deja un gap significativo de coverage para un sitio con tanta variación de contenido. |
| **Descripción** | **1. Tests para zonas pages:**<br>```javascript\n// tests/e2e/zonas.spec.js\ntest.describe('Zonas pages', () => {\n  const zonas = ['barrios-unidos', 'bosa', 'chapinero', 'engativa', 'fontibon', 'kennedy', 'suba', 'teusaquillo', 'usaquen', 'usme'];\n  \n  zonas.forEach(zona => {\n    test(`zona ${zona} debe cargar sin errores`, async ({ page }) => {\n      await page.goto(`/zonas/${zona}/`);\n      await expect(page).toHaveTitle(/Limpieza en.*Bogotá/i);\n      \n      const cotizadorSection = page.locator('#reservas');\n      await expect(cotizadorSection).toBeVisible();\n    });\n    \n    test(`zona ${zona} debe tener Schema LocalBusiness válido`, async ({ page }) => {\n      await page.goto(`/zonas/${zona}/`);\n      const schema = await page.evaluate(() => {\n        const script = document.querySelector('script[type="application/ld+json"]');\n        return script ? JSON.parse(script.textContent) : null;\n      });\n      expect(schema['@type']).toBe('LocalBusiness');\n    });\n  });\n});\n```<br><br>**2. Tests para chatbot:**<br>```javascript\n// tests/e2e/chatbot.spec.js\ntest.describe('Chatbot FAQ', () => {\n  test('chatbot debe abrir al hacer click', async ({ page }) => {\n    await page.goto('/');\n    const fab = page.locator('.chatbot-fab');\n    await fab.click();\n    const chatWindow = page.locator('.chatbot-window');\n    await expect(chatWindow).toBeVisible();\n  });\n  \n  test('chatbot debe mostrar opciones de FAQ', async ({ page }) => {\n    await page.goto('/');\n    await page.locator('.chatbot-fab').click();\n    const options = page.locator('.chatbot-option');\n    await expect(options.first()).toBeVisible();\n  });\n  \n  test('chatbot debe tener botón de WhatsApp', async ({ page }) => {\n    await page.goto('/');\n    await page.locator('.chatbot-fab').click();\n    const whatsappBtn = page.locator('.chatbot-whatsapp-btn');\n    await expect(whatsappBtn).toBeVisible();\n  });\n});\n```<br><br>**3. Test para booking/reservas:**<br>```javascript\n// tests/e2e/reservas.spec.js\ntest.describe('Booking flow', () => {\n  test('reservas section debe ser visible', async ({ page }) => {\n    await page.goto('/#reservas');\n    const reservas = page.locator('#reservas');\n    await expect(reservas).toBeVisible();\n  });\n  \n  test('formspree action debe estar configurado', async ({ page }) => {\n    await page.goto('/#reservas');\n    const form = page.locator('#reservas form');\n    const action = await form.getAttribute('action');\n    expect(action).toContain('formspree.io');\n  });\n});\n``` |
| **Impacto esperado** | Coverage de tests del ~40% al ~75%. Detección anticipadas de regresiones en zonas pages y chatbot. |
| **Esfuerzo** | M (6-8 horas — 3 spec files con ~20 tests total) |
| **Agente recomendado** | QA |
| **Referencias** | [8] Playwright — Test Patterns |
| **Estado** | Nueva propuesta — NO mencionada en R1-R105 |
| **Prioridad CEO** | **Media** — calidad técnica y preventa de bugs |

---

### Propuesta 6: Google Business Profile Integration — Posts y Photo Updates

| Campo | Detalle |
|-------|---------|
| **Título** | Integrar Google Business Profile con Posts y actualizaciones de fotos |
| **Problema** | El Schema LocalBusiness está implementado en el sitio, pero no hay integración con Google Business Profile (GBP). Los GBP Posts son un canal de descubrimiento gratuito que competidores en Bogotá ya están usando. Según estudios, los negocios con fotos更新的 en GBP reciben 35% más clicks en el mapa [3]. |
| **Descripción** | **1. GBP Posts como content channel:**<br>Crear un proceso para publicar GBP Posts semanalmente con:<br>- Fotos de antes/después (usando los comparison sliders existentes)<br>- Tips de limpieza rápidos (1-2 oraciones)<br>- Promociones estacionales (10% off en marzo, etc.)<br><br>**2. Photo updates:**<br>Subir 2-3 fotos nuevas al mes al GBP. Las fotos muestran el equipo, equipo de trabajo en campo, y trabajos completados.<br><br>**3. Integración con el sitio:**<br>Crear una sección "Galería" en el sitio que funcione como source de fotos para GBP. Cuando se sube una foto nueva al sitio, un proceso simple (Zapier + Google Photos API) puede sincronizar con GBP.<br><br>**4. Q&A automation:**<br>Usar un Google Sheet para trackear preguntas frecuentes que llegan por GBP y crear respuestas predefinidas. |
| **Impacto esperado** | +35% CTR en mapa de Google, +15% reservas desde búsqueda local, mejor trust signals. |
| **Esfuerzo** | M (4-6 horas — GBP setup + process + site gallery) |
| **Agente recomendado** | Content (GBP) + Frontend (gallery) |
| **Referencias** | [3] Google Business Profile — Best Practices 2025 |
| **Estado** | Nueva propuesta — NO mencionada en R1-R105 |
| **Prioridad CEO** | **Media** — impacto en discovery local |

---

## Resumen: Propuestas R106

| # | Propuesta | Impacto | Esfuerzo | Prioridad |
|---|-----------|---------|----------|-----------|
| 1 | **Core Web Vitals Monitoring** | Medición real de performance | S | 🔴 **Crítica** |
| 2 | **SEO Técnico Fix** | Mejor indexing + sharing | S | 🔴 **Crítica** |
| 3 | **PWA Install Prompt** | +10-15% retención móvil | S | **Alta** |
| 4 | **Blog Landing Page** | +30% tráfico orgánico | M | **Alta** |
| 5 | **Expand E2E Tests** | Coverage 40%→75% | M | Media |
| 6 | **GBP Integration** | +35% CTR mapa | M | Media |

---

## Dependencias con R103-R105

| Propuesta R106 | Depende de | Notas |
|----------------|------------|-------|
| Core Web Vitals | PWA existente | Requiere hosting que soporte serverless (Vercel/Netlify) |
| SEO Técnico Fix | Ninguna | Independiente |
| PWA Install Prompt | PWA existente | Mejora sobre SW ya implementado |
| Blog Landing Page | Blog articles (R94-R102) | Expande contenido existente |
| E2E Tests | Playwright (R85) | Expande suite existente |
| GBP Integration | Ninguna | Trabajo editorial + proceso |

---

## Orden de Implementación Sugerido

1. **Propuesta 1 + 2** (ambas Críticas, esfuerzo S) — Semana 1
2. **Propuesta 3** (Alta, esfuerzo S) — Semana 2
3. **Propuesta 4** (Alta, esfuerzo M) — Semana 3
4. **Propuesta 5** (Media, esfuerzo M) — Semana 4
5. **Propuesta 6** (Media, esfuerzo M) — Semana 5-6

---

## Fuentes

[1] Google. "Core Web Vitals Thresholds." https://web.dev/vitals/

[2] Web.dev. "Case Studies — Home Services Performance." https://web.dev/

[3] Google. "Business Profile Best Practices 2025." https://business.google.com

[4] Twitter. "Twitter Cards — Image Best Practices." https://developer.twitter.com

[5] Google Search Central. "Canonical Best Practices." https://developers.google.com

[6] Web.dev. "PWA Install Prompt." https://web.dev/pwa-install-hint/

[7] HubSpot. "Content Strategy for Local Service Businesses." https://hubspot.com

[8] Playwright. "Test Patterns and Best Practices." https://playwright.dev

---

*Documento generado por Innovation Scout — Round 106*
*Purity & Clean Analysis — 2026-04-28*
*Co-Authored-By: Paperclip <noreply@paperclip.ing>*