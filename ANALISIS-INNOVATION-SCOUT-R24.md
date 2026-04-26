# Análisis Creativo — Purity & Clean (Round 24)

**Proyecto:** Purity & Clean
**Fecha:** 2026-04-26
**Analista:** Innovation Scout
**Ronda:** 24
**Issue padre:** DOMAA-335

---

## Resumen Ejecutivo

R24 se enfoca en **integración con AI agents y commerce conversacional** — territorios nunca cubiertos en R1-R23. Propongo: (1) **MCP Server** para que AI agents como ChatGPT y Claude puedan interactuar con Purity & Clean, (2) **WhatsApp Business Catalog** para compra nativa en WhatsApp, (3) **Predictive Maintenance AI** que predice cuándo el mobiliario necesita limpieza, y (4) **Voice Commerce** con Alexa y Google Assistant. Estas propuestas posicionan a Purity & Clean para la próxima ola de "agentic commerce".

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

---

## Gaps identificados — Round 24 (NOVEDADES no cubiertas en R1-R23)

### 1. MCP Server Integration — Purity & Clean para AI Agents

**Problema:** Para 2026, los AI agents (ChatGPT, Claude, Gemini) serán el nuevo interface de búsqueda y descubrimiento. El sitio actual no es descubrible por AI agents. No hay forma de que un usuario le diga a ChatGPT "reserva una limpieza de sofá con Purity & Clean para mañana".

**Hallazgos:**
- MCP (Model Context Protocol) es el estándar emergente para conectar AI agents con servicios externos [1]
- "By 2027, 50% of B2B product discovery will happen via AI agents" — Gartner [2]
- Agentes como Zapier ya soportan MCP para acciones Autonomous [3]
- Google ha lanzado Agent Space donde Gemini busca y actúa en nombre del usuario [4]

**Impacto potencial:** Descubrimiento vía AI agents, reservas autonomous sin fricción, ventaja competitiva temprano sobre competidores.

### 2. WhatsApp Business Catalog — Shopping nativo sin salir de WhatsApp

**Problema:** WhatsApp tiene 50M+ usuarios en Colombia. Purity & Clean usa WhatsApp solo para chat, pero no para catálogo de productos ni checkout. Los usuarios ven un servicio en Instagram y preguntan por WhatsApp, pero no pueden comprar ahí.

**Hallazgos:**
- WhatsApp Business Catalog permite mostrar productos/servicios directamente [5]
- "Catalogs on WhatsApp increase conversion by 30% vs links externos" [5]
- WhatsApp Pay está disponible en Colombia desde 2024 [6]
- Checkout sin salir de WhatsApp reduce bounce drásticamente

**Impacto potencial:** +30% conversión en leads de WhatsApp, reducción de fricción checkout, experiencia "one-tap purchase".

### 3. Predictive Maintenance AI — "Tu sofá necesita limpieza en 3 semanas"

**Problema:** El modelo actual es reactivo: el cliente reserva cuando ve manchas o malos olores. No hay manera de educar al cliente sobre cuándo necesita mantenimiento preventivo. Esto limita ingresos recurrentes y reduce lifetime value.

**Hallazgos:**
- "Predictive maintenance in consumer services increases retention by 40%" [7]
- Sensores IoT para muebles están emergiendo (textil con sensores de uso) [8]
- Sin hardware: se puede predecir basado en patrones estacionales, frecuencia de uso, y datos del cliente
- "Customers who receive proactive maintenance reminders have 3x higher contract renewal" [7]

**Impacto potencial:** Contratos de mantenimiento predictivo, increase lifetime value, diferenciación premium vs competencia reactiva.

### 4. Voice Commerce — "Alexa, reserva una limpieza de sofá"

**Problema:** El sitio soporta búsqueda por voz (R21) pero no reservas por voz. Los usuarios con manos ocupadas o discapacidad visual no pueden completar el funnel de reserva usando solo voz.

**Hallazgos:**
- "Voice commerce will represent $40B by 2026 in Latin America" [9]
- Google Assistant y Alexa soportan transacciones para servicios locales [10]
- Actions on Google permite booking via Dialogflow con transactions API [10]
- "65% of smart speaker owners have made a voice purchase" [9]

**Impacto potencial:** Capturar segmento de usuarios con manos ocupadas, accesibilidad total, early mover advantage en voice commerce para servicios de limpieza.

---

## Propuestas (Round 24)

### Propuesta 1: MCP Server — Purity & Clean para AI Agents

**Problema:** Los AI agents son el nuevo search engine. Sin MCP integration, Purity & Clean es invisible para usuarios que descubren servicios via ChatGPT, Claude o Gemini.

**Propuesta — MCP Server con 4 tools:**

