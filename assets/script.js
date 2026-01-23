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

const globalSearch = document.querySelector(".global-search");
if (globalSearch) {
  const entries = [
    {
      title: "Archive Index",
      description: "A complete alphabetical list of recorded entries.",
      type: "Directory",
      path: "pages/archive-index.html",
    },
    {
      title: "The Aetheric Grove",
      description: "Sky-blooming forests floating above the Mirror Sea.",
      type: "Location",
      path: "pages/locations/location-aetheric-grove.html",
    },
    {
      title: "Archivist Liora Kesh",
      description: "Keeper of the memory vaults and guardian of the Resonant Codex.",
      type: "Character",
      path: "pages/characters/character-liora-kesh.html",
    },
    {
      title: "Asha Miraen",
      description: "Reef cartographer decoding tidal glyphs in the lower currents.",
      type: "Character",
      path: "pages/characters/character-asha-miraen.html",
    },
    {
      title: "Characters",
      description: "Luminaries, rebels, and archivists of Li'Ona.",
      type: "Directory",
      path: "pages/characters.html",
    },
    {
      title: "Citadel of Nine Currents",
      description: "A multi-tiered capital where nine rivers meet.",
      type: "Location",
      path: "pages/locations/location-citadel-nine-currents.html",
    },
    {
      title: "History",
      description: "Chronological timeline entries from the archives.",
      type: "Directory",
      path: "pages/history.html",
    },
    {
      title: "Home",
      description: "The Li'Ona Archives front door.",
      type: "Landing",
      path: "index.html",
    },
    {
      title: "Locations",
      description: "Atlas of realms, sanctuaries, and citadels.",
      type: "Directory",
      path: "pages/locations.html",
    },
    {
      title: "The Meralis Tidemancers",
      description: "Amphibious symbionts who cultivate living tide gardens.",
      type: "Species",
      path: "pages/species/species-meralis-tidemancers.html",
    },
    {
      title: "Mirror Sea Reefs",
      description: "Bioluminescent reefs that shimmer beneath the surface.",
      type: "Location",
      path: "pages/locations/location-mirror-sea-reefs.html",
    },
    {
      title: "The Night of Ten Auroras",
      description: "The treaty gathering that ended the Astral Rift conflict.",
      type: "History",
      path: "pages/history/history-night-ten-auroras.html",
    },
    {
      title: "The Solarii Prismkin",
      description: "Solar attuned artisans who bend light into architecture.",
      type: "Species",
      path: "pages/species/species-solarii-prismkin.html",
    },
    {
      title: "Species",
      description: "Catalog of lineages and interstellar alliances.",
      type: "Directory",
      path: "pages/species.html",
    },
    {
      title: "Tarek Nine-Lights",
      description: "Diplomat bridging the Solarii courts and outer enclaves.",
      type: "Character",
      path: "pages/characters/character-tarek-nine-lights.html",
    },
    {
      title: "The Veyari Echo-Born",
      description: "Navigators who chart resonance routes between star currents.",
      type: "Species",
      path: "pages/species/species-veyari-echo-born.html",
    },
  ];
  const basePath = document.body?.dataset?.base || "";
  const input = globalSearch.querySelector(".search-input");
  const clearButton = globalSearch.querySelector(".search-clear");
  const results = globalSearch.querySelector(".global-search-results");
  const wrapper = globalSearch.querySelector(".search-input-wrapper");

  const normalize = (value) => value.trim().toLowerCase();

  const renderResults = (query) => {
    if (!results) {
      return;
    }
    const normalizedQuery = normalize(query);

    if (!normalizedQuery) {
      results.innerHTML = '<p class="search-result-hint">Start typing to see instant results.</p>';
      return;
    }

    const matches = entries.filter((entry) => {
      const combined = `${entry.title} ${entry.description} ${entry.type}`;
      return normalize(combined).includes(normalizedQuery);
    });

    if (!matches.length) {
      results.innerHTML = '<p class="search-result-hint">No matches yet. Try another keyword.</p>';
      return;
    }

    const items = matches
      .map((entry) => {
        const url = `${basePath}${entry.path}`;
        return `
          <li>
            <a class="search-result" href="${url}">
              <div class="search-result-title">${entry.title}</div>
              <div class="search-result-description">${entry.description}</div>
              <div class="search-result-type">${entry.type}</div>
            </a>
          </li>
        `;
      })
      .join("");

    results.innerHTML = `<ul>${items}</ul>`;
  };

  const updateClearState = () => {
    if (wrapper) {
      wrapper.classList.toggle("is-filled", input.value.trim().length > 0);
    }
  };

  if (input) {
    input.addEventListener("input", () => {
      updateClearState();
      renderResults(input.value);
    });
    renderResults("");
  }

  if (clearButton && input) {
    clearButton.addEventListener("click", () => {
      input.value = "";
      input.dispatchEvent(new Event("input", { bubbles: true }));
      input.focus();
    });
  }

  document.addEventListener("keydown", (event) => {
    if (event.key !== "/" || !input) {
      return;
    }

    const target = event.target;
    const isTyping =
      target instanceof HTMLInputElement ||
      target instanceof HTMLTextAreaElement ||
      target?.isContentEditable;

    if (isTyping) {
      return;
    }

    event.preventDefault();
    input.focus();
  });
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
