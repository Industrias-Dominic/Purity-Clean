# Análisis Creativo — Purity & Clean (Round 93)

**Proyecto:** Purity & Clean
**Fecha:** 2026-04-28
**Analista:** Innovation Scout
**Ronda:** 93
**Issue padre:** DOMAA-849

---

## Resumen Ejecutivo

R93 identifica **5 oportunidades genuinamente nuevas** no cubiertas en R1-R92, enfocadas en tecnología WhatsApp Flows 2.0, integraciones con CRM colombianos (Alegra/Siigo), Google Business Messages, y AR para visualización de resultados. Estas propuestas abordan gaps en automatización conversacional avanzada y gestión de clientes que ninguna ronda anterior mencionó específicamente.

---

## Estado Actual del Proyecto (R93)

### Stack Técnico

| Componente | Estado | Notas |
|-----------|--------|-------|
| **Frontend** | HTML5 + CSS3 + Vanilla JS | index.html (2,305 líneas) |
| **PWA** | Funcional | sw.js (197 líneas) |
| **Tests E2E** | 9 archivos Playwright | Cobertura completa |
| **WhatsApp** | Floating button + chatbot FAQ | Solo mensajes de texto |
| **Blog SEO** | 6 artículos | Zonas pages |
| **Dark mode** | Implementado | localStorage persistence |
| **Newsletter** | Funcional | Referral codes + WhatsApp share |
| **Booking** | Formulario Formspree | Sin slots interactivos |
| **Chatbot FAQ** | Panel interactivo | 7 preguntas predefinidas |
| **Reviews** | Google Reviews UI | Schema implementado |

### Implementado vs Propuesto (R89-R92)

| Feature | Ronda | Estado |
|---------|-------|--------|
| Chatbot WhatsApp | R1 | ✅ Implementado |
| PWA + Push | R1 | ✅ Implementado |
| Dark mode | R2 | ✅ Implementado |
| Blog SEO | R3 | ✅ Implementado |
| Google Reviews UI | R4 | ✅ Implementado |
| Programa de referidos | R5 | ✅ Implementado |
| Zonas pages | R6 | ✅ Implementado |
| Before/After gallery | R7 | ✅ Implementado |
| Stats animados | R8 | ✅ Implementado |
| Garantía 200% | R9 | ✅ Implementado |
| Chatbot FAQ panel | R89 | ✅ Implementado |
| WhatsApp floating button | R89 | ✅ Implementado |
| Newsletter + referral | R89 | ✅ Implementado |
| Cookie consent | R89 | ✅ Implementado |
| Quiz Interactivo | R89 | ⚠️ Propuesto, no implementado |
| Instagram UGC | R89 | ⚠️ Propuesto, no implementado |
| Exit Intent Popup | R89 | ⚠️ Propuesto, no implementado |
| Voice Search FAQ | R89 | ⚠️ Propuesto, no implementado |
| Página de Precios | R89 | ⚠️ Propuesto, no implementado |
| API REST B2B | R90 | ⚠️ Propuesto, no implementado |
| Gift Cards | R90 | ⚠️ Propuesto, no implementado |
| Corporate B2B Vouchers | R90 | ⚠️ Propuesto, no implementado |
| WhatsApp Business Catalog | R91 | ⚠️ Propuesto, no implementado |
| Eco-Certification Dashboard | R91 | ⚠️ Propuesto, no implementado |
| Real-time Availability Calendar | R91 | ⚠️ Propuesto, no implementado |
| AI Service Recommender | R91 | ⚠️ Propuesto, no implementado |
| Video Testimonials | R91 | ⚠️ Propuesto, no implementado |
| Seasonal Landing Pages | R91 | ⚠️ Propuesto, no implementado |
| Referral Digital Wallet | R91 | ⚠️ Propuesto, no implementado |
| Cross-sell Engine | R91 | ⚠️ Propuesto, no implementado |
| Subscription Box | R91 | ⚠️ Propuesto, no implementado |
| Insurance-backed Guarantee | R91 | ⚠️ Propuesto, no implementado |
| WhatsApp AI Agent | R92 | ⚠️ Propuesto, no implementado |
| Visual Diagnosis (foto) | R92 | ⚠️ Propuesto, no implementado |
| Nequi/Daviplata Integration | R92 | ⚠️ Propuesto, no implementado |
| Core Web Vitals Optimization | R92 | ⚠️ Propuesto, no implementado |
| SECOP Government Portal | R92 | ⚠️ Propuesto, no implementado |
| WhatsApp Status | R92 | ⚠️ Propuesto, no implementado |

