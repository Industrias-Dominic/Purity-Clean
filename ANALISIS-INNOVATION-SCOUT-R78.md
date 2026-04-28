# Análisis Creativo — Purity & Clean (Round 78)

**Proyecto:** Purity & Clean
**Fecha:** 2026-04-28
**Analista:** Innovation Scout
**Ronda:** 78
**Issue padre:** DOMAA-685

---

## Resumen Ejecutivo

R78 detecta **gaps críticos de seguridad y performance** que no fueron cubiertos en rondas anteriores. R77 se enfocó en CI/CD Testing (Playwright en pipeline); R78 complementa con headers de seguridad HTTP ausentes, optimización de imágenes, y cumplimiento legal de cookies/localStorage. El sitio usa Formspree para formularios y Plausible Analytics (cookieless), pero no tiene Content Security Policy, X-Frame-Options, ni aviso de uso de localStorage — gaps que expone al sitio a XSS, clickjacking, y problemas legales en Colombia bajo Ley 1581 de datos personales.

---

## Estado Actual del Proyecto (R78)

### Stack Técnico

| Componente | Estado | Notas |
|-----------|--------|-------|
| **Frontend** | HTML5 + CSS3 + Vanilla JS | ~150KB index.html, CSS 6221 líneas, JS vanilla |
| **PWA** | ✅ Implementado | Service Worker con push notifications (sin backend) |
| **Testing** | ✅ Configurado, ❌ No corre en CI | 9 specs Playwright (gap de R77) |
| **SEO** | ✅ Schema.org + OG + Twitter Cards + sitemap | JSON-LD completo |
| **Analytics** | ✅ Plausible (privacy-friendly) | Sin cookies, GDPR compliant |
| **Formularios** | ✅ Formspree | Fallback a simulación |
| **CI/CD** | ✅ Build & Deploy | Sin tests en pipeline (R77) |
| **Theme** | ✅ Dark mode + prefers-color-scheme | localStorage persistence |
| **Security Headers** | ❌ **NO IMPLEMENTADOS** | CSP, X-Frame-Options, HSTS, X-Content-Type-Options |
| **Image Optimization** | ❌ **SOLO SVG** | No hay fotos de servicios/productos |
| **Cookie/Storage Notice** | ❌ **NO EXISTE** | localStorage usado sin consentimiento |

### Gaps Detectados

#### 1. Security Headers Ausentes

El sitio NO tiene configurados headers de seguridad HTTP. Esto expone al sitio a:

| Header | Protección | Estado |
|--------|------------|--------|
| `Content-Security-Policy` | Mitiga XSS, controla recursos | ❌ Ausente |
| `X-Frame-Options` | Previene clickjacking | ❌ Ausente |
| `X-Content-Type-Options` | Previene MIME sniffing | ❌ Ausente |
| `Strict-Transport-Security` | Fuerza HTTPS | ❌ Ausente |
| `Referrer-Policy` | Controla información de referencia | ❌ Ausente |
| `Permissions-Policy` | Controla features del navegador | ❌ Ausente |

**Investigación**: Según web.dev, todos estos headers son recomendados para TODOS los sitios web, especialmente aquellos que manejan datos de usuarios a través de formularios [1].

#### 2. Imágenes Ausentes

El directorio `/images/` solo contiene `og-image.svg` — no hay fotos de:
- Servicios de limpieza (sofás, colchones, alfombras)
- Antes/después de trabajos
- Equipo o instalaciones
- Portfolio visual

**Impacto**: Los "comparison sliders" propuestos en R1-R75 no pueden implementarse sin imágenes reales.

#### 3. Sin Aviso de localStorage

El sitio usa `localStorage` para:
- Preferencia de tema (dark/light)
- Posiblemente otros estados de UI

Bajo la **Ley 1581 de 2012** (Colombia) sobre protección de datos personales, aunque localStorage no son "cookies", el almacenamiento de información del usuario podría requerir notificación. Para compliance GDPR (afecta si tienen usuarios europeos), es aún más estricto.

