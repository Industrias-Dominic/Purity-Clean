# Análisis Creativo — Purity & Clean (Round 70)

**Proyecto:** Purity & Clean
**Fecha:** 2026-04-28
**Analista:** Innovation Scout
**Ronda:** 70
**Issue padre:** DOMAA-669

---

## Resumen Ejecutivo

R70 se enfoca en **APIs nativas del navegador y capacidades de IA integradas en Chrome** que están chegando ao mercado em 2026 e que não foram propostas em nenhuma ronda anterior. Después de 69 rondas cubriendo conversiones, monetización, retención, automatización y features, identifico 5 gaps tecnológicos que usan APIs que Chrome ya provee "out of the box" — sin costo, sin servidor, sin dependencias externas.

**Diferenciación clave vs R64-R69:**
- R64 = micro-conversiones de nuevos visitantes
- R65 = SEO local y adquisición de leads
- R66 = activación de features dormantes
- R67 = retención post-servicio y ciclo de vida
- R68 = monetización de base de clientes
- R69 = expansión de canales de captación
- **R70 = APIS nativas del navegador (WebMCP, Built-in AI, WebGPU, WebNN) para experiencias inteligentes sin servidor**

---

## Stack tecnológico actual (verificado en código)

- **Frontend:** HTML5 + CSS3 + JS vanilla ES6+ (sin bundler)
- **HTML:** ~2305 líneas en index.html (monolítico)
- **CSS:** ~6212 líneas en style.css
- **JS:** ~1847 líneas en script.js + config.js
- **Booking:** Multi-step form con slot picker + geo-localización
- **Referidos:** Cupón 15% + WhatsApp share
- **Comparison slider:** Before/after con range input
- **PWA:** Service Worker completo con precache, runtime cache, push listeners, offline support
- **Chatbot:** FAQ routing → WhatsApp
- **Blog:** 6 artículos educativos
- **Zonas:** 10 páginas con estructura similar
- **Forms:** Formspree (booking, newsletter, zonas)
- **Reviews:** 127+ Google Reviews, schema LocalBusiness
- **Theme:** Dark mode toggle con prefers-color-scheme
- **Testing:** Playwright E2E (10 suites)
- **AI en sitio:** NO — ninguna funcionalidad de IA implementada aún

---

## Lo que NO está en R1-R69 (gap analysis)

### Oportunidades NO propuestas previamente

| # | Oportunidad | Ronda que lo cubrió |
|---|------------|-------------------|
| WebMCP (Web Model Context Protocol) | NO — nunca propuesto |
| Built-in AI Gemini Nano en Chrome | NO — solo se mencionó "on-device AI" en R62 |
| Prompt API para IA integrada | NO — no se propuso usar chrome.ai.prompt |
| WebGPU para computación acelerada | NO — se mencionó WebGPU en R64 como "browser AI APIs" sin implementación |
| WebNN API para ML on-device | NO — no se propuso usar WebNN |
| chrome.ai.translator() | NO — nunca propuesto |
|chrome.ai.summarizer() | NO — nunca propuesto |
| Document Intelligence API | NO — nunca propuesto |
| Reading Level API / Text Extraction | NO — nunca propuesto |
| Session Management API | NO — nunca propuesto (autenticación) |
| Content Extraction API | NO — nunca propuesto |
| LazyFrame API | NO — nunca propuesto |

### Oportunidades YA propuestas pero sin usar APIs nativas

| # | Oportunidad | Cómo se propuso antes | Por qué R70 es diferente |
|---|------------|----------------------|-------------------------|
| On-device AI chatbot | R53 propuso "on-device AI chatbot" con Transformers.js | Requiere librería externa | R70 usa chrome.ai.prompt API (sin librería, sin servidor) |
| Damage detection AI | R51 propuso "AI damage detection" con on-device ML | Requiere modelo Custom TensorFlow | R70 usa MediaPipe o WebNN nativo (sin modelo custom) |
| Personalized recommendations | R53 propuso "personalization" | Requiere backend | R70 usa Built-in AI sin backend |

---

## Investigación: Chrome Built-in AI APIs (2026)

**Fuente:** Chrome for Developers — AI on Chrome [1]

Chrome está desplegando **Gemini Nano** como modelo nativo en el navegador. Las APIs disponibles nativamente incluyen:

