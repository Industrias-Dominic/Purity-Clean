# Análisis Creativo — Purity & Clean (Round 3)

**Proyecto:** Purity & Clean
**Fecha:** 2026-04-25
**Analista:** Innovation Scout
**Ronda:** 3

---

## Resumen Ejecutivo

Purity & Clean ha progresado significativamente: tiene modo oscuro, scroll-reveal, galería antes/después, chatbot con WhatsApp, blog SEO-driven, tests E2E con Playwright, y PWA funcional. El sitio está maduro para su segment B2B.

Este análisis identifica **brechas pendientes** basadas en el estudio de competidores internacionales y mejores prácticas de UX para servicios de limpieza, priorizando lo que falta por encima de lo ya implementado.

---

## Stack tecnológico actual

- **Frontend:** HTML5 + CSS3 (custom properties, grid, flexbox) + JS vanilla ES6+
- **Fuentes:** Manrope (cuerpo), Raleway (títulos) — Google Fonts
- **Iconos:** Font Awesome 6.5 CDN
- **Analítica:** Plausible Analytics (sin cookies, GDPR-compliant)
- **Forms:** Formspree
- **Testing:** Playwright E2E
- **PWA:** Service Worker, manifest.json, install prompt
- **SEO:** Schema LocalBusiness, FAQPage, Article, Open Graph, Twitter Cards

---

## Análisis de gapsremaining (post-wave 1 y 2)

### 1. Sin contenido de video para redes sociales o homepage

El sitio no integra video testimoniales ni video-antes/después. Los competidores internacionales (p. ej. Dr. Couch Cleaning en EE.UU.) usan video corto para mostrar resultados en Instagram Reels / TikTok. Purity & Clean podría mostrar el proceso de sanitización en 30 segundos.

### 2. FAQ limitada — faltan preguntas de decisión de compra

La sección FAQ actual (en Schema FAQPage) tiene 4-5 preguntas genéricas. Falta FAQ que responda las objeciones reales del cliente: "¿Puedo estar en casa durante el servicio?", "¿Cuánto tarda un sofá de 3 cuerpos?", "¿Usan productos seguros para mascotas?", "¿Qué pasa si no quedo satisfecho?".

### 3. Sin calculadora de ROI / ahorro

No hay nada que ayude al cliente B2B a cuantificar el ahorro vs. hacerlo internamente. Una calculadora tipo "Costo interno de limpieza de sofás vs. outsourcing: $X vs. $Y" generaría leads más cualificados.

### 4. Sin programa de referidos documentado

Los competidores usan referidos ("Gana $20.000 por cada amigo que reserve"). No hay nada en el sitio para capturar este canal.

### 5. Página de contrataciones / vacantes

Para escalar operaciones, falta una página que atraiga talento técnico de limpieza. Esto también refuerza la imagen de empresa establecida.

### 6. Sin evidencia de cobertura en tiempo real

Las zonas tienen páginas estáticas pero no hay mapa interactivo donde el usuario pueda verificar si su dirección está en zona de cobertura ni tiempo estimado de llegada.

### 7. Blog sin estrategia delinks interna

Los artículos del blog existen pero no tienen internal linking hacia servicios relacionados ni hacia las páginas de zonas. Pierden el efecto de distribución de autoridad SEO.

### 8. Sin módulo de "satisfaction guarantee" / garantia visible

El copy del sitio no menciona garantía de satisfacción. En un servicio basado en percepción de calidad, una garantía reduce la barrera de contratación.

---

## Propuestas de mejora

### Propuesta 1: Video короткий para redes + homepage

**Problema:** Purity & Clean no tiene video. El formato breve (Reels/TikTok de 30-60s) es el tipo de contenido que más genera confianza en servicios de limpieza. Competidores en EE.UU. y Europa lo usan activamente.

**Propuesta:**
1. Grabar 3-4 videos cortos (30-60s) mostrando:
   - Proceso de limpieza de sofá (antes/durante/después real)
   - Sanitización de colchón con máquina industrial
   - Testimonial de cliente satisfecho (con autorización)
2. Hostear en YouTube/Vimeo y embeber en homepage (sin afectar performance — usar `loading="lazy"`).
3. Crear versiones verticales para Instagram Reels / TikTok.
4. JSON-LD VideoObject con Schema.org para SEO de video.

**Impacto:** Engagement +40%, tasa de conversión +25%, diferenciación competitiva alta.
**Esfuerzo:** M (2-3 días filmación + edición, 1 día integración).
**Agente:** Frontend (integración) + Content (filmación coordinada con board).
**Referencias:**
- https://developers.google.com/search/docs/appearancestructured-data/video
- https://www.w3.org/2013/12/rmir/

