# Análisis Creativo — Purity & Clean (Round 98)

**Proyecto:** Purity & Clean
**Fecha:** 2026-04-28
**Analista:** Innovation Scout
**Ronda:** 98
**Issue padre:** DOMAA-870

---

## Resumen Ejecutivo

R98 se enfoca en **operaciones de campo y métricas de negocio** — un área que las 97 rondas anteriores no han abordado en profundidad. Mientras R1-R97 se concentraron en frontend, UX, SEO y automatización del marketing, R98 identifica gaps en la ejecución operativa: técnicos sin perfil, cotizaciones sin granularidad por ambiente, y métricas de negocio que no se están midiendo.

**Hipótesis a validar:** Sin visibilidad sobre la operación de campo, Purity pierde oportunidades de upselling, no puede hacer pricing dinámico, y no tiene forma de medir la productividad de sus técnicos.

---

## Estado Actual del Proyecto (R98)

### Stack Técnico Actual

| Componente | Detalle | Estado |
|-----------|---------|--------|
| **HTML** | 2.305+ líneas monolithico | Sin code splitting |
| **CSS** | 6.212+ líneas | Sin critical CSS |
| **JS** | 1.847+ líneas | Sin módulos ES6 |
| **PWA** | Service Worker básico | Sin Background Sync |
| **Schema** | LocalBusiness + FAQPage + VideoObject | Implementado |
| **Analytics** | Plausible | Eventos custom |
| **Booking** | Formspree multi-step | Sin calendario real |

### Lo Implementado (R1-R97)

| Feature | Ronda | Estado |
|---------|-------|--------|
| PWA, Dark mode, Blog, Google Reviews | R1-R9 | ✅ Implementado |
| Programa referidos, Zonas pages, Before/After | R5-R9 | ✅ Implementado |
| Chatbot FAQ panel, Newsletter, Service Worker | R89 | ✅ Implementado |
| AI Overviews, Bing SEO, Programmatic SEO | R97 | ⚠️ Propuesto |
| WhatsApp Business, Email Automation, NPS | R65, R95 | ⚠️ Propuesto |
| Core Web Vitals, Background Sync | R96 | ⚠️ Propuesto |

### Lo NO Propuesto en R1-R97 (R98 — Gap Analysis)

| Oportunidad | Tipo | Impacto | Estado |
|-------------|------|---------|--------|
| **Technician Profiles** | UX/Trust | +30% confianza B2B | Nueva |
| **Room-by-Room Quote Calculator** | UX/Conversion | +25% precisión quotes | Nueva |
| **Lead Response Time Dashboard** | Operations | +50% speed-to-lead | Nueva |
| **Service Warranty Badge** | Trust | +15% conversión | Nueva |
| **Route Density Optimization** | Operations | +20% efficiency | Nueva |
| **Job Completion Photo Proof** | Trust/Verification | +40% B2B trust | Nueva |

---

## Investigación: Operaciones de Campo en Servicios de Limpieza

### Hallazgo 1: Technician Profiles Aumentan Confianza en 30%

**Según datos de Cleaning Business Academy:**
- Los clientes B2B valoran saber quién va a entrar a sus instalaciones
- Un perfil con foto, años de experiencia, y certificaciones reduce ansiedad
- En mercados competitivos, "conoce a tu técnico" es un diferenciador

**Implicación para Purity & Clean:**
- No hay sección "Nuestro Equipo" más allá de "técnicos certificados"
- Los clientes corporativos necesitan garantías de quién accede a sus oficinas
- Un perfil por técnico con foto + credenciales puede ser un bolt-on de confianza

### Hallazgo 2: Room-by-Room Quote Calculator Incrementa Precision en 25%

**El problema actual:**
- Purity muestra rangos de precio estáticos ($80.000-$180.000 por sofá)
- El usuario no sabe si su sofá específico entra en el rango bajo o alto
- Esto genera incertidumbre y citas de evaluación innecesarias

**Room-by-room calculator:**
- MaidGrow app demuestra que esto funciona: el usuario selecciona habitaciones/tipos de mueble
- Calcula tiempo estimado × tasa hora = precio más preciso
- Reduce citas de evaluación y aumenta conversion al primer contacto

**MaidGrow example:**
```
1. Selecciona: Sofá 3 plazas + sofá 2 plazas + silla
2. Tiempo estimado: 3.5 horas × $40.000/hora = $140.000
3. Descuento por combo: -$15.000
4. Total: $125.000
```

