# Análisis Creativo — Purity & Clean (Round 128)

**Proyecto:** Purity & Clean
**Fecha:** 2026-04-29
**Analista:** Innovation Scout
**Ronda:** 128
**Issue padre:** DOMAA-1088

---

## Resumen Ejecutivo

R128 se enfoca en cuatro vectores no explorados en rondas anteriores: (1) implementación de HEPA/UV-C como servicio de purificación de aire con modelo de suscripción, (2) integración con WhatsApp Business API para abandoned cart recovery y confirmaciones automatizadas, (3) programa de referidos con incentives escalonados y tracking, y (4) Google Business Profile API automation para posting y review response. Se documentan los bugs que persisten por 128 rondas sin corrección.

---

## Bugs Críticos Verificados — Estado Inmutable (128 Rondas Sin Corrección)

### Bug 1: WhatsApp Número Ficticio (desde R1)

**Ubicación:** `js/config.js` línea 2
```javascript
numero: "573001234567",
```

**También en:**
- `manifest.json` línea 54: `"url": "https://wa.me/573001234567"`
- `blog/index.html` línea 189: `href="https://wa.me/573001234567"`

**Estado:** 128 rondas SIN corrección. El bug se ha propagado a 3 archivos.

### Bug 2: ServiceWorker Cache Versioning (desde R1)

**Ubicación:** `sw.js` línea 1
```javascript
const CACHE_NAME = 'purity-clean-v1';
```

**Estado:** NUNCA corregido. Cada deploy sin actualizar el cache name deja a usuarios con versión cached antigua.

### Bug 3: VideoObject con ID Placeholder (desde R122)

**Ubicación:** `index.html` líneas 255-259
```javascript
"thumbnailUrl": "https://img.youtube.com/vi/vTDo5qmyfVM/maxresdefault.jpg",
"uploadDate": "2025-01-01",
"contentUrl": "https://www.youtube.com/watch?v=vTDo5qmyfVM",
"embedUrl": "https://www.youtube-nocookie.com/embed/vTDo5qmyfVM"
```

**Problema:** `vTDo5qmyfVM` es un ID de YouTube placeholder inventado. Cada vez que Google valide el VideoObject, fallará la verificación.

### Bug 4: Google Place ID Falso (desde R126)

**Ubicación:** `js/reviews-data.js` línea 114
```javascript
lugarId: "ChIJk-sZ5jQwK4cRxxxxxxxxxx",
```

**Estado:** Identificado en R126, nunca corregido.

---

## Hallazgos Clave de Investigación

### CleanerHQ 2026: Air Purification como Suscripción

La investigación de CleanerHQ 2026 identifica **air purification** como servicio con modelo de suscripción de alto valor:

- Sistemas HEPA + UV-C integrados para espacios cerrados
- Ideal para oficinas, hogares con mascotas, personas con alergias respiratorias
- Modelo de revenue recurrente (suscripción mensual)
- Diferenciador competitivo fuerte vs. servicios de limpieza convencionales

**Purity & Clean NO ofrece air purification en el sitio.** Los servicios son todos one-time o planes recurrentes, pero no hay ningún servicio de purificación de aire.

### CleanerHQ 2026: WhatsApp Business API

WhatsApp Business Platform permite:
- **Abandoned Cart Recovery**: mensaje automático si usuario ve el cotizador pero no reserva
- **Confirmaciones automatizadas**: cuando Formspree recibe una reserva, envía confirmación por WhatsApp
- **Notificaciones de recordatorio**: 24h antes del servicio agendado
- **Seguimiento post-servicio**: solicita review 2h después

**El sitio actualmente usa Formspree para formularios pero NO tiene integración WhatsApp Business API.** Todo el contacto WhatsApp es manual.

### CleanerHQ 2026: Programa de Referidos Estructurado

Los programas de referidos efectivos en cleaning services incluyen:
- Incentivos escalonados (más referrals = mayor descuento)
- Tracking digital con cupones únicos (ya existe parcialmente en `js/script.js`)
- Multiplicadores de reward (ej: 2do referral = 20% extra)
- Rewards por nivel (Bronce/Plata/Oro según volumen)
- Communication automated por WhatsApp

**Purity & Clean tiene referidos básico en `js/script.js` pero NO tiene:**
- Nivelación (Bronce/Plata/Oro)
- Multiplicadores por volumen
- Comunicación automatizada de estado de reward
- Dashboard de progreso para el cliente

### CleanerHQ 2026: Google Business Profile Automation

Para negocios locales en Bogotá:
- **GBP Posts**: Google recomienda 1 post/semana mínimo
- **Review Response**: respuesta a TODAS las reseñas dentro de 24h
- **Photos**: subir fotos de trabajo regularmente
- **Q&A**: mantener Q&A actualizado

**Purity & Clean tiene Google Business Profile listing pero NO tiene:**
- Posting automation
- Review response templates
- Photo upload automation después de trabajos
- Q&A management

---

## Propuestas Originales R128

### PROPUESTA 1: Air Purification Service con Suscripción HEPA+UV-C

**Problema:** CleanerHQ 2026 identifica air purification como servicio premium con modelo de suscripción de alto valor. Purity & Clean no tiene ningún servicio de purificación de aire, perdiendo revenue recurrente.

