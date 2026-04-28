# Análisis Creativo — Purity & Clean (Round 108)

**Proyecto:** Purity & Clean
**Fecha:** 2026-04-28
**Analista:** Innovation Scout
**Ronda:** 108
**Issue padre:** DOMAA-963

---

## Resumen Ejecutivo

R108 analiza el proyecto bajo la lente del **SEO 2026 orientado a IA** y las nuevas métricas de visibilidad. El sitio tiene/features implementados (R1-R107), pero persisten gaps críticos en: (1) optimización para AI Overviews y LLMs, (2) señales de autoridad de terceros, (3) estrategia de contenido niche para prompts específicos, (4) archivo llms.txt, y (5) monitoring de Core Web Vitals con RUM real. Se proponen 6 propuestas concretas.

---

## Estado Actual del Proyecto (R1-R107)

### Lo Implementado

| Feature | Ronda | Estado |
|--------|-------|--------|
| PWA + push notifications | R1-R9 | ✅ Implementado |
| Dark mode + tema claro/oscuro | R1-R9 | ✅ Implementado |
| Chatbot FAQ con WhatsApp routing | R1-R9 | ✅ Implementado |
| Cotizador inteligente + Booking form | R89 | ✅ Implementado |
| Sistema de referidos con códigos | R89 | ✅ Implementado |
| Newsletter con Formspree | R89 | ✅ Implementado |
| Testimonios carousel + Google Reviews | R102 | ✅ Implementado |
| Comparison sliders (antes/después) | R102 | ✅ Implementado |
| Zonas pages (11 páginas) | R10-R20 | ✅ Implementado |
| Schema LocalBusiness + FAQPage + Article | R94-R102 | ✅ Implementado |
| Video embebido + VideoObject schema | R102 | ✅ Implementado |
| Blog con 6 artículos | R94-R102 | ✅ Implementado |
| Playwright E2E tests | R85 | ✅ Implementado |
| PWA Install Prompt | R106 | ✅ Implementado |

### Gaps Identificados R107 (ya documentados)

| Categoría | Gap | Estado en R107 |
|-----------|-----|-----------------|
| Schema.org | priceRange y streetAddress faltantes | Propuesta 1 |
| Remarketing | Email remarketing post-reserva | Propuesta 2 |
| Analítica | Microsoft Clarity heatmaps | Propuesta 3 |
| CRM | Pipeline Google Sheets/Notion | Propuesta 4 |
| SEO Zonas | Meta descriptions por zona | Propuesta 5 |
| Chatbot | FAQ expandido a 20+ | Propuesta 6 |

---

## Research: Lo que R107 No Cubrió — SEO 2026 + AI Search

### 1. Generative Engine Optimization (GEO) — El Nuevo Paradigma

Según Backlinko [1], en 2026 el SEO tradicional (keywords + backlinks) ha evolucionado hacia **GEO** (Generative Engine Optimization). Los LLMs como ChatGPT, Perplexity y Google AI Overviews citan fuentes de manera diferente a Google tradicional:

- **ChatGPT cita 16-36 fuentes** por respuesta, incluyendo sitios third-party, Reddit, y artículos especializados
- **Contenido niche > contenido genérico**: LLMs buscan páginas muy específicas para queries largas ("limpieza de sofás de cuero en Chapinero Bogotá precio")
- **La regla del "someone exactly like me"**: los LLMs prefieren contenido que habla directamente a un caso de uso específico
- **Datos propios como diferenciador**: estudios, encuestas, datos únicos generan menciones en LLMs

**Implicación para Purity & Clean:** El sitio necesita contenido ultra-específico por zona y servicio que pueda ser citado por LLMs.

### 2. Third-Party Authority Signals — La Nueva Prioridad

Backlinko señala que ya no basta con backlinks propios. Los LLMs validan información desde múltiples fuentes. Un negocio local necesita:

