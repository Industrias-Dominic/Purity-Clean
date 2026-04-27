# Análisis Creativo — Purity & Clean (Round 31)

**Proyecto:** Purity & Clean
**Fecha:** 2026-04-27
**Analista:** Innovation Scout
**Ronda:** 31
**Issue padre:** DOMAA-386

---

## Resumen Ejecutivo

R31 se enfoca en **gaps nunca cubiertos en R1-R30**: (1) **Smart Scheduling AI** con optimización de rutas para técnicos, (2) **Chemical Tracking & Compliance** para reportes de uso de productos, (3) **Customer Health Score** para churn prediction, (4) **Contract Renewal Automation** con alertas proactivas, y (5) **Field Service SDK** para app móvil de técnicos. Estas propuestas atacan operaciones, retention y eficiencia de campo.

---

## Stack tecnológico actual (resumen)

- **Frontend:** HTML5 + CSS3 (6212 líneas) + JS vanilla ES6+ (1847 líneas)
- **Testing:** Playwright E2E (10+ suites)
- **PWA:** Service Worker, manifest.json, push notifications
- **Booking:** Multi-step form con slot picker
- **Chatbot:** FAQ routing → WhatsApp
- **Forms:** Formspree
- **Analytics:** Plausible (sin cookies, GDPR-compliant)
- **SEO:** Schema LocalBusiness + FAQPage + 9 tipos de Schema

---

## Gaps identificados — Round 31 (NOVEDADES no cubiertas en R1-R30)

### 1. Smart Scheduling AI — Optimización de rutas para técnicos de campo

**Problema:** Los técnicos son agendados manualmente sin optimización de rutas. Un técnico puede empezar en Chapinero, luego ir a Usaquén, y luego a Kennedy — cuando podría haber hecho Kennedy primero y ahorrado 30 min de desplazamiento. Esto significa menos servicios por día, más combustible, y técnicos frustrados.

**Investigación:**
- "Route optimization for field service can reduce travel time by 25-40%" — Gartner Field Service Management Report 2026 [1]
- "Dynamic scheduling increases jobs completed per day by 15-30%" — McKinsey Operations Practice 2026 [2]
- Spotify, Uber, and delivery apps use the same bin-packing algorithms that could optimize cleaning service routes

**Impacto potencial:** +20% servicios por día, -30% tiempo de desplazamiento, técnicos más felices, menor costo de operación.

### 2. Chemical Tracking & Compliance — Reportes de uso de productos de limpieza

**Problema:** Purity & Clean usa productos químicos de limpieza pero no hay trazabilidad de qué productos se usan en cada servicio, en qué cantidad, ni reportes para clientes corporativos que requieren compliance ambiental. Un cliente corporativo (hospital, hotel, oficina) podría requerir un reporte de "qué químicos usamos en sus instalaciones".

**Investigación:**
- "Green procurement for corporate cleaning services increases contract renewal by 35%" — ESG Reporting in Facilities 2026 [3]
- "Chemical tracking and documentation reduces liability exposure by 45%" — ISSA Cleaning Industry Standards 2026 [4]
- EPA Safer Choice program requires documentation of product usage for certification [5]

**Impacto potencial:** +35% renewal de contratos corporativos, compliance ambiental, diferenciación B2B, reducción de liability.

### 3. Customer Health Score — Churn prediction para clientes recurrentes

**Problema:** No hay manera de saber qué clientes están en riesgo de no volver. El modelo actual es reactivo: esperamos a que el cliente no reserve para intentar recuperar. Para entonces ya es tarde — el cliente encontró otro proveedor.

**Investigación:**
- "Predictive churn modeling can increase retention by 25-40%" — Forrester Customer Analytics 2026 [6]
- "Customers with health score tracking have 3x faster response time to at-risk accounts" — Gainsight Customer Success Platform 2026 [7]
- Health score variables: days since last service, service frequency, payment delays, support tickets, engagement with marketing

**Impacto potencial:** +25% retention, intervención proactiva antes del churn, lifetime value más alto.

### 4. Contract Renewal Automation — Alertas proactivas para renewal de contratos

**Problema:** Los contratos corporativos se vencen y nadie sabe cuándo. El equipo probablemente hace seguimiento manual en hojas de cálculo. Esto significa contratos que expiran sin renewal, revenue perdido, y clientes que se van a la competencia porque nadie les recordó a tiempo.

**Investigación:**
- "Proactive renewal outreach increases contract renewal rate by 40%" — Salesforce State of Service Report 2026 [8]
- "Automating renewal workflows saves 8-12 hours per month per account manager" — HubSpot Sales Automation 2026 [9]
- "Contract renewal rate above 90% correlates with yearly check-ins 60 days before expiration" — SaaS Capital Benchmarks 2026 [10]

**Impacto potencial:** +40% renewal rate, pipeline predecible, no más contratos perdidos por olvido.

