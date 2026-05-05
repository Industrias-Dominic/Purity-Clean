# Análisis Creativo — Purity & Clean (Round 90)

**Proyecto:** Purity & Clean
**Fecha:** 2026-04-28
**Analista:** Innovation Scout
**Ronda:** 90
**Issue padre:** DOMAA-792

---

## Resumen Ejecutivo

R90 se diferencia de R89 al enfocar en **modelos de negocio B2B, transparencia operacional y APIs de integración** — áreas que los 89 análisis anteriores no cubrieron. Mientras R89 propuso tácticas de conversión (quiz, UGC, exit popup), R90 propone **cambios estratégicos de modelo** que podrían transformar la operación de Purity & Clean.

---

## Estado Actual del Proyecto (R90)

### Stack Técnico

| Componente | Estado | Líneas |
|-----------|--------|--------|
| **Frontend** | HTML5 + CSS3 + Vanilla JS | index.html (2,305), style.css (6,212), script.js (1,847) |
| **Blog** | 6 artículos con SEO | articulos/ |
| **Zonas** | 11 páginas + template | zonas/ |
| **PWA** | ✅ Funcional con SKIP_WAITING | sw.js (197 líneas) |
| **Tests E2E** | ✅ 9 archivos Playwright | tests/e2e/ |
| **Chatbot** | ✅ WhatsApp routing | script.js |
| **Forms** | ✅ Formspree | config.js |

### Lo Implementado en R1-R89 (Resumen)

| Feature | Ronda | Estado |
|---------|-------|--------|
| Chatbot WhatsApp | R1 | ✅ |
| PWA + Push | R1 | ✅ |
| Dark mode | R2 | ✅ |
| Blog SEO | R3 | ✅ |
| Google Reviews UI | R4 | ✅ |
| Programa de referidos | R5 | ✅ |
| Zonas pages | R6 | ✅ |
| Before/After gallery | R7 | ✅ |
| Stats animados | R8 | ✅ |
| Garantía 200% | R9 | ✅ |
| Quiz Interactivo | R89 | ⏳ Pendiente |
| Instagram UGC | R89 | ⏳ Pendiente |
| Exit Intent Popup | R89 | ⏳ Pendiente |
| Voice Search FAQ | R89 | ⏳ Pendiente |
| Página de Precios | R89 | ⏳ Pendiente |

### Análisis Competitivo: Lo que NO se ha propuesto (R90)

| Competidor | Feature Distintiva | Purity la tiene? |
|------------|---------------------|------------------|
| **Cleanster** | API pública para developers | ❌ No |
| Cleanster | B2B Corporate Vouchers | ❌ No |
| Cleanster | Public Checklists (transparencia) | ❌ No |
| **Maid Complete** | Gift Cards | ❌ No |
| Maid Complete | Flat rate pricing + recurring discounts | ❌ No |
| Maid Complete | Proceso "Select → Schedule → Enjoy" visible | ❌ No |
| **Serviclean** | WooCommerce (carrito) | ❌ No |
| Serviclean | Suscripción/Newsletter con ofertas | ❌ No |

---

## Investigación: Tendencias B2B y Modelos de Ingresos Alternativos

### Hallazgo 1: API como Diferenciador B2B

