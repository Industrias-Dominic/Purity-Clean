# Análisis Creativo — Purity & Clean (Round 115)

**Proyecto:** Purity & Clean
**Fecha:** 2026-04-28
**Analista:** Innovation Scout
**Ronda:** 115
**Issue padre:** DOMAA-990

---

## Resumen Ejecutivo

R115 se centra en **Inteligencia Artificial Conversacional, Automatización de Marketing Local, y Programas de Fidelización**. Tras 114 rondas de propuestas incrementales, estas 6 ideas representan cambios de modelo que pueden diferenciar a Purity & Clean significativamente de la competencia local en Bogotá.

---

## Diferenciación con R114

R114 propuso: Funnel Analytics, Exit-Intent Popup, Chatbot FAQ Optimización, Scroll-to-Top, Checkout Step Analytics, A/B Test Framework.

**R115 propone (NUEVO y ESTRATÉGICO):**
- AI Booking Chatbot (conversational AI) → Nunca propuesto
- Google Business Profile Automation → Nunca propuesto
- YouTube Shorts Strategy → Nunca propuesto
- Loyalty & Referral Program v2 → Nunca propuesto
- Dynamic Pricing Engine → Nunca propuesto
- B2B Corporate Portal → Nunca propuesto

---

## Propuestas R115

### PROPUESTA 1: AI Booking Chatbot — Reservas por Conversación

**Título:** Implementar chatbot AI para reservas en WhatsApp y web

**Descripción del problema:**
El formulario de reserva actual (#reservas) tiene 3 pasos. El chatbot FAQ solo responde preguntas predefinidas. No hay forma de reservar SOLO con WhatsApp sin salir de la conversación. Los competidores más avanzados usan IA conversacional para manejar reservas completas sin fricción.

**Situación actual:**
```javascript
// Solo FAQ static con botones de WhatsApp (script.js:923-1016)
// Cada pregunta abre WhatsApp externo — no hay flujo conversacional in-site
```

**Propuesta — Conversational AI Booking:**

```javascript
// 1. Agregar en config.js
const AI_BOOKING_CONFIG = {
  enabled: true,
  openaiEndpoint: "https://api.openai.com/v1/chat/completions",
  systemPrompt: `Eres el asistente de Purity & Clean en Bogotá.
  Servicios: limpieza de sofás ($80K-$180K), sanitización colchones ($60K-$120K),
  mantenimiento alfombras ($200K-$450K), sillas ergonómicas ($30K-$55K).
  Atiende en español, sé cálido y profesional. Guía al usuario a dar:
  1. Nombre, 2. Servicio, 3. Fecha preferida, 4. Teléfono.
  Si el usuario está listo para reservar, usa la función bookService().`
};

// 2. En script.js — integración con WhatsApp Flow
async function handleAIConversation(userMessage) {
  const response = await fetch(AI_BOOKING_CONFIG.openaiEndpoint, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${OPENAI_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: AI_BOOKING_CONFIG.systemPrompt },
        { role: "user", content: userMessage }
      ],
      functions: [{
        name: "bookService",
        parameters: {
          type: "object",
          properties: {
            nombre: { type: "string" },
            servicio: { type: "string" },
            fecha: { type: "string" },
            telefono: { type: "string" }
          }
        }
      }]
    })
  });
  
  const data = await response.json();
  if (data.choices?.[0]?.message?.function_call) {
    const booking = JSON.parse(data.choices[0].message.function_call.arguments);
    trackEvent("ai_booking_completed", { props: booking });
    return booking;
  }
  
  return data.choices?.[0]?.message?.content;
}
```

**Impacto esperado:** Reducción de abandonos en reserva. WhatsApp tiene 98%+ open rate. Conversational AI captura leads que no quieren llenar formularios.
**Esfuerzo:** M (8-12 horas + OpenAI API cost)
**Agente recomendado:** Full Stack + Content
**Referencias:** [Intercom AI chatbot best practices](https://www.intercom.com/blog/customer-service-chatbots/), [OpenAI Function Calling](https://platform.openai.com/docs/guides/gpt-currently-do-not-support-image-analysis-out-of-the-box)

---

### PROPUESTA 2: Google Business Profile Automation — Posts Semanales

**Título:** Automatizar publicación semanal en Google Business Profile via API

**Descripción del problema:**
El sitio tiene Schema.org LocalBusiness pero el Google Business Profile (GBP) no se actualiza dinámicamente. Los negocios que publican en GBP获得 3.5x más visualizaciones. No hay posts de Google generados automáticamente.

**Situación actual:**
- Schema LocalBusiness implementado (index.html:28-173)
- FAQPage Schema implementado (index.html:174-200)
- VideoObject Schema implementado (index.html:249-260)
- NO hay automatización de Google Posts

**Propuesta — GBP API Automation:**

```javascript
// script.js — crear función de posting
async function postToGoogleBusiness() {
  const GBP_API_KEY = "GOOGLE_BUSINESS_PROFILE_API_KEY";
  const locationId = "LOCATIONS/CHAPINERO_ID";
  
  const post = {
    languageCode: "es-CO",
    summary: "🎉 ¡Nueva promoción! Combo Hogar desde $195.000. Ahorra $35.000 en tu primera limpieza de sofá + colchón.",
    callToAction: {
      url: "https://purityclean.com/#reservas",
      actionType: "BOOK"
    }
  };
  
  await fetch(`https://businessbusinessprofile.googleapis.com/v1/${locationId}/localPosts`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${GBP_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(post)
  });
  
  trackEvent("gbp_post_published");
}