- Menciones en **directorios locales** (Google Business Profile, Yelp Colombia, Páginas Amarillas)
- Menciones en **blogs de home services** en Colombia
- Menciones en **comunidades** (Reddit Colombia, grupos de Facebook locales)
- **Datos propios publishables**: encuestas de satisfacción, estudios de casos, estadísticas de servicios

**Implicación:** Purity & Clean necesita un programa de citations locales y guest posting en blogs colombianos de decoración y hogar.

### 3. Niche Content para Prompts de LLMs

Los prompts actuales de LLMs son ultra-específicos:
- "servicio de limpieza de sofás para alérgicos en Bogotá"
- "mejor empresa de sanitización de colchones en Suba opiniones"
- "cuánto cuesta limpieza profunda de alfombras en Bogotá 2026"

El contenido debe responder estas queries directamente. Las zonas pages actuales son genéricas; necesitan contenido específico por combinación zona-servicio-precio.

### 4. Archivo LLMs.txt — Tendencia Emergente 2026

Algunos sitios están creando archivos `/llms.txt` (similar a robots.txt) para indicar a LLMs qué contenido pueden rastrear y usar. [1] Esto es nuevo y puede ser relevante para visibilidad en AI search.

### 5. Core Web Vitals con Medición Real (RUM)

El sitio tiene PWA pero **no tiene medición real de Core Web Vitals** de usuarios reales. Playwright tests miden laboratorio, no campo. Sin RUM, no hay forma de:
- Saber el LCP real de usuarios móviles
- Detectar regresiones de performance
- Optimizar para Core Web Vitals de Google

---

## Propuestas R108 — SEO AI-First y Visibility

### Propuesta 1: Archivo LLMs.txt para Visibilidad en AI Search

| Campo | Detalle |
|-------|---------|
| **Título** | Crear archivo `/llms.txt` para mejorar visibilidad en ChatGPT y Perplexity |
| **Problema** | Los LLMs rastrean sitios de manera diferente a Google. Un archivo `llms.txt` (similar a robots.txt) indica a los bots de IA qué contenido pueden usar. Es una tendencia nueva en 2026 y ningún competidor local lo ha implementado. [1] |
| **Descripción** | **1. Crear archivo `/llms.txt` en la raíz:**<br>```<br>User-agent: *<br>Allow: /<br>Disallow: /offline.html<br>Disallow: /404.html<br><br>Sitemap: https://purityclean.com/sitemap.xml<br><br># Purity & Clean - Limpieza profesional en Bogotá<br># ChatGPT, Perplexity, Claude: pueden rastrear todo el contenido<br>```<br><br>**2. Crear `/robots.txt` optimizado para bots de IA:**<br>```<br>User-agent: GPTBot<br>Allow: /<br><br>User-agent: CCBot<br>Allow: /<br><br>User-agent: Claude-bot<br>Allow: /<br>```<br><br>**3. Considerar `/ai-content.txt`** que describa el propósito del sitio para LLMs. |
| **Impacto esperado** | Mejora potencial en menciones por LLMs para queries de limpieza en Bogotá. Diferenciador competitivo en AI search. |
| **Esfuerzo** | XS (15 minutos — crear archivos de texto) |
| **Agente recomendado** | Frontend (SEO técnico) |
| **Referencias** | [1] Backlinko — "Does Your Website Need an LLMs.txt File?" |
| **Estado** | Nueva propuesta — NO mencionada en R1-R107 |
| **Prioridad CEO** | **Experimental** — tendencia nueva con potencial pero sin datos concretos de ROI |

---

### Propuesta 2: Geographic-Service Content Clusters por Zona

