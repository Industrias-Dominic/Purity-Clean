# Análisis Creativo — Purity & Clean (Round 77)

**Proyecto:** Purity & Clean
**Fecha:** 2026-04-28
**Analista:** Innovation Scout
**Ronda:** 77
**Issue padre:** DOMAA-685

---

## Resumen Ejecutivo

R77 detecta un **gap crítico de calidad en testing E2E**: Playwright está configurado en el proyecto (package.json + playwright.config.js + 9 archivos de specs) pero la suite no se ejecuta en CI/CD — `.github/workflows/static.yml` solo hace build de Hugo y deploy a GitHub Pages, sin step de `npm test`. Esto significa que los 9 specs de regresión, accesibilidad, reservas, búsqueda, formularios y tema nunca se corren automáticamente, dejando el sitio vulnerable a regresiones en cada deploy.

La investigación competitiva en vivo (R76) identificó 5 gaps pendientes de implementación (R1-R76). R77 se enfoca en **Technical Debt: CI/CD Testing** — el gap más urgente被发现 antes de que el sitio escale a más tráfico y clientes corporativos.

---

## Estado Actual del Proyecto (R77)

### Stack Técnico

| Componente | Estado | Notas |
|-----------|--------|-------|
| **Frontend** | HTML5 + CSS3 + Vanilla JS | ~150KB index.html, ~122KB CSS, ~65KB JS |
| **PWA** | ✅ Implementado | Service Worker + manifest + offline support |
| **Testing** | ✅ Configurado, ❌ **No corre en CI** | Playwright + 9 specs en `/tests/e2e/` |
| **SEO** | ✅ Schema.org + OG + Twitter Cards + sitemap | JSON-LD completo |
| **Analytics** | ✅ Plausible (privacy-friendly) | Sin cookies, GDPR compliant |
| **Formularios** | ✅ Formspree | Fallback a simulación si endpoint falla |
| **CI/CD** | ✅ Build & Deploy | **Pero sin tests en pipeline** |
| **Theme** | ✅ Dark mode + prefers-color-scheme | localStorage persistence |

### Tests Playwright — Estado de la Suite

| Spec | Tests | Cobertura |
|------|-------|-----------|
| `reservas.spec.js` | ~15 tests | Booking form multi-step |
| `accesibilidad.spec.js` | ~10 tests | lang attribute, meta viewport, etc. |
| `navegacion.spec.js` | ~10 tests | Menú, scroll, CTAs |
| `formularios.spec.js` | ~8 tests | Contacto, newsletter |
| `busqueda.spec.js` | ~6 tests | Búsqueda dinámica |
| `cotizador.spec.js` | ~5 tests | Selector + WhatsApp |
| `tema.spec.js` | ~5 tests | Dark/light toggle |
| `tema-accesibilidad.spec.js` | ~5 tests | Accesibilidad en dark mode |
| `regresion-r7.spec.js` | ~20 tests | Regresión general |

### GitHub Actions — Pipeline Actual

`.github/workflows/static.yml` hace:
```yaml
- name: Setup Pages
- uses: actions/checkout@v4
- name: Setup Hugo
  with: ...
- name: Build Hugo
- name: Setup Pages
  with: fallback: /  # 404.html fallback
- name: Upload artifact
```

**Falta:**
```yaml
- name: Run Playwright tests
  run: npm test
```

---

## Investigación: Playwright en GitHub Actions (Estado del Arte 2026)

### Mejor Práctica Actual

GitHub Actions + Playwright recomendado workflow:

```yaml
- name: Checkout
  uses: actions/checkout@v4

- name: Setup Node.js
  uses: actions/setup-node@v4
  with:
    node-version: '20'
    cache: 'npm'

- name: Install dependencies
  run: npm ci

- name: Install Playwright Browsers
  run: npx playwright install --with-deps chromium

- name: Run Playwright tests
  run: npm test

- name: Upload test results
  if: always()
  uses: actions/upload-artifact@v4
  with:
    name: playwright-report
    path: playwright-report/
    retention-days: 14
```

