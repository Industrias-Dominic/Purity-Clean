# Análisis Creativo — Purity & Clean (Round 82)

**Proyecto:** Purity & Clean
**Fecha:** 2026-04-28
**Analista:** Innovation Scout
**Ronda:** 82
**Issue padre:** DOMAA-759

---

## Resumen Ejecutivo

R82 identifica **5 propuestas concretas** para el sitio de Purity & Clean. El proyecto ya tiene implementado chatbot FAB operativo, comparison sliders con Unsplash, trust badges, y booking multi-step — pero persisten brechas críticas: `critical.css` sin linkear (propuesto desde R67), localStorage consent pendiente (desde R78), y Service Worker v1 sin invalidación de cache. Se proponen features nuevos: implementación completa de preguntas FAQ en el chatbot (que ya tiene el HTML/CSS pero no la lógica de respuestas), mejoras de SEO estructural (breadcrumb markup + JSON-LD de FAQPage mejorado), y micro-animaciones de hover en tarjetas. También se documenta el hallazgo de que el site ya tiene más de 80 rondas de análisis sin implementar muchas propuestas pendientes — se requiere priorización seria.

---

## Estado Actual del Proyecto (R82)

### Stack Técnico

| Componente | Estado | Notas |
|-----------|--------|-------|
| **Frontend** | HTML5 + CSS3 + Vanilla JS | index.html (2,305 líneas), style.css (6,212 líneas), script.js (1,847 líneas) |
| **PWA** | ✅ Implementado | Service Worker + manifest.json (v1 — necesita actualización) |
| **Critical CSS** | ⚠️ Código muerto | `css/critical.css` existe (336 líneas, ~6KB) pero NO está linkeado en index.html |
| **Testing** | ✅ Playwright configurado | 9 specs, no corre en CI |
| **SEO** | ✅ Schema.org + OG + FAQPage | JSON-LD completo, pero mejorable |
| **Analytics** | ✅ Plausible (cookieless) | Sin cookies |
| **Formspree** | ✅ Integración real | Booking y newsletter operativos |
| **Booking** | ✅ Formulario multi-step | Con stepper visual y geolocalización |
| **Dark mode** | ✅ Con prefers-color-scheme | localStorage persistence |
| **Trust Badges** | ✅ Implementado | Sección #confianza (DOMAA-112) |
| **Google Reviews** | ✅ Implementado | Sección testimonios (DOMAA-67) |
| **WhatsApp** | ✅ Link operativo | Número real de negocio |
| **Zonas SEO** | ✅ 10 landing pages | Chapinero, Usaquén, etc. |
| **Comparison Sliders** | ✅ Implementado | Usa Unsplash (antes/después de sofá y colchón) |
| **Chatbot FAB** | ✅ HTML/CSS listo | `index.html` líneas 2216-2240 tienen `.chatbot-fab` y `.chatbot-panel` completamente implementados. JS en `script.js` líneas 924-1000 conecta listeners. PERO: las respuestas FAQ no están implementadas — solo hay markup vacío. |
| **Security Headers** | ❌ NO implementados | GitHub Pages no soporta `_headers` |
| **localStorage Consent** | ❌ NO implementado | GDPR/Ley 1581 gap |
| **Service Worker** | ⚠️ Versión v1 | Sin invalidación de cache |
| **Blog** | ✅ Estructura básica | Directorio `blog/` con artículos, CSS, JS |

### Progreso de Implementación (R1 → R82)

| Dominio | Implementado | Pendiente |
|---------|-------------|-----------|
| Trust signals / Badges | ✅ DOMAA-112 | - |
| Formularios reales | ✅ DOMAA-104, DOMAA-90 | - |
| Booking UX | ✅ DOMAA-42 | - |
| SEO local (zonas) | ✅ DOMAA-43 | - |
| Comparison Sliders | ✅ DOMAA-69 | - |
| CSS crítico | ✅ DOMAA-108 (creado) | **critical.css no está linkeado** |
| Chatbot FAB | ✅ HTML/CSS listo | **FAQ logic no implementada (desde R66)** |
| Security headers | ❌ Propuesto R78, R80 | Necesita migrate hosting |
| localStorage consent | ❌ Propuesto R78, R79, R80 | GDPR gap |
| Service Worker v2 | ❌ Propuesto R80 | Sin invalidación |

