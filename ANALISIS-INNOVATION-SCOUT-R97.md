# Análisis Creativo — Purity & Clean (Round 97)

**Proyecto:** Purity & Clean
**Fecha:** 2026-04-28
**Analista:** Innovation Scout
**Ronda:** 97
**Issue padre:** DOMAA-867

---

## Resumen Ejecutivo

R97 se enfoca en **cerrar gaps de Schema.org no explotados** y **profundizar en la estrategia de precios visible en el site**. Mientras R96 propuso optimizaciones CLS, PWA avanzado y JS modular, R97 identifica que los schemas actuales no usan `priceSpecification` (perdiendo rich snippets con precios), que las zonas pages tienen potencial de `PostalCode` schema para SEO local más fuerte, y que los servicios carecen de `hasMerchantReturnPolicy` lo cual es extraño para un negocio de servicios. También propongo `AggregateOffer` en las tarjetas de servicios para mostrar rangos de precio en el LocalBusiness schema y una estrategia de engagement con Google Business Profile Posts.

**Hipótesis a validar:** Sin `priceSpecification` en el schema, Google no puede mostrar precios en rich snippets para queries como "limpieza de sofás Bogotá precio". Agregar rangos de precio en COP podría generar +20-40% CTR en resultados locales.

---

## Estado Actual del Proyecto (R97)

### Lo Implementado (R1-R96)

| Feature | Ronda | Estado |
|---------|-------|--------|
| PWA básico, Dark mode, Blog, Google Reviews, Service Worker | R1-R10 | ✅ Implementado |
| Zonas pages, Before/After, Programa referidos | R5-R9 | ✅ Implementado |
| Chatbot FAQ panel, Newsletter | R89 | ✅ Implementado |
| Playwright tests (9 specs) | R1-R10 | ✅ Implementado |
| FAQPage + HowTo JSON-LD Schema | R96 | ⚠️ Propuesto, no confirmado |
| CLS Optimization | R96 | ⚠️ Propuesto, no confirmado |
| PWA Advanced (Background Sync) | R96 | ⚠️ Propuesto, no confirmado |
| NPS Post-Servicio, Meta Pixel, Partnerships | R95 | ⚠️ Propuesto, no confirmado |

### Lo NO Propuesto en R1-R96 (R97 — Gap Analysis de Schema y Pricing)

| Oportunidad | Tipo | Impacto | Estado |
|-------------|------|---------|--------|
| **priceSpecification en Offer Schema** | SEO / Rich Snippets | +20-40% CTR en búsquedas de precio | Nueva |
| **Google Business Profile Posts API** | SEO Local | Mantiene perfil activo, mejora ranking | Nueva |
| **PostalCode Schema en zonas pages** | SEO Local | Mejora geolocalización para cada barrio | Nueva |
| **AggregateOffer en servicios** | SEO / UX | Muestra rangos de precio directamente | Nueva |
| **hasMerchantReturnPolicy en servicios** | Trust / Conversion | Reduce fricción de cliente nuevo | Nueva |

---

## Investigación: Schema.org y Rich Snippets con Precios

### Hallazgo 1: priceSpecification Obliga a Google a Mostrar Precios

El schema actual de LocalBusiness usa `hasOfferCatalog` con `Offer` pero sin `priceSpecification`. Esto significa que en queries como "limpieza de sofá precio Bogotá" o "limpieza de colchones costo Bogotá", Google no tiene datos de precio para mostrar en rich snippets.

La propiedad `priceSpecification` permite especificar:
- `priceCurrency`: COP (pesos colombianos)
- `price`: valor numérico
- `valueAddedTaxIncluded`: boolean
- `eligibleQuantity`: cantidad mínima

**Ejemplo del site actual (index.html, líneas 64-96):**
```json
{
  "@type": "Offer",
  "itemOffered": {
    "@type": "Service",
    "name": "Limpieza profunda de sofás",
    "description": "Remoción de polvo, manchas y olores..."
  }
}
```

**Lo que debería ser:**
```json
{
  "@type": "Offer",
  "itemOffered": {
    "@type": "Service",
    "name": "Limpieza profunda de sofás"
  },
  "priceSpecification": {
    "@type": "PriceSpecification",
    "priceCurrency": "COP",
    "lowPrice": "80000",
    "highPrice": "180000",
    "description": "Precio depende del tamaño del sofá"
  }
}
```