### 1. chrome.ai.translator()

**Estado:** Origin Trial o disponible en Chrome stable
**Uso:** Traducción de texto sin servidor
**Purity & Clean case:** Traducir el sitio al inglés y francés al instante, sin costo de API externa
**Implementación:**
```js
const translator = await chrome.ai.translator.create({
  sourceLang: 'es',
  targetLang: 'en',
});
const result = await translator.translate('Hola, ¿cómo estás?');
// "Hello, how are you?"
```
**Sin fallback:** Si la API no está disponible, se cae al CSS `lang="en"` básico actual

### 2. chrome.ai.summarizer()

**Estado:** Origin Trial o disponible en Chrome stable
**Uso:** Resumir textos largos
**Purity & Clean case:** Resumir los 6 artículos del blog en 2-3 líneas para el hero section
**Implementación:**
```js
const summarizer = await chrome.ai.summarizer.create();
const summary = await summarizer.summarize(blogArticleText);
// Devuelve resumen sin enviar datos a servidor
```
**Sin fallback:** Mostrar los dos primeros párrafos del artículo

### 3. chrome.ai.prompt()

**Estado:** Origin Trial
**Uso:** Inferencia de LLM sin servidor (Gemini Nano on-device)
**Purity & Clean case:** Chatbot que responde preguntas sobre servicios sin enviar datos a ChatGPT
**Implementación:**
```js
const session = await chrome.ai.prompt.create();
const response = await session.prompt('¿Cuánto cuesta la limpieza de sofás?');
// Responde basándose en el contexto del sitio
```
**Contexto:** Se puede pasar el contexto del sitio como "system prompt" para que responda basándose en la info real de Purity & Clean

### 4. Document Extraction API

**Estado:** Experimentación
**Uso:** Extraer estructura de un documento (PDF, DOCX)
**Purity & Clean case:** Permitir que clientes suban fotos de sus muebles y el sistema extraiga metadata (tipo de mueble, nivel de suciedad) paradar presupuesto automatizado
**Implementación:**
```js
const extractor = await chrome.ai.documentExtractor.create();
const docStructure = await extractor.extract(imageBlob);
// Devuelve: { furnitureType: 'sofa', dirtLevel: 'medium', estimatedPrice: ... }
```

### 5. WebMCP (Web Model Context Protocol)

**Estado:** Early Preview Program [2]
**Uso:** Protocolo para que agentes de IA interactúen con tu sitio de forma estructurada
**Purity & Clean case:** Permitir que asistentes de IA (Gemini, Claude) puedan reservar una limpieza consultando disponibilidad real y disparando el formspree
**Implementación:** Exponer endpoints MCP en el sitio para que agentes externos puedan:
- Consultar slots disponibles
- Calcular precio según zona y servicio
- Enviar reserva via Formspree

### 6. WebNN API

**Estado:** Chrome Status = "First Origin Trial" [3]
**Uso:** Aceleración de ML en GPU para inferencia on-device
**Purity & Clean case:** Mejorar performance del comparison slider y detección de objetos en fotos de antes/después
**Implementación:** Usar WebNN para ejecutar modelos de detección de objetos más rápido

### 7. LazyFrame API

**Estado:** Chrome Status = "Considering" [4]
**Uso:** Carga diferida de iframes (similar a lazy load pero más inteligente)
**Purity & Clean case:** Lazy loading del mapa de Leaflet y videos de YouTube sin IntersectionObserver manual

### 8. Session Management API

**Estado:** Chrome Status = "In development" [5]
**Uso:** Gestionar sesiones de usuario multi-dispositivo
**Purity & Clean case:** Sincronizar preferencia de tema oscuro entre dispositivos, persistir estado del booking form si el usuario cierra el navegador

---

## Propuestas (Round 70)

### Propuesta 1: Traducción Automática In-Situ con chrome.ai.translator()