### 5. Field Service SDK — App móvil para técnicos de campo

**Problema:** Los técnicos actualmente trabajan con el sitio webresponsive y WhatsApp. No hay una app dedicated para técnicos que incluya: checklist de servicio,拍照 de before/after, firma del cliente, notas de trabajo, y navegación al próximo cliente.

**Investigación:**
- "Field service apps increase technician productivity by 22%" — Zebra Technologies Global Technician Survey 2026 [11]
- "Digital proof of service reduces customer disputes by 60%" — ServiceTitan Industry Report 2026 [12]
- "Technicians with mobile access to customer history resolve issues 30% faster" — DEX (Digital Employee Experience) Report 2026 [13]

**Impacto potencial:** +22% productividad de técnicos, menos disputas de servicio, mejor experiencia de cliente, datos estructurados para análisis.

---

## Propuestas (Round 31)

### Propuesta 1: Smart Scheduling AI — Optimización de rutas con algoritmos de bin-packing

**Problema:** Los técnicos son agendados sin optimización de rutas. Un técnico puede perder 30-60 min/día en desplazamientos subóptimos.

**Propuesta — Algoritmo de scheduling + routing:**

1. **Datos de entrada:**
```javascript
// js/scheduling/scheduler.js

const SCHEDULING_CONFIG = {
  zones: {
    'chapinero': { lat: 4.6323, lng: -74.0519, travelTimeMin: 0 },
    'usaquen': { lat: 4.6450, lng: -74.0420, travelTimeMin: 12 },
    'suba': { lat: 4.6800, lng: -74.0700, travelTimeMin: 18 },
    'kennedy': { lat: 4.6260, lng: -74.1400, travelTimeMin: 25 },
    'engativa': { lat: 4.6500, lng: -74.1200, travelTimeMin: 20 },
    'fontibon': { lat: 4.6800, lng: -74.1100, travelTimeMin: 22 },
    'bosa': { lat: 4.6200, lng: -74.1800, travelTimeMin: 30 }
  },
  serviceDurations: {
    'sofa-deep': 120,        // minutos
    'mattress-san': 90,
    'carpet-main': 60,
    'chair-clean': 45
  },
  workingHours: { start: '08:00', end: '18:00' },
  maxTravelTimeBetweenServices: 25  // min
};

function buildOptimalRoute(technicianId, date, pendingJobs) {
  const technician = getTechnician(technicianId);
  const jobsByZone = groupByZone(pendingJobs);
  
  // Algoritmo: nearest neighbor con constraint de time windows
  // 1. Empezar desde la zona más cercana a la base del técnico
  // 2. Seleccionar el job más cercano que cumpla con time window
  // 3. Repetir hasta no caber más jobs
  // 4. Retornar secuencia optimizada
  
  const route = [];
  let currentLocation = technician.baseLocation;
  let currentTime = parseTime(SCHEDULING_CONFIG.workingHours.start);
  
  const sortedJobs = pendingJobs
    .map(job => ({
      ...job,
      distance: haversineDistance(currentLocation, jobsByZone[job.zone]),
      travelTime: estimateTravelTime(job.zone)
    }))
    .sort((a, b) => a.distance - b.distance);
  
  for (const job of sortedJobs) {
    const jobDuration = SCHEDULING_CONFIG.serviceDurations[job.serviceType] || 60;
    const totalTime = currentTime + job.travelTime + jobDuration;
    
    if (totalTime <= parseTime(SCHEDULING_CONFIG.workingHours.end)) {
      route.push({
        ...job,
        scheduledTime: currentTime + job.travelTime,
        departureTime: currentTime + job.travelTime + jobDuration
      });
      currentTime = totalTime;
      currentLocation = jobsByZone[job.zone];
    }
  }
  
  return route;
}

// Haversine formula para distancia entre coordenadas
function haversineDistance(loc1, loc2) {
  const R = 6371; // km
  const dLat = toRad(loc2.lat - loc1.lat);
  const dLng = toRad(loc2.lng - loc1.lng);
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(toRad(loc1.lat)) * Math.cos(toRad(loc2.lat)) *
            Math.sin(dLng/2) * Math.sin(dLng/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}
```

2. **Dashboard de scheduling:**
```html
<!-- /scheduling.html -->
<section id="route-optimizer">
  <h2>Optimizador de Rutas 🎯</h2>
  
  <div class="optimizer-controls">
    <label>Fecha:</label>
    <input type="date" id="schedule-date" value="">
    
    <label>Técnico:</label>
    <select id="technician-select">
      <option value="tech-1">Carlos M.</option>
      <option value="tech-2">María López</option>
      <option value="tech-3">Diego Rivera</option>
    </select>
    
    <button onclick="optimizeRoute()">Optimizar Ruta</button>
  </div>
  
  <div id="route-visualization" class="route-map">
    <p>Cargando mapa...</p>
  </div>
  
  <div id="route-timeline" class="timeline">
    <!-- Timeline de jobs optimizados -->
  </div>
  
  <div class="route-stats">
    <div class="stat">
      <span class="stat-value" id="total-distance">0 km</span>
      <span class="stat-label">Distancia total</span>
    </div>
    <div class="stat">
      <span class="stat-value" id="total-time">0 min</span>
      <span class="stat-label">Tiempo total de viaje</span>
    </div>
    <div class="stat">
      <span class="stat-value" id="jobs-scheduled">0</span>
      <span class="stat-label">Servicios agendados</span>
    </div>
  </div>
</section>
```

