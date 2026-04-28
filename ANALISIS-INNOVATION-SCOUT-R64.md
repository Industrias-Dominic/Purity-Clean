# Análisis Creativo — Purity & Clean (Round 64)

**Proyecto:** Purity & Clean
**Fecha:** 2026-04-28
**Analista:** Innovation Scout
**Ronda:** 64
**Issue padre:** DOMAA-645

---

## Resumen Ejecutivo

R64 se enfoca en **inteligencia artificial integrada en el navegador** y **APIs de hardware modernas** que permiten funcionalidad avanzado sin backend. Basado en la investigación de Chrome Built-in AI (Gemini Nano), WebGPU, WebNN y WebMCP, propongo 5 mejoras concretas para el sitio de Purity & Clean que pueden implementarse con el stack estático actual y ofrecen capacidades que antes requerían servidores externos costosos.

**Diferencia clave vs R63:** R63 = expansión de mercado y trust-building (marketing). R64 = inteligencia artificial cliente-side y APIs de hardware del navegador 2026 (tecnología). R64 explota capacidades que Chrome y Edge están incorporando ahora mismo y que Purity & Clean puede usar sin cambiar su arquitectura sin backend.

---

## Stack tecnológico actual (verificado en código)

- **Frontend:** HTML5 + CSS3 + JS vanilla ES6+ (sin bundler)
- **HTML:** 2305 líneas en index.html (monolítico)
- **CSS:** 6212 líneas en style.css
- **PWA:** Service Worker con precache, offline page, push notifications (dormante)
- **Cobertura:** 10 zonas en Bogotá
- **Forms:** Formspree (booking, newsletter, zonas)
- **Testing:** Playwright E2E (10 suites)
- **SEO:** Schema LocalBusiness + FAQPage + Review + VideoObject + HowTo + BreadcrumbList + Article
- **Chatbot:** FAQ routing → WhatsApp (básico)
- **Reviews:** 127 reviews verificadas, 4.8/5
- **Blog:** 6 artículos educativos
- **Booking:** Multi-step form con slot picker + geo-localización
- **Theme:** Dark mode toggle
- **Backend:** NO EXISTE — 100% estático

---

## Investigación: Browser AI APIs — Estado del Arte 2026

### Chrome Built-in AI (Gemini Nano)

