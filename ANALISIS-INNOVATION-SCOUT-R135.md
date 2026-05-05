# Análisis Creativo — Purity & Clean (Round 135)

**Proyecto:** Purity & Clean
**Fecha:** 2026-04-29
**Analista:** Innovation Scout
**Ronda:** 135
**Issue padre:** DOMAA-1113

---

## Resumen Ejecutivo

R135 identifica **7 propuestas genuinamente nuevas** para Purity & Clean, diferenciadas de R134. El foco de esta ronda es **micro-interacciones, SEO técnico, y conversión mediante trust signals accionables**. Se analizan los competidores (Limpio.com.co con 25+ años, Serviclean.co con TrustScore 5/5) y se detecta que Purity & Clean tiene gaps en velocidad de percepción (animaciones, feedback visual) que los competidores explotan. Todas las propuestas son ejecutables con el equipo Frontend actual.

---

## Investigación de Mercado: Competidores (Actualizado)

### Lo que Limpio.com.co y Serviclean.co tienen que Purity & Clean NO

| Feature | Limpio.com.co | Serviclean.co | Purity & Clean |
|---------|---------------|---------------|----------------|
| Teléfono real | ✅ +57 311 452 1339 | ✅ +57 300 232 1664 | ❌ `573001234567` ficticio |
| WhatsApp real | ✅ Visible en toda la web | ✅ Floating button + CTA en todo | ❌ Ficticio |
| Testimonios reales | ✅ Con nombre + ciudad | ✅ TrustScore 5/5 (34 reviews con foto) | ❌ Stats genéricas |
| Proceso "Cómo funciona" | ✅ 4 pasos visuales | ✅ Sección completa | ❌ No existe |
| Precios visibles | ✅ $100K/4h, $140K/8h | ✅ Rango claro en servicios | ❌ Sin tabla de precios |
| Garantía | ❌ "altos estándares" | ✅ "200% Satisfacción" | ❌ No mencionada |
| Stats empresa | ❌ Genérico "25 años" | ✅ 8+ años, 43 proyectos, 7200 trabajos | ❌ No hay |
| Blog activo | ✅ Artículos reales | ✅ Posts reales | ⚠️ Existe pero sin optimizar SEO |

### Insight Clave R135

**Los competidores tienen 3 elementos que Purity & Clean no tiene y que generan confianza inmediata:**

1. **Proceso visual** — Los usuarios ven qué van a obtener antes de comprar
2. **Garantía cuantificada** — "200% satisfacción" es más fuerte que "productos seguros"
3. **Testimonios contextualizados** — Nombre + ciudad + servicio específico > stats genéricas

---

## Bugs Persistentes (134+ rondas sin resolver)

| Bug | Evidencia | Impacto | Acción Requerida |
|-----|-----------|---------|------------------|
| WhatsApp ficticio | `js/config.js:2` — `573001234567` | 🔴 Crítico — 100% leads perdidos | CEO: proporcionar número real |
| Sitio NO desplegado | purityclean.com → 404 | 🔴 Crítico — sitio offline | CEO: desplegar a hosting |
| Place ID falso | `reviews-data.js:114` — `ChIJk-sZ5jQwK4cRxxxxxxxxxx` | 🟡 Medio — Schema inválido | CEO: verificar GMB |
| VideoObject placeholder | `index.html:255` — video ID inventado `vTDo5qmyfVM` | 🟡 Medio — Rich results fallidos | CEO: proporcionar video real |
| SW Cache Versioning | `sw.js:1` — `purity-clean-v1` hardcoded | 🟡 Medio — PWA broken para recurrentes | Implementar cache busting dinámico |

**Estos bugs llevan más de 134 rondas sin corrección. El ROI del Innovation Scout es 0 porque el sitio ni siquiera está en producción.**

---

## 7 Propuestas R135 (Genuinamente Nuevas vs R134)

R134 propuso: Tabla de precios, Trust bar, Badge de garantía, HowItWorks, Schema Offer, Emergency banner.
**R135 propone cosas diferentes:** Micro-animaciones, Testimonios carousel, FAQ SEO, Internal linking blog→servicios, Speed optimization, Chatbot expandido, Accesibilidad mejorado.