---

## Investigación: Security Headers para Sites Estáticos (Estado del Arte 2026)

### Configuración Recomendada para GitHub Pages

GitHub Pages no permite configuración de headers custom directamente, pero hayworkarounds:

**Opción A: Usar _headers file (Netlify/Vercel compatible)**
```
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  X-XSS-Protection: 1; mode=block
  Referrer-Policy: strict-origin-when-cross-origin
  Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' https://plausible.io https://cdnjs.cloudflare.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https://plausible.io; frame-ancestors 'none'; base-uri 'self'; form-action 'self' https://formspree.io
```

**Opción B: Headers via _config.yml (Jekyll/GitHub Pages)**
```yaml
webrick:
  headers:
    X-Frame-Options: DENY
    X-Content-Type-Options: nosniff
    X-XSS-Protection: 1; mode=block
    Referrer-Policy: strict-origin-when-cross-origin
```

**Opción C: Service Worker + Meta Tags (PARA CSP)**
 Algunos headers de seguridad pueden implementarse via meta tags, aunque CSP completo requiere headers del servidor.

### Content Security Policy (CSP) para Purity & Clean

Basado en las URLs externas detectadas en el código:

| Recurso | Dominio | Propósito |
|---------|---------|-----------|
| Google Fonts | fonts.googleapis.com, fonts.gstatic.com | Tipografía |
| Font Awesome | cdnjs.cloudflare.com | Iconos |
| Plausible Analytics | plausible.io | Analítica |
| Formspree | formspree.io | Formularios |

CSP recomendado (hash-based para contenido estático):
```
Content-Security-Policy:
  default-src 'self';
  script-src 'self' 'unsafe-inline' https://plausible.io https://cdnjs.cloudflare.com;
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
  font-src 'self' https://fonts.gstatic.com https://cdnjs.cloudflare.com;
  img-src 'self' data: https:;
  connect-src 'self' https://plausible.io https://formspree.io;
  frame-ancestors 'none';
  base-uri 'self';
  form-action 'self' https://formspree.io;
  upgrade-insecure-requests
```

---

## Propuestas (Round 78)

### Propuesta 1: Implementar Security Headers via _config.yml

| Campo | Detalle |
|-------|---------|
| **Título** | Añadir X-Frame-Options, X-Content-Type-Options, Referrer-Policy via Jekyll config |
| **Problema** | **El sitio no tiene headers de seguridad**, exponiéndolo a clickjacking, MIME sniffing, y XSS. Un atacante podría embeber el sitio en un iframe malicioso o inyectar scripts. Esto es crítico para un sitio que maneja datos de contacto a través de formularios. |
| **Descripción** | **Crear/editar `_config.yml` en la raíz del repo:** ```yaml webrick: headers: X-Frame-Options: "DENY" X-Content-Type-Options: "nosniff" X-XSS-Protection: "1; mode=block" Referrer-Policy: "strict-origin-when-cross-origin" ``` Esto añade headers de seguridad básicos en cada página servida por GitHub Pages. **Nota**: GitHub Pages usa Jekyll como build engine, así que esta configuración es nativa. |
| **Impacto esperado** | Protección contra clickjacking, MIME sniffing, y fuga de referrer; cumplimiento de mejores prácticas de OWASP |
| **Esfuerzo** | S (15 minutos — archivo YAML) |
| **Agente recomendado** | Full Stack / DevOps |
| **Referencias** | [1] Security Headers Quick Reference — https://web.dev/articles/security-headers [2] GitHub Pages Jekyll config — https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll |
| **Estado** | Fundamentada — gaps reales de seguridad, solución simple |

---

### Propuesta 2: Configurar Content Security Policy (CSP)

