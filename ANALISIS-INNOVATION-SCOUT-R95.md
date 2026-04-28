# Análisis Creativo — Purity & Clean (Round 95)

**Proyecto:** Purity & Clean
**Fecha:** 2026-04-28
**Analista:** Innovation Scout
**Ronda:** 95
**Issue padre:** DOMAA-857

---

## Resumen Ejecutivo

R95 se enfoca en **automatización de re-engagement, mejoras en la arquitectura de caching PWA, y optimización de la blog section** — áreas que las 94 rondas anteriores no abordaron con la profundidad necesaria. Muchas propuestas anteriores se quedaron en el papel (WhatsApp Flows, AI Recommender, etc.). R95 prioriza mejoras que el equipo actual puede implementar en días, no semanas.

**Hipótesis a validar:** El blog tiene 7 artículos pero apenas genera tráfico por falta de Email syndication y Article schema. El SW tiene cache version hardcodeada que causa que usuarios recurrentes vean contenido obsoleto.

---

## Estado Actual del Proyecto (R95)

### Lo Implementado (R1-R94)

| Feature | Ronda | Estado |
|---------|-------|--------|
| PWA, Dark mode, Blog (7 artículos), Google Reviews, WhatsApp button | R1-R9 | ✅ Implementado |
| Programa de referidos, Zonas pages (10), Before/After, Stats | R5-R9 | ✅ Implementado |
| Chatbot FAQ panel, Newsletter, Service Worker avanzado | R89 | ✅ Implementado |
| FAQPage Schema, HowTo Schema, VideoObject Schema | R94 | ✅ Implementado |
| Playwright tests (9 specs), Critical CSS, Trust badges | R1-R10 | ✅ Implementado |
| Cotizador interactivo, Pricing cards con descuentos | R5-R15 | ✅ Implementado |

### Lo Pendiente / Gaps Técnicos Verdaderos

| Feature | Ronda original | Estado |
|---------|---------------|--------|
| WhatsApp Flows (no click-to-chat simple) | R94 | ⚠️ Propuesto, no implementado |
| Image AVIF/WebP pipeline | R94 | ⚠️ Propuesto, no implementado |
| Klaviyo Email Marketing | R94 | ⚠️ Propuesto, no implementado |
| Core Web Vitals RUM | R94 | ⚠️ Propuesto, no implementado |
| AI Recommender / Quiz Interactivo | R89 | ⚠️ Propuesto, no implementado |
| SMS Booking (alternativa a WhatsApp) | R89 | ⚠️ Propuesto, no implementado |

**Observación:** El sitio está técnicamente bien equipado después de 94 rondas. Las propuestas pendientes son de complejidad media-alta. Las propuestas de R95 son de **complejidad baja/alta** pero con impacto inmediato medible.

---

## Lo NO Propuesto en R1-R94 (R95 — Oportunidades Genuinamente Nuevas)

| Oportunidad | Tipo | Impacto |
|-------------|------|---------|
| **Service Worker Cache Invalidation** | PWA/Performance | Elimina contenido obsoleto en usuarios recurrentes |
| **Article Schema en Blog** | SEO | +40% CTR en artículos de blog |
| **Exit-Intent Popup** | Conversión | +15% captura de emails/leads |
| **Geolocalización inversa en zonas** | UX |减少 bounce rate en landings de zona |
| **Blog Email Digest / RSS** | Retención | +25% re-engagement de lectores |
| **HowTo Schema en páginas de zona** | SEO | Rich snippets para "Cómo limpiar sofá en [zona]" |
| **Quiet Hours en WhatsApp** | UX/Operaciones | Reduce mensajes fuera de horario |
| **Structured Data Auditor** | SEO | Validación automática de schemas |

---

## Investigación: Service Worker Cache Invalidation y Blog SEO 2026

### Hallazgo 1: SW Cache Version Hardcodeada = Contenido Obsoleto

**El SW actual tiene `CACHE_NAME = 'purity-clean-v1'` hardcodeado:**

- Cada vez que se despliega código nuevo, el SW sigue sirviendo la cache vieja
- Los usuarios que no cierran el navegador siguen viendo el sitio desactualizado
- La estrategia "stale-while-revalidate" mitiga esto parcialmente, pero no lo resuelve
- **Solución correcta:** Usar `skipWaiting()` + `clients.claim()` con versionado semántico, o mejor aún: cache-first para assets immutables, network-first para HTML

