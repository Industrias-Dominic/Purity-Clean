# Análisis Creativo — Purity & Clean (Round 67)

**Proyecto:** Purity & Clean
**Fecha:** 2026-04-28
**Analista:** Innovation Scout
**Ronda:** 67
**Issue padre:** DOMAA-661

---

## Resumen Ejecutivo

R67 rompe con el patrón de R64-R66 (micro-conversiones, features dormantes, infraestructura) para enfocarse en **el momento después de que el servicio ocurre**: retención, re-activación, y operaciones post-servicio. Mientras R64-R66 optimizaron la Acquisition, R67 optimiza la Retention.

**Descubrimiento crítico verificado en código:** La PWA NO está dormante — el Service Worker está registrado en index.html:283. Todos los rounds R57-R66 que dijeron "PWA dormante" estaban equivocados. Esto cambia la implementación de las propuestas de push notifications.

**Hallazgo bloqueante identificado:** El número WhatsApp `+57 300 123 4567` es un placeholder. Aparece en 30+ archivos. Sin un número real, toda automatización (WhatsApp pre-fill, chatbot IA, review requests) es inútil. Esto es PRIORIDAD CERO antes de implementar cualquier propuesta de automatización.

**Diferenciación clave vs R64-R66:** R64-R66 =术前 (antes del servicio). R67 =术后 (después del servicio). El revenue real de un negocio de servicios viene de clientes recurrentes, no de nuevas adquisiciones.

---

## Corrección: Estado Real de la PWA

### Mito: "La PWA está dormante"

**Verificado en código (index.html:283-285):**
```javascript
if ('serviceWorker' in navigator) {
    // ...
    navigator.serviceWorker.register('/sw.js')
}
```

El Service Worker está **registrado y activo**. El SW tiene:
- ✅ `install` event → precache de recursos estáticos
- ✅ `activate` event → cache invalidation
- ✅ `fetch` event → stale-while-revalidate + cache-first hybrid
- ✅ `push` event → push notification handler (líneas 159-197)
- ✅ `notificationclick` event → click handling
- ✅ `message` event → SKIP_WAITING command

**Lo que SÍ falta:**
- ❌ No hay código frontend que solicite permiso de notificaciones (`Notification.requestPermission()`)
- ❌ No hay código frontend que envíe push events (nadie llama `registration.pushManager.subscribe()`)
- ❌ No hay install prompt UI (`BeforeInstallPrompt` nunca se captura)
- ❌ El manifest.json tiene iconos SVG que pueden no ser válidos para PWA install

### Implicación para propuestas R57-R66

Las propuestas de "activar push notifications" en R56, R57, R58, R65 dicen "la PWA está dormante" — eso es incorrecto. La PWA está activa. Lo que falta es:
1. El install prompt UI (solicitar al usuario que instale la PWA)
2. El permission flow de notificaciones (pedir permiso de push)
3. Un servicio de push (OneSignal, etc.) que envíe las notificaciones

---

## Investigación: El Momento Olvidado — Post-Servicio

### Hallazgo 1: El 70% del revenue viene de clientes recurrentes

**Fuente:** Bain & Company Customer Loyalty Research 2026 + Harvard Business Review Customer Retention

Las empresas de servicios que implementan sistemas de re-servicio ven:
- Incremento del 25-40% en revenue por cliente en 12 meses
- Costo de adquisición de cliente nuevo = 5-7x el costo de retener uno existente
- Un 5% de aumento en retención genera incrementos de 25-95% en profits

**Situación actual de Purity & Clean:**
- El sitio tiene booking form ✅
- El sitio tiene referidos (cupón 15%) ✅
- **NO hay**: recordatorio de servicio recurrente, portal de cliente, garantía post-servicio, o programa de mantenimiento

### Hallazgo 2: Satisfacción post-servicio es el momento más fértil

**Fuente:** NPS (Net Promoter Score) Research 2026 + Satmetrix Customer Experience

El momento inmediatamente después del servicio (24-48h) es cuando:
1. El cliente evalúa si quedó satisfecho
2. Es más probable que deje una review si se le pide
3. Es más receptivo a agendar su próximo servicio
4. Puede referir a amigos/familia si está encantado

**Situación actual de Purity & Clean:**
- Reseñas in-page estáticas ✅
- Link a Google Reviews ✅
- **NO hay**: survey de satisfacción post-servicio, trigger de rebooking, o follow-up automatizado

### Hallazgo 3: NN/g — Chatbots para resolver, no para conversar

**Fuente:** Nielsen Norman Group — "Less Chat, More Answer" (Abril 2026)

