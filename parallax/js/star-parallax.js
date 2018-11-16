let
    stars = [],
    sky,
    firstCursorPosition = null,
    starsAmount = 300;

window.onload = function () {
    sky = document.querySelector('div.sky');
    for (let i = 0; i < starsAmount; i++) {
        generateNewStar();
    }
};
document.onmousemove = function (e) {
    calculateStarPosition(e)
};

function generateNewStar() {
    let
        screenWidth = sky.getBoundingClientRect().width,
        screenHeight = sky.getBoundingClientRect().height;

    let starSize = Math.floor(Math.random() * 3) + 1;
    let starProximity = Math.floor(Math.random() * 17) + 1;

    let
        x_star = generateStarX(starSize, screenWidth),
        y_star = generateStarY(starSize, screenHeight);


    let newStar = {
        x: (y_star / screenHeight) * 100,
        y: (x_star / screenWidth) * 100,
        el: document.createElement('div'),
        proximity: starProximity
    };
    newStar.el.classList.add('star');
    newStar.el.style.width = `${starSize}px`;
    newStar.el.style.height = `${starSize}px`;
    newStar.el.style.top = `${newStar.y}%`;
    newStar.el.style.left = `${newStar.x}%`;

    sky.appendChild(newStar.el);
    stars.push(newStar);

    function generateStarX(size, width) {
        let x_star = Math.floor(Math.random() * width);

        if (x_star + size >= width) {
            x_star *= Math.random();
        }
        return x_star;
    }

    function generateStarY(size, height) {
        let y_star = Math.floor(Math.random() * height);

        if (y_star + size >= height) {
            y_star *= Math.random();
        }
        return y_star;
    }
}

function calculateStarPosition(e) {
    const
        mouseX = e.clientX,
        mouseY = e.clientY;

    if (!firstCursorPosition) {
        firstCursorPosition = {
            x: mouseX,
            y: mouseY
        }
    }

    let
        yDelta = ((firstCursorPosition.y - mouseY) / sky.getBoundingClientRect().height),
        xDelta = ((firstCursorPosition.x - mouseX) / sky.getBoundingClientRect().width);

    for (let star of stars) {
        star.el.style.top = `${(star.y + yDelta * star.proximity)}%`;
        star.el.style.left = `${star.x + xDelta * star.proximity}%`;
    }
}