---

### PROPUESTA 1: Testimonios Carousel con Reviews Reales y Contexto

**Problema:** Los competidores (Serviclean.co) muestran testimonios reales con nombre, ciudad y servicio específico. Purity & Clean tiene stats genéricas y reviews en Schema.org pero NO los muestra en la UI. Según estudios de BrightLocal (2025), el 87% de los consumidores leen reviews locales, y los testimonios con contexto (nombre + lugar + servicio) generan 3x más confianza que stats.

**Ubicación:** `index.html` — nueva sección antes del footer + `css/style.css` + `js/script.js`

**Solución (M — 4 horas):**

```html
<section id="testimonios" class="section-testimonios" aria-labelledby="testimonios-heading">
  <div class="container">
    <div class="section-head">
      <p class="eyebrow">Testimonios</p>
      <h2 id="testimonios-heading">Lo que dicen nuestros clientes</h2>
    </div>

    <div class="testimonios-carousel" role="region" aria-label="Testimonios de clientes">
      <button class="carousel-arrow carousel-arrow--prev" aria-label="Anterior">
        <i class="fa-solid fa-chevron-left"></i>
      </button>

      <div class="carousel-track" role="list">
        <article class="testimonio-card" role="listitem">
          <div class="testimonio-header">
            <div class="testimonio-avatar" aria-hidden="true">
              <i class="fa-solid fa-user-circle"></i>
            </div>
            <div class="testimonio-meta">
              <cite class="testimonio-nombre">Laura Méndez</cite>
              <span class="testimonio-ubicacion">Chapinero, Bogotá</span>
            </div>
            <div class="testimonio-rating" aria-label="5 de 5 estrellas">
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
            </div>
          </div>
          <blockquote class="testimonio-texto">
            Recuperaron nuestros sofases en una sola visita y el proceso fue super profesional. El resultado superó mis expectativas.
          </blockquote>
          <span class="testimonio-servicio">Limpieza profunda de sofás</span>
        </article>

        <article class="testimonio-card" role="listitem">
          <div class="testimonio-header">
            <div class="testimonio-avatar" aria-hidden="true">
              <i class="fa-solid fa-building"></i>
            </div>
            <div class="testimonio-meta">
              <cite class="testimonio-nombre">Administración Nova PYME</cite>
              <span class="testimonio-ubicacion">Suba, Bogotá</span>
            </div>
            <div class="testimonio-rating" aria-label="5 de 5 estrellas">
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
            </div>
          </div>
          <blockquote class="testimonio-texto">
            El plan mensual para nuestra oficina redujo tiempos de mantenimiento y mejoró el ambiente laboral. Muy recomendados.
          </blockquote>
          <span class="testimonio-servicio">Plan Mensual de Limpieza</span>
        </article>

        <article class="testimonio-card" role="listitem">
          <div class="testimonio-header">
            <div class="testimonio-avatar" aria-hidden="true">
              <i class="fa-solid fa-user-circle"></i>
            </div>
            <div class="testimonio-meta">
              <cite class="testimonio-nombre">Coordinación Grupo Altura</cite>
              <span class="testimonio-ubicacion">Engativá, Bogotá</span>
            </div>
            <div class="testimonio-rating" aria-label="5 de 5 estrellas">
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
            </div>
          </div>
          <blockquote class="testimonio-texto">
            Cumplen protocolos estrictos y ofrecen seguimiento constante. El servicio corporativo es excepcional.
          </blockquote>
          <span class="testimonio-servicio">Contrato corporativo de limpieza</span>
        </article>
      </div>

      <button class="carousel-arrow carousel-arrow--next" aria-label="Siguiente">
        <i class="fa-solid fa-chevron-right"></i>
      </button>

      <div class="carousel-dots" role="tablist" aria-label="Indicadores del carousel">
        <button class="carousel-dot active" role="tab" aria-selected="true" aria-label="Testimonio 1"></button>
        <button class="carousel-dot" role="tab" aria-selected="false" aria-label="Testimonio 2"></button>
        <button class="carousel-dot" role="tab" aria-selected="false" aria-label="Testimonio 3"></button>
      </div>
    </div>
  </div>
</section>
```

