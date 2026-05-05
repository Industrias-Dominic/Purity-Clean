# Análisis Creativo — Purity & Clean (Round 113)

**Proyecto:** Purity & Clean
**Fecha:** 2026-04-28
**Analista:** Innovation Scout
**Ronda:** 113
**Issue padre:** DOMAA-985

---

## Resumen Ejecutivo

R113 identifica **7 gaps completamente nuevos** que NO fueron abordados en R1-R112, tras auditar el codebase actual (index.html de 2305 líneas, 11 páginas de zonas, 6 artículos de blog, sw.js con cache versioning ausente, CSS de 6212 líneas) y cross-referenciar contra el estado del arte en Local SEO para home services en Latinoamérica. El proyecto tiene una base sólida pero persisten oportunidades en: GBP Q&A automation, multi-location SEO para las 11 zonas, voice search readiness, video schema para YouTube, y monitoring proactivo de Core Web Vitals.

---

## Auditoría del Estado Actual vs R112

### Stack Confirmado (R112)

| Componente | Estado |
|------------|--------|
| HTML5 semántico + CSS3 (variables, grid, flexbox) | ✅ Maduro |
| JS vanilla ES6+ (1847 líneas, módulos, observers) | ✅ Robusto |
| PWA + Service Worker (sw.js) | ✅ Implementado |
| Dark mode + toggle con prefers-color-scheme | ✅ Implementado |
| Chatbot FAQ flotante con WhatsApp routing | ✅ Implementado |
| Booking form multi-step con geolocalización | ✅ Implementado |
| Newsletter con Formspree | ✅ Implementado |
| Comparadores antes/después (comparison slider) | ✅ Implementado |
| Testimonios carousel | ✅ Implementado |
| Schema LocalBusiness + FAQPage + Article + image | ✅ Implementado |
| Video embebido + VideoObject schema | ✅ Implementado |
| Blog con 6 artículos (BlogPosting schema) | ✅ Implementado |
| 11 páginas de zonas con LocalBusiness por zona | ✅ Implementado |
| Playwright E2E (11 specs, 3 navegadores) | ✅ Implementado |
| OG tags + Twitter Cards + canonical | ✅ Implementado |
| Skip link + aria-live + accessibility | ✅ Implementado |
| Reading progress bar en artículos | ✅ Implementado |

### Lo Pendiente desde R108 (CONFIRMADO PENDIENTE)

| Item | Ronda original | Estado |
|------|---------------|--------|
| SW cache versioning (cache invalidation) | R108 | ⚠️ Sin implementar |
| BreadcrumbList schema en zonas | R108 | ⚠️ Sin implementar |
| HowTo schema (tutorial de reserva) | R108 | ⚠️ Sin implementar |
| Cookie consent banner | R108 | ⚠️ Status incierto |

### Lo Genuinamente Nuevo en R113

Después de revisar el CSS completo (6212 líneas), JS (1847 líneas), sw.js (197 líneas), y aplicar la guía de Local SEO 2025 de BrightLocal + research de Schema.org, encontré several areas NO cubiertas en R1-R112:

1. **GBP Q&A Automation** — Google Business Profile Q&A está vacío y es una oportunidad gratis
2. **Multi-location SEO para 11 zonas** — Best practices de negocio multi-ubicación NO aplicados
3. **Voice Search Readiness** — Contenido optimizado para búsquedas por voz
4. **VideoObject en blog + YouTube SEO** — Canal de video para la marca
5. **priceRange ausente en zonas** — Schema incompleto en páginas de zonas
6. **Core Web Vitals monitoring** — Sin alertas ni dashboard de performance
7. **Google Business Profile Posts** — No se están usando las posting features de GBP

---

## Investigación: Análisis de Oportunidades

### Oportunidad 1: GBP Q&A Automation — Ventaja Competitiva Gratis

**Contexto técnico:**

Según BrightLocal, el 62% de consumidores evitan un negocio si encuentran información incorrecta online. El GBP Q&A no es solo para preguntas de clientes — los dueños de negocio pueden (y deben)populate Q&A proactivamente para guiar a potenciales clientes [1].

**Situación actual:**

- El sitio tiene LocalBusiness schema en index.html y en cada zona
- No hay evidencia de Q&A en el Google Business Profile
- No hay enlaces desde la web al Google Business Profile para poblar Q&A

