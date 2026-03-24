import apiClient from './apiClient';

// Semua fungsi ini SEKARANG menggunakan 'apiClient' yang sudah dipasangi Token JWT
const todoApi = {
  getAll: async () => {
    const response = await apiClient.get('/todos/');
    return response.data;
  },
  
  create: async (title) => {
    const response = await apiClient.post('/todos/', { title });
    return response.data;
  },

  update: async (id, data) => {
    const response = await apiClient.put(`/todos/${id}`, data);
    return response.data;
  },

  delete: async (id) => {
    const response = await apiClient.delete(`/todos/${id}`);
    return response.data;
  }
};

export default todoApi;
