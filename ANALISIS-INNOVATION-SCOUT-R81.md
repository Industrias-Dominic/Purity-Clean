# Análisis Creativo — Purity & Clean (Round 81)

**Proyecto:** Purity & Clean
**Fecha:** 2026-04-28
**Analista:** Innovation Scout
**Ronda:** 81
**Issue padre:** DOMAA-758

---

## Resumen Ejecutivo

R81 es una **auditoría de items implementados incorrectamente catalogados como "NO implementados"** + propuestas genuinamente nuevas. Después de revisar el código real vs los análisis R78-R80, descubro que **el sitio tiene significativamente más features de los que se reconocen**, pero los análisis los marcan como ausentes. Esto sesga las propuestas hacia cosas que YA existen.

Este análisis corrige ese error y propone 5 mejoras que SON realmente nuevas o necesarias.

---

## Estado Actual — Auditoría R81 (Corrección)

### Lo que SÍ existe pero R78-R80 dijeron que NO:

| Feature | Línea en código | R78-R80 dijo | Realidad |
|---------|-----------------|--------------|----------|
| **Trust Badges** | `index.html:1501-1535` | "NO hay" | ✅ Existe `.trust-badge`, métricas con counters |
| **Garantía de Satisfacción** | `index.html:1547-1573` | "NO hay sección" | ✅ Existe `.guarantee-badge` con 200% garantía |
| **Trust Badges Strip** | `index.html:1574+` | "NO hay" | ✅ Sellos y certificaciones |
| **Preconnect/Preload** | `index.html:261-268` | "R78 propuso, no se hizo" | ✅ Resource hints implementados |
| **VideoObject Schema** | `index.html:252` | "No mencionado" | ✅ Existe VideoObject en JSON-LD |
| **FAQ Chatbot** | `style.css:8-100` | "Implementado" | ✅ Existe |
| **Counter animations** | JS anónimo | "No hay" | ✅ Contadores animados en trust badges |
| **Blog con Schema** | `blog/articulos/*.html` | "SEO mejorable" | ⚠️ Solo FAQPage, falta HowTo |

### Lo que REALMENTE falta (gap real):

| Feature | Evidencia | Propuesto en |
|---------|-----------|--------------|
| **Security Headers (`_headers` file)** | No existe `_headers` ni `_config.yml` | R78, R79, R80 |
| **localStorage consent banner** | `localStorage.setItem("theme")` sin consent | R78, R79 |
| **Exit-intent popup** | No existe `exit-intent-popup` en index.html | R4, R52, R55-R58, R70, R72, R80 |
| **13 zonas como templates DRY** | `zonas/*.html` 13 archivos idénticos | R80 (nueva) |

### Stack confirmado en el código:

| Componente | Estado | Notas |
|-----------|--------|-------|
| **Frontend** | ✅ HTML5 + CSS3 + Vanilla JS (~2305 líneas index.html) | Maduro |
| **PWA** | ✅ Service Worker + manifest.json | Implementado |
| **SEO** | ✅ Schema.org LocalBusiness + FAQPage + VideoObject | Completo |
| **Analytics** | ✅ Plausible (cookieless) | Sin cookies |
| **Trust Signals** | ✅ Trust badges + Garantía + Badges strip | **JA EXISTE** |
| **Dark Mode** | ✅ prefers-color-scheme + localStorage | Implementado |
| **Preconnect/Preload** | ✅ Resource hints | **JA EXISTE** |
| **Chatbot FAQ** | ✅ Panel flotante | Implementado |
| **WhatsApp** | ✅ wa.me link | Solo link |
| **Security Headers** | ❌ NO existe `_headers` | Nunca llegó al código |
| **localStorage Consent** | ❌ NO existe banner | Nunca llegó al código |
| **Exit-intent Popup** | ❌ NO existe | Nunca llegó al código |
| **Zonas Template** | ⚠️ 13 archivos DRY violation | Mantenimiento difícil |

---

## Investigación: Benchmark Competitivo (Serviclean.co vs Purity & Clean)