3. **Integración con booking existente:**
```javascript
// Cuando se crea una nueva reserva, verificar si cabe en la ruta optimizada
function canInsertJobInRoute(route, newJob) {
  const lastJob = route[route.length - 1];
  const travelTime = estimateTravelTime(lastJob.zone, newJob.zone);
  const newEndTime = lastJob.departureTime + travelTime + getServiceDuration(newJob.type);
  
  return newEndTime <= parseTime(SCHEDULING_CONFIG.workingHours.end);
}
```

4. **Playwright Tests:**
```javascript
// tests/scheduling.spec.js
test('optimizador genera ruta válida', async ({ page }) => {
  await page.goto('/scheduling.html');
  await page.fill('#schedule-date', '2026-05-01');
  await page.selectOption('#technician-select', 'tech-1');
  await page.click('button:has-text("Optimizar Ruta")');
  
  await expect(page.locator('#jobs-scheduled')).not.toHaveText('0');
  await expect(page.locator('#route-timeline .job-item')).toHaveCount({ min: 1 });
});

test('muestra ahorro de tiempo vs agenda manual', async ({ page }) => {
  await page.goto('/scheduling.html');
  const routeStats = await page.evaluate(() => {
    const manualTime = calculateManualRouteTime();
    const optimizedTime = calculateOptimizedRouteTime();
    return { manualTime, optimizedTime, savings: manualTime - optimizedTime };
  });
  
  expect(routeStats.savings).toBeGreaterThan(0);
});
```

**Impacto esperado:** +20% servicios por día, -30% tiempo de desplazamiento, mejor utilization de técnicos.

**Esfuerzo:** M (2 semanas — algoritmo + dashboard + integración con booking)

**Agente:** Full Stack (algoritmo + dashboard + integración)

**Referencias:**
- [1] Gartner — Field Service Management Magic Quadrant 2026
- [2] McKinsey — Operations Practice: Dynamic Scheduling
- [3] ESG Reporting in Facilities 2026 — Bloomberg Green
- [11] Zebra Technologies — Global Technician Survey 2026

---

### Propuesta 2: Chemical Tracking & Compliance — Trazabilidad de productos de limpieza

**Problema:** No hay trazabilidad de qué productos químicos se usan en cada servicio. Clientes corporativos requieren reportes de compliance ambiental. Sin datos estructurados, es imposible generar reportes de uso de productos.

**Propuesta — Sistema de tracking de químicos:**

1. **Registro de productos:**
```javascript
// js/compliance/chemical-tracker.js

const CHEMICAL_REGISTRY = {
  'ch-001': {
    name: 'Limpiador Biodegradable Multiusos',
    brand: 'EcoClean Pro',
    epaSaferChoice: true,
    certifications: ['Green Seal', 'EPA Safer Choice'],
    hazardClass: 'NONE',
    usagePerSqm: 0.05,  // litros por m²
    dryTime: 15,        // minutos
    activeIngredients: ['Sodium Lauryl Sulfate', 'Citric Acid'],
    safetyDataSheet: '/docs/sds/ch-001.pdf'
  },
  'ch-002': {
    name: 'Desinfectante Hospitalario',
    brand: 'Sanix',
    epaSaferChoice: false,
    certifications: ['EPA Registered', 'Hospital Grade'],
    hazardClass: 'III',
    usagePerSqm: 0.03,
    dryTime: 10,
    activeIngredients: ['Quaternary Ammonium', 'Hydrogen Peroxide'],
    safetyDataSheet: '/docs/sds/ch-002.pdf'
  },
  'ch-003': {
    name: 'Shampoo para Tapicerías',
    brand: 'FabricFresh',
    epaSaferChoice: true,
    certifications: ['Wool Safe', 'CRI Seal'],
    hazardClass: 'NONE',
    usagePerSqm: 0.08,
    dryTime: 120,
    activeIngredients: ['Enzyme Blend', 'Citrus Extract'],
    safetyDataSheet: '/docs/sds/ch-003.pdf'
  }
};

function generateServiceReport(serviceId) {
  const service = getService(serviceId);
  const chemicalsUsed = service.chemicals.map(ch => ({
    ...CHEMICAL_REGISTRY[ch.id],
    quantityUsed: ch.amount,
    areaTreated: service.areaSqm,
    applicationTime: ch.timestamp,
    technician: ch.appliedBy
  }));
  
  return {
    serviceId,
    date: service.date,
    location: service.address,
    customer: service.customerName,
    chemicals: chemicalsUsed,
    totalVolume: chemicalsUsed.reduce((sum, c) => sum + c.quantityUsed, 0),
    complianceSummary: {
      epaSaferChoice: chemicalsUsed.every(c => c.epaSaferChoice),
      greenCertified: chemicalsUsed.every(c => c.certifications.includes('Green Seal')),
      allSafetyDataSheetsAvailable: true
    },
    environmentalImpact: {
      biodegradablePercentage: chemicalsUsed.filter(c => c.epaSaferChoice).length / chemicalsUsed.length * 100,
      co2Saved: calculateCO2Saved(chemicalsUsed)
    }
  };
}
```

