import { locationService } from './apiServices.js';
import { refreshSavedLocations } from './savedLocations.js';

// Elementos DOM
const localInput = document.getElementById('localInput');
const searchBtn = document.getElementById('searchBtn');
const resultContainer = document.getElementById('resultContainer');
const loading = document.getElementById('loading');
const errorMessage = document.getElementById('errorMessage');
const saveLocationBtn = document.getElementById('saveLocationBtn');
const savedMessage = document.getElementById('savedMessage');

        
// Elementos de resultado
const locationName = document.getElementById('locationName');
const locationCoords = document.getElementById('locationCoords');
const locationAltitude = document.getElementById('locationAltitude');
const currentIcon = document.getElementById('currentIcon');
const currentTemp = document.getElementById('currentTemp');
const currentFeelsLike = document.getElementById('currentFeelsLike');
const currentHumidity = document.getElementById('currentHumidity');
const currentWind = document.getElementById('currentWind');
const currentPrecip = document.getElementById('currentPrecip');
const currentPressure = document.getElementById('currentPressure');
const forecastGrid = document.getElementById('forecastGrid');

        
// Mapeamento de ícones para condições climáticas
const weatherIcons = {
    'Sunny': 'fa-sun',
    'Clear': 'fa-sun',
    'Partly cloudy': 'fa-cloud-sun',
    'Cloudy': 'fa-cloud',
    'Overcast': 'fa-cloud',
    'Mist': 'fa-smog',
    'Patchy rain': 'fa-cloud-rain',
    'Patchy snow': 'fa-snowflake',
    'Patchy sleet': 'fa-cloud-meatball',
    'Patchy freezing drizzle': 'fa-cloud-meatball',
    'Thundery outbreaks': 'fa-bolt',
    'Blowing snow': 'fa-wind',
    'Blizzard': 'fa-wind',
    'Fog': 'fa-smog',
    'Freezing fog': 'fa-smog',
    'Patchy light drizzle': 'fa-cloud-rain',
    'Light drizzle': 'fa-cloud-rain',
    'Freezing drizzle': 'fa-temperature-low',
    'Heavy freezing drizzle': 'fa-temperature-low',
    'Patchy light rain': 'fa-cloud-rain',
    'Light rain': 'fa-cloud-rain',
    'Moderate rain': 'fa-cloud-showers-heavy',
    'Heavy rain': 'fa-cloud-showers-heavy',
    'Light freezing rain': 'fa-cloud-rain',
    'Moderate or heavy freezing rain': 'fa-cloud-rain',
    'Light sleet': 'fa-cloud-meatball',
    'Moderate or heavy sleet': 'fa-cloud-meatball',
    'Patchy light snow': 'fa-snowflake',
    'Light snow': 'fa-snowflake',
    'Patchy moderate snow': 'fa-snowflake',
    'Moderate snow': 'fa-snowflake',
    'Patchy heavy snow': 'fa-snowflake',
    'Heavy snow': 'fa-snowflake',
    'Ice pellets': 'fa-icicles',
    'Light rain shower': 'fa-cloud-showers-heavy',
    'Moderate or heavy rain shower': 'fa-cloud-showers-heavy',
    'Torrential rain shower': 'fa-cloud-showers-heavy',
    'Light sleet showers': 'fa-cloud-meatball',
    'Moderate or heavy sleet showers': 'fa-cloud-meatball',
    'Light snow showers': 'fa-snowflake',
    'Moderate or heavy snow showers': 'fa-snowflake',
    'Light showers of ice pellets': 'fa-icicles',
    'Moderate or heavy showers of ice pellets': 'fa-icicles',
    'Patchy light rain with thunder': 'fa-bolt',
    'Moderate or heavy rain with thunder': 'fa-bolt',
    'Patchy light snow with thunder': 'fa-bolt',
    'Moderate or heavy snow with thunder': 'fa-bolt'
};

// Variável para armazenar o local atual
let currentLocation = '';
        