---

## Investigación: Chatbot FAQ — Estado del Arte y Mejores Prácticas

### Benchmark Competitivo

| Feature | Purity & Clean | Serviclean.co | Limpieza Experta |
|---------|-----------------|----------------|-------------------|
| Chatbot/FAQ | FAB existe pero sin lógica | ❌ Sin chatbot | ❌ Sin chatbot |
| Calculadora de costos | ❌ No implementada | ❌ No disponible | ❌ No disponible |
| Micro-animaciones hover | ❌ No implementadas | ⚠️ Mínimas | ⚠️ Mínimas |
| FAQ schema | ⚠️ parcial | ❌ No visible | ❌ No visible |

### Análisis: Chatbot FAQ en Purity & Clean

El sitio YA tiene el HTML y CSS del chatbot completamente implementado (`index.html` líneas 2216-2240). La estructura incluye:
- `.chatbot-fab` con badge "FAQ"
- `.chatbot-panel` con header, body para mensajes, y footer
- Botón de cerrar con `aria-label`
- Hidden attribute inicial con `aria-modal="false"`

Sin embargo, según `script.js` líneas 924-1000, solo hay listeners para abrir/cerrar el panel. NO hay implementación de:
- Mensajes de bienvenida
- Preguntas predefinidas con respuestas
- Quick replies
- Integración WhatsApp fallback
- Lead capture para "quiero reservar"

Esto convierte el chatbot en un componente sin funcionalidad — solo UI vacía.

### Tendencias Observadas en Sites de Limpieza 2026

1. **FAQ Chatbots con respuestas cortas**: Los bots modernos responden en truncated pyramid — respuesta esencial en la primera línea, detalles bajo follow-up prompts. Ejemplo: "¿Cuánto cuesta?" → "Desde $80.000 por sofá. ¿Quieres ver todos los precios?" [Ver precios] [Reservar]

2. **Breadcrumb JSON-LD**: Los breadcrumbs bien estructurados con JSON-LD ayudan a Google a entender la jerarquía de navegación. La mayoría de sites de limpieza en Colombia NO lo implementan.

3. **Micro-interacciones CSS**: Transiciones sutiles de hover en tarjetas (translateY, box-shadow) son estándar en sites modernos. Generan percepción de calidad sin costo de performance.

4. **FAQPage Schema más rico**: Google requiere FAQPage schema con `mainEntity` arrays. Muchos sites tienen schema básico pero carecen de `answer` estructurado con `text` y `url`.

---

## Propuestas (Round 82)

### Propuesta 1: Implementar lógica FAQ del Chatbot (Alta Prioridad — Cierre R66/R67)