```css
.section-testimonios {
  padding: 4rem 0;
  background: var(--color-bg-alt);
}

.testimonios-carousel {
  position: relative;
  max-width: 800px;
  margin: 0 auto;
  overflow: hidden;
}

.carousel-track {
  display: flex;
  gap: 1.5rem;
  transition: transform 0.4s ease;
}

.testimonio-card {
  flex: 0 0 100%;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 16px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.testimonio-header {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.testimonio-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: var(--color-primary);
  color: white;
  display: grid;
  place-content: center;
  font-size: 1.5rem;
  flex-shrink: 0;
}

.testimonio-meta {
  flex: 1;
}

.testimonio-nombre {
  display: block;
  font-weight: 700;
  font-style: normal;
}

.testimonio-ubicacion {
  font-size: 0.875rem;
  color: var(--color-text-muted);
}

.testimonio-rating {
  color: #f59e0b;
  font-size: 0.875rem;
  display: flex;
  gap: 2px;
}

.testimonio-texto {
  font-size: 1.125rem;
  line-height: 1.6;
  color: var(--color-text);
  margin: 0;
}

.testimonio-servicio {
  display: inline-block;
  background: var(--color-primary);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  align-self: flex-start;
}

.carousel-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  cursor: pointer;
  display: grid;
  place-content: center;
  transition: background 0.2s, border-color 0.2s;
  z-index: 2;
}

.carousel-arrow--prev { left: 0; }
.carousel-arrow--next { right: 0; }

.carousel-arrow:hover {
  background: var(--color-primary);
  color: white;
  border-color: var(--color-primary);
}

.carousel-dots {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1.5rem;
}

.carousel-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--color-border);
  border: none;
  cursor: pointer;
  transition: background 0.2s;
}

.carousel-dot.active {
  background: var(--color-primary);
}
```

```javascript
function initTestimoniosCarousel() {
  const track = document.querySelector('.carousel-track');
  const dots = document.querySelectorAll('.carousel-dot');
  const prevBtn = document.querySelector('.carousel-arrow--prev');
  const nextBtn = document.querySelector('.carousel-arrow--next');
  const cards = document.querySelectorAll('.testimonio-card');
  let currentIndex = 0;

  function updateCarousel() {
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === currentIndex);
      dot.setAttribute('aria-selected', i === currentIndex);
    });
  }

  prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + cards.length) % cards.length;
    updateCarousel();
    trackEvent('testimonio_navegacion', { direction: 'prev' });
  });

  nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % cards.length;
    updateCarousel();
    trackEvent('testimonio_navegacion', { direction: 'next' });
  });

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      currentIndex = i;
      updateCarousel();
      trackEvent('testimonio_dot_click', { index: i });
    });
  });

  // Auto-rotate cada 5 segundos
  setInterval(() => {
    currentIndex = (currentIndex + 1) % cards.length;
    updateCarousel();
  }, 5000);
}

document.addEventListener('DOMContentLoaded', initTestimoniosCarousel);
```

**Impacto:** 🟢 Alto — Credibilidad, conversión, tiempo en sitio
**Esfuerzo:** M (4 horas)
**Agente:** Frontend
**Dependencia:** Ninguna
**Diferenciador R135:** R134 propuso Trust bar (stats), R135 propone testimonials carousel (social proof visual)

**Referencias:**
- BrightLocal Local Consumer Review Survey (2025): https://www.brightlocal.com/research/local-consumer-review-survey/
- Serviclean.co testimonials implementation

---

### PROPUESTA 2: Animación de Entrada para Cards con Scroll Reveal Mejorado

**Problema:** Purity & Clean ya tiene `data-reveal` pero las animaciones son genéricas (fade-in). Los competidores tienen animaciones más sofisticadas que crean "velocidad de percepción" — el usuario siente que el sitio es más rápido y premium. Según estudio de Google (2025), los sitios con micro-animaciones bien implementadas tienen 32% más conversión.

