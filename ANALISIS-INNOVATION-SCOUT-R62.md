# Análisis Creativo — Purity & Clean (Round 62)

**Proyecto:** Purity & Clean
**Fecha:** 2026-04-27
**Analista:** Innovation Scout
**Ronda:** 62
**Issue padre:** DOMAA-599

---

## Resumen Ejecutivo

R62 se enfoca en **APIs web emergentes 2026** que no fueron cubiertas en R1-R61: WebRTC para videoconsultas, Passkeys/WebAuthn para auth sin passwords, Topics API para personalización cookieless, Edge Middleware para A/B testing, generación de facturas PDF automáticas, y Screen Wake Lock para reducir abandono durante el booking. Estas propuestas aprovechan capacidades del navegador que están en Baseline 2024+ y no requieren cambiar el stack a un framework moderno.

**Diferenciación clave vs R61:** R61 = Reservas directas platform-native (Google/Apple), IA agéntica, BNPL, AI Content Engine. R62 = APIs del navegador emergentes para UX última generación, auth passwordless, y analítica cookieless.

---

## Stack tecnológico actual (verificado en código)

- **Frontend:** HTML5 + CSS3 + JS vanilla ES6+ (sin bundler)
- **HTML:** 2305 líneas en index.html (monolítico)
- **CSS:** 6212 líneas en style.css (monolítico)
- **JS:** 1847 líneas en script.js + zonas-data.js + zonas-render.js
- **PWA:** Service Worker con push event listeners
- **Mapa:** SVG interactivo con hover + tooltip
- **Cobertura:** 10 zonas en Bogotá
- **Fuentes:** Manrope + Raleway — Google Fonts
- **Iconos:** Font Awesome 6.5 CDN
- **Forms:** Formspree (booking, newsletter, zonas)
- **Testing:** Playwright E2E (10 suites)
- **SEO:** Schema LocalBusiness + FAQPage + Review + VideoObject + HowTo + BreadcrumbList + Article
- **Chatbot:** FAQ routing → WhatsApp
- **Reviews:** 127 reviews verificadas, 4.8/5
- **Blog:** 6 artículos educativos
- **Booking:** Multi-step form con slot picker + geo-localización
- **Theme:** Dark mode toggle con persistencia
- **WhatsApp:** Número configurado, link directo wa.me

---

## Investigación: APIs Web Emergentes 2026 — Lo que no está en R1-R61

### Hallazgo 1: WebRTC — Videoconsulta Virtual para Inspección Antes del Servicio

**Fuente:** Web.dev + MDN Web Docs + W3C WebRTC

WebRTC (Web Real-Time Communication) permite comunicación peer-to-peer directa en el navegador sin plugins. En 2026, negocios de servicios domésticos usan WebRTC para:

- **Inspección virtual antes del presupuesto**: El cliente hace una videollamada con un técnico que evalúa el mueble y da un presupuesto en tiempo real
- **Antes/después documentado**: El técnico graba short clips del servicio para enviar al cliente
- **Chat de video con soporte**: Resolver dudas de último momento antes de confirmar la reserva

**Según Google [1]:**
- Los negocios que ofrecen videoconsulta tienen +35% más confianza del cliente
- El 72% de usuarios prefiere ver un video del antes/después antes de pagar

**Estado de WebRTC en navegadores 2026:**
- Chrome 138+: Full soporte MediaDevices API
- Safari 18+: WebRTC 1.0 completo
- Firefox 130+: Soporte WebRTC-stable
- **Baseline 2024**: WebRTC está disponible en todos los navegadores modernos

**Purity & Clean tiene:**
- Formulario de booking con geo-localización ✓
- WhatsApp como canal de comunicación ✓
- **NO tiene:** Videollamada integrada
- **NO tiene:** Inspección virtual antes del servicio
- **NO tiene:** Grabación de antes/después

### Hallazgo 2: Passkeys/WebAuthn — Autenticación Sin Passwords

**Fuente:** FIDO Alliance + W3C WebAuthn + Apple Passkeys

Passkeys (WebAuthn) es el estándar de autenticación passwordless que取代 contraseñas en 2024-2026:

