// ============================================
// SISTEMA DE FAVORITOS
// ============================================

const FAVORITES_KEY = 'catalogFavorites';

function getFavorites() {
    const favorites = localStorage.getItem(FAVORITES_KEY);
    return favorites ? JSON.parse(favorites) : [];
}

function toggleFavorite(softwareId) {
    const favorites = getFavorites();
    const index = favorites.indexOf(softwareId);
    
    if (index > -1) {
        favorites.splice(index, 1);
    } else {
        favorites.push(softwareId);
    }
    
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    return favorites;
}

function isFavorite(softwareId) {
    const favorites = getFavorites();
    return favorites.includes(softwareId);
}

function getFavoriteSoftware() {
    const favorites = getFavorites();
    return catalogData.filter(item => favorites.includes(item.id));
}

function renderFavoriteButton(softwareId) {
    const isFav = isFavorite(softwareId);
    return `
        <button class="favorite-btn ${isFav ? 'active' : ''}" 
                onclick="handleFavoriteClick(event, ${softwareId})" 
                title="${isFav ? 'Quitar de favoritos' : 'Agregar a favoritos'}">
            <i class="fas fa-heart"></i>
        </button>
    `;
}

function handleFavoriteClick(event, softwareId) {
    event.preventDefault();
    event.stopPropagation();
    
    const favorites = toggleFavorite(softwareId);
    const btn = event.currentTarget;
    const isFav = favorites.includes(softwareId);
    
    btn.classList.toggle('active', isFav);
    btn.querySelector('i').className = isFav ? 'fas fa-heart' : 'far fa-heart';
    
    // Render favorites section if on index page
    if (document.getElementById('favoritesGrid')) {
        renderFavoritesSection();
    }
}

function renderFavoritesSection() {
    const grid = document.getElementById('favoritesGrid');
    if (!grid) return;
    
    const favorites = getFavoriteSoftware();
    const countElement = document.getElementById('favoritesCount');
    
    if (countElement) {
        countElement.textContent = favorites.length;
    }
    
    if (favorites.length === 0) {
        grid.innerHTML = `
            <div class="no-results">
                <i class="fas fa-heart"></i>
                <h3>No tienes software en favoritos</h3>
                <p>Haz clic en el ícono de corazón para agregar software a favoritos</p>
            </div>
        `;
        return;
    }
    
    grid.innerHTML = favorites.map(software => createSoftwareCard(software)).join('');
}

function renderFavoriteButtons() {
    document.querySelectorAll('.software-card, .software-list-item').forEach(card => {
        const id = parseInt(card.dataset.id);
        const footer = card.querySelector('.software-card-footer, .software-actions');
        if (footer && !footer.querySelector('.favorite-btn')) {
            const favButtonHTML = renderFavoriteButton(id);
            footer.insertAdjacentHTML('beforeend', favButtonHTML);
        }
    });
}

// Initialize favorites on load
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(renderFavoriteButtons, 100);
});
