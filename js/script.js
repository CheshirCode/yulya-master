/* Swiper*/
const swiper = new Swiper('.swiper', {
  // Optional parameters
  direction: 'horizontal',
  loop: true,

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  // And if we need scrollbar
  scrollbar: {
    el: '.swiper-scrollbar',
  },
});
/* modal*/
const modalLinks = document.querySelectorAll('.modal-link');
const body = document.querySelector('body');
const lockPadding = document.querySelectorAll('.lock-padding');

let unlock = true;
const timeout = 800;

if (modalLinks.length > 0) {
  for (let index = 0; index < modalLinks.length; index++) {
    const modalLink = modalLinks[index];
    modalLink.addEventListener("click", function (e) {
      const modalName = modalLink.getAttribute('href').replace('#', '');
      const currentModal = document.getElementById(modalName);
      modalOpen(currentModal);
      e.preventDefault();
    });
  }
}

const modalCloseIcon = document.querySelectorAll('.close-modal');
if (modalCloseIcon.length > 0) {
  for (let index = 0; index < modalCloseIcon.length; index++) {
    const el = modalCloseIcon[index];
    el.addEventListener('click', function (e) {
      modalClose(el.closest('.modal'));
      e.preventDefault();
    });
  }
}

function modalOpen(currentModal) {
  if (currentModal && unlock) {
    const modalActive = document.querySelector('.modal.open');
    if (modalActive) {
      modalClose(modalActive, false);
    } else {
      bodyLock();
    }
    currentModal.classList.add('open');
    currentModal.addEventListener('click', function (e) {
      if (!e.target.closest('.modal__content')) {
        modalClose(e.target.closest('.modal'));
      }
    });
  }
}

function modalClose(modalActive, doUnlock = true) {
  if (unlock) {
    modalActive.classList.remove('open');
    if (doUnlock) {
      bodyUnlock();
    };
  }
}

function bodyLock() {
  const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
  if (lockPadding.lenght > 0) {
    for (let index = 0; index < lockPadding.length; index++) {
      const el = lockPadding[index];
      el.style.paddingRight = lockPaddingValue;
    }
  }
  body.style.paddingRight = lockPaddingValue;
  body.classList.add('lock');

  unlock = false;
  setTimeout(function () {
    unlock = true;
  }, timeout);
}

function bodyUnlock() {
  setTimeout(function () {
    if (lockPadding.lenght > 0) {
      for (let index = 0; index < lockPadding.length; index++) {
        const el = lockPadding[index];
        el.style.paddingRight = '0px';
      }
    }
    body.style.paddingRight = '0px';
    body.classList.remove('lock');
  }, timeout);

  unlock = false;
  setTimeout(function () {
    unlock = true;
  }, timeout);
}

document.addEventListener('keyup', function (event) {
  if (event.code === 'Escape') {
    const modalActive = document.querySelector('.modal.open');
    modalClose(modalActive);
  }
});

function slidesPlugin(activeSlide) {
  const slides = document.querySelectorAll('.slide');
  slides[activeSlide].classList.add('active')

  for (const slide of slides) {
    slide.addEventListener('click', () => {
      clearActiveClasses()
      slide.classList.add('active')
    })
  }

  function clearActiveClasses() {
    slides.forEach((slide) => {
      slide.classList.remove('active')
    })
  }
}
slidesPlugin(0)


document.addEventListener('DOMContentLoaded', () => {

  let toTopBtn = document.querySelector('.toTop');

  window.onscroll = function () {
    if (window.scrollY > 580) {
      toTopBtn.style.display = 'inline-block'
    } else {
      toTopBtn.style.display = 'none'
    }
  }

  // плавный скролл наверх
  toTopBtn.addEventListener('click', function () {
    window.scrollBy({
      top: -document.documentElement.scrollHeight,
      behavior: 'smooth'
    });
  });
});