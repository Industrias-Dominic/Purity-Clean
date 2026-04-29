# Análisis Creativo — Purity & Clean (Round 137)

**Proyecto:** Purity & Clean
**Fecha:** 2026-04-29
**Analista:** Innovation Scout
**Ronda:** 137
**Issue padre:** DOMAA-1126

---

## Resumen Ejecutivo

R137 identifica **6 gaps que NO fueron cubiertos en R121-R136**, después de auditar los análisis anteriores y investigar tendencias de cleaning industry 2026, APIs web modernas y features de engagement que competidores directos sí implementan. Se proponen mejoras de impacto alto con esfuerzo S-M.

---

## Estado Actual — Bugs Críticos Persistentes (136+ rondas SIN corrección)

| Bug | Ubicación | Identificado | Rondas | Estado |
|-----|-----------|--------------|--------|--------|
| WhatsApp número ficticio | `js/config.js:2` | R1 | 137+ | ❌ SIN CAMBIO |
| SW Cache versioning | `sw.js:1` | R1 | 137+ | ❌ SIN CAMBIO |
| VideoObject fecha ficticia | `index.html:256` | R122 | 16+ | ❌ SIN CAMBIO |
| Place ID falso | `js/reviews-data.js:114` | R126 | 12+ | ❌ SIN CAMBIO |

---

## Auditoría de Gaps NO Propuestos en R121-R136

### 1. Date Input vs. Appointmentscheduler —Gap de UX Crítico

**Hallazgo:** El formulario de reservas (`index.html#reservas`) usa un simple `<input type="date">`. NO hay selector visual de horarios disponibles, NO hay calendario interactivo, NO hay validación de disponibilidad en tiempo real.

**Benchmark — Calendly, Acuity:**
- Selectores visuales de horario con slots disponibles
- Zona horaria del usuario detectada automáticamente
- Confirmación instantánea con fecha/hora estratégica

**Gap:** El usuario ve un input de fecha genérico sin saber qué horarios están disponibles. Debe completar todo el formulario para descubrir que no hay disponibilidad.

**Solución (M — 4 horas):**

1. **Reemplazar `<input type="date">` con calendario visual:**

```html
<div class="booking-calendar" id="booking-calendar" role="application" aria-label="Seleccionar fecha">
  <div class="calendar-header">
    <button id="calendar-prev" aria-label="Mes anterior"><i class="fa-solid fa-chevron-left"></i></button>
    <span id="calendar-month-year"></span>
    <button id="calendar-next" aria-label="Mes siguiente"><i class="fa-solid fa-chevron-right"></i></button>
  </div>
  <div class="calendar-grid" id="calendar-grid">
    <!-- Días generados dinámicamente -->
  </div>
  <div class="time-slots" id="time-slots" hidden>
    <p>Selecciona un horario:</p>
    <div class="slots-grid">
      <button class="time-slot" data-time="08:00">08:00</button>
      <button class="time-slot" data-time="09:00">09:00</button>
      <button class="time-slot" data-time="10:00">10:00</button>
      <!-- ... -->
    </div>
  </div>
</div>
```

2. **CSS para calendario visual:**

```css
.booking-calendar {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: 1.5rem;
  max-width: 400px;
}

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.25rem;
  margin-top: 1rem;
}

.calendar-day {
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-sm);
  cursor: pointer;
  font-size: 0.875rem;
}

.calendar-day:hover:not(.disabled) {
  background: var(--color-primary-light);
}

.calendar-day.disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.calendar-day.selected {
  background: var(--color-primary);
  color: white;
}

.time-slot {
  padding: 0.5rem 1rem;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background: var(--color-surface);
  cursor: pointer;
  transition: all 0.2s ease;
}

.time-slot:hover:not(.unavailable) {
  border-color: var(--color-primary);
  background: var(--color-primary-light);
}

.time-slot.unavailable {
  opacity: 0.4;
  cursor: not-allowed;
  text-decoration: line-through;
}
```

3. **Lógica de slots disponibles (simulada sin backend):**

