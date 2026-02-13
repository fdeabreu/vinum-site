/**
 * Importadora Vinum - Main JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
    initLanguageToggle();
    initProductFilter();
    initSmoothScroll();
    initMobileMenu();
    initProductModal();
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
                document.querySelector('.nav').classList.remove('active');
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

/**
 * Product Data
 */
const productData = {
    'pe-blanco': {
        name: 'PÉ Blanco',
        type: { es: 'Vino Blanco', en: 'White Wine' },
        image: 'images/Product-Alandra-–-6.jpg',
        specs: {
            brand: 'Esporão',
            size: '750mL',
            country: { es: 'Portugal', en: 'Portugal' },
            availability: { es: 'Disponible', en: 'Available' },
            organic: false
        },
        tabs: {
            es: [
                { label: 'País', content: '🇵🇹 Portugal' },
                { label: 'Región', content: 'Alentejo, Portugal. Una de las regiones vinícolas más prestigiosas de Portugal.' },
                { label: 'Color', content: 'Amarillo pálido con reflejos verdosos.' },
                { label: 'Paladar', content: 'Fresco y ligero con notas de frutas cítricas y tropicales. Ideal para disfrutar en días cálidos.' },
                { label: 'Maridaje', content: 'Mariscos, ensaladas frescas, pescados a la parrilla, quesos suaves.' }
            ],
            en: [
                { label: 'Country', content: '🇵🇹 Portugal' },
                { label: 'Region', content: 'Alentejo, Portugal. One of the most prestigious wine regions of Portugal.' },
                { label: 'Color', content: 'Pale yellow with greenish reflections.' },
                { label: 'Palate', content: 'Fresh and light with citrus and tropical fruit notes. Ideal for warm days.' },
                { label: 'Pairing', content: 'Seafood, fresh salads, grilled fish, soft cheeses.' }
            ]
        }
    },
    'pe-tinto': {
        name: 'PÉ Tinto',
        type: { es: 'Vino Tinto', en: 'Red Wine' },
        image: 'images/Product-Alandra-–-7.jpg',
        specs: {
            brand: 'Esporão',
            size: '750mL',
            country: { es: 'Portugal', en: 'Portugal' },
            availability: { es: 'Disponible', en: 'Available' },
            organic: true
        },
        tabs: {
            es: [
                { label: 'País', content: '🇵🇹 Portugal' },
                { label: 'Región', content: 'Alentejo, Portugal. Tierra de viñedos centenarios y tradición vinícola.' },
                { label: 'Color', content: 'Rubí intenso con matices violáceos.' },
                { label: 'Paladar', content: 'Elegante y equilibrado con aromas de frutas del bosque, cereza negra y especias suaves. Taninos sedosos con un final persistente.' },
                { label: 'Maridaje', content: 'Carnes rojas, pastas con salsas robustas, quesos curados, embutidos.' },
                { label: 'Alcohol', content: '13.5%' }
            ],
            en: [
                { label: 'Country', content: '🇵🇹 Portugal' },
                { label: 'Region', content: 'Alentejo, Portugal. Land of century-old vineyards and winemaking tradition.' },
                { label: 'Color', content: 'Intense ruby with violet hues.' },
                { label: 'Palate', content: 'Elegant and balanced with aromas of forest berries, black cherry, and soft spices. Silky tannins with a persistent finish.' },
                { label: 'Pairing', content: 'Red meats, pastas with robust sauces, aged cheeses, cured meats.' },
                { label: 'Alcohol', content: '13.5%' }
            ]
        }
    },
    'silk-spice-red': {
        name: 'Silk & Spice Red Blend',
        type: { es: 'Vino Tinto', en: 'Red Wine' },
        image: 'images/Artboard-–-1.jpg',
        specs: {
            brand: 'Silk & Spice',
            size: '750mL',
            country: { es: 'Portugal', en: 'Portugal' },
            availability: { es: 'Disponible', en: 'Available' },
            organic: false
        },
        tabs: {
            es: [
                { label: 'País', content: '🇵🇹 Portugal' },
                { label: 'Región', content: 'Alentejo, Portugal. Región conocida por sus vinos intensos y aromáticos.' },
                { label: 'Color', content: 'Rubí intenso y profundo.' },
                { label: 'Paladar', content: 'Mezcla rica y aterciopelada con notas de frutos negros maduros, vainilla y moca. Taninos suaves y un final largo y elegante.' },
                { label: 'Maridaje', content: 'Chuletas de cerdo, estofado de carne, lasaña, quesos semi-curados.' },
                { label: 'Alcohol', content: '13.5%' }
            ],
            en: [
                { label: 'Country', content: '🇵🇹 Portugal' },
                { label: 'Region', content: 'Alentejo, Portugal. A region known for its intense and aromatic wines.' },
                { label: 'Color', content: 'Deep, intense ruby.' },
                { label: 'Palate', content: 'Rich and velvety blend with notes of ripe dark fruits, vanilla, and mocha. Smooth tannins and an elegant, lingering finish.' },
                { label: 'Pairing', content: 'Pork chops, beef stew, lasagna, semi-aged cheeses.' },
                { label: 'Alcohol', content: '13.5%' }
            ]
        }
    },
    'silk-spice-white': {
        name: 'Silk & Spice White Blend',
        type: { es: 'Vino Blanco', en: 'White Wine' },
        image: 'images/silk-spice-white-blend.jpg',
        specs: {
            brand: 'Silk & Spice',
            size: '750mL',
            country: { es: 'Portugal', en: 'Portugal' },
            availability: { es: 'Disponible', en: 'Available' },
            organic: false
        },
        tabs: {
            es: [
                { label: 'País', content: '🇵🇹 Portugal' },
                { label: 'Región', content: 'Alentejo, Portugal.' },
                { label: 'Color', content: 'Amarillo dorado pálido con destellos brillantes.' },
                { label: 'Paladar', content: 'Fresco y aromático con notas de frutas tropicales, flores blancas y un toque mineral. Final limpio y refrescante.' },
                { label: 'Maridaje', content: 'Mariscos, sushi, ensaladas mediterráneas, pollo a la parrilla.' }
            ],
            en: [
                { label: 'Country', content: '🇵🇹 Portugal' },
                { label: 'Region', content: 'Alentejo, Portugal.' },
                { label: 'Color', content: 'Pale golden yellow with bright highlights.' },
                { label: 'Palate', content: 'Fresh and aromatic with tropical fruit notes, white flowers, and a mineral touch. Clean and refreshing finish.' },
                { label: 'Pairing', content: 'Seafood, sushi, Mediterranean salads, grilled chicken.' }
            ]
        }
    },
    'esporao-oil': {
        name: 'Esporão Extra Virgen',
        type: { es: 'Aceite de Oliva', en: 'Olive Oil' },
        image: 'images/aceite-esporao.png',
        specs: {
            brand: 'Esporão',
            size: '750mL',
            country: { es: 'Portugal', en: 'Portugal' },
            availability: { es: 'Disponible', en: 'Available' },
            organic: false
        },
        tabs: {
            es: [
                { label: 'País', content: '🇵🇹 Portugal' },
                { label: 'Región', content: 'Alentejo, Portugal. La finca Herdade do Esporão produce aceites de oliva premiados mundialmente.' },
                { label: 'Color', content: 'Verde dorado intenso.' },
                { label: 'Sabor', content: 'Aceite de oliva extra virgen de primera prensada en frío. Notas herbáceas frescas, almendra verde y un toque picante característico. Acidez inferior al 0.2%.' },
                { label: 'Usos', content: 'Ideal para ensaladas, bruschetta, carpaccio, pastas, y como terminación de platos gourmet.' }
            ],
            en: [
                { label: 'Country', content: '🇵🇹 Portugal' },
                { label: 'Region', content: 'Alentejo, Portugal. The Herdade do Esporão estate produces world-renowned olive oils.' },
                { label: 'Color', content: 'Intense golden green.' },
                { label: 'Flavor', content: 'Extra virgin olive oil, first cold-pressed. Fresh herbal notes, green almond, and a characteristic peppery touch. Acidity below 0.2%.' },
                { label: 'Uses', content: 'Ideal for salads, bruschetta, carpaccio, pastas, and as a finishing oil for gourmet dishes.' }
            ]
        }
    }
};

