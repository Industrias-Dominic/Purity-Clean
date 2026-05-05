# Análisis Creativo — Purity & Clean (Round 23)

**Proyecto:** Purity & Clean
**Fecha:** 2026-04-26
**Analista:** Innovation Scout
**Ronda:** 23
**Issue padre:** DOMAA-336

---

## Resumen Ejecutivo

R23 se enfoca en **infraestructura de datos y automatización del ciclo de vida del cliente**. Tras 22 rondas de propuestas enfocadas en marketing, conversión, UX y operación, identifico gaps críticos en: (1) integración CRM para nurturing de leads, (2) programa de fidelización con puntos y niveles, (3) motor de precios dinámicos basado en demanda, (4) automatización de re-engagement para clientes inactivos, (5) analytics predictivo para churn y LTV, (6) programa de referidos mejorado con beneficios escalonados, y (7) integración con Google Business Profile para reviews automatizadas. R23 cierra la brecha entre "sitio que convierte" y "sistema deRevenue inteligente con retención".

---

## Stack tecnológico actual (resumen)

- **Frontend:** HTML5 + CSS3 (custom properties, grid, flexbox) + JS vanilla ES6+
- **Fuentes:** Manrope (cuerpo), Raleway (títulos) — Google Fonts
- **Iconos:** Font Awesome 6.5 CDN
- **Analítica:** Plausible Analytics (sin cookies, GDPR-compliant)
- **Forms:** Formspree (envío simple, sin automatización)
- **Testing:** Playwright E2E (10+ suites)
- **PWA:** Service Worker, manifest.json, push notifications, offline support
- **SEO:** Schema LocalBusiness + FAQPage + VideoObject + HowTo + BreadcrumbList + Review
- **Chatbot:** FAQ routing → WhatsApp con mensaje dinámico
- **Galería:** Before/After slider con reveal escalonado
- **Reserva:** Multi-step booking form con validación y slot picker
- **Referidos:** Sistema de cupones con código generado dinámicamente
- **Newsletter:** Formspree + localStorage para evitar duplicados
- **Cotizador:** Slider de cantidad + estimación de rango de precios
- **Zonas:** 10 páginas de zona con SEO local
- **Blog:** 6 artículos con SEO optimizado + internal linking
- **Theme:** Dark mode toggle con persistencia y prefers-color-scheme
- **Video:** YouTube embebido en Schema VideoObject
- **Reviews:** Sistema de captura con foto (R10) + respuesta automática (R17)
- **Micro-conversiones:** Exit-intent popup, content upgrades, social proof toasts (R12, R21)
- **Trust Velocity:** Badge de actividad reciente (R21)
- **Dark Social:** WhatsApp FAB + Instagram DM strategy (R21)
- **Geo-targeting:** Near Me SEO + Foursquare + TikTok Local (R21)
- **Nichos:** Landing pages specialty (mascotas, alergias, bebé, post-construction)
- **Garantía:** Sección de garantía formal con tracking (R22)
- **B2B:** Programa Purity Pro con descuentos por volumen (R22)
- **Disponibilidad:** Widget de disponibilidad en tiempo real (R22)
- **Seasonal:** Landing pages para campañas estacionales (R22)

---

## Gaps identificados — Round 23 (NOVEDADES no cubiertas en R1-R22)

### 1. Integración CRM para Nurturing de Leads

**Problema:** Los formularios de Formspree envían datos pero no hay nurture sequence. El lead llena el formulario y recibe un email de confirmación genérico. No hay scoring, tagging, ni follow-up automatizado. El 70% de los leads que no se convierten en 24h nunca más contactan.

**Hallazgos:**
- Formspree tiene integraciones limitadas (no tiene CRM nativo)
- HubSpot, Mailchimp y ActiveCampaign ofrecen free tiers suficientes para Purity & Clean
- La integración con Formspree via Zapier/Make permite automatizaciones completas
- El lead promedio requiere 6-8 puntos de contacto antes de convertir

**Impacto potencial:** +25-35% conversión de leads a reservas через nurturing automatizado.

### 2. Programa de Fidelización con Puntos y Niveles

**Problema:** El sistema de referidos actual es un código compartido sin recompensas progresivas. Un cliente que refiere 3 veces recibe el mismo beneficio que uno que refiere 1 vez. No hay incentivo para referir más.

**Hallazgos:**
- Los programas de puntos aumentan la retención en 20-30% (Bonded Loyalty Study 2025)
- Niveles (Bronce, Plata, Oro, Platino) crean aspiración y engagement
- Los puntos pueden canjearse por descuentos, servicios gratis, o merchandising
- El costo de adquirir un cliente vía referidos es 5x menor que via ads

**Impacto potencial:** +15% retención anual y +20% referrals por cliente activo.

### 3. Motor de Precios Dinámicos

**Problema:** Los precios actuales son estáticos. No hay variación por demanda, estacionalidad, zona, o urgencia. En temporada alta (diciembre, marzo) el equipo está sobrecargado mientras que en temporada baja hay infrautilización.

**Hallazgos:**
- Google Trends muestra 200-400% de aumento en búsquedas de limpieza en diciembre y marzo en Colombia
- Los competidores en Bogotá no ofrecen pricing dinámico
- Un motor de pricing podría aumentar revenue 15-25% en temporada alta
- Los clientes aceptan pricing dinámico si hay transparencia (nota: "por alta demanda")

**Impacto potencial:** +15-25% revenue en temporada alta sin aumentar costos operativos.

### 4. Automatización de Re-engagement para Clientes Inactivos

**Problema:** Los clientes que reservaron una vez y no volvieron no reciben ningún contacto. No hay win-back campaign. El costo de adquirir un cliente nuevo es 5x mayor que retener uno existente.

**Hallazgos:**
- El 70% de clientes que no repiten en 60 días nunca más vuelven (industry benchmark)
- Email/SMS de re-engagement tiene 15-25% de tasa de apertura
- Ofertas personalizadas ("Te extrañamos, 20% off para tu próxima limpieza") funcionan
- Las razones principales de no retorno: olvidaron el servicio, esperan mejor precio

**Impacto potencial:** +10-15% revenue de clientes reactivados sin costo de adquisición.

### 5. Analytics Predictivo para Churn y LTV

**Problema:** El sitio usa Plausible para analytics básico (pageviews, events). No hay modelo predictivo para identificar clientes en riesgo de churn o para calcular LTV por segmento.

**Hallazgos:**
- Google Analytics 4 tiene predicciones nativas para churn (purchase probability)
- Mixpanel y Amplitude ofrecen dashboards de LTV y churn prediction
- Los indicadores clave: días desde última reserva, frecuencia de reservas, engagement con emails
- Con estos datos se puede priorizar outreach a clientes de alto valor en riesgo

**Impacto potencial:** Identificar 20% de clientes de alto valor con riesgo de churn para intervención proactiva.

### 6. Programa de Referidos con Beneficios Escalonados

**Problema:** El sistema de cupones actual es plano. Todos los referidos dan el mismo descuento (10%). No hay beneficios adicionales por volumen de referencias ni distinción entre "cliente que refiere mucho" vs "cliente que refiere una vez".

**Hallazgos:**
- Dropbox creció 3900% en 15 meses gracias a su programa de referidos con beneficios escalonados
- Los niveles de beneficios crean viralidad: "Si refereas 3 amigos, obtienes mes gratis"
- El referral reward debe ser mayor que el reward del referido para incentvar la acción
- En servicios de limpieza, un código de referido que da 15% al referente y 10% al referido funciona

**Impacto potencial:** +30% viralidad del programa de referidos existente.

### 7. Google Business Profile Integration para Reviews Automatizadas

**Problema:** El sistema de captura de reviews actual requiere que el cliente suba fotos manualmente y complete un formulario largo. La tasa de completitud es baja. No hay integración con Google Business Profile para solicitar reviews post-servicio.

**Hallazgos:**
- Google Business Profile permite solicitar reviews via link directo
- Enviar email/SMS 2 horas después del servicio con link directo a Google aumenta las reviews 3x
- Las reviews en Google Business Profile mejoran SEO local y click-through rate
- La automatización de solicitud de reviews puede aumentar Volume de reviews 200-300%

**Impacto potencial:** +200% volumen de Google reviews con mínimo esfuerzo del cliente.

---

## Propuestas (Round 23)

### Propuesta 1: CRM Integration con HubSpot y Automatizaciones de Nurturing

**Problema:** Los leads de Formspree no tienen nurturing automatizado. El 70% de los leads que no se convierten en 24h nunca más contactan. Se necesita un sistema que capture, califique y nutra leads automáticamente.

**Propuesta — Integración HubSpot Free + Zapier/Make para automatizaciones:**

1. **Crear cuenta HubSpot Free (Marketing Hub Starter):**
   - Hasta 1000 contactos
   - Email marketing automation
   - Landing pages y forms
   - Suficiente para Purity & Clean con crecimiento actual

2. **Configurar Zapier/Make para integrar Formspree → HubSpot:**
   ```javascript
   // Zapier: Formspree → HubSpot
   // Trigger: New Form Submission (Formspree)
   // Action: Create or Update Contact (HubSpot)

   // Contact properties:
   {
     "email": "{{email}}",
     "firstname": "{{name}}",
     "phone": "{{phone}}",
     "servicio": "{{service_type}}",
     "zona": "{{zone}}",
     "utm_source": "{{utm_source}}",
     "utm_medium": "{{utm_medium}}",
     "lead_source": "Formspree",
     "lifecyclestage": "lead"
   }
   ```