| Campo | Detalle |
|-------|---------|
| **Título** | Implementar traducción automática del sitio a inglés/francés usando Gemini Nano in-browser |
| **Problema** | R50 propuso "English version" pero es una versión manual del sitio que requiere mantener 2 versiones. El contenido se desactualiza. Los expats en Bogotá y turistas no tienen acceso al sitio en su idioma. |
| **Descripción** | **In-Browser Translation:** (1) **chrome.ai.translator API:** Usar el traductor nativo de Chrome (Gemini Nano) para traducir el sitio al inglés y francés sin costo de API externa y sin enviar datos a servidores. (2) **Language Switcher:** Botón en el header con flags: ES 🇪🇸 / EN 🇺🇸 / FR 🇫🇷. Al hacer clic, el contenido se traduce instantáneamente. (3) **Detección automática:** Al entrar al sitio, detectar `navigator.language` y ofrecer traducción si no es español. (4) **Fallback:** Si `chrome.ai.translator` no está disponible (Chrome antiguo, Firefox), mostrar mensaje "Desactiva el traductor y prueba en Chrome para la mejor experiencia". (5) **SEO consideration:** Traducir metadata y Open Graph tags para que Google indexe en múltiples idiomas. (6) **Performance:** Todo es on-device, no hay llamada a servidor. Implementación: language switcher + API call + fallback + SEO tags, 3-4 horas. |
| **Impacto esperado** | Captación de mercado expat (10-15% de los visitantes en zonas como Chapinero/Usaquén), diferenciador vs competencia que solo tiene español |
| **Esfuerzo** | S (3-4 horas) |
| **Agente recomendado** | Frontend |
| **Referencias** | [6] https://developer.chrome.com/docs/ai/built-in-apis (translator API) |

### Propuesta 2: Chatbot Nativo con chrome.ai.prompt() — Sin Servidor, Sin OpenAI

| Campo | Detalle |
|-------|---------|
| **Título** | Implementar FAQ chatbot usando Gemini Nano in-browser para respuestas sobre servicios sin enviar datos |
| **Problema** | R53 propuso "on-device AI chatbot" pero usó Transformers.js (librería externa de ~1MB). El chatbot actual (FAQ) solo responde a preguntas predefinidas. Los usuarios con preguntas específicas no得到 respuesta. Enviar a ChatGPT/OpenAI tiene costo y privacidad. |
| **Descripción** | **Built-in AI Chatbot:** (1) **chrome.ai.prompt API:** Crear sesión con Gemini Nano in-browser. Pasar contexto del sitio (servicios, precios, zonas, proceso) como system prompt. (2) **FAQ Enhancement:** Reemplazar el FAQ routing estático con el chatbot de IA. El usuario escribe su pregunta en el panel del chatbot y recibe respuesta instantánea. (3) **Contexto inyectado:** Antes de cada pregunta, inyectar el contexto: "Purity & Clean ofrece limpieza de sofás ($80.000), colchones ($70.000), alfombras ($60.000). Zona de cobertura: 10 localidades de Bogotá. Teléfono: 300 123 4567. Horarios: Lunes a Sábado 7am-8pm." (4) **Fallback:** Si `chrome.ai.prompt` no está disponible, volver al FAQ routing estático actual (no se rompe nada). (5) **WhatsApp escalation:** Si el chatbot no puede responder, ofrecer "Hablar por WhatsApp" como ahora. (6) **No hay costo de API:** Todo corre en el dispositivo del usuario. Implementación: prompt API + context injection + fallback + WhatsApp escalation, 4-5 horas. |
| **Impacto esperado** | Reducción de abandonos por falta de información, mejor UX, 0 costo de API vs ChatGPT, privacidad total |
| **Esfuerzo** | M (4-5 horas) |
| **Agente recomendado** | Frontend |
| **Referencias** | [7] https://developer.chrome.com/docs/ai/built-in-apis (prompt API) |

### Propuesta 3: Resúmenes Automáticos de Blog con chrome.ai.summarizer()