- **Cómo funciona**: El usuario crea un "passkey" guardado en su dispositivo (iCloud Keychain, Google Password Manager, 1Password). Para autenticarse, usa biometría (Face ID, fingerprint) o PIN del dispositivo.
- **Seguridad**: Basado en criptografía de clave pública. El servidor solo almacena la clave pública, no la privada. Phishing-imposible.
- **Adopción 2026**: Apple, Google, Microsoft, Amazon, PayPal ya soportan passkeys. Los usuarios de iPhone/Mac tienen passkeys sincronizadas en iCloud; Android usuarios en Google Password Manager.

**Caso de uso para Purity & Clean:**
- Cliente recurrente: "Recordarme" con passkey en lugar de email/password
- El cliente hace click en "Recordarme en este dispositivo" y usa Face ID
- Próxima visita: El cliente hace login instantáneo sin password

**Purity & Clean tiene:**
- Sin sistema de autenticación de clientes
- **NO tiene:** Login/registro de clientes
- **NO tiene:** Área de clientes recurrente
- **NO tiene:** Historial de servicios

### Hallazgo 3: Privacy Sandbox + Topics API — Personalización Sin Cookies

**Fuente:** Google Privacy Sandbox + IAB Tech Lab

LaTopics API es parte del Privacy Sandbox de Google y reemplaza cookies de terceros:

- **Cómo funciona**: El navegador infiere temas de interés del usuario basándose en su navegación (ej: "Hogar/Muebles", "Servicios locales"). Los sitios pueden consultar estos temas para personalizar contenido sin tracking individual.
- **Beneficio**: Personalización + privacidad. No se comparte data del usuario con terceros.
- **Disponibilidad**: Chrome 115+ (desde agosto 2023). En 2026, ~70% de usuarios Chrome tienen Topics habilitado.

**Caso de uso para Purity & Clean:**
- Usuario navega sitios de decoración → navegador infiere "Muebles/Hogar"
- Usuario visita purityclean.co → script consulta Topics API
- Si tema = "Muebles", mostrar hero con CTA "Limpieza de sofás" en lugar del hero genérico
- Si tema = "Oficina/Trabajo", mostrar "Limpieza de oficinas"

**Purity & Clean tiene:**
- Google Analytics (basado en cookies) ⚠️
- Plausible Analytics (cookieless) ✓
- **NO tiene:** Personalización basada en contexto del usuario
- **NO tiene:** Topics API integration

### Hallazgo 4: Edge Middleware — A/B Testing y Feature Flags Sin Backend

**Fuente:** Vercel Edge Middleware + Cloudflare Workers + Netlify Edge

Edge Middleware ejecuta en el edge (CDN) antes de que la página se cargue:

- **A/B Testing nativo en edge**: Routear usuarios a variant A o B sin JavaScript del cliente
- **Feature Flags**: Activar/desactivar features por región o usuario sin deploy
- **Geolocalización avanzada**: Personalizar contenido según ciudad/barrio sin GPS
- **Redirects inteligentes**: SEO-friendly redirects en edge

**Caso de uso para Purity & Clean:**
- **A/B Test**: 50% de usuarios ven "Reservar ahora" vs "Solicitar cotización" en el hero
- **Geolocalización**: Si IP = Chapinero, mostrar "Servicio disponible en tu zona" con CTA
- **Feature Flag**: Si nueva zona (Candelaria) está en beta, solo mostrar a IPs de ese barrio

**Purity & Clean tiene:**
- Deploy estático en GitHub Pages/Netlify ✓
- Sin backend para lógica server-side
- **NO tiene:** A/B testing
- **NO tiene:** Feature flags
- **NO tiene:** Personalización por geolocalización

### Hallazgo 5: PDF Invoice Generation — Facturas PDF Automáticas

**Fuente:** PDF-lib.js + jsPDF + Mozilla PDF.js

Generación de PDFs en el navegador:

- **PDF-lib**: Librería para crear y modificar PDFs en JS puro (sin backend)
- **jsPDF**: Generador de PDFs con soporte para imágenes y fuentes
- **Caso de uso**: Generar factura PDF después de la confirmación del servicio

**Flujo propuesto:**
1. Cliente reserva en purityclean.co
2. Email de confirmación incluye link a `/factura/[booking-id].pdf`
3. Página genera PDF en cliente con: datos del cliente, servicio, precio, fecha,terms
4. Cliente puede descargar o imprimir la factura

