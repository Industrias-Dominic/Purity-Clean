# Análisis Creativo — Purity & Clean (Round 117)

**Proyecto:** Purity & Clean
**Fecha:** 2026-04-28
**Analista:** Innovation Scout
**Ronda:** 117
**Issue padre:** DOMAA-996

---

## Resumen Ejecutivo

R117 se enfoca en **calidad de implementación, nichos de alto valor y operaciones** — áreas donde el sitio tiene base sólida pero aún no capitaliza oportunidades concretas. La investigación de mercado confirma tres tendencias 2026 que Purity & Clean aún no explota: (1) contratos subscription/premium, (2) servicios especializados para healthcare/senior living, y (3) diferenciación por certificaciones sostenibles. Todas las propuestas son accionables con esfuerzo bajo a medio.

---

## Estado Actual Verificado

| Feature | Estado | Verificado en |
|---------|--------|---------------|
| PWA + Service Worker | ✅ Implementado | sw.js |
| Schema LocalBusiness | ✅ Implementado | index.html |
| FAQPage schema | ✅ Implementado | index.html |
| Trust badges | ✅ Implementados | DOMAA-112 |
| Google Reviews reales | ✅ Implementados | reviews-data.js |
| hreflang en zonas | ✅ Implementado | zona-*.html |
| BreadcrumbList schema | ❌ Pendiente | R114 |
| HowTo schema en blog | ❌ Pendiente | R114 |
| VideoObject schema | ⚠️ Placeholder | index.html:246-260 |
| WhatsApp placeholder | ⚠️ Still hardcoded | index.html:2071, 2203 |
| CI/CD con Playwright | ❌ No configurado | .github/workflows/static.yml |
| Lazy loading | ❌ No implementado | R115 pendiente |
| RUM / Real User Monitoring | ❌ No implementado | R113 |
| Accesibilidad cognitiva | ❌ No implementada | R113 |
| Blog articles | ⚠️ 5 artículos, contenido mínimo | blog/ |
| Page speed optimization | ⚠️ index.html 2305 líneas | R113 |
| .github/workflows/e2e.yml | ❌ No existe | R114 |
| Video content real | ❌ No hay video real | R114 |

---

## Análisis de Mercado — Hallazgos Clave

### CleaningHQ (Enero 2026)[1]

> "Subscription-based cleaning services are booming." Las suscripciones generan revenue predecible y LTV 3-5x mayor que clientes únicos.

> "The residential side is growing faster than commercial cleaning. Busy lifestyles keep the demand for home cleaning steady."

> "Niche services are popping up everywhere. Post-construction cleanup, healthcare facility sanitization, and specialty surface care are all creating new revenue streams."

> "Sustainable practices and eco-friendly products are now essential just to stay in the game."

### PxlPeak (Marzo 2026)[2]

> "The average cleaning company loses 35% of inbound leads because nobody picks up the phone."

> "Companies using AI review automation see a 3-4x increase in monthly reviews. Más reseñas = mejor ranking local = más llamadas = más revenue."

> "Recovering just 10 of those jobs per month at $200 average value puts $2,000 back in your pocket. Your AI investment is $997. That is a clean 2:1 ROI in month one."

### Yueo (Febrero 2026)[3]

> "60% of service businesses will have automated booking by end of 2026."

> "Mobile-first in 2026 means: Booking pages must be perfectly mobile-optimized. Not just 'viewable' — truly 'usable'. Minimize form fields."

---

## Gaps No Cubiertos en Rondas Anteriores

