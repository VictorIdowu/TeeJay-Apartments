console.log('Hello world');

////////////////////////////////////////////////////////////
//Make mobile navigation work ////
const btnNavEl = document.querySelector('.btn-mobile-nav');
const headerEl = document.querySelector('header');

btnNavEl.addEventListener('click', function () {
  headerEl.classList.toggle('nav-open');
});

///////////////////////////////////////////////////////////
// Set current Year

const yearEl = document.querySelector('.year');
const currentYear = new Date().getFullYear();
yearEl.textContent = currentYear;

///////////////////////////////////////////////////////////
//Smooth scrollig animation

const allLinks = document.querySelectorAll('a:link');

allLinks.forEach(function (link) {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    const href = link.getAttribute('href');

    //Scroll back to top
    if (href === '#')
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });

    //scroll to other links
    if (href !== '#' && href.startsWith('#')) {
      const sectionEl = document.querySelector(href);
      sectionEl.scrollIntoView({ behavior: 'smooth' });
      headerEl.classList.toggle('nav-open');
    }
  });
});

////////////////////////////////////////////////////////////
// Sticky navigation
const headerSectionEl = document.querySelector('.header');

const obs = new IntersectionObserver(
  function (entries) {
    const ent = entries[0];

    if (ent.isIntersecting === false) {
      document.body.classList.add('sticky');
    }

    if (ent.isIntersecting) {
      document.body.classList.remove('sticky');
    }

    const wbtnrSectionEl = document.querySelector('.w-btn');

    if (ent.isIntersecting === false) {
      document.body.classList.add('sticky-2');
    }

    if (ent.isIntersecting) {
      document.body.classList.remove('sticky-2');
    }
  },
  {
    root: null,
    threshold: 0,
    rootMargin: '-80px',
  }
);
obs.observe(headerEl);

///////////////////////////////////////////////////////////
// Fixing flexbox gap property missing in some Safari versions

function checkFlexGap() {
  var flex = document.createElement('div');
  flex.style.display = 'flex';
  flex.style.flexDirection = 'column';
  flex.style.rowGap = '1px';

  flex.appendChild(document.createElement('div'));
  flex.appendChild(document.createElement('div'));

  document.body.appendChild(flex);
  var isSupported = flex.scrollHeight === 1;
  flex.parentNode.removeChild(flex);
  console.log(isSupported);

  if (!isSupported) document.body.classList.add('no-flexbox-gap');
}
checkFlexGap();

/////////////// Slider ///////////////////
const slides = document.querySelectorAll('.slide');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
const dotContainer = document.querySelector('.dots');

class Slider {
  curSlide = 0;
  maxSlide = slides.length;
  constructor() {
    // Next slide
    btnRight.addEventListener('click', this._nextSlide.bind(this));

    // Previous slide
    btnLeft.addEventListener('click', this._prevSlide.bind(this));

    // Activate Dot
    dotContainer.addEventListener('click', this._activeDots.bind(this));

    // Keyboard scroll
    document.addEventListener('keydown', this._keyboardScroll.bind(this));

    // active img
    this._goToSlide(0);

    // create dots
    slides.forEach(this._createDots);

    // active dot
    this._activeDot(0);

    this._autoMove.bind(this);
  }

  _goToSlide(slide) {
    return slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  }

  _nextSlide() {
    this.curSlide === this.maxSlide - 1 ? (this.curSlide = 0) : this.curSlide++;

    this._goToSlide(this.curSlide);
    this._activeDot(this.curSlide);
  }

  _prevSlide() {
    this.curSlide === 0 ? (this.curSlide = this.maxSlide - 1) : this.curSlide--;

    this._goToSlide(this.curSlide);
    this._activeDot(this.curSlide);
  }

  _autoMove() {
    setInterval(this._nextSlide(), 2000);
  }

  _activeDot(slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));
    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  }

  _activeDots(e) {
    if (e.target.classList.contains('dots__dot')) {
      // const slide = e.target.dataset.slide;
      const { slide } = e.target.dataset;

      this._goToSlide(slide);
      this._activeDot(slide);
    }
  }

  _keyboardScroll(e) {
    e.key === 'ArrowLeft' && this._prevSlide();
    e.key === 'ArrowRight' && this._nextSlide();
  }

  _createDots(_, i) {
    dotContainer.insertAdjacentHTML(
      'beforeend',
      `<button class="dots__dot" data-slide="${i}"></button>`
    );
  }
}
const slider = new Slider();

// const slider = function () {
//   const slides = document.querySelectorAll('.slide');
//   const btnLeft = document.querySelector('.slider__btn--left');
//   const btnRight = document.querySelector('.slider__btn--right');
//   const dotContainer = document.querySelector('.dots');

//   let curSlide = 0;
//   const maxSlide = slides.length;

//   const goToSlide = slide => {
//     slides.forEach(
//       (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
//     );
//   };

//   // Next slide
//   const nextSlide = function () {
//     curSlide === maxSlide - 1 ? (curSlide = 0) : curSlide++;

//     goToSlide(curSlide);
//     activeDot(curSlide);
//   };

//   // Previous slide
//   const prevSlide = function () {
//     curSlide === 0 ? (curSlide = maxSlide - 1) : curSlide--;

//     goToSlide(curSlide);
//     activeDot(curSlide);
//   };
//   btnLeft.addEventListener('click', prevSlide);
//   btnRight.addEventListener('click', nextSlide);

//   // Activate Dot
//   const activeDot = slide => {
//     document
//       .querySelectorAll('.dots__dot')
//       .forEach(dot => dot.classList.remove('dots__dot--active'));

//     document
//       .querySelector(`.dots__dot[data-slide="${slide}"]`)
//       .classList.add('dots__dot--active');
//   };

//   dotContainer.addEventListener('click', function (e) {
//     if (e.target.classList.contains('dots__dot')) {
//       // const slide = e.target.dataset.slide;
//       const { slide } = e.target.dataset;

//       goToSlide(slide);
//       activeDot(slide);
//     }
//   });

//   // Keyboard scroll
//   document.addEventListener('keydown', function (e) {
//     e.key === 'ArrowLeft' && prevSlide();
//     e.key === 'ArrowRight' && nextSlide();
//   });

//   // Slider Dots
//   const createDots = () => {
//     slides.forEach(function (_, i) {
//       dotContainer.insertAdjacentHTML(
//         'beforeend',
//         `<button class="dots__dot" data-slide="${i}"></button>`
//       );
//     });
//   };

//   const init = () => {
//     goToSlide(0);
//     createDots();
//     activeDot(0);
//   };
//   init();
// };
// slider();
