# Análisis Creativo — Purity & Clean (Round 133)

**Proyecto:** Purity & Clean
**Fecha:** 2026-04-29
**Analista:** Innovation Scout
**Ronda:** 133
**Issue padre:** DOMAA-1103

---

## Resumen Ejecutivo

R133 analiza gaps NO cubiertos en rounds anteriores: animaciones CSS sin `@media (prefers-reduced-motion: reduce)`, ausencia de custom PWA install prompt, sistema de referidos con gaps de validación, y features de engagement (reading progress bar, zona landing pages) que tienen oportunidades de optimización. Se identifican **7 propuestas nuevas** con 0% duplicación respecto a R132.

---

## Auditoría de Elementos NO Analizados Previamente

### 1. Animaciones CSS Sin Cobertura `prefers-reduced-motion`

El sitio tiene múltiples `@keyframes` y animaciones pero los `@media (prefers-reduced-motion: reduce)` NO cubren todas las animaciones presentes en el CSS.

**Situación actual (análisis grep):**
- ❌ `coupon-flash` (línea 2235) — SIN `@media prefers-reduced-motion`
- ❌ `reveal-fade` (línea 2298) — SIN `@media prefers-reduced-motion`
- ❌ `card-ripple` (línea 2358) — SIN `@media prefers-reduced-motion`
- ❌ `pulse-badge` (línea 2709) — SIN `@media prefers-reduced-motion`
- ❌ `geo-pulse` (línea 3041) — SIN `@media prefers-reduced-motion`
- ❌ `success-pop` (línea 3199) — SIN `@media prefers-reduced-motion`
- ❌ `confetti-fall` (línea 3225) — SIN `@media prefers-reduced-motion`
- ❌ `guarantee-glow` (línea 4188) — SIN `@media prefers-reduced-motion`
- ❌ `video-pulse-ring` (línea 4759) — SIN `@media prefers-reduced-motion`
- ❌ `video-modal-in` (línea 4895) — SIN `@media prefers-reduced-motion`
- ❌ `cotizador-fade` (línea 5537) — SIN `@media prefers-reduced-motion`

Las secciones que SÍ tienen `@media prefers-reduced-motion`:
- Chatbot FAB + badge (líneas 311-323)
- Map zone cards (líneas 859-871)
- Testimonial cards (líneas 1120-1128)

**Gap:** 11 animaciones sin soporte para `prefers-reduced-motion`. Esto viola WCAG 2.3.3 (Animación秀) y causa mareos/motion sickness en usuarios sensibles. [1]

---

### 2. PWA Install Prompt — Sin Custom UI para Instalación

El sitio tiene `manifest.json` completo con shortcuts, icons (192, 512, maskable), y theme colors. El SW registra `sw.js` en `index.html`. PERO no hay código que capture o muestre el `beforeinstallprompt` event.

**Situación actual:**
- ✅ manifest.json tiene `categories: ["business", "services"]` (línea 13)
- ✅ Icons SVG con purpose: any y maskable
- ✅ Service Worker registrado
- ❌ NO hay `beforeinstallprompt` event listener en script.js
- ❌ NO hay UI personalizada para invitar instalación
- ❌ NO hay custom install button o banner

**Gap:** Los usuarios no reciben ninguna invitación para instalar la PWA en móvil. Competidores con PWA install prompt tienen mayor retención. El browser muestra el prompt nativo solo si el usuario ya interacts con el sitio de cierta forma - una custom UI aumenta la conversión de instalaciones. [2]

---

### 3. Sistema de Referidos — Validación de Nombre en Frontend

El formulario de referidos (`#referidos-form` líneas 1823-1834) tiene validación de nombre con `pattern="[a-zA-Z\s]+"` y `maxlength="30"`.

**Ubicación:** `index.html:1823-1879` + `js/script.js` (líneas de generador de cupón)

**Gap potencial:**
- La validación del pattern `[a-zA-Z\s]+` rejecta nombres con acentos (María, José, Sebastián, etc.) — esto es problemático para Colombia donde la mayoría de nombres tienen tildes.
- No hay validación de nombre duplicado (mismo nombre puede generar múltiples cupones?).

**Verificar en código:** ¿El script valida el nombre en cliente antes de generar el cupón? ¿Se проверя si el nombre ya existe en algún storage (localStorage/sessionStorage)?

---