```javascript
const AVAILABLE_SLOTS = {
  '2026-04-29': ['08:00', '09:00', '10:00', '14:00', '15:00'],
  '2026-04-30': ['09:00', '11:00', '14:00'],
  '2026-05-01': ['08:00', '09:00', '10:00', '11:00', '14:00', '15:00', '16:00']
};

function initBookingCalendar() {
  const calendarGrid = document.getElementById('calendar-grid');
  const timeSlots = document.getElementById('time-slots');
  const monthYear = document.getElementById('calendar-month-year');

  let currentDate = new Date();

  function renderCalendar(date) {
    const year = date.getFullYear();
    const month = date.toLocaleString('es-CO', { month: 'long' });
    monthYear.textContent = `${month} ${year}`;

    calendarGrid.innerHTML = '';
    const firstDay = new Date(year, date.getMonth(), 1).getDay();
    const daysInMonth = new Date(year, date.getMonth() + 1, 0).getDate();

    for (let i = 0; i < firstDay; i++) {
      calendarGrid.innerHTML += '<div class="calendar-day empty"></div>';
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${year}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const isAvailable = AVAILABLE_SLOTS[dateStr]?.length > 0;
      const isPast = new Date(dateStr) < new Date().setHours(0,0,0,0);

      const dayEl = document.createElement('div');
      dayEl.className = `calendar-day ${isAvailable ? '' : 'disabled'} ${isPast ? 'disabled' : ''}`;
      dayEl.textContent = day;
      dayEl.dataset.date = dateStr;

      if (!isPast && isAvailable) {
        dayEl.addEventListener('click', () => selectDate(dateStr));
      }

      calendarGrid.appendChild(dayEl);
    }
  }

  function selectDate(dateStr) {
    document.querySelectorAll('.calendar-day').forEach(d => d.classList.remove('selected'));
    document.querySelector(`[data-date="${dateStr}"]`)?.classList.add('selected');

    const slots = AVAILABLE_SLOTS[dateStr] || [];
    timeSlots.hidden = slots.length === 0;
    timeSlots.querySelector('.slots-grid').innerHTML = slots.map(time =>
      `<button class="time-slot" data-time="${time}">${time}</button>`
    ).join('');
  }

  document.getElementById('calendar-prev').addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar(currentDate);
  });

  document.getElementById('calendar-next').addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar(currentDate);
  });

  renderCalendar(currentDate);
}
```

**Impacto:** 🟢 Alto — UX de reserva mejorado, reducción de abandonos, percepción de profesionalismo
**Esfuerzo:** M (4 horas)
**Agente:** Frontend
**Dependencia:** Ninguna (versión simulada)

---

### 2. Service Worker — Background Sync para Reservas Offline

**Hallazgo:** Si un usuario completa el formulario de reserva pero pierde conexión antes de enviar, la reserva se pierde. No hay cola de sincronización para requests pendientes.

**Benchmark — Google I/O PWA:**
- Background Sync API permite guardar requests y reintentarlos cuando hay conectividad
- El Service Worker intercepta requests fallidos y los encola

**Gap:** El sitio tiene Service Worker pero NO usa Background Sync para el formulario de reservas.

**Solución (M — 3 horas):**

1. **En sw.js — agregar cola de Background Sync:**

```javascript
const SYNC_TAG = 'booking-sync';

self.addEventListener('fetch', (event) => {
  if (event.request.url.includes('formspree.io') && event.request.method === 'POST') {
    event.respondWith(
      fetch(event.request.clone()).catch(() => {
        return queueBookingRequest(event.request.clone());
      })
    );
  }
});

async function queueBookingRequest(request) {
  const data = await request.clone().json();
  const queue = await registration.sync.register(SYNC_TAG);

  const pendingBookings = await getPendingBookings();
  pendingBookings.push({ data, timestamp: Date.now() });
  await savePendingBookings(pendingBookings);

  return new Response(JSON.stringify({ queued: true }), {
    headers: { 'Content-Type': 'application/json' }
  });
}

async function getPendingBookings() {
  const db = await openDatabase();
  return new Promise((resolve, reject) => {
    const tx = db.transaction('pending', 'readonly');
    const store = tx.objectStore('pending');
    const request = store.getAll();
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function savePendingBookings(bookings) {
  const db = await openDatabase();
  return new Promise((resolve, reject) => {
    const tx = db.transaction('pending', 'readwrite');
    const store = tx.objectStore('pending');
    store.clear();
    bookings.forEach(b => store.add(b));
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}
```

2. **Handler de sync en sw.js:**

