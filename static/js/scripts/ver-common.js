document.addEventListener('DOMContentLoaded', function() {
    // Inicializar el slideshow de la cabecera
    const headerSwiper = new Swiper(".headerSwiper", {
        slidesPerView: 1,
        spaceBetween: 0,
        loop: true,
        effect: "fade",  // Efecto de transición suave
        fadeEffect: {
            crossFade: true
        },
        autoplay: {
            delay: 5000,  // Cambio automático cada 5 segundos
            disableOnInteraction: false,
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
    });
});