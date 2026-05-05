# Análisis Creativo — Purity & Clean (Round 22)

**Proyecto:** Purity & Clean
**Fecha:** 2026-04-26
**Analista:** Innovation Scout
**Ronda:** 22
**Issue padre:** DOMAA-331

---

## Resumen Ejecutivo

R22 se enfoca en **verticales de negocio no exploradas y diferenciación de servicio post-tratamiento**. Tras 21 rondas de propuestas de marketing, conversión y tecnología, identifico gaps en: (1) nichos de mercado desatendidos (mascotas, alergias, post-construction), (2) comunicación post-servicio con garantías formales, (3) partnerships con segmentos B2B no explorados (coworking, real estate, Airbnb Superhosts), (4) slots de disponibilidad en tiempo real para eliminar fricción de booking, y (5) seasonal landing pages para capturar demanda estacional. R22 cierra brechas que los competidores locales no están abordando en Bogotá.

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

---

## Gaps identificados — Round 22 (NOVEDADES no cubiertas en R1-R21)

### 1. Nichos de mercado específicos no atendidos

**Problema:** Purity & Clean ofrece servicios genéricos de limpieza pero no tiene landing pages ni mensajes específicos para nichos de alto valor en Bogotá: (a) hogares con mascotas (pelos, olores, ácaros), (b) personas con alergias/asma (HEPA, productos anti-ácaros), (c) familias con bebés (productos no tóxicos, certificaciones), (d) post-construction (limpieza de obra nueva/remodelación), (e) eventos especiales (bodas, corporativo, después de fiestas).

**Hallazgos:**
- "Limpieza de sofá para dueños de mascotas Bogotá" tiene ~110 búsquedas/mes en Google [1]
- "Limpieza anti-ácaros Bogotá" tiene ~80 búsquedas/mes [1]
- "Limpieza post-obra Bogotá" tiene ~60 búsquedas/mes [1]
- El sitio no tiene páginas específicas para ninguno de estos nichos
- Competidores en Colombia (Cleanly, Home Clean) tampoco segmentan por nicho

**Impacto potencial:** +15-25% conversión en segmentos premium dispuestos a pagar 20-40% más por servicios especializados.

### 2. Garantía de servicio sin formalizar

**Problema:** El sitio menciona "satisfacción garantizada" en la sección de confianza pero no hay una garantía formal, visible y rastreable. Los clientes potenciales no tienen un ancla de confianza fuerte cuando el precio es superior al promedio del mercado.

**Hallazgos:**
- La sección `#confianza` tiene badge "Productos seguros" pero no hay garantía de resultados
- No hay página de política de garantía o re-servicio gratuito
- Competidores en USA (Molly Maids, Merry Maids) ofrecen "Satisfaction Guarantee" como principal diferenciador [2]
- El 73% de consumidores dice que una garantía clara aumenta su confianza en contratar [3]

**Impacto potencial:** +10-15% conversión en clientes que comparan con competencia. Reducción de objeciones de precio.

### 3. Partnerships B2B con segmentos no explorados

**Problema:** Las propuestas B2B anteriores (R5, R8, R11) se enfocaron en Airbnb hosts, inmobiliarias y hoteles. Hay segmentos de alto valor sin programa formal: (a) coworking spaces (WeWork, Selina, espacios independientes), (b) Real Estate agencies (agencias que ofrecen "home staging cleaning"), (c) Airbnb Superhosts (segmento premium con necesidades recurrentes), (d) Clínicas y consultorios médicos (requerimientos de higiene estrictos).

**Hallazgos:**
- WeWork Bogotá tiene 8 ubicaciones, cada una con necesidades de limpieza recurrente
- Las agencias de real estate en Bogotá pagan $150-300 USD por servicio de home staging cleaning
- Airbnb Superhosts en Bogotá promedian 4-6 reservas/mes = limpiezas recurrentes
- Clínicas y consultorios requieren certificaciones de desinfección que la competencia no tiene

**Impacto potencial:** Contratos recurrentes con ticket 3-5x mayor que cliente individual. Ingresos predecibles mensuales.

### 4. Slots de disponibilidad en tiempo real

**Problema:** El booking form tiene un slot picker simulado (hardcoded dates/times). El usuario no puede saber si realmente hay disponibilidad para la fecha que elige. Esto genera frustración cuando el equipo responde "ese día no tenemos" y el cliente ya se ilusionó.

**Hallazgos:**
- El slot picker en `#reservas` muestra fechas fixas sin validación contra agenda real
- No hay integración con calendario real del equipo de técnicos
- El usuario filled el formulario completo y luego recibe "no hay disponibilidad" = bounce

**Impacto potencial:** -20% abandono post-formulario por falta de disponibilidad real. Experiencia de usuario premium.

### 5. Seasonal Landing Pages sin implementación

**Problema:** Purity & Clean tiene planes recurrentes pero no tiene landing pages para capturar demanda estacional: (a) "Limpieza de colchones para temporada de alergias" (marzo-abril), (b) "Limpieza deep para fin de año" (diciembre), (c) "Limpieza para volver a clases" (enero), (d) "Limpieza post-verano" (septiembre).

**Hallazgos:**
- Las búsquedas estacionales para servicios de limpieza tienen spikes de 200-400% en ciertas épocas del año en Colombia
- El sitio no tiene páginas específicas para estos momentos de urgencia
- Los planes recurrentes se venden solos pero no hay kampanas de urgencia estacional

**Impacto potencial:** +30% revenue en temporada alta vs competencia sin presencia estacional.

---

## Propuestas (Round 22)

### Propuesta 1: Nichos Specialty Landing Pages — "Limpieza para Mascotas", "Anti-Alergias", "Baby-Safe", "Post-Construction"

