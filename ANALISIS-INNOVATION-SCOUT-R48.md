# Análisis Creativo — Purity & Clean (Round 48)

**Proyecto:** Purity & Clean
**Fecha:** 2026-04-27
**Analista:** Innovation Scout
**Ronda:** 48
**Issue padre:** DOMAA-514

---

## Resumen Ejecutivo

R48 se enfoca en **elementos visuales de conversión que la competencia ya utiliza pero Purity & Clean no ha implementado**: sliders comparativos before/after, badges de garantía prominentes, visualización del proceso de servicio en 6 pasos, y sección de métodos de pago. Estas features son de bajo esfuerzo pero alto impacto en conversión directa. La competencia (Clean Company, Kolwash) las usa como pilares de su landing page.

---

## Stack tecnológico actual (verificado en código)

- **Frontend:** HTML5 + CSS3 + JS vanilla ES6+
- **CSS:** 6212 líneas style.css
- **JS:** 1847 líneas script.js + config.js + zonas-data.js + zonas-render.js + reviews-data.js
- **Fuentes:** Manrope + Raleway — Google Fonts
- **Iconos:** Font Awesome 6.5 CDN (SRI verificado)
- **Analítica:** Plausible Analytics (sin cookies, GDPR-compliant)
- **Forms:** Formspree (booking, newsletter, zonas)
- **Testing:** Playwright E2E (10 suites)
- **PWA:** Service Worker, precache, offline page, push notifications (VAPID)
- **SEO:** Schema LocalBusiness + FAQPage + Article + Review + VideoObject + HowTo + BreadcrumbList
- **Chatbot:** FAQ routing → WhatsApp
- **Booking:** Multi-step form con slot picker
- **Theme:** Dark mode toggle con persistencia
- **Cobertura:** 10 zonas en Bogotá
- **Precios:** Cotizador interactivo + WhatsApp pre-filled
- **Reviews:** 127 reviews verificadas, 4.8/5
- **Blog:** 6 artículos educativos
- **Animaciones:** Counters, reveal on scroll, chatbot FAB bounce, comparison sliders
- **Service Worker:** Precaching (17 assets), cache-first strategy, offline fallback
- **Cookie Banner:** GDPR-compliant con consentimiento
- **PWA Install Banner:** Custom con accept/decline
- **Push Notifications:** VAPID-based, solicitando permiso
- **GitHub Actions:** Solo deploy a Pages (static.yml), sin Lighthouse CI

---

## Investigación: Competencia en Bogotá — Elementos Visuales de Conversión

### Clean Company (cleancompany.com.co)

Clean Company tiene elementos visuales que Purity & Clean NO tiene implementados:

| Feature | Descripción | Estado en P&C |
|---------|-------------|---------------|
| **Before/After Slider** | Slider interactivo para ver resultados de limpieza (arrastrar para comparar) | NO tiene |
| **6-Step Process** | Sección "Nuestro Proceso" con 6 pasos visuales por servicio | NO tiene |
| **Guarantee Badge** | "100% Garantizado" prominente en hero y servicios | Parcial (FAQ) |
| **Descuento Primera Vez** | Banner "20% Descuento primera vez" fijo en hero | NO tiene |
| **Payment Icons** | Iconos de métodos de pago (Nequi, Daviplata, PSE, etc.) | NO tiene |

### Kolwash (lavadodecolchones.com.co)

Kolwash tiene secciones que Purity & Clean NO tiene:

| Feature | Descripción | Estado en P&C |
|---------|-------------|---------------|
| **WooCommerce Store** | Tienda con protectores y productos | NO tiene (propuesta R47) |
| **Payment Methods** | Sección "Medios de Pago" con iconos | NO tiene |
| **WhatsApp Chat Button** | Botón flotante de WhatsApp con welcome message | YA tiene |
| **Process FAQ** | Preguntas específicas por servicio | YA tiene |
| **Trust Badges** | Certificaciones y políticas visibles | Parcial |

---

## Gaps identificados — Round 48 (Elementos Visuales de Conversión)

### 1. Sin slider comparativo before/after

