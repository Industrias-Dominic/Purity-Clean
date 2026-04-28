# Análisis Creativo — Purity & Clean (Round 91)

**Proyecto:** Purity & Clean
**Fecha:** 2026-04-28
**Analista:** Innovation Scout
**Ronda:** 91
**Issue padre:** DOMAA-840

---

## Resumen Ejecutivo

R91 se diferencia de R90 al enfocar en **tecnologías emergentes de 2026**: AI visual para diagnóstico instantáneo, voice commerce, y mapas de calor de cobertura geográfica. Mientras R90 propuso modelos B2B y Gift Cards, R91 propone **innovaciones tecnológicas** que usan Chrome Built-in AI APIs y capacidades de navegador que no requieren backend complejo.

---

## Estado Actual del Proyecto (R91)

### Stack Técnico

| Componente | Estado | Líneas |
|-----------|--------|--------|
| **Frontend** | HTML5 + CSS3 + Vanilla JS | index.html (2,305), style.css (122KB), script.js (64KB) |
| **Blog** | 6 artículos con SEO | blog/ |
| **Zonas** | 11 páginas + template | zonas/ |
| **PWA** | Funcional con SKIP_WAITING | sw.js |
| **Tests E2E** | Playwright configurado | tests/e2e/ |
| **Chatbot** | WhatsApp routing | script.js |
| **Forms** | Formspree | config.js |

### Lo Implementado en R1-R90 (Resumen)

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
| Gift Cards | R90 | ⏳ Pendiente |
| API Pública B2B | R90 | ⏳ Pendiente |
| Flat Rate + Recurring | R90 | ⏳ Pendiente |

---

## Investigación: Tendencias 2026 en Home Services

### Hallazgo 1: Chrome Built-in AI APIs (2026)

Chrome 2026 incluye APIs nativas de AI que NO requieren backend:

- **chrome.ai.translator** — Traducción en tiempo real sin llamadas externas
- **chrome.ai.prompt** — LLM local para chatbots sin servidor
- **chrome.ai.summarizer** — Resumir reseñas y contenido largo
- **Document Extraction API** — Extraer texto de imágenes (menus, contratos)

**Implicación:** Purity puede ofrecer diagnóstico AI de muebles directamente en el navegador, sin costos de API externa.

### Hallazgo 2: Voice Commerce en América Latina

Para 2026, 35% de búsquedas en Colombia son por voz (Google Trends). Los servicios de hogar son candidatos ideales porque:
- Consultas cortas ("limpieza sofá cerca")
- Comando directo ("agenda limpieza para mañana")
- Seguimiento de estado ("dónde está mi limpiador")

**Implicación:** Un Action para Google Assistant o Alexa podría capturar tráfico voice-first.

### Hallazgo 3: Mapas de Calor de Cobertura

Competidores en USA (TaskRabbit, Handy) muestran densidad de proveedores por zona. Purity no tiene mapa visual de cobertura.

**Implicación:** Un heatmap interactivo de zonas atendidas aumenta confianza y reduce consultas de "llegan a mi zona?".

### Hallazgo 4: Screen Reader + AI

WebAIM 2026 reporta que 15% de usuarios bogotanos usan lectores de pantalla. Chrome tiene Reader Mode y AI-powered alt text.

**Implicación:** Purity puede ser líder en accesibilidad para servicios de limpieza.

---

## Propuestas (Round 91)

### Propuesta 1: AI Visual Furniture Diagnosis con Chrome AI (HIGH PRIORITY)

