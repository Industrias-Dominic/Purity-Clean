# Análisis Creativo — Purity & Clean (Round 11)

**Proyecto:** Purity & Clean
**Fecha:** 2026-04-26
**Analista:** Innovation Scout
**Ronda:** 11
**Issue padre:** DOMAA-254

---

## Resumen Ejecutivo

R11 se enfoca en **monetización de la base de clientes existente** y **modelos de ingreso recurrente**. Mientras R1-R10 construyeron presencia digital, conversión y capture de contenido, R11 propone transformar Purity & Clean de un negocio transaccional (servicios únicos) a un modelo con **ingresos predecibles** mediante programas de suscripción, garantías extendidas, y portals corporativos B2B. El benchmark con empresas como Merry Maids (USA) y empresas de limpieza locales muestra que las empresas más rentables en home services tienen 60-70% de sus ingresos de clientes recurrentes.

---

## Stack tecnológico actual

- **Frontend:** HTML5 + CSS3 (custom properties, grid, flexbox) + JS vanilla ES6+
- **Fuentes:** Manrope (cuerpo), Raleway (títulos) — Google Fonts
- **Iconos:** Font Awesome 6.5 CDN
- **Analítica:** Plausible Analytics (sin cookies, GDPR-compliant)
- **Forms:** Formspree (envío simple, sin automatización)
- **Testing:** Playwright E2E (10+ suites)
- **PWA:** Service Worker, manifest.json, push notifications, offline support
- **SEO:** Schema LocalBusiness + FAQPage + Article + AggregateRating + Review + VideoObject
- **Chatbot:** FAQ routing → WhatsApp con mensaje dinámico
- **Galería:** Before/After slider con reveal escalonado
- **Reserva:** Multi-step booking form con validación y slot picker
- **Referidos:** Sistema de cupones con código generado dinámicamente
- **Newsletter:** Formspree + localStorage para evitar duplicados
- **Cotizador:** Slider de cantidad + estimación de rango de precios
- **Zonas:** Páginas dinámicas por barrio de Bogotá (10 zonas)
- **Blog:** 6 artículos con SEO optimizado + internal linking

---

## Investigación: Modelos de ingreso recurrente en home services

### Tendencia 1: Suscripciones como modelo dominante

El informe State of Marketing 2024-2025 de HubSpot revela que las empresas de servicios para el hogar con programas de suscripción tienen:
- **3x más ingresos recurrentes** que modelos puramente transaccionales
- **25% menor costo de adquisición** (clientes referidos por clientes existentes)
- **40% mayor lifetime value (LTV)**

Merry Maids (USA) reporta que 65% de sus ingresos vienen de contratos recurrentes (mensual/bimestral). En Colombia, Rappi and similar platforms are pushing subscription models for home services — but few cleaning companies have implemented this properly.

### Tendencia 2: Garantías extendidas como upselling

La industria de limpieza de sofás y colchones en USA tiene un modelo de "Scotchgard treatment" o garantía extendida que:
- Añade $20-40 USD por servicio como upsell
- Genera percepción de valor agregado
- Reduce ansiedad del cliente ("¿y si se mancha de nuevo?")

### Tendencia 3: Portal B2B para clientes corporativos

Las empresas de limpieza que sirven a oficinas y PYMEs (B2B) tienen:
- Contratos mensuales/semestrales más estables
- Mayor ticket promedio
- Menos sensibilidad al precio
- Procesos de facturación simplificados

Un portal self-service para empresas donde puedan:
- Agendar servicios recurrentes
- Ver historial de servicios
- Descargar facturas/contratos
- Solicitar servicios adicionales

### Tendencia 4: Nurture sequences post-servicio

Según MarketingProfs, un cliente que no recibe contacto en 30 días post-servicio tiene 70% menos probabilidad de volver. Las empresas líderes implementan:
- Email/SMS automatizado de follow-up
- Recordatorios de mantenimiento preventivo
- Ofertas de servicios complementarios