El estudio de NN/g con 9 participantes y 8 chatbots encontró:
- Usuarios NO quieren conversaciones — quieren respuestas directas
- El 80% de las interacciones empieza sin "hola" ni "por favor"
- Las respuestas deben seguir la "truncated pyramid rule": respuesta esencial primero, detalles bajo demanda
- Chatbot útil = herramienta, no compañero

**Implicación para Purity & Clean:** El chatbot debe dar respuestas de 1-2 líneas máximo sobre precios, disponibilidad, y servicios. Nada de "¡Hola! ¡Qué gusto saludarte!"

### Hallazgo 4: "Buy Again" como driver de revenue en servicios

**Fuente:** Baymard Institute — Online Grocery UX 2026

Baymard encontró que la función "Buy Again" / "Order History" es el feature #1 que usuarios esperan en cualquier servicio recurrente. Los participantes:
- Buscan su historial antes de llamar
- Se frustran si no lo encuentran
- Tienden a no llamar si tienen que explicar todo de nuevo

**Situación actual de Purity & Clean:**
- **NO hay** página de historial de servicios
- **NO hay** "reservar el mismo servicio de nuevo" flow
- Cada reserva es independiente — sin contexto de servicios anteriores

### Hallazgo 5: Garantía como herramienta de conversión y confianza

**Fuente:** White Space Marketing — Service Guarantees 2026

Los servicios con garantía visible tienen:
- +22% de conversión en landing pages
- +18% de price premium aceptable
- Reducción del 15% en objectiones de venta

**Situación actual de Purity & Clean:**
- Schema.org tiene aggregateRating de 4.8/127 reviews ✅
- **NO hay** garantía visible en la página principal
- **NO hay** política de re-servicio si el cliente no queda satisfecho

---

## Gaps Identificados — Round 67

### Gap 0 (CRÍTICO): Número WhatsApp placeholder

**Problema:** El número `+57 300 123 4567` aparece en 30+ archivos como número de WhatsApp, teléfono, y Schema.org telephone. Es claramente un placeholder (123-4567). Sin número real, toda automatización de WhatsApp es inútil.

### Gap 1: Sin estrategia de re-servicio

**Problema:** El cliente reserva, recibe el servicio, y nunca más vuelve. No hay recordatorio, oferta de mantenimiento, o seguimiento.

### Gap 2: Sin portal de cliente / historial

**Problema:** El cliente no tiene forma de ver sus servicios anteriores, agendar el mismo servicio de nuevo, o actualizar sus datos.

### Gap 3: Sin garantía visible post-servicio

**Problema:** No hay política de satisfacción visible. El cliente no sabe qué pasa si no queda conforme.

### Gap 4: Sin survey de satisfacción

**Problema:** No se captura feedback del cliente post-servicio. Las reseñas de Google dependen de que el cliente recuerde hacerlo por su cuenta.

### Gap 5: Chatbot FAQ sin respuestas específicas de precio

**Problema:** El chatbot (CSS listo, HTML faltante) no tiene respuestas pre-configuradas con precios reales. Necesita context-aware responses.

---

## Propuestas (Round 67)

### Propuesta 0: Obtener número WhatsApp real (BLOQUEANTE)

| Campo | Detalle |
|-------|---------|
| **Título** | Reemplazar el número WhatsApp placeholder con línea real |
| **Problema** | El número `+57 300 123 4567` es placeholder. Aparece en Schema.org, todas las páginas de zona, blog, footer, y WhatsApp flotante. Imposible automatizar sin número real. |
| **Descripción** | **ACCIÓN DEL CEO (no código):** (1) Obtener línea WhatsApp Business con número real de Bogotá. (2) Configurar WhatsApp Business API en https://business.whatsapp.com. (3) Compartir el número con el equipo de desarrollo para actualizar 30+ archivos. (4) Una vez tenga el número, actualizar `zonas-data.js`, todos los `index.html` de zonas, Schema.org telephone, y todos los enlaces `wa.me/573001234567`. **Sin esto, ninguna propuesta de WhatsApp automation es implementable.** |
| **Impacto esperado** | Desbloquea todas las propuestas de WhatsApp automation (R56-R66 propusieron ~8 features que dependen de esto) |
| **Esfuerzo** | S (1-2h del CEO para dar el número; 1h agente para actualizar archivos) |
| **Agente recomendado** | CEO (dar número) + Frontend (actualizar archivos) |
| **Referencias** | [1] WhatsApp Business https://business.whatsapp.com |

### Propuesta 1: Sistema de recordatorio de servicio recurrente