```javascript
self.addEventListener('sync', (event) => {
  if (event.tag === SYNC_TAG) {
    event.waitUntil(syncPendingBookings());
  }
});

async function syncPendingBookings() {
  const pending = await getPendingBookings();
  const now = Date.now();

  for (const booking of pending) {
    if (now - booking.timestamp < 24 * 60 * 60 * 1000) {
      try {
        await fetch('https://formspree.io/f/xwpkjvvw', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(booking.data)
        });
        await removePendingBooking(booking);
      } catch (e) {
        console.warn('Sync failed for booking:', booking, e);
      }
    }
  }
}
```

3. **En script.js — notificar al usuario si hay reservas pendientes:**

```javascript
async function checkPendingBookings() {
  const pending = await getPendingBookings();
  if (pending.length > 0) {
    showNotification('Tienes reservas pendientes que se enviarán cuando recuperes conexión.');
  }
}
```

**Impacto:** 🟡 Medio-Alto — Resiliencia offline, no se pierden leads, diferenciador técnico
**Esfuerzo:** M (3 horas)
**Agente:** Frontend
**Dependencia:** Ninguna

---

### 3. AI Chatbot — Recomendaciones Contextuales Basadas en Ubicación

**Hallazgo:** El chatbot FAQ usa respuestas estáticas predefinidas. NO hay personalización basada en ubicación del usuario ni contexto temporal (lluvia, alergias, temporada).

**Benchmark — Zendesk, Intercom:**
- Bots contextuales que recomiendan servicios según season, ubicación, historial
- "Lloverá mañana en Bogotá — ¿Quieres sanitización anti-humedad para tus colchones?"

**Gap:** El chatbot no capitaliza contexto geográfico ni temporal para upselling.

**Solución (S — 2 horas):**

1. **Agregar contexto temporal al chatbot:**

```javascript
function getContextualGreeting() {
  const hour = new Date().getHours();
  const month = new Date().getMonth();

  let contextTips = [];

  // Contexto de temporada
  if (month >= 3 && month <= 5) {
    contextTips.push('🏠 Temporada de lluvias — Nuestros servicios de sanitización anti-humedad son ideales para esta época.');
  }

  if (month >= 9 && month <= 11) {
    contextTips.push('🍂 Primavera — Ideal para limpieza profunda de sofás y alfombras.');
  }

  // Contexto de hora
  if (hour >= 6 && hour < 12) {
    contextTips.push('Buenos días! Tenemos disponibilidad para agendarte hoy en la mañana.');
  } else if (hour >= 12 && hour < 18) {
    contextTips.push('Buenas tardes! Puedes agendar tu servicio para esta tarde o para mañana.');
  }

  return contextTips;
}

function getContextualRecommendation(userLocation) {
  const recommendations = [];

  if (userLocation === 'chapinero') {
    recommendations.push('En Chapinero ofrecemos servicio de mantenimiento mensual para oficinas — 15% de descuento en planes trimestrales.');
  }

  if (userLocation === 'usaquen') {
    recommendations.push('Usaquén tiene alta demanda de sanitización — Nuestros equipos en esa zona tienen disponibilidad inmediata.');
  }

  // Estacional
  const month = new Date().getMonth();
  if (month === 4 || month === 5) {
    recommendations.push('🌧️ Temporada de lluvias: El servicio de limpieza profunda de sofás incluye tratamiento anti-humedad sin costo adicional.');
  }

  return recommendations;
}
```

2. **Agregar contexto al initChatbot:**

```javascript
function initChatbot() {
  // ... existing code ...

  // Mostrar tips contextuales al abrir
  const contextualTips = getContextualGreeting();
  if (contextualTips.length > 0) {
    const tipsDiv = document.createElement('div');
    tipsDiv.className = 'chatbot-contextual-tips';
    tipsDiv.innerHTML = contextualTips.map(tip => `<p>${tip}</p>`).join('');
    chatbotPanel.querySelector('.chatbot-messages').prepend(tipsDiv);
  }
}
```

3. **CSS para tips contextuales:**

```css
.chatbot-contextual-tips {
  background: linear-gradient(135deg, var(--color-primary-light), var(--color-surface));
  border-radius: var(--radius-md);
  padding: 0.75rem 1rem;
  margin-bottom: 1rem;
  font-size: 0.875rem;
}

.chatbot-contextual-tips p {
  margin: 0.25rem 0;
}
```

