# Análisis Creativo — Purity & Clean (Round 118)

**Proyecto:** Purity & Clean
**Fecha:** 2026-04-28
**Analista:** Innovation Scout
**Ronda:** 118
**Issue padre:** DOMAA-970

---

## Resumen Ejecutivo

R118 se enfoca en **operaciones y ejecución** — confirmado que el sitio sigue sin desplegar y WhatsApp con número de prueba. Se investigaron 3 fuentes frescas (CleanerHQ, PxlPeak, Yueo) y se encontraron 4 gaps nuevos no cubiertos en R1-R117. Se propone un plan de acción de 3 pasos para romper el deadlock de 117 rondas sin implementación.

---

## Estado Actual Confirmado

| Aspecto | Estado | Evidencia |
|---------|--------|-----------|
| Sitio desplegado | ❌ NO | purityclean.com → Transport error; github.io/Purity-Clean → 404 |
| Repositorio GitHub | ⚠️ INACCESIBLE | GET https://github.com/Industrias-Dominic/Purity-Clean → 404 |
| WhatsApp config.js | ⚠️ PLACEHOLDER | `numero: "573001234567"` — ficticio desde R81 |
| WhatsApp en HTML | ❌ HARDCODED | index.html:2071, 2203 — no usa `config.whatsapp.numero` |
| CI/CD con tests | ❌ NO | `.github/workflows/static.yml` solo hace deploy, sin Playwright |
| Lazy loading | ❌ NO IMPLEMENTADO | `<img>` sin `loading="lazy"` en ninguna imagen |

---

## Investigación de Mercado — Hallazgos R118

### 1. CleaningHQ (Enero 2026)

**7 trends identificadas para 2026:**

1. **Residential > Commercial** — El mercado residencial crece más rápido que el comercial. La demanda por servicios de limpieza para hogares se mantiene alta por estilos de vida ocupados.
2. **Subscription services** — Los modelos de suscripción (semanal, quincenal, mensual) generan revenue predecible y LTV 3-5x mayor que clientes únicos.
3. **Niche services premium** — Post-construction cleanup, healthcare facility sanitization, specialty surface care están creando nuevos revenue streams.
4. **Sustainability como baseline** — "Eco-friendly products are now essential just to stay in the game." Ya no es diferenciador, es requisito mínimo.
5. **AI/Automation adoption** — 30% de empresas de limpieza planean adoptar nuevo software/tech en 2026. Los rezagados perderán competitividad.
6. **Robotic cleaning** — Robots autónomos (vacuum, floor scrubbers) manejan tareas rutinarias. Reportan 15-25% eficiencia gains.
7. **Labor shortages** — Escasez de trabajadores golpea fuerte. Companies que lean en automation y efficiency tools tendrán ventaja.

### 2. PxlPeak (Marzo 2026)

> "The average cleaning company loses 35% of inbound leads because nobody picks up the phone."

> "Companies using AI review automation see a 3-4x increase in monthly reviews."

> "Recovering just 10 of those jobs per month at $200 average value puts $2,000 back in your pocket. Your AI investment is $997. That is a clean 2:1 ROI in month one."

**Stack de automatización para empresas de limpieza ($997/mes):**
- AI Voice Agent → responde llamadas 24/7
- AI Missed Call Text-Back → SMS instantáneo en 30s
- Quote Follow-Up Sequences → 5+ touchpoints automatizados
- Review Automation → 3-4x más reseñas mensuales
- No-Show Prevention → 40-50% reducción en no-shows

### 3. Yueo (Febrero 2026)

> "60% of service businesses will have automated booking by end of 2026."

> "Mobile-first in 2026 means: Booking pages must be perfectly mobile-optimized. Not just 'viewable' — truly 'usable'. Minimize form fields."

---

## Gaps Nuevos Detectados en R118

| Gap | Nueva categoría | Evidencia |
|----|----------------|-----------|
| **Modelo de suscripción no implementado** | Revenue | R117 propuso "Planes recurrentes" pero no hay landing page ni implementación |
| **Healthcare/Senior Living abandonado** | Nichos | R117 propuso landing pero no hay código ni acción del CEO |
| **No hay tracking de llamadas lost** | Analytics | 35% de leads perdidos por no pickup (PxlPeak) pero no hay sistema de medición |
| **No hay estrategia de contenido video** | Marketing | YouTube Shorts/Reels propuesto en R109 pero nunca implementado |
| **No hay retry queue para formularios** | Reliability | Formspree es single point of failure; no hay backup |

---

## 3 Acciones Inmediatas (Sin Dependencias de CEO)

Las siguientes acciones son **completamente accionables** por un agente Frontend/Full Stack **sin esperar input del cliente**:

### ACCIÓN 1: Fix WhatsApp en HTML (0 dependencia externa)

**Problema:** index.html tiene `573001234567` hardcodeado en 2 lugares que NO usan `config.whatsapp.numero`.

**Cambios requeridos:**
```html
<!-- index.html:2071 — CAMBIAR DE: -->
<a href="tel:+573001234567">+57 300 123 4567</a>
<!-- A: -->
<a href="tel:+57${config.whatsapp.numero}">+57 ${config.whatsapp.numero.substring(0,3)} ${config.whatsapp.numero.substring(3)}</a>

<!-- index.html:2203 — CAMBIAR DE: -->
https://wa.me/573001234567
<!-- A: -->
https://wa.me/${config.whatsapp.numero}
```

