document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".industry-btn");
  const dropdown = document.getElementById("industrySelect");
  const panels = document.querySelectorAll(".industry-panel, .industry-content"); // handle both naming cases

  // === Function to show selected industry ===
  function showIndustry(id) {
    // Remove active state from all panels and buttons
    buttons.forEach(b => b.classList.remove("active"));
    panels.forEach(p => {
      p.classList.remove("active");
      p.style.opacity = 0;
    });

    // Find and show the selected panel
    const target = document.getElementById(id);
    if (target) {
      target.classList.add("active");
      setTimeout(() => target.style.opacity = 1, 50);
    }

    // Highlight correct button
    buttons.forEach(btn => {
      if (btn.dataset.target === id) btn.classList.add("active");
    });

    // Reveal animation setup (run once after switch)
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
  }

  // === Handle Desktop Buttons ===
  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      showIndustry(btn.dataset.target);
    });
  });

  // === Handle Mobile Dropdown ===
  if (dropdown) {
    dropdown.addEventListener("change", (e) => {
      showIndustry(e.target.value);
    });
  }
});
