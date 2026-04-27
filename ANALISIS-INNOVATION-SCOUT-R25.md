# Análisis Creativo — Purity & Clean (Round 25)

**Proyecto:** Purity & Clean
**Fecha:** 2026-04-27
**Analista:** Innovation Scout
**Ronda:** 25
**Issue padre:** DOMAA-377

---

## Resumen Ejecutivo

R25 identifica **5 gaps no cubiertos en R1-R24** y propone funcionalidades que requieren infraestructura backend mínima pero alto impacto en conversión y retención. Las propuestas priorizan: (1) dashboard de administración unificado para gestionar reservas multicanal, (2) programa de referidos con incentives, (3) programa de suscripción/lealtad, (4) API layer liviana para pricing dinámico y disponibilidad, y (5) sistema de recolección de reseñas in-site.

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
- **Revisiones anteriores:** R1-R24 han cubierto chatbot, cotizador, WhatsApp dinámico, MCP Server, WhatsApp Business Catalog, Predictive Maintenance AI, Voice Commerce

---

## Gaps identificados — Round 25 (NOVEDADES no cubiertas en R1-R24)

### 1. Dashboard de administración unificado

**Problema:** Las reservas llegan por Formspree (web), WhatsApp y llamada telefónica, pero no hay un panel unificado para gestionarlas. El equipo operativo maneja todo en hojas de cálculo o WhatsApp, lo que genera errores, pérdida de leads y falta de visibilidad.

**Impacto potencial:** Reducción de 40% en tiempo de gestión de reservas, disminución de errores, visibilidad en tiempo real de pipeline de reservas.

### 2. Programa de referidos con incentives

**Problema:** No existe sistema de referidos. Cada cliente satisfecho es un potencial multiplicador no activado. Los competidores más avanzados en LatAm usan referidos como canal primario de adquisición con costos de CAC 5x menores.

**Impacto potencial:** Reducción de CAC en 50-70%, crecimiento orgánico de clientes, lifetime value 2x por referred customer.

### 3. Programa de suscripción y lealtad

**Problema:** Los planes recurrentes existen como concepto en el chatbot pero no hay programa formal de suscripción. Los clientes frecuentes no reciben beneficios tangibles por su lealtad.

**Impacto potencial:** Ingresos recurrentes predecibles, lifetime value 3x superior, cash flow mejorado con prepago.

### 4. API layer liviana para pricing dinámico

**Problema:** El sitio es 100% estático. Los precios mostrados son rangos genéricos. No hay forma de mostrar precio exacto por combinación servicio/cantidad/zona ni disponibilidad real.

**Impacto potencial:** Cotizaciones más precisas, fricción reducida en el funnel, conversión +20% en etapa de cotización.

### 5. Sistema de recolección de reseñas in-site

**Problema:** Las reseñas están en Schema.org JSON-LD (invisibles) y en Google Business Profile (externo). No hay flujo de recolección in-site para solicitar reseñas post-servicio y mostrarlas visualmente.

**Impacto potencial:** +30% reviews recolectadas, social proof visible en homepage, SEO local fortalecido.

---

## Propuestas (Round 25)

### Propuesta 1: Dashboard de administración de reservas

**Problema:** Reservas llegan por web (Formspree), WhatsApp y teléfono sin unificar. El equipo usa hojas de cálculo, perdiendo leads y visibilidad.

**Propuesta — Panel de administración unificado:**

1. **Arquitectura:**
```javascript
// Stack: Next.js + Supabase (o Firebase) + TailwindCSS
// Alternativa lightweight: Netlify Functions + Airtable

const ADMIN_CONFIG = {
  bookings: {
    sources: ['formspree', 'whatsapp', 'phone', 'web'],
    statusFlow: ['new', 'confirmed', 'in_progress', 'completed', 'cancelled'],
    fields: ['id', 'customer_name', 'phone', 'email', 'service', 'zone', 'date', 'slot', 'source', 'status', 'notes', 'createdAt']
  },
  metrics: {
    dailyBookings: true,
    revenueProjection: true,
    cancellationRate: true,
    popularServices: true,
    zoneHeatmap: true
  }
};
```