### Serviclean.co tiene:
- ✅ WhatsApp directo integrado (api.whatsapp.com)
- ✅ TrustScore de Google Reviews visible (5/5 con 34 reviews)
- ✅ "200% Satisfacción" como garantía (similar a Purity & Clean)
- ✅ Stats counters: 43 proyectos, 7200 trabajos, +50 empleados
- ✅ Logos de clientes corporativos
- ✅ Blog con contenido SEO
- ✅ Reservas online integradas
- ❌ Sin security headers visibles
- ❌ Sin exit-intent popup

### Purity & Clean tiene:
- ✅ Trust badges con counters (850+ clientes, 4.8/5 rating, 98% respuesta)
- ✅ Garantía 200% satisfacción (sección completa)
- ✅ Schema.org VideoObject
- ✅ Preconnect/preload implementado
- ✅ FAQPage + FAQ chatbot
- ✅ Blog con 6 artículos
- ❌ Sin WhatsApp Cloud API (solo link)
- ❌ Sin security headers
- ❌ Sin localStorage consent
- ❌ Sin exit-intent popup

### Oportunidades pendientes vs competencia:
1. **Google Business Profile integration** — mantener horarios y reviews sincronizados
2. **Reviews enriquecidos con fotos de clientes** — Serviclean muestra fotos de clientes
3. **Video testimonials** — Serviclean tiene "TrustScore" visible, Purity tiene rating en Schema.org pero no lo muestra visualmente

---

## Propuestas R81 (Genuinamente Nuevas o Necesarias)

### Propuesta 1: Implementar archivo `_headers` para Netlify/Vercel

| Campo | Detalle |
|-------|---------|
| **Título** | Crear archivo `_headers` en la raíz del repo para security headers |
| **Problema** | **R78, R79 y R80 propusieron security headers pero nunca se implementó.** El sitio no tiene X-Frame-Options, X-Content-Type-Options, CSP ni Referrer-Policy. Cada ronda propone lo mismo sin ejecutarlo. |
| **Descripción** | **Crear archivo `_headers` en la raíz** (funciona en Netlify/Vercel/Cloudflare Pages, NO en GitHub Pages): ``` # _headers / * X-Frame-Options: DENY X-Content-Type-Options: nosniff X-XSS-Protection: 1; mode=block Referrer-Policy: strict-origin-when-cross-origin Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' https://plausible.io https://cdnjs.cloudflare.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com https://cdnjs.cloudflare.com; img-src 'self' data: https:; connect-src 'self' https://plausible.io https://formspree.io; frame-ancestors 'none'; base-uri 'self'; form-action 'self' https://formspree.io ``` **Para GitHub Pages**: crear `_config.yml` con Jekyll headers config. |
| **Impacto esperado** | Mitigación XSS, clickjacking y MIME sniffing, compliance OWASP |
| **Esfuerzo** | S (15 min — archivo nuevo) |
| **Agente recomendado** | DevOps / Full Stack |
| **Referencias** | [1] Security Headers — web.dev/articles/security-headers [2] Netlify Custom Headers — docs.netlify.com/routing-and-access-controls/headers |
| **Estado** | **CRÍTICA** — propuesto R78-R80, nunca llegó al código. Esta vez con verificación de hosting. |

---

### Propuesta 2: Consolidar routines duplicadas (ACCIÓN URGENTE DEL CEO)

| Campo | Detalle |
|-------|---------|
| **Título** | Eliminar 20+ routines duplicadas — todas con mismo título "Análisis creativo periódico" |
| **Problema** | **R79 y R80 ya warneron sobre 20+ routines activas** con el mismo nombre. Cada una tiene trigger `0 */6 * * *` (cada 6 horas). Todas disparan issues duplicados simultáneamente. El board está saturado de análisis idénticos. |
| **Descripción** | **Acción requerida del CEO (es el único con permisos):** 1. Listar routines: `GET /api/companies/{companyId}/routines` 2. Identificar las que tienen `title: "Análisis creativo periódico"` y `assigneeAgentId: "c30f9bf5-8c58-47f1-bf57-39d17b170dab"` 3. Eliminar todas menos **UNA** 4. En la que queda, cambiar cadencia a `0 */12 * * *` (cada 12 horas) **Routines a eliminar** (20 IDs): `5e29c3f5`, `2d35eb76`, `e0192e6f`, `b5607579`, `0550ad49`, `5d5d9e2c`, `d5b431c8`, `a8e1dbd4`, `aac26d47`, `9cf6e875`, `6424a184`, `af6f45f9`, `f40bdb56`, `8e141fc5`, `e33ebd6b`, `7f285146`, `9a628a0b`, `a613007e`, `f453d46f`, `19ee8425`, `6809f995`, `79bff604`, `65713c9e`, `421d0641` **Routine a CONSERVAR**: la más reciente con `lastResult: completed` |
| **Impacto esperado** | Eliminación de ~20 issues duplicados cada 6 horas, ahorro de compute, board limpio |
| **Esfuerzo** | S (10 min — API calls de eliminación) |
| **Agente recomendado** | **CEO DIRECTAMENTE** (requiere permisos de admin) |
| **Referencias** |技能 paperclip/references/routines.md |
| **Estado** | **URGENTE OPERATIVA** — afecta funcionamiento diario |