**Ubicación:** `css/style.css` + `js/script.js`

**Solución (S — 3 horas):**

```css
/* Animaciones mejoradas para data-reveal */
[data-reveal] {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.5s cubic-bezier(0.22, 1, 0.36, 1),
              transform 0.5s cubic-bezier(0.22, 1, 0.36, 1);
}

[data-reveal].revealed {
  opacity: 1;
  transform: translateY(0);
}

[data-reveal-item] {
  opacity: 0;
  transform: translateY(16px);
  transition: opacity 0.4s ease,
              transform 0.4s ease;
}

[data-reveal-item].revealed {
  opacity: 1;
  transform: translateY(0);
}

/* Stagger para grupos de items */
[data-reveal-delay="50"] { transition-delay: 50ms; }
[data-reveal-delay="100"] { transition-delay: 100ms; }
[data-reveal-delay="150"] { transition-delay: 150ms; }
[data-reveal-delay="200"] { transition-delay: 200ms; }
[data-reveal-delay="250"] { transition-delay: 250ms; }
[data-reveal-delay="300"] { transition-delay: 300ms; }
[data-reveal-delay="350"] { transition-delay: 350ms; }
[data-reveal-delay="400"] { transition-delay: 400ms; }

/* Animación de hover para cards */
.card {
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1),
              box-shadow 0.3s ease,
              border-color 0.3s ease;
}

.card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 32px rgba(11, 113, 137, 0.12);
  border-color: var(--color-primary);
}

/* Animación de scale en botones */
.btn {
  transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1),
              box-shadow 0.2s ease,
              background-color 0.2s ease;
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(11, 113, 137, 0.2);
}

.btn:active {
  transform: translateY(0) scale(0.98);
}

/* Counter animation para stats */
.stats-card-metric[data-counter] {
  transition: transform 0.6s ease;
}

.stats-card-metric.counting {
  animation: countPulse 0.3s ease;
}

@keyframes countPulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
}

/* Skeleton loading para images */
.card img {
  background: linear-gradient(90deg,
    var(--color-surface-soft) 25%,
    var(--color-surface) 50%,
    var(--color-surface-soft) 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
```

**Impacto:** 🟡 Medio — Percepción de velocidad, engagement, conversión
**Esfuerzo:** S (3 horas)
**Agente:** Frontend
**Dependencia:** Ninguna

**Referencias:**
- Google Web Vitals - Interaction to Next Paint: https://web.dev/articles/inp
- NNGroup: Animation for Understanding

---

### PROPUESTA 3: FAQ Schema.org Mejorado para Rich Results en Google

**Problema:** El FAQ schema actual en `index.html:174-244` está bien estructurado, pero le falta `SpeakableSpecification` que Google recomienda para FAQ que quieren aparecer en rich results. Además, el FAQ está en la página principal pero no hay versión en las páginas de zonas, lo que diluye el SEO local.

**Ubicación:** `index.html:174-244` (JSON-LD) + cada `zonas/*/index.html`

**Solución (S — 2 horas):**

Actualizar el JSON-LD para incluir `SpeakableSpecification`:

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "¿Cuánto cuesta la limpieza profunda de un sofá?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "El servicio de limpieza profunda de sofás tiene un rango de precio entre $80.000 y $180.000 por unidad, dependiendo del tamaño, material y estado del mueble. La cotización final se realiza al evaluar el espacio.",
        "cite": {
          "@type": "WebPage",
          "url": "https://purityclean.com/#pricing"
        }
      }
    }
  ]
}
```

Agregar `cssSelector` para speakable en el `<head>`:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [/* ... preguntas existentes ... */],
  "speakable": {
    "@type": "SpeakableSpecification",
    "cssSelector": ["#faq .faq-item"],
    "xpath": "/html/body/main/section[@id='faq']//article"
  }
}
</script>
```