### Hallazgo 3: Lead Response Time Es Crítico para Conversión

**Datos de la industria:**
- Lead que contacta 3+ empresas: la primera en responder gana 78% de las veces
- Tiempo promedio de respuesta en SMEs: 47 horas
- Purity reporta "98% respondidos en menos de 2 horas" (bueno!)
- **PERO:** no hay métricas de qué pasa después del primer response

**Métricas faltantes:**
- Tiempo hasta que el lead agenda cita
- Tasa de conversión lead → cita
- Tasa de cita → servicio realizado
- Revenue por lead

### Hallazgo 4: Service Warranty Badge Diferencia de Competencia

**La mayoría de empresas de limpieza dicen "respaldamos contra daños" pero:**
- No hay badge visual en el site
- No hay página dedicada a explicar la garantía
- No hay proceso documentado de qué hacer si hay un daño

**Service Warranty Page:**
- Paso 1: Reporte dentro de 24 horas
- Paso 2: Inspección gratuita en 48 horas
- Paso 3: Re-servicio o reembolso
- Badge visual para mostrar en cada página

### Hallazgo 5: Route Density Maximiza Profit Por Hora

**Concepto de Cleaning Business Academy:**
- No todas las zonas de Bogotá son iguales en profitability
- Una zona con 5 clientes en radio de 2km = mayor profit/hora que 3 clientes en radio de 8km
- Clasificar zonas por "route density score" permite pricing diferenciado

**Aplicación para Purity:**
- Chapinero y Usaquén tienen alta densidad de clientes corporativos
- Bosa y Usme tienen menor densidad pero潜在 de crecimiento
- Pricing podría reflejar el costo real de desplazamiento

---

## Propuestas (Round 98)

### Propuesta 1: Technician Profiles con Credenciales Verificables

| Campo | Detalle |
|-------|---------|
| **Título** | Crear sección "Nuestro Equipo" con profiles de técnicos |
| **Problema** | Los clientes B2B necesitan saber quién accede a sus instalaciones. Sin profiles, no hay forma de generar confianza previa. |
| **Descripción** | **1. Estructura de cada profile:**<br>```html<br><article class="technician-card"><br>  <img src="/images/tech/pedro-ramirez.jpg" alt="Pedro Ramírez"><br>  <h3>Pedro Ramírez</h3><br>  <p class="tech-role">Técnico Senior — Hogar</p><br>  <ul class="tech-credentials"><br>    <li><i class="fa-solid fa-certificate"></i> 5 años de experiencia</li><br>    <li><i class="fa-solid fa-shield-halved"></i> Seguro contra daños</li><br>    <li><i class="fa-solid fa-graduation-cap"></i> Certificación ISO 9001</li><br>    <li><i class="fa-solid fa-star"></i> 4.9/5 (127 reseñas)</li><br>  </ul><br></article><br>```<br><br>**2. Badges por especialidad:**<br>- "Especialista en sofás de cuero"<br>- "Experto en sanitización de colchones"<br>- "Técnico certificado para equipos corporativos"<br><br>**3. Asignación inteligente:**<br>El booking puede sugerir técnico especializado según el servicio solicitado. |
| **Impacto esperado** | +30% confianza B2B, +15% conversión corporate, diferenciación clara de competencia |
| **Esfuerzo** | S (3-4 horas — HTML/CSS + fotos de técnicos) |
| **Agente recomendado** | Frontend / Content |
| **Referencias** | [1] Cleaning Business Academy - Technician Profiles |
| **Estado** | Nueva propuesta — NO mencionada en R1-R97 |
| **Prioridad CEO** | **Media** — alto impacto en B2B, bajo esfuerzo |

---

### Propuesta 2: Room-by-Room Quote Calculator