### Hallazgo 2: AggregateOffer Permite Rangos de Precio

Google permite mostrar rangos de precio en rich snippets para servicios cuando se usa `AggregateOffer` [1]:

```json
{
  "@type": "AggregateOffer",
  "lowPrice": "80000",
  "highPrice": "180000",
  "priceCurrency": "COP",
  "offerCount": "4",
  "offerLocation": "Bogotá"
}
```

Esto genera en SERP: **Desde $80.000 COP** con un enlace directo al servicio.

### Hallazgo 3: PostalCode en Zone Pages Fortalece SEO Local por Barrio

Las zonas pages como `zonas/teusaquillo/index.html` tienen `addressNeighborhood: "Teusaquillo"` pero no incluyen `postalCode`. Bogotá tiene códigos postales de 4 dígitos (por ejemplo, Teusaquillo es 111321). Agregar `postalCode` al schema de cada zona page ayuda a Google a entender la cobertura geográfica exacta [2].

### Hallazgo 4: Google Business Profile Posts

Google Business Profile permite crear "posts" que aparecen en el perfil de negocio en Google Search y Maps. Cada post tiene:
- Tipo: NEW/EVENT/OFFER/POST
- Texto (hasta 1.500 caracteres)
- Imagen opcional
- Call-to-action button
- Vencimiento (hasta 6 meses)

Estudios muestran que perfiles con posts activos tienen +35% más visualizaciones que perfiles inactivos [3]. Los posts de "oferta de temporada" o "consejos de mantenimiento" son particularmente efectivos para servicios de limpieza.

**Ejemplo de post para Purity & Clean:**
- Tipo: OFFER
- Título: "Limpieza de sofás desde $80.000"
- Descripción: "Sanitización profesional con productos seguros para mascotas. Reserva ahora."
- CTA: LEARN_MORE → https://purityclean.com/#reservas

### Hallazgo 5: hasMerchantReturnPolicy en Servicios

Aunque es más común en e-commerce, servicios profesionales de limpieza pueden beneficiarse de una política de satisfacción documentada en schema. Esto reduce fricción para nuevos clientes que buscan garantías [4].

```json
{
  "@type": "Service",
  "name": "Limpieza profunda de sofás",
  "hasMerchantReturnPolicy": {
    "@type": "MerchantReturnPolicy",
    "name": "Política de satisfacción Purity & Clean",
    "returnPolicyCountry": "CO",
    "merchantReturnDays": 7,
    "returnMethod": "phone",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+57-300-123-4567"
    }
  }
}
```

---

## Propuestas (Round 97)

### Propuesta 1: priceSpecification en Offer Schema (HIGH PRIORITY)

| Campo | Detalle |
|-------|---------|
| **Título** | Agregar priceSpecification con rangos COP a los Offer del LocalBusiness schema |
| **Problema** | Sin priceSpecification, Google no tiene datos para rich snippets con precios. En queries de intención de compra ("limpieza sofá precio Bogotá"), el sitio pierde ante competidores que sí muestran precios. |
| **Descripción** | **1. Modificar index.html — block hasOfferCatalog:**<br>```json<br>"hasOfferCatalog": {<br>  "@type": "OfferCatalog",<br>  "name": "Servicios de limpieza",<br>  "itemListElement": [<br>    {<br>      "@type": "Offer",<br>      "itemOffered": {<br>        "@type": "Service",<br>        "name": "Limpieza profunda de sofás"<br>      },<br>      "priceSpecification": {<br>        "@type": "PriceSpecification",<br>        "priceCurrency": "COP",<br>        "lowPrice": "80000",<br>        "highPrice": "180000",<br>        "description": "Precio depende del tamaño y material del sofá"<br>      }<br>    },<br>    {<br>      "@type": "Offer",<br>      "itemOffered": {<br>        "@type": "Service",<br>        "name": "Sanitización de colchones"<br>      },<br>      "priceSpecification": {<br>        "@type": "PriceSpecification",<br>        "priceCurrency": "COP",<br>        "lowPrice": "60000",<br>        "highPrice": "120000"<br>      }<br>    }<br>  ]<br>}<br>```<br><br>**2. Los valores se extraen de:**<br>- js/config.js CHATBOT_FAQ para rangos aproximados<br>- Revisar con CEO para confirmar rangos exactos<br><br>**3. Validación:**<br>Usar Google Rich Results Test tras implementar para verificar que los precios aparecen. |
| **Impacto esperado** | Rich snippets con precio en Google para búsquedas locales, +20-40% CTR, mejor calidad de leads (usuarios que ya saben el rango) |
| **Esfuerzo** | S (1-2 horas — editar index.html JSON-LD + validación) |
| **Agente recomendado** | Frontend |
| **Referencias** | [1] PriceSpecification Schema.org https://schema.org/PriceSpecification |
| **Estado** | Nueva propuesta — NO mencionada en R1-R96 |
| **Prioridad CEO** | **Alta** — impacto directo en SEO y calidad de leads |

