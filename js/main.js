// Navegación suave para enlaces internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80, // Ajuste para la barra de navegación fija
                behavior: 'smooth'
            });
            
            // Cerrar menú móvil si está abierto
            const navLinks = document.querySelector('.nav-links');
            const hamburger = document.querySelector('.hamburger');
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            }
        }
    });
});

// Menú móvil
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
    
    // Cerrar menú al hacer clic en un enlace
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
    
    // Cambiar estilo de la barra de navegación al hacer scroll
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Añadir año actual al pie de página
    const currentYear = new Date().getFullYear();
    document.getElementById('currentYear').textContent = currentYear;
    
    // Validación del formulario de contacto
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Resetear mensajes de error
            document.querySelectorAll('.error').forEach(el => el.textContent = '');
            
            let isValid = true;
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');
            
            // Validar nombre
            if (nameInput.value.trim() === '') {
                document.getElementById('nameError').textContent = 'Por favor ingresa tu nombre';
                isValid = false;
            }
            
            // Validar email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailInput.value.trim())) {
                document.getElementById('emailError').textContent = 'Por favor ingresa un correo electrónico válido';
                isValid = false;
            }
            
            // Validar mensaje
            if (messageInput.value.trim() === '') {
                document.getElementById('messageError').textContent = 'Por favor ingresa tu mensaje';
                isValid = false;
            }
            
            // Si el formulario es válido, mostrar mensaje de éxito
            if (isValid) {
                // Aquí iría el código para enviar el formulario
                const successMessage = document.getElementById('formSuccess');
                successMessage.textContent = '¡Mensaje enviado con éxito! Me pondré en contacto contigo pronto.';
                successMessage.style.display = 'block';
                contactForm.reset();
                
                // Ocultar mensaje después de 5 segundos
                setTimeout(() => {
                    successMessage.style.display = 'none';
                }, 5000);
            }
        });
    }
    
    // Animación de elementos al hacer scroll
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.animate-on-scroll');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.classList.add('fade-in');
            }
        });
    };
    
    // Ejecutar la animación al cargar la página y al hacer scroll
    window.addEventListener('scroll', animateOnScroll);
    window.addEventListener('load', animateOnScroll);
});

// Función para cargar imágenes de ejemplo (reemplazar con tus propias imágenes)
function loadSampleImages() {
    // Imágenes para el carrusel
    const carouselContainer = document.getElementById('photoCarousel');
    if (carouselContainer) {
        const carouselImages = [
            { src: 'img/fotografia/photo1.jpg', alt: 'Fotografía 1' },
            { src: 'img/fotografia/photo2.jpg', alt: 'Fotografía 2' },
            { src: 'img/fotografia/photo3.jpg', alt: 'Fotografía 3' },
            { src: 'img/fotografia/photo4.jpg', alt: 'Fotografía 4' },
            { src: 'img/fotografia/photo5.jpg', alt: 'Fotografía 5' }
        ];
        
        carouselImages.forEach((img, index) => {
            const slide = document.createElement('div');
            slide.className = 'carousel-slide' + (index === 0 ? ' active' : '');
            slide.innerHTML = `<img src="${img.src}" alt="${img.alt}">`;
            carouselContainer.appendChild(slide);
        });
        
        // Agregar indicadores
        const indicators = document.getElementById('carouselIndicators');
        if (indicators) {
            carouselImages.forEach((_, index) => {
                const indicator = document.createElement('span');
                indicator.className = 'indicator' + (index === 0 ? ' active' : '');
                indicator.dataset.slideTo = index;
                indicators.appendChild(indicator);
            });
        }
    }
    
    // Imágenes para la galería de arte (libro)
    const bookGallery = document.querySelector('.book');
    if (bookGallery) {
        const bookPages = [
            { title: 'Obra 1', image: 'img/arte/art1.jpg', description: 'Descripción de la obra 1' },
            { title: 'Obra 2', image: 'img/arte/art2.jpg', description: 'Descripción de la obra 2' },
            { title: 'Obra 3', image: 'img/arte/art3.jpg', description: 'Descripción de la obra 3' },
            { title: 'Obra 4', image: 'img/arte/art4.jpg', description: 'Descripción de la obra 4' },
            { title: 'Obra 5', image: 'img/arte/art5.jpg', description: 'Descripción de la obra 5' }
        ];
        
        bookPages.forEach((page, index) => {
            const pageElement = document.createElement('div');
            pageElement.className = 'page';
            pageElement.innerHTML = `
                <div class="page-content">
                    <h3>${page.title}</h3>
                    <img src="${page.image}" alt="${page.title}">
                    <p>${page.description}</p>
                </div>
            `;
            bookGallery.appendChild(pageElement);
        });
    }
}

// Cargar imágenes de ejemplo cuando el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', loadSampleImages);
