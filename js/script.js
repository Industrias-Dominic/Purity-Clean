(function() {
  var script = document.createElement("script");
  script.src = "config.js";
  script.async = false;
  document.head.appendChild(script);
})();
const menuToggle = document.querySelector(".menu-toggle");
const menu = document.querySelector(".menu");
const searchInput = document.querySelector("#search-input");
const searchStatus = document.querySelector("#search-status");
const searchableItems = [...document.querySelectorAll(".searchable-item")];
const themeToggle = document.querySelector(".theme-toggle");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");

function setTheme(dark) {
  document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
  themeToggle.setAttribute("aria-pressed", String(dark));
  localStorage.setItem("theme", dark ? "dark" : "light");
  const icon = themeToggle.querySelector("i");
  icon.className = dark ? "fa-solid fa-sun" : "fa-solid fa-moon";
}

const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  setTheme(savedTheme === "dark");
} else {
  setTheme(prefersDark.matches);
}

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-theme");
    setTheme(current !== "dark");
  });
}

if (menuToggle && menu) {
  menuToggle.addEventListener("click", () => {
    const expanded = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!expanded));
    menu.classList.toggle("open");
  });
}

function normalizeText(value) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function updateSearchResults(query) {
  const cleanQuery = normalizeText(query.trim());
  let visibleCount = 0;

  searchableItems.forEach((item) => {
    const fields = [
      item.dataset.name || "",
      item.dataset.type || "",
      item.dataset.segment || "",
      item.textContent || "",
    ];
    const content = normalizeText(fields.join(" "));
    const matches = !cleanQuery || content.includes(cleanQuery);
    item.classList.toggle("hidden", !matches);
    if (matches) visibleCount += 1;
  });

  if (!searchStatus) return;

  if (!cleanQuery) {
    searchStatus.textContent = "Muestra todos los servicios y productos disponibles.";
    return;
  }

  if (visibleCount === 0) {
    searchStatus.textContent = "No se encontraron coincidencias. Intenta con otro termino.";
    return;
  }

  searchStatus.textContent = `Se encontraron ${visibleCount} resultado(s) para "${query.trim()}".`;
}

function trackEvent(eventName, props) {
  if (typeof plausible !== "undefined") {
    plausible(eventName, props);
  }
}

if (searchInput) {
  searchInput.addEventListener("input", (event) => {
    updateSearchResults(event.target.value);
  });
  searchInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && searchInput.value.trim()) {
      trackEvent("search_submitted", { props: { query: searchInput.value.trim() } });
    }
  });
}

document.querySelectorAll('a[href*="wa.me"]').forEach((link) => {
  link.addEventListener("click", () => {
    trackEvent("WhatsApp_click", { props: { location: link.closest("section, footer")?.id || "unknown" } });
  });
});

let maxScrollDepth = 0;
window.addEventListener("scroll", () => {
  const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
  if (scrollHeight <= 0) return;
  const depth = Math.round((window.scrollY / scrollHeight) * 100);
  if (depth > maxScrollDepth) {
    maxScrollDepth = depth;
    if (depth >= 90) {
      trackEvent("scroll_depth", { props: { depth: 90 } });
    } else if (depth >= 50) {
      trackEvent("scroll_depth", { props: { depth: 50 } });
    }
  }
}, { passive: true });

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.counter, 10);
        const hasDecimal = el.dataset.decimal === "8";
        let current = 0;
        const increment = target / 40;
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          el.textContent = hasDecimal ? current.toFixed(1) : Math.floor(current);
        }, 40);

        const card = el.closest(".stats-card");
        if (card) {
          const bar = card.querySelector(".stats-card-bar-fill");
          if (bar) {
            setTimeout(() => bar.classList.add("animated"), 200);
          }
        }

        counterObserver.unobserve(el);
      }
    });
  },
  { threshold: 0.5 }
);

