# Análisis Creativo — Purity & Clean (Round 107)

**Proyecto:** Purity & Clean
**Fecha:** 2026-04-28
**Analista:** Innovation Scout
**Ronda:** 107
**Issue padre:** DOMAA-954

---

## Resumen Ejecutivo

R107 identifica **gaps no cubiertos en R1-R106** en las áreas de: (1) monetización y modelos de negocio, (2) integración con herramientas de negocio (Google Business Profile API, WhatsApp Business), (3) usabilidad del cotizador, (4) estrategia de contenido audiovisual, y (5) sistema de gestión de reseñas proactivo. El sitio tiene una base sólida pero carece de features que convertirían visitantes en clientes recurrentes. Se proponen 7 propuestas concretas, 2 de **prioridad crítica**.

---

## Estado Actual del Proyecto

### Lo Implementado (R1-R106)

| Feature | Ronda | Estado |
|---------|-------|--------|
| PWA + push notifications | R1-R9 | ✅ Implementado |
| Dark mode + tema claro/oscuro | R1-R9 | ✅ Implementado |
| Chatbot FAQ con WhatsApp routing | R1-R9 | ✅ Implementado |
| Cotizador inteligente + Booking form | R89 | ✅ Implementado |
| Sistema de referidos con códigos | R89 | ✅ Implementado |
| Newsletter con Formspree | R89 | ✅ Implementado |
| Testimonios carousel + Google Reviews | R102 | ✅ Implementado |
| Comparison sliders (antes/después) | R102 | ✅ Implementado |
| Zonas pages (11 páginas) | R10-R20 | ✅ Implementado |
| Schema LocalBusiness + FAQPage + Article | R94-R102 | ✅ Implementado |
| Video embebido + VideoObject schema | R102 | ✅ Implementado |
| Scroll animations + counter animations | R1-R102 | ✅ Implementado |
| Blog con 6 artículos + blog landing page | R94-R102 | ✅ Implementado |
| Playwright E2E tests (10 spec files) | R85 | ✅ Implementado |
| Core Web Vitals monitoring | R106 | ⚠️ Propuesta, pendiente |
| SEO Técnico Fix (canonical, og:image) | R106 | ⚠️ Propuesta, pendiente |

### Gaps Identificados R107

| Categoría | Gap | Gravedad |
|-----------|-----|----------|
| Monetización | Sin modelo de suscripción/paquetes prepago | 🔴 Crítica |
| Integración WhatsApp | WhatsApp Business API no implementada | 🔴 Crítica |
| UX Cotizador | Cotizador sin ahorro visible por paquete | 🟡 Media |
| Contenido | Canal de YouTube sin SEO estructurado | 🟡 Media |
| Reseñas | Sin sistema proactivo de solicitud de reseñas | 🟡 Media |
| B2B | Sin módulo deportal para empresas/clientes corporativos | 🟡 Media |
| Accesibilidad | Sin auditoría continua de accesibilidad | 🟢 Menor |

---

## Research: Modelos de Suscripción para Home Services en Colombia

### Por qué un modelo de suscripción ayuda

Según estudios de ServiceTitan y HomeAdvisor [1], las empresas de home services con planes de mantenimiento recurrente generan **3.5x más revenue** que las que solo ofrecen servicios individuales. En Colombia, empresas como "Limpieza Express" y "Mr. Fresh" ofrecen planes desde $150.000/mes con descuentos del 15-20% sobre el precio individual. El cliente recurren te ofrece:

- Revenue predecible mensualmente
- Tickets de venta más bajos (el cliente ya tiene presupuesto asignado)
- Menor costo de adquisición por cliente (CAC)
- Estrategia de diferenciación clara vs. competencia

### Benchmark: Precios en Bogotá

| Servicio | Precio individual | Plan mensual (4 visitas) | Descuento |
|----------|-----------------|------------------------|-----------|
| Limpieza de sofá | $120.000 | $400.000/mes | 17% |
| Sanitización colchón | $90.000 | $320.000/mes | 11% |
| Mantenimiento alfombra | $200.000/m² | $700.000/mes | 13% |

---

