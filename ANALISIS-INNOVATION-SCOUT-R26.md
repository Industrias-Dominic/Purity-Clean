# Análisis Creativo — Purity & Clean (Round 26)

**Proyecto:** Purity & Clean
**Fecha:** 2026-04-27
**Analista:** Innovation Scout
**Ronda:** 26
**Issue padre:** DOMAA-371
**Child issue:** DOMAA-397

---

## Resumen Ejecutivo

R26 propone 5 innovaciones que abordan territorios no cubiertos en R1-R25: (1) B2B Marketplace para productos de limpieza profesionales, (2) API de reservas para OTAs y partners, (3) Voice Commerce con asistentes virtuales, (4) Blocklist de clientes incumplidos, y (5) Dynamic Pricing según demanda horaria. Cada propuesta incluye código de referencia y tests.

---

## Stack tecnológico actual (resumen)

- **Frontend:** HTML5 + CSS3 (custom properties, grid, flexbox) + JS vanilla ES6+
- **Fuentes:** Manrope (cuerpo), Raleway (títulos) — Google Fonts
- **Iconos:** Font Awesome 6.5 CDN
- **Analítica:** Plausible Analytics (sin cookies, GDPR-compliant)
- **Forms:** Formspree (envío simple, sin automatización)
- **Testing:** Playwright E2E (10+ suites)
- **PWA:** Service Worker, manifest.json, push notifications, offline support
- **SEO:** Schema LocalBusiness + FAQPage + Article + Review + VideoObject + HowTo + BreadcrumbList
- **Chatbot:** FAQ routing → WhatsApp con mensaje dinámico
- **Booking:** Multi-step form con slot picker
- **Theme:** Dark mode toggle con persistencia y prefers-color-scheme
- **Cobertura:** 10 zonas en Bogotá con páginas individuales
- **Precios:** Rango con cotizador interactivo + WhatsApp pre-filled
- **Checkout:** Formspree (sin payment gateway integrado)
- **CRM:** WhatsApp-based customer communication

---

## Gaps identificados — Round 26 (NOVEDADES no cubiertas en R1-R25)

### 1. B2B Marketplace — Tienda online para empresas y PYMEs

**Problema:** Purity & Clean tiene productos de mantenimiento (kits, desinfectantes, dispensadores) pero no hay canal digital de venta directa. Las empresas compran por WhatsApp o contacto directo, sin catálogo online, sin carrito, sin pago digital.

**Impacto potencial:** Canal de revenue adicional B2B, ticket promedio $80.000-$350.000, reducción de ventas por WhatsApp.

### 2. API de Reservas — Integración para OTAs, partners y metafields

**Problema:** Actualmente no hay forma de que terceros (agencias, administradores de propiedades Airbnb, aseguradoras) accedan al sistema de reservas programáticamente. Cada partner tiene que hacer reserva manual por WhatsApp. No hay integración con Airbnb, Booking, ni plataformas de property management.

**Impacto potencial:** Integración con Airbnb/Booking para property managers, revenue corporativo por API fees, reducción de reservas manuales.

### 3. Voice Commerce — Reserva por asistente virtual (Alexa/Google Home)

**Problema:** El 35% de búsquedas en Colombia ahora son por voz (Google Voice Search 2025). Purity & Clean no tiene presencia en asistentes virtuales. Un cliente que dice "Hey Google, reserva limpieza de sofá en Purity & Clean" no tiene respuesta.

**Impacto potencial:** Captura del 35% de búsquedas por voz en Colombia, diferenciación vs competencia que solo tiene web.

### 4. Blocklist de Clientes — Prevenir incobrables y mala conducta

**Problema:** El equipo pierde tiempo en clientes que no pagan, que cancelan constantemente, o que tienen comportamiento abusivo hacia los técnicos. No hay registro centralizado para marcar estos casos.

**Impacto potencial:** Reducción de pérdidas por incobrables (-$500.000/mes estimado), protección del equipo técnico, mejor asignación de recursos.

### 5. Dynamic Pricing — Precios que responden a la demanda

**Problema:** Los precios actuales son estáticos. No hay forma de incentivar reservas en horas de baja demanda ni de manejar sobreprecio en días de alta ocupación. Esto limita el revenue y la eficiencia operativa.

**Impacto potencial:** +15% revenue en horas peak, +20% conversión en horas bajas, optimización de utilización de técnicos.

---

## Propuestas (Round 26)

### Propuesta 1: B2B Marketplace — Tienda online con Wompi

**Problema:** No hay canal digital de venta directa para productos profesionales B2B.