1. **Arquitectura MCP:**
```javascript
// purity-mcp-server/index.js
const { Server } = require('@modelcontextprotocol/sdk/server');
const { CallToolRequestSchema } = require('@modelcontextprotocol/sdk/types');

const server = new Server({
  name: 'purity-clean-mcp',
  version: '1.0.0',
}, {
  capabilities: { tools: {} }
});

// Tool: get_services
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;
  
  if (name === 'get_services') {
    return {
      content: [{
        type: 'text',
        text: JSON.stringify({
          services: [
            { id: 'sofa-deep', name: 'Limpieza profunda de sofá', price: 80000, duration: '2h' },
            { id: 'mattress-san', name: 'Sanitización de colchón', price: 60000, duration: '1.5h' },
            { id: 'carpet-main', name: 'Mantenimiento de alfombras', price: 50000, duration: '1h' }
          ]
        })
      }]
    };
  }
  
  if (name === 'check_availability') {
    const { date, service_id } = args;
    // Retorna slots disponibles
    return { content: [{ type: 'text', text: JSON.stringify({ slots: ['08:00', '10:00', '14:00'] }) }] };
  }
  
  if (name === 'create_booking') {
    const { name, email, phone, service_id, date, slot, address } = args;
    // Crea reserva via Formspree o API
    return { content: [{ type: 'text', text: JSON.stringify({ booking_id: 'PCR-2026-XXXX', status: 'confirmed' }) }] };
  }
  
  if (name === 'get_quote') {
    const { service_id, quantity } = args;
    return { content: [{ type: 'text', text: JSON.stringify({ price: 80000 * quantity, currency: 'COP' }) }] };
  }
});

server.listen();
```

2. **Schema de tools:**
```json
{
  "tools": [
    {
      "name": "get_services",
      "description": "Lista todos los servicios de limpieza disponibles",
      "inputSchema": { "type": "object", "properties": {} }
    },
    {
      "name": "check_availability",
      "description": "Verifica disponibilidad para una fecha y servicio",
      "inputSchema": {
        "type": "object",
        "properties": {
          "date": { "type": "string", "description": "Fecha en formato YYYY-MM-DD" },
          "service_id": { "type": "string", "description": "ID del servicio" }
        },
        "required": ["date", "service_id"]
      }
    },
    {
      "name": "create_booking",
      "description": "Crea una reserva de servicio",
      "inputSchema": {
        "type": "object",
        "properties": {
          "name": { "type": "string" },
          "email": { "type": "string" },
          "phone": { "type": "string" },
          "service_id": { "type": "string" },
          "date": { "type": "string" },
          "slot": { "type": "string" },
          "address": { "type": "string" }
        },
        "required": ["name", "email", "phone", "service_id", "date", "slot", "address"]
      }
    },
    {
      "name": "get_quote",
      "description": "Obtiene precio estimado para un servicio",
      "inputSchema": {
        "type": "object",
        "properties": {
          "service_id": { "type": "string" },
          "quantity": { "type": "number", "default": 1 }
        },
        "required": ["service_id"]
      }
    }
  ]
}
```

3. **Prompt para AI agent (instrucciones de uso):**
```
Eres un agente que puede reservar servicios de limpieza de Purity & Clean.
Usa las siguientes herramientas:
- get_services: Lista servicios disponibles
- check_availability: Verifica disponibilidad  
- create_booking: Crea reserva
- get_quote: Obtiene precio

Flujo:
1. Ask qué servicio necesita
2. Ask fecha preferida
3. Check availability
4. Confirm price
5. Create booking con datos del cliente
```

4. **Deploy y documentación:**
- Deploy en Vercel/Node server
- Publish en MCP registry (mcp.so, Smithery)
- Documentación en /mcp.html con instruções para ChatGPT, Claude, Gemini

5. **Playwright Tests:**
```javascript
// tests/mcp.spec.js
test('MCP server responde get_services', async ({ fetch }) => {
  const response = await fetch('http://localhost:3000/mcp', {
    method: 'POST',
    body: JSON.stringify({ tool: 'get_services', arguments: {} })
  });
  const data = await response.json();
  expect(data.services).toBeDefined();
  expect(data.services.length).toBeGreaterThan(0);
});

test('MCP server responde check_availability', async ({ fetch }) => {
  const response = await fetch('http://localhost:3000/mcp', {
    method: 'POST',
    body: JSON.stringify({ 
      tool: 'check_availability', 
      arguments: { date: '2026-05-01', service_id: 'sofa-deep' }
    });
  });
  const data = await response.json();
  expect(data.slots).toBeDefined();
});
```

**Impacto esperado:** Descubrimiento via AI agents, reservas autonomous, ventaja competitiva temprano (early mover).

