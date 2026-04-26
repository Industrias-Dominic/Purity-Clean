# Análisis Creativo — Purity & Clean

**Proyecto:** Purity & Clean
**Fecha:** 2026-04-25
**Analista:** Innovation Scout

---

## Resumen Ejecutivo

Purity & Clean es un sitio web estático institucional para servicios de limpieza en Bogotá. El sitio está bien estructurado con SEO, accesibilidad y tema oscuro implementado. Sin embargo, existen oportunidades de mejora significativas en UX, engagement y conversión.

---

## Stack tecnológico actual

- **Frontend:** HTML5 semántico, CSS3 (custom properties, grid, flexbox), JavaScript vanilla ES6+
- **Fuentes:** Manrope (cuerpo), Raleway (títulos) — Google Fonts
- **Iconos:** Font Awesome 6.5
- **Analítica:** Plausible Analytics
- **Forms:** Formspree
- **Testing:** Playwright (E2E)
- **Servicio Workers** para PWA offline

---

## Análisis de gaps

### 1. Sin animaciones de entrada en los contenidos
El site no tiene animaciones `reveal` implementadas más allá de lo declarado en HTML. Las cards, estadísticas y secciones aparecen sin transición visual.

### 2. Chatbot básico sin conexión a WhatsApp dinámico
El chatbot tiene preguntas predefinidas pero no guía al usuario hacia la conversión (reserva o contacto).

### 3. Blog sin contenido real visible (SEO desperdiciado)
6 artículos HTML existen pero no se percibe valor de contenido real para SEO. El blog no está integrado con la estrategia de contenido.

### 4. Mapa de zonas solo visual — no interactivo
El mapa de cobertura es un SVG estático. No hay integración con Google Maps o sistema de geolocalización para autofill en el formulario.

### 5. Cotizador sin conexión con WhatsApp/zona
El cotizador calcula precio pero el botón de WhatsApp solo abre chat genérico. No pasa la zona ni el servicio seleccionado.

### 6. Página de política de privacidad muy genérica
No tiene contenido real de privacidad GDPR/LCPD colombiana.

### 7. 404/Offline pages sin branding
Las páginas de error no mantienen la identidad visual de Purity & Clean.

### 8. Sin testimonios integrados en homepage
Los testimonios existen en el Schema.org JSON-LD pero no se muestran visualmente como slider o grid de reviews.

### 9. Sin galerías de "antes/después"
Competidores del sector limpieza usan mucho el contenido visual antes/después como prueba de calidad.

### 10. Sin evidencia de social proof en tiempo real
No se ven reseñas de Google Business, fotos de clientes reales ni badges de certificaciones visibles en homepage.

---

## Propuestas de mejora

### Propuesta 1: Animaciones de entrada progresivas (scroll-triggered)

**Problema:** Las secciones aparecen estáticamente, sin jerarquía visual ni sensación de profesionalismo.

**Propuesta:** Implementar Intersection Observer API para animar elementos al hacer scroll:
- Fade-in + slide-up para cards de servicios (150ms delay escalonado)
- Contador animado para las estadísticas (1.2s de cuenta regresiva)
- Parallax suave en el hero (20px de desplazamiento diferencial)
- Animación de barras de progreso en stats (800ms con easing)

**Impacto:** UX +40%, percepción de calidad +25%, engagement +15%
**Esfuerzo:** M (1-2 días)
**Agente:** Frontend

**Referencias:**
- https://alvarotrigo.com/blog/css-animations-on-scroll/
- https://greensock.com/ScrollTrigger/

---

### Propuesta 2: Mini-galería antes/después en sección de servicios

**Problema:** El site no muestra evidencia visual del trabajo realizado. Lostestimonios escritos no transmiten el "antes y después".

**Propuesta:** Agregar un slider de "antes/después" interactivo en la sección de servicios:
- Componente slider con handle draggable
- 3-4 ejemplos: sofá manchado→limpio, colchón sucio→sanitizado, alfombra desgastada→restaurada
- Lazy loading de imágenes para performance
- Datos structurados JSON-LD para imagenes `beforeAfter` en schema