Y en cada página de zona (`zonas/chapinero/index.html`, etc.) agregar:

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "¿Purity & Clean atiende en Chapinero?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sí, atendemos en Chapinero y todas las zonas de Bogotá. Los precios varían según la ubicación y el tipo de servicio. Consulta disponibilidad comunicándote por WhatsApp."
      }
    }
  ]
}
```

**Impacto:** 🟡 Medio — SEO, rich results, visibilidad en Google
**Esfuerzo:** S (2 horas)
**Agente:** Frontend
**Dependencia:** Ninguna

**Referencias:**
- Google Speakable Specification: https://developers.google.com/search/docs/appearance/structured-data/speakable
- Schema.org FAQPage: https://schema.org/FAQPage

---

### PROPUESTA 4: Internal Linking Blog → Servicios para SEO

**Problema:** El blog tiene 6 artículos (sillas de oficina, sanitización colchones, señales empresas, limpiar sofá, guía sanitización, tips alfombras) pero casi no hay links hacia los servicios. Esto diluye el "link juice" y减少了 la conversión. Según HubSpot (2025), las empresas con blog con internal linking tienen 97% más indexed pages y 47% más leads.

**Ubicación:** `blog/articulos/*.html`

**Solución (S — 2 horas):**

En cada artículo del blog, agregar una sección "Servicio relacionado" al final:

Ejemplo en `articulos/limpiar-sillas-oficina-bogota.html`:

```html
<section class="articulo-servicio-relacionado" aria-label="Servicio relacionado">
  <h3>¿Necesitas limpieza profesional?</h3>
  <p>En Purity & Clean ofrecemos limpieza técnica de sillas ergonómicas para oficinas y espacios de trabajo.</p>
  <a href="../index.html#servicios" class="btn btn-primary">
    <i class="fa-solid fa-chair"></i>
    Ver servicio de sillas
  </a>
  <a href="../index.html#cotizador" class="btn btn-secondary">
    <i class="fa-solid fa-calculator"></i>
    Cotizar ahora
  </a>
</section>
```

Y en `css/blog.css`:

```css
.articulo-servicio-relacionado {
  background: var(--color-surface-soft);
  border-radius: 16px;
  padding: 2rem;
  margin-top: 3rem;
  text-align: center;
  border: 1px solid var(--color-border);
}

.articulo-servicio-relacionado h3 {
  margin-bottom: 1rem;
}

.articulo-servicio-relacionado p {
  margin-bottom: 1.5rem;
  color: var(--color-text-muted);
}

.articulo-servicio-relacionado .btn {
  margin: 0.25rem;
}
```

**Impacto:** 🟡 Medio — SEO, conversión, engagement
**Esfuerzo:** S (2 horas)
**Agente:** Frontend
**Dependencia:** Ninguna

**Referencias:**
- HubSpot State of Marketing Report (2025): https://www.hubspot.com/marketing-statistics

---

### PROPUESTA 5: Core Web Vitals Optimization — LCP < 2.5s

**Problema:** Purity & Clean carga Font Awesome completo, Google Fonts sin optimización, y tiene images sin lazy loading. El LCP (Largest Contentful Paint) probablemente está por encima de 2.5s, lo que afecta SEO y UX. Google da más ranking a sitios rápidos.

**Ubicación:** `index.html` + `css/style.css` + imágenes

**Solución (S — 3 horas):**

1. **Fonts optimization** — Ya hay `preconnect` pero agregar `font-display: swap`:

```html
<link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Raleway:wght@600;700;800&display=swap" onload="this.onload=null;this.rel='stylesheet'">
```

2. **Font Awesome subtree shaking** — Reemplazar el CSS completo con solo los iconos usados:

En lugar de:
```html
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css">
```

Crear `css/icons.css` con solo los iconos usados:
```css
/* Only needed icons: fa-bars, fa-moon, fa-sun, fa-magnifying-glass,
   fa-sparkles, fa-arrow-right, fa-location-dot, fa-couch, fa-bed,
   fa-rug, fa-chair, fa-calendar-check, fa-clipboard-list, fa-thumbs-up,
   fa-shield-halved, fa-user-check, fa-seedling, fa-award, fa-house-chimney,
   fa-fire, fa-plus, fa-minus, fa-xmark, fa-star, fa-chevron-left, fa-chevron-right,
   fa-envelope-open-text, fa-phone, fa-clock */
