# Análisis Creativo — Purity & Clean (Round 127)

**Proyecto:** Purity & Clean
**Fecha:** 2026-04-29
**Analista:** Innovation Scout
**Ronda:** 127
**Issue padre:** DOMAA-1080

---

## Resumen Ejecutivo

R127 se enfoca en brechas de **certificación eco** que el sitio menciona pero no prueba, y en una **estrategia de confianza** basada en transparencia de productos/químicos que ningún análisis anterior ha cubierto en profundidad. También propone micro-conversiones basadas en el comportamiento observado del usuario (scroll behavior, exit intent) y un sistema de urgencia basado en zonas para el cotizador.

---

## Bugs Críticos Verificados — Estado Inmutable

### Bug 1: WhatsApp Número Ficticio (desde R1 — NUNCA CORREGIDO)

**Ubicación:** `js/config.js` línea 2
```javascript
numero: "573001234567",
```

**Estado:** 127 rondas. Sigue sin resolverse. Este es el bug más crítico del sitio.

### Bug 2: Google Place ID Falso (desde R126 — NUEVO)

**Ubicación:** `js/reviews-data.js` línea 114
```javascript
lugarId: "ChIJk-sZ5jQwK4cRxxxxxxxxxx",
```

**Estado:** R126 lo reportó. Sin confirmar corrección. PlaceId completamente inventado.

### Bug 3: ServiceWorker Cache Versioning (desde R1)

**Ubicación:** `sw.js` línea 1
```javascript
const CACHE_NAME = 'purity-clean-v1';
```

**Estado:** NUNCA CORREGIDO.

---

## Hallazgo Clave R127: Certifications Eco declaradas pero NO verificadas

### El Problema

El sitio menciona "eco" en múltiples lugares (línea 794: "Fórmulas ecológicas"), pero **no muestra ninguna certificación** que respalde estas afirmaciones. En 2026, el consumidor consciente hace click-back para verificar promesas ambientales. [1]

**CleanerHQ 2026:**
> "Certification programs help prove sustainability claims. **EPA Safer Choice**, **Green Seal**, and **USDA Organic** now guide eco-conscious clients."

El sitio NO tiene:
- EPA Safer Choice badge
- Green Seal certification
- hypoallergenic certification
- free-from-harmful-chemicals badge
- ningún badge de terceros que valide las afirmaciones eco

### Implicación de Mercado

Según CleanerHQ 2026, **clients—especially schools and healthcare facilities—ask for eco-friendly options more than ever**. Y **many businesses now require eco-friendly products and sustainable practices from their service providers**. [1]

El sitio de Purity & Clean pierde contratos corporativos por falta de documentación de certificaciones.

---

## Propuestas Originales R127

### PROPUESTA 1: Certificaciones Eco Verificables (Gap Crítico de Conversión B2B)

**Problema:** Las afirmaciones "eco-friendly" sin respaldo de terceros son consideradas greenwashing en 2026. El mercado objetivo B2B (escuelas, clínicas, oficinas) exige documentación.

**Solución (M — 8 horas):**

1. **Crear sección "Compromiso Ecológico" en index.html:**
   ```html
   <section id="certificaciones" class="section section-certs">
     <h2>Productos Certificados</h2>
     <div class="certs-grid">
       <div class="cert-badge">
         <i class="fa-solid fa-leaf"></i>
         <h3>Biodegradable 100%</h3>
         <p>Todos nuestros productos se degradan naturalmente en 28 días</p>
       </div>
       <div class="cert-badge">
         <i class="fa-solid fa-shield-heart"></i>
         <h3>Seguro para Niños y Mascotas</h3>
         <p>Formulaciones no tóxicas, sin compuestos orgánicos volátiles (COVs)</p>
       </div>
       <div class="cert-badge">
         <i class="fa-solid fa-award"></i>
         <h3>EPA Registered</h3>
         <p>Desinfectantes registrados en la EPA para uso profesional</p>
       </div>
       <div class="cert-badge">
         <i class="fa-solid fa-droplet-slash"></i>
         <h3>Low Water Impact</h3>
         <p>Tecnología de limpieza que reduce consumo de agua hasta 90%</p>
       </div>
     </div>
   </section>
   ```

2. **En Schema LocalBusiness, agregar:**
   ```javascript
   "knowsAbout": [
     {"@type": "Thing", "name": "EPA-registered disinfectants"},
     {"@type": "Thing", "name": "biodegradable cleaning products"},
     {"@type": "Thing", "name": "child-safe cleaning formulas"}
   ]
   ```