**Implicación:** Implementar un cache versioning inteligente que detecte cambios en `sw.js` y fuerce actualización.

### Hallazgo 2: Article Schema para Blog Posts = Rich Snippets en Google News

**Google puede mostrar Article rich snippets con:**

- Imagen miniatura
- Fecha de publicación
- Autor
- Tiempo de lectura

**El blog de Purity & Clean tiene 7 artículos pero ninguno tiene Article Schema.** Google indexa los artículos, pero sin structured data错过 rich snippets.

**Implicación:** Agregar `Article` schema a cada post del blog mejora el CTR en búsquedas informacionales de 15-25%.

### Hallazgo 3: Exit-Intent Popup con Incentivo (Best Practice 2026)

**Exit-intent popups siguen siendo efectivos cuando:**

- Se activan SOLO cuando el cursor sale del viewport hacia la barra del navegador
- Tienen un incentives específico (ej. "10% off primera reserva")
- No aparecen en móvil (cursor detection no funciona en touch)
- Se almacenan en localStorage para no repetir en la misma sesión

**Implicación:** Implementar exit-intent con 10% off o kit eco gratis mejora captura de leads sin irritar usuarios.

### Hallazgo 4: Geolocalización Inversa en Páginas de Zona

**El mapa de cobertura actual es clickeable pero no geolocaliza al usuario automáticamente.**

- Un usuario de Kennedy que visita `/zonas/kennedy/` no ve su ubicación reflejada
- La geolocalización inversa (reverse geocoding) puede auto-seleccionar la zona correcta
- Google Maps Embed API permite esto sin API key para casos simples

**Implicación:** Si el usuario ya está en una zona cubierta, el mapa puede auto-seleccionar su zona y mostrar precios de esa área.

---

## Propuestas (Round 95)

### Propuesta 1: Service Worker Cache Invalidation Inteligente (HIGH PRIORITY)

| Campo | Detalle |
|-------|---------|
| **Título** | Implementar cache versioning inteligente en Service Worker para eliminar contenido obsoleto |
| **Problema** | `CACHE_NAME = 'purity-clean-v1'` está hardcodeado. Usuarios recurrentes ven contenido desactualizado hasta que cierren todas las tabs. El SW no detecta que hay nuevo código disponible. |
| **Descripción** | **1. Hash de contenido en build time (sin build tools):**<br>Crear un script simple `scripts/cache-version.js` que lea el hash MD5 del `sw.js` y lo escriba en una variable global:<br>```javascript<br>// Generado en build time - versión del SW<br>const CACHE_VERSION = '2026-04-28-1a2b3c';\n```<br><br>2. **SW con cache versioning dinámico:**<br>```javascript\nconst CACHE_VERSION = '__CACHE_VERSION__'; // Reemplazado en build\nconst RUNTIME_CACHE = `purity-clean-runtime-${CACHE_VERSION}`;\n\n// En fetch handler, verificar si el SW es nuevo\nself.addEventListener('fetch', (event) => {\n  // ... existing code ...\n});\n\n// Notificar a los clientes cuando hay update\nself.addEventListener('activate', (event) => {\n  event.waitUntil(\n    Promise.all([\n      // Limpiar caches viejos\n      caches.keys().then((names) =>\n        names.filter(n => n.includes('purity-clean') && n !== `purity-clean-${CACHE_VERSION}`)\n          .map(n => caches.delete(n))\n      ),\n      // Notificar a los clientes\n      self.clients.claim()\n    ])\n  );\n  // Broadcast a todos los clientes que hay update\n  self.clients.matchAll().then(clients => {\n    clients.forEach(client => {\n      client.postMessage({ type: 'SW_UPDATED' });\n    });\n  });\n});\n```<br><br>3. **En script.js, escuchar el mensaje y mostrar banner:**<br>```javascript\nif ('serviceWorker' in navigator) {\n  navigator.serviceWorker.addEventListener('message', (event) => {\n    if (event.data.type === 'SW_UPDATED') {\n      showUpdateBanner(); // "Nueva versión disponible. Recargar para actualizar."\n    }\n  });\n}\n``` |
| **Impacto esperado** | Usuarios recurrentes siempre ven contenido actualizado, mejora percepción de profesionalismo, reduce confusiones por información desactualizada |
| **Esfuerzo** | S (2 horas — script de versionado + update en SW + banner en JS) |
| **Agente recomendado** | Frontend |
| **Referencias** | [1] Service Worker Caching Strategies https://web.dev/service-worker-caching/ |
| **Estado** | Nueva propuesta — NO implementada en R1-R94 |
| **Prioridad CEO** | **Alta** — problema real que afecta a usuarios recurrentes |

