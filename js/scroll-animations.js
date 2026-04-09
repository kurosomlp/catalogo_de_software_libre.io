// ============================================
// ANIMACIONES AL SCROLL - INTERSECTION OBSERVER
// ============================================

function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all elements with scroll-animate class
    document.querySelectorAll('.scroll-animate').forEach(el => {
        observer.observe(el);
    });
}

function addScrollAnimateClasses() {
    // Add animation classes to major sections
    const sections = [
        { selector: '.hero', animation: 'scroll-animate' },
        { selector: '.search-section', animation: 'scroll-animate' },
        { selector: '.categories', animation: 'scroll-animate' },
        { selector: '.featured', animation: 'scroll-animate' },
        { selector: '.statistics', animation: 'scroll-animate' },
        { selector: '.charts-section', animation: 'scroll-animate' },
        { selector: '.favorites-section', animation: 'scroll-animate' },
        { selector: '.software-card', animation: 'scroll-animate' },
        { selector: '.category-card', animation: 'scroll-animate' },
        { selector: '.software-list-item', animation: 'scroll-animate' },
        { selector: '.stat-card', animation: 'scroll-animate' },
        { selector: '.chart-card', animation: 'scroll-animate' }
    ];
    
    sections.forEach(({ selector, animation }) => {
        document.querySelectorAll(selector).forEach(el => {
            if (!el.classList.contains('scroll-animate')) {
                el.classList.add(animation);
            }
        });
    });
    
    // Add stagger animations to grid items
    document.querySelectorAll('.categories-grid, .software-grid, .stats-grid, .charts-grid').forEach(grid => {
        const children = grid.children;
        Array.from(children).forEach((child, index) => {
            child.style.transitionDelay = `${index * 0.05}s`;
        });
    });
}

// Initialize on load
document.addEventListener('DOMContentLoaded', function() {
    addScrollAnimateClasses();
    
    // Delay observer initialization to ensure all elements are rendered
    setTimeout(initScrollAnimations, 200);
});