### Alternativa: Playwright Test GitHub Action

```yaml
- name: Run Playwright tests
  uses: microsoft/playwright-github-action@v1
  with:
    install-browser: true
```

### Screenshots on Failure

Para capturar screenshots automáticamente en CI:

```yaml
- name: Upload screenshots on failure
  if: failure()
  uses: actions/upload-artifact@v4
  with:
    name: playwright-screenshots
    path: test-results/
    retention-days: 7
```

---

## Propuestas (Round 77)

### Propuesta 1: Integrar Playwright Tests en CI/CD Pipeline

| Campo | Detalle |
|-------|---------|
| **Título** | Añadir step `npm test` al workflow de GitHub Actions |
| **Problema** | **Los 9 specs de Playwright (reservas, accesibilidad, navegación, formularios, búsqueda, cotizador, tema) nunca se ejecutan automáticamente.** Cada deploy a GitHub Pages es ciego — si una regresión rompe el booking form o la búsqueda, no se detecta hasta que un usuario lo reporta. Esto es técnico debt crítico para un sitio con booking form y formularios de pago. |
| **Descripción** | **Cambio en `.github/workflows/static.yml`:** (1) Añadir step de `npm ci` después del checkout. (2) Añadir step `npx playwright install --with-deps chromium` para instalar browsers. (3) Añadir step `npm test` antes del deploy. (4) Añadir step de upload de artifacts (`playwright-report/` y `test-results/`) para留存 de 14 días. (5) **Importante**: El `baseURL` en `playwright.config.js` está configurado como `http://localhost:8080`, lo que requiere un webServer. O добавляем `webServer` config en playwright.config.js, o cambiamos el test para que use el artifact deployed. **Recomendación**: Usar `http://localhost` con `npx http-server . -p 8080` como webServer. |
| **Impacto esperado** | Tests de regresión corren en cada PR y push, detección inmediata de breakage, calidad de producción garantizada |
| **Esfuerzo** | M (2-3 horas — principalmente configuración de webServer + workflow YAML) |
| **Agente recomendado** | Full Stack o DevOps |
| **Referencias** | [1] Playwright GitHub Actions — https://playwright.dev/docs/ci-gh-actions [2] Microsoft/playwright-github-action — https://github.com/microsoft/playwright-github-action |
| **Estado** | Fundamentada — technical debt real, no hay tests en CI actualmente |

---

### Propuesta 2: Configurar Web Server para Tests en Playwright

| Campo | Detalle |
|-------|---------|
| **Título** | Configurar `webServer` en playwright.config.js para CI |
| **Problema** | **El `baseURL` de Playwright apunta a `http://localhost:8080` pero no hay configuración de `webServer` en playwright.config.js**, y el workflow de GitHub Actions no inicia un servidor local antes de correr los tests. Esto significa que aunque se añada `npm test` al pipeline, los tests fallarán porque no hay servidor respondiendo en `localhost:8080`. |
| **Descripción** | **Opción A — Configurar webServer en playwright.config.js:** ```javascript webServer: { command: 'npx http-server . -p 8080', port: 8080, reuseExistingServer: !process.env.CI, timeout: 120 * 1000, stdout: 'ignore', stderr: 'ignore' } ``` **Opción B — Usar `npm start` + playwright test en workflow:** Agregar script `prestart` en package.json que inicie el servidor. **Recomendación**: Opción A (config en playwright.config.js) es más limpia y no requiere modificar package.json. **Nota adicional**: `http-server` debe estar instalado. Verificar si ya está en dependencies o agregarlo como devDependency. |
| **Impacto esperado** | Tests pueden ejecutarse en CI con servidor local real, detección de regressions de routing y HTML |
| **Esfuerzo** | S (1 hora — YAML y config) |
| **Agente recomendado** | Full Stack |
| **Referencias** | [3] Playwright webServer config — https://playwright.dev/docs/test-configuration#webserver | [4] http-server npm — https://www.npmjs.com/package/http-server |
| **Estado** | Fundamentada — prerequisite para que Proposal 1 funcione |