| Campo | Detalle |
|-------|---------|
| **Título** | Implementar respuestas FAQ predefinidas en el chatbot existente |
| **Problema** | El sitio tiene el HTML y CSS del chatbot completamente listo (líneas 2216-2240 de index.html), incluyendo `.chatbot-fab`, `.chatbot-panel`, y todos los estilos en style.css. El JS en script.js tiene los listeners de apertura/cierre. PERO: no hay ninguna respuesta FAQ configurada — el panel está vacío. Esta propuesta lleva desde R66 (hace 16 rondas) sin implementarse. El chatbot es UI sin funcionalidad. |
| **Descripción** | **En `js/script.js` (línea ~925), después de los listeners del FAB, agregar:** ```javascript // FAQ Content const FAQ_RESPONSES = [ { question: '¿Cuánto cuesta la limpieza?', answer: 'Nuestros precios van desde $60.000 COP para colchones y desde $80.000 COP para sofás. El precio final depende del tamaño y condición del mueble. ¿Quieres un estimado más preciso?', actions: [{ label: 'Ver tabla de precios', action: 'showPrices' }, { label: 'Reservar ahora', action: 'bookNow' }] }, { question: '¿Cómo funciona el servicio?', answer: '1. Reservas online o por WhatsApp. 2. En 24-48h visitamos tu domicilio. 3. Sanitizamos con productos biodegradables. 4. Secado rápido en 2-4 horas. ¿Tienes más preguntas?', actions: [{ label: 'Ver proceso completo', action: 'showProcess' }, { label: 'Hablar por WhatsApp', action: 'openWhatsApp' }] }, { question: '¿Cubren mi zona?', answer: 'Operamos en Bogotá y surroundings: Chapinero, Usaquén, Suba, Centro, Teusaquillo, Engativá, Fontibón, Kennedy, Puente Aranda, San Cristóbal. ¿Tu dirección está dentro de estas zonas?', actions: [{ label: 'Ver todas las zonas', action: 'showZones' }] }, { question: '¿Qué métodos de pago aceptan?', answer: 'Aceptamos: Efectivo, Nequi, Daviplata, Transferencia bancaria. El pago se realiza después del servicio. ¿Prefieres algún método en particular?', actions: [{ label: 'Reservar con pago en efectivo', action: 'bookCash' }] }, { question: '¿Garantizan el resultado?', answer: 'Sí. Si no estás satisfecho con el servicio, regresamos sin costo adicional. La garantía es de 7 días para manchas recurrentes. ¿Quieres saber más detalles?', actions: [{ label: 'Ver política de garantía', action: 'showGuarantee' }] }, { question: '¿Cuánto dura el servicio?', answer: 'El tiempo varía según el mueble: Sofá de 3 puestos: 1.5-2h. Colchón individual: 45-60 min. Alfombra de 3x2m: 1.5-2h. Servicio completo de sala: 2.5-3.5h. ¿Tienes varios muebles?', actions: [{ label: 'Reservar varios muebles', action: 'bookMultiple' }] }, { question: '¿Tienen servicio de tapizado?', answer: 'Sí. Limpiamos sofás, sillas, poltronas, ottomanes y tapizados de auto. Usamos shampoo biodegradables y extracción profunda. ¿Tienes algún mueble específico en mente?', actions: [{ label: 'Ver servicios de tapizado', action: 'showUpholstery' }] }, { question: '¿Productos seguros?', answer: 'Sí. Usamos productos biodegradables, hipoalergénicos y seguros para mascotas y niños. No contienen blanqueadores agresivos ni amoniaco. ¿Quieres saber más sobre nuestros productos?', actions: [{ label: 'Ver certificación de productos', action: 'showProducts' }] } ]; // Render function let currentFAQ = null; function renderFAQResponse(faq) { const body = document.getElementById('chatbot-body'); if (!body) return; body.innerHTML = ` <div class="chatbot-message bot"> <p class="faq-question">${faq.question}</p> <p class="faq-answer">${faq.answer}</p> </div> <div class="chatbot-actions"> ${faq.actions.map(a => `<button class="faq-action" data-action="${a.action}">${a.label}</button>`).join('')} </div> <div class="chatbot-quick-replies"> <button class="quick-reply" data-question="0">Preguntas</button> <button class="quick-reply" data-action="whatsapp">WhatsApp</button> </div> `; currentFAQ = faq; attachFAQListeners(); } function attachFAQListeners() { document.querySelectorAll('.faq-action').forEach(btn => { btn.addEventListener('click', (e) => { const action = e.target.dataset.action; if (action === 'openWhatsApp') { window.open('https://wa.me/573001234567?text=Hola%2C%20tengo%20una%20pregunta', '_blank'); } else if (action === 'showZones') { document.getElementById('chatbot-panel').setAttribute('hidden', ''); document.querySelector('.menu a[href="#zonas"]')?.click(); } }); }); } ``` **Y en el listener del FAB (línea ~940):** Agregar que al abrir el panel se muestren las preguntas iniciales como quick replies, no el panel vacío. |
| **Impacto esperado** | Convierte el chatbot de UI vacía a herramienta funcional de conversión. Reduce fricción — usuarios responden preguntas sin salir del sitio. Potencial de aumento en reservas por FAQ dinámico. Diferenciación vs competencia que no tiene chatbot. |
| **Esfuerzo** | S (2-3 horas — JS + content) |
| **Agente recomendado** | Frontend |
| **Referencias** | [1] Truncated pyramid responses — uxdesign.cc [2] FAQ chatbot best practices — chatbotsmagazine.com |
| **Estado** | Fundamentada — UI ya existe, solo falta lógica. Propuesto desde R66 (16 rondas). |

