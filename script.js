const track = document.querySelector('.carousel-track');
const slides = Array.from(track.children);
const nextButton = document.querySelector('.next');
const prevButton = document.querySelector('.prev');

let currentIndex = 0;

function updateCarousel() {
    const slideWidth = slides[currentIndex].getBoundingClientRect().width;
    track.style.transform = `translateX(${-slideWidth * currentIndex}px)`;
}

nextButton.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % slides.length;
    updateCarousel();
});

prevButton.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateCarousel();
});

// Touch support
let startX = 0;
track.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
});

track.addEventListener('touchmove', (e) => {
    const moveX = e.touches[0].clientX - startX;
    if (moveX > 50) {
        prevButton.click();
    } else if (moveX < -50) {
        nextButton.click();
    }
});

const themeToggle = document.getElementById('theme-toggle');

// Load saved theme from local storage
const currentTheme = localStorage.getItem('theme') || 'light';
document.body.classList.add(currentTheme);

themeToggle.addEventListener('click', () => {
    const newTheme = document.body.classList.contains('light') ? 'dark' : 'light';
    document.body.classList.toggle('dark');
    document.body.classList.toggle('light');
    localStorage.setItem('theme', newTheme);
});
