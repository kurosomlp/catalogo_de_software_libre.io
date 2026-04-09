// ============================================
// CATÁLOGO DE SOFTWARE LIBRE
// Gestión interactiva con exportar/importar JSON
// ============================================

// Variable global para almacenar el catálogo
let catalogData = [];
const CATALOG_URL = 'data/catalog.json';
const PLACEHOLDER_IMAGE = 'images/placeholder.svg';

// ============================================
// FUNCIONES DE CARGA DE DATOS
// ============================================

// Cargar el catálogo desde el archivo JSON
async function loadCatalog() {
    try {
        const response = await fetch(CATALOG_URL);
        if (!response.ok) {
            throw new Error('Error al cargar el catálogo');
        }
        catalogData = await response.json();
        return catalogData;
    } catch (error) {
        console.error('Error cargando el catálogo:', error);
        catalogData = [];
        return catalogData;
    }
}

// ============================================
// FUNCIONES DE CONSULTA
// ============================================

function getSoftwareByCategory(category) {
    return catalogData.filter(item => item.category === category);
}

function getFeaturedSoftware() {
    return catalogData.filter(item => item.featured);
}

function searchSoftware(query) {
    const lowerQuery = query.toLowerCase();
    return catalogData.filter(item => 
        item.name.toLowerCase().includes(lowerQuery) ||
        item.description.toLowerCase().includes(lowerQuery) ||
        item.category.toLowerCase().includes(lowerQuery) ||
        item.license.toLowerCase().includes(lowerQuery)
    );
}

function getCategoryCounts() {
    const counts = {
        productividad: 0,
        desarrollo: 0,
        multimedia: 0,
        sistemas: 0,
        seguridad: 0
    };
    
    catalogData.forEach(item => {
        if (counts.hasOwnProperty(item.category)) {
            counts[item.category]++;
        }
    });
    
    return counts;
}

function getNextId() {
    if (catalogData.length === 0) return 1;
    return Math.max(...catalogData.map(item => item.id)) + 1;
}

// ============================================
// FUNCIONES DE EXPORTAR/IMPORTAR
// ============================================

function exportCatalog() {
    const dataStr = JSON.stringify(catalogData, null, 4);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'catalog.json';
    link.click();
    URL.revokeObjectURL(url);
    
    alert('✅ ¡Archivo catalog.json exportado!\n\nAhora debes:\n1. Reemplazar el archivo "data/catalog.json" en tu repositorio\n2. Hacer commit y push a GitHub');
}

function importCatalog(file) {
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const imported = JSON.parse(e.target.result);
            if (Array.isArray(imported)) {
                catalogData = imported;
                refreshCurrentView();
                alert(`✅ ¡Catálogo importado exitosamente!\n\n${catalogData.length} elementos cargados.\n\nPara guardar los cambios permanentemente:\n1. Haz clic en "Exportar JSON"\n2. Reemplaza el archivo en tu repositorio\n3. Haz commit y push`);
            } else {
                alert('❌ El archivo no tiene el formato correcto. Debe ser un array JSON.');
            }
        } catch (error) {
            alert('❌ Error al leer el archivo JSON: ' + error.message);
        }
    };
    reader.readAsText(file);
}

// ============================================
// FUNCIONES DE RENDERIZADO
// ============================================

function getImageHTML(software) {
    const imageSrc = software.image || PLACEHOLDER_IMAGE;
    const imageName = software.name || 'Software';
    return `
        <div class="software-card-image">
            <img src="${imageSrc}" alt="${imageName}" 
                 onerror="this.onerror=null; this.src='${PLACEHOLDER_IMAGE}'; this.parentElement.classList.add('no-image');" 
                 onload="this.parentElement.classList.remove('no-image');">
        </div>
    `;
}

function getListImageHTML(software) {
    const imageSrc = software.image || PLACEHOLDER_IMAGE;
    const imageName = software.name || 'Software';
    return `
        <div class="software-list-image">
            <img src="${imageSrc}" alt="${imageName}" 
                 onerror="this.onerror=null; this.src='${PLACEHOLDER_IMAGE}'; this.parentElement.classList.add('no-image');" 
                 onload="this.parentElement.classList.remove('no-image');">
        </div>
    `;
}

