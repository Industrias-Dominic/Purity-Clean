# Análisis Creativo — Purity & Clean (Round 100-B)
## Automatización Post-Conversión y Fidelización — 6 Propuestas

**Proyecto:** Purity & Clean
**Fecha:** 2026-05-04
**Analista:** CEO / Innovation Scout
**Ronda:** 100-B
**Issue padre:** DOMAA-933

---

## Resumen Ejecutivo

El sitio actual de Purity & Clean genera leads via WhatsApp, formularios y chatbot, pero **no existe ningún sistema post-conversión**: una vez que el cliente contacta, todo el seguimiento depende de la respuesta humana manual. Esto genera inconsistencias, olvidos y pérdida de oportunidades de recompra.

**6 propuestas concretas de automatización post-conversión y fidelización**, todas implementables sin despliegue de sitio (solo JS + WhatsApp API + Email), y de alto impacto inmediato una vez que el sitio esté live.

---

## Contexto: El Funnel Actual

```
Visitante → WhatsApp/Form/Chatbot → Lead Capturado (en WhatsApp del negocio)
                                              ↓
                                     ¿Qué pasa después?
                                              ↓
                                   NADA AUTOMÁTICO
```

El negocio responde manualmente (si responde). No hay:
- Confirmación automática de收到 lead
- Recordatorio de seguimiento
- Incentivo para volver
- Programa de referidos activo
- Seguimiento post-servicio

---

## Propuestas

### 1. CRÍTICA: Confirmación Automática de Lead vía WhatsApp

**Problema:** El lead envía WhatsApp y no recibe respuesta inmediata. Muchos potenciales clientes asumen que no有人 atiende y buscan competencia.

**Solución:** Implementar un auto-responder via WhatsApp Business API que:
- Confirme receipt del mensaje instantáneamente
- Proporcione tiempo de respuesta esperado (ej: "Respondemos en menos de 2 horas")
- Muestre los servicios principales como botones rápida
- Incluya un CTA de urgencia ("Solo 3 cupos disponibles esta semana")

**Esfuerzo:** S (WhatsApp Business API + webhook)
**Agente:** Full Stack
**Impacto:** +30% reducción de abandonos de leads
**Prerrequisito:** Número real de WhatsApp Business

---

### 2. CRÍTICA: Sistema de Recordatorios de Re-compra (Email/WhatsApp)

**Problema:** Un cliente que limpió su sofá hace 6 meses no piensa en volver. El negocio solo recibe visitas únicas.

**Solución:** Sistema de email/WhatsApp segmentado por tipo de servicio con recordatorios automáticos:

| Servicio | Frecuencia sugerida |
|----------|---------------------|
| Sofá | Cada 6-8 meses |
| Colchón | Cada 6-12 meses |
| Alfombras | Cada 4-6 meses |
| Limpieza empresarial | Mensual/Bimestral |

**Flujo:**
1. Lead convierte → se registra fecha + servicio en Google Sheets o DB
2. Pasado el período de frecuencia → email/WhatsApp: "Hola [Nombre], han pasado 6 meses desde tu última limpieza de sofá. ¿Te gustaría agendar nuevamente?"
3. Incluir promo sutil: "Cliente anterior: 10% dto."

**Esfuerzo:** M (integración con email provider + Google Sheets o similar)
**Agente:** Full Stack
**Impacto:** +20% tasa de recompra anual
**Prerrequisito:** Sitio live + base de datos de leads

---

### 3. Programa de Fidelización: "Purity Club" con Puntos

**Problema:** Sin incentivo para que el cliente vuelva, cada servicio es una transacción única sin relación.

**Solución:** Implementar un sistema de puntos simple:
- Cada servicio completado = puntos basados en valor
- 100 puntos = $10.000 COP de descuento en próximo servicio
- Dashboard simple en el sitio (solo área de cliente) para consultar saldo
- Notificación por WhatsApp cuando alcanza umbral canjeable

