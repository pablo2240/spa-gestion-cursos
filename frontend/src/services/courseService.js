import api from './api';

export const courseService = {
  async getCourses(params = {}) {
    const response = await api.get('/courses', { params });
    return response.data;
  },

  async getCourse(id) {
    const response = await api.get(`/courses/${id}`);
    return response.data;
  },

  async createCourse(courseData) {
    const response = await api.post('/courses', courseData);
    return response.data;
  },

  async updateCourse(id, courseData) {
    const response = await api.put(`/courses/${id}`, courseData);
    return response.data;
  },

  async deleteCourse(id) {
    const response = await api.delete(`/courses/${id}`);
    return response.data;
  },

  async enrollStudent(courseId, studentId) {
    const response = await api.post(`/courses/${courseId}/enroll`, {
      estudianteId: studentId
    });
    return response.data;
  }
};