**Problema:** Clean Company tiene un slider interactivo "Resultados reales, sin filtros" donde el usuario arrastra una barra para comparar antes/después. Esto genera un impacto visual inmediato y demuestra la calidad del servicio. Purity & Clean tiene fotos en el blog pero NO tiene esta feature en la landing page.

### 2. Sin visualización del proceso de servicio

**Problema:** Clean Company muestra "Nuestro Proceso" con 6 pasos numerados para cada servicio (inspección, aspirado, pre-tratamiento, limpieza profunda, desinfección, secado). Esto educa al cliente sobre el valor del servicio y justifica el precio. Purity & Clean NO tiene esta sección.

### 3. Sin badge de garantía prominente

**Problema:** Clean Company muestra "100% Garantizado" como trust signal prominente. Purity & Clean menciona garantía en el FAQ pero NO tiene un badge visual en el hero o cerca del CTA.

### 4. Sin banner de descuento por primera vez

**Problema:** Clean Company tiene un banner fijo "20% Descuento primera vez" que aparece en el hero. Esto incentiva la conversión inmediata. Purity & Clean NO tiene ningún offer de descuento visible.

### 5. Sin sección de métodos de pago

**Problema:** Kolwash muestra explícitamente los métodos de pago (efectivo, Nequi, Daviplata, transferencia, PSE, tarjetas). Purity & Clean ofrece pagos vía Formspree pero NO muestra los métodos disponibles. Esto puede generar desconfianza o fricción.

---

## Propuestas (Round 48)

### Propuesta 1: Slider comparativo before/after interactivo

| Campo | Detalle |
|-------|---------|
| **Título** | Implementar slider comparativo before/after con imágenes reales de trabajos |
| **Problema** | Clean Company tiene slider interactivo que muestra resultados. Esto genera impacto visual y confianza inmediata. Purity & Clean no tiene nada similar en la landing page principal. |
| **Descripción** | 1. **Crear sección `#resultados`** después de la sección de servicios. 2. **Usar CSS puro** para el slider: container con `overflow: hidden`, dos imágenes superpuestas, y un slider range input que controla el `clip-path` de la imagen superior. 3. **Imágenes necesarias**: (a) Sofá sucio/limpio, (b) Colchón sucio/limpio, (c) Alfombra sucia/limpia. 4. **Fallback mobile**: si el slider no funciona, mostrar las dos imágenes lado a lado. 5. **CTA debajo**: "Ver más resultados en nuestro Instagram" link. Implementación: 2-3 horas con CSS vanilla. |
| **Impacto esperado** | Aumento de conversión por impacto visual inmediato, diferenciación de competencia, generación de confianza |
| **Esfuerzo** | S (2-3 horas) |
| **Agente recomendado** | Frontend |
| **Referencias** | [1] https://cleancompany.com.co (slider before/after) [2] https://css-tricks.com/slidernav/ |

### Propuesta 2: Sección "Nuestro Proceso" con 6 pasos visuales

| Campo | Detalle |
|-------|---------|
| **Título** | Agregar sección "Nuestro Proceso" con 6 pasos ilustrados para cada servicio |
| **Problema** | Clean Company muestra el proceso completo (inspección → aspirado → pre-tratamiento → limpieza → desinfección → secado). Esto educa al cliente, justifica el precio, y diferencia el servicio profesional del "limpio yo mismo". |
| **Descripción** | 1. **Crear sección `.section-proceso`** con grid de 6 pasos. 2. **Cada paso**: icono SVG + número + título + descripción breve. 3. **Pasos sugeridos**: (1) Inspección inicial y evaluación, (2) Aspirado profundo, (3) Pre-tratamiento de manchas, (4) Limpieza con extracción, (5) Desinfección y sanitización, (6) Secado rápido. 4. **Para cada servicio principal** (sofás, colchones, alfombras) se pueden ajustar los títulos de los pasos. 5. **Diseño**: timeline horizontal en desktop, vertical en mobile. Implementación: 2 horas para la sección base. |
| **Impacto esperado** | Educación del cliente, justificación de precio, percepción de servicio profesional y completo |
| **Esfuerzo** | S (2 horas) |
| **Agente recomendado** | Frontend |
| **Referencias** | [1] https://cleancompany.com.co (Nuestros Servicios → proceso) |