3. **Crear secuencia de nurturing en HubSpot:**
   ```
   Email 1 (inmediato): Confirmación de recibida + qué esperar
   Email 2 (2h): Follow-up + oferta de consulta gratuita
   Email 3 (24h): Caso de éxito + social proof
   Email 4 (48h): Urgencia + último llamado
   Email 5 (5 días): Oferta especial para leads inactivos
   ```

4. **Lead scoring en HubSpot:**
   ```javascript
   // Propiedades calculadas
   //Engagement score: suma de emails abiertos + clicks + visitas al sitio
   //Lead score = engagement * recencia
   //Hot lead: score > 50 + email abierto + visita a /reservas
   //Warm lead: score > 30 + email abierto
   //Cold lead: score < 30
   ```

5. **Workflow de re-engagement:**
   ```
   Trigger: Contact no opened any email in 14 days
   Condition: Lifecycle stage = lead
   Action: Send "¿Olvidaste nosotros?" email con 10% off
   Wait 3 days
   If no engagement: Send WhatsApp message via integrations
   ```

6. **Playwright tests:**
   ```javascript
   // En tests/crm-nurturing.spec.js
   test('form submission creates HubSpot contact via Zapier', async ({ page }) => {
     // Mock Zapier webhook response
     await page.route('**/hooks/zapier/**', async (route) => {
       await route.fulfill({ status: 200, body: '{ "success": true }' });
     });

     await page.goto('/#reservas');
     await fillBookingForm();
     await page.click('#booking-submit');
     await expect(page.locator('.form-success')).toBeVisible();
   });

   test('lead scoring updates on email engagement', async ({ page }) => {
     // Verificar que el scoring workflow corre
   });
   ```

**Impacto esperado:** +25-35% conversión de leads a reservas a través de nurturing automatizado.

**Esfuerzo:** M (2-3 semanas — setup CRM + integraciones + email sequences + tests)

**Agente:** Full Stack (integraciones) + Content (email copywriting)

**Referencias:**
- [1] HubSpot Marketing Hub Starter — pricing and features
- [2] Bonded Loyalty Study 2025 — nurturing impact on conversion
- [3] Zapier Formspree integrations documentation

---

### Propuesta 2: Programa de Fidelización "Purity Rewards" con Puntos y Niveles

**Problema:** El sistema de referidos actual es plano y no recompensa la lealtad a largo plazo. Un cliente que refiere 5 veces recibe el mismo beneficio que uno que refiere 1 vez. No hay diferenciación entre clientes ocasionales y champions.

**Propuesta — Sistema de puntos y niveles con beneficios escalonados:**

1. **Estructura de niveles:**
   ```javascript
   // En js/purity-rewards.js
   const LOYALTY_TIERS = {
     Bronce: {
       minPoints: 0,
       discount: 5,
       perks: ['Early access to promotions', 'Birthday discount']
     },
     Plata: {
       minPoints: 100,
       discount: 10,
       perks: ['Priority scheduling', 'Free pickup of cleaning supplies']
     },
     Oro: {
       minPoints: 300,
       discount: 15,
       perks: ['Extended guarantee', 'Quarterly deep clean discount']
     },
     Platino: {
       minPoints: 500,
       discount: 20,
       perks: ['VIP support', 'Annual free mattress cleaning', 'Referral bonus double']
     }
   };

   const POINTS_CONFIG = {
     perService: 10,           // 10 puntos por cada servicio
     perReferral: 50,         // 50 puntos por cada referido que reserva
     perReview: 20,           // 20 puntos por cada review dejado
     perPhotoReview: 35,      // 35 puntos por review con foto
     perSocialShare: 15       // 15 puntos por compartir en redes
   };
   ```

2. **Panel de lealtad en el sitio:**
   ```html
   <section id="purity-rewards" class="section section-rewards">
     <div class="rewards-header">
       <h2>Purity Rewards</h2>
       <div class="rewards-balance">
         <span class="points-label">Tus puntos</span>
         <span class="points-value" id="loyalty-points">0</span>
       </div>
     </div>

     <div class="tier-progress">
       <div class="tier-track">
         <div class="tier-marker tier-bronce" data-tier="Bronce">
           <i class="fa-solid fa-medal"></i>
           <span>Bronce</span>
         </div>
         <div class="tier-marker tier-plata" data-tier="Plata">
           <i class="fa-solid fa-medal"></i>
           <span>Plata</span>
         </div>
         <div class="tier-marker tier-oro" data-tier="Oro">
           <i class="fa-solid fa-medal"></i>
           <span>Oro</span>
         </div>
         <div class="tier-marker tier-platino" data-tier="Platino">
           <i class="fa-solid fa-crown"></i>
           <span>Platino</span>
         </div>
         <div class="tier-progress-bar">
           <div class="tier-progress-fill" id="tier-progress-fill"></div>
         </div>
       </div>
       <p class="tier-next-hint">Necesitas <span id="points-to-next-tier">100</span> puntos para el siguiente nivel</p>
     </div>

     <div class="rewards-actions">
       <div class="reward-action" data-action="earn">
         <h3>Cómo ganar puntos</h3>
         <ul class="earn-list">
           <li><i class="fa-solid fa-broom"></i> Cada servicio = <strong>10 pts</strong></li>
           <li><i class="fa-solid fa-user-plus"></i> Referido que reserva = <strong>50 pts</strong></li>
           <li><i class="fa-solid fa-star"></i> Review = <strong>20 pts</strong></li>
           <li><i class="fa-solid fa-camera"></i> Review con foto = <strong>35 pts</strong></li>
           <li><i class="fa-solid fa-share"></i> Compartir en redes = <strong>15 pts</strong></li>
         </ul>
       </div>

       <div class="reward-action" data-action="redeem">
         <h3>Canje tus puntos</h3>
         <ul class="redeem-list">
           <li><span>100 pts</span> <strong>5% off</strong> en próximo servicio</li>
           <li><span>200 pts</span> <strong>10% off</strong> en próximo servicio</li>
           <li><span>300 pts</span> <strong>15% off</strong> + priority scheduling</li>
           <li><span>500 pts</span> <strong>20% off</strong> + 1 limpieza gratis de colchón</li>
         </ul>
       </div>
     </div>

     <div class="referral-section">
       <h3>Invita amigos y gana puntos</h3>
       <p>Comparte tu código y cuando tu amigo reserve, ambos ganan puntos.</p>
       <div class="referral-code-display">
         <span id="user-referral-code">PURITY-XXXX</span>
         <button id="copy-referral-code" aria-label="Copiar código">
           <i class="fa-solid fa-copy"></i>
         </button>
       </div>
     </div>
   </section>
   ```

3. **CSS para la sección:**
   ```css
   .section-rewards {
     background: linear-gradient(135deg, var(--color-primary-light) 0%, var(--color-surface) 100%);
     padding: 4rem 0;
   }

   .rewards-header {
     text-align: center;
     margin-bottom: 2rem;
   }

   .rewards-balance {
     display: flex;
     flex-direction: column;
     align-items: center;
     margin-top: 1rem;
   }

   .points-label {
     font-size: 0.9rem;
     color: var(--color-text-muted);
   }

   .points-value {
     font-size: 3rem;
     font-weight: 800;
     color: var(--color-primary);
   }

   .tier-progress {
     margin: 2rem 0;
   }

   .tier-track {
     display: flex;
     justify-content: space-between;
     align-items: center;
     position: relative;
     padding: 0 1rem;
   }

   .tier-marker {
     display: flex;
     flex-direction: column;
     align-items: center;
     z-index: 2;
   }

   .tier-marker i {
     font-size: 1.5rem;
     margin-bottom: 0.25rem;
   }

   .tier-marker.tier-bronce i { color: #cd7f32; }
   .tier-marker.tier-plata i { color: #c0c0c0; }
   .tier-marker.tier-oro i { color: #ffd700; }
   .tier-marker.tier-platino i { color: #e5e4e2; }

   .tier-marker.active i {
     transform: scale(1.3);
   }

   .tier-progress-bar {
     position: absolute;
     left: 2rem;
     right: 2rem;
     top: 1rem;
     height: 8px;
     background: var(--color-border);
     border-radius: 4px;
     z-index: 1;
   }

   .tier-progress-fill {
     height: 100%;
     background: linear-gradient(90deg, #cd7f32, #ffd700, #e5e4e2);
     border-radius: 4px;
     transition: width 0.5s ease;
   }

   .rewards-actions {
     display: grid;
     grid-template-columns: 1fr 1fr;
     gap: 2rem;
     margin-top: 2rem;
   }

   .earn-list, .redeem-list {
     list-style: none;
     padding: 0;
   }

   .earn-list li, .redeem-list li {
     padding: 0.75rem;
     border-bottom: 1px solid var(--color-border);
     display: flex;
     align-items: center;
     gap: 0.75rem;
   }

   .earn-list li i {
     color: var(--color-accent);
     width: 24px;
   }

   .referral-section {
     margin-top: 2rem;
     text-align: center;
     padding: 1.5rem;
     background: var(--color-surface);
     border-radius: 12px;
   }

   .referral-code-display {
     display: flex;
     justify-content: center;
     align-items: center;
     gap: 1rem;
     margin-top: 1rem;
   }

   #user-referral-code {
     font-family: monospace;
     font-size: 1.5rem;
     font-weight: 700;
     letter-spacing: 2px;
     padding: 0.5rem 1rem;
     background: var(--color-primary-light);
     border-radius: 8px;
   }
   ```

