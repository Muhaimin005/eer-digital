console.log("Main.js loaded!");

// ==========================
// EER Digital – Main JS File
// ==========================

// ===== 1. Scroll Header Shrink (with throttle) =====
let lastScroll = 0;
window.addEventListener("scroll", () => {
  const now = Date.now();
  if (now - lastScroll < 150) return; // throttle every 150ms
  lastScroll = now;

  const header = document.querySelector("header");
  if (header) header.classList.toggle("scrolled", window.scrollY > 50);
});

// ===== 2. Adjust Main Padding Dynamically =====
function adjustMainPadding() {
  const topBar = document.querySelector(".top-bar");
  const mainNav = document.querySelector(".main-nav");
  const main = document.querySelector("main");

  if (topBar && mainNav && main) {
    const totalHeight = topBar.offsetHeight + mainNav.offsetHeight;
    main.style.paddingTop = `${totalHeight}px`;
  }
}
window.addEventListener("load", adjustMainPadding);
window.addEventListener("resize", adjustMainPadding);

// ===== 3. DOMContentLoaded: Animations & Features =====
document.addEventListener("DOMContentLoaded", () => {

  // --- Hero Animation ---
  const hero = document.querySelector(".hero");
  if (hero) {
    const heroObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) hero.classList.add("animate");
      });
    });
    heroObserver.observe(hero);
  }

  // --- Industries Banner Animation ---
  const industriesBanner = document.querySelector(".industries-banner");
  if (industriesBanner) {
    const industriesObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add("visible");
      });
    });
    industriesObserver.observe(industriesBanner);
  }

  // --- Reveal Animations (Left/Right) ---
  const reveals = document.querySelectorAll(".reveal-left, .reveal-right");
  if (reveals.length) {
    const revealObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          obs.unobserve(entry.target); // animate only once
        }
      });
    }, { threshold: 0.2 });

    reveals.forEach(el => revealObserver.observe(el));
  }

  // --- Contact Form (EmailJS) ---
  const contactForm = document.getElementById("contactForm");
  if (contactForm && typeof emailjs !== "undefined") {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const btn = this.querySelector('button[type="submit"]');
      btn.disabled = true;
      btn.textContent = "Sending...";

      emailjs.sendForm("service_vvqn85e", "template_xu9j1nd", this)
        .then(() => {
          alert("Message sent successfully!");
          this.reset();
        })
        .catch((error) => {
          console.error("EmailJS Error:", error);
          alert("Failed to send message. Please try again later.");
        })
        .finally(() => {
          btn.disabled = false;
          btn.textContent = "Send Message";
        });
    });
  }
});

// ===== Back to Top Button =====
const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    backToTop.classList.add("show");
  } else {
    backToTop.classList.remove("show");
  }
});

backToTop?.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

// ===== Mobile Menu Toggle =====
const menuToggle = document.getElementById("menuToggle");
const mobileNav = document.getElementById("mobileNav");
const navOverlay = document.getElementById("navOverlay");

if (menuToggle && mobileNav && navOverlay) {
  menuToggle.addEventListener("click", () => {
    mobileNav.classList.toggle("active");
    navOverlay.classList.toggle("active");
  });

  navOverlay.addEventListener("click", () => {
    mobileNav.classList.remove("active");
    navOverlay.classList.remove("active");
  });

  // Close menu when link clicked
  document.querySelectorAll("#mobileNav a").forEach(link => {
    link.addEventListener("click", () => {
      mobileNav.classList.remove("active");
      navOverlay.classList.remove("active");
    });
  });
}

// ===== Contact Modal (For Multiple Buttons) =====
document.addEventListener("DOMContentLoaded", () => {
  const openBtns = document.querySelectorAll(".openContactBtn");
  const modal = document.getElementById("contactModal");
  const closeBtn = document.getElementById("closeContactBtn");

  if (!openBtns.length || !modal || !closeBtn) return;

  // Open modal when any Contact button is clicked
  openBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      modal.style.display = "flex";
      document.body.style.overflow = "hidden"; // prevent scroll
    });
  });

  // Close modal
  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
  });

  // Close modal if clicking outside content
  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
      document.body.style.overflow = "auto";
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".value-card");

  cards.forEach(card => {
    card.addEventListener("click", () => {
      // Toggle the flip only on mobile screens
      if (window.innerWidth <= 992) {
        card.querySelector(".value-card-inner").classList.toggle("flipped");
      }
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".value-card");

  cards.forEach(card => {
    card.addEventListener("click", () => {
      // Only trigger on mobile / touch devices
      if (window.innerWidth <= 992) {
        const inner = card.querySelector(".value-card-inner");
        inner.classList.toggle("flipped");
      }
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const popup = document.getElementById("newsPopup");
  const closeBtn = document.getElementById("closePopup");

  // Check if user has already seen popup
  const hasSeenPopup = localStorage.getItem("newsPopupSeen");

  if (!hasSeenPopup && popup) {
    setTimeout(() => {
      popup.classList.add("active");
    }, 1000); // delay a bit after page load
  }

  // Close popup
  const closePopup = () => {
    popup.classList.remove("active");
    localStorage.setItem("newsPopupSeen", "true"); // remember user
  };

  closeBtn.addEventListener("click", closePopup);

  // Close if clicking outside box
  popup.addEventListener("click", (e) => {
    if (e.target === popup) closePopup();
  });
});