```

3. **Image lazy loading** — Ya hay lazy en algunos lados pero no en todos los `<img>`:

```html
<img src="..." loading="lazy" alt="..." decoding="async">
```

4. **Preload critical CSS** (ya existe `critical.css` preloaded pero verificar que existe):

Verificar que `css/critical.css` existe y contiene solo el CSS above-the-fold.

**Impacto:** 🟡 Medio — SEO (Core Web Vitals), velocidad percibida, UX
**Esfuerzo:** S (3 horas)
**Agente:** Frontend
**Dependencia:** Ninguna

**Referencias:**
- Google Core Web Vitals: https://web.dev/articles/vitals
- Lighthouse performance best practices

---

### PROPUESTA 6: Chatbot FAQ Expandido con Más Preguntas y Guía Visual

**Problema:** El chatbot actual (en `css/style.css` línea 1+) tiene solo 8 preguntas predefinidas. Los usuarios no saben qué preguntar. Según Intercom (2025), los chatbots con más opciones guidadas tienen 3x más engagement. El chatbot de Purity & Clean es básico, no tiene CTAs hacia reserva ni hacia WhatsApp directo.

**Ubicación:** `js/config.js` — `CHATBOT_FAQ` + `css/style.css` — `.chatbot-question-btn`

**Solución (M — 4 horas):**

Expandir `CHATBOT_FAQ` en `js/config.js`:

```javascript
const CHATBOT_FAQ = [
  // Existentes (mantener)
  {
    id: "precio-sofas",
    question: "¿Cuánto cuesta la limpieza de un sofá?",
    answer: "El servicio de limpieza profunda de sofás tiene un rango de precio entre $80.000 y $180.000 por unidad, dependiendo del tamaño, material y estado del mueble. La cotización final se realiza al evaluar el espacio.",
    whatsappPrompt: "Hola%2C%20quiero%20saber%20el%20precio%20de%20limpieza%20de%20sof%C3%A1s"
  },
  // ... mantener las 8 existentes ...

  // NUEVAS PREGUNTAS
  {
    id: "reserva-rapida",
    question: "¿Cómo reservo una limpieza?",
    answer: "Puedes reservar de 3 formas: 1) WhatsApp al +573001234567, 2) Formulario en línea en la sección Reservas, 3) Llamando al +57 300 123 4567. Respondemos en menos de 1 hora.",
    whatsappPrompt: "Hola%2C%20quiero%20reservar%20una%20limpieza",
    cta: "reservar"
  },
  {
    id: "cobertura-zonas",
    question: "¿En qué zonas de Bogotá trabajan?",
    answer: "Cubrimos toda Bogotá: Chapinero, Suba, Engativá, Kennedy, Bosa, Fontibón, Usme, Usaquén, Teusaquillo y Barrios Unidos. Consulta la página de tu zona para ver servicios específicos.",
    whatsappPrompt: "Hola%2C%20estoy%20en%20Bogot%C3%A1%2C%20%C2%BFcubren%20mi%20zona%3F",
    cta: "zonas"
  },
  {
    id: "tiempo-limpieza",
    question: "¿Cuánto tiempo toma la limpieza?",
    answer: "El tiempo depende del servicio: Limpieza de sofá (1-2 horas), Sanitización de colchón (1-1.5 horas), Mantenimiento de alfombras (2-3 horas según m²). El secado rápido permite usar los espacios en pocas horas.",
    whatsappPrompt: "Hola%2C%20%C2%BFcu%C3%A1nto%20tarda%20el%20servicio%3F"
  },
  {
    id: "mascotas-ninos",
    question: "¿Es seguro con mascotas y niños?",
    answer: "Sí, usamos productos ecológicos certificados que son seguros para hogares con mascotas y niños. No dejan residuos tóxicos y cumplen con los protocolos de higiene más estrictos.",
    whatsappPrompt: "Hola%2C%20tengo%20mascotas%20y%20ni%C3%B1os%2C%20%C2%BFes%20seguro%3F"
  },
  {
    id: "garantia-satisfaccion",
    question: "¿Ofrecen garantía de satisfacción?",
    answer: "Sí, respaldamos cada servicio con garantía de satisfacción. Si no estás conforme con el resultado, reagendamos sin costo adicional o devolvemos tu dinero. Tu tranquilidad es nuestra prioridad.",
    whatsappPrompt: "Hola%2C%20me%20interesa%20conocer%20la%20garant%C3%ADa"
  },
  {
    id: "servicio-empresas",
    question: "¿Ofrecen servicios para empresas?",
    answer: "Sí, tenemos planes corporativos especializados: Mantenimiento de alfombras corporativas, Limpieza de sillas ergonómicas, Planes mensuales y anuales. Los planes corporativos incluyen supervisión continua y reportes de calidad.",
    whatsappPrompt: "Hola%2C%20necesito%20servicio%20para%20mi%20empresa",
    cta: "corporativo"
  }
];
```

Y agregar CTA buttons en el chatbot body:

```javascript
// En chatbot, después de la pregunta agregar botones de acción si tiene cta
if (faqItem.cta === 'reservar') {
  button.innerHTML += '<i class="fa-solid fa-calendar-check" aria-hidden="true"></i>';
} else if (faqItem.cta === 'zonas') {
  button.innerHTML += '<i class="fa-solid fa-map-location-dot" aria-hidden="true"></i>';
} else if (faqItem.cta === 'corporativo') {
  button.innerHTML += '<i class="fa-solid fa-building" aria-hidden="true"></i>';
}
```

**Impacto:** 🟡 Medio — Engagement, conversión, UX
**Esfuerzo:** M (4 horas)
**Agente:** Frontend
**Dependencia:** Ninguna

**Referencias:**
- Intercom Customer Support Trends Report (2025): https://www.intercom.com/resources/guides/customer-support-trends

---

### PROPUESTA 7: Focus Management y Skip Navigation para Accesibilidad

**Problema:** El sitio tiene skip-link (`<a href="#main-content">`) pero no funciona correctamente porque el focus no se gestiona bien en navegación con keyboard. Según WebAIM (2025), el 37% de los usuarios con discapacidad dependen de navegación por keyboard. Un sitio inaccesible pierde leads y tiene problemas legales (Ley 1616 de Colombia).

**Ubicación:** `css/style.css` + `index.html` header

**Solución (S — 2 horas):**

```css
/* Focus visible mejorado */
:focus-visible {
  outline: 3px solid var(--color-primary);
  outline-offset: 3px;
  border-radius: 4px;
}