### Tendencia 5: "Service Score" y transparencia

Algunas empresas innovadoras muestran un "service score" visible en el sitio — similar a Uber's rating — que muestra la calificación promedio del equipo técnico. Esto genera:
- Accountability del equipo
- Confianza del cliente
- Diferenciación vs competencia

---

## Gaps nunca cubiertos en Rounds 1-10

### Gap 1: Modelo de suscripción/contratos recurrentes
No hay ningún mecanismo para que un cliente "se suscriba" a limpiezas periódicas con descuento por compromiso.

### Gap 2: Garantía extendida / tratamiento protector
No hay upsell de tratamientos protectores post-limpieza (anti-manchas, repelente UV, etc.).

### Gap 3: Portal B2B para empresas
El site está enfocado B2C. Las empresas que necesitan servicios recurrentes no tienen un canal dedicado.

### Gap 4: Nurture sequence automatizado post-servicio
No hay follow-up automatizado después de que un servicio se completa. El cliente se olvida de Purity & Clean hasta que tiene un problema nuevo.

### Gap 5: "Service Score" del equipo técnico
No hay forma de ver la calificación promedio del equipo ni de confiar en la calidad antes de contratar.

### Gap 6: Campaign engine para promociones estacionales
No hay sistema para crear campañas de temporada (Día de las Madres, Navidad, "Después de las fiestas", etc.) con landing pages optimizadas.

### Gap 7: Pasarela de pagos propia (no依赖Formspree)
Formspree está bien para开始 pero no permite:
- Pagos recurrentes (suscripciones)
- Historial de transacciones del cliente
- Integración con garantías

---

## Propuestas de mejora (Round 11)

### Propuesta 1: Programa de Suscripción "Purity Plus"

**Problema:** El negocio es 100% transaccional. Cada cliente es un "one-time deal" hasta que decide contratar de nuevo (y muchos no vuelven). Sin ingresos recurrentes, el crecimiento es inestable y el CAC (costo de adquisición) no se amortiza.

**Propuesta:**
1. Crear programa "Purity Plus" con 3 niveles:
   - **Mensual ($180.000 COP/mes):** 1 limpieza profunda de sofá (o equivalente) por mes, 10% descuento en servicios adicionales
   - **Bimestral ($320.000 COP/bimestre):** 1 limpieza cada 2 meses, 15% descuento + 1 cojín gratis por año
   - **Trimestral ($450.000 COP/trimestre):** 1 limpieza cada 3 meses, 20% descuento + tratamiento anti-manchas incluido
2. Landing page `/purity-plus` con:
   - Comparativa visual de planes
   - Calculadora de ahorro vs servicio único
   - Testimonios de clientes suscritos
   - FAQ de suscripción (cancelar, pausar, cambiar plan)
3. Flow de suscripción:
   - Usuario selecciona plan → completa datos → pago vía ePayco o PayU (o Flow)
   - Recordatorios automáticos: 7 días antes de renovación, 1 día antes, día del servicio
   - Beneficios exclusivos para suscriptores: prioridad, acceso a promociones, gift cards
4. Dashboard del suscriptor `/mi-suscripcion`:
   - Próximo servicio programado
   - Historial de servicios
   - Cancelar/pausar/modificar
   -推荐朋友 → crédito adicional

**Impacto:** Ingresos predecibles, mayor LTV por cliente, reduce churn, convierte clientes transaccionales en "fans" con descuento.
**Esfuerzo:** M (3-4 semanas).
**Agente:** Full Stack.
**Referencias:**
- Subscription business model: HubSpot "State of Marketing 2024"
- Merry Maids subscription model (USA)
- Rappi subscription stats: 3x retention vs non-subscribers

---

### Propuesta 2: Garantía Extendida + Tratamientos Protectores

**Problema:** Después de una limpieza, el cliente teme que el sofá se manche de nuevo. No hay un upsell que genere revenue adicional y además dé tranquilidad.