### Propuesta 3: Badge de garantía "100% Satisfecho o Repetimos"

| Campo | Detalle |
|-------|---------|
| **Título** | Implementar badge de garantía prominente cerca del CTA principal |
| **Problema** | Clean Company muestra "100% Garantizado" como trust signal. Purity & Clean menciona la garantía en el FAQ pero no tiene un badge visual que genere confianza inmediata al lado del botón de reservas. |
| **Descripción** | 1. **Crear badge `.guarantee-badge`** con icono de escudo + texto "100% Satisfecho o Repetimos". 2. **Posicionarlo** debajo del hero CTA "Pedir Cita" y también en la sección de reservas. 3. **Diseño**: icono SVG de escudo, color accent verde, borde redondeado, fondo semi-transparente. 4. **Tooltip opcional**: al hover, mostrar "Garantía de satisfacción: si no estás feliz con el resultado, volvemos sin costo adicional." Implementación: 1 hora. |
| **Impacto esperado** | Aumento de conversión por reducción de fricción (el usuario se siente seguro al comprar) |
| **Esfuerzo** | S (1 hora) |
| **Agente recomendado** | Frontend |
| **Referencias** | [1] https://cleancompany.com.co (badge de garantía) |

### Propuesta 4: Banner de descuento "20% Primera Vez"

| Campo | Detalle |
|-------|---------|
| **Título** | Implementar banner promocional de 20% de descuento para nuevos clientes |
| **Problema** | Clean Company tiene un banner "20% Descuento primera vez" fijo en el hero. Esta urgencia incentiva la conversión inmediata. Purity & Clean no tiene ninguna oferta promocional visible. |
| **Descripción** | 1. **Crear banner `.promo-banner`** en la parte superior del hero. 2. **Texto**: "🎉 20% OFF en tu primera limpieza — Código: PRIMERA20". 3. **Diseño**: fondo accent (verde o amarillo), texto blanco, botón "Aplicar" o "Reservar ahora". 4. **Persistencia**: guardar el código en `localStorage` para que no aparezca si el usuario ya cerró el banner. 5. **Validación**: el código debe poder usarse en el formulario de reservas (agregar campo de código de descuento). Implementación: 2 horas. |
| **Impacto esperado** | Aumento de conversiones de nuevos clientes, tracking de efectividad por código |
| **Esfuerzo** | S (2 horas) |
| **Agente recomendado** | Frontend |
| **Referencias** | [1] https://cleancompany.com.co (banner de descuento) |

### Propuesta 5: Sección de métodos de pago con iconos

| Campo | Detalle |
|-------|---------|
| **Título** | Agregar sección de métodos de pago cerca del formulario de reservas |
| **Problema** | Kolwash muestra explícitamente los métodos de pago (efectivo, Nequi, Daviplata, PSE, tarjetas). Purity & Clean acepta pagos vía Formspree pero no informa al usuario qué opciones tiene. Esto puede generar desconfianza o abandono. |
| **Descripción** | 1. **Crear sección `.payment-methods`** después del formulario de reservas o cerca del footer. 2. **Iconos de métodos**: efectivo, Nequi, Daviplata, Bancolombia (transferencia), PSE, Visa, Mastercard. 3. **Texto**: "Aceptamos los siguientes métodos de pago". 4. **Diseño**: grid de iconos con labels, estilo simple y limpio. 5. **Para pagos corporativos**: agregar "Pagofactura para empresas" con link a contacto. Implementación: 1 hora. |
| **Impacto esperado** | Reducción de abandonos por incertidumbre, aumento de confianza, diferenciación de competencia |
| **Esfuerzo** | S (1 hora) |
| **Agente recomendado** | Frontend |
| **Referencias** | [1] https://lavadodecolchones.com.co (sección "Medios de Pago") |

### Propuesta 6: Bundle de servicios "Plan Hogar Completo"

