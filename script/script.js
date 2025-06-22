// Initialize WOW.js for reveal animations
new WOW({
    boxClass: 'wow',
    animateClass: 'animate__animated',
    offset: 100,
    mobile: true,
    live: true,
}).init();

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {

    // Dynamically update the copyright year
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // --- UNIQUE HERO SLIDER SCRIPT ---
    const sliderContainer = document.getElementById('hero-slider');
    if (sliderContainer) {
        const slides = sliderContainer.querySelectorAll('.hero-slide');
        const slideTitles = sliderContainer.querySelectorAll('.slide-title');
        const navItems = sliderContainer.querySelectorAll('.slider-nav-item');
        let currentSlide = 0;
        let slideInterval;

        function showSlide(index) {
            slides.forEach(slide => slide.classList.remove('active'));
            slideTitles.forEach(title => title.classList.remove('active'));
            navItems.forEach(nav => nav.classList.remove('active'));

            slides[index].classList.add('active');
            slideTitles[index].classList.add('active');
            navItems[index].classList.add('active');
            currentSlide = index;
        }

        function nextSlide() {
            let newIndex = (currentSlide + 1) % slides.length;
            showSlide(newIndex);
        }

        function startAutoplay() {
            slideInterval = setInterval(nextSlide, 7000);
        }

        function stopAutoplay() {
            clearInterval(slideInterval);
        }

        navItems.forEach(nav => {
            nav.addEventListener('click', () => {
                const slideIndex = parseInt(nav.dataset.slide, 10);
                stopAutoplay();
                showSlide(slideIndex);
                startAutoplay();
            });
        });

        showSlide(0);
        startAutoplay();
    }

    // --- FAQ ACCORDION SCRIPT ---
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        question.addEventListener('click', () => {
            const wasActive = item.classList.contains('active');
            // Close all items
            faqItems.forEach(i => {
                i.classList.remove('active');
                i.querySelector('.faq-answer').style.maxHeight = null;
            });
            // If it wasn't active before, open it
            if (!wasActive) {
                item.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });

    // --- MOBILE NAVIGATION TOGGLE SCRIPT ---
    const menuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const openIcon = document.getElementById('menu-open-icon');
    const closeIcon = document.getElementById('menu-close-icon');
    const body = document.body;

    if (menuButton && mobileMenu && openIcon && closeIcon) {
        menuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('menu-open');
            openIcon.classList.toggle('hidden');
            closeIcon.classList.toggle('hidden');
            body.style.overflow = mobileMenu.classList.contains('menu-open') ? 'hidden' : '';
        });
    }
});

/* =========================================== */
/* ===      SERVICES TAB SCRIPT            === */
/* =========================================== */
document.addEventListener('DOMContentLoaded', () => {
    const tabsContainer = document.getElementById('service-tabs');
    if (tabsContainer) {
        const tabLinks = tabsContainer.querySelectorAll('.tab-link');
        const tabContents = document.querySelectorAll('.tab-content');

        tabLinks.forEach(link => {
            link.addEventListener('click', (event) => {
                event.preventDefault();
                
                // Get target ID from href
                const targetId = link.getAttribute('href');

                // Update links
                tabLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');

                // Update content panes
                tabContents.forEach(content => {
                    if ('#' + content.id === targetId) {
                        content.classList.add('active');
                    } else {
                        content.classList.remove('active');
                    }
                });
            });
        });
    }
});
