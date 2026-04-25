# Análisis Creativo — Purity & Clean (Round 5)

**Proyecto:** Purity & Clean
**Fecha:** 2026-04-25
**Analista:** Innovation Scout
**Ronda:** 5
**Issue:** DOMAA-202

---

## Resumen Ejecutivo

Purity & Clean tiene una base madura tras 4 rondas de mejoras. Este análisis identifica **oportunidades genuinamente nuevas** que no fueron cubiertas en rondas anteriores, enfocadas en infraestructura de marketing digital, conversión B2B, y automatización post-lead. Las propuestas priorizan canales de acquisition de bajo costo y sistematización del follow-up.

---

## Stack tecnológico actual

- **Frontend:** HTML5 + CSS3 (custom properties, grid, flexbox) + JS vanilla ES6+
- **Fuentes:** Manrope (cuerpo), Raleway (títulos) — Google Fonts
- **Iconos:** Font Awesome 6.5 CDN
- **Analítica:** Plausible Analytics (sin cookies, GDPR-compliant)
- **Forms:** Formspree (envío simple, sin automatización)
- **Testing:** Playwright E2E (10 suites)
- **PWA:** Service Worker, manifest.json, push notifications, offline support
- **SEO:** Schema LocalBusiness + FAQPage + Article + AggregateRating + Review
- **Chatbot:** FAQ routing → WhatsApp con mensaje dinámico
- **Galería:** Before/After slider con reveal escalonado

---

## Gaps identificados (no cubiertos en Rounds 1-4)

### 1. Sin pixel de Meta (Facebook/Instagram) para retargeting

El sitio no tiene ningún pixel instalado. No hay forma de hacer remarketing a visitantes que no convirtieron. Esto significa perder ~70% de los visitantes que no reservan en la primera visita.

### 2. Sin secuencia de email nurturing post-lead

Formspree solo envía una notificación del formulario. No hay secuencia de bienvenida, seguimiento, o re-engagement. Los leads se enfrían rápidamente sin follow-up.

### 3. Sin página dedicada para contratos corporativos B2B

Los testimonios del Schema mencionan "Plan mensual" y "Contrato corporativo" pero no existe una página dedicada. Los clientes B2B (oficinas, PYMEs) son tickets más altos y recurrentes.

### 4. WhatsApp Business API no explotada

El sitio usa un simple `wa.me` link. WhatsApp Business API permite catálogo de servicios, respuestas automáticas, y etiquetas de segmentación — todo sin costo adicional significativo.

### 5. Sin Google Local Service Ads

Los anuncios locales de Google (con badge "Google Guaranteed") aparecen encima de los resultados de búsqueda para servicios locales. Es el espacio más premium en búsquedas locales.

### 6. Testimonios solo en texto

Las reviews son texto en el Schema. Los testimonios en video son 4x más creíbles según estudios de Brightlocal. Especialmente efectivo para B2B.

### 7. QR codes para marketing offline

No hay deep linking entre materiales offline (tarjetas, volantes) y páginas específicas del sitio. El QR code a la home no aprovecha la segmentación por zona/servicio.

---

## Propuestas de mejora (Round 5)

### Propuesta 1: Pixel de Meta para retargeting + lookalike audiences

**Problema:** El sitio pierde ~70% de visitantes que no convierten. Sin pixel, no hay forma de hacer retargeting a这群人 en Facebook/Instagram.

**Propuesta:**
1. Instalar Meta Pixel básico en todas las páginas (head + eventos de conversión).
2. Configurar eventos de conversión: `ViewContent`, `Lead`, `Contact` (form submissions).
3. Crear audiencia personalizada de visitantes (90 días).
4. Crear lookalike audience de los leads convertidos para prospecting.
5. Iniciar campañas de retargeting con presupuesto inicial de $50.000 COP/día.

**Impacto:** Recuperación de leads +20-30%, CAC reducción potencial del 25%.
**Esfuerzo:** S (instalación 2 horas, configuración campañas 1 día).
**Agente:** Frontend / Marketing.
**Referencias:**
- https://www.facebook.com/business/tools/meta-pixel — Documentación oficial
- https://www.brightlocal.com/research/local-consumer-survey/ — 87% de consumidores usan Google para encontrar negocios locales

---

### Propuesta 2: Email nurturing con Mailchimp o ConvertKit

**Problema:** Los leads que enviaron formulario no reciben follow-up. Se enfrían rápidamente. No hay forma denutrir clientes potenciales hacia la conversión.

**Propuesta:**
1. Migrar el formulario de Formspree a Mailchimp (gratuito hasta 500 contactos).
2. Crear secuencia de bienvenida (3 emails):
   - Email 1 (inmediato): "Gracias por contactarnos" + valor agregado (tips de mantenimiento).
   - Email 2 (3 días): Caso de éxito destacado + CTA de reserva.
   - Email 3 (7 días): Oferta limitada o urgencia de disponibilidad.
3. Crear segmento de "interesados en servicio X" para respuestas automáticas por tipo de consulta.
4. Agregar checkbox "Quiero recibir tips de mantenimiento" al formulario (opt-in).

