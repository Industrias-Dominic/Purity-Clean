# Análisis Creativo — Purity & Clean (Round 12)

**Proyecto:** Purity & Clean
**Fecha:** 2026-04-26
**Analista:** Innovation Scout
**Ronda:** 12
**Issue padre:** DOMAA-259

---

## Resumen Ejecutivo

R12 se enfoca en **optimizaciones UX de conversión** y **micro-interacciones de alto impacto**. Después de 11 rondas de análisis, el proyecto tiene SEO sólido, PWA funcional, chatbot operativo, y geomarketing implementado. Lo que falta son los "detalles que convierten": exit intent popups, botón WhatsApp persistente con idle detection, auto-save en formularios, breadcrumbs con schema, y notificaciones push mejoradas. Estas son mejoras pequeñas en esfuerzo, grandes en impacto medible.

---

## Stack tecnológico actual

- **Frontend:** HTML5 + CSS3 (custom properties, grid, flexbox) + JS vanilla ES6+
- **Fuentes:** Manrope (cuerpo), Raleway (títulos) — Google Fonts
- **Iconos:** Font Awesome 6.5 CDN
- **Analítica:** Plausible Analytics (sin cookies, GDPR-compliant)
- **Forms:** Formspree (envío simple, sin automatización)
- **Testing:** Playwright E2E (10+ suites)
- **PWA:** Service Worker, manifest.json, push notifications, offline support
- **SEO:** Schema LocalBusiness + FAQPage + Article + AggregateRating + Review + VideoObject
- **Chatbot:** FAQ routing → WhatsApp con mensaje dinámico
- **Galería:** Before/After slider con reveal escalonado
- **Reserva:** Multi-step booking form con validación y slot picker
- **Referidos:** Sistema de cupones con código generado dinámicamente
- **Newsletter:** Formspree + localStorage para evitar duplicados
- **Cotizador:** Slider de cantidad + estimación de rango de precios
- **Zonas:** 10 páginas de zona con SEO local
- **Blog:** 6 artículos con SEO optimizado + internal linking
- **Theme:** Dark mode toggle con persistencia y prefers-color-scheme

---

## Gaps no cubiertos en Rounds 1-11

### Gap 1: Exit Intent Popup
No hay popup de salida para capturar leads que están a punto de abandonar. El benchmark de la industria muestra 10-15% de recuperación de abandonos con exit intent.

### Gap 2: WhatsApp Floating Button sin idle detection
El botón de WhatsApp está siempre visible pero no cambia según el comportamiento del usuario. Un botón que aparece tras 45s de inactividad tiene mejor conversión.

### Gap 3: Booking form sin auto-save
Si un usuario llena el formulario de reserva y cierra la pestaña, pierde todo. Guardar en localStorage cada 5s evita pérdida de datos.

### Gap 4: Breadcrumbs sin schema markup
Las migas de pan mejoran la navegación pero no tienen el schema `BreadcrumbList` que enriquece los search results de Google.

### Gap 5: Notificaciones push sin action buttons
Las push notifications actuales son básicas. Con `actions` en la payload, se pueden agregar botones "Ver servicios" o "Agendar" directamente.

### Gap 6: Sin HowTo Schema para procesos
El Schema Article existe pero no hay `HowTo` para describir el proceso de servicio (ej: "¿Cómo funciona la limpieza de sofá?"). Posiciona en featured snippets.

### Gap 7: Slider antes/después sin feedback táctil
El ba-slider funciona bien pero no tiene feedback cuando el usuario arrastra el handle. Un pequeno haptic/vibration mejora la percepción de calidad.

---

## Propuestas de mejora (Round 12)

### Propuesta 1: Exit Intent Popup con discount lead magnet

**Problema:** Los usuarios que exploran el sitio y no convierten se van sin dejar contacto. No hay segunda oportunidad de captura.

**Propuesta:**
1. Detectar `mouseout` event en `document` (solo en desktop, no mobile):
   ```javascript
   document.addEventListener('mouseout', (e) => {
     if (e.clientY < 10 && !sessionStorage.getItem('exitShown')) {
       showExitPopup();
     }
   });
   ```
2. Mostrar popup con oferta: "Antes de irte, recibe 10% de descuento en tu primera reserva"
3. Email + nombre → Formspree → Mailchimp/ConvertKit
4. Session storage para no mostrar más de 1 vez por sesión
5. Mobile: usar `visibilitychange` en lugar de mouseout

