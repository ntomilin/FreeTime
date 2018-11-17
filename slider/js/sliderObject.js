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

        // let nextSlideIndex = this.computeNextSlide();
        let nextSlideIndex = 1//this.computeNextSlide();
        console.log(`curr: %${this.activeSlideIndex}, next: ${nextSlideIndex}`);

        this.element.classList.add('big');
        this.slides[nextSlideIndex].classList.remove('no-display');


        this.slides[this.activeSlideIndex].classList.add('move-left');
        this.slides[nextSlideIndex].classList.add('move-left');

        setTimeout(() => {
            this.slides[this.activeSlideIndex].classList.add('no-display');
            this.slides[this.activeSlideIndex].classList.remove('move-left');
            this.slides[nextSlideIndex].classList.remove('move-left');
            this.element.classList.remove('big');

            this.blocked = false;
            let firstSlide = this.slides[0];
            let newSlides = [];
            for (let i = 1; i < this.slides.length; i++) {
                newSlides.push(this.slides[i]);
            }
            newSlides.push(firstSlide);
            this.shuffleSlides();
            this.slides = newSlides;
        }, 750);
    },
    shuffleSlides() {
        this.element.removeChild(this.slides[0]);
        this.element.appendChild(this.slides[0]);
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