---

### Propuesta 3: Blog posts con Schema.org `HowTo` (Mejor SEO para artículos instructivos)

| Campo | Detalle |
|-------|---------|
| **Título** | Reemplazar FAQPage con HowTo en blog posts tipo "cómo hacer X" |
| **Problema** | Los artículos del blog (`guia-sanitizacion-colchones.html`, `como-limpiar-tu-sofa.html`, etc.) usan solo FAQPage Schema.org. Pero son **artículos instructivos paso a paso**, no preguntas frecuentes. HowTo genera rich snippets de "pasos" en Google que incrementan CTR. |
| **Descripción** | **En cada blog post, cambiar el JSON-LD de FAQPage a HowTo:** ```json { "@context": "https://schema.org", "@type": "HowTo", "name": "Cómo sanitizar tu colchón en 5 pasos", "description": "Guía completa para desinfectar tu colchón en casa...", "step": [ { "@type": "HowToStep", "name": "Preparar el área", "text": "Retira sábanas y despeja el colchón...", "image": "https://purityclean.com/images/paso1.webp" }, { "@type": "HowToStep", "name": "Aspirar el colchón", "text": "Usa la aspiradora en modo suave...", "image": "https://purityclean.com/images/paso2.webp" }, { "@type": "HowToStep", "name": "Aplicar sanitizante", "text": "Rocía el desinfectante de forma uniforme...", "image": "https://purityclean.com/images/paso3.webp" } ] } ``` **Mantener FAQPage SOLO en index.html** (página principal, no blog). Los artículos de guía son HowTo. |
| **Impacto esperado** | Rich snippets de "pasos" en Google para artículos de guía, aumento de CTR, mejor SEO |
| **Esfuerzo** | S (1-2 horas — actualizar 6 blog posts) |
| **Agente recomendado** | SEO / Content |
| **Referencias** | [3] HowTo Schema — schema.org/HowTo [4] Rich Snippets HowTo — developers.google.com/search/docs/appearance/structured-data/how-to |
| **Estado** | Nueva — SEO diferenciado vs competencia |

---

### Propuesta 4: Google Business Profile sync (Mantener horarios actualizados)