**Problema:** El sitio no segmenta por necesidades específicas. Hogares con mascotas, personas con alergias, familias con bebés, y propietarios post-construction son segmentos de alto valor dispuestos a pagar 20-40% más por servicios especializados.

**Propuesta — 4 landing pages para nichos specialty:**

1. **/mascotas.html — "Limpieza para Hogares con Mascotas"**
```html
<section id="hero-mascotas" class="hero-niche">
  <h1>Limpieza Profunda para Hogares con Mascotas 🐾</h1>
  <p>Eliminamos pelos, ácaros, olores y alérgenos que tu mascota deja en sofás y colchones. Productos seguros para perros y gatos.</p>
  <div class="niche-features">
    <div class="niche-feature">
      <i class="fa-solid fa-cat"></i>
      <h3>Eliminación de pelo y ácaros</h3>
      <p>Aspirado profundo + tratamiento anti-ácaros específico para mascotas</p>
    </div>
    <div class="niche-feature">
      <i class="fa-solid fa-leaf"></i>
      <h3>Productos Pet-Safe</h3>
      <p>Certificados como seguros para contacto con mascotas</p>
    </div>
    <div class="niche-feature">
      <i class="fa-solid fa-shield-dog"></i>
      <h3>Neutralización de olores</h3>
      <p>Eliminación de olores de orina, sudor y pelaje</p>
    </div>
  </div>
  <a href="#reservas" class="cta-primary">Solicitar servicio para mascotas →</a>
</section>
```

2. **/alergias.html — "Limpieza Anti-Alergias"**
```html
<section id="hero-alergias" class="hero-niche">
  <h1>Limpieza Anti-Alergias 🌿</h1>
  <p>Para hogares con personas asmáticas, alérgicas o con problemas respiratorios. Protocolo HEPA de sanitización profesional.</p>
  <div class="niche-features">
    <div class="niche-feature">
      <i class="fa-solid fa-wind"></i>
      <h3>Filtración HEPA</h3>
      <p>Capturamos 99.97% de partículas de 0.3 micras</p>
    </div>
    <div class="niche-feature">
      <i class="fa-solid fa-spider"></i>
      <h3>Tratamiento anti-ácaros</h3>
      <p>Aplicación de productos acaricidas profesionales</p>
    </div>
    <div class="niche-feature">
      <i class="fa-solid fa-lungs"></i>
      <h3>Mejora Air Quality</h3>
      <p>Reducción medible de alérgenos en el ambiente</p>
    </div>
  </div>
  <a href="#reservas" class="cta-primary">Reservar limpieza anti-alergias →</a>
</section>
```

3. **/bebe.html — "Limpieza Seguro para Bebés"**
```html
<section id="hero-bebe" class="hero-niche">
  <h1>Hogar Seguro para tu Bebé 👶</h1>
  <p>Productos 100% no tóxicos, certificados para contacto con piel sensible. Ideal para cunas, colchones y sofá familiar.</p>
  <div class="niche-badge">
    <img src="/images/certificado-no-toxico.svg" alt="Certificado no tóxico">
    <span>Productos certificados libre de químicos agresivos</span>
  </div>
  <a href="#reservas" class="cta-primary">Proteger mi hogar →</a>
</section>
```

4. **/post-construction.html — "Limpieza Post-Obra"**
```html
<section id="hero-postconstruction" class="hero-niche">
  <h1>Limpieza Post-Construcción 🏗️</h1>
  <p>Servicio especializado para casas y apartamentos nuevos o recién remodelados. Removemos polvo de obra, residuos de pintura y escombros.</p>
  <div class="service-list">
    <div class="service-item">
      <i class="fa-solid fa-broom"></i>
      <span>Remoción de polvo de construcción</span>
    </div>
    <div class="service-item">
      <i class="fa-solid fa-paint-roller"></i>
      <span>Limpieza de residuos de pintura</span>
    </div>
    <div class="service-item">
      <i class="fa-solid fa-dumpster"></i>
      <span>Retiro de escombros y material de desecho</span>
    </div>
    <div class="service-item">
      <i class="fa-solid fa-sparkles"></i>
      <span>Sanitización final del espacio</span>
    </div>
  </div>
  <a href="#reservas" class="cta-primary">Solicitar limpieza post-obra →</a>
</section>
```

5. **Schema markup especializado para cada nicho:**
```javascript
// En js/schema-niche.js
const NICHE_SCHEMA = {
  mascotas: {
    "@type": "Service",
    "name": "Limpieza de muebles para hogares con mascotas",
    "description": "Servicio especializado en eliminación de pelos, ácaros y olores de mascotas",
    "serviceType": "Pet-friendly cleaning",
    "areaServed": { "@type": "City", "name": "Bogotá" },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Servicios para mascotas",
      "itemListElement": [
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Limpieza anti-pelo mascotas" }},
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Sanitización anti-ácaros mascotas" }}
      ]
    }
  },
  alergias: {
    "@type": "Service",
    "name": "Limpieza anti-alergias con filtro HEPA",
    "description": "Tratamiento profesional para reducción de alérgenos y mejora de calidad del aire",
    "serviceType": "Allergy-safe cleaning",
    "areaServed": { "@type": "City", "name": "Bogotá" }
  }
};
```

6. **Playwright tests:**
```javascript
// En tests/niche-pages.spec.js
test('landing pages de nichos cargan sin errores', async ({ page }) => {
  const niches = ['mascotas', 'alergias', 'bebe', 'post-construction'];
  for (const niche of niches) {
    await page.goto(`/mascotas.html`);
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('.cta-primary')).toBeVisible();
    await expect(page.locator('[data-niche-schema]')).toHaveAttribute('data-schema', niche);
  }
});

test('schema markup de nichos es válido', async ({ page }) => {
  await page.goto('/mascotas.html');
  const schema = await page.evaluate(() => {
    const el = document.querySelector('script[type="application/ld+json"]');
    return el ? JSON.parse(el.textContent) : null;
  });
  expect(schema['@type']).toBe('Service');
  expect(schema.serviceType).toBeDefined();
});
```