document.querySelectorAll("[data-counter]").forEach((el) => {
  counterObserver.observe(el);
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
        const children = entry.target.querySelectorAll("[data-reveal-item]");
        children.forEach((child) => child.classList.add("revealed"));
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
);

document.querySelectorAll("[data-reveal]").forEach((el) => {
  revealObserver.observe(el);
});

function initBookingForm() {
  if (!bookingForm) return;

  const nameInput = bookingForm.querySelector("#booking-name");
  const emailInput = bookingForm.querySelector("#booking-email");
  const phoneInput = bookingForm.querySelector("#booking-phone");
  const serviceInput = bookingForm.querySelector("#booking-service");
  const dateInput = bookingForm.querySelector("#booking-date");
  const timeInput = bookingForm.querySelector("#booking-time");
  const addressInput = bookingForm.querySelector("#booking-address");
  const geoBtn = bookingForm.querySelector("#booking-geo-btn");
  const geoStatus = bookingForm.querySelector("#geo-status");
  const prevBtn = bookingForm.querySelector("#booking-prev-btn");
  const nextBtn = bookingForm.querySelector("#booking-next-btn");
  const submitBtn = bookingForm.querySelector("#booking-submit-btn");

  const params = new URLSearchParams(window.location.search);
  const preselectedService = params.get("service");
  if (preselectedService && serviceInput) {
    serviceInput.value = preselectedService;
  }

  const today = new Date();
  today.setDate(today.getDate() + 1);
  const minDate = today.toISOString().split("T")[0];
  if (dateInput) dateInput.setAttribute("min", minDate);

  let currentStep = 1;
  const totalSteps = 3;

  function updateStepper(step) {
    const steps = bookingForm.closest(".booking-form-wrapper").querySelectorAll(".stepper-step");
    const connectors = bookingForm.closest(".booking-form-wrapper").querySelectorAll(".stepper-connector");

    steps.forEach((s, i) => {
      const stepNum = i + 1;
      s.classList.remove("active", "completed");
      if (stepNum === step) {
        s.classList.add("active");
        s.setAttribute("aria-current", "step");
      } else if (stepNum < step) {
        s.classList.add("completed");
        s.removeAttribute("aria-current");
      } else {
        s.removeAttribute("aria-current");
      }
    });

    connectors.forEach((c, i) => {
      c.classList.toggle("filled", i < step - 1);
    });
  }

  function showStepFields(step) {
    bookingForm.querySelectorAll(".booking-fields").forEach((group) => {
      group.hidden = true;
    });
    const target = bookingForm.querySelector(`[data-step-group="${step}"]`);
    if (target) target.hidden = false;
  }

  function validateStep(step) {
    let valid = true;
    const fields = {
      1: [nameInput, phoneInput, emailInput],
      2: [serviceInput, dateInput, timeInput],
      3: [addressInput]
    };
    const stepFields = fields[step] || [];
    stepFields.forEach((input) => {
      if (!input) return;
      if (!validateBookingField(input)) valid = false;
    });
    return valid;
  }

  function updateNavButtons() {
    if (!prevBtn || !nextBtn || !submitBtn) return;
    prevBtn.hidden = currentStep === 1;
    if (currentStep === totalSteps) {
      nextBtn.hidden = true;
      submitBtn.hidden = false;
    } else {
      nextBtn.hidden = false;
      submitBtn.hidden = true;
    }
  }

  updateStepper(currentStep);
  showStepFields(currentStep);
  updateNavButtons();

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      if (!validateStep(currentStep)) return;
      if (currentStep < totalSteps) {
        currentStep++;
        updateStepper(currentStep);
        showStepFields(currentStep);
        updateNavButtons();
        const firstInput = bookingForm.querySelector(`[data-step-group="${currentStep}"] input, [data-step-group="${currentStep}"] select`);
        if (firstInput) firstInput.focus();
      }
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      if (currentStep > 1) {
        currentStep--;
        updateStepper(currentStep);
        showStepFields(currentStep);
        updateNavButtons();
      }
    });
  }

  const fieldMap = [nameInput, emailInput, phoneInput, serviceInput, dateInput, timeInput, addressInput];

  fieldMap.forEach((input) => {
    if (!input) return;
    input.addEventListener("blur", () => validateBookingField(input));
    input.addEventListener("input", () => {
      if (input.classList.contains("error")) validateBookingField(input);
    });
  });

  function triggerConfetti() {
    const canvas = bookingForm.parentElement.querySelector(".success-canvas");
    if (!canvas) return;
    const colors = ["#16a34a", "#22c55e", "#0b7189", "#14a9ca", "#f59e0b", "#ef4444", "#8b5cf6"];
    for (let i = 0; i < 50; i++) {
      const piece = document.createElement("div");
      piece.className = "confetti-piece";
      piece.style.left = Math.random() * 100 + "%";
      piece.style.top = Math.random() * 30 + "%";
      piece.style.background = colors[Math.floor(Math.random() * colors.length)];
      piece.style.animationDelay = Math.random() * 0.5 + "s";
      piece.style.animationDuration = 1 + Math.random() * 0.8 + "s";
      canvas.appendChild(piece);
      setTimeout(() => piece.remove(), 2000);
    }
  }

  function showSuccessAnimation() {
    const successEl = document.querySelector("#booking-success");
    if (!successEl) return;
    successEl.hidden = false;
    successEl.classList.add("animate");
    triggerConfetti();
    successEl.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  bookingForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!validateStep(currentStep)) return;

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin" aria-hidden="true"></i> Enviando...';
    }

    const formData = new FormData(bookingForm);

    if (bookingForm.action.includes("REPLACE_ME")) {
      const name = formData.get("name") || "";
      const service = formData.get("service") || "";
      const date = formData.get("date") || "";
      const time = formData.get("time") || "";
      const msg = encodeURIComponent(
        `Hola, me gustaría agendar un servicio.\nNombre: ${name}\nServicio: ${service}\nFecha: ${date} ${time}`
      );
      const base = WHATSAPP_CONFIG.numero;
      window.open(`https://wa.me/${base}?text=${msg}`, "_blank");
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="fa-solid fa-calendar-check" aria-hidden="true"></i> Confirmar Reserva';
      }
      return;
    }

    fetch(bookingForm.action, {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) throw new Error("Form submission failed");
        bookingForm.hidden = true;
        document.querySelector(".booking-stepper")?.remove();
        showSuccessAnimation();
        trackEvent("booking_submitted", {
          props: {
            service: serviceInput?.value || "",
            date: dateInput?.value || "",
            time: timeInput?.value || "",
          },
        });
      })
      .catch(() => {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = '<i class="fa-solid fa-calendar-check" aria-hidden="true"></i> Confirmar Reserva';
        }
      });
  });

  if (geoBtn && addressInput && geoStatus) {
    geoBtn.addEventListener("click", () => {
      if (!navigator.geolocation) {
        geoStatus.textContent = "Geolocalización no disponible en este navegador.";
        geoStatus.className = "geo-status error";
        return;
      }
      geoBtn.classList.add("loading");
      geoBtn.querySelector("i").className = "fa-solid fa-circle-notch fa-spin";
      geoStatus.textContent = "Obteniendo ubicación...";
      geoStatus.className = "geo-status";

      navigator.geolocation.getCurrentPosition(
        (pos) => {
          geoBtn.classList.remove("loading");
          geoBtn.querySelector("i").className = "fa-solid fa-location-crosshairs";
          const lat = pos.coords.latitude.toFixed(6);
          const lon = pos.coords.longitude.toFixed(6);
          addressInput.value = `${lat}, ${lon}`;
          geoStatus.textContent = "Ubicación obtaineda. Confirma que la dirección es correcta.";
          geoStatus.className = "geo-status success";
          setTimeout(() => { geoStatus.textContent = ""; }, 4000);
          trackEvent("booking_geo_used");
        },
        (err) => {
          geoBtn.classList.remove("loading");
          geoBtn.querySelector("i").className = "fa-solid fa-location-crosshairs";
          let msg = "No se pudo obtener la ubicación.";
          if (err.code === 1) msg = "Permiso de ubicación denegado.";
          else if (err.code === 2) msg = "Ubicación no disponible.";
          else if (err.code === 3) msg = "Tiempo de espera agotado.";
          geoStatus.textContent = msg;
          geoStatus.className = "geo-status error";
          setTimeout(() => { geoStatus.textContent = ""; }, 5000);
        },
        { enableHighAccuracy: true, timeout: 10000 }
      );
    });
  }

  if (bookingResetBtn) {
    bookingResetBtn.addEventListener("click", () => {
      bookingForm.reset();
      bookingForm.hidden = false;
      const successEl = document.querySelector("#booking-success");
      if (successEl) {
        successEl.hidden = true;
        successEl.classList.remove("animate");
      }
      currentStep = 1;
      updateStepper(currentStep);
      showStepFields(currentStep);
      updateNavButtons();
      const stepperHtml = `<div class="booking-stepper" role="list" aria-label="Progreso de la reserva">
        <div class="stepper-step" data-step="1" role="listitem" aria-current="step" aria-label="Paso 1: Tus datos">
          <div class="stepper-indicator"><span class="stepper-num">1</span><span class="stepper-check" aria-hidden="true"><i class="fa-solid fa-check"></i></span></div>
          <span class="stepper-label">Tus datos</span>
        </div>
        <div class="stepper-connector" aria-hidden="true"></div>
        <div class="stepper-step" data-step="2" role="listitem" aria-label="Paso 2: Servicio">
          <div class="stepper-indicator"><span class="stepper-num">2</span><span class="stepper-check" aria-hidden="true"><i class="fa-solid fa-check"></i></span></div>
          <span class="stepper-label">Servicio</span>
        </div>
        <div class="stepper-connector" aria-hidden="true"></div>
        <div class="stepper-step" data-step="3" role="listitem" aria-label="Paso 3: Dirección">
          <div class="stepper-indicator"><span class="stepper-num">3</span><span class="stepper-check" aria-hidden="true"><i class="fa-solid fa-check"></i></span></div>
          <span class="stepper-label">Dirección</span>
        </div>
      </div>`;
      const wrapper = bookingForm.closest(".booking-form-wrapper");
      const existing = wrapper.querySelector(".booking-stepper");
      if (existing) existing.remove();
      bookingForm.insertAdjacentHTML("beforebegin", stepperHtml);
    });
  }
}

