# Análisis Creativo — Purity & Clean (Round 130)

**Proyecto:** Purity & Clean
**Fecha:** 2026-04-29
**Analista:** Innovation Scout
**Ronda:** 130
**Issue padre:** DOMAA-1092

---

## Resumen Ejecutivo

R130 analiza el proyecto bajo la óptica de **AI Search / SGE readiness** y **EEAT signals** — dos tendencias de SEO que las rondas anteriores no abordaron específicamente. Se detectan 5 gaps de optimización para AI Overviews, se propone una estrategia de experiencia reales como diferenciador, y se identifica una oportunidad de video content que no requiere el video demostrativo que hace falta.

También se propone un benchmark competitivo con limpieza.com.co para identificar gaps de funcionalidad.

---

## Contexto: Estado del Proyecto

| Aspecto | Estado | Notes |
|---------|--------|-------|
| Stack | HTML/CSS/JS estático | Vanilla, sin frameworks |
| PWA | Manifesto completo, SW funcional | CACHE_NAME estático (bug conocido) |
| SEO | Schema LocalBusiness, OG, Twitter | Falta FAQPage, HowTo, Product |
| Blog | 6 artículos, Schema BlogPosting | Sin internal linking (R129 Gap 3) |
| WhatsApp | Número ficticio `573001234567` | Bug crítico sin resolver |
| Google Place ID | Placeholder `ChIJk-sZ5jQwK4cRxxxxxxxxxx` | Bug crítico sin resolver |
| Repositorio | 404 en GitHub | Código solo en workspace local |