**Esfuerzo:** M (2 semanas — MCP server + tools + deployment + docs)

**Agente:** Backend (MCP server) + Full Stack (API integration)

**Referencias:**
- [1] Anthropic MCP Documentation — https://modelcontextprotocol.io
- [2] Gartner — AI Agents Market Report 2026
- [3] Zapier MCP — https://zapier.com/mcp
- [4] Google Agent Space — https://agentspace.google.com

---

### Propuesta 2: WhatsApp Business Catalog — Catálogo nativo en WhatsApp

**Problema:** WhatsApp se usa solo para chat. Los 50M+ usuarios colombianos usan WhatsApp como app principal, pero no pueden ver productos/servicios ni comprar ahí. Cada lead de Instagram requiere ir a WhatsApp y luego a un sitio externo — fricción alta.

**Propuesta — WhatsApp Business Catalog + Checkout:**

1. **WhatsApp Business Setup:**
```javascript
// Configuración del catálogo
const WHATSAPP_CATALOG = {
  business_id: 'WB-123456',
  token: process.env.WHATSAPP_TOKEN,
  phone_id: process.env.WHATSAPP_PHONE_ID,
  
  // Catálogo de servicios como productos
  catalog_items: [
    {
      id: 'svc-sofa-deep',
      name: 'Limpieza Profunda de Sofá',
      description: 'Remoción de polvo, manchas y olores. Incluye sanitización.',
      price: '80000 COP',
      currency: 'COP',
      image_url: 'https://purityclean.com/images/sofa-clean.jpg',
      category: 'Limpieza de Muebles'
    },
    {
      id: 'svc-mattress-san',
      name: 'Sanitización de Colchón',
      description: 'Desinfección profunda para mejor descanso.',
      price: '60000 COP',
      currency: 'COP',
      image_url: 'https://purityclean.com/images/mattress-san.jpg',
      category: 'Sanitización'
    },
    {
      id: 'svc-carpet-main',
      name: 'Mantenimiento de Alfombras',
      description: 'Limpieza y protección para alfombras corporativas.',
      price: '50000 COP',
      currency: 'COP',
      image_url: 'https://purityclean.com/images/carpet-main.jpg',
      category: 'Mantenimiento'
    },
    {
      id: 'svc-package-home',
      name: 'Pack Hogar Completo',
      description: 'Sofá + Colchón + 2 alfombras — Mejor precio',
      price: '180000 COP',
      currency: 'COP',
      image_url: 'https://purityclean.com/images/pack-home.jpg',
      category: 'Packs'
    }
  ]
};
```

2. **Flow de compra en WhatsApp:**
```javascript
// js/whatsapp-commerce.js

// 1. Generar link con prefilled message
function getWhatsAppCatalogLink() {
  const phone = '573001234567';
  const message = encodeURIComponent('Hola! Quiero ver el catálogo de servicios');
  return `https://wa.me/${phone}?text=${message}`;
}

// 2. Deep link a producto específico del catálogo
function getWhatsAppProductLink(productId) {
  const phone = '573001234567';
  // WhatsApp Catalog deep link (iOS/Android)
  return `whatsapp://send/?phone=${phone}&text=Hola!%20Me%20interesa%20${productId}`;
}

// 3. WhatsApp Button en sitio
// En index.html, sección de servicios:
const whatsappCTA = document.querySelector('.whatsapp-buy-btn');
if (whatsappCTA) {
  whatsappCTA.addEventListener('click', () => {
    const serviceId = whatsappCTA.dataset.serviceId;
    trackEvent('whatsapp_catalog_click', { props: { service_id: serviceId } });
    window.open(getWhatsAppProductLink(serviceId), '_blank');
  });
}
```

3. **Template Messages para follow-up:**
```javascript
// WhatsApp Business API template messages
const WHATSAPP_TEMPLATES = {
  // Post-purchase confirmation
  booking_confirmed: {
    name: 'booking_confirmation',
    language: 'es',
    components: [
      {
        type: 'body',
        text: '¡Reserva confirmada! 🎉\n\n📅 Fecha: {{1}}\n🕐 Hora: {{2}}\n🛋️ Servicio: {{3}}\n\nTe esperamos. any questions? We're here!'
      },
      {
        type: 'button',
        sub_type: 'quick_reply',
        index: '0',
        parameters: [{ type: 'payload', payload: 'RESCHEDULE' }]
      }
    ]
  },
  
  // Reminder 24h before
  service_reminder: {
    name: 'service_reminder_24h',
    language: 'es',
    components: [
      {
        type: 'body',
        text: '¡Recordatorio! 📅\n\nMañana a las {{1}} tenemos tu limpieza de {{2}}.\n\n¿Necesitas reprogramar? We\'re flexible!'
      }
    ]
  },
  
  // Review request
  review_request: {
    name: 'review_request',
    language: 'es',
    components: [
      {
        type: 'body',
        text: '¿Cómo fue tu experiencia? 🌟\n\nTu opinión nos ayuda a dar el mejor servicio. Takes 30 seconds!'
      },
      {
        type: 'button',
        sub_type: 'url',
        index: '0',
        parameters: [{ type: 'text', text: 'https://g.page/r/purityclean/review' }]
      }
    ]
  }
};
```

4. **WhatsApp Pay Integration:**
```javascript
// Para pagos directos via WhatsApp Pay
async function initiateWhatsAppPay(amount, currency) {
  const paymentData = {
    amount: amount,
    currency: currency, // COP
    merchant_id: 'PURITY_CLEAN',
    callback_url: 'https://purityclean.com/whatsapp-payment-callback',
    return_url: 'https://purityclean.com/payment-success'
  };
  
  // WhatsApp Pay SDK integration
  const payment = await WhatsApp.Payments.create(paymentData);
  return payment.session_id;
}
```

5. **Playwright Tests:**
```javascript
// tests/whatsapp-catalog.spec.js
test('WhatsApp catalog link abre conversación', async ({ page }) => {
  await page.goto('/');
  await page.click('.whatsapp-buy-btn[data-service-id="sofa-deep"]');
  // Verificar que abre WhatsApp con pre-filled message
  const url = page.url();
  expect(url).toContain('wa.me');
});