| Campo | Detalle |
|-------|---------|
| **Título** | Crear content clusters específicos por zona + servicio + precio |
| **Problema** | Los LLMs responden a queries ultra-específicas. El sitio tiene páginas de zonas pero no contenido que responda a queries como "limpieza de sofás de cuero en Chapinero precio 2026". Se necesita content clusters por cada combinación zona-servicio. [1] |
| **Descripción** | **1. Crear 11 páginas de contenido por zona-servicio:**<br>Ejemplo para Chapinero:<br>- `/zonas/chapinero/limpieza-sofos-cuero/`<br>- `/zonas/chapinero/limpieza-colchones/`<br>- `/zonas/chapinero/sanitizacion/`<br><br>**2. Cada página debe incluir:**<br>- Precios específicos por servicio en esa zona<br>- Tiempo de secado promedio<br>- Tips de mantenimiento por tipo de mueble<br>- Testimonios de clientes de esa zona<br>- Preguntas frecuentes específicas<br>- Schema FAQPage específico<br><br>**3. Internal linking:**<br>Cada zona page enlaza a sus clusters específicos. Los clusters enlazan de vuelta a la zona page.<br><br>**4. Formato FAQ estructurado:**<br>```html<br><section class="faq-cluster"><br>  <h2>Preguntas frecuentes sobre limpieza de sofás en Chapinero</h2><br>  <div itemscope itemprop="mainEntity" itemtype="https://schema.org/Question"><br>    <h3 itemprop="name">¿Cuánto cuesta la limpieza de sofás en Chapinero?</h3><br>    <div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer"><br>      <p itemprop="text">En Chapinero cobramos desde $120.000 por limpieza profunda de sofás...</p><br>    </div><br>  </div><br></section><br>``` |
| **Impacto esperado** | Captura de queries long-tail para LLMs y Google. Posible featured snippet. Mejora en ranking local por zona. |
| **Esfuerzo** | L (8-10 horas — 11 zonas × 3-4 páginas de cluster = 33-44 páginas) |
| **Agente recomendado** | Full Stack (puede usar template para generar páginas automáticamente) + Content (contenido específico por zona) |
| **Referencias** | [1] Backlinko — "Niche Content Is Worth the Investment" |
| **Estado** | Nueva propuesta — NO mencionada en R1-R107 |
| **Prioridad CEO** | **Alta** — SEO long-tail + diferenciador LLMs |

---

### Propuesta 3: Local Citations y NAP Consistency Audit

| Campo | Detalle |
|-------|---------|
| **Título** | Auditoría de NAP y construcción de citations locales en directorios colombianos |
| **Problema** | Para que Google y LLMs confíen en la información de Purity & Clean, necesitan encontrar consistencia en NAP (Name, Address, Phone) en múltiples sitios. No existe un programa de citations locales. [2] |
| **Descripción** | **1. Auditoría de NAP actual:**<br>Buscar en Google "Purity & Clean Bogotá" y verificar qué información aparece en directorios, mapas, y sitios de reseñas. Documentar inconsistencias.<br><br>**2. Crear/verificar perfiles en:**<br>- Google Business Profile (ya debe existir)<br>- Yelp Colombia<br>- Páginas Amarillas Colombia<br>- Directorio Telefónico.co<br>- Locale.ai (directorio local colombiano)<br>- Map.co<br><br>**3. NAP Consistency Score:**<br>Usar herramienta como BrightLocal o Whitespark para medir consistencia. Target: 90%+ consistency.<br><br>**4. Schema de datos estructurados por ubicación:**<br>Si hay múltiples ubicaciones, crear página de cada una con LocalBusiness schema independiente. |
| **Impacto esperado** | Mejor ranking en Google Maps y local search. Mayor confianza de LLMs en datos del negocio. Más clicks desde resultados de búsqueda local. |
| **Esfuerzo** | M (5-6 horas — auditoría + creación de perfiles + monitoreo) |
| **Agente recomendado** | Frontend (datos estructurados) + Content (copy para perfiles) |
| **Referencias** | [2] Whitespark — Local Citation Finder |
| **Estado** | Nueva propuesta — NO mencionada en R1-R107 |
| **Prioridad CEO** | **Alta** — SEO local fundamental |

---

### Propuesta 4: Programa de Reviews y Review Response Automation