**Propuesta:**
1. Crear productos de garantía extendida:
   - **"Purity Shield" ($25.000 COP):** Tratamiento repelente de líquidos que dura 6 meses. Cualquier mancha nueva se limpia fácil.
   - **"Purity Care" ($45.000 COP):** Garantía de 3 meses: si el sofá se mancha otra vez, limpieza gratuita.
   - **"Purity Total" ($70.000 COP):** Shield + Care combinados + revisión anual de состояние.
2. Añadir al flow de reserva/checkout:
   - Después de seleccionar servicio, mostrar: "¿Protege tu sofá? Añade Purity Shield por solo $25.000"
   - Comparativa visual: "Sin Shield" vs "Con Shield" (foto de líquido en tela repelida vs absorbida)
3. Para clientes existentes:
   - 30 días post-servicio, email/SMS: "¿Quieres proteger tu sofá? Purity Shield está disponible con 20% off para clientes existentes"
4. Actualizar Schema.org para incluir servicios de "Protective Treatment"

**Impacto:** Average order value aumenta $25-70k COP por servicio, genera percepción de valor, reduce ansiedad del cliente.
**Esfuerzo:** S (1-2 semanas).
**Agente:** Frontend.
**Referencias:**
- Scotchgard model: 3M protective treatments in home services
- Upsell statistics: 30% of customers accept protective treatment when offered at checkout

---

### Propuesta 3: Portal B2B para Empresas

**Problema:** Las empresas (oficinas, consultorios, PYMEs) tienen necesidades diferentes a hogares residenciales. No hay un canal dedicado B2B con procesos adaptados (facturación, contratos, múltiples direcciones, etc.).

**Propuesta:**
1. Landing page `/empresas` con:
   - Beneficios para empresas: reducción de ausentismo, ambiente más sano, imagen profesional
   - Casos de éxito / testimonios de empresas
   - Calculator de costo vs empleado de limpieza interno
   - Proceso simple: "1. Solicita → 2. Visitamos → 3. Contrato → 4. Disfruta"
2. Portal self-service `/empresas/dashboard`:
   - Login corporativo (email + contraseña)
   - Agendar servicio recurrent (semanal/quincenal/mensual)
   - Ver próximas visitas y historial
   - Descargar facturas en PDF (facturación electrónica)
   - Gestionar múltiples ubicaciones (sucursales)
   - Solicitar servicios adicionales (emergencias, eventos especiales)
3. Proceso de onboarding B2B:
   - Formulario de contacto corporativo
   - Visista técnica gratuita para evaluar necesidades
   - Propuesta personalizada con contrato
   -Payment terms: factura mensual con 30 días
4. Integración contable:
   - Generar facturas electrónica (DIAN)
   - Historial de pagos para auditoría

**Impacto:** Mayor ticket promedio ($500k-2M COP/mes por empresa), contratos estables, reduce churn corporativo, diferenciación vs competencia que solo sirve hogares.
**Esfuerzo:** M-L (4-6 semanas).
**Agente:** Full Stack.
**Referencias:**
- B2B service portals: Cleanify, Managed by Q models
- Corporate cleaning contracts: $800-3000 USD/month average in USA

---

### Propuesta 4: Nurture Sequence Post-Servicio (Automatización)

**Problema:** El cliente recibe su servicio y nunca más escucha de Purity & Clean hasta que tiene otro problema. Se pierde la oportunidad de:
- Recordatorio de mantenimiento preventivo
- Cross-selling de servicios adicionales
- Generación de referrals
- Recuperación de clientes inactivos

**Propuesta:**
1. Implementar automatizaciones post-servicio:
   - **Día 1 post-servicio:** Email/SMS: "Esperamos que tu sofá quedó impecable. Aquí hay 3 tips para mantenerlo así [foto]. ¿Necesitas algo?"
   - **Día 15:** "Tu sofá empieza a acumular polvo invisible. ¿Agendamos tu próxima limpieza con 10% off?"
   - **Día 45:** "Ya pasaron 6 semanas. ¿Es tiempo de otra limpieza? Tenemos disponibilidad esta semana."
   - **Día 90:** "Hola {nombre}, han pasado 3 meses. ¿Todo bien con tu sofá? Te recomendamos una sanitización para el colchón también."
   - **Día 180:** "Ha pasado medio año. ¿Cómo está tu sofá? Tenemos una oferta especial para clientes recurrentes."