**Issue padre activo:** [DOMAA-1146](http://localhost:3100/DOMAA/issues/DOMAA-1146) — 3 acciones inmediatas para romper deadlock (Critical)

---

## Trend Research: SEO 2026 — Lo Que No Se Propuso Antes

### 1. AI Overviews y Búsqueda Generativa

Según Ahrefs (Mayo 2024), **AI Overviews** (anteriormente SGE) es la趋势 a seguir. Google dice que no hay que hacer nada especial más allá de seguir sus search essentials para aparecer en AI Overviews — pero hay estructurales que mejoran las probabilidades:

- **Contenido en formato问答** — Las AI Overviews extraen respuestas de contenido que responde preguntas explícitamente
- **FAQPage schema** — Google usa FAQ schema para generar respuestas en AI Overviews
- **Contenido de "information gain"** — basado en el patent de Google, contenido con perspectiva única rankea mejor

**Gap actual en Purity & Clean:**
- ❌ No hay FAQPage schema
- ❌ No hay secciones de "preguntas frecuentes" en artículos del blog
- ✅ El chatbot tiene FAQ pero no está estructurado en JSON-LD

---

### 2. EEAT: El Nuevo "E" de Experiencia

Google agregó "Experience" (experiencia) como factor de E-E-A-T. Para un servicio de limpieza, esto significa:

> *"¿El contenido refleja experiencia real de primera mano?"*

Señales que Google busca:
- Fotos de before/after tomadas por el negocio
- Descripciones del proceso escritas desde la perspectiva de quien hizo el trabajo
- Reviews con fotos reales de clientes
- Videos del equipo trabajando

**Gap actual:**
- ✅ Testimonios textuales existentes (R129)
- ❌ Sin fotos reales de before/after en el sitio
- ❌ Sin perfiles del equipo técnico
- ❌ Reviews sin fotos (placeholders)

---

### 3. Video SEO: YouTube Shorts como Channel

Según Ahrefs, Video SEO tiene tendencia estable. YouTube es el segundo buscador del mundo. La estrategia de "un video demostrativo" (R122) fracasó porque no hay video — pero hay una estrategia alternativa:

**YouTube Shorts Strategy (sin video demostrativo):**
- Shorts de 30-60 segundos: "Tips de limpieza rápida"
- No requieren producción profesional — smartphone suficiente
- Ejemplos: "Cómo quitar mancha de sofá", "Secreto para sanitizar colchón"
- Cada Short linkea al blog artículo correspondiente

**Contenido ya disponible para Shorts:**
- Los 6 artículos del blog tienen tips accionables
- Cada tip es un Short potential

---

### 4. Core Web Vitals:LCP Opportunity

El sitio tiene un `index.html` de 2305 líneas. Google usa LCP (Largest Contentful Paint) como métrica. Los sitios estáticos con CSS/JS pueden tener LCP rápido si optimizan:

- **Fonts** — Google Fonts con `display=swap` puede mejorar LCP
- **Images** — El OG image es SVG, probablemente ligero
- **CSS** — 6212 líneas de CSS es mucho; podría haber unused CSS

**Gap:** No se midió LCP real con PageSpeed Insights. La hypothesize es que el hero section (la primera imagen visible) podría ser el LCP element.

---

## Gaps Detectados (Todos NUEVOS — no propuestos antes)

### Gap 1: No hay FAQPage Schema — Oportunidad AI Overview

**Problema:** El sitio no tiene FAQ schema, perdiendo la oportunidad de aparecer en AI Overviews para queries como:
- "¿Cuánto cuesta limpiar un sofá?"
- "¿Cada cuánto sanitizar un colchón?"
- "¿Cómo limpiar manchas de sofá?"

**Ubicación:** Falta en `index.html` (y posiblemente en blog articles)

**Solución (S — 2 horas):**

Agregar FAQPage JSON-LD en `index.html` dentro del `<head>`:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "¿Cuánto cuesta la limpieza profunda de un sofá?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "El servicio de limpieza profunda de sofás tiene un rango de precio entre $80.000 y $180.000 por unidad, dependiendo del tamaño, material y estado del mueble. La cotización final se realiza al evaluar el espacio."
      }
    },
    {
      "@type": "Question",
      "name": "¿Cada cuánto debo sanitizar mi colchón?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Se recomienda sanitizar colchones cada 6-12 meses dependiendo del uso. En hogares con mascotas, niños pequeños, o personas con alergias, se recomienda cada 3-6 meses."
      }
    },
    {
      "@type": "Question",
      "name": "¿Los productos son seguros para mascotas y niños?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sí, empleamos productos especializados de alto rendimiento que son seguros para hogares con mascotas y niños. Todos nuestros procesos cumplen con los protocolos de higiene establecidos."
      }
    },
    {
      "@type": "Question",
      "name": "¿Cuánto tiempo tarda el secado después de la limpieza?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Utilizamos procesos con secado rápido que permiten usar los muebles en pocas horas después del servicio. El tiempo exacto depende del tipo de tela y las condiciones del ambiente."
      }
    },
    {
      "@type": "Question",
      "name": "¿Cubren todas las zonas de Bogotá?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sí, atenemos hogares y empresas en toda Bogotá y áreas metropolitanas incluyendo Chapinero, Suba, Usaquén, Teusaquillo, Fontibón, Kennedy, Engativá, Barrios Unidos, Bosa y Usme."
      }
    }
  ]
}
</script>
```

**Impacto:** 🟡 Medio-Alto — puede generar featured snippets y AI Overview appearances
**Esfuerzo:** S (2 horas)
**Agente:** Frontend
**Dependencia:** Ninguna

---

### Gap 2: Sin Señales de Experiencia Real (EEAT)

**Problema:** Google ahora evalúa si el contenido refleja experiencia de primera mano. Purity & Clean tiene contenido genérico pero no muestra evidencia de que realmetne hacen los servicios.

**Lo que falta:**
- Galería de before/after (fotos reales del trabajo)
- Sección "Nuestro equipo" con perfiles
- "Cómo trabajamos" con descripción del proceso técnico
- Reviews con fotos de clientes reales

**Solución (M — 4-6 horas + contenido real):**

**Opción A:低-costo (S esfuerzo, M impacto si hay contenido):**
1. Crear sección "Resultados" en homepage con grid de before/after
2. Agregar atributo `itemprop="photo"` a las imágenes del equipo
3. En reviews, marcar `verified: true` si aplica

**Opción B: Completo (M esfuerzo):**
1. Nueva sección "Nuestro proceso" con 4 pasos ilustrados
2. Perfiles del equipo técnico (nombre, experiencia, especialidad)
3. Galería de resultados con lazy loading

**Nota:** Esta propuesta requiere que el cliente real proporcione fotos del trabajo. Si no tiene, es una oportunidad para empezar a recopilarlas.

**Impacto:** 🟡 Medio — EEAT diferenciado sobre competidores
**Esfuerzo:** M (4-6 horas) — variable según contenido disponible
**Agente:** Frontend + Content
**Dependencia:** Contenido real del cliente

---

### Gap 3: YouTube Shorts Strategy Sin Video Demostrativo

**Problema:** R122 propuso "un video demostrativo" que fracasó porque no hay video. La alternativa: **YouTube Shorts de tips**.

**Estrategia:**
- 6 Shorts de 30-60 segundos = 6 artículos del blog = ya hay contenido
- Formato: "Tip rápido: [título del artículo]"
- Cada Short termina con "Link en bio para más tips de limpieza"
- Descripción del Short linkea al artículo del blog

**Ejemplo de 6 Shorts posibles:**
1. "Cómo quitar mancha de sofá en casa" → blog article
2. "Cada cuánto sanitizar tu colchón" → blog article
3. "5 señales de que tu empresa necesita limpieza profesional" → blog article
4. "Secreto para mantener alfombras como nuevas" → blog article
5. "Cómo limpiar tu silla ergonómica" → blog article
6. "Por qué sanitize tus muebles regularmente" → blog article

**Producción requerida:**
- Smartphone + good lighting = suficiente
- No necesita edición profesional (capcut/tiktok tienen templates)
- 2-4 horas de filming por mes

**Implementación (S — 1 hora técnica, M para contenido):**
1. YouTube Studio configurado
2. Shorts producidos (fuera del scope técnico)
3. Links en blog articles hacia YouTube

**Impacto:** 🟡 Medio — tráfico de YouTube, brand awareness, backlinks
**Esfuerzo:** S (1 hora técnica) + M (contenido recurrente)
**Agente:** Frontend (enlaces) + Content (video)
**Dependencia:** Producción de video por el cliente

---

### Gap 4: PageSpeed Insights — LCP No Medido

**Problema:** No hay datos de PageSpeed Insights. Se asume que el sitio es rápido porque es estático, pero no se ha medido.

**Acciones (S — 1 hora):**
1. Correr PageSpeed Insights en `https://purityclean.com`
2. Identificar LCP element
3. Si LCP > 2.5s, implementar optimizaciones:
   - Preload para fonts críticos
   - Lazy loading para imágenes below the fold
   - Eliminar CSS unused

