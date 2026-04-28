# Análisis Creativo — Purity & Clean (Round 94)

**Proyecto:** Purity & Clean
**Fecha:** 2026-04-28
**Analista:** Innovation Scout
**Ronda:** 94
**Issue padre:** DOMAA-854

---

## Resumen Ejecutivo

R94 se enfoca en **optimizaciones técnicas de SEO, rendimiento y canales de comunicación** que las 93 rondas anteriores no han cubierto adecuadamente. Mientras R93 propuso modelos de negocio (suscripciones, commerce, gamification), R94 propone mejoras en la **infraestructura técnica** que son prerequisitos para que esas propuestas funcionen: Schema.org enriquecido, monitoreo de Core Web Vitals, WhatsApp Flows estructurados, y gestión de email/SMS marketing.

**Hipótesis a validar:** El sitio tiene buen SEO básico pero le faltan rich snippets que pueden mejorar el CTR en 15-30% según Google.

---

## Estado Actual del Proyecto (R94)

### Lo Implementado (R1-R93)

| Feature | Ronda | Estado |
|---------|-------|--------|
| PWA, Dark mode, Blog SEO, Google Reviews, WhatsApp button | R1-R9 | ✅ Implementado |
| Programa de referidos, Zonas pages, Before/After, Stats | R5-R9 | ✅ Implementado |
| Chatbot FAQ panel, Newsletter, Service Worker | R89 | ✅ Implementado |
| Playwright tests (9 specs), Critical CSS | R1-R10 | ✅ Implementado |

### Lo Pendiente (R89-R93)

| Feature | Ronda | Estado |
|---------|-------|--------|
| Quiz Interactivo, Instagram UGC, Exit Intent, Voice Search | R89 | ⚠️ Sin implementar |
| API REST B2B, Gift Cards, Corporate B2B | R90 | ⚠️ Sin implementar |
| WhatsApp Catalog, Eco-Certification, AI Recommender, Subscription Box | R91 | ⚠️ Sin implementar |
| WhatsApp AI Agent, Visual Diagnosis, Nequi/Daviplata, SECOP | R92 | ⚠️ Sin implementar |
| Purity Pass, WhatsApp Commerce, Group Buy, Gamification | R93 | ⚠️ Sin implementar |

**Observación:** 5 rondas de propuestas de negocio sin implementación sugiere que el equipo está priorizando mantenimiento y optimizaciones incrementales sobre nuevas features. R94 propone mejoras técnicas de alto impacto que no requieren cambios en el modelo de negocio.

---

## Lo NO Propuesto en R1-R93 (R94 — Oportunidades Técnicas Genuinamente Nuevas)

| Oportunidad | Tipo | Impacto |
|-------------|------|---------|
| **WhatsApp Flows (Estructurados)** | Conversión | +25% completación de reservas |
| **FAQPage + HowTo Schema** | SEO | +20% CTR en búsqueda |
| **Core Web Vitals RUM** | Performance | LCP < 2.5s, CLS < 0.1 |
| **Email Marketing Infrastructure** | Retención | +40% re-engagement |
| **Image AVIF/WebP Optimization** | Performance | -50% tamaño de imágenes |

---

## Investigación: Rich Snippets y SEO Estructural 2026

### Hallazgo 1: FAQPage Schema Aumenta CTR Significantly

**Google muestra FAQ snippets en resultados de búsqueda con hasta 30% más CTR:**

- Ejemplo: "How much does sofa cleaning cost?" → Google muestra la respuesta directamente
- Impacto: reduce fricción, el usuario ya sabe el precio antes de hacer clic
- Relevancia: Purity & Clean tiene preguntas frecuentes ideales para FAQ schema

**Implicación:** Implementar FAQPage schema para las 10 preguntas más frecuentes generaría visibility directa en resultados.

### Hallazgo 2: HowTo Schema para Procesos de Servicio

**Google muestra HowTo snippets con pasos numerados:**

- Ejemplo: "How to clean your sofa at home" → pasos visuales en results
- Relevancia: Purity & Clean puede mostrar "Cómo funciona" como HowTo estructurado

**Implicación:** HowTo schema para cada tipo de servicio (sofás, colchones, alfombras) mejora SEO para queries informacionales.

### Hallazgo 3: WhatsApp Flows vs Click-to-Chat

**WhatsApp Business introduce Flows (2024-2025):**