function validateBookingField(input) {
  const value = input.value.trim();
  const errorEl = input.parentElement.querySelector(".field-error");
  if (input.required && !value) {
    input.classList.add("error");
    if (errorEl) errorEl.textContent = "Este campo es obligatorio.";
    return false;
  }
  if (input.type === "email" && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    input.classList.add("error");
    if (errorEl) errorEl.textContent = "Ingresa un correo electrónico válido.";
    return false;
  }
  if (input.type === "tel" && value && !/^[\+]?[\d\s\-().]{7,15}$/.test(value.replace(/\s/g, ""))) {
    input.classList.add("error");
    if (errorEl) errorEl.textContent = "Ingresa un número de teléfono válido.";
    return false;
  }
  if (input.type === "date" && value) {
    const selected = new Date(value);
    const today2 = new Date();
    today2.setHours(0, 0, 0, 0);
    if (selected < today2) {
      input.classList.add("error");
      if (errorEl) errorEl.textContent = "La fecha debe ser hoy o posterior.";
      return false;
    }
  }
  input.classList.remove("error");
  if (errorEl) errorEl.textContent = "";
  return true;
}

const leadForm = document.querySelector("#lead-form");
const formSuccess = document.querySelector("#form-success");

function getFieldError(input) {
  return input.parentElement.querySelector(".field-error");
}

function showFieldError(input, message) {
  input.classList.add("error");
  const errorEl = getFieldError(input);
  if (errorEl) errorEl.textContent = message;
}

function clearFieldError(input) {
  input.classList.remove("error");
  const errorEl = getFieldError(input);
  if (errorEl) errorEl.textContent = "";
}

function validateEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

function validatePhone(value) {
  return /^[\+]?[\d\s\-().]{7,15}$/.test(value.trim().replace(/\s/g, ""));
}

function validateField(input) {
  const value = input.value.trim();
  if (input.required && !value) {
    showFieldError(input, "Este campo es obligatorio.");
    return false;
  }
  if (input.type === "email" && value && !validateEmail(value)) {
    showFieldError(input, "Ingresa un correo electronico valido.");
    return false;
  }
  if (input.type === "tel" && value && !validatePhone(value)) {
    showFieldError(input, "Ingresa un numero de telefono valido.");
    return false;
  }
  clearFieldError(input);
  return true;
}

if (leadForm) {
  const nameInput = leadForm.querySelector("#lead-name");
  const emailInput = leadForm.querySelector("#lead-email");
  const phoneInput = leadForm.querySelector("#lead-phone");
  const typeInput = leadForm.querySelector("#lead-type");

  [nameInput, emailInput, phoneInput, typeInput].forEach((input) => {
    if (!input) return;
    input.addEventListener("blur", () => validateField(input));
    input.addEventListener("input", () => {
      if (input.classList.contains("error")) validateField(input);
    });
  });

  leadForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const isName = validateField(nameInput);
    const isEmail = validateField(emailInput);
    const isPhone = validateField(phoneInput);
    const isType = validateField(typeInput);
    if (!isName || !isEmail || !isPhone || !isType) return;

    const submitBtn = leadForm.querySelector(".btn-submit");
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin" aria-hidden="true"></i> Enviando...';
    }

    setTimeout(() => {
      leadForm.hidden = true;
      if (formSuccess) formSuccess.hidden = false;
    }, 1200);
  });
}

document.querySelectorAll(".btn-primary[data-track-cta], .btn[href='#contacto']").forEach((btn) => {
  btn.addEventListener("click", () => {
    const cta = btn.dataset.trackCta || btn.textContent.trim();
    trackEvent("CTA_Click", { props: { cta, location: btn.dataset.trackCta || btn.closest("section")?.id || "unknown" } });
  });
});

document.querySelectorAll(".pricing-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const card = btn.closest(".pricing-card");
    const segment = card?.classList.contains("pricing-card--plans")
      ? "plans"
      : card?.classList.contains("pricing-card--enterprise")
      ? "enterprise"
      : "homes";
    const cta = btn.textContent.trim();
    trackEvent("pricing_cta_click", { props: { cta, segment } });
  });
});

document.querySelectorAll(".searchable-item").forEach((item) => {
  item.querySelector("a.btn")?.addEventListener("click", () => {
    trackEvent("Service_Product_Click", { props: { item: item.dataset.name } });
  });

  item.addEventListener("click", (e) => {
    const rect = item.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    item.style.setProperty("--ripple-x", x + "%");
    item.style.setProperty("--ripple-y", y + "%");
    item.classList.remove("rippling");
    void item.offsetWidth;
    item.classList.add("rippling");
    setTimeout(() => item.classList.remove("rippling"), 600);
  });
});

const STORAGE_KEY_COUPON = "purity_referral_coupon";

function generateCouponCode(nombre) {
  const timestamp = Date.now().toString(36).toUpperCase();
  const randomSufix = Math.floor(Math.random() * 900 + 100).toString();
  const clean = nombre.trim().toUpperCase().replace(/\s+/g, "").slice(0, 8);
  return clean + "15" + randomSufix;
}