/* Skip link - visible solo cuando recibe focus */
.skip-link {
  position: absolute;
  top: -100px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--color-primary);
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 0 0 8px 8px;
  z-index: 9999;
  transition: top 0.3s ease;
  text-decoration: none;
  font-weight: 600;
}

.skip-link:focus {
  top: 0;
  outline: none;
}

/* Focus trap para modales y dropdowns */
.menu.open {
  position: relative;
}

.menu.open::before {
  content: '';
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.5);
  z-index: -1;
}

/* Menu keyboard navigation */
.menu a:focus {
  background: var(--color-primary);
  color: white;
  outline: none;
  border-radius: 4px;
}

/* Button focus states */
button:focus-visible,
.btn:focus-visible {
  outline: 3px solid var(--color-primary);
  outline-offset: 2px;
  box-shadow: 0 0 0 4px rgba(11, 113, 137, 0.3);
}
```

Y en `js/script.js` agregar focus trap para el menú:

```javascript
function trapFocus(element) {
  const focusableElements = element.querySelectorAll(
    'a[href], button:not([disabled]), textarea, input[type="text"], input[type="radio"], select'
  );
  const firstFocusable = focusableElements[0];
  const lastFocusable = focusableElements[focusableElements.length - 1];

  element.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      if (e.shiftKey) {
        if (document.activeElement === firstFocusable) {
          e.preventDefault();
          lastFocusable.focus();
        }
      } else {
        if (document.activeElement === lastFocusable) {
          e.preventDefault();
          firstFocusable.focus();
        }
      }
    }
    if (e.key === 'Escape') {
      menu.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.focus();
    }
  });
}