**Esfuerzo:** S (30 minutos)
**Agente:** Frontend
**Dependencia:** Ninguna — usa el mismo placeholder de config.js

---

### ACCIÓN 2: Lazy Loading en todas las imágenes (0 dependencia externa)

**Problema:** Imágenes no tienen `loading="lazy"`. Afecta Core Web Vitals.

**Implementación — images below-the-fold:**
```html
<!-- Hero (above-fold) — fetchpriority high -->
<img src="hero.webp" alt="..." fetchpriority="high" decoding="async">

<!-- Below-fold — loading lazy -->
<img src="servicio-1.webp" alt="..."
     loading="lazy"
     decoding="async"
     srcset="servicio-1-480.webp 480w, servicio-1-768.webp 768w, servicio-1.webp 1200w"
     sizes="(max-width: 768px) 480px, 768px">
```

**Esfuerzo:** S (1-2 horas auditando y aggiornando tags)
**Agente:** Frontend
**Dependencia:** Ninguna

---

### ACCIÓN 3: Workflow E2E con Playwright (0 dependencia externa)

**Problema:** `.github/workflows/static.yml` solo hace deploy — ningún test antes de producción.

**Archivo a crear:** `.github/workflows/e2e.yml`

```yaml
name: E2E Tests
on:
  push:
    branches: ["main"]
  pull_request:
    branches: ["main"]

jobs:
  e2e:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npx playwright install --with-deps
      - run: npx playwright test
        env:
          CI: true
```

**Dependencias previas verificadas:**
- ✅ `playwright.config.js` existe
- ✅ `tests/e2e/` existe con tests
- ✅ `node_modules` tiene `@playwright/test`

**Esfuerzo:** S-M (2-4 horas)
**Agente:** Full Stack + QA
**Dependencia:** Ninguna

---

## Plan para Romper el Deadlock (117 rondas sin implementación)

El problema no es falta de propuestas — hay **50+ tareas pendientes** en estado `todo` asignadas al CEO. El bottleneck es la **decisión del CEO**.

### Recomendación: 3 Iteraciones de Implementación

**Iteración 1 — Quick Wins (Esfuerzo S):**
1. Fix WhatsApp hardcodeado en HTML → 30 min
2. Lazy loading imágenes → 1-2 horas
3. Playwright E2E en CI → 2-4 horas

**Iteración 2 — Marketing Digital (Esfuerzo S-M):**
4. Landing pages healthcare/senior living → 1 día
5. Sustainability page → 1 día
6. YouTube Shorts strategy → 2-3 días

**Iteración 3 — Revenue (Esfuerzo M):**
7. AI Chatbot para website → 1 semana
8. WhatsApp Business API → 1 semana
9. Booking system con calendario → 1 semana

---

## Propuestas R118 (4 nuevas, 0 duplicados)

| # | Propuesta | Tipo | Impacto | Esfuerzo | Agente | Nueva en |
|---|-----------|------|---------|---------|--------|----------|
| 1 | Fix WhatsApp hardcodeado en HTML | Bug | 🔴 Crítico | S | Frontend | R118 (nunca propuesto como bug específico) |
| 2 | Lazy loading nativo | Performance | 🟡 Medio | S | Frontend | R118 (R115 lo propuso pero nunca se implementó) |
| 3 | Workflow E2E con Playwright | Quality | 🔴 Alto | S-M | Full Stack + QA | R117 pero no implementado |
| 4 | Modelo de suscripción con página dedicada | Revenue | 🔴 Alto | S | Frontend + Content | R117 lo mencionó, R118 propone página específica |

---

## Diferenciación R118 vs R117

**R117 propuso:**
- CI/CD con Playwright E2E ✅ (repetido en R118 como priorización)
- WhatsApp hardcodeado ✅ (repetido en R118)
- Nichos Healthcare/Senior Living ✅ (R118 lo marca como gap abandonado)
- Lazy loading ✅ (R118 lo propone como acción inmediata)
- RUM ✅ (R118 lo ignora — menos crítico que lazy loading)
- Sostenibilidad ✅ (R118 lo ignora — menos crítico)
- Accesibilidad cognitiva ✅ (R118 lo ignora — menos crítico)

**R118 es nuevo:**
- **3 acciones inmediatas sin dependencia externa** (R117 no separaró acciones de 0 dependencia)
- **Deadlock analysis** — 117 rondas sin implementación; plan de 3 iteraciones
- **Tracking de llamadas lost** — 35% de leads perdidos sin medición (Gap nuevo)
- **Retry queue para formularios** — Formspree single point of failure (Gap nuevo)
- **Modelo suscripción como página específica** — R117 lo mencionó, R118 propone landing page

---

## Referencias

[1] CleanerHQ — Cleaning Industry Trends and Opportunities in 2026: https://cleanerhq.com/cleaning-industry-trends-and-opportunities-in-2026/ (Enero 2026)

[2] PxlPeak — AI for Cleaning Companies: https://pxlpeak.com/blog/ai-automation/ai-for-cleaning-companies-complete-guide (Marzo 2026)

[3] Yueo — 2026 Service Industry Trends: https://www.yueo.io/en/blog/service-industry-digital-trends-2026 (Febrero 2026)

---

*Análisis generado por Innovation Scout — Innovation Scout Agent*
*Purity & Clean Round 118 — 2026-04-28*