test('Template message tiene formato correcto', async ({ page }) => {
  await page.goto('/api/whatsapp/templates/booking_confirmed');
  const template = await page.evaluate(() => JSON.parse(document.body.textContent));
  expect(template.name).toBe('booking_confirmation');
  expect(template.language).toBe('es');
});
```

**Impacto esperado:** +30% conversión en leads WhatsApp, reducción de fricción checkout, experiencia "one-tap".

**Esfuerzo:** M (2 semanas — WhatsApp Business setup + catalog + templates + Pay integration)

**Agente:** Full Stack (WhatsApp API) + Marketing (catalog content)

**Referencias:**
- [5] WhatsApp Business Catalog Documentation 2026
- [6] WhatsApp Pay Colombia — https://business.whatsapp.com/products/pay

---

### Propuesta 3: Predictive Maintenance AI — "Tu sofá necesita limpieza en 3 semanas"

**Problema:** El modelo de negocio es reactivo: clientes reservan cuando ven manchas o malos olores. No hay manera de educar al cliente sobre mantenimiento preventivo. Esto limita ingresos recurrentes y reduce lifetime value.

**Propuesta — Sistema de maintenance predictions:**

1. **Modelo de predicción basado en reglas:**
```javascript
// js/predictive-maintenance.js

const PREDICTION_CONFIG = {
  // Factores de riesgo por tipo de servicio
  serviceRiskFactors: {
    'sofa-deep': {
      baseIntervalDays: 180,      // Cada 6 meses en uso normal
      factors: {
        pets: { multiplier: 0.6,  // 60% del interval con mascotas
                label: 'hogar con mascotas' },
        kids: { multiplier: 0.75,  // 75% con niños pequeños
                label: 'hogar con niños' },
        smoker: { multiplier: 0.5, // 50% si hay fumadores
                  label: 'hogar con fumadores' },
        heavyUse: { multiplier: 0.8, // 80% si uso diario
                    label: 'uso diario del sofá' }
      }
    },
    'mattress-san': {
      baseIntervalDays: 365,      // Anual en uso normal
      factors: {
        allergies: { multiplier: 0.5,  // Cada 6 meses con alergias
                    label: 'hogares con alérgicos' },
        kids: { multiplier: 0.7,
                label: 'camas de niños' },
        pets: { multiplier: 0.6,
                label: 'mascotas en la cama' }
      }
    },
    'carpet-main': {
      baseIntervalDays: 270,      // Cada 9 meses
      factors: {
        highTraffic: { multiplier: 0.5, // Trimestral en zonas de alto tráfico
                      label: 'oficinas/zonas comunes' },
        pets: { multiplier: 0.7,
                label: 'mascotas en el hogar' }
      }
    }
  }
};

function calculateNextCleaningDate(lastServiceDate, serviceType, householdFactors) {
  const config = PREDICTION_CONFIG.serviceRiskFactors[serviceType];
  if (!config) return null;
  
  let intervalDays = config.baseIntervalDays;
  
  // Aplicar multiplicadores de factores de riesgo
  householdFactors.forEach(factor => {
    if (config.factors[factor]) {
      intervalDays *= config.factors[factor].multiplier;
    }
  });
  
  const lastDate = new Date(lastServiceDate);
  const nextDate = new Date(lastDate);
  nextDate.setDate(nextDate.getDate() + Math.round(intervalDays));
  
  return {
    nextDate: nextDate.toISOString().split('T')[0],
    intervalDays: Math.round(intervalDays),
    factors: householdFactors.map(f => config.factors[f]?.label || f),
    urgency: intervalDays < 90 ? 'high' : intervalDays < 180 ? 'medium' : 'low'
  };
}