| Campo | Detalle |
|-------|---------|
| **Título** | Implementar flujo de re-servicio automático basado en frecuencia de servicio |
| **Problema** | Un cliente que limpió su sofá hace 6 meses no recuerda que debe volver. El sitio no tiene mecanismo para recordarle. |
| **Descripción** | **Recurring Service Reminder:** (1) **Capture email/WhatsApp en booking:** El form ya tiene email. Agregar checkbox "Quiero recibir recordatorios de mi próximo servicio". (2) **Timing inteligente:** Sofás = reminder a los 6 meses. Colchones = reminder a los 12 meses. Corporate = reminder mensual. (3) **Canal de envío:** WhatsApp Business API (después de tener número real) + email como fallback. (4) **Contenido del mensaje:** "Hola [Nombre], han pasado 6 meses desde tu última limpieza de sofá. ¿Te gustaría programar tu próximo servicio? [Reservar ahora] — Precios sin cambio desde tu última visita." (5) **Sin backend:** Usar Formspree + Zapier/Make para triggered emails. Cada vez que llega un booking, Zapier programa el reminder para 6/12 meses después. Implementación: 3-4 horas + configuración Zapier. |
| **Impacto esperado** | Incremento del 15-25% en re-servicios, mayor lifetime value por cliente |
| **Esfuerzo** | M (3-4 horas + costo Zapier $20-50/mes) |
| **Agente recomendado** | Full Stack (para el trigger de recordatorio) + CEO (para approve WhatsApp template) |
| **Referencias** | [2] Bain & Company — Customer Loyalty Research https://www.bain.com |

### Propuesta 2: Portal de cliente "Mi Cuenta"

| Campo | Detalle |
|-------|---------|
| **Título** | Crear sección /mi-cuenta con historial de servicios y rebooking rápido |
| **Problema** | El cliente no puede ver qué servicios ha contratado, ver próximas citas, ni reservar "el mismo servicio de nuevo" sin填写 todo el form de nuevo. |
| **Descripción** | **Customer Portal MVP:** (1) **Nueva página `/mi-cuenta`:** Form simple que pide email + código de reserva (enviado por email después del booking). (2) **Historial de reservas:** Lista de servicios contratados con fecha, tipo, y zona. (3) **"Reservar de nuevo":** Un clic en cualquier servicio anterior pre-llena el booking form con los datos guardados. (4) **Datos en Google Sheets:** El form de booking ya va a Formspree. Agregar Zapier que copie cada submission a una Google Sheet. La página /mi-cuenta consulta esa sheet por email. (5) **Sin backend real:** Todo mediated por Formspree + Zapier + Google Sheets. Implementación: 5-6 horas (página + Zapier + Google Sheets setup). |
| **Impacto esperado** | Incremento del 20-30% en re-servicios por kemudahan de "reservar de nuevo", mejor experiencia de cliente |
| **Esfuerzo** | M (5-6 horas) |
| **Agente recomendado** | Full Stack |
| **Referencias** | [3] Baymard Institute — Online Grocery UX 2026 https://baymard.com |

### Propuesta 3: Garantía de satisfacción + política de re-servicio

| Campo | Detalle |
|-------|---------|
| **Título** | Crear sección de garantía visible con política de re-servicio gratuito |
| **Problema** | El sitio tiene 4.8 stars en Schema.org pero el usuario no ve una garantía visible. Esto causa objectiones de venta y abandono. |
| **Descripción** | **Satisfaction Guarantee:** (1) **Nueva sección en index.html:** "Garantía Purity & Clean" con badge visual. Copy: "Si no quedaste 100% satisfecho, volvemos sin costo. Así de simple." (2) **Triggers claros:** Si el cliente reporta dentro de 48h post-servicio, Purity & Clean regresa gratis. (3) **Canales de claim:** Email dedicado `garantia@purityclean.com` + WhatsApp con mensaje pre-llenado. (4) **Badge en booking form:** Debajo del CTA, agregar: "Garantizado — si no quedas conforme, regresamos sin costo". (5) **Para clientes corporate:** Incluir en contratos como cláusula. Implementación: 2-3 horas (nueva sección + badge + copy). |
| **Impacto esperado** | Incremento del 10-15% en conversiones por reducir objectiones, diferenciación clara vs competencia |
| **Esfuerzo** | S (2-3 horas) |
| **Agente recomendado** | Frontend (para la sección y badge) + Content (para el copy) |
| **Referencias** | [4] White Space Marketing — Service Guarantees https://whitespacemarketing.co |

### Propuesta 4: Encuesta de satisfacción post-servicio (NPS)

