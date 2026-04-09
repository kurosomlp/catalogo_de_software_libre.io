// ============================================
// FILTROS AVANZADOS Y ESTADÍSTICAS CON CHARTS
// ============================================

let chartsInitialized = false;

// ============================================
// FILTROS AVANZADOS
// ============================================

function initAdvancedFilters() {
    const applyBtn = document.getElementById('applyFilters');
    const clearBtn = document.getElementById('clearFilters');
    
    if (applyBtn) {
        applyBtn.addEventListener('click', applyFilters);
    }
    
    if (clearBtn) {
        clearBtn.addEventListener('click', clearFilters);
    }
}

function applyFilters() {
    const categoryFilter = document.getElementById('filterCategory')?.value || '';
    const licenseFilter = document.getElementById('filterLicense')?.value || '';
    const featuredFilter = document.getElementById('filterFeatured')?.value || '';
    const searchText = document.getElementById('filterSearch')?.value.toLowerCase() || '';
    
    let filtered = [...catalogData];
    
    // Apply category filter
    if (categoryFilter) {
        filtered = filtered.filter(item => item.category === categoryFilter);
    }
    
    // Apply license filter
    if (licenseFilter) {
        filtered = filtered.filter(item => item.license === licenseFilter);
    }
    
    // Apply featured filter
    if (featuredFilter === 'true') {
        filtered = filtered.filter(item => item.featured === true);
    } else if (featuredFilter === 'false') {
        filtered = filtered.filter(item => item.featured === false);
    }
    
    // Apply search filter
    if (searchText) {
        filtered = filtered.filter(item => 
            item.name.toLowerCase().includes(searchText) ||
            item.description.toLowerCase().includes(searchText)
        );
    }
    
    // Render filtered results
    renderFilteredResults(filtered);
    showActiveFilters(categoryFilter, licenseFilter, featuredFilter, searchText);
}

function clearFilters() {
    document.getElementById('filterCategory').value = '';
    document.getElementById('filterLicense').value = '';
    document.getElementById('filterFeatured').value = '';
    document.getElementById('filterSearch').value = '';
    
    refreshCurrentView();
    hideActiveFilters();
}

function renderFilteredResults(results) {
    const grid = document.getElementById('categoryList') || document.getElementById('featuredGrid');
    if (!grid) return;
    
    if (results.length === 0) {
        grid.innerHTML = `
            <div class="no-results">
                <i class="fas fa-search"></i>
                <h3>No se encontraron resultados</h3>
                <p>Intenta con otros filtros de búsqueda</p>
            </div>
        `;
        return;
    }
    
    const isList = grid.id === 'categoryList';
    grid.innerHTML = results.map(item => 
        isList ? createSoftwareListItem(item) : createSoftwareCard(item)
    ).join('');
    
    renderFavoriteButtons();
}

function showActiveFilters(category, license, featured, search) {
    const container = document.getElementById('activeFiltersContainer');
    if (!container) return;
    
    const tags = [];
    
    if (category) {
        tags.push(`<span class="active-filter-tag">${getCategoryName(category)} <span class="remove-filter" onclick="removeFilter('filterCategory', '')">&times;</span></span>`);
    }
    
    if (license) {
        tags.push(`<span class="active-filter-tag">Licencia: ${license} <span class="remove-filter" onclick="removeFilter('filterLicense', '')">&times;</span></span>`);
    }
    
    if (featured) {
        tags.push(`<span class="active-filter-tag">${featured === 'true' ? 'Destacados' : 'No destacados'} <span class="remove-filter" onclick="removeFilter('filterFeatured', '')">&times;</span></span>`);
    }
    
    if (search) {
        tags.push(`<span class="active-filter-tag">Búsqueda: "${search}" <span class="remove-filter" onclick="removeFilter('filterSearch', '')">&times;</span></span>`);
    }
    
    container.innerHTML = tags.join('');
    container.style.display = tags.length > 0 ? 'flex' : 'none';
}

function hideActiveFilters() {
    const container = document.getElementById('activeFiltersContainer');
    if (container) {
        container.innerHTML = '';
        container.style.display = 'none';
    }
}