function createSoftwareCard(software) {
    return `
        <div class="software-card" data-id="${software.id}">
            ${getImageHTML(software)}
            <div class="software-card-header">
                <h3>${software.name}</h3>
                <span class="software-badge">${software.license}</span>
            </div>
            <p>${software.description}</p>
            <div class="software-card-footer">
                ${software.url ? `<a href="${software.url}" target="_blank" class="btn-small primary"><i class="fas fa-external-link-alt"></i> Sitio</a>` : ''}
                ${software.repo ? `<a href="${software.repo}" target="_blank" class="btn-small secondary"><i class="fab fa-github"></i> Repo</a>` : ''}
            </div>
        </div>
    `;
}

function createSoftwareListItem(software) {
    return `
        <div class="software-list-item" data-id="${software.id}">
            ${getListImageHTML(software)}
            <div class="software-info">
                <h3>${software.name}</h3>
                <p>${software.description}</p>
                <div class="software-meta">
                    <span><i class="fas fa-tag"></i> ${getCategoryName(software.category)}</span>
                    <span><i class="fas fa-certificate"></i> ${software.license}</span>
                    ${software.featured ? '<span><i class="fas fa-star"></i> Destacado</span>' : ''}
                </div>
            </div>
            <div class="software-actions">
                ${software.url ? `<a href="${software.url}" target="_blank" class="btn-small primary"><i class="fas fa-external-link-alt"></i></a>` : ''}
                ${software.repo ? `<a href="${software.repo}" target="_blank" class="btn-small secondary"><i class="fab fa-github"></i></a>` : ''}
            </div>
        </div>
    `;
}

function getCategoryName(category) {
    const names = {
        productividad: 'Productividad',
        desarrollo: 'Desarrollo',
        multimedia: 'Multimedia',
        sistemas: 'Sistemas',
        seguridad: 'Seguridad'
    };
    return names[category] || category;
}

function updateCategoryCounts() {
    const counts = getCategoryCounts();
    
    const elements = {
        productividad: document.getElementById('countProductividad'),
        desarrollo: document.getElementById('countDesarrollo'),
        multimedia: document.getElementById('countMultimedia'),
        sistemas: document.getElementById('countSistemas'),
        seguridad: document.getElementById('countSeguridad')
    };
    
    for (const [key, element] of Object.entries(elements)) {
        if (element) {
            element.textContent = counts[key];
        }
    }
}

function updateStatistics() {
    const featured = getFeaturedSoftware();
    
    const totalElement = document.getElementById('totalSoftware');
    const featuredElement = document.getElementById('featuredCount');
    
    if (totalElement) totalElement.textContent = catalogData.length;
    if (featuredElement) featuredElement.textContent = featured.length;
}

function renderFeaturedSoftware() {
    const grid = document.getElementById('featuredGrid');
    if (!grid) return;
    
    const featured = getFeaturedSoftware();
    grid.innerHTML = featured.map(software => createSoftwareCard(software)).join('');
    
    // Re-render favorite buttons and scroll animations
    setTimeout(() => {
        renderFavoriteButtons();
        if (window.initScrollAnimations) window.initScrollAnimations();
    }, 100);
}

function renderCategoryPage(category) {
    const grid = document.getElementById('categoryList');
    if (!grid) return;
    
    const software = getSoftwareByCategory(category);
    
    if (software.length === 0) {
        grid.innerHTML = `
            <div class="no-results">
                <i class="fas fa-inbox"></i>
                <h3>No hay software en esta categoría aún</h3>
                <p>Usa el botón "Agregar Software" para añadir uno nuevo</p>
            </div>
        `;
        return;
    }
    
    grid.innerHTML = software.map(item => createSoftwareListItem(item)).join('');
    
    // Re-render favorite buttons and scroll animations
    setTimeout(() => {
        renderFavoriteButtons();
        if (window.initScrollAnimations) window.initScrollAnimations();
    }, 100);
}

function renderSearchResults(query) {
    const resultsContainer = document.getElementById('searchResults');
    if (!resultsContainer) return;
    
    const results = searchSoftware(query);
    
    if (results.length === 0) {
        resultsContainer.innerHTML = `
            <div class="no-results">
                <i class="fas fa-search"></i>
                <h3>No se encontraron resultados</h3>
                <p>Intenta con otros términos de búsqueda</p>
            </div>
        `;
        return;
    }
    
    resultsContainer.innerHTML = `
        <h3>${results.length} resultado(s) para "${query}"</h3>
        <div class="software-grid">
            ${results.map(software => createSoftwareCard(software)).join('')}
        </div>
    `;
}