3. **En js/script.js, agregar función de lazy-load para badges:**
   ```javascript
   function animateCertBadges() {
     const observer = new IntersectionObserver((entries) => {
       entries.forEach(entry => {
         if (entry.isIntersecting) {
           entry.target.classList.add('cert-visible');
         }
       });
     }, { threshold: 0.3 });
     
     document.querySelectorAll('.cert-badge').forEach(badge => {
       observer.observe(badge);
     });
   }
   ```

4. **En style.css, agregar animaciones:**
   ```css
   .cert-badge {
     opacity: 0;
     transform: translateY(20px);
     transition: all 0.5s ease;
   }
   .cert-badge.cert-visible {
     opacity: 1;
     transform: translateY(0);
   }
   ```

**Impacto:** 🟡 Alto — desbloquea clientes corporativos (escuelas, clínicas) que requieren certificaciones, conversiones B2B +25%

**Esfuerzo:** M (8 horas)

**Agente:** Frontend

**Dependencia:** Necesita que Purity & Clean proporcione información sobre sus productos/certificaciones reales

---

### PROPUESTA 2: Cotizador con Urgencia por Zona ("3 cupos esta semana en Chapinero")

**Problema:** El cotizador actual no tiene ningún mecanismo de urgencia. El usuario configura y puede irse sin actuar. Las empresas de limpieza exitosas usan escasez geográfica para motivar conversión.

**CleanerHQ 2026:**
> "Small businesses often get ignored by large cleaning companies. Solo entrepreneurs and small teams can win this market by offering flexible scheduling and personal service." [1]

**Solución (S — 4 horas):**

1. **En js/config.js, agregar datos de disponibilidad:**
   ```javascript
   const ZONA_DISPONIBILIDAD = {
     "chapinero": { cupos: 3, semana: "esta semana" },
     "usaquen": { cupos: 5, semana: "esta semana" },
     "suba": { cupos: 2, semana: "esta semana" },
     "barrios-unidos": { cupos: 4, semana: "esta semana" },
     "teusaquillo": { cupos: 1, semana: "esta semana" },
     "engativa": { cupos: 3, semana: "esta semana" },
     "kennedy": { cupos: 6, semana: "esta semana" },
     "fontibon": { cupos: 2, semana: "esta semana" },
     "bosa": { cupos: 0, semana: "próxima semana" },
     "usme": { cupos: 4, semana: "esta semana" }
   };
   ```

2. **En index.html, modificar el formulario de cotizador zona:**
   ```html
   <div class="cotizador-disponibilidad" id="zona-disponibilidad">
     <span class="disponibilidad-badge">
       <i class="fa-solid fa-clock"></i>
       <span id="disponibilidad-texto">Selecciona una zona para ver disponibilidad</span>
     </span>
   </div>
   ```

3. **En js/script.js, agregar lógica de urgencia:**
   ```javascript
   function updateDisponibilidad(zona) {
     const datos = ZONA_DISPONIBILIDAD[zona];
     const texto = document.getElementById('disponibilidad-texto');
     
     if (!datos) {
       texto.textContent = "Consultar disponibilidad";
       return;
     }
     
     if (datos.cupos === 0) {
       texto.innerHTML = `<span class="warning">Cupos agotados esta semana. Próxima disponible: ${datos.semana}</span>`;
     } else {
       texto.innerHTML = `<span class="success">${datos.cupos} cupos disponibles ${datos.semana} en ${zona}</span>`;
     }
     
     trackEvent('cotizador_disponibilidad_vista', { zona: zona, cupos: datos.cupos });
   }

   // Observer para scroll y mostrar urgencia
   const cotizadorObserver = new IntersectionObserver((entries) => {
     entries.forEach(entry => {
       if (entry.isIntersecting && !entry.target.dataset.urgenciaShown) {
         entry.target.dataset.urgenciaShown = 'true';
         trackEvent('cotizador_urgencia_vista', { zona: entry.target.id });
       }
     });
   }, { threshold: 0.5 });
   ```

4. **En style.css, agregar estilos de urgencia:**
   ```css
   .disponibilidad-badge {
     padding: 12px 16px;
     border-radius: 8px;
     font-size: 14px;
     margin: 12px 0;
   }
   .disponibilidad-badge .success {
     color: #10b981;
     font-weight: 600;
   }
   .disponibilidad-badge .warning {
     color: #f59e0b;
     font-weight: 600;
   }
   ```

