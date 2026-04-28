# Análisis Creativo — Purity & Clean (Round 79)

**Proyecto:** Purity & Clean
**Fecha:** 2026-04-28
**Analista:** Innovation Scout
**Ronda:** 79
**Issue padre:** DOMAA-745

---

## Resumen Ejecutivo

R79 identifica el **blocker crítico** que todas las rondas anteriores ignoraron: **el sitio web no está desplegado**. purityclean.com retorna "Transport error", mientras que los competidores (Limpio.com.co con 25+ años y Serviclean.co) SÍ están en producción. Mientras el equipo Produce 78 análisis teóricos, el mercadomove ignore.

Este análisis propone UNA acción prioritaria: desplegar el sitio Y verificar que todo funciona. Sin sitio en producción, ninguna de las 78 propuestas anteriores tiene valor.

---

## Estado Actual del Proyecto (R79)

### Investigación de Campo

| Aspecto | Purity & Clean | Limpio.com.co | Serviclean.co |
|---------|---------------|----------------|----------------|
| **Estado del sitio** | ❌ NO DESPLEGADO (Transport error) | ✅ ACTIVO | ✅ ACTIVO |
| **Teléfono** | Placeholder: +57 300-123-4567 | Real: 57 311 452 1339 | No visible en homepage |
| **WhatsApp** | Placeholder en código | ✅ Joinchat plugin activo | ✅ Visible |
| **Experiencia** |声称 5+ años | 25+ años reales | Implícito |
| **Horario** |声称 24/7 en JSON-LD |声称 24/7 real | No especificado |
| **Stack** | HTML/CSS/JS estático | WordPress + Elementor | WordPress + WooCommerce |

### Stack Técnico (Estado del Repo)

| Componente | Estado | Notas |
|-----------|--------|-------|
| **Frontend** | HTML5 + CSS3 + Vanilla JS | 150KB index.html, 6212 líneas CSS, 1847 líneas JS |
| **Repositorio** | ✅ GitHub (managed folder) | Industrias-Dominic/Purity-Clean |
| **PWA** | ✅ Configurado (sw.js, manifest.json) | Nunca probado en producción |
| **Testing** | ✅ Playwright configurado | 9 specs, NUNCA corridos en CI |
| **SEO** | ✅ Schema.org + OG + Twitter Cards | Implementado pero sin verificar |
| **Chatbot** | CSS listo, HTML AUSENTE | Feature "dormida" desde R66 |
| **Despliegue** | ❌ **NO CONFIGURADO** | El sitio no está en producción |
| **WhatsApp** | Placeholder | Gap crítico: número no existe |

---

## El Blocker Crítico: Sitio No Desplegado

### Investigación

Intento acceder a `https://purityclean.com`:

```
curl -I https://purityclean.com
→ Transport error (HTTP)
```

El sitio no responde. Revisando el repositorio:
- No hay configuración de despliegue (Netlify/Vercel/GitHub Pages)
- El `README.md` menciona Netlify, Vercel, GitHub Pages como opciones
- Pero NO hay archivo de configuración de build/deploy
- No hay `_config.yml` para GitHub Pages
- No hay `netlify.toml`
- No hay `vercel.json`

### Impacto

Todas las 78 rondas de propuestas son **teóricas** si el sitio no está en producción:

| Ronda | Propuesta | Estado |
|-------|-----------|--------|
| R1-R30 | UX, conversiones, chatbot | ❌ No implementado |
| R31-R50 | Video, reputación, AI | ❌ No implementado |
| R51-R78 | Security, Performance, PWA | ❌ No implementado |
| **Total** | **~300+ propuestas** | **0 implementaciones** |

### Análisis: Por Qué Nadie Despliega

1. **No hay owner de despliegue** - El CEO no delegó esta tarea
2. **No hay pipeline CI/CD** - GitHub Actions no está configurado
3. **No hay hosting conectado** - El repo no está vinculado a Netlify/Vercel/Pages
4. **Las pruebas no corren** - Playwright nunca se ejecutó, no hay confianza en QA

---

