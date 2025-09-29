import api from './api';

export const taskService = {
  async getTasks(params = {}) {
    const response = await api.get('/tasks', { params });
    return response.data;
  },

  async createTask(taskData) {
    const response = await api.post('/tasks', taskData);
    return response.data;
  },

  async submitTask(taskId, formData) {
    const response = await api.post(`/tasks/${taskId}/submit`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  },

  async getTaskSubmissions(taskId) {
    const response = await api.get(`/tasks/${taskId}/submissions`);
    return response.data;
  },

  async gradeSubmission(submissionId, gradeData) {
    const response = await api.put(`/tasks/submissions/${submissionId}/grade`, gradeData);
    return response.data;
  }
};