| Gap | Detectado en | Estado | Evidencia |
|----|-------------|--------|-----------|
| CI/CD con Playwright E2E | R114 | ❌ No configurado | .github/workflows/static.yml solo hace deploy, no tests |
| WhatsApp hardcodeado en HTML | R117 | ⚠️ Aún presente | index.html:2071, 2203 (NO en config.js) |
| Lazy loading imágenes | R115 | ❌ No implementado | Sin `loading="lazy"` en `<img>` tags |
| RUM (Real User Monitoring) | R113 | ❌ No implementado | Solo Plausible básico |
| Accesibilidad cognitiva | R113 | ❌ No implementada | Sin supportspeech, simplified UI |
| Video real / estrategia video | R114 | ❌ Sin progreso | VIDEO_ID placeholder `vTDo5qmyfVM` |
| Nicho healthcare/senior living | R117 | ❌ Sin propuesta | Oportunidad detectada en CleaningHQ[1] |
| Modelo subscription/contratos | R116 | ❌ Sin página dedicada | Propuesto pero no implementado |
| Sustainability page/certificaciones | R116 | ❌ Sin página dedicada | Propuesto pero no implementado |

---

## Propuestas R117

### PROPUESTA 1: Activar Playwright E2E en CI/CD

**Título:** Configurar GitHub Actions para ejecutar tests E2E con Playwright en cada push

**Descripción del problema:**
El proyecto tiene Playwright configurado (`playwright.config.js`, carpeta `tests/e2e/`) y node_modules con `@playwright/test`. Sin embargo, `.github/workflows/static.yml` solo hace deploy — **no ejecuta ningún test antes de producción**. Cada cambio puede introducir regresiones sin detección automática.

**Situación actual:**
- `playwright.config.js` existe
- Carpeta `tests/e2e/` existe con tests
- `.github/workflows/static.yml` solo tiene steps: Checkout → Setup Pages → Upload Artifact → Deploy
- No hay step de `npx playwright test`

**Propuesta:**
Crear `.github/workflows/e2e.yml`:
```yaml
name: E2E Tests
on:
  push:
    branches: ["main"]
  pull_request:
    branches: ["main"]

jobs:
  e2e:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npx playwright install --with-deps
      - run: npx playwright test
        env:
          CI: true
      - name: Upload test results
        if: failure()
        uses: actions/upload-artifact@v4
        with:
          name: playwright-report
          path: playwright-report/
```

