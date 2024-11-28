// Universal Slider Function
function createSlider(options) {
  // Default configuration
  const defaults = {
    sliderSelector: ".slider",
    wrapperSelector: ".slider-wrapper",
    slideSelector: ".slide",
    prevSelector: ".prev",
    nextSelector: ".next",
    dotsSelector: ".dots",
    dotSelector: ".dot",
    dotActiveClass: "active",
    autoSlideInterval: 5000,
    initialSlide: 0,
  };

  // Merge user options with defaults
  const config = { ...defaults, ...options };

  // Select slider elements
  const slider = document.querySelector(config.sliderSelector);

  // Early return if slider not found
  if (!slider) return null;

  const wrapper = slider.querySelector(config.wrapperSelector);
  const slides = slider.querySelectorAll(config.slideSelector);
  const prev = slider.querySelector(config.prevSelector);
  const next = slider.querySelector(config.nextSelector);
  const dotsContainer = slider.querySelector(config.dotsSelector);
  const dots = dotsContainer
    ? dotsContainer.querySelectorAll(config.dotSelector)
    : [];

  let currentIndex = config.initialSlide;
  const totalSlides = slides.length;

  // Show specific slide
  function showSlide(index) {
    // Ensure index wraps around
    currentIndex = (index + totalSlides) % totalSlides;

    // Move slides
    wrapper.style.transform = `translateX(-${currentIndex * 100}%)`;

    // Update active dot if dots exist
    if (dots.length > 0) {
      dots.forEach((dot) => dot.classList.remove(config.dotActiveClass));
      dots[currentIndex].classList.add(config.dotActiveClass);
    }
  }

  // Auto slide interval
  let slideInterval = setInterval(() => {
    showSlide(currentIndex + 1);
  }, config.autoSlideInterval);

  // Reset interval when user interacts
  function resetInterval() {
    clearInterval(slideInterval);
    slideInterval = setInterval(
      () => showSlide(currentIndex + 1),
      config.autoSlideInterval
    );
  }

  // Navigation event listeners
  if (next) {
    next.addEventListener("click", () => {
      resetInterval();
      showSlide(currentIndex + 1);
    });
  }

  if (prev) {
    prev.addEventListener("click", () => {
      resetInterval();
      showSlide(currentIndex - 1);
    });
  }

  // Dot navigation
  if (dots.length > 0) {
    dots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        resetInterval();
        showSlide(index);
      });
    });
  }

  // Show initial slide
  showSlide(currentIndex);

  // Return methods for external control if needed
  return {
    showSlide,
    getCurrentIndex: () => currentIndex,
  };
}

// Initialize sliders when page loads
document.addEventListener("DOMContentLoaded", () => {
  // Home slider
  createSlider({
    sliderSelector: ".homeSlider",
    wrapperSelector: ".slides",
    slideSelector: ".slide",
    prevSelector: null,
    nextSelector: null,
    dotsSelector: ".dots",
    dotSelector: ".dot",
  });

  // Chefs slider
  createSlider({
    sliderSelector: ".chef-slider",
    wrapperSelector: ".chef-wrapper",
    slideSelector: ".chef-slide",
    prevSelector: ".chef-prev",
    nextSelector: ".chef-next",
    dotsSelector: ".chef-dots",
    dotSelector: ".chef-dot",
    dotActiveClass: "active",
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const menuBars = document.getElementById("menu-bars");
  const navbar = document.querySelector(".navbar");
  menuBars.addEventListener("click", () => {
    navbar.classList.toggle("active");
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const searchIcon = document.getElementById('search-icon');
  const searchForm = document.getElementById('search-form');
  const closeIcon = document.getElementById('close');

  searchIcon.addEventListener('click', () => {
    searchForm.classList.toggle('active');
  });

  closeIcon.addEventListener('click', () => {
    searchForm.classList.remove('active');
  });
});