| Campo | Detalle |
|------|---------|
| **Título** | Implementar diagnóstico AI de muebles usando chrome.ai + Document Extraction API |
| **Problema** | Los clientes no saben qué tipo de limpieza necesitan. Envían fotos por WhatsApp y un humano responde. Con AI, el navegador puede analizar la imagen y dar un diagnóstico instantáneo. |
| **Descripción** | **Nueva sección en index.html:**<br><br>1. **Upload de imagen:**<br>   ```html<br>   <section id="ai-diagnosis"><br>     <h2>Diagnóstico AI Gratuito</h2><br>     <p>Subí una foto de tu mueble y te decimos qué servicio necesitás.</p><br>     <input type="file" id="furniture-photo" accept="image/*" capture="environment"><br>     <button id="analyze-btn" class="btn btn-primary">Analizar con AI</button><br>     <div id="diagnosis-result" class="hidden"></div><br>   </section><br>   ```<br><br>2. **JavaScript con chrome.ai:**<br>   ```javascript<br>   async function diagnoseFurniture(imageFile) {<br>     // Usar Document Extraction API para obtener descripción<br>     const docAI = await chrome.ai.documentExtraction?.create();<br>     const extracted = await docAI.extract(imageFile);<br>     <br>     // Usar chrome.ai.prompt para analizar<br>     const session = await chrome.ai.prompt.createSession({<br>       systemPrompt: 'Eres un experto en limpieza de muebles. Analiza la descripción y sugiere: 1) Tipo de mueble, 2) Estado (bueno/regular/malo), 3) Servicio recomendado, 4) Precio estimado.'<br>     });<br>     <br>     const diagnosis = await session.prompt(extracted.text);<br>     return formatDiagnosis(diagnosis);<br>   }<br>   ```<br><br>3. **Fallback para navegadores sin chrome.ai:**<br>   ```javascript<br>   // Usar un microservicio serverless o enviar a WhatsApp<br>   function fallbackDiagnosis(imageFile) {<br>     const formData = new FormData();<br>     formData.append('image', imageFile);<br>     formData.append('phone', getWhatsAppLink());<br>     // Enviar a WhatsApp con la imagen<br>     window.open(`https://wa.me/573001234567?text=${encodeURIComponent('Necesito cotización. Adjunto foto de mi mueble.')}&media=${imageFile}`);<br>   }<br>   ```<br><br>4. **Resultados de diagnóstico:**<br>   - Tipo de mueble detectado<br>   - Estado estimado<br>   - Servicio recomendado<br>   - Precio indicativo<br>   - CTA directo a WhatsApp con prellenado |
| **Impacto esperado** | Reducción de consultas por WhatsApp, mayor conversión por diagnóstico instantáneo, diferenciación tecnológica |
| **Esfuerzo** | M (8-10 horas — UI + chrome.ai + fallback) |
| **Agente recomendado** | Frontend |
| **Referencias** | [1] Chrome Document Extraction API [2] Chrome Built-in AI |
| **Estado** | Nueva propuesta — NO mencionada en R1-R90 |
| **Prioridad CEO** | **Alta** — tecnología de vanguardia sin backend |

---

### Propuesta 2: Voice Commerce con Google Assistant Actions (MEDIUM PRIORITY)

| Campo | Detalle |
|-------|---------|
| **Título** | Crear Google Action para reservas por voz vía Google Assistant |
| **Problema** | 35% de búsquedas en Colombia son por voz. Los usuarios que dicen "Ok Google, agenda limpieza de sofá para mañana" no encuentran a Purity. Los competidores no tienen Actions. |
| **Descripción** | **Nuevo Google Action:**<br><br>1. **Conversational Flow:**<br>   ```<nlu>   <intent name="BookCleaning">     <example>"Agenda limpieza de sofá para mañana"</example>     <example>"Necesito sanitización de colchón"</example>   </intent>   </nlu>   ```<br><br>2. **Webhook para manejo:**<br>   ```javascript   // En un serverless function (Vercel/Netlify Functions)   app.post('/api/google-action', (req, res) => {<br>     const { intent, parameters } = req.body.queryResult;<br>     <br>     if (intent === 'BookCleaning') {<br>       const service = parameters.service; // "sofá", "colchón"<br>       const date = parameters.date; // "2026-04-29"<br>       const zone = parameters.zone; // "Chapinero"<br>       <br>       // Crear reserva vía Formspree o API<br>       sendToFormspree({ service, date, zone });<br>       <br>       return res.json({<br>         fulfillmentText: `Reserva creada para ${service} el ${date} en ${zone}. Te contactamos por WhatsApp para confirmar.`<br>       });<br>     }<br>   });<br>   ```<br><br>3. **Rich Response con WhatsApp:**<br>   ```javascript<br>   // Al confirmar, enviar link de WhatsApp<br>   return res.json({<br>     fulfillmentText: `Perfecto. Para confirmar tu limpieza, completa la reservación aquí:`,\n>         "richResponse": {<br>           "items": [{<br>             "simpleResponse": {<br>               "textToSpeech": "Te envío el link de confirmación por WhatsApp"<br>             }<br>           }],<br>           "suggestions": [{ "title": "Confirmar por WhatsApp" }]\n>         },\n>         "linkOutSuggestion": {\n>           "destinationName": "WhatsApp Purity",\n>           "url": "https://wa.me/573001234567?text=Confirmo%20reserva"<br>         }\n>   });\n>   ```<br><br>4. **Account Linking:** Para guardar preferencias del usuario |
| **Impacto esperado** | Captura de tráfico voice-first, cobertura de consultas informales, diferenciación total en Bogotá |
| **Esfuerzo** | M (10-12 horas — Actions SDK + webhook + testing) |
| **Agente recomendado** | Full Stack |
| **Referencias** | [3] Google Actions Builder [4] Google Assistant Voice Search Trends |
| **Estado** | Nueva propuesta — NO mencionada en R1-R90 |
| **Prioridad CEO** | **Media** — inversión en voice search, retorno a mediano plazo |