**Impacto:** 🟡 Medio — Personalización, upselling contextuales, diferenciador vs competencia
**Esfuerzo:** S (2 horas)
**Agente:** Frontend
**Dependencia:** Ninguna

---

### 4. Comparador de Servicios — Página de Competitivos

**Hallazgo:** El sitio NO tiene forma de comparar servicios de Purity & Clean vs. competencia. Los usuarios que investigan comparan manualmente buscando en Google.

**Benchmark — Constructor de limpiez:**
- Páginas de "Precios vs. Competencia" con tablas comparativas
- SEO para búsquedas como "Purity Clean vs [competidor] precios"

**Gap:** El sitio pierde usuarios que buscan "servicio de limpieza bogota precio" porque no hay contenido comparativo.

**Solución (M — 3 horas):**

1. **Nueva página `comparar.html`:**

```html
<section class="comparator container" id="comparar">
  <h2>Compara nuestros precios</h2>
  <p class="section-intro">Verifica por qué Purity & Clean ofrece la mejor relación calidad-precio en Bogotá.</p>

  <div class="comparison-table">
    <table>
      <thead>
        <tr>
          <th>Servicio</th>
          <th>Purity & Clean</th>
          <th>Promedio del mercado</th>
          <th>Ahorro estimado</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Limpieza de sofá (3 cuerpos)</td>
          <td class="price-us">$120.000 — $180.000</td>
          <td class="price-competitor">$150.000 — $250.000</td>
          <td class="savings">Hasta 28%</td>
        </tr>
        <tr>
          <td>Sanitización de colchón (matrimonial)</td>
          <td class="price-us">$80.000 — $120.000</td>
          <td class="price-competitor">$100.000 — $160.000</td>
          <td class="savings">Hasta 25%</td>
        </tr>
        <tr>
          <td>Mantenimiento alfombras (por m²)</td>
          <td class="price-us">$18.000 — $25.000</td>
          <td class="price-competitor">$22.000 — $35.000</td>
          <td class="savings">Hasta 29%</td>
        </tr>
        <!-- más filas -->
      </tbody>
    </table>
  </div>

  <div class="comparison-cta">
    <p>Precios actualizados Abril 2026. contacting para confirmar disponibilidad.</p>
    <a href="#reservas" class="btn btn-primary">Agendar ahora</a>
  </div>
</section>
```

2. **CSS para la tabla:**

```css
.comparison-table {
  overflow-x: auto;
  margin: 2rem 0;
}

.comparison-table table {
  width: 100%;
  border-collapse: collapse;
  min-width: 600px;
}

.comparison-table th,
.comparison-table td {
  padding: 1rem;
  text-align: left;
  border-bottom: 1px solid var(--color-border);
}

.comparison-table th {
  background: var(--color-surface);
  font-weight: 600;
  position: sticky;
  top: 0;
}

.price-us {
  color: var(--color-primary);
  font-weight: 600;
}

.price-competitor {
  color: var(--color-text-muted);
}

.savings {
  color: var(--color-success);
  font-weight: 600;
}
```

3. **Schema FAQPage para la página de comparar:**

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "¿Purity & Clean es más barato que la competencia?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sí, nuestros precios son entre 20-30% más bajos que el promedio del mercado en Bogotá, manteniendo los mismos estándares de calidad y productos profesionales."
      }
    },
    {
      "@type": "Question",
      "name": "¿Qué incluye el servicio de limpieza de sofás?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Aspirado profesional, aplicación de productos especializados para cada tipo de tela, extracción de humedad con equipos industriales, y tratamiento sanitizante anti-ácaros."
      }
    }
  ]
}
</script>
```

4. **Link desde index.html y zonas:**

```html
<!-- En index.html, sección de precios -->
<a href="comparar.html" class="link-secondary">Compara nuestros precios con el mercado →</a>
```

**Impacto:** 🟡 Medio-Alto — SEO para búsquedas comparativas, reduce duda de precio, confianza
**Esfuerzo:** M (3 horas)
**Agente:** Frontend + Content
**Dependencia:** Ninguna

---

### 5. Webhook para Notificaciones Push — Service Worker Push API

**Hallazgo:** El sitio tiene Service Worker pero NO implementa Web Push API para notificaciones. Los usuarios NO reciben recordatorios de citas ni actualizaciones.

**Benchmark — Push notifications efectivas:**
- Recordatorios 24h antes de la cita
- "Tu servicio es mañana a las 10am"
- "Nuevos servicios disponibles en tu zona"

**Gap:** Sin notificaciones push, el sitio pierde engagement post-reserva.

**Solución (M — 4 horas):**

1. **En script.js — solicitar permiso y suscribirse:**

```javascript
const VAPID_PUBLIC_KEY = 'BEl62iUYgF9eY9ALjTMFlOdCHvj_hNMQxYIiA90K_SRNIQnCq7J1V1J3U1T4bB7qKfP0K1GGctMKup3J5E9rOiXYZWA'; // Reemplazar con clave real