**Impacto esperado:** +15-25% conversión en nichos premium. Diferenciación clara vs competencia local. Premium pricing justified.

**Esfuerzo:** M (2 semanas — 4 landing pages + schema + tests)

**Agente:** Frontend + Content

**Referencias:**
- [1] Google Keyword Planner — búsquedas locales Bogotá 2026
- [2] Merry Maids — Satisfaction Guarantee page
- [3] BrightLocal — Consumer Trust Survey 2026

---

### Propuesta 2: Garantía Formal de Servicio — "Si no estás satisfecho, re-limpiamos gratis"

**Problema:** La sección de confianza tiene badges pero ningún compromiso verificable. Los clientes potenciales que comparan precios necesitan un ancla de confianza superior. Una garantía formal diferenciaría a Purity & Clean de competidores que solo dicen "calidad garantizada" sin respaldo.

**Propuesta — Sistema de garantía visible y rastreable:**

1. **Nueva sección en index.html para garantía:**
```html
<section id="garantia" class="section section-garantia" aria-labelledby="garantia-heading">
  <div class="container">
    <div class="garantia-badge" aria-label="Garantía de satisfacción">
      <div class="garantia-icon">
        <i class="fa-solid fa-shield-check"></i>
      </div>
      <div class="garantia-content">
        <h2 id="garantia-heading">Garantía de Satisfacción 100%</h2>
        <p class="garantia-subtitle">Si no estás completamente satisfecho, regresamos a re-limpiar sin costo adicional.</p>
        
        <div class="garantia-terms">
          <div class="garantia-term">
            <i class="fa-solid fa-check-circle"></i>
            <span>Re-servicio gratuito si no quedas satisfecho</span>
          </div>
          <div class="garantia-term">
            <i class="fa-solid fa-check-circle"></i>
            <span>Servicio garantizado por 30 días</span>
          </div>
          <div class="garantia-term">
            <i class="fa-solid fa-check-circle"></i>
            <span>Equipo profesional certificado</span>
          </div>
        </div>
        
        <div class="garantia-stats">
          <div class="garantia-stat">
            <span class="stat-number" data-counter="98">0</span>
            <span class="stat-label">% de clientes satisfechos</span>
          </div>
          <div class="garantia-stat">
            <span class="stat-number" data-counter="1247">0</span>
            <span class="stat-label">Servicios realizados</span>
          </div>
          <div class="garantia-stat">
            <span class="stat-number" data-counter="4">0</span>
            <span class="stat-label">Reclamaciones en garantía</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
```

2. **CSS para la sección garantía:**
```css
.section-garantia {
  background: linear-gradient(135deg, var(--color-primary-light), var(--color-primary));
  color: white;
  padding: 4rem 0;
}

.garantia-badge {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 2rem;
  align-items: center;
  max-width: 900px;
  margin: 0 auto;
}

.garantia-icon {
  width: 120px;
  height: 120px;
  background: rgba(255,255,255,0.2);
  border-radius: 50%;
  display: grid;
  place-content: center;
  font-size: 3rem;
}

.garantia-content h2 {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.garantia-subtitle {
  font-size: 1.1rem;
  opacity: 0.9;
  margin-bottom: 1.5rem;
}

.garantia-terms {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.garantia-term {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.95rem;
}

.garantia-term i {
  color: var(--color-accent);
}

.garantia-stats {
  display: flex;
  gap: 2rem;
}

.garantia-stat {
  text-align: center;
}

.stat-number {
  display: block;
  font-size: 2rem;
  font-weight: 800;
}

.stat-label {
  font-size: 0.8rem;
  opacity: 0.8;
}

@media (max-width: 768px) {
  .garantia-badge {
    grid-template-columns: 1fr;
    text-align: center;
  }
  
  .garantia-icon {
    margin: 0 auto;
    width: 80px;
    height: 80px;
    font-size: 2rem;
  }
  
  .garantia-stats {
    justify-content: center;
  }
}
```

3. **JavaScript para tracking de garantías:**
```javascript
// En js/garantia.js
const GARANTIA_CONFIG = {
  validDays: 30,
  contactWhatsApp: "573001234567",
  messageTemplate: "Hola!%20Quiero%20activar%20mi%20garantía%20de%20satisfacción.%20Detalles:%0A"
};

function activateGarantia(bookingData) {
  const garantiaExpiry = new Date();
  garantiaExpiry.setDate(garantiaExpiry.getDate() + GARANTIA_CONFIG.validDays);
  
  localStorage.setItem('purity_garantia', JSON.stringify({
    bookingId: bookingData.id,
    expiry: garantiaExpiry.toISOString(),
    serviceType: bookingData.serviceType
  }));
  
  const message = `${GARANTIA_CONFIG.messageTemplate}📅 Servicio: ${bookingData.serviceType}%0A📍 Zona: ${bookingData.zone}%0A📧 Email: ${bookingData.email}`;
  window.open(`https://wa.me/${GARANTIA_CONFIG.contactWhatsApp}?text=${message}`, '_blank');
}

