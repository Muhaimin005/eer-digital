document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".industry-btn");
  const panels = document.querySelectorAll(".industry-panel");

  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      // Remove active states
      buttons.forEach(b => b.classList.remove("active"));
      panels.forEach(p => {
        p.classList.remove("active");
        p.style.opacity = 0;
      });

      // Activate the selected
      btn.classList.add("active");
      const target = document.getElementById(btn.dataset.target);
      target.classList.add("active");

      // Fade animation
      setTimeout(() => {
        target.style.opacity = 1;
      }, 50);


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
  });
});