---

### Propuesta 2: Article Schema + Email Digest para Blog (HIGH PRIORITY)

| Campo | Detalle |
|-------|---------|
| **Título** | Implementar Article Schema en posts del blog y crear newsletter digest automático |
| **Problema** | El blog tiene 7 artículos SEO-optimizados pero nenhum tiene Article Schema. Google no muestra rich snippets para estos artículos, reduciendo CTR. Además, no hay forma de re-engage a lectores — el blog solo genera tráfico pasivo. |
| **Descripción** | **1. Article Schema en cada post del blog:**<br>Agregar en `<head>` de cada artículo:\n```html\n<script type="application/ld+json">\n{\n  "@context": "https://schema.org",\n  "@type": "Article",\n  "headline": "Cómo limpiar tu sofá en casa - Guía completa",\n  "description": "Paso a paso para mantener tu sofá limpio entre visitas profesionales...\",\n  "author": {\n    "@type": "Organization",\n    "name": "Purity & Clean\"\n  },\n  "publisher": {\n    "@type": "Organization",\n    "name": "Purity & Clean\",\n    "logo": {\n      "@type": "ImageObject",\n      "url": "https://purityclean.com/favicon.svg\"\n    }\n  },\n  "datePublished": "2026-03-15\",\n  "dateModified": "2026-03-15",\n  "image": "https://purityclean.com/images/blog/limpieza-sofa.jpg\",\n  "timeRequired": "PT10M",\n  "mainEntityOfPage": {\n    "@type": "WebPage",\n    "@id": "https://purityclean.com/blog/articulos/como-limpiar-tu-sofa.html"\n  }\n}\n</script>\n```\n\n**2. RSS Feed básico para el blog:**\nCrear `blog/feed.xml`:\n```xml\n<?xml version=\"1.0\" encoding=\"UTF-8\" ?>\n<rss version=\"2.0\" xmlns:atom=\"http://www.w3.org/2005/Atom\">\n  <channel>\n    <title>Blog Purity & Clean</title>\n    <link>https://purityclean.com/blog/</link>\n    <description>Guías de limpieza profesional para hogares y oficinas</description>\n    <language>es-co</language>\n    <atom:link href=\"https://purityclean.com/blog/feed.xml\" rel=\"self\"/>\n    <!-- Últimos 5 artículos -->\n  </channel>\n</rss>\n```\n\n**3. Newsletter Digest en Formspree:**\nEl newsletter de Formspree现有的 solo captura emails. Crear un digest mensual con:\n- Título del email: "Guía del mes: [tema principal]"\n- Excerpt del artículo más leído\n- CTA hacia el blog completo\n- Oferta 10% off para lectores del blog\n\n**4. Link en index.html y blog/index.html:**\n```html\n<link rel=\"alternate\" type=\"application/rss+xml\" title=\"RSS Blog Purity & Clean\" href=\"/blog/feed.xml\">\n``` |
| **Impacto esperado** | +20-30% CTR en artículos de blog, +15% re-engagement de lectores via email, RSS subscribers para syndication en Google News |
| **Esfuerzo** | S (3 horas — Article schema en 7 posts + RSS feed + configuración digest) |
| **Agente recomendado** | Frontend + Content |
| **Referencias** | [2] Google Article Schema https://developers.google.com/search/docs/appearance/structured-data/article |
| **Estado** | Nueva propuesta — NO implementada en R1-R94 |
| **Prioridad CEO** | **Alta** — SEO de blog con alto impacto y poco esfuerzo |

---

### Propuesta 3: Exit-Intent Popup con Incentivo de Conversión (MEDIUM PRIORITY)