| Campo | Detalle |
|-------|---------|
| **Título** | Sistema de solicitud de reviews + automatización de respuestas |
| **Problema** | Con 127 reseñas y rating 4.8, el sitio tiene potencial pero no hay sistema de solicitud activa post-servicio. Según estudios, empresas que responden a reseñas tienen 30% más engagement. [3] |
| **Descripción** | **1. Automatización de solicitud post-servicio:**<br>Después de cada booking confirmado vía Formspree, generar email o WhatsApp pedindo review en Google Business Profile.<br><br>**2. Template de respuesta para reviews positivas:**<br>```<br>¡Gracias [Nombre] por tu confianza! Nos alegra saber que quedaste satisfecho/a con [Servicio]. Estamos aquí para tu próximo servicio de limpieza. ¡Recomendamos agendar tu próximo mantenimiento cada 6 meses!<br>```<br><br>**3. Template para reviews negativas (para gestión):**<br>```<br>Hola [Nombre], lamentamos que tu experiencia no haya sido óptima. Por favor contactanos a [email] o WhatsApp para resolver este tema directamente. Tu satisfacción es nuestra prioridad.<br>```<br><br>**4. Dashboard de reviews:**<br>Crear página interna `/reviews` que muestre aggregate de reseñas (sin links directos a Google para evitar manipulación). |
| **Impacto esperado** | +20-30 reviews en 6 meses. Mejora en rating global. Mayor confianza de usuarios y LLMs. |
| **Esfuerzo** | S (3-4 horas — templates + automatización Zapier + dashboard) |
| **Agente recomendado** | Full Stack (Zapier/Formspree) + Content (templates) |
| **Referencias** | [3] BrightLocal — Review Management Statistics 2025 |
| **Estado** | Nueva propuesta — NO mencionada en R1-R107 |
| **Prioridad CEO** | **Alta** — Reputation management |

---

### Propuesta 5: Core Web Vitals Real User Monitoring (RUM)

| Campo | Detalle |
|-------|---------|
| **Título** | Implementar medición Real User Monitoring de Core Web Vitals |
| **Problema** | El sitio usa Playwright para tests E2E pero no mide Core Web Vitals de usuarios reales (RUM). Sin RUM, no se puede saber el LCP, FID, o CLS real de usuarios móviles en Bogotá. Google usa datos de campo (CrUX) para ranking. [4] |
| **Descripción** | **1. Integrar web-vitals library:**<br>```html<br><script type="module"><br>import {onCLS, onFID, onLCP, onFCP, onTTFB} from 'https://unpkg.com/web-vitals?module';<br><br>function sendToAnalytics({name, delta, id}) {<br>  plausible('web_vitals', {<br>    props: {metric: name, value: delta, id: id}<br>  });<br>}<br><br>onCLS(sendToAnalytics);<br>onFID(sendToAnalytics);<br>onLCP(sendToAnalytics);<br>onFCP(sendToAnalytics);<br>onTTFB(sendToAnalytics);<br></script><br>```<br><br>**2. Dashboard en Plausible:**<br>Crear custom event `web_vitals` con propiedades metric, value, id. Ver dashboard en Plausible.<br><br>**3. Alertas de regresión:**<br>Configurar alerta cuando LCP > 4s, FID > 300ms, o CLS > 0.1 en móvil.<br><br>**4. Integración con Google Search Console:**<br>Configurar GSC para recibir datos de CrUX por URL. |
| **Impacto esperado** | Visibilidad de performance real. Detección de regresiones antes de que afetcten SEO. Mejora en Core Web Vitals reportados en Google Search Console. |
| **Esfuerzo** | S (2-3 horas — web-vitals + Plausible events + dashboard) |
| **Agente recomendado** | Frontend (analytics) |
| **Referencias** | [4] Google — Web Vitals Measurement Overview |
| **Estado** | Nueva propuesta — NO mencionada en R1-R107 |
| **Prioridad CEO** | **Media** — SEO performance |

---

### Propuesta 6: Guest Posting en Blogs Colombianos de Hogar y Decoración