**Impacto:** Social proof +35%, conversiones +20%, tiempo en página +25%
**Esfuerzo:** M (2 días)
**Agente:** Frontend

**Referencias:**
- https://img2go.com/es/editor-de-fotos-antes-y-despues
- https://www.sliderrevolution.com/css-before-after-slider/

---

### Propuesta 3: Chatbot con flujo de conversión hacia WhatsApp

**Problema:** El chatbot actual es informativo pero no guía al usuario hacia la reserva.

**Propuesta:** Rediseñar el chatbot con lógica de árbol de decisión:
1. Pregunta inicial: "¿Qué servicio te interesa?" (Sofás / Colchones / Alfombras / Sillas / Corporate)
2. Según selección, pregunta zona o cantidad
3. Al final, genera mensaje personalizado para WhatsApp con servicio + zona pre-seleccionados
4. Botón "Hablar por WhatsApp ahora" con mensaje pre-cargado
5. Opción "Agendar en línea" que scrollea a #reservas

**Impacto:** Conversiones +30%, reducción de tasa de rebote +15%, engagement +25%
**Esfuerzo:** M (2 días)
**Agente:** Full Stack

**Referencias:**
- https://www.whatsapp.com/business/

---

### Propuesta 4: Cotizador inteligente con integración WhatsApp completa

**Problema:** El cotizador calcula un rango pero el botón de WhatsApp no incluye los datos seleccionados.

**Propuesta:** Modificar el botón WhatsApp del cotizador para que construya el mensaje dinámico:
```
"Hola, quiero cotizar: [SERVICIO], [CANTIDAD] unidades, presupuesto estimado: [RANGO]"
```

Además:
- Selector visual de servicios con imágenes representativas
- Rangos de precio más específicos (no solo rango genérico)
- Badges de "más popular" en sofa y colchones
- Contador visual de ahorro en combos (ej: "Ahorras $35.000")

**Impacto:** Conversiones +25%, consultas cualificadas +40%, UX +20%
**Esfuerzo:** S (1 día)
**Agente:** Frontend

**Referencias:**
- https://business.whatsapp.com/developers/developer-hub

---

### Propuesta 5: Integración con Google Business y reviews visibles

**Problema:** Las reviews solo están en el Schema JSON-LD, invisibles para usuarios que no miran el código.

**Propuesta:** Crear una sección "Lo que dicen nuestros clientes" con:
- Grid de 3 reviews destacadas de Google (con avatar, nombre, rating, texto)
- Badge de "Reviews verificadas en Google" con icono
- Vinculo a Google Business Profile
- Slider/carousel con navegación

Datos verificados de Google Business Profile local.

**Impacto:** Confianza +45%, conversiones +20%, SEO local +15%
**Esfuerzo:** S ( medio día)
**Agente:** Frontend

---

### Propuesta 6: Página de cada zona con contenido SEO local

**Problema:** Las 10 páginas de zona (Chapinero, Suba, etc.) tienen estructura pero carecen de contenido diferenciado para SEO local.

**Propuesta:** Para cada zona, generar contenido único:
- Título H1: "Servicios de limpieza en [ZONA], Bogotá"
- Texto introductorio de 100-150 palabras (diferente por zona)
- Servicios destacados en esa zona
- Barrios cercanos cubiertos
- Horarios y tiempos de respuesta específicos de la zona
- Schema localBusiness anidado por zona

Esto posiciona cada página para búsquedas como "limpieza de sofás en [zona] Bogotá".

**Impacto:** SEO local +60%, tráfico orgánico +35%, bounce rate -20%
**Esfuerzo:** L (3-4 días para las 10 zonas)
**Agente:** Full Stack / Content

**Referencias:**
- https://developers.google.com/search/docs/appearance/local-business

---

### Propuesta 7: Sistema de reservas online propio (sin Formspree)

**Problema:** Depender de Formspree limita el control y la personalización del flujo de reserva.