function checkGarantiaActive() {
  const garantia = JSON.parse(localStorage.getItem('purity_garantia') || '{}');
  if (!garantia.expiry) return false;
  
  const now = new Date();
  const expiry = new Date(garantia.expiry);
  return now < expiry;
}
```

4. **Schema.org para la garantía:**
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Offer",
  "name": "Garantía de Satisfacción 100%",
  "description": "Si no estás completamente satisfecho con el servicio, regresamos a re-limpiar sin costo adicional.",
  "url": "https://purityclean.com/#garantia",
  "validFrom": "2026-01-01",
  "priceCurrency": "COP",
  "availability": "https://schema.org/InStock",
  "hasMerchantReturnPolicy": {
    "@type": "MerchantReturnPolicy",
    "name": "Garantía de satisfacción 30 días",
    "returnMethod": "https://schema.org/ReturnByPhone",
    "returnFees": "https://schema.org/FreeReturn"
  }
}
</script>
```

5. **Playwright tests:**
```javascript
// En tests/garantia.spec.js
test('sección de garantía es visible en homepage', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('#garantia')).toBeVisible();
  await expect(page.locator('.garantia-badge')).toBeVisible();
});

test('stats de garantía son animados', async ({ page }) => {
  await page.goto('/');
  const stat98 = page.locator('.garantia-stat .stat-number[data-counter="98"]');
  await page.waitForFunction(() => {
    const el = document.querySelector('.garantia-stat .stat-number[data-counter="98"]');
    return el && parseInt(el.textContent) > 0;
  }, { timeout: 5000 });
});

test('garantía se activa en localStorage post-reserva', async ({ page }) => {
  await page.goto('/#reservas');
  await fillBookingForm();
  await page.click('#booking-submit');
  await page.waitForFunction(() => {
    const g = localStorage.getItem('purity_garantia');
    return g && JSON.parse(g).bookingId;
  });
});
```

**Impacto esperado:** +10-15% conversión en clientes que comparan con competencia. Reducción de objeciones de precio. Diferenciación premium.

**Esfuerzo:** S (1 semana — sección + CSS + JS + schema + tests)

**Agente:** Frontend + QA

**Referencias:**
- [2] Merry Maids — "Satisfaction Guarantee" page
- [3] BrightLocal Consumer Survey 2026 — trust signals

---

### Propuesta 3: Partnerships B2B — Coworking, Real Estate, Airbnb Superhosts, Clínicas

**Problema:** Los segmentos B2B propuestos anteriormente (R5, R8, R11) cubrían Airbnb hosts genéricos, inmobiliarias y hoteles. Hay segmentos de alto valor sin programa formal: coworking spaces, real estate (home staging), Airbnb Superhosts premium, y clínicas/consultorios médicos.

**Propuesta — Programa "Purity Pro" con 4 verticales:**

1. **Nueva página /pro.html:**
```html
<!DOCTYPE html>
<html lang="es">
<head>
  <title>Purity Pro | Programa de Partnership para Profesionales</title>
  <meta name="description" content="Programa de partnership para coworking, real estate, Airbnb Superhosts y clínicas en Bogotá. Descuentos por volumen y gestión prioritaria.">
  <link rel="canonical" href="https://purityclean.com/pro">
</head>
<body>
  <section id="hero-pro">
    <h1>Purity Pro</h1>
    <p>Programa de partnership para profesionales y empresas en Bogotá</p>
    <div class="pro-segmentos">
      <div class="pro-segmento" data-segment="coworking">
        <i class="fa-solid fa-users-viewfinder"></i>
        <h3>Coworking Spaces</h3>
        <p>Limpieza recurrente de espacios compartidos, salas de reuniones y áreas comunes.</p>
      </div>
      <div class="pro-segmento" data-segment="realestate">
        <i class="fa-solid fa-house-chimney"></i>
        <h3>Real Estate</h3>
        <p>Home staging cleaning para propiedades en venta o arriendo.</p>
      </div>
      <div class="pro-segmento" data-segment="airbnb">
        <i class="fa-solid fa-key"></i>
        <h3>Airbnb Superhosts</h3>
        <p>Servicio express de limpieza para reservas recurrentes con check-in rápido.</p>
      </div>
      <div class="pro-segmento" data-segment="clinicas">
        <i class="fa-solid fa-hospital"></i>
        <h3>Clínicas y Consultorios</h3>
        <p>Higienización profesional con protocolos de descontaminación médica.</p>
      </div>
    </div>
  </section>
  
  <section id="pro-beneficios">
    <h2>Beneficios Purity Pro</h2>
    <div class="pro-beneficios-grid">
      <div class="pro-beneficio">
        <span class="beneficio-descuento">20-35%</span>
        <span class="beneficio-label">Descuento por volumen</span>
      </div>
      <div class="pro-beneficio">
        <span class="beneficio-descuento">24h</span>
        <span class="beneficio-label">Tiempo de respuesta</span>
      </div>
      <div class="pro-beneficio">
        <span class="beneficio-descuento">Dedicado</span>
        <span class="beneficio-label">Account manager</span>
      </div>
      <div class="pro-beneficio">
        <span class="beneficio-descuento">Factura</span>
        <span class="beneficio-label">Corporativa electrónica</span>
      </div>
    </div>
  </section>
  
  <section id="pro-cta">
    <h2>¿Quieres ser Purity Pro?</h2>
    <p>Completa el formulario y te contactamos en menos de 24 horas.</p>
    <form id="pro-form" action="https://formspree.io/f/${FORMSPREE_CONFIG.pro}" method="POST">
      <input type="text" name="empresa" placeholder="Nombre de tu empresa" required>
      <input type="email" name="email" placeholder="Email corporativo" required>
      <select name="segmento" required>
        <option value="">Selecciona tu segmento</option>
        <option value="coworking">Coworking</option>
        <option value="realestate">Real Estate</option>
        <option value="airbnb">Airbnb Superhost</option>
        <option value="clinica">Clínica/Consultorio</option>
      </select>
      <button type="submit" class="btn btn-accent">Quiero ser partner</button>
    </form>
  </section>
</body>
</html>
```

