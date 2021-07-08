// For the desktop version without the implementation of swipes
// let carousel = new Carousel();

// For the desktop version with the implementation of swipes
// let carousel = new SwipeCarousel('.slider', '.slider-item');



// For the implementation version of the code on ES6 syntax classes
// let carousel = new Carousel('.slider', '.slider-item');

// let carousel = new SwipeCarousel('.slider', '.slider-item');

let carousel = new SwipeCarousel({
  // Через этот объект передаются настройки будущего слайдера
  containerID: '.slider',
  slideID: '.slider-item',
  interval: 4000
});


carousel.init();