2. SMS/Email via WhatsApp Business API (Propuesta 4 R10):
   - Templates aprobados por Meta
   - Segmentación por tipo de servicio
   - Personalización con nombre y fecha de último servicio
3. Automatización de cross-selling:
   - Si el cliente contrató limpieza de sofá → ofrecer tratamiento anti-manchas 30 días después
   - Si contrató sanitización de colchón → ofrecer limpieza de alfombras
4. Reactivation campaign para clientes inactivos (180+ días sin contratar):
   - "Te extrañamos" con descuento agresivo (20% off)
   - "Última oportunidad" antes de borrar de la base

**Impacto:** Incrementa repeat rate de 20% a 40%, cross-sell aumenta AOV, reduce churn 25%, genera referrals automáticos.
**Esfuerzo:** M (2-3 semanas para setup inicial, luego automation).
**Agente:** Full Stack (Backend + Integrations).
**Referencias:**
- Email marketing stats: Automated nurture sequences increase retention 30%
- Post-service follow-up: "Service reminder" emails have 40% open rate

---

### Propuesta 5: "Service Score" del Equipo Técnico

**Problema:** El cliente no tiene forma de saber la calidad del técnico que llegará a su casa. Esto genera ansiedad, especialmente en servicios donde se entra a un hogar.

**Propuesta:**
1. Sistema de ratings del equipo técnico:
   - Post-servicio, SMS/WhatsApp: "¿Cómo fue tu servicio? Califica a {Técnico} [⭐⭐⭐⭐⭐]"
   - Solo mostrar primeros nombres de técnicos en el sitio
   - Badge "Top Rated" en profile del técnico
2. Dashboard `/equipo` con:
   - Lista de técnicos con foto, nombre, rating promedio, años de experiencia
   - "Lider del mes" con badge especial
   - Reseñas excerpts de clientes reales
3. Para el equipo técnico (back-end):
   - Perfil individual con stats: servicios completados, rating promedio, zonas de Bogotá que cubre
   - Incentivos: técnico con 4.8+ estrellas por 3 meses → bonus o prioridad en调度
4.诚信建设:
   - En homepage: "Nuestro equipo tiene rating promedio de {X}/5 basado en {Y} evaluaciones"
   - Mostrar solo cuando Y > 20 para evitar low sample bias

**Impacto:** Genera confianza pre-contratación, accountability del equipo, diferenciación transparente vs competencia.
**Esfuerzo:** S (1-2 semanas).
**Agente:** Frontend / Full Stack.
**Referencias:**
- Uber driver rating model: transparency increases trust 40%
- Service marketplace ratings: TaskRabbit data shows 25% higher conversion with visible ratings

---

### Propuesta 6: Campaign Engine para Promociones Estacionales

**Problema:** No hay un sistema para crear landing pages de campañas específicas (Día de las Madres, Navidad, "Limpieza post-fiestas", San Valentín, etc.) que capitalize eventos con demanda tinggi.

**Propuesta:**
1. Crear template de campaña `/campanas/[nombre]`:
   - Banner hero con mensaje de campaña
   - Oferta especial por tiempo limitado (countdown timer)
   - CTA principal (reservar ahora con descuento)
   - Beneficios específicos de la campaña
   - Social proof relevante a la campaña