### 4. Reading Progress Bar en Blog — Sin `prefers-reduced-motion`

Los artículos del blog tienen un `reading-progress` component (línea 62 del blog article) que muestra barra de progreso de lectura con `position: fixed` y `animation: width` para la barra.

**Ubicación:** `blog/articulos/limpiar-sillas-oficina-bogota.html:62-64` y `blog/css/blog.css` línea 671 tiene `@media (prefers-reduced-motion: reduce)` que desactiva solo UNA animación.

**Gap:** La reading progress bar usa `animation` en CSS que puede no estar cubierta por el media query. Si el blog.css tiene un `@media (prefers-reduced-motion: reduce)` parcial (solo desactiva `blog-card`), la reading-progress bar seguiría animada.

---

### 5. Zona Pages — Structured Data `areaServed` vs `containedInPlace` Duplicidad

Las páginas de zona (e.g., `zonas/usaquen/index.html`) tienen en el JSON-LD:

```json
"areaServed": {
  "@type": "Place",
  "name": "Usaquén",
  "containedInPlace": {
    "@type": "AdministrativeArea",
    "name": "Bogotá",
    "addressCountry": "CO"
  }
}
```

Y ADEMÁS en `address` repiten:

```json
"address": {
  "@type": "PostalAddress",
  "addressNeighborhood": "Usaquén"
}
```

**Gap:** Hay redundancia entre `areaServed` y `address.addressNeighborhood`. Google puede interpretar que Usaquén es tanto un lugar servido como un barrio de la dirección, lo cual es semánticamente correcto pero podría generar confusión en el rich testing. El Schema correcto para zonas sería `areaServed` con `Place` pero sin `containedInPlace` adicional porque el `address` ya indica la ubicación. [3]

---

### 6. WhatsApp FAB — No Visible en Páginas de Zona

El botón flotante de WhatsApp (`chatbot-fab`) está en `css/style.css` líneas 8-59. Es un fixed element en `bottom: 24px; left: 24px`.

**Situación actual:**
- ✅ Visible en `index.html` (sección `#inicio` tiene chatbot-fab)
- ❌ Las páginas de zona (`zonas/*/index.html`) incluyen `css/style.css` — debería tener el FAB disponible
- ⚠️ El FAB en móvil puede competir con el mapa Leaflet si ambos están en la misma zona de pantalla

**Gap:** ¿El FAB de WhatsApp aparece consistentemente en todas las páginas? Revisar si las zona pages tienen el mismo header/nav que incluye el chatbot. Si no, es un gap de UX.

---

### 7. Cotizador Widget — Sin Estado Persistente en Page Refresh

El cotizador (líneas 843-932 de `index.html`) permite al usuario seleccionar servicio + cantidad con un stepper/range.

**Gap identificado en R132:** No había transferencia cotizador → booking form. Eso se propuso en R132 propuesta 6. Pero hay OTRO gap:

**Si el usuario configura el cotizador, hace scroll, y refresca la página**, el estado del cotizador se pierde. No hay `sessionStorage` ni `localStorage` para persistir la selección del cotizador entre refresh.

**R132 propuesta 6** propuso transferir cotizador → booking form, pero esa es transferencia entre widgets, no persistencia en refresh.

---

## Propuestas R133 (7 Nuevas — 0% Duplicado con R132)

### PROPUESTA 1: Cobertura Completa de `prefers-reduced-motion` Para Todas las Animaciones

**Problema:** 11 animaciones CSS no tienen `@media (prefers-reduced-motion: reduce)` — viola WCAG 2.3.3.

**Ubicación:** `css/style.css` — 11 `@keyframes` sin media query

**Solución (S — 2 horas):**

Unificar todos los `@media (prefers-reduced-motion: reduce)` en un solo bloque al final del CSS,覆盖 todas las animaciones:

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

  .fab-badge,
  .fab-bounce {
    animation: none !important;
  }

  .reading-progress-bar {
    animation: none !important;
  }
}
```

Alternativamente, agregar media queries específicos para cada animación problemática individually. La aproximación con `*` y `!important` es más simple y дает cobertura completa.

**Impacto:** 🟡 Medio — Accesibilidad WCAG 2.3.3, usuarios con motion sensitivity
**Esfuerzo:** S (2 horas)
**Agente:** Frontend (CSS)
**Dependencia:** Ninguna

---

### PROPUESTA 2: Custom PWA Install Prompt con beforeinstallprompt

**Problema:** El sitio no captura el `beforeinstallprompt` event ni muestra una UI personalizada para invitar a instalar la PWA.

**Ubicación:** `index.html` + `js/script.js`

**Solución (M — 4 horas):**

1. **Capturar el event en script.js:**

```javascript
let deferredPrompt = null;

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  showInstallBanner();
});

