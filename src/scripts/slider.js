import items from '../data/slides.json' with { type: 'json' };
import { createElement } from './utils.js';

let currentSlide = 1;

const slidesList = document.querySelector('.slides-list');
const sliderInner = document.querySelector('.slider-inner');
const markersContainer = document.querySelector('.slider-markers');

function createSlideItem(item) {
  const element = createElement('li', 'slides-list_item');
  element.innerHTML = `<div class="slider-item">
                        <div class="slider-item_image image-wrapper">
                          <img src="./src/assets/images/slider/${item.image}" alt="item.name">
                        </div>
                        <div class="slider-item_info">
                          <h3 class="slider-item_title">${item.name}</h3>
                          <p class="slider-item_description">${item.description}</p>
                          <h3 class="slider-item_price">${item.price}</h3>
                        </div>
                      </div>`;
  return element;
}

function createMarker(index) {
  const marker = createElement('li', 'slider-control', 'slider-marker');
  if (index === currentSlide) {
    marker.classList.add('active');
  }
  marker.dataset.slide = index;
  return marker;
}

function renderSlider() {
  const slides = [items[items.length - 1], ...items, items[0]];
  slidesList.style.width = `${slides.length * 100}%`;
  slidesList.append(...slides.map((slide) => createSlideItem(slide)));
  slidesList.style.transform = `translateX(-${sliderInner.offsetWidth * currentSlide}px)`;

  for (let i = 1; i <= items.length; i++) {
    markersContainer.appendChild(createMarker(i));
  }
}

const prevSlideButton = document.querySelector('.slider_control.prev');
const nextSlideButton = document.querySelector('.slider_control.next');

let disableSlider = false;

function prevSlide() {
  if (disableSlider) return;
  disableSlider = true;
  deleteActiveClass();
  currentSlide -= 1;
  slidesList.classList.add('transition');
  slidesList.style.transform = `translateX(-${currentSlide * sliderInner.offsetWidth}px)`;
}

function nextSlide() {
  if (disableSlider) return;
  disableSlider = true;
  deleteActiveClass();
  currentSlide += 1;
  slidesList.classList.add('transition');
  slidesList.style.transform = `translateX(-${currentSlide * sliderInner.offsetWidth}px)`;
}

function deleteActiveClass() {
  markersContainer.querySelector(`[data-slide="${currentSlide}"]`).classList.remove('active');
}

function selectSlide(event) {
  const { target } = event;
  if (target.tagName !== 'LI') return;

  disableSlider = true;
  deleteActiveClass();
  currentSlide = Number(target.dataset.slide);
  slidesList.classList.add('transition');
  slidesList.style.transform = `translateX(-${currentSlide * sliderInner.offsetWidth}px)`;
}

function handleTransitionStart() {
  const index =
    currentSlide === 0 ? items.length : currentSlide === items.length + 1 ? 1 : currentSlide;
  markersContainer.querySelector(`[data-slide="${index}"]`).classList.add('active');
}

function handleTransitionEnd() {
  slidesList.classList.remove('transition');
  if (currentSlide === 0) {
    currentSlide = items.length;
  } else if (currentSlide === items.length + 1) {
    currentSlide = 1;
  }
  slidesList.style.transform = `translateX(-${currentSlide * sliderInner.offsetWidth}px)`;
  disableSlider = false;
}

function handleScreenResize() {
  slidesList.style.transform = `translateX(-${currentSlide * sliderInner.offsetWidth}px)`;
}

renderSlider();

prevSlideButton.addEventListener('click', prevSlide);
nextSlideButton.addEventListener('click', nextSlide);
markersContainer.addEventListener('click', selectSlide);
slidesList.addEventListener('transitionstart', handleTransitionStart);
slidesList.addEventListener('transitionend', handleTransitionEnd);
window.addEventListener('resize', handleScreenResize);