function buildWhatsAppUrl(couponCode, nombre) {
  const numero = WHATSAPP_CONFIG.numero;
  const texto = encodeURIComponent(
    `¡Hola! Soy ${nombre} y te recomiendo Purity & Clean. Usa mi código \`${couponCode}\` y obtén 15% de descuento en tu primera limpieza. https://purityclean.com/#contacto`
  );
  return `https://wa.me/${numero}?text=${texto}`;
}

function getWhatsAppUrl(zonaKey) {
  const base = WHATSAPP_CONFIG.numero;
  const mensaje = WHATSAPP_CONFIG.zonas[zonaKey] || WHATSAPP_CONFIG.mensajePorDefecto;
  return `https://wa.me/${base}?text=${mensaje}`;
}

function showReferidosResult(couponCode) {
  const formContainer = document.getElementById("referidos-form-container");
  const resultEl = document.getElementById("referidos-result");
  const existingEl = document.getElementById("referidos-existing");

  if (formContainer) formContainer.hidden = true;
  if (existingEl) existingEl.hidden = true;
  if (resultEl) {
    resultEl.hidden = false;
    const codeEl = document.getElementById("coupon-code");
    if (codeEl) codeEl.textContent = couponCode;
    const card = resultEl.querySelector(".coupon-card");
    if (card) {
      card.classList.remove("coupon-animated");
      void card.offsetWidth;
      card.classList.add("coupon-animated");
    }
  }

  const shareBtn = document.getElementById("share-whatsapp-btn");
  if (shareBtn) {
    shareBtn.addEventListener("click", () => {
      const nombre = document.getElementById("referido-nombre")?.value.trim() || "";
      window.open(buildWhatsAppUrl(couponCode, nombre), "_blank", "noopener,noreferrer");
      trackEvent("referral_shared_whatsapp");
    });
  }
}

function showExistingCoupon(couponData) {
  const formContainer = document.getElementById("referidos-form-container");
  const resultEl = document.getElementById("referidos-result");
  const existingEl = document.getElementById("referidos-existing");

  if (formContainer) formContainer.hidden = true;
  if (resultEl) resultEl.hidden = true;
  if (existingEl) {
    existingEl.hidden = false;
    const codeEl = document.getElementById("existing-coupon-code");
    if (codeEl) codeEl.textContent = couponData.code;
  }

  const shareBtn = document.getElementById("share-existing-btn");
  if (shareBtn) {
    shareBtn.addEventListener("click", () => {
      window.open(buildWhatsAppUrl(couponData.code, couponData.nombre), "_blank", "noopener,noreferrer");
      trackEvent("referral_shared_whatsapp");
    });
  }
}

function validateReferidoNombre(input) {
  const value = input.value.trim();
  const errorEl = document.getElementById("referido-nombre-error");
  if (!value) {
    input.classList.add("error");
    if (errorEl) errorEl.textContent = "Ingresa tu nombre.";
    return false;
  }
  if (value.length < 2) {
    input.classList.add("error");
    if (errorEl) errorEl.textContent = "El nombre debe tener al menos 2 caracteres.";
    return false;
  }
  if (value.length > 30) {
    input.classList.add("error");
    if (errorEl) errorEl.textContent = "El nombre no puede superar 30 caracteres.";
    return false;
  }
  if (!/^[a-zA-Z\s]+$/.test(value)) {
    input.classList.add("error");
    if (errorEl) errorEl.textContent = "Solo se permiten letras y espacios.";
    return false;
  }
  input.classList.remove("error");
  if (errorEl) errorEl.textContent = "";
  return true;
}

function initReferidos() {
  const stored = localStorage.getItem(STORAGE_KEY_COUPON);
  if (stored) {
    try {
      const data = JSON.parse(stored);
      if (data.code && data.nombre) {
        showExistingCoupon(data);
        return;
      }
    } catch (_) {}
  }

  const form = document.getElementById("referidos-form");
  const nombreInput = document.getElementById("referido-nombre");

  if (nombreInput) {
    nombreInput.addEventListener("input", () => {
      if (nombreInput.classList.contains("error")) validateReferidoNombre(nombreInput);
    });
    nombreInput.addEventListener("blur", () => validateReferidoNombre(nombreInput));
  }

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!validateReferidoNombre(nombreInput)) return;

      const nombre = nombreInput.value.trim();
      const code = generateCouponCode(nombre);
      const couponData = { code, nombre };
      localStorage.setItem(STORAGE_KEY_COUPON, JSON.stringify(couponData));

      showReferidosResult(code);
      trackEvent("referral_code_generated");
    });
  }

  document.querySelectorAll("#copy-coupon-btn, #copy-existing-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const container = btn.closest(".coupon-card");
      const codeEl = container?.querySelector(".coupon-code");
      if (!codeEl) return;
      const code = codeEl.textContent || "";
      navigator.clipboard.writeText(code).then(() => {
        const feedback = container.querySelector(".copy-feedback");
        if (feedback) {
          feedback.hidden = false;
          setTimeout(() => { feedback.hidden = true; }, 2000);
        }
      }).catch(() => {
        const ta = document.createElement("textarea");
        ta.value = code;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
        const feedback = container.querySelector(".copy-feedback");
        if (feedback) {
          feedback.hidden = false;
          setTimeout(() => { feedback.hidden = true; }, 2000);
        }
      });
    });
  });
}

function initBookingPreselect() {
  const bookingLinks = document.querySelectorAll("a[href='#reservas']");
  bookingLinks.forEach((link) => {
    link.addEventListener("click", () => {
      const card = link.closest(".searchable-item");
      const serviceValue = card?.dataset.bookingService;
      if (!serviceValue) return;
      const params = new URLSearchParams();
      params.set("service", serviceValue);
      const newUrl = `${window.location.pathname}#reservas?${params.toString()}`;
      history.replaceState(null, "", newUrl);
    });
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    initReferidos();
    initBookingForm();
    initBookingPreselect();
  });
} else {
  initReferidos();
  initBookingForm();
  initBookingPreselect();
}