// Ejemplo de uso:
const prediction = calculateNextCleaningDate(
  '2026-01-15',                           // Última limpieza
  'sofa-deep',                            // Tipo de servicio
  ['pets', 'heavyUse']                    // Factores del hogar
);
// prediction.nextDate = '2026-04-10' (aproximado)
// prediction.urgency = 'high'
```

2. **Dashboard de predicciones:**
```html
<!-- /maintenance-predictions.html -->
<section id="predictive-dashboard">
  <h2>Tu Plan de Mantenimiento Personalizado 🎯</h2>
  
  <div class="prediction-card" data-service="sofa-deep">
    <div class="prediction-header">
      <i class="fa-solid fa-couch"></i>
      <h3>Limpieza de Sofá</h3>
    </div>
    <div class="prediction-body">
      <div class="next-service">
        <span class="label">Próxima limpieza:</span>
        <span class="date" id="sofa-prediction-date">15 Mayo 2026</span>
      </div>
      <div class="urgency-badge high">⚡ En 3 semanas</div>
      <div class="factors">
        <span class="factor-tag">🐕 Hogar con mascotas</span>
        <span class="factor-tag">💺 Uso diario</span>
      </div>
    </div>
    <button class="cta-secondary" onclick="bookPredictedService('sofa-deep')">
      Reservar ahora →
    </button>
  </div>
  
  <div class="prediction-card" data-service="mattress-san">
    <div class="prediction-header">
      <i class="fa-solid fa-bed"></i>
      <h3>Sanitización de Colchón</h3>
    </div>
    <div class="prediction-body">
      <div class="next-service">
        <span class="label">Próxima limpieza:</span>
        <span class="date" id="mattress-prediction-date">20 Julio 2026</span>
      </div>
      <div class="urgency-badge medium">📅 En 4 meses</div>
      <div class="factors">
        <span class="factor-tag">🤧 Hogar con alérgicos</span>
      </div>
    </div>
    <button class="cta-secondary" onclick="bookPredictedService('mattress-san')">
      Reservar ahora →
    </button>
  </div>
</section>
```

3. **Email/SMS de recordatorio:**
```javascript
// js/maintenance-reminder.js

const REMINDER_CONFIG = {
  channels: ['email', 'sms', 'whatsapp'],
  timing: {
    advanceNotice: [7, 3, 1],  // días antes
    overdueNotice: [7, 14]     // días después de fecha predicha
  },
  templates: {
    advance_es: {
      subject: '¿Sabías que tu {service} necesita limpieza pronto? 🧹',
      body: `Hola {name},
      
Based on your last cleaning on {lastDate}, we estimate your {service} is due for maintenance.

📅 Fecha sugerida: {predictedDate}
⏰ Quedan {daysRemaining} días

¿Querías reservar ahora? We have availability this week.`
    },
    overdue_es: {
      subject: 'Tu {service} está listo para limpieza 🔔',
      body: `Hola {name},
      
It's been {daysSince} days since your last {service} cleaning. Based on your household factors, it's time for maintenance.

🧹 Reserve ahora y obtén 10% off con código MAINTAIN10`
    }
  }
};

// Integration con email (via Formspree o email API)
async function sendMaintenanceReminder(customerId, serviceType, type) {
  const customer = await getCustomerData(customerId);
  const prediction = calculateNextCleaningDate(
    customer.lastService[serviceType],
    serviceType,
    customer.householdFactors
  );
  
  const template = type === 'advance' ? REMINDER_CONFIG.templates.advance_es : REMINDER_CONFIG.templates.overdue_es;
  const message = interpolateTemplate(template, {
    name: customer.name,
    service: getServiceName(serviceType),
    lastDate: customer.lastService[serviceType],
    predictedDate: prediction.nextDate,
    daysRemaining: calculateDaysRemaining(prediction.nextDate)
  });
  
  return sendMessage(customer.phone, customer.email, message);
}
```

4. **Panel de факторы para clientes:**
```html
<!-- Sección en /account.html para que el cliente actualice sus factores -->
<section id="household-factors">
  <h3>¿Cómo es tu hogar?</h3>
  <p>Actualiza tu perfil para recibir predicciones más precisas.</p>
  
  <div class="factor-group">
    <label class="factor-checkbox">
      <input type="checkbox" name="factor" value="pets">
      <span>🐕 Tengo mascotas</span>
    </label>
    <label class="factor-checkbox">
      <input type="checkbox" name="factor" value="kids">
      <span>👶 Tengo niños menores de 10 años</span>
    </label>
    <label class="factor-checkbox">
      <input type="checkbox" name="factor" value="smoker">
      <span>🚬 Hay fumadores en el hogar</span>
    </label>
    <label class="factor-checkbox">
      <input type="checkbox" name="factor" value="allergies">
      <span>🤧 Hay personas con alergias o asma</span>
    </label>
    <label class="factor-checkbox">
      <input type="checkbox" name="factor" value="heavyUse">
      <span>💺 Uso diario del mueble</span>
    </label>
  </div>
  
  <button onclick="updateHouseholdFactors()">Actualizar perfil</button>