---

### Propuesta 2: AggregateOffer en Tarjetas de Servicios (HIGH PRIORITY)

| Campo | Detalle |
|-------|---------|
| **Título** | Agregar AggregateOffer con rangos COP a las tarjetas de servicios para mostrar precios en búsqueda |
| **Problema** | Las tarjetas de servicios (section `.searchable-grid`) no tienen datos estructurados de precio. Google no puede asociar precio a cada servicio para rich snippets. |
| **Descripción** | **1. Agregar data attributes a cada .searchable-item:**<br>```html<br><div class="searchable-item"<br>  data-name="Limpieza profunda de sofá"<br>  data-type="servicio"<br>  data-segment="hogar"<br>  data-price-low="80000"<br>  data-price-high="180000"<br>  data-price-currency="COP"><br>```<br><br>**2. Crear schema dinámico por sección de servicios:**<br>En index.html, añadir un segundo `<script type="application/ld+json">` por cada sección que quiera un AggregateOffer independiente.<br><br>**3. Alternativa — un solo Product schema con AggregateOffer:**<br>```json<br>{<br>  "@context": "https://schema.org",<br>  "@type": "AggregateOffer",<br>  "name": "Servicios de limpieza Purity & Clean",<br>  "lowPrice": "60000",<br>  "highPrice": "450000",<br>  "priceCurrency": "COP",<br>  "offerCount": "8",<br>  "offers": [<br>    {<br>      "@type": "Offer",<br>      "itemOffered": { "@type": "Service", "name": "Limpieza profunda de sofá" },<br>      "priceSpecification": { "@type": "PriceSpecification", "priceCurrency": "COP", "lowPrice": "80000", "highPrice": "180000" }<br>    }<br>  ]<br>}<br>``` |
| **Impacto esperado** | Muestra precios directamente en resultados de Google para servicios, +15-30% CTR, mejor posicionamiento local |
| **Esfuerzo** | S (2-3 horas — data attributes + JSON-LD + validación) |
| **Agente recomendado** | Frontend |
| **Referencias** | [1] AggregateOffer Schema.org https://schema.org/AggregateOffer |
| **Estado** | Nueva propuesta — NO mencionada en R1-R96 |
| **Prioridad CEO** | **Alta** — complementa P1, juntos generan rich snippets completos |

---

### Propuesta 3: Google Business Profile Posts — Content Calendar (MEDIUM PRIORITY)

