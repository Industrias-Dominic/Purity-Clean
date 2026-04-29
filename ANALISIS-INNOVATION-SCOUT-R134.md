# Análisis Creativo — Purity & Clean (Round 134)

**Proyecto:** Purity & Clean
**Fecha:** 2026-04-29
**Analista:** Innovation Scout
**Ronda:** 134
**Issue padre:** DOMAA-1105

---

## Resumen Ejecutivo

R134 identifica 5 oportunidades basadas en APIs del navegador no cubiertas en R133: Web Share API (`navigator.share`), Async Clipboard API (`navigator.clipboard`), Media Session API, Content Indexing API, y URL Handling API / Protocol Handlers. Estas APIs permiten diferenciación real tipo app nativa y cierre de gaps de UX específicos del dominio de limpieza.

---

## Oportunidades NO Analizadas en R133 (y no en R1-R132)

### 1. Web Share API — Compartir Servicios Nativos

La propuesta R133 cubría **Web Share Target API** (recibir contenido). R134 propone la otra mitad: **Web Share API** (`navigator.share`) para enviar contenido desde el sitio hacia apps nativas del usuario. Son APIs complementarias pero independientes.

**Estado actual:**
- Botones WhatsApp abren `wa.me` con URL hardcodeada
- No hay `navigator.share()` implementado
- No hay `navigator.canShare()` para feature detection
- El shortuct del manifest usa URL wa.me directa sin Web Share

**Benchmark:** Airbnb, Booking.com usan `navigator.share()` para compartir listados. Permite compartir directamente a WhatsApp, SMS, email, clipboard sin salir del sitio.

**Fix:** Implementar `navigator.share()` con feature detection. [1]

---

### 2. Async Clipboard API — Copiar Detalles de Servicio

El sitio no ofrece forma de copiar电话号码, dirección o detalles del servicio al portapapeles del usuario. Funcionalidad básica de apps de servicios.

**Estado actual:**
- El FAQ del chatbot tiene teléfonos y emails en texto
- No hay botón "Copiar" en tarjetas de contacto
- `document.execCommand('copy')` está deprecado
- El sitio no usa `navigator.clipboard` API

**Benchmark:** Notion, Linear, todos los CRM web modernos. Las apps de servicios en Colombia (Rappi, Domicompras) muestran teléfono con botón "Copiar".

**Fix:** Usar `navigator.clipboard.writeText()` con fallback para browsers antiguos. [2]

---

### 3. Media Session API — Controles de Audio para Guías de Limpieza

Si el sitio eventualmente añade audio-guided cleaning instructions o podcasts de consejos (contenido de valor agregado), la Media Session API permite controles de reproducción desde el lock screen y notifications del sistema.

**Estado actual:**
- No hay contenido de audio en el sitio
- El service worker tiene `push` y `notificationclick` pero NO `mediaSession`
- Cero uso de Media Session API

**Nota:** Esta propuesta es **hipótesis a validar** — depende de que el CEO quiera añadir contenido de audio/guias al sitio. Si no hay contenido de audio, esta propuesta no aplica.

**Fix:** Si se añade audio, usar `navigator.mediaSession.setActionHandler()` para controles de play/pause/skip en el lock screen. [3]

---

### 4. Content Indexing API — Indexar Páginas de Zonas para Offline

El sitio tiene 10 páginas de zonas (`/zonas/chapinero`, `/zonas/usaquen`, etc.) pero ninguna está indexada en el Content Index del service worker. El usuario que instala la PWA no puede acceder al contenido de zonas offline.

**Estado actual:**
- Service worker tiene cache pero NO Content Indexing API
- Las 10 páginas de zonas son standalone HTMLs
- No hay forma de marcar contenido como "para lectura offline"
- La spec de Content Indexing está en Origin Trials pero ya funciona en Chrome

**Benchmark:** Wikipedia, Flipboard, apps de news usan Content Indexing para marcar artículos para lectura offline. [4]

**Fix:** Registrar cada zona en el Content Index cuando el usuario visita. Mostrar lista de contenido offline disponible.

---

### 5. URL Handling API / Protocol Handlers — Deep Links a Zonas

El sitio no puede manejar URLs personalizadas como `purity-clean://zonas/chapinero` ni registrar protocolos propios. Esto limita la capacidad de deep linking desde emails, SMS o WhatsApp.

**Estado actual:**
- Manifest define `scope` pero no `protocol_handlers`
- No hay registro de `my-scheme://` personalizado
- Los shortcuts del manifest usan URLs relativas (`/#reservas`)
- No hay forma de que un email con enlace `purity-clean://reserva?zona=chapinero` abra la PWA directamente

**Benchmark:** Slack usa `slack://` protocol handlers. Apps de taxi (Uber, DiDi) usan deep links. En cleaning services, apps como MaidJUST usan deep links para abrir directamente en la app.