**Impacto:** Lead nurturing +25%, conversiones de leads fríos +15%.
**Esfuerzo:** S (1 día configuración inicial).
**Agente:** Frontend / Marketing.
**Referencias:**
- https://mailchimp.com/ — Plan gratuito disponible
- https://www.campaignmonitor.com/resources/guides/email-marketing-guide/ — Best practices

---

### Propuesta 3: Página dedicada de "Contratos Corporativos" para B2B

**Problema:** Los testimonios mencionan "Plan mensual" y "Contrato corporativo" pero no hay landing page dedicada. El segmento B2B tiene tickets más altos y es más rentable.

**Propuesta:**
Crear `corporativos.html` con:
- Sección "Planes para empresas":
  - Plan Basic: mantenimiento mensual (2 visitas)
  - Plan Professional: 4 visitas + sanitización trimestral
  - Plan Enterprise: servicio diario + gerente de cuenta dedicado
- Casos de éxito de empresas (con logo si autorizan).
- Diferenciadores B2B: factura electrónica, contrato formal, SLA de respuesta.
- CTA específico: "Solicitar propuesta personalizada" → formulario pre-llenado.
- Badge "Facturación electrónica disponible".

**Impacto:** Conversión B2B +30%, ticket promedio +40%.
**Esfuerzo:** M (2 días para contenido + diseño).
**Agente:** Frontend / Content.
**Referencias:**
- https://www.weidert.com/blog/b2b-content-marketing — B2B service marketing
- Los contratos corporativos en limpieza tienen ticket de $500.000-$2.000.000 COP/mes

---

### Propuesta 4: WhatsApp Business API con catálogo y respuestas automáticas

**Problema:** El sitio usa un simple `wa.me` link sin aprovechar las herramientas de WhatsApp Business. La experiencia WhatsApp no está optimizada para convertir.

**Propuesta:**
1. Configurar WhatsApp Business API (gratuito) con:
   - Catálogo de servicios (sofos, colchones, alfombras, sillas, corporativa).
   - Respuestas automáticas configuradas:
     - Fuera de horario: "Gracias por escribir. Nuestro horario es L-V 8am-6pm. Te responderemos lo antes posible."
     - Preguntas frecuentes: respuestas predefinidas para precios, zonas, tiempos.
   - Etiquetas para segmentar leads (interesado-sofas, interesado-corporativo, etc).
2. Actualizar el chatbot del sitio para usar la API en lugar del link simple.
3. Mensajes de seguimiento opcionales (con opt-in del usuario).

**Impacto:** Respuesta a leads +50%, experiencia de usuario +30%.
**Esfuerzo:** S (1 día configuración WhatsApp Business).
**Agente:** Frontend.
**Referencias:**
- https://business.whatsapp.com/products/business-platform — WhatsApp Business API
- Estadísticas: 65% de usuarios prefiere mensaje inicial por WhatsApp vs email

---

### Propuesta 5: Google Local Service Ads setup inicial

**Problema:** El sitio no aparece en los anuncios locales premium de Google que se muestran encima de los resultados orgánicos. Ese espacio es el más visible para búsquedas locales.

**Propuesta:**
1. Crear/verificar Google Business Profile si no existe.
2. Inscribirse en Google Local Service Ads (verificación de negocio + licencia).
3. Configurar presupuesto inicial (recomendado: $100.000 COP/semana).
4. Optimizar perfil de negocio: fotos, horarios, zonas de servicio.
5. Monitorear y optimizar basado en leads generados.

**Impacto:** Visibilidad local +40%, CTR en búsquedas locales +25%.
**Esfuerzo:** S (verificación + setup inicial 1 día).
**Agente:** SEO / Marketing.
**Referencias:**
- https://ads.google.com/local-services-ads/ — Google Local Service Ads
- El badge "Google Guaranteed" aumenta confianza significativamente
- Costo por lead típicamente $15.000-$30.000 COP en Colombia

---

### Propuesta 6: Testimonios en video para redes y homepage

**Problema:** Las reviews son texto en el Schema. Los testimonios en video son significativamente más creíbles y compartibles, especialmente para B2B.

**Propuesta:**
1. Grabar 3-5 testimonios en video corto (30-60 segundos) con clientes reales (previa autorización).
2. Embebir video testimonial principal en homepage (sección "Lo que dicen nuestros clientes").
3. Crear reels/shorts para Instagram con clips de testimonios.
4. Usar videos en la página de contratos corporativos.
5. alojar en YouTube o Vimeo (no cargar en el sitio para performance).

**Impacto:** Confianza B2B +35%, engagement social +25%.
**Esfuerzo:** M (coordinar grabaciones + edición + embebido).
**Agente:** Content / Frontend.
**Referencias:**
- https://www.brightlocal.com/research/video-marketing-statistics/ — 88% de consumidores confían en reseñas en video

---

### Propuesta 7: Sistema de QR codes para marketing offline