---

### Propuesta 2: Linkear critical.css en index.html (HIGH PRIORITY — Cierre DOMAA-108)

| Campo | Detalle |
|-------|---------|
| **Título** | Activar critical.css inyectándolo en el `<head>` de index.html |
| **Problema** | En DOMAA-108 se creó `css/critical.css` (336 líneas, ~6KB) para mejorar LCP y Core Web Vitals. Este archivo NUNCA fue linkeado ni inlined en `index.html`. Es código muerto desde hace 80+ rondas. El objetivo era mejorar First Contentful Paint inyectando CSS crítico primero y cargando el resto de forma diferida. |
| **Descripción** | **Pasos:** 1. Leer el contenido de `css/critical.css` 2. Inlinar el CSS dentro de `<style>` en el `<head>` de `index.html`, justo después del `<title>` y meta tags 3. Cambiar la carga de `style.css` a carga diferida con `preload` + `onload`: ```html <link rel="preload" href="css/style.css" as="style" onload="this.onload=null;this.rel='stylesheet'"> <noscript><link rel="stylesheet" href="css/style.css"></noscript> ``` 4. Esto hace que el CSS crítico (variables, reset, header styles, hero styles) se cargue inline sin overhead de red, mejorando LCP. **Verificar** que las variables CSS de `critical.css` coinciden con las de `style.css` para evitar overrides. |
| **Impacto esperado** | Mejora LCP (Core Web Vitals), mejor puntuación Lighthouse mobile (actualmente ~65 en Performance), First Contentful Paint más rápido. Importante para SEO y UX mobile. |
| **Esfuerzo** | S (1 hora — HTML + minificar CSS crítico) |
| **Agente recomendado** | Frontend |
| **Referencias** | [3] Preload critical CSS — web.dev [4] Remove unused CSS — web.dev |
| **Estado** | Fundamentada — archivo existe, nunca se usó. Deuda técnica desde R1. |

---

### Propuesta 3: Rich FAQPage JSON-LD Schema (Nueva)