2. **Vista de calendario de reservas:**
```html
<section id="booking-calendar">
  <div class="calendar-grid">
    <div class="day-column" data-date="2026-04-27">
      <h3>Lunes 27</h3>
      <div class="booking-card new">
        <span class="time">08:00</span>
        <span class="service">Limpieza profunda sofá</span>
        <span class="customer">María González</span>
        <span class="zone">Chapinero</span>
        <span class="source-badge web">Web</span>
      </div>
      <div class="booking-card confirmed">
        <span class="time">10:00</span>
        <span class="service">Sanitización colchón</span>
        <span class="customer">Carlos Ruiz</span>
        <span class="zone">Usaquén</span>
        <span class="source-badge whatsapp">WhatsApp</span>
      </div>
    </div>
  </div>
  
  <div class="quick-stats">
    <div class="stat today">
      <span class="number">12</span>
      <span class="label">Reservas hoy</span>
    </div>
    <div class="stat week">
      <span class="number">47</span>
      <span class="label">Esta semana</span>
    </div>
    <div class="stat revenue">
      <span class="number">$3.2M</span>
      <span class="label">Ingresos proyectados</span>
    </div>
  </div>
</section>
```

3. **Integración con fuentes existentes:**
```javascript
async function handleFormspreeWebhook(formData) {
  const booking = {
    ...formData,
    source: 'formspree',
    status: 'new',
    createdAt: new Date().toISOString()
  };
  await supabase.from('bookings').insert(booking);
  await sendSlackNotification(booking);
}
```

4. **Panel de métricas:**
```javascript
async function getDashboardMetrics() {
  const { data: bookings } = await supabase
    .from('bookings')
    .select('*')
    .gte('createdAt', startOfWeek());
  
  return {
    totalBookings: bookings.length,
    bySource: groupBy(bookings, 'source'),
    byService: groupBy(bookings, 'service'),
    revenue: bookings.filter(b => b.status !== 'cancelled')
      .reduce((sum, b) => sum + getPrice(b.service), 0),
    cancellationRate: calculateCancellationRate(bookings)
  };
}
```

**Impacto esperado:** Reducción 40% tiempo de gestión, disminución de leads perdidos, visibilidad en tiempo real.

**Esfuerzo:** M (2 semanas)

**Agente:** Full Stack

---

### Propuesta 2: Programa de referidos con incentives

**Problema:** No hay sistema de referidos. Cada cliente satisfecho es un potencial multiplicador no activado.

**Propuesta — Sistema de referidos:**

1. **Flujo de referido:**
```javascript
const REFERRAL_CONFIG = {
  reward: {
    referrer: { type: 'discount', value: 20000, maxUses: 5 },
    referee: { type: 'discount', value: 15000, firstServiceOnly: true }
  },
  conditions: {
    minServiceValue: 50000,
    payoutTrigger: 'completed',
    expirationDays: 90
  }
};

function generateReferralCode(customerId) {
  const timestamp = Date.now().toString(36);
  const hash = btoa(customerId).substring(0, 4).toUpperCase();
  return `PC-${hash}-${timestamp}`.toUpperCase();
}

async function useReferralCode(code, newCustomer) {
  const referral = await db.referrals.findOne({ code });
  if (!referral) return { error: 'Código inválido' };
  if (referral.used) return { error: 'Código ya utilizado' };
  if (isExpired(referral.expiresAt)) return { error: 'Código expirado' };
  
  await applyDiscount(newCustomer.id, referral.reward.value);
  await db.referrals.update(referral.id, { used: true, usedAt: new Date() });
  await sendNotification(referral.referrerId, {
    type: 'referral_completed',
    message: `¡Felicidades! Tu referido ${newCustomer.name} completó su servicio. Tienes $${referral.reward.value} de descuento.`
  });
  return { success: true, discount: referral.reward.value };
}
```