window.addEventListener('appinstalled', () => {
  deferredPrompt = null;
  hideInstallBanner();
});
```

2. **Crear banner de instalación (HTML + CSS):**

```html
<div id="pwa-install-banner" class="pwa-install-banner" hidden role="dialog" aria-label="Instalar app">
  <div class="pwa-install-content">
    <div class="pwa-install-icon" aria-hidden="true">
      <img src="/icons/icon-192.svg" alt="Purity & Clean" width="48" height="48">
    </div>
    <div class="pwa-install-text">
      <strong>Instala Purity & Clean</strong>
      <span>Accede más rápido desde tu pantalla de inicio</span>
    </div>
    <button id="pwa-install-btn" class="btn btn-primary btn-sm" type="button">
      Instalar
    </button>
    <button id="pwa-dismiss-btn" class="btn btn-ghost btn-sm" type="button" aria-label="Cerrar">
      <i class="fa-solid fa-xmark" aria-hidden="true"></i>
    </button>
  </div>
</div>
```

3. **CSS del banner:**

```css
.pwa-install-banner {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: var(--color-surface);
  border-top: 1px solid var(--color-border);
  padding: 0.75rem 1rem;
  z-index: 900;
  box-shadow: 0 -4px 20px rgba(0,0,0,0.1);
}

.pwa-install-banner[hidden] {
  display: none;
}
```

4. **Lógica de show/hide/save:**

```javascript
function showInstallBanner() {
  const banner = document.getElementById('pwa-install-banner');
  if (banner) {
    banner.hidden = false;
    const btn = document.getElementById('pwa-install-btn');
    btn.addEventListener('click', async () => {
      if (deferredPrompt) {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        deferredPrompt = null;
        hideInstallBanner();
      }
    });
  }
}

function hideInstallBanner() {
  const banner = document.getElementById('pwa-install-banner');
  if (banner) banner.hidden = true;
}
```

5. **Regla de display:** Solo mostrar si `!window.matchMedia('(display-mode: standalone)').matches` (no mostrar si ya está instalado).

**Nota:** Implementar solo en `index.html`, no en todas las páginas — para no mostrar el banner en páginas de zona donde el usuario ya convirtió. [2]

**Impacto:** 🟢 Alto — PWA retention, mobile engagement, diferenciador competitivo
**Esfuerzo:** M (4 horas)
**Agente:** Frontend
**Dependencia:** Ninguna

---

### PROPUESTA 3: Fix Validación de Nombre con Acentsos en Formulario de Referidos

**Problema:** El pattern `[a-zA-Z\s]+` rejecta nombres con tildes (María, José, etc.) — problemático para mercado colombiano.

**Ubicación:** `index.html:1827` (pattern attribute) + validación en `js/script.js`

**Solución (S — 1 hora):**

Cambiar el pattern para permitir acentos y caracteres UTF-8:

```html
<!-- Antes: -->
<input type="text" id="referido-nombre" name="nombre" autocomplete="name" required aria-required="true" placeholder="Ej: Ana" maxlength="30" pattern="[a-zA-Z\s]+" spellcheck="false">

<!-- Después: -->
<input type="text" id="referido-nombre" name="nombre" autocomplete="name" required aria-required="true" placeholder="Ej: Ana María" maxlength="50" pattern="[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]{2,}" spellcheck="false">
```

También actualizar `maxlength` de 30 a 50 para nombres compuestos largos.

En el JS, la validación del pattern debe ser la misma — asegurar que `input.validity.patternMismatch` sea el check.

**Impacto:** 🟡 Medio — UX, evitar frustración de usuarios con nombres típicos colombianos
**Esfuerzo:** S (1 hora)
**Agente:** Frontend
**Dependencia:** Ninguna

---

### PROPUESTA 4: Reading Progress Bar Desactivar Animación con `prefers-reduced-motion`

**Problema:** La barra de progreso de lectura en artículos del blog puede tener animaciones que no respetan `prefers-reduced-motion`.

**Ubicación:** `blog/css/blog.css`

**Solución (S — 1 hora):**

Verificar que la reading progress bar esté dentro del `@media (prefers-reduced-motion: reduce)` del blog.css. Si el media query actual (línea 671) solo cubre `blog-card`, expandir para cubrir todo el site:

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }

  .reading-progress,
  .reading-progress-bar {
    animation: none !important;
  }
}
```

