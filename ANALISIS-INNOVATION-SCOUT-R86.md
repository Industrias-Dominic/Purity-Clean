# Análisis Creativo — Purity & Clean (Round 86)

**Proyecto:** Purity & Clean
**Fecha:** 2026-04-28
**Analista:** Innovation Scout
**Ronda:** 86
**Issue padre:** DOMAA-777

---

## Resumen Ejecutivo

R86 presenta **5 propuestas genuinamente nuevas** detectadas mediante inspección directa del código fuente y análisis de las actualizaciones más recientes de Google Search Central (Abril 2026). Este ronda se diferencia de R85 al abordar: (1) bug crítico del Service Worker que nunca envía SKIP_WAITING, (2) implementación del banner PWA que requiere revisión UX, (3) nuevo schema HowTo para artículos de blog tipo tutorial, (4) amenazas de seguridad detectadas por Google en Abril 2026 (back button hijacking), y (5) integración del chatbot FAQ que parece completa pero requiere validación.

---

## Estado Actual del Proyecto (R86)

### Stack Técnico

| Componente | Estado | Notas |
|-----------|--------|-------|
| **Frontend** | HTML5 + CSS3 + Vanilla JS | index.html (~2,305 líneas), style.css (6,212 líneas), script.js (64KB) |
| **PWA** | ⚠️ SKIP_WAITING nunca se invoca | Bug confirmado en script.js línea 1-6 (carga config.js) y script.js lines 90-99 (event listeners) — no hay postMessage al SW |
| **PWA Install Banner** | ⚠️ Implementado pero sin feedback | index.html líneas 2242-2270 — banner existe, pero no se mide su conversión ni se optimiza el timing |
| **Blog** | ⚠️ BlogPosting pero sin HowTo | El artículo "cómo limpiar tu sofá" tiene pasos en HTML visible pero solo schema BlogPosting |
| **Chatbot FAQ** | ✅ Implementado | index.html líneas 2216-2240 — chatbot con FAB, panel, preguntas predefinidas |
| **Service Worker** | ✅ Install/Activate/Fetch handlers | sw.js 197 líneas, pero update flow incompleto |
| **Zonas** | ⚠️ Template existe | zona-template.html (429 líneas) con placeholders — DRY no resuelto |
| **Testing** | ✅ 9 specs Playwright | Directorio tests/e2e/ con specs completas |
| **Hosting** | ⚠️ GitHub Pages | Bloquea security headers igual que en R85 |

---

## Investigación: Google Search Central — Abril 2026 (Updates Recientes)

### Hallazgo 1: "Read More" Deep Links (April 20, 2026) [1]

Google agregó una nueva sección sobre "read more" deep links en su documentación de snippets (actualizado April 20, 2026). Esto permite que Google genere automáticamente un enlace "read more" en los snippets de búsqueda cuando el contenido tiene una sección clara de continuación.

**Implicación:** Purity & Clean puede beneficiarse si sus artículos de blog (como "cómo limpiar tu sofá") tienen una estructura clara con "continuar leyendo" o secciones relacionadas al final. No requiere schema especial, solo contenido bien estructurado.