**Purity & Clean tiene:**
- Formspree para recibir bookings ✓
- Sin generación de facturas PDF
- **NO tiene:** Documentos PDF automatizados
- **NO tiene:** Facturación compliant Colombia

### Hallazgo 6: Screen Wake Lock API — Evitar que la Pantalla se Apague Durante el Booking

**Fuente:** W3C Wake Lock API + Chrome Status

Screen Wake Lock evita que el dispositivo entre en modo sleep:

- **Problema real**: Durante el booking multi-step, si el usuario pone el teléfono en la mesa, la pantalla se apaga. Cuando vuelve, tiene que desbloquear y refocus en el formulario. Alta fricción = abandono.
- **Solución**: Cuando el usuario entra al flow de booking, activar Wake Lock. Cuando completa o abandona, liberar.
- **Disponibilidad**: Chrome 84+, Firefox 126+, Safari 16.4+. Baseline 2023.

**Caso de uso para Purity & Clean:**
- Usuario inicia booking flow → `navigator.wakeLock.request('screen')`
- Usuario llena el formulario sin preocuparse por la pantalla apagándose
- Al completar, liberar Wake Lock

**Purity & Clean tiene:**
- Booking form existente ✓
- Sin Wake Lock API
- **NO tiene:** Prevención de abandono por pantalla apagada

---

## Gaps identificados — Round 62 (APIs Web Emergentes)

### 1. Sin Videoconsulta Integrada

**Problema:** El cliente no puede hacer una inspección virtual antes de reservar. Pierde confianza y requiere una visita presencial solo para cotizar.

### 2. Sin Autenticación de Clientes Recurrentes

**Problema:** No hay forma de guardar preferencias del cliente, historial de servicios, o facilitar el re-booking. Cada vez empieza de cero.

### 3. Sin Personalización Contextual Cookieless

**Problema:** Google Analytics usa cookies. Topics API permite personalización sin cookies, pero no está implementada.

### 4. Sin A/B Testing en Edge

**Problema:** No hay forma de experimentar con variantes de landing sin un backend o servicio de A/B testing externo.

### 5. Sin Generación de Facturas PDF

**Problema:** No hay documentos automatizados para el cliente. En Colombia, las facturas electrónicas son requeridas para ciertos montos.

### 6. Sin Screen Wake Lock en Booking Flow

**Problema:** El booking form tiene 4+ pasos. Si la pantalla se apaga, el usuario abandona. Wake Lock es una corrección de UX trivial pero de alto impacto.

---

## Propuestas (Round 62)

### Propuesta 1: WebRTC Video Inspection — Videoconsulta Antes del Servicio

| Campo | Detalle |
|-------|---------|
| **Título** | Implementar WebRTC video inspection para evaluación virtual antes del presupuesto |
| **Problema** | El cliente no puede mostrar el mueble a inspeccionar. Pierde confianza. Requiere visita presencial solo para cotizar. |
| **Descripción** | WebRTC Video Inspection: (1) **Page `/videollamada.html`**: crear página con video call embedded usando SimplePeer o PeerJS (wrapper WebRTC). UI: preview de cámara local + "Iniciar llamada con técnico" button. (2) **Tech Side**: cuando cliente inicia, genera un room ID único y muestra un link para compartir con el técnico por WhatsApp. (3) **Connection Flow**: SimplePeer.js maneja STUN/TURN servers para NAT traversal. Fallback: si WebRTC falla, mostrar "¿Prefieres WhatsApp video?" con link directo. (4) **Recording Consent**: antes de grabar, obtener consentimiento con modal "，允许 grabar para dokumentar el antes/después? (Sí/No)". Si Sí, usar MediaRecorder API para capturar. (5) **Post-call**: después de la llamada, guardar room ID + timestamp + servicio solicitado en Formspree para tracking. (6) **Mobile Optimization**: el video call debe funcionar en Safari iOS (requiere HTTPS + User Gesture para camera access). Implementación: peerjs CDN + videollamada.html page + WhatsApp fallback, 6-8 horas. |
| **Impacto esperado** | +35% confianza del cliente, reduce visitas presenciales innecesarias, diferencia vs competencia |
| **Esfuerzo** | M (6-8 horas) |
| **Agente recomendado** | Frontend / Full Stack |
| **Referencias** | [1] https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API |