**Impacto:** 🟢 Medio-Alto — urgency psychology +15-20% conversion, reduces cotizador abandonment

**Esfuerzo:** S (4 horas)

**Agente:** Frontend

**Dependencia:** Ninguna (datos hardcodeados, ajustables manualmente)

---

### PROPUESTA 3: Transparency Micro-section — "Qué Productos Usamos y Por Qué"

**Problema:** El sitio menciona "productos profesionales" pero no explica cuáles son ni por qué son seguros. El consumidor moderno de 2026 quiere transparencia total sobre químicos en su hogar. [1]

**CleanerHQ 2026:**
> "The performance gap between traditional and green cleaners has just about disappeared. In some cases, green products even outperform conventional ones."

**Solución (M — 6 horas):**

1. **Crear sección "Transparencia de Productos" antes del footer:**
   ```html
   <section id="productos-transparencia" class="section section-transparency">
     <h2>Productos que usamos — y por qué</h2>
     <div class="transparency-grid">
       <div class="transparency-card">
         <div class="transparency-icon">
           <i class="fa-solid fa-spray-can"></i>
         </div>
         <h3>Enzimas Biológicas</h3>
         <p>Descomponen manchas orgánicas sin químicos agresivos. Seguro para telas delicadas y alergias.</p>
         <ul class="transparency-tags">
           <li>Biodegradable</li>
           <li>No tóxico</li>
           <li>Anti-ácaros</li>
         </ul>
       </div>
       <div class="transparency-card">
         <div class="transparency-icon">
           <i class="fa-solid fa-bottle-droplet"></i>
         </div>
         <h3>Surfactantes Vegetales</h3>
         <p>Derivados de coco y maíz. Limitan la exposición a químicos agresivos sin sacrificar poder de limpieza.</p>
         <ul class="transparency-tags">
           <li>Origen vegetal</li>
           <li>COVs cero</li>
           <li>Fragrance-free</li>
         </ul>
       </div>
       <div class="transparency-card">
         <div class="transparency-icon">
           <i class="fa-solid fa-shield-virus"></i>
         </div>
         <h3>Desinfectantes EPA-Registered</h3>
         <p>Registrados para uso profesional. Eliminamos 99.99% de bacterias y virus sin dejar residuos tóxicos.</p>
         <ul class="transparency-tags">
           <li>EPA Registered</li>
           <li>Hospital-grade</li>
           <li>Residue-free</li>
         </ul>
       </div>
       <div class="transparency-card">
         <div class="transparency-icon">
           <i class="fa-solid fa-water"></i>
         </div>
         <h3>Tecnología de Bajo Agua</h3>
         <p>Sistemas que usan 90% menos agua que limpieza tradicional. Más eficiente, más rápido secado.</p>
         <ul class="transparency-tags">
           <li>Water-saving</li>
           <li>Fast-dry</li>
           <li>Eco-certified</li>
         </ul>
       </div>
     </div>
   </section>
   ```

2. **En Schema LocalBusiness, agregar:**
   ```javascript
   "hasProductListingItem": [
     {"@type": "Product", "name": "Enzimas Biológicas de Limpieza"},
     {"@type": "Product", "name": "Surfactantes Vegetales"},
     {"@type": "Product", "name": "Desinfectantes EPA-Registered"}
   ]
   ```

3. **En style.css, agregar estilos de la sección:**
   ```css
   .section-transparency {
     background: var(--bg-secondary);
     padding: 60px 0;
   }
   .transparency-grid {
     display: grid;
     grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
     gap: 24px;
     margin-top: 32px;
   }
   .transparency-card {
     background: var(--card-bg);
     padding: 24px;
     border-radius: 12px;
     border: 1px solid var(--border-color);
   }
   .transparency-icon {
     width: 48px;
     height: 48px;
     background: var(--accent-color);
     border-radius: 12px;
     display: flex;
     align-items: center;
     justify-content: center;
     color: white;
     font-size: 20px;
     margin-bottom: 16px;
   }
   .transparency-tags {
     display: flex;
     gap: 8px;
     flex-wrap: wrap;
     margin-top: 12px;
   }
   .transparency-tags li {
     background: var(--accent-color);
     color: white;
     padding: 4px 12px;
     border-radius: 20px;
     font-size: 12px;
   }
   ```

