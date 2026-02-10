/**
 * Importadora Vinum - Main JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
    initLanguageToggle();
    initProductFilter();
    initSmoothScroll();
    initMobileMenu();
});

/**
 * Language Toggle
 */
function initLanguageToggle() {
    const toggle = document.getElementById('langToggle');
    const html = document.documentElement;
    
    // Check for saved language preference
    const savedLang = localStorage.getItem('vinum-lang') || 'es';
    setLanguage(savedLang);
    
    toggle.addEventListener('click', () => {
        const currentLang = html.getAttribute('data-lang');
        const newLang = currentLang === 'es' ? 'en' : 'es';
        setLanguage(newLang);
        localStorage.setItem('vinum-lang', newLang);
    });
}

function setLanguage(lang) {
    const html = document.documentElement;
    html.setAttribute('data-lang', lang);
    html.setAttribute('lang', lang);
    
    // Update toggle button
    const toggle = document.getElementById('langToggle');
    const flag = toggle.querySelector('.lang-flag');
    const text = toggle.querySelector('.lang-text');
    
    if (lang === 'es') {
        flag.textContent = '🇬🇧';
        text.textContent = 'EN';
    } else {
        flag.textContent = '🇪🇸';
        text.textContent = 'ES';
    }
    
    // Update all translatable elements
    document.querySelectorAll('[data-es][data-en]').forEach(el => {
        el.textContent = el.getAttribute(`data-${lang}`);
    });
    
    // Update page title
    document.title = lang === 'es' 
        ? 'Importadora Vinum | Vinos y Licores de Calidad'
        : 'Importadora Vinum | Quality Wines and Spirits';
}

/**
 * Product Filter
 */
function initProductFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const products = document.querySelectorAll('.product-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.getAttribute('data-filter');
            
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Filter products
            products.forEach(product => {
                const category = product.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    product.classList.remove('hidden');
                    product.style.display = '';
                } else {
                    product.classList.add('hidden');
                    product.style.display = 'none';
                }
            });
        });
    });
}

/**
 * Smooth Scroll for anchor links
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                document.body.classList.remove('menu-open');
            }
        });
    });
}

/**
 * Mobile Menu
 */
function initMobileMenu() {
    const menuBtn = document.getElementById('mobileMenuBtn');
    const nav = document.querySelector('.nav');
    
    menuBtn.addEventListener('click', () => {
        document.body.classList.toggle('menu-open');
        nav.classList.toggle('active');
    });
}

/**
 * Header scroll effect
 */
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});
