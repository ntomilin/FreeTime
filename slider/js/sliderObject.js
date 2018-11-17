let sliderObject = {
    element: null,
    slides: [],
    activeSlideIndex: 0,
    blocked: false,

    nextSlide: function () {
        if (this.blocked) {
            return
        }
        this.blocked = true;

        let imageWidth = this.slides[this.activeSlideIndex].getBoundingClientRect().width;

        let nextSlideIndex = this.computeNextSlide();

        this.slides[nextSlideIndex].classList.remove('no-display');
        this.slides[nextSlideIndex].classList.add('next');

        this.slides[nextSlideIndex].classList.remove('animated-transform');
        this.slides[nextSlideIndex].style.transform = `translate(${imageWidth}px)`;
        this.slides[nextSlideIndex].classList.add('animated-transform');

        setTimeout(() => {
            this.slides[this.activeSlideIndex].style.transform = `translate(-${imageWidth}px)`;
            this.slides[nextSlideIndex].style.transform = `translate(-${0}px)`;
            setTimeout(() => {
                this.slides[this.activeSlideIndex].classList.add('no-display');
                this.slides[this.activeSlideIndex].style.transform = `translate(${0}px)`;
                this.slides[nextSlideIndex].classList.remove('next');
                this.activeSlideIndex = nextSlideIndex;
                this.blocked = false;
            }, 800);
        }, 0)
    },
    prevSlide: function () {

    },
    computeNextSlide: function () {
        return this.activeSlideIndex + 1 >= this.slides.length ? 0 : this.activeSlideIndex + 1
    }
};

window.onload = function () {
    let
        slider = document.querySelector('.slider'),
        slides = Array.from(document.querySelectorAll('.slider .slide'));

    sliderObject.element = slider;
    sliderObject.slides = slides;

    for (let i = 1; i < slides.length; i++) {
        slides[i].classList.add('no-display');
    }
};