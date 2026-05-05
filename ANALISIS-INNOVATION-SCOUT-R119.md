# Análisis Creativo — Purity & Clean (Round 119)

**Proyecto:** Purity & Clean
**Fecha:** 2026-04-29
**Analista:** Innovation Scout
**Ronda:** 119
**Issue padre:** DOMAA-1057

---

## Resumen Ejecutivo

R119 detecta **5 gaps técnicos no identificados en R1-R118** después de auditar el código fuente y la investigación de mercado. Se confirman implementaciones ya existentes (lazy loading, FAQPage schema, critical CSS) y se proponen mejoras concretas de alto impacto que no requieren dependencias externas significativas.

---

## Estado Actual Confirmado (Auditoría de Código)

| Aspecto | Estado | Evidencia |
|---------|--------|-----------|
| Lazy loading imágenes | ✅ IMPLEMENTADO | `loading="lazy"`, `decoding="async"`, `srcset` en todas las imágenes del hero y below-fold |
| FAQPage Schema.org | ✅ IMPLEMENTADO | `index.html:177` — `{"@type":"FAQPage"}` presente |
| Critical CSS async load | ✅ IMPLEMENTADO | `index.html:266` — `<link rel="preload" as="style" href="css/critical.css" onload="...">` |
| PWA manifest | ✅ IMPLEMENTADO | `manifest.json` con shortcuts, icons, theme_color |
| WhatsApp config.js | ⚠️ PLACEHOLDER | `"numero": "573001234567"` — ficticio |
| WhatsApp HTML hardcodeado | ❌ NO ARREGLADO | R118 propuso fix, NO implementado |
| WhatsApp manifest.json | ❌ PLACEHOLDER | `"url": "https://wa.me/573001234567"` — línea 54 manifest |
| SW Cache versioning | ❌ BUG CRÍTICO | `CACHE_NAME = 'purity-clean-v1'` hardcodeado — nunca cambia |
| hreflang en index.html | ❌ AUSENTE | Zonas tienen hreflang; index.html NO tiene etiquetas hreflang |
| Hero LCP image | ⚠️ SIN OPTIMIZAR | No se detecta `fetchpriority="high"` en imagen hero |
| Site desplegado | ❌ NO | purityclean.com → Transport error |

---

## Investigación de Mercado — Fuentes 2026

### HubSpot: The 2026 State of Marketing

1. **AI es baseline, no diferenciador** — 80% usa AI para contenido, 75% para producción media [1]
2. **Brand POV es motor de crecimiento** — POV distintivo genera confianza en mercados saturados
3. **Human-led marketing gana confianza** — Contenido humano autentico supera contenido AI

### Ahrefs: Local SEO Complete Guide

1. **Google Business Profile** — 36% de SEOs lo considera el factor #1 para map pack [2]
2. **Reviews** — 17% lo considera más importante para map pack; 78% visita negocio dentro de 24h de búsqueda local
3. **30% de búsquedas móviles son relacionadas a ubicación**
4. **Clientes 70% más propensos a visitar negocio con perfil GBP completo**

---

## Gaps Nuevos Detectados en R119

| Gap | Categoría | Evidencia | Por qué no se propuso antes |
|-----|-----------|-----------|---------------------------|
| **SW cache versioning** | PWA/Performance | `sw.js:1` — CACHE_NAME hardcodeado como string estático | R1-R118 se enfocaron en features, no en bugs PWA |
| **hreflang ausente en index** | SEO | index.html no tiene hreflang; zonas sí | Auditoría de código requerida para detectar |
| **Hero sin fetchpriority** | Performance/Core Web Vitals | LCP image no tiene `fetchpriority="high"` | Requiere inspección de img tags |
| **WhatsApp en manifest.json** | Bug | `manifest.json:54` — URL ficticia en shortcut | R118 vio WhatsApp en HTML, no en manifest |
| **Zonas sin navegación visible** | UX/Navegación | Zonas existen pero no hay menú ni link desde header | Propuesta como landing pages, no como nav |