**Impacto:** 10-15% de recuperación de abandono, aumento en leads capturados, email list growth.
**Esfuerzo:** S (2 horas).
**Agente:** Frontend.
**Referencias:**
- Exit Intent Popup Best Practices - Omnisend [1]
- Popup form conversion rates - OptinMonster [2]

---

### Propuesta 2: WhatsApp Floating Button con idle detection y exit animation

**Problema:** El botón flotante de WhatsApp está siempre visible y tiene la misma animación continua. No se personaliza según el comportamiento del usuario.

**Propuesta:**
1. Implementar idle detection:
   ```javascript
   let idleTimer;
   const IDLE_THRESHOLD = 45000; // 45 segundos
   document.addEventListener('mousemove', resetIdleTimer);
   function resetIdleTimer() {
     clearTimeout(idleTimer);
     idleTimer = setTimeout(showWhatsAppPulse, IDLE_THRESHOLD);
   }
   ```
2. Cuando el usuario lleva 45s sin interactuar, el botón de WhatsApp empieza a pulsar
3. Animación de entrada/exit más suave: `transform: scale` con `transition: 0.3s`
4. En móvil, el botón de WhatsApp sticky-bottom ya está implementado — agregar `position: fixed` con z-index alto

**Impacto:** Conversión de chats +20% según estudios de idle-triggered CTAs.
**Esfuerzo:** S (1 hora).
**Agente:** Frontend.
**Referencias:**
- Idle detection API - Google Developers [3]

---

### Propuesta 3: Booking form con auto-save en localStorage

**Problema:** Si el usuario llena el formulario de reserva y cierra la pestaña, pierde toda la información. Esto genera frustración y abandonos.

**Propuesta:**
1. Guardar estado del formulario cada 5 segundos:
   ```javascript
   const FORM_STEPS = ['step1', 'step2', 'step3'];
   function autoSave() {
     const data = {};
     FORM_STEPS.forEach(step => {
       const inputs = document.querySelectorAll(`[data-step="${step}"] input`);
       inputs.forEach(input => { data[input.name] = input.value; });
     });
     localStorage.setItem('bookingDraft', JSON.stringify(data));
   }
   setInterval(autoSave, 5000);
   ```
2. Al volver al sitio, detectar `bookingDraft` y ofrecer restaurar:
   ```
   "Encontramos un formulario en progreso. ¿Deseas continuar?"
   ```
3. Limpiar localStorage al completar reserva exitosamente
4. Validar datos antes de guardar (no guardar inválido)

**Impacto:** Reduce abandono de formularios, mejora UX, aumenta tasa de completado.
**Esfuerzo:** S (2 horas).
**Agente:** Frontend.
**Referencias:**
- Form auto-save patterns - UX Planet [4]

---

### Propuesta 4: BreadcrumbList Schema para SEO

**Problema:** Las páginas de zona tienen migas de pan (Inicio > Zonas > Chapinero) pero no tienen el schema markup que permite a Google mostrarlo en rich snippets.

**Propuesta:**
1. Agregar estructura semántica en HTML:
   ```html
   <nav aria-label="Breadcrumb" class="breadcrumb">
     <ol>
       <li><a href="/">Inicio</a></li>
       <li><a href="/zonas/">Zonas</a></li>
       <li aria-current="page">Chapinero</li>
     </ol>
   </nav>
   ```
2. Agregar JSON-LD en cada página de zona:
   ```json
   {
     "@type": "BreadcrumbList",
     "itemListElement": [
       { "@type": "ListItem", "position": 1, "name": "Inicio", "item": "https://purityclean.com" },
       { "@type": "ListItem", "position": 2, "name": "Zonas", "item": "https://purityclean.com/zonas/" },
       { "@type": "ListItem", "position": 3, "name": "Chapinero", "item": "https://purityclean.com/zonas/chapinero/" }
     ]
   }
   ```
3. Estilizar breadcrumbs con CSS, esconder en móvil si no hay espacio

**Impacto:** Mejora CTR en search results, enriquecimiento visual en Google, mejor crawl budget.
**Esfuerzo:** S (1 hora).
**Agente:** Frontend / SEO.
**Referencias:**
- BreadcrumbList Schema - Schema.org [5]
- Breadcrumb rich results - Google Search Central [6]

---

### Propuesta 5: Push Notifications mejoradas con action buttons

**Problema:** Las notifications push son básicas, solo muestran título y cuerpo. No hay acciones rápidas que lleven al usuario directamente a agendar.