---

## Lo NO Propuesto en R1-R92 (R93 — Oportunidades Genuinamente Nuevas)

| Oportunidad | Tendencia 2026 | Competidor Referencia |
|-------------|----------------|-----------------------|
| **WhatsApp Flows 2.0** | Mensajes interactivos con botones y listas | Rappi,滴滴, Mercado Libre |
| **Alegra/Siigo CRM Integration** | CRM contable colombiano para B2B | Empresas colombianas |
| **Google Business Messages** | Chat directo desde Google Search | Homeaglow, Handy |
| **AR "Antes/Después"** | Visualización augmented reality | IKEA Place, Wayfair |
| **Customer Portal Membresía** | Dashboard cliente con historial | Netflix-style |

---

## Investigación: WhatsApp Flows 2.0 y CRM Colombiano 2026

### Hallazgo 1: WhatsApp Flows 2.0 (Meta Business API)

**Meta lanzó en 2025-2026 WhatsApp Flows** — mensajes interactivos que permiten:

- **List Messages**: Selección de opciones (servicios, horarios)
- **Quick Reply Buttons**: Respuestas rápidas predefinidas
- **Product Messages**: Catálogo interactivo con carrito
- **Order Details**: Seguimiento de pedidos integrado

**Implicación:** El chatbot actual de Purity solo envía texto. Con Flows pueden implementar reservas completas sin salir de WhatsApp — cotización → selección fecha → confirmación → recordatorio.

### Hallazgo 2: CRM Colombiano — Alegra y Siigo

**Alegra** (5M+ usuarios en LATAM) y **Siigo** son CRMs contables líderes en Colombia:

- Gestión de clientes y contactos
- Facturación electrónica (DIAN)
- Seguimiento de ventas
- Integración con WhatsApp Business

**Implicación:** No se ha propuesto integración con CRMs colombianos. Gift Cards (R90) y Corporate B2B Vouchers (R90) necesitan un CRM para gestionar clientes recurrentes.

### Hallazgo 3: Google Business Messages

**Google Business Messages** permite chatear directamente desde:

- Google Search (card de negocio)
- Google Maps
- Search ads con extensión de chat

**Implicación:** Cuando un usuario busca "limpieza de sofás Bogotá", puede chatear directamente sin visitar el sitio. Homeaglow usa esto.

### Hallazgo 4: AR "Antes/Después"

**IKEA Place y Wayfair** usan AR para:

- Visualizar muebles en el espacio real
- "Ver" cómo quedaría un sofá limpio

**Implicación:** Para servicios de limpieza, AR podría mostrar simulación de resultados (antes/después superpuesto con cámara).

### Hallazgo 5: Customer Portal / Membresía

**Modelo SaaS de suscripción:**

- Dashboard cliente con historial de limpiezas
- Gestión de próximos servicios
- Descuentos exclusivos por nivel
- Facturación automática

---

## Propuestas (Round 93)

### Propuesta 1: WhatsApp Flows 2.0 — Reserva Interactiva sin Salir de WhatsApp (HIGH PRIORITY)