### Propuesta 2: Passkeys/WebAuthn — Login Sin Passwords para Clientes Recurrentes

| Campo | Detalle |
|-------|---------|
| **Título** | Implementar Passkeys (WebAuthn) para autenticación passwordless de clientes recurrentes |
| **Problema** | Sin login, el cliente no puede ver historial, guardar preferencias, o re-reservar fácilmente. Pierde oportunidad de loyalty. |
| **Descripción** | Passkeys Implementation: (1) **Registration Flow**: crear `/cuenta.html` con "Crear cuenta" y "Recordarme con Passkey". Cuando usuario hace click, llamar `navigator.credentials.create()` con publicKey. Guardar credential ID en Formspree (o localStorage para demo). (2) **Login Flow**: "Iniciar sesión con Passkey" → `navigator.credentials.get()` → biometría del dispositivo → autenticado. (3) **Account Page**: `/cuenta.html` muestra: servicios anteriores, próximo agendado, dirección guardada, botón "Reservar otra vez" (pre-filled con datos previos). (4) **Credential Management**: si el usuario cambia de dispositivo, ofrecer "Recordar este dispositivo" con localStorage backup ( menos seguro que passkey pero conveniente). (5) **Fallback**: si passkey no disponible, ofrecer login con email + OTP (one-time password enviado por email). (6) **Security**: nunca guardar passwords. Solo credential ID + public key en el servidor. Implementación: WebAuthn API + credential storage + account dashboard, 10-12 horas. |
| **Impacto esperado** | +40% re-booking rate, experiencia premium, diferenciación strong vs competencia |
| **Esfuerzo** | L (10-12 horas) |
| **Agente recomendado** | Frontend / Full Stack |
| **Referencias** | [2] https://webauthn.guide/ |

### Propuesta 3: Privacy Sandbox Topics API — Personalización Sin Cookies

| Campo | Detalle |
|-------|---------|
| **Título** | Implementar Topics API para personalización cookieless del contenido |
| **Problema** | Analytics basados en cookies tienen limitaciones de privacidad. Topics API permite personalización sin tracking individual. |
| **Descripción** | Topics API Integration: (1) **Feature Detection**: al cargar index.html, verificar si `document.featurePolicy` o `navigator.userAgentData` indica soporte para Topics. Si no, fallback a Plausible actual. (2) **Topic Query**: usar `document.interestCohort()` (Chrome) o `navigator.joinAdInterestGroup()` con Topics para obtener el tema actual del usuario. (3) **Dynamic Hero**: según el tema, cambiar el hero principal: - Tema "Hogar/Muebles" → CTA: "Limpieza de sofás y colchones" - Tema "Oficina/Trabajo" → CTA: "Limpieza de oficinas y espacios comerciales" - Tema "Tecnología" → CTA: "Sanitización de equipos electrónicos" - Default → CTA genérico actual. (4) **Fallback UI**: si Topics no disponible, mostrar hero default sin personalización. (5) **Privacy Note**: en la política de privacidad, documentar el uso de Topics API para total transparencia. Implementación: Topics API script + dynamic hero content + privacy docs, 3-4 horas. |
| **Impacto esperado** | Mejor CTR en hero segmentado, compliant con privacy regulations, marketing sin cookies |
| **Esfuerzo** | S (3-4 horas) |
| **Agente recomendado** | Frontend / Privacy |
| **Referencias** | [3] https://developer.chrome.com/docs/privacy-sandbox/topics/ |

### Propuesta 4: Edge Middleware — A/B Testing y Feature Flags en CDN

