const menuToggle = document.querySelector(".menu-toggle");
const menu = document.querySelector(".menu");
const searchInput = document.querySelector("#search-input");
const searchStatus = document.querySelector("#search-status");
const searchableItems = [...document.querySelectorAll(".searchable-item")];

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