/**
 * Product Modal
 */
function initProductModal() {
    const modal = document.getElementById('productModal');
    const closeBtn = document.getElementById('modalClose');
    const cards = document.querySelectorAll('.product-card[data-product]');

    cards.forEach(card => {
        card.addEventListener('click', () => {
            const productId = card.getAttribute('data-product');
            const product = productData[productId];
            if (product) openModal(product);
        });
    });

    closeBtn.addEventListener('click', closeModal);

    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}

function openModal(product) {
    const modal = document.getElementById('productModal');
    const lang = document.documentElement.getAttribute('data-lang') || 'es';

    document.getElementById('modalImage').src = product.image;
    document.getElementById('modalImage').alt = product.name;
    document.getElementById('modalName').textContent = product.name;
    document.getElementById('modalType').textContent = product.type[lang];

    // Build specs
    const specsEl = document.getElementById('modalSpecs');
    const specs = product.specs;
    let specsHTML = '';
    if (specs.brand) {
        specsHTML += `<span class="modal-spec brand">🏷️ ${specs.brand}</span>`;
    }
    specsHTML += `<span class="modal-spec">📏 ${specs.size}</span>`;
    specsHTML += `<span class="modal-spec">🌍 ${specs.country[lang]}</span>`;
    specsHTML += `<span class="modal-spec">📦 ${specs.availability[lang]}</span>`;
    if (specs.organic) {
        specsHTML += `<span class="modal-spec organic">🌿 ${lang === 'es' ? 'Orgánico' : 'Organic'}</span>`;
    }
    specsEl.innerHTML = specsHTML;

    // Build tabs
    const tabs = product.tabs[lang];
    const tabButtonsEl = document.getElementById('modalTabButtons');
    const tabContentEl = document.getElementById('modalTabContent');

    let buttonsHTML = '';
    let contentHTML = '';
    tabs.forEach((tab, i) => {
        const activeClass = i === 0 ? ' active' : '';
        buttonsHTML += `<button class="modal-tab-btn${activeClass}" data-tab="${i}">${tab.label}</button>`;
        contentHTML += `<div class="modal-tab-pane${activeClass}" data-tab-pane="${i}"><p>${tab.content}</p></div>`;
    });

    tabButtonsEl.innerHTML = buttonsHTML;
    tabContentEl.innerHTML = contentHTML;

    // Tab click handlers
    tabButtonsEl.querySelectorAll('.modal-tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const tabIndex = btn.getAttribute('data-tab');
            tabButtonsEl.querySelectorAll('.modal-tab-btn').forEach(b => b.classList.remove('active'));
            tabContentEl.querySelectorAll('.modal-tab-pane').forEach(p => p.classList.remove('active'));
            btn.classList.add('active');
            tabContentEl.querySelector(`[data-tab-pane="${tabIndex}"]`).classList.add('active');
        });
    });

    // Show modal
    modal.classList.add('active');
    document.body.classList.add('modal-open');
}

function closeModal() {
    const modal = document.getElementById('productModal');
    modal.classList.remove('active');
    document.body.classList.remove('modal-open');
}