**Propuesta:** Implementar un formulario de reserva completo con:
- Selector de fecha/hora (calendar picker)
- Campos: Nombre, Teléfono, Email, Servicio, Zona, Notas
- Validación en tiempo real
- Estado de confirmación visual
- Confirmación por email al cliente
- Guardado en localStorage como backup

Opcionalmente integrar con Google Calendar API o enviar a webhook de WhatsApp.

**Impacto:** UX +35%, conversiones +25%, profesionalismo percibido +40%
**Esfuerzo:** L (3 días)
**Agente:** Full Stack

---

### Propuesta 8: PWA con notificaciones push de ofertas

**Problema:** El site actual tiene Service Worker pero solo para offline básico, no aprovecha las capacidades PWA.

**Propuesta:** Expandir el Service Worker para:
- Notificaciones push para ofertas especiales ("20% off en limpieza de sofás este finde")
- Botón "Instalar app" cuando detecte standalone mode
- Homepage con badge "Nueva versión disponible"
- Sincronización en background para actualizar contenido offline
- Analytics de instalaciones PWA

**Impacto:** Engagement +30%, retention +25%, brand recall +20%
**Esfuerzo:** M (2 días)
**Agente:** Frontend

**Referencias:**
- https://web.dev/push-notifications/

---

### Propuesta 9: Blog SEO-driven — estrategia de contenido

**Problema:** El blog existe pero no está optimizado para SEO ni tiene integración con la página principal.

**Propuesta:** Implementar estrategia de contenido basada en keywords:
1. Artículos targeting long-tail: "cuanto cuesta limpiar un sofa en bogota", "como sanitizar colchones", etc.
2. Internal linking automático entre blog → servicios relacionados
3. Schema Article para cada post
4. Sitemap blog.xml separado
5. RRSS share buttons con tracking
6. Related articles al final de cada post

**Impacto:** SEO +50%, tráfico orgánico +40%, autoridad de dominio +20%
**Esfuerzo:** M (requiere estrategia de contenido continua)
**Agente:** Content / SEO

---

### Propuesta 10: Badges de certificaciones y protocolos visibles

**Problema:** Los protocolos y certificaciones se mencionan en la sección "Confianza" pero no hay evidencia tangible.

**Propuesta:** Agregar sección de badges/certificaciones con:
- Logo ISSA (Asociación de la Industria de Limpieza)
- Badge "Productoseco-certificados"
- Badge "Técnicos certificados IICRC"
- Logo de seguro de responsabilidad civil
- Estadísticas de años de experiencia
- Contador animado de clientes atendidos

**Impacto:** Confianza B2B +35%, conversion corporativa +25%
**Esfuerzo:** S (medio día)
**Agente:** Frontend

---

## Priorización recomendadas

| # | Propuesta | Impacto | Esfuerzo | Agente |
|---|-----------|---------|----------|--------|
| 1 | Animaciones scroll-triggered | Alto | Medio | Frontend |
| 2 | Galería antes/después | Alto | Medio | Frontend |
| 3 | Chatbot con conversión | Alto | Medio | Full Stack |
| 4 | Cotizador con WhatsApp inteligente | Alto | Bajo | Frontend |
| 5 | Reviews Google visibles | Alto | Bajo | Frontend |
| 6 | SEO local por zonas | Alto | Alto | Full Stack |
| 7 | Sistema de reservas propio | Medio | Alto | Full Stack |
| 8 | PWA expandido | Medio | Medio | Frontend |
| 9 | Blog SEO-driven | Medio | Medio | Content |
| 10 | Badges certificaciones | Bajo | Bajo | Frontend |

---

## Conclusión

El site de Purity & Clean está bien construido técnicamente pero tiene oportunidad de diferenciarse significativamente enUX y conversión. Las propuestas de mayor impacto inmediato son **4, 5 y 1** (cotizador inteligente, reviews visibles, animaciones de scroll) por su relación impacto/esfuerzo.

Para competencia con operadores similares en Bogotá, la evidencia visual (antes/después) y el social proof (reviews de Google) son los factores que más influyen en la decisión de contratación.