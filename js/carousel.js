// Carrusel de fotografías
document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.carousel');
    if (!carousel) return;

    const carouselContainer = document.querySelector('.carousel-container');
    const slides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const indicators = document.querySelectorAll('.indicator');
    
    let currentIndex = 0;
    const totalSlides = slides.length;
    let slideInterval;
    const intervalTime = 5000; // 5 segundos

    // Inicializar el carrusel
    function initCarousel() {
        // Asegurarse de que solo el slide actual esté visible
        updateSlidePosition();
        
        // Iniciar autoplay
        startAutoPlay();
        
        // Event listeners para los botones de navegación
        if (prevBtn) prevBtn.addEventListener('click', prevSlide);
        if (nextBtn) nextBtn.addEventListener('click', nextSlide);
        
        // Event listeners para los indicadores
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => goToSlide(index));
        });
        
        // Pausar autoplay al hacer hover sobre el carrusel
        carousel.addEventListener('mouseenter', pauseAutoPlay);
        carousel.addEventListener('mouseleave', startAutoPlay);
        
        // Soporte para gestos táctiles
        let touchStartX = 0;
        let touchEndX = 0;
        
        carouselContainer.addEventListener('touchstart', e => {
            touchStartX = e.touches[0].clientX;
            pauseAutoPlay();
        }, { passive: true });
        
        carouselContainer.addEventListener('touchend', e => {
            touchEndX = e.changedTouches[0].clientX;
            handleSwipe();
            startAutoPlay();
        }, { passive: true });
        
        function handleSwipe() {
            const swipeThreshold = 50; // Mínimo de píxeles para considerar un deslizamiento
            const difference = touchStartX - touchEndX;
            
            if (Math.abs(difference) > swipeThreshold) {
                if (difference > 0) {
                    nextSlide();
                } else {
                    prevSlide();
                }
            }
        }
    }
    
    // Función para actualizar la posición de los slides
    function updateSlidePosition() {
        // Ocultar todos los slides
        slides.forEach(slide => {
            slide.style.display = 'none';
            slide.classList.remove('active');
        });
        
        // Mostrar el slide actual
        slides[currentIndex].style.display = 'block';
        slides[currentIndex].classList.add('active');
        
        // Actualizar indicadores
        updateIndicators();
    }
    
    // Función para actualizar los indicadores
    function updateIndicators() {
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentIndex);
        });
    }
    
    // Función para ir a un slide específico
    function goToSlide(index) {
        currentIndex = (index + totalSlides) % totalSlides;
        updateSlidePosition();
    }
    
    // Función para ir al slide anterior
    function prevSlide() {
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        updateSlidePosition();
    }
    
    // Función para ir al siguiente slide
    function nextSlide() {
        currentIndex = (currentIndex + 1) % totalSlides;
        updateSlidePosition();
    }
    
    // Función para iniciar el autoplay
    function startAutoPlay() {
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, intervalTime);
    }
    
    // Función para pausar el autoplay
    function pauseAutoPlay() {
        clearInterval(slideInterval);
    }
    
    // Inicializar el carrusel
    initCarousel();
    
    // Asegurarse de que las imágenes se carguen correctamente
    window.addEventListener('load', () => {
        updateSlidePosition();
    });
});

// Añadir estilos para el carrusel
const carouselStyles = document.createElement('style');
carouselStyles.textContent = `
    .carousel {
        position: relative;
        width: 100%;
        max-width: 1000px;
        margin: 0 auto;
        overflow: hidden;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    }
    
    .carousel-container {
        position: relative;
        width: 100%;
        height: 500px;
        overflow: hidden;
    }
    
    .carousel-slide {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
        transition: opacity 0.8s ease-in-out;
    }
    
    .carousel-slide.active {
        opacity: 1;
        position: relative;
    }
    
    .carousel-slide img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
    }
    
    .carousel-button {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        background-color: rgba(255, 255, 255, 0.7);
        color: var(--primary-color);
        border: none;
        font-size: 1.5rem;
        padding: 1rem;
        cursor: pointer;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
        z-index: 10;
    }
    
    .carousel-button:hover {
        background-color: var(--accent-color);
        color: white;
    }
    
    .carousel-button.prev {
        left: 20px;
    }
    
    .carousel-button.next {
        right: 20px;
    }
    
    .carousel-indicators {
        position: absolute;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        gap: 10px;
        z-index: 10;
    }
    
    .indicator {
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background-color: rgba(255, 255, 255, 0.5);
        cursor: pointer;
        transition: all 0.3s ease;
    }
    
    .indicator.active {
        background-color: var(--accent-color);
        transform: scale(1.2);
    }
    
    @media (max-width: 768px) {
        .carousel-container {
            height: 400px;
        }
        
        .carousel-button {
            width: 40px;
            height: 40px;
            font-size: 1.2rem;
        }
    }
    
    @media (max-width: 576px) {
        .carousel-container {
            height: 300px;
        }
        
        .carousel-button {
            width: 35px;
            height: 35px;
            font-size: 1rem;
        }
        
        .indicator {
            width: 10px;
            height: 10px;
        }
    }
`;

document.head.appendChild(carouselStyles);
