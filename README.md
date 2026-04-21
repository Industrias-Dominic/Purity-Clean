# Purity-Clean

Sitio web institucional de Purity & Clean — servicios y productos de limpieza profesional para hogares, PYMEs y empresas en Bogotá, Colombia.

## Estructura del proyecto

```
/
├── index.html          # Documento principal (HTML5 semántico)
├── css/
│   └── style.css      # Estilos con CSS custom properties, mobile-first
├── js/
│   └── script.js      # JavaScript vanilla: menú responsive, búsqueda y formulario de leads
└── README.md
```

## Formulario de captura de leads

La sección `#contacto` incluye un formulario que captura los siguientes campos:

| Campo | Tipo | Requerido | Validación |
|---|---|---|---|
| Nombre completo | text | Sí | No vacío |
| Correo electrónico | email | Sí | Formato válido de email |
| Teléfono | tel | Sí | Formato telefónico válido |
| Tipo de cliente | select | Sí | Debe seleccionar una opción |
| Servicio de interés | select | No | Grupo con opciones de servicios y productos |
| Mensaje | textarea | No | — |

**Validación**: en tiempo real al salir del campo (`blur`) y al enviar. Mensajes de error accesibles via `role="alert"` y `aria-live="polite"`.

**Feedback de envío**: el formulario se oculta y se muestra un mensaje de confirmación animado (`#form-success`).

## Botón flotante de WhatsApp

Enlace fijo en esquina inferior derecha (`position: fixed`). Incluye:
- Animación de pulso continua mediante CSS `@keyframes whatsapp-pulse`
- Tooltip al hacer hover/focus
- Enlace directo a `wa.me` con mensaje predefinido

## Accesibilidad verificada

- Navegación completa por teclado (menú, formulario, botón flotante)
- `aria-expanded`, `aria-controls`, `aria-required`, `aria-label` correctamente utilizados
- Contraste de color cumple nivel AA
- Formularios con labels asociadas, errores announced y foco visible

## Responsivo

Puntos de quiebre principales:
- **< 760px**: diseño móvil (una columna)
- **≥ 760px**: diseño tablet/escritorio (grid de 2+ columnas)

---

Co-Authored-By: Paperclip <noreply@paperclip.ing>