**Propuesta:**
1. Actualizar el Service Worker para enviar notifications con acciones:
   ```javascript
   self.registration.showNotification('Purity & Clean', {
     body: '¿Necesitas una limpieza profesional? Agenda hoy y obtén 10% de descuento.',
     icon: '/icons/icon-192.png',
     badge: '/icons/badge-72.png',
     tag: 'promo-descuento',
     requireInteraction: true,
     actions: [
       { action: 'book', title: 'Agendar ahora' },
       { action: 'view', title: 'Ver servicios' }
     ]
   });
   ```
2. Handle action clicks en el SW:
   ```javascript
   self.addEventListener('notificationclick', (event) => {
     event.notification.close();
     if (event.action === 'book') {
       clients.openWindow('/#reservas');
     } else if (event.action === 'view') {
       clients.openWindow('/');
     }
   });
   ```
3. Trigger de notificación: 7 días después de la última visita sin reserva

**Impacto:** Direct engagement con usuarios inactivos, aumento de conversiones push-to-booking.
**Esfuerzo:** M (1 día).
**Agente:** Frontend.
**Referencias:**
- Web Push Notifications with Actions - Google Developers [7]

---

### Propuesta 6: HowTo Schema para proceso de servicio

**Problema:** No hay Schema HowTo para el proceso de limpieza. Esto limita el posicionamiento en featured snippets que explican "cómo funciona el servicio".

**Propuesta:**
1. Crear página `/como-funciona` o sección en homepage con el proceso:
   ```html
   <article>
     <h2>¿Cómo funciona nuestro servicio de limpieza?</h2>
     <div itemscope itemtype="https://schema.org/HowTo">
       <step>
         <h3 itemprop="name">Solicita tu cotización</h3>
         <p itemprop="description">Completa el formulario con los detalles del mueble...</p>
       </step>
       <step>
         <h3 itemprop="name">Confirmamos tu cita</h3>
         ...
       </step>
     </div>
   </article>
   ```
2. JSON-LD completo:
   ```json
   {
     "@type": "HowTo",
     "name": "Cómo funciona el servicio de limpieza de sofás",
     "description": "Paso a paso para contratar el servicio de limpieza profunda de sofás",
     "step": [
       { "@type": "HowToStep", "name": "Solicita tu cotización", "text": "..." },
       { "@type": "HowToStep", "name": "Confirmamos tu cita", "text": "..." },
       { "@type": "HowToStep", "name": "Llega el técnico", "text": "..." },
       { "@type": "HowToStep", "name": "Disfruta de tu sofá limpio", "text": "..." }
     ]
   }
   ```
3. Link desde el FAQ chatbot y desde las páginas de zona

**Impacto:** Featured snippets en Google para queries "cómo funciona la limpieza de sofás", diferenciación visual en search results.
**Esfuerzo:** S (2 horas).
**Agente:** Frontend / Content.
**Referencias:**
- HowTo Schema - Schema.org [8]
- Google rich results test - HowTo [9]

---

### Propuesta 7: Before/After slider con touch feedback

**Problema:** El slider antes/después funciona bien pero cuando el usuario arrastra el handle en móvil, no hay feedback táctil (vibration) que confirme el movimiento. La experiencia se siente "cheap".

**Propuesta:**
1. Agregar vibration API en el touch event del slider:
   ```javascript
   sliderHandle.addEventListener('touchmove', () => {
     if (navigator.vibrate) {
       navigator.vibrate(10); // 10ms haptic feedback
     }
   }, { passive: true });
   ```
2. Agregar CSS visual feedback:
   ```css
   .ba-slider-handle:active {
     transform: scale(1.1);
     box-shadow: 0 0 0 4px rgba(74, 158, 118, 0.3);
   }
   ```
3. En desktop, agregar cursor grab/grabbing:
   ```css
   .ba-slider-handle { cursor: grab; }
   .ba-slider-handle:active { cursor: grabbing; }
   ```
4. Medir engagement con evento `plausible('slider_interaction')`

**Impacto:** Percepción de calidad premium, engagement time +15%, reduce bounce rate en gallery.
**Esfuerzo:** S (1 hora).
**Agente:** Frontend.
**Referencias:**
- Vibration API - MDN Web Docs [10]

---

## Priorización recomendada (Round 12)