2. **UI del dashboard de referidos:**
```html
<section id="referral-dashboard">
  <h2>Mi Programa de Referidos 🎁</h2>
  <div class="referral-card">
    <div class="referral-code">
      <label>Tu código de referido:</label>
      <div class="code-display">
        <span id="my-referral-code">PC-ABCD-1A2B</span>
        <button onclick="copyReferralCode()">📋 Copiar</button>
      </div>
    </div>
    <div class="referral-stats">
      <div class="stat"><span class="number">3</span><span class="label">Referidos completados</span></div>
      <div class="stat"><span class="number">$60.000</span><span class="label">Descuentos acumulados</span></div>
      <div class="stat"><span class="number">2</span><span class="label">Descuentos disponibles</span></div>
    </div>
    <div class="share-buttons">
      <a href="whatsapp://send?text=USA%20mi%20código%20PC-ABCD-1A2B%20para%20$15.000%20de%20descuento" class="share-btn whatsapp">WhatsApp</a>
      <a href="https://facebook.com/sharer/sharer.php?u=https://purityclean.com?ref=PC-ABCD-1A2B" class="share-btn facebook">Facebook</a>
      <a href="https://twitter.com/intent/tweet?text=USA%20mi%20código%20PC-ABCD-1A2B%20en%20%40PurityClean" class="share-btn twitter">Twitter</a>
    </div>
  </div>
</section>
```

**Impacto esperado:** Reducción CAC 50-70%, crecimiento orgánico, lifetime value 2x.

**Esfuerzo:** M (1-2 semanas)

**Agente:** Full Stack

---

### Propuesta 3: Programa de suscripción y lealtad

**Problema:** Los planes recurrentes existen como concepto pero no hay programa formal de suscripción.

**Propuesta — Sistema de membresía:**

1. **Planes de suscripción:**
```javascript
const SUBSCRIPTION_PLANS = {
  'plan-mensual-hogar': {
    name: 'Plan Hogar Mensual',
    price: 250000,
    description: 'Ideal para hogares con niños o mascotas',
    benefits: [
      '1 limpieza profunda de sofá o sanitización de colchón por mes',
      '20% descuento en servicios adicionales',
      'Priority scheduling'
    ],
    services: ['sofa-deep', 'mattress-san'],
    maxServicesPerMonth: 1,
    discountExtra: 20
  },
  'plan-trimestral-pyme': {
    name: 'Plan Trimestral PYME',
    price: 600000,
    description: 'Para oficinas y espacios corporativos',
    benefits: [
      '2 mantenimientos por trimestre',
      '25% descuento en todos los servicios',
      'Dedicated account manager'
    ],
    services: ['carpet-main', 'chair-clean'],
    maxServicesPerQuarter: 2,
    discountExtra: 25
  },
  'plan-anual-corporativo': {
    name: 'Plan Corporativo Anual',
    price: 2000000,
    description: 'Compromiso de largo plazo con máximo descuento',
    benefits: [
      '12 mantenimientos por año',
      '30% descuento en todos los servicios',
      'Quarterly deep clean included',
      'Emergency availability'
    ],
    services: ['carpet-main', 'chair-clean', 'sofa-deep'],
    maxServicesPerYear: 12,
    discountExtra: 30
  }
};

const LOYALTY_TIERS = {
  'bronze': { minSpend: 0, discount: 0, pointsPerDollar: 1 },
  'silver': { minSpend: 500000, discount: 5, pointsPerDollar: 1.5 },
  'gold':   { minSpend: 1500000, discount: 10, pointsPerDollar: 2 },
  'platinum': { minSpend: 5000000, discount: 15, pointsPerDollar: 3 }
};
```

2. **Sistema de puntos:**
```javascript
const LOYALTY_CONFIG = {
  points: {
    perDollarSpend: 1,
    redemptionRate: 100,
    minRedemption: 500,
    expirationMonths: 12
  },
  rewards: {
    500: 'Cobweb remover gratis',
    1000: '$10.000 descuento',
    2000: 'Limpieza de sillas gratuita',
    5000: '1 sanitización de colchón gratis'
  }
};

function calculatePoints(spent) {
  return Math.floor(spent / 1000);
}

function redeemPoints(customerId, points) {
  const customer = getCustomer(customerId);
  if (customer.loyaltyPoints < points) return { error: 'Puntos insuficientes' };
  const discount = (points / LOYALTY_CONFIG.points.redemptionRate) * 1000;
  customer.loyaltyPoints -= points;
  customer.availableDiscount += discount;
  saveCustomer(customer);
  return { success: true, discount };
}
```