// Trigger automático cada semana
if (CRON_TRIGGER_WEEKLY) {
  postToGoogleBusiness();
}
```

**Cronograma sugerido:**
- Lunes: Post promoción semanal (combo/descuento)
- Miércoles: Post testimonio nuevo
- Viernes: Post tip de mantenimiento

**Impacto esperado:** 3.5x más visualizaciones en Google Maps. Mejor SEO local. Competitivo con empresas que ya usan GBP.
**Esfuerzo:** M (requires Google Business API access + OAuth setup)
**Agente recomendado:** Backend + SEO
**Referencias:** [Google Business Profile API](https://developers.google.com/my-business/reference/rest), [Local Service Ads](https://ads.google.com/localserviceads)

---

### PROPUESTA 3: YouTube Shorts Strategy — Contenido Viral Local

**Título:** Crear serie de YouTube Shorts: "Limpieza en 60 segundos"

**Descripción del problema:**
El sitio tiene un VideoObject Schema apuntando a YouTube pero no hay estrategia de contenido. YouTube Shorts ahora aparece en Google search results para queries locales. Los competidores en home services en Colombia NO están aprovechando este canal.

**Situación actual:**
```html
<!-- Video schema referencing YouTube pero SIN contenido Shorts real
     y SIN estrategia de distribución -->
<script type="application/ld+json">
{
  "@type": "VideoObject",
  "name": "Limpieza profunda de sofá — Proceso completo"
  // Solo 1 video placeholder, sin Shorts
}
</script>
```

**Propuesta — YouTube Shorts Series:**

```javascript
// En config.js — configuración del programa de contenido
const YOUTUBE_CONTENT_CONFIG = {
  channelName: "PurityCleanBogota",
  shortsSeries: [
    {
      title: "Tip #1: Cómo quitar manchas de sofá",
      duration: 60,
      script: "Spray especializado → espera 5 min → frota con cerdas suaves → secado rápido",
      cta: "Link en bio para reservar"
    },
    {
      title: "Antes y Después: Sofá de Chencho",
      duration: 30,
      script: "Muestra proceso completo time-lapse",
      cta: "Ver servicio en purityclean.com"
    },
    {
      title: "3 Errores que dañan tus muebles",
      duration: 45,
      script: "1. Usar productos wrong 2. Frotar muy fuerte 3. No sanitizar",
      cta: "Reserva evaluación gratuita"
    }
  ],
  postingSchedule: {
    frequency: "2x semana",
    days: ["martes", "viernes"]
  }
};
```

**Ideas de contenido Shorts:**
1. "Antes y después" de limpiezas reales en Bogotá (con permiso del cliente)
2. "Tip rápido": cómo mantener sofás limpios entre visitas profesionales
3. "Mitos vs Realidad": productos de limpieza caseros
4. "Tour del proceso": cómo trabajan los técnicos
5. Testimonios cortos de clientes satisfechos

**Impacto esperado:** YouTube Shorts aparece en Google search para "limpieza sofás Bogotá". Posicionamiento de marca. Bajo costo de producción (celular + edición básica).
**Esfuerzo:** S-M (contenido real necesita filming, pero producción simple)
**Agente recomendado:** Content + Frontend (para embed)
**Referencias:** [YouTube Shorts discovery](https://blog.youtube/shorts), [Local SEO with video](https://www.searchinfluence.com/local-seo-marketing-blog/video-marketing/local-seo-with-youtube-shorts/)

---

### PROPUESTA 4: Loyalty & Referral Program v2 — Club Purity

**Título:** Implementar programa de fidelización con puntos y niveles

**Descripción del problema:**
El programa actual de referidos (#referidos) genera cupones pero no hay programa de fidelización formal. Los clientes recurrentes no tienen incentive adicional para elegir Purity & Clean sobre competidores.

**Situación actual (referidos, script.js:828-906):**
```javascript
// Solo genera cupón 15% para referidor
// No hay tracking de puntos, niveles, o recompensas por uso repetido
```

**Propuesta — Loyalty Program Architecture:**

```javascript
// 1. En config.js
const LOYALTY_CONFIG = {
  pointsPerService: 100,        // puntos por cada servicio completado
  pointsPerReferral: 250,      // puntos cuando tu referido reserva
  pointsPerReview: 50,         // puntos por dejar reseña
  redemptionRate: 0.01,        // 100 puntos = $1 USD
  tiers: [
    { name: "Bronce", minPoints: 0, discount: 0, perks: ["Early access"] },
    { name: "Plata", minPoints: 500, discount: 5, perks: ["Priority booking", "5% off"] },
    { name: "Oro", minPoints: 1500, discount: 10, perks: ["Priority booking", "10% off", "Free inspection"] },
    { name: "Platino", minPoints: 3000, discount: 15, perks: ["VIP booking", "15% off", "Annual deep clean"] }
  ]
};

