const menu = document.querySelector("#menu-bars");
const navbar = document.querySelector(".navbar");

menu.onclick = () => {
  menu.classList.toggle("fa-times");
  navbar.classList.toggle("active");
};

window.onscroll = () => {
  menu.classList.remove("fa-times");
  navbar.classList.remove("active");
};

document.querySelector("#search-icon").onclick = () => {
  document.querySelector("#search-form").classList.toggle("active");
};

document.querySelector("#close").onclick = () => {
  document.querySelector("#search-form").classList.remove("active");
};

let currentIndex = 0;
const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");

function showSlide(index) {
  if (index >= slides.length) currentIndex = 0;
  if (index < 0) currentIndex = slides.length - 1;

  slides.forEach((slide, i) => {
    slide.style.transform = `translateX(${-100 * currentIndex}%)`;
  });

  dots.forEach((dot) => dot.classList.remove("active"));
  dots[currentIndex].classList.add("active");
}

function nextSlide() {
  currentIndex++;
  showSlide(currentIndex);
}

let slideInterval = setInterval(nextSlide, 3000);

function currentSlide(index) {
  clearInterval(slideInterval);
  currentIndex = index;
  showSlide(currentIndex);
  slideInterval = setInterval(nextSlide, 3000);
}

showSlide(currentIndex);