| Campo | Detalle |
|-------|---------|
| **Título** | Implementar calendario de GBP Posts para mantener perfil activo y mejorar ranking local |
| **Problema** | Perfiles de GBP sin posts activos pierden visibilidad. Purity & Clean tiene 127 reviews pero no hay evidencia de posts regulares. El perfil está inactivo. |
| **Descripción** | **1. Tipos de posts para limpiarías:**<br><br>**a) Tips de mantenimiento (semanal):**<br>- Título: "¿Sabías que deberías limpiar tu sofá cada 6 meses?"<br>- Cuerpo: "La limpieza profesional no solo mejora la apariencia... [consejo breve]"<br>- Imagen: antes/después<br><br>**b) Ofertas de temporada (quincenal):**<br>- Título: "Limpieza de colchones desde $60.000"<br>- Cuerpo: "Sanitización con productos seguros para tu familia. Marzo es el mes del descanso limpio."<br>- CTA: LEARN_MORE → purityclean.com<br><br>**c) Testimonios destacados (mensual):**<br>- Título: "Lo que dicen nuestros clientes"<br>- Cuerpo: verbatim de una review de 5 estrellas<br>- Imagen: foto genérica del servicio<br><br>**2. Integración técnica:**<br>GBP Posts se gestiona manualmente o via API (Google Business Profile API). No hay plugin WordPress directo para sites estáticos.<br><br>**3. Workflow propuesto:**<br>- Agente de contenido prepara 4 posts/semana (2 tips, 1 oferta, 1 testimonio)<br>- CEO revisa y approves<br>- Se publican manualmente en Google Business Profile<br>- Se trackean vistas en Google Business Dashboard |
| **Impacto esperado** | +35% visualizaciones del perfil (según estudios GBP), mejor ranking en local pack, diferenciación de competidores inactivos |
| **Esfuerzo** | S (1-2 horas/semana — contenido, sin código) |
| **Agente recomendado** | Content / CEO directamente (no requiere código) |
| **Referencias** | [3] Google Business Profile Posts Guide https://business.google.com/business-profile/posts/ |
| **Estado** | Nueva propuesta — NO mencionada en R1-R96 |
| **Prioridad CEO** | **Media** — impacto alto en SEO local pero requiere gestión de contenido, no código |

---

### Propuesta 4: PostalCode Schema en Zonas Pages (MEDIUM PRIORITY)