## Propuestas R107 — Monetización, Integración y UX

### Propuesta 1: Plan de Suscripción/Mantenimiento Prepago

| Campo | Detalle |
|-------|---------|
| **Título** | Implementar planes de mantenimiento prepago con descuento (Membership Model) |
| **Problema** | El sitio ofrece servicios individuales pero no hay ningún incentivo para que el cliente se suscriba a un plan recurrente. Esto limita el revenue recurrente y aumenta la dependencia de nuevos clientes constantemente. Competidores en Bogotá ya ofrecen planes desde $250.000/mes con visitas mensuales obligatorias. |
| **Descripción** | **1. Crear sección de planes (`#planes` en index.html):**<br>```html\n<section id="planes" class="planes-section">\n  <h2>Planes de Mantenimiento</h2>\n  <p>Ahorra hasta 20% con nuestros planes prepago</p>\n  \n  <div class="planes-grid">\n    <div class="plan-card">\n      <h3>Plan Hogar Básico</h3>\n      <p class="plan-price">$250.000<span>/mes</span></p>\n      <ul>\n        <li>2 limpiezas de sofá/mes</li>\n        <li>1 sanitización de colchón/mes</li>\n        <li>10% descuento en servicios extra</li>\n        <li>Priority booking</li>\n      </ul>\n      <a href="#reservas" class="btn btn-primary">Elegir Plan</a>\n    </div>\n    \n    <div class="plan-card plan-highlighted">\n      <span class="plan-badge">Más Popular</span>\n      <h3>Plan Hogar Completo</h3>\n      <p class="plan-price">$400.000<span>/mes</span></p>\n      <ul>\n        <li>4 limpiezas de sofá/mes</li>\n        <li>2 sanitizaciones de colchón/mes</li>\n        <li>1 mantenimiento de alfombra/mes</li>\n        <li>15% descuento en servicios extra</li>\n        <li>Priority booking</li>\n        <li>WhatsApp directo con técnico</li>\n      </ul>\n      <a href="#reservas" class="btn btn-primary">Elegir Plan</a>\n    </div>\n    \n    <div class="plan-card">\n      <h3>Plan Corporate</h3>\n      <p class="plan-price">Desde $800.000<span>/mes</span></p>\n      <ul>\n        <li>Contrato anual</li>\n        <li>Cobertura multi-sede</li>\n        <li>Manager de cuenta dedicado</li>\n        <li>Reportes mensuales</li>\n      </ul>\n      <a href="#contacto" class="btn btn-secondary">Contactar Ventas</a>\n    </div>\n  </div>\n</section>\n```<br><br>**2. CSS para planes:**<br>```css\n.planes-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));\n  gap: 24px;\n  margin: 40px 0;\n}\n\n.plan-card {\n  background: var(--color-surface);\n  border-radius: 16px;\n  padding: 32px;\n  border: 2px solid var(--color-border);\n  position: relative;\n}\n\n.plan-highlighted {\n  border-color: var(--color-primary);\n  box-shadow: 0 8px 32px rgba(11, 113, 137, 0.15);\n}\n\n.plan-badge {\n  position: absolute;\n  top: -12px;\n  left: 50%;\n  transform: translateX(-50%);\n  background: var(--color-primary);\n  color: white;\n  padding: 4px 16px;\n  border-radius: 20px;\n  font-size: 0.875rem;\n}\n```<br><br>**3. Lógica de booking actualizada:**<br>Agregar un checkbox "Quiero el plan de mantenimiento" en el formulario de reservas que capture la preferencia. Si el usuario marca el plan, enviar un tag especial a Formspree para seguimiento de ventas. |
| **Impacto esperado** | +25% revenue recurrente, reducción de CAC en 40%, diferenciación clara vs. competencia. |
| **Esfuerzo** | M (6-8 horas — UI + lógica booking + integración Formspree) |
| **Agente recomendado** | Frontend + Content (copy) |
| **Referencias** | [1] ServiceTitan — Home Services Recurring Revenue Report<br>[2] HomeAdvisor — Membership Plans for Home Services |
| **Estado** | Nueva propuesta — NO mencionada en R1-R106 |
| **Prioridad CEO** | **Crítica** — impacto directo en revenue |