| Campo | Detalle |
|-------|---------|
| **Título** | Crear paquete promocional "Plan Hogar Completo" con descuento por bundle |
| **Problema** | Actualmente cada servicio se cotiza por separado. La competencia (Clean Company) no tiene bundles visibles pero Purity & Clean puede diferenciarse ofreciendo descuentos por contratar múltiples servicios. Esto aumenta el ticket promedio. |
| **Descripción** | 1. **Crear sección `. bundles`** con 3 opciones: (a) "Plan Sofá + Colchón": precio combinado con 15% OFF vs separate, (b) "Plan Hogar Completo": sofá + colchón + alfombra con 20% OFF, (c) "Plan Corporativo": descuento por contrato trimestral/semestral. 2. **Cada bundle card**: icono + nombre + precio original tachado + precio bundle + lista de servicios incluidos + CTA. 3. **Badge de ahorro**: "Ahorras $X" visible en cada card. 4. **Integración con cotizador**: el bundle "Plan Hogar Completo" pre-selecciona los servicios en el cotizador. Implementación: 3 horas. |
| **Impacto esperado** | Aumento del ticket promedio, diferenciación de competencia, incentivo a contratar más servicios |
| **Esfuerzo** | M (3 horas) |
| **Agente recomendado** | Frontend / Content |
| **Referencias** | [1] Bundling como estrategia de pricing en servicios de limpieza |

---

## Orden de implementación recomendado

| # | Propuesta | Impacto | Esfuerzo | Semana |
|---|----------|---------|----------|--------|
| 1 | Slider before/after | Alto (visual) | S | 1 |
| 2 | Badge de garantía | Medio (confianza) | S | 1 |
| 3 | Banner descuento | Alto (conversión) | S | 1 |
| 4 | Métodos de pago | Medio (confianza) | S | 1 |
| 5 | Proceso 6 pasos | Medio (educación) | S | 2 |
| 6 | Bundles de servicios | Alto (revenue) | M | 2 |

**Nota:** Las propuestas 1-4 son de esfuerzo bajo (1-3 horas) y alto impacto visual. Se pueden implementar en la primera semana. La propuesta 6 (bundles) requiere más diseño pero tiene el mayor impacto en revenue.

---

## Diferencia clave: R47 vs R48

R47 se enfocó en **features de conversión advanced** (cotizador IA, chatbot con agendamiento, widget de reseñas, expansión geográfica).

R48 se enfoca en **elementos visuales de conversión básicos pero efectivos** que la competencia ya utiliza:
- Slider before/after (Clean Company tiene)
- Proceso en 6 pasos (Clean Company tiene)
- Badge de garantía (Clean Company tiene)
- Banner de descuento (Clean Company tiene)
- Métodos de pago (Kolwash tiene)
- Bundles (no visto en competencia local)

R47 construyó features **novedosas**. R48 construye features **necesarias** para no parecer menos profesional que la competencia.

---

## Síntesis: Por qué R48 importa

Purity & Clean tiene un PWA superior, service worker con offline support, y chatbot único. PERO carece de elementos visuales de conversión que Clean Company y Kolwash ya tienen implementados en sus landing pages:

1. **Slider before/after**: impacto visual inmediato que genera confianza
2. **Proceso en 6 pasos**: educación del cliente y justificación de precio
3. **Badge de garantía**: reducción de fricción al CTA
4. **Banner de descuento**: urgencia para nuevos clientes
5. **Métodos de pago**: transparencia que genera confianza
6. **Bundles**: aumento del ticket promedio

Estas 6 propuestas son:
- Todas de esfuerzo bajo a medio (máximo 3 horas)
- Todas implementables esta semana
- Todas tienen precedente en la competencia
- Ninguna requiere backend o cambios en la infraestructura

---

## Fuentes

[1] Clean Company. "Limpieza profesional que transforma." https://cleancompany.com.co

[2] Kolwash. "Lavado de colchones en Bogotá." https://lavadodecolchones.com.co

[3] CSS-Tricks. "Building a comparison slider." https://css-tricks.com/slidernav/

---

*Documento generado por Innovation Scout — Round 48*
*Purity & Clean Analysis — 2026-04-27*
*Co-Authored-By: Paperclip <noreply@paperclip.ing>*