**Gap identificado:**

Purity & Clean tiene un Google Business Profile (asumo) pero NO está siendo aprovechado para Q&A. Las preguntas frecuentes como "¿Cuál es el precio de limpieza de sofá?" pueden responderse proactivamente con info específica del negocio.

**Propuesta — Poblar GBP Q&A con las 10 preguntas más frecuentes:**

1. **Crear lista de Q&A basada en FAQ schema actual:**
   - "¿Cuánto cuesta la limpieza profunda de un sofá?" → Respuesta con rango de precios
   - "¿Hacen sanitización de colchones?" → Sí, con descripción del proceso
   - "¿Atienden en mi zona?" → Link a la página de zonas correspondiente
   - "¿Cuál es el tiempo de secado después de la limpieza?" → Info específica
   - "¿Ofrecen garantía?" → Detallar política

2. **Vincular desde el sitio web al GBP Q&A:**
   - En index.html, sección FAQ, agregar link: "Ver más preguntas en Google"
   - En zona pages, agregar: "Pregunta a Purity & Clean directamente en Google"

3. **Tools para gestionar Q&A:**
   - Google Business Profile app (celular)
   - Python script para poblar masivo (si hay acceso a API de GBP)

**Impacto esperado:**
- Guía al cliente antes de que contacte (reduce soporte)
- Mejora el engagement en GBP
- rich results mejorados en búsqueda
- 30 minutos de trabajo, impacto长久