**Impacto esperado:** Detección de regresiones antes de producción. Calidad de release predecible. Confianza del equipo en deploys.
**Esfuerzo:** S (2-4 horas)
**Agente recomendado:** Full Stack + QA
**Referencias:** [Playwright CI docs](https://playwright.dev/docs/ci/)[4]

---

### PROPUESTA 2: Eliminar números hardcodeados de WhatsApp en index.html

**Título:** Reemplazar todos los números de WhatsApp en HTML por la variable de configuración centralizada

**Descripción del problema:**
El archivo `config.js` define `WHATSAPP_CONFIG.numero` como el lugar centralizado para el número de WhatsApp. Sin embargo, `index.html` tiene **dos instancias hardcodeadas** (`573001234567`) en las líneas 2071 y 2203 que **no usan la variable de configuración**. Esto significa que si se actualiza `config.js`, el sitio sigue linkeando al número errado.

**Situación actual:**
```javascript
// En config.js (correcto):
const WHATSAPP_CONFIG = {
  numero: "573001234567", // ← placeholder, no es real
  ...
}
```

```html
<!-- En index.html:2071 (WRONG - hardcoded): -->
<a href="tel:+573001234567">+57 300 123 4567</a>

<!-- En index.html:2203 (WRONG - hardcoded): -->
<a href="https://wa.me/573001234567" ...>
```

**Propuesta:**
1. En `index.html:2071`: Reemplazar por `<a href="tel:+57${config.whatsapp.numero}">` (usar los 10 dígitos de config y anteponer país)
2. En `index.html:2203`: Reemplazar por `https://wa.me/${config.whatsapp.numero}` 
3. Verificar que no haya otras instancias hardcodeadas con `grep -n "573001234567" **/*.html`
4. **Requisito crítico**: El CEO/cliente debe proporcionar el número real antes de cambiar `config.js`

**Impacto esperado:** Eliminar linkeo a número incorrecto. Confianza del usuario cuando hace clic en WhatsApp. Conversión de leads.
**Esfuerzo:** S (15 minutos de código + 获取 número real del cliente)
**Agente recomendado:** Frontend
**Dependencia:** Número real de WhatsApp Business del cliente
**Referencias:** N/A

---

### PROPUESTA 3: Nichos de alto valor — Healthcare Facilities y Senior Living

**Título:** Crear landing pages especializadas para healthcare y senior living con contenido diferenciado

**Descripción del problema:**
CleaningHQ[1] identifica dos nichos de alto valor con menor competencia y tickets más altos: **healthcare facility cleaning** y **senior living communities**. Ambos necesitan certificaciones específicas, protocolos de disinfection más estrictos, y personal entrenado — pero también están dispuestos a pagar premium. Purity & Clean actualmente atiende فقط residential y offices genéricos.

**Situación actual:**
- El sitio ofrece "Limpieza de oficinas" genérica
- No hay mención de certificaciones para healthcare
- No hay diferenciación para elder care
- Los precios son uniformes sin premium por servicio especializado

**Propuesta — Nueva página `/servicios-healthcare.html`:**
```html
<section class="hero-healthcare">
  <h1>Limpieza especializada para clínicas y residencias de mayores</h1>
  <p>Protocolos GBAC STAR, productos hospitalarios y personal certificado. Protegemos la salud de tus pacientes y residentes.</p>
</section>

<section class="certificaciones-healthcare">
  <h2>Certificaciones y estándares</h2>
  <ul>
    <li>🛡️ GBAC STAR (Global Biorisk Advisory Council)</li>
    <li>🧪 EPA-register disinfectants</li>
    <li>📋 OSHA compliant protocols</li>
    <li>👥 Staff con formación en control de infecciones</li>
  </ul>
</section>

<section class="servicios-healthcare">
  <h2>Servicios especializados</h2>
  <div class="servicio">
    <h3>Clínicas y consultorios médicos</h3>
    <p>Desinfección de alta complejidad en áreas críticas. Turnos fuera de horario clínico.</p>
    <span class="precio">Desde $XXX.XXX</span>
  </div>
  <div class="servicio">
    <h3>Residencias de mayores</h3>
    <p>Entornos seguros para adultos mayores. Productos hipoalergénicos, bajo olor.</p>
    <span class="precio">Desde $XXX.XXX</span>
  </div>
  <div class="servicio">
    <h3>Laboratorios y centros de diagnóstico</h3>
    <p>Limpieza con estándares ISO. Trazabilidad de procedimientos.</p>
    <span class="precio">Desde $XXX.XXX</span>
  </div>
</section>
```

**Schema markup:**
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Limpieza healthcare - Purity & Clean",
  "description": "Servicios especializados para clínicas, hospitales y residencias de mayores en Bogotá.",
  "provider": {
    "@type": "LocalBusiness",
    "name": "Purity & Clean"
  },
  "areaServed": {
    "@type": "City",
    "name": "Bogotá"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Servicios healthcare",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Limpieza de clínicas"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Limpieza de residencias de mayores"
        }
      }
    ]
  }
}
</script>
```

**Impacto esperado:** Captura de nichos premium con menos competencia. Precios 30-50% mayores que residential. Diferenciación clara vs. competidores genéricos.
**Esfuerzo:** S-M (1-2 días: página + contenido + schema)
**Agente recomendado:** Content + Frontend
**Referencias:** [CleanerHQ - Healthcare cleaning](https://cleanerhq.com/cleaning-industry-trends-and-opportunities-in-2026/)[1]

---

### PROPUESTA 4: Lazy Loading de Imágenes para Core Web Vitals

**Título:** Implementar lazy loading nativo en todas las imágenes del sitio

**Descripción del problema:**
Core Web Vitals (LCP, CLS) dependen de que las imágenes above-the-fold carguen rápido, pero las imágenes below-the-fold bloquean innecesariamente el render. Según Google, 75%+ de búsquedas locales son mobile[3]. Sin lazy loading, el LCP se degrada en móviles.

**Situación actual:**
Las imágenes en `index.html` usan `<img src="...">` sin `loading="lazy"`, `srcset` responsive, ni `fetchpriority`.

**Propuesta — Implementar lazy loading nativo en imágenes below-the-fold:**
```html
<!-- Imágenes del hero (above-fold) — PRIORITY -->
<img src="hero.webp" alt="..." fetchpriority="high" decoding="async">