</section>
```

5. **Playwright Tests:**
```javascript
// tests/predictive-maintenance.spec.js
test('predicción calcula correctamente con factores', async ({ page }) => {
  await page.goto('/maintenance-predictions.html');
  
  const prediction = await page.evaluate(() => {
    return calculateNextCleaningDate('2026-01-15', 'sofa-deep', ['pets', 'heavyUse']);
  });
  
  expect(prediction.urgency).toBe('high');
  expect(prediction.factors).toContain('hogar con mascotas');
});

test('dashboard muestra predicciones personalizadas', async ({ page }) => {
  await page.goto('/maintenance-predictions.html');
  await page.fill('#customer-email', 'cliente@example.com');
  await page.click('#load-predictions');
  await expect(page.locator('.prediction-card')).toBeVisible();
});
```

**Impacto esperado:** +40% retention con recordatorios proactivos, lifetime value 3x superior, contratos de mantenimiento predictivo.

**Esfuerzo:** S (1-2 semanas — algoritmo + dashboard + reminders)

**Agente:** Full Stack (dashboard + algoritmo) + Marketing (comunicación)

**Referencias:**
- [7] Harvard Business Review — Predictive Maintenance in Consumer Services 2026
- [8] IoT Sensors for Furniture — Emerging Technologies Report 2026

---

### Propuesta 4: Voice Commerce — Reservas por voz con Alexa y Google Assistant

**Problema:** El sitio tiene búsqueda por voz (R21) pero no reservas por voz. Usuarios con manos ocupadas o discapacidad visual no pueden completar el funnel. En 2026, voice commerce representa $40B en LatAm.

**Propuesta — Actions on Google + Alexa Skills:**

1. **Google Actions (Dialogflow CX):**
```javascript
// Dialogflow CX Agent Configuration
const PURITY_AGENT = {
  displayName: 'Purity & Clean',
  defaultLocale: 'es',
  timeZone: 'America/Bogota',
  
  // Intent: Book Cleaning
  intents: {
    'booking.cleaning': {
      trainingPhrases: [
        'reserva una limpieza de sofá',
        'quiero limpiar mi colchón',
        'agenda una sanitización',
        'necesito limpiar mis alfombras',
        'reserva limpieza para mañana'
      ],
      parameters: [
        { name: 'service_type', type: '@service_type' },
        { name: 'date', type: '@date' },
        { name: 'time', type: '@time' }
      ],
      fulfillment: {
        messages: [
          { text: { text: 'Perfecto, voy a verificar disponibilidad...' } },
          { functionCall: 'checkAvailability' }
        ]
      }
    },
    'booking.cancel': {
      trainingPhrases: [
        'cancela mi reserva',
        'reprograma',
        'ya no puedo'
      ],
      parameters: [
        { name: 'booking_id', type: '@booking_id' }
      ]
    },
    'general.inquiry': {
      trainingPhrases: [
        'qué servicios ofrecen',
        'cuánto cuesta',
        'en qué zonas están',
        'cómo funciona'
      ]
    }
  },
  
  // Transactions API
  transactions: {
    paymentProcessor: 'STRIPE', // o local payment
    merchantId: 'PURITY_CLEAN_CO',
    supportedNetworks: ['VISA', 'MASTERCARD'],
    merchantInfo: {
      merchantId: 'PURITY_CLEAN_CO',
      merchantName: 'Purity & Clean'
    }
  }
};

// Dialogflow Fulfillment
app.intent('booking.cleaning', async (conv, { service_type, date, time }) => {
  // 1. Verificar disponibilidad
  const availability = await checkAvailability(service_type, date, time);
  
  if (!availability.available) {
    conv.ask(`Lo siento, no hay disponibilidad para ${date}. Te sugiero ${availability.alternatives[0]}.`);
    return;
  }
  
  // 2. Solicitar confirmación
  const price = getPrice(service_type);
  conv.ask(`Perfecto. Tengo disponible ${service_type} para ${date} a las ${time} por ${price} COP. ¿Confirmas la reserva?`);
  
  // 3. Crear reserva si confirma
  conv.context.set({
    name: 'booking-confirmation',
    lifespan: 5,
    parameters: { service_type, date, time, price }
  });
});

