import apiClient from './apiClient';

const adminApi = {
  getUsers: async () => {
    const res = await apiClient.get('/admin/users');
    return res; // Interceptor sudah return response.data
  },
  
  updateUser: async (id, data) => {
    // data is { role: '...', status: '...' }
    const res = await apiClient.put(`/admin/users/${id}`, data);
    return res;
  },

  deleteUser: async (id) => {
    const res = await apiClient.delete(`/admin/users/${id}`);
    return res;
  }
};

export default adminApi;
