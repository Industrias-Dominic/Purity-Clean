# Análisis Creativo — Purity & Clean (Round 115)

**Proyecto:** Purity & Clean
**Fecha:** 2026-04-29
**Analista:** Innovation Scout
**Ronda:** 115
**Issue padre:** DOMAA-1056

---

## Resumen Ejecutivo

R115 se enfoca en **monitoreo de búsqueda, contenido evergreen, y optimización de conversión local** — áreas no cubiertas en R114. El sitio tiene buena base técnica, pero carece de: (a) integración con Search Console para métricas reales, (b) posts de Google Business Profile, (c) señales de contenido fresco (dateModified), (d) rich links de WhatsApp/Redes, y (e) estrategia de contenido recurrent. Todas las propuestas son accionables con esfuerzo bajo a medio.

---

## Hallazgos Pre-R115 (Verificados en Código)

| Feature | Estado en código | Ronda que lo propuso |
|---------|------------------|----------------------|
| PWA + Service Worker | ✅ Implementado (sw.js) | R107 |
| Schema LocalBusiness (index) | ✅ Implementado | R1 |
| FAQPage schema | ✅ Implementado | R1 |
| Critical CSS | ✅ Archivo existe (336 líneas) | R108 |
| WhatsApp placeholder | ⚠️ `numero: "573001234567"` hardcodeado | R81 (parcial) |
| VideoObject schema | ⚠️ Placeholder con VIDEO_ID ficticio | R112 |
| BreadcrumbList JSON-LD | ⚠️ NO implementado | R112 (pendiente) |
| HowTo schema (blog) | ❌ NO implementado | R112 (pendiente) |
| Trust badges | ✅ Implementados | R67/DOMAA-112 |
| Google Reviews reales | ✅ Implementados (reviews-data.js) | R79/DOMAA-79 |
| hreflang zonas | ✅ Implementado en 10 páginas | R113 (ya estaba) |
| Playwright E2E tests | ⚠️ Pasta existe, no corre en CI | R114 (pendiente) |
| hreflang en index.html | ❌ NO implementado | R114 (pendiente) |
| i18n hreflang en sitemap | ❌ NO implementado | R114 (pendiente) |
| Blog expansion (3 nuevos) | ❌ NO implementado | R114 (pendiente) |
| Google Search Console | ❌ NO integrado | Nueva |
| Google Business Profile posts | ❌ NO hay estrategia | Nueva |
| Schema dateModified/datePublished | ❌ NO implementado | Nueva |
| Open Graph para WhatsApp | ⚠️ Básico, sin images personalizadas | Nueva |
| Heatmaps/scroll tracking | ⚠️ Plausible existe, sin segmentation | Nueva |

---

## Propuestas R115

### PROPUESTA 1: Integración con Google Search Console — Monitoreo de rendimiento real

**Título:** Conectar sitio con Search Console para métricas de búsqueda

**Descripción del problema:**
El sitio no tiene conexión con Google Search Console, lo que significa que no hay visibilidad sobre: qué queries traen tráfico, posiciones promedio, CTR real, ni alertas de crawl. Las decisiones SEO se toman sin datos.

**Propuesta — Configurar Search Console + Dashboard interno:**
1. Verificar propiedad del sitio en Search Console (GSC)
2. Solicitar acceso al CEO para compartir datos
3. Crear sección interna "/admin/seo" con métricas clave:
   - Top 10 queries orgánicas
   - Posición promedio por semana
   - CTR promedio
   - Páginas con errores de indexación
   - Sitemap status
4. Actualizar Search Console cuando se publiquen nuevos artículos de blog

