import api from './api';

export const gradeService = {
  async getGrades(params = {}) {
    const response = await api.get('/grades', { params });
    return response.data;
  },

  async createGrade(gradeData) {
    const response = await api.post('/grades', gradeData);
    return response.data;
  },

  async getStudentGrades(studentId) {
    const response = await api.get(`/grades/student/${studentId}`);
    return response.data;
  }
};