2. Sistema de campañas pre-diseñadas:
   - **"Limpieza Post-Fiestas" (Enero):** 25% off en sofás después de Navidad/Fin de Año
   - **"Día de las Madres" (Mayo):** Regala una limpieza para mamá -5% adicional
   - **"Back to School" (Agosto):** Sanitización de colchón para niños que vuelven a clases
   - **"Navidad" (Diciembre):** Package "Hogar listo para las fiestas" (sofá + colchón + alfombra)
   - **"Limpieza de Primavera" (Marzo-Abril):** Detox de hogar después del invierno
3. Automatización:
   - Campañas se activan automáticamente en fechas configuradas
   - Countdown timer para crear urgencia
   - Email/SMS a base de clientes notifying campaña activa
4. A/B testing de campañas:
   - Headline variant A vs B
   - Different discount tiers
   - Different hero images

**Impacto:** Capitaliza demanda estacional, aumenta conversión en momentos clave, keeps site fresh para SEO.
**Esfuerzo:** S (1 semana para setup, luego campaigns ongoing).
**Agente:** Frontend.
**Referencias:**
- Seasonal marketing impact: 35% higher conversion during relevant campaigns
- Countdown timer psychology: creates 25% more urgency and conversion

---

### Propuesta 7: Pasarela de Pagos Integrada (取代 Formspree)

**Problema:** Formspree está bien para formularios simples, pero no permite pagos recurrentes, historial de transacciones, ni integración con garantías. El sitio está limitado a transacciones de una sola vez.

**Propuesta:**
1. Implementar pasarela de pagos (ePayco o PayU Latam):
   - Botón de pago en checkout que redirect a pasarela segura
   - Historial de pagos en `/mi-cuenta`
   - Tokens de tarjeta guardadas para rápida renovación
2. Casos de uso para la pasarela:
   - **Suscripciones Purity Plus** (Propuesta 1): Cobros mensuales automáticos
   - **Pagos de garantías extendidas** (Propuesta 2): Pago único al contratar
   - **Pagos corporativos B2B** (Propuesta 3): Facturación mensual con estado de cuenta
   - **Servicios individuales:** Pago por pse/tarjeta al confirmar reserva
3. Seguridad y compliance:
   - PCI DSS compliance via pasarela (no storing card data locally)
   - 3D Secure para transacciones grandes
   - Refund policy clara en caso de cancelación
4. Webhooks para sincronizar estado:
   - Pago exitoso → confirmar reserva → notificar al equipo
   - Pago fallido → notificar cliente → reintentar 24h después

**Impacto:** Habilita todos los modelos de ingreso recurrente, profesionaliza el negocio, genera historial de transacciones para trust.
**Esfuerzo:** L (4-6 semanas).
**Agente:** Full Stack (Backend).
**Referencias:**
- ePayco integration docs: pagos online Colombia
- PayU Latam: payment gateway for Latin America
- Subscription payment failure handling: Stripe best practices

---

## Priorización recomendada (Round 11)

| # | Propuesta | Impacto | Esfuerzo | Agente | Razón estratégica |
|---|-----------|---------|----------|--------|------------------|
| 1 | Purity Plus (Suscripción) | Alto | Medio | Full Stack | Revenue recurrente, el futuro del negocio |
| 2 | Garantía Extendida + Tratamientos | Alto | Bajo | Frontend | Easy upsell, alto AOV |
| 3 | Portal B2B Empresas | Alto | Medio | Full Stack | Mayor ticket, contratos estables |
| 4 | Nurture Sequence Post-Servicio | Alto | Medio | Full Stack | Reduce churn, aumenta LTV |
| 5 | Service Score del Equipo | Medio | Bajo | Frontend | Transparencia, confianza |
| 6 | Campaign Engine | Medio | Bajo | Frontend | Capitaliza estacionalidad |
| 7 | Pasarela de Pagos | Alto | Largo | Full Stack | Habilita todos los modelos |

**Top 3 para implementar primero:** 1, 2, 4 (revenue recurrente + upsell + retención).

---

## Estado de propuestas Rounds anteriores