---

### Propuesta 3: Añadir Screenshot Reporter a Playwright Config

| Campo | Detalle |
|-------|---------|
| **Título** | Configurar `screenshot: 'only-on-failure'` + upload en CI |
| **Problema** | **Ya está configurado `screenshot: 'only-on-failure'` en playwright.config.js**, pero el workflow actual no sube los screenshots a artifacts cuando un test falla. Esto significa que cuando un test falla en CI, no hay forma visual de depurar sin acceso al runner de GitHub Actions. |
| **Descripción** | **YAML changes:** ```yaml - name: Upload test artifacts if: always() uses: actions/upload-artifact@v4 with: name: playwright-test-results path: | - test-results/ - playwright-report/ retention-days: 14 ``` Esto permite que los screenshots y el HTML report estén disponibles como artifacts en cada run, incluso si el workflow falla. El nombre del artifact incluye el workflow run ID para trazabilidad. |
| **Impacto esperado** | Debugging visual de failures en CI sin acceso directo al runner, mejor MTTR |
| **Esfuerzo** | S (30 minutos — YAML) |
| **Agente recomendado** | DevOps / Full Stack |
| **Referencias** | [5] actions/upload-artifact — https://github.com/actions/upload-artifact |
| **Estado** | Fundamentada — extensión natural del screenshot config existente |

---

### Propuesta 4: Crear Script `test:ci` en package.json

| Campo | Detalle |
|-------|---------|
| **Título** | Crear script `test:ci` que incluya install + test |
| **Problema** | **En GitHub Actions, `npm test` no incluye la instalación de browsers Playwright.** Currently `npm test` solo corre `playwright test`. En un entorno CI fresco, los browsers no están instalados, causando failure inmediato. |
| **Descripción** | **package.json change:** ```json "scripts": { "test": "playwright test", "test:ci": "npx playwright install --with-deps chromium && playwright test", "test:report": "playwright show-report" } ``` Esto permite que el workflow use `npm run test:ci` que primero instala los browsers y luego corre los tests. **Nota**: `--with-deps` instala las dependencias del sistema necesarias para Chromium (fonts, libs, etc.) en entornos Linux. |
| **Impacto esperado** | Pipeline completo: install browsers → run tests en un solo comando |
| **Esfuerzo** | S (15 minutos — package.json edit) |
| **Agente recomendado** | Full Stack |
| **Referencias** | [6] Playwright install CLI — https://playwright.dev/docs/api/cli#playwright-install |
| **Estado** | Fundamentada — prerequisite para pipeline robusto |

---

### Propuesta 5: Bloquear Deploy si Tests Fallan (Quality Gate)

| Campo | Detalle |
|-------|---------|
| **Título** | Configurar GitHub Actions para hacer fail el job si `npm test` falla |
| **Problema** | ** Actualmente el deploy a GitHub Pages ocurre sin precondiciones de calidad.** No hay forma de bloquear un deploy si los tests de regresión fallan. Esto permite que código con el booking form roto llegue a producción. |
| **Descripción** | **Con la configuración actual de Actions, si `npm test` falla, el step se considera failed y el workflow se detiene (por defecto).** Para que sea más visible: (1) Verificar que `npm test` retorna exit code != 0 en failure. (2) Consider adding a status check en GitHub branch protection rules que requiera que los tests pasen antes de hacer merge. (3) Opcional: añadir Slack/Teams notification on failure. **Importante**: El job de deploy está en un step separado de `npm test`. Verificar que si `npm test` falla, todo el workflow se bloquea y no se hace upload del artifact. |
| **Impacto esperado** | Quality gate automático que previene deploys con regresiones críticas |
| **Esfuerzo** | S (configuración de GitHub branch protection + YAML) |
| **Agente recomendado** | DevOps / Full Stack |
| **Referencias** | [7] GitHub Actions step failure behavior — https://docs.github.com/en/actions/learn-github-actions/workflow-syntax-for-github-actions#example-using-an-action |
| **Estado** | Fundamentada — extensión natural del quality gate |

