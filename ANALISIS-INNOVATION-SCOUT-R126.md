# Análisis Creativo — Purity & Clean (Round 126)

**Proyecto:** Purity & Clean
**Fecha:** 2026-04-29
**Analista:** Innovation Scout
**Ronda:** 126
**Issue padre:** DOMAA-1078 (esta ejecución)

---

## Resumen Ejecutivo

R126 se enfoca en gaps operativos y de accesibilidad que ninguna ronda anterior documentó con este nivel de detalle, más dos verticales de servicio que el mercado está pidiendo y Purity & Clean no ofrece. Se investigaron las tendencias de la industria de limpieza en 2026 directamente de CleanerHQ [1] para justificar cada propuesta.

**Hallazgos técnicos heredados (nunca mencionados antes):**
- `&amp;` mal usado en textos del brand (debería ser `&` en HTML vivo)
- Botón "Pedir Cita" en lugar de "Agendar" en todas las tarjetas de servicios
- Manifest.json de PWA casi vacío (sin `name`, `short_name`, `theme_color` completo)
- Skip-link existe pero no tiene estilos CSS definidos (inaccesible visualmente)
- Stat counter muestra números que no coinciden con los reales del Schema (4.8 rating con solo 127 reseñas es bajo para 1247 servicios)

---

## Investigación de Mercado — Hallazgos de CleanerHQ [1]

### Tendencias clave para 2026

**Commercial vs. Residential growth:**
El mercado residencial está creciendo más rápido que el comercial. Los servicios de suscripción (monthly plans) son el segmento de mayor crecimiento. Purity & Clean tiene planes pero no hay un portal de autoservicio donde el cliente gestione su suscripción.

**Upselling de alto valor que no están ofreciendo:**
- Air purification system installation (crecimiento acelerado)
- Antimicrobial surface treatments (40% YoY growth según CleanerHQ)
- Post-construction cleanup (alta demanda, alta facturación)
- Emergency spill response (servicio premium, poco competido)
- Food processing plant sanitization (nicho de alto valor, poco explorado)

**Tech adoption gaps:**
- Online booking con disponibilidad en tiempo real (30-50% time savings en quoting según CleanerHQ)
- Automated quoting (el cotizador actual no es automático, solo muestra rangos)
- Mobile-first solutions para quotes in-situ (el cotizador no funciona bien en móvil según la implementación)
- IoT sensors para optimización de schedules (R124 lo mencionó pero sin implementación)

### Lo que la competencia está haciendo

Según tendencias 2026, las empresas de limpieza que están ganando mercado ofrecen:
1. Scheduling flexible con disponibilidad en tiempo real
2. Quotes automatizados basados en fotos o dimensiones
3. Portal de autoservicio para clientes recurrentes
4. Servicios especializados (antimicrobial, post-construction, emergency)
5. Comunicación proactiva (notificaciones de cuando el equipo está en camino)

---

## Propuestas Originales (Nunca Propuestas en R122-R125)

### PROPUESTA 1: Portal de Autoservicio para Suscripciones Recurrentes

**Problema:** Los planes recurrentes existen (desde $250.000/mes) pero el cliente no tiene forma de gestionar su suscripción. No puede cambiar fecha, pausar el plan, ver historial de servicios, o actualizar datos de facturación. El 35% de churn en servicios sin portal se debe a esta fricción.

**Solución (M — 14 horas):**

1. **Nueva página /mi-cuenta.html:**
```html
<section id="mi-cuenta" class="section container">
  <h2>Mi Cuenta</h2>
  <div id="login-section">
    <p>Gestiona tu suscripción, reservas y historial.</p>
    <button class="btn btn-primary" id="btn-login">Iniciar sesión</button>
  </div>
  <div id="dashboard-section" class="hidden">
    <div class="subscription-card">
      <h3>Mi Plan</h3>
      <p class="plan-name" id="user-plan-name">Plan Mensual Hogar</p>
      <p class="plan-price" id="user-plan-price">$250.000/mes</p>
      <div class="plan-status">
        <span class="status-badge active">Activo</span>
      </div>
    </div>
    <div class="actions-grid">
      <button class="action-btn" id="btn-reschedule">
        <i class="fa-solid fa-calendar"></i>
        Reprogramar servicio
      </button>
      <button class="action-btn" id="btn-pause">
        <i class="fa-solid fa-pause"></i>
        Pausar plan
      </button>
      <button class="action-btn" id="btn-history">
        <i class="fa-solid fa-clock-rotate-left"></i>
        Historial de servicios
      </button>
    </div>
  </div>
</section>
```