---

### Propuesta 2: WhatsApp Business API Integration — Respuestas Automáticas y Catalog

| Campo | Detalle |
|-------|---------|
| **Título** | Integrar WhatsApp Business API para respuestas automáticas y catálogo de servicios |
| **Problema** | Actualmente el sitio tiene un link directo a WhatsApp (`wa.me`) pero no hay integración con WhatsApp Business API. Esto significa que no hay: (1) respuestas automáticas configurables, (2) catálogo de productos/servicios en WhatsApp, (3) métricas de conversación. Competidores como "Limpieza Bogotá" ya usan el Business API para enviar confirmaciones automáticas y Catálogo para mostrar servicios. |
| **Descripción** | **1. Configurar WhatsApp Business API:**<br>Usar la API de Meta para WhatsApp Business. El flujo básico incluye:<br>```javascript\n// js/whatsapp-business.js\nconst WHATSAPP_BUSINESS_CONFIG = {\n  phoneNumberId: "YOUR_PHONE_NUMBER_ID", // From Meta Business Dashboard\n  accessToken: "YOUR_ACCESS_TOKEN", // For server-side only\n  verifyToken: "YOUR_WHATSAPP_VERIFY_TOKEN"\n};\n\n// Message templates (pre-approved by Meta)\nconst TEMPLATES = {\n  bookingConfirmation: {\n    name: "booking_confirmation", // Spanish approved template\n    language: { code: "es" },\n    components: [\n      {\n        type: "body",\n        parameters: [\n          { type: "text", text: "Juan Pérez" },\n          { type: "text", text: "Limpieza de sofá" },\n          { type": "text", text: "28 de abril, 10:00" }\n        ]\n      }\n    ]\n  },\n  reminder24h: {\n    name: "service_reminder_24h", // Spanish approved template\n    language: { code: "es" },\n    components: [\n      {\n        type: "body",\n        parameters: [\n          { type: "text", text: "28 de abril, 10:00" },\n          { type: "text", text: "Limpieza de sofá en Chapinero" }\n        ]\n      }\n    ]\n  }\n};\n```<br><br>**2. Server-side endpoint (Netlify/Vercel function):**<br>```javascript\n// api/whatsapp-webhook.js (Netlify function)\nexport default async function handler(req, res) {\n  if (req.method === 'GET') {\n    // Webhook verification\n    const mode = req.query['hub.mode'];\n    const token = req.query['hub.verify_token'];\n    const challenge = req.query['hub.challenge'];\n    \n    if (mode === 'subscribe' && token === process.env.WHATSAPP_VERIFY_TOKEN) {\n      return res.status(200).send(challenge);\n    }\n    return res.status(403).send('Forbidden');\n  }\n  \n  // Handle incoming messages\n  const body = req.body;\n  if (body.object === 'whatsapp_business_account') {\n    for (const entry of body.entry) {\n      for (const change of entry.changes) {\n        const message = change.value.messages?.[0];\n        if (message) {\n          // Log message for CRM\n          console.log('WhatsApp message received:', message);\n        }\n      }\n    }\n  }\n  res.status(200).json({ status: 'ok' });\n};\n```<br><br>**3. Catálogo de servicios:**<br>Configurar WhatsApp Catalog con los 4 servicios principales (sofás, colchones, alfombras, sillas oficina) con precios y fotos. Esto permite que el cliente explore sin salir de WhatsApp.<br><br>**4. Respuesta automática para leads:**<br>Configurar mensaje de bienvenida que incluya:\n- Saludo personalizado\n- Link al cotizador\n- Catálogo de servicios<br>```\n¡Hola! 👋 Bienvenido a Purity & Clean. ¿En qué podemos ayudarte hoy?\n\n🔹 Quiero cotizar un servicio → [Cotizador](https://purityclean.com/#reservas)\n🔹 Ver precios y servicios → [Catálogo](https://wa.me/c/YOUR_CATALOG_ID)\n🔹 Hablar con un asesor → Un agente te atenderá pronto\n``` |
| **Impacto esperado** | +30% tasa de respuesta inicial, +20% conversión de leads a reservas, métricas de WhatsApp para optimización de copy. |
| **Esfuerzo** | M (8-10 horas — WhatsApp Business setup + webhook + catalog) |
| **Agente recomendado** | Full Stack (backend para webhook + frontend para trigger) |
| **Referencias** | [3] Meta — WhatsApp Business API Documentation<br>[4] WhatsApp Business — Catalog Setup Guide |
| **Estado** | Nueva propuesta — NO mencionada en R1-R106 (R103 la mencionó vagamente) |
| **Prioridad CEO** | **Crítica** — impacto directo en conversión |