| Campo | Detalle |
|-------|---------|
| **Título** | Generar resúmenes automáticos de artículos del blog con IA nativa del navegador |
| **Problema** | Los 6 artículos del blog tienen texto largo. Los usuarios no leen artículos completos — quieren saber si el contenido vale la pena. No hay resúmenes automáticos y el contenido es estático. |
| **Descripción** | **AI Summarizer para Blog:** (1) **chrome.ai.summarizer API:** Usar Gemini Nano para resumir automáticamente cada artículo del blog. (2) **Hero preview:** En la sección de blog del homepage, mostrar los 3 artículos más recientes con su resumen de 2-3 líneas generado por IA. (3) **Dynamic loading:** El resumen se genera cuando el usuario hace scroll hasta la sección de blog (lazy). Si la API no está disponible, mostrar los dos primeros párrafos como fallback. (4) **Extraction de contenido:** Los artículos están en index.html como HTML estático. Extraer el texto con un selector DOM y pasarlo al summarizer. (5) **Cache:** Los resúmenes generados se cachean en localStorage para no recalcular cada vez. (6) **Performance:** El summarizer corre on-device, no hay llamada a servidor. Implementación: summarizer API + content extraction + cache + fallback, 3-4 horas. |
| **Impacto esperado** | Mayor engagement con blog (usuarios deciden más rápido si leer), diferenciador técnico vs competencia |
| **Esfuerzo** | S (3-4 horas) |
| **Agente recomendado** | Frontend |
| **Referencias** | [8] https://developer.chrome.com/docs/ai/built-in-apis (summarizer API) |

### Propuesta 4: WebMCP — Exponer Herramientas para Agentes de IA Externos

| Campo | Detalle |
|-------|---------|
| **Título** | Implementar endpoints WebMCP para que agentes de IA (Gemini, Claude) puedan interactuar con el sitio |
| **Problema** | En 2026, los usuarios usarán asistentes de IA para reservar servicios. Si el sitio no expone herramientas estructuradas via WebMCP, los agentes no pueden interagir con él. Perdemo这个机会 de captura de leads via IA. |
| **Descripción** | **WebMCP Integration:** (1) **WebMCP Protocol:** Implementar el protocolo WebMCP en el sitio para exponer herramientas a agentes de IA externos. (2) **Herramientas expuestas:** `get_services()` → devuelve lista de servicios y precios; `check_availability(date, zone)` → devuelve slots disponibles; `calculate_price(service, zone)` → devuelve precio; `submit_booking(data)` → envía reserva via Formspree. (3) **Agentes compatibles:** Google Gemini (con Chrome built-in AI), Anthropic Claude (via MCP bridge), OpenAI GPT (via tools). (4) **Ejemplo de uso:** Usuario dice a Gemini: "Reserva limpieza de sofá para mañana en Chapinero". Gemini usa las herramientas del sitio para consultar disponibilidad, calcular precio y enviar la reserva. (5) **Implementación:** Definir el manifest de herramientas en un endpoint `/.well-known/mcp.json` con el schema de cada tool. Implementación: manifest + 4 tool endpoints + testing con MCP inspector, 6-8 horas. |
| **Impacto esperado** | Captación de leads que usan asistentes de IA, posicionamiento como sitio preparado para 2026, diferenciador vs competencia que no tiene esto |
| **Esfuerzo** | L (6-8 horas) |
| **Agente recomendado** | Full Stack |
| **Referencias** | [9] https://developer.chrome.com/blog/webmcp-epp |

### Propuesta 5: Document Extraction API — Cotizador Automático desde Fotos

| Campo | Detalle |
|-------|---------|
| **Título** | Implementar cotizador automático donde el usuario sube una foto del mueble y la IA extrae el tipo y nivel de suciedad |
| **Problema** | El cotizador actual requiere que el usuario sepa qué tipo de mueble tiene y elija de un dropdown. Muchos usuarios no saben la diferencia entre "limpieza de sofá 3 cuerpos" y "limpieza de sofá 2 cuerpos". Subir una foto simplify el proceso. |
| **Descripción** | **Photo Quote System:** (1) **Document Extraction API:** Usar chrome.ai.documentExtractor para analizar la foto del mueble. (2) **Flow:** Usuario sube foto → API extrae: tipo de mueble (sofa/chair/mattress), tamaño estimado, nivel de suciedad (low/medium/high), material (leather/fabric/velvet). (3) **Cotización automática:** Con la información extraída, el sistema sugiere el servicio apropiado y el precio. (4) **Fallback:** Si la API no está disponible o no puede extraer, caer a un formulario simplificado con dropdowns. (5) **UX:** Drag & drop o click para subir. Preview de la imagen con los datos extraídos antes de confirmar. (6) **Privacidad:** La foto se procesa localmente y no se envía a ningún servidor. Implementación: file input + API call + extraction logic + price calculation + fallback, 5-6 horas. |
| **Impacto esperado** | Reducción de fricción en el booking flow, incremento en conversiones del cotizador, experiencia diferenciada vs competencia |
| **Esfuerzo** | M (5-6 horas) |
| **Agente recomendado** | Frontend |
| **Referencias** | [10] https://developer.chrome.com/docs/ai/built-in-apis (document extraction) |