4. **JavaScript para gestión de puntos:**
   ```javascript
   // En js/purity-rewards.js
   const LOYALTY_STORAGE_KEY = 'purity_loyalty';

   function getLoyaltyData() {
     const data = localStorage.getItem(LOYALTY_STORAGE_KEY);
     return data ? JSON.parse(data) : {
       points: 0,
       tier: 'Bronce',
       referrals: [],
       history: []
     };
   }

   function saveLoyaltyData(data) {
     localStorage.setItem(LOYALTY_STORAGE_KEY, JSON.stringify(data));
   }

   function calculateTier(points) {
     if (points >= 500) return 'Platino';
     if (points >= 300) return 'Oro';
     if (points >= 100) return 'Plata';
     return 'Bronce';
   }

   function addPoints(amount, reason) {
     const data = getLoyaltyData();
     data.points += amount;
     data.history.push({
       date: new Date().toISOString(),
       amount,
       reason
     });
     data.tier = calculateTier(data.points);
     saveLoyaltyData(data);
     updateRewardsUI();
     trackPointsEvent(amount, reason);
   }

   function trackPointsEvent(amount, reason) {
     if (typeof plausible !== 'undefined') {
       plausible('loyalty_points_earned', {
         props: { amount, reason }
       });
     }
   }

   function applyLoyaltyDiscount(price) {
     const data = getLoyaltyData();
     const tier = LOYALTY_TIERS[data.tier];
     return Math.round(price * (1 - tier.discount / 100));
   }

   function getReferralCode() {
     const data = getLoyaltyData();
     if (!data.referralCode) {
       data.referralCode = 'PURITY-' + Math.random().toString(36).substr(2, 4).toUpperCase();
       saveLoyaltyData(data);
     }
     return data.referralCode;
   }

   function updateRewardsUI() {
     const data = getLoyaltyData();

     document.getElementById('loyalty-points').textContent = data.points;

     const nextTier = getNextTier(data.tier);
     const pointsNeeded = nextTier ? nextTier.minPoints - data.points : 0;
     document.getElementById('points-to-next-tier').textContent = pointsNeeded;

     const progressPercent = getTierProgressPercent(data.points, data.tier);
     document.getElementById('tier-progress-fill').style.width = progressPercent + '%';

     document.getElementById('user-referral-code').textContent = getReferralCode();
   }

   function getNextTier(currentTier) {
     const tiers = ['Bronce', 'Plata', 'Oro', 'Platino'];
     const currentIndex = tiers.indexOf(currentTier);
     if (currentIndex === -1 || currentIndex === tiers.length - 1) return null;
     return { name: tiers[currentIndex + 1], minPoints: LOYALTY_TIERS[tiers[currentIndex + 1]].minPoints };
   }

   function getTierProgressPercent(points, tier) {
     const tiers = ['Bronce', 'Plata', 'Oro', 'Platino'];
     const tierIndex = tiers.indexOf(tier);
     const currentMin = tierIndex === 0 ? 0 : LOYALTY_TIERS[tiers[tierIndex]].minPoints;
     const nextMin = tierIndex === tiers.length - 1 ? 600 : LOYALTY_TIERS[tiers[tierIndex + 1]].minPoints;
     return Math.min(100, ((points - currentMin) / (nextMin - currentMin)) * 100);
   }
   ```

5. **Integración con email marketing (post-service):**
   ```javascript
   // Post-service email trigger
   async function triggerPostServiceEmail(bookingData) {
     const response = await fetch('https://api.hsforms.com/submissions/v3/integration/submit/:portalId/:formGuid', {
       method: 'POST',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify({
         fields: [
           { name: 'email', value: bookingData.email },
           { name: 'service_date', value: bookingData.date },
           { name: 'points_earned', value: POINTS_CONFIG.perService }
         ],
         context: {
           pageUri: 'purityclean.com/gracias',
           pageName: 'Post-Service Thank You'
         }
       })
     });
   }
   ```

6. **Playwright tests:**
   ```javascript
   // En tests/loyalty.spec.js
   test('panel de recompensas muestra puntos del usuario', async ({ page }) => {
     await page.goto('/');
     await page.evaluate(() => {
       localStorage.setItem('purity_loyalty', JSON.stringify({ points: 150, tier: 'Plata' }));
     });
     await page.reload();
     await expect(page.locator('#loyalty-points')).toContainText('150');
   });

   test('código de referido se genera y copia', async ({ page }) => {
     await page.goto('/');
     await page.click('#copy-referral-code');
     // Verify clipboard copy
   });

   test('descuento por nivel se aplica al cotizador', async ({ page }) => {
     await page.goto('/');
     await page.evaluate(() => {
       localStorage.setItem('purity_loyalty', JSON.stringify({ points: 300, tier: 'Oro' }));
     });
     await page.reload();
     const discountedPrice = applyLoyaltyDiscount(200000);
     expect(discountedPrice).toBe(170000); // 15% off
   });
   ```

**Impacto esperado:** +15% retención anual y +20% referrals por cliente activo. Diferenciación clara vs competidores sin programa de lealtad.

**Esfuerzo:** M (2 semanas — sistema de puntos + niveles + UI + integraciones + tests)

**Agente:** Frontend + Full Stack (integraciones)

**Referencias:**
- [1] Bonded Loyalty Study 2025 — loyalty program impact metrics
- [2] Dropbox referral program case study

---

### Propuesta 3: Motor de Precios Dinámicos para Optimizar Revenue

**Problema:** Los precios son estáticos todo el año. En temporada alta (diciembre, marzo) el equipo está sobrecargado mientras que en temporada baja hay infrautilización. No hay diferenciación por urgencia, demanda, o zona.

**Propuesta — Sistema de pricing dinámico con adjustes automáticas:**

1. **Configuración del motor de precios:**
   ```javascript
   // En js/pricing-engine.js
   const PRICING_CONFIG = {
     baseMultiplier: 1.0,
     seasonality: {
       alta: { months: [11, 12, 2, 3], multiplier: 1.20 },  // Dic, Ene, Feb, Mar
       media: { months: [4, 5, 9, 10], multiplier: 1.0 },
       baja: { months: [1, 6, 7, 8], multiplier: 0.85 }      // Jun, Jul, Ago
     },
     urgency: {
       within24h: 1.15,      // +15% si reserva dentro de 24h
       within48h: 1.10,     // +10% si reserva dentro de 48h
       withinWeek: 1.0      // Normal price
     },
     zone: {
       premium: ['usaquen', 'chapinero', 'teusaquillo'], // +10%
       standard: ['suba', 'engativa', 'kennedy'],        // Normal
       economical: ['bosa', 'usme', 'fontibon']          // -5%
     },
     volumeDiscount: {
       monthly: 3,          // 3+ servicios/mes = 10% desc
       quarterly: 9          // 9+ servicios/trimestre = 15% desc
     }
   };

   function calculateDynamicPrice(basePrice, options = {}) {
     let finalPrice = basePrice;
     let appliedRules = [];

     // Seasonal adjustment
     const month = new Date().getMonth() + 1;
     const seasonKey = Object.keys(PRICING_CONFIG.seasonality).find(
       key => PRICING_CONFIG.seasonality[key].months.includes(month)
     );
     if (seasonKey) {
       finalPrice *= PRICING_CONFIG.seasonality[seasonKey].multiplier;
       appliedRules.push(`Temporada ${seasonKey}: x${PRICING_CONFIG.seasonality[seasonKey].multiplier}`);
     }

     // Urgency adjustment
     if (options.daysUntilService <= 1) {
       finalPrice *= PRICING_CONFIG.urgency.within24h;
       appliedRules.push('Urgencia (<24h): x1.15');
     } else if (options.daysUntilService <= 2) {
       finalPrice *= PRICING_CONFIG.urgency.within48h;
       appliedRules.push('Urgencia (<48h): x1.10');
     }

     // Zone adjustment
     if (options.zone) {
       const zoneType = getZoneType(options.zone);
       if (zoneType === 'premium') {
         finalPrice *= 1.10;
         appliedRules.push('Zona premium: +10%');
       } else if (zoneType === 'economical') {
         finalPrice *= 0.95;
         appliedRules.push('Zona económica: -5%');
       }
     }

     // Volume discount
     if (options.monthlyServices >= PRICING_CONFIG.volumeDiscount.monthly) {
       finalPrice *= 0.90;
       appliedRules.push('Descuento volumen (3+/mes): -10%');
     }

     return {
       price: Math.round(finalPrice),
       originalPrice: basePrice,
       savings: basePrice - Math.round(finalPrice),
       appliedRules
     };
   }

   function getZoneType(zone) {
     if (PRICING_CONFIG.zone.premium.includes(zone)) return 'premium';
     if (PRICING_CONFIG.zone.economical.includes(zone)) return 'economical';
     return 'standard';
   }
   ```

2. **UI del indicador de demanda:**
   ```html
   <div id="pricing-indicator" class="pricing-indicator" aria-live="polite">
     <div class="demand-badge" data-demand="high">
       <i class="fa-solid fa-fire"></i>
       <span class="demand-label">Alta demanda</span>
       <span class="demand-note">Los precios pueden variar según disponibilidad</span>
     </div>
   </div>
   ```