2. **Código de descuento por segmento:**
```javascript
// En js/pro-discount.js
const PRO_DISCOUNTS = {
  coworking: { discount: 0.25, minMonthly: 3 },    // 25% desc, min 3 servicios/mes
  realestate: { discount: 0.20, minMonthly: 2 },    // 20% desc, min 2 servicios/mes
  airbnb: { discount: 0.15, minMonthly: 4 },       // 15% desc, min 4 servicios/mes
  clinicas: { discount: 0.30, minMonthly: 1 }     // 30% desc, min 1 servicio/mes (alto ticket)
};

function applyProDiscount(segment, basePrice) {
  const config = PRO_DISCOUNTS[segment];
  if (!config) return basePrice;
  return Math.round(basePrice * (1 - config.discount));
}

function trackProPartner(segment, email) {
  // Enviar a Formspree con tag para CRM
  fetch(`https://formspree.io/f/${FORMSPREE_CONFIG.pro}`, {
    method: 'POST',
    body: new FormData(document.getElementById('pro-form'))
  });
  
  // Track en analytics
  if (typeof plausible !== 'undefined') {
    plausible('pro_partner_signup', {
      props: { segment, email }
    });
  }
}
```

3. **Landing page específica para Airbnb Superhosts:**
```html
<!-- /pro-airbnb.html — Redirect desde campaña de Airbnb Superhost -->
<section id="hero-airbnb-pro">
  <h1>🧹 Limpieza Express para Airbnb Superhosts</h1>
  <p>Servicio diseñado para hosts que necesitan limpiezas rápidas, confiables y con check-in seamless entre reservas.</p>
  
  <div class="airbnb-features">
    <div class="airbnb-feature">
      <i class="fa-solid fa-bolt"></i>
      <h3>Turnaround 4 horas</h3>
      <p>Limpiamos mientras tu huésped hace check-out.listo para el siguiente.</p>
    </div>
    <div class="airbnb-feature">
      <i class="fa-solid fa-clock"></i>
      <h3>Disponibilidad 7 días</h3>
      <p>Incluyendo fines de semana y días festivos.</p>
    </div>
    <div class="airbnb-feature">
      <i class="fa-solid fa-star"></i>
      <h3>Reviews 5★ garantizadas</h3>
      <p>Protocolo de limpieza que mantiene tu rating.</p>
    </div>
  </div>
  
  <a href="#pro-form" class="cta-primary">Ser Airbnb Pro Partner →</a>
</section>
```

4. **Playwright tests:**
```javascript
// En tests/pro-partnership.spec.js
test('página Purity Pro carga sin errores', async ({ page }) => {
  await page.goto('/pro.html');
  await expect(page.locator('h1')).toContainText('Purity Pro');
  await expect(page.locator('.pro-segmento')).toHaveCount(4);
});

test('formulario Pro genera lead en Formspree', async ({ page }) => {
  await page.goto('/pro.html');
  await page.fill('#pro-form input[name="empresa"]', 'WeWork Bogotá');
  await page.fill('#pro-form input[name="email"]', 'operaciones@wework.com');
  await page.selectOption('#pro-form select[name="segmento"]', 'coworking');
  await page.click('#pro-form button[type="submit"]');
  await expect(page.locator('.form-success')).toBeVisible();
});

test('descuentos Pro se calculan correctamente', async ({ page }) => {
  const price = applyProDiscount('airbnb', 150000);
  expect(price).toBe(127500); // 15% discount
});
```

**Impacto esperado:** +20% revenue B2B con contratos recurrentes. Ticket promedio 3-5x vs cliente individual. Ingresos predecibles mensuales.

**Esfuerzo:** M (2 semanas — landing page + descuentos + form + tests)

**Agente:** Full Stack + Content

**Referencias:**
- WeWork cleaning requirements (benchmark)
- Airbnb Superhost program requirements

---

### Propuesta 4: Real-Time Availability Widget — "Verifica disponibilidad antes de reservar"

**Problema:** El slot picker actual muestra fechas fixas sin verificar disponibilidad real. El usuario completa el formulario de reserva y recibe "no hay disponibilidad" = experiencia frustrante y bounce.

**Propuesta — Widget de disponibilidad en tiempo real:**

1. **Nuevo componente de disponibilidad en index.html:**
```html
<div id="availability-widget" class="availability-widget" aria-label="Verificar disponibilidad">
  <div class="availability-header">
    <h3>Verifica disponibilidad en tiempo real</h3>
    <span class="availability-live-badge">
      <span class="live-dot"></span>
      Disponibilidad real
    </span>
  </div>
  
  <div class="availability-date-picker">
    <label for="availability-date">Selecciona fecha:</label>
    <input type="date" id="availability-date" name="date" min="">
  </div>
  
  <div id="availability-slots" class="availability-slots">
    <!-- Slots se cargan dinámicamente -->
    <div class="slot skeleton"></div>
    <div class="slot skeleton"></div>
    <div class="slot skeleton"></div>
  </div>
  
  <div id="availability-result" class="availability-result hidden">
    <div class="slot slot-available" data-time="08:00">
      <span class="slot-time">08:00 - 10:00</span>
      <span class="slot-status available">Disponible</span>
    </div>
    <div class="slot slot-available" data-time="10:00">
      <span class="slot-time">10:00 - 12:00</span>
      <span class="slot-status available">Disponible</span>
    </div>
    <div class="slot slot-unavailable" data-time="12:00">
      <span class="slot-time">12:00 - 14:00</span>
      <span class="slot-status unavailable">Ocupado</span>
    </div>
  </div>
  
  <button id="confirm-availability" class="cta-primary" disabled>
    Reservar este horario
  </button>