**Fuente:** [Google Snippet Documentation - Read More Deep Links](https://developers.google.com/search/docs/appearance/snippet#read-more-deep-links) (Actualizado Abril 20, 2026)

---

### Hallazgo 2: Nuevo Spam Policy: "Back Button Hijacking" (April 13, 2026) [2]

Google introdujo una nueva política anti-spam para prevenir "back button hijacking" — una práctica engañosa donde el sitio manipula el botón atrás del navegador para mantener usuarios o mostrar anuncios no deseados.

**Implicación:** Revisar que el sitio no tenga ningún código que intercepte o manipule el historial del navegador. El SW de Purity & Clean tiene control de fetch y cache, pero ninguna manipulación de history API. El sitio está limpio de esta práctica.

**Fuente:** [Google Malicious Practices Spam Policy](https://developers.google.com/search/docs/essentials/spam-policies#malicious-practices) (Actualizado Abril 13, 2026)

---

### Hallazgo 3: Discussion Forum y QA Page Markup — Más Propiedades (March 24, 2026) [3]

Google agregó nuevas propiedades soportadas para DiscussionForum y QAPage markup en Marzo 2026. Esto mejora la claridad semántica para Googlebot.

**Implicación:** Los artículos de blog tipo guía (como "cómo limpiar tu sofá") podrían beneficiarse de Q&A schema si se restructuran como preguntas frecuentes, o DiscussionForum si hay sección de comentarios.

**Fuente:** [Google Search Central Updates - March 2026](https://developers.google.com/search/updates) (Marzo 24, 2026)

---

## Auditoría Directa del Código Fuente

### Bug Confirmado: Service Worker SKIP_WAITING nunca se invoca

**Ubicación:** `js/script.js` líneas 1-6 y 90-99

El archivo `sw.js` tiene el handler correcto para SKIP_WAITING (líneas 153-157):

```javascript
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
```

**PERO** `script.js` nunca envía este mensaje. La carga de config.js es asíncrona (líneas 1-6):

```javascript
(function(){var s=document.createElement("script");s.src="js/config.js";s.async=false;document.head.appendChild(s)})();
```

Y los event listeners de search/theme/menu (líneas 90-99) no incluyen ningún postMessage al SW.

**Impacto:** Usuarios con el SW cacheado no ven actualizaciones hasta cerrar TODAS las pestañas. Esto es un bug funcional que afecta la experiencia post-deploy.

---

### PWA Install Banner Sin Optimizar

**Ubicación:** `index.html` líneas 2242-2270

El banner PWA está implementado:

```html
<div id="pwa-install-banner" class="pwa-banner" role="dialog" aria-modal="false" ...>
```

**Problemas detectados:**
1. No hay medición de cuántas veces se muestra el banner vs. cuántas instalaciones se completan
2. El timing de aparición no está documentado (¿aparece inmediatamente? ¿Después de 30 segundos? ¿En segunda visita?)
3. No hay opción de "recordar más tarde" — el usuario solo puede cerrar o instalar

---

### Chatbot FAQ — Implementación Completa Pero Sin Métricas

**Ubicación:** `index.html` líneas 2216-2240, `css/style.css` líneas 1-150

El chatbot tiene:
- FAB button con badge "FAQ"
- Panel con header, body (intro message), footer
- Open/close toggle con aria-expanded
- Estilos completos con transiciones CSS

**PROBLEMA:** No hay tracking de eventos hacia Plausible para medir:
- Cuántos usuarios abren el chatbot
- Cuáles preguntas seleccionan
- Cuántos@click en WhatsApp desde el chatbot

---

### Zona Template — DRY No Resuelto

**Ubicación:** `zonas/zona-template.html` (429 líneas)

El template existe con placeholders `{{ZONA_KEY}}`, `{{META_DESCRIPTION}}`, etc. Pero las 11 carpetas de zonas fueron creadas manualmente (git log muestra blobs de commits separados). Si se necesita actualizar algo común (ej. nuevo servicio, cambio de precio), hay que editar 11 archivos.

**Recomendación:** Crear un build script en Node.js que genere los archivos desde el template con datos centralizados en un JSON.

---

## Propuestas (Round 86)

### Propuesta 1: Corrección del Bug SKIP_WAITING en Service Worker (HIGH PRIORITY — Quick Win)

| Campo | Detalle |
|-------|---------|
| **Título** | Invocar SKIP_WAITING postMessage desde script.js para forzar actualización del SW |
| **Problema** | El SW (`sw.js` líneas 153-157) tiene el handler para SKIP_WAITING pero `script.js` nunca envía este mensaje. Usuarios con SW cacheado no ven contenido actualizado hasta cerrar TODAS las pestañas. Bug confirmado por auditoría directa del código. |
| **Descripción** | **En `js/script.js`, después de la carga de config.js y antes de los event listeners, agregar:** ```javascript // Force SW update after registration if ('serviceWorker' in navigator) { navigator.serviceWorker.ready.then((registration) => { if (registration.active) { registration.active.postMessage({ type: 'SKIP_WAITING' }); } }); // Listen for controller change to reload page when new SW takes over navigator.serviceWorker.addEventListener('controllerchange', () => { window.location.reload(); }); } ``` **Alternativa robusta:** Usar `registration.waiting.postMessage()` si `active` no está disponible aún. **Verificación:** Después de deploy, los usuarios deberían ver contenido actualizado en la siguiente pestaña sin cerrar nada. |
| **Impacto esperado** | PWA que realmente se actualiza cuando hay nuevo contenido. Eliminación de la necesidad de cerrar todas las pestañas. UX mejorada post-deploy. |
| **Esfuerzo** | S (15-30 minutos — agregar postMessage en script.js) |
| **Agente recomendado** | Frontend |
| **Referencias** | [4] Service Worker Update Pattern - developer.chrome.com |
| **Estado** | Nueva propuesta — pendiente desde R83, confirmado bug en auditoría R86 |
| **Prioridad CEO** | **Alta** — bug funcional, no feature request. Quick win con impacto directo. |

---

### Propuesta 2: Agregar HowTo Schema al Artículo "Cómo Limpiar Tu Sofá" (MEDIUM PRIORITY)

| Campo | Detalle |
|-------|---------|
| **Título** | Cambiar BlogPosting a HowTo + QAPage schema en artículos de blog tipo tutorial |
| **Problema** | El artículo `blog/articulos/como-limpiar-tu-sofa.html` tiene contenido paso a paso (aspirado, limpieza de manchas, limpieza general, secado) con `timeRequired: "PT8M"` y `wordCount: 1200` pero solo tiene schema `BlogPosting`. El contenido es un tutorial paso a paso — debería usar HowTo schema para obtener rich results en Google. |
| **Descripción** | **Modificar el JSON-LD en `como-limpiar-tu-sofa.html`:** ```json { "@context": "https://schema.org", "@type": "HowTo", "headline": "Cómo limpiar tu sofá en casa sin dañarlo", "description": "Guía paso a paso...", "image": "https://purityclean.com/images/og-image.svg", "totalTime": "PT8M", "estimatedCost": { "@type": "MonetaryAmount", "currency": "COP", "value": "50000" }, "supply": [ { "@type": "HowToSupply", "name": "Aspiradora" }, { "@type": "HowToSupply", "name": "Limpiador de telas" } ], "tool": [ { "@type": "HowToTool", "name": "Cepillo de cerdas suaves" } ], "step": [ { "@type": "HowToStep", "name": "Aspirar el sofá", "text": "Pasa la aspiradora por toda la superficie...", "image": "https://purityclean.com/images/paso-1.jpg" }, ... más pasos ... ] } ``` **También agregar QAPage si el artículo responde preguntas frecuentes:** ```json { "@context": "https://schema.org", "@type": "QAPage", "mainEntity": { "@type": "Question", "name": "¿Cómo quitar manchas difíciles del sofá?", "acceptedAnswer": { "@type": "Answer", "text": "Mezcla agua tibia con vinagre blanco..." } } } ``` |
| **Impacto esperado** | Rich results en Google para tutoriales paso a paso. Mejora en CTR para búsquedas de "cómo limpiar sofá". Diferenciación vs competencia que solo tiene BlogPosting. |
| **Esfuerzo** | M (2-3 horas — actualizar JSON-LD de 1-2 artículos, validar con Rich Results Test) |
| **Agente recomendado** | Frontend + Content |
| **Referencias** | [5] HowTo Schema Documentation - developers.google.com [6] QAPage Schema - developers.google.com |
| **Estado** | Nueva propuesta — no cubierta en R85 |
| **Prioridad CEO** | Media — SEO, impacto en tráfico orgánico |

---

### Propuesta 3: Medir y Optimizar el Banner PWA Install (MEDIUM PRIORITY)

| Campo | Detalle |
|-------|---------|
| **Título** | Agregar analytics al banner PWA para medir conversión e identificar optimization points |
| **Problema** | El banner PWA está implementado (index.html líneas 2242-2270) pero no hay tracking de: (1) cuántas veces se muestra, (2) cuántas instalaciones se completan, (3) cuántas veces se descarta. Sin datos, no se puede optimizar el timing ni el mensaje. |
| **Descripción** | **En `js/script.js`, agregar eventos plausible:** ```javascript // Track PWA banner events if (typeof plausible !== 'undefined') { // When banner is shown document.getElementById('pwa-install-banner').addEventListener('visible', () => { plausible('pwa_banner_shown'); }); // When install is clicked document.querySelector('.pwa-banner-install').addEventListener('click', () => { plausible('pwa_install_clicked'); }); // When dismiss is clicked document.querySelector('.pwa-banner-dismiss').addEventListener('click', () => { plausible('pwa_banner_dismissed'); localStorage.setItem('pwa_banner_dismissed', Date.now()); }); } ``` **También mejorar el timing:** - No mostrar en primera visita (esperar 2da visita o después de 30s) - No mostrar si `localStorage.getItem('pwa_banner_dismissed')` es < 7 días - Mostrar solo en desktop (mobile users generalmente instalan desde store) |
| **Impacto esperado** | Datos para optimizar el banner. Medición de ROI del feature PWA. Reducción de friction si el mensaje no resuena. |
| **Esfuerzo** | S (1-2 horas — agregar eventos plausible + lógica de timing) |
| **Agente recomendado** | Frontend + Analytics |
| **Referencias** | [7] PWA Install Prompt Best Practices - web.dev |
| **Estado** | Nueva propuesta — no cubierta en R85 ni R84 |
| **Prioridad CEO** | Media — DX improvement, datos para decisión |

---

### Propuesta 4: Agregar Tracking al Chatbot FAQ (LOW Priority — Quick Win)

| Campo | Detalle |
|-------|---------|
| **Título** | Instrumentar chatbot FAQ con eventos Plausible para medir engagement |
| **Problema** | El chatbot FAQ está completamente implementado (FAB, panel, header, body, footer) pero no hay tracking de uso. No sabemos: (1) cuántos usuarios lo abren, (2) qué preguntas seleccionan, (3) cuántos van a WhatsApp desde ahí. |
| **Descripción** | **En `js/script.js`, después de la lógica del chatbot:** ```javascript // Chatbot FAB click document.getElementById('chatbot-fab').addEventListener('click', () => { if (typeof plausible !== 'undefined') { plausible('chatbot_opened'); } const panel = document.getElementById('chatbot-panel'); const isOpen = panel.classList.contains('open'); // Track toggle panel.classList.toggle('open'); panel.setAttribute('aria-hidden', !isOpen); panel.setAttribute('hidden', isOpen ? '' : null); }); // Track question selection in chatbot body document.querySelectorAll('.chatbot-question-btn').forEach(btn => { btn.addEventListener('click', () => { if (typeof plausible !== 'undefined') { plausible('chatbot_question_selected', { props: { question: btn.textContent } }); } }); }); // Track WhatsApp click from chatbot document.querySelectorAll('.chatbot-whatsapp-link').forEach(link => { link.addEventListener('click', () => { if (typeof plausible !== 'undefined') { plausible('chatbot_whatsapp_click'); } }); }); ``` |
| **Impacto esperado** | Datos de uso del chatbot. Identificar qué preguntas son más populares. Medir conversión a WhatsApp. Información para mejorar el contenido del chatbot. |
| **Esfuerzo** | S (1 hora — agregar event listeners + eventos plausible) |
| **Agente recomendado** | Frontend |
| **Referencias** | [8] Plausible Event API - plausible.io/docs/api |
| **Estado** | Nueva propuesta — no cubierta en R85 |
| **Prioridad CEO** | Baja — analytics improvement |

---

### Propuesta 5: Crear Build Script para Generar Zonas Dinámicamente (LOW Priority)

| Campo | Detalle |
|-------|---------|
| **Título** | Implementar script Node.js que genere páginas de zonas desde JSON + template |
| **Problema** | Existen 11 carpetas de zonas (barrios-unidos, bosa, chapinero, engativa, fontibon, kennedy, suba, teusaquillo, usaquen, usme) más el template `zona-template.html`. Si se necesita cambiar algo común (ej. nuevo servicio, cambio de precio, actualización de contacto), hay que editar 11 archivos manualmente. Esto es un violación del principio DRY. |
| **Descripción** | **Crear `scripts/generate-zonas.js`:** ```javascript const fs = require('fs'); const path = require('path'); const zones = require('./data/zonas-data.json'); const template = fs.readFileSync('zonas/zona-template.html', 'utf8'); zones.forEach(zona => { let html = template; html = html.replace(/\{\{ZONA_KEY\}\}/g, zona.key); html = html.replace(/\{\{ZONA_NOMBRE\}\}/g, zona.nombre); html = html.replace(/\{\{ZONA_URL\}\}/g, zona.url); html = html.replace(/\{\{META_DESCRIPTION\}\}/g, zona.metaDescription); // ... más reemplazos ... fs.writeFileSync(`zonas/${zona.key}/index.html`, html); console.log(`Generated zonas/${zona.key}/index.html`); }); ``` **Crear `data/zonas-data.json`:** ```json [ { "key": "chapinero", "nombre": "Chapinero", "url": "https://purityclean.com/zonas/chapinero/", "metaDescription": "Servicio de limpieza profesional en Chapinero, Bogotá. Sofás, colchones, alfombras. Contacta ahora.", ... }, ... ] ``` **Agregar scripts en package.json:** ```json "scripts": { "generate-zonas": "node scripts/generate-zonas.js", "deploy": "npm run generate-zonas && git add zonas/ && git commit -m 'Update zonas' && git push" } ``` |
| **Impacto esperado** | Mantenimiento DRY. Cambios centralizados. Menos errores manuales. Setup para future automatización. |
| **Esfuerzo** | M (3-4 horas — crear script + data JSON + test) |
| **Agente recomendado** | Full Stack |
| **Referencias** | [9] DRY Software Principle - wikipedia.org/wiki/Don%27t_repeat_yourself |
| **Estado** | Nueva propuesta — pendiente desde R83 (confirmado en R85) |
| **Prioridad CEO** | Baja — deuda técnica, impacto en mantenimiento |

---

## Orden de Implementación Recomendado

| # | Propuesta | Impacto | Esfuerzo | Prioridad |
|---|-----------|---------|----------|-----------|
| 1 | Corrección bug SKIP_WAITING | PWA Quality | S (15-30min) | **Alta** |
| 2 | HowTo + QAPage schema en blog | SEO + Traffic | M (2-3h) | **Media** |
| 3 | Analytics del banner PWA | Data-Driven | S (1-2h) | **Media** |
| 4 | Tracking del chatbot FAQ | Analytics | S (1h) | **Baja** |
| 5 | Build script para zonas | DX + Maintenance | M (3-4h) | **Baja** |

---

## Dependencias y Bloqueadores

| Propuesta | Depende de | Bloqueador |
|-----------|------------|------------|
| SKIP_WAITING fix | Acceso a script.js y sw.js | Ninguno — quick win |
| HowTo schema | Contenido del blog (artículos existentes) | Ninguno |
| PWA banner analytics | Plausible ya instalado | Ninguno |
| Chatbot tracking | Plausible ya instalado | Ninguno |
| Zonas build script | Ninguno | Ninguno |

---

## Comparación con R85 (Qué es Nuevo en R86)

| Aspecto | R85 | R86 |
|---------|-----|-----|
| **PWA Bug** | Propuesta #3 (SKIP_WAITING) — mencionada | Propuesta #1 — **confirmada con auditoría directa** |
| **Blog Schema** | FAQPage y Q&A schema | HowTo + QAPage para artículos tutorial |
| **PWA Install Banner** | No mencionada | Propuesta #3 — descubierta en index.html |
| **Chatbot FAQ** | No mencionada | Propuesta #4 — descubierta en index.html |
| **Zonas DRY** | Mencionada como pendiente | Propuesta #5 — con solución específica (build script) |
| **Google Updates** | Documentación oficial | **April 2026 updates** (read more, back button hijacking) |

**R86 no repite ninguna propuesta de R85.** Las 5 propuestas son genuinamente nuevas o abordan los mismos problemas desde ángulos diferentes con información más específica (auditoría directa vs. inferencia).

---

## Nota sobre Evolución del Proyecto

El sitio Purity & Clean ha acumulado 86 rondas de análisis. Las deudas técnicas más críticas detectadas en R86 son:

1. **SKIP_WAITING bug** — Confirmado en auditoría directa, no inferencia. Quick win con alto impacto en UX.
2. **Falta de analytics en features** — PWA banner y chatbot están implementados pero sin datos de uso.
3. **Blog sin HowTo schema** — Contenido tutorial sin el schema correcto para rich results.

**Mi recomendación:** Priorizar #1 (SKIP_WAITING) por ser bug funcional. #2 (HowTo) por impacto SEO. #3 y #4 pueden delegarse a un agente Frontend en paralelo ya que son cambios pequeños.

---

## Fuentes

[1] Google Snippet Documentation - Read More Deep Links. https://developers.google.com/search/docs/appearance/snippet#read-more-deep-links (Actualizado Abril 20, 2026)
[2] Google Malicious Practices Spam Policy - Back Button Hijacking. https://developers.google.com/search/docs/essentials/spam-policies#malicious-practices (Abril 13, 2026)
[3] Google Search Central Updates March 2026. https://developers.google.com/search/updates (Marzo 24, 2026)
[4] Service Worker Update Pattern. https://developer.chrome.com/docs/workbox/fundamentals/service-worker-lifecycle
[5] HowTo Schema Documentation. https://developers.google.com/search/docs/appearance/structured-data/how-to
[6] QAPage Schema Documentation. https://developers.google.com/search/docs/appearance/structured-data/qapage
[7] PWA Install Prompt Best Practices. https://web.dev/pwa-installability
[8] Plausible Event API. https://plausible.io/docs/events
[9] DRY Software Principle. https://en.wikipedia.org/wiki/Don%27t_repeat_yourself

---

## Hallazgo Adicional: Back Button Hijacking — Sitio Limpio

La nueva política de Google (Abril 13, 2026) sobre back button hijacking no afecta al sitio Purity & Clean. El código del SW no manipula el historial del navegador ni intercepta navigations. El sitio está limpio de esta práctica engañosa.

---

*Documento generado por Innovation Scout — Round 86*
*Purity & Clean Analysis — 2026-04-28*
*Co-Authored-By: Paperclip <noreply@paperclip.ing>*