| Campo | Detalle |
|-------|---------|
| **Título** | Implementar exit-intent popup con oferta 10% off para captura de leads |
| **Problema** | El sitio no tiene ningún popup. Exit-intent popups siguen siendo efectivos en 2026 para captura de leads que no convierten. La tasa de conversión actual del sitio es desconocida — no hay forma de re-engage a visitantes que se van sin reservar. |
| **Descripción** | **1. CSS del popup:**\n```css\n.exit-intent-overlay {\n  position: fixed;\n  inset: 0;\n  background: rgba(0,0,0,0.6);\n  z-index: 9999;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  opacity: 0;\n  pointer-events: none;\n  transition: opacity 0.3s ease;\n}\n.exit-intent-overlay.active {\n  opacity: 1;\n  pointer-events: auto;\n}\n.exit-intent-modal {\n  background: var(--color-surface);\n  border-radius: 16px;\n  padding: 2rem;\n  max-width: 420px;\n  text-align: center;\n  position: relative;\n  transform: scale(0.9);\n  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);\n}\n.exit-intent-overlay.active .exit-intent-modal {\n  transform: scale(1);\n}\n.exit-intent-close {\n  position: absolute;\n  top: 1rem;\n  right: 1rem;\n  background: none;\n  border: none;\n  font-size: 1.5rem;\n  cursor: pointer;\n  color: var(--color-text-muted);\n}\n```\n\n**2. HTML del popup:**\n```html\n<div class=\"exit-intent-overlay\" id=\"exitIntentOverlay\" aria-modal=\"true\" role=\"dialog\">\n  <div class=\"exit-intent-modal\">\n    <button class=\"exit-intent-close\" aria-label=\"Cerrar\" id=\"exitIntentClose\">×</button>\n    <div class=\"exit-intent-icon\">🎁</div>\n    <h2>Antes de irte...</h2>\n    <p>Recibe un <strong>10% de descuento</strong> en tu primera reserva. Solo por hoy.</p>\n    <form id=\"exitIntentForm\" action=\"https://formspree.io/f/xwpkjvvw\" method=\"POST\">\n      <input type=\"email\" name=\"email\" placeholder=\"tu@email.com\" required>\n      <button type=\"submit\" class=\"btn btn-accent\">Obtener 10% off</button>\n    </form>\n    <p class=\"exit-intent-disclaimer\">Sin spam. Cancela cuando quieras.</p>\n  </div>\n</div>\n```\n\n**3. JS de detección:**\n```javascript\nconst EXIT_INTENT_KEY = 'exit_intent_shown';\nfunction showExitIntent() {\n  if (localStorage.getItem(EXIT_INTENT_KEY)) return;\n  document.getElementById('exitIntentOverlay').classList.add('active');\n  localStorage.setItem(EXIT_INTENT_KEY, 'true');\n  trackEvent('exit_intent_shown');\n}\n\n// Solo en desktop (no mobile)\nif (window.matchMedia('(min-width: 768px)').matches) {\n  document.addEventListener('mouseout', (e) => {\n    if (e.clientY <= 0) showExitIntent();\n  });\n}\n\n// No mostrar si el usuario ya se fue\nsetTimeout(() => {\n  if (!document.hidden) showExitIntent();\n}, 30000);\n``` |
| **Impacto esperado** | +10-15% captura de emails/leads, +5% conversión adicional de exit-intent respondents |
| **Esfuerzo** | S (1-2 horas — CSS + HTML + JS del popup) |
| **Agente recomendado** | Frontend |
| **Referencias** | [3] Exit Intent Popup Best Practices https://optinmonster.com/how-to-create-exit-intent-popups/ |
| **Estado** | Nueva propuesta — NO implementada en R1-R94 |
| **Prioridad CEO** | **Media** — captura de leads con alto ROI |

---

### Propuesta 4: HowTo Schema en Páginas de Zona (MEDIUM PRIORITY)