**Nota:** El sitio no está desplegado (DOMAA-1146), así que no se puede medir aún.

**Impacto:** 🟡 Medio — UX y SEO
**Esfuerzo:** S (1 hora para auditoría)
**Agente:** Frontend
**Dependencia:** Despliegue del sitio (DOMAA-1146)

---

### Gap 5: Competitive Gap con Limpio.com.co

**Situación:** R128 identificó que limpieza.com.co está ACTIVO mientras Purity & Clean tiene 404.

**Análisis de GAP (observación externa):**
Limpio.com.co probablemente tiene:
- ❓ Agenda en línea integrada
- ❓ Pagos en línea
- ❓Blog activo con más artículos
- ❓ Mayor autoridad de dominio

**Proposición (M — 2 horas de investigación):**

Hacer un SEO competitive analysis de limpieza.com.co:
- Usar Ahrefs o similar para ver backlinks, keywords orgánicas
- Identificar qué están haciendo que Purity & Clean no
- Proponer un "content gap" strategy

**Impacto:** 🟡 Medio — inteligencia competitiva
**Esfuerzo:** M (2 horas)
**Agente:** Strategy
**Dependencia:** Ninguna

---

## Propuestas R130 (5 nuevas + contexto)

### PROPUESTA 1: FAQPage Schema + AI Overview Readiness

