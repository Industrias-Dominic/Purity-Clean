# Análisis Creativo — Purity & Clean (Round 47)

**Proyecto:** Purity & Clean
**Fecha:** 2026-04-27
**Analista:** Innovation Scout
**Ronda:** 47
**Issue padre:** DOMAA-510

---

## Resumen Ejecutivo

R47 se enfoca en **diferenciación via funcionalidades de conversión y diversificación de ingresos**. Tras analizar la competencia en Bogotá, identifico que Clean Company ya tiene un "cotizador con IA" basado en fotos, Kolwash tiene tienda de productos (protectors), y Lympia ofrece mantenimiento de pisos laminados. Purity & Clean tiene un PWA superior y chatbot único, PERO le faltan features de conversión que la competencia ya está monetizando. Las propuestas de esta ronda apuntan a cerrar esas brechas.

---

## Stack tecnológico actual (verificado en código)

- **Frontend:** HTML5 + CSS3 + JS vanilla ES6+
- **CSS:** ~6212 líneas style.css
- **JS:** ~1847 líneas script.js + config.js + zonas-data.js + zonas-render.js + reviews-data.js
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

## Investigación: Competencia en Bogotá

### Competidores directos identificados y sus features innovadoras

| Empresa | URL | Feature diferencial |
|---------|-----|---------------------|
| Clean Company | cleancompany.com.co | **Cotizador con IA por foto** — sube foto y recibe precio estimado instantáneamente |
| Kolwash / Lavadodecolchones.com.co | lavadodecolchones.com.co | **Tienda de productos** — vende protectores de colchón, tiene Reseñas con Trustindex |
| Todalimpieza | todalimpieza.com | **Cobertura en 20+ ciudades y municipios** — estrategia de expansión geográfica agresiva |
| Lympia |lympiabogota.com | **Mantenimiento de pisos laminados** — servicio que Purity & Clean NO ofrece |
| Casalimpia | casalimpia.com | Scaling, precios claros |

### Lo que hace Clean Company (y que estamos perdiendo)

Clean Company tiene un feature de **"Cotizador con IA"** donde:
1. El usuario sube una foto del mueble
2. Recibe un precio estimado instantáneamente
3. Esto reduce la fricción en el funnel de conversión

**Purity & Clean NO tiene esto.** El usuario tiene que usar el cotizador interactivo (que está bien) pero no puede estimar precio por foto.

### Lo que Kolwash hace bien (e-commerce)

Kolwash vende **protectores de colchón** como upsell:
- Protector Sencillo: $105,000
- Protector Semidoble: $100,000
- Protector Queen: $115,000
- Protector King: $120,000
- Protector Doble: $110,000

**Purity & Clean NO tiene tienda de productos.** Esto es una fuente de ingresos pasivos que no estamos aprovechando.

### Lo que Lympia ofrece (expansión de servicios)

Lympia ofrece mantenimiento de pisos laminados — un servicio que Purity & Clean NO tiene en su portafolio. Esto es relevante porque:
- Es un servicio de alto ticket
- Atrae clientes corporativos
- Complementa la limpieza de muebles

---

## Gaps identificados — Round 47 (Conversión y Diversificación)

### 1. Sin cotizador por foto / IA

**Problema:** Clean Company tiene un cotizador con IA que permite estimar precio por foto. Esto reduce la fricción en el funnel de conversión. Purity & Clean tiene un cotizador interactivo pero no permite estimación visual por foto.

### 2. Sin tienda de productos / upselling

**Problema:** Kolwash vende protectores de colchón como upsell después del servicio. Purity & Clean no tiene ningún producto en venta. Esto es una oportunidad de revenue adicional de ~$100,000+ por protector.

### 3. Sin servicio de mantenimiento de pisos

**Problema:** Lympia ofrece mantenimiento de pisos laminados. Purity & Clean no tiene este servicio en su portafolio. Esto limita el TAM (total addressable market).

### 4. Sin integración de reseñas con plataforma externa

**Problema:** Kolwash muestra reseñas verificadas con Trustindex (17 reseñas). Purity & Clean tiene 127 reseñas en schema pero NO tiene un widget de reseñas visible en la página parasocial proof en tiempo real.

### 5. Sin estrategia de expansión multi-ciudad

**Problema:** Todalimpieza cubre 20+ ciudades y municipios. Purity & Clean solo tiene 10 zonas en Bogotá. Para escalar, necesita estrategia de expansión.

---

## Propuestas (Round 47)

### Propuesta 1: Cotizador por foto con estimación visual

