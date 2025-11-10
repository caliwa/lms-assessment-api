import axios from 'axios';

const apiClient = axios.create({
  //
  // La URL base de tu API de Laravel (que corre en el puerto 80/443)
  baseURL: 'http://localhost', 
  withCredentials: true, // Importante para que Sanctum funcione
  headers: {
    'Accept': 'application/json' // Pide JSON (corrige el error "Route [login] not defined")
  }
});

//
// Interceptor para añadir el token a TODAS las peticiones si existe
apiClient.interceptors.request.use(config => {
  const token = localStorage.getItem('AUTH_TOKEN');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;