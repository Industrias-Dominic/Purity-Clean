# Análisis Creativo — Purity & Clean (Round 135)

**Proyecto:** Purity & Clean
**Fecha:** 2026-04-29
**Analista:** Innovation Scout
**Ronda:** 135
**Issue padre:** DOMAA-1107

---

## Resumen Ejecutivo

R135 identifica 5 oportunidades basadas en Chrome Built-in AI APIs y APIs de rendimiento del navegador que no fueron cubiertas en las rondas anteriores (R1-R134). Estas APIs están disponibles en Chrome 138+ y ofrecen capacidades de inteligencia artificial del lado del cliente y monitoreo de rendimiento que el sitio actualmente no explota.

---

## Oportunidades NO Analizadas en R1-R134

### 1. Translator API — Traducción Client-Side Sin Cloud

El sitio no ofrece traducción automática del contenido. La API de traducción de Chrome permite traducir texto sin necesidad de servicios cloud, con privacidad del usuario y baja latencia.

**Estado actual:**
- El sitio solo tiene contenido en español
- No hay selector de idioma
- No hay integración con servicios de traducción
- El chatbot FAQ responde solo en español

**Benchmark:** JioHotstar usa Translator API para experiencia multilingual. El sitio de Spotify web usa traducción client-side para playlists compartidas.

**Fix:** Implementar Translator API para permitir que usuarios angloparlantes o bilingües traduzcan el contenido de servicios y blog posts. [1]

---

### 2. Prompt API — Generación de Contenido con IA Local

El Prompt API permite generar texto usando modelos de IA locales (Gemini Nano) directamente en el navegador, sin enviar datos a servidores externos.

**Estado actual:**
- El chatbot tiene respuestas predefinidas en JSON
- No hay generación dinámica de respuestas
- No hay personalización basada en contexto del usuario
- El FAQ usa respuestas estáticas

**Benchmark:** CyberAgent usa Prompt API para generar resúmenes de blogs. Sitios de reseñas lo usan para generar títulos personalizados.

**Fix:** Implementar Prompt API para generar respuestas personalizadas del chatbot, recomendaciones de servicios basadas en el perfil del usuario, y resúmenes dinámicos de reseñas. [2]

---

### 3. Summarizer API — Resúmenes AI de Contenido Largo

Permite generar resúmenes de texto largo usando IA local. Ideal para las reseñas de clientes, descripciones de servicios extensas, y artículos del blog.

**Estado actual:**
- Las reseñas se muestran completas en el carousel
- Las descripciones de servicios son extensas sin opción de "ver más"
- Los artículos del blog no tienen resumen automatizado
- No hay forma de condensar contenido para usuarios con poco tiempo

**Benchmark:** RedBus usa Summarizer API para resúmenes de reseñas de usuarios. Miravia la usa para resumir descriptions de productos.

**Fix:** Implementar Summarizer API para mostrar resúmenes de reseñas en las tarjetas, descripciones de servicios condensadas, y excerpts de artículos del blog. [3]

---

### 4. Speculation Rules API — Prerendering Predictivo

Esta API permite indicar al navegador qué páginas prerender basándose en predicciones de navegación. Es diferente del prefetching simple porque prerender significa ejecutar JavaScript y generar el DOM completo.

**Estado actual:**
- No hay especulación de navegación en el sitio
- Cuando el usuario hace hover en un enlace a una zona, no hay prerendering
- El blog y las páginas de zonas se cargan desde cero al navegar
- No hay uso de `<link rel="prefetch">` ni `<link rel="prefetch">`

**Benchmark:** Wikipedia usa especulación para prerender artículos relacionados. News sites la usan para prerender el artículo siguiente en una lista.

**Fix:** Implementar Speculation Rules API en el service worker para prerender las 3 zonas más visitadas cuando el usuario está en el homepage. También prerender el siguiente artículo del blog cuando el usuario está scrollando la lista. [4]

---

### 5. Long Animation Frames API (LoAF) — Diagnóstico de Jank

LoAF permite medir frames de animación que toman más de 50ms, identificando exactamente qué script causa blocking del main thread. Es más preciso que `PerformanceObserver` para animaciones.

**Estado actual:**
- No hay diagnóstico de performance del UI del cotizador
- No hay visibilidad sobre qué scripts causan lag en transiciones
- El scrolling enmobile no está instrumentado
- Los tests de Playwright no miden frame duration

