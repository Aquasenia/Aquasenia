const omens = [
  "The tides remember every name ever uttered.",
  "Salt carves secrets into the hull of the world.",
  "The cathedral bells ring only when the abyss listens.",
  "A leviathan dreams beneath the coral spires.",
  "Stars fell into the sea and learned to glow again.",
  "A silent choir guards the sunken archive."
];

const omenButton = document.querySelector("#omenButton");
const omenText = document.querySelector("#omenText");
const collapseButton = document.querySelector("#collapseButton");
const aspectToggles = document.querySelectorAll(".aspect-toggle");
const mistToggle = document.querySelector("#mistToggle");
const sigilToggle = document.querySelector("#sigilToggle");

let omenIndex = 0;
let allCollapsed = false;

const updateOmen = () => {
  omenIndex = (omenIndex + 1) % omens.length;
  omenText.textContent = omens[omenIndex];
};

const toggleAspect = (button) => {
  const card = button.closest(".aspect");
  if (!card) {
    return;
  }
  const isCollapsed = card.classList.toggle("collapsed");
  card.classList.toggle("reduced", !isCollapsed);
  button.setAttribute("aria-expanded", String(!isCollapsed));
};

const setAllCollapsed = (collapsed) => {
  aspectToggles.forEach((button) => {
    const card = button.closest(".aspect");
    if (!card) {
      return;
    }
    card.classList.toggle("collapsed", collapsed);
    card.classList.toggle("reduced", !collapsed);
    button.setAttribute("aria-expanded", String(!collapsed));
  });
  allCollapsed = collapsed;
  collapseButton.textContent = collapsed ? "Reveal all" : "Collapse all";
  collapseButton.setAttribute("aria-expanded", String(!collapsed));
};

omenButton?.addEventListener("click", updateOmen);

collapseButton?.addEventListener("click", () => {
  setAllCollapsed(!allCollapsed);
});

aspectToggles.forEach((button) => {
  button.addEventListener("click", () => toggleAspect(button));
});

mistToggle?.addEventListener("change", (event) => {
  const input = event.target;
  document.body.classList.toggle("mist-off", !input.checked);
});

sigilToggle?.addEventListener("change", (event) => {
  const input = event.target;
  document.body.classList.toggle("sigil-off", !input.checked);
});

window.addEventListener("keydown", (event) => {
  if (event.key.toLowerCase() === "o") {
    updateOmen();
  }
});

setAllCollapsed(false);
