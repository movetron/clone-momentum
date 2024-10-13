const btnPrev = document.querySelector('.slide-prev');
const btnNext = document.querySelector('.slide-next');
const body = document.querySelector('body');
const images = document.querySelectorAll('.background-image');
let currentImageIndex = 0;


function setInitialImage() {
    const currentHour = new Date().getHours();

    if (currentHour >= 0 && currentHour < 6) {
        currentImageIndex = 0; 
    } else if (currentHour >= 6 && currentHour < 12) {
        currentImageIndex = 1; 
    } else if (currentHour >= 12 && currentHour < 18) {
        currentImageIndex = 2; 
    } else if (currentHour >= 18 && currentHour < 24) {
        currentImageIndex = 3; 
    }

    showImage(currentImageIndex);
}


function showImage(index) {
    images.forEach((img, i) => {
        img.classList.remove('active'); 
        if (i === index) {
            img.classList.add('active'); 
        }
    });
}



btnPrev.addEventListener('click', function () {
    currentImageIndex--;
    if (currentImageIndex < 0) {
        currentImageIndex = images.length - 1; 
    }
    showImage(currentImageIndex);
});

btnNext.addEventListener('click', function () {
    currentImageIndex++;
    if (currentImageIndex >= images.length) {
        currentImageIndex = 0; 
    }
    showImage(currentImageIndex);
});


window.addEventListener('load', setInitialImage);