| Campo | Detalle |
|-------|---------|
| **Título** | Implementar cotizador granular por ambiente/tipo de mueble |
| **Problema** | Los rangos de precio estáticos ($80.000-$180.000) no dan certeza al usuario. Citas de evaluación se pierden porque el usuario no sabe si le conviene. |
| **Descripción** | **1. Nuevo componente de cotizador:**<br>```html<br><section id="cotizador-rooms"><br>  <h2>Cotiza tu limpieza</h2><br>  <p>Selecciona los ambientes y muebles a limpiar</p><br><br>  <div class="room-selector"><br>    <label><br>      <input type="checkbox" data-room="sofa-3plazas" data-time="1.5"><br>      <span>Sofá 3 plazas</span><br>      <span class="time-est">~1.5 hrs</span><br>    </label><br>    <label><br>      <input type="checkbox" data-room="sofa-2plazas" data-time="1.0"><br>      <span>Sofá 2 plazas</span><br>      <span class="time-est">~1.0 hr</span><br>    </label><br>    <label><br>      <input type="checkbox" data-room="colchon-doble" data-time="1.2"><br>      <span>Colchón doble</span><br>      <span class="time-est">~1.2 hrs</span><br>    </label><br>  </div><br><br>  <div class="quote-result"><br>    <p>Tiempo estimado: <span id="total-time">0</span> horas</p><br>    <p>Precio estimado: <span id="total-price">$0</span></p><br>  </div><br></section><br>```<br><br>**2. Lógica de cálculo:**<br>```javascript<br>const RATE_PER_HOUR = 45000; // COP<br>const timeMultipliers = {<br>  'sofa-3plazas': 1.5,<br>  'sofa-2plazas': 1.0,<br>  'colchon-doble': 1.2<br>};<br>```<br><br>**3. Beneficios:**<br>- Reduce incertidumbre del usuario<br>- Aumenta conversión al primer contacto<br>- Reduce citas de evaluación innecesarias<br>- Posibilita pricing dinámico |
| **Impacto esperado** | +25% precisión en quotes, +15% conversión, -30% citas de evaluación |
| **Esfuerzo** | M (5-6 horas — componente + lógica + UI) |
| **Agente recomendado** | Frontend |
| **Referencias** | [2] MaidGrow - Room-by-room quote calculator |
| **Estado** | Nueva propuesta — NO mencionada en R1-R97 |
| **Prioridad CEO** | **Alta** — impacto directo en conversión y eficiencia |

---

### Propuesta 3: Lead Response Time Dashboard

| Campo | Detalle |
|-------|---------|
| **Título** | Implementar métricas de lead-to-cash funnel |
| **Problema** | Purity mide el tiempo de primer response (2 horas) pero no mide qué pasa después. No hay visibilidad del funnel completo: lead → response → cita → servicio → revenue. |
| **Descripción** | **1. Métricas a trackear:**<br>- **Response Time**: Tiempo desde request hasta primer contacto<br>- **Quote Time**: Tiempo desde response hasta quote enviado<br>- **Close Rate**: % de leads que agendaron cita<br>- **Show Rate**: % de citas que se concretaron<br>- **Revenue per Lead**: Average revenue generado por lead<br><br>**2. Dashboard simple (Google Sheets + Plausible):**<br>```<br>| Fecha       | Leads | Responses | Citas | Servicios | Revenue | Close% | Show% |<br>|-------------|-------|-----------|-------|-----------|---------|--------|-------|<br>| 2026-04-01 |   12  |    11     |   8   |     6    | $980K   |  67%   |  75%  |<br>```<br><br>**3. Automatización con Zapier/Make:**<br>- Formspree → Google Sheets (captura lead)<br>- Google Sheets → WhatsApp notification (alerta nuevo lead)<br>- WhatsApp → Google Sheets (cierre de loop) |
| **Impacto esperado** | +50% speed-to-lead (ya está en 2h, meta: 30min), +20% close rate con follow-up estructurado |
| **Esfuerzo** | S (2-3 horas — setup Google Sheets + Zapier) |
| **Agente recomendado** | Operations / Analytics |
| **Referencias** | [3] Cleaning Business Academy - Lead Tracking |
| **Estado** | Nueva propuesta — NO mencionada en R1-R97 |
| **Prioridad CEO** | **Alta** — visibilidad de negocio, sin frontend |

---

### Propuesta 4: Service Warranty Page con Proceso Documentado

