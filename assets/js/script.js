AOS.init();

/*
const counterNums = Array.from(document.querySelectorAll(".counter-element"));
const interval = 2400;

counterNums.forEach((num) => {
  let startValue = 0;
  const endValue = +num.getAttribute("data-value");
  const duration = Math.floor(interval / endValue);

  const counter = setInterval(() => {
    startValue += 1;
    num.innerText = startValue;
    if (startValue >= endValue) clearInterval(counter);
  }, duration);
});
*/

const counterNums = document.querySelectorAll(".counter-element");
const interval = 1800;
const animationTriggeredFlags = Array.from(
  { length: counterNums.length },
  () => false
);

function startCounting(num, index) {
  let startValue = 0;
  const endValue = +num.getAttribute("data-value");
  const duration = Math.floor(interval / endValue);

  const counter = setInterval(() => {
    startValue += 1;
    num.innerText = startValue;
    if (startValue >= endValue) {
      clearInterval(counter);
      animationTriggeredFlags[index] = true;
    }
  }, duration);
}

function handleIntersect(entries, observer) {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting && !animationTriggeredFlags[index]) {
      startCounting(entry.target, index);
      observer.unobserve(entry.target);
    }
  });
}

const observer = new IntersectionObserver(handleIntersect, { threshold: 0.5 });

counterNums.forEach((num) => {
  observer.observe(num);
});

// clients-button
// .column-on-button

const clientsButton = document.querySelector(".clients-button");
const clientsButtonImage = document.querySelector(".clients-button-img");
const columnOnButton = document.querySelectorAll(".column-on-button");

let columnsShown = false;

clientsButton.addEventListener("click", function () {
  if (columnsShown) {
    columnOnButton.forEach((column) => {
      column.style.display = "none";
    });
    clientsButtonImage.style.transform = "rotate(0deg)";
  } else {
    columnOnButton.forEach((column) => {
      column.style.display = "block";
    });
    clientsButtonImage.style.transform = "rotate(-180deg)";
  }

  columnsShown = !columnsShown;
});

//
//
//
document.addEventListener("DOMContentLoaded", function () {
  // Get the .our-company section
  const ourCompanySection = document.querySelector(".our-company");

  // Add a scroll event listener
  window.addEventListener("scroll", function () {
    // Get the position of the .our-company section
    const rect = ourCompanySection.getBoundingClientRect();

    // Check if the section is in the viewport
    if (rect.top < window.innerHeight && rect.bottom >= 0) {
      // Add the animation class to the elements when in view
      document
        .querySelectorAll(".animation-trigger")
        .forEach(function (element) {
          element.classList.add("animate");
        });

      // Remove the scroll event listener to stop unnecessary checks
      window.removeEventListener("scroll", arguments.callee);
    }
  });
});

const header = document.querySelector("header");
const navbar = document.querySelector("#navbar");
const breakpoint = navbar.getBoundingClientRect().bottom + 200;
const navbarToggler = document.querySelector(".navbar-toggler");
const navbarCollapse = document.querySelector(".navbar-collapse");

window.addEventListener("scroll", function () {
  const scrolledBelowBreakpoint = this.scrollY > breakpoint;

  if (!navbarCollapse.classList.contains("show")) {
    if (scrolledBelowBreakpoint) {
      header.classList.add("sticky");
      header.classList.remove("fixed");
    } else {
      header.classList.remove("sticky");
      header.classList.remove("fixed");
    }
  } else {
    header.classList.add("fixed");
    header.classList.remove("sticky");
  }
});

navbarToggler.addEventListener("click", function () {
  if (header.classList.contains("fixed")) {
    header.classList.remove("fixed");
  } else {
    header.classList.add("fixed");
  }
});

// Closing the navbar when a link is clicked
const menuLinks = document.querySelectorAll(".navbar-collapse a");

menuLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navbarCollapse.classList.remove("show");
    navbarToggler.setAttribute("aria-expanded", "false");

    // Only add sticky class if scrolled below breakpoint
    if (window.scrollY > breakpoint) {
      header.classList.add("sticky");
      header.classList.remove("fixed");
    } else {
      header.classList.remove("sticky");
      header.classList.remove("fixed");
    }
  });
});
