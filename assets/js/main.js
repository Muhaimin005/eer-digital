  window.addEventListener("scroll", function() {
    const header = document.querySelector("header");
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  function adjustMainPadding() {
    const topBar = document.querySelector(".top-bar");
    const mainNav = document.querySelector(".main-nav");
    const main = document.querySelector("main");

    const totalHeight = topBar.offsetHeight + mainNav.offsetHeight;
    main.style.paddingTop = totalHeight + "px";
  }

  window.addEventListener("load", adjustMainPadding);
  window.addEventListener("resize", adjustMainPadding);

  const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
});

observer.observe(document.querySelector('.industries-banner'));

  document.addEventListener("DOMContentLoaded", () => {
    const hero = document.querySelector(".hero");
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          hero.classList.add("animate");
        }
      });
    });
    observer.observe(hero);
  });

  document.addEventListener("DOMContentLoaded", () => {
  const reveals = document.querySelectorAll(".reveal-left, .reveal-right");

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        observer.unobserve(entry.target); // animate only once
      }
    });
  }, {
    threshold: 0.2
  });

  reveals.forEach(el => observer.observe(el));
  });

  // Form submission handler (EmailJS)
document.getElementById('contactForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const btn = this.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.textContent = 'Sending...';

    emailjs.sendForm('service_vvqn85e', 'template_xu9j1nd', this)
        .then(() => {
            alert('Message sent successfully!');
            this.reset();
        })
        .catch((error) => {
            console.error('EmailJS Error:', error);
            alert('Failed to send message. Please try again later.');
        })
        .finally(() => {
            btn.disabled = false;
            btn.textContent = 'Send Message';
        });
});

