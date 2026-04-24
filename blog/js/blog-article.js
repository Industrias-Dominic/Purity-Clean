(function () {
  "use strict";

  var ACCESSIBLE_LABELS = {
    progress: "Progreso de lectura",
    toc: "Tabla de contenidos",
    tocToggle: "Mostrar tabla de contenidos",
    tocCollapse: "Colapsar tabla de contenidos",
    activeSection: "Sección actual",
  };

  function initProgressBar() {
    var progressBar = document.getElementById("reading-progress");
    if (!progressBar) return;

    var prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    var articleBody = document.querySelector(".article-body");
    if (!articleBody) return;

    function updateProgress() {
      if (prefersReducedMotion) {
        progressBar.style.transform = "scaleX(1)";
        return;
      }

      var articleTop = articleBody.offsetTop;
      var articleHeight = articleBody.offsetHeight;
      var windowHeight = window.innerHeight;
      var scrollY = window.scrollY;

      var readableHeight = articleHeight - windowHeight;
      var progress = Math.min(
        1,
        Math.max(0, (scrollY - articleTop) / readableHeight)
      );

      progressBar.style.transform = "scaleX(" + progress + ")";
      progressBar.setAttribute(
        "aria-valuenow",
        Math.round(progress * 100).toString()
      );
    }

    if (!prefersReducedMotion) {
      window.addEventListener(
        "scroll",
        updateProgress,
        { passive: true }
      );
    }

    updateProgress();
  }

  function slugify(text) {
    return text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
  }

  function initTableOfContents() {
    var articleBody = document.querySelector(".article-body");
    if (!articleBody) return;

    var headings = Array.from(articleBody.querySelectorAll("h2, h3"));
    if (headings.length < 2) return;

    var tocNav = document.getElementById("toc-nav");
    var tocList = document.getElementById("toc-list");
    var tocToggle = document.getElementById("toc-toggle");
    var tocContent = document.getElementById("toc-content");
    if (!tocNav || !tocList || !tocToggle || !tocContent) return;

    headings.forEach(function (heading, index) {
      var id = "heading-" + index + "-" + slugify(heading.textContent);
      if (!heading.id) {
        heading.id = id;
      }
    });

    var tocItems = headings.map(function (heading) {
      var level = heading.tagName.toLowerCase();
      var item = document.createElement("li");
      item.className = "toc-item toc-" + level;

      var link = document.createElement("a");
      link.href = "#" + heading.id;
      link.className = "toc-link";
      link.textContent = heading.textContent;
      link.setAttribute("data-target", heading.id);

      item.appendChild(link);
      return item;
    });

    tocList.append(...tocItems);

    var prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    tocList.querySelectorAll(".toc-link").forEach(function (link) {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        var targetId = link.getAttribute("data-target");
        var target = document.getElementById(targetId);
        if (!target) return;

        if (prefersReducedMotion) {
          target.scrollIntoView();
        } else {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }

        history.pushState(null, "", "#" + targetId);

        if (!prefersReducedMotion) {
          tocContent.classList.remove("toc-open");
          tocToggle.setAttribute("aria-expanded", "false");
          tocToggle.setAttribute("aria-label", ACCESSIBLE_LABELS.tocToggle);
        }
      });
    });

    tocToggle.addEventListener("click", function () {
      var isOpen = tocContent.classList.toggle("toc-open");
      tocToggle.setAttribute(
        "aria-expanded",
        isOpen.toString()
      );
      tocToggle.setAttribute(
        "aria-label",
        isOpen
          ? ACCESSIBLE_LABELS.tocCollapse
          : ACCESSIBLE_LABELS.tocToggle
      );
    });

    tocToggle.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && tocContent.classList.contains("toc-open")) {
        tocContent.classList.remove("toc-open");
        tocToggle.setAttribute("aria-expanded", "false");
        tocToggle.setAttribute("aria-label", ACCESSIBLE_LABELS.tocToggle);
        tocToggle.focus();
      }
    });

    var activeObserver;
    if ("IntersectionObserver" in window) {
      activeObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            var id = entry.target.getAttribute("id");
            var link = tocList.querySelector(
              '.toc-link[data-target="' + id + '"]'
            );
            if (link) {
              link.classList.toggle("toc-active", entry.isIntersecting);
              link.setAttribute(
                "aria-current",
                entry.isIntersecting ? "true" : "false"
              );
            }
          });
        },
        {
          rootMargin: "-10% 0px -80% 0px",
          threshold: 0,
        }
      );

      headings.forEach(function (heading) {
        activeObserver.observe(heading);
      });
    }
  }

  function init() {
    initProgressBar();
    initTableOfContents();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