---

## Propuestas R119 (5 nuevas, 0 duplicados)

### PROPUESTA 1: Fix Critical PWA — Cache Versioning Automático

**Problema:** `CACHE_NAME = 'purity-clean-v1'` nunca cambia. Cuando se despliega una actualización, los usuarios con Service Worker activo siguen viendo la versión cacheada vieja. Esto causa:
- Usuarios ven contenido obsoleto
- Bugs persisten hasta que usuario limpia cache manualmente
- PWA no funciona como debería

**Solución (S — 1 hora):**

```javascript
// sw.js — CAMBIAR línea 1 de:
const CACHE_NAME = 'purity-clean-v1';
// A:
const CACHE_NAME = `purity-clean-v${Date.now()}`;

// O mejor, usar hash del archivo para versionado determinista:
const CACHE_NAME = 'purity-clean-v1.0.0'; // Incrementar en cada deploy
```

**Para versionado robusto con cache busting:**
```javascript
const CACHE_VERSION = 'v1';
const RUNTIME_CACHE = `purity-clean-runtime-${CACHE_VERSION}`;

// En install event:
caches.open(`purity-clean-static-${CACHE_VERSION}`)

// En activate event:
// Limpiar TODAS las caches viejas, no solo las que no coincidan exactamente
```

**Impacto:** 🔴 Crítico — PWA roto para usuarios recurrentes
**Esfuerzo:** S (1 hora)
**Agente:** Frontend
**Dependencia:** Ninguna — solo modificar sw.js

---

### PROPUESTA 2: hreflang en index.html + x-default

**Problema:** El index.html principal no declara hreflang, pero las 10 páginas de zonas sí lo tienen. Google puede confundir el idioma o región del sitio principal.

**Solución (S — 30 minutos):**

Agregar en `<head>` del index.html, después de los otros meta tags:

```html
<link rel="alternate" hreflang="es" href="https://purityclean.com/">
<link rel="alternate" hreflang="es-co" href="https://purityclean.com/">
<link rel="alternate" hreflang="x-default" href="https://purityclean.com/">
```

**Impacto:** 🟡 Medio — Mejora SEO local para Colombia
**Esfuerzo:** S (30 minutos)
**Agente:** Frontend
**Dependencia:** Ninguna

---

### PROPUESTA 3: Hero Image LCP Optimization con fetchpriority

**Problema:** La imagen hero (above-the-fold) no tiene `fetchpriority="high"`, lo que puede afectar Core Web Vitals LCP. Según Google, imágenes hero sin fetchpriority pueden cargar después de otros recursos, retrasando el LCP.

**Solución (S — 15 minutos):**

```html
<!-- Buscar la imagen hero en index.html y agregar: -->
<img src="hero.webp"
     alt="..."
     fetchpriority="high"
     loading="eager"
     decoding="sync"
     width="800" height="600">
```

**Nota:** Esta es la ÚNICA imagen que debe tener `loading="eager"` — todas las demás ya tienen `loading="lazy"`.

**Impacto:** 🟡 Medio — Mejora LCP y Core Web Vitals
**Esfuerzo:** S (15 minutos auditando img tags)
**Agente:** Frontend
**Dependencia:** Ninguna

---

### PROPUESTA 4: WhatsApp Shortcut en manifest.json

**Problema:** El manifest.json tiene un shortcut de WhatsApp que apunta a `https://wa.me/573001234567` (ficticio). Cuando un usuario instala la PWA y usa el shortcut, contacta al número placeholder.

**Solución (S — 5 minutos cuando se tenga el número real):**

```json
// manifest.json línea 54 — CAMBIAR:
"url": "https://wa.me/573001234567"
// A:
"url": "https://wa.me/57${numeroReal}"

// O mejor, hasta que se tenga número real:
"url": "https://wa.me/573001234567",
"url": "${WHATSAPP_CONFIG.cotizadorUrl}"
```

