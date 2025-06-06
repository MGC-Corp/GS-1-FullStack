import { locationService } from './apiServices.js';

// Elementos DOM
const savedLocationsContainer = document.getElementById('savedLocationsContainer');
const savedLocationsGrid = document.getElementById('savedLocationsGrid');

// Função para carregar locais salvos
export async function loadSavedLocations() {
    const userId = localStorage.getItem('userId');
    
    if (!userId) {
        savedLocationsContainer.style.display = 'none';
        return;
    }
    
    try {
        const savedLocations = await locationService.getSavedLocations(userId);
        
        if (savedLocations && savedLocations.length > 0) {
            savedLocationsGrid.innerHTML = '';
            
            savedLocations.forEach(location => {
                const locationItem = document.createElement('div');
                locationItem.className = 'saved-location-item';
                
                locationItem.innerHTML = `
                    <div class="saved-location-name" title="${location}">
                        <i class="fas fa-map-marker-alt"></i> ${location}
                    </div>
                    <div class="saved-location-actions">
                        <button class="delete-location-btn" data-location="${location}">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                `;
                
                // Evento para selecionar o local
                locationItem.querySelector('.saved-location-name').addEventListener('click', () => {
                    document.getElementById('localInput').value = location;
                    document.getElementById('searchBtn').click();
                });
                
                // Evento para deletar o local
                const deleteBtn = locationItem.querySelector('.delete-location-btn');
                deleteBtn.addEventListener('click', (e) => {
                    e.stopPropagation(); // Impede que o evento de clique no item seja acionado
                    deleteLocation(location);
                });
                
                savedLocationsGrid.appendChild(locationItem);
            });
            
            savedLocationsContainer.style.display = 'block';
        } else {
            savedLocationsContainer.style.display = 'none';
        }
    } catch (error) {
        console.error('Erro ao carregar locais salvos:', error);
        savedLocationsContainer.style.display = 'none';
    }
}

// Função para deletar um local
async function deleteLocation(location) {
    const userId = localStorage.getItem('userId');
    
    if (!userId) {
        alert('Você precisa estar logado para realizar esta ação.');
        return;
    }
    
    if (!confirm(`Tem certeza que deseja remover "${location}" dos seus locais salvos?`)) {
        return;
    }
    
    try {
        await locationService.deleteLocation(userId, location);
        // Recarregar a lista após exclusão
        loadSavedLocations();
    } catch (error) {
        console.error('Erro ao excluir local:', error);
        alert('Erro ao excluir local: ' + error.message);
    }
}

// Carregar locais salvos quando a página carregar
window.addEventListener('DOMContentLoaded', loadSavedLocations);

// Recarregar locais salvos após login/logout
export function refreshSavedLocations() {
    loadSavedLocations();
}