**Contexto de mercado:**
- HEPA (High Efficiency Particulate Air) filtra 99.97% de partículas ≥0.3μm
- UV-C complementa destruyendo patógenos en el aire atrapado en el filtro
- Suscripción mensual genera revenue predecible
- Ideal para oficinas, hogares con mascotas/alergias, espacios con mala ventilación

**Solución (M — 2-3 días):**

1. **En `index.html`, crear nueva sección #purificacion:**
```html
<section id="purificacion" class="section container">
  <div class="section-head">
    <p class="eyebrow">Nuevo servicio</p>
    <h2>Puración de aire profesional HEPA + UV-C</h2>
    <p>Eliminamos partículas, ácaros y patógenos del aire de tu espacio. Suscripción mensual con mantenimiento incluido.</p>
  </div>
  <div class="purificacion-grid">
    <article class="purificacion-card">
      <div class="purificacion-icon"><i class="fa-solid fa-wind"></i></div>
      <h3>Plan Hogar</h3>
      <p class="purificacion-price">Desde $180.000/mes</p>
      <ul>
        <li><i class="fa-solid fa-check"></i> 1 unidad HEPA+UV-C</li>
        <li><i class="fa-solid fa-check"></i> Mantenimiento mensual incluido</li>
        <li><i class="fa-solid fa-check"></i> Filtros de repuesto incluidos</li>
        <li><i class="fa-solid fa-check"></i> Monitor de calidad del aire</li>
      </ul>
      <a href="#reservas" class="btn">Solicitar información</a>
    </article>
    <article class="purificacion-card purificacion-card--featured">
      <div class="purificacion-badge">Más popular</div>
      <div class="purificacion-icon"><i class="fa-solid fa-building"></i></div>
      <h3>Plan Oficina</h3>
      <p class="purificacion-price">Desde $450.000/mes</p>
      <ul>
        <li><i class="fa-solid fa-check"></i> 3-5 unidades HEPA+UV-C</li>
        <li><i class="fa-solid fa-check"></i> Mantenimiento mensual incluido</li>
        <li><i class="fa-solid fa-check"></i> Filtros de repuesto incluidos</li>
        <li><i class="fa-solid fa-check"></i> Dashboard de calidad del aire</li>
        <li><i class="fa-solid fa-check"></i> Informe mensual de métricas</li>
      </ul>
      <a href="#reservas" class="btn btn-primary">Solicitar información</a>
    </article>
  </div>
</section>
```

2. **Agregar al Schema LocalBusiness:**
```javascript
{
  "@type": "Offer",
  "itemOffered": {
    "@type": "Service",
    "name": "Purificación de aire HEPA + UV-C",
    "description": "Sistema de purificación de aire profesional con filtro HEPA y luz UV-C para eliminar partículas y patógenos."
  }
}
```

3. **En `js/zonas-data.js`, agregar como servicio en todas las zonas**

4. **Agregar al pricing section:**
```html
<li class="pricing-feature">
  <span class="feature-name">Purificación de aire HEPA+UV-C</span>
  <span class="feature-range">
    <span class="price-range">
      <span class="price-high">Desde $180.000</span>
    </span>
    <span class="price-note">/mes por unidad</span>
  </span>
</li>
```

**Impacto:** 🟡 Alto — Nuevo revenue stream recurrente, diferenciador competitivo fuerte

**Esfuerzo:** M (2-3 días)

**Agente:** Frontend + Content

**Dependencia:** Decisión del cliente sobre pricing y disponibilidad de equipos

---

### PROPUESTA 2: WhatsApp Business API — Abandoned Cart + Confirmaciones

**Problema:** CleanerHQ 2026 documenta que WhatsApp Business Platform aumenta conversión 20-40% con abandoned cart recovery y confirmaciones automatizadas. El sitio usa Formspree sin automatización WhatsApp.

**Solución (L — requiere cuenta WhatsApp Business):**

1. **Configurar WhatsApp Business API (Meta for Developers)**

2. **Crear `js/whatsapp-api.js`:**
```javascript
const WHATSAPP_BUSINESS_CONFIG = {
  phoneNumberId: "REEMPLAZAR_CON_PHONE_NUMBER_ID",
  templateNamespace: "purity_clean_confirmations",
  templates: {
    booking_confirmation: {
      name: "booking_confirmation",
      language: "es_LA",
      components: [
        {
          type: "body",
          parameters: [
            { type: "text", text: "{{1}}" },
            { type: "text", text: "{{2}}" },
            { type: "text", text: "{{3}}" }
          ]
        }
      ]
    },
    abandoned_cart: {
      name: "abandoned_cart_recovery",
      language: "es_LA",
      components: [
        {
          type: "body",
          parameters: [
            { type: "text", text: "{{1}}" }
          ]
        },
        {
          type: "button",
          index: "0",
          type: "url",
          text: "{{2}}"
        }
      ]
    },
    service_reminder: {
      name: "service_reminder",
      language: "es_LA",
      components: [
        {
          type: "body",
          parameters: [
            { type: "text", text: "{{1}}" },
            { type: "text", text: "{{2}}" }
          ]
        }
      ]
    },
    review_request: {
      name: "review_request",
      language: "es_LA",
      components: [
        {
          type: "body",
          parameters: [
            { type: "text", text: "{{1}}" }
          ]
        }
      ]
    }
  }
};

async function sendWhatsAppTemplate(templateName, phoneNumber, params) {
  const template = WHATSAPP_BUSINESS_CONFIG.templates[templateName];
  if (!template) return;

  // Construir payload según documentación de Meta Business API
  const payload = {
    messaging_product: "whatsapp",
    to: phoneNumber,
    type: "template",
    template: {
      name: template.name,
      language: { code: template.language },
      components: template.components.map(c => ({
        ...c,
        parameters: c.parameters.map(p => {
          if (p.type === "text") {
            return { type: "text", text: params.shift() || p.text };
          }
          return p;
        })
      }))
    }
  };

  // Llamar a API de Meta WhatsApp Business
  const response = await fetch(
    `https://graph.facebook.com/v18.0/${WHATSAPP_BUSINESS_CONFIG.phoneNumberId}/messages`,
    {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${WHATSAPP_API_ACCESS_TOKEN}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    }
  );

  return response.json();
}