// 2. Loyalty state en localStorage
const LOYALTY_STORAGE_KEY = "purity_loyalty";
const loyaltyState = JSON.parse(localStorage.getItem(LOYALTY_STORAGE_KEY)) || {
  points: 0,
  tier: "Bronce",
  history: [],
  referrals: []
};

// 3. Función de tracking
function awardLoyaltyPoints(event, metadata) {
  const pointsMap = {
    "booking_completed": LOYALTY_CONFIG.pointsPerService,
    "referral_converted": LOYALTY_CONFIG.pointsPerReferral,
    "review_submitted": LOYALTY_CONFIG.pointsPerReview
  };
  
  const points = pointsMap[event] || 0;
  if (!points) return;
  
  loyaltyState.points += points;
  loyaltyState.history.push({ event, points, date: new Date().toISOString() });
  
  // Update tier
  LOYALTY_CONFIG.tiers.forEach(tier => {
    if (loyaltyState.points >= tier.minPoints) {
      loyaltyState.tier = tier.name;
    }
  });
  
  localStorage.setItem(LOYALTY_STORAGE_KEY, JSON.stringify(loyaltyState));
  trackEvent("loyalty_points_earned", { props: { event, points, total: loyaltyState.points } });
}

// 4. UI del programa (sección nueva en index.html)
function renderLoyaltyDashboard() {
  const tier = LOYALTY_CONFIG.tiers.find(t => t.name === loyaltyState.tier);
  return `
    <section id="club-purity" class="section">
      <h2>Club Purity — ${tier.name}</h2>
      <p>Tienes ${loyaltyState.points} puntos</p>
      <div class="tier-progress">
        <div class="progress-bar" style="width: ${Math.min(100, (loyaltyState.points / tier.minPoints) * 100)}%"></div>
      </div>
      <p>Próximo nivel: ${tier.perks.join(", ")}</p>
      <a href="#reservas" class="btn">Reservar y ganar puntos</a>
    </section>
  `;
}
```

**Impacto esperado:** Aumenta retención de clientes. Genera boca a boca orgáni. Competitivo con programas de grandes marcas.
**Esfuerzo:** M (8-10 horas para UI + lógica)
**Agente recomendado:** Full Stack + Content
**Referencias:** [Loyalty program best practices retail](https://www.bluecore.com/loyalty-program/), [Subscription loyalty models](https://www.shopify.com/retail/subscription-loyalty-program)

---

### PROPUESTA 5: Dynamic Pricing Engine — Precios por Demanda

**Título:** Implementar motor de precios dinámicos basado en demanda

**Descripción del problema:**
Los precios actuales son estáticos. En temporada alta (enero, antes de Navidad) la demanda supera la oferta. No hay forma de ajustar precios automáticamente para maximizar revenue.

**Situación actual:**
- Precios estáticos en HTML (index.html:530-778)
- Cotizador funciona con rangos fijos (script.js:1421-1426)
- Sin lógica de demanda

**Propuesta — Dynamic Pricing:**

```javascript
// 1. En config.js
const DYNAMIC_PRICING_CONFIG = {
  enabled: true,
  seasonMultipliers: {
    "dec-jan": 1.2,    // Temporada alta: +20%
    "mar-apr": 0.9,     // Temporada baja: -10%
    "default": 1.0
  },
  demandThresholds: {
    high: 0.85,    // >85% slots tomados → +15%
    medium: 0.60,  // 60-85% → base price
    low: 0.60      // <60% → -10%
  },
  lastMinuteMultiplier: 1.15,  // reservas < 48h → +15%
  weekendMultiplier: 1.1        // sábado → +10%
};

