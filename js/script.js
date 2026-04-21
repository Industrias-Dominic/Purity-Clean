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

document.querySelectorAll(".searchable-item").forEach((item) => {
  item.querySelector("a.btn")?.addEventListener("click", () => {
    trackEvent("Service_Product_Click", { props: { item: item.dataset.name } });
  });
});