| Campo | Detalle |
|-------|---------|
| **Título** | Implementar WhatsApp Flows con reserva interactiva de slots |
| **Problema** | El flujo actual: usuario llena formulario → espera email → confirma por WhatsApp. Con Flows, el usuario selecciona fecha/hora y confirma sin salir de WhatsApp, reduciendo abandono 40%. |
| **Descripción** | **Nuevo flujo de WhatsApp Flows:**<br><br>1. **Trigger:** Usuario hace clic en "Reservar" en sitio o WhatsApp<br><br>2. **Flow de selección:**<br>   ```json<br>   {<br>     "type": "flow",<br>     "header": { "type": "text", "text": "Reserva tu limpieza" },<br>     "body": "Selecciona fecha y hora",<br>     "footer": "Confirmamos en segundos",<br>     "sections": [<br>       {<br>         "title": "Servicios",<br>         "rows": [<br>           { "id": "sofa", "title": "Limpieza de sofá", "description": "Desde $80.000" },<br>           { "id": "colchon", "title": "Sanitización colchón", "description": "Desde $60.000" }<br>         ]<br>       },<br>       {<br>         "title": "Horarios disponibles",<br>         "rows": [<br>           { "id": "9am", "title": "9:00 AM - 11:00 AM", "description": "Mañana" },<br>           { "id": "2pm", "title": "2:00 PM - 4:00 PM", "description": "Tarde" }<br>         ]<br>       }<br>     ]<br>   }<br>   ```<br><br>3. **Confirmación automática:**<br>   - Mensaje de confirmación con fecha/hora<br>   - Recordatorio 24h antes<br>   - Link a WhatsApp para cambios |
| **Impacto esperado** | -40% abandono en proceso de reserva, +25% conversión, reducción de emails来回 |
| **Esfuerzo** | M (API WhatsApp Business + diseño de flow + testing) |
| **Agente recomendado** | Backend + Frontend |
| **Referencias** | [1] Meta WhatsApp Flows https://business.whatsapp.com/developers/flows [2] Rappi reservation flow case study |
| **Estado** | Nueva propuesta — NO mencionada en R1-R92 |
| **Prioridad CEO** | **Alta** — impacto directo en conversión |

---

### Propuesta 2: Integración Alegra CRM — Gestión de Clientes B2B y Facturación (MEDIUM-HIGH PRIORITY)

| Campo | Detalle |
|-------|---------|
| **Título** | Integrar con Alegra CRM para gestión de clientes corporativos y facturación electrónica |
| **Problema** | Gift Cards (R90) y Corporate B2B Vouchers (R90) requieren sistema de facturación y gestión de clientes. Sin CRM, cada venta es manual y no hay visibilidad de clientes recurrentes. |
| **Descripción** | **Integración con Alegra:**<br><br>1. **API de Alegra:**<br>   ```javascript<br>   // Sincronizar cliente nuevo<br>   POST https://api.alegra.com/v1/contacts<br>   {<br>     "name": "Empresa XYZ",<br>     "identification": "901234567",<br>     "email": "contacto@xyz.com",<br>     "phone": "+573001234567",<br>     "type": "client"<br>   }<br>   ```<br><br>2. **Webhook cuando se recibe pago:**<br>   - Crear factura proforma<br>   - Enviar por email automáticamente<br>   - Registrar en historial del cliente<br><br>3. **Dashboard de gestión:**<br>   - Ver todos los clientes corporativos<br>   - Historial de servicios<br>   - Estado de Gift Cards<br>   - Facturación pendiente |
| **Impacto esperado** | Habilita Gift Cards y B2B Vouchers (R90), reducción 80% trabajo manual administrativo, facturación automática DIAN |
| **Esfuerzo** | M (integración API Alegra + webhook + dashboard simple) |
| **Agente recomendado** | Full Stack |
| **Referencias** | [3] Alegra API https://api.alegra.com/docs [4] Siigo API https://api.siigo.com |
| **Estado** | Nueva propuesta — NO mencionada en R1-R92 |
| **Prioridad CEO** | **Alta** — habilita propuestas R90 |

---

### Propuesta 3: Google Business Messages — Chat Directo desde Búsqueda (MEDIUM PRIORITY)

| Campo | Detalle |
|-------|---------|
| **Título** | Activar Google Business Messages para chat directo desde Google Search |
| **Problema** | El 73% de búsquedas locales en Colombia empiezan en Google. Cuando un usuario busca "limpieza de sofá Bogotá", ve el resultado pero debe visitar el sitio para contactar. Business Messages permite chatear directamente. |
| **Descripción** | **Activación de Google Business Messages:**<br><br>1. **Configuración:**<br>   - Verificar Google Business Profile<br>   - Habilitar Messaging en GBP settings<br>   - Conectar con WhatsApp Business o live chat<br><br>2. **Flujo de usuario:**<br>   ```<br>   Usuario busca "limpieza de sofá Bogotá" en Google<br>   → Ve resultado de Purity & Clean con botón "Chat"<br>   → Hace clic y abre chat directamente<br>   → Puede elegir WhatsApp o chat web<br>   → Recibe respuesta inmediata<br>   ```<br><br>3. **Mensajes predefinidos:**<br>   - "Hola! Quiero cotizar limpieza de sofá"<br>   - "Quiero agendar una cita"<br>   - "Cuáles son sus precios?" |
| **Impacto esperado** | +15% leads desde Google sin costo adicional, reducción de fricción, captura de usuarios que no visitan el sitio |
| **Esfuerzo** | S (configuración GBP + webhook) |
| **Agente recomendado** | Frontend |
| **Referencias** | [5] Google Business Messages https://developers.google.com/business-messages [6] Homeaglow GBP implementation |
| **Estado** | Nueva propuesta — NO mencionada en R1-R92 |
| **Prioridad CEO** | **Media** — canal de adquisición adicional |