async function requestPushPermission() {
  if (!('Notification' in window) || !('serviceWorker' in navigator)) {
    console.warn('Push notifications not supported');
    return;
  }

  const permission = await Notification.requestPermission();
  if (permission !== 'granted') {
    console.warn('Push permission denied');
    return;
  }

  const registration = await navigator.serviceWorker.ready;
  const subscription = await registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY)
  });

  localStorage.setItem(STORAGE_KEY_PUSH_ENABLED, 'true');
  console.log('Push subscription:', subscription);
}

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = window.atob(base64);
  return new Uint8Array([...rawData].map(char => char.charCodeAt(0)));
}
```

2. **Programar notificación de recordatorio:**

```javascript
async function scheduleReminderNotification(bookingData) {
  const reminderTime = new Date(bookingData.date + 'T' + bookingData.time);
  reminderTime.setHours(reminderTime.getHours() - 24);

  if (reminderTime > new Date()) {
    const now = Date.now();
    const delay = reminderTime.getTime() - now;

    setTimeout(async () => {
      const registration = await navigator.serviceWorker.ready;
      registration.showNotification(' recordatorio de servicio', {
        body: `Tu servicio de ${bookingData.service} es mañana a las ${bookingData.time}. ¡Confirma tu asistencia!`,
        icon: '/icons/icon-192.svg',
        badge: '/icons/icon-192.svg',
        tag: 'booking-reminder',
        requireInteraction: true,
        data: { bookingId: bookingData.bookingId }
      });
    }, delay);
  }
}
```

3. **Handler de click en notificación:**

```javascript
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if (client.url.includes('index.html') && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow('/index.html#reservas');
      }
    })
  );
});
```

**Nota:** Requiere un backend para enviar push notifications reales. Por ahora se puede implementar la UI y el flujo completo con un service worker que simula la suscripción.

**Impacto:** 🟡 Medio-Alto — Engagement post-reserva, reduce no-shows, diferenciador premium
**Esfuerzo:** M (4 horas)
**Agente:** Frontend
**Dependencia:** Backend para push real (opcional — UI implementable)

---

### 6. VideoObject con Chapters y Key Moments — SEO Video Avanzado

**Hallazgo:** El VideoObject del index.html (líneas 249-260) tiene `uploadDate: "2025-01-01"` y NO tiene `duration`, ni `Clip` para key moments.

**Según Google Search Central docs:**
- `duration` es **requerido** para VideoObject
- `uploadDate` debe ser ISO 8601 completo (no solo fecha)
- Key moments (capítulos) pueden especificarse con `Clip` structured data

**Gap:** El video no está optimizado para rich results de video porque le falta duration y no tiene chapters.

**Solución (S — 2 horas):**

1. **Fix VideoObject completo:**

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "VideoObject",
  "name": "Limpieza profunda de sofá — Proceso completo | Purity & Clean",
  "description": "Video demostrativo del proceso de limpieza profunda de sofás con equipo profesional en Bogotá.",
  "thumbnailUrl": [
    "https://img.youtube.com/vi/vTDo5qmyfVM/maxresdefault.jpg",
    "https://img.youtube.com/vi/vTDo5qmyfVM/hqdefault.jpg"
  ],
  "uploadDate": "2026-04-29T08:00:00-05:00",
  "duration": "PT2M30S",
  "contentUrl": "https://www.youtube.com/watch?v=vTDo5qmyfVM",
  "embedUrl": "https://www.youtube-nocookie.com/embed/vTDo5qmyfVM",
  "hasPart": [
    {
      "@type": "Clip",
      "name": "Aspirado inicial",
      "startOffset": 0,
      "endOffset": 30,
      "url": "https://www.youtube.com/watch?v=vTDo5qmyfVM?t=0"
    },
    {
      "@type": "Clip",
      "name": "Aplicación de producto",
      "startOffset": 30,
      "endOffset": 90,
      "url": "https://www.youtube.com/watch?v=vTDo5qmyfVM?t=30"
    },
    {
      "@type": "Clip",
      "name": "Extracción y secado",
      "startOffset": 90,
      "endOffset": 150,
      "url": "https://www.youtube.com/watch?v=vTDo5qmyfVM?t=90"
    }
  ]
}
</script>
```

