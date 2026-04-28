# Análisis Creativo — Purity & Clean (Round 91)

**Proyecto:** Purity & Clean
**Fecha:** 2026-04-28
**Analista:** Innovation Scout
**Ronda:** 91
**Issue padre:** DOMAA-838

---

## Resumen Ejecutivo

R91 se enfoca en **Google Business Profile optimization advanced** y **WhatsApp Business Platform features** que no se propusieron en R90. Hallazgo clave: Purity & Clean tiene schema LocalBusiness pero NO está aprovechando las features gratuitas de Google Business Profile (Q&A pre-populated, Posts, Servicios con precios). Además, se propone una **video content strategy** para YouTube Shorts que podría posicionarlo por encima de Serviclean.

---

## Estado Actual del Proyecto (R91)

### Lo implementado (resumen R90)

| Feature | Estado |
|---------|--------|
| PWA + Push | ✅ |
| Chatbot WhatsApp | ✅ |
| Dark mode | ✅ |
| Blog SEO (6 artículos) | ✅ |
| Google Reviews schema | ✅ |
| Programa de referidos | ✅ |
| Zonas pages (11) | ✅ |
| Before/After gallery | ✅ |
| Stats animados | ✅ |
| Garantía 200% | ✅ |

### Pendientes de R89-R90 (no implementados aún)

| Feature | Ronda | Prioridad CEO |
|---------|-------|---------------|
| Quiz Interactivo | R89 | ⏳ Pendiente |
| Instagram UGC | R89 | ⏳ Pendiente |
| Exit Intent Popup | R89 | ⏳ Pendiente |
| Voice Search FAQ | R89 | ⏳ Pendiente |
| Página de Precios | R89 | ⏳ Pendiente |
| Gift Cards | R90 | ⏳ Pendiente |
| Corporate B2B Vouchers | R90 | ⏳ Pendiente |
| API Pública | R90 | ⏳ Pendiente |
| Public Checklists | R90 | ⏳ Pendiente |
| Flat Rate + Recurring | R90 | ⏳ Pendiente |

---

## Investigación: Google Business Profile + WhatsApp Business

### Hallazgo 1: Google Business Profile — Q&A Automation

Google Business Profile permite pre-popular preguntas y respuestas frecuentes directamente en el perfil. A diferencia del FAQPage schema (que NO genera rich results para sitios comerciales), las preguntas y respuestas de GBP aparecen directamente en Google Maps y Search.

**Proceso:**
1. Claim y verificar el perfil GBP
2. Usar " Preguntas y respuestas" para agregar las 10 preguntas más frecuentes
3. Usar "Tu negocio en Google" → "Preguntas frecuentes" → "Agregar preguntas frecuentes"

**Beneficio:** Los usuarios ven las respuestas directamente en Google Search antes de hacer clic, reduciendo el tiempo de decisión.