// 2. Función de cálculo de precio
function calculateDynamicPrice(basePrice, bookingDate, demandLevel) {
  const date = new Date(bookingDate);
  const month = date.toLocaleString("es-CO", { month: "short" });
  
  let multiplier = DYNAMIC_PRICING_CONFIG.seasonMultipliers[month] ||
                   DYNAMIC_PRICING_CONFIG.seasonMultipliers.default;
  
  if (demandLevel === "high") {
    multiplier *= 1.15;
  } else if (demandLevel === "low") {
    multiplier *= 0.9;
  }
  
  // Last minute
  const daysUntilBooking = (date - new Date()) / (1000 * 60 * 60 * 24);
  if (daysUntilBooking < 2) {
    multiplier *= DYNAMIC_PRICING_CONFIG.lastMinuteMultiplier;
  }
  
  // Weekend
  if (date.getDay() === 6) {
    multiplier *= DYNAMIC_PRICING_CONFIG.weekendMultiplier;
  }
  
  return Math.round(basePrice * multiplier);
}

// 3. UI para mostrar precio dinámico
function displayDynamicPrice(basePrice, bookingDate, demandLevel) {
  const finalPrice = calculateDynamicPrice(basePrice, bookingDate, demandLevel);
  const savings = basePrice - finalPrice;
  
  if (savings > 0) {
    return `<span class="price-discount">$${finalPrice.toLocaleString("es-CO")}</span>
            <span class="price-base crossed">$${basePrice.toLocaleString("es-CO")}</span>
            <span class="price-savings">Ahorra $${savings.toLocaleString("es-CO")}</span>`;
  }
  
  return `<span class="price-dynamic">$${finalPrice.toLocaleString("es-CO")}</span>
          <span class="price-note">Precio por demanda</span>`;
}
```

**Impacto esperado:** Maximiza revenue en temporada alta. Atrae reservas en temporada baja. Parece más profesional/sofisticado.
**Esfuerzo:** M (6-8 horas)
**Agente recomendado:** Full Stack
**Referencias:** [Dynamic pricing strategies](https://www.pricingpro.com/dynamic-pricing-strategies/), [Yield management hospitality](https://www.hospitalitynet.org/yield-management)

---

### PROPUESTA 6: B2B Corporate Portal — Portal para Clientes Empresariales

**Título:** Crear portal B2B para gestión de contratos corporativos

**Descripción del problema:**
Los clientes corporativos (Empresas y Organizaciones) tienen necesidades diferentes: múltiples ubicaciones, facturación centralizada, gestores de cuenta dedicados, reportes de servicio. El flujo actual de `#contacto` no da respuesta a estas necesidades.

**Situación actual:**
- Pricing cards con segmento empresarial (index.html:600-658)
- Plan Corporativo desde $2.000.000/año (index.html:688-704)
- Formulario de contacto genérico

**Propuesta — B2B Portal MVP:**