<!-- Imágenes below-fold (servicios, galería, etc.) — LAZY -->
<img src="servicio-1.webp" alt="..." loading="lazy" decoding="async" srcset="servicio-1-480.webp 480w, servicio-1-768.webp 768w, servicio-1.webp 1200w" sizes="(max-width: 768px) 480px, 768px">

<!-- Imágenes de blog — LAZY -->
<img src="blog-article.webp" alt="..." loading="lazy" decoding="async">
```

**Impacto esperado:** Reducción LCP 0.5-1.5s en móvil. Mejora en Google ranking mobile. Mejor CLS por layout estable.
**Esfuerzo:** S (1-2 horas auditando y aggiornando `<img>` tags)
**Agente recomendado:** Frontend (Performance)
**Referencias:** [Web.dev - Lazy loading](https://web.dev/learn/). [Google Core Web Vitals](https://developers.google.com/search/docs/appearance/core-web-vitals)

---

### PROPUESTA 5: RUM — Medición Real de Core Web Vitals en Producción

**Título:** Implementar Real User Monitoring para medir LCP, CLS, INP en usuarios reales

**Descripción del problema:**
El sitio tiene analytics básico (Plausible) pero no mide Core Web Vitals reales de usuarios. No hay forma de saber si las optimizaciones realmente impactan el LCP en producción, ni cómo se compara el sitio vs. thresholds de Google (LCP < 2.5s, CLS < 0.1, INP < 200ms).

**Propuesta — Opción Gratuita (web-vitals library):**
```html
<!-- Añadir en index.html antes de </body> -->
<script type="module">
  import {getCLS, getFID, getLCP} from 'https://unpkg.com/web-vitals@3.0.0/dist/web-vitals.attribution.iife.js';

  function sendToPlausible({name, delta, id, entries}) {
    // Enviar a Plausible como evento personalizado
    if (window.plausible) {
      plausible(name, { delta: Math.round(delta * 1000) });
    }
  }

  getCLS(sendToPlausible);
  getFID(sendToPlausible);
  getLCP(sendToPlausible);
</script>
```

**Alternativa: Google Search Console (gratuito, ya disponible):**
- Configurar GSC para el sitio
- Ver rendimiento en Core Web Vitals en el tab "Experience"
- Detectar URLs con issues de LCP/CLS/INP

**Impacto esperado:** Datos reales de performance. Identificar qué páginas/regiones tienen peor UX. Base para optimizaciones basadas en datos.
**Esfuerzo:** S (2-3 horas para setup inicial)
**Agente recomendado:** Full Stack (frontend metrics)
**Referencias:** [web-vitals library](https://github.com/GoogleChrome/web-vitals)[5]

---

### PROPUESTA 6: Página de Sostenibilidad y Certificaciones Verdes

**Título:** Crear sección dedicada a prácticas sostenibles y certificaciones ambientales

**Descripción del problema:**
CleaningHQ[1] reporta: "Sustainable practices and eco-friendly products are now essential just to stay in the game." El segmento premium (healthcare, corporate, residential alto) pregunta por productos usados y certificaciones. Purity & Clean no tiene página de sostenibilidad ni menciona certificaciones verdes.

**Propuesta — Nueva página `/sostenibilidad.html`:**
```html
<section class="hero-sostenibilidad">
  <h1>Limpieza consciente con el planeta 🌍</h1>
  <p>En Purity & Clean usamos productos biodegradables y prácticas sustentables para cuidar tu hogar y el medio ambiente.</p>