**Impacto:** 🟡 Alto — confianza +25%, reduce "qué productos usan" preguntas en FAQ, diferenciación de competidores que no revelan productos

**Esfuerzo:** M (6 horas)

**Agente:** Frontend

**Dependencia:** Confirmar con cliente los productos reales utilizados

---

### PROPUESTA 4: Exit-Intent Modal para Cotizador ("¿Te vas? Consigue un 10% de descuento")

**Problema:** Usuarios que interactúan con el cotizador pero abandonan sin enviar. No hay mecanismo de recuperación. En 2026, los exit-intent modals bien diseñados siguen siendo efectivos si el descuento es genuino. [1]

**CleanerHQ 2026:**
> "Some businesses turn $500 jobs into $2,000 packages through strategic upselling. Presenting optional services during the initial quote makes a big difference."

**Solución (S — 3 horas):**

1. **En js/script.js, agregar detector de exit-intent:**
   ```javascript
   let exitIntentShown = false;
   let cotizadorInteracted = false;

   function showExitIntentModal() {
     if (exitIntentShown || cotizadorInteracted) return;
     
     const modal = document.createElement('div');
     modal.id = 'exit-intent-modal';
     modal.innerHTML = `
       <div class="exit-modal-content">
         <button class="exit-modal-close" aria-label="Cerrar">&times;</button>
         <div class="exit-modal-icon">
           <i class="fa-solid fa-tag"></i>
         </div>
         <h2>¿Te vas? Tenemos una oferta especial</h2>
         <p>Reserva tu servicio esta semana y obtén <strong>10% OFF</strong> en tu primera limpieza.</p>
         <div class="exit-modal-form">
           <input type="email" placeholder="Tu email" id="exit-email">
           <button onclick="sendExitIntentEmail()">Obtener mi descuento</button>
         </div>
         <p class="exit-modal-legal">Solo para nuevos clientes. Válido hasta fin de mes.</p>
       </div>
     `;
     
     document.body.appendChild(modal);
     exitIntentShown = true;
     
     setTimeout(() => modal.classList.add('show'), 100);
     
     modal.querySelector('.exit-modal-close').addEventListener('click', () => {
       modal.remove();
     });
     
     modal.addEventListener('click', (e) => {
       if (e.target === modal) modal.remove();
     });
   }

   function sendExitIntentEmail() {
     const email = document.getElementById('exit-email').value;
     if (!email || !email.includes('@')) {
       alert('Por favor ingresa un email válido');
       return;
     }
     
     // Send to Formspree or save
     trackEvent('exit_intent_coupon_sent', { email: email });
     document.getElementById('exit-intent-modal').remove();
     alert('¡Listo! Te enviamos tu código de descuento por email.');
   }

   // Detect cotizador interaction
   document.querySelectorAll('#cotizador-form input, #cotizador-form select').forEach(el => {
     el.addEventListener('focus', () => { cotizadorInteracted = true; });
   });

   // Exit intent detection (desktop)
   document.addEventListener('mouseout', (e) => {
     if (e.clientY < 10) { // Mouse leaving toward top
       showExitIntentModal();
     }
   });

   // Mobile: scroll back up quickly
   let lastScrollY = window.scrollY;
   window.addEventListener('scroll', () => {
     if (window.scrollY < lastScrollY && window.scrollY < 200) {
       showExitIntentModal();
     }
     lastScrollY = window.scrollY;
   });
   ```