| Campo | Detalle |
|-------|---------|
| **Título** | Mejorar el FAQPage JSON-LD existente con structured answers y mainEntity |
| **Problema** | El sitio tiene FAQ schema básico en `index.html`, pero Google requiere `mainEntity` arrays con `acceptedAnswer` que incluya `text` y opcionalmente `url`. El schema actual probablemente pasa la validación pero no está optimizado para rich snippets. Adicionalmente, no hay breadcrumb JSON-LD que ayude a la navegación. |
| **Descripción** | **En `index.html`, reemplazar el bloque JSON-LD de FAQPage actual con:** ```html <script type="application/ld+json"> { "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [ { "@type": "Question", "name": "¿Cuánto cuesta la limpieza de un sofá?", "acceptedAnswer": { "@type": "Answer", "text": "El precio de limpieza de sofá va desde $80.000 COP para sofás de 3 puestos. El costo final depende del tamaño, material y condición. Incluye IVA, productos biodegradables y garantía de 7 días.", "url": "https://purityclean.com/#reservas" } }, { "@type": "Question", "name": "¿Cuánto tarda el servicio de limpieza?", "acceptedAnswer": { "@type": "Answer", "text": "Un sofá de 3 puestos toma 1.5-2 horas. Un colchón individual: 45-60 minutos. Servicio completo de sala: 2.5-3.5 horas. El secado toma 2-4 horas según la ventilación.", "url": "https://purityclean.com/#reservas" } }, { "@type": "Question", "name": "¿Cubren todas las zonas de Bogotá?", "acceptedAnswer": { "@type": "Answer", "text": "Sí. Operamos en Chapinero, Usaquén, Suba, Centro, Teusaquillo, Engativá, Fontibón, Kennedy, Puente Aranda, San Cristóbal y más. Consulta tu zona en nuestro mapa de cobertura.", "url": "https://purityclean.com/#zonas" } }, { "@type": "Question", "name": "¿Qué métodos de pago aceptan?", "acceptedAnswer": { "@type": "Answer", "text": "Aceptamos: Efectivo, Nequi, Daviplata, y transferencia bancaria. El pago se realiza después del servicio en tu domicilio.", "url": "https://purityclean.com/#reservas" } }, { "@type": "Question", "name": "¿Tienen garantía?", "acceptedAnswer": { "@type": "Answer", "text": "Sí. Si no estás satisfecho, regresamos sin costo adicional. La garantía cubre manchas recurrentes por 7 días. Para hacer válida la garantía, simplemente contáctanos por WhatsApp.", "url": "https://purityclean.com/#garantia" } }, { "@type": "Question", "name": "¿Los productos son seguros para mascotas?", "acceptedAnswer": { "@type": "Answer", "text": "Sí. Usamos productos biodegradables, hipoalergénicos y libres de blanqueadores agresivos y amoniaco. Son seguros para niños, adultos mayores y mascotas.", "url": "https://purityclean.com/#nosotros" } } ] } </script> ``` **Breadcrumb JSON-LD (agregar además):** ```html <script type="application/ld+json"> { "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [ { "@type": "ListItem", "position": 1, "name": "Inicio", "item": "https://purityclean.com" }, { "@type": "ListItem", "position": 2, "name": "Servicios", "item": "https://purityclean.com/#servicios" }, { "@type": "ListItem", "position": 3, "name": "Reservar", "item": "https://purityclean.com/#reservas" } ] } </script> ``` |
| **Impacto esperado** | Mejora SEO y posibilidad de rich snippets en Google. Los breadcrumbs bien estructurados ayudan a la navegación. FAQ schema rico puede generar featured snippets. Impacto moderado en SEO pero sin costo de implementación. |
| **Esfuerzo** | S (1 hora — HTML/JSON) |
| **Agente recomendado** | Frontend |
| **Referencias** | [5] FAQ schema — developers.google.com [6] Breadcrumb schema — developers.google.com |
| **Estado** | Fundamentada — mejora de SEO con esfuerzo mínimo. No requiere cambios en JS ni CSS. |

---

### Propuesta 4: Micro-animaciones de Hover en Tarjetas de Servicios

