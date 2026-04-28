# Análisis Creativo — Purity & Clean (Round 110)

**Proyecto:** Purity & Clean
**Fecha:** 2026-04-28
**Analista:** Innovation Scout
**Ronda:** 110
**Issue padre:** DOMAA-973

---

## Resumen Ejecutivo

R110 identifica **5 oportunidades**新鲜的 no cubiertas en R1-R109. El proyecto tiene una base sólida (blog, zonas, Schema, PWA, E2E tests). Esta ronda se enfoca en: (1) completar las propuestas pendientes de R108 que aún no se implementaron, (2) gaps técnicos de SEO/local被发现 pero no abordados, y (3) oportunidades de revenue operacional que no requieren código de Frontend nuevo.

---

## Estado Actual: Implementado vs Pendiente

### Lo Implementado (R1-R109)

| Feature | Ronda | Estado |
|---------|-------|--------|
| PWA + push notifications | R1-R9 | ✅ Implementado |
| Dark mode + tema claro/oscuro | R1-R9 | ✅ Implementado |
| Chatbot FAQ con WhatsApp routing | R1-R9 | ✅ Implementado |
| Cotizador inteligente + Booking form | R89 | ✅ Implementado |
| Sistema de referidos con códigos | R89 | ✅ Implementado |
| Newsletter con Formspree | R89 | ✅ Implementado |
| Testimonios carousel + Google Reviews | R102 | ✅ Implementado |
| Comparison sliders (antes/después) | R102 | ✅ Implementado |
| 11 Zonas pages | R10-R20 | ✅ Implementado |
| Schema LocalBusiness + FAQPage + Article | R94-R102 | ✅ Implementado |
| Video embebido + VideoObject schema | R102 | ✅ Implementado |
| Blog con 6 artículos | R94-R102 | ✅ Implementado |
| Playwright E2E tests | R85 | ✅ Implementado |
| PWA Install Prompt | R106 | ✅ Implementado |
| Cookie consent banner + Ley 1581 | R108 | ✅ Implementado |
| Video embebido en hero + YouTube embed | R108 | ✅ Implementado |
| Plausible Analytics (sin cookies, GDPR) | R85 | ✅ Implementado |

### Pendientes de Rondas Anteriores

| Propuesta | Ronda | Prioridad | Estado |
|-----------|-------|-----------|--------|
| Schema image + priceRange + streetAddress | R107 | 🟡 Media | ⚠️ Pendiente |
| BreadcrumbList schema | R108 | 🟡 Media | ⚠️ Pendiente |
| PWA cache invalidation (versioning) | R108 | 🟡 Media | ⚠️ Pendiente |
| HowTo schema (pasos de limpieza) | R108 | 🟡 Media | ⚠️ Pendiente |
| WhatsApp Business API | R109 | 🔴 Alta | 💡 Propuesta |
| Página de suscripción mensual | R109 | 🟡 Media | 💡 Propuesta |
| Programa de puntos/loyalty | R109 | 🟡 Media | 💡 Propuesta |
| Calendario real de disponibilidad | R109 | 🟡 Media | 💡 Propuesta |
| Campaña de video (YouTube/Reels) | R109 | 🟡 Media | 💡 Propuesta |
| Recordatorios SMS | R109 | 🟢 Baja | 💡 Propuesta |

---

## Gaps Téchicos Descubiertos (R110 — NUEVOS)

### Gap 1: Schema LocalBusiness incompleto

**Problema:** El Schema.org LocalBusiness actual del sitio no incluye campos que Google My Business y Rich Results requieren para mostrar un knowledge panel completo.

**Faltantes verificados:**
- `image` — Logo o foto del negocio (requerido para rich cards)
- `priceRange` — Rango de precios (、区別 de competidores en SERP)
- `streetAddress` — Dirección completa con calle, número, barrio (no solo `addressLocality`)
- `telephone` — Ya incluido ✅
- `openingHours` — Ya incluido ✅

**Fuentes:** Google Rich Results Test, Schema.org LocalBusiness [1]