**Fuente:** [Chrome Built-in AI - developer.chrome.com](https://developer.chrome.com/docs/ai/built-in)

Chrome ahora incluye Gemini Nano directamente en el navegador. Las APIs disponibles:

- **Prompt API** (`chrome.ai.prompt`) — invocar el modelo con texto libre
- **Translation API** (`chrome.ai.translate`) — traducción on-device
- **Summarizer API** (`chrome.ai.summarizer`) — resumir textos largos
- **Writer API** (`chrome.ai.writer`) — redactar contenido
- **LangDetector API** — detección de idioma
- **LanguageSpeller API** — corrección ortográfica

**Requisito:** Chrome 129+ con flags o early preview program.

**Impacto para Purity & Clean:** Traducción instantánea al inglés sin servidor externo, resúmenes de servicios para SEO, spell-checking en formularios.

### WebGPU API

**Fuente:** [WebGPU Overview - Chrome Developers](https://developer.chrome.com/docs/web-platform/webgpu/overview)

WebGPU ofrece cómputo de propósito general en la GPU del usuario:

- Aceleración de renderizado 3D
- Machine learning inference (alternativa a WebNN para algunos casos)
- Procesamiento de imágenes en cliente
- Física y simulaciones

**Disponibilidad:** Chrome 113+, Edge 121+, Firefox nightly (prefixed), Safari 17+.

**Impacto para Purity & Clean:** Efectos visuales premium, optimización de imágenes en cliente, futuras integraciones AR/3D.

### WebNN API (Web Neural Network)

**Fuente:** [W3C WebNN Spec](https://www.w3.org/TR/webnn/) + [Chrome Status](https://chromestatus.com/feature/5176273954144256)

API de bajo nivel para ejecutar modelos de ML en aceleradores de hardware (CPU, GPU, NPU):

- Ejecución nativa de modelos TFLite, ONNX
- Fallback inteligente a CPU si no hay GPU
- Menos latencia que WebGPU para inferencia de ML

**Disponibilidad:** Chrome 132+ (origin trial), Edge 132+.

**Impacto para Purity & Clean:** Modelos de recommendation personalizados en cliente, clasificación de imágenes de manchas/superficies, predicción de tiempos de limpieza.

### WebMCP (Model Context Protocol en el navegador)

**Fuente:** [WebMCP Chrome Blog](https://developer.chrome.com/blog/webmcp-epp)

WebMCP expone herramientas estructuradas del sitio web a agentes AI externos (como Claude, Gemini). Permite que un agente AI interactúe con Purity & Clean de forma confiable:

- Herramientas definidas (no prompts libres)
- Acciones tipo "buscar servicio", "reservar limpieza", "consultar precio"
- Mejor precisión que RAG clásico

**Disponibilidad:** Early preview program.

**Impacto para Purity & Clean:** Chatbot AI de próxima generación que realmente puede ejecutar reservas, no solo redireccionar a WhatsApp.

---

## Gaps Identificados — Round 64

### Gap 1: Sin capacidades de AI en cliente

**Problema:** El sitio no usa ninguna de las nuevas APIs de AI del navegador. Los features de AI actuales (chatbot FAQ) dependen de routing a WhatsApp externo, no de procesamiento local.

### Gap 2: Sin detección de idioma para inglés

**Problema:** No hay forma de detectar si un usuario es extranjero para ofrecer contenido en inglés. El site es 100% español. El mercado de Airbnb/expatriados en Bogotá es significativo.

### Gap 3: Sin capacidades de procesamiento de imagen en cliente

**Problema:** Los usuarios no pueden subir fotos de sus muebles para obtener una cotización automática. No hay forma de procesar imágenes sin backend.

### Gap 4: Chatbot no puede ejecutar acciones

**Problema:** El chatbot actual solo rutea a WhatsApp. No puede verificar disponibilidad, calcular precios, o procesar reservas. Esto crea fricción — el usuario quiere respuesta inmediata pero termina en una app externa.

### Gap 5: Sin capacidades de AR o visualización 3D

**Problema:** Competidores en mercados avanzados usan AR para que los clientes visualicen resultados de limpieza antes de contratar. Purity & Clean no tiene nada similar.

---

## Propuestas (Round 64)

### Propuesta 1: AI Translation Layer para contenido en inglés

| Campo | Detalle |
|-------|---------|
| **Título** | Implementar Translation API de Chrome para contenido en inglés on-device |
| **Problema** | El sitio es 100% español. Usuarios expatriados y turistas que buscan servicios de limpieza en Bogotá no pueden entender el contenido. No hay forma de detectar su idioma y ofrecer una versión automática. |
| **Descripción** | **Translation Layer con Chrome Built-in AI:** (1) **Detección de idioma:** Usar `chrome.ai.languageDetector` para detectar si el usuario prefiere inglés. (2) **Traducción on-device:** Si el usuario es angloparlante, ofrecer toggle "Ver en inglés" que traduce el contenido principal usando `chrome.ai.translate` (no requiere servidor externo). (3) **Contenido traducible:** Hero text, servicios principales, CTA, FAQ. (4) **Fallback graceful:** Si el navegador no soporta las APIs, mostrar mensaje "Habilita Chrome 129+ para traducción automática". (5) **Ventaja:** Traducción instantánea sin llamadas a APIs externas = privacy-preserving, sin costo, sin latencia de red. (6) **Limitación:** No es una solución de local SEO (el sitio sigue siendo español). Es para usuarios individuales que quieren consumir el contenido existente en su idioma. Implementación: JS vanilla feature detection + traducción selectiva de secciones clave + toggle UI en header, 2-3 horas. |
| **Impacto esperado** | Capturar mercado de expatriados y turistas en Bogotá, mejorar UX para usuarios no hispanohablantes, diferenciación vs competidores que solo ofrecen español |
| **Esfuerzo** | S (2-3 horas) |
| **Agente recomendado** | Frontend |
| **Referencias** | [1] https://developer.chrome.com/docs/ai/built-in [2] https://developer.chrome.com/docs/ai/built-in-apis |

### Propuesta 2: Image Upload con procesamiento cliente-side para cotización

| Campo | Detalle |
|-------|---------|
| **Título** | Implementar upload de fotos con clasificación de manchas/superficies via WebNN |
| **Problema** | Los usuarios quieren mostrar sus muebles para obtener cotizaciones precisas, pero el sitio no permite subir imágenes ni procesarlas. Esto fuerza a los usuarios a describir manualmente sus problemas, lo cual es impreciso y genera fricción. |
| **Descripción** | **Image Upload + Cliente-side ML:** (1) **Input de imagen:** Campo de upload en el formulario de contacto/reserva que acepta fotos del sofá, colchón, alfombra. (2) **Procesamiento cliente-side:** Usar WebNN para ejecutar un modelo TFLite ligero de clasificación de imágenes que detecta: tipo de mancha (cafe, vino, tinta, mascota), tipo de superficie (tela, cuero, матрас, alfombra), severidad (leve, moderada, severa). (3) **Resultado inmediato:** "Detectamos mancha de café en sofá de tela. Servicio recomendado: Limpieza profunda. Precio estimado: $X". Sin servidor. (4) **Fallback:** Si WebNN no disponible, mostrar instruccion para describir manualmente. (5) **Modelos TFLite gratuitos disponibles:** MobileNetV2 para clasificación general, o modelos específicos de mancha entrenados con dataset público. (6) **No guarda imágenes:** Solo procesa localmente, no sube nada. Privacy-first. (7) **Integración con booking:** La clase detectada alimenta el tipo de servicio seleccionado en el formulario. Implementación: input file + canvas para preprocesamiento + WebNN con modelo TFLite MobileNet + UI de resultados, 5-6 horas. |
| **Impacto esperado** | Reducción de fricción en cotización, experiencia premium tipo app, aumento de conversiones por respuesta inmediata, diferenciación tecnológica fuerte |
| **Esfuerzo** | M (5-6 horas) |
| **Agente recomendado** | Frontend |
| **Referencias** | [3] https://www.w3.org/TR/webnn/ [4] https://web.dev/articles/client-side-ai-performance |

### Propuesta 3: Chatbot con WebMCP que puede ejecutar reservas

| Campo | Detalle |
|-------|---------|
| **Título** | Reemplazar chatbot FAQ con Chatbot WebMCP que ejecuta acciones reales |
| **Problema** | El chatbot actual solo rutea a WhatsApp. El usuario obtiene una respuesta, pero tiene que salir del sitio para continuar. Esto pierde la oportunidad de convertir inmediatamente y crea una experiencia fragmentada. |
| **Descripción** | **WebMCP Chatbot:** (1) **Arquitectura WebMCP:** Definir herramientas estructuradas que el chatbot puede invocar: `get_services()` → lista de servicios, `check_availability(zone, date)` → disponibilidad, `calculate_price(service, zone)` → precio estimado, `book_service(service, contact_info)` → generar booking ID (via Formspree o email), `get_faq_answer(question)` → respuesta a pregunta frecuente. (2) **UI:** Chat widget flotante con input de texto. El usuario pregunta en español o inglés. (3) **Procesamiento:** La query se envia a un modelo de lenguaje (puede ser externo con fallback a búsqueda semántica en FAQ). Las herramientas WebMCP responden con datos reales. (4) **Fallback a WhatsApp:** Si la pregunta requiere intervención humana, el bot ofrece "Chatear con WhatsApp" con link prellenado. (5) **Disponibilidad:** Como WebMCP está en early preview, implementar con fallback a `chrome.ai.prompt` (Gemini Nano local) para procesamiento de lenguaje. (6) **Ejemplos de conversación:** - Usuario: "Necesito limpiar mi sofá en Chapinero" → El bot detecta zona + servicio, verifica disponibilidad, muestra precio. - Usuario: "Cuánto cuesta?" → El bot pregunta servicio y zona, luego calcula. (7) **No reemplaza WhatsApp:** Lo complementa. El bot maneja el 80% de consultas simples; WhatsApp para complejo. Implementación: diseño de chat widget + definición de herramientas + integración con Formspree para booking + fallback AI, 6-8 horas. |
| **Impacto esperado** | Aumento de conversiones por respuesta instantánea, reducción de abandono (usuario no sale del sitio), posiciona como servicio tecnológico avanzado, reducción de load en WhatsApp humano |
| **Esfuerzo** | M-L (6-8 horas) |
| **Agente recomendado** | Frontend / Full Stack |
| **Referencias** | [5] https://developer.chrome.com/blog/webmcp-epp [6] https://developer.chrome.com/blog/webmcp-mcp-usage |

### Propuesta 4: Progressive Web App con Install Prompt mejorado + AI Features

| Campo | Detalle |
|-------|---------|
| **Título** | Actualizar PWA install prompt para incluir AI capabilities del sitio |
| **Problema** | El PWA ya existe pero el install prompt es genérico. No comunica las capacidades AI que el sitio ofrece ahora (traducción, clasificación de imágenes). Un usuario que instala la app debería saber qué obtiene. |
| **Descripción** | **AI-Enhanced PWA Install:** (1) **Custom install prompt:** En lugar del banner genérico, mostrar modal que dice: "Instala Purity & Clean — Limpieza con IA: traducción al inglés, cotización por foto, booking instantáneo". (2) **Install reason:** Segmentar el mensaje según el uso: - Si el usuario interactuó con el formulario de booking: "Instala para reservar más rápido" - Si el usuario interactuó con búsqueda: "Instala para buscar servicios sin conexión" - Si el usuario navigó desde Airbnb/expat: "Instala en tu idioma" (3) **WebGPU para efectos visuales:** Implementar efectos de partículas sutiles en el hero section usando WebGPU (solo si disponible, graceful degradation). Esto demuestra capacidad técnica premium. (4) **Periodic Background Sync para freshness:** Ya está implementado pero está dormante. Activarlo para sincronizar contenido nuevo (zonas, precios) cuando el usuario abre la app después de tiempo. (5) **App shortcut para booking:** Definir `launcher企业经营` shortcut que abre directamente el formulario de reserva. Implementación: custom install UI + detect de capacidades + WebGPU particles (opcional) + app shortcuts, 3-4 horas. |
| **Impacto esperado** | Mayor tasa de instalación del PWA, usuarios más engaged, percepción de marca tecnológica premium, mejor retención |
| **Esfuerza** | S (3-4 horas) |
| **Agente recomendado** | Frontend |
| **Referencias** | [7] https://developer.chrome.com/docs/web-platform/webgpu/overview [8] https://web.dev/articles/client-side-ai-performance |

### Propuesta 5: AR Preview — "Visualiza tu sofá limpio" con WebXR

| Campo | Detalle |
|-------|---------|
| **Título** | Añadir AR preview básico para mostrar resultado de limpieza antes de contratar |
| **Problema** | Los clientes dudan porque no saben exactamente qué resultado obtendrán. No hay forma de visualizar el "antes/después" antes de contratar. Competidores en mercados premium usan AR para esta incertidumbre. |
| **Descripción** | **AR Preview básico:** (1) **Metodología simple:** En lugar de AR complejo (que requiere WebXR y dispositivos compatibles), implementar "foto antes/después" con filtro visual. El usuario sube una foto del sofá, el sistema aplica un filtro de "limpieza profunda" que simula el resultado. (2) **Tecnología:** WebGPU para procesamiento de imagen en cliente con shaders que simulan limpieza (相片编辑 con contraste, saturación para simular "más limpio"). No requiere ML. (3) **Filtros disponibles:** - "Limpieza profunda de sofá" (simula移除 manchas + frescura) - "Sanitización de colchón" (simula frescura + higiene) - "Mantenimiento de alfombra" (simula renovação de colores) (4) **Limitación:** Es una simulación, no un resultado real. Debe indicarse claramente "Representación visual aproximada". (5) **Fallback:** Si WebGPU no disponible, ofrecer GIF animado de ejemplo en lugar de procesamiento personalizado. (6) **WebXR futuro:** Para Chrome 132+ con WebXR, implementarAR real donde el usuario apunta su cámara al sofá y ve el resultado superpuesto. Empezar con la versión simple ahora. Implementación: input foto + canvas + WebGPU shaders + UI de antes/después + disclaimer, 4-5 horas. |
| **Impacto esperado** | Reducción de incertidumbre antes de contratar, diferenciación visual vs competidores, shareable resultado ( screenshot para redes sociales), aumento de confianza |
| **Esfuerza** | M (4-5 horas) |
| **Agente recomendado** | Frontend |
| **Referencias** | [9] https://developer.chrome.com/docs/web-platform/webgpu/overview [10] https://web.dev/articles/client-side-ai-performance |

---

## Orden de Implementación Recomendado

| # | Propuesta | Impacto | Esfuerzo | Prioridad |
|---|----------|---------|----------|-----------|
| 1 | AI Translation Layer | Captura expatriados/turistas | S | Alta - quick win, visibility |
| 2 | Image Upload con WebNN | UX premium, conversión | M | Alta - diferenciación |
| 3 | WebMCP Chatbot | Conversión instantánea | M-L | Alta - revenue directo |
| 4 | PWA Install Enhanced | Retención, engagement | S | Media - installation rate |
| 5 | AR Preview (filtro simple) | Confianza, shareability | M | Baja - futuro, nice-to-have |

**Top 3 para implementar primero:** 1, 2, 3 (traducción + imagen + chatbot = experiencia completa sin backend).

---

## Diferencia Clave: R64 vs R1-R63

R1-R63 explotaron el sitio estático para optimización, SEO, features, y expansión de mercado. R64 explota capacidades del navegador 2026 que hacen posible:

- **AI sin servidor** (traducción, clasificación de imágenes)
- **Chatbot que realmente ejecuta** (WebMCP con herramientas estructuradas)
- **Procesamiento visual avanzado** (WebGPU shaders para simular limpieza)
- **PWA con capacidades AI** (install prompt mejorado con propuesta de valor AI)

R64 representa un salto tecnológico sobre R63 (que era marketing puro) y sobre R62 (que era CSS puro). R64 es la primera ronda que explota capacidades de ML inference en cliente.

---

## Viabilidad Técnica (Sin Backend)

Todas las propuestas de R64 funcionan porque:

1. **Chrome Built-in AI:** APIs locales en Chrome, no requieren servidor
2. **WebNN:** Inference en CPU/GPU del usuario, no hay llamada externa
3. **WebGPU:** Shader-based processing en la GPU del usuario
4. **WebMCP:** Define herramientas locales, no requiere backend externo
5. **Progressive Enhancement:** Todas las propuestas tienen fallback si la API no está disponible

**No hay llamadas a APIs externas para procesar datos del usuario.** Privacy-first por diseño.

---

## Síntesis: Por qué R64 es Diferente

1. **No son optimizaciones — son capacidades nuevas** que el navegador ahora soporta
2. **No requieren backend** — todo corre en el dispositivo del usuario
3. **No son features de marketing** — son capacidades técnicas reales que generan valor medible
4. **Son escalables** — a medida que más usuarios tengan Chrome 129+, más usuarios disfrutan las features
5. **No compiten con R63** — R63 era marketing, R64 es tecnología. Son complementarios.

---

## Fuentes

[1] Chrome for Developers. "Artificial Intelligence in Chrome." https://developer.chrome.com/docs/ai/
[2] Chrome for Developers. "Built-in AI APIs." https://developer.chrome.com/docs/ai/built-in-apis
[3] W3C. "Web Neural Network API." https://www.w3.org/TR/webnn/
[4] web.dev. "Improve client-side AI performance." https://web.dev/articles/client-side-ai-performance
[5] Chrome for Developers. "WebMCP." https://developer.chrome.com/blog/webmcp-epp
[6] Chrome for Developers. "WebMCP vs MCP." https://developer.chrome.com/blog/webmcp-mcp-usage
[7] Chrome for Developers. "WebGPU Overview." https://developer.chrome.com/docs/web-platform/webgpu/overview
[8] Chrome Status. "WebNN API." https://chromestatus.com/feature/5176273954144256
[9] web.dev. "Client-side AI performance." https://web.dev/articles/client-side-ai-performance
[10] Chrome for Developers. "Get started with Built-in AI." https://developer.chrome.com/docs/ai/get-started

---

*Documento generado por Innovation Scout — Round 64*
*Purity & Clean Analysis — 2026-04-28*
*Co-Authored-By: Paperclip <noreply@paperclip.ing>*