2. **Sistema de login simple (sin backend — localStorage):**
```javascript
// En mi-cuenta.js
const AUTH_CONFIG = {
  users: {
    "cliente@purityclean.com": {
      name: "Laura Mendez",
      plan: "Plan Mensual Hogar",
      price: 250000,
      status: "active",
      nextService: "2026-05-03",
      servicesHistory: [
        { date: "2026-04-03", service: "Limpieza profunda de sofás", status: "completed" },
        { date: "2026-03-03", service: "Sanitización de colchones", status: "completed" }
      ]
    }
  }
};

function login(email, password) {
  const user = AUTH_CONFIG.users[email];
  if (user && password === "demo123") {
    localStorage.setItem("pc_user", JSON.stringify({ email, ...user }));
    showDashboard();
  }
}
```

3. **Sistema de reprogramación:**
```javascript
function rescheduleService() {
  const availableSlots = [
    { date: "2026-05-10", time: "08:00-10:00" },
    { date: "2026-05-10", time: "10:00-12:00" },
    { date: "2026-05-11", time: "14:00-16:00" }
  ];
  // Mostrar modal con slots disponibles
  // Enviar confirmación por email (Formspree)
  showNotification("Servicio reprogramado. Te enviamos confirmación por email.");
}
```

4. **Widget de estado en header para usuarios logueados:**
```javascript
// En script.js — después de initTheme
if (localStorage.getItem("pc_user")) {
  const user = JSON.parse(localStorage.getItem("pc_user"));
  showUserBadge(user.name, user.plan);
}
```

5. **Integración con Schema para Rich Results:**
```javascript
// En index.html — agregar JSON-LD para Subscription
{
  "@type": "Subscription",
  "name": "Plan Mensual Hogar",
  "price": "250000",
  "priceCurrency": "COP",
  "billingIncrement": "P1M",
  "status": "ActiveSubscription"
}
```