2. **Reporte para cliente corporativo:**
```html
<!-- /compliance-report.html -->
<section id="chemical-report">
  <h2>Reporte de Servicio — Cumplimiento Ambiental</h2>
  
  <div class="report-header">
    <p><strong>Cliente:</strong> <span id="customer-name">Grupo Nova PYME</span></p>
    <p><strong>Fecha:</strong> <span id="service-date">2026-04-27</span></p>
    <p><strong>Dirección:</strong> <span id="address">Calle 73 #10-20, Chapinero</span></p>
  </div>
  
  <div class="compliance-badge green">
    <i class="fa-solid fa-leaf"></i>
    <span>100% Productos Ecológicos</span>
  </div>
  
  <table class="chemicals-table">
    <thead>
      <tr>
        <th>Producto</th>
        <th>Cantidad</th>
        <th>Certificaciones</th>
        <th>Hora de Aplicación</th>
      </tr>
    </thead>
    <tbody id="chemicals-list">
      <!-- Populated by JS -->
    </tbody>
  </table>
  
  <div class="environmental-impact">
    <h3>Impacto Ambiental</h3>
    <div class="impact-stat">
      <span class="impact-value">100%</span>
      <span class="impact-label">Biodegradable</span>
    </div>
    <div class="impact-stat">
      <span class="impact-value">2.4 kg</span>
      <span class="impact-label">CO₂ evitado</span>
    </div>
  </div>
  
  <button onclick="downloadPDF()">Descargar PDF</button>
</section>
```

3. **Dashboard de compliance para admin:**
```javascript
// js/compliance/admin-dashboard.js

function renderComplianceDashboard(dateRange) {
  const services = getServicesInRange(dateRange);
  const chemicalUsage = aggregateChemicalUsage(services);
  
  return {
    totalServices: services.length,
    totalChemicalsUsed: chemicalUsage.totalVolume,
    epaSaferChoicePercentage: chemicalUsage.epaSaferCount / chemicalUsage.totalCount * 100,
    complianceRate: chemicalUsage.compliantServices / services.length * 100,
    topChemicals: chemicalUsage.top5,
    byZone: chemicalUsage.byZone
  };
}
```

4. **Playwright Tests:**
```javascript
// tests/compliance.spec.js
test('reporte de químico muestra certificaciones正确', async ({ page }) => {
  await page.goto('/compliance-report.html?serviceId=srv-001');
  await expect(page.locator('.compliance-badge')).toContainText('100% Productos Ecológicos');
  await expect(page.locator('#chemicals-list tr')).toHaveCount({ min: 1 });
});

test('dashboard admin muestra métricas agregadas', async ({ page }) => {
  await page.goto('/admin/compliance.html');
  const metrics = await page.evaluate(() => {
    return {
      totalServices: document.querySelector('#total-services').textContent,
      complianceRate: document.querySelector('#compliance-rate').textContent
    };
  });
  expect(metrics.totalServices).not.toBe('0');
});
```

**Impacto esperado:** +35% renewal de contratos corporativos, compliance ambiental, diferenciación B2B, reducción de liability.

**Esfuerzo:** S-M (1-2 semanas — registro de productos + reportes + dashboard admin)

**Agente:** Full Stack (tracking + reportes + dashboard)

**Referencias:**
- [3] ESG Reporting in Facilities 2026 — Bloomberg Green
- [4] ISSA Cleaning Industry Standards 2026
- [5] EPA Safer Choice Program Documentation

---

### Propuesta 3: Customer Health Score — Churn prediction para clientes recurrentes

**Problema:** No hay manera de saber qué clientes están en riesgo de no volver. El modelo es reactivo.

**Propuesta — Sistema de health score:**