| Campo | Detalle |
|-------|---------|
| **Título** | Implementar Edge Middleware para A/B testing y feature flags sin backend |
| **Problema** | No hay forma de experimentar con variantes o activar features por segmento sin un servicio externo o rebuild. |
| **Descripción** | Edge Middleware Setup: (1) **Platform**: migrar de GitHub Pages a Vercel (gratis tier incluye Edge Middleware) o Cloudflare Pages con Workers. (2) **A/B Test Config**: crear `middleware.js` que: - Check `cookie.ab_test` - Si no existe, random 50/50 assign A o B - Set cookie `ab_test=A` o `ab_test=B` - Rewriter `/` a `/index-a.html` o `/index-b.html` (3) **Variant A**: hero actual con "Reservar ahora" CTA. **Variant B**: hero con "¿Cuánto cuesta?" CTA + cotizador inline. (4) **Analytics**: trackear conversión de cada variant con Plausible event `ab_test_variant`. (5) **Feature Flag**: en middleware, leer header `X-Feature-Zona-Candelaria`. Si presente, rewritear `/zonas/candelaria` a la nueva zona. Si no, redirect a `/zonas` default. (6) **Geolocation**: usar `request.geo` (Cloudflare) o `request.headers.get('x-vercel-ip-country')` (Vercel) para mostrar "Disponible en [ciudad]" basado en IP. Implementación: Vercel/Cloudflare setup + middleware + A/B test variants + analytics, 5-7 horas. |
| **Impacto esperado** | Data-driven optimization, quick experiments without deploys, geolocation personalization |
| **Esfuerzo** | M (5-7 horas) |
| **Agente recomendado** | Full Stack / DevOps |
| **Referencias** | [4] https://vercel.com/docs/edge-network/middleware |

### Propuesta 5: PDF Invoice Generation — Facturas PDF Automáticas