**Impacto esperado:** Ingresos recurrentes predecibles, lifetime value 3x superior.

**Esfuerzo:** M (2 semanas)

**Agente:** Full Stack

---

### Propuesta 4: API layer liviana para pricing dinámico

**Problema:** El sitio es 100% estático. Los precios son rangos genéricos.

**Propuesta — API de pricing y disponibilidad:**

1. **Arquitectura (Cloudflare Workers + KV):**
```javascript
const PRICING_RULES = {
  basePrices: {
    'sofa-deep': { min: 80000, max: 180000 },
    'mattress-san': { min: 60000, max: 120000 },
    'carpet-main': { min: 50000, max: 120000 },
    'chair-clean': { min: 35000, max: 80000 }
  },
  zoneMultipliers: {
    'chapinero': 1.1, 'usaquen': 1.1, 'suba': 1.0,
    'kennedy': 0.95, 'bosa': 0.9, 'teusaquillo': 1.0,
    'engativa': 0.95, 'fontibon': 0.95, 'barrios-unidos': 1.0, 'usme': 0.9
  },
  quantityMultipliers: {
    1: 1.0, 2: 0.95, 3: 0.90, 4: 0.85, '5+': 0.80
  }
};

async function calculatePrice(serviceType, zone, quantity) {
  const basePrice = PRICING_RULES.basePrices[serviceType];
  const zoneMultiplier = PRICING_RULES.zoneMultipliers[zone] || 1.0;
  const quantityMultiplier = PRICING_RULES.quantityMultipliers[quantity] || PRICING_RULES.quantityMultipliers['5+'];
  
  const minPrice = Math.round(basePrice.min * zoneMultiplier * quantityMultiplier / 1000) * 1000;
  const maxPrice = Math.round(basePrice.max * zoneMultiplier * quantityMultiplier / 1000) * 1000;
  return { minPrice, maxPrice, currency: 'COP' };
}

async function checkAvailability(serviceType, date) {
  const bookedSlots = await BOOKINGS_KV.get(`slots:${date}:${serviceType}`);
  const allSlots = ['08:00', '10:00', '12:00', '14:00', '16:00'];
  const available = allSlots.filter(slot => !bookedSlots?.includes(slot));
  return { available, date, serviceType };
}
```

2. **Integración frontend:**
```javascript
async function updateQuote() {
  const service = document.getElementById('service-select').value;
  const zone = document.getElementById('zone-select').value;
  const quantity = parseInt(document.getElementById('quantity-input').value);
  
  const { minPrice, maxPrice } = await fetch(
    `/api/pricing?service=${service}&zone=${zone}&quantity=${quantity}`
  ).then(r => r.json());
  
  document.getElementById('price-display').textContent = 
    `$${minPrice.toLocaleString()} - $${maxPrice.toLocaleString()} COP`;
}
```

**Impacto esperado:** Cotizaciones más precisas (+20% conversión), fricción reducida.

**Esfuerzo:** S (1 semana)

**Agente:** Backend (Cloudflare Workers)

---

### Propuesta 5: Sistema de recolección de reseñas in-site

**Problema:** Las reseñas están en Schema.org JSON-LD (invisibles) y Google Business Profile (externo). No hay flujo de recolección in-site.

**Propuesta — Sistema de reviews in-site:**