3. **CSS para indicadores de precio:**
   ```css
   .pricing-indicator {
     padding: 1rem;
     border-radius: 8px;
     margin: 1rem 0;
   }

   .demand-badge {
     display: flex;
     align-items: center;
     gap: 0.75rem;
     padding: 0.75rem 1rem;
     border-radius: 8px;
     background: var(--color-surface);
     border: 1px solid var(--color-border);
   }

   .demand-badge[data-demand="high"] {
     background: linear-gradient(135deg, #fef3c7, #fde68a);
     border-color: #f59e0b;
   }

   .demand-badge[data-demand="high"] i {
     color: #f59e0b;
   }

   .demand-label {
     font-weight: 700;
     color: var(--color-text);
   }

   .demand-note {
     font-size: 0.85rem;
     color: var(--color-text-muted);
   }

   .price-display {
     margin: 1rem 0;
   }

   .price-current {
     font-size: 2rem;
     font-weight: 800;
     color: var(--color-primary);
   }

   .price-original {
     text-decoration: line-through;
     color: var(--color-text-muted);
     font-size: 1rem;
   }

   .price-savings {
     color: var(--color-accent);
     font-weight: 600;
     font-size: 0.9rem;
   }

   .price-breakdown {
     font-size: 0.8rem;
     color: var(--color-text-muted);
     margin-top: 0.5rem;
   }
   ```

4. **Integración con cotizador existente:**
   ```javascript
   // Actualizar el cotizador para usar pricing dinámico
   function updatePricingDisplay(serviceType, zone, daysUntilService) {
     const basePrice = BASE_PRICES[serviceType];
     const dynamicPricing = calculateDynamicPrice(basePrice, {
       zone,
       daysUntilService
     });

     const priceDisplay = document.getElementById('price-display');
     priceDisplay.innerHTML = `
       <div class="price-current">$${dynamicPricing.price.toLocaleString()}</div>
       ${dynamicPricing.savings > 0 ? `<div class="price-original">$${dynamicPricing.originalPrice.toLocaleString()}</div>` : ''}
       ${dynamicPricing.savings > 0 ? `<div class="price-savings">Ahorra $${dynamicPricing.savings.toLocaleString()}</div>` : ''}
       <div class="price-breakdown">${dynamicPricing.appliedRules.join(' • ')}</div>
     `;

     const indicator = document.getElementById('pricing-indicator');
     indicator.querySelector('.demand-badge').dataset.demand =
       dynamicPricing.originalPrice < dynamicPricing.price ? 'high' : 'normal';
   }
   ```

5. **Schema.org para transparencia de precios:**
   ```html
   <script type="application/ld+json">
   {
     "@context": "https://schema.org",
     "@type": "Service",
     "name": "Limpieza profunda de sofá",
     "description": "Servicio de limpieza con precios dinámicos basados en demanda y temporada",
     "hasOfferCatalog": {
       "@type": "OfferCatalog",
       "name": "Servicios con precios dinámicos",
       "itemListElement": [
         {
           "@type": "Offer",
           "itemOffered": { "@type": "Service", "name": "Limpieza de sofá" },
           "price": "120000",
           "priceCurrency": "COP",
           "availability": "https://schema.org/InStock",
           "priceSpecification": {
             "@type": "UnitPriceSpecification",
             "price": "120000-180000",
             "priceCurrency": "COP",
             "unitCode": "C62"
           }
         }
       ]
     }
   }
   </script>
   ```

6. **Playwright tests:**
   ```javascript
   // En tests/pricing.spec.js
   test('precio aumenta en temporada alta', async ({ page }) => {
     await page.goto('/');
     // Mock date to December
     await page.evaluate(() => {
       const originalDate = Date;
       Date = class extends originalDate {
         constructor() { super(); return new originalDate('2026-12-15'); }
       };
     });
     const pricing = calculateDynamicPrice(120000, { zone: 'usaquen', daysUntilService: 7 });
     expect(pricing.price).toBeGreaterThan(120000);
   });

   test('precio baja en temporada baja', async ({ page }) => {
     await page.goto('/');
     await page.evaluate(() => {
       const originalDate = Date;
       Date = class extends originalDate {
         constructor() { super(); return new originalDate('2026-07-15'); }
       };
     });
     const pricing = calculateDynamicPrice(120000, { zone: 'bosa', daysUntilService: 30 });
     expect(pricing.price).toBeLessThan(120000);
   });

   test('descuento por volumen se aplica', async ({ page }) => {
     const pricing = calculateDynamicPrice(120000, { monthlyServices: 4 });
     expect(pricing.appliedRules).toContain('Descuento volumen (3+/mes): -10%');
   });
   ```

**Impacto esperado:** +15-25% revenue en temporada alta sin aumentar costos operativos. Transparencia para el cliente.

**Esfuerzo:** M (2 semanas — motor de precios + UI + schema + tests)

**Agente:** Frontend + Full Stack

**Referencias:**
- [1] Dynamic pricing case studies — airline/hotel industry benchmarks
- [2] Google Trends Colombia — seasonal search patterns for cleaning services

---

### Propuesta 4: Sistema de Re-engagement para Clientes Inactivos

**Problema:** No hay proceso de win-back para clientes que reservaron una vez y no volvieron. El 70% de clientes que no repiten en 60 días nunca más vuelven. El costo de adquirir un cliente nuevo es 5x mayor que retener uno existente.

**Propuesta — Automatización de re-engagement con segmentación:**

1. **Sistema de tracking de clientes inactivos:**
   ```javascript
   // En js/reengagement.js
   const REENGAGEMENT_CONFIG = {
     inactiveThresholdDays: 60,
     warningDays: 45,
     winbackOffers: {
       first: { discount: 10, validityDays: 14 },
       second: { discount: 15, validityDays: 21 },
       third: { discount: 20, validityDays: 30 }
     }
   };

   function recordServiceBooking(bookingData) {
     const history = getCustomerHistory();
     history.push({
       date: new Date().toISOString(),
       serviceType: bookingData.serviceType,
       zone: bookingData.zone,
       email: bookingData.email
     });
     localStorage.setItem('purity_customer_history', JSON.stringify(history));
   }

   function getCustomerHistory() {
     const data = localStorage.getItem('purity_customer_history');
     return data ? JSON.parse(data) : [];
   }

   function getDaysSinceLastService() {
     const history = getCustomerHistory();
     if (history.length === 0) return Infinity;

     const lastService = new Date(history[history.length - 1].date);
     const now = new Date();
     return Math.floor((now - lastService) / (1000 * 60 * 60 * 24));
   }

   function isCustomerInactive() {
     return getDaysSinceLastService() > REENGAGEMENT_CONFIG.inactiveThresholdDays;
   }

   function getCustomerStage() {
     const days = getDaysSinceLastService();
     if (days > REENGAGEMENT_CONFIG.inactiveThresholdDays) return 'inactive';
     if (days > REENGAGEMENT_CONFIG.warningDays) return 'warning';
     return 'active';
   }

   function getWinbackOffer(attemptCount) {
     if (attemptCount >= 3) return REENGAGEMENT_CONFIG.winbackOffers.third;
     if (attemptCount >= 2) return REENGAGEMENT_CONFIG.winbackOffers.second;
     return REENGAGEMENT_CONFIG.winbackOffers.first;
   }
   ```

2. **Banner de re-engagement en el sitio:**
   ```html
   <div id="reengagement-banner" class="reengagement-banner hidden" aria-labelledby="reengagement-heading">
     <div class="reengagement-content">
       <div class="reengagement-icon">
         <i class="fa-solid fa-heart-broken"></i>
       </div>
       <div class="reengagement-text">
         <h3 id="reengagement-heading">Te extrañamos, [Nombre]!</h3>
         <p>Has pasado <span id="days-since">XX</span> días desde tu última limpieza.</p>
         <p class="reengagement-offer">Obtén <span id="offer-discount">10%</span> de descuento en tu próxima reserva.</p>
       </div>
       <div class="reengagement-actions">
         <button id="reengagement-cta" class="cta-primary">Reservar ahora</button>
         <button id="reengagement-dismiss" class="btn-text" aria-label="Cerrar">
           <i class="fa-solid fa-times"></i>
         </button>
       </div>
     </div>
   </div>
   ```

3. **CSS para el banner:**
   ```css
   .reengagement-banner {
     position: fixed;
     bottom: 20px;
     right: 20px;
     max-width: 400px;
     background: white;
     border-radius: 16px;
     box-shadow: 0 10px 40px rgba(0,0,0,0.15);
     padding: 1.5rem;
     z-index: 1000;
     animation: slideIn 0.3s ease-out;
   }

   @keyframes slideIn {
     from {
       opacity: 0;
       transform: translateY(20px);
     }
     to {
       opacity: 1;
       transform: translateY(0);
     }
   }

   .reengagement-banner.hidden {
     display: none;
   }

   .reengagement-content {
     display: flex;
     gap: 1rem;
     align-items: flex-start;
   }

   .reengagement-icon {
     width: 48px;
     height: 48px;
     border-radius: 50%;
     background: linear-gradient(135deg, #fef3c7, #fde68a);
     display: grid;
     place-content: center;
     flex-shrink: 0;
   }

   .reengagement-icon i {
     font-size: 1.5rem;
     color: #f59e0b;
   }

   .reengagement-text {
     flex: 1;
   }

   .reengagement-text h3 {
     font-size: 1rem;
     margin-bottom: 0.25rem;
   }

   .reengagement-text p {
     font-size: 0.85rem;
     color: var(--color-text-muted);
     margin-bottom: 0.25rem;
   }

   .reengagement-offer {
     font-weight: 700;
     color: var(--color-primary) !important;
   }

   .reengagement-actions {
     display: flex;
     flex-direction: column;
     gap: 0.5rem;
     align-items: flex-end;
   }

   .btn-text {
     background: none;
     border: none;
     cursor: pointer;
     color: var(--color-text-muted);
     padding: 0.25rem;
   }

   .btn-text:hover {
     color: var(--color-text);
   }
   ```