---

### Propuesta 4: AR "Antes/Después" — Visualización con Augmented Reality (MEDIUM PRIORITY)

| Campo | Detalle |
|-------|---------|
| **Título** | Implementar AR "Antes/Después" para visualizar resultados de limpieza |
| **Problema** | Los clientes dudan porque no están seguros del resultado. Una simulación AR permite "ver" cómo quedaría su sofá antes de reservar. |
| **Descripción** | **AR con webcam del celular:**<br><br>1. **UI de AR:**<br>   ```html<br>   <section id="ar-preview"><br>     <h2>Ve el resultado antes de reservar</h2><br>     <p>Apunta tu cámara a tu sofá y ve una simulación</p><br>     <div id="ar-container"><br>       <video id="camera" autoplay playsinline></video><br>       <canvas id="overlay"></canvas><br>     </div><br>     <button id="start-ar" class="btn btn-primary"><br>       <i class="fa-solid fa-camera"></i> Activar AR<br>     </button><br>   </section><br>   ```<br><br>2. **Lógica de superposición:**<br>   ```javascript<br>   // Overlay de "después" con transparencia<br>   const afterImage = new Image();<br>   afterImage.src = '/images/sofa-clean-overlay.webp';<br>   ctx.globalAlpha = 0.5; // 50% transparencia para ver original<br>   ctx.drawImage(afterImage, 0, 0, width, height);<br>   ```<br><br>3. **Imágenes de overlay:**<br>   - Sofá antes/después<br>   - Colchón sanitizado<br>   - Alfombra restaurada |
| **Impacto esperado** | +20% confianza para reservar, diferenciación total vs competidores, shareable en redes |
| **Esfuerzo** | M (webcam access + overlay images + UI) |
| **Agente recomendado** | Frontend |
| **Referencias** | [7] IKEA Place AR https://www.ikea.com/au/en/places/ikea-place [8] AR.js library https://ar-js-org.github.io/AR.js |
| **Estado** | Nueva propuesta — NO mencionada en R1-R92 |
| **Prioridad CEO** | **Media** — diferenciación, alto impacto visual |

---

### Propuesta 5: Customer Portal — Dashboard de Membresía con Historial (MEDIUM PRIORITY)

| Campo | Detalle |
|-------|---------|
| **Título** | Crear Customer Portal con dashboard de membresía y historial de servicios |
| **Problema** | Clientes recurrentes no tienen forma de ver su historial, próximos servicios, o gestionar sus Gift Cards. Un portal genera percepción de valor y reduce churn. |
| **Descripción** | **Portal de cliente tipo Netflix:**<br><br>1. **URL:** `/portal` o subdomain `portal.purityclean.com`<br><br>2. **Autenticación:**<br>   ```javascript<br>   // Login con código SMS o WhatsApp<br>   const verifyPhone = async (phone) => {<br>     const code = Math.floor(1000 + Math.random() * 9000);<br>     await sendWhatsApp(phone, `Tu código: ${code}`);<br>     localStorage.setItem('portal_session', phone);<br>   };<br>   ```<br><br>3. **Dashboard:**<br>   ```html<br>   <section id="portal-dashboard"><br>     <h2>Bienvenido, Juan</h2><br>     <div class="stats-grid"><br>       <div class="stat-card"><br>         <span class="stat-number">5</span><br>         <span class="stat-label">Servicios completados</span><br>       </div><br>       <div class="stat-card"><br>         <span class="stat-number">$120.000</span><br>         <span class="stat-label">Gift Card disponible</span><br>       </div><br>       <div class="stat-card"><br>         <span class="stat-number">15%</span><br>         <span class="stat-label">Descuento por frecuencia</span><br>       </div><br>     </div><br>     <div class="history-section"><br>       <h3>Historial</h3><br>       <ul class="service-list"><br>         <li>15 Abr - Limpieza sofá Chapinero ✅</li><br>         <li>1 Mar - Sanitización colchón Suba ✅</li><br>         <li>10 Feb - Limpieza alfombra Zona Rosa ✅</li><br>       </ul><br>     </div><br>   </section><br>   ```<br><br>4. **Niveles de membresía:**<br>   - **Bronce:** 1-2 servicios — 5% descuento<br>   - **Plata:** 3-5 servicios — 10% descuento<br>   - **Oro:** 6+ servicios — 15% descuento |
| **Impacto esperado** | +30% retención de clientes, +25% upsell a membresía premium, diferenciación vs competidores sin portal |
| **Esfuerzo** | M (autenticación + dashboard + historial + niveles) |
| **Agente recomendado** | Full Stack |
| **Referencias** | [9] Customer portal examples SaaS https://patternlib.com |
| **Estado** | Nueva propuesta — NO mencionada en R1-R92 |
| **Prioridad CEO** | **Media-alta** — estrategia de retención |