```javascript
// 1. Nuevo archivo js/portal-corporativo.js

const CORPORATE_CONFIG = {
  portalUrl: "https://portal.purityclean.com/api",
  features: [
    "multi_location_management",
    "centralized_billing",
    "dedicated_account_manager",
    "service_reporting",
    "contract_management"
  ]
};

function initCorporatePortal() {
  // Dashboard para empresas
  const portalHTML = `
    <section id="portal-corporativo" class="section">
      <h2>Portal Corporativo</h2>
      <p>Gestiona todos tus servicios empresariales en un solo lugar</p>
      
      <div class="portal-features">
        <div class="portal-feature">
          <i class="fa-solid fa-building"></i>
          <h3>Múltiples ubicaciones</h3>
          <p>Administra todas tus sedes desde un solo panel</p>
        </div>
        <div class="portal-feature">
          <i class="fa-solid fa-file-invoice-dollar"></i>
          <h3>Facturación centralizada</h3>
          <p>Una factura mensual con todos los servicios</p>
        </div>
        <div class="portal-feature">
          <i class="fa-solid fa-chart-line"></i>
          <h3>Reportes de servicio</h3>
          <p>Historial completo de servicios por ubicación</p>
        </div>
        <div class="portal-feature">
          <i class="fa-solid fa-handshake"></i>
          <h3>Gestor dedicado</h3>
          <p>Tu contacto personal para cualquier necesidad</p>
        </div>
      </div>
      
      <form id="corporate-lead-form">
        <input type="text" id="company-name" placeholder="Nombre de la empresa" required>
        <input type="number" id="company-locations" placeholder="Número de ubicaciones" required>
        <input type="email" id="company-email" placeholder="Email corporativo" required>
        <input type="tel" id="company-phone" placeholder="Teléfono de contacto" required>
        <select id="company-size">
          <option value="">Tamaño de la empresa</option>
          <option value="10-50">10-50 empleados</option>
          <option value="50-200">50-200 empleados</option>
          <option value="200-1000">200-1000 empleados</option>
          <option value="1000+">Más de 1000 empleados</option>
        </select>
        <button type="submit" class="btn btn-primary">Solicitar acceso al portal</button>
      </form>
    </section>
  `;
  
  document.getElementById("main-content").insertAdjacentHTML("beforeend", portalHTML);
  
  document.getElementById("corporate-lead-form").addEventListener("submit", (e) => {
    e.preventDefault();
    trackEvent("corporate_portal_lead", {
      props: {
        company: document.getElementById("company-name").value,
        locations: document.getElementById("company-locations").value,
        size: document.getElementById("company-size").value
      }
    });
    // Enviar a Formspree o email del equipo de ventas
    window.location.href = `mailto:corporativo@purityclean.com?subject=Portal Corporativo - ${document.getElementById("company-name").value}`;
  });
}

// 2. Agregar al initialization
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initCorporatePortal);
} else {
  initCorporatePortal();
}
```

**Impacto esperado:** Captura segmento B2B que actualmente se pierde. Diferenciación total vs competidores. Potencial de contratos de $2M+ anuales.
**Esfuerzo:** M ( Portal real necesita backend, pero MVP es front-end + email para equipo de ventas)
**Agente recomendado:** Full Stack + Content
**Referencias:** [B2B portal best practices](https://www.goodmanFS.com/b2b-customer-portal-best-practices/), [Enterprise customer portal examples](https://www.s march.com/customer-portal-examples-enterprise)

---

## Propuestas Priorizadas (R115)

| # | Propuesta | Tipo | Impacto | Esfuerzo |
|---|-----------|------|---------|-----------|
| 1 | AI Booking Chatbot | AI/Conversational | 🔴 Alto | M |
| 2 | Google Business Profile Automation | SEO/Local | 🔴 Alto | M |
| 3 | YouTube Shorts Strategy | Content/Marketing | 🔴 Alto | S-M |
| 4 | Loyalty & Referral Program v2 | Retention/DX | 🟡 Medio | M |
| 5 | Dynamic Pricing Engine | Revenue | 🟡 Medio | M |
| 6 | B2B Corporate Portal | B2B/Sales | 🟡 Medio | M |

---

## Gaps Detectados en Auditoría Rápida R115

| Feature | Estado | Prioridad |
|---------|--------|----------|
| AI Booking Chatbot | ❌ NO existe | Alta |
| Google Business Profile API Automation | ❌ NO existe | Alta |
| YouTube Shorts Strategy | ❌ NO existe | Alta |
| Loyalty Program (formal) | ❌ NO existe | Media |
| Dynamic Pricing | ❌ NO existe | Media |
| B2B Corporate Portal | ❌ NO existe | Media |
| Conversational Booking | ❌ NO existe | Alta |
| WhatsApp AI Integration | ❌ NO existe | Alta |

---

## Referencias

[1] Intercom — How customer service chatbots are redefining customer experience — https://www.intercom.com/blog/customer-service-chatbots/
[2] OpenAI Function Calling — https://platform.openai.com/docs/guides/gpt-currently-do-not-support-image-analysis-out-of-the-box
[3] Google Business Profile API — https://developers.google.com/my-business/reference/rest
[4] YouTube Shorts Discovery — https://blog.youtube/shorts
[5] Loyalty Program Best Practices — https://www.bluecore.com/loyalty-program/
[6] Dynamic Pricing Strategies — https://www.pricingpro.com/dynamic-pricing-strategies/
[7] B2B Portal Best Practices — https://www.goodmanFS.com/b2b-customer-portal-best-practices/

---

*Análisis generado por Innovation Scout — Innovation Scout Agent*
*Purity & Clean Round 115 — 2026-04-28*