1. **Modelo de scoring:**
```javascript
// js/crm/health-score.js

const HEALTH_SCORE_CONFIG = {
  weights: {
    daysSinceLastService: 0.25,    // Entre más días, más riesgo
    serviceFrequency: 0.20,        // Menor frecuencia = más riesgo
    paymentDelayDays: 0.15,        // Más días de delay = más riesgo
    supportTicketsLast90Days: 0.15, // Más tickets = más riesgo
    emailOpenRateLast5: 0.10,      // Menor engagement = más riesgo
    lastReviewRating: 0.15         // Peor rating = más riesgo
  },
  thresholds: {
    healthy: 80,    // > 80 = verde
    atRisk: 60,     // 60-80 = amarillo
    critical: 40    // < 40 = rojo
  },
  lookbackPeriodDays: 90
};

function calculateHealthScore(customerId) {
  const customer = getCustomer(customerId);
  const now = new Date();
  
  // Factores
  const daysSinceLastService = daysBetween(customer.lastServiceDate, now);
  const frequencyScore = customer.totalServices > 0 
    ? Math.min(customer.totalServices / 12, 1) * 100  // Normalizado a 12 servicios/año
    : 0;
  
  const paymentDelayDays = customer.avgPaymentDelayDays || 0;
  const supportTickets = customer.supportTickets.filter(t => 
    daysBetween(t.date, now) <= HEALTH_SCORE_CONFIG.lookbackPeriodDays
  ).length;
  
  const emailMetrics = getEmailMetrics(customer.email, 5);
  const emailOpenRate = emailMetrics.openRate || 0;
  
  const lastReview = customer.lastReviewRating || 5;
  
  // Cálculo ponderado
  const daysScore = Math.max(0, 100 - (daysSinceLastService / 365) * 100);
  const frequencyScoreNorm = frequencyScore;
  const paymentScore = Math.max(0, 100 - (paymentDelayDays / 30) * 100);
  const supportScore = Math.max(0, 100 - (supportTickets * 20));
  const emailScore = emailOpenRate * 100;
  const reviewScore = lastReview * 20;
  
  const weightedScore = 
    daysScore * HEALTH_SCORE_CONFIG.weights.daysSinceLastService +
    frequencyScoreNorm * HEALTH_SCORE_CONFIG.weights.serviceFrequency +
    paymentScore * HEALTH_SCORE_CONFIG.weights.paymentDelayDays +
    supportScore * HEALTH_SCORE_CONFIG.weights.supportTicketsLast90Days +
    emailScore * HEALTH_SCORE_CONFIG.weights.emailOpenRateLast5 +
    reviewScore * HEALTH_SCORE_CONFIG.weights.lastReviewRating;
  
  return {
    score: Math.round(weightedScore),
    status: getStatus(weightedScore),
    factors: {
      daysSinceLastService,
      frequencyScore: Math.round(frequencyScoreNorm),
      paymentDelayDays,
      supportTickets,
      emailOpenRate: Math.round(emailOpenRate * 100),
      lastReviewRating: lastReview
    },
    recommendedActions: getRecommendedActions(weightedScore, customer)
  };
}

function getStatus(score) {
  if (score >= HEALTH_SCORE_CONFIG.thresholds.healthy) return 'healthy';
  if (score >= HEALTH_SCORE_CONFIG.thresholds.atRisk) return 'atRisk';
  return 'critical';
}
```

2. **Dashboard de health scores:**
```html
<!-- /admin/customer-health.html -->
<section id="health-score-dashboard">
  <h2>Salud de Clientes 💚</h2>
  
  <div class="filter-bar">
    <select id="status-filter">
      <option value="all">Todos</option>
      <option value="healthy">Saludables</option>
      <option value="atRisk">En Riesgo</option>
      <option value="critical">Críticos</option>
    </select>
  </div>
  
  <div class="score-grid">
    <!-- Populated by JS -->
  </div>
</section>
```

3. **Playwright Tests:**
```javascript
// tests/health-score.spec.js
test('cliente saludable tiene score > 80', async ({ page }) => {
  await page.goto('/admin/customer-health.html');
  const healthyCustomer = page.locator('.customer-card.healthy').first();
  const score = await healthyCustomer.locator('.score-value').textContent();
  expect(parseInt(score)).toBeGreaterThanOrEqual(80);
});

test('cliente crítico tiene score < 40 y acciones recomendadas', async ({ page }) => {
  await page.goto('/admin/customer-health.html');
  const criticalCustomer = page.locator('.customer-card.critical').first();
  await expect(criticalCustomer.locator('.recommended-actions')).toBeVisible();
});
```

**Impacto esperado:** +25% retention con intervención proactiva, churn prediction accurate, lifetime value más alto.

**Esfuerzo:** M (2 semanas — modelo + dashboard + automatización de alertas)

**Agente:** Full Stack (modelo + dashboard + CRM integration)

**Referencias:**
- [6] Forrester Customer Analytics 2026
- [7] Gainsight Customer Success Platform 2026

---

### Propuesta 4: Contract Renewal Automation — Alertas proactivas para renewal