| Campo | Detalle |
|-------|---------|
| **Título** | Implementar CSP hash-based con meta tag para protección XSS |
| **Problema** | **Sin CSP, el sitio es vulnerable a XSS**. Cualquier campo de formulario mal sanitizado o script inyectado puede ejecutarse. El sitio usa Formspree (maneja datos externos) y Plausible (script externo), lo que aumenta la superficie de ataque. |
| **Descripción** | **Añadir meta tag CSP en `<head>` de todos los HTML:** ```html <meta http-equiv="Content-Security-Policy" content=" default-src 'self'; script-src 'self' 'unsafe-inline' https://plausible.io https://cdnjs.cloudflare.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com https://cdnjs.cloudflare.com; img-src 'self' data: https:; connect-src 'self' https://plausible.io https://formspree.io; frame-ancestors 'none'; base-uri 'self'; form-action 'self' https://formspree.io; upgrade-insecure-requests "> ``` **Importante**: Esta CSP permite inline scripts (necesario para el JS vanilla del sitio). Para CSP estricta con nonces, se requeriría refactorizar todo el JS a modules + nonces, lo cual es esfuerzo L. Esta CSP "moderate" es un buen primer paso. |
| **Impacto esperado** | Mitigación de XSS, control de recursos externos cargados, mejor security posture |
| **Esfuerzo** | M (1-2 horas — testing de CSP en staging) |
| **Agente recomendado** | Full Stack / Cyber |
| **Referencias** | [3] CSP MDN Guide — https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CSP [4] CSP Evaluator — https://csp-evaluator.withgoogle.com/ |
| **Estado** | Fundamentada — CSP es best practice recomendado por OWASP y web.dev |

---

### Propuesta 3: Crear Aviso de Consentimiento de Almacenamiento

| Campo | Detalle |
|-------|---------|
| **Título** | Implementar banner de consentimiento para localStorage (GDPR/Ley 1581 compliance) |
| **Problema** | **El sitio usa localStorage para persistir preferencias del tema (dark/light) sin informar al usuario.** Aunque localStorage no son cookies, bajo GDPR (si hay usuarios EU) y como buena práctica bajo la Ley 1581 de Colombia, cualquier almacenamiento de información en el dispositivo del usuario debería ser informado. |
| **Descripción** | **Crear componente `storage-consent.js` + banner HTML:** ```javascript // Mostrar banner si no hay consentimiento previo if (!localStorage.getItem('storage-consent')) { document.getElementById('storage-consent-banner').classList.add('visible'); } // Al aceptar document.getElementById('accept-storage').addEventListener('click', () => { localStorage.setItem('storage-consent', 'true'); localStorage.setItem('theme', savedTheme); // Conservar preferencia document.getElementById('storage-consent-banner').classList.remove('visible'); }); ``` **HTML:** ```html <div id="storage-consent-banner" class="storage-banner" role="dialog" aria-label="Aviso de almacenamiento"> <p>Utilizamos localStorage para guardar tu preferencia de tema (oscuro/claro). No almacenamos datos personales.</p> <button id="accept-storage">Aceptar</button> </div> ``` **CSS:** ```css .storage-banner { position: fixed; bottom: 0; left: 0; right: 0; background: var(--color-surface); border-top: 1px solid var(--color-border); padding: 1rem; text-align: center; z-index: 1000; display: none; } .storage-banner.visible { display: block; } ``` |
| **Impacto esperado** | Compliance legal (GDPR/Ley 1581), confianza del usuario, transparencia |
| **Esfuerzo** | S (1 hora — HTML/CSS/JS) |
| **Agente recomendado** | Frontend |
| **Referencias** | [5] GDPR and localStorage — https://ico.org.uk/for-organisations/guide-to-data-thema/getting-the-right-consent/ |
| **Estado** | Fundamentada — localStorage es almacenamiento del cliente, requiere consentimiento en muchos jurisdictions |

---

### Propuesta 4: Optimización de Imágenes con WebP y Lazy Loading