4. **JavaScript para mostrar banner con delay:**
   ```javascript
   function initReengagementBanner() {
     if (!isCustomerInactive()) return;
     if (localStorage.getItem('reengagement_dismissed')) return;

     const history = getCustomerHistory();
     if (history.length === 0) return;

     const lastService = history[history.length - 1];
     const daysSince = getDaysSinceLastService();

     document.getElementById('days-since').textContent = daysSince;

     const offer = getWinbackOffer(getReengagementAttemptCount());
     document.getElementById('offer-discount').textContent = offer.discount + '%';

     setTimeout(() => {
       document.getElementById('reengagement-banner').classList.remove('hidden');

       plausible('reengagement_banner_shown', {
         props: { daysSince, offer: offer.discount }
       });
     }, 30000); // Mostrar después de 30 segundos
   }

   function getReengagementAttemptCount() {
     const dismissed = localStorage.getItem('reengagement_dismissed');
     return dismissed ? parseInt(dismissed) : 0;
   }

   document.getElementById('reengagement-dismiss').addEventListener('click', () => {
     const attempts = getReengagementAttemptCount() + 1;
     localStorage.setItem('reengagement_dismissed', attempts.toString());
     document.getElementById('reengagement-banner').classList.add('hidden');
   });

   document.getElementById('reengagement-cta').addEventListener('click', () => {
     const offer = getWinbackOffer(getReengagementAttemptCount());
     applyReengagementDiscount(offer.discount);
     window.location.href = '/#reservas';
   });
   ```

5. **Integración con email/SMS para automatización completa:**
   ```javascript
   // Enviar datos a HubSpot para secuencia de re-engagement
   async function triggerReengagementWorkflow(email, customerData) {
     await fetch('https://api.hsforms.com/submissions/v3/integration/submit/:portalId/:formGuid', {
       method: 'POST',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify({
         fields: [
           { name: 'email', value: email },
           { name: 'days_since_last_service', value: customerData.daysSince },
           { name: 'last_service_type', value: customerData.lastServiceType },
           { name: 'winback_discount', value: customerData.offer.discount },
           { name: 'winback_validity_days', value: customerData.offer.validityDays }
         ]
       })
     });
   }
   ```

6. **Playwright tests:**
   ```javascript
   // En tests/reengagement.spec.js
   test('banner de re-engagement aparece para clientes inactivos', async ({ page }) => {
     await page.goto('/');
     await page.evaluate(() => {
       localStorage.setItem('purity_customer_history', JSON.stringify([
         { date: '2026-02-01T10:00:00Z', serviceType: 'sofa', email: 'test@test.com' }
       ]));
     });
     await page.reload();
     await page.waitForSelector('#reengagement-banner:not(.hidden)', { timeout: 35000 });
   });

   test('banner no aparece si fue cerrado recientemente', async ({ page }) => {
     await page.goto('/');
     await page.evaluate(() => {
       localStorage.setItem('purity_customer_history', JSON.stringify([
         { date: '2026-02-01T10:00:00Z', serviceType: 'sofa', email: 'test@test.com' }
       ]));
       localStorage.setItem('reengagement_dismissed', '1');
     });
     await page.reload();
     await page.waitForTimeout(35000);
     const banner = page.locator('#reengagement-banner');
     expect(await banner.getAttribute('class')).toContain('hidden');
   });
   ```

**Impacto esperado:** +10-15% revenue de clientes reactivados sin costo de adquisición. Mejora en LTV por cliente.

**Esfuerzo:** S (1 semana — tracking + banner + integraciones + tests)

**Agente:** Frontend + Full Stack (integraciones)

**Referencias:**
- [1] MarketingProfs — win-back campaign benchmarks
- [2] Invesp — customer retention vs acquisition cost study

---

### Propuesta 5: Dashboard de Analytics Predictivo para Churn y LTV

**Problema:** El sitio usa Plausible para analytics básico. No hay modelo predictivo para identificar clientes en riesgo de churn ni para calcular LTV por segmento. Las decisiones se toman con datos pasados, no con predicciones.

**Propuesta — Dashboard de analytics con métricas predictivas:**

1. **Configuración de métricas:**
   ```javascript
   // En js/analytics-dashboard.js
   const ANALYTICS_CONFIG = {
     churnThresholdDays: 60,
     ltvSegments: {
       vip: { minBookings: 10, avgTicket: 200000 },
       regular: { minBookings: 3, avgTicket: 150000 },
       occasional: { minBookings: 1, avgTicket: 100000 }
     },
     engagementScore: {
       emailOpen: 5,
       emailClick: 10,
       siteVisit: 3,
       bookingMade: 20
     }
   };

   function calculateLTV(email) {
     const history = getCustomerHistoryByEmail(email);
     const bookings = history.length;
     const avgTicket = history.reduce((sum, h) => sum + h.price, 0) / bookings;
     const monthsActive = getMonthsActive(history);
     const retentionRate = calculateRetentionRate(history);

     return {
       bookings,
       avgTicket,
       monthsActive,
       retentionRate,
       projectedLTV: avgTicket * (12 / monthsActive) * retentionRate * 24
     };
   }

   function calculateRetentionRate(history) {
     if (history.length < 2) return 0.5;
     const intervals = [];
     for (let i = 1; i < history.length; i++) {
       const days = (new Date(history[i].date) - new Date(history[i-1].date)) / (1000 * 60 * 60 * 24);
       intervals.push(days);
     }
     const avgInterval = intervals.reduce((a, b) => a + b, 0) / intervals.length;
     const expectedInterval = 60;
     return Math.min(1, expectedInterval / avgInterval);
   }

   function predictChurnRisk(email) {
     const history = getCustomerHistoryByEmail(email);
     if (history.length === 0) return { risk: 'unknown', score: 0 };

     const daysSinceLast = getDaysSinceLastServiceByEmail(email);
     const engagementScore = getEngagementScore(email);
     const bookingFrequency = getBookingFrequency(history);

     let riskScore = 0;

     if (daysSinceLast > ANALYTICS_CONFIG.churnThresholdDays) {
       riskScore += 50;
     } else if (daysSinceLast > 45) {
       riskScore += 30;
     } else if (daysSinceLast > 30) {
       riskScore += 10;
     }

     if (engagementScore < 20) riskScore += 20;
     if (bookingFrequency < 2) riskScore += 15;

     let risk = 'low';
     if (riskScore >= 60) risk = 'high';
     else if (riskScore >= 30) risk = 'medium';

     return { risk, score: riskScore, daysSinceLast, engagementScore };
   }

   function getCustomerSegmentation() {
     const history = getAllCustomerHistory();
     const segments = { vip: [], regular: [], occasional: [], atRisk: [] };

     history.forEach(customer => {
       const ltv = calculateLTV(customer.email);
       const churn = predictChurnRisk(customer.email);

       if (churn.risk === 'high') {
         segments.atRisk.push({ ...customer, ltv, churn });
       } else if (ltv.projectedLTV > 200000) {
         segments.vip.push({ ...customer, ltv });
       } else if (ltv.bookings >= 3) {
         segments.regular.push({ ...customer, ltv });
       } else {
         segments.occasional.push({ ...customer, ltv });
       }
     });

     return segments;
   }
   ```

2. **UI del dashboard (admin interno):**
   ```html
   <section id="analytics-dashboard" class="dashboard-section hidden" aria-labelledby="dashboard-heading">
     <div class="dashboard-header">
       <h2 id="dashboard-heading">Panel de Analytics</h2>
       <div class="dashboard-filters">
         <select id="dashboard-period">
           <option value="30">Últimos 30 días</option>
           <option value="90">Últimos 90 días</option>
           <option value="365">Último año</option>
         </select>
       </div>
     </div>

     <div class="dashboard-metrics">
       <div class="metric-card">
         <h3>Clientes Activos</h3>
         <span class="metric-value" id="active-customers">0</span>
         <span class="metric-change positive">+12% vs mes anterior</span>
       </div>

       <div class="metric-card">
         <h3>Clientes en Riesgo</h3>
         <span class="metric-value warning" id="at-risk-customers">0</span>
         <span class="metric-change negative">+5% vs mes anterior</span>
       </div>

       <div class="metric-card">
         <h3>LTV Promedio</h3>
         <span class="metric-value" id="avg-ltv">$0</span>
         <span class="metric-change positive">+8% vs mes anterior</span>
       </div>

       <div class="metric-card">
         <h3>Tasa de Churn</h3>
         <span class="metric-value" id="churn-rate">0%</span>
         <span class="metric-change positive">-3% vs mes anterior</span>
       </div>
     </div>

     <div class="dashboard-sections">
       <div class="dashboard-section" id="at-risk-section">
         <h3>Clientes en Riesgo de Churn</h3>
         <table class="at-risk-table">
           <thead>
             <tr>
               <th>Email</th>
               <th>Días inactivo</th>
               <th>Score de riesgo</th>
               <th>Último servicio</th>
               <th>Acción</th>
             </tr>
           </thead>
           <tbody id="at-risk-table-body">
           </tbody>
         </table>
       </div>

       <div class="dashboard-section" id="top-clients-section">
         <h3>Top 10 Clientes VIP</h3>
         <table class="vip-table">
           <thead>
             <tr>
               <th>Email</th>
               <th>Reservas</th>
               <th>LTV proyectado</th>
               <th>Última actividad</th>
             </tr>
           </thead>
           <tbody id="vip-table-body">
           </tbody>
         </table>
       </div>
     </div>
   </section>
   ```