// Função para buscar previsão do tempo
async function fetchWeather(location) {
    try {
        // Exibir loading e esconder resultados/erros
        loading.style.display = 'block';
        resultContainer.style.display = 'none';
        errorMessage.style.display = 'none';
        
        // Geocodificação
        const geocodeUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}`;
        const geocodeResponse = await fetch(geocodeUrl);
        const geocodeData = await geocodeResponse.json();
        
        if (!geocodeData || geocodeData.length === 0) {
            throw new Error('Local não encontrado');
        }
        
        const { lat, lon, display_name } = geocodeData[0];
        const coords = `${parseFloat(lat).toFixed(4)}, ${parseFloat(lon).toFixed(4)}`;
        
        // Obter altitude
        const elevationUrl = `https://api.open-elevation.com/api/v1/lookup?locations=${lat},${lon}`;
        const elevationResponse = await fetch(elevationUrl);
        const elevationData = await elevationResponse.json();
        const altitude = elevationData.results[0].elevation.toFixed(0);
        
        // Obter previsão do tempo
        const API_KEY = '267eedca0b784f6a8d7112948243107';
        const weatherUrl = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${lat},${lon}&days=7`;
        const weatherResponse = await fetch(weatherUrl);
        const weatherData = await weatherResponse.json();
        
        // Atualizar a UI com os dados
        updateWeatherUI(display_name, coords, altitude, weatherData);
        
        // Esconder loading e mostrar resultados
        loading.style.display = 'none';
        resultContainer.style.display = 'block';
        
    } catch (error) {
        console.error('Erro ao buscar dados:', error);
        loading.style.display = 'none';
        errorMessage.style.display = 'block';
        errorMessage.textContent = `Erro: ${error.message || 'Não foi possível obter os dados meteorológicos'}`;
    }
}

// Função para atualizar a UI com os dados meteorológicos
function updateWeatherUI(location, coords, altitude, weatherData) {
    currentLocation = location; // Guarda o local atual
    
    // Dados atuais
    const current = weatherData.current;
    const condition = current.condition.text;
    
    locationName.textContent = location;
    locationCoords.textContent = coords;
    locationAltitude.textContent = altitude;
    
    // Definir ícone baseado na condição atual
    currentIcon.className = 'fas ' + (weatherIcons[condition] || 'fa-cloud');
    
    currentTemp.textContent = `${current.temp_c}°C`;
    currentFeelsLike.textContent = `${current.feelslike_c}°C`;
    currentHumidity.textContent = current.humidity;
    currentWind.textContent = current.wind_kph;
    currentPrecip.textContent = current.precip_mm;
    currentPressure.textContent = current.pressure_mb;
    
    // Previsão para os próximos dias
    forecastGrid.innerHTML = '';
    
    weatherData.forecast.forecastday.forEach(day => {
        const date = new Date(day.date);
        const dayName = date.toLocaleDateString('pt-BR', { weekday: 'short' });
        const dayNumber = date.getDate();
        const month = date.toLocaleDateString('pt-BR', { month: 'short' });
        
        const condition = day.day.condition.text;
        const iconClass = weatherIcons[condition] || 'fa-cloud';
        
        // Calcular risco de alagamento
        const riskLevel = calculateFloodRisk(altitude, day.day.totalprecip_mm);
        
        const card = document.createElement('div');
        card.className = 'forecast-card';
        card.innerHTML = `
            <div class="forecast-date">${dayName}, ${dayNumber} ${month}</div>
            <div class="forecast-icon"><i class="fas ${iconClass}"></i></div>
            <div class="forecast-temp">${day.day.maxtemp_c}° / ${day.day.mintemp_c}°</div>
            <div class="forecast-precipitation">
                <i class="fas fa-tint"></i> ${day.day.totalprecip_mm}mm
            </div>
            <div class="risk-indicator risk-${riskLevel.toLowerCase()}">RISCO ${riskLevel}</div>
        `;
        
        forecastGrid.appendChild(card);
    });
}

// Função para calcular risco de alagamento
function calculateFloodRisk(altitude, precipitation) {
    altitude = parseFloat(altitude);
    precipitation = parseFloat(precipitation);
    
    if (altitude < 20 && precipitation > 5) return 'ALTO';
    if (altitude < 20 && precipitation <= 5) return 'MÉDIO';
    return 'BAIXO';
}

// Função para salvar o local
async function saveLocation() {
    const userId = localStorage.getItem('userId');
    
    if (!userId) {
        alert('Você precisa estar logado para salvar locais. Faça login primeiro.');
        return;
    }
    
    if (!currentLocation) {
        alert('Nenhum local para salvar.');
        return;
    }
    
    try {
        saveLocationBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Salvando...';
        saveLocationBtn.disabled = true;
        
        await locationService.saveLocation(userId, currentLocation);
        
        // Feedback visual
        saveLocationBtn.innerHTML = '<i class="fas fa-check"></i> Salvo!';
        saveLocationBtn.classList.add('saved');
        savedMessage.style.display = 'block';

        refreshSavedLocations();
        
        // Resetar após 3 segundos
        setTimeout(() => {
            saveLocationBtn.innerHTML = '<i class="fas fa-bookmark"></i> Salvar Local';
            saveLocationBtn.classList.remove('saved');
            saveLocationBtn.disabled = false;
            savedMessage.style.display = 'none';
        }, 3000);
        
    } catch (error) {
        console.error('Erro ao salvar local:', error);
        alert('Erro ao salvar local: ' + error.message);
        saveLocationBtn.innerHTML = '<i class="fas fa-bookmark"></i> Salvar Local';
        saveLocationBtn.disabled = false;
    }
}

// Event Listeners
searchBtn.addEventListener('click', () => {
    const location = localInput.value.trim();
    if (location) {
        fetchWeather(location);
    }
});

localInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const location = localInput.value.trim();
        if (location) {
            fetchWeather(location);
        }
    }
});

saveLocationBtn.addEventListener('click', saveLocation);

// Carregar dados de exemplo ao iniciar
window.addEventListener('DOMContentLoaded', () => {
    fetchWeather('São Paulo');
});