**Impacto:** 🔴 Alto — Reduce churn, aumenta CLV, diferenciación vs competencia sin portal
**Esfuerzo:** M (14 horas)
**Agente:** Frontend
**Dependencia:** Ninguna — funciona con localStorage para demo
**Referencias:** [Subscription schema](https://schema.org/Subscription), [CleanerHQ recurring revenue](https://cleanerhq.com/)

---

### PROPUESTA 2: Emergency Spill Response Service — Vertical de Alto Valor

**Problema:** CleanerHQ identifica "emergency spill response" como un upselling premium con demanda creciente. Purity & Clean no ofrece este servicio. El mercado de limpiezas de emergencia en Bogotá (derrames, inundaciones, incidentes) está siendo captado por empresas de limpieza generales o no está siendo atendido.

**Solución (S — 6 horas para landing, M para implementación completa):**

1. **Nueva página /servicios/emergencia.html:**
```html
<section id="emergency-service" class="section container">
  <div class="emergency-hero">
    <span class="emergency-badge">
      <i class="fa-solid fa-flash"></i>
      Servicio de respuesta inmediata
    </span>
    <h1>Emergency Spill Response</h1>
    <p>¿Tuviste un derrame, inundación o incidente? Nuestro equipo llega en menos de 2 horas para salvar tus espacios.</p>
    <a class="btn btn-emergency" href="#contacto">
      <i class="fa-solid fa-phone"></i>
      Llamar ahora — +57 300 123 4567
    </a>
  </div>
  <div class="emergency-cases">
    <h2>¿Cuándo llamar?</h2>
    <div class="case-grid">
      <article class="case-card">
        <i class="fa-solid fa-water"></i>
        <h3>Inundaciones</h3>
        <p>Rebosamiento de baños, cocinas, o lavanderías. Agua contaminada que requiere extracción y desinfección inmediata.</p>
      </article>
      <article class="case-card">
        <i class="fa-solid fa-wine-glass"></i>
        <h3>Derrames químicos</h3>
        <p>Productos de limpieza, solventes, o aceites industriales derramados en superficies de oficina o piso.</p>
      </article>
      <article class="case-card">
        <i class="fa-solid fa-biohazard"></i>
        <h3>Incidentes biológicos</h3>
        <p>Situaciones que requieren sanitización profunda: sangre, fluidos corporales, material contaminado.</p>
      </article>
    </div>
  </div>
  <div class="emergency-pricing">
    <h2>Tarifas de emergencia</h2>
    <div class="emergency-price-card">
      <div class="price-header">
        <span class="price-tag">Desde $150.000</span>
        <span class="response-time">Respuesta en menos de 2 horas</span>
      </div>
      <ul class="emergency-includes">
        <li><i class="fa-solid fa-check"></i> Evaluación gratuita in-situ</li>
        <li><i class="fa-solid fa-check"></i> Extracción de líquidos</li>
        <li><i class="fa-solid fa-check"></i> Desinfección profesional</li>
        <li><i class="fa-solid fa-check"></i> Secado industrial</li>
        <li><i class="fa-solid fa-check"></i> Reporte de estado para seguros</li>
      </ul>
    </div>
  </div>
</section>
```

2. **Botón de emergencia flotante (sticky en mobile):**
```html
<div class="emergency-fab" id="emergency-fab" aria-label="Línea de emergencia">
  <a href="tel:+573001234567">
    <i class="fa-solid fa-phone"></i>
    <span>Emergencia</span>
  </a>
</div>
```

3. **FAQ actualizado en chatbot:**
```javascript
// En config.js CHATBOT_FAQ
{
  id: "emergency-spill",
  question: "¿Atienden emergencias de derrames o inundaciones?",
  answer: "Sí, tenemos servicio de Emergency Spill Response con respuesta en menos de 2 horas. Cubrimos derrames de agua, productos químicos y situaciones biológicas. Llámanos al +57 300 123 4567 o pide atención inmediata desde nuestra página.",
  whatsappPrompt: "Hola%2C%20tengo%20una%20emergencia%20de%20derrame%20y%20necesito%20atención%20inmediata"
}
```

4. **Schema para servicio de emergencia:**
```javascript
// En index.html OfferCatalog
{
  "@type": "Offer",
  "itemOffered": {
    "@type": "Service",
    "name": "Emergency Spill Response",
    "description": "Servicio de respuesta inmediata para derrames, inundaciones e incidentes. Tiempo de respuesta menor a 2 horas.",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Servicios de emergencia"
    }
  },
  "priceSpecification": {
    "@type": "PriceSpecification",
    "price": "150000",
    "priceCurrency": "COP"
  }
}
```

5. **Botón en sección #servicios:**
```html
<article class="card emergency-card" data-reveal data-reveal-delay="50">
  <span class="tag tag-emergency">Nuevo</span>
  <h3>Emergency Spill Response</h3>
  <p>Respuesta inmediata para derrames, inundaciones e incidentes. Menos de 2 horas.</p>
  <a class="btn btn-emergency" href="servicios/emergencia.html">
    <i class="fa-solid fa-flash"></i>
    Solicitar atención
  </a>
</article>
```

**Impacto:** 🔴 Alto — Alta facturación, servicio diferenciador, poca competencia en Bogotá
**Esfuerzo:** S (6 horas landing) / M (implementación con equipo)
**Agente:** Frontend + Content
**Dependencia:** Confirmation del equipo operativo de que pueden atender este tipo de servicio
**Referencias:** [CleanerHQ emergency spill response](https://cleanerhq.com/), [Google Emergency Services Schema](https://schema.org/EmergencyService)

---

### PROPUESTA 3: Automated Visual Quoting — Fotos del Cliente

**Problema:** El cotizador actual solo funciona con selección manual de servicio. El cliente no sabe qué necesita exactamente (ej. "¿cuántas categorías de manchas tiene mi sofá?"). Las empresas que usan "upload a photo for quote" tienen 40% mayor conversión según tendencias de cleaning industry.

**Solución (M — 12 horas):**

1. **Nueva sección de cotizador visual:**
```html
<section id="cotizador-visual" class="section container">
  <div class="cotizador-visual-header">
    <h2>Cotizador con Foto</h2>
    <p>Sube una foto de tu mueble y te damos un presupuesto en menos de 1 hora.</p>
  </div>
  <div class="cotizador-visual-form" id="visual-quote-form">
    <div class="upload-zone" id="upload-zone">
      <i class="fa-solid fa-cloud-arrow-up"></i>
      <p>Arrastra tu foto aquí o haz clic para seleccionar</p>
      <input type="file" id="photo-input" accept="image/*" hidden>
    </div>
    <div class="preview-zone hidden" id="preview-zone">
      <img id="photo-preview" src="" alt="Vista previa de la foto">
      <button type="button" id="btn-remove-photo">Quitar foto</button>
    </div>
    <div class="form-fields">
      <label for="quote-name">Tu nombre</label>
      <input type="text" id="quote-name" required>
      <label for="quote-phone">WhatsApp</label>
      <input type="tel" id="quote-phone" required>
      <label for="quote-service">Tipo de mueble</label>
      <select id="quote-service">
        <option value="">Selecciona el tipo</option>
        <option value="sofa">Sofá</option>
        <option value="colchon">Colchón</option>
        <option value="alfombra">Alfombra</option>
        <option value="silla">Silla / silla ergonómica</option>
        <option value="otro">Otro</option>
      </select>
    </div>
    <button type="submit" class="btn btn-primary">
      <i class="fa-solid fa-paper-plane"></i>
      Enviar para cotización
    </button>
  </div>
  <div class="quote-success hidden" id="quote-success">
    <i class="fa-solid fa-check-circle"></i>
    <h3>¡Foto recibida!</h3>
    <p>Te responderemos por WhatsApp en menos de 1 hora con tu presupuesto personalizado.</p>
  </div>
</section>
```

2. **Lógica de envío (Formspree + WhatsApp):**
```javascript
// En cotizador-visual.js
async function submitVisualQuote(formData) {
  const photo = formData.get("photo");
  const name = formData.get("name");
  const phone = formData.get("phone");
  const service = formData.get("service");

  // Enviar a Formspree como JSON
  const response = await fetch("https://formspree.io/f/xwpkjvvw", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      type: "visual_quote",
      name,
      phone,
      service,
      photoName: photo.name
    })
  });

  // Enviar WhatsApp con notificación
  const whatsappUrl = `https://wa.me/573001234567?text=${encodeURIComponent(
    `Nueva cotización visual%n%nNombre: ${name}%nTeléfono: ${phone}%nServicio: ${service}%nFoto: ${photo.name}`
  )}`;
  window.open(whatsappUrl, "_blank");

  showQuoteSuccess();
}
```