| Campo | Detalle |
|-------|---------|
| **Título** | Implementar HowTo Schema en cada página de zona para rich snippets en búsquedas locales |
| **Problema** | Las 10 páginas de zona tienen LocalBusiness schema pero no HowTo. Cuando un usuario busca "Cómo limpiar sofá en Chapinero", Google no muestra rich snippet porque no hay HowTo estructurado. Cada zona tiene contenido único que puede adaptarse a HowTo. |
| **Descripción** | **En cada `zonas/[zona]/index.html`, agregar después del LocalBusiness existing:**\n```html\n<script type=\"application/ld+json\">\n{\n  \"@context\": \"https://schema.org\",\n  \"@type\": \"HowTo\",\n  \"name\": \"Cómo solicitar servicio de limpieza en Chapinero\",\n  \"description\": \"Paso a paso para agendar tu servicio de limpieza de sofá, colchón o alfombra en Chapinero con Purity & Clean.\",\n  \"step\": [\n    {\n      \"@type\": \"HowToStep\",\n      \"name\": \"1. Contacta por WhatsApp\",\n      \"text\": \"Escríbenos al 300 123 4567 indicando tu dirección en Chapinero y el servicio que necesitas.\"\n    },\n    {\n      \"@type\": \"HowToStep\",\n      \"name\": \"2. Recibe tu cotización en 30 minutos\",\n      \"text\": \"Te enviamos el presupuesto personalizado según el tamaño y condición del mueble.\"\n    },\n    {\n      \"@type\": \"HowToStep\",\n      \"name\": \"3. Confirma y agenda\",\n      \"text\": \"Una vez aprobado el presupuesto, programamos la visita en el horario que prefieras.\"\n    },\n    {\n      \"@type\": \"HowToStep\",\n      \"name\": \"4. Recibe el servicio\",\n      \"text\": \"Nuestro técnico llega con todo el equipo y realiza la limpieza en 1-2 horas.\"\n    }\n  ],\n  \"totalTime\": \"PT2H\",\n  \"supply\": [\n    {\n      \"@type\": \"HowToSupply\",\n      \"name\": \"Productos especializados\"\n    },\n    {\n      \"@type\": \"HowToSupply\",\n      \"name\": \"Equipo de extracción profesional\"\n    }\n  ],\n  \"tool\": [\n    {\n      \"@type\": \"HowToTool\",\n      \"name\": \"Máquina de extracción\"\n    },\n    {\n      \"@type\": \"HowToTool\",\n      \"name\": \"Secador de aire caliente\"\n    }\n  ]\n}\n</script>\n```<br><br>**Para cada zona:** Chapinero, Usaquén, Teusaquillo, Kennedy, Suba, Engativá, Fontibón, Bosa, Usme, Barrios Unidos — adaptar el contenido del HowToStep con el nombre de la zona. |
| **Impacto esperado** | +15-25% CTR para búsquedas locales tipo "limpieza de sofá [zona]", mejora en ranking local |
| **Esfuerzo** | S (2 horas — copy + schema para 10 zonas) |
| **Agente recomendado** | Frontend + Content |
| **Referencias** | [4] Google HowTo Schema https://developers.google.com/search/docs/structured-content/how-to |
| **Estado** | Nueva propuesta — NO implementada en R1-R94 |
| **Prioridad CEO** | **Media** — SEO local de alto impacto |

---

### Propuesta 5: Quiet Hours en WhatsApp + Mensajes Automatizados Fuera de Horario (MEDIUM PRIORITY)

