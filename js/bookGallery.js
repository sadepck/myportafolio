// Galería de arte tipo libro
document.addEventListener('DOMContentLoaded', function() {
    const bookGallery = document.querySelector('.book-gallery');
    if (!bookGallery) return;
    
    const book = document.querySelector('.book');
    const pages = document.querySelectorAll('.book .page');
    const prevBtn = document.getElementById('bookPrev');
    const nextBtn = document.getElementById('bookNext');
    
    let currentPage = 0;
    const totalPages = pages.length;
    let isAnimating = false;
    
    // Inicializar la galería
    function initBookGallery() {
        // Configuración inicial
        updateBookPosition();
        
        // Event listeners para los botones de navegación
        if (prevBtn) prevBtn.addEventListener('click', prevPage);
        if (nextBtn) nextBtn.addEventListener('click', nextPage);
        
        // Habilitar navegación con teclado
        document.addEventListener('keydown', handleKeyDown);
        
        // Habilitar gestos táctiles
        let touchStartX = 0;
        let touchEndX = 0;
        
        book.addEventListener('touchstart', e => {
            touchStartX = e.touches[0].clientX;
        }, { passive: true });
        
        book.addEventListener('touchend', e => {
            touchEndX = e.changedTouches[0].clientX;
            handleSwipe();
        }, { passive: true });
    }
    
    // Manejador de eventos de teclado
    function handleKeyDown(e) {
        if (e.key === 'ArrowLeft') {
            prevPage();
        } else if (e.key === 'ArrowRight') {
            nextPage();
        }
    }
    
    // Manejador de gestos táctiles
    function handleSwipe() {
        const swipeThreshold = 50; // Mínimo de píxeles para considerar un deslizamiento
        const difference = touchStartX - touchEndX;
        
        if (Math.abs(difference) > swipeThreshold) {
            if (difference > 0) {
                nextPage();
            } else {
                prevPage();
            }
        }
    }
    
    // Actualizar la posición del libro
    function updateBookPosition() {
        if (isAnimating) return;
        isAnimating = true;
        
        // Actualizar clases de las páginas
        pages.forEach((page, index) => {
            page.style.zIndex = totalPages - Math.abs(currentPage - index);
            
            // Aplicar la transformación 3D para el efecto de página
            if (index < currentPage) {
                // Páginas a la izquierda
                page.style.transform = 'rotateY(-180deg) translateX(-100%)';
                page.classList.add('turned');
            } else if (index === currentPage) {
                // Página actual
                page.style.transform = 'rotateY(0deg) translateX(0%)';
                page.classList.remove('turned');
            } else {
                // Páginas a la derecha
                page.style.transform = 'rotateY(0deg) translateX(0%)';
                page.classList.remove('turned');
            }
        });
        
        // Actualizar estado de los botones de navegación
        updateNavButtons();
        
        // Restablecer la bandera de animación después de la transición
        setTimeout(() => {
            isAnimating = false;
        }, 600); // Debe coincidir con la duración de la transición CSS
    }
    
    // Actualizar estado de los botones de navegación
    function updateNavButtons() {
        if (prevBtn) {
            prevBtn.disabled = currentPage === 0;
            prevBtn.style.opacity = currentPage === 0 ? '0.5' : '1';
            prevBtn.style.cursor = currentPage === 0 ? 'not-allowed' : 'pointer';
        }
        
        if (nextBtn) {
            nextBtn.disabled = currentPage === totalPages - 1;
            nextBtn.style.opacity = currentPage === totalPages - 1 ? '0.5' : '1';
            nextBtn.style.cursor = currentPage === totalPages - 1 ? 'not-allowed' : 'pointer';
        }
    }
    
    // Ir a la página anterior
    function prevPage() {
        if (currentPage > 0) {
            currentPage--;
            updateBookPosition();
        }
    }
    
    // Ir a la página siguiente
    function nextPage() {
        if (currentPage < totalPages - 1) {
            currentPage++;
            updateBookPosition();
        }
    }
    
    // Inicializar la galería
    initBookGallery();
});

// Añadir estilos para la galería de libro
const bookGalleryStyles = document.createElement('style');
bookGalleryStyles.textContent = `
    .book-gallery {
        position: relative;
        width: 100%;
        max-width: 900px;
        height: 600px;
        margin: 0 auto;
        perspective: 1500px;
    }
    
    .book {
        position: relative;
        width: 100%;
        height: 100%;
        transform-style: preserve-3d;
        transform: translateZ(0);
    }
    
    .page {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: white;
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
        border-radius: 5px;
        overflow: hidden;
        transform-origin: left center;
        transition: transform 0.6s ease-in-out, z-index 0.6s ease-in-out;
        backface-visibility: hidden;
        transform-style: preserve-3d;
    }
    
    .page-content {
        width: 100%;
        height: 100%;
        padding: 2rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
        position: relative;
        background-color: #fff;
        box-sizing: border-box;
    }
    
    .page img {
        max-width: 100%;
        max-height: 70%;
        object-fit: contain;
        margin: 1rem 0;
        border-radius: 4px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }
    
    .page h3 {
        color: var(--primary-color);
        margin-bottom: 1rem;
        font-size: 1.5rem;
    }
    
    .page p {
        color: var(--text-light);
        max-width: 80%;
        margin: 0 auto;
    }
    
    .book-button {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        background-color: rgba(255, 255, 255, 0.8);
        color: var(--primary-color);
        border: none;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        font-size: 1.5rem;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
        z-index: 100;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }
    
    .book-button:hover:not(:disabled) {
        background-color: var(--accent-color);
        color: white;
        transform: translateY(-50%) scale(1.1);
    }
    
    .book-button.prev {
        left: -25px;
    }
    
    .book-button.next {
        right: -25px;
    }
    
    .book-button:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
    
    /* Efecto de sombra para las páginas */
    .page::before,
    .page::after {
        content: '';
        position: absolute;
        top: 0;
        width: 100%;
        height: 100%;
        background: #f5f5f5;
        transition: all 0.6s ease-in-out;
        backface-visibility: hidden;
        transform-style: preserve-3d;
    }
    
    .page::before {
        left: 0;
        transform-origin: left center;
        transform: rotateY(0deg);
        z-index: -1;
    }
    
    .page::after {
        right: 0;
        transform-origin: right center;
        transform: rotateY(0deg);
        z-index: -2;
    }
    
    .page.turned::before {
        transform: rotateY(180deg);
        box-shadow: -5px 0 15px rgba(0, 0, 0, 0.1);
    }
    
    /* Responsive */
    @media (max-width: 992px) {
        .book-gallery {
            height: 500px;
        }
    }
    
    @media (max-width: 768px) {
        .book-gallery {
            height: 400px;
        }
        
        .book-button {
            width: 40px;
            height: 40px;
            font-size: 1.2rem;
        }
        
        .book-button.prev {
            left: -20px;
        }
        
        .book-button.next {
            right: -20px;
        }
        
        .page h3 {
            font-size: 1.3rem;
        }
        
        .page p {
            font-size: 0.9rem;
        }
    }
    
    @media (max-width: 576px) {
        .book-gallery {
            height: 300px;
        }
        
        .book-button {
            width: 35px;
            height: 35px;
            font-size: 1rem;
        }
        
        .page-content {
            padding: 1rem;
        }
        
        .page h3 {
            font-size: 1.1rem;
            margin-bottom: 0.5rem;
        }
        
        .page p {
            font-size: 0.8rem;
            max-width: 90%;
        }
    }
`;

document.head.appendChild(bookGalleryStyles);