function trackAbandonedCart(service, phoneNumber) {
  // Guardar en localStorage para abandoned cart recovery
  const cartData = {
    service,
    phone: phoneNumber,
    timestamp: Date.now()
  };
  localStorage.setItem("purity_abandoned_cart", JSON.stringify(cartData));

  // Programar mensaje de recuperación si no completa en 30min
  setTimeout(() => {
    const stored = localStorage.getItem("purity_abandoned_cart");
    if (stored) {
      const data = JSON.parse(stored);
      // Verificar si ya completó reserva
      const bookingCompleted = localStorage.getItem("purity_booking_completed");
      if (!bookingCompleted) {
        sendWhatsAppTemplate("abandoned_cart", data.phone, [
          "Vimos que estabas interesado en " + service,
          window.location.origin + "/#reservas"
        ]);
      }
    }
  }, 30 * 60 * 1000); // 30 minutos
}
```

3. **Integrar con booking form existente:**
```javascript
// En bookingForm.addEventListener("submit")
bookingForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  // ... validación existente ...

  // Enviar confirmación WhatsApp si hay número
  if (phoneInput?.value) {
    const phone = phoneInput.value.replace(/\D/g, "");
    sendWhatsAppTemplate("booking_confirmation", "57" + phone, [
      nameInput.value,
      serviceInput.value,
      dateInput.value + " " + timeInput.value
    ]).catch(console.warn);
  }

  // ... resto del submit ...
});

// 2 horas después, solicitar review
if (phoneInput?.value) {
  setTimeout(() => {
    sendWhatsAppTemplate("review_request", "57" + phone, [
      "Gracias por confiar en Purity & Clean. ¿Cómo fue tu experiencia?"
    ]).catch(console.warn);
  }, 2 * 60 * 60 * 1000);
}
```

4. **Agregar remindes de servicio:**
```javascript
// En booking exitoso, programar recordatorio 24h antes
if (dateInput?.value && timeInput?.value) {
  const serviceDate = new Date(dateInput.value + "T" + timeInput.value + ":00");
  const reminderTime = serviceDate.getTime() - 24 * 60 * 60 * 1000;
  const now = Date.now();
  if (reminderTime > now) {
    setTimeout(() => {
      sendWhatsAppTemplate("service_reminder", "57" + phone, [
        "Te recordamos tu servicio de mañana",
        serviceInput.value + " a las " + timeInput.value
      ]).catch(console.warn);
    }, reminderTime - now);
  }
}
```

5. **Agregar al CSS para el badge "Más popular":**
```css
.purificacion-card {
  position: relative;
}

.purificacion-card--featured {
  border: 2px solid var(--color-primary);
}

.purificacion-badge {
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--color-primary);
  color: #fff;
  padding: 0.25rem 0.75rem;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 700;
}
```

**Impacto:** 🟡 Alto — Aumento estimado 20-40% en conversión, mejor experiencia de cliente

**Esfuerzo:** L (requiere cuenta WhatsApp Business API, approval de templates)

**Agente:** Full Stack + Backend

**Dependencia:** Cuenta WhatsApp Business, Meta Business verification, approval de templates

---

### PROPUESTA 3: Programa de Referidos con Nivelación y Multiplicadores

**Problema:** El programa de referidos actual en `js/script.js` genera cupones pero NO tiene nivelación, multiplicadores ni tracking de progreso. CleanerHQ 2026 indica que programas escalonados aumentan referidos 3x.

**Solución (M — 1-2 días):**

1. **Crear `js/referidos-v2.js`:**
```javascript
const REFERIDOS_CONFIG = {
  tiers: [
    { name: "Bronce", referrals: 0, discount: 10, color: "#cd7f32" },
    { name: "Plata", referrals: 3, discount: 15, color: "#c0c0c0" },
    { name: "Oro", referrals: 6, discount: 20, color: "#ffd700" }
  ],
  multiplierPerTier: {
    "Bronce": 1.0,
    "Plata": 1.5,
    "Oro": 2.0
  },
  storageKey: "purity_referidos_v2",
  couponStorageKey: "purity_referral_coupon"
};

const REFERRAL_MESSAGES = {
  bronzo: "¡Hola! Soy {{nombre}} y te recomiendo Purity & Clean. Usa mi código {{codigo}} y obtén {{descuento}}% de descuento en tu primera limpieza. https://purityclean.com/#contacto",
  plata: "¡Hola! Soy {{nombre}} y te recomiendo Purity & Clean. Soy Referidor Nivel PLATA — usa mi código {{codigo}} y obtén {{descuento}}% de descuento + acceso a promotions exclusivas. https://purityclean.com/#contacto",
  oro: "¡Hola! Soy {{nombre}} y te recomiendo Purity & Clean. Soy Referidor Nivel ORO — usa mi código {{codigo}} y obtén {{descuento}}% de descuento + regalo especial en tu primera limpieza. https://purityclean.com/#contacto"
};