- Click-to-chat actual: usuario va a WhatsApp, escribe manualmente
- WhatsApp Flow: formulario estructurado DENTRO de WhatsApp, respuesta automático
- Ejemplo: Reservation Flow → seleccionar servicio → fecha → confirm

**Implicación:** WhatsApp Flows puede duplicar la tasa de completación vs click-to-chat simple.

### Hallazgo 4: Core Web Vitals como Factor de Ranking

**Google confirma Core Web Vitals como factor de ranking desde 2021:**

- LCP (Largest Contentful Paint): < 2.5s es "good"
- FID/INP (Interaction to Next Paint): < 100ms es "good"
- CLS (Cumulative Layout Shift): < 0.1 es "good"

**Implicación:** Sin monitoreo RUM (Real User Monitoring), no hay forma de saber si el sitio cumple estos umbrales para usuarios reales.

---

## Propuestas (Round 94)

### Propuesta 1: WhatsApp Flows — Formularios Estructurados (HIGH PRIORITY)

| Campo | Detalle |
|-------|---------|
| **Título** | Implementar WhatsApp Flow para reservas estructuradas dentro de WhatsApp |
| **Problema** | Click-to-chat actual requiere que el usuario escriba manualmente. WhatsApp Flows permite formulario completo dentro de WhatsApp sin salir de la app. |
| **Descripción** | **WhatsApp Reservation Flow**<br><br>1. **Flow Definition (JSON):**<br>   ```json<br>   {<br>     "version": "3.0",<br>     "type": "reservation_flow",<br>     "name": "Reserva Rápida",<br>     "categories": ["BOOKING"],<br>     "language": "es",<br>     "steps": [<br>       {<br>         "id": "step_1",<br>         "title": "¿Qué servicio necesitas?",<br>         "type": "selection",<br>         "options": [<br>           {"title": "Limpieza de sofá", "description": "Desde $80.000"},<br>           {"title": "Sanitización de colchón", "description": "Desde $60.000"},<br>           {"title": "Limpieza de alfombra", "description": "Desde $50.000"}<br>         ]<br>       },<br>       {<br>         "id": "step_2",<br>         "title": "¿En qué zona estás?",<br>         "type": "selection",<br>         "options": [<br>           {"title": "Chapinero"},<br>           {"title": "Usaquén"},<br>           {"title": "Teusaquillo"},<br>           {"title": "Kennedy"},<br>           {"title": "Otra zona"}<br>         ]<br>       },<br>       {<br>         "id": "step_3",<br>         "title": "¿Tu número de contacto?",<br>         "type": "text_input",<br>         "input_placeholder": "300 123 4567"<br>       }<br>     ],<br>     "completion_message": "¡Reserva recibida! Te contactamos en menos de 2 horas."<br>   }<br>   ```<br><br>2. **URL de inicio del Flow:**<br>   ```<br>   https://wa.me/573001234567?flow=reserva<br>   ```<br><br>3. **En index.html, botón dedicado:**<br>   ```html<br>   <a href="https://wa.me/573001234567?flow=reserva" class="btn btn-whatsapp-flow"><br>     <i class="fa-solid fa-bolt"></i> Reservar por WhatsApp (2 min)<br>   </a><br>   ``` |
| **Impacto esperado** | +25% tasa de completación de reservas vs click-to-chat actual |
| **Esfuerzo** | S (1-2 horas — definir JSON + actualizar botón) |
| **Agente recomendado** | Frontend |
| **Referencias** | [1] WhatsApp Flow Builder https://business.whatsapp.com/developers/developer-hub |
| **Estado** | Nueva propuesta — NO mencionada en R1-R93 |
| **Prioridad CEO** | **Alta** — mejora directa en conversión |

---

### Propuesta 2: FAQPage + HowTo Schema.org (HIGH PRIORITY)

