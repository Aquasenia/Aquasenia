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

const carouselTrack = document.querySelector(".carousel-track");
const prevButton = document.querySelector("[data-carousel='prev']");
const nextButton = document.querySelector("[data-carousel='next']");

if (carouselTrack && prevButton && nextButton) {
  const scrollAmount = () => carouselTrack.clientWidth * 0.9;

  prevButton.addEventListener("click", () => {
    carouselTrack.scrollBy({
      left: -scrollAmount(),
      behavior: "smooth",
    });
  });

  nextButton.addEventListener("click", () => {
    carouselTrack.scrollBy({
      left: scrollAmount(),
      behavior: "smooth",
    });
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
