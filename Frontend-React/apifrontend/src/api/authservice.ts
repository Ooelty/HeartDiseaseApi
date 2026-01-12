import api, { setAuthToken, clearAuth } from './authApi';

export const AuthService = {
  login: async (email: string, password: string) => {
    try {
      const response = await api.post('/auth/login', { 
        email, 
        password 
      });
      
      if (response.data.token) {
        setAuthToken(response.data.token);
        return response.data;
      }
      throw new Error('No token received');
    } catch (error) {
      clearAuth();
      throw error;
    }
  },

  register: async (userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }) => {
    try {
      const response = await api.post('/auth/register', userData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  logout: () => {
    clearAuth();
  },

  validateToken: async () => {
    try {
      await api.get('/auth/validate');
      return true;
    } catch (error) {
      clearAuth();
      return false;
    }
  }
};