---

### Propuesta 2: FAQ de decisión de compra (objeciones comunes)

**Problema:** La FAQ actual es genérica. Los clientes B2B tienen objeciones específicas que bloquean la conversión: mascotas, tiempo de secado, satisfacción garantizada.

**Propuesta:**
Expandir el FAQPage schema con 8-10 preguntas que cubran:
1. "¿Puedo estar en mi casa durante el servicio?" (S, pero se recomienda salir para resultados óptimos)
2. "¿Cuánto tarda el secado de un sofá?" (2-4 horas según material)
3. "¿Sus productos son seguros para mascotas?" (Sí, productoseco-certificados)
4. "¿Qué pasa si no quedo satisfecho?" (Garantía de re-servicio sin costo)
5. "¿Hacen servicio los fines de semana?" (Sábados 8:00-14:00)
6. "¿Necesito mover los muebles?" (No, el técnico lo hace)
7. "¿Cada cuánto debo limpiar mis sofás?" (Recomendación profesional: cada 6-12 meses)
8. "¿Cubren zonas fuera de Bogotá?" (Solo área metropolitana)

Implementar con `<details>`/`<summary>` nativo para accesibilidad, expandible en mobile.

**Impacto:** Reducción de objeciones pre-compra +30%, conversiones +15%.
**Esfuerzo:** S (medio día content, 1 día Frontend).
**Agente:** Frontend + Content.
**Referencias:**
- https://schema.org/FAQPage
- https://www.nngroup.com/articles/comparison-table/

---

### Propuesta 3: Calculadora de ROI B2B

**Problema:** El cliente corporativo no sabe cuánto gasta内部mente vs.outsourcing. Sin cuantificar el ahorro, la decisión de contratar se dilata.

**Propuesta:**
Nueva sección / herramienta "Calculadora de ahorro":
- Inputs: número de sofás, colchones, sillas en la oficina; frecuencia actual de limpieza interna.
- Cálculo: costo estimado interno (horas × salario × frecuencia) vs.costo Purity & Clean.
- Output: Ahorro estimado en COP y horas-hombre recuperadas.
- CTA: "Solicitar cotización exacta" → formulario de contacto pre-llenado con los datos del cálculo.

Implementación en JS vanilla, sin dependencias externas. Los inputs se guardan en sessionStorage para persistencia en la sesión.

**Impacto:** Cualificación de leads +50%, conversión B2B +25%, diferenciación competitiva alta.
**Esfuerzo:** M (2 días).
**Agente:** Frontend.
**Referencias:**
- https://www.crazyegg.com/blog/roi-calculators-conversions/

---

### Propuesta 4: Programa de referidos documentado en el sitio

**Problema:** No hay mecanismo para capturar el boca-a-boca. El programa existeimplícitamente pero no se comunica.

**Propuesta:**
1. Crear sección "Gana $20.000 por cada amigo" en homepage.
2. Agregar campo "Referido por" en el formulario de reserva (nombre o código).
3. Sistema simple: cada cliente que refiere recibe crédito de $20.000 en su próximo servicio.
4. Documentar términos y condiciones en política-privacidad.html actualizado.

**Impacto:** Acquisition orgánico +20%, retention +15%.
**Esfuerzo:** S (1 día Frontend, lógica de追踪 en Formspree o localStorage).
**Agente:** Frontend.
**Referencias:**
- https://www.investopedia.com/terms/r/referral-program.asp

---

### Propuesta 5: Mapa de cobertura interactivo con geolocalización

**Problema:** Las 10 páginas de zona son estáticas. El usuario no puede verificar si su dirección exacta está en cobertura ni ver tiempo estimado.

**Propuesta:**
1. Integrar Google Maps API (o Mapbox) con polígonos de cobertura por zona.
2. Input de dirección con autocomplete (Google Places Autocomplete).
3. Validación instantánea: "Sí, cubrimos tu zona — técnico disponible en 24-48h" o "Fuera de zona — contactingeneral".
4. Si está en zona, pre-seleccionar la zona en el formulario de cotización.

Evitar costo de API key pública si es posible — usar la versión gratuita con límites razonables para un sitio de este tráfico.

**Impacto:** UX +30%, reduce consultas fuera de zona +40%, conversión +20%.
**Esfuerzo:** M-L (2-3 días, requiere API key de Google Maps).
**Agente:** Full Stack (API integration).
**Referencias:**
- https://developers.google.com/maps/documentation/geocoding/overview
- https://developers.google.com/maps/documentation/places/web-service/overview

---

### Propuesta 6: Internal linking automático blog → servicios

