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

    input.addEventListener("input", updateClearState);
    clearButton.addEventListener("click", () => {
      input.value = "";
      input.dispatchEvent(new Event("input", { bubbles: true }));
      input.focus();
    });
    updateClearState();
  });
});