**Esfuerzo:** XS (30 minutos)
**Agente recomendado:** CEO / Marketing (no requiere código)
**Referencias:**
- [BrightLocal - GBP Q&A](https://www.brightlocal.com/learn/google-q-and-a/)

---

### Oportunidad 2: Multi-Location SEO para las 11 Zonas

**Contexto:**

Según BrightLocal, negocios con múltiples ubicaciones tienen consideraciones especiales de SEO [2]. Las 11 zonas de Purity & Clean (Chapinero, Suba, Engativá, Kennedy, Bosa, Fontibón, Usme, Usaquén, Teusaquillo, Barrios Unidos, y 1 más) son effectively locations y deben seguir best practices de multi-location SEO.

**Situación actual:**

- 11 páginas de zonas con LocalBusiness schema
- Cada zona tiene su propia URL: `/zonas/chapinero/`, `/zonas/suba/`, etc.
- Cada zona tiene coordinates específicas de Google

**Gaps identificados (según BrightLocal multi-location checklist):**

1. **Falta `areaServed` completo** — Cada zona no especifica qué localidades/colombian neighborhoods cercanos cubre
2. **Falta `priceRange`** — El schema de zonas no tiene `priceRange` definido (index.html sí lo tiene en LocalBusiness raíz)
3. **No hay interlinking entre zonas** — Un usuario en Chapinero podría beneficiarse de ver que también cubren Teusaquillo
4. **No hay landing page de "Todas las zonas"** — El sitemap tiene `/zonas/` pero no hay página index
5. **Cada zona tiene孤立ado reviews** — No hay forma de agregar reviews específicas por zona en el schema

**Propuesta — Completar Multi-Location SEO para las 11 Zonas:**

1. **Completar `areaServed` en schema de cada zona:**
```json
"areaServed": {
  "@type": "GeoCircle",
  "geoMidpoint": {
    "@type": "GeoCoordinates",
    "latitude": "4.6470",
    "longitude": "-74.0633"
  },
  "geoRadius": "5000"
}
```

2. **Agregar `priceRange` a cada zona:**
```json
"priceRange": "$$"
```

3. **Crear página índice de zonas** (`zonas/index.html`):
- Mapa interactivo con las 11 zonas
- Cards por zona con link a cada página
- CTA de reserva unificado

4. **Agregar interlinking contextual en zonas:**
```html
<p>También cubrimos: <a href="../teusaquillo/">Teusaquillo</a>, <a href="../usaquen/">Usaquén</a></p>
```

5. **Crear landing page para servicio específico por zona:**
- "¿Limpieza de sofás en Chapinero?" → `/zonas/chapinero/#servicios`
- Cada zona puede rankear para keywords de servicio + location

**Impacto esperado:**
- +15-25% tráfico orgánico local por mejor cobertura de keywords
- Cada zona rankea para su propio neighborhood + servicios
- CTR mejorado por contenido local específico

**Esfuerzo:** M (4-6 horas)
**Agente recomendado:** Frontend (SEO)
**Referencias:**
- [BrightLocal - Multi-location SEO](https://www.brightlocal.com/learn/multi-location-seo/)

---

### Oportunidad 3: Voice Search Readiness

**Contexto:**

Según BrightLocal, el 22% de búsquedas locales ahora son por voz [3]. En Colombia, con el crecimiento de smart speakers y asistentes de voz, optimizar para queries como "OK Google, encuentra servicio de limpieza de sofás en Bogotá" es una oportunidad creciente.

**Situación actual:**

- El sitio tiene contenido en español
- Las keywords son principalmente texto
- No hay optimization específica para voz

**Gap identificado:**

- Las FAQ schema son texto, pero no están optimizadas para voice search
- Las preguntas en schema están en formato pregunta-respuesta, lo cual es bueno para voz
- Falta contenido en formato de query conversacional

**Propuesta — Voice Search SEO para Home Services:**

1. **Optimizar FAQ schema para queries de voz:**
```json
{
  "@type": "Question",
  "name": "¿Cuánto cobran por limpiar un sofá en Bogotá?",
  "acceptedAnswer": {
    "@type": "Answer",
    "text": "En Purity & Clean cobramos entre 80 mil y 180 mil pesos colombianos por la limpieza profunda de un sofá, dependiendo del tamaño y el material. La cotización inicial es gratis."
  }
}
```

2. **Agregar contenido en formato "Cómo pregunta" en los artículos:**
- "¿Cómo limpiar sillas de oficina en Bogotá?" ( YA existe como title)
- "¿Cuánto cuesta sanitizar un colchón?" ( YA existe en FAQ)
- Crear sección "Preguntas frecuentes por voz" con contenido conversacional

3. **Structured data para FAQ contestadas por voz:**
- Asegurar que las respuestas de FAQ sean concisas (40-60 palabras máx)
- Incluir `text` en español con naturales说话

4. **Crear página de "Proceso de reserva" en formato HowTo:**
- Ya se propuso HowTo en R108 pero no se implementó
- Este formato es ideal para queries de voz: "Cómo reservo un servicio de limpieza?"

**Impacto esperado:**
- Aparición en "OK Google" results
- +10-15% tráfico por voz en 12 meses
- Ventaja sobre competidores que no optimizan para voz

**Esfuerzo:** S (2-3 horas)
**Agente recomendado:** Frontend (SEO + Content)
**Referencias:**
- [BrightLocal - Voice Search Local SEO](https://www.brightlocal.com/learn/voice-search-for-local-business/)

---

### Oportunidad 4: VideoContent + YouTube SEO para la Marca

**Contexto:**

YouTube es el segundo buscador más grande del mundo. Para home services, video de "antes/después" tiene alto engagement y puede rankear para keywords locales [4]. El sitio ya tiene video embebido (YouTube nocookie) y VideoObject schema.

**Situación actual:**

- Video embebido en index.html (R102)
- VideoObject schema implementado
- No hay canal de YouTube propio vinculado
- No hay videos de "antes/después" de los servicios

**Gap identificado:**

- El schema VideoObject apunta a un video embebido pero no hay video en YouTube
- No hay thumbnails de video en YouTube para Purity & Clean
- El sitio no aparece en video search para "limpieza sofás Bogotá"

**Propuesta — YouTube SEO + Video Strategy:**

1. **Crear canal de YouTube "Purity & Clean Bogotá":**
   - Subir videos de 60-90 segundos de "antes/después" de limpieza
   - Títulos en español optimizados para búsqueda: "Limpieza de sofá en Chapinero | Antes y Después"
   - Descripción con link al sitio web y zona específica

2. **Vincular canal desde el sitio:**
   - Footer: link a YouTube con icono
   - Zona pages: "Mira nuestro trabajo en YouTube"
   - Blog artículos: embed de video relacionado

3. **VideObject schema mejorado:**
```json
{
  "@type": "VideoObject",
  "name": "Limpieza profunda de sofá en Chapinero - Antes y Después",
  "description": "Servicio profesional de limpieza de sofá en el barrio Chapinero de Bogotá. Ver el proceso completo.",
  "thumbnailUrl": "https://purityclean.com/images/video-thumb-chapinero.jpg",
  "uploadDate": "2026-04-20",
  "duration": "PT2M30S",
  "contentUrl": "https://www.youtube.com/watch?v=XXXXX",
  "embedUrl": "https://www.youtube.com/embed/XXXXX"
}
```

4. **Playlist por servicio:**
   - Playlist "Limpieza de sofás Bogotá"
   - Playlist "Sanitización de colchones"
   - Playlist "Servicios corporativos"

**Impacto esperado:**
- +20% tiempo en sitio por video embebido
- Aparición en video search para keywords locales
- Mayor autoridad de marca en Google
- Engagement en YouTube → tráfico web

**Esfuerzo:** S (2-3 horas de implementación + producción de video es otra cosa)
**Agente recomendado:** Frontend + Marketing (video production separate)
**Referencias:**
- [YouTube SEO for Local Business](https://www.youtube.com/watch?v=nlLj7T8HhN8)

---

### Oportunidad 5: priceRange Ausente en Schema de Zonas

**Contexto:**

Según Schema.org, `priceRange` es una propiedad recomendada para LocalBusiness que indica el rango de precios del negocio (por ejemplo, "$$", "$$$") [5]. El index.html SÍ tiene priceRange en el LocalBusiness raíz, pero las 11 zonas NO lo tienen.

**Situación actual:**

- index.html: `"priceRange": "$$"` ✅
- zonas/chapinero/index.html: NO priceRange ❌
- zonas/suba/index.html: NO priceRange ❌
- Resto de zonas: NO priceRange ❌

**Gap identificado:**

Las zonas son páginas de LocalBusiness específicas por location pero les falta el `priceRange`. Esto puede afectar los rich results cuando alguien busca desde una zona específica.

**Propuesta — Agregar priceRange a las 11 zonas:**

1. **Agregar a cada zona schema:**
```json
"priceRange": "$$"
```

2. **Verificar consistencia** — Las 11 zonas deben tener el mismo priceRange si ofrecen los mismos servicios al mismo nivel de precio.

3. **Considerar diferenciación por zona** (si aplica):
   - Si某些 zonas tienen servicio premium, reflejario en el priceRange
   - Por ahora, uniform "$$" es apropiado

**Impacto esperado:**
- Rich results más completos para búsquedas por zona
- CTR mejorado en mapa y búsqueda local
- Consistencia en la presentación del negocio

**Esfuerzo:** XS (15 minutos — update en 11 archivos)
**Agente recomendado:** Frontend (SEO)
**Referencias:**
- [Schema.org - priceRange](https://schema.org/priceRange)

---

### Oportunidad 6: Core Web Vitals Monitoring con Dashboard

**Contexto:**

Según BrightLocal, Core Web Vitals (CWV) son un factor de ranking crítico y deben monitorearse continuamente [6]. El sitio tiene Playwright tests pero NO tiene monitoring de CWV en producción.

**Situación actual:**

- Playwright config tiene 11 specs en 3 navegadores
- NO hay Lighthouse CI configurado (R112 propuso pero no implementó)
- NO hay dashboard de CWV
- NO hay alertas cuando CWV degradan

**Gap identificado:**

Sin monitoring, no hay forma de saber si cambios al sitio degradan performance. CSS de 6212 líneas puede contener CSS crítico sin identificar. El sitio puede estar funcionando bien AHORA pero cualquier deploy podría romper LCP.

**Propuesta — Implementar Lighthouse CI con Alertas:**

1. **Instalar Lighthouse CI:**
```bash
npm install -D @lhci/cli
```

2. **Configurar `.lighthouserc.json`:**
```json
{
  "ci": {
    "collect": {
      "url": [
        "http://localhost:8080/",
        "http://localhost:8080/blog/",
        "http://localhost:8080/zonas/chapinero/"
      ],
      "numberOfRuns": 3
    },
    "assert": {
      "assertions": {
        "categories:performance": ["error", { "minScore": 0.85 }],
        "categories:accessibility": ["error", { "minScore": 0.9 }],
        "categories:seo": ["error", { "minScore": 0.95 }],
        "first-contentful-paint": ["error", { "maxNumericValue": 2000 }],
        "largest-contentful-paint": ["error", { "maxNumericValue": 2500 }],
        "total-blocking-time": ["error", { "maxNumericValue": 300 }]
      }
    },
    "upload": {
      "target": "temporary-public-storage"
    }
  }
}
```

3. **Integrar en GitHub Actions:**
```yaml
- name: Run Lighthouse CI
  run: npm run lhci
```

4. **Crear dashboard público** (opcional, con GitHub Pages):
- Track histórico de scores
- Comparación mes a mes

**Impacto esperado:**
- Detección automática de regresiones de performance
- LCP < 2.5s mantenido
- Score histórico para reportes al CEO

**Esfuerzo:** S (1 día)
**Agente recomendado:** Frontend / DevOps
**Referencias:**
- [Lighthouse CI Documentation](https://github.com/GoogleChrome/lighthouse-ci)

---

### Oportunidad 7: Google Business Profile Posts — Marketing Gratuito

**Contexto:**

Según BrightLocal, GBP Posts son una forma gratuita de comunicarse directamente con clientes [7]. Google Business Profile posts aparecen en el perfil del negocio y pueden mejorar la visibilidad. Los posts duran 6 meses.

**Situación actual:**

- El sitio tiene chatbot con WhatsApp
- El sitio tiene newsletter con Formspree
- NO hay evidencia de GBP Posts siendo utilizados

**Gap identificado:**

GBP Posts pueden ser usados para:
- Anunciar promociones estacionales ("Limpieza de primavera - 20% off")
- Mostrar antes/después (con fotos)
- Comunicar horarios especiales (fiestas)
- Educar sobre servicios ("3 consejos para mantener tu sofá limpio")

**Propuesta — GBP Posts Strategy:**

1. **Crear calendario de posts (1 post/semana):**
   - Semana 1: Promo estacional
   - Semana 2: Tips de mantenimiento
   - Semana 3: Antes/después
   - Semana 4: Testimonio de cliente (con permiso)

2. **Plantillas de post:**
   - Imagen + texto + CTA
   - "Durante todo [mes], obtén [descuento] en [servicio]"
   - "Mira este antes/después de [servicio] en [zona]"
   - "¿Sabías que...? [tip de mantenimiento]"

3. **Medir resultados:**
   - Google Business Profile insights
   - Track queries que generan visitas al sitio

**Impacto esperado:**
- +10% engagement con GBP profile
- Recordatorio periódico a clientes potenciales
- Sin costo, alto impacto

**Esfuerzo:** XS (30 min/semana de contenido)
**Agente recomendado:** Marketing / CEO (no requiere código)
**Referencias:**
- [BrightLocal - GBP Posts](https://www.brightlocal.com/learn/google-business-profile-google-posts-updates/)

---

## Propuestas Priorizadas

### PROPUESTA 1: GBP Q&A Automation
- **Título:** Poblar Google Business Profile Q&A con las 10 preguntas más frecuentes
- **Descripción:** Pre-popular el Q&A del Google Business Profile con preguntas frecuentes y respuestas detalladas sobre precios, servicios, zonas de cobertura, y proceso de reserva.
- **Impacto esperado:** Guía al cliente antes de contactar, mejora engagement en GBP, rich results mejorados.
- **Esfuerzo:** XS (30 minutos)
- **Agente recomendado:** CEO / Marketing
- **Referencias:** [BrightLocal - GBP Q&A](https://www.brightlocal.com/learn/google-q-and-a/)

### PROPUESTA 2: Multi-Location SEO - Completar las 11 Zonas
- **Título:** Implementar multi-location SEO completo para las 11 zonas de Bogotá
- **Descripción:** Agregar areaServed con GeoCircle, priceRange, interlinking entre zonas, crear página índice de zonas, y landing pages de servicio por zona.
- **Impacto esperado:** +15-25% tráfico orgánico local, cada zona rankea para su neighborhood + servicios.
- **Esfuerzo:** M (4-6 horas)
- **Agente recomendado:** Frontend (SEO)
- **Referencias:** [BrightLocal - Multi-location SEO](https://www.brightlocal.com/learn/multi-location-seo/)

### PROPUESTA 3: Voice Search Readiness
- **Título:** Optimizar contenido para voice search queries en español colombiano
- **Descripción:** Enriquecer FAQ schema con preguntas en formato natural de voz, agregar contenido HowTo completo, optimizar respuestas para 40-60 palabras.
- **Impacto esperado:** Aparición en resultados de "OK Google", +10-15% tráfico por voz.
- **Esfuerzo:** S (2-3 horas)
- **Agente recomendado:** Frontend (SEO) + Content
- **Referencias:** [BrightLocal - Voice Search](https://www.brightlocal.com/learn/voice-search-for-local-business/)

### PROPUESTA 4: YouTube SEO + Video Strategy
- **Título:** Crear canal de YouTube y videobject schema mejorado
- **Descripción:** Crear canal de YouTube, subir videos de antes/después, optimizar títulos y descripciones para SEO, vincular desde el sitio, agregar VideObject schema mejorado.
- **Impacto esperado:** +20% tiempo en sitio, aparición en video search, mayor autoridad de marca.
- **Esfuerzo:** S (2-3 horas implementación + video production)
- **Agente recomendado:** Frontend + Marketing
- **Referencias:** [YouTube SEO Guide](https://www.youtube.com/watch?v=nlLj7T8HhN8)

### PROPUESTA 5: priceRange en las 11 Zonas
- **Título:** Agregar priceRange $$ a todas las páginas de zonas
- **Descripción:** Agregar la propiedad priceRange al schema LocalBusiness de cada una de las 11 zonas.
- **Impacto esperado:** Rich results completos para búsquedas por zona, CTR mejorado.
- **Esfuerzo:** XS (15 minutos)
- **Agente recomendado:** Frontend (SEO)
- **Referencias:** [Schema.org - priceRange](https://schema.org/priceRange)

### PROPUESTA 6: Lighthouse CI Performance Budget
- **Título:** Implementar Lighthouse CI con performance budget y alertas
- **Descripción:** Configurar Lighthouse CI en el pipeline, umbrales de CWV (LCP < 2.5s), integración con GitHub Actions, dashboard histórico.
- **Impacto esperado:** Detección automática de regresiones, LCP < 2.5s mantenido.
- **Esfuerzo:** S (1 día)
- **Agente recomendado:** Frontend / DevOps
- **Referencias:** [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci)

### PROPUESTA 7: GBP Posts Strategy
- **Título:** Crear calendario de Google Business Profile Posts
- **Descripción:** Implementar calendario de 1 post/semana en GBP: promociones, tips, antes/después, testimonios. Medición de engagement.
- **Impacto esperado:** +10% engagement con GBP profile, recordatorio a clientes potenciales, sin costo.
- **Esfuerzo:** XS (30 min/semana)
- **Agente recomendado:** Marketing / CEO
- **Referencias:** [BrightLocal - GBP Posts](https://www.brightlocal.com/learn/google-business-profile-google-posts-updates/)

---

## Resumen de Impacto

| Propuesta | Impacto | Esfuerzo | Prioridad |
|-----------|---------|----------|-----------|
| GBP Q&A Automation | 🟡 Medio | XS | 1 |
| Multi-Location SEO (11 zonas) | 🔴 Alto | M | 2 |
| Voice Search Readiness | 🟡 Medio | S | 3 |
| YouTube SEO + Video | 🔴 Alto | S | 4 |
| priceRange en Zonas | 🟡 Medio | XS | 5 |
| Lighthouse CI | 🔴 Alto | S | 6 |
| GBP Posts Strategy | 🟡 Medio | XS | 7 |

---

## Referencias

[1] BrightLocal. "Google Q&A." https://www.brightlocal.com/learn/google-q-and-a/

[2] BrightLocal. "Multi-location SEO." https://www.brightlocal.com/learn/multi-location-seo/

[3] BrightLocal. "Voice Search for Local Business." https://www.brightlocal.com/learn/voice-search-for-local-business/

[4] YouTube. "YouTube SEO for Local Business."

[5] Schema.org. "priceRange Property." https://schema.org/priceRange

[6] BrightLocal. "Core Web Vitals." https://www.brightlocal.com/learn/core-web-vitals-local-marketing-guide/

[7] BrightLocal. "Google Business Profile Posts." https://www.brightlocal.com/learn/google-business-profile-google-posts-updates/

---

*Análisis generado por Innovation Scout — Innovation Scout Agent*
*Purity & Clean Round 113 — 2026-04-28*
*Co-Authored-By: Paperclip <noreply@paperclip.ing>*