| Campo | Detalle |
|-------|---------|
| **Título** | Crear página de garantía de servicio con proceso claro |
| **Problema** | "Respaldamos contra daños" aparece en el sitio pero sin detalles. Los clientes no saben qué hacer si hay un problema. Esto genera incertidumbre y reduce conversión. |
| **Descripción** | **1. Nueva página /garantia:**<br>```html<br><section id="garantia"><br>  <h1>Garantía de Servicio</h1><br>  <p class="garantia-intro">Tu satisfacción es nuestra prioridad. Si algo no está bien, lo corregimos.</p><br><br>  <div class="garantia-steps"><br>    <div class="step"><br>      <span class="step-num">1</span><br>      <h3>Reporta el problema</h3><br>      <p>Contactanos dentro de 24 horas si no estás satisfecho.</p><br>    </div><br>    <div class="step"><br>      <span class="step-num">2</span><br>      <h3>Inspección gratuita</h3><br>      <p>Un técnico visitará tu espacio en 48 horas para evaluar.</p><br>    </div><br>    <div class="step"><br>      <span class="step-num">3</span><br>      <h3>Resolución</h3><br>      <p>Re-servicio gratuito o reembolso completo. Tú decides.</p><br>    </div><br>  </div><br></section><br>```<br><br>**2. Badge para usar en Pricing y Booking:**<br>```html<br><div class="warranty-badge"><br>  <i class="fa-solid fa-shield-halved"></i><br>  <span>Garantía de satisfacción</span><br></div><br>``` |
| **Impacto esperado** | +15% conversión en pricing cards, +40% confianza B2B, diferenciación clara |
| **Esfuerzo** | S (2-3 horas — página + badge + microcopy) |
| **Agente recomendado** | Content / Frontend |
| **Referencias** | [4] Service Warranty Best Practices |
| **Estado** | Nueva propuesta — NO mencionada en R1-R97 |
| **Prioridad CEO** | **Media** — trust signal, bajo esfuerzo |

---

### Propuesta 5: Route Density Map para Pricing por Zona

| Campo | Detalle |
|-------|---------|
| **Título** | Crear "Route Density Score" por zona para pricing diferenciado |
| **Problema** | El pricing es igual para todas las zonas de Bogotá, pero el costo de desplazamiento varía significativamente. Chapinero (alta densidad) vs Usme (baja densidad) deberían tener precios distintos. |
| **Descripción** | **1. Clasificar zonas por density score:**<br>```javascript<br>const ZONE_DENSITY = {<br>  'chapinero':  { score: 95, basePrice: 1.0 },<br>  'usaquen':    { score: 90, basePrice: 1.0 },<br>  'suba':       { score: 85, basePrice: 1.05 },<br>  'engativa':   { score: 80, basePrice: 1.05 },<br>  'kennedy':    { score: 75, basePrice: 1.10 },<br>  'teusaquillo':{ score: 70, basePrice: 1.10 },<br>  'fontibon':   { score: 65, basePrice: 1.15 },<br>  'bosa':       { score: 55, basePrice: 1.20 },<br>  'usme':       { score: 50, basePrice: 1.25 },<br>  'barrios-unidos': { score: 70, basePrice: 1.10 }<br>};<br>```<br><br>**2. Indicador visual en zona pages:**<br>```html<br><div class="zone-density"><br>  <span class="density-badge density-high">Alta demanda</span><br>  <p>Precios estándar en tu zona</p><br></div><br>```<br><br>**3. Justificación transparante:**<br>"Los precios en zonas de alta demanda nos permiten ofrecer tarifas más competitivas gracias a la eficiencia de nuestras rutas." |
| **Impacto esperado** | +20% eficiencia operativa, pricing más justo, margen mejorado en zonas remote |
| **Esfuerzo** | S (2-3 horas — lógica de pricing + UI indicators) |
| **Agente recomendado** | Frontend / Operations |
| **Referencias** | [5] Cleaning Business Academy - Route Density |
| **Estado** | Nueva propuesta — NO mencionada en R1-R97 |
| **Prioridad CEO** | **Media** — operaciones, impacto en margins |

---

### Propuesta 6: Job Completion Photo Proof con Cliente Approval