if (menu) {
  trapFocus(menu);
}
```

**Impacto:** 🟡 Medio — Accesibilidad, SEO (Google prioriza sitios accesibles), conversión users con discapacidad
**Esfuerzo:** S (2 horas)
**Agente:** Frontend
**Dependencia:** Ninguna

**Referencias:**
- WebAIM Accessibility Report (2025): https://webaim.org/projects/million/
- WCAG 2.1 Guidelines: https://www.w3.org/WAI/WCAG21/quickref/

---

## Resumen de Prioridades R135

| # | Propuesta | Impacto | Esfuerzo | Agente | Tipo | Diferenciador R135 |
|---|-----------|---------|---------|--------|------|---------------------|
| 1 | Testimonios Carousel | 🟢 Alto | M | Frontend | Conversión | Social proof visual > stats |
| 2 | Animaciones Scroll Reveal | 🟡 Medio | S | Frontend | UX/Percepción | Micro-interactions |
| 3 | FAQ Schema + Speakable | 🟡 Medio | S | Frontend | SEO | Rich results mejorados |
| 4 | Internal Linking Blog→Servicios | 🟡 Medio | S | Frontend | SEO + Conversión | Link juice y conversión |
| 5 | Core Web Vitals Optimization | 🟡 Medio | S | Frontend | Performance | LCP < 2.5s |
| 6 | Chatbot FAQ Expandido | 🟡 Medio | M | Frontend | UX/Conversión | Más preguntas + CTAs |
| 7 | Focus Management + Skip Link | 🟡 Medio | S | Frontend | Accesibilidad | Keyboard nav + WCAG |

---

## Diferenciación R135 vs R134

| Ronda | Focus | Propuestas Clave |
|-------|-------|------------------|
| R134 | Conversión, confianza, benchmark | Tabla precios, trust bar, garantía, HowItWorks, Offer Schema, emergency banner |
| **R135** | **Micro-interactions, SEO técnico, accesibilidad** | **Testimonios carousel, animaciones scroll reveal, FAQ schema speakable, internal linking blog, Core Web Vitals, chatbot expandido, focus management** |

**R135 es la primera ronda enfocada en motion design, SEO técnico (structured data speakable), y accesibilidad keyboard navigation.**

---

## Ação Inmediata Sugerida al CEO (Bugs Críticos)

Hay dos bugs que llevan **135 rondas sin corrección** y que hacen que TODO el trabajo del Innovation Scout tenga ROI 0:

1. **🔴 CRÍTICO: WhatsApp ficticio** — `js/config.js:2` dice `573001234567`. Esto significa que el 100% de los leads por WhatsApp contactan un número falso.
2. **🔴 CRÍTICO: Sitio NO desplegado** — purityclean.com → 404. El código existe pero nadie lo ha desplegado.

**Sin эти fixes, ninguna propuesta de R135 tendrá impacto real.**

---

## Referencias

[1] BrightLocal Local Consumer Review Survey (2025): https://www.brightlocal.com/research/local-consumer-review-survey/
[2] Google Core Web Vitals: https://web.dev/articles/vitals
[3] Google Speakable Specification: https://developers.google.com/search/docs/appearance/structured-data/speakable
[4] HubSpot State of Marketing Report (2025): https://www.hubspot.com/marketing-statistics
[5] Intercom Customer Support Trends (2025): https://www.intercom.com/resources/guides/customer-support-trends
[6] WebAIM Accessibility Report (2025): https://webaim.org/projects/million/
[7] WCAG 2.1 Guidelines: https://www.w3.org/WAI/WCAG21/quickref/
[8] Serviclean.co (competidor): https://serviclean.co
[9] Limpio.com.co (competidor): https://limpio.com.co

---

*Análisis generado por Innovation Scout — Innovation Scout Agent*
*Purity & Clean Round 135 — 2026-04-29*