| Campo | Detalle |
|-------|---------|
| **Título** | Implementar formato WebP + lazy loading nativo para imágenes |
| **Problema** | **El sitio no tiene imágenes de servicios/productos y el OG image es SVG.** Las páginas sin imágenes reales pierden engagement visual. Además, sin lazy loading, las imágenes cargarían innecesariamente afectando Core Web Vitals (LCP). |
| **Descripción** | **Paso 1**: Añadir imágenes reales de servicios (sofás, colchones, antes/después) en formato WebP (50-70% más pequeño que JPEG). **Paso 2**: Implementar lazy loading nativo: ```html <img src="imagen.webp" loading="lazy" alt="Limpieza profunda de sofá antes y después" width="600" height="400"> ``` **Paso 3**: Usar `srcset` para responsive images: ```html <img src="imagen-800.webp" srcset=" imagen-400.webp 400w, imagen-800.webp 800w, imagen-1200.webp 1200w" sizes="(max-width: 600px) 400px, (max-width: 1200px) 800px, 1200px" loading="lazy" alt="..."> ``` **Paso 4**: Añadir `decoding="async"` para no bloquear el main thread. |
| **Impacto esperado** | Mejor LCP (Core Web Vitals), menor uso de bandwidth, mejor engagement visual, implementación de comparison sliders posibles |
| **Esfuerzo** | M (2-3 horas — adquisición de imágenes + código) |
| **Agente recomendado** | Frontend |
| **Referencias** | [6] WebP documentation — https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Image_formats/WebP [7] Lazy loading — https://web.dev/articles/browser-level-image-lazy-loading |
| **Estado** | Fundamentada — gap real detectado (sin imágenes), solución estándar web |

---

### Propuesta 5: Optimización de Core Web Vitals

| Campo | Detalle |
|-------|---------|
| **Título** | Implementar resource hints y optimizaciones de LCP/FID/CLS |
| **Problema** | **El sitio tiene ~150KB de HTML monolithic y carga recursos externos síncronamente.** Esto afecta Core Web Vitals: LCP ( Largest Contentful Paint) suffer por recursos bloqueantes, FID (First Input Delay) por JS síncrono, CLS (Cumulative Layout Shift) por contenido sin dimensiones. |
| **Descripción** | **Mejoras de LCP:** ```html <!-- Preconnect a recursos externos críticos --> <link rel="preconnect" href="https://fonts.googleapis.com"> <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin> <link rel="preconnect" href="https://cdnjs.cloudflare.com"> <!-- Preload del CSS crítico --> <link rel="preload" href="/css/style.css" as="style"> ``` **Mejoras de CLS:** ```html <!-- Dimensiones explícitas en imágenes --> <img src="hero.webp" width="1200" height="630" alt="..."> <!-- Font-display: swap para fuentes --> ``` **Mejoras de FID:** ```html <!-- Async/defer para scripts no críticos --> <script src="/js/script.js" defer></script> ``` **Revisar** `playwright.config.js` para asegurar que `baseURL` y timeouts están optimizados para CI (R77). |
| **Impacto esperado** | Mejor Core Web Vitals (potencialmente 90+ en PageSpeed), mejor SEO, mejor UX |
| **Esfuerzo** | M (2 horas — headers + HTML changes) |
| **Agente recomendado** | Frontend / Full Stack |
| **Referencias** | [8] Core Web Vitals — https://web.dev/articles/vitals [9] Resource Hints — https://web.dev/articles/prefetch-and-prerender |
| **Estado** | Fundamentada — optimización de performance es diferencial de SEO y UX |

---

### Propuesta 6: Implementar Botón de Instalación PWA (Add to Homescreen)

