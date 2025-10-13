// ============================
// Business Segments Page Script
// ============================

document.addEventListener("DOMContentLoaded", () => {

  // --- 1) Reveal Animations for Sections ---
  const reveals = document.querySelectorAll(".reveal-left, .reveal-right");
  if (reveals.length) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.18 });

    reveals.forEach(el => observer.observe(el));
  }

  // --- 2) Partners Carousel (Auto Scroll + Pause on Hover) ---
  const carousel = document.getElementById("partnersCarousel");
  const carouselWrap = document.querySelector(".partners-carousel-wrap");

  if (carousel && carouselWrap) {
    const pause = () => carousel.style.animationPlayState = "paused";
    const resume = () => carousel.style.animationPlayState = "running";

    carouselWrap.addEventListener("mouseenter", pause);
    carouselWrap.addEventListener("mouseleave", resume);
    carouselWrap.addEventListener("focusin", pause);
    carouselWrap.addEventListener("focusout", resume);

    // Accessibility: allow keyboard toggle
    carouselWrap.setAttribute("tabindex", "0");
    carouselWrap.setAttribute("aria-label", "Partners carousel (press Space to pause/resume)");

    carouselWrap.addEventListener("keydown", e => {
      if (e.code === "Space") {
        e.preventDefault();
        const state = getComputedStyle(carousel).animationPlayState;
        carousel.style.animationPlayState = (state === "running") ? "paused" : "running";
      }
    });
  }
});