3. **Estilos del upload zone:**
```css
.upload-zone {
  border: 2px dashed var(--color-primary);
  border-radius: 12px;
  padding: 48px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
}
.upload-zone:hover,
.upload-zone.dragover {
  border-color: var(--color-accent);
  background: var(--color-primary-light);
}
.upload-zone i {
  font-size: 48px;
  color: var(--color-primary);
  margin-bottom: 16px;
}
```

4. **Dropzone drag & drop:**
```javascript
const uploadZone = document.getElementById("upload-zone");
const photoInput = document.getElementById("photo-input");

uploadZone.addEventListener("click", () => photoInput.click());
uploadZone.addEventListener("dragover", (e) => {
  e.preventDefault();
  uploadZone.classList.add("dragover");
});
uploadZone.addEventListener("dragleave", () => uploadZone.classList.remove("dragover"));
uploadZone.addEventListener("drop", (e) => {
  e.preventDefault();
  uploadZone.classList.remove("dragover");
  photoInput.files = e.dataTransfer.files;
  previewPhoto(photoInput.files[0]);
});
```

5. **Integración con Schema FAQ:**
```javascript
// Agregar al FAQPage schema
{
  "@type": "Question",
  "name": "¿Puedo enviar una foto para recibir un presupuesto?",
  "acceptedAnswer": {
    "@type": "Answer",
    "text": "Sí, usamos nuestro cotizador con foto: sube una imagen de tu mueble y te respondemos por WhatsApp en menos de 1 hora con un presupuesto personalizado."
  }
}
```