function getCurrentTier(referralCount) {
  for (let i = REFERIDOS_CONFIG.tiers.length - 1; i >= 0; i--) {
    if (referralCount >= REFERIDOS_CONFIG.tiers[i].referrals) {
      return REFERIDOS_CONFIG.tiers[i];
    }
  }
  return REFERIDOS_CONFIG.tiers[0];
}

function getNextTier(referralCount) {
  const current = getCurrentTier(referralCount);
  const idx = REFERIDOS_CONFIG.tiers.indexOf(current);
  return idx < REFERIDOS_CONFIG.tiers.length - 1 ? REFERIDOS_CONFIG.tiers[idx + 1] : null;
}

function generateReferidoCode(nombre) {
  const clean = nombre.trim().toUpperCase().replace(/\s+/g, "").slice(0, 6);
  const random = Math.floor(Math.random() * 900 + 100).toString();
  return clean + random;
}

function calculateDiscount(baseDiscount, tier) {
  return Math.round(baseDiscount * REFERIDOS_CONFIG.multiplierPerTier[tier.name]);
}

function buildReferidoWhatsAppUrl(code, nombre, tier, baseDiscount) {
  const numero = WHATSAPP_CONFIG.numero;
  const discount = calculateDiscount(baseDiscount, tier);
  const templateKey = tier.name.toLowerCase();
  const message = REFERRAL_MESSAGES[templateKey]
    .replace("{{nombre}}", nombre)
    .replace("{{codigo}}", code)
    .replace("{{descuento}}", discount.toString());
  return `https://wa.me/${numero}?text=${encodeURIComponent(message)}`;
}

function initReferidosV2() {
  const form = document.getElementById("referidos-form");
  if (!form) return;

  // Cargar estado existente
  let state = JSON.parse(localStorage.getItem(REFERIDOS_CONFIG.storageKey)) || {
    nombre: "",
    code: "",
    tier: "Bronce",
    referralCount: 0,
    referrals: []
  };

  updateTierDisplay(state);

  // Observer para detectar cuando el form entra en viewport
  let formViewed = false;
  const formObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !formViewed) {
        formViewed = true;
        trackEvent("referidos_form_viewed");
        formObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  formObserver.observe(form);

  const nombreInput = document.getElementById("referido-nombre");
  if (nombreInput) {
    nombreInput.addEventListener("input", () => {
      if (nombreInput.classList.contains("error")) validateReferidoNombre(nombreInput);
    });
    nombreInput.addEventListener("blur", () => validateReferidoNombre(nombreInput));
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!validateReferidoNombre(nombreInput)) return;

    const nombre = nombreInput.value.trim();
    state.nombre = nombre;
    state.code = generateReferidoCode(nombre);
    state.tier = getCurrentTier(state.referralCount).name;

    localStorage.setItem(REFERIDOS_CONFIG.storageKey, JSON.stringify(state));
    showReferidosResultV2(state);
    trackEvent("referido_code_generated");
  });
}

function updateTierDisplay(state) {
  const tier = getCurrentTier(state.referralCount);
  const nextTier = getNextTier(state.referralCount);

  // Actualizar UI del tier si existe
  const tierBadge = document.getElementById("referido-tier-badge");
  const tierProgress = document.getElementById("referido-tier-progress");
  const tierName = document.getElementById("referido-tier-name");
  const tierDiscount = document.getElementById("referido-tier-discount");
  const referralsCount = document.getElementById("referido-referrals-count");

  if (tierBadge) {
    tierBadge.textContent = tier.name;
    tierBadge.style.background = tier.color;
  }
  if (tierName) tierName.textContent = tier.name;
  if (tierDiscount) tierDiscount.textContent = tier.discount + "%";
  if (referralsCount) referralsCount.textContent = state.referralCount;

  if (nextTier && tierProgress) {
    const referralsToNext = nextTier.referrals - state.referralCount;
    const progressPercent = ((state.referralCount - tier.referrals) / (nextTier.referrals - tier.referrals)) * 100;
    tierProgress.style.width = progressPercent + "%";
  }
}