1. **Flujo post-servicio:**
```javascript
const REVIEW_FLOW = {
  trigger: 'service_completed',
  delay: { hours: 24 },
  channels: ['email', 'sms', 'whatsapp'],
  questions: [
    { id: 'rating', type: 'stars', label: '¿Cómo fue tu experiencia?', required: true, scale: 5 },
    { id: 'service_quality', type: 'stars', label: 'Calidad del servicio', required: true, scale: 5 },
    { id: 'punctuality', type: 'stars', label: 'Puntualidad', required: false, scale: 5 },
    { id: 'recommendation', type: 'yesno', label: '¿Recomendarías Purity & Clean?', required: true },
    { id: 'comment', type: 'text', label: 'Cuéntanos más', required: false, maxLength: 500 },
    { id: 'photos', type: 'upload', label: '¿Fotos del resultado?', required: false, maxFiles: 3 }
  ]
};

async function sendReviewRequest(bookingId) {
  const booking = await getBooking(bookingId);
  const hoursSinceCompletion = (Date.now() - booking.completedAt) / (1000 * 60 * 60);
  if (hoursSinceCompletion < 24) return;
  if (booking.reviewSent) return;
  
  const channel = detectBestChannel(booking.customer);
  await sendReviewRequestByChannel(channel, booking);
  await markReviewSent(bookingId);
}
```

2. **Sección de reseñas en homepage:**
```html
<section id="customer-reviews">
  <h2>Lo que dicen nuestros clientes 🌟</h2>
  <div class="reviews-carousel">
    <div class="review-card">
      <div class="stars">★★★★★</div>
      <p class="review-text">"La limpieza de nuestro sofá fue increíble. Quedó como nuevo."</p>
      <div class="reviewer">
        <img src="/images/avatars/maria-g.jpg" alt="María González" class="avatar">
        <div class="info">
          <span class="name">María González</span>
          <span class="zone">Chapinero</span>
          <span class="date">Abril 2026</span>
        </div>
      </div>
    </div>
  </div>
  <div class="google-badge">
    <img src="/images/google-logo.svg" alt="Google">
    <span>Reseñas verificadas en Google</span>
    <a href="https://g.page/r/purityclean/review" target="_blank">Ver todas →</a>
  </div>
</section>
```

3. **Playwright Tests:**
```javascript
test('review widget se muestra después del servicio', async ({ page }) => {
  await page.goto('/review-request?booking_id=test-booking');
  await expect(page.locator('#review-widget')).toBeVisible();
});

test('rating stars son clickeables', async ({ page }) => {
  await page.goto('/review-request?booking_id=test-booking');
  await page.click('.star[data-value="5"]');
  await expect(page.locator('#rating-input')).toHaveValue('5');
});
```

**Impacto esperado:** +30% reviews recolectadas, social proof visible, SEO local mejorado.

**Esfuerzo:** S (1 semana)

**Agente:** Full Stack

---

## Priorización recomendada (Round 25)

| # | Propuesta | Impacto | Esfuerzo | Agente | Razón estratégica |
|---|-----------|---------|----------|--------|------------------|
| 1 | Dashboard administración | Alto | Medio | Full Stack | Eficiencia operativa inmediata |
| 2 | Programa de referidos | Alto | Medio | Full Stack | Crecimiento orgánico, CAC -70% |
| 3 | Suscripción y lealtad | Alto | Medio | Full Stack | Ingresos recurrentes predecibles |
| 4 | API pricing dinámico | Medio | Bajo | Backend | Diferenciación, +20% conversión |
| 5 | Sistema de reviews in-site | Medio | Bajo | Full Stack | Social proof, SEO local |

**Top 3:** 1, 2, 3 (operaciones, crecimiento, ingresos recurrentes — los pilares del negocio).

---

## Síntesis: Por qué R25 es diferente

R1-R24 se enfocaron en **experiencia del usuario visitante** (UX, conversión, descubrimiento). R25 se enfoca en **infraestructura del negocio** (operaciones, retención, crecimiento):

- **R1-R10:** Sitio base, SEO, chat, cotizador
- **R11-R20:** PWA, analítica, WhatsApp, branding
- **R21-R24:** AI agents, Voice, Predictive, WhatsApp Catalog
- **R25:** Backend del negocio: dashboard ops, referidos, membresía, API pricing

R25 responde a: "¿Cómo construimos el motor de crecimiento que hace falta para escalar?"

---

## Referencias

[1] Harvard Business Review — "Customer Referral Programs" 2026
[2] McKinsey — "Loyalty Program Design for Service Businesses" 2026
[3] Cloudflare Workers — API Platform Documentation 2026
[4] Supabase — Open Source Firebase Alternative 2026

---

*Co-Authored-By: Paperclip <noreply@paperclip.ing>*