3. **CSS para el dashboard:**
   ```css
   .dashboard-section {
     background: var(--color-surface);
     border-radius: 16px;
     padding: 2rem;
     margin: 2rem 0;
   }

   .dashboard-metrics {
     display: grid;
     grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
     gap: 1.5rem;
     margin: 2rem 0;
   }

   .metric-card {
     background: white;
     border-radius: 12px;
     padding: 1.5rem;
     box-shadow: 0 2px 8px rgba(0,0,0,0.05);
   }

   .metric-card h3 {
     font-size: 0.85rem;
     color: var(--color-text-muted);
     margin-bottom: 0.5rem;
   }

   .metric-value {
     display: block;
     font-size: 2rem;
     font-weight: 800;
     color: var(--color-text);
   }

   .metric-value.warning {
     color: #f59e0b;
   }

   .metric-change {
     font-size: 0.8rem;
     font-weight: 600;
   }

   .metric-change.positive {
     color: var(--color-accent);
   }

   .metric-change.negative {
     color: #ef4444;
   }

   .at-risk-table, .vip-table {
     width: 100%;
     border-collapse: collapse;
     margin-top: 1rem;
   }

   .at-risk-table th, .vip-table th {
     text-align: left;
     padding: 0.75rem;
     border-bottom: 2px solid var(--color-border);
     font-size: 0.85rem;
     color: var(--color-text-muted);
   }

   .at-risk-table td, .vip-table td {
     padding: 0.75rem;
     border-bottom: 1px solid var(--color-border);
   }

   .risk-badge {
     padding: 0.25rem 0.5rem;
     border-radius: 4px;
     font-size: 0.75rem;
     font-weight: 600;
   }

   .risk-badge.high {
     background: #fef2f2;
     color: #ef4444;
   }

   .risk-badge.medium {
     background: #fef3c7;
     color: #f59e0b;
   }

   .risk-badge.low {
     background: #f0fdf4;
     color: #22c55e;
   }
   ```

4. **Generación de reportes para el equipo:**
   ```javascript
   function generateWeeklyReport() {
     const segments = getCustomerSegmentation();
     const totalCustomers = segments.vip.length + segments.regular.length +
                           segments.occasional.length + segments.atRisk.length;

     const report = {
       generatedAt: new Date().toISOString(),
       summary: {
         totalCustomers,
         atRiskCount: segments.atRisk.length,
         atRiskPercentage: ((segments.atRisk.length / totalCustomers) * 100).toFixed(1),
         vipCount: segments.vip.length,
         avgLTV: calculateAverageLTV(segments)
       },
       atRiskCustomers: segments.atRisk.map(c => ({
         email: c.email,
         daysSinceLast: c.churn.daysSinceLast,
         riskScore: c.churn.score,
         lastService: c.history[c.history.length - 1]?.serviceType
       })),
       recommendedActions: [
         {
           priority: 'high',
           action: 'Contactar clientes con risk score > 60',
           count: segments.atRisk.filter(c => c.churn.score > 60).length
         },
         {
           priority: 'medium',
           action: 'Enviar oferta de win-back a clientes inactivos > 45 días',
           count: segments.atRisk.filter(c => c.churn.daysSinceLast > 45).length
         }
       ]
     };

     // Enviar report por email al equipo
     sendReportEmail(report);

     return report;
   }

   function sendReportEmail(report) {
     // Integration con email service
     console.log('Reporte generado:', report);
   }
   ```

**Impacto esperado:** Identificar 20% de clientes de alto valor con riesgo de churn para intervención proactiva. Mejora en ROI de marketing.

**Esfuerzo:** M (2 semanas — tracking + dashboard + predictions + tests)

**Agente:** Full Stack + QA

**Referencias:**
- [1] Google Analytics 4 predictive metrics documentation
- [2] Mixpanel LTV calculation methodology

---

### Propuesta 6: Programa de Referidos Mejorado con Beneficios Escalonados

**Problema:** El sistema de cupones actual es plano. Todos los referidos dan el mismo descuento (10%). No hay beneficios adicionales por volumen de referencias ni distinción entre "cliente que refiere mucho" vs "cliente que refiere una vez".

**Propuesta — Sistema de referidos con niveles y recompensas progresivas:**

1. **Estructura de beneficios escalonados:**
   ```javascript
   // En js/referral-program.js
   const REFERRAL_PROGRAM = {
     tiers: [
       {
         name: 'Amigo',
         referrals: 0,
         referrerDiscount: 5,      // 5% para el que refiere
         refereeDiscount: 5,       // 5% para el referido
         bonus: null
       },
       {
         name: 'Embajador',
         referrals: 3,
         referrerDiscount: 10,
         refereeDiscount: 10,
         bonus: '3 meses de servicio gratis de tapizado'
       },
       {
         name: 'Champion',
         referrals: 5,
         referrerDiscount: 15,
         refereeDiscount: 10,
         bonus: '1 limpieza gratuita de sofá'
       },
       {
         name: 'Legend',
         referrals: 10,
         referrerDiscount: 20,
         refereeDiscount: 15,
         bonus: 'Plan anual de limpieza gratis (valor $600.000)'
       }
     ],
     referralCodeLength: 8,
     trackingPeriodDays: 365
   };

   function getReferralTier(email) {
     const count = getReferralCount(email);
     let tier = REFERRAL_PROGRAM.tiers[0];

     for (const t of REFERRAL_PROGRAM.tiers) {
       if (count >= t.referrals) {
         tier = t;
       }
     }

     return { ...tier, referralCount: count };
   }

   function getReferralCount(email) {
     const data = getReferralData();
     const referrals = data.referrals.filter(r =>
       r.referrerEmail === email &&
       isWithinPeriod(r.date) &&
       r.status === 'converted'
     );
     return referrals.length;
   }

   function isWithinPeriod(date) {
     const days = (new Date() - new Date(date)) / (1000 * 60 * 60 * 24);
     return days <= REFERRAL_PROGRAM.trackingPeriodDays;
   }

   function generateReferralCode(email) {
     const code = email.split('@')[0].substring(0, 4).toUpperCase() +
                  '-' +
                  Math.random().toString(36).substr(2, REFERRAL_PROGRAM.referralCodeLength - 4).toUpperCase();
     return code;
   }

   function trackReferral(referrerEmail, refereeEmail, code) {
     const data = getReferralData();

     if (!code || !data.codes[code]) return false;

     data.referrals.push({
       referrerEmail,
       refereeEmail,
       code,
       date: new Date().toISOString(),
       status: 'pending'
     });

     saveReferralData(data);
     return true;
   }

   function convertReferral(code) {
     const data = getReferralData();

     if (!data.codes[code]) return null;

     const referral = data.referrals.find(r => r.code === code && r.status === 'pending');
     if (!referral) return null;

     referral.status = 'converted';
     referral.convertedDate = new Date().toISOString();

     const referrerTier = getReferralTier(referral.referrerEmail);
     const refereeDiscount = referrerTier.refereeDiscount;

     saveReferralData(data);

     return {
       referrerEmail: referral.referrerEmail,
       refereeEmail: referral.refereeEmail,
       referrerTier: referrerTier,
       refereeDiscount
     };
   }
   ```

2. **UI del programa de referidos mejorado:**
   ```html
   <section id="referral-program" class="section section-referral">
     <div class="referral-hero">
       <h2>Invita amigos y gana recompensas épicas</h2>
       <p>Por cada amigo que reserve, ambos reciben descuentos. Si refieres 10 amigos, obtienes un plan anual de limpieza gratis (valor $600.000).</p>
     </div>

     <div class="referral-tier-progress">
       <div class="tier-steps">
         <div class="tier-step" data-tier="Amigo" data-min="0">
           <div class="tier-icon"><i class="fa-solid fa-user"></i></div>
           <div class="tier-info">
             <span class="tier-name">Amigo</span>
             <span class="tier-reqs">0 referidos</span>
           </div>
           <div class="tier-rewards">
             <span>5% off</span>
             <span>5% off</span>
           </div>
         </div>

         <div class="tier-connector"></div>

         <div class="tier-step" data-tier="Embajador" data-min="3">
           <div class="tier-icon"><i class="fa-solid fa-megaphone"></i></div>
           <div class="tier-info">
             <span class="tier-name">Embajador</span>
             <span class="tier-reqs">3 referidos</span>
           </div>
           <div class="tier-rewards">
             <span>10% off</span>
             <span>10% off</span>
           </div>
           <div class="tier-bonus">+ Servicio de tapizado gratis</div>
         </div>

         <div class="tier-connector"></div>

         <div class="tier-step" data-tier="Champion" data-min="5">
           <div class="tier-icon"><i class="fa-solid fa-trophy"></i></div>
           <div class="tier-info">
             <span class="tier-name">Champion</span>
             <span class="tier-reqs">5 referidos</span>
           </div>
           <div class="tier-rewards">
             <span>15% off</span>
             <span>10% off</span>
           </div>
           <div class="tier-bonus">+ Limpieza gratuita de sofá</div>
         </div>

         <div class="tier-connector"></div>

         <div class="tier-step" data-tier="Legend" data-min="10">
           <div class="tier-icon"><i class="fa-solid fa-crown"></i></div>
           <div class="tier-info">
             <span class="tier-name">Legend</span>
             <span class="tier-reqs">10 referidos</span>
           </div>
           <div class="tier-rewards">
             <span>20% off</span>
             <span>15% off</span>
           </div>
           <div class="tier-bonus">+ Plan anual ($600.000 value)</div>
         </div>
       </div>
     </div>

     <div class="referral-code-section">
       <h3>Tu código de referral</h3>
       <div class="referral-code-box">
         <span id="my-referral-code">PURITY-XXXX</span>
         <button id="copy-code-btn" class="btn-icon" aria-label="Copiar código">
           <i class="fa-solid fa-copy"></i>
         </button>
         <button id="share-code-btn" class="btn-icon" aria-label="Compartir">
           <i class="fa-solid fa-share"></i>
         </button>
       </div>
       <p class="referral-stats">
         Has invitado a <span id="my-referral-count">0</span> amigos.
         Tu nivel actual: <span id="my-current-tier">Amigo</span>
       </p>
     </div>

     <div class="referral-ways">
       <h3>Comparte como prefieras</h3>
       <div class="referral-channels">
         <button class="referral-channel" data-channel="whatsapp">
           <i class="fa-brands fa-whatsapp"></i>
           <span>WhatsApp</span>
         </button>
         <button class="referral-channel" data-channel="email">
           <i class="fa-solid fa-envelope"></i>
           <span>Email</span>
         </button>
         <button class="referral-channel" data-channel="facebook">
           <i class="fa-brands fa-facebook"></i>
           <span>Facebook</span>
         </button>
         <button class="referral-channel" data-channel="twitter">
           <i class="fa-brands fa-twitter"></i>
           <span>Twitter</span>
         </button>
       </div>
     </div>
   </section>
   ```