**Benchmark:** Games y apps de productividad lo usan para identificar scripts lentos. dashboards de e-commerce lo usan para medir time-to-interactive de componentes.

**Fix:** Instrumentar las animaciones del cotizador, carousel de testimonios, y transiciones de sección con LoAF. Crear un dashboard de performance en el admin para monitorizar jank. [5]

---

## Propuestas R135 (5 Nuevas — 0% Duplicado con R1-R134)

### PROPUESTA 1: Translator API — Multilingual Support

**Problema:** El sitio solo existe en español, limitando el alcance a clientes bilingües o angloparlantes en Bogotá. No hay forma de traducir contenido dinámicamente sin servicios cloud.

**Ubicación:** `js/i18n-manager.js` + sección de idioma en footer + contenido de servicios/blog

**Solución (M — 4 horas):**

```javascript
// js/i18n-manager.js
const I18nManager = {
  translator: null,
  availableLanguages: ['es', 'en', 'fr', 'de'],

  async init() {
    if (!('Translator' in self)) {
      console.warn('Translator API not supported');
      return;
    }

    try {
      const result = await Translator.availability({
        sourceLanguage: 'es',
        targetLanguage: 'en'
      });

      if (result === 'available') {
        this.translator = await Translator.create({
          sourceLanguage: 'es',
          targetLanguage: 'en'
        });
        this.showLanguageSelector();
      }
    } catch (err) {
      console.warn('Translator initialization failed:', err);
    }
  },

  async translateContent(element, targetLang) {
    if (!this.translator) return;

    const sourceText = element.textContent;
    try {
      const result = await this.translator.translate(sourceText);
      element.textContent = result;
    } catch (err) {
      console.warn('Translation failed:', err);
    }
  },

  showLanguageSelector() {
    const selector = document.createElement('div');
    selector.className = 'language-selector';
    selector.innerHTML = `
      <button class="lang-btn" aria-label="Cambiar idioma">
        <i class="fa-solid fa-globe" aria-hidden="true"></i>
      </button>
      <div class="lang-dropdown" hidden>
        ${this.availableLanguages.map(lang => `
          <button class="lang-option" data-lang="${lang}">
            ${this.getLanguageName(lang)}
          </button>
        `).join('')}
      </div>
    `;
    document.body.appendChild(selector);
  },

  getLanguageName(code) {
    const names = { es: 'Español', en: 'English', fr: 'Français', de: 'Deutsch' };
    return names[code] || code;
  }
};

document.addEventListener('DOMContentLoaded', () => I18nManager.init());
```

**CSS para el selector:**
```css
.language-selector {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
}

.lang-btn {
  background: var(--color-primary);
  color: white;
  border: none;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

.lang-dropdown {
  position: absolute;
  bottom: 60px;
  right: 0;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  overflow: hidden;
}

.lang-option {
  display: block;
  width: 100%;
  padding: 12px 16px;
  border: none;
  background: none;
  text-align: left;
  cursor: pointer;
  transition: background 0.2s;
}

.lang-option:hover {
  background: var(--color-bg-light);
}
```

**Compatibilidad:** Chrome 138+ (solo desktop con hardware específico). Silent fail en otros browsers.

**Impacto:** 🟡 Medio-Alto — Alcance internacional, UX para bilingües
**Esfuerzo:** M (4 horas)
**Agente:** Frontend
**Dependencia:** Chrome 138+, hardware con requisitos (22GB storage, GPU/CPU específicos)

---

### PROPUESTA 2: Prompt API — Chatbot con Generación AI Local

**Problema:** El chatbot de PurityClean usa respuestas predefinidas en JSON. No puede responder a preguntas fuera del script ni personalizar según el contexto del usuario.

**Ubicación:** `js/chatbot.js` + integración con Prompt API

**Solución (M — 4 horas):**

```javascript
// js/chatbot-ai.js
const ChatbotAI = {
  session: null,
  promptModel: null,

  async init() {
    if (!('PromptSession' in self)) {
      console.warn('Prompt API not supported');
      this.initFallbackChatbot();
      return;
    }

    try {
      this.promptModel = await PromptSession.create({
        language: 'es'
      });
      this.enableAIChat();
    } catch (err) {
      console.warn('Prompt API init failed:', err);
      this.initFallbackChatbot();
    }
  },

  async generateResponse(userMessage, context) {
    if (!this.promptModel) return null;

    const systemPrompt = `Eres un asistente de Purity & Clean, empresa de limpieza en Bogotá.
