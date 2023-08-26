const myslide = document.querySelectorAll('.myslider');

let counter= 1;
slidefun(counter);

let timer = setInterval(autoslide, 3000);
function autoslide(){
    counter += 1;
    slidefun(counter);

}
function plusSlides(n){
    counter += n;
    slidefun(counter);
    resetTimer();
}
function currentSlide(n){
    counter = n;
    slidefun(counter);
    resetTimer();
}
function resetTimer(){
    clearInterval(timer);
    timer = setInterval(autoslide, 3000);

}
function slidefun(n){
    let i;
    for(i=0; i<myslide.length; i++){
        myslide[i].style.display = "none";

    }
if(n > myslide.length){
    counter= 1;
}
if(n < 1){
    counter = myslide.length;
}
myslide[counter -1].style.display = "block"; 
}
const wrapper = document.querySelector(".wrapper");
const carousel = document.querySelector(".carousel");
const firstCardWidth = carousel.querySelector(".card").offsetWidth;
 const carouselChildrens = [...carousel.children]; 
let isDragging = false, startX, startScrollLeft, timeoutId;

let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

carouselChildrens.slice(-cardPerView).reverse().forEach(card =>{
carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
});
carouselChildrens.slice(0, cardPerView).forEach(card =>{
    carousel.insertAdjacentHTML("beforeend", card.outerHTML);
    });

const dragStart = (e) => {
    isDragging = true;
    carousel.classList.add("dragging");
    startX = e.pageX; 
    startScrollLeft = carousel.scrollLeft;

}

const dragging = (e) => {
    if(!isDragging) return;
    carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
}
const dragStop = () =>{
    isDragging = false;
carousel.classList.remove("dragging");
}

const autoPlay = () => {
    if(window.innerWidth < 500) return;
    timeoutId = setTimeout(() => carousel.scrollLeft += firstCardWidth, 2500);
}
autoPlay();
const infiniteScroll = () => {
    if (carousel.scrollLeft === 0) {
      carousel.classList.add("no-transition");
      carousel.scrollLeft = carousel.scrollWidth - 2 * carousel.offsetWidth;
      carousel.classList.remove("no-transition");
    } else if (
      Math.ceil(carousel.scrollLeft) ===
      carousel.scrollWidth - carousel.offsetWidth
    ) {
      carousel.classList.add("no-transition");
      carousel.scrollLeft = carousel.offsetWidth;
      carousel.classList.remove("no-transition");
    }
    clearTimeout(timeoutId);
    if (!wrapper.matches(":hover")) autoPlay();
  };





carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
carousel.addEventListener("scroll", infiniteScroll);
wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
wrapper.addEventListener("mouseleave", autoPlay);

const sliderContainer = document.querySelector(".slider-container");
const slides = document.querySelectorAll(".slide");
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");
const dotsContainer = document.querySelector(".dots");

let currentIndex = 0;

// Create dots and add event listeners
for (let i = 0; i < slides.length; i++) {
  const dot = document.createElement("div");
  dot.classList.add("dot");
  dot.addEventListener("click", () => goToSlide(i));
  dotsContainer.appendChild(dot);
}

const dots = document.querySelectorAll(".dot");
dots[currentIndex].classList.add("active");

// Update dot classes and currentIndex
const updateDots = () => {
  dots.forEach((dot, index) => {
    dot.classList.toggle("active", index === currentIndex);
  });
};

// Go to specific slide
const goToSlide = (index) => {
  currentIndex = index;
  updateDots();
  sliderContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
};

// Event listeners for prev and next buttons
prevBtn.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + slides.length) % slides.length;
  updateDots();
  sliderContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
});

nextBtn.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % slides.length;
  updateDots();
  sliderContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
});






const sliderContainer2 = document.querySelector('.slider-container');
const prevButton = document.querySelector('.prev-btn');
const nextButton = document.querySelector('.next-btn');

let slideIndex = 0;

// Move the slides to the left or right
function moveSlides(direction) {
  const slides = document.querySelectorAll('.slide');
  const slideWidth = slides[0].offsetWidth;

  if (direction === 'prev') {
    slideIndex = Math.max(slideIndex - 1, 0);
  } else if (direction === 'next') {
    slideIndex = Math.min(slideIndex + 1, slides.length - 1);
  }

  sliderContainer2.style.transform = `translateX(-${slideWidth * slideIndex}px)`;
}

prevButton.addEventListener('click', () => moveSlides('prev'));
nextButton.addEventListener('click', () => moveSlides('next'));

// Autoplay the slider
let autoplayInterval;

function startAutoplay() {
  autoplayInterval = setInterval(() => {
    moveSlides('next');
  }, 3000); // Change the interval as needed
}

function stopAutoplay() {
  clearInterval(autoplayInterval);
}

startAutoplay();

// Add draggability to the slider
let isDragging2 = false;
let startPosX = 0;
let currentTranslate = 0;
let prevTranslate = 0;

sliderContainer2.addEventListener('mousedown', (e) => {
  isDragging2 = true;
  startPosX = e.clientX;
  stopAutoplay();
  sliderContainer2.classList.add('grabbing');
});

sliderContainer2.addEventListener('mousemove', (e) => {
  if (!isDragging2) return;

  const mouseX = e.clientX;
  const deltaX = mouseX - startPosX;

  currentTranslate = prevTranslate + deltaX;
  sliderContainer2.style.transform = `translateX(${currentTranslate}px)`;
});

sliderContainer2.addEventListener('mouseup', () => {
  isDragging2 = false;
  prevTranslate = currentTranslate;
  sliderContainer2.classList.remove('grabbing');
  startAutoplay();
});

sliderContainer2.addEventListener('mouseleave', () => {
  isDragging2 = false;
  sliderContainer.classList.remove('grabbing');
});