**Fix:** Registrar `purity-clean://` como protocol handler en manifest.json. [5]

---

## Propuestas R134 (5 Nuevas — 0% Duplicado con R1-R133)

### PROPUESTA 1: Web Share API — Compartir Servicios desde el Sitio

**Problema:** El usuario que quiere compartir un servicio específico (ej. "Limpieza profunda de sofás en Chapinero") tiene que copiar manualmente la URL, abrir WhatsApp, y pegar. Friction alta para sharing orgânico.

**Ubicación:** `js/script.js` + botones de share en tarjetas de servicio

**Solución (S — 2 horas):**

```javascript
// js/share-manager.js
const ShareManager = {
  isSupported: 'share' in navigator && navigator.canShare !== undefined,

  canShare() {
    if (!this.isSupported) return false;
    return navigator.canShare({
      title: 'Purity & Clean',
      text: 'Mira este servicio de limpieza',
      url: window.location.href
    });
  },

  async share(serviceName, serviceUrl) {
    if (!this.isSupported) {
      this.fallbackCopy(serviceUrl);
      return;
    }

    const shareData = {
      title: `Purity & Clean — ${serviceName}`,
      text: `Mira este servicio: ${serviceName} de Purity & Clean en Bogotá`,
      url: serviceUrl || window.location.href
    };

    if (navigator.canShare && !navigator.canShare(shareData)) {
      this.fallbackCopy(serviceUrl);
      return;
    }

    try {
      await navigator.share(shareData);
    } catch (err) {
      if (err.name !== 'AbortError') {
        this.fallbackCopy(serviceUrl);
      }
    }
  },

  fallbackCopy(url) {
    navigator.clipboard.writeText(url).then(() => {
      showToast('Enlace copiado al portapapeles', 'success');
    }).catch(() => {
      showToast('No se pudo copiar', 'error');
    });
  }
};
```

**Botón en HTML:**
```html
<button class="btn-share"
        onclick="ShareManager.share('Limpieza profunda de sofás', window.location.href + '#servicios')"
        aria-label="Compartir este servicio">
  <i class="fa-solid fa-share-nodes" aria-hidden="true"></i>
</button>
```

**Compatibilidad:** Chrome 89+, Safari 12.1+, Firefox NO soporta. Feature detection obligatoria.

**Impacto:** 🟡 Medio — Reduce friction de sharing, aumenta cobertura orgánica
**Esfuerzo:** S (2 horas)
**Agente:** Frontend
**Dependencia:** Ninguna (progressive enhancement)

---

### PROPUESTA 2: Async Clipboard API — Botón Copiar en Tarjetas de Contacto

**Problema:** El usuario que quiere guardar el número de teléfono o email tiene que seleccionarlo manualmente. No hay un botón "Copiar" para información de contacto.

**Ubicación:** `js/script.js` + `index.html` (sección contacto/footer)

**Solución (S — 1 hora):**

```javascript
// Clipboard Manager
const ClipboardManager = {
  async copyText(text, label = 'Texto') {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      try {
        await navigator.clipboard.writeText(text);
        showToast(`${label} copiado`, 'success');
        return true;
      } catch (err) {
        console.warn('Clipboard write failed:', err);
      }
    }
    // Fallback legacy
    this.fallbackCopy(text, label);
    return false;
  },

  fallbackCopy(text, label) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand('copy');
      showToast(`${label} copiado`, 'success');
    } catch (err) {
      showToast(`No se pudo copiar ${label}`, 'error');
    }
    document.body.removeChild(textarea);
  }
};
```

**En el footer o sección contacto, agregar botones:**
```html
<div class="contact-item">
  <i class="fa-solid fa-phone" aria-hidden="true"></i>
  <span>+57 300 123 4567</span>
  <button class="btn-copy"
          onclick="ClipboardManager.copyText('+573001234567', 'Teléfono')"
          aria-label="Copiar teléfono">
    <i class="fa-regular fa-copy" aria-hidden="true"></i>
  </button>
</div>
```

**CSS:**
```css
.btn-copy {
  background: transparent;
  border: 1px solid var(--color-border);
  border-radius: 4px;
  padding: 4px 8px;
  cursor: pointer;
  color: var(--color-text-secondary);
  transition: all 0.2s;
}

.btn-copy:hover {
  background: var(--color-primary);
  color: white;
  border-color: var(--color-primary);
}
```

**Compatibilidad:** Chrome 66+, Firefox 87+, Safari 13.1+. Feature detection con fallback legacy.

**Impacto:** 🟢 Bajo-Medio — UX sutil pero de alto valor en móvil
**Esfuerzo:** S (1 hora)
**Agente:** Frontend
**Dependencia:** Ninguna

---

### PROPUESTA 3: Media Session API — Hipótesis para Contenido de Audio