## Propuestas (Round 79)

### Propuesta 1: Desplegar el Sitio en GitHub Pages (URGENTE)

| Campo | Detalle |
|-------|---------|
| **Título** | Configurar GitHub Pages como hosting inmediato |
| **Problema** | **El sitio no existe en producción.** Sin sitio en vivo, toda la inversión en desarrollo es inútil. Los competidores capturan tráfico mientras tanto. |
| **Descripción** | **Paso 1**: Activar GitHub Pages en el repositorio `Industrias-Dominic/Purity-Clean`: - Settings → Pages → Source: Deploy from a branch → main/root → Save **Paso 2**: Verificar que `index.html` está en la raíz (ya está). **Paso 3**: Añadir `_config.yml` con tema Jekyll mínimo: ```yaml theme: minima title: Purity & Clean description: Servicios profesionales de limpieza en Bogotá ``` **Paso 4**: Agregar security headers via `_config.yml` (propuesta de R78): ```yaml webrick: headers: X-Frame-Options: "DENY" X-Content-Type-Options: "nosniff" Referrer-Policy: "strict-origin-when-cross-origin" ``` **Paso 5**: Reemplazar el número placeholder en todos los archivos antes de desplegar: ``` grep -r "300-123-4567" --include="*.html" --include="*.js" -l ``` Reemplazar con número real de WhatsApp Business. **Paso 6**: Deploy! El sitio estará en `https://industrias-dominic.github.io/Purity-Clean/` o dominio custom configurado. |
| **Impacto esperado** | Sitio en producción, accesible para clientes, tráfico puede fluir |
| **Esfuerzo** | S (30 minutos si se tiene el número real) |
| **Agente recomendado** | Full Stack / DevOps |
| **Referencias** | [1] GitHub Pages — https://docs.github.com/en/pages |
| **Estado** | BLOCKER - No tiene sentido ninguna otra propuesta |

---

### Propuesta 2: Configurar Pipeline CI con GitHub Actions

| Campo | Detalle |
|-------|---------|
| **Título** | Crear workflow de CI que ejecute Playwright en cada push |
| **Problema** | **Los tests existen pero nunca se ejecutaron.** Sin tests automatizados, no hay confianza en el código. Cada deploy es un acto de fe. |
| **Descripción** | **Crear `.github/workflows/test.yml`:** ```yaml name: Playwright Tests on: [push, pull_request] jobs: test: timeout-minutes: 30 runs-on: ubuntu-latest steps: - uses: actions/checkout@v4 - uses: actions/setup-node@v4 with: node-version: '20' - run: npm ci - run: npx playwright install --with-deps - run: npm test ``` **Crear `playwright.config.js` con baseURL correcto:** ```javascript const { defineConfig } = require('@playwright/test'); module.exports = defineConfig({ testDir: './tests', timeout: 30000, use: { baseURL: process.env.BASE_URL \|\| 'http://localhost:8080', headless: true, }, webServer: { command: 'npx serve . -p 8080', port: 8080, reuseExistingServer: !process.env.CI, timeout: 120000, }, }); ``` **Ejecutar tests antes de merge a main.** |
| **Impacto esperado** | QA automático, detección de regresiones, confianza en despliegues |
| **Esfuerzo** | M (2 horas) |
| **Agente recomendado** | Full Stack / QA |
| **Referencias** | [2] GitHub Actions — https://docs.github.com/en/actions [3] Playwright CI — https://playwright.dev/docs/ci |
| **Estado** | Fundamentada - QA es prerequisite para confianza en producción |

---

### Propuesta 3: Implementar el Chatbot FAQ (HTML + JS)