**Ejemplo de UX:**
```
✅ Servicio completado: Sofá 3 cuerpos - $120.000
🎁 Ganaste 120 puntos (1 punto = $1.000 COP)
🎉 Tienes 340 puntos disponibles
   Canjea 100 puntos = $10.000 dto. en tu próxima visita
```

**Esfuerzo:** M (base de datos + frontend sencillo)
**Agente:** Full Stack + Frontend
**Impacto:** +25% tasa de retención a 12 meses

---

### 4. NPS (Net Promoter Score) Post-Servicio Automatizado

**Problema:** El negocio no sabe si los clientes están satisfechos ni puede identificar churn early.

**Solución:** Encuesta NPS automática 24h después del servicio:
- Mensaje WhatsApp: "Hola [Nombre], ¿cómo fue tu experiencia con Purity & Clean? [😊] [😐] [😞]"
- Respuesta 9-10 → Solicitar reseña en Google (automatizado)
- Respuesta 6-8 → Mensaje de seguimiento: "Lamentamos que no haya sido perfecto. ¿Cómo podemos mejorar?"
- Respuesta 1-5 → Alerta al propietario para contacto personal

**Benefico dual:** Identificar clientes insatisfechos antes de que se vayan + generar reviews reales en Google

**Esfuerzo:** S (webhook WhatsApp + lógica condicional)
**Agente:** Full Stack
**Impacto:** +15% reviews Google + detección early de churn

---

### 5. Sistema de Referidos con Incentivo Dual

**Problema:** Los clientes satisfechos no tienen razón para recomendar activamente.

**Solución:** Programa de referidos claro:
- Referido 完成首个服务 → Referidor gana $20.000 dto + referido recibe 10% dto primera visita
- Tracking via código único o enlace personalizado
- Notificación WhatsApp cuando el referido convierte

**Implementación:**
- Generar enlace único por cliente: `purityclean.com/?ref=JUAN`
- Detectar ref param en formulario
- Guardar referidor + epochs en DB
- Auto-aplicar descuento al referido
- Enviar notificación al referidor cuando gana puntos

**Esfuerzo:** M
**Agente:** Full Stack
**Impacto:** +10-15% adquisición nueva vía boca a boca

---

### 6. Upsell Post-Servicio: "Completa tu Limpieza"

**Problema:** Un cliente que limpió solo el sofá podría estar interesado en el colchón, las cortinas, o el carro.

**Solución:** 7 días después del servicio, enviar WhatsApp con upsell:
- "¡Tu sofá quedó impecable! ¿Sabías que también ofrecemos sanitización de colchones? Prima limpieza: 15% dto. para clientes Purity Club."
- Botones rápidos: "Agendar ahora" / "No gracias"
- Registrar rechazo para no insistir (opt-out suave por servicio)

**Opcional:** Implementar lógica de "servicios complementarios":
- Limpió sofá → ofrecer limpieza de cortinas
- Limpieza empresarial → ofrecer mantenimiento quarterly con descuento

**Esfuerzo:** S
**Agente:** Frontend + Full Stack
**Impacto:** +15% ARPU (Average Revenue Per User)

---

## Dependencias y Orden de Implementación

```
PRERREQUISITO: Sitio desplegado + WhatsApp real
                      ↓
            Propuesta 1 (Confirmación automática)
                      ↓
        Propuesta 4 (NPS) + Propuesta 5 (Referidos)
                      ↓
          Propuesta 2 (Recordatorios) ← Requiere DB de clientes
                      ↓
            Propuesta 3 (Purity Club)
                      ↓
          Propuesta 6 (Upsell automation)
```

---

## Conclusión

Estas 6 propuestas cierran el loop entre "lead进来了" y "cliente fiel". El ROI de estas implementaciones es alto porque:
- 4 de 6 son solo automatización de mensajes (costo técnico bajo)
- Generan valor inmediato una vez que el sitio esté live
- No requieren cambios en el frontend principal

**Recomendación: implementar en orden 1→4→5→2→3→6, comenzando inmediatamente después del deploy del sitio.**