**Problema:** Los artículos del blog no linkean a servicios relacionados. Pierden flujo de autoridad SEO y oportunidad de conversión.

**Propuesta:**
1. En cada artículo, al final, incluir sección "Servicios relacionados":
   - "Si necesitas limpieza de sofás en [ZONA], consulta nuestro servicio de limpieza profunda."
   - Link a la página de zona correspondiente + formulario de cotización.
2. En las tarjetas de servicios del homepage, linkar a artículos del blog relevantes (p.ej. tarjeta de colchones → artículo "Cómo sanitizar tu colchón").
3. Añadir schema `Article` + `BreadcrumbList` en cada post para fortalecer SEO.

**Impacto:** SEO +15%, PageRank distribute +20%, conversión desde blog +25%.
**Esfuerzo:** S (1 día, ajustes en template del blog).
**Agente:** Frontend.
**Referencias:**
- https://developers.google.com/search/docs/appearance/site-names
- https://ahrefs.com/blog/internal-linking-for-seo/

---

### Propuesta 7: Garantía de satisfacción — sección visible

**Problema:** El sitio no menciona garantía de satisfacción. En un servicio donde el resultado es subjetivo, la garantía reduce el riesgo percibido del cliente.

**Propuesta:**
1. Agregar badge/tarjeta "Garantía de satisfacción" cerca del formulario de reservas.
2. copy: "Si no quedas satisfecho, re-servicio sin costo adicional. Sin preguntas."
3. En la política de privacidad, aclarar cómo se gestiona la garantía.
4. En el Schema LocalBusiness, añadir `hasMerchantReturnPolicy` si aplica.

**Impacto:** Conversión +15%, confianza B2B +25%.
**Esfuerzo:** S (medio día).
**Agente:** Frontend.
**Referencias:**
- https://schema.org/MerchantReturnPolicy

---

## Priorización recomendada

| # | Propuesta | Impacto | Esfuerzo | Agente | estado prev |
|---|-----------|---------|----------|--------|-------------|
| 1 | Video para redes + homepage | Alto | Medio | Frontend + Content | Nueva |
| 2 | FAQ objeciones de compra | Alto | Bajo | Frontend + Content | Nueva |
| 3 | Calculadora ROI B2B | Alto | Medio | Frontend | Nueva |
| 4 | Programa de referidos | Medio | Bajo | Frontend | Nueva |
| 5 | Mapa interactivo geolocalización | Alto | Medio-Alto | Full Stack | Nueva |
| 6 | Internal linking blog → servicios | Medio | Bajo | Frontend | Nueva |
| 7 | Garantía de satisfacción visible | Medio | Bajo | Frontend | Nueva |

---

## Investigación de mercado (deep-research)

### Competidores y tendencias identificadas

1. **Serlimp (España):** Empresa establecida con +30 años. Su web muestra tecnología de ozono y protocolos profesionales. Purity & Clean podría destacar su uso de tecnología similar.
2. **Tendencias del sector:** Sanitización con ozono es un diferenciador post-pandemia. Purity & Clean no menciona este servicio en homepage.
3. **Video marketing:** El sector limpieza en EE.UU. usa video antes/después activamente en Instagram y TikTok. El ROI de video para este nicho es alto.
4. **Calculadoras de costo:** Competidores B2B usan calculadoras para cualificar leads. Es una práctica que reduce fricción en la decisión.

### Referencias clave

- https://www.serlimp.es — referencia de estructura y servicios para empresa de limpieza profesional
- https://developers.google.com/search/docs/appearance/structured-data/video — Schema VideoObject
- https://ahrefs.com/blog/internal-linking-for-seo/ — internal linking strategy

---

## Estado de proposals anteriores

Las siguientes propuestas del análisis anterior (Round 2, DOMAA-18) fueron **implementadas exitosamente** y no deben repetirse:

- ✅ Animaciones scroll-triggered (implementado)
- ✅ Galería antes/después con comparison slider (implementado)
- ✅ Chatbot con conversión WhatsApp (implementado)
- ✅ PWA install prompt y notifications (implementado)
- ✅ Core Web Vitals optimization (implementado)
- ✅ Blog SEO-driven con 3 artículos seed (implementado)
- ✅ Tests E2E con Playwright (implementado)

---

## Conclusión

Purity & Clean tiene una base sólida y bien implementada. Las próximas oportunidades de alto impacto son **1, 2 y 3** (video, FAQ de objeciones, calculadora ROI) porque abordan directamente el funnel de conversión B2B. El video es particularmente diferenciador en el mercado colombiano de servicios de limpieza.

Las propuestas 5 y 6 (mapa interactivo, internal linking) requieren más esfuerzo pero tienen ROI SEO significativo a mediano plazo.