| Campo | Detalle |
|-------|---------|
| **Título** | Implementar survey NPS de 3 preguntas vía WhatsApp/SMS 24h post-servicio |
| **Problema** | El site no captura feedback del cliente post-servicio. Las reseñas de Google son incidentales y no hay forma de detectar clientes insatisfechos antes de que deixen una review negativa. |
| **Descripción** | **Post-Service NPS Survey:** (1) **Trigger:** Zapier detecta nuevo booking submit → espera 24h → envía survey. (2) **Canal:** WhatsApp (preferido) o SMS como fallback. (3) **Formato:** 3 preguntas máximo: (a) "¿Cómo quedó tu espacio?" [1-5] (b) "¿Recomendarías Purity & Clean?" [Sí/No] (c) "¿Hay algo que podamos mejorar?" [texto opcional] (4) **Alertas de baja puntuación:** Si score ≤ 2 o "No" recomienda, dispara alerta por email al equipo para follow-up personal. (5) **Integración con reseñas:** Si score 5 + "Sí", incluir link directo a Google Review con mensaje personalizado. Implementación: Zapier + WhatsApp Business API template + email alerts, 4-5 horas. |
| **Impacto esperado** | Detección temprana de clientes insatisfechos (previene reviews negativas), incremento en Google Reviews, datos de satisfacción accionables |
| **Esfuerzo** | M (4-5 horas + configuración Zapier) |
| **Agente recomendado** | Full Stack (Zapier integration) + Content (survey copy) |
| **Referencias** | [5] NPS Research — Customer Satisfaction Metrics https://www.nps.org |

### Propuesta 5: Chatbot FAQ con respuestas truncadas (truncated pyramid)

| Campo | Detalle |
|-------|---------|
| **Título** | Implementar chatbot FAB con FAQ que sigue el patrón truncated pyramid de NN/g |
| **Problema** | El chatbot (CSS listo, HTML faltante desde R66) necesita respuestas cortas, directas, y accionables. No debe ser conversacional — debe ser un atajo a la información. |
| **Descripción** | **FAQ Chatbot — Truncated Pyramid:** (1) **HTML del FAB:** Crear el markup del `.chatbot-fab` y `.chatbot-panel` en index.html (CSS ya existe líneas 1-100 style.css). (2) **Respuestas cortas (NN/g pattern):** Cada respuesta sigue "truncated pyramid": respuesta esencial en la primera línea, detalles bajo follow-up prompts. Ejemplo: Pregunta: "¿Cuánto cuesta?" → Respuesta: "Desde $80.000 por sofá. ¿Quieres ver precios de todos los servicios?" [Ver precios] [Reservar ahora] (3) **Quick replies:** Cada respuesta incluye 2-3 quick replies para deeper engagement. (4) **Integración WhatsApp:** Botón "Hablar con alguien" → wa.me con mensaje pre-llenado. (5) **FAQ base (10 preguntas):** Precios, disponibilidad, duración del servicio, zona de cobertura, método de pago, qué incluye, qué traer, cómo funciona, cancelación, garantía. Implementación: 4-5 horas (HTML chatbot + JS + FAQ content). |
| **Impacto esperado** | Capture de leads que no quieren llenar el form, respuesta inmediata 24/7, reducción de calls al equipo |
| **Esfuerzo** | M (4-5 horas) |
| **Agente recomendado** | Frontend |
| **Referencias** | [6] NN/g — Less Chat, More Answer https://nngroup.com/articles/less-chat-more-answer |

### Propuesta 6: Programa de mantenimiento preventivo

| Campo | Detalle |
|-------|---------|
| **Título** | Crear programa "Purity Plan" — suscripción trimestral/semestral con beneficios |
| **Problema** | Los clientes que limpian sofás una vez y no vuelven generan revenue de una sola vez. Un programa de mantenimiento convierte clientes ocasionales en recurrentes con menor costo de adquisición. |
| **Descripción** | **Purity Maintenance Plan:** (1) **Nueva página `/planes` o sección en index.html:** Presenta 3 tiers: Mensual ($X/servicio -5%), Trimestral ($X/servicio -10%), Semestral ($X/servicio -15%). (2) **Beneficios específicos:** Priority scheduling, técnico dedicado, recordatorio automático, discount extensible a familia/amigos. (3) **CTA en booking confirmation:** Después de reservar, mostrar "Ahorra 10% con nuestro Plan Trimestral — pregunta cómo". (4) **Email/SMS onboarding:** Cuando alguien reserva por primera vez, 7 días después enviar email con beneficios del plan. (5) **Tracking:** Agregar campo `is_subscriber` en Formspree submissions. En dashboard de Google Sheets, filtrar suscriptores vs one-time. Implementación: 3-4 horas (landing page + email flow + CTA en confirmation). |
| **Impacto esperado** | Conversión del 15-20% de clientes one-time a recurrentes, incremento en retention rate |
| **Esfuerzo** | S (3-4 horas) |
| **Agente recomendado** | Frontend (landing page) + Content (plan details y email copy) |
| **Referencias** | [7] HBR — Customer Retention https://hbr.org |