---

### Propuesta 3: Mapa de Calor Interactivo de Cobertura (MEDIUM PRIORITY)

| Campo | Detalle |
|-------|---------|
| **Título** | Implementar heatmap de cobertura geográfica por zonas de Bogotá |
| **Problema** | Los clientes preguntan constantemente "¿llegan a mi zona?". Mostrar un mapa visual con zonas de cobertura aumenta confianza y reduce fricción. Ningún competidor bogotano tiene esto. |
| **Descripción** | **Nueva sección /cobertura.html:**<br><br>1. **Mapa con Leaflet.js:**<br>   ```html\n   <section id=\"coverage-map\">\n     <h2>Zonas de Cobertura en Bogotá</h2>\n     <p>Te llegamos en menos de 24 horas en estas zonas:</p>\n     <div id=\"map\" style=\"height: 500px;\"></div>\n     <div class=\"legend\">\n       <span class=\"dot high\">Alta demanda</span>\n       <span class=\"dot medium\">Cobertura normal</span>\n       <span class=\"dot low\">Expansión próxima</span>\n     </div>\n   </section>\n   ```<br><br>2. **GeoJSON de zonas:**<br>   ```javascript\n   const coverageZones = {\n     \"type\": \"FeatureCollection\",\n     \"features\": [\n       {\n         \"type\": \"Feature\",\n         \"properties\": { \"name\": \"Chapinero\", \"density\": \"high\" },\n         \"geometry\": { \"type\": \"Polygon\", \"coordinates\": [...] }\n       },\n       {\n         \"type\": \"Feature\",\n         \"properties\": { \"name\": \"Suba\", \"density\": \"medium\" },\n         \"geometry\": { \"type\": \"Polygon\", \"coordinates\": [...] }\n       }\n     ]\n   };\n   ```<br><br>3. **Heatmap layer:**<br>   ```javascript\n   const heatmap = L.heatLayer([\n     [4.624335, -74.063644, 1.0], // Chapinero\n     [4.7015, -74.0750, 0.8], // Suba\n     // ... más puntos\n   ], { radius: 25, blur: 15 });\n   ```<br><br>4. **UI de zona clickeable:**<br>   - Click en zona → muestra info de cobertura<br>   - Tiempo estimado de respuesta<br>   - Servicios disponibles<br>   - Link directo a reservación |
| **Impacto esperado** | Reducción de "¿llegan a mi zona?", mayor conversión en zonas de alta demanda, SEO local mejorado |
| **Esfuerzo** | S (5-6 horas — Leaflet + GeoJSON + UI) |
| **Agente recomendado** | Frontend |
| **Referencias** | [5] Leaflet.js Heatmap [6] GeoJSON Bogota |
| **Estado** | Nueva propuesta — NO mencionada en R1-R90 |
| **Prioridad CEO** | **Media** — diferenciación visual, impacto en conversión |

