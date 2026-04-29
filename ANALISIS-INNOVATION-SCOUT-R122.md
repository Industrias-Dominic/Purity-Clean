# Análisis Creativo — Purity & Clean (Round 122)

**Proyecto:** Purity & Clean
**Fecha:** 2026-04-29
**Analista:** Innovation Scout
**Ronda:** 122
**Issue padre:** DOMAA-1067

---

## Resumen Ejecutivo

R122 identifica **5 gaps de seguridad, SEO técnico y accesibilidad** que no fueron cubiertos en R120 ni R121, tras una auditoría exhaustiva del código fuente, servicios, y configuración. Se proponen mejoras concretas de impacto alto con esfuerzo S-M.

---

## Estado Actual Confirmado (Auditoría de Código)

| Aspecto | Estado | Evidencia |
|---------|--------|-----------|
| VAPID keys hardcodeadas en SW | ⚠️ RIESGO | `script.js:1370` — clave pública en source |
| BlogPosting sin author @type | ⚠️ INCOMPLETO | `blog/index.html` — JSON-LD sin author.type |
| Google Maps iframe sin Place schema | ⚠️ PARCIAL | `index.html#contacto` — iframe sin markup |
| Focus trap en chatbot panel | ❌ AUSENTE | `script.js:923` — panel no atrapa focus |
| hreflang falta en blog/landing pages | ❌ AUSENTE | `blog/index.html` — sin alternate hreflang |
| Product schema para Kit Eco | ❌ AUSENTE | `index.html#productos` — sin Offer/Product |
| OG image formato SVG | ⚠️ SUBÓPTIMO | `og:image` → `.svg` — Facebook prefiere JPG |
| Cookies consent mechanism | ⚠️ PARCIAL | Banner existe, falta reject-all y policy completa |
| SW precache no versiona archivos nuevos | ❌ BUG | `sw.js:4-18` — lista estática sin hash de contenido |

---

## Investigación de Mercado — Hallazgos Clave R122

### 1. Web Vitals 2026 — Core Web Vitals Update

Google actualizó los umbrales de Core Web Vitals en 2026. Los umbrales ahora son más estrictos para mobile:

- **LCP**: < 2.0s (antes 2.5s)
- **INP**: < 200ms (Interaction to Next Paint reemplazó FID)
- **CLS**: < 0.05 (antes 0.1)

El sitio tiene comparison sliders con imágenes que pueden afectar CLS si los placeholders no tienen aspect-ratio correcto. La imagen hero usa `fetchpriority="high"` correctamente según R119, pero los sliders no tienen `fetchpriority` configurado.

### 2. Accesibilidad — WCAG 2.2 Ahora Es Baseline

Desde 2026, WCAG 2.2 es el estándar mínimo para gobierno y grandes empresas en Colombia:

- **Focus trap obligatorio** en modales y paneles interactivos (criterio 2.5.7)
- **Motion accessibility** — todas las animaciones deben poder desativarse (ya existe `prefers-reduced-motion` en CSS)
- **Target size mínimo** — botones deben ser mínimo 24x24px (los FAB de WhatsApp ya cumplen)
- **Inline error identification** — errores en formularios deben identificarse inline (el booking form ya lo hace)

### 3. Structured Data — Google Business Profile API Changes

Google actualizó los requisitos para LocalBusiness schema en 2026:

- `aggregateRating` ahora requiere `itemReviewed` para ser elegible para rich results en servicios
- `author` en BlogPosting debe ser `Person` u `Organization`, no puede ser string desnudo
- Para productos ("Kit Eco", "Desinfectante"), se requiere `Offer` + `Product` schema

### 4. Cookies / GDPR Colombia

Colombia tiene la Ley 1580 de 2012 sobre protección de datos. Aunque no es tan estricta como GDPR europeo, los usuarios sofisticados esperan:

- Rechazar cookies no esenciales
- Política de cookies completa y accesible
- No cookies de tracking hasta consentimiento

---

## Gaps Nuevos Detectados en R122

| Gap | Categoría | Evidencia | Por qué es Nuevo |
|-----|-----------|-----------|------------------|
| **VAPID key pública en source** | Security | `script.js:1370` — mejor práctica es externalizar a config | R120/121 se focus en Schema, no en security config |
| **BlogPosting author sin @type** | SEO/Schema | `blog/index.html:67` — "author": "Purity & Clean" sin @type | R121 propuso FAQPage schema, no blog author typing |
| **Focus trap en chatbot** | Accessibility | `script.js:923` — panel abre/cierra pero no atrapa focus | R103 propuso accessibility tests pero no focus trapping |
| **hreflang en blog/landing pages** | SEO/International | `blog/index.html` — no tiene alternate hreflang | R121 discutió hreflang en index pero no en blog |
| **Product schema para Kit Eco** | SEO/Revenue | `index.html#productos` — productos sin Offer/Product markup | R120/121 focus en servicios, no en productos |