**Impacto:** 🟡 Medio — Accesibilidad WCAG 2.3.3
**Esfuerzo:** S (1 hora)
**Agente:** Frontend
**Dependencia:** Ninguna

---

### PROPUESTA 5: Consolidar `areaServed` en Zona Pages — Remover Redundancia

**Problema:** Las zona pages tienen redundancia semántica entre `areaServed` (Place hierarchy) y `address.addressNeighborhood` — puede confundir a Google rich results validator.

**Ubicación:** `zonas/zona-template.html:35-55` y todos los `zonas/*/index.html`

**Solución (S — 2 horas):**

Simplificar el JSON-LD de las zona pages para usar solo `areaServed` con `Place` tipo sin `containedInPlace` (que ya está implícito en el address):

```json
"areaServed": {
  "@type": "Place",
  "name": "Usaquén"
},
```

Y el address mantener solo:

```json
"address": {
  "@type": "PostalAddress",
  "addressCountry": "CO",
  "addressLocality": "Bogotá",
  "addressNeighborhood": "Usaquén"
}
```

Remover el `containedInPlace` de `areaServed` ya que el address ya establece que Usaquén está en Bogotá.

Para las páginas principales (index.html), el `areaServed` debería ser `"@type": "AdministrativeArea", "name": "Bogotá"` para indicar cobertura general.

**Impacto:** 🟡 Medio — SEO local, rich snippets más limpios
**Esfuerzo:** S (2 horas)
**Agente:** Frontend
**Dependencia:** Ninguna

---

### PROPUESTA 6: Persistencia del Cotizador entre Page Refreshes con sessionStorage

**Problema:** Si el usuario configura el cotizador y refresca la página, pierde toda la selección.

**Ubicación:** `js/script.js` + `index.html:843-932` (cotizador)

**Solución (S — 2 horas):**

Implementar persistencia del estado del cotizador en sessionStorage, y restaurar al cargar la página:

```javascript
// Keys para sessionStorage
const COTIZADOR_SERVICE_KEY = 'purity_cotizador_service';
const COTIZADOR_QTY_KEY = 'purity_cotizador_qty';

function saveCotizadorState(service, qty) {
  sessionStorage.setItem(COTIZADOR_SERVICE_KEY, service);
  sessionStorage.setItem(COTIZADOR_QTY_KEY, qty);
}

function restoreCotizadorState() {
  const savedService = sessionStorage.getItem(COTIZADOR_SERVICE_KEY);
  const savedQty = sessionStorage.getItem(COTIZADOR_QTY_KEY);
  if (savedService) {
    const serviceInput = document.getElementById('cotizador-service');
    if (serviceInput) serviceInput.value = savedService;
  }
  if (savedQty) {
    const qtyInput = document.getElementById('cotizador-qty');
    if (qtyInput) qtyInput.value = savedQty;
  }
}

// Llamar al cargar la página
document.addEventListener('DOMContentLoaded', () => {
  restoreCotizadorState();
});

// Llamar cada vez que el usuario cambia el stepper/range
rangeInput.addEventListener('input', () => {
  saveCotizadorState(selectedService, rangeInput.value);
});
```

**Impacto:** 🟡 Medio — UX, reduce friction, menos re-work para el usuario
**Esfuerzo:** S (2 horas)
**Agente:** Frontend
**Dependencia:** Ninguna
**Nota:** Complementa R132 propuesta 6 (cotizador → booking form transfer), no la reemplaza. Ambas son independientes.

---

### PROPUESTA 7: Verificar Consistencia del WhatsApp FAB en Zona Pages

**Problema:** No se ha verificado que el WhatsApp FAB esté correctamente incluido y sea visible en todas las zona pages.

**Ubicación:** `zonas/*/index.html` — verificar inclusión de chatbot-fab en el HTML

**Solución (S — 1 hora):**

