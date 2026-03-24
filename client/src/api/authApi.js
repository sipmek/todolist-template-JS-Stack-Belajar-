import apiClient from './apiClient';

const authApi = {
  // Interceptor sudah return response.data, jadi cukup return langsung
  login: async (username, password) => {
    const response = await apiClient.post('/auth/login', { username, password });
    return response; // response adalah backend response body: { status, token, data, message }
  },
  
  register: async (username, password, role = 'user') => {
    const response = await apiClient.post('/auth/register', { username, password, role });
    return response; // response adalah backend response body
  }
};

export default authApi;