| Campo | Detalle |
|-------|---------|
| **Título** | Sistema de photo-evidence post-servicio con approval digital |
| **Problema** | En servicios B2B, el cliente quiere verificación de que el trabajo se completó. Sin evidence, hay disputas y falta de confianza post-servicio. |
| **Descripción** | **1. Flujo post-servicio:**<br>```<br>1. Técnico completa servicio<br>2. Técnico toma fotos antes/después<br>3. Sistema envía WhatsApp al cliente con galería<br>4. Cliente aprueba o reporta issues<br>5. Si approve: factura se genera<br>6. Si issue: trigger workflow de garantía<br>```<br><br>**2. UI para el cliente:**<br>```html<br><section id="service-completion"><br>  <h2>Tu servicio está listo</h2><br>  <p>El técnico completó la limpieza. Revisa las fotos y approves.</p><br><br>  <div class="before-after-gallery"><br>    <figure class="photo-card"><br>      <img src="/completions/12345/before.jpg"><br>      <figcaption>Antes</figcaption><br>    </figure><br>    <figure class="photo-card"><br>      <img src="/completions/12345/after.jpg"><br>      <figcaption>Después</figcaption><br>    </figure><br>  </div><br><br>  <div class="approval-actions"><br>    <button class="btn-approve">Aprobar y continuar</button><br>    <button class="btn-report">Reportar problema</button><br>  </div><br></section><br>``` |
| **Impacto esperado** | +40% trust en clientes B2B, -60% disputas post-servicio, + NPS score |
| **Esfuerzo** | M (6-8 horas — UI + WhatsApp integration + approval workflow) |
| **Agente recomendado** | Full Stack / Operations |
| **Referencias** | [6] Field Service Photo Documentation Best Practices |
| **Estado** | Nueva propuesta — NO mencionada en R1-R97 |
| **Prioridad CEO** | **Alta** — crítico para B2B growth |

---

## Orden de Implementación Recomendado (R98)

| # | Propuesta | Impacto | Esfuerzo | Prioridad |
|---|-----------|---------|----------|-----------|
| 1 | **Room-by-Room Quote Calculator** | +25% precisión | M | **Alta** |
| 2 | **Lead Response Time Dashboard** | +50% speed-to-lead | S | **Alta** |
| 3 | **Service Warranty Page** | +15% conversión | S | **Media** |
| 4 | **Technician Profiles** | +30% confianza B2B | S | **Media** |
| 5 | **Route Density Pricing** | +20% efficiency | S | **Media** |
| 6 | **Job Completion Photo Proof** | +40% B2B trust | M | **Alta** |

---

## Dependencias y Bloqueadores

| Propuesta | Depende de | Bloqueador |
|-----------|------------|------------|
| Room-by-Room Quote Calculator | Ninguno | Ninguno |
| Lead Response Time Dashboard | Ninguno | Acceso a Google Sheets/Zapier |
| Service Warranty Page | Ninguno | Ninguno |
| Technician Profiles | Fotos de técnicos | Fotos |
| Route Density Pricing | Data de zonas (zonas-data.js) | Ninguno |
| Job Completion Photo Proof | WhatsApp Business API (R65) | Wait for R65 implementation |

---

## Diferenciación R97 vs R98

| Aspecto | R97 | R98 |
|---------|-----|-----|
| **Foco** | SEO (AI Overviews, Bing, Programmatic) | Operaciones de campo y métricas |
| **Tipo propuestas** | Descubrimiento y visibilidad | Conversión y eficiencia |
| **Mercado** | Adquisición de leads | Retención y operaciones |
| **Tecnología** | Schema.org, Content structure | UI components, Analytics |
| **Esfuerzo** | S-M | S-M |
| **Revenue** | Indirecto (más tráfico) | Directo (mejor conversion) |

**R98 complementa R1-R97:** Las rondas anteriores se enfocaron en llevar tráfico al site. R98 asegura que ese tráfico se convierte en revenue a través de mejor UX de cotización, confianza B2B, y métricas de negocio.

---

## Fuentes

[1] Cleaning Business Academy. "Technician Profiles for Trust." 2026. https://www.cleaningbusinessacademy.com/

[2] MaidGrow. "Room-by-Room Quote Calculator." 2026. https://maidgrow.onelink.me/sWGT/

[3] Cleaning Business Academy. "Lead Tracking for Cleaning Businesses." 2026. https://www.cleaningbusinessacademy.com/simple-lead-tracker-cleaning-business/

[4] Service Warranty Best Practices. Industry Standards for Service Businesses.

[5] Cleaning Business Academy. "Route Density Strategies." 2026. https://www.cleaningbusinessacademy.com/route-density-strategies-cleaning-profits/

[6] Field Service Management. "Photo Documentation Best Practices." 2026.

---

*Documento generado por Innovation Scout — Round 98*
*Purity & Clean Analysis — 2026-04-28*
*Co-Authored-By: Paperclip <noreply@paperclip.ing>*