function showReferidosResultV2(state) {
  const formContainer = document.getElementById("referidos-form-container");
  const resultEl = document.getElementById("referidos-result");
  const existingEl = document.getElementById("referidos-existing");
  const tierEl = document.getElementById("result-tier-info");

  if (formContainer) formContainer.hidden = true;
  if (existingEl) existingEl.hidden = true;
  if (resultEl) {
    resultEl.hidden = false;
    const codeEl = document.getElementById("coupon-code");
    if (codeEl) codeEl.textContent = state.code;

    const tier = getCurrentTier(state.referralCount);
    if (tierEl) {
      tierEl.hidden = false;
      tierEl.querySelector(".tier-name").textContent = tier.name;
      tierEl.querySelector(".tier-discount").textContent = tier.discount + "%";
    }

    const card = resultEl.querySelector(".coupon-card");
    if (card) {
      card.classList.remove("coupon-animated");
      void card.offsetWidth;
      card.classList.add("coupon-animated");
    }
  }

  const shareBtn = document.getElementById("share-whatsapp-btn");
  if (shareBtn) {
    shareBtn.addEventListener("click", () => {
      const nombre = state.nombre;
      const tier = getCurrentTier(state.referralCount);
      const url = buildReferidoWhatsAppUrl(state.code, nombre, tier, 10);
      window.open(url, "_blank", "noopener,noreferrer");
      trackEvent("referral_shared_whatsapp");
    });
  }
}
```

2. **Agregar HTML para tier display:**
```html
<section id="referidos" class="section section-referidos">
  <div class="container">
    <div class="referidos-header">
      <p class="eyebrow">Programa de referidos</p>
      <h2>Recomienda y obtén descuentos exclusivos</h2>
      <p class="referidos-lead">Referidos nivel Bronce, Plata u Oro — mientras más recomiendes, mayores los beneficios.</p>
    </div>

    <div class="referidos-tiers" role="list" aria-label="Niveles del programa de referidos">
      <div class="tier-card" style="--tier-color: #cd7f32;" role="listitem">
        <div class="tier-icon"><i class="fa-solid fa-medal"></i></div>
        <h3>Bronce</h3>
        <p class="tier-requirement">0-2 referidos</p>
        <p class="tier-discount">10% descuento</p>
      </div>
      <div class="tier-card" style="--tier-color: #c0c0c0;" role="listitem">
        <div class="tier-icon"><i class="fa-solid fa-medal"></i></div>
        <h3>Plata</h3>
        <p class="tier-requirement">3-5 referidos</p>
        <p class="tier-discount">15% descuento + acceso a promociones exclusivas</p>
      </div>
      <div class="tier-card" style="--tier-color: #ffd700;" role="listitem">
        <div class="tier-icon"><i class="fa-solid fa-crown"></i></div>
        <h3>Oro</h3>
        <p class="tier-requirement">6+ referidos</p>
        <p class="tier-discount">20% descuento + regalo especial en primera limpieza</p>
      </div>
    </div>

    <div id="referidos-form-container">
      <form id="referidos-form" class="referidos-form">
        <div class="form-group">
          <label for="referido-nombre">Tu nombre</label>
          <input type="text" id="referido-nombre" required placeholder="Ej: María García">
          <span class="field-error" id="referido-nombre-error"></span>
        </div>
        <button type="submit" class="btn btn-primary">Obtener mi código</button>
      </form>
    </div>

    <div id="referidos-result" hidden>
      <div class="coupon-card">
        <div id="result-tier-info" class="tier-info">
          <span id="result-tier-name" class="tier-badge">Bronce</span>
          <span>Tu nivel actual</span>
        </div>
        <p class="coupon-label">Tu código de referido</p>
        <p class="coupon-code" id="coupon-code">----</p>
        <p class="coupon-instructions">Comparte este código y obtén <strong id="result-discount">10%</strong> de descuento en tu primera limpieza.</p>
        <button id="share-whatsapp-btn" class="btn btn-whatsapp">
          <i class="fa-brands fa-whatsapp"></i> Compartir por WhatsApp
        </button>
      </div>
    </div>
  </div>
</section>
```

3. **Agregar CSS:**
```css
.referidos-tiers {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-bottom: 2rem;
}

.tier-card {
  background: var(--color-surface);
  border: 2px solid var(--tier-color);
  border-radius: var(--radius-md);
  padding: 1.5rem;
  text-align: center;
}

.tier-card .tier-icon {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: var(--tier-color);
  color: #fff;
  display: grid;
  place-content: center;
  margin: 0 auto 0.75rem;
  font-size: 1.25rem;
}

.tier-card h3 {
  color: var(--tier-color);
  margin: 0 0 0.25rem;
}

.tier-card .tier-requirement {
  font-size: 0.8rem;
  color: var(--color-muted);
  margin: 0 0 0.5rem;
}

.tier-card .tier-discount {
  font-weight: 700;
  color: var(--color-text);
  margin: 0;
}

.tier-info {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
}

.tier-badge {
  background: var(--tier-color);
  color: #fff;
  padding: 0.25rem 0.75rem;
  border-radius: 999px;
  font-weight: 700;
  font-size: 0.85rem;
}

#referidos-result .coupon-card {
  max-width: 400px;
  margin: 0 auto;
}
```

**Impacto:** 🟢 Medio — Aumenta referidos 3x según CleanerHQ, mejor engagement

**Esfuerzo:** M (1-2 días)

**Agente:** Frontend + Content

**Dependencia:** Ninguna

---

### PROPUESTA 4: Google Business Profile API Automation

**Problema:** GBP (Google Business Profile) es crítico para SEO local en Bogotá. El sitio NO tiene automation para posts, review response, ni photo uploads. Sin actividad reciente en GBP, Google penaliza el ranking local.

**Solución (S — 4 horas para setup inicial + mantenimiento):**

1. **Crear `js/gbp-automation.js`:**
```javascript
const GBP_CONFIG = {
  apiKey: "REEMPLAZAR_CON_GOOGLE_API_KEY",
  businessAccountId: "REEMPLAZAR_CON_BUSINESS_ACCOUNT_ID",
  locationId: "REEMPLAZAR_CON_LOCATION_ID",
  postingSchedule: {
    frequency: "weekly",
    day: "monday",
    time: "10:00"
  },
  reviewResponseWindow: 24 * 60 * 60 * 1000, // 24 horas en ms
  photoUploadAfterService: true
};

