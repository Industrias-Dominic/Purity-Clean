# Análisis Creativo — Purity & Clean (Round 91)

**Proyecto:** Purity & Clean
**Fecha:** 2026-04-28
**Analista:** Innovation Scout
**Ronda:** 91
**Issue padre:** DOMAA-839

---

## Resumen Ejecutivo

R91 se enfoca en **cierre de features pendientes de R89** y **mejoras de UX/animación** que son realistas para el equipo actual — sin pasarelas de pago ni integraciones complejas. A diferencia de R90 (modelo de negocio B2B), R91 propone mejoras tácticas de conversión que coinciden con las instrucciones del CEO: "cosas como crear animaciones, mejorar el SEO".

---

## Estado Actual del Proyecto (R91)

### Stack Técnico

| Componente | Estado | Notas |
|-----------|--------|-------|
| **Frontend** | HTML5 + CSS3 + Vanilla JS | SPA-like, multi-sección |
| **Dark mode** | ✅ Funcional | localStorage persistence |
| **Búsqueda** | ✅ Funcional | Filtra tarjetas por data-* |
| **Blog SEO** | ✅ 6 artículos | Con meta tags completos |
| **Google Reviews** | ✅ UI completa | Avatares, estrellas, texto real |
| **Before/After sliders** | ✅ 6 comparison sliders | Unsplash + CSS filtros |
| **Video showcase** | ✅ Sección video | YouTube embed (placeholder) |
| **Cotizador** | ✅ Interactivo | Stepper + WhatsApp |
| **WhatsApp Chatbot** | ✅ Fab button + panel | Con quick replies |
| **PWA** | ✅ Funcional | SKIP_WAITING |
| **Tests E2E** | ✅ Playwright | 9 archivos |
| **Pricing section** | ✅ Completo | Cards con rangos |
| **FAQ** | ✅ Schema.org | Pero sin acordeón interactivo |

### Features Pendientes (R89)

