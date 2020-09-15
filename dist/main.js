(() => {
  const toggle = (selector, className) => {
    if (selector.classList.contains(className)) {
      selector.classList.remove(className);
    } else {
      selector.classList.add(className);
    }
  };

  const initAboutCarousel = (selector) => {
    const rootEl = document.querySelector(selector);
    const content = rootEl.querySelector(".viewport .items");
    const indicators = rootEl.querySelectorAll(".indicators .dot");
    let currentTask;

    const clearIndicators = () => {
      indicators.forEach((el) => {
        el.classList.remove("active");
      });
    };

    const showImage = (index) => {
      content.style.transform = `translateX(-${index * 100}%)`;

      clearIndicators();
      indicators[index].classList.add("active");

      clearTimeout(currentTask);

      currentTask = setTimeout(() => {
        const nextIndex = (index + 1) % indicators.length;

        showImage(nextIndex);
      }, 5000);
    };

    showImage(0);

    indicators.forEach((el, index) => {
      el.addEventListener("click", () => {
        showImage(index);
      });
    });
  };

  const initTestimonialCarousel = (selector) => {
    const root = document.querySelector(selector);
    const images = root.querySelectorAll(".items img");
    const indicators = root.querySelectorAll(".indicators .dot");
    const textContent = root.querySelectorAll(".text-block");
    const arrowBtns = root.querySelectorAll(".controls .arrow");

    let currentTask;
    let currentIndex = 0;

    const switchTo = (elms, index) => {
      elms.forEach((el) => {
        el.classList.remove("active");
      });

      elms[index].classList.add("active");
    };

    const showContent = (index) => {
      currentIndex = index;

      switchTo(indicators, index);
      switchTo(images, index);
      switchTo(textContent, index);

      clearTimeout(currentTask);

      currentTask = setTimeout(() => {
        const nextIndex = (index + 1) % indicators.length;

        showContent(nextIndex);
      }, 3000);
    };

    showContent(currentIndex);

    indicators.forEach((el, index) => {
      el.addEventListener("click", () => {
        showContent(index);
      });
    });

    arrowBtns[0].addEventListener("click", () => {
      if (currentIndex > 0) {
        showContent(currentIndex - 1);
      } else {
        showContent(indicators.length - 1);
      }
    });

    arrowBtns[1].addEventListener("click", () => {
      showContent((currentIndex + 1) % indicators.length);
    });
  };

  const smoothAppear = (imgContainer) => {
    const imagesPosition = imgContainer.getBoundingClientRect().top;
    // images fade in when they reach 0.5 of the screen height
    const scrollPosition = window.innerHeight * 0.5;

    if (scrollPosition > imagesPosition) {
      imgContainer.classList.add("fade-in");
    }
  };

  const initMenu = () => {
    const menu = document.querySelector(".hamburger");
    const displayMenu = document.querySelector(".menu");
    const menuOptions = displayMenu.querySelectorAll("a");

    menu.addEventListener("click", () => {
      toggle(menu, "close");
      toggle(displayMenu, "active");
    });

    menuOptions.forEach((el) => {
      el.addEventListener("click", () => {
        setTimeout(() => {
          toggle(displayMenu, "active");
          toggle(menu, "close");
        }, 1000);
      });
    });
  };

  const initNavbar = () => {
    const nav = document.querySelector("nav");

    window.addEventListener("scroll", () => {
      if (window.scrollY >= 50) {
        nav.classList.add("fixed");
      } else {
        nav.classList.remove("fixed");
      }
    });
  };

  const initGrid = (selector) => {
    const root = document.querySelector(selector);

    const detailsBtn = root.querySelectorAll(".grid-content .details");
    const content = root.querySelectorAll(".grid-block");
    const closeBtn = root.querySelectorAll(".close-btn");

    const clearActive = () => {
      content.forEach((el) => {
        el.classList.remove("active");
      });
    };

    detailsBtn.forEach((el, index) => {
      el.addEventListener("click", (e) => {
        e.preventDefault();

        clearActive();
        toggle(content[index], "active");
      });
    });

    closeBtn.forEach((el, index) => {
      el.addEventListener("click", () => {
        toggle(content[index], "active");
      });
    });
  };

  const setupSmoothAppear = (selector) => {
    const el = document.querySelector(selector);
    window.addEventListener("scroll", () => smoothAppear(el));
  };

  const setupScrolling = () => {
    document.querySelector("html").style.scrollBehavior = "smooth";
  };

  document.addEventListener("DOMContentLoaded", () => {
    initMenu();
    initNavbar();

    initAboutCarousel(".img-block");
    initTestimonialCarousel(".content-wrapper");

    initGrid("#services .grid-wrapper");

    setupSmoothAppear(".grid-container");
    setupSmoothAppear(".grid-team");

    setupScrolling();
  });
})();