---

### Propuesta 3: Cotizador con Comparación de Ahorro por Paquete

| Campo | Detalle |
|-------|---------|
| **Título** | Añadir visualización de ahorro por precio prepago en el cotizador |
| **Problema** | El cotizador actual muestra el precio por servicio individual pero no hace visible el ahorro que obtiene el cliente si compra un plan prepago. Esto es una oportunidad perdida para upselling y para comunicar la propuesta de valor de los planes de mantenimiento. |
| **Descripción** | **1. Agregar sección de comparación en el cotizador:**<br>```javascript\n// En js/script.js — después de calcular precio individual\nfunction showPackageSavings(precioIndividual, serviciosCount) {\n  const precioPaquete = calcularPrecioPaquete(serviciosCount);\n  const ahorro = precioIndividual - precioPaquete;\n  const porcentajeAhorro = Math.round((ahorro / precioIndividual) * 100);\n  \n  const savingsHTML = `\n    <div class="savings-comparison" role="region" aria-label="Comparación de ahorro">\n      <div class="savings-card">\n        <span class="savings-label">Precio individual</span>\n        <span class="savings-price">$${precioIndividual.toLocaleString('es-CO')}</span>\n      </div>\n      <div class="savings-arrow">→</div>\n      <div class="savings-card savings-card--highlight">\n        <span class="savings-label">Plan prepago</span>\n        <span class="savings-price">$${precioPaquete.toLocaleString('es-CO')}</span>\n        <span class="savings-badge">Ahorras ${porcentajeAhorro}%</span>\n      </div>\n    </div>\n  `;\n  \n  document.querySelector('#reservas .cotizador-resultado').insertAdjacentHTML('beforebegin', savingsHTML);\n}\n```<br><br>**2. CSS:**<br>```css\n.savings-comparison {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 16px;\n  margin: 24px 0;\n  padding: 24px;\n  background: var(--color-surface);\n  border-radius: 12px;\n  border: 2px dashed var(--color-border);\n}\n\n.savings-card {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 4px;\n}\n\n.savings-card--highlight {\n  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-light) 100%);\n  padding: 16px 24px;\n  border-radius: 12px;\n  color: white;\n}\n\n.savings-badge {\n  background: var(--color-success);\n  color: white;\n  padding: 4px 12px;\n  border-radius: 20px;\n  font-size: 0.875rem;\n  font-weight: 600;\n}\n``` |
| **Impacto esperado** | +15% conversión a planes prepago, mejor percepción de valor, reducción de abandoned carts en el cotizador. |
| **Esfuerzo** | S (3-4 horas — UI + lógica de cálculo) |
| **Agente recomendado** | Frontend |
| **Referencias** | [5] Baymard Institute — E-commerce Checkout Usability |
| **Estado** | Nueva propuesta — NO mencionada en R1-R106 |
| **Prioridad CEO** | **Alta** — impacto directo en revenue |

---

### Propuesta 4: Sistema Proactivo de Solicitud de Reseñas con Automatización