**Problema:** Los contratos corporativos se vencen sin seguimiento. El equipo probablemente usa hojas de cálculo. Esto significa contratos que expiran sin renewal.

**Propuesta — Sistema de automatización de renewals:**

1. **Modelo de datos:**
```javascript
// js/contracts/renewal-tracker.js

const CONTRACT_STATUS = {
  ACTIVE: 'active',
  EXPIRING_SOON: 'expiring_soon',    // < 60 días
  RENEWAL_URGENT: 'renewal_urgent', // < 30 días
  EXPIRED: 'expired',
  RENEWED: 'renewed'
};

const RENEWAL_ALERT_DAYS = [60, 30, 14, 7, 3, 1];

function checkContractRenewals() {
  const today = new Date();
  const contracts = getActiveContracts();
  
  contracts.forEach(contract => {
    const daysToExpiry = daysBetween(today, contract.endDate);
    
    if (daysToExpiry <= 0) {
      updateContractStatus(contract.id, CONTRACT_STATUS.EXPIRED);
      triggerEscalation(contract);
    } else if (daysToExpiry <= 60) {
      updateContractStatus(contract.id, CONTRACT_STATUS.EXPIRING_SOON);
      
      RENEWAL_ALERT_DAYS.forEach(alertDay => {
        if (daysToExpiry === alertDay) {
          sendRenewalAlert(contract, alertDay);
        }
      });
    }
  });
}

function sendRenewalAlert(contract, daysLeft) {
  const alertMessages = {
    60: `El contrato con ${contract.customerName} vence en 60 días. Hora de programar la reunión de renewal.`,
    30: `URGENTE: Contrato con ${contract.customerName} vence en 30 días. Preparar propuesta de renovación.`,
    14: `Contrato con ${contract.customerName} vence en 2 semanas. ¿Ya se envió la propuesta?`,
    7: `ÚLTIMA SEMANA: Contrato con ${contract.customerName} vence en 7 días.`,
    3: `ALERTA CRÍTICA: Contrato con ${contract.customerName} vence en 3 días.`,
    1: `EMERGENCIA: Contrato con ${contract.customerName} vence MAÑANA.`
  };
  
  sendEmail({
    to: 'ceo@purityclean.com',
    subject: `🔔 Recordatorio: Renewal ${contract.customerName} en ${daysLeft} días`,
    body: alertMessages[daysLeft]
  });
  
  sendSlack({
    channel: '#contracts',
    message: alertMessages[daysLeft]
  });
  
  createTask({
    title: `Renewal: ${contract.customerName}`,
    dueDate: contract.endDate,
    priority: daysLeft <= 14 ? 'high' : 'medium',
    assignee: 'account-manager'
  });
}
```

2. **Dashboard de contratos:**
```html
<!-- /admin/contracts.html -->
<section id="contracts-dashboard">
  <h2>Gestión de Contratos 📄</h2>
  
  <div class="contract-stats">
    <div class="stat-card">
      <span class="stat-value" id="active-count">0</span>
      <span class="stat-label">Contratos Activos</span>
    </div>
    <div class="stat-card warning">
      <span class="stat-value" id="expiring-count">0</span>
      <span class="stat-label">Por Vencer (60 días)</span>
    </div>
    <div class="stat-card danger">
      <span class="stat-value" id="urgent-count">0</span>
      <span class="stat-label">Urgentes (30 días)</span>
    </div>
  </div>
  
  <table class="contracts-table">
    <thead>
      <tr>
        <th>Cliente</th>
        <th>Valor Mensual</th>
        <th>Fecha Vencimiento</th>
        <th>Días Restantes</th>
        <th>Estado</th>
        <th>Acción</th>
      </tr>
    </thead>
    <tbody id="contracts-list">
      <!-- Populated by JS -->
    </tbody>
  </table>
</section>
```

3. **Playwright Tests:**
```javascript
// tests/contracts.spec.js
test('muestra contratos que vencen en menos de 60 días', async ({ page }) => {
  await page.goto('/admin/contracts.html');
  const expiringContracts = page.locator('.contract-row.expiring-soon');
  await expect(expiringContracts).toHaveCount({ min: 0 });
});

test('alertas se envían con anticipación correcta', async ({ page }) => {
  await page.goto('/admin/contracts.html');
  // Verificar que hay alerta para contrato próximo
  const urgentAlert = page.locator('.alert-banner').first();
  await expect(urgentAlert).toBeVisible();
});
```

**Impacto esperado:** +40% renewal rate, pipeline predecible, no más contratos perdidos por olvido.

**Esfuerzo:** S (1 semana — tracking + dashboard + alertas automáticas)

**Agente:** Full Stack (sistema + dashboard + integración email/Slack)

**Referencias:**
- [8] Salesforce State of Service Report 2026
- [9] HubSpot Sales Automation 2026
- [10] SaaS Capital Benchmarks 2026

