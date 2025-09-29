import api from './api';

export const userService = {
  async getUsers(params = {}) {
    const response = await api.get('/users', { params });
    return response.data;
  },

  async getUser(id) {
    const response = await api.get(`/users/${id}`);
    return response.data;
  },

  async createUser(userData) {
    const response = await api.post('/users', userData);
    return response.data;
  },

  async updateUser(id, userData) {
    const response = await api.put(`/users/${id}`, userData);
    return response.data;
  },

  async deleteUser(id) {
    const response = await api.delete(`/users/${id}`);
    return response.data;
  },

  async updateProfile(profileData) {
    const response = await api.put('/users/profile/me', profileData);
    return response.data;
  }
};