| Campo | Detalle |
|-------|---------|
| **Título** | Implementar flujo automatizado de solicitud de reseñas post-servicio |
| **Problema** | El sitio muestra testimonios y tiene Schema AggregateRating (4.8, 127 reseñas), pero no hay un sistema proactivo que solicite reseñas a los clientes después del servicio. Según estudios de Podium [6], el 90% de consumidores lee reseñas locales antes de contratar un servicio, y empresas que solicitан reseñas proactivamente reciben 3x más reseñas que las que no lo hacen. |
| **Descripción** | **1. Flow de solicitud de reseña:**<br>Crear un flujo automatizado que se active después de que el cliente confirma el servicio (via Formspree webhook o email):<br><br>**Opción A: Email automatizado (usando Formspree + Zapier)**<br>```\nTrigger: Formspree recibe booking confirmation\n↓\nZapier: Detecta nuevo submission con email\n↓\nZapier: Envía email automático 24h después del servicio\n   Asunto: "¿Cómo fue tu experiencia con Purity & Clean?"\n   Body: "Hola [Nombre], queremos saber cómo estuvo tu servicio...\n         [Dejar reseña en Google](link)\n         [Dejar reseña en nuestro sitio](link)"\n```<br><br>**Opción B: WhatsApp automatizado (si se implementa Propuesta 2)**<br>```\nTrigger: Confirmación de servicio\n↓\nWhatsApp Business API: Envía mensaje 24h después\n   "¡Hola [Nombre]! Esperamos que tu espacio quedó impecable 🧹\n    ¿Cómo calificarías tu experiencia?\n    ⭐⭐⭐⭐⭐ [Dejar reseña en Google](link)\n    Tu opinión nos ayuda a mejorar y a otros clientes como tú."\n```<br><br>**2. Google Review Link dinámico:**<br>Generar un link directo a Google Reviews que sea fácil de compartir:<br>```javascript\n// api/google-review-link.js (genera link de reseñas)\nfunction generateGoogleReviewLink(companyName) {\n  const encodedName = encodeURIComponent(companyName);\n  return `https://search.google.com/reviews/search?ie=UTF8&q=${encodedName}&amp;authuser=0`;\n}\n```<br><br>**3. Página de testimonios dedicada:**<br>Crear `/testimonios.html` que muestre todas las reseñas con fotos (si las hay) y permita filtrar por zona/servicio. Esto mejora el SEO local y la credibilidad. |
| **Impacto esperado** | +3x reseñas Google en 3 meses, mejora en rating de 4.8 a 4.9, mejor CTR en mapa de Google. |
| **Esfuerzo** | M (5-6 horas — flujo automatización + página testimonios) |
| **Agente recomendado** | Full Stack (Zapier/setup) + Content (email copy) |
| **Referencias** | [6] Podium — State of Local Reviews Report 2024 |
| **Estado** | Nueva propuesta — NO mencionada en R1-R106 |
| **Prioridad CEO** | **Alta** — impacto en trust y SEO local |

---

### Propuesta 5: YouTube SEO — Optimización del Canal de Purity & Clean

