// frontend/src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import apiClient from '../api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('AUTH_TOKEN'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      localStorage.setItem('AUTH_TOKEN', token);
      
      apiClient.get('/api/me')
        .then(response => setUser(response.data))
        .catch(() => {
          localStorage.removeItem('AUTH_TOKEN');
          setToken(null);
        })
        .finally(() => setLoading(false));
    } else {
      localStorage.removeItem('AUTH_TOKEN');
      setLoading(false);
    }
  }, [token]);

  const login = async (email, password) => {
    //
    await apiClient.get('/sanctum/csrf-cookie');
    
    //
    const response = await apiClient.post('/api/login', { email, password });
    
    setToken(response.data.token);
    setUser(response.data.user);
  };

  const logout = async () => {
    try {
      await apiClient.post('/api/logout'); // <-- AÑADIR /api/
    } catch (error) {
      console.error("Error al hacer logout:", error);
    } finally {
      setUser(null);
      setToken(null);
    }
  };

  if (loading) {
    return <div>Cargando...</div>; 
  }

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);