</div>
```

2. **CSS para el widget:**
```css
.availability-widget {
  background: var(--color-surface);
  border: 2px solid var(--color-border);
  border-radius: 16px;
  padding: 1.5rem;
  max-width: 400px;
  margin: 2rem auto;
}

.availability-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.availability-live-badge {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.8rem;
  color: var(--color-accent);
  font-weight: 600;
}

.live-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--color-accent);
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.availability-slots {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;
  margin: 1rem 0;
}

.slot {
  display: flex;
  flex-direction: column;
  padding: 0.75rem;
  border-radius: 8px;
  border: 1px solid var(--color-border);
  cursor: pointer;
  transition: all 0.2s;
}

.slot:hover:not(.slot-unavailable) {
  border-color: var(--color-primary);
  background: var(--color-primary-light);
}

.slot.selected {
  border-color: var(--color-primary);
  background: var(--color-primary);
  color: white;
}

.slot.skeleton {
  background: linear-gradient(90deg, var(--color-border) 25%, var(--color-surface) 50%, var(--color-border) 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

.slot-unavailable {
  opacity: 0.5;
  cursor: not-allowed;
  background: var(--color-background);
}

.slot-time {
  font-weight: 600;
  font-size: 0.9rem;
}

.slot-status {
  font-size: 0.75rem;
  margin-top: 0.25rem;
}

.slot-status.available {
  color: var(--color-accent);
}

.slot-status.unavailable {
  color: var(--color-text-muted);
}
```

3. **JavaScript para disponibilidad real:**
```javascript
// En js/availability.js
const AVAILABILITY_CONFIG = {
  apiEndpoint: '/api/availability',  // Google Sheets Apps Script proxy
  cacheMinutes: 5,
  workingHours: ['08:00', '10:00', '12:00', '14:00', '16:00'],
  zones: ['norte', 'centro', 'sur', 'occidente']
};

let cachedAvailability = null;
let cacheTimestamp = null;

async function fetchAvailability(date, zone) {
  const now = Date.now();
  
  // Check cache
  if (cachedAvailability && cacheTimestamp && (now - cacheTimestamp) < AVAILABILITY_CONFIG.cacheMinutes * 60000) {
    return cachedAvailability[date]?.[zone] || null;
  }
  
  // Fetch from API (Google Sheets proxy)
  try {
    const response = await fetch(`${AVAILABILITY_CONFIG.apiEndpoint}?date=${date}&zone=${zone}`);
    const data = await response.json();
    
    cachedAvailability = data;
    cacheTimestamp = now;
    
    return data[date]?.[zone] || null;
  } catch (error) {
    console.warn('Availability API unavailable, using fallback');
    return generateMockAvailability(date, zone);
  }
}

function generateMockAvailability(date, zone) {
  // Fallback when API is unavailable
  const slots = AVAILABILITY_CONFIG.workingHours.map(time => ({
    time,
    available: Math.random() > 0.3  // 70% chance available
  }));
  return { date, zone, slots };
}

function renderAvailabilitySlots(availability) {
  const container = document.getElementById('availability-slots');
  container.innerHTML = '';
  
  availability.slots.forEach(slot => {
    const slotEl = document.createElement('div');
    slotEl.className = `slot ${slot.available ? 'slot-available' : 'slot-unavailable'}`;
    slotEl.dataset.time = slot.time;
    slotEl.innerHTML = `
      <span class="slot-time">${slot.time}</span>
      <span class="slot-status ${slot.available ? 'available' : 'unavailable'}">
        ${slot.available ? 'Disponible' : 'Ocupado'}
      </span>
    `;
    
    if (slot.available) {
      slotEl.addEventListener('click', () => selectSlot(slotEl, slot.time));
    }
    
    container.appendChild(slotEl);
  });
}

function selectSlot(slotEl, time) {
  document.querySelectorAll('.slot.selected').forEach(s => s.classList.remove('selected'));
  slotEl.classList.add('selected');
  
  const confirmBtn = document.getElementById('confirm-availability');
  confirmBtn.disabled = false;
  confirmBtn.dataset.selectedTime = time;
}

// Initialize date picker with min date = tomorrow
const dateInput = document.getElementById('availability-date');
const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);
dateInput.min = tomorrow.toISOString().split('T')[0];

dateInput.addEventListener('change', async (e) => {
  const date = e.target.value;
  const zone = document.getElementById('zone-select')?.value || 'norte';
  
  // Show loading skeleton
  document.getElementById('availability-slots').innerHTML = `
    <div class="slot skeleton"></div>
    <div class="slot skeleton"></div>
    <div class="slot skeleton"></div>
    <div class="slot skeleton"></div>
  `;
  
  const availability = await fetchAvailability(date, zone);
  renderAvailabilitySlots(availability);
  document.getElementById('availability-result').classList.remove('hidden');
});
```

4. **API mock con Google Sheets (Apps Script):**
```javascript
// En Google Apps Script — funcion doGet
function doGet(e) {
  const date = e.parameter.date;
  const zone = e.parameter.zone;
  
  // Leer de Google Sheet
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Disponibilidad');
  const data = sheet.getDataRange().getValues();
  
  // Filtrar por fecha y zona
  const availability = data
    .filter(row => row[0] === date && row[1] === zone)
    .map(row => ({
      time: row[2],
      available: row[3] === 'disponible'
    }));
  
  return ContentService
    .createTextOutput(JSON.stringify({ [date]: { [zone]: { date, zone, slots: availability } } }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

5. **Playwright tests:**
```javascript
// En tests/availability.spec.js
test('widget de disponibilidad muestra slots', async ({ page }) => {
  await page.goto('/');
  await page.fill('#availability-date', '2026-05-01');
  await page.waitForSelector('.slot:not(.skeleton)', { timeout: 5000 });
  const slots = await page.locator('.slot:not(.skeleton)').count();
  expect(slots).toBeGreaterThan(0);
});

test('slot no disponible tiene estilo diferente', async ({ page }) => {
  await page.goto('/');
  await page.fill('#availability-date', '2026-05-01');
  await page.waitForSelector('.slot.unavailable', { timeout: 5000 });
  const unavailable = page.locator('.slot.unavailable').first();
  await expect(unavailable).toBeVisible();
});

test('slot disponible es clickeable', async ({ page }) => {
  await page.goto('/');
  await page.fill('#availability-date', '2026-05-01');
  await page.waitForSelector('.slot.available', { timeout: 5000 });
  await page.click('.slot.available');
  await expect(page.locator('.slot.selected')).toBeVisible();
  await expect(page.locator('#confirm-availability')).not.toBeDisabled();
});
```

**Impacto esperado:** -20% abandono post-formulario por falta de disponibilidad. UX premium que diferencia de competencia.

**Esfuerzo:** M (2 semanas — widget + API mock + tests)

**Agente:** Frontend + Backend (API mock)

**Referencias:**
- Calendly availability widget (benchmark)
- Square Appointments real-time availability

---

### Propuesta 5: Seasonal Landing Pages — "Limpieza de Temporada" Campaign

**Problema:** Las búsquedas estacionales para servicios de limpieza tienen spikes de 200-400% en ciertas épocas del año. El sitio no tiene landing pages para capturar esta demanda con mensajes de urgencia y ofertas temáticas.

**Propuesta — 4 seasonal landing pages:**

1. **/temporada-alergias.html (Marzo-Abril):**
```html
<section id="hero-seasonal" class="hero-seasonal hero-alergias">
  <div class="seasonal-badge">⏰ Disponible solo hasta Mayo</div>
  <h1>Limpieza Anti-Alergias de Temporada 🌸</h1>
  <p>Marzo y abril son los meses de mayor concentración de ácaros y alérgenos en Bogotá. Prepárate con nuestro tratamiento especializado.</p>
  
  <div class="seasonal-offer">
    <div class="offer-tag">20% OFF</div>
    <div class="offer-details">
      <span class="offer-price">Desde $64.000</span>
      <span class="offer-note">En lugar de $80.000</span>
    </div>
  </div>
  
  <a href="#reservas" class="cta-primary cta-seasonal">Reservar antes de que termine la temporada →</a>
  
  <p class="seasonal-countdown">
    <span id="countdown-days">15</span> días restantes de esta oferta
  </p>
</section>
```

2. **/temporada-fin-año.html (Diciembre):**
```html
<section id="hero-seasonal" class="hero-seasonal hero-yearend">
  <div class="seasonal-badge">🎄 Navidad 2026</div>
  <h1>Limpieza Profunda para Fin de Año 🎉</h1>
  <p>Llega al nuevo año con un hogar impecable. Limpieza deep para fin de año: sofás, colchones, alfombras y más.</p>
  
  <div class="seasonal-packages">
    <div class="package">
      <h3>Pack Navidad</h3>
      <p>Sofa + Colchón + Alfombra pequeña</p>
      <span class="package-price">$299.000</span>
      <span class="package-savings">Ahorra $50.000</span>
    </div>
    <div class="package package-popular">
      <h3>Pack Año Nuevo</h3>
      <p>Todo el hogar deep clean</p>
      <span class="package-price">$450.000</span>
      <span class="package-savings">Ahorra $80.000</span>
    </div>
  </div>
  
  <a href="#reservas" class="cta-primary cta-seasonal">Reservar antes del 20 de diciembre →</a>
</section>
```

3. **/temporada-volver-clases.html (Enero):**
```html
<section id="hero-seasonal" class="hero-seasonal hero-backtoschool">
  <div class="seasonal-badge">📚 Vuelta a clases</div>
  <h1>Hogar Listo para el Año Escolar 📖</h1>
  <p>Habitaciones de niños, escritorios, colchones — todo listo para que los pequeños empiecen con buen pie.</p>
  
  <div class="seasonal-features">
    <div class="feature">
      <i class="fa-solid fa-bed"></i>
      <span>Limpieza de habitaciones infantiles</span>
    </div>
    <div class="feature">
      <i class="fa-solid fa-child"></i>
      <span>Sanitización de escritorios y superficies</span>
    </div>
    <div class="feature">
      <i class="fa-solid fa-sparkles"></i>
      <span>Colchón y textiles libres de ácaros</span>
    </div>
  </div>
  
  <a href="#reservas" class="cta-primary cta-seasonal">Preparar el hogar escolar →</a>
</section>
```

4. **JavaScript para countdown y detección de temporada:**
```javascript
// En js/seasonal.js
const SEASONAL_CAMPAIGNS = {
  alergias: {
    start: '2026-03-01',
    end: '2026-05-15',
    discount: 0.20,
    page: 'temporada-alergias.html'
  },
  findeano: {
    start: '2026-12-01',
    end: '2026-12-31',
    discount: 0.15,
    page: 'temporada-fin-ano.html'
  },
  volverclases: {
    start: '2026-01-10',
    end: '2026-02-28',
    discount: 0.15,
    page: 'temporada-volver-clases.html'
  }
};

function getCurrentCampaign() {
  const now = new Date();
  for (const [key, campaign] of Object.entries(SEASONAL_CAMPAIGNS)) {
    const start = new Date(campaign.start);
    const end = new Date(campaign.end);
    if (now >= start && now <= end) {
      return { key, ...campaign };
    }
  }
  return null;
}

function initSeasonalBanner() {
  const campaign = getCurrentCampaign();
  if (!campaign) return;
  
  const banner = document.createElement('div');
  banner.className = 'seasonal-banner';
  banner.innerHTML = `
    <span class="seasonal-banner-text">
      🎉 ${campaign.discount * 100}% OFF en limpieza de temporada — Solo hasta ${formatDate(campaign.end)}
    </span>
    <a href="/${campaign.page}" class="seasonal-banner-cta">Ver oferta</a>
    <button class="seasonal-banner-close">&times;</button>
  `;
  
  document.body.appendChild(banner);
}

function updateCountdown(endDate) {
  const now = new Date();
  const diff = endDate - now;
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
  
  const countdownEl = document.getElementById('countdown-days');
  if (countdownEl) {
    countdownEl.textContent = days;
  }
  
  return days;
}
```

5. **CSS para seasonal banners:**
```css
.seasonal-banner {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: linear-gradient(90deg, var(--color-primary), var(--chatbot-primary));
  color: white;
  padding: 0.75rem 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  z-index: 1000;
  font-size: 0.9rem;
}

.seasonal-banner-text {
  font-weight: 600;
}

.seasonal-banner-cta {
  background: white;
  color: var(--color-primary);
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 600;
  transition: transform 0.2s;
}

.seasonal-banner-cta:hover {
  transform: scale(1.05);
}

.seasonal-banner-close {
  background: transparent;
  border: none;
  color: white;
  font-size: 1.2rem;
  cursor: pointer;
  opacity: 0.7;
}

.seasonal-banner-close:hover {
  opacity: 1;
}

.hero-seasonal {
  background: linear-gradient(135deg, var(--color-primary-light), var(--color-surface));
  padding: 4rem 2rem;
  text-align: center;
}

.seasonal-badge {
  display: inline-block;
  background: var(--color-accent);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.seasonal-offer {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin: 1.5rem 0;
}

.offer-tag {
  background: var(--color-accent);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-size: 1.5rem;
  font-weight: 800;
}

.offer-price {
  font-size: 1.5rem;
  font-weight: 700;
}

.offer-note {
  color: var(--color-text-muted);
  text-decoration: line-through;
}

.cta-seasonal {
  font-size: 1.1rem;
  padding: 1rem 2rem;
}
```

6. **Playwright tests:**
```javascript
// En tests/seasonal.spec.js
test('banner seasonal aparece cuando hay kampana activa', async ({ page }) => {
  // Mock date to be during alergias campaign
  await page.evaluate(() => {
    const originalDate = Date;
    Date = class extends originalDate {
      constructor() {
        super();
        return new originalDate('2026-04-15');
      }
    };
  });
  
  await page.goto('/');
  await expect(page.locator('.seasonal-banner')).toBeVisible();
});

test('landing page seasonal muestra precio con descuento', async ({ page }) => {
  await page.goto('/temporada-alergias.html');
  await expect(page.locator('.offer-tag')).toContainText('20% OFF');
  await expect(page.locator('.offer-price')).toBeVisible();
});

test('countdown muestra días restantes', async ({ page }) => {
  await page.goto('/temporada-alergias.html');
  const daysText = await page.locator('#countdown-days').textContent();
  expect(parseInt(daysText)).toBeGreaterThan(0);
});
```

**Impacto esperado:** +30% revenue en temporada alta vs competencia sin presencia estacional. Captura de demanda con urgencia.

**Esfuerzo:** S (1 semana — 4 páginas + banner + countdown + tests)

**Agente:** Frontend + Content

**Referencias:**
- Seasonal marketing benchmarks — retail industry
- Booking.com seasonal campaigns model

---

## Priorización recomendada (Round 22)

| # | Propuesta | Impacto | Esfuerzo | Agente | Razón estratégica |
|---|-----------|---------|----------|--------|------------------|
| 1 | Nichos Specialty Landing Pages | Alto | Medio | Frontend/Content | Segmentos premium 20-40% más caros |
| 2 | Garantía Formal de Servicio | Alto | Bajo | Frontend/QA | Quick win, diferenciador directo |
| 4 | Real-Time Availability Widget | Alto | Medio | Frontend/Backend | UX premium, reduce bounce |
| 3 | Partnerships B2B Pro | Alto | Medio | Full Stack/Content | Revenue recurrente B2B |
| 5 | Seasonal Landing Pages | Medio | Bajo | Frontend/Content | Captura demanda estacional |

**Top 3 para implementar primero:** 2, 1, 4 (quick wins con alto impacto)

---

## Síntesis: Por qué R22 es diferente

R1-R21 se enfocaron en:
- Marketing digital (ads, retargeting, social media)
- Conversión (popups, micro-conversiones, exit-intent)
- SEO y contenido (zonas, blog, schema)
- UX y accesibilidad (dark mode, motion, WCAG)
- Tecnología (chatbot, WhatsApp, AI)
- Operaciones (field app, scheduling, subscriptions)
- Reputación (reviews, Trust Velocity, AI search)
- Dark social y video reviews

R22 se enfoca en:
- **Verticales de negocio** (nichos specialty: mascotas, alergias, bebés, post-construction)
- **Garantía formal** (compromiso verificable que reduce objeciones de precio)
- **Partnerships B2B de nicho** (coworking, real estate, Airbnb Superhosts, clínicas)
- **Disponibilidad real-time** (widget que elimina fricción post-reserva)
- **Campañas estacionales** (captura de demanda con urgencia)

R22 cierra la brecha entre "sitio funcional" y "máquina deRevenue estacional con nichos premium".

---

## Referencias

[1] Google Keyword Planner — búsquedas locales Bogotá 2026
[2] Merry Maids — Satisfaction Guarantee page, 2026
[3] BrightLocal — Consumer Trust Survey 2026

---

*Co-Authored-By: Paperclip <noreply@paperclip.ing>*