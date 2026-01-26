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
if ("IntersectionObserver" in window && revealElements.length > 0) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  revealElements.forEach((element) => revealObserver.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("is-visible"));
}

const timelineEntries = document.querySelectorAll(".timeline details");
timelineEntries.forEach((entry) => {
  let closeTimer = null;
  let ignoreToggle = false;
  entry.addEventListener("toggle", () => {
    if (ignoreToggle) {
      ignoreToggle = false;
      return;
    }
    if (!entry.open) {
      entry.classList.add("is-closing");
      ignoreToggle = true;
      entry.open = true;
      if (closeTimer) {
        window.clearTimeout(closeTimer);
      }
      closeTimer = window.setTimeout(() => {
        entry.classList.remove("is-closing");
        ignoreToggle = true;
        entry.open = false;
      }, 320);
    } else {
      entry.classList.remove("is-closing");
      if (closeTimer) {
        window.clearTimeout(closeTimer);
        closeTimer = null;
      }
    }
  });
});

const cards = document.querySelectorAll(".card");
if (cards.length > 0) {
  const setSelectedCard = (selectedCard) => {
    cards.forEach((card) => {
      card.classList.toggle("is-selected", card === selectedCard);
    });
  };

  cards.forEach((card) => {
    card.addEventListener("click", () => {
      setSelectedCard(card);
    });
    card.addEventListener("focusin", () => {
      setSelectedCard(card);
    });
  });
}