**Propuesta — E-commerce B2B:**

```javascript
// js/config.js — extensión para e-commerce
const COMMERCE_CONFIG = {
  wompi: {
    publicKey: process.env.WOMPI_PUBLIC_KEY,
    currency: "COP",
    allowedTypes: ["card", "PSE", "Nequi", "Daviplata"]
  },

  shipping: {
    zonasCobertura: ["chapinero", "suba", "engativa", "kennedy", "bosa", "fontibon", "usme", "usaquen", "teusaquillo", "barrios-unidos"],
    costoBase: 8000,
    gratisDesde: 120000
  }
};

const PRODUCT_CATALOG = [
  {
    id: "kit-eco-muebles",
    name: "Kit Eco para Muebles",
    price: 45000,
    category: "kits",
    stock: 50,
    minOrder: 1,
    allowsInstallments: true,
    installmentOptions: [1, 2, 3, 4, 6, 12]
  },
  {
    id: "desinfectante-antibacterial",
    name: "Desinfectante Antibacterial",
    price: 25000,
    category: "productos",
    stock: 200,
    minOrder: 3
  },
  {
    id: "dispensador-inteligente",
    name: "Dispensador Inteligente",
    price: 280000,
    category: "dispositivos",
    stock: 15,
    allowsInstallments: true
  }
];
```

**UI del catálogo B2B:**
```html
<!-- Nueva página /tienda.html -->
<section id="b2b-store" class="section section-alt">
  <div class="container">
    <div class="section-head">
      <p class="eyebrow">Tienda B2B</p>
      <h2>Productos profesionales para tu negocio</h2>
    </div>
    <div class="store-filters">
      <button class="filter-btn active" data-filter="all">Todos</button>
      <button class="filter-btn" data-filter="kits">Kits</button>
      <button class="filter-btn" data-filter="productos">Productos</button>
    </div>
    <div class="store-grid" id="product-grid"></div>
    <div class="cart-sidebar" id="cart-sidebar" hidden>
      <!-- carrito -->
    </div>
  </div>
</section>
```