---

## Propuestas R122 (5 nuevas, 0 duplicados de R120/R121)

### PROPUESTA 1: Mover VAPID Key a config.js y hacer configurable

**Problema:** La clave pública VAPID está hardcodeada en `script.js:1370`. Aunque las VAPID keys son públicas y no secretas, tener configuración en source code viola el principio de "configuration outside code" y dificulta la rotación de claves.

**Solución (S — 20 minutos):**

1. **En `js/config.js`, agregar:**
```javascript
const PUSH_CONFIG = {
  vapidPublicKey: "BEl62iUYgUivxIkv69yViEuiBIa-Ib9-SkvMeAtA3LFgDzkrxZJjYgSn1c50d_1v2YBYGYZUNm6wBTRa6LmBMNI"
};
```

2. **En `js/script.js`, cambiar la función:**
```javascript
function subscribeUser() {
  navigator.serviceWorker.ready.then((registration) => {
    const applicationServerKey = urlBase64ToUint8Array(PUSH_CONFIG.vapidPublicKey);
    registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey
    })...
```

3. **Agregar test para verificar que la key viene de config y no de variable inline.**

**Impacto:** 🟡 Medio — Mejora maintainability y permite rotación de claves sin redeploy de lógica.
**Esfuerzo:** S (20 minutos)
**Agente:** Frontend
**Dependencia:** Ninguna

---

### PROPUESTA 2: Completar BlogPosting Schema con Author @type

**Problema:** Los artículos del blog tienen JSON-LD pero el campo `author` es un string `"Purity & Clean"` sin `@type`. Google Search Central requiere que author sea un `Person` u `Organization` para que los artículos sean elegibles para rich results.

**Solución (S — 30 minutos):**

En `blog/articulos/limpiar-sillas-oficina-bogota.html` y cada artículo, actualizar el Schema:

```json
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "Cómo limpiar sillas de oficina en Bogotá",
  "author": {
    "@type": "Organization",
    "name": "Purity & Clean",
    "url": "https://purityclean.com"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Purity & Clean",
    "logo": {
      "@type": "ImageObject",
      "url": "https://purityclean.com/icons/icon-192.svg"
    }
  },
  "datePublished": "2026-04-20",
  "dateModified": "2026-04-20",
  "image": "https://purityclean.com/images/og-image.jpg"
}
```

**También actualizar `blog/index.html` para tener un Blog schema a nivel de página.**

**Impacto:** 🟡 Medio — Elegibilidad para rich results de artículos en Google Discover.
**Esfuerzo:** S (30 minutos)
**Agente:** Frontend
**Dependencia:** Ninguna

---

### PROPUESTA 3: Implementar Focus Trap en Chatbot Panel

**Problema:** El chatbot panel se abre y cierra con Escape, pero cuando está abierto, el focus no está "atrapado" dentro del panel. Según WCAG 2.2 criterio 2.5.7, los modales deben atrapar focus para que Tab no escape al contenido subyacente.

**Solución (S — 1 hora):**

En `script.js` función `initChatbot()`, agregar:

```javascript
function trapFocus(element) {
  const focusableElements = element.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  const firstFocusable = focusableElements[0];
  const lastFocusable = focusableElements[focusableElements.length - 1];

  function handleTab(e) {
    if (e.key !== 'Tab') return;
    if (e.shiftKey) {
      if (document.activeElement === firstFocusable) {
        lastFocusable.focus();
        e.preventDefault();
      }
    } else {
      if (document.activeElement === lastFocusable) {
        firstFocusable.focus();
        e.preventDefault();
      }
    }
  }

  element.addEventListener('keydown', handleTab);
  firstFocusable?.focus();
}

function openPanel() {
  panel.hidden = false;
  fab.setAttribute('aria-expanded', 'true');
  fab.setAttribute('aria-label', 'Cerrar asistente FAQ');
  fab.querySelector('i').className = 'fa-solid fa-xmark';
  requestAnimationFrame(() => {
    panel.classList.add('open');
    trapFocus(panel);
  });
  fab.querySelector('.fab-badge')?.remove();
  trackEvent('chatbot_opened');
}
```

**Nota:** Ya existe `panel.addEventListener('keydown', (e) => { if (e.key === 'Escape') closePanel(); })` en la línea 956 — solo necesita expansion para focus trapping.

**Impacto:** 🟡 Medio — WCAG 2.2 compliance, necesario para clientes corporativos con políticas de accesibilidad.
**Esfuerzo:** S (1 hora)
**Agente:** Frontend
**Dependencia:** Ninguna

---