function refreshCurrentView() {
    updateCategoryCounts();
    updateStatistics();
    
    const path = window.location.pathname;
    
    if (path.includes('index.html') || path === '/' || path.endsWith('Catálogo de Software Libre/')) {
        renderFeaturedSoftware();
        if (typeof renderFavoritesSection === 'function') renderFavoritesSection();
    } else if (path.includes('productividad.html')) {
        renderCategoryPage('productividad');
    } else if (path.includes('desarrollo.html')) {
        renderCategoryPage('desarrollo');
    } else if (path.includes('multimedia.html')) {
        renderCategoryPage('multimedia');
    } else if (path.includes('sistemas.html')) {
        renderCategoryPage('sistemas');
    } else if (path.includes('seguridad.html')) {
        renderCategoryPage('seguridad');
    } else if (path.includes('busqueda.html')) {
        const urlParams = new URLSearchParams(window.location.search);
        const query = urlParams.get('q');
        if (query) {
            renderSearchResults(query);
        }
    }
}

// ============================================
// FUNCIONES DE MODAL
// ============================================

function openModal() {
    const modal = document.getElementById('addModal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal() {
    const modal = document.getElementById('addModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

function resetForm() {
    const form = document.getElementById('addSoftwareForm');
    if (form) {
        form.reset();
    }
    const preview = document.getElementById('imagePreview');
    if (preview) {
        preview.innerHTML = '<i class="fas fa-image"></i><p>Vista previa de la imagen</p>';
    }
}

function updateImagePreview(imageUrl) {
    const preview = document.getElementById('imagePreview');
    if (preview) {
        if (imageUrl) {
            preview.innerHTML = `
                <img src="${imageUrl}" alt="Vista previa" onerror="this.parentElement.innerHTML='<i class=\\'fas fa-exclamation-triangle\\'></i><p>Error al cargar la imagen</p>';">
            `;
        } else {
            preview.innerHTML = '<i class="fas fa-image"></i><p>Vista previa de la imagen</p>';
        }
    }
}

// ============================================
// MANEJO DE IMÁGENES
// ============================================

function handleImageUrlChange(event) {
    const url = event.target.value.trim();
    if (url) {
        updateImagePreview(url);
    } else {
        updateImagePreview('');
    }
}

// ============================================
// MANEJO DE FORMULARIO
// ============================================

function handleAddSoftware(event) {
    event.preventDefault();
    
    const imageUrl = document.getElementById('softwareImageURL').value.trim();
    
    const software = {
        id: getNextId(),
        name: document.getElementById('softwareName').value.trim(),
        category: document.getElementById('softwareCategory').value,
        description: document.getElementById('softwareDescription').value.trim(),
        license: document.getElementById('softwareLicense').value,
        url: document.getElementById('softwareURL').value.trim(),
        repo: document.getElementById('softwareRepo').value.trim(),
        featured: document.getElementById('softwareFeatured').checked,
        image: imageUrl || ''
    };
    
    catalogData.push(software);
    
    resetForm();
    closeModal();
    refreshCurrentView();
    
    alert(`✅ ¡"${software.name}" agregado exitosamente!\n\nIMPORTANTE: Los cambios son temporales en esta sesión.\n\nPara guardar permanentemente:\n1. Haz clic en "Exportar JSON" en el panel\n2. Reemplaza el archivo data/catalog.json en tu repositorio\n3. Haz commit y push a GitHub`);
}

function handleSearch(event) {
    event.preventDefault();
    
    const query = document.getElementById('searchInput')?.value.trim() || 
                  document.getElementById('newSearchInput')?.value.trim();
    
    if (query && query.length > 0) {
        window.location.href = `busqueda.html?q=${encodeURIComponent(query)}`;
    }
}

// ============================================
// INICIALIZACIÓN
// ============================================

document.addEventListener('DOMContentLoaded', async function() {
    // Cargar el catálogo desde JSON
    await loadCatalog();
    
    // Actualizar estadísticas
    updateCategoryCounts();
    updateStatistics();
    
    // Determinar qué página estamos y renderizar contenido apropiado
    const path = window.location.pathname;

    if (path.includes('index.html') || path === '/' || path.endsWith('Catálogo de Software Libre/')) {
        renderFeaturedSoftware();
        if (typeof renderFavoritesSection === 'function') renderFavoritesSection();
    } else if (path.includes('productividad.html')) {
        renderCategoryPage('productividad');
    } else if (path.includes('desarrollo.html')) {
        renderCategoryPage('desarrollo');
    } else if (path.includes('multimedia.html')) {
        renderCategoryPage('multimedia');
    } else if (path.includes('sistemas.html')) {
        renderCategoryPage('sistemas');
    } else if (path.includes('seguridad.html')) {
        renderCategoryPage('seguridad');
    } else if (path.includes('busqueda.html')) {
        const urlParams = new URLSearchParams(window.location.search);
        const query = urlParams.get('q');
        if (query) {
            renderSearchResults(query);
        }
    }
    
    // Configurar búsqueda
    const searchBtn = document.getElementById('searchBtn') || document.getElementById('newSearchBtn');
    if (searchBtn) {
        searchBtn.addEventListener('click', handleSearch);
    }
    
    const searchInput = document.getElementById('searchInput') || document.getElementById('newSearchInput');
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                handleSearch(e);
            }
        });
    }
    
    // Configurar botón de agregar software
    const addBtn = document.getElementById('addSoftwareBtn');
    if (addBtn) {
        addBtn.addEventListener('click', function() {
            resetForm();
            openModal();
        });
    }
    
    // Configurar modal
    document.querySelectorAll('.close-modal, .cancel-modal').forEach(btn => {
        btn.addEventListener('click', closeModal);
    });
    
    const modal = document.getElementById('addModal');
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeModal();
            }
        });
    }
    
    // Configurar formulario de agregar software
    const addForm = document.getElementById('addSoftwareForm');
    if (addForm) {
        addForm.addEventListener('submit', handleAddSoftware);
    }
    
    // Configurar vista previa de imagen por URL
    const imageUrlInput = document.getElementById('softwareImageURL');
    if (imageUrlInput) {
        let debounceTimer;
        imageUrlInput.addEventListener('input', function(e) {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => {
                handleImageUrlChange(e);
            }, 500);
        });
    }
    
    // Configurar exportar JSON
    const exportBtn = document.getElementById('exportJsonBtn');
    if (exportBtn) {
        exportBtn.addEventListener('click', exportCatalog);
    }
    
    // Configurar importar JSON
    const importBtn = document.getElementById('importJsonInput');
    if (importBtn) {
        importBtn.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                importCatalog(file);
                e.target.value = ''; // Reset para permitir importar el mismo archivo de nuevo
            }
        });
    }
    
    // Configurar filtros en páginas de categoría
    const filterInput = document.getElementById('filterInput');
    if (filterInput) {
        filterInput.addEventListener('input', function() {
            const query = this.value.trim();
            if (query.length > 0) {
                const results = searchSoftware(query);
                const grid = document.getElementById('categoryList');
                if (grid) {
                    if (results.length === 0) {
                        grid.innerHTML = `
                            <div class="no-results">
                                <i class="fas fa-search"></i>
                                <h3>No se encontraron resultados</h3>
                                <p>Intenta con otros términos de búsqueda</p>
                            </div>
                        `;
                    } else {
                        grid.innerHTML = results.map(item => createSoftwareListItem(item)).join('');
                    }
                }
            } else {
                // Restaurar vista original
                const path = window.location.pathname;
                if (path.includes('productividad.html')) {
                    renderCategoryPage('productividad');
                } else if (path.includes('desarrollo.html')) {
                    renderCategoryPage('desarrollo');
                } else if (path.includes('multimedia.html')) {
                    renderCategoryPage('multimedia');
                } else if (path.includes('sistemas.html')) {
                    renderCategoryPage('sistemas');
                } else if (path.includes('seguridad.html')) {
                    renderCategoryPage('seguridad');
                }
            }
        });
    }
});

// ============================================
// EXPORTAR FUNCIONES PARA USO EXTERNO
// ============================================

window.CatalogAPI = {
    loadCatalog,
    getSoftwareByCategory,
    getFeaturedSoftware,
    searchSoftware,
    getCategoryCounts,
    getData: () => catalogData,
    exportCatalog,
    importCatalog
};