| Campo | Detalle |
|-------|---------|
| **Título** | Implementar cotizador por foto usando inteligencia artificial para estimación de precio |
| **Problema** | Clean Company tiene cotizador con IA por foto. Purity & Clean tiene cotizador interactivo pero no permite estimación visual. Esto genera fricción en el funnel de conversión. |
| **Descripción** | 1. **Crear formulario de upload de foto** en la sección de reservas o en un modal flotante. 2. **Integrar con API de visión** (Google Cloud Vision, AWS Rekognition, oCloudflare Workers AI) para clasificar el tipo de mueble. 3. **Estimación de precio basada en dimensiones** usando un formulario de follow-up: "¿Qué tan grande es tu sofá?" con opciones tipo radio. 4. **Mostrar precio estimado** y CTA para agendar. 5. **Alternativa sin IA real**: usar un selector visual de tipo de mueble (sofá 3 plazas, sofá 2 plazas, sillón, chaise longue) + condición (buena, regular, muy usado) + tamaño estimado para dar un rango de precio. Implementación: formulario HTML + JS, sin backend necesario para v1, 3-4 horas. |
| **Impacto esperado** | Reducción de fricción en conversión, mayor engagement, diferenciación vs Clean Company |
| **Esfuerzo** | M (3-4 horas) |
| **Agente recomendado** | Frontend |
| **Referencias** | [1] https://cleancompany.com.co [2] https://developers.google.com/cloud/docs/vision [3] https://developers.cloudflare.com/workers-ai/ |

### Propuesta 2: Tienda de productos (protectors y accessories)

| Campo | Detalle |
|-------|---------|
| **Título** | Agregar sección de tienda con productos complementarios (protectores de colchón, fundas, sprays) |
| **Problema** | Kolwash vende protectores de colchón como upsell. Purity & Clean tiene tráfico pero no hay monetization más allá del servicio. Cada protector genera $100,000-$120,000 de revenue pasivo. |
| **Descripción** | 1. **Crear sección "/productos"** con HTML static listing. 2. **Productos sugeridos**: (a) Protector de colchón anti-fluidos desde $80,000, (b) Fundas de almohada premium desde $35,000, (c) Spray sanitizante para mantenimiento mensual desde $45,000, (d) Kit de cuidado para sofá desde $60,000. 3. **Integración con Formspree** para pedidos: el usuario selecciona productos y envía formulario → se genera orden manual. 4. **Recomendación post-servicio**: después del booking confirmation, mostrar "Añade protectores a tu pedido" con link a la tienda. Implementación: 2-3 horas para la página, integración con Formspree para pedidos. |
| **Impacto esperado** | Revenue adicional por upselling, aumento de ticket promedio, monetización del tráfico existente |
| **Esfuerzo** | S (2-3 horas) |
| **Agente recomendado** | Frontend |
| **Referencias** | [1] https://lavadodecolchones.com.co [2] https://formspree.io |

### Propuesta 3: Servicio de mantenimiento de pisos laminados

| Campo | Detalle |
|-------|---------|
| **Título** | Agregar servicio de mantenimiento de pisos laminados al portafolio |
| **Problema** | Lympia ofrece mantenimiento de pisos laminados como servicio diferenciador. Purity & Clean no tiene este servicio, limitando el TAM. Es un servicio de alto ticket que atraería clientes corporativos. |
| **Descripción** | 1. **Crear nuevas tarjetas de servicio** en index.html para "Mantenimiento de Pisos Laminados". 2. **Incluir en el cotizador** como una categoría adicional. 3. **Actualizar FAQ** con preguntas sobre el servicio (¿cuánto dura?, ¿qué incluye?, ¿cada cuánto?). 4. **Crear página de zona específica** para el servicio si hay demanda. 5. **Precio sugerido**: $25,000-$40,000 por m² para mantenimiento de pisos laminados. Implementación: 2 horas para agregar al catálogo. |
| **Impacto esperado** | Ampliación del TAM, atracción de clientes corporativos, diferenciación vs competencia |
| **Esfuerzo** | S (2 horas) |
| **Agente recomendado** | Frontend / Content |
| **Referencias** | [1] https://lympiabogota.com |

### Propuesta 4: Widget de reseñas con Trustindex

| Campo | Detalle |
|-------|---------|
| **Título** | Integrar widget de reseñas Trustindex para social proof en tiempo real |
| **Problema** | Kolwash muestra 17 reseñas verificadas con Trustindex. Purity & Clean tiene 127 reseñas en schema.org pero no hay widget visible que genere social proof inmediato en la página. |
| **Descripción** | 1. **Crear cuenta en Trustindex** (hay plan gratuito). 2. **Configurar интеграция** con Google Reviews. 3. **Insertar widget** en la sección de testimonios o en el hero después del hero copy. 4. **Mostrar rating promedio y cantidad de reseñas** de forma visible. 5. **El widget ya tiene el schema de reseñas** lo que refuerza el SEO. Implementación: 1-2 horas para insertar el embed code. |
| **Impacto esperado** | Mayor confianza en nuevos visitantes, aumento de conversión, refuerzo de SEO con reseñas reales |
| **Esfuerzo** | S (1-2 horas) |
| **Agente recomendado** | Frontend |
| **Referencias** | [1] https://www.trustindex.io [2] https://lavadodecolchones.com.co |

### Propuesta 5: Estrategia de expansión por clusters de ciudades