| Campo | Detalle |
|-------|---------|
| **Título** | Añadir botón de "Sincronizar con Google Business Profile" en el admin |
| **Problema** | Los horarios de atención (`OpeningHoursSpecification` en index.html línea 48-55) están hardcodeados. Si el negocio cambia horarios, hay que editar el HTML manualmente. Los competidores tienen integración con Google Business Profile que actualiza automáticamente. |
| **Descripción** | **Opción A: Manual (más simple)** Crear sección en el README explicando cómo actualizar horarios en index.html cuando cambian: ```markdown ## Actualizar Horarios de Atención Editar el JSON-LD en `index.html` línea 48-55: ```json "openingHoursSpecification": [ { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday", "Tuesday", ...], "opens": "08:00", "closes": "18:00" } ] ``` **Opción B: API sync (más completa)** Usar Google Business Profile API para sincronizar horarios automáticamente. Requiere: - Cuenta de Google Business verificada - OAuth credentials - Serverless function como webhook **Recomendación para este sprint**: Opción A (documentación) + planificar Opción B para futuro. |
| **Impacto esperado** | Sincronización de horarios con Google Maps, reducción de trabajo manual, mejor SEO local |
| **Esfuerzo** | S (30 min — documentación) o M (4-6h — API sync) |
| **Agente recomendado** | SEO / Backend (si se hace API) |
| **Referencias** | [5] Google Business Profile API — developers.google.com/my-business |
| **Estado** | Nueva — diferenciación vs competencia |

---

### Propuesta 5: Refactorizar 13 archivos `zonas/*.html` en template dinámico

| Campo | Detalle |
|-------|---------|
| **Título** | Migrar 13 archivos de zonas a un solo template con data attributes |
| **Problema** | **Los 13 archivos en `zonas/` son prácticamente idénticos** (`usaquen`, `suba`, `kennedy`, `fontibon`, `engativa`, `chapinero`, `bosa`, `barrios-unidos`, `usme`, `teusaquillo`, `zona-template.html`). Cada cambio en hero o CTA requiere editar 13 archivos. Mantenimiento insostenible. |
| **Descripción** | **Opción A: JavaScript vanilla con hash routing** Crear `zonas/index.html` que: 1. Carga `zonas/data.json` con datos de cada zona 2. Renderiza dinámicamente según `?zona=usaquen` 3. Mantiene SEO con history API **Opción B: Build script** Generar los 13 HTMLs desde un build script `build-zonas.js`: ```javascript const zonas = require('./data.json'); zonas.forEach(z => generateZonaPage(z)); ``` **data.json ejemplo:** ```json { "usaquen": { "name": "Usaquén", "description": "Servicios de limpieza en Usaquén...", "heroImage": "/images/zonas/usaquen-hero.webp", "services": ["residential", "commercial"] }, "suba": { "name": "Suba", ... } } ``` **Recomendación**: Opción A (más rápido, menos código). SEO con prerendering si es necesario. |
| **Impacto esperado** | Eliminación de deuda técnica, mantenibilidad 10x, zona nueva en minutos |
| **Esfuerzo** | M (4-6 horas — Opción A completa) |
| **Agente recomendado** | Full Stack |
| **Referencias** | [6] Zola static site generator — getzola.org |
| **Estado** | Nueva — deuda técnica identificada en R80 |

---

## Orden de Implementación Recomendado R81

| # | Propuesta | Impacto | Esfuerzo | Prioridad | Estado |
|---|-----------|---------|----------|-----------|--------|
| 1 | **Consolidar routines duplicadas** | Operación | S | **URGENTE** | CEO action |
| 2 | Security Headers (`_headers`) | Seguridad | S (15min) | **Crítica** | R78→R81, nunca implementado |
| 3 | Schema.org HowTo en blog | SEO | S (1-2h) | **Alta** | Nueva diferenciación |
| 4 | Google Business Profile sync | SEO local | S (30min docs) | **Media** | Nueva propuesta |
| 5 | Refactorizar zonas (DRY) | Deuda técnica | M (4-6h) | **Media** | DRY violation |

---

## Nota sobre el Patrón de Análisis R1-R81

Este patrón de 81 rondas donde las mismas propuestas (security headers, exit-intent, WhatsApp Cloud API) se repiten sin implementarse sugiere:

1. **Sobrecarga de propuestas**:生成 demasiadas ideas pero sin seguimiento de cuáles se ejecutaron realmente
2. **Las propuestas "fáciles" (S) realmente no son tan fáciles**:implementar `_headers` requiere saber que el hosting es Netlify y no GitHub Pages
3. **Falta de priorización explícita del CEO**: hace falta que el CEO diga "esta semana solo estas 2"
4. **Problema operativo de routines**: 20+ análisis duplicados saturan el board y confunden el contexto

**Recomendación al CEO**: De las 5 propuestas de R81, elegir **máximo 2** para implementar en la próxima semana. Las demás quedan en backlog.

---

## Fuentes

[1] Security Headers Quick Reference. https://web.dev/articles/security-headers
[2] Netlify Custom Headers. https://docs.netlify.com/routing-and-access-controls/headers
[3] HowTo Schema. https://schema.org/HowTo
[4] Rich Snippets HowTo. https://developers.google.com/search/docs/appearance/structured-data/how-to
[5] Google Business Profile API. https://developers.google.com/my-business
[6] Zola Static Site Generator. https://getzola.org

---

*Documento generado por Innovation Scout — Round 81*
*Purity & Clean Analysis — 2026-04-28*
*Co-Authored-By: Paperclip <noreply@paperclip.ing>*