function initComparisonSliders() {
  const sliders = document.querySelectorAll(".comparison-slider");
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function updateSlider(slider, range, beforeWrap, val, animate) {
    val = Math.max(0, Math.min(100, val));
    if (animate && !prefersReducedMotion) {
      beforeWrap.style.transition = "width 0.4s cubic-bezier(0.4, 0, 0.2, 1)";
    } else {
      beforeWrap.style.transition = "none";
    }
    beforeWrap.style.width = val + "%";
    range.value = val;
    range.setAttribute("aria-valuenow", Math.round(val));
    range.setAttribute("aria-valuetext", Math.round(val) + "% antes");
    const handle = slider.querySelector(".comparison-handle");
    if (handle) handle.style.left = val + "%";
  }

  sliders.forEach((slider) => {
    const range = slider.querySelector(".comparison-range");
    const beforeWrap = slider.querySelector(".comparison-before-wrap");
    if (!range || !beforeWrap) return;

    let isDragging = false;

    function onPointerDown(e) {
      if (e.pointerType === "touch") {
        isDragging = true;
        slider.setPointerCapture(e.pointerId);
      } else {
        isDragging = true;
      }
    }

    function onPointerMove(e) {
      if (!isDragging) return;
      const rect = slider.getBoundingClientRect();
      const x = e.clientX - rect.left;
      updateSlider(slider, range, beforeWrap, (x / rect.width) * 100, false);
    }

    function onPointerUp() {
      isDragging = false;
    }

    slider.addEventListener("pointerdown", onPointerDown);
    slider.addEventListener("pointermove", onPointerMove);
    slider.addEventListener("pointerup", onPointerUp);
    slider.addEventListener("pointercancel", onPointerUp);

    range.addEventListener("keydown", (e) => {
      const step = e.shiftKey ? 10 : 1;
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        updateSlider(slider, range, beforeWrap, parseFloat(range.value) - step, true);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        updateSlider(slider, range, beforeWrap, parseFloat(range.value) + step, true);
      }
    });

    range.addEventListener("input", () => {
      updateSlider(slider, range, beforeWrap, parseFloat(range.value), false);
    });

    const autoplayBtn = document.createElement("button");
    autoplayBtn.className = "comparison-autoplay";
    autoplayBtn.type = "button";
    autoplayBtn.setAttribute("aria-label", "Reproducir comparación automática");
    autoplayBtn.innerHTML = '<i class="fa-solid fa-play" aria-hidden="true"></i>';
    slider.appendChild(autoplayBtn);

    let autoplayInterval = null;
    let autoplayDir = 1;
    let autoplayStartedByObserver = false;

    function startAutoplay() {
      if (prefersReducedMotion) return;
      autoplayBtn.innerHTML = '<i class="fa-solid fa-pause" aria-hidden="true"></i>';
      autoplayBtn.setAttribute("aria-label", "Pausar comparación automática");
      autoplayInterval = setInterval(() => {
        let val = parseFloat(range.value);
        val += autoplayDir * 0.5;
        if (val >= 100) { val = 100; autoplayDir = -1; }
        if (val <= 0) { val = 0; autoplayDir = 1; }
        updateSlider(slider, range, beforeWrap, val, true);
      }, 30);
    }

    function stopAutoplay() {
      clearInterval(autoplayInterval);
      autoplayInterval = null;
      autoplayBtn.innerHTML = '<i class="fa-solid fa-play" aria-hidden="true"></i>';
      autoplayBtn.setAttribute("aria-label", "Reproducir comparación automática");
    }

    function stopAutoplayAndBlock() {
      stopAutoplay();
      autoplayStartedByObserver = false;
    }

    autoplayBtn.addEventListener("click", () => {
      if (autoplayInterval) {
        stopAutoplayAndBlock();
      } else {
        startAutoplay();
      }
    });

    range.addEventListener("focus", () => { stopAutoplay(); });
    range.addEventListener("pointerdown", () => { stopAutoplayAndBlock(); });

    if (!prefersReducedMotion) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !autoplayStartedByObserver) {
            autoplayStartedByObserver = true;
            startAutoplay();
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.5 });

      observer.observe(slider);
    }

    updateSlider(slider, range, beforeWrap, 50, false);
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initComparisonSliders);
} else {
  initComparisonSliders();
}

const NEWSLETTER_STORAGE_KEY = "purity_newsletter_subscribed";

function initNewsletter() {
  if (localStorage.getItem(NEWSLETTER_STORAGE_KEY)) {
    const form = document.getElementById("newsletter-form");
    const success = document.getElementById("newsletter-success");
    if (form) form.hidden = true;
    if (success) success.hidden = false;
    return;
  }

  const form = document.getElementById("newsletter-form");
  if (!form) return;

  const emailInput = form.querySelector("#newsletter-email");
  const nameInput = form.querySelector("#newsletter-name");

  if (emailInput) {
    emailInput.addEventListener("blur", () => validateField(emailInput));
    emailInput.addEventListener("input", () => {
      if (emailInput.classList.contains("error")) validateField(emailInput);
    });
  }

  if (nameInput) {
    nameInput.addEventListener("blur", () => {
      if (nameInput.classList.contains("error")) validateField(nameInput);
    });
    nameInput.addEventListener("input", () => {
      if (nameInput.classList.contains("error")) validateField(nameInput);
    });
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const isEmail = validateField(emailInput);
    if (!isEmail) return;

    const honeypot = form.querySelector('input[name="_gotcha"]');
    if (honeypot && honeypot.value) return;

    const submitBtn = form.querySelector(".btn-newsletter");
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin" aria-hidden="true"></i> Suscribiendo...';
    }

    if (form.action.includes("REPLACE_ME")) {
      localStorage.setItem(NEWSLETTER_STORAGE_KEY, "true");
      form.hidden = true;
      const successEl = document.getElementById("newsletter-success");
      if (successEl) successEl.hidden = false;
      trackEvent("newsletter_subscribed");
      return;
    }

    try {
      const formData = new FormData(form);
      const response = await fetch(form.action, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        localStorage.setItem(NEWSLETTER_STORAGE_KEY, "true");
        form.hidden = true;
        const successEl = document.getElementById("newsletter-success");
        if (successEl) successEl.hidden = false;
        trackEvent("newsletter_subscribed");
      } else {
        throw new Error("Form submission failed");
      }
    } catch (err) {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="fa-solid fa-envelope-open-text" aria-hidden="true"></i> Suscribirme y obtener mi cupon';
      }
      const errorEl = emailInput?.parentElement?.querySelector(".field-error");
      if (errorEl) errorEl.textContent = "Error al enviar. Intenta de nuevo.";
    }
  });

  const copyBtn = document.getElementById("newsletter-copy-btn");
  if (copyBtn) {
    copyBtn.addEventListener("click", () => {
      navigator.clipboard.writeText("PURITY10").then(() => {
        const feedback = document.getElementById("newsletter-copy-feedback");
        if (feedback) {
          feedback.hidden = false;
          setTimeout(() => { feedback.hidden = true; }, 2000);
        }
      }).catch(() => {
        const ta = document.createElement("textarea");
        ta.value = "PURITY10";
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
        const feedback = document.getElementById("newsletter-copy-feedback");
        if (feedback) {
          feedback.hidden = false;
          setTimeout(() => { feedback.hidden = true; }, 2000);
        }
      });
    });
  }

  const closeBtn = document.getElementById("newsletter-close-btn");
  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      const successEl = document.getElementById("newsletter-success");
      if (successEl) successEl.hidden = true;
      const section = document.getElementById("newsletter");
      if (section) section.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initNewsletter);
} else {
  initNewsletter();
}