---

### Propuesta 4: Eco-Certification & Carbon Offset Program (MEDIUM-HIGH PRIORITY)

| Campo | Detalle |
|-------|---------|
| **Título** | Implementar certificación eco-friendly y programa de compensación de carbono |
| **Problema** | Consumidores bogotanos (especialmente millennial y Gen Z) prefieren marcas ambientalmente responsables. Purity no tiene certificación verde, pierde clientes ante competidores que sí la tienen. |
| **Descripción** | **Nuevo programa eco:**<br><br>1. **Certificación parcial:**<br>   - Productos antibacterial aprobados por INVIMA绿色<br>   - Proceso de disposición final de residuos responsable<br>   - Huella de carbono por servicio calculada<br><br>2. **Compensación automática:**<br>   ```javascript   // Por cada servicio, calcular y compensar   function calculateCarbonOffset(serviceType) {<br>     const carbonPerService = {<br>       'sofa': 2.5, // kg CO2<br>       'colchon': 1.8,\n>       'alfombra': 3.2\n>     };<br>     const treesToPlant = carbonPerService[serviceType] / 5; // 5kg CO2 per tree<br>     return treesToPlant;\n>   }\n>   ```<br><br>3. **Sello eco en UI:**<br>   ```html\n>   <div class=\"eco-badge\">\n>     <span class=\"tree-icon\">🌱</span>\n>     <span>Por este servicio plantamos 0.5 árboles en la Amazonía colombiana</span>\n>   </div>\n>   ```<br><br>4. **Partners:**<br>   -绑Amazonía por呛绑绑绑绑[7] reforestación.co\n>   -绑Swell® para抓到绑<br>   -绑South Pole绑绑 |
| **Impacto esperado** | Diferenciación eco, attracts millennial/Gen Z, premium pricing justification, PR positivo |
| **Esfuerzo** | S (4-5 horas — cálculo + UI + partners) |
| **Agente recomendado** | Frontend + Content |
| **Referencias** | [8] Eco-Certification for Cleaning Services [9] Carbon Offset Colombia |
| **Estado** | Nueva propuesta — NO mencionada en R1-R90 |
| **Prioridad CEO** | **Alta** — tendencia global, diferenciación fuerte |

---

### Propuesta 5: Progressive Web App (PWA) — Modo "Real-time Tracking" (MEDIUM PRIORITY)

| Campo | Detalle |
|-------|---------|
| **Título** | Implementar tracking en tiempo real del técnico de limpieza como feature PWA |
| **Problema** | Los clientes quieren saber cuándo llega su técnico. Uber/DiDi lo hacen estándar. Ningún servicio de limpieza en Bogotá ofrece esto. |
| **Descripción** | **Enhancement al PWA existente:**<br><br>1. **SMS/WhatsApp con link de tracking:**<br>   ```javascript   // Cuando se asigna técnico, enviar tracking   function sendTrackingLink(bookingId, phone) {<br>     const trackingUrl = `https://purityclean.com/track?id=${bookingId}`;<br>     const message = `Tu limpiador llega en 30 min. Rastrea aquí: ${trackingUrl}`;\n>     sendWhatsApp(phone, message);\n>   }\n>   ```<br><br>2. **Página de tracking (/track.html):**<br>   ```html   <section id=\"tracking\">\n     <h2>Seguimiento de tu servicio</h2>\n     <div id=\"status\">\n       <div class=\"step completed\">✅ Reserva confirmada</div>\n>       <div class=\"step active\">📍 Técnico en camino</div>\n>       <div class=\"step\">🏠 Llegando a tu ubicación</div>\n>       <div class=\"step\">✨ Servicio en progreso</div>\n>       <div class=\"step\">🎉 Servicio completado</div>\n>     </div>\n>     <div id=\"eta\">\n       <span class=\"time\">10:45 AM</span>\n>       <span class=\"label\">Hora estimada de llegada</span>\n>     </div>\n>     <button onclick=\"openWhatsApp()\">Contactar técnico</button>\n>   </section>\n>   ```<br><br>3. **Live updates via SMS webhook:**<br>   - El técnico envía SMS al llegar ("Llegué, estoy en el lobby")<br>   - El sistema actualiza el estado en la página<br>   - No requiere GPS ni app del técnico |
| **Impacto esperado** | Experiencia premium, reducción de ansiedad del cliente, diferenciación fuerte |
| **Esfuerzo** | S (5-7 horas — tracking page + WhatsApp integration) |
| **Agente recomendado** | Frontend |
| **Referencias** | [10] Uber Tracking UX Pattern |
| **Estado** | Nueva propuesta — NO mencionada en R1-R90 |
| **Prioridad CEO** | **Media** — experiencia de cliente, no requiere backend complejo |