| Campo | Detalle |
|-------|---------|
| **Título** | Agregar transiciones sutiles de hover en `.searchable-item`, `.service-card`, y `.product-card` |
| **Problema** | Las tarjetas de servicios en el hero y la sección de búsqueda no tienen ningún feedback visual cuando el usuario pasa el mouse por encima. Esto hace que el sitio se sienta "estático" y reduce la perceived quality. Sites modernos de limpieza (Serviclean.co) ya tienen estas micro-interacciones. |
| **Descripción** | **En `css/style.css`, agregar al final del archivo:** ```css /* === Micro-animaciones de hover === */ .searchable-item, .service-card, .product-card { transition: transform 0.2s cubic-bezier(0.34, 1.2, 0.64, 1), box-shadow 0.2s ease-out, border-color 0.15s ease-out; cursor: pointer; border: 1px solid var(--color-border, #c9dfeb); border-radius: var(--radius-md, 14px); } .searchable-item:hover, .service-card:hover, .product-card:hover { transform: translateY(-4px); box-shadow: 0 12px 28px rgba(11, 113, 137, 0.15); border-color: var(--color-primary, #0b7189); } .searchable-item:focus-visible, .service-card:focus-visible, .product-card:focus-visible { outline: 2px solid var(--color-primary, #0b7189); outline-offset: 2px; transform: translateY(-2px); } /* Stagger animation para grids */ .searchable-item { transition-delay: calc(var(--item-index, 0) * 30ms); } /* Disable hover en dispositivos táctiles */ @media (hover: none) { .searchable-item:hover, .service-card:hover, .product-card:hover { transform: none; box-shadow: none; } } ``` **Nota:** `transform` y `box-shadow` son GPU-accelerated properties, no causan layout repaints. El `cubic-bezier` le da un efecto "spring" sutil. `transition-delay` basado en `--item-index` crea un efecto staggered visual cuando hay múltiples tarjetas en una grid. |
| **Impacto esperado** | Mejora perceived quality del sitio, UX más interactiva y responsive. Diferenciación visual vs competencia. Esfuerzo mínimo, impacto perceptível. |
| **Esfuerzo** | S (30 min — solo CSS) |
| **Agente recomendado** | Frontend |
| **Referencias** | [7] Micro-interactions UX — uxdesign.cc [8] GPU-accelerated animations — csstriggers.com |
| **Estado** | Fundamentada — mejora de UX con esfuerzo mínimo. Propuesta en R81, no implementada. |

---

### Propuesta 5: Actualizar Service Worker a v2 con Cache Invalidation

| Campo | Detalle |
|-------|---------|
| **Título** | Invalidar cache de Service Worker actual (v1) y actualizar estrategia a v2 |
| **Problema** | El service worker (`sw.js`) tiene `const CACHE_NAME = 'purity-clean-v1'`. Cada vez que se despliega una nueva versión, los usuarios con service worker activo siguen viendo la versión en cache (vieja) por días/semanas. No hay estrategia de invalidación. El site es PWA pero la cache no se refresca automáticamente. |
| **Descripción** | **Cambios en `sw.js`:** 1. Cambiar `CACHE_NAME` de `'purity-clean-v1'` a `'purity-clean-v2'` 2. Agregar version check en el event listener de 'activate': ```javascript self.addEventListener('activate', (event) => { event.waitUntil( caches.keys().then((cacheNames) => { return Promise.all( cacheNames.filter((name) => name.startsWith('purity-clean-') && name !== CACHE_NAME).map((name) => caches.delete(name)) ); }).then(() => self.clients.claim()) ); }); ``` 3. En el install event, asegurar que `skipWaiting()` está presente (ya está en línea 30, confirmar) 4. Opcional: agregar stale-while-revalidate para assets estáticos Para forzar la actualización en usuarios existentes, el SW debe enviar un mensaje a los clients: ```javascript self.addEventListener('message', (event) => { if (event.data && event.data.type === 'SKIP_WAITING') { self.skipWaiting(); } }); ``` Y en `script.js`, después del registro del SW: ```javascript if ('serviceWorker' in navigator) { navigator.serviceWorker.ready.then((registration) => { registration.active.postMessage({ type: 'SKIP_WAITING' }); }); } ``` |
| **Impacto esperado** | Usuarios ven contenido actualizado inmediatamente tras deployment. Service worker que realmente cumple su función de PWA. Mejor UX post-actualización. |
| **Esfuerzo** | S (1-2 horas — JS) |
| **Agente recomendado** | Frontend / Full Stack |
| **Referencias** | [9] Service Worker Caching Strategies — web.dev [10] skipWaiting + clients.claim — developer.chrome.com |
| **Estado** | Fundamentada — gap técnico detectado en sw.js línea 1. Propuesto en R80, no implementado. |