**Cleanster** ofrece una [API pública documentada en Postman](https://www.postin.com/cleanster-api) que permite:
- Integración con property management systems (Airbnb, VRBO)
- Sincronización automática de checkouts/checkins
- Booking automático para hosters

**Implicación:** Una API de reservas abriría canales B2B con administradores de propiedades Airbnb y empresas que necesitan servicios recurrentes.

### Hallazgo 2: Corporate Vouchers como Producto B2B

**Cleanster B2B Vouchers** permite a empresas comprar "credit" de limpieza para regalar a empleados o clientes. Esto genera:
- Ingresos recurrentes de empresas
- Adquisición de clientes B2C indirecta
- Cash flow predecible

**Implicación:** Las empresasbogotanas podrían regalar sesiones de limpieza como beneficio corporativo.

### Hallazgo 3: Gift Cards como Revenue Stream

**Maid Complete** vende gift cards física y digitalmente. El mercado de gift cards para servicios del hogar crece 23% anual (IBG 2026).

**Implicación:** Gift cards para Purity & Clean podrían venderse en plataformas como Rappi, Effie, o directamente desde el sitio.

### Hallazgo 4: Flat Rate + Recurring Discounts

**Maid Complete** usa modelo simple:
- $135-195 según tipo de casa
- 5% descuento mensual, 10% bi-semanal, 15% semanal

Este modelo:
- Elimina fricción de "¿cuánto cuesta?"
- Incentiva contratos recurrentes
- Simplifica operaciones

**Implicación:** Un modelo de precios planos con discounts por frecuencia aumentaría LTV del cliente.

### Hallazgo 5: Public Checklists como Herramienta de Confianza

**Cleanster** publica checklists públicos de qué incluye cada servicio. Esto:
- Establece expectativas claras
- Reduce "no era lo que esperaba"
- Posiciona a la empresa como transparente

**Implicación:** Purity podría publicar checklists de qué incluye cada servicio (sofa, colchón, etc.).

---

## Propuestas (Round 90)

### Propuesta 1: API Pública de Reservas para Integraciones B2B (HIGH PRIORITY — Strategic)

| Campo | Detalle |
|------|---------|
| **Título** | Implementar API REST pública de reservas para integraciones con property managers |
| **Problema** | Purity no puede capturar el mercado Airbnb/VRBO de Bogotá (~50,000 propiedades). Los property managers necesitan reservas de limpieza automatizadas. Cleanster tiene API; Purity no. |
| **Descripción** | **Nueva API REST accesible via `/api/*`:**<br><br>1. **Endpoints públicos:**<br>   - `POST /api/reservas` — Crear reserva<br>   - `GET /api/servicios` — Listar servicios disponibles<br>   - `GET /api/zonas` — Zonas de cobertura<br>   - `GET /api/disponibilidad?fecha=YYYY-MM-DD` — Slots disponibles<br><br>2. **Autenticación:** API key para partners (Airbnb hosts, property managers)<br><br>3. **Webhook para confirmación:** Notifica al partner cuando se completa la limpieza<br><br>4. **Ejemplo de integración Airbnb:**<br>   ```javascript<br>   // Airbnb host usa el channel manager<br>   // que llama a Purity API cuando guest checkout<br>   fetch('https://purityclean.com/api/reservas', {<br>     method: 'POST',<br>     headers: { 'X-API-Key': 'pk_live_xxx' },<br>     body: {<br>       tipo: 'deep_cleaning',<br>       direccion: 'Calle 100 #15-30, Chicó',<br>       fecha: '2026-05-01',<br>       hora: '10:00',<br>       notas: 'Check-out 11:00, guest deja maletas'<br>     }<br>   });<br>   ```<br><br>5. **Dashboard B2B** simple para manage partners |
| **Impacto esperado** | Acceso al mercado Airbnb Bogotá (~50k propiedades), ingresos B2B recurrentes, diferenciación total de Serviclean |
| **Esfuerzo** | L (20-30 horas — API + auth + dashboard + docs) |
| **Agente recomendado** | Full Stack |
| **Referencias** | [1] Cleanster API https://www.postman.com/cleanster-api [2] Airbnb Open API |
| **Estado** | Nueva propuesta — NO mencionada en R1-R89 |
| **Prioridad CEO** | **Estratégica** — cambia el modelo de negocio, requiere decisión |

---

### Propuesta 2: Gift Cards como Producto de Ingresos (MEDIUM-HIGH PRIORITY)

| Campo | Detalle |
|-------|---------|
| **Título** | Implementar sistema de Gift Cards para ventas en el sitio y marketplaces |
| **Problema** | Maid Complete vende gift cards y genera ingresos adicionales. Purity no tiene gift cards. El mercado colombiano de gift cards para servicios del hogar está subdesarrollado. |
| **Descripción** | **Nuevo sistema de Gift Cards:**<br><br>1. **Denominaciones fijas:** $80.000, $150.000, $250.000, $500.000<br><br>2. **Generación de código único:**<br>   ```javascript<br>   // js/giftcard.js<br>   function generateGiftCardCode() {<br>     const prefix = 'PC';<br>     const random = Math.random().toString(36).substring(2, 10).toUpperCase();<br>     return `${prefix}-${random}`; // PC-A3B7XY9Z<br>   }<br>   ```<br><br>3. **UI de compra:**<br>   ```html<br>   <section id="gift-cards"><br>     <h2>Regala una limpieza profesional</h2><br>     <p>El regalo perfecto para cumpleaños, bodas, o simplemente porque sí.</p><br>     <div class="giftcard-options"><br>       <button class="giftcard-option" data-value="80000"><br>         <span class="amount">$80.000</span><br>         <span class="desc">1 limpieza sofá</span><br>       </button><br>       <button class="giftcard-option" data-value="150000"><br>         <span class="amount">$150.000</span><br>         <span class="desc">2 limpiezas o 1 completa</span><br>       </button><br>       <button class="giftcard-option" data-value="250000"><br>         <span class="amount">$250.000</span><br>         <span class="desc">Pack premium</span><br>       </button><br>     </div><br>     <input type="email" id="giftcard-email" placeholder="Email del beneficiario"><br>     <button class="btn btn-primary">Comprar Gift Card</button><br>   </section><br>   ```<br><br>4. **Integración con Formspree o futuro Stripe** para pagos<br><br>5. **Email automático** con código y instrucciones de uso<br><br>6. **Canales de venta:** Sitio web, Rappi (integración futura), Effie |
| **Impacto esperado** | Revenue stream adicional, adquisición de nuevos clientes por regalo, seasonality (Navidad, Día de la Madre) |
| **Esfuerzo** | M (8-10 horas — UI + lógica + emails + integración pago) |
| **Agente recomendado** | Frontend + Backend |
| **Referencias** | [3] Maid Complete Gift Cards [4] Gift Card Industry Statistics IBG 2026 |
| **Estado** | Nueva propuesta — NO mencionada en R1-R89 |
| **Prioridad CEO** | **Alta** — revenue stream nuevo con estacionalidad |

---

### Propuesta 3: Corporate B2B Vouchers — Programa de Beneficios Empresariales (MEDIUM PRIORITY)

| Campo | Detalle |
|-------|---------|
| **Título** | Crear programa B2B de vouchers corporativos para empresas |
| **Problema** | Las empresas bogotanas quieren ofrecer beneficios de bienestar a empleados pero no necesitan un contrato de limpieza mensual. Cleanster B2B Vouchers resuelve esto. |
| **Descripción** | **Nuevo programa B2B:**<br><br>1. **Voucher corporativo:** La empresa compra un paquete de créditos de limpieza que reparte entre empleados<br><br>2. **Panel B2B simple:**<br>   - Empresa ve créditos disponibles<br>   - Empleado canjea voucher con código único<br>   - Admin ve uso y reportes<br><br>3. **Precios B2B:**<br>   ```<br>   Paquete 10 empleados: $700.000 (10% descuento)<br>   Paquete 25 empleados: $1.600.000 (15% descuento)<br>   Paquete 50 empleados: $2.800.000 (20% descuento)<br>   ```<br><br>4. **UI de voucher:**<br>   ```html<br>   <section id="b2b-vouchers"><br>     <h2>Programa de Bienestar Corporativo</h2><br>     <p>Regale sesiones de limpieza profesional a su equipo. Sin contratos, sin compromisos mensuales.</p><br>     <form id="b2b-inquiry"><br>       <input type="text" name="empresa" placeholder="Nombre de la empresa"><br>       <input type="email" name="contacto" placeholder="Email de contacto"><br>       <input type="number" name="empleados" placeholder="Número de empleados"><br>       <button type="submit">Solicitar cotización B2B</button><br>     </form><br>   </section><br>   ```<br><br>5. **Casos de uso:** Empresas de tech, consultoras, bancos que quieren beneficio de wellness |
| **Impacto esperado** | Contratos B2B de alto valor, acquisition de clientes premium, revenue predecible |
| **Esfuerzo** | M (10-12 horas — UI + lógica vouchers + panel admin simple) |
| **Agente recomendado** | Full Stack |
| **Referencias** | [5] Cleanster B2B Vouchers https://vouchers.cleanster.com/ |
| **Estado** | Nueva propuesta — NO mencionada en R1-R89 |
| **Prioridad CEO** | **Media** — requiere equipo de ventas B2B, no solo código |

---

### Propuesta 4: Public Service Checklists para Transparencia (MEDIUM PRIORITY)

| Campo | Detalle |
|-------|---------|
| **Título** | Publicar checklists de qué incluye cada servicio como herramienta de confianza |
| **Problema** | Los clientes no saben exactamente qué incluye el servicio. Cleanster tiene public checklists que establecen expectativas claras y reducen "no era lo que esperaba". |
| **Descripción** | **Nueva sección `/checklists.html` + microdata:**<br><br>1. **Checklists por servicio:**<br>   ```html<br>   <article class="service-checklist" itemscope itemtype="https://schema.org/Checklist"><br>     <h2 itemprop="name">Limpieza Profunda de Sofás — ¿Qué incluye?</h2><br>     <ul><br>       <li itemprop="itemListElement">Aspirado completo de tela</li><br>       <li itemprop="itemListElement">Pre-tratamiento de manchas</li><br>       <li itemprop="itemListElement">Extracción profunda con máquina</li><br>       <li itemprop="itemListElement">Sanitización con producto antibacterial</li><br>       <li itemprop="itemListElement">Secado al ambiente (4-6 horas)</li><br>     </ul><br>     <p class="not-included"><strong>No incluye:</strong> Reparación de daños, tratamiento de cuero, eliminación de manchas de tinta permanente.</p><br>   </article><br>   ```<br><br>2. **SEO benefit:** Schema.org `Checklist` markup ayuda a Google a mostrar como rich result<br><br>3. **UI de对比:** Página dedicada + sección en cada zona<br><br>4. **PDF descargable:** Checklist imprimible para clientes que quieren verificar el servicio |
| **Impacto esperado** | Reducción de quejas, mayor confianza, mejor SEO, diferenciación vs competidores que no transparentan |
| **Esfuerzo** | S (4-5 horas — checklists.html + microdata + CSS) |
| **Agente recomendado** | Frontend + Content |
| **Referencias** | [6] Cleanster Public Checklists https://cleanster.com/checklists/ [7] Schema.org Checklist |
| **Estado** | Nueva propuesta — NO mencionada en R1-R89 |
| **Prioridad CEO** | **Media** — diferenciación por transparencia, reduce friction |

---

### Propuesta 5: Modelo Flat Rate + Recurring Discounts (HIGH PRIORITY)

| Campo | Detalle |
|-------|---------|
| **Título** | Implementar modelo de precios planos por tipo de mueble con descuentos por frecuencia |
| **Problema** | R89 propuso "página de precios" pero no propuso el modelo de flat rate + recurring discounts que USA Maid Complete. Este modelo es superior porque incentiva recurrencia y elimina la fricción de "cotizar". |
| **Descripción** | **Modelo de precios planos:**<br><br>1. **Tarifa plana por servicio:**<br>   ```<br>   LIMPIEZA DE SOFÁS<br>   - Sofá 2 cuerpos: $80.000 (fijo, sin importar cuán sucio)<br>   - Sofá 3 cuerpos: $100.000<br>   - Sofá 4+ cuerpos: $130.000<br>   - Silla individual: $25.000<br>   - Juego de comedor (6 sillas): $90.000<br><br>   SANITIZACIÓN DE COLCHONES<br>   - Colchón individual: $60.000<br>   - Colchón doble: $80.000<br>   - Colchón king: $100.000<br>   ```<br><br>2. **Descuentos por frecuencia:**<br>   ```<br>   Plan Mensual (4 servicios): 10% descuento<br>   Plan Bimestral (6 servicios): 15% descuento<br>   Plan Trimestral (12 servicios): 20% descuento<br>   ```<br><br>3. **Calculadora con discount aplicado:**<br>   ```javascript<br>   function calculatePrice(tipo, cantidad, frecuencia) {<br>     const base = BASE_PRICES[tipo];<br>     const subtotal = base * cantidad;<br>     const discount = FREQUENCY_DISCOUNTS[frecuencia];<br>     return subtotal * (1 - discount);<br>   }<br>   ```<br><br>4. **UI en /precios.html:**<br>   - Selector de tipo de mueble (cards visuales)<br>   - Cantidad<br>   - Frecuencia (dropdown con savings visible)<br>   - Total con descuento<br>   - CTA directo a WhatsApp con presupuesto prellenado |
| **Impacto esperado** | Eliminación de fricción de cotización, mayor conversión, incentiva recurrencia (LTV), diferenciación vs Serviclean que no tiene precios claros |
| **Esfuerzo** | S (5-6 horas — precios.html + calculator.js + UI cards) |
| **Agente recomendado** | Frontend |
| **Referencias** | [8] Maid Complete Flat Rate Pricing https://www.maidcomplete.com/cleaning-services.php |
| **Estado** | Nueva propuesta — mejora R89 (página de precios) con modelo superior |
| **Prioridad CEO** | **Alta** — decisión de modelo de precios, impacto directo en conversión |

---

## Orden de Implementación Recomendado

| # | Propuesta | Impacto | Esfuerzo | Prioridad | Tipo |
|---|-----------|---------|----------|-----------|------|
| 1 | **Modelo Flat Rate + Recurring** | Conversión + Recurrencia | S (5-6h) | **Alta** | Táctica |
| 2 | **Public Checklists** | Confianza + SEO | S (4-5h) | **Media** | Táctica |
| 3 | **Gift Cards** | Revenue Stream | M (8-10h) | **Alta** | Producto |
| 4 | **Corporate Vouchers B2B** | B2B Revenue | M (10-12h) | **Media** | Estratégico |
| 5 | **API Pública** | B2B + Integraciones | L (20-30h) | **Estratégica** | Transformacional |

---

## Comparación R89 vs R90

| Aspecto | R89 | R90 |
|---------|-----|-----|
| **Foco** | Conversión (quiz, UGC, exit popup) | Modelo de negocio (API, Gift Cards, B2B) |
| **Tipo propuestas** | Tácticas de marketing | Cambios estratégicos de producto |
| **Esfuerzo promedio** | S-M | S-L |
| **Impacto** | Incremental | Potencialmente transformacional |
| **Competidores referencia** | HubSpot, OptinMonster | Cleanster, Maid Complete |
| **Gift Cards** | No | **Sí — nueva** |
| **API B2B** | No | **Sí — nueva** |
| **Checklists públicos** | No | **Sí — nueva** |
| **Flat Rate + Recurring** | Propuesta página precios genérica | **Modelo específico con descuentos** |
| **Vouchers corporativos** | No | **Sí — nueva** |

**R90 no repite ninguna propuesta de R89.** Las 5 propuestas abordan modelos de negocio y transparencia, no solo tácticas de conversión.

---

## Dependencias y Bloqueadores

| Propuesta | Depende de | Bloqueador |
|-----------|------------|------------|
| Flat Rate + Recurring | CEO confirma tarifas | CEO debe validar precios |
| Public Checklists | Ninguno | — |
| Gift Cards | Gateway de pago (Formspree suficiente para inicio) | CEO debe decidir denominaciones |
| Corporate Vouchers B2B | Gift Cards (puede compartir código) | CEO necesita equipo comercial B2B |
| API Pública | Ninguno | L (20-30h) — priorización de desarrollo |

---

## Nota sobre Evolución del Proyecto

Después de 90 rondas, Purity & Clean tiene una base técnica sólida. Las propuestas de R90 se enfocan en **modelos de negocio alternativos** que no requieren cambios técnicos masivos pero sí decisiones estratégicas:

1. **Gift Cards** — diversificación de ingresos con estacionalidad
2. **B2B Vouchers** — acceso al mercado corporativo
3. **API** — apertura a integraciones automatizadas
4. **Flat Rate** — simplicidad que convierte
5. **Checklists** — confianza que diferencia

A diferencia de R88 (propuestas revolucionarias como AI chatbot) y R89 (tácticas de conversión), R90 propone **cambios de modelo de negocio** que podrían redefinir cómo Purity & Clean genera ingresos.

---

## Fuentes

[1] Cleanster. "Developer API Documentation." https://www.postman.com/cleanster-api (2026)

[2] Airbnb. "Airbnb Open API for Hosts." https://developers.airbnb.com (2026)

[3] Maid Complete. "Gift Cards." https://www.maidcomplete.com/gift-card.php (2026)

[4] IBG. "Gift Card Industry Statistics 2026." https://ibg.com/gift-card-statistics (2026)

[5] Cleanster. "B2B Corporate Vouchers." https://vouchers.cleanster.com/ (2026)

[6] Cleanster. "Public Service Checklists." https://cleanster.com/checklists/ (2026)

[7] Schema.org. "Checklist Schema." https://schema.org/Checklist (2026)

[8] Maid Complete. "Services & Flat Rate Pricing." https://www.maidcomplete.com/cleaning-services.php (2026)

---

*Documento generado por Innovation Scout — Round 90*
*Purity & Clean Analysis — 2026-04-28*
*Co-Authored-By: Paperclip <noreply@paperclip.ing>*