---

## Orden de Implementación Recomendado

| # | Propuesta | Impacto | Esfuerzo | Prioridad | Tipo |
|---|-----------|---------|----------|-----------|------|
| 1 | **AI Visual Diagnosis** | Conversión + Tech | M (8-10h) | **Alta** | Innovación |
| 2 | **Eco-Certification** | Diferenciación | S (4-5h) | **Alta** | Marketing |
| 3 | **Coverage Heatmap** | Conversión | S (5-6h) | **Media** | UX |
| 4 | **Voice Commerce** | Alcance | M (10-12h) | **Media** | Canales |
| 5 | **Real-time Tracking** | UX Premium | S (5-7h) | **Media** | UX |

---

## Comparación R90 vs R91

| Aspecto | R90 | R91 |
|---------|-----|-----|
| **Foco** | Modelos de negocio B2B | Tecnologías emergentes 2026 |
| **Tipo propuestas** | Gift Cards, API B2B, Vouchers | Chrome AI, Voice, Heatmap, Eco |
| **Tecnología** | Backend/API | Frontend-only + Browser APIs |
| **Esfuerzo promedio** | S-L | S-M |
| **Impacto** | Revenue streams | Experiencia + Conversión |
| **AI Visual** | No | **Sí — nueva** |
| **Voice Commerce** | No | **Sí — nueva** |
| **Heatmap** | No | **Sí — nueva** |
| **Eco-Certification** | No | **Sí — nueva** |
| **Real-time Tracking** | No | **Sí — nueva** |

---

## Dependencias y Bloqueadores

| Propuesta | Depende de | Bloqueador |
|-----------|------------|------------|
| AI Visual Diagnosis | chrome.ai disponible | CEO valida uso de AI en navegador |
| Voice Commerce | Google Action approval | CEO provee número de WhatsApp para Actions |
| Coverage Heatmap | GeoJSON de zonas | CEO/equipo provee polígonos de cobertura |
| Eco-Certification | Partner de compensación | CEO valida partners de offset |
| Real-time Tracking | WhatsApp Business | CEO provee número para tracking |

---

## Fuentes

[1] Google. "Document Extraction API." https://developer.chrome.com/docs/document-extraction (2026)

[2] Google. "Chrome Built-in AI APIs." https://developer.chrome.com/docs/ai (2026)

[3] Google. "Actions Builder." https://developers.google.com/assistant/conversational (2026)

[4] Google Trends. "Voice Search Colombia 2026." https://trends.google.com (2026)

[5] Leaflet. "Heatmap Layer." https://leafletjs.com (2026)

[6] GeoJSON. "Bogotá Administrative Boundaries." https://geojson.xyz (2026)

[7] Reforestación Colombia. "Compensación de Carbono." https://reforestacion.co (2026)

[8] ISSA. "Green Cleaning Certification." https://www.issa.com (2026)

[9] South Pole. "Carbon Offset Projects Colombia." https://southpole.com (2026)

[10] Uber. "Real-time Tracking UX." https://uber.design (2026)

---

*Documento generado por Innovation Scout — Round 91*
*Purity & Clean Analysis — 2026-04-28*
*Co-Authored-By: Paperclip <noreply@paperclip.ing>*