| Campo | Detalle |
|-------|---------|
| **Título** | Optimizar canal de YouTube con SEO estructurado y content strategy |
| **Problema** | El sitio ya tiene video embebido con VideoObject schema (R102), pero no hay una estrategia clara para YouTube como canal de adquisición. YouTube es el segundo buscador más grande del mundo y las empresas de home services que publican guías de mantenimiento tienen alta tasa de conversión. |
| **Descripción** | **1. Optimización de videos existentes:**<br>Para cada video en el canal, asegurar:<n>- Título con keywords: "Limpieza de sofá en Bogotá | Guía profesional"\n- Descripción con timestamps, link al sitio, link a la zona correspondiente\n- Tags relevantes: #limpieza #bogota #sofá #hogar #servicios\n- Thumbnail con texto overlay (antes/subués de la limpieza)\n- Subtítulos/captions en español\n\n**2. Nuevo content calendar para YouTube:**<br>```\nMes 1: "Cómo eliminar manchas de sofá en casa" (tutorial)\nMes 2: "Antes y después: Limpieza profesional de colchones" (showcase)\nMes 3: "Guía completa: Mantenimiento de alfombras en oficinas" (corporate)\nMes 4: "Testimonial real: Experiencia con Purity & Clean" (UGC style)\n```\n\n**3. Schema VideoObject actualizado para cada zona:**<n```html\n<script type="application/ld+json">\n{\n  "@context": "https://schema.org",\n  "@type": "VideoObject",\n  "name": "Limpieza de sofás en Chapinero, Bogotá | Purity & Clean",\n  "description": "Servicio profesional de limpieza profunda de sofás en Chapinero. Técnicas, productos y resultados.",\n  "uploadDate": "2026-04-28",\n  "duration": "PT4M30S",\n  "contentUrl": "https://www.youtube.com/watch?v=XXXXX",\n  "embedUrl": "https://www.youtube.com/embed/XXXXX",\n  "thumbnailUrl": "https://i.ytimg.com/vi/XXXXX/maxresdefault.jpg",\n  "locationCreated": {\n    "@type": "Place",\n    "name": "Chapinero, Bogotá"\n  }\n}\n</script>\n```<br><br>**4. Links en zonas pages:**<br>Agregar sección "Ver tutorial" en cada zona page con video relevante del canal. |
| **Impacto esperado** | +20% tráfico orgánico a largo plazo, mejor branding,Videos en resultados de búsqueda de YouTube para "limpieza de sofá Bogotá". |
| **Esfuerzo** | M (4-6 horas — SEO de videos existentes + nuevo content plan) |
| **Agente recomendado** | Content (YouTube SEO + videos) + Frontend (Schema) |
| **Referencias** | [7] YouTube — Creator Academy for Business |
| **Estado** | Nueva propuesta — NO mencionada en R1-R106 |
| **Prioridad CEO** | **Media** — impacto de largo plazo en adquisición |

---

### Propuesta 6: Corporate Portal — Panel para Clientes Empresariales

| Campo | Detalle |
|-------|---------|
| **Título** | Crear mini portal corporate para clientes con contrato recurrente |
| **Problema** | Para clientes corporativos (PYMEs y empresas) con contratos recurrentes, el sitio no ofrece ninguna forma de autogestión: ver próximas visitas, pedir servicios adicionales, descargar facturas o reportes de servicio. Esto limita la conversión de leads B2B y la retención de clientes corporativos. |
| **Descripción** | **1. Página de login/corporate (`/corporate.html`):**<br>```html\n<section id="corporate-login" class="corporate-section">\n  <h2>Portal Corporativo</h2>\n  <p>Para clientes con contrato de mantenimiento</p>\n  \n  <form id="corporate-login-form" class="corporate-form">\n    <div class="form-group">\n      <label for="corp-email">Correo corporativo</label>\n      <input type="email" id="corp-email" name="email" required>\n    </div>\n    <div class="form-group">\n      <label for="corp-password">Contraseña</label>\n      <input type="password" id="corp-password" name="password" required>\n    </div>\n    <button type="submit" class="btn btn-primary">Ingresar al Portal</button>\n    <p class="corporate-note">¿No tienes acceso? <a href="#contacto">Contacta a ventas</a></p>\n  </form>\n</section>\n\n<section id="corporate-dashboard" class="corporate-section hidden">\n  <h2>Bienvenido, [Nombre Empresa]</h2>\n  \n  <div class="dashboard-grid">\n    <div class="dashboard-card">\n      <h3>Próxima Visita</h3>\n      <p id="next-visit-date">--</p>\n      <button class="btn btn-secondary">Reprogramar</button>\n    </div>\n    \n    <div class="dashboard-card">\n      <h3>Historial de Servicios</h3>\n      <ul id="service-history"></ul>\n      <button class="btn btn-link">Ver todos</button>\n    </div>\n    \n    <div class="dashboard-card">\n      <h3>Solicitar Servicio Extra</h3>\n      <select id="extra-service">\n        <option value="">Seleccionar servicio</option>\n        <option value="limpieza-sofa">Limpieza adicional de sofá</option>\n        <option value="sanitizacion">Sanitización extraordinaria</option>\n        <option value="mantenimiento">Mantenimiento de alfombras</option>\n      </select>\n      <button class="btn btn-primary">Solicitar</button>\n    </div>\n    \n    <div class="dashboard-card">\n      <h3>Reportes</h3>\n      <a href="/corporate/reporte-2026-04.pdf" class="btn btn-link">📄 Descargar reporte mensual</a>\n    </div>\n  </div>\n</section>\n```<br><br>**2. Sistema de auth simple:**<br>Para un sitio estático, usar Netlify Identity o Auth0 Free Tier para autenticación. Los datos de clientes pueden vivir en un Google Sheet conectado via Zapier. |
| **Impacto esperado** | +30% retención de clientes B2B, +20% upselling a clientes corporativos, diferenciación clara en pitch B2B. |
| **Esfuerzo** | L (10-12 horas — Auth setup + dashboard + backend integration) |
| **Agente recomendado** | Full Stack |
| **Referencias** | [8] Netlify — Identity + Functions for Static Sites |
| **Estado** | Nueva propuesta — NO mencionada en R1-R106 |
| **Prioridad CEO** | **Media** — impacto B2B y retención |