**Alternativa — API de Search Console:**
Si hay presupuesto, integrar [Search Console API](https://developers.google.com/webmaster-tools/search-console-api) para dashboard en tiempo real.

**Impacto esperado:** Decisiones SEO basadas en datos. Detección temprana de drops. Optimización de contenido enfocada.
**Esfuerzo:** S-M (2-4 horas si hay acceso)
**Agente recomendado:** Full Stack (SEO)
**Referencias:** [Search Console API](https://developers.google.com/webmaster-tools/search-console-api), [GSC Integration Guide](https://developers.google.com/search/docs/specialty/international/localized-versions)

---

### PROPUESTA 2: Estrategia de Google Business Profile — Posts recurrentes

**Título:** Implementar calendario de posts en Google Business Profile

**Descripción del problema:**
Purity & Clean tiene Google Business Profile (datos en reviews-data.js) pero no hay estrategia de posts en Google. Competidores locales publican ofertas semanales que aparecen en el perfil de Google Maps. Purity & Clean está perdiendo visibilidad en el "3-pack" local.

**Situación actual:**
Reviews existen en schema JSON-LD pero no hay posts de Google Business.

**Propuesta — Calendario de contenido para Google Posts:**
1. Crear 4 posts recurrentes por mes en Google Business:
   - **Post 1 (semana 1):** Oferta del mes — "20% en limpieza de sofás"
   - **Post 2 (semana 2):** Tip de mantenimiento — "Cómo proteger tu sofá"
   - **Post 3 (semana 3):** Testimonio destacado de cliente
   - **Post 4 (semana 4):** Servicio destacado — "Sanitización de colchones"

2. Cada post: imagen + texto 100-150 palabras + CTA (llamar/whatsapp)

3. Crear documento de planning mensual en `/blog/google-posts-calendar.md`

**Impacto esperado:** Mayor visibilidad en 3-pack local. CTR en Google Maps +15-25%. Diferenciación vs. competidores sin posts.
**Esfuerzo:** S (1-2 horas/mes, repetible)
**Agente recomendado:** Content (coordinación con CEO para imágenes y ofertas)
**Referencias:** [Google Business Profile Posts](https://www.google.com/business/branding/), [Local Services Ads guide](https://ads.google.com/local-services/)

---

### PROPUESTA 3: Señales de contenido fresco — dateModified y datePublished

**Título:** Añadir timestamps de última modificación a todas las páginas

**Descripción del problema:**
Google penaliza sitios donde el contenido parece "estático" sin actualización. El sitio tiene `datePublished` en artículos del blog pero no `dateModified` en otras páginas. Google no sabe cuándo fue la última actualización del index, zonas, o servicios.

**Situación actual:**
```html
<!-- En blog/articles, ejemplo: -->
<script type="application/ld+json">
{
  "@type": "Article",
  "datePublished": "2025-01-15"
  <!-- NO hay dateModified -->
}
```

**Propuesta — Implementar dateModified en todas las páginas:**
1. Para páginas de zonas: actualizar dateModified cuando se改变 contenido
2. Para index.html: actualizar dateModified cada vez que se改变 hero o servicios
3. Para artículos de blog: ya tienen datePublished, agregar dateModified

```html
<script type="application/ld+json">
{
  "@type": "Article",
  "datePublished": "2025-01-15",
  "dateModified": "2026-04-28"
}
</script>
```

4. En schema LocalBusiness del index.html:
```json
{
  "@type": "LocalBusiness",
  "datePublished": "2025-01-01",
  "dateModified": "2026-04-29"
}
```

**Impacto esperado:** Google interpreta sitio como activo y actualizado. Señal de freshness para ranking. Potencial de appearing en "Latest" SERP features.
**Esfuerzo:** S (15 minutos por página, luego replicable con template)
**Agente recomendado:** Frontend (SEO)
**Referencias:** [Schema.org dateModified](https://schema.org/dateModified), [Google Freshness update](https://www.google.com/search/blog/2011/08/freshness-20-algorithm-change)

---

### PROPUESTA 4: Open Graph optimizado para WhatsApp — Link previews ricos

**Título:** Configurar Open Graph con imágenes y descriptions personalizadas por sección

**Descripción del problema:**
Cuando se comparte el link de Purity & Clean en WhatsApp, el preview muestra una imagen genérica o ninguna. Competidores tienen imágenes personalizadas por servicio que aumentan el CTR.

**Situación actual en index.html:**
```html
<meta property="og:title" content="Purity & Clean - Limpieza profesional en Bogotá">
<meta property="og:description" content="...">
<!-- og:image solo una genérica -->
```

**Propuesta — Open Graph por tipo de página:**
1. **Index:** Imagen hero con logo overlay, colores de marca
2. **Servicios:** 5 imágenes personalizadas (sofa, colchones, alfombras, sillas, corporate)
3. **Zonas:** Mapa de Bogotá con zona resaltada
4. **Blog:** Thumbnail del artículo

```html
<!-- En servicios/sofás.html -->
<meta property="og:image" content="https://purityclean.com/images/og-servicio-sofas.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:description" content="Limpieza profesional de sofás en Bogotá. Técnicas de frío y remediación de manchas. Solicita cotización.">
```

5. Implementar [WhatsApp Link Optimizer](https://business.whatsapp.com/developers/developer-hub) si está disponible.

**Impacto esperado:** CTR en enlaces compartidos +20-30%. Mayor engagement en WhatsApp. Shares con más contexto visual.
**Esfuerzo:** S-M (crear 8-10 imágenes optimizadas + meta tags)
**Agente recomendado:** Frontend + Design
**Referencias:** [Open Graph protocol](https://ogp.me/), [WhatsApp link preview](https://faq.whatsapp.com/542025307392459/)

---

### PROPUESTA 5: Analytics avanzado — Goals y event tracking en Plausible

**Título:** Configurar conversión goals y scroll depth tracking en Plausible

**Descripción del problema:**
Plausible está implementado (script.js:107-120) pero no hay goals configurados ni tracking de micro-conversiones. No se sabe: % de usuarios que llegan al cotizador, % que hacen scroll hasta footer, % que interactuan con WhatsApp.

**Situación actual:**
```javascript
// script.js - Plausible solo pageviews básicos
plausible("pageview");
```

**Propuesta — Goals y eventos en Plausible:**
1. Configurar goals en dashboard de Plausible:
   - `cta-whatsapp` — Click en botón WhatsApp
   - `cotizador-interact` — Usuario interactúa con cotizador
   - `form-servicio` — Selección de servicio en cotizador
   - `blog-read` — Scroll > 75% en artículo

2. Agregar eventos en código:
```javascript
// Botón WhatsApp
plausible("cta-whatsapp", {
  props: { service: "unknown", zone: "unknown" }
});

// Cotizador
plausible("cotizador-interact", {
  props: { service: selectedService, zone: selectedZone }
});
```

3. Dashboard compartido con CEO para revisión semanal

**Impacto esperado:** Métricas de conversión reales. Identificación de friction points. ROI de marketing cuantificable.
**Esfuerzo:** S (2-3 horas)
**Agente recomendado:** Full Stack + Analytics
**Referencias:** [Plausible goals](https://plausible.io/docs/goal-conversions), [Custom events](https://plausible.io/docs/custom-event-goals)

---

### PROPUESTA 6: Twitter/X Cards y LinkedIn share optimization

**Título:** Añadir Twitter Cards y LinkedIn metadata para shares profesionales

**Descripción del problema:**
El sitio no tiene Twitter Cards configuradas, así que cuando alguien tuitea el link aparece sin preview de imagen. Para el mercado B2B/corporate, LinkedIn shares son importantes.

**Propuesta — Twitter Cards y LinkedIn:**
```html
<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:site" content="@PurityCleanBog">
<meta name="twitter:title" content="Purity & Clean - Limpieza profesional Bogotá">
<meta name="twitter:description" content="Servicios de limpieza de sofás, colchones, alfombras y más. Sanitización profesional en Bogotá.">
<meta name="twitter:image" content="https://purityclean.com/images/twitter-card.jpg">

<!-- LinkedIn -->
<meta property="og:image" content="https://purityclean.com/images/linkedin-card.jpg">
```

Crear assets de imagen para:
- Twitter summary_large_image (1200x628)
- LinkedIn post image (1200x627)

**Impacto esperado:** Shares en Twitter/LinkedIn con preview rico. Captura de tráfico social B2B. Brand awareness profesional.
**Esfuerzo:** S (1-2 horas + diseño)
**Agente recomendado:** Frontend + Design
**Referencias:** [Twitter Cards documentation](https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/summary-card-with-large-image), [LinkedIn Post Images](https://www.linkedin.com/help/linkedin/answer/a426802)

---

### PROPUESTA 7: Página de políticas GDPR/LCPD para Colombia

**Título:** Expandir política de privacidad con requisitos legales colombianos

**Descripción del problema:**
La página de política de privacidad es genérica (R1 lo mencionó). Para un negocio en Colombia que recolecta datos de clientes (formularios, WhatsApp), necesita cumplir con la Ley 1581 de 2012 (protección de datos) y el Decreto 1377 de 2013.

**Situación actual:**
privacy.html tiene contenido básico genérico sin específicos de Colombia.

**Propuesta — Política de privacidad legalmente adecuada:**
1. Agregar secciones requeridas por LCPD colombiana:
   - Responsable del tratamiento (nombre, nit, dirección)
   - Finalidad del tratamiento (para qué usan los datos)
   - Derechos del titular (acceso, rectificación, supresión)
   - Canales de atención (email, teléfono, dirección)
   - Procedimiento de reclamos

2. Consentimiento explícito en formularios:
```html
<label>
  <input type="checkbox" required>
  Acepto la <a href="/privacy.html">política de tratamiento de datos</a>
  y autorizo el contacto por parte de Purity & Clean.
</label>
```

3. Si usan Formspree, asegurar que tienen DPA firmado.

**Impacto esperado:** Cumplimiento legal. Riesgo legal mitigated. Confianza de clientes corporativos. SEO + por E-E-A-T (Expertise).
**Esfuerzo:** S (2-3 horas con guidance legal básico)
**Agente recomendado:** Full Stack + Legal (review de CEO)
**Referencias:** [Ley 1581 de 2012 - Colombia](https://www.sic.gov.co/ley-1581-de-2012), [Decreto 1377 de 2013](https://www.sic.gov.co/decreto-1377-de-2013)

---

## Propuestas Priorizadas (R115)

| # | Propuesta | Tipo | Impacto | Esfuerzo | Agente |
|---|-----------|------|---------|---------|--------|
| 1 | Google Search Console integration | SEO/Métricas | 🔴 Crítico | S-M | Full Stack |
| 2 | Google Business Profile posts | SEO Local | 🟡 Alto | S | Content |
| 3 | dateModified en todas las páginas | SEO/Freshness | 🟡 Medio | S | Frontend |
| 4 | Open Graph para WhatsApp | Social/UX | 🟡 Medio | S-M | Frontend + Design |
| 5 | Plausible goals y eventos | Analytics | 🟡 Alto | S | Full Stack |
| 6 | Twitter/LinkedIn cards | Social B2B | 🟡 Medio | S | Frontend + Design |
| 7 | Política de privacidad LCPD | Legal/Trust | 🟡 Alto | S | Full Stack + Legal |

---

## Diferenciación con R114

**R114 propuestas pendientes de implementar:**
- WhatsApp real (crítico, sigue pendiente)
- VideoObject resolver o quitar
- BreadcrumbList JSON-LD
- HowTo schema en blog
- Playwright E2E en CI
- hreflang en index.html + sitemap
- Blog expansion 3 nuevos artículos

**R115 novedades propias:**
- Search Console integration (nunca propuesto)
- Google Business posts strategy (nunca propuesto)
- LCPD privacy policy (nunca propuesto)
- Twitter/LinkedIn cards (nunca propuesto)
- dateModified freshness signals (nunca propuesto)
- Plausible goals (nunca propuesto como estrategia)

---

## Referencias

[1] Search Console API - https://developers.google.com/webmaster-tools/search-console/api
[2] Google Business Profile Posts - https://www.google.com/business/branding/
[3] Schema.org dateModified - https://schema.org/dateModified
[4] Open Graph Protocol - https://ogp.me/
[5] WhatsApp Link Preview - https://faq.whatsapp.com/542025307392459/
[6] Plausible Goals - https://plausible.io/docs/goal-conversions
[7] Twitter Cards - https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/summary-card-with-large-image
[8] Ley 1581 Colombia - https://www.sic.gov.co/ley-1581-de-2012
[9] LinkedIn Image Specs - https://www.linkedin.com/help/linkedin/answer/a426802

---

*Análisis generado por Innovation Scout — Innovation Scout Agent*
*Purity & Clean Round 115 — 2026-04-29*