const PRICES = {
  sofos: { low: 80000, high: 180000 },
  colchones: { low: 60000, high: 120000 },
  alfombras: { low: 200000, high: 450000 },
  sillas: { low: 30000, high: 55000 },
};

const SERVICE_MAP = {
  sofos: "limpieza-sofas",
  colchones: "sanitizacion-colchones",
  alfombras: "mantenimiento-alfombras",
  sillas: "limpieza-sillas",
};

function formatPrice(value) {
  return "$" + value.toLocaleString("es-CO");
}

function initCotizador() {
  const serviceInputs = document.querySelectorAll('input[name="cotizador-service"]');
  const decreaseBtn = document.getElementById("cotizador-decrease");
  const increaseBtn = document.getElementById("cotizador-increase");
  const rangeInput = document.getElementById("cotizador-range");
  const qtyOutput = document.getElementById("cotizador-qty-output");
  const priceLow = document.getElementById("cotizador-price-low");
  const priceHigh = document.getElementById("cotizador-price-high");
  const totalValue = document.getElementById("cotizador-total-value");
  const priceDisplay = document.getElementById("cotizador-price-display");
  const totalEl = document.getElementById("cotizador-total");
  const ctaLink = document.getElementById("cotizador-cta");

  if (!serviceInputs.length || !decreaseBtn || !rangeInput) return;

  let state = { service: "sofos", quantity: 1 };

  function updateDisplay(animate) {
    const prices = PRICES[state.service] || PRICES.sofos;
    const low = prices.low * state.quantity;
    const high = prices.high * state.quantity;

    if (animate) {
      if (priceDisplay) {
        priceDisplay.classList.remove("updated");
        void priceDisplay.offsetWidth;
        priceDisplay.classList.add("updated");
      }
      if (totalEl) {
        totalEl.classList.remove("updated");
        void totalEl.offsetWidth;
        totalEl.classList.add("updated");
      }
    }

    if (priceLow) priceLow.textContent = formatPrice(low);
    if (priceHigh) priceHigh.textContent = formatPrice(high);
    if (totalValue) totalValue.textContent = formatPrice(low) + " — " + formatPrice(high);
  }

  serviceInputs.forEach((input) => {
    input.addEventListener("change", () => {
      state.service = input.value;
      updateDisplay(true);
    });
  });

  function setQuantity(val) {
    state.quantity = Math.max(1, Math.min(20, val));
    if (qtyOutput) qtyOutput.textContent = state.quantity;
    if (rangeInput) rangeInput.value = state.quantity;
    if (decreaseBtn) decreaseBtn.disabled = state.quantity <= 1;
    if (increaseBtn) increaseBtn.disabled = state.quantity >= 20;
    updateDisplay(true);
  }

  if (decreaseBtn) {
    decreaseBtn.addEventListener("click", () => setQuantity(state.quantity - 1));
  }

  if (increaseBtn) {
    increaseBtn.addEventListener("click", () => setQuantity(state.quantity + 1));
  }

  if (rangeInput) {
    rangeInput.addEventListener("input", () => setQuantity(parseInt(rangeInput.value, 10)));
  }

  if (ctaLink) {
    ctaLink.addEventListener("click", () => {
      const serviceKey = state.service;
      const mappedService = SERVICE_MAP[serviceKey];
      if (mappedService) {
        const params = new URLSearchParams();
        params.set("service", mappedService);
        const newUrl = `${window.location.pathname}#reservas?${params.toString()}`;
        history.replaceState(null, "", newUrl);
      }
    });
  }

  var cotizadorWhatsAppBtn = document.getElementById("cotizador-whatsapp-btn");
  if (cotizadorWhatsAppBtn) {
    cotizadorWhatsAppBtn.addEventListener("click", function(e) {
      e.preventDefault();
      var serviceLabels = { sofos: "Limpieza de sofás", colchones: "Sanitización de colchones", alfombras: "Mantenimiento de alfombras", sillas: "Limpieza de sillas ergonómicas" };
      var serviceName = serviceLabels[state.service] || state.service;
      var msg = WHATSAPP_CONFIG.cotizadorMensaje + "Servicio%3A%20" + encodeURIComponent(serviceName) + "%0ACantidad%3A%20" + state.quantity + "%0APrecio%20estimado%3A%20" + totalValue.textContent;
      window.open("https://wa.me/" + WHATSAPP_CONFIG.numero + "?text=" + msg, "_blank");
    });
  }

  updateDisplay(false);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initCotizador);
} else {
  initCotizador();
}

