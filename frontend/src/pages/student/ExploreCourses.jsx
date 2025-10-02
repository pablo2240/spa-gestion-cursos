import { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Grid,
  Box,
  TextField,
  MenuItem,
  Button
} from '@mui/material';
import { courseService } from '../../services/courseService';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';
import Navbar from '../../components/common/Navbar';
import CourseCard from '../../components/courses/CourseCard';
import CourseDetail from '../../components/courses/CourseDetail';
import Loading from '../../components/common/Loading';

const ExploreCourses = () => {
  const { user } = useAuth();
  const { showNotification } = useNotification();
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCourses();
  }, []);

  useEffect(() => {
    filterCourses();
  }, [courses, filter]);

  const loadCourses = async () => {
    try {
      const response = await courseService.getCourses({ estado: 'activo' });
      setCourses(response.data);
    } catch (error) {
      showNotification('Error al cargar cursos', 'error');
    } finally {
      setLoading(false);
    }
  };

  const filterCourses = () => {
    if (filter === 'all') {
      setFilteredCourses(courses);
    } else {
      setFilteredCourses(courses.filter(course => course.categoria === filter));
    }
  };

  const handleViewDetail = (course) => {
    setSelectedCourse(course);
    setDetailOpen(true);
  };

  const handleEnroll = async (courseId) => {
    try {
      await courseService.enrollStudent(courseId, user.id);
      showNotification('¡Te has inscrito exitosamente!', 'success');
      loadCourses();
    } catch (error) {
      showNotification(
        error.response?.data?.message || 'Error al inscribirse en el curso',
        'error'
      );
    }
  };

  if (loading) return <Loading />;

  return (
    <>
      <Navbar />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Explorar Cursos Disponibles
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Encuentra el curso perfecto para ti
        </Typography>

        <Box sx={{ mb: 3 }}>
          <TextField
            select
            label="Filtrar por categoría"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            sx={{ minWidth: 200 }}
          >
            <MenuItem value="all">Todas las categorías</MenuItem>
            <MenuItem value="Programación">Programación</MenuItem>
            <MenuItem value="Diseño">Diseño</MenuItem>
            <MenuItem value="Gestión">Gestión</MenuItem>
            <MenuItem value="Electrónica">Electrónica</MenuItem>
            <MenuItem value="Mecánica">Mecánica</MenuItem>
            <MenuItem value="Otros">Otros</MenuItem>
          </TextField>
        </Box>

        {filteredCourses.length === 0 ? (
          <Typography variant="body1" color="text.secondary">
            No hay cursos disponibles en este momento.
          </Typography>
        ) : (
          <Grid container spacing={3}>
            {filteredCourses.map((course) => (
              <Grid item xs={12} sm={6} md={4} key={course._id}>
                <CourseCard
                  course={course}
                  onView={() => handleViewDetail(course)}
                  onEnroll={handleEnroll}
                />
              </Grid>
            ))}
          </Grid>
        )}

        <CourseDetail
          course={selectedCourse}
          open={detailOpen}
          onClose={() => setDetailOpen(false)}
        />
      </Container>
    </>
  );
};

export default ExploreCourses;