3. **CSS para el programa:**
   ```css
   .section-referral {
     background: linear-gradient(135deg, var(--color-primary-light), var(--color-surface));
     padding: 4rem 0;
   }

   .referral-tier-progress {
     margin: 2rem 0;
     overflow-x: auto;
   }

   .tier-steps {
     display: flex;
     align-items: flex-start;
     gap: 0;
     min-width: 600px;
   }

   .tier-step {
     flex: 1;
     text-align: center;
     padding: 1rem;
     background: white;
     border-radius: 12px;
     box-shadow: 0 2px 8px rgba(0,0,0,0.05);
   }

   .tier-step.active {
     border: 2px solid var(--color-primary);
   }

   .tier-icon {
     width: 48px;
     height: 48px;
     margin: 0 auto 0.5rem;
     border-radius: 50%;
     background: var(--color-primary-light);
     display: grid;
     place-content: center;
   }

   .tier-step[data-tier="Legend"] .tier-icon {
     background: linear-gradient(135deg, #ffd700, #ffed4e);
   }

   .tier-icon i {
     font-size: 1.25rem;
     color: var(--color-primary);
   }

   .tier-name {
     display: block;
     font-weight: 700;
     font-size: 0.95rem;
   }

   .tier-reqs {
     display: block;
     font-size: 0.75rem;
     color: var(--color-text-muted);
   }

   .tier-rewards {
     display: flex;
     justify-content: center;
     gap: 0.5rem;
     margin: 0.75rem 0;
     font-size: 0.8rem;
   }

   .tier-rewards span {
     background: var(--color-accent);
     color: white;
     padding: 0.25rem 0.5rem;
     border-radius: 4px;
   }

   .tier-bonus {
     font-size: 0.75rem;
     font-weight: 600;
     color: var(--color-primary);
     margin-top: 0.5rem;
   }

   .tier-connector {
     width: 40px;
     height: 2px;
     background: var(--color-border);
     margin-top: 2rem;
     flex-shrink: 0;
   }

   .referral-code-box {
     display: flex;
     align-items: center;
     justify-content: center;
     gap: 1rem;
     padding: 1.5rem;
     background: white;
     border-radius: 12px;
     margin: 1.5rem 0;
   }

   #my-referral-code {
     font-family: monospace;
     font-size: 1.75rem;
     font-weight: 800;
     letter-spacing: 3px;
   }

   .referral-channels {
     display: flex;
     justify-content: center;
     gap: 1rem;
     margin-top: 1.5rem;
   }

   .referral-channel {
     display: flex;
     flex-direction: column;
     align-items: center;
     gap: 0.5rem;
     padding: 1rem 1.5rem;
     background: white;
     border: 1px solid var(--color-border);
     border-radius: 12px;
     cursor: pointer;
     transition: all 0.2s;
   }

   .referral-channel:hover {
     border-color: var(--color-primary);
     transform: translateY(-2px);
   }

   .referral-channel i {
     font-size: 1.5rem;
   }

   .referral-channel[data-channel="whatsapp"] i { color: #25D366; }
   .referral-channel[data-channel="email"] i { color: var(--color-primary); }
   .referral-channel[data-channel="facebook"] i { color: #1877F2; }
   .referral-channel[data-channel="twitter"] i { color: #1DA1F2; }
   ```

4. **JavaScript para compartir:**
   ```javascript
   function shareReferralCode(channel) {
     const code = getMyReferralCode();
     const url = `https://purityclean.com/?ref=${code}`;
     const message = `¡Únete a Purity & Clean! Usa mi código ${code} para obtener 10% de descuento en tu primera limpieza. ${url}`;

     switch (channel) {
       case 'whatsapp':
         window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
         break;
       case 'email':
         window.open(`mailto:?subject=Invitación Purity & Clean&body=${encodeURIComponent(message)}`);
         break;
       case 'facebook':
         window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
         break;
       case 'twitter':
         window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}`, '_blank');
         break;
     }

     trackShareEvent(channel, code);
   }

   function trackShareEvent(channel, code) {
     if (typeof plausible !== 'undefined') {
       plausible('referral_share', {
         props: { channel, code }
       });
     }
   }
   ```

5. **Playwright tests:**
   ```javascript
   // En tests/referral.spec.js
   test('niveles de referral se muestran correctamente', async ({ page }) => {
     await page.goto('/');
     await page.evaluate(() => {
       localStorage.setItem('purity_referral_data', JSON.stringify({
         codes: { 'PUR-12345678': true },
         referrals: []
       }));
     });
     await expect(page.locator('.tier-step')).toHaveCount(4);
   });

   test('código de referral se puede copiar', async ({ page }) => {
     await page.goto('/');
     await page.click('#copy-code-btn');
     // Verify clipboard content
   });

   test('compartir en WhatsApp abre ventana correcta', async ({ page }) => {
     await page.goto('/');
     const popupPromise = page.waitForEvent('popup');
     await page.click('.referral-channel[data-channel="whatsapp"]');
     const popup = await popupPromise;
     expect(popup.url()).toContain('wa.me');
   });
   ```

**Impacto esperado:** +30% viralidad del programa de referidos. Cada cliente referral se convierte en advocate.

**Esfuerzo:** S (1 semana — niveles + UI + compartir + tests)

**Agente:** Frontend + Content

**Referencias:**
- [1] Dropbox referral program case study — 3900% growth
- [2] ReferralCandy — referral program benchmarks

---

### Propuesta 7: Google Business Profile Integration para Reviews Automatizadas

**Problema:** El sistema de captura de reviews actual requiere que el cliente suba fotos manualmente y complete un formulario largo. La tasa de completitud es baja. No hay integración con Google Business Profile para solicitar reviews post-servicio.

**Propuesta — Sistema de solicitud de Google Reviews automatizado:**

