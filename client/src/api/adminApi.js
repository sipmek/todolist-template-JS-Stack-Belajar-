import apiClient from './apiClient';

const adminApi = {
  getUsers: async () => {
    const res = await apiClient.get('/admin/users');
    return res.data;
  },
  
  updateUser: async (id, data) => {
    // data is { role: '...', status: '...' }
    const res = await apiClient.put(`/admin/users/${id}`, data);
    return res.data;
  },

  deleteUser: async (id) => {
    const res = await apiClient.delete(`/admin/users/${id}`);
    return res.data;
  }
};

export default adminApi;