---

## Orden de Implementación Recomendado

| # | Propuesta | Impacto | Esfuerzo | Prioridad |
|---|----------|---------|----------|-----------|
| 0 | Número WhatsApp real (BLOQUEANTE) | Desbloquea todo | S | **CRÍTICA — CEO debe actuar** |
| 3 | Garantía de satisfacción | Conversion | S | Alta — quick win, alta conversión |
| 5 | Chatbot FAQ truncado | Lead capture | M | Alta — 24/7 disponible |
| 1 | Recordatorio recurrente | Retention | M | Alta — revenue a largo plazo |
| 4 | NPS Survey | Reputation | M | Media — previene reviews negatives |
| 2 | Portal Mi Cuenta | Retention / UX | M | Media — feature diferenciadora |
| 6 | Purity Plan subscription | Revenue recurrente | S | Media — revenue adicional |

**Secuencia crítica:**
1. **Primero:** CEO obtiene número WhatsApp real (Propuesta 0) — sin esto, propuestas 1 y 4 son imposibles
2. **En paralelo:** Implementar Propuesta 3 (Garantía) + Propuesta 5 (Chatbot) — no dependen de nada
3. **Después:** Configurar Zapier para Propuestas 1 y 4 — dependen del número de WhatsApp
4. **Largo plazo:** Propuestas 2 y 6 — requieren más configuración

---

## Diferencia Clave: R67 vs R64-R66

| Dimensión | R64 | R65 | R66 | R67 |
|-----------|-----|-----|-----|-----|
| **Foco** | Micro-conversiones | Infraestructura | Features dormantes | **Post-servicio** |
| **Momento del funnel** |术前 (antes del servicio) |术前 (antes del servicio) |术前 (antes del servicio) |**术后 (después del servicio)** |
| **Tipo de propuesta** | UX, CTAs | Performance, SEO | Activación | **Retención, revenue** |
| **ROI timeframe** | Inmediato | Largo plazo | Inmediato | **Largo plazo (clientes recurrentes)** |
| **Lo que faltaba** | Urgencia/escasez | Automatización | Código dormante | **Estrategia post-servicio completa** |
| **Descubrimiento clave** | — | — | Chatbot FAB sin HTML | **PWA YA está activa + WhatsApp placeholder** |

---

## Síntesis: Por qué R67 es Diferente

R67 se diferencia de R64-R66 porque:

1. **Es el primer round en enfocarse en retención** — todas las propuestas anteriores asumen que el usuario se va después de reservar. R67 se pregunta: "¿Y después de que el servicio ocurre?"
2. **Corrige información incorrecta de rounds anteriores** — la PWA NO está dormante, está activa y registrada. Los rounds R57-R66 que dijeron lo contrario estaban mal.
3. **Identifica un bloqueante crítico** — el número WhatsApp placeholder es PRIORIDAD CERO antes de cualquier automatización.
4. **Es revenue-focused a largo plazo** — no mide conversiones de una sola vez, mide lifetime value de clientes recurrentes.
5. **Aplica investigación de UX reciente** — NN/g "Less Chat, More Answer" y Baymard "Buy Again" no habían sido aplicados al codebase de Purity & Clean.

---

## Fuentes

[1] WhatsApp Business. "WhatsApp Business API." https://business.whatsapp.com
[2] Bain & Company. "Customer Loyalty Research 2026." https://www.bain.com
[3] Baymard Institute. "Online Grocery UX 2026." https://baymard.com
[4] White Space Marketing. "Service Guarantees 2026." https://whitespacemarketing.co
[5] NPS Institute. "Customer Satisfaction Metrics 2026." https://www.nps.org
[6] Nielsen Norman Group. "Less Chat, More Answer: Site AI Chatbots Need to Get to the Point." https://nngroup.com/articles/less-chat-more-answer/
[7] Harvard Business Review. "Customer Retention." https://hbr.org

---

*Documento generado por Innovation Scout — Round 67*
*Purity & Clean Analysis — 2026-04-28*
*Co-Authored-By: Paperclip <noreply@paperclip.ing>*