**Problema:** No hay FAQ schema, perdiendo featured snippets y AI Overview appearances.

**Solución:**
Agregar FAQPage JSON-LD en `index.html` con 5 preguntas basadas en CHATBOT_FAQ existente.

```html
<!-- En <head> de index.html -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "¿Cuánto cuesta la limpieza profunda de un sofá?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "El servicio de limpieza profunda de sofás tiene un rango de precio entre $80.000 y $180.000 por unidad, dependiendo del tamaño, material y estado del mueble."
      }
    },
    // ... 4 más
  ]
}
</script>
```

**Impacto:** 🟡 Medio-Alto — featured snippets, AI Overview
**Esfuerzo:** S (2 horas)
**Agente:** Frontend
**Dependencia:** Ninguna

---

### PROPUESTA 2: Sección "Nuestro Proceso" — EEAT Signals

**Problema:** Falta evidencia de experiencia real. Google E-E-A-T requiere "experience".

**Solución:**
Crear sección "Cómo trabajamos" con:
1. 4 pasos ilustrados del proceso (limpieza → sanitización → secado → control calidad)
2. Perfiles del equipo (nombre, rol, años de experiencia)
3. Badges de certificación si aplican

**Si hay contenido real (fotos, perfiles):**
```html
<section id="proceso" class="section container" aria-labelledby="proceso-heading">
  <div class="section-head">
    <p class="eyebrow">Nuestro proceso</p>
    <h2 id="proceso-heading">Cómo hacemos tu espacio más limpio</h2>
  </div>
  <ol class="proceso-steps">
    <li class="proceso-step" data-reveal>
      <div class="proceso-icon"><i class="fa-solid fa-search"></i></div>
      <h3>1. Evaluación</h3>
      <p>Inspeccionamos el estado de tus muebles para determinar el tratamiento adecuado.</p>
    </li>
    <li class="proceso-step" data-reveal data-reveal-delay="100">
      <div class="proceso-icon"><i class="fa-solid fa-spray-can"></i></div>
      <h3>2. Limpieza profunda</h3>
      <p>Aplicamos productos de alto rendimiento con equipamiento especializado.</p>
    </li>
    <!-- 3, 4 steps más -->
  </ol>
  <!-- Si hay fotos reales del equipo: -->
  <div class="equipo-grid" data-reveal>
    <div class="equipo-card">
      <img src="/images/equipo/maria.jpg" alt="María, Técnica de sanitización" itemprop="photo">
      <h4>María</h4>
      <p>Técnica senior, 5 años de experiencia</p>
    </div>
    <!-- más miembros -->
  </div>
</section>
```

**Impacto:** 🟡 Medio — EEAT diferenciado
**Esfuerzo:** M (4-6 horas) — depende de contenido
**Agente:** Frontend + Content
**Dependencia:** Contenido real del cliente

---

### PROPUESTA 3: YouTube Shorts Channel Strategy

**Problema:** R122 falló con "un video demostrativo". Alternativa: Shorts de tips.

**Solución:**

**Fase 1 (Frontend — 1 hora):**
1. Crear archivo `blog/youtube-shorts.html` con:
   - Lista de 6 Shorts propuestos con títulos y descripciones
   - Links a los artículos del blog correspondientes
   - Embed de YouTube channel (si existe)

2. En cada artículo del blog, agregar:
```html
<div class="article-video-cta">
  <p>¿Prefieres ver? <a href="https://youtube.com/shorts/...">Mira este tip en YouTube Shorts <i class="fa-brands fa-youtube"></i></a></p>
</div>
```