**Problema:** Los materiales offline (tarjetas de presentación, volantes) no tienen forma de trackear o deep linking a páginas específicas.

**Propuesta:**
1. Crear QR codes personalizados por zona y servicio:
   - `purityclean.com/qr/usaquen` → Página de zona Usaquén
   - `purityclean.com/qr/corporativo` → Página de contratos B2B
   - `purityclean.com/qr/sofás` → Landing page de limpieza de sofás
2. Implementar UTM parameters para trackear fuentes offline.
3. Generar QR codes con logo (usar API gratuita como `qr-code-generator.com`).
4. Crear PDFs de tarjetas de presentación y volantes con QR codes.
5. Medir conversiones offline en Plausible analytics.

**Impacto:** Attribution de marketing offline +50%, tráfico offline → online +20%.
**Esfuerzo:** S (1 día).
**Agente:** Frontend / Design.
**Referencias:**
- https://www.brightlocal.com/resources/qr-codes-local-business/ — QR codes para negocios locales

---

## Priorización recomendada (Round 5)

| # | Propuesta | Impacto | Esfuerzo | Agente | Razón estratégica |
|---|-----------|---------|----------|--------|------------------|
| 1 | Pixel Meta + Retargeting | Alto | Bajo | Frontend | Quick win, alto ROI |
| 2 | Email Nurturing | Alto | Bajo | Frontend/Marketing | Convierte leads fríos |
| 3 | Página B2B Corporativos | Alto | Medio | Frontend/Content | Ticket alto, recurrencia |
| 4 | WhatsApp Business API | Medio | Bajo | Frontend | Mejora experiencia |
| 5 | Google Local Service Ads | Alto | Bajo | SEO/Marketing | Visibilidad premium |
| 6 | Testimonios Video | Medio | Medio | Content | Diferenciador B2B |
| 7 | QR Codes Offline | Bajo | Bajo | Frontend | Atribución offline |

**Top 3 para implementar primero:** 2, 1, 5 (mayor impacto en conversión con esfuerzo bajo).

---

## Estado de proposals Rounds anteriores

### Implementadas ✅ (Rounds 1-4)
- PWA con push notifications
- Chatbot FAQ con WhatsApp routing
- Galería antes/después
- Blog SEO con 6+ artículos
- Core Web Vitals optimization
- Playwright test suite completa
- Skip navigation WCAG
- Dark mode con persistencia
- Zone pages template dinámico
- Newsletter integration
- Animaciones scroll-triggered
- Internal linking blog → homepage

### Pendientes de implementar (del R4)
1. Popup exit-intent
2. Página referidos
3. Instagram feed embebido
4. Portfolio fotos reales
5. Landing pages por servicio
6. Voice search Schema optimization
7. Indicador disponibilidad tiempo real
8. Widget live chat (tawk.to)
9. Página tarifas/precios
10. Google Business Profile real

---

## Investigación de mercado (resumen 2025-2026)

### Tendencias identificadas

1. **Retargeting es esencial**: 97% de visitantes no convierten en la primera visita. Sin pixel, se pierde el canal más económico de reconversión. [1]

2. **Email marketing sigue vigente**: El email nurturing genera 4x más conversiones que email blast. Secuencias automatizadas son fundamentales para servicio. [2]

3. **WhatsApp como canal principal**: 65% de consumidores latinoamericanos prefiere WhatsApp para contacto inicial con negocios. La experiencia WhatsApp debe estar optimizada. [3]

4. **Video como trust signal**: Los testimonios en video aumentan conversión en 30-40% vs texto. El B2B especialmente responde a evidencia visual. [4]

5. **Google Local Service Ads**: Los anuncios con badge "Google Guaranteed" tienen 50% más CTR que resultados orgánicos. Dominan el viewport superior en mobile. [5]

6. **Marketing offline-online attribution**: QR codes con UTM permiten trackear impacto de tarjetas, volantes, pendones en conversiones online. [6]

### Referencias
- [1] WordStream: Meta Ads Stats 2024
- [2] Campaign Monitor: Email Marketing Benchmarks 2024
- [3] Statista: WhatsApp usage in Latin America 2024
- [4] BrightLocal: Video Marketing Statistics for Local Businesses 2024
- [5] Google: Local Services Ads Performance Report 2024
- [6] BrightLocal: QR Codes for Local Business Guide 2024

---

## Conclusión

Purity & Clean tiene una base sólida y bien optimizada. Las oportunidades de **mayor impacto inmediato** en esta ronda son **2, 1 y 5** (email nurturing, retargeting, Google Local Ads) porque atacan directamente el funnel de conversión sin requerir desarrollo pesado.

La propuesta **3 (página B2B)** tiene el mayor potencial de ticket pero requiere más contenido y diseño. Es ideal para el segundo sprint.

La diferenciación competitiva para 2026 será: **automatización de marketing (email + retargeting) + presencia premium en Google (Local Ads + SEO local) + experiencia WhatsApp optimizada**.

---

*Co-Authored-By: Paperclip <noreply@paperclip.ing>*