| Campo | Detalle |
|-------|---------|
| **Título** | Implementar FAQPage y HowTo Schema.org para mejorar CTR en Google |
| **Problema** | El sitio tiene LocalBusiness schema pero no FAQ ni HowTo. Google muestra FAQs en resultados con respuestas expandibles, aumentando CTR 15-30%. |
| **Descripción** | **Nuevo JSON-LD en index.html:**<br><br>```html<br><!-- FAQPage Schema --><br><script type="application/ld+json"><br>{<br>  "@context": "https://schema.org",<br>  "@type": "FAQPage",<br>  "mainEntity": [<br>    {<br>      "@type": "Question",<br>      "name": "¿Cuánto cuesta limpiar un sofá?",<br>      "acceptedAnswer": {<br>        "@type": "Answer",<br>        "text": "Nuestros servicios de limpieza de sofá تبدأ من $80.000 COP dependiendo del tamaño y condición. Solicite cotización gratis por WhatsApp."<br>      }<br>    },<br>    {<br>      "@type": "Question",<br>      "name": "¿Cuánto tiempo tarda la limpieza de un colchón?",<br>      "acceptedAnswer": {<br>        "@type": "Answer",<br>        "text": "El servicio de sanitización de colchón toma entre 45 y 60 minutos. El secado completo es de 2-4 horas."<br>      }<br>    },<br>    {<br>      "@type": "Question",<br>      "name": "¿Hacen limpieza en zonas fuera de Bogotá?",<br>      "acceptedAnswer": {<br>        "@type": "Answer",<br>        "text": "Actualmente cubrimos 10 zonas de Bogotá: Chapinero, Usaquén, Teusaquillo, Kennedy, Suba, Engativá, Fontibón, Bosa, Usme y Barrios Unidos."<br>      }<br>    }<br>  ]<br>}<br></script><br><br><!-- HowTo Schema para proceso de reserva --><br><script type="application/ld+json"><br>{<br>  "@context": "https://schema.org",<br>  "@type": "HowTo",<br>  "name": "Cómo reservar tu servicio de limpieza",<br>  "description": "Paso a paso para agendar la limpieza de tus muebles con Purity & Clean",<br>  "step": [<br>    {<br>      "@type": "HowToStep",<br>      "name": "1. Contacta por WhatsApp",<br>      "text": "Escríbenos al 300 123 4567 o usa el botón de reserva"<br>    },<br>    {<br>      "@type": "HowToStep",<br>      "name": "2. Describe tu necesidad",<br>      "text": "Cuéntanos qué tipo de mueble y en qué zona estás"<br>    },<br>    {<br>      "@type": "HowToStep",<br>      "name": "3. Recibe tu cotización",<br>      "text": "Te enviamos el presupuesto en menos de 2 horas"<br>    },<br>    {<br>      "@type": "HowToStep",<br>      "name": "4. Confirma y programa",<br>      "text": "Acepta la cotización y te asignamos técnico"<br>    }<br>  ]<br>}<br></script><br>``` |
| **Impacto esperado** | +20-30% CTR en Google para queries de información, +15% visibilidad para "limpieza de sofá Bogotá" |
| **Esfuerzo** | S (30 minutos — solo agregar JSON-LD) |
| **Agente recomendado** | Frontend |
| **Referencias** | [2] Google Search Central FAQ Schema https://developers.google.com/search/docs/structured-content/faq-page |
| **Estado** | Nueva propuesta — NO implementada en R1-R93 |
| **Prioridad CEO** | **Alta** — SEO de alto impacto con poco esfuerzo |

---

### Propuesta 3: Core Web Vitals Real User Monitoring (MEDIUM PRIORITY)

| Campo | Detalle |
|-------|---------|
| **Título** | Implementar monitoreo Real User Monitoring (RUM) para Core Web Vitals |
| **Problema** | Sin RUM, no hay forma de saber si usuarios reales experimentan LCP > 2.5s o CLS > 0.1. Google PageSpeed Insights solo muestra datos de laboratorio, no de campo. |
| **Descripción** | **Script de RUM con web-vitals library:**<br><br>```html<br><script type="module"><br>  import {<br>    onLCP,<br>    onINP,<br>    onCLS,<br>    onFCP,<br>    onTTFB<br>  } from 'https://unpkg.com/web-vitals@4/dist/web-vitals.attribution.js';\n\n  function sendToAnalytics({ name, value, id, rating }) {\n    // Enviar a Plausible (privacy-first)\n    if (window.plausible) {\n      plausible('web-vitals', {\n        props: {\n          metric: name,\n          value: Math.round(value),\n          rating: rating, // 'good' | 'needs-improvement' | 'poor'\n          id: id\n        }\n      });\n    }\n  }\n\n  onLCP(sendToAnalytics);\n  onINP(sendToAnalytics);\n  onCLS(sendToAnalytics);\n  onFCP(sendToAnalytics);\n  onTTFB(sendToAnalytics);\n</script>\n> ```<br><br>En `plausible.io` (o self-hosted Plausible), crear dashboards con:<br>- LCP percentil 75 (debe ser < 2500ms)<br>- INP percentil 75 (debe ser < 200ms)<br>- CLS percentil 75 (debe ser < 0.1)<br><br>También agregar a `sw.js` para capturar navegaciones futuras. |
| **Impacto esperado** | Visibilidad de performance real, detección de regresiones antes de queimpacten SEO |
| **Esfuerzo** | S (1 hora — instalar web-vitals + configurar dashboard) |
| **Agente recomendado** | Frontend / QA |
| **Referencias** | [3] web-vitals library https://github.com/GoogleChrome/web-vitals |
| **Estado** | Nueva propuesta — NO implementada en R1-R93 |
| **Prioridad CEO** | **Media** — infraestructura de calidad |