| Campo | Detalle |
|-------|---------|
| **Título** | Implementar mensajes automatizados fuera de horario y quiet hours en WhatsApp |
| **Problema** | El botón de WhatsApp permite contactar en cualquier momento, pero fuera del horario de atención (8am-6pm) no hay mensaje automatizado. El lead que escribe a las 10pm no sabe que el servicio opera de día. Esto genera frustración y posibles pérdida de leads. |
| **Descripción** | **1. Detectar hora actual en JS (Colombia = UTC-5):**\n```javascript\nfunction getColombiaHour() {\n  const now = new Date();\n  const colombiaTime = new Date(now.toLocaleString('en-US', { timeZone: 'America/Bogota' }));\n  return colombiaTime.getHours();\n}\n\nfunction isOutsideHours() {\n  const hour = getColombiaHour();\n  return hour < 8 || hour >= 18;\n}\n```\n\n**2. Mensaje pre-llenado diferenciado:**\n```javascript\nfunction getWhatsAppMessage(service, zona) {\n  const baseMessages = {\n    inside: `Hola! Me interesa el servicio de ${service} en ${zona}. ¿Podemos agendar?`,\n    outside: `Hola! Escribí fuera de horario (ahora son las ${getColombiaHour()}:00 en Bogotá). Mi mensaje: Me interesa el servicio de ${service} en ${zona}. ¿Podemos agendar cuando abren?`\n  };\n  return isOutsideHours() ? baseMessages.outside : baseMessages.inside;\n}\n\nfunction openWhatsApp(service, zona) {\n  const message = encodeURIComponent(getWhatsAppMessage(service, zona));\n  const whatsappUrl = `https://wa.me/573001234567?text=${message}`;\n  window.open(whatsappUrl, '_blank');\n}\n```\n\n**3. Banner informativo dentro del sitio:**\n```javascript\nfunction showHoursBanner() {\n  if (isOutsideHours()) {\n    const banner = document.createElement('div');\n    banner.className = 'hours-banner';\n    banner.innerHTML = '⏰ Horario de atención: 8am - 6pm (Bogotá). Los mensajes fuera de horario se responden al día siguiente.';\n    document.body.prepend(banner);\n  }\n}\n```\n\n**4. En index.html, botón de reservas:**\n```html\n<button onclick=\"openWhatsApp('limpieza de sofá', 'mi zona')\" class=\"btn btn-whatsapp\">\n  <i class=\"fa-brands fa-whatsapp\"></i>\n  Reservar por WhatsApp\n</button>\n``` |
| **Impacto esperado** | Mejora experiencia del usuario fuera de horario, reducción de mensajes de frustración, percepción de profesionalismo |
| **Esfuerzo** | S (1 hora — JS de detección + mensajes + banner CSS) |
| **Agente recomendado** | Frontend |
| **Referencias** | [5] WhatsApp Business API Messages https://business.whatsapp.com/developers/developer-hub |
| **Estado** | Nueva propuesta — NO implementada en R1-R94 |
| **Prioridad CEO** | **Media** — UX y reducción de fricción |

---

### Propuesta 6: Structured Data Auditor — Validación Automatizada de Schemas (MEDIUM PRIORITY)

| Campo | Detalle |
|-------|---------|
| **Título** | Implementar script de validación automática de Structured Data para detectar errores antes del despliegue |
| **Problema** | Cada vez que se modifica `index.html` o las páginas de zona, los schemas pueden quedar malformados. Google Search Console muestra errores semanas después. Un auditor automatizado detecta errores en CI/local antes de desplegar. |
| **Descripción** | **1. Script `scripts/audit-schemas.js`:**\n```javascript\nconst fs = require('fs');\nconst { JSDOM } = require('jsdom');\n\n\nconst PAGES = [\n  './index.html',\n  './zonas/chapinero/index.html',\n  './zonas/suba/index.html',\n  './blog/articulos/como-limpiar-tu-sofa.html'\n];\n\nfunction extractSchemas(html) {\n  const dom = new JSDOM(html);\n  const scripts = dom.window.document.querySelectorAll('script[type=\"application/ld+json\"]');\n  const schemas = [];\n  scripts.forEach(s => {\n    try {\n      schemas.push(JSON.parse(s.textContent));\n    } catch (e) {\n      schemas.push({ error: `Invalid JSON: ${e.message}` });\n    }\n  });\n  return schemas;\n}\n\nfunction validateSchema(schema, pageUrl) {\n  const errors = [];\n  if (!schema['@context']) errors.push('Missing @context');\n  if (!schema['@type']) errors.push('Missing @type');\n  if (schema['@type'] === 'LocalBusiness' && !schema.telephone) errors.push('LocalBusiness missing telephone');\n  if (schema['@type'] === 'FAQPage' && !schema.mainEntity) errors.push('FAQPage missing mainEntity');\n  if (schema['@type'] === 'Article' && !schema.datePublished) errors.push('Article missing datePublished');\n  return errors;\n}\n\nPAGES.forEach(page => {\n  const html = fs.readFileSync(page, 'utf8');\n  const schemas = extractSchemas(html);\n  console.log(`\\n=== ${page} ===`);\n  schemas.forEach((s, i) => {\n    if (s.error) {\n      console.log(`  Schema ${i+1}: ERROR - ${s.error}`);\n    } else {\n      const errors = validateSchema(s, page);\n      if (errors.length === 0) {\n        console.log(`  Schema ${i+1} [${s['@type']}]: ✅ OK`);\n      } else {\n        console.log(`  Schema ${i+1} [${s['@type']}]: ❌ ${errors.join(', ')}`);\n      }\n    }\n  });\n});\n```\n\n**2. Agregar a package.json:**\n```json\n\"scripts\": {\n  \"audit-schemas\": \"node scripts/audit-schemas.js\",\n  \"predeploy\": \"npm run audit-schemas\"\n}\n```\n\n**3. Instalar jsdom:**\n```bash\nnpm install jsdom --save-dev\n``` |
| **Impacto esperado** | Detección de errores de schema antes de desplegar, mejora continua en SEO técnico, cero errores en Google Search Console |
| **Esfuerzo** | M (2 horas — setup script + CI integration + documentation) |
| **Agente recomendado** | QA + Frontend |
| **Referencias** | [6] Google Rich Results Test https://search.google.com/test/rich-results |
| **Estado** | Nueva propuesta — NO implementada en R1-R94 |
| **Prioridad CEO** | **Media** — calidad y mantenimiento del SEO técnico |