| Campo | Detalle |
|-------|---------|
| **Título** | Añadir prompt de instalación PWA visible y no intrusivo |
| **Problema** | **El sitio tiene Service Worker y manifest.json configurados, pero no solicita al usuario instalar la PWA.** La tasa de conversión de visitantes a "instaled users" es baja porque el banner de instalación nativo de Chrome (que aparece automáticamente) a veces no aparece o aparece en mal momento. Un prompt custom tiene mayor control. |
| **Descripción** | **Implementar deferred prompt handler:** ```javascript let deferredPrompt; window.addEventListener('beforeinstallprompt', (e) => { e.preventDefault(); deferredPrompt = e; // Mostrar botón custom document.getElementById('install-btn').style.display = 'block'; }); document.getElementById('install-btn').addEventListener('click', async () => { if (deferredPrompt) { deferredPrompt.prompt(); const { outcome } = await deferredPrompt.userChoice; console.log(`User response: ${outcome}`); deferredPrompt = null; document.getElementById('install-btn').style.display = 'none'; } }); ``` **Mostrar el botón solo cuando:** 1. No es уже installed (checked via `matchMedia('(display-mode: standalone)'))`) 2. El usuario ha interactuado por >30 segundos 3. No ha dismissado anteriormente |
| **Impacto esperado** | Mayor retention (PWA installed users tienen +50% engagement según Google), experiencia offline, mejor conversión |
| **Esfuerzo** | S (1 hora — JS + CSS) |
| **Agente recomendado** | Frontend |
| **Referencias** | [10] PWA Installability — https://web.dev/articles/pwa-installability |
| **Estado** | Fundamentada — PWA ya está implementado, solo falta el prompt de instalación |

---

## Orden de Implementación Recomendado

| # | Propuesta | Impacto | Esfuerzo | Prioridad |
|---|-----------|---------|----------|-----------|
| 1 | Security Headers (_config.yml) | Seguridad crítica | S (15min) | **Crítica** |
| 2 | CSP Meta Tag | Seguridad XSS | M (1-2h) | **Crítica** |
| 3 | Aviso localStorage | Legal compliance | S (1h) | **Alta** |
| 4 | Resource Hints (preconnect) | Performance | S (30min) | **Alta** |
| 5 | WebP + Lazy Loading | Performance + UX | M (2-3h) | **Media** |
| 6 | PWA Install Prompt | Engagement | S (1h) | **Media** |

**Empezar por #1 y #2 (seguridad), luego #3 (legal), luego #4 (performance), luego #5-6.**

---

## R78 en el Contexto de R1-R77

R78 se enfoca en **Security + Performance** — gaps no cubiertos en ninguna ronda anterior.

| Dimensión | R62-R73 | R74-R76 | R77 | R78 |
|-----------|---------|---------|-----|-----|
| **Tipo** | Features UX/Contenido | Investigación competitiva | **CI/CD Testing** | **Security + Performance** |
| **Foco** | Producto y usuario | Gap competitivo | **Quality assurance** | **Protección + Velocidad** |
| **Complejidad** | S a L | S a M | S a M | **S a M** |
| **Diferenciación** | Feature parity | Diferenciación | **Paridad de calidad** | **Seguridad y velocidad** |

---

## Fuentes

[1] Security Headers Quick Reference. https://web.dev/articles/security-headers
[2] GitHub Pages Jekyll Configuration. https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll
[3] Content Security Policy Guide. https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CSP
[4] CSP Evaluator. https://csp-evaluator.withgoogle.com/
[5] GDPR Consent Guidance. https://ico.org.uk/for-organisations/guide-to-data-thema/getting-the-right-consent/
[6] WebP Image Format. https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Image_formats/WebP
[7] Browser-level Image Lazy Loading. https://web.dev/articles/browser-level-image-lazy-loading
[8] Core Web Vitals. https://web.dev/articles/vitals
[9] Resource Hints. https://web.dev/articles/prefetch-and-prerender
[10] PWA Installability. https://web.dev/articles/pwa-installability

---

*Documento generado por Innovation Scout — Round 78*
*Purity & Clean Analysis — 2026-04-28*
*Co-Authored-By: Paperclip <noreply@paperclip.ing>*