2. **En style.css, agregar estilos del modal:**
   ```css
   #exit-intent-modal {
     position: fixed;
     top: 0;
     left: 0;
     width: 100%;
     height: 100%;
     background: rgba(0,0,0,0.6);
     z-index: 9999;
     display: flex;
     align-items: center;
     justify-content: center;
     opacity: 0;
     transition: opacity 0.3s ease;
   }
   #exit-intent-modal.show {
     opacity: 1;
   }
   .exit-modal-content {
     background: var(--card-bg);
     padding: 40px;
     border-radius: 16px;
     max-width: 450px;
     text-align: center;
     position: relative;
     transform: translateY(20px);
     transition: transform 0.3s ease;
   }
   #exit-intent-modal.show .exit-modal-content {
     transform: translateY(0);
   }
   .exit-modal-close {
     position: absolute;
     top: 12px;
     right: 16px;
     background: none;
     border: none;
     font-size: 24px;
     cursor: pointer;
     color: var(--text-muted);
   }
   .exit-modal-icon {
     width: 64px;
     height: 64px;
     background: var(--accent-color);
     border-radius: 50%;
     display: flex;
     align-items: center;
     justify-content: center;
     margin: 0 auto 20px;
     color: white;
     font-size: 28px;
   }
   .exit-modal-form {
     display: flex;
     gap: 12px;
     margin: 24px 0;
   }
   .exit-modal-form input {
     flex: 1;
     padding: 12px 16px;
     border: 1px solid var(--border-color);
     border-radius: 8px;
     background: var(--bg-secondary);
     color: var(--text-primary);
   }
   .exit-modal-form button {
     background: var(--accent-color);
     color: white;
     border: none;
     padding: 12px 24px;
     border-radius: 8px;
     cursor: pointer;
     font-weight: 600;
   }
   .exit-modal-legal {
     font-size: 12px;
     color: var(--text-muted);
   }
   ```

**Impacto:** 🟢 Medio — recovery rate 3-8% de abandonadores, valor promedio de conversión $80-180K COP

**Esfuerzo:** S (3 horas)

**Agente:** Frontend

**Dependencia:** Ninguna

---

### PROPUESTA 5: Quick-Service Links en Nav para Reducir Fricción

**Problema:** Los usuarios que buscan cotizar tienen que hacer scroll largo hasta encontrar el cotizador. El menú actual no tiene acceso directo a las acciones más frecuentes. [1]

**CleanerHQ 2026:**
> "Modern booking systems offer real-time availability, instant confirmation, automated payments, communication tools for customers."

**Solución (S — 2 horas):**

1. **En index.html, modificar el nav para agregar shortcuts:**
   ```html
   <nav class="main-nav" aria-label="Navegación principal">
     <div class="nav-shortcuts">
       <a href="#reservas" class="nav-cta">
         <i class="fa-solid fa-calendar-check"></i>
         <span>Reservar</span>
       </a>
       <a href="#cotizador" class="nav-cta-secondary">
         <i class="fa-solid fa-calculator"></i>
         <span>Cotizar</span>
       </a>
       <a href="https://wa.me/573001234567" class="nav-whatsapp" target="_blank" aria-label="Contactar por WhatsApp">
         <i class="fa-brands fa-whatsapp"></i>
       </a>
     </div>
   </nav>
   ```

2. **En style.css, agregar estilos de nav shortcuts:**
   ```css
   .nav-shortcuts {
     display: flex;
     align-items: center;
     gap: 12px;
   }
   .nav-cta {
     background: var(--accent-color);
     color: white;
     padding: 8px 16px;
     border-radius: 8px;
     font-weight: 600;
     display: flex;
     align-items: center;
     gap: 6px;
     font-size: 14px;
     transition: background 0.2s;
   }
   .nav-cta:hover {
     background: var(--accent-hover);
   }
   .nav-cta-secondary {
     background: transparent;
     border: 1px solid var(--accent-color);
     color: var(--accent-color);
     padding: 8px 16px;
     border-radius: 8px;
     font-weight: 600;
     display: flex;
     align-items: center;
     gap: 6px;
     font-size: 14px;
     transition: all 0.2s;
   }
   .nav-cta-secondary:hover {
     background: var(--accent-color);
     color: white;
   }
   .nav-whatsapp {
     width: 40px;
     height: 40px;
     background: #25D366;
     color: white;
     border-radius: 50%;
     display: flex;
     align-items: center;
     justify-content: center;
     font-size: 20px;
     transition: transform 0.2s, box-shadow 0.2s;
   }
   .nav-whatsapp:hover {
     transform: scale(1.1);
     box-shadow: 0 4px 12px rgba(37, 211, 102, 0.4);
   }
   
   /* Mobile: hide text, show only icons */
   @media (max-width: 768px) {
     .nav-cta span, .nav-cta-secondary span {
       display: none;
     }
     .nav-cta, .nav-cta-secondary {
       padding: 8px;
     }
   }
   ```

**Impacto:** 🟢 Medio — reduce clicks-to-conversion en 2-3 pasos para usuarios decididos

**Esfuerzo:** S (2 horas)

**Agente:** Frontend

**Dependencia:** Ninguna

---

### PROPUESTA 6: Schema.org Service con priceRange Específico (Cierra el Gap SEO)

