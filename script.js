
// -------- Определяем всё необходимое ---------

// Переменные, массивы
let widthSlide = 1920;
let indexImg = 0;
let arraySlides = [];


// Получаем все <img> и сохраняем пути к файлам в массив [arraySlides]
let slides = document.querySelectorAll('.slide-single');
for (let i = 0; i < slides.length; i++) {
    arraySlides[i] = slides[i].src;
    slides[i].remove();
}



// -------- Опишем функции -----------------------------------------------

// Функция добавления нового элемента <img> в конец или начало блока
function drawSlide(offsetSlide, indexImg, place) {
    let img = document.createElement('img');
    img.src = arraySlides[indexImg];
    img.classList.add('slide-single');
    img.style.left = offsetSlide + "px";
    if (place) {
        document.querySelector('.wrapper-slider').appendChild(img); //добавляем в конец
    } else {
        document.querySelector('.wrapper-slider').prepend(img); //добавляем в начало
    }

}

// Инициализация: выводим три блока <img>
// --------------------------------------------
// |    <img>     |    <img>    |    <img>    | 
// |   не виден   |    виден    |   не виден  |
// --------------------------------------------
function init() {
    let index = 0;
    for (let i = -1; i < 2; i++) {
        drawSlide(i * widthSlide, index, true);
        index++;
    }
    arraySlides.unshift(arraySlides.pop());
}

// --- Двигаем слайды влево ---
function leftMove() {
    drawSlide(widthSlide, arraySlides.length - 1, true);
    let slides = document.querySelectorAll('.slide-single');
    let offset = -1;
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.left = offset * widthSlide - widthSlide + 'px';
        offset++;
    }
    slides[0].remove();
    arraySlides.push(arraySlides.shift());
}

// --- Двигаем слайды вправо ---
function rightMove() {
    drawSlide(-widthSlide, 0, false);
    let slides = document.querySelectorAll('.slide-single');
    let offset = 1;
    for (let i = slides.length - 1; i > 0; i--) {
        slides[i].style.left = offset * widthSlide + widthSlide + 'px';
        offset--;
    }
    slides[slides.length - 1].remove();
    arraySlides.unshift(arraySlides.pop());
}



// --- Основной блок ---

// Выводим начальные три слайда
init();

// Крутим через 3 сек.
setInterval(leftMove, 3000);