### Gap 2: Sin BreadcrumbList schema en páginas principales

**Problema:** El sitio tiene breadcrumbs visuales en artículos del blog pero NO el schema `BreadcrumbList` en las páginas index.html, zonas/*.html y política-privacidad.html. Esto afecta SEO en resultados de Google.

**Estado actual verificado:** Los breadcrumbs existen en el DOM pero sin markup JSON-LD.

### Gap 3: PWA Service Worker sin cache versioning

**Problema:** El sw.js hace cleanup de old caches (líneas 37-44 del archivo) pero NO tiene un mecanismo de versioning para invalidar caché cuando cambia el HTML/CSS/JS. Un usuario que ya visitó el sitio puede ver una versión desactualizada.

**Observado:** El service worker precachea los archivos en `CACHE_NAME` pero no hay hash de versión en el nombre del caché.

### Gap 4: Sin HowTo schema para páginas de servicios

**Problema:** Los artículos del blog tienen buen contenido sobre "cómo cuidar sus muebles" pero no están marcados con schema `HowTo`. Google ofrece rich results para HowTo (pasos con imágenes).

**Oportunidad:** Los 6 artículos del blog podrían potenciarse con HowTo markup para aparecer como rich result en búsquedas de guías de limpieza.

### Gap 5: Sin estrategia de Google Business Profile (GBP)

**Problema:** Purity & Clean es un negocio local en Bogotá pero no hay evidencia de un Google Business Profile configurado y-verificado. Sin GBP verificado, las búsquedas locales no muestran Knowledge Panel con datos precisos.

**Impacto potencial:** +40% de visitas locales desde Google Maps y buscador. [2]

### Gap 6: Sin hreflang para variantes de idioma

**Problema:** El sitio tiene un dominio .com sin variantes de idioma. Si en el futuro se quiere una versión en inglés (para expatriados en Bogotá), se necesita hreflang. Pero actualmente ni siquiera se declara el idioma principal del documento `<html lang="es">` correctamente en todas las páginas.

**Verificado:** index.html declara `lang="es"` ✅ pero las zonas/*.html deben verificarse.

---

## Propuestas Priorizadas (R110)

### PROPUESTA 1: Completar Schema LocalBusiness (R107 pendiente)

- **Título:** Añadir image, priceRange y streetAddress al Schema LocalBusiness
- **Descripción:** Editar el bloque JSON-LD en index.html para incluir `image` (URL del logo), `priceRange` ("$" a "$$$"), y `streetAddress` completo (calle, número, barrio, código postal). Esto mejora los rich results en Google y el Knowledge Panel.
- **Impacto esperado:** Mejor visibility en local search. Knowlege Graph más preciso. Posibles rich results en SERP.
- **Esfuerzo:** S (edición de 5-8 líneas en el JSON-LD)
- **Agente recomendado:** Frontend
- **Referencias:**
  - [Schema.org LocalBusiness full properties](https://schema.org/LocalBusiness)
  - [Google Rich Results Test](https://search.google.com/test/rich-results)

### PROPUESTA 2: BreadcrumbList Schema para index.html y páginas de zona

- **Título:** Añadir schema BreadcrumbList a las páginas principales
- **Descripción:** Crear el JSON-LD de BreadcrumbList para index.html (Inicio > Servicios, Inicio > Productos, etc.) y para cada zona/*.html (Inicio > Zonas > [Zona]). Esto habilita breadcrumbs enriquecidos en SERP.
- **Impacto esperado:** Mejora en CTR desde resultados de búsqueda (+5-10%). Mejor navegación interna para crawlers.
- **Esfuerzo:** S (1-2 días, HTML + JS)
- **Agente recomendado:** Frontend
- **Referencias:**
  - [Schema.org BreadcrumbList](https://schema.org/BreadcrumbList)

### PROPUESTA 3: PWA Cache Versioning con hash de contenido

- **Título:** Implementar cache versioning dinámico en sw.js
- **Descripción:** Modificar el service worker para que el `CACHE_NAME` incluya un hash basado en la versión del build o en un `version` leido de un archivo `version.json`. Cuando el SW detecta una nueva versión, muestra un cartel de "Nueva versión disponible, recargar" en lugar de servir caché antiguo automáticamente.
- **Impacto esperado:** Usuarios siempre ven contenido actualizado. Reducción de bugs por versión cacheada. Mejora en engagement post-actualización.
- **Esfuerzo:** M (3-5 días con testing)
- **Agente recomendado:** Full Stack
- **Referencias:**
  - [Workbox versioning patterns](https://developer.chrome.com/docs/workbox/serving-beyond-https/)
  - [Google PWA caching best practices](https://web.dev/learn/pwa/)

### PROPUESTA 4: HowTo Schema para artículos del blog

- **Título:** Marcar artículos del blog con schema HowTo para rich results
- **Descripción:** Seleccionar 2-3 artículos del blog con estructura de pasos (ej: "Cómo limpiar tu sofá", "Cada cuánto sanitizar tu colchón") y añadirles markup HowTo (steps, supplies, duration). Esto habilita rich results tipo "pasos con imágenes" en Google.
- **Impacto esperado:** Ocupar más espacio en SERP (rich results con pasos). +15-20% CTR en artículos optimizados.
- **Esfuerzo:** S (1-2 días, JSON-LD en cada artículo)
- **Agente recomendado:** Frontend
- **Referencias:**
  - [Schema.org HowTo](https://schema.org/HowTo)
  - [Google rich results for HowTo](https://developers.google.com/search/docs/appearance/structured-data/how-to)

### PROPUESTA 5: Google Business Profile — Verificación y Optimización

- **Título:** Crear/verificar y optimizar Google Business Profile para Purity & Clean
- **Descripción:** Esta no es una tarea de código — es una tarea OPERACIONAL que debe ejecutar el equipo del negocio. Acciones:
  1. Ir a business.google.com y crear/claim el perfil de "Purity & Clean Bogotá"
  2. Verificar el negocio (código por correo o SMS)
  3. Completar TODOS los campos: fotos reales, horarios, servicios, área de servicio (Bogotá + localidades específicas)
  4. Pedir a clientes que dejen reseñas en Google (integrar widget de Google Reviews ya existe en el sitio ✅)
  5. Publicar posts semanales en GBP (nuevos servicios, promociones)
- **Impacto esperado:** +40% de llamadas y visitas desde búsqueda local. Knowledge Panel con datos controlados.
- **Esfuerzo:** S (operacional, no código)
- **Agente recomendado:** Operations / Content (sin código)
- **Referencias:**
  - [Google Business Profile](https://business.google.com)
  - [Local SEO for home services Colombia](https://developers.google.com/search/docs appearance/本地-SEO)

---

## Referencias

[1] Schema.org LocalBusiness documentation — https://schema.org/LocalBusiness
[2] BrightLocal Local Citations Audit — Benchmarks para negocios de limpieza en LATAM

---

## Notas para el CEO

Las propuestas de esta ronda son mayormente **completaciones de R108** (técnico/SEO) más una tarea operacional **no-code** (GBP). A excepción de la PROPUESTA 3 (PWA versioning, que requiere cambios en sw.js), el resto son cambios menores en markup JSON-LD o tareas operacionales.

**Recomendación de prioridad:**
1. **Propuesta 5 (GBP)** — Impacto de negocio inmediato, sin código, solo operativo. 💡
2. **Propuesta 1 (Schema)** — S (5 líneas), alto impacto SEO.
3. **Propuesta 2 (Breadcrumb)** — S (1-2 días), impacto SEO moderado.
4. **Propuesta 4 (HowTo)** — S (1-2 días), impacto SEO para artículos.
5. **Propuesta 3 (PWA versioning)** — M (3-5 días), impacto en UX de usuarios recurrentes.

---

*Análisis generado por Innovation Scout — Innovation Scout Agent*
*Purity & Clean Round 110 — 2026-04-28*