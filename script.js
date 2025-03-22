// script.js
document.addEventListener('DOMContentLoaded', function () {
    const card = document.querySelector('.card');
    const flipButton = document.querySelector('.flip-button');

    // Flip kartu saat diklik
    card.addEventListener('click', function () {
        card.classList.toggle('flipped');
    });

    // Flip kartu saat tombol ditekan
    flipButton.addEventListener('click', function (e) {
        e.stopPropagation(); // Mencegah event bubbling ke card
        card.classList.toggle('flipped');
    });
});