// Make function-constructor. Always begin with big letter
function Carousel() {

  this.containerSwipe = document.querySelector('.slider');
  this.controls = document.createElement('div');
  this.slides = document.querySelectorAll('.slider-item');

  this.altPrevBtn = document.querySelector('.slider__btn.r-right-17vw');
  this.altNextBtn = document.querySelector('.slider__btn.l-left-17vw');

  this.currentSlide = 0; // counter
  this.interval = 4000; // 4000 miliseconds
  this.interval1 = 1000;
  this.interval15 = 1500;
  this.interval25 = 2500;
  this.slidesCount = this.slides.length;
  this.intervalID  = null;
  this.isPlaying = true;
  
  this.swipeStartX = null;
  this.swipeEndX = null;
}










Carousel.prototype = {

  constructor: Carousel,

_initControls: function() {
  this.controls.setAttribute('class', 'slider-control');

  const PAUSE = '<div class="btn-3d-wrap"><div class="btn-3d" id="pause-btn" ><div class="btn-3d-item front">Pause</div><div class="btn-3d-item left"></div><div class="btn-3d-item right"></div><div class="btn-3d-item top">Made with fucking love!</div><div class="btn-3d-item bot"></div><div class="btn-3d-item back">Play</div></div></div>';
  const PREV = '<button class="slider-control__btn" id="prev-btn" type="button">Prev</button>';
  const NEXT = '<button class="slider-control__btn" id="next-btn" type="button">Next</button>';

  this.controls.innerHTML = PREV + PAUSE + NEXT;
  this.containerSwipe.appendChild(this.controls);
},

_initIndicators: function() {
  const INDICATORS = document.createElement('ul');
  INDICATORS.setAttribute('class', 'indicators-container');

  for (let i = 0; i < this.slides.length; i++) {
    let li = document.createElement('li');
    li.className = 'indicator';
    li.setAttribute('data-slide-to', i);
    INDICATORS.appendChild(li);
  }
  INDICATORS.children[0].classList.add('is-hover-indicator');
  this.controls.prepend(INDICATORS);
},

_initProps: function() {
  this.indicatorsContainer = document.querySelector('.indicators-container');
  this.pauseBtn = document.querySelector('#pause-btn');
  this.prevBtn = document.querySelector('#prev-btn');
  this.nextBtn = document.querySelector('#next-btn');
  this.indicators = document.querySelectorAll('.indicator');
  this.shadowFront = document.querySelector('.btn-3d-item.front');
  this.shadowBack = document.querySelector('.btn-3d-item.back');
},

  // _initListeners - this is private property, always must begin with '_'
  _initListeners: function() {
    this.indicatorsContainer.addEventListener('click', this.indicate.bind(this));
    this.pauseBtn.addEventListener('click', this.pausePlay.bind(this));
    this.prevBtn.addEventListener('click', this.prev.bind(this));
    this.nextBtn.addEventListener('click', this.next.bind(this));
    this.containerSwipe.addEventListener('touchstart', this.swipeStart.bind(this));
    this.containerSwipe.addEventListener('touchend', this.swipeEnd.bind(this));
    this.altPrevBtn.addEventListener('click', this.prevWave.bind(this));
    this.altNextBtn.addEventListener('click', this.nextWave.bind(this));
    document.addEventListener('keydown', this.pressKey.bind(this));
  },


  _goToSlide: function(n)  {
    this.slides[this.currentSlide].classList.toggle('is-active');
    this.indicators[this.currentSlide].classList.toggle('is-hover-indicator');
    this.currentSlide = (n + this.slidesCount) % this.slidesCount;
    this.slides[this.currentSlide].classList.toggle('is-active');
    this.indicators[this.currentSlide].classList.toggle('is-hover-indicator');       
  },
 
  _gotoPrev: function() {
    this._goToSlide(this.currentSlide - 1);
  },
  
  _gotoNext: function() {
    this._goToSlide(this.currentSlide + 1);
  },
  
  playS: function() {
    this.intervalID = setInterval(() => this._gotoNext(), this.interval);
    this.isPlaying = true;
  },
  
  pause: function() {
    if (this.isPlaying) {
      clearInterval(this.intervalID);

      this.isPlaying = false;
    }
  },
  
  pausePlay: function() {
    this.pauseBtn.classList.toggle('myHover');
    
    // remove the shadow when the cube moving
    this.shadowFront.classList.toggle('is-shadow-off'); 
    this.shadowBack.classList.toggle('is-shadow-on');

    this.isPlaying ? this.pause() : this.playS();
  },

  prev: function() {
    this.pauseBtn.classList.add('myHover');
    
    this.pause();
    this._gotoPrev();
  },

  next: function() {  
    this.pauseBtn.classList.add('myHover');

    this.pause();
    this._gotoNext();
  },

  indicate: function(event) {
    let target = event.target;
    
    if (target.classList.contains('indicator')) {
      let n = +target.getAttribute('data-slide-to');
      this.pauseBtn.classList.add('myHover');
      this.pause();
      this._goToSlide(n);
    }
  },

  prevWave: function() {
    this.pauseBtn.classList.add('myHover');
    // soundClickRightIndicator.play();
    
    this.pause();
    this._gotoPrev();
  },

  nextWave: function() {
    this.pauseBtn.classList.add('myHover');
    // soundClickLeftIndicator.play();
    
    this.pause();
    this._gotoNext();
  },

  pressKey: function (event) {

    console.log('pressKey - work');

    if (event.code === 'ArrowLeft') {
      this.prevWave();
    }
    if (event.code === 'ArrowRight') {
      this.nextWave();
    }
    if (event.code === 'Space') {
      this.pausePlay();
    }
  },

  swipeStart: function(event) {
    this.swipeStartX = event.changedTouches[0].pageX;
  },

  swipeEnd: function(event) {
    this.swipeEndX = event.changedTouches[0].pageX;
    if ((this.swipeStartX - this.swipeEndX) > 50 ) {
      this.next();
    };
    (this.swipeStartX - this.swipeEndX < -50) && this.prev();
  },

  init: function() {
    this._initControls();
    this._initIndicators();
    this._initProps();
    this._initListeners();
    this.intervalID = setInterval( () => {
      this._gotoNext()
    }, this.interval);
  }
  
}