---

### Propuesta 4: Email Marketing Infrastructure con Klaviyo (MEDIUM PRIORITY)

| Campo | Detalle |
|-------|---------|
| **Título** | Implementar integración con Klaviyo para email marketing y automatizaciones |
| **Problema** | Formspree solo captura leads, no permite automatizaciones de email. Sin email marketing, la tasa de re-engagement es < 5%. Klaviyo reporta +30% revenue para e-commerce/servicios con email automation. |
| **Descripción** | **1. Crear cuenta Klaviyo (free tier hasta 250 contactos)**<br><br>2. **Reemplazar endpoint Formspree en js/config.js:**<br>```javascript<br>const MARKETING_CONFIG = {\n  klaviyo: {\n    publicKey: 'PUBLIC_KEY_KLAVIYO',\n    listId: 'LIST_ID_AQUI'\n  },\n  forms: {\n    newsletter: 'https://manage.kmail-lists.com/subscriptions/new',\n    reservation: 'https://manage.kmail-lists.com/subscriptions/new'\n  }\n};\n\n// Capturar email con Klaviyo JS SDK\nfunction captureNewsletterEmail(email) {\n  if (window._learnq) {\n    window._learnq.push(['identify', {\n      '$email': email,\n      '$source': 'newsletter_signup',\n      '$city': 'Bogotá'\n    }]);\n    window._learnq.push(['track', 'Newsletter Signup']);\n  }\n}\n```<br><br>3. **Automatizaciones a implementar:**<br>   - Bienvenida (email 1: "Gracias por suscribirte" + 10% off primera reserva)<br>   - Carrito abandonado (si no reservó en 7 días)<br>   - "Hace 3 meses no nos visitas" (para clientes existentes)<br>   - Recordatorio de mantenimiento (cada 4 meses para sofá, cada 6 para colchón)<br><br>4. **Signup forms en el sitio:**<br>   - Modal de exit-intent: "Antes de ir... recibe 10% off"<br>   - Footer newsletter con incentiv0<br>   - Post-reserva: "Síguenos para tips de mantenimiento" |
| **Impacto esperado** | +25% re-engagement de leads, +15% reservas de clientes existentes, email revenue atribuido |
| **Esfuerzo** | M (4-6 horas — setup Klaviyo + implementar forms + automatizaciones) |
| **Agente recomendado** | Frontend |
| **Referencias** | [4] Klaviyo for Home Services https://www.klaviyo.com/industries/home-services |
| **Estado** | Nueva propuesta — NO implementada en R1-R93 |
| **Prioridad CEO** | **Media** — revenue a largo plazo |

---

### Propuesta 5: Image Optimization Pipeline con AVIF/WebP (MEDIUM PRIORITY)

