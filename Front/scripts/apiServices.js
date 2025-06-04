// apiServices.js

const BACKEND_BASE_URL = 'http://localhost:8000'; // Altere se necessário

// Funções utilitárias
async function makeRequest(url, method = 'GET', body = null) {
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json'
    }
  };
  
  if (body) {
    options.body = JSON.stringify(body);
  }
  
  try {
    const response = await fetch(url, options);
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Erro na requisição');
    }
    
    return response.json();
  } catch (error) {
    console.error('Erro na requisição:', error);
    throw error;
  }
}

// Serviços de Usuário
export const userService = {
  async register(name, email, password, vehicleType = '') {
    const url = `${BACKEND_BASE_URL}/postUser`;
    return makeRequest(url, 'POST', {
      email,
      senha: password,
      vehicleType
    });
  },
  
  async login(email, password) {
    // Implementação depende do seu backend
    // Esta é uma implementação de exemplo
    const url = `${BACKEND_BASE_URL}/login`;
    return makeRequest(url, 'POST', { email, senha: password });
  }
};

// Serviços de Localização
export const locationService = {
  async getSavedLocations(userId) {
    const url = `${BACKEND_BASE_URL}/getLocais/${userId}`;
    return makeRequest(url);
  },
  
  async saveLocation(userId, address) {
    const url = `${BACKEND_BASE_URL}/addLocal/${userId}`;
    return makeRequest(url, 'PUT', { Local: address });
  },
  
  async deleteLocation(userId, address) {
    const url = `${BACKEND_BASE_URL}/delLocal/${userId}`;
    return makeRequest(url, 'PUT', { Local: address });
  }
};

// Serviços de Análise de Risco
export const riskService = {
  async getFloodRisk(location) {
    // Geocodificação
    const coords = await this.geocodeAddress(location);
    
    // Obter altitude
    const altitude = await this.getElevation(coords.lat, coords.lon);
    
    // Obter previsão do tempo
    const weather = await this.getWeatherForecast(coords.lat, coords.lon);
    
    // Calcular risco para cada dia
    const riskData = weather.daily.map(day => ({
      date: day.date,
      precipitation: day.precipitation,
      riskLevel: this.calculateRiskLevel(altitude, day.precipitation)
    }));
    
    return {
      location: coords,
      altitude,
      riskData
    };
  },
  
  calculateRiskLevel(altitude, precipitation) {
    if (altitude < 20 && precipitation > 5) return 'ALTO';
    if (altitude < 20 && precipitation <= 5) return 'MÉDIO';
    return 'BAIXO';
  },
  
  async geocodeAddress(address) {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`;
    const response = await fetch(url);
    const data = await response.json();
    
    if (data && data.length > 0) {
      return {
        lat: parseFloat(data[0].lat),
        lon: parseFloat(data[0].lon)
      };
    }
    throw new Error('Endereço não encontrado');
  },
  
  async getElevation(lat, lon) {
    const url = `https://api.open-elevation.com/api/v1/lookup?locations=${lat},${lon}`;
    const response = await fetch(url);
    const data = await response.json();
    return data.results[0].elevation;
  },
  
  async getWeatherForecast(lat, lon) {
    // Sei que nao eh uma boa pratica hardcode, mas eh para se possivel testar :)
    const API_KEY = '267eedca0b784f6a8d7112948243107';
    const url = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${lat},${lon}&days=7`;
    const response = await fetch(url);
    const data = await response.json();
    
    return {
      daily: data.forecast.forecastday.map(day => ({
        date: day.date,
        precipitation: day.day.totalprecip_mm
      }))
    };
  }
};