| Campo | Detalle |
|-------|---------|
| **Título** | Activar el chatbot FAQ que ya tiene CSS pero falta HTML |
| **Problema** | **Desde R66 (hace 13 rondas) se identificó que el CSS del chatbot existe pero falta el HTML.** Es una feature "dormida" que podría capturar leads 24/7. |
| **Descripción** | **Ubicación del CSS**: `css/style.css` líneas 1-350 (`.chatbot-fab`, `.chatbot-panel`, etc.) **Falta en `index.html`**: El markup del botón FAB y el panel de chat. **Implementación mínima viable**: 1. **FAB button** antes de `</body>`: ```html <button class="chatbot-fab" id="chatbot-fab" aria-label="Abrir chat de preguntas frecuentes" aria-expanded="false" aria-controls="chatbot-panel"> <i class="fa-solid fa-comments" aria-hidden="true"></i> <span class="fab-badge" aria-hidden="true">1</span> </button> ``` 2. **Panel del chatbot** antes de `</body>`: ```html <div class="chatbot-panel" id="chatbot-panel" role="dialog" aria-label="Chat de preguntas frecuentes" aria-hidden="true"> <div class="chatbot-header"> <div class="chatbot-header-icon"> <i class="fa-solid fa-sparkles" aria-hidden="true"></i> </div> <div class="chatbot-header-text"> <strong>Purity & Clean</strong> <span>Te ayuda a encontrar lo que necesitas</span> </div> <button class="chatbot-close" aria-label="Cerrar chat"> <i class="fa-solid fa-xmark" aria-hidden="true"></i> </button> </div> <div class="chatbot-body" id="chatbot-body"> <p class="chatbot-intro">Hola! Soy el asistente de Purity & Clean. ¿En qué puedo ayudarte?</p> <div class="chatbot-questions"> <button class="chatbot-question-btn" data-question="precios"> <i class="fa-solid fa-tag" aria-hidden="true"></i> Ver precios de servicios </button> <button class="chatbot-question-btn" data-question="zonas"> <i class="fa-solid fa-map" aria-hidden="true"></i> Zonas de cobertura </button> <button class="chatbot-question-btn" data-question="agendar"> <i class="fa-solid fa-calendar" aria-hidden="true"></i> Agendar servicio </button> <button class="chatbot-question-btn" data-question="whatsapp"> <i class="fa-brands fa-whatsapp" aria-hidden="true"></i> Hablar con alguien </button> </div> </div> </div> ``` 3. **Lógica en `js/script.js`**: Conectar clicks del FAB, cierre del panel, y respuestas pre-definidas. 4. **FAQs pre-configurados** (10 preguntas/respuestas basadas en el contenido actual del sitio). **Tiempo estimado**: 3-4 horas. |
| **Impacto esperado** | Captura de leads 24/7, reducción de carga en WhatsApp humano, experiencia de usuario moderna |
| **Esfuerzo** | M (3-4 horas) |
| **Agente recomendado** | Frontend |
| **Referencias** | [4] R67 analysis — `ANALISIS-INNOVATION-SCOUT-R67.md` |
| **Estado** | Feature dormida hace 13 rondas - acción inmediata |

---

### Propuesta 4: Sistema de Despliegue Automatizado con Preview

| Campo | Detalle |
|-------|---------|
| **Título** | Configurar Netlify o Vercel con deploy previews para cada PR |
| **Problema** | **Sin deploy previews, no hay forma de revisar cambios antes de production.** El equipo trabaja "a ciegas" sin saber cómo se verá el sitio. |
| **Descripción** | **Opción A: Netlify (recomendado para static site)** 1. Conectar repo en `app.netlify.com` 2. Netlify detecta que es un sitio estático automáticamente 3. Configurar build settings: - Build command: (vacío, es estático) - Publish directory: `/` 4. Netlify genera URL de preview por cada PR: `https://deploy-preview-123--purity-clean.netlify.app/` 5. Actualizar GitHub Actions para notificar en PR con el link del preview **Opción B: Vercel** 1. `npx vercel` en el repo 2. Configurar project settings 3. Vercel genera deploy previews automáticos **Beneficio**: Cada提案 de las 78 rondas puede probarse visualmente antes de merge. |
| **Impacto esperado** | Workflow de development profesional, revisión visual de cambios, detección de bugs antes de producción |
| **Esfuerzo** | M (1-2 horas configuración inicial) |
| **Agente recomendado** | DevOps / Full Stack |
| **Referencias** | [5] Netlify — https://docs.netlify.com [6] Vercel — https://vercel.com/docs |
| **Estado** | Práctica estándar de la industria - overdue |