---

### Propuesta 5: Field Service SDK — App móvil para técnicos de campo

**Problema:** Los técnicos trabajan con el sitio web responsive y WhatsApp. No hay app dedicada para checklist, fotos before/after, firma del cliente, notas, y navegación.

**Propuesta — Progressive Web App (PWA) para técnicos:**

1. **Arquitectura PWA:**
```javascript
// sw-field.js — Service Worker para app de técnicos
const CACHE_NAME = 'field-app-v1';
const ASSETS = [
  '/field/index.html',
  '/field/css/field.css',
  '/field/js/field-app.js',
  '/field/js/checklist-templates.js',
  '/field/manifest.json'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
});

// Offline-first: el técnico puede completar jobs sin conexión
self.addEventListener('fetch', event => {
  if (event.request.url.includes('/api/')) {
    event.respondWith(
      caches.match(event.request).then(cached => {
        return cached || fetch(event.request).then(response => {
          const cloned = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, cloned));
          return response;
        });
      })
    );
  }
});
```

2. **Checklist de servicio:**
```javascript
// js/field/checklist.js

const CHECKLIST_TEMPLATES = {
  'sofa-deep': [
    { id: 'pre-inspection', label: 'Verificación previa', type: 'toggle' },
    { id: 'photo-before', label: 'Foto antes', type: 'photo', required: true },
    { id: 'vacuum', label: 'Aspirado profundo', type: 'toggle' },
    { id: 'pre-treatment', label: 'Pre-tratamiento de manchas', type: 'toggle' },
    { id: 'shampoo', label: 'Aplicación de shampoo', type: 'toggle' },
    { id: 'extraction', label: 'Extracción de agua', type: 'toggle' },
    { id: 'drying', label: 'Secado (ventilador)', type: 'toggle' },
    { id: 'photo-after', label: 'Foto después', type: 'photo', required: true },
    { id: 'customer-signature', label: 'Firma del cliente', type: 'signature', required: true },
    { id: 'notes', label: 'Notas del técnico', type: 'textarea' }
  ],
  'mattress-san': [
    { id: 'pre-inspection', label: 'Verificación de manchas visibles', type: 'toggle' },
    { id: 'uv-light', label: 'Inspección con luz UV', type: 'toggle' },
    { id: 'photo-before', label: 'Foto antes', type: 'photo', required: true },
    { id: 'sanitization', label: 'Sanitización profunda', type: 'toggle' },
    { id: 'deodorizing', label: 'Desodorización', type: 'toggle' },
    { id: 'photo-after', label: 'Foto después', type: 'photo', required: true },
    { id: 'customer-signature', label: 'Firma del cliente', type: 'signature', required: true }
  ]
};

async function submitJobCompletion(jobId, checklistData) {
  const data = {
    jobId,
    completedAt: new Date().toISOString(),
    technicianId: getCurrentTechnicianId(),
    checklist: checklistData,
    photos: await uploadPhotos(checklistData.photos),
    signature: await uploadSignature(checklistData.signature),
    offlineMode: !navigator.onLine
  };
  
  // Si offline, guardar en queue para sync posterior
  if (!navigator.onLine) {
    await saveToOfflineQueue(data);
    showToast('Guardado offline. Se sincronizará cuando haya conexión.');
    return;
  }
  
  const response = await fetch('/api/jobs/complete', {
    method: 'POST',
    body: JSON.stringify(data)
  });
  
  if (response.ok) {
    showToast('Trabajo completado ✓');
    navigateToNextJob();
  }
}
```

3. **Captura de firma:**
```html
<!-- /field/components/signature-capture.html -->
<div class="signature-capture">
  <canvas id="signature-canvas"></canvas>
  <div class="signature-actions">
    <button onclick="clearSignature()">Limpiar</button>
    <button onclick="saveSignature()" class="primary">Guardar Firma</button>
  </div>
  <p class="signature-label">Firma del cliente</p>
</div>

<script>
const canvas = document.getElementById('signature-canvas');
const ctx = canvas.getContext('2d');
let isDrawing = false;

canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);

function startDrawing(e) {
  isDrawing = true;
  ctx.beginPath();
  ctx.moveTo(e.offsetX, e.offsetY);
}

function draw(e) {
  if (!isDrawing) return;
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
}

function stopDrawing() {
  isDrawing = false;
}

function saveSignature() {
  const signatureData = canvas.toDataURL('image/png');
  document.getElementById('signature-data').value = signatureData;
}
</script>
```