Respondes en español, de forma amable y profesional.
Solo respondes sobre servicios de limpieza, precios, zonas de cobertura y reservas.
Si te preguntan algo fuera de ese tema, indicas que no tienes esa información y ofreces contactar a la empresa.`;

    const fullPrompt = `${systemPrompt}

Contexto del usuario: ${context}
Mensaje del usuario: ${userMessage}
Respuesta:`;

    try {
      const result = await this.promptModel.prompt(fullPrompt);
      return result.toString();
    } catch (err) {
      console.warn('Prompt generation failed:', err);
      return null;
    }
  },

  enableAIChat() {
    // Reemplazar respuestas estáticas del chatbot con generación AI
    const originalHandleMessage = window.handleChatbotMessage;
    window.handleChatbotMessage = async (userMessage) => {
      const aiResponse = await this.generateResponse(
        userMessage,
        this.getUserContext()
      );

      if (aiResponse) {
        this.showMessage(aiResponse, 'ai');
      } else {
        // Fallback a respuestas predefinidas
        originalHandleMessage(userMessage);
      }
    };
  },

  getUserContext() {
    // Capturar contexto del usuario para personalización
    const zone = localStorage.getItem('selectedZone') || 'no especificada';
    const service = localStorage.getItem('lastViewedService') || 'no especificado';
    return `Zona de interés: ${zone}, Servicio visto: ${service}`;
  }
};

document.addEventListener('DOMContentLoaded', () => ChatbotAI.init());
```

**Compatibilidad:** Chrome 138+ desktop con requisitos de hardware. Silent fail con fallback a chatbot actual.

**Impacto:** 🟡 Medio-Alto — Chatbot más inteligente, respuestas personalizadas
**Esfuerzo:** M (4 horas)
**Agente:** Frontend
**Dependencia:** Prompt API (Chrome 138+, hardware específico)

---

### PROPUESTA 3: Summarizer API — Resúmenes AI de Reseñas y Servicios

**Problema:** Las reseñas de clientes se muestran completas, lo que ocupa mucho espacio. Las descripciones de servicios son largas. Los artículos del blog no tienen excerpt automatizado.

**Ubicación:** `index.html` (sección testimonios) + `blog/index.html` + `js/summarizer.js`

**Solución (S — 2 horas):**

```javascript
// js/summarizer.js
const ContentSummarizer = {
  summarizer: null,

  async init() {
    if (!('Summarizer' in self)) {
      console.warn('Summarizer API not supported');
      return;
    }

    try {
      this.summarizer = await Summarizer.create({
        type: 'summary',
        length: 'short'
      });
    } catch (err) {
      console.warn('Summarizer init failed:', err);
    }
  },

  async summarize(text, maxLength = 100) {
    if (!this.summarizer) return text;

    try {
      const result = await this.summarizer.summarize(text);
      return result.summary;
    } catch (err) {
      console.warn('Summarization failed:', err);
      return text.slice(0, maxLength) + '...';
    }
  },

  async summarizeReviews(reviews) {
    const summarized = await Promise.all(
      reviews.map(review => this.summarize(review.text, 80))
    );
    return summarized;
  }
};

// Lazy loading del summarizer solo cuando el usuario scrolla hacia testimonios
const reviewsSection = document.querySelector('#testimonios');
if (reviewsSection) {
  const observer = new IntersectionObserver(async (entries) => {
    if (entries[0].isIntersecting && !ContentSummarizer.summarizer) {
      await ContentSummarizer.init();
      const summaryBtn = document.createElement('button');
      summaryBtn.className = 'btn-summarize-reviews';
      summaryBtn.textContent = 'Ver resúmenes de reseñas';
      summaryBtn.onclick = async () => {
        const reviews = document.querySelectorAll('.review-text');
        const originals = Array.from(reviews).map(r => r.textContent);
        const summaries = await ContentSummarizer.summarizeReviews(
          originals.map(t => ({ text: t }))
        );
        reviews.forEach((review, i) => {
          review.textContent = summaries[i];
        });
      };
      reviewsSection.insertBefore(summaryBtn, reviewsSection.firstChild);
    }
  });
  observer.observe(reviewsSection);
}
```

**Compatibilidad:** Chrome 138+ desktop. Silent fail con texto completo.

**Impacto:** 🟢 Medio — UX improved, más engagement con reseñas
**Esfuerzo:** S (2 horas)
**Agente:** Frontend
**Dependencia:** Ninguna (progressive enhancement)