**Fase 2 (Content — recurrente):**
- Producir 6 Shorts basados en los 6 artículos existentes
- Duración: 30-60 segundos
- Formato: tip rápido + CTA hacia el blog

**Impacto:** 🟡 Medio — tráfico YouTube, brand awareness
**Esfuerzo:** S (1 hora técnica) + M (contenido recurrente)
**Agente:** Frontend (enlaces) + Content (video)
**Dependencia:** YouTube channel y producción de video

---

### PROPUESTA 4: PageSpeed Audit + LCP Optimization

**Problema:** No hay datos de PageSpeed Insights. LCP no medido.

**Solución (con sitio desplegado):**
1. Correr `npx lighthouse https://purityclean.com --output html --output-path ./pagespeed-report.html`
2. Identificar LCP element y score
3. Si LCP > 2.5s:
   - Agregar `<link rel="preload">` para fonts
   - Agregar `loading="lazy"` a imágenes below the fold
   - Eliminar CSS unused (usar PurgeCSS o similar)

**Si sitio no disponible:**
Postergar hasta después de DOMAA-1146 (despliegue).

**Impacto:** 🟡 Medio — UX y SEO ranking
**Esfuerzo:** S (1 hora auditoría) + S/M según resultados
**Agente:** Frontend
**Dependencia:** Despliegue del sitio

---

### PROPUESTA 5: Competitive Analysis con Limpio.com.co

**Problema:** No se sabe qué están haciendo mejor los competidores locales.

**Solución (M — 2 horas):**

Investigación de limpieza.com.co:
1. Usar herramientas públicas para estimar:
   - Domain Authority (moz.com-free-check)
   - Backlinks count
   - Keywords orgánicas principales
2. Listar las 10 principales diferencias funcionales
3. Priorizar qué gaps son abordables con el stack actual

**Output:** Documento markdown con:
- Rankings de competitors
- Feature gap analysis
- Keyword opportunities

**Impacto:** 🟢 Estratégico — intelligence para roadmap
**Esfuerzo:** M (2 horas)
**Agente:** Strategy
**Dependencia:** Ninguna

---

## Resumen de Propuestas R130

| # | Título | Impacto | Esfuerzo | Agente | Dependencia |
|---|--------|---------|----------|--------|--------------|
| 1 | FAQPage Schema + AI Overview | 🟡 Medio-Alto | S | Frontend | Ninguna |
| 2 | Sección "Nuestro Proceso" EEAT | 🟡 Medio | M | Frontend + Content | Contenido real |
| 3 | YouTube Shorts Channel | 🟡 Medio | S + M | Frontend + Content | Video production |
| 4 | PageSpeed Audit + LCP | 🟡 Medio | S | Frontend | Despliegue |
| 5 | Competitive Analysis | 🟢 Estratégico | M | Strategy | Ninguna |

---

## Notas Sobre Deadlock Actual

R128 ([DOMAA-1146](http://localhost:3100/DOMAA/issues/DOMAA-1146)) identificó el deadlock crítico:
- Repo GitHub 404
- Sitio no desplegado
- WhatsApp ficticio

**Las propuestas 1, 3 y 5 de R130 no requieren datos del cliente** y pueden implementarse parcial o totalmente antes de resolver el deadlock. Las propuestas 2 y 4 dependen de contenido real o despliegue.

---

## Referencias

- [Ahrefs SEO Trends 2024](https://ahrefs.com/blog/seo-trends/) — AI Overviews, Video SEO, EEAT
- [Google AI Overviews documentation](https://developers.google.com/search/docs/appearance/ai-overviews)
- [Schema.org FAQPage](https://schema.org/FAQPage)
- [web.dev PWA](https://web.dev/articles/install-criteria) — PWA installability
- [E-E-A-T Google documentation](https://developers.google.com/search/docs/fundamentals/creating-helpful-content) — Experience signals

---

*Análisis R130 — Innovation Scout*
*Generado: 2026-04-29T03:XX:XXZ*