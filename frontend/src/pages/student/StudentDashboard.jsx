import { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Box
} from '@mui/material';
import { School, Assignment, Grade } from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';
import { courseService } from '../../services/courseService';
import { taskService } from '../../services/taskService';
import { gradeService } from '../../services/gradeService';
import Navbar from '../../components/common/Navbar';
import Loading from '../../components/common/Loading';

const StudentDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    cursosInscritos: 0,
    tareasPendientes: 0,
    promedioGeneral: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadStats = async () => {
    try {
      const [coursesRes, tasksRes, gradesRes] = await Promise.all([
        courseService.getCourses(),
        taskService.getTasks(),
        gradeService.getGrades()
      ]);

      const myCourses = coursesRes.data.filter(course =>
        course.estudiantes?.some(est => est._id === user.id)
      );

      const pendingTasks = tasksRes.data.filter(task =>
        task.estado === 'activa' && new Date(task.fechaEntrega) > new Date()
      );

      const average =
        gradesRes.data.length > 0
          ? gradesRes.data.reduce((sum, grade) => sum + grade.nota, 0) / gradesRes.data.length
          : 0;

      setStats({
        cursosInscritos: myCourses.length,
        tareasPendientes: pendingTasks.length,
        promedioGeneral: average.toFixed(2)
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
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Bienvenido, {user.nombre}
        </Typography>
        <Typography variant="h6" color="text.secondary" gutterBottom>
          Panel de Estudiante
        </Typography>

        {/* Estadísticas */}
        <Grid container spacing={3} sx={{ mt: 2, mb: 4 }}>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent sx={{ textAlign: 'center' }}>
                <School color="primary" sx={{ fontSize: 40 }} />
                <Typography variant="h5">{stats.cursosInscritos}</Typography>
                <Typography color="text.secondary">Cursos Inscritos</Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card>
              <CardContent sx={{ textAlign: 'center' }}>
                <Assignment color="warning" sx={{ fontSize: 40 }} />
                <Typography variant="h5">{stats.tareasPendientes}</Typography>
                <Typography color="text.secondary">Tareas Pendientes</Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card>
              <CardContent sx={{ textAlign: 'center' }}>
                <Grade color="success" sx={{ fontSize: 40 }} />
                <Typography variant="h5">{stats.promedioGeneral}</Typography>
                <Typography color="text.secondary">Promedio General</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Accesos rápidos */}
        <Typography variant="h6" gutterBottom>
          Accesos Rápidos
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ cursor: 'pointer' }} onClick={() => (window.location.href = '/student/courses')}>
              <CardContent>
                <Typography variant="subtitle1" align="center">
                  Explorar Cursos
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ cursor: 'pointer' }} onClick={() => (window.location.href = '/student/my-courses')}>
              <CardContent>
                <Typography variant="subtitle1" align="center">
                  Mis Cursos
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ cursor: 'pointer' }} onClick={() => (window.location.href = '/student/tasks')}>
              <CardContent>
                <Typography variant="subtitle1" align="center">
                  Mis Tareas
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ cursor: 'pointer' }} onClick={() => (window.location.href = '/student/grades')}>
              <CardContent>
                <Typography variant="subtitle1" align="center">
                  Mis Notas
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default StudentDashboard;