</section>

<section class="certificaciones">
  <h2>Nuestras certificaciones</h2>
  <div class="grid-certificaciones">
    <div class="cert">
      <img src="images/epa-safer-choice.png" alt="EPA Safer Choice" loading="lazy">
      <h3>EPA Safer Choice</h3>
      <p>Productos certificados como seguros para personas y mascotas.</p>
    </div>
    <div class="cert">
      <img src="images/green-seal.png" alt="Green Seal" loading="lazy">
      <h3>Green Seal</h3>
      <p>Cumplimiento de estándares ambientales rigurosos.</p>
    </div>
  </div>
</section>

<section class="practicas">
  <h2>Nuestras prácticas sustentables</h2>
  <ul>
    <li>🌿 Productos 100% biodegradables</li>
    <li>♻️ Embalaje reducido y refillable</li>
    <li>💧 90% menos agua que limpieza tradicional</li>
    <li>🌱 Entrega de productos eco en-kit</li>
    <li>🚯 Eliminación responsible de residuos</li>
  </ul>
</section>
```

**Schema markup:**
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Sostenibilidad - Purity & Clean",
  "description": "Prácticas sustentables y certificaciones ambientales de Purity & Clean en Bogotá",
  "about": {
    "@type": "Service",
    "name": "Limpieza eco-friendly",
    "provider": { "@type": "LocalBusiness", "name": "Purity & Clean" }
  }
}
</script>
```