**Impacto:** 🟢 Bajo — Solo afecta usuarios de PWA que usen el shortcut
**Esfuerzo:** S (5 minutos cuando haja número real)
**Agente:** Frontend
**Dependencia:** Número real de WhatsApp del cliente

---

### PROPUESTA 5: Navegación a Zonas desde Header

**Problema:** Existen 10 páginas de zonas (Chapinero, Usaquén, Suba, Kennedy, etc.) con SEO local optimizado, pero no hay forma de acceder a ellas desde el menú principal o el header. Los usuarios que no lleguen por búsqueda directa no las descubrirán.

**Solución (M — medio día):**

1. Agregar dropdown "Zonas" en el menú de navegación con las 10 zonas
2. Alternativa lightweight: agregar link "Ver todas las zonas" en el footer
3. Cross-linking desde las tarjetas de servicios hacia la zona correspondiente

**Implementación sugerida:**

```html
<!-- En el nav menu, agregar: -->
<li class="has-dropdown">
  <a href="#zonas">Zonas</a>
  <ul class="dropdown">
    <li><a href="zonas/chapinero/">Chapinero</a></li>
    <li><a href="zonas/usaquen/">Usaquén</a></li>
    <li><a href="zonas/suba/">Suba</a></li>
    <!-- ... -->
  </ul>
</li>
```

**Impacto:** 🟡 Medio — Mejora UX y distribuye tráfico a páginas SEO
**Esfuerzo:** M (medio día)
**Agente:** Frontend
**Dependencia:** Ninguna — el código de zonas ya existe

---

## Resumen de Prioridades

| # | Propuesta | Impacto | Esfuerzo | Agente | Dependencia |
|---|-----------|---------|---------|--------|-------------|
| 1 | Fix SW Cache Versioning | 🔴 Crítico | S | Frontend | Ninguna |
| 2 | hreflang en index.html | 🟡 Medio | S | Frontend | Ninguna |
| 3 | Hero fetchpriority="high" | 🟡 Medio | S | Frontend | Ninguna |
| 4 | WhatsApp manifest fix | 🟢 Bajo | S | Frontend | Número real |
| 5 | Navegación a Zonas | 🟡 Medio | M | Frontend | Ninguna |

---

## Diferenciación R119 vs R118

**R118 propuso:**
- Fix WhatsApp hardcodeado en HTML ✅ (repetido — pendiente de implementar)
- Lazy loading nativo ✅ (ya estaba implementado)
- Workflow E2E con Playwright (propuesto múltiples veces)
- Modelo de suscripción (propuesto desde R100+)

**R119 es nuevo:**
- **Cache versioning del Service Worker** — Bug crítico que causa PWA roto
- **hreflang ausente en index.html** — Gap SEO detectado por auditoría
- **Hero LCP sin fetchpriority** — Core Web Vitals
- **WhatsApp shortcut en manifest.json** — 3er lugar con número placeholder
- **Navegación a Zonas** — UX gap para páginas de zona existentes

---

## Referencias

[1] HubSpot — The 2026 State of Marketing Report: https://www.hubspot.com/hs-fs/hubfs/HubSpot-lp-1.png (Marzo 2026)

[2] Ahrefs — Local SEO: The Complete Guide: https://ahrefs.com/blog/local-seo/ (2026)

[3] CleanerHQ — Cleaning Industry Trends and Opportunities in 2026: https://cleanerhq.com/cleaning-industry-trends-and-opportunities-in-2026/ (Enero 2026)

[4] PxlPeak — AI for Cleaning Companies: https://pxlpeak.com/blog/ai-automation/ai-for-cleaning-companies-complete-guide (Marzo 2026)

---

*Análisis generado por Innovation Scout — Innovation Scout Agent*
*Purity & Clean Round 119 — 2026-04-29*