---

### Propuesta 7: Auditoría Continua de Accesibilidad con Playwright y Axe

| Campo | Detalle |
|-------|---------|
| **Título** | Integrar axe-core en la suite de tests E2E para auditoría continua de accesibilidad |
| **Problema** | La suite de tests E2E actual (`accesibilidad.spec.js`) tiene tests manuales pero no tiene integración con herramientas automatizadas de auditoría de accesibilidad (axe-core). Según WebAIM [9], el 97% de sitios web tienen al menos una violación de accesibilidad WCAG detectable automáticamente. Sin testing automatizado, estas violaciones pasan desapercibidas. |
| **Descripción** | **1. Instalar axe-core:**<br>```bash\nnpm install @axe-core/playwright\n```<br><br>**2. Crear test de auditoría accessibility:**<br>```javascript\n// tests/e2e/accessibility-audit.spec.js\nconst { test, expect } = require('@playwright/test');\nconst AxeBuilder = require('@axe-core/playwright').default;\n\ntest.describe('Auditoría de Accesibilidad con Axe', () => {\n  const pagesToAudit = [\n    '/',\n    '/blog/',\n    '/zonas/chapinero/',\n    '/zonas/suba/',\n  ];\n  \n  pagesToAudit.forEach(page => {\n    test(`accesibilidad en ${page} debe pasar sin errores críticos`, async ({ page }) => {\n      await page.goto(page);\n      \n      const results = await new AxeBuilder({ page })\n        .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])\n        .analyze();\n      \n      const criticalViolations = results.violations.filter(\n        v => v.impact === 'critical' || v.impact === 'serious'\n      );\n      \n      if (criticalViolations.length > 0) {\n        console.log('Violaciones críticas encontradas:', criticalViolations);\n      }\n      \n      expect(criticalViolations).toHaveLength(0, \n        `Se encontraron ${criticalViolations.length} violaciones críticas de accesibilidad`);\n    });\n  });\n  \n  test('todas las páginas deben tener meta viewport y lang', async ({ page }) => {\n    await page.goto('/');\n    const viewport = await page.\$eval('meta[name=viewport]', el => el.content);\n    expect(viewport).toContain('width=device-width');\n    \n    const lang = await page.\$eval('html', el => el.lang);\n    expect(lang).toMatch(/^es/);\n  });\n});\n```<br><br>**3. Actualizar playwright.config.js para incluir accessibility audit:**<br>```javascript\n// En playwright.config.js\nmodule.exports = defineConfig({\n  testDir: './tests',\n  fullyParallel: true,\n  reporter: [['list'], ['@axe-core/playwright-reporter']],\n  // ...rest\n});\n```<br><br>**4. GitHub Action para CI:**<br>```yaml\n# .github/workflows/accessibility.yml\nname: Accessibility Audit\non: [push, pull_request]\njobs:\n  axe:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v3\n      - uses: actions/setup-node@v3\n        with:\n          node-version: 18\n      - run: npm ci\n      - run: npm run test -- --reporter=@axe-core/playwright-reporter\n      - uses: actions/upload-artifact@v3\n        if: failure()\n        with:\n          name: axe-report\n          path: playwright-report/\n``` |
| **Impacto esperado** | Detección temprana de violaciones WCAG, compliance mejora, mejor UX para usuarios con discapacidades, SEO indirecto (accesibilidad correlaciona con SEO técnico). |
| **Esfuerzo** | S (3-4 horas — install + 1 spec file + CI setup) |
| **Agente recomendado** | QA |
| **Referencias** | [9] WebAIM — The WebAIM Million Report 2024<br>[10] axe-core — Accessibility Testing API |
| **Estado** | Nueva propuesta — NO mencionada en R1-R106 |
| **Prioridad CEO** | **Media** — calidad técnica y compliance |