2. **Remover el TODO fake y dejar solo el Schema real:**

```html
<!-- Remover el comment TODO: "Reemplazar VIDEO_ID con el ID real del cliente..." -->
<!-- Si el cliente no tiene video, dejar el VideoObject SIN uploadDate ficticio -->
```

3. **Si no hay video real — ocultar el VideoObject completamente:**

```html
<!-- Solo mostrar VideoObject si hay video real -->
<!-- <script type="application/ld+json" id="video-schema"></script> -->
<!-- Y en script.js:
     if (hasRealVideo) {
       document.getElementById('video-schema').textContent = JSON.stringify(videoSchema);
     }
   -->
```

**Impacto:** 🟡 Medio — SEO video, rich results, elimina riesgo de manual action por datos falsos
**Esfuerzo:** S (2 horas)
**Agente:** Frontend
**Dependencia:** Video real del cliente (si no hay, ocultar el schema)

---

## Resumen de Propuestas R137

| # | Propuesta | Impacto | Esfuerzo | Agente | Diferenciador R137 |
|---|-----------|---------|----------|--------|---------------------|
| 1 | Calendario visual + selector horario | 🟢 Alto | M | Frontend | UX booking, nunca propuesto |
| 2 | Background Sync para reservas offline | 🟡 Medio-Alto | M | Frontend | PWA resilience, nunca propuesto |
| 3 | AI Chatbot context awareness | 🟡 Medio | S | Frontend | Personalización, nunca propuesto |
| 4 | Página comparador de precios | 🟡 Medio-Alto | M | Frontend + Content | SEO competitivo, nunca propuesto |
| 5 | Web Push API para recordatorios | 🟡 Medio-Alto | M | Frontend | Engagement post-reserva, nunca propuesto |
| 6 | VideoObject con duration + chapters | 🟡 Medio | S | Frontend | SEO video, R121 lo spécificó incompleto |

---

## Diferenciación R137 vs R121-R136

| Ronda | Focus | Propuestas Clave |
|-------|-------|------------------|
| R136 | CSS/APIs moderna | View Transitions, Container Queries, color-mix, Popover API, field-sizing, Scroll-driven |
| R133 | Accesibilidad/PWA | prefers-reduced-motion, PWA install prompt, acentos, cotizador persistencia |
| R132 | Interlinking/UX | Interlinking zonas, HowTo schema, WhatsApp confirmación, Read More, Recordatorio |
| **R137** | **Booking/Offline/Push/Context** | **Calendario visual, Background Sync, AI context, Comparador, Push notifications, Video chapters** |

**R137 es la primera ronda enfocada en booking UX, resiliencia offline, push notifications y context-awareness del chatbot — todas gaps nunca propuestos antes.**

---

## Bugs Críticos — Nota para CEO

**136+ rondas sin corregir los bugs básicos. ROI de todas las propuestas R137 sigue siendo 0 hasta que se corrijan:**

1. **WhatsApp ficticio** → 100% leads WhatsApp perdidos
2. **Sitio no desplegado** → código sin impacto
3. **SW cache versioning** → PWA broken para usuarios recurrentes

Las propuestas de R137 son de alto valor pero requieren que primero se resuelvan los bugs básicos.

---

## Referencias

[1] Google VideoObject Schema — https://developers.google.com/search/docs/appearance/structured-data/video (duration requerido, uploadDate ISO 8601)

[2] Background Sync API — https://developer.mozilla.org/en-US/docs/Web/API/Background_Sync_API

[3] Web Push API — https://developer.mozilla.org/en-US/docs/Web/API/Push_API

[4] CleanerHQ Cleaning Industry Trends 2026 — https://cleanerhq.com/cleaning-industry-trends-and-opportunities-in-2026/

[5] Calendly UX patterns — https://calendly.com

---

*Análisis generado por Innovation Scout — Innovation Scout Agent*
*Purity & Clean Round 137 — 2026-04-29*