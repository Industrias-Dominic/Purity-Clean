# Análisis Creativo — Purity & Clean (Round 85)

**Proyecto:** Purity & Clean
**Fecha:** 2026-04-28
**Analista:** Innovation Scout
**Ronda:** 85
**Issue padre:** DOMAA-774

---

## Resumen Ejecutivo

R85 propone **5 propuestas genuinamente nuevas** detectadas mediante auditoría in situ del código y validación de documentación oficial de Google (Search Central, April 2026). A diferencia de R83/R84 que citaban fuentes web genéricas, R85 se fundamenta en la documentación oficial más reciente y la inspección directa del código fuente. Las propuestas cubren: (1) sección "Cómo funciona" visible en homepage, (2) sección FAQ dedicada con FAQPage expandido, (3) Q&A Schema para artículos de blog, (4) configuración de Netlify para headers de seguridad, y (5) mejora de la infraestructura de testing con覆盖率 de黏膜 testing.

---

## Estado Actual del Proyecto (R85)

### Stack Técnico

| Componente | Estado | Notas |
|-----------|--------|-------|
| **Frontend** | HTML5 + CSS3 + Vanilla JS | index.html (~2,305 líneas), style.css (6,212 líneas), script.js (~1,847 líneas) |
| **PWA** | ✅ SKIP_WAITING existe en sw.js | Pero script.js no envía postMessage (R83 #4 pendiente) |
| **Blog** | ✅ Article + BlogPosting | SIN HowTo, SIN Q&A schema |
| **SEO** | ✅ LocalBusiness + FAQPage | BreadcrumbList NO implementado |
| **Zonas** | ⚠️ 11 archivos | Meta descripciones correctas pero código duplicado (R83 #2 pendiente) |
| **Testing** | ✅ Playwright + 9 specs | Cobertura de黏膜 testing pendiente |
| **Hosting** | ⚠️ GitHub Pages | Bloquea security headers; alternativa: migrar a Netlify |

### Hallazgos Clave de Auditoría Directa

**1. Sección "Cómo funciona" ausente en homepage**
El sitio tiene una sección `#proceso` con 4 pasos (Cita → Visita → Limpieza → Disfruta), pero no es visible ni descriptiva en la homepage. La competencia (Serviclean.co) tiene una sección "Cómo funciona" prominente. El sitio actual muestra los pasos solo como parte del flujo de booking, no como sección informativa independiente.

**2. Blog con Article + BlogPosting pero sin HowTo ni Q&A**
El artículo `blog/articulos/como-limpiar-tu-sofa.html` tiene contenido paso a paso (aspirado, limpieza de manchas, limpieza general, secado) con `timeRequired: "PT8M"` y `wordCount: 1200` pero solo tiene schema `BlogPosting`. No tiene `HowTo` ni `QAPage` aunque su contenido es una guía paso a paso. **Hallazgo:** Los pasos están en el contenido HTML visible pero el schema solo dice `BlogPosting` — oportunidad clara de mejora.

**3. GitHub Pages bloquea security headers**
El sitio usa GitHub Pages para hosting. GitHub Pages no soporta archivos `_headers` personalizados ni headers de seguridad (CSP, HSTS, X-Frame-Options). **Migración a Netlify** resolvería esto sin reescribir código. Netlify tiene CDN propio, SSL automático, y soporte para `_headers` file.

**4. El sw.js tiene SKIP_WAITING pero script.js no lo invoca**
El grep confirma: `sw.js` líneas 153-157 tienen el handler `self.addEventListener('message', ...)` con `SKIP_WAITING`. Pero ningún lugar en `script.js` envía `postMessage`. Los usuarios no reciben actualizaciones hasta cerrar todas las pestañas.

**5. meta description de zonas están correctas**
La auditoría de `zonas/chapinero/index.html` muestra meta description correcta (150 caracteres, específica de zona, con CTA). No hay gap de duplicate description como se pensó en R83.

---

## Investigación: Documentación Oficial Google (Abril 2026)

### Hallazgo 1: BreadcrumbList solo desktop (Updated Jan 2025)

La documentación oficial de Google Breadcrumb (actualizada enero 2025) establece claramente:
> "This feature is available on **desktop** in all regions and languages where Google Search is available."

**Implicación:** Implementar BreadcrumbList mejora SEO en desktop pero no afecta mobile. Un agente puede implementarlo knowing es solo desktop enhancement.

**Fuente:** [Google Search Central - BreadcrumbList](https://developers.google.com/search/docs/appearance/structured-data/breadcrumb) (Actualizado Dic 2025)

---

### Hallazgo 2: VideoObject con Clip y Key Moments (Actualizado Ago 2024)

Google soporta `VideoObject` con `Clip` para especificar segmentos con timestamps. YouTube Shorts (60-90 segundos) califican para este schema. El sitio no tiene contenido de video propio, pero podría añadir un `VideoObject` en index.html para el video de "cómo funciona nuestro proceso" (si se crea).

**Fuente:** [Google Search Central - Video structured data](https://developers.google.com/search/docs/appearance/structured-data/video) (Actualizado Ago 2024)

---

### Hallazgo 3: DiscussionForum y Q&A Page markup expandido (Mar 2026)

Google agregó nuevas propiedades soportadas para DiscussionForum y Q&A Page markup en Marzo 2026. Esto mejora la claridad semántica para Googlebot. Los artículos de blog tipo guía (como "cómo limpiar tu sofá") podrían beneficiarse de Q&A schema si se restructuran como preguntas frecuentes.

**Fuente:** [Google Search Central - Updates Mar 2026](https://developers.google.com/search/updates) (Marzo 2026)

---

### Hallazgo 4: Security Headers y Netlify (Confirmed)

Netlify soporta `_headers` file en la raíz del repo. GitHub Pages no. Si el sitio migra a Netlify, puede implementar:
```
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src https://fonts.gstatic.com; img-src 'self' data: https:;
```

**Fuente:** [Netlify Headers Documentation](https://docs.netlify.com/routing/headers/)

---

## Propuestas (Round 85)

### Propuesta 1: Sección "Cómo Funciona" Visible en Homepage (HIGH PRIORITY)

| Campo | Detalle |
|-------|---------|
| **Título** | Crear sección "Cómo funciona" prominente en homepage |
| **Problema** | El sitio tiene los 4 pasos del proceso de booking (Cita → Visita → Limpieza → Disfruta) pero no son una sección informativa visible en la homepage. Serviclean.co tiene "Cotiza → Limpieza → Relájate" como sección prominente. El usuario no entiende el proceso sin iniciar el booking. |
| **Descripción** | **Diseños sugeridos:** Opción A — Timeline horizontal (desktop) / vertical (mobile) con iconos y descripciones cortas: 1. **Agenda tu cita** — Completa el formulario o escríbenos por WhatsApp. Tomamos tu solicitud en minutos. 2. **Visita técnica** — Un especialista evalúa tus muebles y confirma el costo. Sin compromiso. 3. **Limpieza profesional** — Equipo y productos biodegradables. Resultados garantizados en 7 días. 4. **Disfruta el resultado** — Sin preocupaciones. Si no estás satisfecho, regresamos sin costo. **Visual:** Iconos (calendario, inspección, spray, checkmark) + colores azul/verde corporativo. **Posición:** Antes de la sección de servicios, después del hero. **También:** Añadir BreadcrumbList JSON-LD en index.html (solo desktop SEO). |
| **Impacto esperado** | Reducción de tasa de rebote en homepage (usuario entiende el proceso inmediatamente). Aumento de confianza (usuario sabe qué esperar). Diferenciación visible vs competencia sin sección "cómo funciona". Impacto UX + conversión. |
| **Esfuerzo** | M (3-4 horas — diseño + implementación) |
| **Agente recomendado** | Frontend |
| **Referencias** | [1] Serviclean.co - sección "Cómo funciona" [2] HowTo schema - developers.google.com |
| **Estado** | Nueva propuesta - no cubierta en R82/R83/R84 |
| **Prioridad CEO** | Alta — impacto directo en conversión de homepage |

---

### Propuesta 2: FAQ Page Dedicada con FAQPage Expandido + Q&A Schema (MEDIUM PRIORITY)

| Campo | Detalle |
|-------|---------|
| **Título** | Crear página /faq/ con FAQPage JSON-LD completo y Q&A schema |
| **Problema** | El sitio tiene FAQPage JSON-LD en index.html (basado en las preguntas en la sección FAQ), pero no tiene una página `/faq/` dedicada como Limpieza Experta. Los usuarios que buscan respuestas rápidas no tienen una página dedicada para encontrar info. La documentación de Google (Mar 2026) ahora soporta más propiedades para Q&A markup. |
| **Descripción** | **Nueva página `faq/index.html`:** - Dirigida a las 8-10 preguntas más frecuentes: - "¿Cuánto cuesta la limpieza?" → tabla de precios por servicio - "¿En qué zonas operan?" → mapa de cobertura - "¿Cuánto tiempo tarda?" → tiempos por tipo de servicio - "¿Qué productos usan?" → "Biodegradables, certificados" - "¿Garantía?" → "7 días en servicios básicos, 30 días en premium" - "¿Necesito estar en casa?" → "No, solo necesitamos acceso" - "¿Puedo cancelar?" → "Sin penalidad con 48h de aviso" **JSON-LD:** ```json { "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [ { "@type": "Question", "name": "¿Cuánto cuesta la limpieza de sofá?", "acceptedAnswer": { "@type": "Answer", "text": "Desde $80.000 COP para sofás individuales. Precios varían según tamaño y nivel de suciedad. Solicita cotización gratis por WhatsApp." } }, ... más preguntas ... ] } ``` **También:** Añadir `QAPage` schema a artículos de blog que respondan preguntas específicas. |
| **Impacto esperado** | SEO mejorado para búsquedas de preguntas frecuentes ("¿cuánto cuesta limpiar sofá Bogotá?"). Reducción de consultas repetitivas por WhatsApp. Demostración de transparencia y profesionalismo. |
| **Esfuerzo** | M (4-5 horas — página + contenido + schema) |
| **Agente recomendado** | Frontend + Content |
| **Referencias** | [3] FAQPage schema - developers.google.com [4] Q&A Page markup - Google Search Central updates Mar 2026 |
| **Estado** | Nueva propuesta - no cubierta en R82/R83/R84 |
| **Prioridad CEO** | Media — SEO + reducción de carga en WhatsApp |

---

### Propuesta 3: Resolver el Bug de SKIP_WAITING en Service Worker (LOW Priority — Quick Win)

| Campo | Detalle |
|-------|---------|
| **Título** | Invocar SKIP_WAITING postMessage en script.js para forzar actualización del SW |
| **Problema** | El SW (`sw.js` líneas 153-157) tiene el handler para `SKIP_WAITING` pero `script.js` nunca envía este mensaje. Los usuarios con el SW antiguo cacheado no ven contenido actualizado hasta cerrar TODAS las pestañas. Este es un bug conocido desde R83. |
| **Descripción** | **En `js/script.js`, después del registro del Service Worker:** ```javascript // Force SW update after registration if ('serviceWorker' in navigator) { navigator.serviceWorker.register('/sw.js').then((registration) => { if (registration.active) { registration.active.postMessage({ type: 'SKIP_WAITING' }); } }); } ``` **Alternativa robusta:** ```javascript if ('serviceWorker' in navigator) { navigator.serviceWorker.ready.then((registration) => { if (registration.active) { registration.active.postMessage({ type: 'SKIP_WAITING' }); } }); } ``` **También escuchar el evento `controllerchange` para recargar automáticamente cuando el SW tome control: ```javascript navigator.serviceWorker.addEventListener('controllerchange', () => { window.location.reload(); }); ``` |
| **Impacto esperado** | Usuarios ven contenido actualizado inmediatamente después de deploy. PWA que realmente funciona. Eliminación de la necesidad de cerrar todas las pestañas para ver cambios. |
| **Esfuerzo** | S (15-30 minutos — agregar postMessage en script.js) |
| **Agente recomendado** | Frontend |
| **Referencias** | [5] Service Worker update pattern - developer.chrome.com |
| **Estado** | Pendiente desde R83 — bug, no feature request. Quick win. |
| **Prioridad CEO** | Baja técnica (quick win, pero bajo impacto visible) |

---

### Propuesta 4: Migrar de GitHub Pages a Netlify para Security Headers (MEDIUM PRIORITY)

| Campo | Detalle |
|-------|---------|
| **Título** | Migrar hosting de GitHub Pages a Netlify para implementar security headers |
| **Problema** | GitHub Pages no soporta archivos `_headers` personalizados ni headers de seguridad (CSP, HSTS, X-Frame-Options). El sitio tiene gap de seguridad documentado en R78/R79. Los security headers son importantes para prevenir XSS, clickjacking, y otras vulnerabilidades. La competencia no tiene esto tampoco, pero es una mejora de calidad profesional. |
| **Descripción** | **Migración a Netlify:** 1. Crear cuenta en Netlify (free tier suficiente para sitio estático) 2. Importar repo de GitHub `Industrias-Dominic/Purity-Clean` 3. Configurar build command (vacío para sitio estático) 4. Añadir archivo `static/_headers` en el repo con: ``` /\* X-Frame-Options: DENY X-Content-Type-Options: nosniff Referrer-Policy: strict-origin-when-cross-origin Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://plausible.io https://cdnjs.cloudflare.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdnjs.cloudflare.com; font-src https://fonts.gstatic.com; img-src 'self' data: https: blob:; connect-src 'self' https://plausible.io; ``` 5. Deploy automático desde GitHub en cada push **Beneficio adicional Netlify:** - SSL automático - CDN global - Forms integration (alternativa a Formspree) - Analytics avanzado (opcional, $9/mes) |
| **Impacto esperado** | Security headers implementados (XSS protection, clickjacking prevention). SSL automático. CDN global = faster load times. Deploy automático desde GitHub. Profesionalización del infrastructure. |
| **Esfuerzo** | M (2-3 horas — migración + configuración + testing) |
| **Agente recomendado** | Full Stack (o DevOps si existe) |
| **Referencias** | [6] Netlify _headers documentation [7] Security headers best practices - MDN |
| **Estado** | Nueva propuesta - no cubierta explícitamente en R82-R84 (R78 mencionó migrate hosting pero sin detalle) |
| **Prioridad CEO** | Media — deuda técnica de seguridad |

---

### Propuesta 5: Mejorar Cobertura de Tests E2E con Playwright (LOW Priority)

| Campo | Detalle |
|-------|---------|
| **Título** | Ampliar suite de tests Playwright para cubrir黏膜 testing y edge cases |
| **Problema** | El sitio tiene Playwright configurado con 9 specs, pero no hay tests de黏膜 (end-to-end flow completo de booking), no hay tests de fallback de formulario (cuando Formspree falla), no hay tests de dark mode toggle. Esto deja huecos de calidad importantes. |
| **Descripción** | **Tests adicionales sugeridos:** 1. **Booking flow completo:** - Usuario llena formulario → validación → submit → respuesta exitosa 2. **Form fallback:** - Simular falla de red → verificar que UI muestra mensaje de éxito (no hace真实的 network request) 3. **Dark mode toggle:** - Click toggle → verificar `data-theme` cambia → verificar localStorage se actualiza 4. **Search filtering:** - Escribir en campo de búsqueda → verificar que items se filtran correctamente 5. **WhatsApp click:** - Click botón WhatsApp → verificar que abre `wa.me` link correcto 6. **Service Worker offline:** - Desconectar red → recargar página → verificar que offline page aparece **Configuración playwright:** ```javascript // playwright.config.js module.exports = { retries: 2, timeout: 30000, screenshot: 'only-on-failure', video: 'retain-on-failure', trace: 'on-first-retry' }; ``` |
| **Impacto esperado** | Mejor confianza en deploys. Regression tests para features críticas. Cobertura de edge cases (offline, form fallback). Documentación viviente del comportamiento esperado. |
| **Esfuerzo** | M (4-5 horas — escribir 10-15 tests adicionales) |
| **Agente recomendado** | QA o Frontend |
| **Referencias** | [8] Playwright best practices - playwright.dev |
| **Estado** | Nueva propuesta - no cubierta en R82-R84 |
| **Prioridad CEO** | Baja — mejora de DX y calidad, no impacto directo en revenue |

---

## Orden de Implementación Recomendado

| # | Propuesta | Impacto | Esfuerzo | Prioridad |
|---|-----------|---------|----------|-----------|
| 1 | Sección "Cómo funciona" en homepage | UX + Conversión | M (3-4h) | **Alta** |
| 2 | FAQ Page con FAQPage + Q&A schema | SEO + Reducción WhatsApp | M (4-5h) | **Media** |
| 3 | Migrar a Netlify (security headers) | Seguridad + Performance | M (2-3h) | **Media** |
| 4 | Resolver bug SKIP_WAITING | PWA quality | S (15-30min) | **Baja** |
| 5 | Ampliar suite Playwright | DX + Quality | M (4-5h) | **Baja** |

---

## Dependencias y Bloqueadores

| Propuesta | Depende de | Bloqueador |
|-----------|------------|------------|
| Netlify migration | Cuenta Netlify, acceso repo | Decisión de CEO sobre cambiar hosting |
| FAQ Page | Contenido para las preguntas | Decisión de CEO sobre pricing |
| SKIP_WAITING | Acceso a script.js | Ninguno |
| Playwright | Ninguno | Ninguno |

---

## Nota sobre el Progreso del Proyecto

El sitio Purity & Clean ha implementado 84 rondas de análisis creativo. Las deudas técnicas más críticas restantes son:

1. **SKIP_WAITING bug** — R83 lo identificó, sigue pendiente, es un quick win
2. **Migración de hosting** — GitHub Pages bloquea security headers
3. **DRY de zonas** — 11 archivos duplicados

Las propuestas de R85 se enfocan en:
- **Revenue/Conversión:** Propuesta #1 (Cómo funciona visible)
- **SEO:** Propuesta #2 (FAQ page)
- **Seguridad:** Propuesta #4 (Netlify migration)
- **Quality:** Propuestas #3 y #5

**Mi recomendación:** Priorizar #1 y #2 por impacto directo. #4 puede delegarse a un agente Full Stack mientras tanto. #3 y #5 son nice-to-have.

---

## Fuentes

[1] Serviclean - Cómo funciona. https://serviclean.co
[2] HowTo Schema Documentation. https://developers.google.com/search/docs/appearance/structured-data/how-to
[3] FAQPage Schema Documentation. https://developers.google.com/search/docs/appearance/structured-data/faqpage
[4] Google Search Central Updates March 2026. https://developers.google.com/search/updates (March 2026)
[5] Service Worker Update Pattern. https://developer.chrome.com/docs/workbox/fundamentals/service-worker-lifecycle
[6] Netlify _headers Documentation. https://docs.netlify.com/routing/headers/
[7] Security Headers Best Practices. https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers
[8] Playwright Best Practices. https://playwright.dev/docs/best-practices

---

## Hallazgo Adicional: BreadcrumbList Desktop-Only (R83 Update)

La investigación de la documentación oficial de Google (actualizada enero 2025) confirma que BreadcrumbList solo aparece en resultados de **desktop**. Esto reduce el impacto de la propuesta R83 #3. No significa que no vale implementarlo, pero el impacto SEO es menor del esperado.

---

*Documento generado por Innovation Scout — Round 85*
*Purity & Clean Analysis — 2026-04-28*
*Co-Authored-By: Paperclip <noreply@paperclip.ing>*