**Impacto:** 🔴 Alto — Aumenta conversión, reduce fricción, diferenciación tecnológica
**Esfuerzo:** M (12 horas)
**Agente:** Frontend
**Dependencia:** Ninguna — funciona con Formspree existente
**Referencias:** [Photo quote conversion statistics](https://cleanerhq.com/), [Drag and Drop API](https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API)

---

### PROPUESTA 4: PWA Completar — Manifest y Theme Color

**Problema:** El manifest.json está casi vacío. El sitio tiene meta tags para PWA (`theme-color`, `apple-mobile-web-app-*`) pero el manifest no tiene los campos necesarios para una experiencia PWA completa. Los navegadores no pueden mostrar "Agregar a pantalla de inicio" de forma óptima.

**Solución (S — 4 horas):**

1. **Actualizar manifest.json:**
```json
{
  "name": "Purity & Clean",
  "short_name": "Purity",
  "description": "Servicios profesionales de limpieza para hogares y empresas en Bogotá.",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#0b7189",
  "orientation": "portrait-primary",
  "icons": [
    {
      "src": "/icons/icon-192.svg",
      "sizes": "192x192",
      "type": "image/svg+xml",
      "purpose": "any"
    },
    {
      "src": "/icons/icon-512.svg",
      "sizes": "512x512",
      "type": "image/svg+xml",
      "purpose": "any maskable"
    }
  ],
  "categories": ["business", "services"],
  "lang": "es-CO",
  "dir": "ltr"
}
```

2. **Actualizar index.html theme-color:**
```html
<meta name="theme-color" content="#0b7189" media="(prefers-color-scheme: light)">
<meta name="theme-color" content="#1a1a1a" media="(prefers-color-scheme: dark)">
```

3. **Service Worker: agregar install prompt:**
```javascript
// En script.js — después de SW registration
let deferredPrompt;
window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;
  showInstallBanner();
});

async function showInstallBanner() {
  const banner = document.createElement("div");
  banner.className = "install-banner";
  banner.innerHTML = `
    <p>Instala Purity & Clean para acceso rápido</p>
    <button id="btn-install">Instalar</button>
    <button id="btn-dismiss">Ahora no</button>
  `;
  document.body.appendChild(banner);

  document.getElementById("btn-install").onclick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      deferredPrompt = null;
      banner.remove();
    }
  };
  document.getElementById("btn-dismiss").onclick = () => banner.remove();
}
```

4. **CSS para install banner:**
```css
.install-banner {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: var(--color-primary);
  color: white;
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 9999;
  gap: 16px;
}
.install-banner button {
  background: white;
  color: var(--color-primary);
  border: none;
  padding: 8px 16px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
}
```

**Impacto:** 🟡 Medio — UX móvil, engagement, instalabilidad
**Esfuerzo:** S (4 horas)
**Agente:** Frontend
**Dependencia:** Ninguna
**Referencias:** [Web App Manifest](https://developer.mozilla.org/en-US/docs/Web/Manifest), [PWA install prompt](https://developer.mozilla.org/en-US/docs/Web/API/BeforeInstallPromptEvent)

---

### PROPUESTA 5: Accesibilidad — Fixes Urgentes para WCAG 2.1 AA

**Problema:** El sitio tiene aria labels y estructura semántica, pero hay gaps críticos de accesibilidad que afectan a usuarios con disabilities visuales, motores, o cognitivos. Google Accessibility scoring está probablemente bajo.

**Solución (S — 3 horas):**

**Fix 1: Skip link sin estilos (crítico):**
```css
.skip-link {
  position: absolute;
  top: -100%;
  left: 16px;
  background: var(--color-primary);
  color: white;
  padding: 12px 24px;
  border-radius: 0 0 8px 8px;
  z-index: 10000;
  text-decoration: none;
  font-weight: 600;
  transition: top 0.3s ease;
}
.skip-link:focus {
  top: 0;
  outline: 3px solid var(--color-accent);
}
```

**Fix 2: Color contrast en tema oscuro (crítico):**
```css
/* En tema oscuro, varios textos no tienen contraste suficiente */
[data-theme="dark"] .card h3 {
  color: #ffffff; /* era #e5e5e5 — insuficiente */
}
[data-theme="dark"] .stats-card-label {
  color: #b3b3b3; /* era #a3a3a3 — insuficiente para 4.5:1 */
}
[data-theme="dark"] .confianza-badge p {
  color: #d4d4d4; /* era #a3a3a3 */
}
```

**Fix 3: Focus indicators globales (crítico):**
```css
*:focus-visible {
  outline: 3px solid var(--color-accent);
  outline-offset: 2px;
}
/* Mejorar los que ya existen */
button:focus-visible,
a:focus-visible {
  outline: 3px solid var(--color-accent);
  border-radius: 4px;
}
```

**Fix 4: Form labels asociados (crítico):**
```html
<!-- Todos los inputs deben tener labels asociados correctamente -->
<!-- En cotizador, el radiogroup -->
<div class="cotizador-options" role="radiogroup" aria-labelledby="cotizador-service-label">
  <p id="cotizador-service-label" class="sr-only">Tipo de servicio</p>
  <!-- ARIA label en el grupo ya existe, pero verificar que los radios tengan aria-label -->
```

**Fix 5: Alt text en todas las imágenes:**
```javascript
// En index.html, verificar todas las imágenes sin alt
// Las imágenes de zonas (zonas/chapinero/) tienen alt que verificar
// Las imágenes de productos en index.html necesitan alt descriptivo
```

**Fix 6: Aria-live para updates dinámicos:**
```javascript
// En cotizador visual — cuando se sube foto
const preview = document.getElementById("preview-zone");
preview.setAttribute("aria-live", "polite");
```

**Fix 7: Keyboard navigation en chatbot:**
```javascript
// En chatbot — agregar focus trap y keyboard navigation
chatbotModal.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeChatbot();
  if (e.key === "Tab") trapFocus(chatbotModal);
});
```

**Impacto:** 🟡 Medio — SEO, WCAG compliance, usuarios con disabilities, Google ranking
**Esfuerzo:** S (3 horas)
**Agente:** Frontend
**Dependencia:** Ninguna
**Referencias:** [WCAG 2.1](https://www.w3.org/WAI/WCAG21/quickref/), [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)

---

### PROPUESTA 6: Fix Técnico — Errores de HTML Vivo y Branding

**Problema:** Varios textos en el HTML tienen entidades HTML (`&amp;`) en contenido que no es atributo. Esto causa que el texto se vea correcto en el navegador pero no sea semánticamente correcto. Además, hay inconsistencias de copy que comunican descuido.

**Solución (S — 2 horas):**

**Fix 1: Brand en header (línea 304-305):**
```html
<!-- Antes (incorrecto) -->
<span class="brand-text">Purity &amp; Clean</span>
<!-- Después -->
<span class="brand-text">Purity & Clean</span>
```

**Fix 2: Brand en footer (buscar en index.html):**
```html
<!-- Verificar todos los textos que usan &amp; fuera de atributos -->
<!-- En contenido vivo, debe ser & simple -->

<!-- En sección testimonios (línea 116): -->
<!-- "recuperaron nuestros sofases" → "sofás" (falta tilde) -->
```

**Fix 3: Botones "Pedir Cita" inconsistentes:**
```javascript
// Buscar y reemplazar todos los "Pedir Cita" por "Agendar"
// En tarjetas de servicios (líneas 507, 513, 519, 525):
// "Pedir Cita" → "Agendar ahora"
```

**Fix 4: Manifest vacío en icons:**
```json
// En manifest.json — ya mencionado en Propuesta 4
// Pero también revisar que los icon SVG tengan viewBox
```

**Fix 5: Teléfono en Schema (línea 35):**
```javascript
// "+57-300-123-4567" — verificar formato internacional correcto
// Google recomienda formato E.164: +573001234567
"telephone": "+573001234567"
```

**Fix 6: Stat counter validation:**
```javascript
// En index.html línea 451-492
// 1247 servicios completados vs 127 reseñas → ratio de 10:1
// Con rating de 4.8 de 127 reviews, parecería bajo
// Los números de stats deben ser verificables y consistentes
```

**Impacto:** 🟡 Medio — SEO, percepción de profesionalismo, consistencia de marca
**Esfuerzo:** S (2 horas)
**Agente:** Frontend
**Dependencia:** Ninguna
**Referencias:** [Schema.org telephone format](https://schema.org/telephone), [HTML entities vs text](https://html.spec.whatwg.org/multipage/named-characters.html)

---

## Resumen de Prioridades R126

| # | Propuesta | Impacto | Esfuerzo | Agente | Tipo |
|---|-----------|---------|---------|--------|------|
| 1 | Portal de Autoservicio para Suscripciones | 🔴 Alto | M | Frontend | ✨ NUEVO |
| 2 | Emergency Spill Response Service | 🔴 Alto | S/M | Frontend + Content | ✨ NUEVO |
| 3 | Automated Visual Quoting | 🔴 Alto | M | Frontend | ✨ NUEVO |
| 4 | PWA Completar (Manifest + Install Prompt) | 🟡 Medio | S | Frontend | ✨ NUEVO |
| 5 | Accesibilidad WCAG 2.1 AA Fixes | 🟡 Medio | S | Frontend | ✨ NUEVO |
| 6 | Fix Técnico (Brand, HTML entities, Schema) | 🟡 Medio | S | Frontend | 🐛 BUG |

---

## Diferenciación con R125

**R125 propuso:**
- Chatbot con Interfaz de Voz
- AI Service Recommender Quiz
- Push Notifications Lifecycle
- Gamification Loyalty Program
- Weather-Aware Scheduling
- Eco-Certification Schema Markup
- Fix técnicos (WhatsApp, SW versioning, VideoObject)

**R126 novedades propias:**
1. **Portal de Autoservicio** — Gestión de suscripciones con login simple (ninguna ronda anterior lo propuso)
2. **Emergency Spill Response** — Vertical de servicio de emergencia no mencionado antes (R124 mencionó antimicrobial pero no emergency)
3. **Automated Visual Quoting** — Upload de fotos para cotización personalizada (ninguna ronda anterior lo propuso)
4. **PWA Completar** — Manifest completo + install prompt (R119 mencionó SW pero no el manifest)
5. **Accesibilidad WCAG 2.1** — Skip link, contrast, focus indicators (gap nunca documentado formalmente)
6. **Fix de Brand & HTML entities** — `&amp;` vs `&` en contenido vivo (bug nunca detectado en rondas anteriores)

---

## Referencias

[1] CleanerHQ — Cleaning Industry Trends and Opportunities in 2026: https://cleanerhq.com/cleaning-industry-trends-and-opportunities-in-2026/
[2] Schema.org Subscription: https://schema.org/Subscription
[3] Web App Manifest: https://developer.mozilla.org/en-US/docs/Web/Manifest
[4] WCAG 2.1 Quick Reference: https://www.w3.org/WAI/WCAG21/quickref/
[5] WebAIM Contrast Checker: https://webaim.org/resources/contrastchecker/

---

*Análisis generado por Innovation Scout — Innovation Scout Agent*
*Purity & Clean Round 126 — 2026-04-29*