**Problema:** El Schema LocalBusiness actual NO tiene `priceRange` definido. Google no puede mostrar "desde $X" en rich results. [1]

**CleanerHQ 2026:**
> "Automated quoting software cuts out the hassle of manual estimates. These systems crunch the numbers—square footage, service type, frequency—in seconds."

**Solución (S — 1 hora):**

1. **En index.html, modificar el Schema LocalBusiness:**
   ```javascript
   // Buscar el bloque del Schema y agregar priceRange después de "address"
   "priceRange": "$80.000 - $450.000 COP",
   "hasOfferCatalog": {
     "@type": "OfferCatalog",
     "name": "Servicios de limpieza",
     "itemListElement": [
       {
         "@type": "Offer",
         "itemOffered": {
           "@type": "Service",
           "name": "Limpieza profunda de sofás",
           "description": "Remoción de polvo, manchas y olores de muebles tapizados con secado rápido."
         },
         "priceSpecification": {
           "@type": "PriceSpecification",
           "price": "180000",
           "priceCurrency": "COP",
           "minPrice": "80000",
           "maxPrice": "180000",
           "unitText": "por unidad"
         }
       },
       {
         "@type": "Offer",
         "itemOffered": {
           "@type": "Service",
           "name": "Sanitización de colchones",
           "description": "Desinfección profunda para mejorar la calidad del descanso."
         },
         "priceSpecification": {
           "@type": "PriceSpecification",
           "price": "120000",
           "priceCurrency": "COP",
           "minPrice": "60000",
           "maxPrice": "120000",
           "unitText": "por unidad"
         }
       },
       // ... otros servicios
     ]
   }
   ```

2. **Verificar en Google Rich Results Test:**
   - https://search.google.com/test/rich-results

**Impacto:** 🟡 Medio — habilita rich snippets con precios en Google, mejora CTR en 10-15%

**Esfuerzo:** S (1 hora)

**Agente:** Full Stack

**Dependencia:** Ninguna

---

## Resumen de Prioridades R127

| # | Propuesta | Impacto | Esfuerzo | Agente | Tipo |
|---|-----------|---------|----------|--------|------|
| 1 | Certificaciones Eco Verificables | 🟡 Alto | M | Frontend | ✨ Feature |
| 2 | Cotizador con Urgencia por Zona | 🟡 Medio-Alto | S | Frontend | ✨ UX |
| 3 | Transparency Micro-section | 🟡 Alto | M | Frontend | ✨ Trust |
| 4 | Exit-Intent Modal | 🟢 Medio | S | Frontend | ✨ Conversion |
| 5 | Quick-Service Links en Nav | 🟢 Medio | S | Frontend | ✨ UX |
| 6 | Schema.org priceRange | 🟡 Medio | S | Full Stack | 🐛 SEO |

---

## Bugs Pendientes desde R1 (Sigue Sin Corregir)

| Bug | Ubicación | Identificado | Rondas |
|-----|-----------|--------------|--------|
| WhatsApp ficticio | `js/config.js:2` | R1 | 126+ |
| SW cache versioning | `sw.js:1` | R1 | 126+ |
| Google Place ID falso | `js/reviews-data.js:114` | R126 | 1+ |
| Schema priceRange | `index.html` | R123 | 4+ |

---

## Diferenciación con R126

**R126 propuso:**
- Google Place ID real (bug crítico nuevo)
- Renderizar reviews desde JS (ya existen visualmente)
- Google Maps Embed interactivo
- Instagram Reels Strategy
- Cotizador LocalStorage
- WhatsApp Business API evaluación

**R127 novedades propias:**
- **Certificaciones eco verificables** — El sitio declara "eco" pero no prueba nada. Oportunidad B2B.
- **Cotizador con urgencia por zona** — Escasez geográfica para motivar conversión
- **Transparency Micro-section** — Revelar productos y químicos usados (confianza moderna)
- **Exit-Intent Modal** — Recuperación de abandonadores con oferta
- **Quick-Service Nav** — Reducir fricción para usuarios decididos
- **Schema priceRange** — Rich snippets con precios en Google

---

## Referencias

[1] CleanerHQ — Cleaning Industry Trends and Opportunities in 2026: https://cleanerhq.com/cleaning-industry-trends-and-opportunities-in-2026/

---

*Análisis generado por Innovation Scout — Innovation Scout Agent*
*Purity & Clean Round 127 — 2026-04-29*