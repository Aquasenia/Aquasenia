const yearElement = document.getElementById("year");
if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

const navToggle = document.querySelector(".nav-toggle");
const sidebar = document.querySelector(".sidebar");
if (navToggle && sidebar) {
  navToggle.addEventListener("click", () => {
    const isOpen = sidebar.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

const revealElements = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealElements.forEach((el) => observer.observe(el));
} else {
  revealElements.forEach((el) => el.classList.add("visible"));
}

const searchPanels = document.querySelectorAll(".search-panel");
searchPanels.forEach((panel) => {
  const toggle = panel.querySelector(".filter-toggle");
  const filters = panel.querySelector(".search-filters");
  const targetId = panel.dataset.filterTarget;
  const target = targetId ? document.getElementById(targetId) : null;
  const items = target ? Array.from(target.querySelectorAll("[data-filter-item]")) : [];
  const resultsCount = panel.querySelector(".results-count");
  const emptyState = target ? target.querySelector(".empty-state") : null;
  const selects = Array.from(panel.querySelectorAll("[data-filter-key]"));
  const searchInput = panel.querySelector(".search-input");
  const resetButton = panel.querySelector(".filter-reset");

  const normalize = (value) => value.trim().toLowerCase();
  const applyFilters = () => {
    if (!items.length) {
      return;
    }

    const query = searchInput ? normalize(searchInput.value) : "";
    let visibleCount = 0;

    items.forEach((item) => {
      let matches = true;

      if (query) {
        matches = normalize(item.textContent).includes(query);
      }

      if (matches) {
        selects.forEach((select) => {
          const key = select.dataset.filterKey;
          const value = select.value;
          if (!key || !value || value.startsWith("All")) {
            return;
          }

          const itemValue = item.dataset[key] || "";
          if (normalize(itemValue) !== normalize(value)) {
            matches = false;
          }
        });
      }

      item.hidden = !matches;
      if (matches) {
        visibleCount += 1;
      }
    });

    if (resultsCount) {
      const total = items.length;
      resultsCount.textContent = `Showing ${visibleCount} of ${total} ${total === 1 ? "entry" : "entries"}`;
    }

    if (emptyState) {
      emptyState.hidden = visibleCount !== 0;
    }
  };

  if (toggle && filters) {
    toggle.addEventListener("click", () => {
      const isOpen = panel.classList.toggle("filters-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });
  }

  const inputWrappers = panel.querySelectorAll(".search-input-wrapper");
  inputWrappers.forEach((wrapper) => {
    const input = wrapper.querySelector(".search-input");
    const clearButton = wrapper.querySelector(".search-clear");
    if (!input || !clearButton) {
      return;
    }

    const updateClearState = () => {
      wrapper.classList.toggle("is-filled", input.value.trim().length > 0);
    };

    input.addEventListener("input", () => {
      updateClearState();
      applyFilters();
    });
    clearButton.addEventListener("click", () => {
      input.value = "";
      input.dispatchEvent(new Event("input", { bubbles: true }));
      input.focus();
    });
    updateClearState();
  });

  selects.forEach((select) => {
    select.addEventListener("change", applyFilters);
  });

  if (resetButton) {
    resetButton.addEventListener("click", () => {
      if (searchInput) {
        searchInput.value = "";
        searchInput.dispatchEvent(new Event("input", { bubbles: true }));
      }
      selects.forEach((select) => {
        select.selectedIndex = 0;
      });
      applyFilters();
    });
  }

  applyFilters();
});