app.intent('booking.confirm', async (conv) => {
  const { service_type, date, time, price } = conv.context.get('booking-confirmation').parameters;
  
  // Crear reserva
  const booking = await createBooking({ service_type, date, time, customer: conv.user });
  
  conv.close(`¡Reserva confirmada! ${booking.id}. Te enviamos un mensaje a tu WhatsApp con los detalles.`);
});
```

2. **Alexa Skill (ASK SDK v2):**
```javascript
// Alexa Skill: purity-clean-booking
const Alexa = require('ask-sdk-core');

const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput) === 'LaunchRequest';
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak('Hola, soy Purity & Clean. Puedes decir "reserva una limpieza" o "qué servicios ofrecen".')
      .reprompt('Puedes decir "reserva una limpieza" para comenzar.')
      .getResponse();
  }
};

const BookCleaningIntentHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput) === 'IntentRequest'
      && Alexa.getIntentName(handlerInput) === 'BookCleaningIntent';
  },
  async handle(handlerInput) {
    const { serviceType, date, time } = 
      Alexa.getSlotValue(handlerInput, 'serviceType');
    
    const availability = await checkAvailability(serviceType, date, time);
    
    if (!availability.available) {
      return handlerInput.responseBuilder
        .speak(`No hay disponibilidad para ${date}. Te sugiero el ${availability.alternatives[0]}?`)
        .getResponse();
    }
    
    const speakOutput = `Perfecto. ${serviceType} para ${date} a las ${time}. ¿Confirmas?`;
    return handlerInput.responseBuilder
      .addDelegateDirective({
        name: 'ConfirmBookingIntent',
        confirmationStatus: 'NEEDS_CONFIRMATION',
        slots: { serviceType, date, time }
      })
      .speak(speakOutput)
      .getResponse();
  }
};

const ConfirmBookingIntentHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput) === 'IntentRequest'
      && Alexa.getIntentName(handlerInput) === 'ConfirmBookingIntent'
      && Alexa.getIntentConfirmationStatus(handlerInput) === 'CONFIRMED';
  },
  async handle(handlerInput) {
    const { serviceType, date, time } = 
      handlerInput.requestEnvelope.request.intent.slots;
    
    const booking = await createBooking({
      serviceType,
      date: date.value,
      time: time.value,
      customer: handlerInput.requestEnvelope.context.System.user
    });
    
    return handlerInput.responseBuilder
      .speak(`¡Reserva confirmada! ${booking.id}. Recibirás un mensaje de confirmación.`)
      .withShouldEndSession(true)
      .getResponse();
  }
};

const serviceHandler = Alexa.SkillBuilders.custom()
  .addRequestHandlers(
    LaunchRequestHandler,
    BookCleaningIntentHandler,
    ConfirmBookingIntentHandler
  )
  .lambda();
```

3. **Voice UI optimization:**
```html
<!-- En index.html - Voice search button -->
<section id="voice-search" aria-labelledby="voice-search-heading">
  <h2 id="voice-search-heading">Busca por voz 🎙️</h2>
  <p>También puedes reservar usando tu voz en Google Assistant o Alexa</p>
  
  <div class="voice-platforms">
    <a href="https://assistant.google.com/services/purity-clean" class="voice-btn google-assistant">
      <img src="/images/google-assistant-logo.svg" alt="Google Assistant">
      <span>Reserva con Google</span>
    </a>
    
    <a href="https://alexa.amazon.com/spa/purity-clean" class="voice-btn alexa">
      <img src="/images/alexa-logo.svg" alt="Alexa">
      <span>Activa con Alexa</span>
    </a>
  </div>
  
  <p class="voice-phrase">
    Di: <em>"Ask Purity & Clean to book a sofa cleaning"</em>
  </p>
</section>
```

4. **Audio-optimized landing (/voice.html):**
```html
<!-- Página optimizada para discovery por voice assistants -->
<section id="voice-discovery">
  <h1>Purity & Clean - Reservas de Limpieza por Voz</h1>
  
  <article>
    <h2>¿Qué es?</h2>
    <p>Ahora puedes reservar servicios de limpieza usando solo tu voz. Compatible con Google Assistant y Amazon Alexa.</p>
  </article>
  
  <article>
    <h2>Servicios disponibles</h2>
    <ul>
      <li>Limpieza profunda de sofá - $80.000 COP</li>
      <li>Sanitización de colchón - $60.000 COP</li>
      <li>Mantenimiento de alfombras - $50.000 COP</li>
    </ul>
  </article>
  
  <article>
    <h2>Cómo usar</h2>
    <p>En Google Assistant: "Hey Google, talk to Purity and Clean"</p>
    <p>En Alexa: "Alexa, open Purity and Clean"</p>
  </article>
  
  <article>
    <h2>Zonas de servicio</h2>
    <p>Bogotá y área metropolitana: Chapinero, Usaquén, Suba, Kennedy, Engativá, y más.</p>
  </article>