**Fuente:** [Google Business Profile Help](https://support.google.com/business/answer/3024641)

---

### Hallazgo 2: Google Business Profile — Publicaciones (Posts)

GBP permite publicar actualizaciones, ofertas y eventos directamente. Cada post tiene:
- Imagen
- Título (max 100 caracteres)
- Descripción (max 1500 caracteres)
- CTA button (Learn More, Book, etc.)
- Vencimiento (7-30 días)

**Estrategia:** Publicar semanalmente con:
- Ofertas estacionales ("Limpieza de sofás - 15% off en mayo")
- Tips de mantenimiento ("¿Cada cuánto sanitizar tu colchón?")
- Antes/después (con fotos reales)
- Testimonios de clientes

**Beneficio:** Mantiene el perfil activo, mejora el SEO local, y aparece en resultados de búsqueda.

**Fuente:** [Google Business Profile Posts](https://support.google.com/business/answer/7680259)

---

### Hallazgo 3: Google Business Profile — Servicios con Precios

La sección "Servicios" de GBP permite listar servicios con precios base. Esto genera **rich results específicos** en Google Search.

**Implicación:** A diferencia de FAQPage (ineligible para rich results en sitios comerciales), la sección de servicios SÍ puede aparecer como rich result.

**Ejemplo de configuración:**
```
Limpieza profunda de sofás
- Sofá 2 cuerpos: desde $80.000 COP
- Sofá 3 cuerpos: desde $100.000 COP
- Sofá 4+ cuerpos: desde $130.000 COP
```

**Beneficio:** El precio visible en Google Search aumenta el CTR y reduce consultas de "cuánto cuesta".

**Fuente:** [Google Business Profile Services](https://support.google.com/business/answer/9301513)

---

### Hallazgo 4: WhatsApp Business Platform — Catálogo

WhatsApp Business tiene Catálogo de productos/servicios que permite:
- Listar todos los servicios con descripción y precio
- Compartir el catálogo directamente en WhatsApp
- Los clientes pueden ver servicios sin visitar el sitio

**Diferencia con la página de precios del sitio:** El catálogo de WhatsApp permite conversación directa, mientras que la página web es estática.

**Implicación:** Un cliente que ve el sitio, puede abrir WhatsApp, ver el catálogo, y reservar sin salir de WhatsApp.

**Fuente:** [WhatsApp Business Catalog](https://business.whatsapp.com/business-app/catalog)

---

### Hallazgo 5: YouTube Shorts como Canal de Adquisición

YouTube Shorts tiene 2+ mil millones de usuarios mensuales. Para servicios locales:
- "Cómo limpiamos tu sofá en 30 segundos" (proceso)
- "Antes y después" (resultados)
- "5 tips para mantener tus sofás limpios" (educación)

**Ventaja sobre TikTok:** YouTube Shorts aparece en búsqueda de Google. Un video de "limpieza de sofás Bogotá" puede aparecer en ambas plataformas.

**Beneficio:** Adquisición de clientes por búsqueda de video, diferenciación vs Serviclean (que no tiene video marketing activo).

**Fuente:** [YouTube Shorts Creator Academy](https://creatoracademy.youtube.com/page/lesson/shorts-monetization)

---

## Propuestas (Round 91)

### Propuesta 1: Google Business Profile — Q&A Automation (HIGH PRIORITY — SEO Local)

| Campo | Detalle |
|-------|---------|
| **Título** | Pre-popular 10+ preguntas frecuentes en Google Business Profile Q&A |
| **Problema** | El sitio tiene FAQPage schema pero Google NO muestra rich results para sitios comerciales. Mientras tanto, GBP Q&A aparece directamente en Google Search y Maps sin restricciones. |
| **Descripción** | **Paso 1 — Claim/verificar el perfil GBP:** Ir a business.google.com y verificar que Purity & Clean tiene perfil activo y verificado. **Paso 2 — Agregar las 10 preguntas más frecuentes:** Usar la herramienta de Q&A para pre-popular: 1. "¿Cuánto cuesta la limpieza de un sofá?" → "$80.000-$130.000 según tamaño" 2. "¿Cuánto tarda el servicio?" → "2-4 horas según metros²" 3. "¿Hacen sanitización de colchones?" → "Sí, eliminamos ácaros y bacterias" 4. "¿Cubren mi zona?" → "Chapinero, Usaquén, Suba, Kennedy, y más" 5. "¿Tienen garantía?" → "Garantía 200% satisfacción o devolvemos tu dinero" 6. "¿Cómo reservo?" → "WhatsApp: +57-300-123-4567" 7. "¿Usan productos seguros?" → "Productos hipoalergénicos y amigables con mascotas" 8. "¿Hacen servicio corporativo?" → "Sí, contratos mensuales para oficinas" 9. "¿Dan factura?" → "Sí, factura electrónica" 10. "¿Puedo regalar el servicio?" → "Sí, gift cards disponibles" **Paso 3 — Programar revisión mensual** para agregar preguntas estacionales. |
| **Impacto esperado** | Las respuestas aparecen en Google Search antes de que el usuario haga clic. Reduce consultas innecesarias a WhatsApp. Mayor CTR desde resultados de búsqueda. |
| **Esfuerzo** | S (2-3 horas — configurar Q&A + redactar respuestas) |
| **Agente recomendado** | SEO / Marketing |
| **Referencias** | [1] Google Business Profile Q&A https://support.google.com/business/answer/3024641 |
| **Estado** | Nueva propuesta — NO mencionada en R90 |
| **Prioridad CEO** | **Alta** — Impacto directo en visibilidad local |

---

### Propuesta 2: Google Business Profile — Weekly Posts Strategy (MEDIUM PRIORITY — SEO Local)

| Campo | Detalle |
|-------|---------|
| **Título** | Implementar calendario editorial de posts semanales en Google Business Profile |
| **Problema** | El perfil de GBP de Purity & Clean aparece estático. Los perfiles con posts activos tienen mayor visibilidad en Google Maps y mejor SEO local. |
| **Descripción** | **Calendario editorial semanal:** **Lunes:** Tip de mantenimiento ("¿Sabías que deberías limpiar tu sofá cada 6 meses?") **Miércoles:** Oferta de la semana ("15% off en sanitización de colchones") **Viernes:** Antes/después con foto real **Sábado:** Testimonio de cliente destacado **Template de post:** ``` Título: [Tip/Oferta/Testimonio] Descripción: [Contenido + CTA] Imagen: [Foto profesional] Botón: "Reservar ahora" → WhatsApp ``` **Automatización:** Usar Zapier o Make (Integromat) para programar posts automáticos cuando se publican artículos en el blog. |
| **Impacto esperado** | Perfil más activo = mejor ranking en Google Maps. Contenido fresco signals a Google que el negocio está activo. Ofertas estacionales pueden generar spikes de tráfico. |
| **Esfuerzo** | S (1-2 horas/semana para crear contenido, o 4-6 horas para setup de automatización) |
| **Agente recomendado** | Marketing / Content |
| **Referencias** | [2] Google Business Profile Posts https://support.google.com/business/answer/7680259 |
| **Estado** | Nueva propuesta — NO mencionada en R90 |
| **Prioridad CEO** | **Media** — requiere compromiso de contenido semanal |

---

### Propuesta 3: WhatsApp Business Platform — Catálogo de Servicios (MEDIUM PRIORITY — Conversión)

| Campo | Detalle |
|-------|---------|
| **Título** | Configurar WhatsApp Business Catalog con todos los servicios y precios |
| **Problema** | El sitio tiene página de precios (pendiente de R89), pero WhatsApp es el canal principal de reservas. Sin catálogo en WhatsApp, el cliente debe navegar el sitio para ver servicios. |
| **Descripción** | **En WhatsApp Business:** 1. **Configurar catálogo:** Ir a WhatsApp Business → Configuración → Catálogo → Agregar productos/servicios 2. **Agregar cada servicio:** - Imagen profesional del servicio - Nombre del servicio - Descripción corta - Precio base - Enlace al sitio para más detalles **Servicios a catalogar:** - Limpieza profunda de sofás ($80.000-$130.000) - Sanitización de colchones ($60.000-$100.000) - Mantenimiento de alfombras ($150.000-$250.000) - Limpieza de sillas de oficina ($25.000-$40.000) - Plan mensual corporativo (desde $400.000) - Gift Cards ($80.000, $150.000, $250.000) **Integración con el sitio:** Agregar botón "Ver catálogo en WhatsApp" en la página de precios que abre wa.me con el catálogo pre-cargado. |
| **Impacto esperado** | El cliente puede ver servicios y precios directamente en WhatsApp y reservar sin salir de la app. Reduce fricción de conversión. |
| **Esfuerzo** | S (3-4 horas — configurar catálogo + crear imágenes) |
| **Agente recomendado** | Marketing / Frontend |
| **Referencias** | [3] WhatsApp Business Catalog https://business.whatsapp.com/business-app/catalog |
| **Estado** | Nueva propuesta — NO mencionada en R90 |
| **Prioridad CEO** | **Media** — mejora conversión desde WhatsApp |

---

### Propuesta 4: YouTube Shorts — Video Marketing Strategy (MEDIUM PRIORITY — Adquisición)

| Campo | Detalle |
|-------|---------|
| **Título** | Crear serie de YouTube Shorts mostrando proceso de limpieza y resultados |
| **Problema** | Serviclean tiene 8+ años de trayectoria y presencia establecida. Purity & Clean no tiene contenido de video que demuestre calidad. YouTube Shorts aparece en búsqueda de Google, dando exposición gratuita. |
| **Descripción** | **Serie de 12 Shorts para el primer mes:** **Semana 1 — Proceso:** - "Así limpiamos un sofá sucio en 30 segundos" - "El secreto de la sanitización de colchones" - "Qué productos usamos (y por qué son seguros)" **Semana 2 — Resultados:** - "Antes y después: sofá de tela" - "Antes y después: colchón con ácaros" - "Transformación de alfombra corporativa" **Semana 3 — Tips:** - "5 tips para mantener tus sofás limpios" - "Cada cuánto sanitizar tu colchón" - "Errores comunes al limpiar muebles" **Semana 4 — Social proof:** - "Lo que dice un cliente satisfecho" (testimonio) - "Rutina de limpieza profesional" (time-lapse) - "Por qué elegir Purity & Clean" **SEO para YouTube:** - Título: "Limpieza de sofá Bogotá \| Purity & Clean" - Descripción: "Servicio profesional de limpieza de sofás en Bogotá. Contáctanos: WhatsApp +57-300-123-4567" - Tags: "limpieza sofás Bogotá", "sanitización colchones", "limpieza profesional Colombia" |
| **Impacto esperado** | Adquisición de clientes por búsqueda de video. Diferenciación vs Serviclean. Contenido reusable para Instagram Reels y TikTok. |
| **Esfuerzo** | M (8-10 horas para primeros 12 videos, o contratar producción) |
| **Agente recomendado** | Content / Marketing |
| **Referencias** | [4] YouTube Shorts Creator Academy https://creatoracademy.youtube.com/page/lesson/shorts-monetization |
| **Estado** | Nueva propuesta — NO mencionada en R90 |
| **Prioridad CEO** | **Media** — decisión de inversión en video |

---

### Propuesta 5: Google Business Profile — Servicios con Precios Estimados (MEDIUM PRIORITY — SEO)

| Campo | Detalle |
|-------|---------|
| **Título** | Configurar sección de servicios con precios base en Google Business Profile |
| **Problema** | Los competidores aparecen en Google Search con información de precios. Purity & Clean no tiene esta feature, perdiendo clicks de usuarios que comparan. A diferencia de FAQPage, los servicios SÍ generan rich results. |
| **Descripción** | **En Google Business Profile → Servicios → Agregar servicio:** **Limpieza profunda de sofás** - Sofá 2 cuerpos: desde $80.000 COP - Sofá 3 cuerpos: desde $100.000 COP - Sofá 4+ cuerpos: desde $130.000 COP - Tiempo estimado: 2-3 horas **Sanitización de colchones** - Colchón individual: desde $60.000 COP - Colchón doble: desde $80.000 COP - Colchón king: desde $100.000 COP - Tiempo estimado: 1-2 horas **Mantenimiento de alfombras** - Hasta 10m²: desde $150.000 COP - 10-25m²: desde $200.000 COP - Más de 25m²: cotización personalizada **Plan mensual corporativo** - Contrato mensual: desde $400.000 COP - Incluye: 4 visitas mensuales, 10% descuento **Gift Cards** - $80.000 COP (1 limpieza básica) - $150.000 COP (1 limpieza completa) - $250.000 COP (pack premium) |
| **Impacto esperado** | Precios visibles en Google Search aumentan CTR. Los rich results de servicios atraen más clientes cualificados. Reducción de consultas de "cuánto cuesta" en WhatsApp. |
| **Esfuerzo** | S (2-3 horas — configurar servicios + precios) |
| **Agente recomendado** | SEO / Marketing |
| **Referencias** | [5] Google Business Profile Services https://support.google.com/business/answer/9301513 |
| **Estado** | Nueva propuesta — NO mencionada en R90 |
| **Prioridad CEO** | **Media** — SEO local con impacto directo en conversión |

---

## Orden de Implementación Recomendado

| # | Propuesta | Impacto | Esfuerzo | Prioridad | Tipo |
|---|-----------|---------|----------|-----------|------|
| 1 | GBP Q&A Automation | SEO Local (Visibilidad) | S (2-3h) | **Alta** | SEO |
| 2 | GBP Servicios con Precios | SEO Local (CTR) | S (2-3h) | **Alta** | SEO |
| 3 | WhatsApp Business Catalog | Conversión (WhatsApp) | S (3-4h) | **Media** | Conversión |
| 4 | GBP Weekly Posts | SEO Local (Ranking) | S (1-2h/sem) | **Media** | SEO |
| 5 | YouTube Shorts Strategy | Adquisición (Video) | M (8-10h) | **Media** | Marketing |

---

## Dependencias y Bloqueadores

| Propuesta | Depende de | Bloqueador |
|-----------|------------|------------|
| GBP Q&A | Perfil GBP verificado | CEO debe confirmar acceso a GBP |
| GBP Servicios | Perfil GBP verificado | CEO debe confirmar acceso a GBP |
| WhatsApp Catalog | WhatsApp Business instalado | CEO debe configurar WhatsApp Business |
| GBP Posts | Perfil GBP verificado | CEO debe confirmar acceso a GBP |
| YouTube Shorts | Decisión de inversión | CEO debe aprobar presupuesto de video |

---

## Comparación R90 vs R91

| Aspecto | R90 | R91 |
|---------|-----|-----|
| **Foco** | Modelo de negocio (API, Gift Cards, B2B) | Google Business Profile + WhatsApp |
| **Tipo propuestas** | Estratégico/Producto | SEO Local + Conversión |
| **Esfuerzo promedio** | S-L | S-M |
| **Impacto** | Transformacional (largo plazo) | Inmediato (corto plazo) |
| **GBP Q&A** | No | **Sí — nueva** |
| **GBP Posts** | No | **Sí — nueva** |
| **GBP Servicios** | No | **Sí — nueva** |
| **WhatsApp Catalog** | No | **Sí — nueva** |
| **YouTube Shorts** | No | **Sí — nueva** |

**R91 no repite ninguna propuesta de R90.** Las 5 propuestas abordan presencia en Google (SEO local) y WhatsApp, canales que R90 no cubrió.

---

## Fuentes

[1] Google Business Profile Q&A. https://support.google.com/business/answer/3024641

[2] Google Business Profile Posts. https://support.google.com/business/answer/7680259

[3] WhatsApp Business Catalog. https://business.whatsapp.com/business-app/catalog

[4] YouTube Shorts Creator Academy. https://creatoracademy.youtube.com/page/lesson/shorts-monetization

[5] Google Business Profile Services. https://support.google.com/business/answer/9301513

---

*Documento generado por Innovation Scout — Round 91*
*Purity & Clean Analysis — 2026-04-28*
*Co-Authored-By: Paperclip <noreply@paperclip.ing>*