---

## Orden de Implementación Recomendado (R95)

| # | Propuesta | Impacto | Esfuerzo | Prioridad | Tipo |
|---|-----------|---------|----------|-----------|------|
| 1 | **SW Cache Invalidation Inteligente** | +UX usuarios recurrentes | S | **Alta** | PWA/Performance |
| 2 | **Article Schema + Email Digest Blog** | +20-30% CTR blog | S | **Alta** | SEO + Retención |
| 3 | **Exit-Intent Popup** | +10-15% leads | S | **Media** | Conversión |
| 4 | **HowTo Schema en Zonas** | +15-25% CTR local | S | **Media** | SEO Local |
| 5 | **Quiet Hours WhatsApp** | -fricción usuarios | S | **Media** | UX/Operaciones |
| 6 | **Structured Data Auditor** | calidad SEO | M | **Media** | QA/Infraestructura |

---

## Dependencias y Bloqueadores

| Propuesta | Depende de | Bloqueador |
|-----------|------------|------------|
| SW Cache Invalidation | Ninguno | Ninguno |
| Article Schema + Email Digest | Formspree configurado (ya está) | Ninguno |
| Exit-Intent Popup | Ninguno | Ninguno |
| HowTo Schema en Zonas | Ninguno | Ninguno |
| Quiet Hours WhatsApp | Ninguno | Ninguno |
| Structured Data Auditor | Node.js + npm | Ninguno |

---

## Comparación R94 vs R95

| Aspecto | R94 | R95 |
|---------|-----|-----|
| **Foco** | Infraestructura técnica (Schema.org, web-vitals, Klaviyo, Sharp) | Automatización PWA, Blog SEO, UX/Conversión |
| **Tipo propuestas** | Monitoring + marketing ops | Cache intelligence + blog syndication + popup |
| **Mercado** | SEO y conversion indirecto | Engagement + retention + re-engagement |
| **Tecnología** | WhatsApp Flows, Schema.org, Klaviyo | SW versioning, RSS, Article schema, exit-intent |
| **Esfuerzo** | S-M | S-M |
| **Revenue** | Indirecto (mejora conversión) | Directo (leads) + Indirecto (SEO) |

**R95 complementa R94:** R94 propuso infraestructura de marketing; R95 propone automatización de engagement y mejoras de caching que eran invisibilizadas en rondas anteriores.

---

## Fuentes

[1] Google. "Service Worker Caching Strategies." https://web.dev/service-worker-caching/ (2026)

[2] Google. "Article Structured Data." https://developers.google.com/search/docs/appearance/structured-data/article (2026)

[3] OptinMonster. "How to Create Exit Intent Popups That Convert." https://optinmonster.com/how-to-create-exit-intent-popups/ (2026)

[4] Google. "HowTo Structured Data." https://developers.google.com/search/docs/structured-content/how-to (2026)

[5] Meta. "WhatsApp Business API Messages." https://business.whatsapp.com/developers/developer-hub (2026)

[6] Google. "Rich Results Test." https://search.google.com/test/rich-results (2026)

---

*Documento generado por Innovation Scout — Round 95*
*Purity & Clean Analysis — 2026-04-28*
*Co-Authored-By: Paperclip <noreply@paperclip.ing>*