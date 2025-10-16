document.addEventListener("DOMContentLoaded", () => {
  // Reveal animation for sections
  const reveals = document.querySelectorAll(".reveal-left, .reveal-right");
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  reveals.forEach(el => observer.observe(el));
});