---

### PROPUESTA 4: Speculation Rules API — Prerendering Predictivo de Zonas

**Problema:** Cuando el usuario hace hover en un enlace a una zona, la página no se prerenderiza. La navegación a zonas o blog posts tiene delay perceptible porque todo se carga desde cero.

**Ubicación:** `index.html` + `sw.js` (service worker actualizado)

**Solución (S — 2 horas):**

```javascript
// En index.html, dentro de <head> o al final del body
const speculationRules = {
  prerender: [
    {
      where: { href_matches: '/zonas/*' },
      eagerness: 'moderate'
    },
    {
      where: { selector_matches: '.blog-card' },
      eagerness: 'conservative'
    }
  ]
};

const script = document.createElement('script');
script.type = 'application/json';
script.textContent = JSON.stringify(speculationRules);
document.head.appendChild(script);

// Alternativa: mediante service worker
// En sw.js, interceptar clicks y prerender提前
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Prerender zonas cuando el usuario está en homepage
  if (url.pathname === '/' && event.request.destination === 'document') {
    const zones = ['chapinero', 'usaquen', 'teusaquillo'];
    zones.forEach(zone => {
      const prerenderUrl = `/zonas/${zone}/`;
      // speculationrules API se maneja automáticamente
    });
  }
});
```

**Enlace de zonas con hover prefetch:**
```html
<!-- En las tarjetas de zonas del homepage -->
<a href="/zonas/chapinero/"
   data-speculation-rules='{"prerender":[{"where":{"href_matches":"/zonas/chapinero/*"},"eagerness":"moderate"}]}'>
  Chapinero
</a>
```

**Compatibilidad:** Chrome 121+ (Speculation Rules API). Silent fail en otros browsers.

**Impacto:** 🟡 Medio-Alto — Performance percibida, navegación instantánea
**Esfuerzo:** S (2 horas)
**Agente:** Frontend
**Dependencia:** Ninguna (progressive enhancement)

---

### PROPUESTA 5: Long Animation Frames API — Diagnóstico de Jank en UI

**Problema:** No hay visibilidad sobre qué scripts causan que las animaciones del cotizador, carousel, o transiciones de sección pierdan frames. El performance monitoring actual es primitivo.

**Ubicación:** `js/perf-monitor.js` + dashboard admin opcional

**Solución (S — 2 horas):**

```javascript
// js/perf-monitor.js
const PerformanceMonitor = {
  loafObserver: null,

  init() {
    if (!('PerformanceObserver' in window)) return;

    // Long Animation Frames API
    if ('PerformanceLongAnimationFrameTiming' in window) {
      this.observeLoAF();
    }

    // Fallback a Performance Observer estándar
    this.observePaint();
    this.observeFCP();
  },

  observeLoAF() {
    this.loafObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.duration > 50) {
          this.reportJank(entry);
        }
      }
    });

    try {
      this.loafObserver.observe({ type: 'long-animation-frame', buffered: true });
    } catch (err) {
      console.warn('LoAF observation failed:', err);
    }
  },

  reportJank(entry) {
    // Recopilar información del frame problemático
    const jankData = {
      timestamp: Date.now(),
      duration: entry.duration,
      renderDuration: entry.renderDuration,
      styleLayoutDuration: entry.styleLayoutDuration,
      sourceLocation: this.getSourceLocation(entry)
    };

    // Enviar a analytics si está configurado
    if (window.plausible) {
      plausible('jank', {
        props: {
          duration: entry.duration,
          renderDuration: entry.renderDuration
        }
      });
    }

    // Log para desarrollo
    console.warn(`[LoAF] ${entry.duration.toFixed(2)}ms jank detected`, jankData);

    // Mostrar en UI si es crítico
    if (entry.duration > 100) {
      this.showJankWarning(entry);
    }
  },

  getSourceLocation(entry) {
    const stack = entry.scripts;
    if (!stack || stack.length === 0) return 'unknown';

    const longestScript = stack.reduce((max, s) =>
      s.duration > max.duration ? s : max, stack[0]);

    return longestScript.name || longestScript.src || 'anonymous';
  },

  showJankWarning(entry) {
    // Crear toast de diagnóstico solo en desarrollo
    if (location.hostname === 'localhost') {
      const toast = document.createElement('div');
      toast.className = 'jank-toast';
      toast.innerHTML = `
        <i class="fa-solid fa-exclamation-triangle" aria-hidden="true"></i>
        <span>Jank detectado: ${entry.duration.toFixed(0)}ms</span>
      `;
      document.body.appendChild(toast);
      setTimeout(() => toast.remove(), 3000);
    }
  },

  observePaint() {
    const paintObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.name === 'first-contentful-paint') {
          console.log(`[Performance] FCP: ${entry.startTime.toFixed(0)}ms`);
        }
      }
    });
    paintObserver.observe({ type: 'paint', buffered: true });
  },

  observeFCP() {
    // Core Web Vitals
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'navigation') {
          console.log(`[Performance] DCL: ${entry.domContentLoaded.toFixed(0)}ms`);
        }
      }
    }).observe({ type: 'navigation', buffered: true });
  }
};

document.addEventListener('DOMContentLoaded', () => PerformanceMonitor.init());
```

