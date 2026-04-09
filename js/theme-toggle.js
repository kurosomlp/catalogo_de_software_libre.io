// ============================================
// MODO CLARO/OSCURO - TOGGLE
// ============================================

function initThemeToggle() {
    const savedTheme = localStorage.getItem('catalogTheme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
    
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('catalogTheme', newTheme);
    updateThemeIcon(newTheme);
    
    // Update charts if they exist
    if (window.updateChartsTheme) {
        window.updateChartsTheme(newTheme);
    }
}

function updateThemeIcon(theme) {
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        if (theme === 'light') {
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        } else {
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        }
    }
}

// Initialize on load
document.addEventListener('DOMContentLoaded', initThemeToggle);