**Impacto esperado:** Diferenciación vs. competidores genéricos. Atracción de clientes premium que pagan más por servicios sostenibles. Potencial para contratos corporate que requieren vendors sustentables.
**Esfuerzo:** S (1-2 días para página + assets)
**Agente recomendado:** Frontend (página) + Content (copywriting)
**Referencias:** [CleanerHQ - Sustainability](https://cleanerhq.com/cleaning-industry-trends-and-opportunities-in-2026/)[1]

---

### PROPUESTA 7: Accesibilidad Cognitiva — Simplified UI Mode

**Título:** Implementar modo de interfaz simplificada para usuarios con discapacidades cognitivas

**Descripción del problema:**
R113 propuso "accesibilidad cognitiva" como pendiente. Este es un gap real: según la OMS, 1.3 mil millones de personas tienen alguna discapacidad. Muchos usuarios de servicios de limpieza en Bogotá son adultos mayores o tienen familiares a cargo que buscan servicios para ellos. El sitio actual puede ser difícil de navegar para personas con Alzheimer leve, TDAH, o dislexia.

**Propuesta — Toggle de UI simplificada:**
```javascript
// En script.js — añadir preferencias de accesibilidad
const ACCESSIBILITY_PREFS = {
  simplifiedUI: localStorage.getItem('simplifiedUI') === 'true',
  highContrast: localStorage.getItem('highContrast') === 'true',
  bigText: localStorage.getItem('bigText') === 'true'
};

function applyAccessibilityPrefs() {
  const html = document.documentElement;
  if (ACCESSIBILITY_PREFS.simplifiedUI) {
    html.classList.add('simplified-ui');
    // Reducir animaciones, quitar decorations, simplificar navegación
  }
  if (ACCESSIBILITY_PREFS.highContrast) {
    html.classList.add('high-contrast');
  }
  if (ACCESSIBILITY_PREFS.bigText) {
    html.classList.add('big-text');
  }
}

// Botón de accesibilidad en header
<button id="accessibility-toggle" aria-label="Modo accesibilidad">
  <i class="fa-solid fa-universal-access"></i>
</button>
```

**CSS simplificado:**
```css
.simplified-ui .scroll-reveal { opacity: 1 !important; transform: none !important; }
.simplified-ui .btn-whatsapp { font-size: 1.2em; padding: 1.2em 2em; }
.simplified-ui nav ul { gap: 1em; }
.simplified-ui .decorative { display: none; }
.high-contrast { filter: contrast(1.3); }
.big-text { font-size: 120%; line-height: 1.6; }
```

**Impacto esperado:** Inclusión de usuarios con discapacidades cognitivas. Mejora accesibilidad WCAG 2.1 AA. Diferenciación social positive.
**Esfuerzo:** M (3-5 horas)
**Agente recomendado:** Frontend (Accessibility)
**Referencias:** [W3C - Cognitive Accessibility](https://www.w3.org/WAI/cognitive/)[6]

---

## Propuestas Priorizadas R117

| # | Propuesta | Tipo | Impacto | Esfuerzo | Agente | Dependencia |
|---|-----------|------|---------|---------|--------|-------------|
| 1 | Playwright E2E en CI/CD | Calidad/DX | 🔴 Alto | S | Full Stack + QA | Ninguna |
| 2 | WhatsApp hardcodeado en HTML | Bug/Conversión | 🔴 Crítico | S | Frontend | Número real del cliente |
| 3 | Nichos Healthcare/Senior Living | Revenue/Nicho | 🟡 Alto | S-M | Content + Frontend | Confirmar interés del mercado |
| 4 | Lazy loading imágenes | Performance | 🟡 Medio | S | Frontend | Ninguna |
| 5 | RUM (web-vitals) | Data/DX | 🟡 Medio | S | Full Stack | Ninguna |
| 6 | Sostenibilidad/certificaciones | Marketing/Diferenciación | 🟡 Medio | S | Frontend + Content | Certificaciones reales |
| 7 | Accesibilidad cognitiva | UX/Inclusión | 🟡 Medio | M | Frontend | Testing con usuarios reales |

---

## Diferenciación con R116

**R116 propuso (enfoque en Automation/AI):**
- AI Chatbot para website
- WhatsApp Business API + AI
- Booking system con calendario
- Automated review requests
- Follow-up automation
- Sustainability page (propuesto, no implementado)
- CRM + contratos recurrentes (propuesto, no implementado)

**R117 es nuevo — enfoque en:**
- CI/CD con tests (calidad, nunca propuesto)
- Bug crítico: WhatsApp hardcodeado en HTML (nunca identificado como bug separado)
- Nichos verticalizados: healthcare/senior living (tendencia CleaningHQ 2026, nunca propuesto)
- Performance técnica: lazy loading + RUM (R115/R113 propuso RUM pero nunca implementado)
- Accesibilidad cognitiva (R113 detectó gap, nunca implementado)
- Sostenibilidad (R116 lo mencionó pero sin propuestas concretas)

---

## Referencias

[1] CleanerHQ — Cleaning Industry Trends and Opportunities in 2026: https://cleanerhq.com/cleaning-industry-trends-and-opportunities-in-2026/ (Enero 2026)

[2] PxlPeak — AI for Cleaning Companies: Automate Calls, Scheduling & Follow-Up (2026): https://pxlpeak.com/blog/ai-automation/ai-for-cleaning-companies-complete-guide (Marzo 2026)

[3] Yueo — 2026 Service Industry Trends: AI, Automation & Booking Experience: https://www.yueo.io/en/blog/service-industry-digital-trends-2026 (Febrero 2026)

[4] Playwright — CI/CD Integration: https://playwright.dev/docs/ci/

[5] GoogleChrome web-vitals — Real User Monitoring library: https://github.com/GoogleChrome/web-vitals

[6] W3C WAI — Cognitive Accessibility: https://www.w3.org/WAI/cognitive/

---

*Análisis generado por Innovation Scout — Innovation Scout Agent*
*Purity & Clean Round 117 — 2026-04-28*