| Feature | Ronda | Prioridad CEO | Estado |
|---------|-------|--------------|--------|
| Quiz Interactivo | R89 | ⏳ Pendiente | Sin implementar |
| Instagram UGC | R89 | ⏳ Pendiente | Sin implementar |
| Exit Intent Popup | R89 | ⏳ Pendiente | Sin implementar |
| Voice Search FAQ | R89 | ⏳ Pendiente | Sin implementar |
| Página de Precios | R89 | ⏳ Pendiente | **SÍ existe** (sección #pricing) |

### Lo Implementado en R1-R90 (Resumen)

| Feature | Ronda | Estado |
|---------|-------|--------|
| Chatbot WhatsApp | R1 | ✅ |
| PWA + Push | R1 | ✅ |
| Dark mode | R2 | ✅ |
| Blog SEO | R3 | ✅ |
| Google Reviews UI | R4 | ✅ |
| Programa de referidos | R5 | ✅ |
| Zonas pages | R6 | ✅ |
| Before/After gallery | R7 | ✅ |
| Stats animados | R8 | ✅ |
| Garantía 200% | R9 | ✅ |
| API B2B | R90 | ⏳ Pendiente |
| Gift Cards | R90 | ⏳ Pendiente |
| Corporate Vouchers | R90 | ⏳ Pendiente |
| Public Checklists | R90 | ⏳ Pendiente |
| Flat Rate Pricing | R90 | ⏳ Pendiente |

---

## Análisis Competitivo: Áreas de Mejora UX

### Comparación con Maid Complete

| Feature | Maid Complete | Purity & Clean | Gap |
|---------|--------------|----------------|-----|
| **Proceso visual (3 pasos)** | ✅ "Select → Schedule → Enjoy" | ❌ No tiene sección "cómo funciona" | **Alto — implementar** |
| **Exit intent popup** | ❌ No visible | ❌ No implementado | **Medio — pendiente R89** |
| **FAQ accordion** | Simple FAQ | FAQ con Schema pero sin acordeón | **Bajo — mejora UX** |
| **Sticky CTA** | Header con "Book Now" | Nav normal sin CTA sticky | **Medio** |
| **Certificación badges** | "Bonded & Insured" | Solo confianza badges | **Bajo** |
| **Scroll animations** | Básicas | `data-reveal` con delays | ✅ Correcto |

### Lo que NO tienen los competidores que Purity podría liderar

1. **Animación de contadores en scroll** — Ya existe `data-counter` pero podría mejorar
2. **Microinteracciones en cards** — Hover effects más ricos
3. **Video testimonials** — Ningún competidor bogotano lo tiene

---

## Propuestas (Round 91)

### Propuesta 1: Exit Intent Popup (HIGH PRIORITY — Cierre R89)

| Campo | Detalle |
|-------|---------|
| **Título** | Implementar Exit Intent Popup para capturar visitantes que se van |
| **Problema** | Muchos visitantes revisan el sitio pero no reservan. Un popup al intentar cerrar la pestaña o retroceder puede recuperar ~15% de conversiones perdidas. |
| **Descripción** | **Nuevo componente en `js/script.js` + CSS:**<br><br>1. **Detección de intent:**<br>   ```javascript<br>   document.addEventListener('mouseout', (e) => {<br>     if (e.clientY < 10 && !sessionStorage.getItem('exitShown')) {<br>       showExitPopup();<br>     }<br>   });<br>   ```<br><br>2. **UI del popup:**<br>   ```html<br>   <div class="exit-popup" id="exit-popup" role="dialog" aria-modal="true" hidden><br>     <div class="exit-popup-backdrop"></div><br>     <div class="exit-popup-card"><br>       <button class="exit-popup-close" aria-label="Cerrar">&times;</button><br>       <div class="exit-popup-icon"><i class="fa-solid fa-sparkles"></i></div><br>       <h2>Antes de irte...</h2><br>       <p>¿No encontraste lo que buscabas? Chatea con nosotros directamente y te ayudamos a encontrar el servicio ideal.</p><br>       <a href="https://wa.me/573001234567" class="btn btn-whatsapp"><br>         <i class="fa-brands fa-whatsapp"></i> Chatear ahora<br>       </a><br>       <button class="exit-popup-dismiss">No gracias, me voy</button><br>     </div><br>   </div><br>   ```<br><br>3. **Condiciones:** Mostrar solo 1 vez por sesión, solo en desktop (no mobile), no mostrar si ya scrolló más de 50%. |
| **Impacto esperado** | Recuperación de ~10-15% de visitantes que no convierten, aumento de WhatsApp contacts |
| **Esfuerzo** | S (3-4 horas — JS + CSS) |
| **Agente recomendado** | Frontend |
| **Referencias** | [1] OptinMonster Exit Intent Statistics |
| **Estado** | Nueva propuesta — Cierre de R89 P1 |
| **Prioridad CEO** | **Alta** — feature prometida en R89, alto impacto con poco esfuerzo |

---

### Propuesta 2: Sección "Cómo Funciona" — Proceso Visual de 3 Pasos (HIGH PRIORITY)

| Campo | Detalle |
|-------|---------|
| **Título** | Crear sección "Cómo Funciona" con proceso visual de 3 pasos |
| **Problema** | Maid Complete tiene "Select → Schedule → Enjoy" y convierte porque el usuario sabe exactamente qué esperar. Purity no tiene sección de proceso, lo que genera incertidumbre. |
| **Descripción** | **Nueva sección `#como-funciona` en `index.html` + estilos:**<br><br>1. **Estructura HTML:**<br>   ```html<br>   <section id="como-funciona" class="section section-proceso" aria-labelledby="proceso-heading"><br>     <div class="container"><br>       <div class="section-head"><br>         <p class="eyebrow">Proceso simple</p><br>         <h2 id="proceso-heading">3 pasos para un espacio impecable</h2><br>       </div><br>       <div class="proceso-grid" role="list"><br>         <article class="proceso-card" data-reveal data-reveal-delay="50"><br>           <div class="proceso-number" aria-hidden="true">1</div><br>           <div class="proceso-icon"><i class="fa-solid fa-hand-pointer"></i></div><br>           <h3>Selecciona tu servicio</h3><br>           <p>Elige entre limpieza de sofás, sanitización de colchones o mantenimiento de alfombras. Si no sabes qué necesitas, chatea con nosotros.</p><br>         </article><br>         <article class="proceso-card" data-reveal data-reveal-delay="150"><br>           <div class="proceso-number" aria-hidden="true">2</div><br>           <div class="proceso-icon"><i class="fa-solid fa-calendar-check"></i></div><br>           <h3>Agenda tu cita</h3><br>           <p>Usa el cotizador para ver precios o escríbenos por WhatsApp. Confirmamos en menos de 2 horas.</p><br>         </article><br>         <article class="proceso-card" data-reveal data-reveal-delay="250"><br>           <div class="proceso-number" aria-hidden="true">3</div><br>           <div class="proceso-icon"><i class="fa-solid fa-sparkles"></i></div><br>           <h3>Disfruta el resultado</h3><br>           <p>Nuestro equipo llega puntual, trabaja con productos seguros y te deja espacios impecables en pocas horas.</p><br>         </article><br>       </div><br>       <div class="proceso-cta" data-reveal><br>         <a href="#cotizador" class="btn btn-primary">Calcular precio</a><br>         <a href="https://wa.me/573001234567" class="btn btn-whatsapp">O escribir por WhatsApp</a><br>       </div><br>     </div><br>   </section><br>   ```<br><br>2. **CSS con animación de línea conectora:**<br>   ```css<br>   .proceso-card {<br>     position: relative;<br>     opacity: 0;<br>     transform: translateY(30px);<br>     transition: opacity 0.5s ease, transform 0.5s ease;<br>   }<br>   .proceso-card.revealed {<br>     opacity: 1;<br>     transform: translateY(0);<br>   }<br>   .proceso-number {<br>     animation: pulse-glow 2s ease-in-out infinite;<br>   }<br>   ``` |
| **Impacto esperado** | Reduce incertidumbre del usuario, aumenta confianza para reservar, diferencia vs competidores locales que no tienen proceso claro |
| **Esfuerzo** | S (4-5 horas — HTML + CSS + icono) |
| **Agente recomendado** | Frontend |
| **Referencias** | [2] Maid Complete "The Maid Complete Process" |
| **Estado** | Nueva propuesta — No mencionada en R1-R90 |
| **Prioridad CEO** | **Alta** — impacto directo en conversión, implementación rápida |

---

### Propuesta 3: FAQ Accordion Interactivo (MEDIUM PRIORITY)

| Campo | Detalle |
|-------|---------|
| **Título** | Convertir FAQ estático en acordeón expandible con animación |
| **Problema** | La sección FAQ tiene 8 preguntas pero todas visibles simultáneamente — hace la página larga y frustra al usuario que busca una respuesta específica. Maid Complete y Cleanster usan acordeones. |
| **Descripción** | **Modificar sección `#faq` existente:**<br><br>1. **HTML restructurado:**<br>   ```html<br>   <section id="faq" class="section container" aria-labelledby="faq-heading"><br>     <div class="section-head"><br>       <p class="eyebrow">FAQ</p><br>       <h2 id="faq-heading">Preguntas frecuentes</h2><br>     </div><br>     <div class="faq-accordion" role="list"><br>       <details class="faq-item" role="listitem"><br>         <summary class="faq-question"><br>           <span class="faq-question-text">¿Cuánto cuesta la limpieza profunda de un sofá?</span><br>           <i class="fa-solid fa-chevron-down faq-chevron" aria-hidden="true"></i><br>         </summary><br>         <div class="faq-answer"><br>           <p>El servicio de limpieza profunda de sofás tiene un rango de precio entre $80.000 y $180.000 por unidad, dependiendo del tamaño, material y estado del mueble. La cotización final se realiza al evaluar el espacio.</p><br>         </div><br>       </details><br>       <!-- Más items --><br>     </div><br>   </section><br>   ```<br><br>2. **CSS accordion:**<br>   ```css<br>   .faq-item {<br>     border: 1.5px solid var(--color-border);<br>     border-radius: 12px;<br>     margin-bottom: 0.75rem;<br>     overflow: hidden;<br>   }<br>   .faq-item summary {<br>     padding: 1rem 1.25rem;<br>     cursor: pointer;<br>     font-weight: 600;<br>     display: flex;<br>     justify-content: space-between;<br>     align-items: center;<br>     list-style: none;<br>   }<br>   .faq-item summary::-webkit-details-marker { display: none; }<br>   .faq-item[open] .faq-chevron {<br>     transform: rotate(180deg);<br>   }<br>   .faq-answer {<br>     padding: 0 1.25rem 1rem;<br>     color: var(--color-muted);<br>     animation: slideDown 0.3s ease;<br>   }<br>   ``` |
| **Impacto esperado** | Mejor UX móvil, reduce scroll, usuario encuentra respuesta más rápido, mejora time-on-site |
| **Esfuerzo** | XS (2 horas — CSS + minimal JS para ::marker) |
| **Agente recomendado** | Frontend |
| **Referencias** | [3] NNGroup FAQ UX |
| **Estado** | Nueva propuesta — mejora de UX sobre existente |
| **Prioridad CEO** | **Media** — mejora UX con poco esfuerzo |

---

### Propuesta 4: Sticky CTA Header en Mobile (MEDIUM PRIORITY)

| Campo | Detalle |
|-------|---------|
| **Título** | Agregar CTA sticky de WhatsApp en mobile que aparece tras scroll |
| **Problema** | En mobile, el usuario que scrollea hacia abajo pierde acceso rápido al CTA de reservas. Un sticky bar con WhatsApp aumenta conversiones. |
| **Descripción** | **Nuevo componente sticky mobile:**<br><br>1. **HTML:**<br>   ```html<br>   <div class="sticky-cta-bar" id="sticky-cta" aria-label="Acceso rápido a contacto" hidden><br>     <a href="https://wa.me/573001234567" class="sticky-cta-btn"><br>       <i class="fa-brands fa-whatsapp" aria-hidden="true"></i><br>       <span>Reservar por WhatsApp</span><br>     </a><br>     <a href="#cotizador" class="sticky-cta-btn sticky-cta-btn--secondary"><br>       <i class="fa-solid fa-calculator" aria-hidden="true"></i><br>       <span>Cotizar</span><br>     </a><br>   </div><br>   ```<br><br>2. **JS para mostrar tras scroll:**<br>   ```javascript<br>   const stickyCta = document.getElementById('sticky-cta');<br>   let lastScroll = 0;<br>   window.addEventListener('scroll', () => {<br>     const currentScroll = window.scrollY;<br>     if (currentScroll > 600 && currentScroll > lastScroll) {<br>       stickyCta.removeAttribute('hidden');<br>     } else if (currentScroll < 300) {<br>       stickyCta.setAttribute('hidden', '');<br>     }<br>     lastScroll = currentScroll;<br>   }, { passive: true });<br>   ```<br><br>3. **CSS:**<br>   ```css<br>   .sticky-cta-bar {<br>     position: fixed;<br>     bottom: 0;<br>     left: 0;<br>     right: 0;<br>     z-index: 900;<br>     display: flex;<br>     gap: 0.5rem;<br>     padding: 0.75rem 1rem;<br>     background: var(--color-surface);<br>     box-shadow: 0 -4px 20px rgba(0,0,0,0.1);<br>   }<br>   .sticky-cta-btn {<br>     flex: 1;<br>     display: flex;<br>     align-items: center;<br>     justify-content: center;<br>     gap: 0.5rem;<br>     padding: 0.75rem;<br>     border-radius: 12px;<br>     font-weight: 600;<br>   }<br>   ``` |
| **Impacto esperado** | Aumento de conversiones mobile (~5-10%), WhatsApp contacts más altos |
| **Esfuerzo** | S (3 horas — HTML + CSS + JS) |
| **Agente recomendado** | Frontend |
| **Referencias** | [4] Sticky CTA mobile best practices |
| **Estado** | Nueva propuesta — UX mobile |
| **Prioridad CEO** | **Media** — alto impacto mobile dado que % tráfico mobile es alto |

---

### Propuesta 5: Microinteracciones Mejoradas en Cards de Servicio (MEDIUM PRIORITY)

| Campo | Detalle |
|-------|---------|
| **Título** | Añadir hover effects más ricos y microinteracciones en service cards |
| **Problema** | Las cards actuales tienen hover básico. Competidores como Cleanster tienen cards con scale + shadow más pronunciados. Mejorar esto aumenta engagement. |
| **Descripción** | **Mejora en `css/style.css` para `.card` y `.searchable-item`:**<br><br>```css<br>.card {\n  transition:\n    transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1),\n    box-shadow 0.3s ease,\n    border-color 0.2s ease;\n}\n.card:hover {\n  transform: translateY(-8px) scale(1.02);\n  box-shadow: 0 20px 40px rgba(11, 113, 137, 0.15);\n  border-color: var(--color-primary);\n}\n.card:hover .btn {\n  background: var(--color-primary);\n  color: #fff;\n}\n\n/* Badge de "popular" en pricing cards */\n.pricing-card--plans {\n  position: relative;\n}\n.pricing-card--plans::before {\n  content: 'Más popular';\n  position: absolute;\n  top: -12px;\n  left: 50%;\n  transform: translateX(-50%);\n  background: var(--color-accent);\n  color: #fff;\n  font-size: 0.75rem;\n  font-weight: 700;\n  padding: 4px 12px;\n  border-radius: 20px;\n  white-space: nowrap;\n}\n``` |
| **Impacto esperado** | Mayor engagement con las cards, más tiempo en página, más clicks en CTAs |
| **Esfuerzo** | XS (1-2 horas — solo CSS) |
| **Agente recomendado** | Frontend |
| **Referencias** | [5] UI Design Card Hover Effects |
| **Estado** | Nueva propuesta — CSS microinteractions |
| **Prioridad CEO** | **Media** — bajo esfuerzo, mejora perceptual |

---

### Propuesta 6: Rich Snippets Mejorados con FAQPage + HowTo (HIGH PRIORITY — SEO)

| Campo | Detalle |
|-------|---------|
| **Título** | Añadir Schema.org FAQPage completo y HowTo para cada servicio |
| **Problema** | Purity ya tiene FAQ schema pero no está optimizado para rich results completos. Google muestra FAQ expandible en search — con preguntas optimizadas puede capturar más SERP real estate. |
| **Descripción** | **Mejorar JSON-LD en `index.html`:**<br><br>1. **FAQPage expandido** (ya existe pero agregar más preguntas):<br>   ```json\n   {\n     "@context": "https://schema.org",\n     "@type": "FAQPage",\n     "mainEntity": [\n       /* existing 8 questions + 4 new */\n       {\n         "@type": "Question",\n         "name": "¿Cuánto dura el servicio de limpieza de sofá?",\n         "acceptedAnswer": {\n           "@type": "Answer",\n           "text": "El servicio de limpieza profunda de un sofá 3 cuerpos toma entre 45 y 90 minutos dependiendo del estado del mueble. El secado completo requiere entre 4 y 6 horas."\n         }\n       },\n       {\n         "@type": "Question",\n         "name": "¿Puedo cancelar o reprogramar mi cita?",\n         "acceptedAnswer": {\n           "@type": "Answer",\n           "text": "Sí, puedes cancelar o reprogramar hasta 24 horas antes de tu cita sin costo adicional. Contáctanos por WhatsApp para hacer el cambio."\n         }\n       },\n       {\n         "@type": "Question",\n         "name": "¿Los productos son seguros para bebés?",\n         "acceptedAnswer\": {\n           "@type": "Answer",\n           "text": "Sí, usamos productos certificados que son seguros para hogares con bebés, niños y mascotas. Todos nuestros procesos cumplen con normas de higiene."\n         }\n       },\n       {\n         "@type": "Question",\n         "name": "¿Ofrecen garantía en el servicio?",\n         "acceptedAnswer\": {\n           "@type": "Answer",\n           "text": "Sí, ofrecemos garantía de satisfacción del 200%. Si no estás satisfecho con el resultado, devolvemos tu dinero o reamos el servicio sin costo."\n         }\n       }\n     ]\n   }\n   ```<br><br>2. **HowTo schema para "Cómo limpiar tu sofá":**<br>   ```json\n   {\n     "@context": "https://schema.org",\n     "@type": "HowTo",\n     "name": "Cómo mantener tu sofá limpio entre servicios profesionales\",\n     "step\": [\n       {\n         "@type": \"HowToStep\",\n         \"text\": \"Aspira tu sofá al menos una vez por semana usando el accesorio de tapicería.\"\n       },\n       {\n         "@type\": \"HowToStep\",\n         \"text\": \"Aplica el kit eco protector de Purity & Clean cada 3 meses.\"\n       },\n       {\n         "@type\": \"HowToStep\",\n         \"text\": \"Evita comer sobre el sofá para prevenir manchas de comida.\"\n       }\n     ]\n   }\n   ``` |
| **Impacto esperado** | Rich snippets en Google (FAQ expandible), más CTR en search, posiciona a Purity como autoridad en limpieza |
| **Esfuerzo** | S (2-3 horas — JSON-LD + contenido) |
| **Agente recomendado** | Frontend + Content |
| **Referencias** | [6] Google Search Central FAQ Schema [7] HowTo Schema |
| **Estado** | Nueva propuesta — SEO enhancement |
| **Prioridad CEO** | **Alta** — impacto en SEO sin código complejo |

---

## Orden de Implementación Recomendado

| # | Propuesta | Impacto | Esfuerzo | Prioridad | Tipo |
|---|-----------|---------|----------|-----------|------|
| 1 | **Exit Intent Popup** | Conversión | S (3-4h) | **Alta** | Cierre R89 |
| 2 | **Cómo Funciona** | Confianza + Conversión | S (4-5h) | **Alta** | UX |
| 3 | **Schema FAQ + HowTo** | SEO | S (2-3h) | **Alta** | SEO |
| 4 | **Sticky CTA Mobile** | Conversión Mobile | S (3h) | **Media** | UX Mobile |
| 5 | **FAQ Accordion** | UX | XS (2h) | **Media** | UX |
| 6 | **Microinteracciones Cards** | Engagement | XS (1-2h) | **Media** | UX |

---

## Comparación R90 vs R91

| Aspecto | R90 | R91 |
|---------|-----|-----|
| **Foco** | Modelo de negocio B2B (API, Gift Cards, Corporate) | UX/Animaciones/SEO (features pendientes) |
| **Tipo propuestas** | Estratégicas/Transformacionales | Tácticas/Increamentales |
| **Esfuerzo promedio** | S-L | XS-S |
| **Impacto** | Negocio a largo plazo | Conversión inmediata |
| **Competidores referencia** | Cleanster API, Maid Complete Gift Cards | Maid Complete UX, OptinMonster |
| **Exit Intent Popup** | No | **Sí — cierre R89** |
| **Proceso visual** | No | **Sí — nuevo** |
| **Schema SEO** | No | **Sí — FAQ + HowTo** |
| **Sticky CTA Mobile** | No | **Sí — nuevo** |

**R91 no repite ninguna propuesta de R90. Las 6 propuestas abordan gaps de UX y SEO que R90 no cubrió.**

---

## Dependencias y Bloqueadores

| Propuesta | Depende de | Bloqueador |
|-----------|------------|------------|
| Exit Intent Popup | Ninguno | — |
| Cómo Funciona | Ninguno | — |
| Schema FAQ + HowTo | Content (nuevas preguntas FAQ) | CEO debe validar contenido |
| Sticky CTA Mobile | Ninguno | — |
| FAQ Accordion | Ninguno | — |
| Microinteracciones | Ninguno | — |

---

## Nota sobre Evolución del Proyecto

Después de 91 rondas, Purity & Clean tiene una base técnica sólida. R91 se enfoca en:

1. **Cerrar features prometidas** — Exit Intent Popup de R89
2. **Mejoras de UX probadas** — Proceso visual, Accordion, Sticky CTA
3. **SEO técnico** — Schema.org FAQ + HowTo

A diferencia de R90 (modelos de negocio), R91 propone **cambios de implementación inmediata** que no requieren decisiones estratégicas del CEO.

---

## Fuentes

[1] OptinMonster. "Exit Intent Popup Statistics." https://optinmonster.com (2026)

[2] Maid Complete. "The Maid Complete Process." https://www.maidcomplete.com (2026)

[3] NNGroup. "FAQ UX Design Best Practices." https://nngroup.com (2026)

[4] CXL Institute. "Sticky CTA Mobile Best Practices." https://cxl.com (2026)

[5] CSS-Tricks. "Card Hover Effects." https://css-tricks.com (2026)

[6] Google. "FAQ Schema Markup Guide." https://developers.google.com/search/docs/appearance/structured-data/faqpage (2026)

[7] Google. "HowTo Schema." https://developers.google.com/search/docs/appearance/structured-data/how-to (2026)

---

*Documento generado por Innovation Scout — Round 91*
*Purity & Clean Analysis — 2026-04-28*
*Co-Authored-By: Paperclip <noreply@paperclip.ing>*