function initMapInteractive() {
  const mapContainer = document.querySelector(".map-container");
  const tooltip = document.getElementById("map-tooltip");
  const tooltipName = tooltip?.querySelector(".map-tooltip-name");
  const tooltipHint = tooltip?.querySelector(".map-tooltip-hint");
  const mapZones = document.querySelectorAll(".map-zone");
  const mapZoneCards = document.querySelectorAll(".map-zone-card");

  function showTooltip(zoneName, x, y) {
    if (!tooltip || !tooltipName) return;
    tooltipName.textContent = zoneName;
    tooltip.hidden = false;
    tooltip.style.left = x + "px";
    tooltip.style.top = y + "px";
  }

  function hideTooltip() {
    if (!tooltip) return;
    tooltip.hidden = true;
  }

  mapZones.forEach((zone) => {
    zone.addEventListener("mouseenter", (e) => {
      const zoneName = zone.querySelector(".zone-label")?.textContent || zone.dataset.zone;
      const rect = mapContainer.getBoundingClientRect();
      const zoneRect = zone.getBoundingClientRect();
      const x = zoneRect.left + zoneRect.width / 2 - rect.left;
      const y = zoneRect.top - rect.top - 10;
      showTooltip(zoneName, x, y);
    });

    zone.addEventListener("mouseleave", () => {
      hideTooltip();
    });

    zone.addEventListener("focus", (e) => {
      const zoneName = zone.querySelector(".zone-label")?.textContent || zone.dataset.zone;
      const rect = mapContainer.getBoundingClientRect();
      const zoneRect = zone.getBoundingClientRect();
      const x = zoneRect.left + zoneRect.width / 2 - rect.left;
      const y = zoneRect.top - rect.top - 10;
      showTooltip(zoneName, x, y);
    });

    zone.addEventListener("blur", () => {
      hideTooltip();
    });
  });

  mapZoneCards.forEach((card) => {
    const zoneName = card.querySelector(".map-zone-name")?.textContent || card.dataset.zone;
    const zoneSvg = document.querySelector(`.map-zone[data-zone="${card.dataset.zone}"]`);

    card.addEventListener("mouseenter", () => {
      if (zoneSvg) {
        zoneSvg.querySelector(".zone-path").style.fill = "rgba(22, 163, 74, 0.2)";
        zoneSvg.querySelector(".zone-path").style.stroke = "var(--color-accent)";
        zoneSvg.querySelector(".zone-path").style.filter = "url(#zoneShadow)";
        const circle = zoneSvg.querySelector(".zone-marker circle");
        if (circle) {
          circle.style.fill = "var(--color-accent)";
          circle.style.r = "9";
          circle.style.filter = "drop-shadow(0 0 6px rgba(22, 163, 74, 0.6))";
        }
        const label = zoneSvg.querySelector(".zone-label");
        if (label) {
          label.style.fill = "var(--color-text)";
          label.style.fontSize = "12px";
        }
      }
    });

    card.addEventListener("mouseleave", () => {
      if (zoneSvg) {
        zoneSvg.querySelector(".zone-path").style.fill = "";
        zoneSvg.querySelector(".zone-path").style.stroke = "";
        zoneSvg.querySelector(".zone-path").style.filter = "";
        const circle = zoneSvg.querySelector(".zone-marker circle");
        if (circle) {
          circle.style.fill = "";
          circle.style.r = "";
          circle.style.filter = "";
        }
        const label = zoneSvg.querySelector(".zone-label");
        if (label) {
          label.style.fill = "";
          label.style.fontSize = "";
        }
      }
    });
  });

  const zoneNames = {
    chapinero: "Chapinero",
    suba: "Suba",
    engativa: "Engativá",
    kennedy: "Kennedy",
    bosa: "Bosa",
    fontibon: "Fontibón",
    usme: "Usme"
  };

  mapZones.forEach((zone) => {
    zone.addEventListener("click", (e) => {
      const zoneName = zone.dataset.zone;
      const displayName = zoneNames[zoneName] || zoneName;
      trackEvent("map_zone_click", { props: { zone: displayName } });
    });
  });

  mapZoneCards.forEach((card) => {
    card.addEventListener("click", () => {
      const zoneName = card.dataset.zone;
      const displayName = zoneNames[zoneName] || zoneName;
      trackEvent("map_zone_list_click", { props: { zone: displayName } });
    });
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initMapInteractive);
} else {
  initMapInteractive();
}

function initVideoPlayer() {
  const playBtn = document.getElementById("video-play-btn");
  const closeBtn = document.getElementById("video-close-btn");
  const embedWrap = document.getElementById("video-embed-wrap");
  const embedContainer = document.getElementById("video-embed");

  if (!playBtn || !embedWrap || !embedContainer) return;

  const VIDEO_ID = "vTDo5qmyfVM";
  const PLAYER_URL = `https://www.youtube-nocookie.com/embed/${VIDEO_ID}?autoplay=1&rel=0&modestbranding=1&cc_load_policy=1`;

  function openVideo() {
    embedContainer.innerHTML = `<iframe
      src="${PLAYER_URL}"
      title="Video demostrativo Purity and Clean"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe>`;
    embedWrap.hidden = false;
    document.body.style.overflow = "hidden";
    trackEvent("video_play_click");
    setTimeout(() => closeBtn?.focus(), 100);
  }

  function closeVideo() {
    embedWrap.hidden = true;
    embedContainer.innerHTML = "";
    document.body.style.overflow = "";
    playBtn.focus();
  }

  playBtn.addEventListener("click", openVideo);

  if (closeBtn) {
    closeBtn.addEventListener("click", closeVideo);
  }

  embedWrap.addEventListener("click", (e) => {
    if (e.target === embedWrap) closeVideo();
  });

  document.addEventListener("keydown", (e) => {
    if (!embedWrap.hidden && e.key === "Escape") closeVideo();
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initVideoPlayer);
} else {
  initVideoPlayer();
}

(function initWhatsAppFloat() {
  var floats = document.querySelectorAll(".whatsapp-float[data-whatsapp-zone]");
  floats.forEach(function(link) {
    var zone = link.getAttribute("data-whatsapp-zone");
    if (zone && typeof getWhatsAppUrl === "function") {
      link.href = getWhatsAppUrl(zone);
    }
  });
})();

(function initSocialProofToast() {
  var STORAGE_KEY = "purity_sp_toasts";
  var pool = [
    {nombre: "María Camila López", zona: "Chapinero", servicio: "limpieza de sofás", tiempo: "hace 8 min"},
    {nombre: "Andrés Felipe Torres", zona: "Suba", servicio: "sanitización de colchones", tiempo: "hace 12 min"},
    {nombre: "Laura Beatriz Mendoza", zona: "Engativá", servicio: "mantenimiento de alfombras", tiempo: "hace 15 min"},
    {nombre: "Carlos Andrés Ruiz", zona: "Kennedy", servicio: "limpieza de sofás", tiempo: "hace 23 min"},
    {nombre: "Diana Patricia Velandia", zona: "Teusaquillo", servicio: "limpieza de sillas", tiempo: "hace 31 min"},
    {nombre: "Jorge Eliecer González", zona: "Barrios Unidos", servicio: "sanitización de colchones", tiempo: "hace 38 min"},
    {nombre: "Sandra Milena Cruz", zona: "Usaquén", servicio: "mantenimiento de alfombras", tiempo: "hace 44 min"},
    {nombre: "Fernando David Casas", zona: "Fontibón", servicio: "limpieza de sofás", tiempo: "hace 51 min"},
    {nombre: "Claudia Patricia León", zona: "Bosa", servicio: "sanitización de colchones", tiempo: "hace 57 min"},
    {nombre: "Oscar Mauricio Peña", zona: "Usme", servicio: "limpieza de sillas", tiempo: "hace 1 h"},
    {nombre: "Yolanda del Carmen Soler", zona: "Chapinero", servicio: "mantenimiento de alfombras", tiempo: "hace 1 h"},
    {nombre: "Jhon Jairo Muñoz", zona: "Suba", servicio: "limpieza de sofás", tiempo: "hace 1 h"},
    {nombre: "Gloria Estela Riaño", zona: "Engativá", servicio: "limpieza de sillas", tiempo: "hace 2 h"},
    {nombre: "Alba Lucía Berdugo", zona: "Kennedy", servicio: "sanitización de colchones", tiempo: "hace 2 h"},
    {nombre: "Hernán Dario Soto", zona: "Teusaquillo", servicio: "mantenimiento de alfombras", tiempo: "hace 2 h"},
    {nombre: "Luz Mery Pinzón", zona: "Barrios Unidos", servicio: "limpieza de sofás", tiempo: "hace 3 h"},
    {nombre: "Rodrigo Iván Moreno", zona: "Usaquén", servicio: "limpieza de sillas", tiempo: "hace 3 h"},
    {nombre: "Carmen Alicia出版物", zona: "Fontibón", servicio: "sanitización de colchones", tiempo: "hace 4 h"},
    {nombre: "Gustavo Adolfo Claro", zona: "Bosa", servicio: "mantenimiento de alfombras", tiempo: "hace 5 h"},
    {nombre: "Margarita Rosa Gómez", zona: "Usme", servicio: "limpieza de sofás", tiempo: "hace 6 h"},
    {nombre: "Pedro Nel Aguirre", zona: "Chapinero", servicio: "limpieza de sillas", tiempo: "hace 7 h"},
    {nombre: "Edna Yohana Sastoque", zona: "Suba", servicio: "sanitización de colchones", tiempo: "hace 8 h"}
  ];
  var timers = [];
  var current = 0;
  var container = null;
  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function getInitials(nombre) {
    var parts = nombre.split(" ");
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return nombre.slice(0, 2).toUpperCase();
  }

  function createToast(entry) {
    if (!container) {
      container = document.createElement("div");
      container.setAttribute("id", "social-proof-toast-container");
      container.setAttribute("aria-live", "polite");
      container.setAttribute("aria-atomic", "false");
      document.body.appendChild(container);
    }
    var el = document.createElement("div");
    el.className = "social-proof-toast";
    el.setAttribute("role", "alert");
    el.setAttribute("hidden", "");
    el.innerHTML =
      '<div class="toast-avatar" aria-hidden="true">' + getInitials(entry.nombre) + '</div>' +
      '<div class="toast-body">' +
        '<span class="toast-line1"><strong>' + entry.nombre + '</strong> de ' + entry.zona + '</span>' +
        '<span class="toast-line2">solicitó ' + entry.servicio + '</span>' +
        '<span class="toast-badge"><i class="fa-solid fa-circle" aria-hidden="true"></i> ' + entry.tiempo + '</span>' +
      '</div>' +
      '<button class="toast-close" aria-label="Cerrar notificación" type="button"><i class="fa-solid fa-xmark" aria-hidden="true"></i></button>';
    var closeBtn = el.querySelector(".toast-close");
    closeBtn.addEventListener("click", function() { dismissToast(el, true); });
    container.appendChild(el);
    return el;
  }

  function showToast(el) {
    el.removeAttribute("hidden");
    if (!prefersReducedMotion) {
      el.classList.add("entering");
      setTimeout(function() { el.classList.remove("entering"); }, 400);
    }
    if (typeof plausible !== "undefined") {
      plausible("social_proof_toast_shown");
    }
  }

  function dismissToast(el, manual) {
    if (manual) {
      el.setAttribute("aria-label", "Notificación descartada");
    }
    if (!prefersReducedMotion) {
      el.classList.add("leaving");
      setTimeout(function() {
        el.remove();
        checkContainer();
      }, 350);
    } else {
      el.remove();
      checkContainer();
    }
  }

  function checkContainer() {
    if (container && container.children.length === 0) {
      container.remove();
      container = null;
    }
  }

  function scheduleNext(currentIdx) {
    var delay = currentIdx === 0 ? 15000 : 45000;
    var t = setTimeout(function() {
      var shown = JSON.parse(sessionStorage.getItem(STORAGE_KEY) || "[]");
      var available = pool.filter(function(_, i) { return shown.indexOf(i) === -1; });
      if (available.length === 0) return;
      var pick = available[Math.floor(Math.random() * available.length)];
      var poolIdx = pool.indexOf(pick);
      shown.push(poolIdx);
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(shown));
      var el = createToast(pick);
      showToast(el);
      var visibleT = setTimeout(function() { dismissToast(el, false); }, 6000);
      timers.push(visibleT);
      current++;
    }, delay);
    timers.push(t);
  }

  function init() {
    var existing = JSON.parse(sessionStorage.getItem(STORAGE_KEY) || "[]");
    if (existing.length >= pool.length) return;
    scheduleNext(0);
    scheduleNext(1);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();

(function initCookieBanner() {
  var banner = document.getElementById("cookie-banner");
  if (!banner) return;

  var acceptAllBtn = document.getElementById("cookie-accept-all");
  var acceptEssentialBtn = document.getElementById("cookie-accept-essential");
  var STORAGE_KEY = "purity_cookie_consent";

  function showBanner() {
    banner.hidden = false;
    requestAnimationFrame(function() {
      banner.removeAttribute("hidden");
    });
  }

  function hideBanner() {
    banner.setAttribute("hidden", "");
  }

  function handleConsent(accepted) {
    var consent = {
      essential: true,
      analytics: accepted,
      preferences: accepted,
      timestamp: Date.now()
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
    hideBanner();
    trackEvent("cookie_consent", { props: { accepted: accepted } });
  }

  var stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    hideBanner();
    return;
  }

  var prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!prefersReduced) {
    setTimeout(showBanner, 800);
  } else {
    showBanner();
  }

  if (acceptAllBtn) {
    acceptAllBtn.addEventListener("click", function() {
      handleConsent(true);
    });
  }

  if (acceptEssentialBtn) {
    acceptEssentialBtn.addEventListener("click", function() {
      handleConsent(false);
    });
  }
})();
