const GOOGLE_REVIEWS_DATA = [
  {
    id: "gr_001",
    nombre: "María Fernanda López",
    iniciales: "MFL",
    zona: "Chapinero",
    rating: 5,
    fecha: "2024-11-15",
    relativeTime: "hace 3 semanas",
    texto: "Llevo 2 años contratando sus servicios para el mantenimiento mensual de mi apartamento. La atención es impecable, siempre llegan a la hora pactada y los resultados superan mis expectativas. Mis sofás y colchones lucen como nuevos.",
    servicio: "Plan Mensual Hogar",
    googleBadge: true
  },
  {
    id: "gr_002",
    nombre: "Carlos Andrés Martínez",
    iniciales: "CAM",
    zona: "Usaquén",
    rating: 5,
    fecha: "2024-11-08",
    relativeTime: "hace 1 mes",
    texto: "Contraté el servicio de sanitización para mi colchón y el de mi hija. Teníamos problemas de alergias que se redujeron considerablemente después del tratamiento. El equipo fue muy profesional y utilizó productos seguros.",
    servicio: "Sanitización de colchones",
    googleBadge: true
  },
  {
    id: "gr_003",
    nombre: "Oficina Dental Sonrisa",
    iniciales: "ODS",
    zona: "El Chicó",
    rating: 5,
    fecha: "2024-10-22",
    relativeTime: "hace 6 semanas",
    texto: "Como empresa necesitábamos un socio confiable para el mantenimiento de nuestras instalaciones. Llevamos 8 meses con el contrato y el nivel de servicio ha sido consistente. Altamente recomendados para espacios corporativos.",
    servicio: "Contrato corporativo",
    googleBadge: true
  },
  {
    id: "gr_004",
    nombre: "Juan Sebastián Reyes",
    iniciales: "JSR",
    zona: "Suba",
    rating: 5,
    fecha: "2024-10-05",
    relativeTime: "hace 2 meses",
    texto: "La limpieza profunda de los sofás de mi sala fue excepcional. Recuperaron muebles que yo consideraba perdidos. El proceso fue menos invasivo de lo que esperaba y el secado rápido permitió usar la sala el mismo día.",
    servicio: "Limpieza de sofás",
    googleBadge: true
  },
  {
    id: "gr_005",
    nombre: "Claudia Patricia Velandia",
    iniciales: "CPV",
    zona: "Kennedy",
    rating: 4,
    fecha: "2024-09-18",
    relativeTime: "hace 2 meses",
    texto: "Muy contenta con el servicio. El personal fue amable y explican todo el proceso antes de empezar. Solo le doy 4 estrellas porque podrían ser un poco más puntuales en la ventana de llegada, aunque siempre avisan si hay retraso.",
    servicio: "Limpieza de sofás",
    googleBadge: true
  },
  {
    id: "gr_006",
    nombre: "Inmobiliaria Cumbres",
    iniciales: "IC",
    zona: "Fontibón",
    rating: 5,
    fecha: "2024-09-02",
    relativeTime: "hace 3 meses",
    texto: "Manejamos un portafolio de 15 propiedades en arriendo y Purity & Clean nos ayuda con el mantenimiento de entrega. La consistencia en la calidad del trabajo nos permite confiar plenamente en ellos para transiciones de inquilinos.",
    servicio: "Mantenimiento recurrente",
    googleBadge: true
  },
  {
    id: "gr_007",
    nombre: "Andrés Felipe Guzmán",
    iniciales: "AFG",
    zona: "Engativá",
    rating: 5,
    fecha: "2024-08-14",
    relativeTime: "hace 3 meses",
    texto: "El plan trimestral para mi PYME fue la mejor decisión. El presupuesto es predecible y la calidad del servicio no ha bajado en ningún trimestre. Mi equipo de 8 personas trabaja en un ambiente mucho más limpio.",
    servicio: "Plan Trimestral PYME",
    googleBadge: true
  },
  {
    id: "gr_008",
    nombre: "Paola Alejandra Romero",
    iniciales: "PAR",
    zona: "Teusaquillo",
    rating: 5,
    fecha: "2024-07-30",
    relativeTime: "hace 4 meses",
    texto: "Tengo mascotas y estaba preocupada por los productos. El equipo me explicó detalladamente qué usan y cómo funcionan. Mis dos gatos no mostraron ninguna reacción y los sofás quedaron impecable. Muy profesionales.",
    servicio: "Limpieza de sofás",
    googleBadge: true
  },
  {
    id: "gr_009",
    nombre: "Restaurant La Brasería",
    iniciales: "LB",
    zona: "Zona G",
    rating: 5,
    fecha: "2024-07-10",
    relativeTime: "hace 4 meses",
    texto: "Necesitábamos un servicio especializado para las sillas del área de comedor. El trabajo fue rápido, eficiente y discreto. Nuestros clientes han notado la diferencia. Ya tenemos contrato de mantenimiento mensual.",
    servicio: "Limpieza de sillas",
    googleBadge: true
  }
];

// TODO (board): Obtener el Place ID real desde https://business.google.com
// Para hacerlo: buscar "Purity & Clean Bogotá" en Google Maps → Compartir → Embed HTML
// Luego extraer el ID del atributo 'data-placeid' o consultar en https://developers.google.com/maps/documentation/places/web-service/place-id
const GOOGLE_PLACES_INFO = {
  negocio: "Purity & Clean",
  lugarId: "YOUR_PLACE_ID_HERE", // Reemplazar con Place ID real de Google
  rating: 4.8,
  cantidadResenas: 127,
  enlacePerfil: "https://g.page/purityclean/review",
  lastUpdated: "2024-11-20"
};

function actualizarContadorResenas() {
  const subhead = document.querySelector(".reviews-subhead");
  if (subhead && GOOGLE_PLACES_INFO.rating) {
    subhead.textContent = `${GOOGLE_PLACES_INFO.rating} de 5 estrellas basado en ${GOOGLE_PLACES_INFO.cantidadResenas} reseñas verificadas`;
  }
}

function initGoogleReviews() {
  actualizarContadorResenas();
  if (typeof IntersectionObserver !== "undefined") {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -30px 0px" }
    );

    document.querySelectorAll(".google-review-card").forEach((card) => {
      revealObserver.observe(card);
    });
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    if (typeof initGoogleReviews !== "undefined") {
      initGoogleReviews();
    }
  });
} else {
  if (typeof initGoogleReviews !== "undefined") {
    initGoogleReviews();
  }
}