---

## Orden de Implementación Recomendado

| # | Propuesta | Impacto | Esfuerzo | Prioridad |
|---|-----------|---------|----------|-----------|
| 1 | `npm test` step en CI/CD | Detecta regresiones automáticamente | M (2-3h) | **Crítica** |
| 2 | webServer config en playwright.config.js | Prerequisite para que tests corran | S (1h) | **Crítica** |
| 3 | Script `test:ci` en package.json | Pipeline completo en un comando | S (15min) | **Alta** |
| 4 | Upload artifacts en CI | Debugging visual de failures | S (30min) | **Media** |
| 5 | Quality gate (fail on test failure) | Bloquea deploys con regresiones | S (1h) | **Alta** |

**Empezar por #2 (webServer) y #3 (test:ci) primero**, luego #1 (integrar al workflow), luego #4 y #5.

---

## R77 en el Contexto de R1-R76

R77 se diferencia de todas las rondas anteriores al enfocarse en **Technical Debt / DevOps** en lugar de features de producto o UX. Todas las rondas anteriores (R1-R76) propusieron mejoras de frontend, contenido, SEO, o características de negocio. R77 introduce por primera vez el análisis de la infraestructura de testing y CI/CD.

| Dimensión | R1-R72 | R73-R76 | R77 |
|-----------|--------|---------|-----|
| **Tipo** | Features UX, SEO, contenido | Investigación competitiva en vivo | **Technical Debt: CI/CD Testing** |
| **Foco** | Producto y usuario | Gap competitivo | **Calidad y regressions** |
| **Complejidad** | S a L | S a M | **S a M** |
| **Diferenciación** | Feature parity con competidores | Diferenciación visual y de contenido | **Paridad con estándares de calidad de producción** |

---

## Hallazgos Adicionales

### 1. Dependencias de Fonts Externas

`sw.js` cachea explícitamente `fonts.googleapis.com`, `fonts.gstatic.com`, y `cdnjs.cloudflare.com`. Font Awesome se carga desde CDN. Esto significa:

- **Offline mode**: Los iconos de Font Awesome no estarán disponibles offline si el CDN no está cacheado.
- **Fonts offline**: Las fuentes Manrope y Raleway podrían no cargarse si no están en el runtime cache.
- **Mejora**: Considerar cachear también Font Awesome CSS y las fuentes en el precache.

### 2. Imágenes Ausentes en Repo

El directorio `images/` solo contiene `og-image.svg` — no hay imágenes de servicios, comparación antes/después, ni portfolio. R76 propuso una galería y los comparison sliders (R1-R75) dependen de imágenes que no están en el workspace.

### 3. Sin CI en Playwright (Solo Local)

La configuración actual (`workers: undefined`, `retries: 0`) está optimizada para desarrollo local, no para CI parallelizado. En CI, debería ser:

```javascript
workers: 1,  // En CI para evitar flaky tests
retries: 2   // Retry en flakes
```

---

## Fuentes

[1] Playwright CI GitHub Actions. https://playwright.dev/docs/ci-gh-actions
[2] Microsoft Playwright GitHub Action. https://github.com/microsoft/playwright-github-action
[3] Playwright Test Configuration — webServer. https://playwright.dev/docs/test-configuration#webserver
[4] http-server npm package. https://www.npmjs.com/package/http-server
[5] actions/upload-artifact. https://github.com/actions/upload-artifact
[6] Playwright install CLI. https://playwright.dev/docs/api/cli#playwright-install
[7] GitHub Actions step failure. https://docs.github.com/en/actions/learn-github-actions/workflow-syntax-for-github-actions

---

*Documento generado por Innovation Scout — Round 77*
*Purity & Clean Analysis — 2026-04-28*
*Co-Authored-By: Paperclip <noreply@paperclip.ing>*