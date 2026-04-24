(function () {
  const zonaKey = document.documentElement.dataset.zona;
  if (!zonaKey || !ZONAS_DATA[zonaKey]) return;

  const zona = ZONAS_DATA[zonaKey];

  const heroBadge = document.querySelector(".zona-badge span");
  if (heroBadge) heroBadge.textContent = "Cobertura en " + zona.nombre;

  const heroTitle = document.querySelector(".zona-hero h1 .zona-highlight");
  if (heroTitle) heroTitle.textContent = zona.nombre;

  const heroSubtitle = document.querySelector(".zona-subtitle");
  if (heroSubtitle) {
    heroSubtitle.textContent =
      "Atencion personalizada para hogares y empresas en toda la zona de " +
      zona.nombre +
      ". Professionaux cerca de ti, con atencion directa y precios transparentes.";
  }

  document.querySelectorAll(".btn-primary").forEach(function (btn) {
    if (btn.href && btn.href.includes("#reservas")) {
      btn.innerHTML =
        '<i class="fa-solid fa-calendar-check" aria-hidden="true"></i> Agendar en ' + zona.nombre;
    }
  });

  var servicesSection = document.querySelector(".zona-services .section-head .eyebrow");
  if (servicesSection) servicesSection.textContent = "Servicios en " + zona.nombre;

  var cardsGrid = document.querySelector(".zona-cards-grid");
  if (cardsGrid) {
    cardsGrid.innerHTML = "";
    zona.services.forEach(function (svc, i) {
      var card = document.createElement("article");
      card.className = "zona-card";
      card.setAttribute("data-reveal", "");
      card.setAttribute("data-reveal-delay", String(i * 50));
      card.innerHTML =
        '<div class="zona-card-icon" aria-hidden="true"><i class="fa-solid ' +
        svc.icon +
        '"></i></div>' +
        "<h3>" +
        svc.titulo +
        "</h3>" +
        "<p>" +
        svc.descripcion +
        "</p>" +
        '<div class="zona-card-meta">' +
        '<span class="zona-price">' +
        svc.precio +
        '</span>' +
        '<span class="zona-time">' +
        svc.tiempo +
        "</span>" +
        "</div>" +
        '<a href="../../index.html#servicios" class="btn btn-sm">Ver detalles</a>';
      cardsGrid.appendChild(card);
    });
  }

  var trustEyebrow = document.querySelector(".zona-trust .section-head .eyebrow");
  if (trustEyebrow)
    trustEyebrow.textContent = "Por qué elegirnos en " + zona.nombre;

  var trustHeading = document.querySelector(".zona-trust .section-head h2");
  if (trustHeading) trustHeading.textContent = "Tu vecindario confia en nosotros";

  var trustItems = document.querySelectorAll(".zona-trust-item");
  if (trustItems.length >= 4) {
    trustItems[0].querySelector(".zona-trust-metric").textContent = zona.stats.clientes;
    trustItems[0].querySelector(".zona-trust-label").textContent =
      "clientes atendidos en " + zona.nombre;
    trustItems[1].querySelector(".zona-trust-metric").textContent = zona.stats.rating;
    trustItems[2].querySelector(".zona-trust-metric").textContent = zona.stats.responseRate + "%";
    trustItems[2].querySelector(".zona-trust-label").textContent =
      "de solicitudes respondidas en menos de 2 horas";
  }

  var whyEyebrow = document.querySelector(".zona-why .section-head .eyebrow");
  if (whyEyebrow) whyEyebrow.textContent = "Ventajas locales";

  var whyHeading = document.querySelector(".zona-why .section-head h2");
  if (whyHeading) whyHeading.textContent = "Atendinos cerca de " + zona.nombre;

  var whyItems = document.querySelectorAll(".zona-why-item p");
  if (whyItems.length >= 4) {
    whyItems[0].textContent =
      "Nuestras rutas de servicio estan optimizadas para " +
      zona.nombre +
      " y alrededores. Llegamos el mismo dia o dia siguiente.";
    whyItems[1].textContent =
      "Rangos de precio justos y transparentes. Sin costos ocultos ni recargos por distancia en " +
      zona.nombre +
      ".";
  }

  var ctaH2 = document.querySelector(".zona-cta-banner h2");
  if (ctaH2) ctaH2.textContent = "Listo para agendar tu servicio en " + zona.nombre + "?";

  var ctaLink = document.querySelector(".zona-cta-banner .btn-primary");
  if (ctaLink && ctaLink.href.includes("#reservas")) {
    ctaLink.innerHTML =
      '<i class="fa-solid fa-calendar-check" aria-hidden="true"></i> Reservar en ' + zona.nombre;
  }

  var cotEyebrow = document.querySelector(".zona-cotizacion-copy .eyebrow");
  if (cotEyebrow) cotEyebrow.textContent = "Solicita tu cotizacion";

  var cotH2 = document.querySelector(".zona-cotizacion-copy h2");
  if (cotH2) cotH2.textContent = "Solicita cotizacion en " + zona.nombre;

  var formH3 = document.querySelector(".zona-quote-form h3");
  if (formH3) formH3.textContent = "Solicita cotizacion en " + zona.nombre;

  var zonaInput = document.querySelector(".zona-quote-form input[name='zona']");
  if (zonaInput) zonaInput.value = zona.nombre;

  var formLabel = document.querySelector(".zona-quote-form");
  if (formLabel) formLabel.setAttribute("aria-label", "Formulario de cotizacion rapida en " + zona.nombre);

  var faqEyebrow = document.querySelector(".zona-faq .section-head .eyebrow");
  if (faqEyebrow) faqEyebrow.textContent = "Preguntas frecuentes";

  var faqH2 = document.querySelector(".zona-faq .section-head h2");
  if (faqH2) faqH2.textContent = "Preguntas sobre servicios en " + zona.nombre;

  var faqItems = document.querySelectorAll(".faq-item");
  if (faqItems.length === zona.faq.length) {
    faqItems.forEach(function (item, i) {
      item.querySelector(".faq-question span").textContent = zona.faq[i].pregunta;
      item.querySelector(".faq-answer p").textContent = zona.faq[i].respuesta;
    });
  }

  var whatsappFloat = document.querySelector(".whatsapp-float");
  if (whatsappFloat) whatsappFloat.setAttribute("data-whatsapp-zone", zonaKey);

  var footerText = document.querySelector(".site-footer > .container > p");
  if (footerText)
    footerText.textContent =
      "Purity & Clean - Servicios de limpieza profesional en " +
      zona.nombre +
      " y toda Bogotá.";

  var jsonLd = document.querySelector('script[type="application/ld+json"]');
  if (jsonLd) {
    try {
      var data = JSON.parse(jsonLd.textContent);
      data.name = "Purity & Clean - " + zona.nombre;
      data.url = zona.url;
      data.geo.latitude = zona.geo.lat;
      data.geo.longitude = zona.geo.lon;
      data.address.addressNeighborhood = zona.nombre;
      data.aggregateRating.reviewCount = String(zona.stats.clientes);
      jsonLd.textContent = JSON.stringify(data, null, 2);
    } catch (e) {}
  }

  document.title =
    "Servicios de Limpieza en " + zona.nombre + ", Bogotá | Purity & Clean";

  var metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc)
    metaDesc.setAttribute(
      "content",
      "Servicios profesionales de limpieza en " +
        zona.nombre +
        ", Bogotá. Limpieza de sofás, sanitización de colchones, mantenimiento de alfombras y más. Atención personalizada en tu zona."
    );

  var ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle)
    ogTitle.setAttribute("content", "Servicios de Limpieza en " + zona.nombre + ", Bogotá | Purity & Clean");

  var ogDesc = document.querySelector('meta[property="og:description"]');
  if (ogDesc)
    ogDesc.setAttribute("content", "Profesionales de limpieza en " + zona.nombre + ". Sofás, colchones, alfombras y más. Atención en toda la zona de " + zona.nombre + ".");

  var ogUrl = document.querySelector('meta[property="og:url"]');
  if (ogUrl) ogUrl.setAttribute("content", zona.url);

  var twitterTitle = document.querySelector('meta[name="twitter:title"]');
  if (twitterTitle)
    twitterTitle.setAttribute("content", "Servicios de Limpieza en " + zona.nombre + ", Bogotá | Purity & Clean");

  var twitterDesc = document.querySelector('meta[name="twitter:description"]');
  if (twitterDesc)
    twitterDesc.setAttribute("content", "Profesionales de limpieza en " + zona.nombre + ". Sofás, colchones, alfombras y más.");

  var canonical = document.querySelector('link[rel="canonical"]');
  if (canonical) canonical.setAttribute("href", zona.url);

  var alternateLink = document.querySelector('link[rel="alternate"][hreflang="es"]');
  if (alternateLink) alternateLink.setAttribute("href", zona.url);
  var alternateLinkCo = document.querySelector('link[rel="alternate"][hreflang="es-co"]');
  if (alternateLinkCo) alternateLinkCo.setAttribute("href", zona.url);

  if (typeof initRevealObserver === "function") {
    initRevealObserver();
  }
})();