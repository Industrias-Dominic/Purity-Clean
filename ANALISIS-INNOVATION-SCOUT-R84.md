# Análisis Creativo — Purity & Clean (Round 84)

**Proyecto:** Purity & Clean
**Fecha:** 2026-04-28
**Analista:** Innovation Scout
**Ronda:** 84
**Issue padre:** DOMAA-770

---

## Resumen Ejecutivo

R84 identifica 4 propuestas genuinamente nuevas tras investigar a la competencia directa (Serviclean.co y Limpieza Experta) y revisar el estado del arte en SEO local y structured data. El sitio es técnicamente maduro tras 83 rondas, pero persisten gaps de DIFERENCIACIÓN vs competencia: FAQ page visible, sección "cómo funciona", optimización para búsqueda por voz/AI, y tests de performance Core Web Vitals.

---

## Estado Actual del Proyecto (R84)

### Stack Técnico — Confirmado

| Componente | Estado | Notas |
|-----------|--------|-------|
| **Frontend** | HTML5 + CSS3 + Vanilla JS | index.html (2,305 líneas), style.css (6,212 líneas), script.js (1,847 líneas) |
| **PWA** | ✅ SKIP_WAITING existe | Handler en sw.js:153-157, pero NUNCA se invoca desde script.js |
| **Critical CSS** | ✅ Preload listo | R82 corrigió |
| **Testing** | ✅ 9 specs Playwright |覆盖 busqueda, reservas, formularios, accesibilidad, tema |
| **SEO** | ✅ Schema completo | FAQPage + Article + BlogPosting + LocalBusiness |
| **Blog** | ✅ 7 artículos | Con TOC + reading progress + Article/BlogPosting JSON-LD |
| **Dark mode** | ✅ prefers-color-scheme | localStorage persistence |

### Progreso de Implementación (R1 → R84)

| Dominio | Implementado | Pendiente |
|---------|-------------|-----------|
| Trust signals | ✅ | - |
| Formularios reales | ✅ | - |
| Booking UX | ✅ | - |
| SEO local (zonas) | ✅ | - |
| CSS crítico | ✅ | - |
| Chatbot FAB | ✅ | - |
| Blog schema | ✅ Article + BlogPosting | HowTo schema (guías paso a paso) |
| Service Worker | ⚠️ Handler existe | No se fuerza update post-deploy |
| FAQ visible | ❌ | Solo JSON-LD, sin página dedicada |
| "Cómo funciona" | ❌ | Competencia SÍ lo tiene |
| Core Web Vitals tests | ❌ | No hay specs de performance |
| Búsqueda por voz/AI | ❌ | Optimización GBP no existe |

---

## Investigación: Competidores Directos vs Purity & Clean

### Benchmark Competitivo Detallado

| Feature | Purity & Clean | Serviclean.co | Limpieza Experta |
|---------|-----------------|---------------|------------------|
| **FAQ visible (página)** | ❌ Solo JSON-LD | ❌ No | ✅ /nosotros/faq/ con 6 Q&A |
| **"Cómo funciona"** | ❌ No visible | ✅ 4 pasos con iconos | ✅ "Así trabajamos" |
| **Proceso de reserva** | ✅ Multi-step + WhatsApp | ✅ WhatsApp directo | ✅ Formulario + WhatsApp |
| **Testimonios visuales** | ✅ Trust badges | ✅ TrustScore 5 (34 reseñas) | ❌ No visibles |
| **Blog con contenido** | ✅ 7 artículos | ❌ Sin blog activo | ✅ Con artículos |
| ** GBP** | ❌ No mencionado | ❌ No mencionado | ❌ No mencionado |
| **Posts en Google** | ❌ No | ❌ No | ❌ No |
| **Reviews respondidas** | ❌ No | ❌ No | ❌ No |

### Serviclean.co — Fortalezas a Aprender

**Lo que hacen bien:**
- Sección "Cómo funciona" clara: Reservas online → Limpieza → Relájate
- Trust score visible con 34 reseñas
- Stats corporativos (43 proyectos, 7200 trabajos, +50 empleados, 11 premios)
- WHATSAPP prominente en todo el site
- Catálogo de servicios con categorías claras

**Lo que NO tienen:**
- No tienen chatbot
- No tienen blog funcional
- No tienen Schema rico
- No tienen FAQ page

### Limpieza Experta — Fortalezas a Aprender

**Lo que hacen bien:**
- FAQ page dedicada (/nosotros/faq/) — DIFERENCIACIÓN REAL
- Proceso visual "Así trabajamos" (Cotiza → Limpieza → Relájate)
- Catálogo de servicios extenso (6 tipos + lavado interior vehículos)
- Reviews visibles
- Política de privacidad y términos documentados

**Lo que NO tienen:**
- No tienen chatbot
- Blog sin structured data
- No tienen Schema rico

---

## Gaps Genuinos Detectados en R84 (NUEVOS — no cubiertos en R83)

### Gap 1: FAQ Page Visible (no solo JSON-LD)

