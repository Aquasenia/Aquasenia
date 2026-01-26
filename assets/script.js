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

const accordionElements = document.querySelectorAll(".js-accordion");
accordionElements.forEach((accordionElement) => {
  const items = Array.from(accordionElement.children).filter((child) =>
    child.classList.contains("js-accordion__item")
  );
  const showClass = "accordion__item--is-open";
  const allowMultiItems = accordionElement.getAttribute("data-multi-items") !== "off";

  items.forEach((item, index) => {
    const button = item.querySelector("button");
    const content = item.querySelector(".js-accordion__panel");
    if (!button || !content) {
      return;
    }
    const isOpen = item.classList.contains(showClass);
    button.setAttribute("aria-expanded", isOpen ? "true" : "false");
    button.setAttribute("aria-controls", `accordion-content-${index}`);
    button.setAttribute("id", `accordion-header-${index}`);
    button.classList.add("js-accordion__trigger");
    content.setAttribute("aria-labelledby", `accordion-header-${index}`);
    content.setAttribute("id", `accordion-content-${index}`);
  });

  accordionElement.addEventListener("click", (event) => {
    const trigger = event.target.closest(".js-accordion__trigger");
    if (!trigger) {
      return;
    }
    const item = trigger.closest(".js-accordion__item");
    if (!item || !items.includes(item)) {
      return;
    }
    const isOpen = trigger.getAttribute("aria-expanded") === "true";
    toggleAccordionItem(item, trigger, isOpen);
  });

  const toggleAccordionItem = (item, trigger, isOpen) => {
    const content = item.querySelector(".js-accordion__panel");
    const nextState = isOpen ? "false" : "true";

    if (!isOpen) {
      item.classList.add(showClass);
    }
    trigger.setAttribute("aria-expanded", nextState);
    item.classList.toggle(showClass, !isOpen);
    if (content) {
      content.removeAttribute("style");
    }
    if (!allowMultiItems && !isOpen) {
      closeSiblings(item);
    }
  };

  const closeSiblings = (item) => {
    if (allowMultiItems) {
      return;
    }
    items.forEach((sibling) => {
      if (sibling !== item && sibling.classList.contains(showClass)) {
        const siblingTrigger = sibling.querySelector(".js-accordion__trigger");
        if (siblingTrigger) {
          toggleAccordionItem(sibling, siblingTrigger, true);
        }
      }
    });
  };
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