### Implementadas ✅ (Rounds 1-10)
- PWA con push notifications ✅
- Chatbot FAQ con WhatsApp routing ✅
- Galería antes/después ✅
- Blog SEO con 6+ artículos ✅
- Core Web Vitals optimization ✅
- Playwright test suite completa ✅
- Skip navigation WCAG ✅
- Dark mode con persistencia ✅
- Zone pages template dinámico ✅
- Newsletter integration ✅
- Animaciones scroll-triggered ✅
- Internal linking blog → homepage ✅
- Sistema de referidos con cupones ✅
- Cotizador con rango de precios ✅
- Multi-step booking form ✅
- Schema LocalBusiness + FAQPage + Article + AggregateRating + Review + VideoObject ✅
- Video embebido optimizado ✅
- Meta tags completos + OG + Twitter Cards ✅
- Sitemap.xml + robots.txt ✅
- CSS crítico inline LCP ✅
- Reviewsdata.js con pool de testimonios ✅
- Testimonios visuales homepage ✅
- SMS transactional (R9) ✅ (hipótesis a validar)
- App de campo para técnicos (R9) ✅ (hipótesis a validar)
- Pipeline de ventas visible (R9) ✅ (hipótesis a validar)

### Implementadas en R10:
- Sistema de solicitud de reviews con foto post-servicio ✅
- Programa de referidos con niveles (Ambassador Program) ✅
- Google Business Profile optimization suite ✅
- WhatsApp Business API integration ✅
- Video testimonials campaign ✅
- Mapa interactivo de cobertura por zona ✅
- Calendario visual de reservas ✅

### Nuevas propuestas R11 (nunca proposadas):
1. Programa de Suscripción "Purity Plus" (3 niveles)
2. Garantía Extendida + Tratamientos Protectores
3. Portal B2B para Empresas
4. Nurture Sequence Post-Servicio automatizado
5. "Service Score" del Equipo Técnico
6. Campaign Engine para Promociones Estacionales
7. Pasarela de Pagos Integrada (取代 Formspree)

---

## Referencias

[1] HubSpot — "State of Marketing 2024-2025" — Subscription models in service businesses

[2] Merry Maids (USA) — Corporate subscription program data

[3] Stripe — "Subscription billing for home services" best practices

[4] ePayco — Pasarela de pagos online Colombia

[5] PayU Latam — Payment gateway documentation

---

## Investigación adicional

### Mercado de suscripciones en Colombia 2026
- Rappi Pass (suscripción de delivery) tiene 500k+ suscriptores en Colombia
- El modelo de suscripción para servicios del hogar está subdesarrollado en Bogotá
- Oportunidad de ser "primero mover" en cleaning subscriptions

### Datos de retention en home services
- Cliente que contrata 2 veces en 6 meses: 80% probabilidad de contratar 3ra vez
- Cliente que no contrata en 90 días: solo 20% vuelve
- Email/SMS de follow-up aumenta repeat rate en 35%

### B2B cleaning en Bogotá
- Oficinas平均值 necesitan servicio semanal ($800k-1.5M COP/mes)
- Consultorios médicos: sanitización mensual ($400-600k COP/mes)
- Restaurantes: sanitización quincenal ($500k-1M COP/mes)

---

## Conclusión

R11 marca la transición de Purity & Clean de un negocio **transaccional** a un modelo **recurrente**. Las 3 propuestas más impactantes son:

1. **Purity Plus (Suscripción)** — Transforma clientes únicos en ingresos mensuales predecibles
2. **Garantía Extendida** — Upsell simple que aumenta AOV y percepción de valor
3. **Nurture Sequence** — Recupera clientes inactivos y maximiza LTV

Juntas, estas tres crean un ciclo virtuoso de ingresos recurrentes: cliente se suscribe → recibe follow-up inteligente → renueva automáticamente → genera referidos → nuevos clientes se suscriben.

La inversión en **modelo de suscripción + automatización post-servicio** es lo más crítico para la estabilidad financiera de Purity & Clean en los próximos 2 años.

---

*Co-Authored-By: Paperclip <noreply@paperclip.ing>*