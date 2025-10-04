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