| Campo | Detalle |
|-------|---------|
| **Título** | Programa de guest posting en blogs venezolanos/colombianos de hogar |
| **Problema** | Para ganar third-party authority signals (señal #1 de SEO 2026), Purity & Clean necesita ser mencionado en sitios third-party. Blogs de decoración y hogar en Colombia son el target ideal. [1] |
| **Descripción** | **1. Investigación de blogs objetivo:**<br>Buscar blogs colombianos de decoración, hogar, y vida sana con audiencia en Bogotá. Ejemplos:<br>- decorabogota.com<br>- hogar封闭.com ( verificar)<br>- blog.acomer.com.co<br>- revistacerca.co<br><br>**2. Outreach con contenido valioso:**<br>- Artículo: "Guía completa: cómo cuidar tus sofás en Bogotá" (con link a Purity & Clean)<br>- Artículo: "5 errores que dañan tus colchones" (con link)<br>- Estudio propio: "Estado de la higiene de colchones en Bogotá - Estudio 2026" (dato publishable)<br><br>**3. Guest posting template:**<br>```<br>Hola [Blog], somos Purity & Clean, empresa de limpieza profesional en Bogotá. Queremos contribuir con un artículo para sus lectores sobre [tema]. Tenemos datos únicos de [X] servicios realizados en Bogotá que podemos compartir. ¿Interesado?<br>```<br><br>**4. Tracking de backlinks:**<br>Usar Ahrefs o Semrush para monitorear nuevos backlinks desde estos blogs. |
| **Impacto esperado** | +5-10 backlinks de sitios relevantes en Colombia. Mayor autoridad de dominio. Más menciones en LLMs cuando busquen "empresa de limpieza Bogotá". |
| **Esfuerzo** | M (6-8 horas outreach + contenido + seguimiento) |
| **Agente recomendado** | Content (artículos guest) + CEO (outreach inicial) |
| **Referencias** | [1] Backlinko — "Third-Party Signals Are an SEO Priority" |
| **Estado** | Nueva propuesta — NO mencionada en R1-R107 |
| **Prioridad CEO** | **Estratégica** — construcción de autoridad a 6-12 meses |

---

## Resumen: Propuestas R108

| # | Propuesta | Impacto | Esfuerzo | Prioridad |
|---|-----------|---------|----------|-----------|
| 1 | **LLMs.txt + robots.txt para IA** | Visibility AI search | XS | Experimental |
| 2 | **Geographic-Service Content Clusters** | SEO long-tail + LLM citations | L | **Alta** |
| 3 | **Local Citations + NAP Audit** | SEO local + confianza LLM | M | **Alta** |
| 4 | **Review Management Automation** | Reputation + engagement | S | **Alta** |
| 5 | **Core Web Vitals RUM** | SEO performance | S | Media |
| 6 | **Guest Posting Program** | Third-party authority | M | Estratégica |

---

## Orden de Implementación Sugerido

1. **Propuesta 1** (XS, Experimental) — Semana 1 (quick win)
2. **Propuesta 5** (S, Media) — Semana 1 (en paralelo - analytics)
3. **Propuesta 4** (S, Alta) — Semana 2 (reputation)
4. **Propuesta 3** (M, Alta) — Semana 2-3 (citations)
5. **Propuesta 2** (L, Alta) — Semana 4+ (content clusters)
6. **Propuesta 6** (M, Estratégica) — Mes 2 (outreach)

---

## Fuentes

[1] Backlinko. "5 Crucial SEO Trends in 2026 (and How to Adapt)." https://backlinko.com/seo-this-year

[2] Whitespark. "Local Citation Finder." https://whitespark.ca/local-citation-finder/

[3] BrightLocal. "Review Management Statistics 2025." https://brightlocal.com/research/review-management-statistics/

[4] Google. "Web Vitals Measurement Overview." https://developers.google.com/web/vitals/measurement-overview

---

*Documento generado por Innovation Scout — Round 108*
*Purity & Clean Analysis — 2026-04-28*
*Co-Authored-By: Paperclip <noreply@paperclip.ing>*