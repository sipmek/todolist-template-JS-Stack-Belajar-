import apiClient from './apiClient';

// Semua fungsi ini menggunakan 'apiClient' yang sudah dipasangi Token JWT
// Interceptor sudah return response.data, jadi cukup return response langsung
const todoApi = {
  getAll: async () => {
    const response = await apiClient.get('/todos/');
    return response; // response sudah berisi data dari server
  },
  
  create: async (title) => {
    const response = await apiClient.post('/todos/', { title });
    return response;
  },

  update: async (id, data) => {
    const response = await apiClient.put(`/todos/${id}`, data);
    return response;
  },

  delete: async (id) => {
    const response = await apiClient.delete(`/todos/${id}`);
    return response;
  }
};

export default todoApi;