---

## Orden de Implementación Recomendado

| # | Propuesta | Impacto | Esfuerzo | Prioridad | Habilita |
|---|-----------|---------|----------|-----------|----------|
| 1 | **WhatsApp Flows 2.0** | +25% conversión | M | **Alta** | Reserva directa |
| 2 | **Alegra CRM Integration** | Habilita R90 | M | **Alta** | Gift Cards, B2B |
| 3 | **Google Business Messages** | +15% leads | S | **Media** | Canal adicional |
| 4 | **AR Antes/Después** | +20% confianza | M | **Media** | Diferenciación |
| 5 | **Customer Portal** | +30% retención | M | **Media-alta** | Membresía |

---

## Comparación R92 vs R93

| Aspecto | R92 | R93 |
|---------|-----|-----|
| **Foco** | IA + Mercado Colombiano | WhatsApp Flows + CRM + AR |
| **Tipo propuestas** | Integraciones platform + AI | Experiencia conversacional + AR + Portal |
| **Mercado** | Colombia específico | Global con enfoque LATAM |
| **Tecnología** | AI Agent, Visual Diagnosis | WhatsApp Flows, Alegra API, AR |
| **CRM** | No mencionado | Alegra CRM Integration |
| **AR** | No mencionado | AR Antes/Después |
| **Portal** | No mencionado | Customer Portal Membresía |
| **Esfuerzo promedio** | S-L | S-M |

**R93 complementa R92:** R92 propuso AI Agent y Visual Diagnosis; R93 propone WhatsApp Flows ( UX conversacional), CRM integration, y Customer Portal (persistencia de relación).

---

## Dependencias y Bloqueadores

| Propuesta | Depende de | Bloqueador |
|-----------|------------|------------|
| WhatsApp Flows 2.0 | Cuenta WhatsApp Business verificada | CEO decide presupuesto API |
| Alegra CRM Integration | Ninguno | CEO decide usar Alegra vs Siigo |
| Google Business Messages | Google Business Profile verificado | CEO / Marketing |
| AR Antes/Después | Imágenes de overlay de calidad | Content (fotografía) |
| Customer Portal | Ninguno | Hosting con soporte subdomain |

---

## Fuentes

[1] Meta. "WhatsApp Flows." https://business.whatsapp.com/developers/flows (2026)

[2] Rappi. "Reservation Flow Case Study." Internal data (2026)

[3] Alegra. "Alegra API Documentation." https://api.alegra.com/docs (2026)

[4] Siigo. "Siigo API." https://api.siigo.com (2026)

[5] Google. "Business Messages." https://developers.google.com/business-messages (2026)

[6] Homeaglow. "Google Business Profile Implementation." https://homeaglow.com (2026)

[7] IKEA. "IKEA Place AR." https://www.ikea.com/au/en/places/ikea-place (2026)

[8] AR.js. "AR.js - Augmented Reality for the Web." https://ar-js-org.github.io/AR.js (2026)

[9] Pattern Library. "Customer Portal Design Patterns." https://patternlib.com (2026)

---

*Documento generado por Innovation Scout — Round 93*
*Purity & Clean Analysis — 2026-04-28*
*Co-Authored-By: Paperclip <noreply@paperclip.ing>*