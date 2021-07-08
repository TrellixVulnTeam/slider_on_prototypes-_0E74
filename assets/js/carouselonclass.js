
class Carousel {
  constructor(s) {
    const settings = this._initConfig(s);

    this.containerSwipe = document.querySelector(settings.containerID);
    this.slides = document.querySelectorAll(settings.slideID);
    this.controls = document.createElement('div');    
    this.interval = settings.interval; // 4000 miliseconds     
    this.slidesCount = this.slides.length; 
  }

  _initConfig(o) {
    const setup = {
      containerID: '.slider',
      slideID: '.slider-item',
      interval: 4000
    };
    
    if (o !== undefined) {
      setup.containerID = o.containerID || '.slider';
      setup.slideID = o.slideID || '.slider-item';
      setup.interval = o.interval || 4000;
    }

    return setup;
  }

  _initControls() {
    this.controls.setAttribute('class', 'slider-control');
    const PAUSE = '<div class="btn-3d-wrap"><div class="btn-3d" id="pause-btn" ><div class="btn-3d-item front">Pause</div><div class="btn-3d-item left"></div><div class="btn-3d-item right"></div><div class="btn-3d-item top"></div><div class="btn-3d-item bot"></div><div class="btn-3d-item back">Play</div></div></div>';
    const PREV = '<button class="slider-control__btn" id="prev-btn" type="button">Prev</button>';
    const NEXT = '<button class="slider-control__btn" id="next-btn" type="button">Next</button>';

    this.controls.innerHTML = PREV + PAUSE + NEXT;
    this.containerSwipe.appendChild(this.controls);
  }

  _initIndicators() {
    const INDICATORS = document.createElement('ul');
    INDICATORS.setAttribute('class', 'indicators-container');

    for (let i = 0; i < this.slidesCount; i++) {
      let li = document.createElement('li');
      li.className = 'indicator';
      li.setAttribute('data-slide-to', i);
      INDICATORS.appendChild(li);
    }

    INDICATORS.children[0].classList.add('is-hover-indicator');
    this.controls.prepend(INDICATORS);
  }

  _initProps() {
    this.currentSlide = 0; // counter
    this.intervalID  = null;
    this.isPlaying = true;
    this.indicatorsContainer = document.querySelector('.indicators-container');
    this.pauseBtn = document.querySelector('#pause-btn');
    this.prevBtn = document.querySelector('#prev-btn');
    this.nextBtn = document.querySelector('#next-btn');
    this.altPrevBtn = document.querySelector('.slider__btn.r-right-17vw');
    this.altNextBtn = document.querySelector('.slider__btn.l-left-17vw');
    this.indicators = document.querySelectorAll('.indicator');
    this.shadowFront = document.querySelector('.btn-3d-item.front');
    this.shadowBack = document.querySelector('.btn-3d-item.back');
  }

    // _initListeners - this is private property, always must begin with '_'
  _initListeners() {
    this.indicatorsContainer.addEventListener('click', this.indicate.bind(this));
    this.pauseBtn.addEventListener('click', this.pausePlay.bind(this));
    this.prevBtn.addEventListener('click', this.prev.bind(this));
    this.nextBtn.addEventListener('click', this.next.bind(this));
    this.altPrevBtn.addEventListener('click', this.prevWave.bind(this));
    this.altNextBtn.addEventListener('click', this.nextWave.bind(this));
    document.addEventListener('keydown', this.pressKey.bind(this));
  }

  _goToSlide(n)  {
    this.slides[this.currentSlide].classList.toggle('is-active');
    this.indicators[this.currentSlide].classList.toggle('is-hover-indicator');
    this.currentSlide = (n + this.slidesCount) % this.slidesCount;
    this.slides[this.currentSlide].classList.toggle('is-active');
    this.indicators[this.currentSlide].classList.toggle('is-hover-indicator');       
  }

  _gotoPrev() {
    this._goToSlide(this.currentSlide - 1);
  }
  
  _gotoNext() {
    this._goToSlide(this.currentSlide + 1);
  }
  
  playS() {
    this.intervalID = setInterval(() => this._gotoNext(), this.interval);
    this.isPlaying = true;
  }
  
  pause() {
    if (this.isPlaying) {
      clearInterval(this.intervalID);

      this.isPlaying = false;
    }
  }
  
  pausePlay() {
    this.pauseBtn.classList.toggle('myHover');
    // remove the shadow when the cube moving
    this.shadowFront.classList.toggle('is-shadow-off'); 
    this.shadowBack.classList.toggle('is-shadow-on');
    this.isPlaying ? this.pause() : this.playS();
  }

  prev() {
    this.pauseBtn.classList.add('myHover');
    this.pause();
    this._gotoPrev();
  }

  next() {  
    this.pauseBtn.classList.add('myHover');
    this.pause();
    this._gotoNext();
  }

  indicate(event) {
    let target = event.target;
    
    if (target.classList.contains('indicator')) {
      let n = +target.getAttribute('data-slide-to');
      this.pauseBtn.classList.add('myHover');
      this.pause();
      this._goToSlide(n);
    }
  }

  prevWave() {
    this.pauseBtn.classList.add('myHover');
    // soundClickRightIndicator.play();
    this.pause();
    this._gotoPrev();
  }

  nextWave() {
    this.pauseBtn.classList.add('myHover');
    // soundClickLeftIndicator.play();
    this.pause();
    this._gotoNext();
  }

  pressKey(event) {
    if (event.code === 'ArrowLeft') {
      this.prevWave();
    }
    if (event.code === 'ArrowRight') {
      this.nextWave();
    }
    if (event.code === 'Space') {
      this.pausePlay();
    }
  }

  init() {
    this._initControls();
    this._initIndicators();
    this._initProps();
    this._initListeners();
    this.intervalID = setInterval( () => {
      this._gotoNext()
    }, this.interval);
  }



}










// // THIS BLOCK CODE CAN COMMENT, IF DONT NEED SUPPORT SWIPES
// // AND DELETE COMMENTS FROM - let carousel = new Carousel() IN THE FILE main.js

class SwipeCarousel extends Carousel {
  _swipeStart(event) {
      this.swipeStartX = event.changedTouches[0].pageX;
    }

  _swipeEnd(event) {
      this.swipeEndX = event.changedTouches[0].pageX;
      if ((this.swipeStartX - this.swipeEndX) > 50 ) {
        this.next();
      };
      (this.swipeStartX - this.swipeEndX < -50) && this.prev();
    }
  _initListeners() {
    // Carousel.prototype._initListeners.apply(this);
    super._initListeners();
    this.containerSwipe.addEventListener('touchstart', this._swipeStart.bind(this));
    this.containerSwipe.addEventListener('touchend', this._swipeEnd.bind(this));
  }
}



// function SwipeCarousel() {
//   Carousel.apply(this, arguments);
// }

// SwipeCarousel.prototype = Object.create(Carousel.prototype);
// SwipeCarousel.prototype.constructor = SwipeCarousel;

// //  P R I V A T E   M E T H O D