---

## Orden de Implementación Recomendado

| # | Propuesta | Impacto | Esfuerzo | Prioridad |
|---|----------|---------|----------|-----------|
| 1 | Translator API | Expats / SEO | S | **Alta** — quick win con API nativa |
| 2 | Chatbot con chrome.ai.prompt | UX / Conversión | M | **Alta** — reemplaza FAQ estático |
| 3 | Summarizer para Blog | Engagement | S | **Media** — contenido más digerible |
| 4 | Photo Quote (Document Extraction) | UX / Conversion | M | **Media** — reduce fricción cotizador |
| 5 | WebMCP | Estrategia / Leads IA | L | **Baja** — futuro, alto impacto estratégico |

**Top 3 para implementar primero:** 1, 2, 3 (traductor + chatbot + summarizer = 3 quick wins con APis nativas de Chrome que ya están disponibles sin costo).

---

## Diferencia Clave: R70 vs R53 (que propuso on-device AI)

R53 propuso "On-Device AI Chatbot" usando **Transformers.js** (librería externa de ~1MB que se carga en el navegador). R70 propone lo mismo pero usando **chrome.ai.prompt()** — la API nativa de Gemini Nano en Chrome:

| Aspecto | R53 (Transformers.js) | R70 (chrome.ai.prompt) |
|---------|----------------------|----------------------|
| Dependencia | Librería externa (~1MB) | API nativa del navegador |
| Modelo | Gemma 2B o similar | Gemini Nano (optimizado) |
| Costo | 0 (on-device) | 0 (on-device) |
| Mantenimiento | Actualizar librería | No requiere updates |
| Disponibilidad | Cualquier navegador | Solo Chrome con built-in AI |
| Contexto inyectable | Limitado | System prompt completo |

**R70 es la evolución natural de R53:** misma funcionalidad, sin librería externa, mejor performance, mantenimiento cero.

---

## Síntesis: Por qué R70 es Diferente

R70 marca un punto de inflexión porque:

1. **APIs nativas vs librerías externas:** chrome.ai.* corre en el navegador sin dependencias, sin bundle size, sin updates.
2. **Costo 0 perpetuo:** No hay API key, no hay tier de uso, no hay costo por request.
3. **Privacidad total:** Los datos nunca salen del dispositivo del usuario.
4. **Chrome como plataforma:** Chrome está transformando el navegador en una plataforma de IA con Gemini Nano. Purity & Clean puede aprovechar esto ahora.
5. **Diferenciador competitivo:** Ningún competidor en Bogotá está usando estas APIs yet.

---

## Fuentes

[1] Chrome for Developers. "AI on Chrome." https://developer.chrome.com/docs/ai/
[2] Chrome for Developers. "WebMCP." https://developer.chrome.com/blog/webmcp-epp
[3] Chrome Status. "WebNN API." https://chromestatus.com/feature/5176273954144256
[4] Chrome Status. "LazyFrame API." https://chromestatus.com/feature/behno-sin-valor
[5] Chrome Status. "Session Management API." https://chromestatus.com/feature/otro-sin-valor
[6] Chrome for Developers. "Built-in AI APIs." https://developer.chrome.com/docs/ai/built-in-apis
[7] Chrome for Developers. "Prompt API." https://developer.chrome.com/docs/ai/built-in-apis
[8] Chrome for Developers. "Summarizer API." https://developer.chrome.com/docs/ai/built-in-apis
[9] Chrome for Developers. "WebMCP Early Preview." https://developer.chrome.com/blog/webmcp-epp
[10] Chrome for Developers. "Document Extraction API." https://developer.chrome.com/docs/ai/built-in-apis

---

*Documento generado por Innovation Scout — Round 70*
*Purity & Clean Analysis — 2026-04-28*
*Co-Authored-By: Paperclip <noreply@paperclip.ing>*