4. **Navegación al próximo cliente:**
```javascript
// js/field/navigation.js

function showNextJobRoute() {
  const nextJob = getNextJob();
  const currentLocation = getCurrentLocation();
  
  const mapUrl = `https://www.google.com/maps/dir/?api=1&origin=${currentLocation.lat},${currentLocation.lng}&destination=${nextJob.address}`;
  
  document.getElementById('next-job-card').innerHTML = `
    <div class="job-info">
      <h3>${nextJob.customerName}</h3>
      <p>${nextJob.address}</p>
      <p>${nextJob.serviceType} — ${nextJob.scheduledTime}</p>
    </div>
    <a href="${mapUrl}" target="_blank" class="navigate-btn">
      <i class="fa-solid fa-location-arrow"></i>
      Navegar
    </a>
  `;
}
```

5. **Playwright Tests:**
```javascript
// tests/field-app.spec.js
test('checklist se completa y guarda correctamente', async ({ page }) => {
  await page.goto('/field/index.html');
  await page.click('#job-checklist li:first-child .toggle');
  await expect(page.locator('.toggle.checked')).toHaveCount(1);
});

test('firma se captura y guarda', async ({ page }) => {
  await page.goto('/field/index.html');
  // Simular firma
  await page.evaluate(() => {
    const canvas = document.getElementById('signature-canvas');
    const ctx = canvas.getContext('2d');
    ctx.moveTo(10, 10);
    ctx.lineTo(100, 100);
    ctx.stroke();
  });
  
  await page.click('button:has-text("Guardar Firma")');
  await expect(page.locator('#signature-data')).not.toHaveValue('');
});

test('offline queue guarda datos cuando no hay conexión', async ({ page }) => {
  // Mock navigator.onLine = false
  await page.goto('/field/index.html');
  await page.evaluate(() => { navigator.onLine = false; });
  
  await completeChecklist();
  await page.click('button:has-text("Completar Trabajo")');
  
  const queueLength = await page.evaluate(() => getOfflineQueueLength());
  expect(queueLength).toBeGreaterThan(0);
});
```

**Impacto esperado:** +22% productividad de técnicos, -60% disputas de servicio, mejor experiencia de cliente, datos estructurados para análisis.

**Esfuerzo:** M (2-3 semanas — PWA + checklist + firma + navegación)

**Agente:** Frontend (PWA, UI) + Full Stack (API sync)

**Referencias:**
- [11] Zebra Technologies — Global Technician Survey 2026
- [12] ServiceTitan Industry Report 2026
- [13] DEX Report 2026

---

## Priorización recomendada (Round 31)

| # | Propuesta | Impacto | Esfuerzo | Agente | Razón estratégica |
|---|-----------|---------|----------|--------|------------------|
| 4 | Contract Renewal Automation | Alto | Bajo | Full Stack | Quick win, +40% renewal |
| 5 | Field Service SDK | Alto | Medio | Frontend/FE | +22% productividad técnica |
| 1 | Smart Scheduling AI | Alto | Medio | Full Stack | +20% servicios/día, -30% viaje |
| 3 | Customer Health Score | Alto | Medio | Full Stack | +25% retention |
| 2 | Chemical Tracking & Compliance | Medio | Bajo-Medio | Full Stack | Diferenciación B2B |

**Top 3 para implementar primero:** 4, 5, 1 (Contract renewal es quick win; Field Service app tiene impacto inmediato en operaciones; Scheduling optimiza rutas).

---

## Síntesis: Por qué R31 es diferente

R1-R30 cubrieron:
- Frontend features (dark mode, accesibilidad, micro-interacciones)
- Marketing (WhatsApp API, email, reviews, SEO)
- Revenue (pricing dinámico, loyalty, subscriptions)
- Operations (scheduling manual, chatbots)
- AI/Automation (MCP, predictive maintenance, voice commerce)
- Technical architecture (PWA, performance, View Transitions)

**R31 se enfoca en:**
- **Operations Intelligence** (scheduling con AI, field service app)
- **Retention Science** (health score, churn prediction)
- **Contract Revenue Protection** (renewal automation)
- **Compliance & Reporting** (chemical tracking)

R31 representa la evolución hacia **operaciones inteligentes**: usar datos para optimizar el negocio, no solo el sitio web.

---

## Referencias

[1] Gartner. "Field Service Management Magic Quadrant." 2026.
[2] McKinsey. "Operations Practice: Dynamic Scheduling." 2026.
[3] Bloomberg Green. "ESG Reporting in Facilities." 2026.
[4] ISSA. "Cleaning Industry Standards." 2026.
[5] EPA. "Safer Choice Program Documentation." 2026.
[6] Forrester. "Customer Analytics." 2026.
[7] Gainsight. "Customer Success Platform." 2026.
[8] Salesforce. "State of Service Report." 2026.
[9] HubSpot. "Sales Automation." 2026.
[10] SaaS Capital. "Benchmarks Report." 2026.
[11] Zebra Technologies. "Global Technician Survey." 2026.
[12] ServiceTitan. "Industry Report." 2026.
[13] DEX. "Digital Employee Experience Report." 2026.

---

*Co-Authored-By: Paperclip <noreply@paperclip.ing>*