import { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Box
} from '@mui/material';
import { School, Assignment, People } from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';
import { courseService } from '../../services/courseService';
import { taskService } from '../../services/taskService';
import Navbar from '../../components/common/Navbar';
import Loading from '../../components/common/Loading';

const TeacherDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    cursosAsignados: 0,
    tareasCreadas: 0,
    totalEstudiantes: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const [coursesRes, tasksRes] = await Promise.all([
        courseService.getCourses(),
        taskService.getTasks()
      ]);

      const myCourses = coursesRes.data.filter(
        course => course.profesor?._id === user.id
      );

      const totalStudents = myCourses.reduce(
        (sum, course) => sum + (course.estudiantes?.length || 0),
        0
      );

      setStats({
        cursosAsignados: myCourses.length,
        tareasCreadas: tasksRes.data.length,
        totalEstudiantes: totalStudents
      });
    } catch (error) {
      console.error('Error cargando estadísticas:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading />;

  return (
    <>
      <Navbar />
      <Container sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Bienvenido, Profesor {user.nombre}
        </Typography>
        <Typography variant="h6" gutterBottom>
          Panel de Profesor
        </Typography>

        {/* Estadísticas */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Box display="flex" alignItems="center">
                  <School sx={{ fontSize: 40, mr: 2 }} />
                  <Box>
                    <Typography variant="h5">{stats.cursosAsignados}</Typography>
                    <Typography color="text.secondary">Cursos Asignados</Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Box display="flex" alignItems="center">
                  <Assignment sx={{ fontSize: 40, mr: 2 }} />
                  <Box>
                    <Typography variant="h5">{stats.tareasCreadas}</Typography>
                    <Typography color="text.secondary">Tareas Creadas</Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Box display="flex" alignItems="center">
                  <People sx={{ fontSize: 40, mr: 2 }} />
                  <Box>
                    <Typography variant="h5">{stats.totalEstudiantes}</Typography>
                    <Typography color="text.secondary">Total Estudiantes</Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Accesos rápidos */}
        <Typography variant="h6" gutterBottom>
          Accesos Rápidos
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card sx={{ cursor: 'pointer' }} onClick={() => (window.location.href = '/teacher/courses')}>
              <CardContent>
                <Typography variant="h6">Mis Cursos</Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card sx={{ cursor: 'pointer' }} onClick={() => (window.location.href = '/teacher/tasks')}>
              <CardContent>
                <Typography variant="h6">Gestionar Tareas</Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card sx={{ cursor: 'pointer' }} onClick={() => (window.location.href = '/teacher/grades')}>
              <CardContent>
                <Typography variant="h6">Calificaciones</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default TeacherDashboard;