function removeFilter(filterId, value) {
    document.getElementById(filterId).value = value;
    applyFilters();
}

// ============================================
// ESTADÍSTICAS CON CHART.JS
// ============================================

function initCharts() {
    if (typeof Chart === 'undefined') {
        console.warn('Chart.js not loaded');
        return;
    }
    
    if (chartsInitialized) return;
    
    createCategoryChart();
    createLicenseChart();
    createFeaturedChart();
    
    chartsInitialized = true;
}

function getChartColors() {
    const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
    
    return {
        text: isDark ? '#e2e8f0' : '#0f172a',
        grid: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        background: [
            'rgba(0, 245, 255, 0.8)',
            'rgba(124, 58, 237, 0.8)',
            'rgba(245, 158, 11, 0.8)',
            'rgba(16, 185, 129, 0.8)',
            'rgba(239, 68, 68, 0.8)',
            'rgba(59, 130, 246, 0.8)'
        ],
        border: [
            'rgba(0, 245, 255, 1)',
            'rgba(124, 58, 237, 1)',
            'rgba(245, 158, 11, 1)',
            'rgba(16, 185, 129, 1)',
            'rgba(239, 68, 68, 1)',
            'rgba(59, 130, 246, 1)'
        ]
    };
}

function createCategoryChart() {
    const ctx = document.getElementById('categoryChart');
    if (!ctx) return;
    
    const counts = getCategoryCounts();
    const colors = getChartColors();
    
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Productividad', 'Desarrollo', 'Multimedia', 'Sistemas', 'Seguridad'],
            datasets: [{
                data: [
                    counts.productividad,
                    counts.desarrollo,
                    counts.multimedia,
                    counts.sistemas,
                    counts.seguridad
                ],
                backgroundColor: colors.background.slice(0, 5),
                borderColor: colors.border.slice(0, 5),
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: colors.text,
                        padding: 15,
                        font: { size: 12 }
                    }
                }
            }
        }
    });
}

function createLicenseChart() {
    const ctx = document.getElementById('licenseChart');
    if (!ctx) return;
    
    const licenseCounts = {};
    catalogData.forEach(item => {
        licenseCounts[item.license] = (licenseCounts[item.license] || 0) + 1;
    });
    
    const colors = getChartColors();
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: Object.keys(licenseCounts),
            datasets: [{
                label: 'Software por Licencia',
                data: Object.values(licenseCounts),
                backgroundColor: colors.background,
                borderColor: colors.border,
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: colors.text,
                        stepSize: 1
                    },
                    grid: {
                        color: colors.grid
                    }
                },
                x: {
                    ticks: {
                        color: colors.text
                    },
                    grid: {
                        color: colors.grid
                    }
                }
            }
        }
    });
}

function createFeaturedChart() {
    const ctx = document.getElementById('featuredChart');
    if (!ctx) return;
    
    const featured = catalogData.filter(item => item.featured).length;
    const nonFeatured = catalogData.length - featured;
    const colors = getChartColors();
    
    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Destacados', 'No Destacados'],
            datasets: [{
                data: [featured, nonFeatured],
                backgroundColor: [colors.background[2], colors.background[4]],
                borderColor: [colors.border[2], colors.border[4]],
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: colors.text,
                        padding: 15,
                        font: { size: 12 }
                    }
                }
            }
        }
    });
}

function updateChartsTheme(theme) {
    if (Chart.instances) {
        Chart.instances.forEach(chart => {
            const colors = getChartColors();
            
            if (chart.options.plugins.legend) {
                chart.options.plugins.legend.labels.color = colors.text;
            }
            
            if (chart.options.scales) {
                if (chart.options.scales.x) {
                    chart.options.scales.x.ticks.color = colors.text;
                    chart.options.scales.x.grid.color = colors.grid;
                }
                if (chart.options.scales.y) {
                    chart.options.scales.y.ticks.color = colors.text;
                    chart.options.scales.y.grid.color = colors.grid;
                }
            }
            
            chart.update();
        });
    }
}

// Make function available globally
window.updateChartsTheme = updateChartsTheme;

// Initialize charts and filters
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(initCharts, 500);
    initAdvancedFilters();
});