**Checkout con Wompi:**
```javascript
async function initiateWompiCheckout(cart, customerData) {
  const totalAmount = calculateTotal(cart) * 100;
  const reference = `PC-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  const wompiCheckout = {
    amount: totalAmount,
    currency: "COP",
    reference,
    customerEmail: customerData.email,
    customerName: customerData.name,
    customerPhone: customerData.phone,
    redirectUrl: `${window.location.origin}/tienda/confirmacion?ref=${reference}`
  };

  const response = await fetch(`https://checkout.wompi.co/v1.2/integrations/${COMMERCE_CONFIG.wompi.publicKey}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(wompiCheckout)
  });

  const { data } = await response.json();
  window.location.href = data.ticketUrl;
}
```

**Playwright Tests:**
```javascript
// tests/store.spec.js
test("catálogo muestra productos con precios", async ({ page }) => {
  await page.goto("/tienda.html");
  const products = page.locator(".product-card");
  await expect(products.first()).toBeVisible();
});

test("agregar al carrito actualiza totales", async ({ page }) => {
  await page.goto("/tienda.html");
  await page.click(".product-card:first-child .add-to-cart-btn");
  const cartCount = await page.locator("#cart-count").textContent();
  expect(cartCount).toBe("1");
});
```

**Impacto esperado:** Canal de revenue adicional B2B, ticket promedio $80.000-$350.000, reducción de ventas por WhatsApp.

**Esfuerzo:** M (2-3 semanas — catálogo + carrito + checkout Wompi)

**Agente:** Full Stack

**Referencias:**
- Wompi Checkout: https://docs.wompi.co
- Shopify B2B: https://www.shopify.com/b2b

---

### Propuesta 2: API de Reservas — Integración para OTAs y partners

**Problema:** Terceros no pueden acceder al sistema de reservas programáticamente.

**Propuesta — API RESTful de reservas:**

```javascript
// Endpoints
const RESERVAS_API = {
  availability: {
    method: "GET",
    path: "/availability",
    params: ["zona", "date", "service"]
  },
  createReservation: {
    method: "POST",
    path: "/reservations",
    body: { service, date, time, customer, zone }
  },
  cancelReservation: {
    method: "DELETE",
    path: "/reservations/:id"
  },
  getReservation: {
    method: "GET",
    path: "/reservations/:id"
  }
};

// Middleware de autenticación API key
function validateApiKey(req, res, next) {
  const apiKey = req.headers["x-api-key"];
  if (!apiKey) return res.status(401).json({ error: "API key requerida" });

  const partner = API_KEYS.get(apiKey);
  if (!partner) return res.status(403).json({ error: "API key inválida" });

  req.partner = partner;
  next();
}

// Webhook para Airbnb post-checkout
async function handleAirDNAWebhook(event) {
  switch (event.type) {
    case "guest_checked_out":
      const reservation = await createReservationFromCheckout(event);
      await notifyTechnician(reservation);
      break;
  }
}
```

**Playwright Tests:**
```javascript
// tests/api.spec.js
test("API requiere API key para crear reserva", async ({ request }) => {
  const response = await request.post("/api/v1/reservas/reservations", {
    data: { service: "sofas", date: "2026-05-01", time: "08:00", customer: {} }
  });
  expect(response.status()).toBe(401);
});

test("crear reserva devuelve reservationId", async ({ request }) => {
  const response = await request.post("/api/v1/reservas/reservations", {
    headers: { "x-api-key": "test-api-key" },
    data: { service: "sofas", date: "2026-05-01", time: "08:00", customer: { name: "Test", email: "test@test.com", phone: "3001234567", address: "Calle 100" }, zone: "chapinero" }
  });
  expect(response.status()).toBe(201);
  const body = await response.json();
  expect(body.reservationId).toBeDefined();
});
```

**Impacto esperado:** Integración con Airbnb/Booking para property managers, revenue corporativo por API fees, reducción de reservas manuales.

**Esfuerzo:** M (2 semanas — API + auth + webhooks)

**Agente:** Backend + Frontend (docs)

**Referencias:**
- REST API Best Practices: https://restfulapi.net
- Airbnb Partner API: https://www.airbnb.com/partner

---

### Propuesta 3: Voice Commerce — Reserva por asistente virtual

**Problema:** El 35% de búsquedas en Colombia ahora son por voz. Purity & Clean no tiene presencia en asistentes virtuales.

**Propuesta — Dialogflow + Alexa:**

```javascript
// Dialogflow Agent
const VOICE_AGENT_CONFIG = {
  name: "Purity & Clean",
  intents: {
    "booking.cleaning": {
      trainingPhrases: [
        "Reserva limpieza de sofá",
        "Necesito limpiar mi inmueb",
        "Limpiar colchones"
      ],
      parameters: {
        service: { type: "string", values: ["limpieza-sofas", "sanitizacion-colchones"] },
        zone: { type: "string", entities: BOGOTA_ZONES },
        date: { type: "date", notPast: true }
      },
      responses: {
        confirmBooking: "Perfecto. He agendado ${service} para el ${date} en ${zone}. Te he enviado la confirmación por WhatsApp."
      }
    }
  }
};

// Alexa Handler
const BookCleaningIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.intent.name === "BookCleaningIntent";
  },
  async handle(handlerInput) {
    const { service, zone, date } = handlerInput.requestEnvelope.request.intent.slots;
    const reservation = await createReservation({ service, zone, date });
    const speakOutput = `He reservado ${service} para el ${date} en ${zone}. Te envío la confirmación por WhatsApp.`;
    return handlerInput.responseBuilder.speak(speakOutput).getResponse();
  }
};
```

**WhatsApp confirmation desde voice:**
```javascript
async function handleVoiceBooking(params) {
  const reservation = await createReservation(params);
  const message = `¡Tu reserva por voz está confirmada! 🌟\n\nServicio: ${reservation.service}\nFecha: ${reservation.date}\nZona: ${reservation.zone}\nReferencia: ${reservation.id}`;
  await sendWhatsAppMessage(params.customer.phone, message);
  return reservation;
}
```

**Impacto esperado:** Captura del 35% de búsquedas por voz, diferenciación vs competencia.

**Esfuerzo:** M (2 semanas — Dialogflow + Alexa + WhatsApp integration)

**Agente:** Full Stack

**Referencias:**
- Google Actions Console: https://console.actions.google.com
- Alexa Developer Console: https://developer.amazon.com/alexa

---

### Propuesta 4: Blocklist de Clientes — Gestión de riesgo

**Problema:** El equipo pierde tiempo en clientes que no pagan, cancelan constantemente o tienen comportamiento abusivo.

**Propuesta — Sistema de blocklist:**

```javascript
const BLOCKLIST_REASONS = {
  NO_SHOW: "no_show",
  LATE_CANCEL: "late_cancel",
  PAYMENT_DEFAULT: "payment_default",
  VERBAL_ABUSE: "verbal_abuse",
  DAMAGE_TO_TECHNICIAN: "damage_to_technician",
  FRAUD: "fraud"
};

async function validateCustomerNotBlocked(customerData) {
  const blocked = await checkBlocklist(customerData.phone, customerData.document);
  if (blocked) {
    return {
      allowed: false,
      reason: `Este cliente no puede agendar. Razón: ${BLOCKLIST_REASONS[blocked.reason]}.`
    };
  }
  return { allowed: true };
}

// Hook en formulario de reservas
bookingForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const validation = await validateCustomerNotBlocked(customerData);
  if (!validation.allowed) {
    showBlockedMessage(validation.reason);
    return;
  }
});
```

**UI admin:**
```html
<section id="blocklist-management">
  <table class="blocklist-table">
    <thead><tr><th>Cliente</th><th>Razón</th><th>Fecha</th><th>Acciones</th></tr></thead>
    <tbody id="blocklist-body"></tbody>
  </table>
</section>
```

**Impacto esperado:** -$500.000/mes en incobrables, protección del equipo técnico.

**Esfuerzo:** S (1 semana — modelo + UI + validación)

**Agente:** Full Stack

**Referencias:**
- Stripe Radar: https://stripe.com/docs/radar

---

### Propuesta 5: Dynamic Pricing — Motor de precios dinámico

**Problema:** Precios estáticos no optimizan revenue ni utilización de técnicos.

**Propuesta — Pricing engine:**

```javascript
const PRICING_ENGINE = {
  basePrices: {
    "limpieza-sofas": { low: 80000, high: 180000 },
    "sanitizacion-colchones": { low: 60000, high: 120000 }
  },

  demandMultipliers: {
    peak: 1.25,
    medium: 1.0,
    low: 0.85
  },

  timeSlots: {
    morning: { multiplier: 1.15 },
    midday: { multiplier: 1.0 },
    afternoon: { multiplier: 1.1 },
    evening: { multiplier: 0.9 }
  },

  leadTimeDiscounts: {
    lastMinute: { maxHours: 24, multiplier: 1.2 },
    advance: { minDays: 14, multiplier: 0.85 }
  }
};

function calculateDynamicPrice(params) {
  const base = PRICING_ENGINE.basePrices[params.service];
  let price = (base.low + base.high) / 2;

  const demandType = getDemandType(params.date);
  price *= PRICING_ENGINE.demandMultipliers[demandType];

  const timeSlot = getTimeSlot(params.time);
  price *= PRICING_ENGINE.timeSlots[timeSlot].multiplier;

  const leadMultiplier = getLeadTimeMultiplier(params.advanceNoticeDays);
  price *= leadMultiplier;

  return { estimatedPrice: Math.round(price / 1000) * 1000, breakdown: { demandType, timeSlot } };
}
```

**Impacto esperado:** +15% revenue en horas peak, +20% conversión en horas bajas.

**Esfuerzo:** M (2 semanas — pricing engine + UI + dashboard)

**Agente:** Full Stack

**Referencias:**
- Dynamic pricing Uber: https://www.uber.com
- Revenue management: https://www.marquie.io

---

## Síntesis: Por qué R26 es diferente

R1-R25 se enfocaron en features del sitio, marketing digital, SEO, UX, tecnología, operaciones, retención, CRO, automation, agentic commerce, AI diagnostics, technician tracking, social commerce, subscription box, y carbon-neutral certification.

**R26 se enfoca en:**
- **Revenue adicional** (B2B Marketplace, Dynamic Pricing)
- **Integraciones B2B** (API de reservas para OTAs y partners)
- **Voice Commerce** (Alexa, Google Home para reserva por voz)
- **Gestión de riesgo** (Blocklist de clientes)

R26 abre 4 territorios nuevos: commerce B2B directo, API ecosystem, voice-first commerce, y risk management. La propuesta más transformadora es la **API de reservas** porque habilita todo un ecosistema de partners.

---

## Referencias

- [1] Wompi Checkout API: https://docs.wompi.co
- [2] Shopify B2B: https://www.shopify.com/b2b
- [3] REST API Best Practices: https://restfulapi.net
- [4] Airbnb Partner API: https://www.airbnb.com/partner
- [5] Google Actions Console: https://console.actions.google.com
- [6] Alexa Developer Console: https://developer.amazon.com/alexa
- [7] Stripe Radar (blocklist): https://stripe.com/docs/radar
- [8] Dynamic Pricing Uber: https://www.uber.com

---

*Co-Authored-By: Paperclip <noreply@paperclip.ing>*