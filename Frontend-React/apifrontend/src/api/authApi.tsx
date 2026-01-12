import axios from 'axios';

// 1. Configuration de base avec timeout
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5131/api',
  timeout: 10000, // 10 secondes avant timeout
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// 2. Intercepteur de requête amélioré
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      
      // Ajout optionnel pour les requêtes CRITIQUES
      if (config.url?.includes('/heart-test')) {
        config.headers['X-Critical-Request'] = 'true';
      }
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 3. Intercepteur de réponse amélioré
api.interceptors.response.use(
  (response) => {
    // Traitement des réponses réussies
    if (response.data?.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response;
  },
  (error) => {
    // Gestion centralisée des erreurs
    if (error.response) {
      switch (error.response.status) {
        case 401:
          localStorage.removeItem('token');
          window.location.href = '/login?error=session_expired';
          break;
          
        case 403:
          window.location.href = '/unauthorized';
          break;
          
        case 500:
          console.error('Server Error:', error);
          break;
          
        default:
          console.error('API Error:', error);
      }
    } else if (error.request) {
      console.error('Network Error:', error);
      throw new Error('Erreur de connexion au serveur');
    }
    
    return Promise.reject(error);
  }
);

// 4. Méthodes helper
export const setAuthToken = (token: string) => {
  localStorage.setItem('token', token);
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export const clearAuth = () => {
  localStorage.removeItem('token');
  delete api.defaults.headers.common['Authorization'];
};

export default api;