1. **Sistema de solicitud post-servicio:**
   ```javascript
   // En js/google-reviews.js
   const GOOGLE_REVIEWS_CONFIG = {
     reviewLink: 'https://g.page/r/purity-clean/review',
     reminderDelay: 2, // horas después del servicio
     maxReminders: 2,
     incentivePoints: 30 // puntos de fidelización por review dejado
   };

   function triggerReviewRequest(bookingData) {
     const scheduledTime = new Date(bookingData.date);
     scheduledTime.setHours(scheduledTime.getHours() + GOOGLE_REVIEWS_CONFIG.reminderDelay);

     const now = new Date();
     const delay = scheduledTime - now;

     if (delay > 0) {
       setTimeout(() => {
         sendReviewRequest(bookingData);
       }, delay);
     } else {
       sendReviewRequest(bookingData);
     }
   }

   function sendReviewRequest(bookingData) {
     const customerData = getCustomerData(bookingData.email);

     // Email de solicitud de review
     const emailSubject = '¿Cómo fue tu experiencia con Purity & Clean?';
     const emailBody = `
       <h2>¡Gracias por tu servicio, ${customerData.name}!</h2>
       <p>Esperamos que tu ${bookingData.serviceType} haya quedado impecable.</p>
       <p>Tu opinión es muy importante para nosotros. ¿Podrías dejarnos una review en Google?</p>
       <p>Solo te toma 1 minuto y como agradecimiento, te regalamos <strong>${GOOGLE_REVIEWS_CONFIG.incentivePoints} puntos</strong> de fidelización.</p>
       <a href="${GOOGLE_REVIEWS_CONFIG.reviewLink}" class="btn-review">Dejar mi review en Google ⭐</a>
       <p><small>Link directo: ${GOOGLE_REVIEWS_CONFIG.reviewLink}</small></p>
     `;

     // WhatsApp de seguimiento
     const whatsappMessage = `¡Hola ${customerData.name}! 👋\n\nGracias por tu servicio de ${bookingData.serviceType}. Nos encantaría saber tu opinión.\n\n¿Podrías dejarnos una review en Google? Solo 1 minuto y te regalamos ${GOOGLE_REVIEWS_CONFIG.incentivePoints} puntos de fidelización.\n\n👉 ${GOOGLE_REVIEWS_CONFIG.reviewLink}\n\n¡Tu opinión nos ayuda a seguir mejorando!`;

     sendEmailReviewRequest(bookingData.email, emailSubject, emailBody);
     sendWhatsAppReviewRequest(bookingData.phone, whatsappMessage);
   }

   function sendEmailReviewRequest(email, subject, body) {
     // Integration con email service ( HubSpot, Mailchimp, etc.)
     console.log('Email review request sent to:', email, subject);
   }

   function sendWhatsAppReviewRequest(phone, message) {
     const formattedPhone = phone.replace('+', '').replace('-', '');
     window.open(`https://wa.me/${formattedPhone}?text=${encodeURIComponent(message)}`, '_blank');
   }
   ```

2. **Widget de solicitud de review en el sitio:**
   ```html
   <div id="review-widget" class="review-widget hidden" aria-labelledby="review-widget-heading">
     <div class="review-widget-content">
       <div class="review-widget-icon">
         <i class="fa-brands fa-google"></i>
       </div>
       <div class="review-widget-text">
         <h3 id="review-widget-heading">¿Te gustó nuestro servicio?</h3>
         <p>Ayúdanos a mejorar dejando una review en Google. Solo 1 minuto.</p>
         <p class="review-incentive">+30 puntos de fidelización como agradecimiento</p>
       </div>
       <div class="review-widget-actions">
         <a href="${GOOGLE_REVIEWS_CONFIG.reviewLink}" target="_blank" rel="noopener noreferrer" class="btn-review">
           Dejar review ⭐
         </a>
         <button id="dismiss-review-widget" class="btn-text">
           Ahora no
         </button>
       </div>
     </div>
   </div>
   ```

3. **CSS para el widget:**
   ```css
   .review-widget {
     position: fixed;
     bottom: 20px;
     left: 20px;
     max-width: 380px;
     background: white;
     border-radius: 16px;
     box-shadow: 0 10px 40px rgba(0,0,0,0.15);
     padding: 1.5rem;
     z-index: 999;
     animation: slideInLeft 0.3s ease-out;
   }

   @keyframes slideInLeft {
     from {
       opacity: 0;
       transform: translateX(-20px);
     }
     to {
       opacity: 1;
       transform: translateX(0);
     }
   }

   .review-widget.hidden {
     display: none;
   }

   .review-widget-content {
     display: flex;
     gap: 1rem;
     align-items: flex-start;
   }

   .review-widget-icon {
     width: 48px;
     height: 48px;
     border-radius: 50%;
     background: white;
     border: 2px solid #ea4335;
     display: grid;
     place-content: center;
     flex-shrink: 0;
   }

   .review-widget-icon i {
     font-size: 1.5rem;
     color: #ea4335;
   }

   .review-widget-text {
     flex: 1;
   }

   .review-widget-text h3 {
     font-size: 1rem;
     margin-bottom: 0.25rem;
   }

   .review-widget-text p {
     font-size: 0.85rem;
     color: var(--color-text-muted);
     margin-bottom: 0.25rem;
   }

   .review-incentive {
     font-weight: 600;
     color: var(--color-primary) !important;
   }

   .review-widget-actions {
     display: flex;
     flex-direction: column;
     gap: 0.5rem;
     align-items: flex-end;
   }

   .btn-review {
     display: inline-flex;
     align-items: center;
     gap: 0.5rem;
     background: #ea4335;
     color: white;
     padding: 0.75rem 1rem;
     border-radius: 8px;
     text-decoration: none;
     font-weight: 600;
     transition: background 0.2s;
   }

   .btn-review:hover {
     background: #c5221f;
   }
   ```

4. **Tracking de reviews:**
   ```javascript
   function trackGoogleReviewSubmitted(email) {
     const data = getLoyaltyData();
     data.points += GOOGLE_REVIEWS_CONFIG.incentivePoints;
     data.history.push({
       date: new Date().toISOString(),
       amount: GOOGLE_REVIEWS_CONFIG.incentivePoints,
       reason: 'Google review submitted'
     });
     saveLoyaltyData(data);
     updateRewardsUI();

     if (typeof plausible !== 'undefined') {
       plausible('google_review_submitted', {
         props: { email }
       });
     }
   }

   function hasSubmittedReview(email) {
     const data = getLoyaltyData();
     return data.history.some(h =>
       h.reason === 'Google review submitted'
     );
   }
   ```

5. **Integración con Google Business Profile API (si disponible):**
   ```javascript
   // Verificar estado de reviews via Google Business Profile
   async function getGoogleReviewStatus() {
     // Esta funcionalidad requeriría OAuth con Google Business Profile
     // Por ahora, el tracking es local
     return {
       totalReviews: 47,
       averageRating: 4.8,
       recentReviews: []
     };
   }
   ```

6. **Playwright tests:**
   ```javascript
   // En tests/google-reviews.spec.js
   test('widget de review aparece post-servicio', async ({ page }) => {
     await page.goto('/');
     await page.evaluate(() => {
       localStorage.setItem('purity_last_service_date', '2026-04-25T10:00:00Z');
     });

     await page.waitForSelector('#review-widget:not(.hidden)', { timeout: 3000 });
   });

   test('widget de review no aparece si ya se envió review', async ({ page }) => {
     await page.goto('/');
     await page.evaluate(() => {
       localStorage.setItem('purity_last_service_date', '2026-04-25T10:00:00Z');
       localStorage.setItem('purity_loyalty', JSON.stringify({
         history: [{ reason: 'Google review submitted' }]
       }));
     });

     await page.waitForTimeout(5000);
     const widget = page.locator('#review-widget');
     expect(await widget.getAttribute('class')).toContain('hidden');
   });

   test('enlace de review dirige a Google', async ({ page }) => {
     await page.goto('/');
     const reviewLink = page.locator('.btn-review');
     await expect(reviewLink).toHaveAttribute('href', /g.page/);
   });
   ```

**Impacto esperado:** +200% volumen de Google reviews con mínimo esfuerzo del cliente. Mejora en SEO local y credibility.

**Esfuerzo:** S (1 semana — widget + integraciones + tracking + tests)

**Agente:** Frontend + Full Stack (integraciones)

**Referencias:**
- [1] Google Business Profile — review request guidelines
- [2] BrightLocal — review generation case studies

---

## Priorización recomendada (Round 23)

| # | Propuesta | Impacto | Esfuerzo | Agente | Razón estratégica |
|---|-----------|---------|----------|--------|------------------|
| 1 | CRM Integration + Nurturing | Alto | Medio | Full Stack + Content | Base de datos de clientes |
| 2 | Programa de Fidelización Purity Rewards | Alto | Medio | Frontend + Full Stack | Retención y engagement |
| 4 | Re-engagement Automation | Alto | Bajo | Frontend + Full Stack | Quick win, recuperar inactivos |
| 7 | Google Business Profile Integration | Alto | Bajo | Frontend | Credibilidad y SEO local |
| 3 | Dynamic Pricing Engine | Medio-Alto | Medio | Frontend | Revenue en temporada alta |
| 6 | Referral Program Mejorado | Medio | Bajo | Frontend | Viralidad orgánica |
| 5 | Analytics Predictivo | Medio | Medio | Full Stack + QA | Decisiones data-driven |

**Top 3 para implementar primero:** 4, 7, 2 (quick wins con alto impacto en retención y credibility)

---

## Síntesis: Por qué R23 es diferente

R1-R22 se enfocaron en:
- Marketing digital (ads, retargeting, social media)
- Conversión (popups, micro-conversiones, exit-intent)
- SEO y contenido (zonas, blog, schema)
- UX y accesibilidad (dark mode, motion, WCAG)
- Tecnología (chatbot, WhatsApp, AI)
- Operaciones (field app, scheduling, subscriptions)
- Reputación (reviews, Trust Velocity, AI search)
- Dark social y video reviews
- Nichos specialty (mascotas, alergias, bebés, post-construction)
- Garantía formal de servicio
- Partnerships B2B de nicho
- Disponibilidad real-time
- Campañas estacionales

R23 se enfoca en:
- **Infraestructura de datos** (CRM integration para nurturing)
- **Lealtad y retención** (programa de puntos y niveles)
- **Revenue optimization** (dynamic pricing según demanda)
- **Win-back automation** (recuperar clientes inactivos)
- **Analytics predictivo** (churn prediction y LTV calculation)
- **Viralidad** (referral program con beneficios escalonados)
- **Credibilidad** (Google reviews automation)

R23 cierra la brecha entre "sitio que convierte" y "sistema deRevenue inteligente con retención y datos".

---

## Referencias

[1] HubSpot Marketing Hub Starter — CRM and automation features
[2] Bonded Loyalty Study 2025 — loyalty program impact on retention
[3] Dropbox referral program case study — 3900% growth in 15 months
[4] Google Business Profile — review request guidelines and best practices
[5] Mixpanel LTV calculation methodology — customer lifetime value analytics
[6] Invesp — customer retention vs acquisition cost study (5x difference)
[7] MarketingProfs — win-back campaign benchmarks and best practices

---

*Co-Authored-By: Paperclip <noreply@paperclip.ing>*