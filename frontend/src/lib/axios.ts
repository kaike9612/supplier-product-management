import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      // Server responded with error status
      const status = error.response.status;
      const data = error.response.data;
      
      // Handle validation errors (422)
      if (status === 422 && data.errors) {
        const firstError = Object.values(data.errors)[0];
        const message = Array.isArray(firstError) ? firstError[0] : 'Erro de validação';
        return Promise.reject(new Error(message));
      }
      
      // Handle validation errors (400)
      if (status === 400 && data.message) {
        return Promise.reject(new Error(data.message));
      }
      
      // Handle other errors
      const message = data?.message || 'Erro na requisição';
      return Promise.reject(new Error(message));
    } else if (error.request) {
      // Request made but no response
      return Promise.reject(new Error('Sem resposta do servidor. Verifique sua conexão.'));
    } else {
      // Something else happened
      return Promise.reject(new Error('Erro ao processar requisição.'));
    }
  }
);

export default api;