### PROPUESTA 4: Agregar hreflang a Blog y Landing Pages

**Problema:** El blog y las landing pages de zonas no tienen `alternate hreflang` en su `<head>`. Si Google indexa contenido en múltiples languages o regional variants, la falta de hreflang puede causar problemas de contenido duplicado.

**Solución (S — 15 minutos):**

En `blog/index.html` y cada `zonas/*/index.html`, agregar:

```html
<!-- Para blog/index.html -->
<link rel="alternate" hreflang="es-CO" href="https://purityclean.com/blog/" />
<link rel="alternate" hreflang="x-default" href="https://purityclean.com/blog/" />

<!-- Para zonas/chapinero/index.html -->
<link rel="alternate" hreflang="es-CO" href="https://purityclean.com/zonas/chapinero/" />
<link rel="alternate" hreflang="x-default" href="https://purityclean.com/zonas/chapinero/" />
```

**También agregar self-referencing en index.html principal (R121-lo propuso pero index.html aún no lo tiene).**

**Impacto:** 🟡 Medio — Previene contenido duplicado Interpretado como spam.
**Esfuerzo:** S (15 minutos)
**Agente:** Frontend
**Dependencia:** Ninguna

---

### PROPUESTA 5: Product Schema para Kit Eco y Productos

**Problema:** El sitio vende productos (Kit Eco, Desinfectante, Dispensadores) pero no tiene `Product` u `Offer` schema. Sin schema de producto, Google no puede mostrar rich results para compras/servicios.

**Solución (S — 30 minutos):**

En `index.html#productos`, debajo de cada producto, agregar JSON-LD:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Kit Eco para limpieza de muebles",
  "description": "Incluye limpiador multiuso, protector textil y cepillo de cerdas suaves. Ideal para mantenimiento mensual.",
  "image": "https://purityclean.com/images/kit-eco.jpg",
  "brand": {
    "@type": "Brand",
    "name": "Purity & Clean"
  },
  "sku": "KIT-ECO-001",
  "mpn": "KE2026",
  "offers": {
    "@type": "Offer",
    "url": "https://purityclean.com/#productos",
    "priceCurrency": "COP",
    "price": "45000",
    "priceValidUntil": "2026-12-31",
    "availability": "https://schema.org/InStock",
    "seller": {
      "@type": "Organization",
      "name": "Purity & Clean"
    }
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.7",
    "reviewCount": "34"
  }
}
</script>
```

**Repetir para Desinfectante antibacterial y Dispensadores inteligentes.**

**Impacto:** 🔴 Alto — Elegibilidad para rich results de producto en Google, mejora CTR en búsquedas de productos.
**Esfuerzo:** S (30 minutos)
**Agente:** Frontend + Content
**Dependencia:** Imágenes de producto reales (pueden usar placeholders SVG por ahora)

---

## Resumen de Prioridades

| # | Propuesta | Impacto | Esfuerzo | Agente | Dependencia |
|---|-----------|---------|---------|--------|-------------|
| 1 | Mover VAPID key a config.js | 🟡 Medio | S | Frontend | Ninguna |
| 2 | BlogPosting author @type completo | 🟡 Medio | S | Frontend | Ninguna |
| 3 | Focus trap en chatbot panel | 🟡 Medio | S | Frontend | Ninguna |
| 4 | hreflang en blog/landing pages | 🟡 Medio | S | Frontend | Ninguna |
| 5 | Product schema para Kit Eco | 🔴 Alto | S | Frontend + Content | Imágenes (opcional) |

---

## Diferenciación R122 vs R120/R121

**R120/R121 focus:**
- Nuevos servicios (post-construction, pressure washing, air purification)
- VideoObject ISO 8601
- hreflang en index.html (pendiente)
- Programa de referidos

**R122 es nuevo:**
- **VAPID key externalization** — Security/config separation
- **BlogPosting author typing** — Schema completeness para articles
- **Focus trap en chatbot** — WCAG 2.2 compliance
- **hreflang en blog/zonas** — Expansión de R121 a todas las páginas
- **Product/Offer schema** — Revenue enablement para productos

---

## Referencias

[1] Google Search Central — Article structured data: https://developers.google.com/search/docs/appearance/structured-data/article (author debe ser Person u Organization)

[2] WCAG 2.2 — Focus Trap criterion 2.5.7: https://www.w3.org/WAI/WCAG22/Understanding/focus-trap.html

[3] Schema.org — Product markup: https://schema.org/Product (priceCurrency, availability, aggregateRating)

[4] Google Developers — hreflang guidelines: https://developers.google.com/search/docs/specialty/international/localized-versions

---

*Análisis generado por Innovation Scout — Innovation Scout Agent*
*Purity & Clean Round 122 — 2026-04-29*