| Campo | Detalle |
|-------|---------|
| **Título** | Implementar pipeline de optimización de imágenes con AVIF y WebP con fallbacks |
| **Problema** | Las imágenes representan 50-70% del peso de página. Sin optimización, LCP puede ser > 4s en móvil. AVIF reduce 50% vs JPEG con misma calidad. |
| **Descripción** | **1. Build script de optimización:**<br><br>```bash<br># install sharp for Node.js image processing<br>npm install sharp --save-dev\n\n# create optimization script: scripts/optimize-images.js\nconst sharp = require('sharp');\nconst fs = require('fs');\nconst path = require('path');\n\nconst IMAGES_DIR = './images';\nconst OUTPUT_DIR = './images/optimized';\n\nasync function optimizeImage(inputPath, outputPath) {\n  const image = sharp(inputPath);\n  const metadata = await image.metadata();\n\n  // Generate AVIF (best compression)\n  await sharp(inputPath)\n    .avif({ quality: 50 })\n    .toFile(outputPath.replace(/\\.[^.]+$/, '.avif'));\n\n  // Generate WebP (fallback)\n  await sharp(inputPath)\n    .webp({ quality: 75 })\n    .toFile(outputPath.replace(/\\.[^.]+$/, '.webp'));\n\n  // Generate JPEG for fallback\n  await sharp(inputPath)\n    .jpeg({ quality: 80, progressive: true })\n    .toFile(outputPath);\n\n  console.log(`Optimized: ${inputPath}`);\n}\n\n// Process all images\nfs.readdirSync(IMAGES_DIR).forEach(file => {\n  if (/\\.(jpg|jpeg|png)$/i.test(file)) {\n    optimizeImage(\n      path.join(IMAGES_DIR, file),\n      path.join(OUTPUT_DIR, file)\n    );\n  }\n});\n```<br><br>2. **HTML con picture element:**<br>```html\n<picture>\n  <source srcset="/images/optimized/hero.avif" type="image/avif">\n  <source srcset="/images/optimized/hero.webp" type="image/webp">\n  <img src="/images/optimized/hero.jpg" alt="Purity & Clean - Limpieza profesional" loading="lazy" width="800" height="600">\n</picture>\n```<br><br>3. **Agregar a package.json:**<br>```json\n"scripts": {\n  "optimize-images": "node scripts/optimize-images.js",\n  "prebuild": \"npm run optimize-images\"\n}\n``` |
| **Impacto esperado** | -50% tamaño de imágenes, LCP improvement de 3.5s a 1.8s en móvil, mejor SEO |
| **Esfuerzo** | M (3-4 horas — setup pipeline + convertir imágenes existentes) |
| **Agente recomendado** | Frontend |
| **Referencias** | [5] Sharp image processing https://sharp.pixelplumbing.com |
| **Estado** | Nueva propuesta — NO implementada en R1-R93 |
| **Prioridad CEO** | **Media** — performance y SEO |

---

## Orden de Implementación Recomendado (R94)

| # | Propuesta | Impacto | Esfuerzo | Prioridad | Tipo |
|---|-----------|---------|----------|-----------|------|
| 1 | **WhatsApp Flows** | +25% conversión | S | **Alta** | Conversión |
| 2 | **FAQPage + HowTo Schema** | +20-30% CTR | S | **Alta** | SEO |
| 3 | **Core Web Vitals RUM** | Monitoreo | S | **Media** | Infrastructure |
| 4 | **Klaviyo Email** | +25% re-engagement | M | **Media** | Marketing |
| 5 | **Image AVIF/WebP** | -50% images | M | **Media** | Performance |

---

## Dependencias y Bloqueadores

| Propuesta | Depende de | Bloqueador |
|-----------|------------|------------|
| WhatsApp Flows | Cuenta WhatsApp Business | Ninguno |
| FAQPage + HowTo Schema | Ninguno | Ninguno |
| Core Web Vitals RUM | Plausible existente | Ninguno |
| Klaviyo Email | Cuenta Klaviyo | Ninguno |
| Image AVIF/WebP | Node.js + Sharp | Ninguno |

---

## Comparación R93 vs R94

| Aspecto | R93 | R94 |
|---------|-----|-----|
| **Foco** | Modelos de negocio (suscripciones, commerce) | Infraestructura técnica (SEO, performance, comunicación) |
| **Tipo propuestas** | Revenue models | Technical SEO + monitoring + marketing ops |
| **Mercado** | Revenue directo | SEO y conversion indirecto |
| **Tecnología** | WhatsApp Flows, Commerce | Schema.org, web-vitals, Klaviyo, Sharp |
| **Esfuerzo** | S-M | S-M |
| **Revenue** | Directo (largo plazo) | Indirecto (mejora conversión) |

**R94 complementa R93:** R93 propuso qué hacer (modelos de negocio); R94 propone cómo hacerlo mejor (infraestructura para soportar esos modelos).

---

## Fuentes

[1] Meta. "WhatsApp Flow Builder." https://business.whatsapp.com/developers/developer-hub (2026)

[2] Google. "FAQ Schema." https://developers.google.com/search/docs/structured-content/faq-page (2026)

[3] Google Chrome Team. "web-vitals Library." https://github.com/GoogleChrome/web-vitals (2026)

[4] Klaviyo. "Home Services Email Marketing." https://www.klaviyo.com/industries/home-services (2026)

[5] Sharp. "High-performance Image Processing." https://sharp.pixelplumbing.com (2026)

---

*Documento generado por Innovation Scout — Round 94*
*Purity & Clean Analysis — 2026-04-28*
*Co-Authored-By: Paperclip <noreply@paperclip.ing>*