**Problema (hipótesis):** Si Purity & Clean añade guías de limpieza en audio (podcasts cortos, tips de mantenimiento), no hay forma de controlarlos desde fuera de la pestaña.

**Estado actual:** No hay contenido de audio. Esta propuesta es **condicional**.

**Ubicación:** `js/script.js` + sección de audio/recursos

**Solución (hipótesis — M si hay contenido, N/A si no):**

```javascript
if ('mediaSession' in navigator) {
  navigator.mediaSession.metadata = new MediaMetadata({
    title: 'Guía de Limpieza de Sofás',
    artist: 'Purity & Clean',
    album: 'Tips de Limpieza',
    artwork: [
      { src: '/images/audio-cover-96.png', sizes: '96x96' },
      { src: '/images/audio-cover-512.png', sizes: '512x512' }
    ]
  });

  navigator.mediaSession.setActionHandler('play', () => {
    audio.play();
  });

  navigator.mediaSession.setActionHandler('pause', () => {
    audio.pause();
  });

  navigator.mediaSession.setActionHandler('seekbackward', () => {
    audio.currentTime = Math.max(0, audio.currentTime - 10);
  });

  navigator.mediaSession.setActionHandler('seekforward', () => {
    audio.currentTime = Math.min(audio.duration, audio.currentTime + 10);
  });
}
```

**Compatibilidad:** Chrome 73+, Firefox 82+, Safari 15.4+. Solo útil si hay contenido de audio.

**Impacto:** 🟡 Medio (si hay audio) — Diferenciación tipo app nativa
**Esfuerzo:** M (si hay contenido de audio)
**Agente:** Frontend / Content
**Dependencia:** Contenido de audio — **requiere validación del CEO**

---

### PROPUESTA 4: Content Indexing API — Indexar Zonas para Offline

**Problema:** Las 10 páginas de zonas no están registradas en el Content Index del service worker. Usuarios con PWA instalada que pierden conexión no pueden acceder al contenido de su zona.

**Ubicación:** `sw.js` (service worker actualizado)

**Solución (M — 3 horas):**

```javascript
// En sw.js, agregar al activate o en un evento de fetch especial
const CONTENT_INDEX_ID = 'purity-zonas';

async function indexZonesForOffline() {
  if (!('index' in ServiceWorkerRegistration.prototype)) {
    console.warn('Content Indexing API not supported');
    return;
  }

  const registration = self.registration;
  const zonePages = [
    { id: 'zonas-barrios-unidos', url: '/zonas/barrios-unidos/', title: 'Limpieza en Barrios Unidos' },
    { id: 'zonas-chapinero', url: '/zonas/chapinero/', title: 'Limpieza en Chapinero' },
    { id: 'zonas-teusaquillo', url: '/zonas/teusaquillo/', title: 'Limpieza en Teusaquillo' },
    { id: 'zonas-usaquen', url: '/zonas/usaquen/', title: 'Limpieza en Usaquén' },
    { id: 'zonas-fontibon', url: '/zonas/fontibon/', title: 'Limpieza en Fontibón' },
    { id: 'zonas-engativa', url: '/zonas/engativa/', title: 'Limpieza en Engativá' },
    { id: 'zonas-kennedy', url: '/zonas/kennedy/', title: 'Limpieza en Kennedy' },
    { id: 'zonas-suba', url: '/zonas/suba/', title: 'Limpieza en Suba' },
    { id: 'zonas-bosa', url: '/zonas/bosa/', title: 'Limpieza en Bosa' },
    { id: 'zonas-usme', url: '/zonas/usme/', title: 'Limpieza en Usme' }
  ];

  // Indexar todas las zonas
  for (const zone of zonePages) {
    try {
      await registration.index.add(zone);
    } catch (err) {
      console.warn('Failed to index zone:', zone.id, err);
    }
  }
}

// Llamar cuando se visita una zona
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  if (url.pathname.startsWith('/zonas/') && event.request.destination === 'document') {
    event.waitUntil(indexZonesForOffline());
  }
});
```

**En index.html, agregar UI para mostrar contenido offline disponible:**
```javascript
async function showOfflineZones() {
  if (!('index' in navigator.serviceWorker)) return;

  const registration = await navigator.serviceWorker.ready;
  const content = await registration.index.getAll();
  const zones = content.filter(c => c.id.startsWith('zonas-'));

  if (zones.length === 0) {
    showToast('Visita las páginas de zonas para guardarlas offline', 'info');
    return;
  }

  // Mostrar modal con zonas guardadas offline
  showOfflineZonesModal(zones);
}
```

**Compatibilidad:** Chrome 84+ (Origin Trial), Edge 84+. Firefox y Safari NO soportan. Feature detection obligatoria, silent fail en otros browsers.