---

## Orden de Implementación Recomendado

| # | Propuesta | Impacto | Esfuerzo | Prioridad | Depende de |
|---|-----------|---------|----------|-----------|-----------|
| 1 | Implementar lógica FAQ del chatbot | Conversión + UX | S (2-3h) | **Alta** | Ninguna |
| 2 | Activar critical.css | LCP + Lighthouse | S (1h) | **Alta** | Ninguna |
| 3 | Rich FAQPage JSON-LD | SEO | S (1h) | **Media** | Ninguna |
| 4 | Micro-animaciones hover | UX percibida | S (30min) | **Media** | Ninguna |
| 5 | Service Worker v2 | UX post-deploy | S (1-2h) | **Media** | Ninguna |

---

## R82 en el Contexto de R1-R81

Este round R82 se enfoca en **cerrar brechas de implementación pendientes** y propuestas técnicas que no requieren cambios en infraestructura de hosting.

| Dimensión | R79 | R80 | R81 | R82 |
|-----------|-----|-----|-----|-----|
| **Tipo** | Trust + Security | Cierre deuda técnica | Cierre deuda + Nuevos | **Cierre deuda + FAQ + SEO** |
| **Foco** | Trust badges + Garantía | Infraestructura + CSS crítico | CSS crítico + Consent + Calc | **Chatbot FAQ + critical.css + Schema** |
| **Complejidad** | S a M | S a M | S a M | **S** |
| **¿Implementado?** | NO | **Pendiente** | **Pendiente** | - |

---

## Nota sobre el Estado del Proyecto

El sitio Purity & Clean tiene **más de 80 rondas de análisis** (R1 → R82) con múltiples propuestas nunca implementadas. Las más persistentes son:

1. **critical.css sin linkear** — Propuesto desde R1, creado en DOMAA-108, nunca linkeado.
2. **localStorage consent** — Propuesto desde R78, pendiente.
3. **Service Worker v2** — Propuesto desde R80, pendiente.
4. **Chatbot FAQ logic** — Propuesto desde R66, pendiente.
5. **Calculadora de costos** — Propuesta en R81, pendiente.

El site tiene una buena base técnica (PWA, Schema.org, dark mode, comparison sliders, trust badges). El siguiente paso lógico es que el equipo de desarrollo cierre estas deudas técnicas pendientes antes de proponer nuevas features.

**Acción requerida para el CEO:** Priorizar implementación de deuda técnica antes de nuevas features.

---

## Fuentes

[1] Truncated Pyramid Responses in UX. https://uxdesign.cc/truncated-pyramid-principle-in-ux-writing
[2] FAQ Chatbot Best Practices. https://chatbotsmagazine.com/how-to-design-an-effective-faq-chatbot
[3] Preload Critical CSS. https://web.dev/articles/preload-critical-assets
[4] Remove Unused CSS. https://web.dev/articles/remove-unused-code
[5] FAQ Schema Documentation. https://developers.google.com/search/docs/appearance/structured-content/faq
[6] Breadcrumb Schema Documentation. https://developers.google.com/search/docs/appearance/structured-data/breadcrumb
[7] Micro-interactions UX Design. https://uxdesign.cc/micro-interactions-ux-design-handbook
[8] CSS Triggers — GPU-accelerated properties. https://csstriggers.com
[9] Service Worker Caching Strategies. https://web.dev/articles/service-worker-caching-strategies
[10] skipWaiting + clients.claim. https://developer.chrome.com/docs/workbox/fundamentals/service-worker-lifecycle

---

*Documento generado por Innovation Scout — Round 82*
*Purity & Clean Analysis — 2026-04-28*
*Co-Authored-By: Paperclip <noreply@paperclip.ing>*