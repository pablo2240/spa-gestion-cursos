
import { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  IconButton
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { courseService } from '../../services/courseService';
import CourseForm from '../../components/admin/CourseForm';
import Loading from '../../components/common/Loading';

const CourseManagement = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [profesores, setProfesores] = useState([]);

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    try {
      const res = await courseService.getCourses();
      setCourses(res.data);
    } catch (error) {
      console.error('Error cargando cursos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (course) => {
    setSelectedCourse(course);
    setFormOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Seguro de eliminar este curso?')) return;
    try {
      await courseService.deleteCourse(id);
      loadCourses();
    } catch (error) {
      console.error('Error eliminando curso:', error);
    }
  };

  const handleSubmit = async (data) => {
    try {
      if (selectedCourse) {
        await courseService.updateCourse(selectedCourse._id, data);
      } else {
        await courseService.createCourse(data);
      }
      setFormOpen(false);
      setSelectedCourse(null);
      loadCourses();
    } catch (error) {
      console.error('Error guardando curso:', error);
    }
  };

  if (loading) return <Loading />;

  return (
    <>
      <Container sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Gestión de Cursos
        </Typography>

        <Grid container spacing={3}>
          {courses.length > 0 ? (
            courses.map((course) => (
              <Grid item xs={12} sm={6} md={4} key={course._id}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">{course.nombre}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {course.profesor?.nombre} {course.profesor?.apellido}
                    </Typography>
                    <Typography variant="body2">
                      {course.estudiantes?.length || 0} / {course.cupoMaximo}
                    </Typography>
                    <Chip
                      label={course.estado}
                      color={course.estado === 'activo' ? 'success' : 'default'}
                      size="small"
                      sx={{ mt: 1, mb: 1 }}
                    />

                    <Box display="flex" justifyContent="flex-end">
                      <IconButton
                        color="primary"
                        onClick={() => handleEdit(course)}
                      >
                        <Edit />
                      </IconButton>
                      <IconButton
                        color="error"
                        onClick={() => handleDelete(course._id)}
                      >
                        <Delete />
                      </IconButton>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))
          ) : (
            <Typography>No hay cursos disponibles</Typography>
          )}
        </Grid>
      </Container>

      <CourseForm
        open={formOpen}
        onClose={() => setFormOpen(false)}
        onSubmit={handleSubmit}
        course={selectedCourse}
        profesores={profesores}
      />
    </>
  );
};

export default CourseManagement;