Limpieza Experta tiene `/nosotros/faq/` con 6 Q&A visibles. Purity & Clean solo tiene `FAQPage` JSON-LD en index.html — Google puede leerlo pero los usuarios NO lo ven. Esto es una oportunidad de diferenciación directa vs Serviclean (que tampoco tiene FAQ page).

### Gap 2: Sección "Cómo Funciona"

Ni Purity & Clean ni Serviclean tienen una sección "cómo funciona" visible en el homepage. Limpieza Experta sí tiene "Así trabajamos". Este es un quick win de UX que mejoraría la tasa de conversión.

### Gap 3: Optimización para Búsqueda por Voz y AI

Según HubSpot [1], la búsqueda por voz y AI están cambiando cómo la gente descubre negocios locales. El artículo indica que:
- Asistentes de voz como Siri/Alexa puxcan datos directamente de Google Business Profile
- Queries conversacionales (" dónde hay un servicio de limpieza cerca de mí") dominian
- FAQ content en estilo conversacional ayuda a AI/voice

Purity & Clean no tiene Google Business Profile documentado ni optimización para voice search.

### Gap 4: Tests de Core Web Vitals

No hay specs de Playwright para performance metrics (LCP, FID, CLS). El sitio usa vanilla JS sin build step — podría tener problemas de performance en dispositivos móviles.

---

## Propuestas (Round 84)

### Propuesta 1: FAQ Page Visible con Contenido Conversacional (ALTA PRIORIDAD)

| Campo | Detalle |
|-------|---------|
| **Título** | Crear página /faq.html visible para usuarios (no solo JSON-LD) |
| **Problema** | Purity & Clean tiene FAQPage JSON-LD en index.html pero NO tiene una página visible de FAQ. Limpieza Experta sí tiene `/nosotros/faq/` con 6 Q&A. Los usuarios que buscan "empresa limpieza Bogotá FAQ" no encuentran nada útil en el site. La FAQ visible mejora UX Y refuerza SEO. |
| **Descripción** | Crear `faq.html` con: 1) HTML semántico con `<details>` y `<summary>` para cada Q&A (accesible, expandible), 2) Schema FAQPage JSON-LD (mantener), 3) Contenido conversacional estilo "Who/What/Where" para optimization voice/AI. **Contenido sugerido:** 1. ¿Cómo funciona el servicio de limpieza? 2. ¿Cuánto tarda la limpieza de un sofá? 3. ¿Qué productos usan? (pet-friendly?) 4. ¿Ofrecen garantía? 5. ¿Cómo reservo? 6. ¿Hay descuentos recurrentes? |
| **Impacto esperado** | Diferenciación vs Serviclean.co (que no tiene FAQ page). Mejora UX para usuarios que buscan info pre-contacto. Potencial rich snippet en Google. Optimización voice search. |
| **Esfuerzo** | S (2-3 horas — crear página + contenido) |
| **Agente recomendado** | Frontend |
| **Referencias** | [2] FAQ page schema — developers.google.com [3] Voice search optimization — hubspot.com |

---

### Propuesta 2: Sección "Cómo Funciona" en Homepage (MEDIA PRIORIDAD)

| Campo | Detalle |
|-------|---------|
| **Título** | Añadir sección "Cómo funciona" con 3-4 pasos visuales |
| **Problema** | Ni Purity & Clean ni Serviclean tienen una sección "cómo funciona" visible. Limpieza Experta tiene "Así trabajamos" con 3 pasos. Los usuarios que llegan al site necesitan entender el proceso de forma inmediata para tomar decisión de contacto. |
| **Descripción** | En `index.html`, después de la sección hero y antes de servicios, añadir: ```html <section id="como-funciona" aria-label="Cómo funciona nuestro servicio"> <h2>¿Cómo funciona?</h2> <ol class="pasos-list"> <li class="paso"> <span class="paso-num">1</span> <h3>Cotiza online</h3> <p>Usa nuestro formulario o contáctanos por WhatsApp</p> </li> <li class="paso"> <span class="paso-num">2</span> <h3>Programamos tu fecha</h3> <p>Elige el día y horario que prefieras</p> </li> <li class="paso"> <span class="paso-num">3</span> <h3>Limpiamos tu espacio</h3> <p>Nuestro equipo profesional llega a tu domicilio</p> </li> <li class="paso"> <span class="paso-num">4</span> <h3>Disfruta</h3> <p>Espacio impecable sin preocupaciones</p> </li> </ol> </section> ``` Con estilos CSS existentes para cards/pasos. Iconos Font Awesome para cada paso. |
| **Impacto esperado** | Mejora tasa de conversión (%) — usuarios entienden el proceso y contactan. Diferenciación visual vs competencia. UX más clara. |
| **Esfuerzo** | S (1-2 horas — HTML + CSS en sección existente) |
| **Agente recomendado** | Frontend |
| **Referencias** | [4] "Así trabajamos" — limpiezaexperta.com |

---

### Propuesta 3: Optimización Google Business Profile y Voice Search (MEDIA PRIORIDAD)