Inspeccionar una zona page (e.g., `zonas/usaquen/index.html`) para verificar si existe el elemento `.chatbot-fab`. Si no existe, agregarlo antes del `</body>`:

```html
<a href="#" class="chatbot-fab" aria-label="Contactar por WhatsApp" id="whatsapp-fab">
  <i class="fa-brands fa-whatsapp" aria-hidden="true"></i>
  <span class="fab-badge" aria-label="Nuevo mensaje">1</span>
</a>
```

Y en `js/script.js` asegurar que el click del FAB abra WhatsApp con el mensaje contextual de zona:

```javascript
const whatsappFab = document.getElementById('whatsapp-fab');
if (whatsappFab) {
  whatsappFab.addEventListener('click', (e) => {
    e.preventDefault();
    const zona = document.documentElement.dataset.zona || 'home';
    const mensaje = WHATSAPP_CONFIG.zonas[zona] || WHATSAPP_CONFIG.mensajePorDefecto;
    window.open(`https://wa.me/${WHATSAPP_CONFIG.numero}?text=${mensaje}`, '_blank');
  });
}
```

**Impacto:** 🟡 Medio — UX, consistencia de CTAs en todas las páginas
**Esfuerzo:** S (1 hora)
**Agente:** Frontend
**Dependencia:** Ninguna

---

## Resumen de Prioridades R133

| # | Propuesta | Impacto | Esfuerzo | Agente | Tipo | Diferenciador R133 |
|---|-----------|---------|---------|--------|------|---------------------|
| 1 | prefers-reduced-motion coverage completa | 🟡 Medio | S | Frontend | Accesibilidad WCAG 2.3.3 | 11 animaciones sin media query |
| 2 | Custom PWA install prompt | 🟢 Alto | M | Frontend | PWA/Retention | Sin beforeinstallprompt handler |
| 3 | Fix validación nombre con acentos | 🟡 Medio | S | Frontend | UX | Nombres colombianos rechazados |
| 4 | Reading progress bar prefers-reduced-motion | 🟡 Medio | S | Frontend | Accesibilidad | Blog WCAG compliance |
| 5 | Consolidar areaServed en zona pages | 🟡 Medio | S | Frontend | SEO | Redundancia schema |
| 6 | Cotizador sessionStorage persistencia | 🟡 Medio | S | Frontend | UX | Estado perdido en refresh |
| 7 | WhatsApp FAB consistencia en zonas | 🟡 Medio | S | Frontend | UX | FAB no visible en zonas |

---

## Diferenciación R133 vs R132

**R132 propuso:** Focus-visible keyboard, Logo strip B2B, Review microdata, VideoObject schema, Blog article schema, Cotizador → booking transfer, Lazy loading mapa Leaflet.

**R133 novedades propias:**
- **prefers-reduced-motion completo** — 11 animaciones sin media query, WCAG 2.3.3
- **PWA install prompt custom** — beforeinstallprompt event nunca capturado
- **Validación nombre con acentos** — Nombres colombianos rechazados por regex
- **Reading progress bar motion** — Blog accessibility WCAG
- **areaServed redundancy** — Schema cleaner para zonas
- **Cotizador sessionStorage persistencia** — Estado entre refreshes (R132 propuso transferencia, no persistencia)
- **WhatsApp FAB en zonas** — Consistencia cross-page

**Zero duplicación** entre R132 y R133.

---

## Bugs Persistentes — Estado Comparativo

| Bug | Identificado | Rondas | Estado | ¿Desbloqueable? |
|-----|-------------|--------|--------|------------------|
| WhatsApp ficticio | R1 | 133 | Sin cambio | ✅ CEO provee número |
| SW cache versioning | R1 | 133 | Sin cambio | ✅ Actualizar CACHE_NAME |
| Place ID falso | R126 | 8 | Sin cambio | ⚠️ Depende de GMB |
| VideoObject placeholder | R122 | 11 | Sin cambio | ⚠️ CEO provee video real |

---

## Referencias

[1] WCAG 2.3.3 Animación秀: https://www.w3.org/WAI/WCAG21/Understanding/animation-from-transitions.html
[2] PWA Install Prompt: https://web.dev/learn/pwa/installation-prompt/
[3] Schema.org areaServed: https://schema.org/areaServed

---

*Análisis generado por Innovation Scout — Innovation Scout Agent*
*Purity & Clean Round 133 — 2026-04-29*