**Impacto:** 🟡 Medio-Alto — Diferenciador PWA real, valor para usuarios queinstalan la app
**Esfuerzo:** M (3 horas)
**Agente:** Frontend
**Dependencia:** PWA instalada y zonas pages existentes ✅

---

### PROPUESTA 5: Protocol Handlers — Deep Links `purity-clean://`

**Problema:** No hay forma de que un enlace en un email, SMS o WhatsApp abra directamente la PWA en una sección específica. El sitio solo responde a URLs HTTP, no a esquemas personalizados.

**Estado actual:**
- Manifest define shortcuts pero no protocol handlers
- Los deep links desde campañas de email van a `purityclean.com/#reservas`
- No hay soporte para `purity-clean://reserva?zona=chapinero`
- Los emails de confirmación no pueden abrir la PWA directamente

**Benchmark:** Uber usa `uber://` protocol handlers. Slack usa `slack://`. Rappi usa deep links. En cleaning services, aplicaciones nativas usan este mecanismo.

**Fix:** Registrar `purity-clean://` en manifest.json y manejar en service worker. [5]

**Actualizar manifest.json:**
```json
{
  "protocol_handlers": [
    {
      "protocol": "purity-clean",
      "url": "/?purity-deep-link&action={url}"
    }
  ]
}
```

**En sw.js, manejar mensajes de protocol:**
```javascript
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  if (url.searchParams.has('purity-deep-link')) {
    const action = url.searchParams.get('action');
    event.respondWith(handleDeepLink(action));
  }
});

async function handleDeepLink(action) {
  // Parsear action y navegar a la sección correcta
  // purity-clean://reserva?zona=chapinero → /#reservas?zona=chapinero
  const section = action.split('?')[0];
  const params = action.includes('?') ? '?' + action.split('?')[1] : '';
  return Response.redirect(`/#${section}${params}`, 301);
}
```

**Compatibilidad:** Chrome 84+, Edge 84+. Firefox y Safari NO soportan. Feature detection no posible (se registra en manifest). Implementar como progressive enhancement.

**Impacto:** 🟢 Bajo-Medio — Valor para campañas de email y deep linking futuro
**Esfuerzo:** M (3 horas)
**Agente:** Frontend
**Dependencia:** Campañas de email/marketing (futuro)

---

## Resumen de Prioridades R134

| # | Propuesta | Impacto | Esfuerzo | Agente | Tipo | ¿Validar? |
|---|-----------|---------|---------|--------|------|-----------|
| 1 | Web Share API (navigator.share) | 🟡 Medio | S | Frontend | Sharing UX | No |
| 2 | Async Clipboard API | 🟢 Bajo-Medio | S | Frontend | UX móvil | No |
| 3 | Media Session API | 🟡 Medio | M | Frontend | Audio/hipótesis | **SÍ — CEO** |
| 4 | Content Indexing API | 🟡 Medio-Alto | M | Frontend | PWA offline | No |
| 5 | Protocol Handlers | 🟢 Medio | M | Frontend | Deep links | No |

---

## Diferenciación R134 vs R133

**Novedades propias de R134:**
- **Web Share API (navigator.share)** — Enviar contenido desde el sitio (R133 cubrió Share Target, no Share origin)
- **Async Clipboard API** — Copiar texto al portapapeles con API moderna
- **Media Session API** — Controles de audio en lock screen (hipótesis a validar)
- **Content Indexing API** — Indexar zonas para offline en PWA
- **Protocol Handlers** — Registrar `purity-clean://` deep links

**Zero duplicación** con R1-R133.

---

## Bugs Persistentes — Estado Comparativo

| Bug | Identificado | Rondas | Estado | ¿Desbloqueable? |
|-----|-------------|--------|--------|------------------|
| WhatsApp ficticio | R1 | 133 | Sin cambio | ✅ CEO provee número |
| SW cache versioning | R1 | 133 | Sin cambio | ✅ Actualizar CACHE_NAME |
| Place ID falso | R126 | 7 | Sin cambio | ⚠️ Depende de GMB |
| VideoObject placeholder | R122 | 11 | Sin cambio | ⚠️ Depende de video real |
| Repo GitHub 404 | R128 | 5 | Sin cambio | ⚠️ Repo eliminado/privado |

---

## Referencias

[1] Web Share API: https://developer.mozilla.org/en-US/docs/Web/API/Web_Share_API
[2] Async Clipboard API: https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API
[3] Media Session API: https://developer.mozilla.org/en-US/docs/Web/API/Media_Session_API
[4] Content Indexing API: https://developer.mozilla.org/en-US/docs/Web/API/Content_Index
[5] Protocol Handlers: https://developer.mozilla.org/en-US/docs/Web/API/Navigator/registerProtocolHandler

---

*Análisis generado por Innovation Scout — Innovation Scout Agent*
*Purity & Clean Round 134 — 2026-04-29*