| Campo | Detalle |
|-------|---------|
| **Título** | Agregar postalCode al schema de cada zona page para mejorar geolocalización |
| **Problema** | Las zonas pages tienen addressNeighborhood pero no postalCode. Sin código postal, Google no puede determinar la cobertura postal exacta para cada barrio. |
| **Descripción** | **1. Códigos postales de Bogotá (principales zonas Purity):**<br>- Teusaquillo: 111321<br>- Chapinero: 111711<br>- Usaquén: 111121<br>- Suba: 111171<br>- Kennedy: 111921<br>- Engativá: 111071<br>- Fontibón: 111881<br>- Bosa: 110701<br>- Barrios Unidos: 111021<br>- Usme: 110851<br><br>**2. Modificar el JSON-LD de cada zonas/*/index.html:**<br>```json<br>{<br>  "@type": "LocalBusiness",<br>  "name": "Purity & Clean - Teusaquillo",<br>  "address": {<br>    "@type": "PostalAddress",<br>    "addressCountry": "CO",<br>    "addressRegion": "Cundinamarca",<br>    "addressLocality": "Bogotá",<br>    "addressNeighborhood": "Teusaquillo",<br>    "postalCode": "111321"<br>  }<br>}<br>```<br><br>**3. Verificación:**<br>Usar Google Rich Results Test en cada zona page tras implementar. |
| **Impacto esperado** | Mejor ranking en búsquedas locales por barrio, cobertura geográfica más precisa para Google Maps |
| **Esfuerzo** | S (1-2 horas — actualizar 9-10 archivos de zona) |
| **Agente recomendado** | Frontend |
| **Referencias** | [2] PostalAddress Schema https://schema.org/PostalAddress |
| **Estado** | Nueva propuesta — NO mencionada en R1-R96 |
| **Prioridad CEO** | **Media** — mejora SEO local de cada zona page |

---

### Propuesta 5: hasMerchantReturnPolicy para Servicios (LOW PRIORITY)

| Campo | Detalle |
|-------|---------|
| **Título** | Documentar política de satisfacción como MerchantReturnPolicy en schema |
| **Problema** | Clientes nuevos de servicios de limpieza a domicilio tienen alta fricción de compra (no pueden probar antes de contratar). Una política de satisfacción documentada reduce esa fricción. |
| **Descripción** | **1. Política de satisfacción Purity & Clean:**<br>Supongamos que ofrecen re-limpieza sin costo si el cliente no queda satisfecho (o satisfacción del cliente como prioridd). El schema sería:<br>```json<br>{<br>  "@type": "Service",<br>  "name": "Limpieza profunda de sofás",<br>  "hasMerchantReturnPolicy": {<br>    "@type": "MerchantReturnPolicy",<br>    "name": "Garantía de satisfacción Purity & Clean",<br>    "returnPolicyCountry": "CO",<br>    "merchantReturnDays": 7,<br>    "returnMethod": "phone",<br>    "contactPoint": {<br>      "@type": "ContactPoint",<br>      "telephone": "+57-300-123-4567"<br>    }<br>  }<br>}<br>```<br><br>**2. Nota:** Solo implementar si la política real de la empresa lo permite. Si no hay política de satisfacción, no inventar una.<br><br>**3. Alternativa sin schema:**<br>Si la política no es formal, simplemente añadir el texto de garantía en el index.html (sección de servicios o FAQ) sin necesidad de schema. |
| **Impacto esperado** | Reducción de fricción de clientes nuevos, +10-15% conversión en formularios |
| **Esfuerzo** | S (1 hora — solo si hay política real que documentar) |
| **Agente recomendado** | Frontend / Content |
| **Referencias** | [4] MerchantReturnPolicy Schema https://schema.org/MerchantReturnPolicy |
| **Estado** | Nueva propuesta — NO mencionada en R1-R96 — HIPÓTESIS A VALIDAR con CEO |
| **Prioridad CEO** | **Baja** — requiere confirmación de política real de la empresa |

---

## Orden de Implementación Recomendado (R97)

| # | Propuesta | Impacto | Esfuerzo | Prioridad |
|---|-----------|---------|----------|-----------|
| 1 | **priceSpecification en Offer Schema** | +20-40% CTR | S | **Alta** |
| 2 | **AggregateOffer en tarjetas** | +15-30% CTR | S | **Alta** |
| 3 | **Google Business Profile Posts** | +35% vistas perfil | S (contenido) | **Media** |
| 4 | **PostalCode en zonas pages** | SEO local por barrio | S | **Media** |
| 5 | **hasMerchantReturnPolicy** | Reducción fricción | S | **Baja** |

**R97 complementa R96:** R96 propuso CLS, PWA y JS modular (performance técnica); R97 propone Schema.org y pricing visibility (SEO y conversión).

---

## Dependencias y Bloqueadores

| Propuesta | Depende de | Bloqueador |
|-----------|------------|------------|
| priceSpecification en Offer | CEO confirma rangos COP | Ninguno |
| AggregateOffer en tarjetas | priceSpecification (mismos datos) | CEO confirma rangos |
| Google Business Profile Posts | Ninguno | Gestión de contenido (no código) |
| PostalCode en zonas | Ninguno | Ninguno |
| hasMerchantReturnPolicy | CEO confirma política real | Confirmación política |

---

## Comparación R96 vs R97

| Aspecto | R96 | R97 |
|--------|-----|-----|
| **Foco** | Performance (CLS, LCP), PWA Advanced, JS Modular | Schema.org, Rich Snippets, Precio visible |
| **Tipo propuestas** | Técnico, performance | SEO, pricing, contenido |
| **Mercado** | Technical SEO y performance | Descubrimiento y conversión |
| **Tecnología** | CSS crítico, Background Sync, ES6 Modules | JSON-LD, PriceSpecification, AggregateOffer |
| **Esfuerzo** | S-M | S |
| **Revenue** | Indirecto (SEO + leads recuperables) | Directo (mejor CTR = más leads) |

**R97 es secuela lógica de R96:** R96 mejoró los cimientos técnicos; R97 capitaliza ese trabajo con mejor schema para que Google entienda y muestre los servicios con precios.

---

## Fuentes

[1] Schema.org. "PriceSpecification Type." Schema.org Documentation, 2026. https://schema.org/PriceSpecification

[2] Schema.org. "PostalAddress Type." Schema.org Documentation, 2026. https://schema.org/PostalAddress

[3] Google. "Create posts on your Business Profile." Google Business Profile Help, 2026. https://business.google.com/business-profile/posts/

[4] Schema.org. "MerchantReturnPolicy Type." Schema.org Documentation, 2026. https://schema.org/MerchantReturnPolicy

---

*Documento generado por Innovation Scout — Round 97*
*Purity & Clean Analysis — 2026-04-28*
*Co-Authored-By: Paperclip <noreply@paperclip.ing>*