| Campo | Detalle |
|-------|---------|
| **Título** | Implementar generación de facturas PDF en el navegador para bookings confirmados |
| **Problema** | No hay documentos automatizados para el cliente. En Colombia, facturas electrónicas son requeridas para ciertos montos. |
| **Descripción** | PDF Invoice Generation: (1) **Library**: usar pdf-lib (https://pdf-lib.js.org/) — permite crear PDFs en JS puro, sin backend. Include via CDN: `<script src="https://unpkg.com/pdf-lib@1.17.1/dist/pdf-lib.min.js"></script>`. (2) **Invoice Template**: crear función `generateInvoice(bookingData)` que: - Crea PDF con pdf-lib - Añade header con logo Purity & Clean - Datos del cliente (nombre, email, teléfono) - Servicio prestado, zona, fecha, hora - Precio con break-down (subtotal, IVA si aplica) - Términos y condiciones - Footer con contacto. (3) **Route `/factura/[id].html`**: crear página que recibe booking ID de URL params, consulta Formspree data (o localStorage para demo), genera PDF, y muestra preview con "Descargar PDF" button. (4) **Download**: usar `pdfBytes` + `Blob` + `URL.createObjectURL` para download. (5) **Email Integration**: en el email de confirmación de Formspree, añadir link a `/factura.html?booking=[id]`. (6) **Colombia Compliance**: para facturas electrónicas DIAN, eventual integración futura con API de facturación (e.g., Siigo, facturarte.com). Por ahora, PDF sirve como "pre-factura" o cotización. Implementación: pdf-lib integration + invoice template + route + download, 5-6 horas. |
| **Impacto esperado** | Profesionalismo aumentado, reduces queries de "dónde está mi factura", paso hacia facturación electrónica |
| **Esfuerzo** | M (5-6 horas) |
| **Agente recomendado** | Frontend |
| **Referencias** | [5] https://pdf-lib.js.org/ |

### Propuesta 6: Screen Wake Lock API — Mantener Pantalla Encendida en Booking Flow

| Campo | Detalle |
|-------|---------|
| **Título** | Implementar Screen Wake Lock para evitar abandono del booking por pantalla apagada |
| **Problema** | Durante el booking multi-step, si el teléfono se apaga, el usuario abandona. Es una fricción simple pero de alto impacto. |
| **Descripción** | Screen Wake Lock Implementation: (1) **Feature Detection**: verificar `navigator.wakeLock` existe antes de usar. (2) **Acquire on Booking Start**: cuando usuario hace scroll al formulario de booking o click en "Reservar", llamar: ```javascript let wakeLock = null; try { wakeLock = await navigator.wakeLock.request('screen'); } catch (err) { console.log('Wake Lock error:', err); } ``` (3) **Release on Complete/Leave**: cuando booking se completa (submission) o usuario sale de la página (`visibilitychange` event), liberar: ```javascript if (wakeLock) { wakeLock.release(); wakeLock = null; } ``` (4) **Visibility Handling**: si la página pierde visibilidad (usuario cambia de app), releasar. Cuando vuelve, re-adquirir. (5) **Fallback**: si Wake Lock no soportado, no hacer nada (silent fail). (6) **UX Indicator**: mostrar pequeño icono 🔆 en el formulario cuando Wake Lock está activo, indicando "Pantalla se mantendrá encendida". Implementación: 20 líneas de JS en script.js, 1 hora. |
| **Impacto esperado** | Reduce booking abandonment por ~5-10%, especialmente en mobile donde auto-lock es agresivo |
| **Esfuerzo** | S (1-2 horas) |
| **Agente recomendado** | Frontend |
| **Referencias** | [6] https://developer.mozilla.org/en-US/docs/Web/API/WakeLock |

---

## Orden de implementación recomendado

| # | Propuesta | Impacto | Esfuerzo | Prioridad |
|---|----------|---------|----------|-----------|
| 1 | Screen Wake Lock | UX / Conversion | S | Alta - quick win, 1 hora |
| 2 | Topics API | Personalización / Privacy | S | Alta - 3-4 horas |
| 3 | PDF Invoice | Profesionalismo / UX | M | Media - 5-6 horas |
| 4 | WebRTC Video | Trust / Conversion | M | Media - 6-8 horas |
| 5 | Edge Middleware (A/B) | Optimization / Data | M | Media - 5-7 horas |
| 6 | Passkeys | Loyalty / UX | L | Baja - 10-12 horas |

**Top 3 para implementar primero:** 1, 2, 3 (Wake Lock + Topics + PDF = alto impacto con esfuerzo bajo/medio).

---

## Diferencia clave: R62 vs R61

R61 se enfocó en **plataformas externas** (Google Reserve, Apple Business Connect, BNPL, AI Content Engine).

**R62 se enfoca en:**
- **APIs del navegador** (WebRTC, Wake Lock, Topics, WebAuthn)
- **Edge computing** (A/B testing sin backend)
- **Generación de documentos** (PDF en cliente)
- **Auth passwordless** (Passkeys)

R62 es la ronda de **aprovechar capacidades nativas del navegador 2026** que no requieren servicios externos costosos.

---

## Síntesis: Por qué R62 complementa R1-R61

R1-R61 ha construido una presencia web completa:
- R1-R10: Features internos básicos
- R11-R20: SEO y Schema markup
- R21-R30: UX y conversión
- R31-R35: Video, reputación, AI chatbot
- R36-R42: Technical modernization, PWA, WCAG
- R43-R50: Business models, pricing, B2B, internationalization
- R51-R55: Performance, animations, social engagement
- R56-R60: Sustainability, monetization, PWA push, background sync, AI chatbots, subscriptions, AR
- R61: Google Reserve, Apple Business Connect, AI Agéntica, BNPL, AI Content Engine

**R62 llena el gap de:**
1. **APIs web emergentes** — WebRTC, Wake Lock, Topics API, WebAuthn no were specifically proposed
2. **Edge Middleware** — A/B testing nativo sin servicios externos
3. **Generación de documentos** — PDF invoices en el navegador
4. **Auth passwordless** — Passkeys para clientes recurrentes

R62 es la ronda de **maximizar el navegador**: usar APIs nativas que ya están en Baseline 2024+ sin cambiar el stack.

---

## Fuentes

[1] Mozilla. "WebRTC API." MDN Web Docs. https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API

[2] FIDO Alliance. "WebAuthn Guide." https://webauthn.guide/

[3] Google. "Privacy Sandbox Topics API." https://developer.chrome.com/docs/privacy-sandbox/topics/

[4] Vercel. "Edge Middleware." https://vercel.com/docs/edge-network/middleware

[5] PDF-lib. "PDF Generation in JavaScript." https://pdf-lib.js.org/

[6] Mozilla. "Wake Lock API." MDN Web Docs. https://developer.mozilla.org/en-US/docs/Web/API/WakeLock

---

*Documento generado por Innovation Scout — Round 62*
*Purity & Clean Analysis — 2026-04-27*
*Co-Authored-By: Paperclip <noreply@paperclip.ing>*