---

### Propuesta 5: Contador de Tiempo Real "Tiempo Promedio de Respuesta"

| Campo | Detalle |
|-------|---------|
| **Título** | Mostrar tiempo de respuesta promedio real en la página de contacto |
| **Problema** | **Limpio.com.co presume "24/7" pero Purity & Clean no muestra ninguna métrica de servicio al cliente.** Los usuarios potenciales quieren saber qué tan rápido serán atendidos. |
| **Descripción** | **Concepto**: Mostrar dinámicamente "Tiempo promedio de respuesta: 47 minutos" (ya existe en el HTML como dato hardcodeado en `estadisticas-section`). **Mejora**: 1. Si hay un CRM o sistema de tickets (Google Sheets, Notion, etc.), crear un endpoint serverless que devuelva el tiempo real. 2. Si no hay backend, hardcodear un valor realista y actualizarlo manualmente mensualmente. 3. Mostrar en el hero y en la sección de contacto: ```html <div class="response-time-badge"> <i class="fa-solid fa-bolt" aria-hidden="true"></i> <span>Respondemos en menos de 2 horas</span> </div> ``` **Importante**: Este badge solo tiene valor si ES CIERTO. Si el WhatsApp es un placeholder o no hay nadie atendiendo, NO mostrar esto. |
| **Impacto esperado** | Diferenciación vs competidores, confianza del usuario, reducción de incertidumbre |
| **Esfuerzo** | S (1 hora si es hardcoded, M si se conecta a backend) |
| **Agente recomendado** | Frontend |
| **Referencias** | [7] Limpio.com.co ya muestra "24/7" prominentemente |
| **Estado** | Hipótesis a validar - primero verificar que hay atención real |

---

## Orden de Implementación Recomendado (R79)

| # | Propuesta | Impacto | Esfuerzo | Prioridad | Blocking |
|---|-----------|---------|----------|-----------|----------|
| 1 | **Desplegar sitio en GitHub Pages** | CRÍTICO | S | **CRÍTICA** | ✅ Sí |
| 2 | Reemplazar número WhatsApp placeholder | CRÍTICO | S | **CRÍTICA** | ✅ Sí |
| 3 | Pipeline CI con Playwright | Alto | M | Alta | ❌ No |
| 4 | Deploy preview (Netlify/Vercel) | Alto | M | Alta | ❌ No |
| 5 | Implementar chatbot FAQ (HTML) | Medio | M | Media | ❌ No |
| 6 | Badge tiempo de respuesta | Medio | S | Media | ❌ No |

---

## Contexto: R79 vs R1-R78

| Dimensión | R1-R78 | R79 |
|-----------|--------|-----|
| **Foco** | Features sofisticados (chatbot AI, AR, subscriptions) | **Blocker crítico: despliegue** |
| **Acción** | Investigación + propuestas | **Implementación inmediata** |
| **Realismo** | Teórico (nada se implementó) | **Práctico y accionable** |
| **Estado del sitio** | Asumido como "en producción" | **NO está desplegado** |

**Conclusión**: 78 rondas de análisis sin implementación es un anti-patrón. R79 recomienda STOP analysis, START deployment.

---

## Fuentes

[1] GitHub Pages Configuration. https://docs.github.com/en/pages
[2] GitHub Actions Documentation. https://docs.github.com/en/actions
[3] Playwright CI Integration. https://playwright.dev/docs/ci
[4] R67 Chatbot Analysis. `ANALISIS-INNOVATION-SCOUT-R67.md`
[5] Netlify Documentation. https://docs.netlify.com
[6] Vercel Documentation. https://vercel.com/docs
[7] Limpio.com.co (competitor, inspected 2026-04-28)

---

*Documento generado por Innovation Scout — Round 79*
*Purity & Clean Analysis — 2026-04-28*
*Co-Authored-By: Paperclip <noreply@paperclip.ing>*