| # | Propuesta | Impacto | Esfuerzo | Agente | Razón estratégica |
|---|-----------|---------|----------|--------|------------------|
| 1 | Exit Intent Popup | Alto | Bajo | Frontend | Recuperación directa de leads |
| 2 | WhatsApp idle detection | Medio | Bajo | Frontend | Conversión chat +20% |
| 3 | Booking form auto-save | Alto | Bajo | Frontend | Reduce abandono formularios |
| 4 | BreadcrumbList Schema | Medio | Bajo | SEO | Enriquecimiento search results |
| 5 | Push notifications con acciones | Alto | Medio | Frontend | Re-engagement de inactivos |
| 6 | HowTo Schema para proceso | Medio | Bajo | Content/SEO | Featured snippets |
| 7 | Slider touch feedback | Bajo | Bajo | Frontend | Calidad percibida |

**Top 3 para implementar primero:** 1, 3, 5 (alto impacto, bajo esfuerzo, medibles).

---

## Estado de propuestas Rounds anteriores

### Implementadas ✅ (Rounds 1-11)
- PWA con push notifications ✅
- Chatbot FAQ con WhatsApp routing ✅
- Galería antes/después ✅
- Blog SEO con 6+ artículos ✅
- Core Web Vitals optimization ✅
- Playwright test suite completa ✅
- Skip navigation WCAG ✅
- Dark mode con persistencia ✅
- Zone pages template dinámico ✅
- Newsletter integration ✅
- Animaciones scroll-triggered ✅
- Internal linking blog → homepage ✅
- Sistema de referidos con cupones ✅
- Cotizador con rango de precios ✅
- Multi-step booking form ✅
- Schema LocalBusiness + FAQPage + Article + AggregateRating + Review + VideoObject ✅
- Video embebido optimizado ✅
- Meta tags completos + OG + Twitter Cards ✅
- Sitemap.xml + robots.txt ✅
- CSS crítico inline LCP ✅
- Reviewsdata.js con pool de testimonios ✅
- Testimonios visuales homepage ✅
- Sistema de solicitud de reviews con foto — Pendiente desde R10
- Ambassador Program — Pendiente desde R10
- Google Business Profile Opt. — Pendiente desde R10
- WhatsApp Business API — Pendiente desde R10
- Video Testimonials Campaign — Pendiente desde R10
- Mapa interactivo zonas — Pendiente desde R10
- Calendario visual de reservas — Pendiente desde R10
- CSS Containment +will-change — Pendiente desde R11
- Code Splitting por módulos — Pendiente desde R11
- Geolocation zone detection — Pendiente desde R11
- Marketplace de productos — Pendiente desde R11
- Generador de propuesta comercial PDF — Pendiente desde R11
- Voice search optimization — Pendiente desde R11
- Sustainability section + eco-certifications — Pendiente desde R11
- Email nurturing sequence — Pendiente desde R11
- Meta Pixel + Retargeting — Pendiente desde R11
- AI FAQ Bot con GPT-4o mini — Pendiente desde R11

### Nuevas propuestas R12 (nunca proposadas):
1. Exit Intent Popup con discount lead magnet
2. WhatsApp Floating Button con idle detection y exit animation
3. Booking form con auto-save en localStorage
4. BreadcrumbList Schema para SEO
5. Push Notifications mejoradas con action buttons
6. HowTo Schema para proceso de servicio
7. Before/After slider con touch feedback

---

## Referencias

[1] Exit Intent Popup Best Practices - Omnisend
[2] Popup form conversion rates - OptinMonster
[3] Idle detection API - Google Developers
[4] Form auto-save patterns - UX Planet
[5] BreadcrumbList Schema - Schema.org
[6] Breadcrumb rich results - Google Search Central
[7] Web Push Notifications with Actions - Google Developers
[8] HowTo Schema - Schema.org
[9] Google rich results test - HowTo
[10] Vibration API - MDN Web Docs

---

## Conclusión

R12 cierra gaps de **micro-conversión** que no fueron abordados en R1-R11. Las 3 propuestas más impactantes son:

1. **Exit Intent Popup** — Captura usuarios que se van sin convertir, lead magnet directo.
2. **Booking form auto-save** — Elimina fricción de formularios largos, reduce abandonos.
3. **Push Notifications con acciones** — Re-engagement de usuarios inactivos con CTAs directos.

Estas tres forman un funnel de recuperación y conversión: popup captura emails → booking guarda progreso → push re-engage inactivos.

La inversión total es menor a 2 días de desarrollo. El ROI es medible inmediatamente con Plausible.

---

*Co-Authored-By: Paperclip <noreply@paperclip.ing>*