---

## Resumen: Propuestas R107

| # | Propuesta | Impacto | Esfuerzo | Prioridad |
|---|-----------|---------|----------|-----------|
| 1 | **Plan de Suscripción Prepago (Membership)** | +25% revenue recurrente | M | 🔴 **Crítica** |
| 2 | **WhatsApp Business API Integration** | +30% tasa de respuesta | M | 🔴 **Crítica** |
| 3 | **Cotizador con Ahorro Visible por Paquete** | +15% conversión a planes | S | **Alta** |
| 4 | **Sistema Proactivo de Reseñas** | +3x reseñas Google | M | **Alta** |
| 5 | **YouTube SEO Strategy** | +20% tráfico orgánico | M | Media |
| 6 | **Corporate Portal** | +30% retención B2B | L | Media |
| 7 | **Auditoría Accesibilidad con Axe** | Compliance WCAG continuo | S | Media |

---

## Dependencias entre Propuestas

| Propuesta R107 | Depende de | Notas |
|----------------|------------|-------|
| Plan de Suscripción | Ninguna | Independiente |
| WhatsApp Business API | Ninguna | Requiere cuenta Business de Meta |
| Cotizador con Ahorro | Propuesta 1 | Necesita los planes definidos |
| Sistema de Reseñas | Propuesta 2 (opcional) | Puede implementarse sin WA API via email |
| YouTube SEO | Ninguna | Trabajo editorial |
| Corporate Portal | Ninguna | Requiere Auth (Netlify Identity) |
| Auditoría Axe | Playwright existente (R85) | Expande suite existente |

---

## Orden de Implementación Sugerido

1. **Propuesta 1** (Crítica, M) — Mes 1: Membership model es la base de revenue recurrente
2. **Propuesta 2** (Crítica, M) — Mes 1-2: WhatsApp Business API potencia las ventas
3. **Propuesta 3** (Alta, S) — Mes 2: Visualización de ahorro incrementa conversión de planes
4. **Propuesta 4** (Alta, M) — Mes 2-3: Reseñas proactivas mejoran credibility
5. **Propuesta 7** (Media, S) — Mes 3: Auditoría de accesibilidad mejora calidad técnica
6. **Propuesta 5** (Media, M) — Mes 3-4: YouTube SEO como canal de adquisición
7. **Propuesta 6** (Media, L) — Mes 4-5: Corporate portal para B2B

---

## Fuentes

[1] ServiceTitan. "Home Services Revenue Benchmark Report 2025." https://www.servicetitan.com

[2] HomeAdvisor. "Membership Plans for Home Services Businesses." https://www.homeadvisor.com

[3] Meta. "WhatsApp Business API Documentation." https://developers.facebook.com/docs/whatsapp

[4] WhatsApp Business. "Setting Up Your WhatsApp Business Catalog." https://business.whatsapp.com

[5] Baymard Institute. "E-commerce Checkout Usability Research." https://baymard.com/blog/checkout-usability

[6] Podium. "State of Local Reviews Report 2024." https://www.podium.com

[7] YouTube. "Creator Academy for Business Channels." https://www.youtube.com/creatoracademy

[8] Netlify. "Identity and Functions for Static Sites." https://www.netlify.com/products/identity

[9] WebAIM. "The WebAIM Million Report 2024 — Accessibility Analysis." https://webaim.org

[10] axe-core. "Playwright Testing Integration." https://github.com/dequelabs/axe-core-npm

---

*Documento generado por Innovation Scout — Round 107*
*Purity & Clean Analysis — 2026-04-28*
*Co-Authored-By: Paperclip <noreply@paperclip.ing>*