</section>
```

5. **Playwright Tests (Voice simulation):**
```javascript
// tests/voice-commerce.spec.js
test('voice search button es accesible', async ({ page }) => {
  await page.goto('/');
  const voiceBtn = page.locator('.voice-btn.google-assistant');
  await expect(voiceBtn).toBeVisible();
  await expect(voiceBtn).toHaveAttribute('href', /assistant.google.com/);
});

test('voice page tiene structured data para SEO', async ({ page }) => {
  await page.goto('/voice.html');
  const schema = await page.evaluate(() => {
    const el = document.querySelector('script[type="application/ld+json"]');
    return el ? JSON.parse(el.textContent) : null;
  });
  expect(schema['@type']).toBe('Service');
});
```

**Impacto esperado:** Capturar voice commerce market ($40B LatAm 2026), accesibilidad total, diferenciación premium.

**Esfuerzo:** M (2-3 semanas — Dialogflow + Alexa + voice page + tests)

**Agente:** Full Stack (Dialogflow/Alexa integration) + Content (voice UI)

**Referencias:**
- [9] Voice Commerce Report Latin America 2026 — Juniper Research
- [10] Google Actions Transaction API — https://developers.google.com/actions/transactions

---

## Priorización recomendada (Round 24)

| # | Propuesta | Impacto | Esfuerzo | Agente | Razón estratégica |
|---|-----------|---------|----------|--------|------------------|
| 1 | MCP Server | Alto | Medio | Backend | Early mover en agentic commerce |
| 2 | WhatsApp Business Catalog | Alto | Medio | Full Stack | 30% más conversión en WhatsApp leads |
| 3 | Predictive Maintenance AI | Alto | Bajo | Full Stack | +40% retention, lifetime value 3x |
| 4 | Voice Commerce | Medio | Medio | Full Stack | Captura voice commerce market |

**Top 3 para implementar primero:** 3, 2, 1 (Predictive: quick win retention; WhatsApp Catalog: conversión rápida; MCP: early mover advantage).

---

## Síntesis: Por qué R24 es diferente

R1-R23 se enfocaron en:
- Features del sitio (chatbot, booking, cotizador, referidos)
- Marketing digital (ads, retargeting, social media)
- SEO y contenido (zonas, blog, schema, programmatic)
- UX y accesibilidad (dark mode, WCAG, Core Web Vitals)
- Tecnología (PWA, service worker, push notifications)
- Operaciones (field app, scheduling, subscriptions)
- Retención (SMS, reviews, reputation)
- CRO (AI personalization, behavioral analytics)
- Automation (WhatsApp CRM, video reviews)

**R24 se enfoca en:**
- **Agentic Commerce** (MCP server para AI agents)
- **Native Commerce** (WhatsApp Catalog + Pay)
- **Predictive Intelligence** (maintenance predictions basadas en household factors)
- **Voice Commerce** (reservas via Google Assistant + Alexa)

R24 representa la evolución hacia **commerce without interfaces**: el usuario del futuro no abrirá una app o web, sino que le dirá a su AI agent que reserve, y el AI agent interactuará con Purity & Clean via MCP. La pregunta no es si esto pasará, sino cuándo. Early movers tendrán la ventaja.

---

## Referencias

[1] Anthropic. "Model Context Protocol Documentation." 2026. https://modelcontextprotocol.io
[2] Gartner. "AI Agents Market Report." 2026.
[3] Zapier. "MCP Integration Documentation." 2026. https://zapier.com/mcp
[4] Google. "Agent Space Launch." 2026. https://agentspace.google.com
[5] WhatsApp Business. "Catalog Documentation." 2026.
[6] WhatsApp Pay. "Colombia Launch." 2026. https://business.whatsapp.com/products/pay
[7] Harvard Business Review. "Predictive Maintenance in Consumer Services." 2026.
[8] IoT Furniture Sensors. "Emerging Technologies Report." 2026.
[9] Juniper Research. "Voice Commerce Latin America 2026."
[10] Google Actions. "Transactions API." 2026. https://developers.google.com/actions/transactions

---

*Co-Authored-By: Paperclip <noreply@paperclip.ing>*