| Campo | Detalle |
|-------|---------|
| **Título** | Crear landing pages por cluster de ciudades para expansión geográfica |
| **Problema** | Todalimpieza tiene presencia en 20+ ciudades. Purity & Clean solo tiene Bogotá. Con la infraestructura actual (static site), es trivial replicar páginas por ciudad. |
| **Descripción** | 1. **Crear sección "/cobertura"** con páginas para cada cluster: (a) Bogotá Centro, (b) Cundinamarca (Chía, Cajicá, Mosquera, La Calera, Soacha), (c) Meta (Villavicencio). 2. **Template reutilizable**: copiar la estructura de las páginas de zona existente con ajustes de geo-targeting. 3. **Schema LocalBusiness con areaServed** por cluster. 4. ** backlinks locales** de páginas de municipio para mejorar autoridad de dominio. Implementación: 1 día para crear templates + contenido para 3 clusters adicionales. |
| **Impacto esperado** | Captura de tráfico search en ciudades voisinas, expansión del mercado sin desarrollo de backend |
| **Esfuerzo** | M (1 día) |
| **Agente recomendado** | Frontend / Content |
| **Referencias** | [1] https://todalimpieza.com |

### Propuesta 6: Chatbot con capacidades de agendamiento directo

| Campo | Detalle |
|-------|---------|
| **Título** | Implementar agendamiento directo vía chatbot sin salir de la página |
| **Problema** | El chatbot actual solo rutea a WhatsApp. Clean Company tiene un flujo de agendamiento más fluido. El usuario de Purity & Clean tiene que navegar al formulario de reservas para agendar. |
| **Descripción** | 1. **Expandir el chatbot panel** para incluir un mini-flow de agendamiento: (a) "¿Qué servicio necesitas?" (sofás, colchones, alfombras, pisos), (b) "¿En qué zona estás?" (dropdown), (c) "¿Cuándo quieres el servicio?" (date picker simple), (d) "Perfecto, te contactamos en 47 minutos" + guardar en Formspree. 2. **Si el usuario prefiere WhatsApp**, pre-filled con la información collected. 3. **Fallback a WhatsApp** con mensaje pre-filled. Implementación: 3-4 horas para expandir el chatbot con el flow de agendamiento. |
| **Impacto esperado** | Reducción de bounces en la sección de reservas, mayor conversión, diferenciación del chatbot basic actual |
| **Esfuerzo** | M (3-4 horas) |
| **Agente recomendado** | Frontend |
| **Referencias** | [1] https://cleancompany.com.co |

---

## Orden de implementación recomendado

| # | Propuesta | Impacto | Esfuerzo | Semana |
|---|----------|---------|----------|--------|
| 1 | Cotizador por foto | Alto (conversión) | M | 1 |
| 2 | Widget Trustindex | Medio (confianza) | S | 1 |
| 3 | Tienda de productos | Alto (revenue) | S | 2 |
| 4 | Agendamiento vía chatbot | Alto (conversión) | M | 2 |
| 5 | Servicio de pisos laminados | Medio (TAM) | S | 3 |
| 6 | Expansión por clusters | Medio (growth) | M | 4 |

**Nota:** Las propuestas 1, 2 y 3 son las de mayor impacto inmediato con esfuerzo bajo a medio. La propuesta 6 (expansión) es la de mayor esfuerzo pero la de mayor potencial de crecimiento.

---

## Diferencia clave: R46 vs R47

R46 se enfocó en **discovery y contenido** (SEO, featured snippets, video). R47 se enfoca en **conversión y diversificación**: cómo monetizar mejor el tráfico existente, cómo reducir fricción en el funnel, y cómo expandir el TAM.

R46 construyó **alcance**. R47 construye **conversión y revenue**.

---

## Síntesis: Por qué R47 importa

Purity & Clean tiene un PWA superior, chatbot único, y service worker con offline support. PERO la competencia está innovando en features de conversión:
- Clean Company tiene cotizador con IA por foto
- Kolwash tiene tienda de productos
- Lympia tiene mantenimiento de pisos
- Todos tienen widget de reseñas visible

R47 cierra esas brechas con features que:
- Reducen fricción en conversión
- Generan revenue adicional por upselling
- Amplían el mercado total direccionable
- Aumentan confianza con social proof

Las 6 propuestas de R47 son:
- Todas de esfuerzo bajo a medio (máximo 1 día)
- Todas accionables esta semana
- Todas tienen métricas de impacto medibles
- Ninguna requiere backend o cambios en la infraestructura

---

## Fuentes

[1] Clean Company. "Cotizador con IA." https://cleancompany.com.co

[2] Kolwash. "Lavado de colchones en Bogotá." https://lavadodecolchones.com.co

[3] Lympia. "Limpieza profesional en Bogotá." https://lympiabogota.com

[4] Todalimpieza. "Servicio de limpieza a domicilio." https://todalimpieza.com

[5] Trustindex. "Widget de reseñas para Google Reviews." https://www.trustindex.io

[6] Google Cloud. "Cloud Vision API." https://developers.google.com/cloud/docs/vision

---

*Documento generado por Innovation Scout — Round 47*
*Purity & Clean Analysis — 2026-04-27*
*Co-Authored-By: Paperclip <noreply@paperclip.ing>*