**Dashboard de diagnóstico (opcional):**
```javascript
// En el admin panel, agregar un widget de performance
function renderPerfDashboard() {
  return `
    <div class="perf-dashboard">
      <h3>Métricas de UI</h3>
      <div class="metric">
        <label>Jank events (30d)</label>
        <span>${getJankCount()}</span>
      </div>
      <div class="metric">
        <label>Avg frame duration</label>
        <span>${getAvgFrameDuration()}ms</span>
      </div>
      <div class="metric">
        <label>Worst jank</label>
        <span>${getWorstJank()}ms</span>
      </div>
    </div>
  `;
}
```

**Compatibilidad:** Chrome 123+ (LoAF API). Silent fail en otros browsers.

**Impacto:** 🟢 Bajo — DX improvement, debugging de performance
**Esfuerzo:** S (2 horas)
**Agente:** Frontend / QA
**Dependencia:** Ninguna (diagnóstico, no afecta usuarios)

---

## Resumen de Prioridades R135

| # | Propuesta | Impacto | Esfuerzo | Agente | Tipo | Compatibilidad |
|---|-----------|---------|---------|--------|------|----------------|
| 1 | Translator API | 🟡 Medio-Alto | M | Frontend | Multilingual | Chrome 138+ |
| 2 | Prompt API (Chatbot AI) | 🟡 Medio-Alto | M | Frontend | Chatbot | Chrome 138+ |
| 3 | Summarizer API | 🟢 Medio | S | Frontend | UX | Chrome 138+ |
| 4 | Speculation Rules API | 🟡 Medio-Alto | S | Frontend | Performance | Chrome 121+ |
| 5 | Long Animation Frames | 🟢 Bajo | S | Frontend/QA | Diagnóstico | Chrome 123+ |

---

## Diferenciación R135 vs R1-R134

**Novedades propias de R135:**
- **Translator API** — Traducción client-side sin cloud (no propuesto antes)
- **Prompt API** — Generación de contenido con IA local (no propuesto antes)
- **Summarizer API** — Resúmenes AI de contenido largo (no propuesto antes)
- **Speculation Rules API** — Prerendering predictivo de páginas (no propuesto antes)
- **Long Animation Frames API** — Diagnóstico de jank en animaciones (no propuesto antes)

**Zero duplicación** con R1-R134.

---

## Bug State — R135

| Bug | Identificado | Rondas | Estado | ¿Desbloqueable? |
|-----|-------------|--------|--------|------------------|
| WhatsApp ficticio | R1 | 134 | Sin cambio | ✅ CEO provee número |
| SW cache versioning | R1 | 134 | Sin cambio | ✅ Actualizar CACHE_NAME |
| Place ID falso | R126 | 8 | Sin cambio | ⚠️ Depende de GMB |
| VideoObject placeholder | R122 | 12 | Sin cambio | ⚠️ Depende de video real |
| Repo GitHub 404 | R128 | 6 | Sin cambio | ⚠️ Repo eliminado/privado |

---

## Referencias

[1] Translator API: https://developer.chrome.com/docs/ai/translator-api
[2] Prompt API: https://developer.chrome.com/docs/ai/prompt-api
[3] Summarizer API: https://developer.chrome.com/docs/ai/summarizer-api
[4] Speculation Rules API: https://developer.chrome.com/docs/web-platform/prerender-pages
[5] Long Animation Frames API: https://developer.chrome.com/docs/web-platform/long-animation-frames

---

*Análisis generado por Innovation Scout — Innovation Scout Agent*
*Purity & Clean Round 135 — 2026-04-29*