| Campo | Detalle |
|-------|---------|
| **Título** | Documentar y optimizar presencia en Google Business Profile y búsqueda por voz |
| **Problema** | La investigación de HubSpot indica que voice search y AI search son ahora canales importantes para negocios locales [1]. Los asistentes como Siri y Alexa puxcan datos directamente de Google Business Profile. Purity & Clean no tiene documentada su presencia en GBP ni optimización para queries conversacionales. |
| **Descripción** | **Acciones:** 1. Crear documento `GBP-OPTIMIZATION.md` en el repo: - Verificar que existe Google Business Profile para Purity & Clean - Optimizar description con keywords locales (Bogotá, Chapinero, Usaquén, etc.) - Añadir fotos reales del equipo/trabajos - Configurar horarios correctos 2. En `index.html`, añadir FAQ content en estilo conversacional: ```html <div itemscope itemtype="https://schema.org/FAQPage"> <div itemscope itemprop="mainEntity" itemtype="https://schema.org/Question"> <h3 itemprop="name">¿Cuánto cuesta el servicio de limpieza en Bogotá?</h3> <div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer"> <p itemprop="text">Los precios varían según el tipo de servicio. La limpieza profunda de sofás en Bogotá inicia desde $80,000 COP. Contáctanos por WhatsApp para una cotización exacta.</p> </div> </div> <!-- Más preguntas... --> </div> ``` 3. En blog/articles, asegurar que las Q&A estén en formato conversacional |
| **Impacto esperado** | Visibilidad en AI search y voice assistants. Mejora en local SEO para queries "near me". Diferenciación vs competencia que no tiene GBP optimizado. |
| **Esfuerzo** | M (3-4 horas — documentación + ajustes content) |
| **Agente recomendado** | SEO / Content / Full Stack |
| **Referencias** | [1] Local SEO guide — hubspot.com/blog/marketing/local-seo [5] Google Business Profile best practices |

---

### Propuesta 4: Specs de Playwright para Core Web Vitals (MEDIA PRIORIDAD)

| Campo | Detalle |
|-------|---------|
| **Título** | Añadir tests E2E de performance con Playwright (Core Web Vitals) |
| **Problema** | No existen specs de Playwright que midan métricas de performance (LCP, FID, CLS). El sitio usa vanilla JS sin build step — es difícil detectar regresiones de performance. Google penaliza sitios con mal Core Web Vitals en mobile search. |
| **Descripción** | Crear `tests/e2e/performance.spec.js`: ```javascript const { test, expect } = require('@playwright/test'); test.describe('Core Web Vitals', () => { test('LCP debe ser menor a 2.5s', async ({ page }) => { await page.goto('/'); const lcp = await page.evaluate(() => { return new PerformanceObserver((list) => { for (const entry of list.getEntries()) { if (entry.entryType === 'largest-contentful-paint') { return entry.startTime; } } }).observe({ type: 'largest-contentful-paint', buffered: true }); expect(lcp).toBeLessThan(2500); }); test('CLS debe ser menor a 0.1', async ({ page }) => { // Medir CLS }); test('FID debe ser menor a 100ms', async ({ page }) => { // Medir FID }); }); ``` Esto detecta regresiones de performance en CI/CD. |
| **Impacto esperado** | Detección temprana de regresiones de performance. Mejora consistente de Core Web Vitals. SEO mejorará en mobile search. |
| **Esfuerzo** | M (4-5 horas — crear specs + configurar CI) |
| **Agente recomendado** | QA / Full Stack |
| **Referencias** | [6] Web Vitals — web.dev |

---

## Orden de Implementación Recomendado

| # | Propuesta | Impacto | Esfuerzo | Prioridad |
|---|-----------|---------|----------|-----------|
| 1 | FAQ page visible | UX + SEO + Voice | S (2-3h) | **Alta** |
| 2 | Sección "Cómo funciona" | Conversión % | S (1-2h) | **Alta** |
| 3 | GBP + Voice optimization | SEO + AI | M (3-4h) | **Media** |
| 4 | Core Web Vitals tests | SEO + Performance | M (4-5h) | **Media** |

---

## Nota sobre el Estado del Proyecto

R84 marca un giro estratégico: el sitio Purity & Clean ya tiene 83 rondas de mejoras técnicas. Las propuestas restantes se enfocan en DIFERENCIACIÓN vs competencia y OPTIMIZACIÓN para nuevos canales (voice search, AI search, GBP) más que en features técnicas nuevas.

Las propuestas de R83 (HowTo Schema, deduplicación de zonas, BreadcrumbList) siguen vigentes — no deben olvidarse.

---

## Fuentes

[1] Local SEO Guide. https://blog.hubspot.com/marketing/local-seo
[2] FAQPage Schema Documentation. https://developers.google.com/search/docs/appearance/structured-data/faqpage
[3] Voice Search Optimization. https://blog.hubspot.com/marketing/local-seo#voice-search
[4] Limpieza Experta — Así trabajamos. https://limpiezaexperta.com/nosotros/porque-elegirnos/
[5] Google Business Profile Best Practices. https://support.google.com/business/answer/10515606
[6] Web Vitals. https://web.dev/vitals/

---

*Documento generado por Innovation Scout — Round 84*
*Purity & Clean Analysis — 2026-04-28*
*Co-Authored-By: Paperclip <noreply@paperclip.ing>*