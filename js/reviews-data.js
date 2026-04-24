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

const GOOGLE_PLACES_INFO = {
  negocio: "Purity & Clean",
  lugarId: "ChIJk-sZ5jQwK4cRxxxxxxxxxx",
  rating: 4.8,
  cantidadResenas: 127,
  enlacePerfil: "https://g.page/purityclean/review",
  lastUpdated: "2024-11-20"
};

function renderGoogleReviews(containerSelector, maxReviews = 6) {
  const container = document.querySelector(containerSelector);
  if (!container) return;

  const reviews = GOOGLE_REVIEWS_DATA.slice(0, maxReviews);
  const fragment = document.createDocumentFragment();

  reviews.forEach((review, index) => {
    const article = document.createElement("article");
    article.className = "google-review-card";
    article.setAttribute("data-reveal-item", "");
    article.style.setProperty("--reveal-delay", `${index * 60}ms`);

    const fullStars = Math.floor(review.rating);
    const hasHalfStar = review.rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    let starsHtml = "";
    for (let i = 0; i < fullStars; i++) {
      starsHtml += '<i class="fa-solid fa-star" aria-hidden="true"></i>';
    }
    if (hasHalfStar) {
      starsHtml += '<i class="fa-solid fa-star-half-stroke" aria-hidden="true"></i>';
    }
    for (let i = 0; i < emptyStars; i++) {
      starsHtml += '<i class="fa-regular fa-star" aria-hidden="true"></i>';
    }

    article.innerHTML = `
      <div class="review-header">
        <div class="review-avatar" aria-hidden="true">${review.iniciales}</div>
        <div class="review-meta">
          <strong class="review-name">${review.nombre}</strong>
          <div class="review-stars" role="img" aria-label="${review.rating} estrellas de 5">
            ${starsHtml}
          </div>
          <time class="review-time" datetime="${review.fecha}">${review.relativeTime}</time>
        </div>
        ${review.googleBadge ? `
        <span class="google-review-badge" aria-hidden="true">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Google
        </span>
        ` : ""}
      </div>
      <p class="review-text">"${review.texto}"</p>
      ${review.servicio ? `<footer class="review-footer"><span class="review-tag">${review.servicio}</span></footer>` : ""}
    `;

    fragment.appendChild(article);
  });

  container.innerHTML = "";
  container.appendChild(fragment);

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

    container.querySelectorAll(".google-review-card").forEach((card) => {
      revealObserver.observe(card);
    });
  }
}

function actualizarContadorResenas() {
  const subhead = document.querySelector(".reviews-subhead");
  if (subhead && GOOGLE_PLACES_INFO.rating) {
    subhead.textContent = `${GOOGLE_PLACES_INFO.rating} de 5 estrellas basado en ${GOOGLE_PLACES_INFO.cantidadResenas} reseñas verificadas`;
  }
}

function initGoogleReviews() {
  renderGoogleReviews("#google-reviews-grid-dynamic");
  actualizarContadorResenas();
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