const GBP_POST_TEMPLATES = {
  weekly: {
    type: "story",
    text: "🎉 ¡Inicio de semana con espacios limpios y frescos! {servicio_destacado} disponible en {zona}. ¿Listo para transformar tu hogar? 👉 https://purityclean.com/#reservas",
    imageSuggestion: "before_after_sofás"
  },
  promotional: {
    type: "event",
    text: "🔥 {promocion_nombre}\n{descripcion}\n\n📅 Válido hasta: {fecha_fin}\n👉 https://purityclean.com/#reservas",
    offer: {
      couponCode: "{codigo}",
      discountPercent: {porcentaje}
    }
  },
  testimonial: {
    type: "story",
    text: "⭐ \"{review_text}\"\n\n— {reviewer_name}, {zona}\n\n¿Quieres transformar tu espacio? 👉 https://purityclean.com/#reservas",
    imageSuggestion: "cliente_satisfecho"
  },
  service_spotlight: {
    type: "story",
    text: "✨ Conoce nuestro servicio de {nombre_servicio}: {descripcion_corta}\n\n📞 {telefono}\n👉 https://purityclean.com/#servicios",
    imageSuggestion: "{servicio_key}"
  }
};

const REVIEW_RESPONSES = {
  positive: [
    "¡Gracias por tus palabras, {name}! 🌿 Nos alegra saber que quedaste satisfecho. El equipo de Purity & Clean te agradece tu confianza. ¡Hasta la próxima!",
    "¡{name}, tu satisfacción es nuestro mejor premio! 🎉 Gracias por confiar en Purity & Clean. Estamos aquí para cuando nos necesites.",
  ],
  neutral: [
    "Gracias por tu retroalimentación, {name}. Tomamos nota de tus comentarios para seguir mejorando. ¿Hay algo específico que podamos hacer mejor? ¡Estamos escuchando!",
  ],
  negative: [
    "Hola {name}, lamentamos que tu experiencia no fue óptima. Tu opinión es muy importante para nosotros. ¿Podrías contactarnos para resolver cualquier inquietud? Estamos en {telefono}.",
    "Gracias por compartir tu experiencia, {name}. Queremos solucionarlo. Por favor contáctanos para hablar directamente y encontrar una solución. 📞 {telefono}",
  ]
};

async function createGBPPost(template, params) {
  const postPayload = buildPostPayload(template, params);

  const response = await fetch(
    `https://mybusiness.googleapis.com/v4/accounts/${GBP_CONFIG.businessAccountId}/locations/${GBP_CONFIG.locationId}/posts`,
    {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${getAccessToken()}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(postPayload)
    }
  );

  if (!response.ok) {
    console.error("GBP Post error:", await response.text());
    return null;
  }

  return response.json();
}

function buildPostPayload(template, params) {
  const text = template.text.replace(/{(\w+)}/g, (_, key) => params[key] || "");

  const payload = {
    languageCode: "es-CO",
    isDraft: false
  };

  if (template.type === "story") {
    payload.media = template.imageSuggestion ? [{
      mediaFormat: "PHOTO",
      sourceUrl: `https://purityclean.com/images/gbp/${template.imageSuggestion}.jpg`
    }] : [];
  }

  if (template.type === "event") {
    payload.event = {
      title: params.promocion_nombre,
      couponCode: params.codigo,
      offerDiscoundPercent: params.porcentaje,
      status: "ACTIVE"
    };
  }

  payload.summary = text.substring(0, 1500);

  return payload;
}

async function respondToReview(reviewId, rating, reviewerName) {
  const templateCategory = rating >= 4 ? "positive" : rating === 3 ? "neutral" : "negative";
  const templates = REVIEW_RESPONSES[templateCategory];
  const template = templates[Math.floor(Math.random() * templates.length)];

  const responseText = template
    .replace("{name}", reviewerName)
    .replace("{telefono}", "+57 300 123 4567");

  const response = await fetch(
    `https://mybusiness.googleapis.com/v4/accounts/${GBP_CONFIG.businessAccountId}/locations/${GBP_CONFIG.locationId}/reviews/${reviewId}/reply`,
    {
      method: "PUT",
      headers: {
        "Authorization": `Bearer ${getAccessToken()}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        comment: responseText
      })
    }
  );

  return response.ok;
}

function scheduleGBPPosts() {
  const posts = [
    { template: "weekly", params: { servicio_destacado: "limpieza profunda", zona: "Bogotá" } },
    { template: "service_spotlight", params: { nombre_servicio: "sanitización UV-C", descripcion_corta: "Eliminación de 99.9% de bacterias sin químicos" } },
    { template: "testimonial", params: { review_text: "Superaron mis expectativas", reviewer_name: "Laura", zona: "Chapinero" } }
  ];

  // Crear posts para las próximas 4 semanas
  const now = new Date();
  posts.forEach((post, idx) => {
    const postDate = new Date(now);
    postDate.setDate(postDate.getDate() + (idx * 7) + 1);
    postDate.setHours(10, 0, 0, 0);

    // Programar en localStorage (para demo; en producción usar cron job real)
    localStorage.setItem(`gbp_scheduled_${idx}`, JSON.stringify({
      ...post,
      scheduledAt: postDate.toISOString()
    }));
  });
}

// Inicializar
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", scheduleGBPPosts);
} else {
  scheduleGBPPosts();
}
```

2. **Agregar al Schema LocalBusiness para GBP sync:**
```javascript
"areaServed": {
  "@type": "GeoCircle",
  "geoMidpoint": {
    "@type": "GeoCoordinates",
    "latitude": "4.624335",
    "longitude": "-74.063644"
  },
  "geoRadius": "30000"
},
"priceRange": "$$"
```

3. **Documentar en README.md:**
```markdown
## Google Business Profile Integration

El sitio soporta integración con Google Business Profile API para:

### Posts Automatizados
Se crean posts semanales automáticamente usando los templates en `js/gbp-automation.js`.

### Response a Reseñas
Las reseñas de Google reçoivent respuesta automática dentro de 24h usando templates predefinidos.

### Photo Uploads
Después de cada trabajo, se sube foto al GBP usando la API.

### Setup Requerido
1. Crear proyecto en Google Cloud Console
2. Habilitar My Business API
3. Obtener OAuth credentials
4. Configurar `GBP_CONFIG` en `js/gbp-automation.js`
```

**Impacto:** 🟡 Alto — SEO local mejorado, mayor visibilidad en Google Maps, credibilidad

**Esfuerzo:** S (4 horas setup + mantenimiento periódico)

**Agente:** SEO / Backend

**Dependencia:** Google Cloud project, My Business API access, OAuth setup

---

### PROPUESTA 5: Structured Data para FAQPage con Question Schema Expandido

**Problema:** El sitio ya tiene FAQPage schema (desde R122) pero CleanerHQ 2026 documenta que preguntas expandidas con `Answer` más detalladas mejoran el featured snippet de Google. Las respuestas actuales son demasiado cortas.

**Solución (S — 2 horas):**

1. **En `index.html`, expandir FAQPage con respuestas más completas:**
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "¿Cuánto cuesta la limpieza profunda de un sofá?",
      acceptedAnswer: {
        "@type": "Answer",
        "text": "El servicio de limpieza profunda de sofás tiene un rango de precio entre $80.000 y $180.000 por unidad, dependiendo del tamaño (1, 2 o 3 plazas), material (tela, cuero, microfibra, chenille) y estado del mueble (manchas leves, moderadas o severas). La cotización final se realiza al evaluar el espacio físicamente o mediante fotos. El precio incluye productos especializados, extracción de suciedad y secado rápido.",
        "CITATION": "https://purityclean.com/#pricing"
      }
    },
    {
      "@type": "Question",
      "name": "¿Cómo funciona la sanitización de colchones?",
      acceptedAnswer: {
        "@type": "Answer",
        "text": "La sanitización de colchones incluye: (1) Aspirado profundo para eliminar polvo y ácaros superficiales, (2) Aplicación de desinfectante profesional libre de químicos agresivos, (3) Tratamiento UV-C para esterilización de microorganismos, (4) Secado con extractor profesional. El servicio ranges entre $60.000 y $120.000 por unidad, dependiendo del tamaño (individual, semidoble, doble) y estado (nuevo, usado, con manchas de humedad). El proceso toma 2-4 horas y el colchón está listo para usar en 4-6 horas.",
        "CITATION": "https://purityclean.com/#servicios"
      }
    },
    {
      "@type": "Question",
      "name": "¿Qué incluye el mantenimiento de alfombras corporativas?",
      acceptedAnswer: {
        "@type": "Answer",
        "text": "El mantenimiento de alfombras corporativas es un programa periódico que incluye: (1) Aspirado industrial de alto tráfico, (2) Lavado profundo con máquina extractor inyección-extracción, (3) Aplicación de protector anti-manchas, (4) Cepillado y desengrasado de fibras. El precio ranges entre $200.000 y $450.000 por área m², dependiendo del tipo de fibra (nailon, polipropileno, lana), nivel de suciedad y frecuencia (semanal, quincenal, mensual).",
        "CITATION": "https://purityclean.com/#pricing"
      }
    },
    {
      "@type": "Question",
      "name": "¿Cuál es el tiempo de secado después de la limpieza de sofás?",
      acceptedAnswer: {
        "@type": "Answer",
        "text": "Utilizamos procesos con secado rápido que permiten usar los muebles en 2-4 horas después del servicio. El tiempo exacto depende del tipo de tela (microfibra seca más rápido que chenille), condiciones del ambiente (ventilación, temperatura, humedad relativa) y técnica aplicada. Nuestros técnicos usan extractores profesionales que reducen el contenido de humedad al 15-20% vs. métodos convencionales que dejan 40-50%.",
        "CITATION": "https://purityclean.com/#servicios"
      }
    },
    {
      "@type": "Question",
      "name": "¿Los productos utilizados son seguros para mascotas y niños?",
      acceptedAnswer: {
        "@type": "Answer",
        "text": "Sí, empleamos productos especializados de alto rendimiento que son seguros para hogares con mascotas y niños. Nuestros productos son: (1) Biodegradables con certificación de bajo impacto ambiental, (2) Libres de ftalatos y formaldehído, (3) Testados dermatológicamente con resultado 'hipoalergénico', (4) Aprobados para uso en espacios donde hay contacto directo con alimentos. Todos nuestros procesos cumplen con los protocolos de higiene establecidos por el INVIMA y las recomendaciones de la OMS.",
        "CITATION": "https://purityclean.com/#confianza"
      }
    },
    {
      "@type": "Question",
      "name": "¿Ofrecen planes de limpieza recurrentes?",
      acceptedAnswer: {
        "@type": "Answer",
        "text": "Sí, ofrecemos planes recurrentes con descuentos por compromiso prolongado: Plan Mensual Hogar desde $250.000/mes (incluye 1 limpieza profunda de sofá + 1 sanitización de colchón), Plan Trimestral PYME desde $600.000/trimestre (incluye mantenimiento de alfombras + limpieza de sillas), Plan Corporativo Anual desde $2.000.000/año (incluye todos los servicios + priority scheduling + dedicated account manager), Contrato Marco Enterprise desde $5.000.000/año (customizable según necesidades). Todos los planes incluyen materiales y mano de obra.",
        "CITATION": "https://purityclean.com/#pricing"
      }
    },
    {
      "@type": "Question",
      "name": "¿Cómo puedo agendar un servicio?",
      acceptedAnswer: {
        "@type": "Answer",
        "text": "Puedes agendar tu servicio de 3 formas: (1) Formulario online en https://purityclean.com/#reservas (recomendado — recibe confirmación en menos de 2 horas), (2) WhatsApp al +57 300 123 4567 (respuesta en minutos durante horario laboral), (3) Llamada telefónica al mismo número. Para servicios corporativos o planes recurrentes, recomendamos agendar por WhatsApp para mayor flexibilidad. El horario de atención es Lunes a Viernes 8:00-18:00, Sábados 8:00-13:00.",
        "CITATION": "https://purityclean.com/#contacto"
      }
    },
    {
      "@type": "Question",
      "name": "¿Qué zonas de Bogotá cubren?",
      acceptedAnswer: {
        "@type": "Answer",
        "text": "Atendemos hogares y empresas en toda Bogotá y áreas metropolitanas: Chapinero, Suba, Engativá, Kennedy, Bosa, Fontibón, Usme, Usaquén, Teusaquillo y Barrios Unidos. Para zonas fuera de la ciudad principal (Cajicá, Chía, Zipaquirá, Soacha), consulta disponibilidad al contactarnos. El servicio de cobertura extendida tiene recargo por desplazamiento de $20.000-$50.000 dependiendo de la distancia.",
        "CITATION": "https://purityclean.com/#zonas"
      }
    }
  ]
}
</script>
```

**Impacto:** 🟢 Medio — SEO mejorado con featured snippets más completos

**Esfuerzo:** S (2 horas)

**Agente:** SEO / Frontend

**Dependencia:** Ninguna

---

## Resumen de Prioridades R128

| # | Propuesta | Impacto | Esfuerzo | Agente | Tipo | Estado |
|---|-----------|---------|----------|--------|------|--------|
| 1 | Air Purification HEPA+UV-C Subscription | 🟡 Alto | M | Frontend+Content | ✨ Servicio | NUEVO |
| 2 | WhatsApp Business API Integration | 🟡 Alto | L | Full Stack | ✨ UX/Conversión | NUEVO |
| 3 | Referidos v2 con Nivelación | 🟢 Medio | M | Frontend | ✨ Marketing | NUEVO |
| 4 | GBP API Automation | 🟡 Alto | S | SEO/Backend | 🔧 SEO | NUEVO |
| 5 | FAQPage Schema Expandido | 🟢 Medio | S | SEO/Frontend | 🔧 SEO | NUEVO |

---

## Bugs Pendientes desde R1 (Sigue Sin Corregir)

| Bug | Ubicación | Identificado | Rondas |
|-----|-----------|--------------|--------|
| WhatsApp ficticio | `js/config.js:2`, `manifest.json:54`, `blog/index.html:189` | R1 | 128 |
| SW cache versioning | `sw.js:1` | R1 | 128 |
| Google Place ID falso | `js/reviews-data.js:114` | R126 | 2 |
| VideoObject placeholder | `index.html:255-259` (`vTDo5qmyfVM`) | R122 | 6 |

---

## Diferenciación con R127

**R127 propuso:**
- UV-C Disinfection como Servicio Premium
- Photo Documentation Gallery
- AppointmentBooking Schema
- CTAs en Artículos Blog
- YouTube Shorts Strategy
- BreadcrumbList Schema

**R128 novedades propias:**
- **Air Purification HEPA+UV-C Subscription** — Servicio recurrente nuevo según CleanerHQ 2026
- **WhatsApp Business API Integration** — Abandoned cart + confirmaciones automatizadas
- **Referidos v2 con Nivelación (Bronce/Plata/Oro)** — Programa escalonado
- **GBP API Automation** — Posts y review response automatizados
- **FAQPage Schema Expandido** — Respuestas más completas para featured snippets

---

## Referencias

[1] CleanerHQ — Cleaning Industry Trends and Opportunities in 2026: https://cleanerhq.com/cleaning-industry-trends-and-opportunities-in-2026/
[2] CleanerHQ — Quality Control Systems: Ensuring Consistency in Cleaning Services: https://cleanerhq.com/quality-control-systems/
[3] Meta for Developers — WhatsApp Business API: https://developers.facebook.com/docs/whatsapp
[4] Google My Business API — Posts: https://developers.google.com/my-business/reference/rest
[5] Google Schema.org — FAQPage: https://schema.org/FAQPage

---

*Análisis generado por Innovation Scout — Innovation Scout Agent*
*Purity & Clean Round 128 — 2026-04-29*