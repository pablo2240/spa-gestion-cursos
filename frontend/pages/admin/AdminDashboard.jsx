import { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Box
} from '@mui/material';
import { School, People, Assignment, Grade } from '@mui/icons-material';
import { courseService } from '../../services/courseService';
import { userService } from '../../services/userService';
import { taskService } from '../../services/taskService';
import Navbar from '../../components/common/Navbar';
import Loading from '../../components/common/Loading';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalCursos: 0,
    totalUsuarios: 0,
    totalTareas: 0,
    cursosActivos: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const [coursesRes, usersRes, tasksRes] = await Promise.all([
        courseService.getCourses(),
        userService.getUsers(),
        taskService.getTasks()
      ]);

      const activeCourses = coursesRes.data.filter(c => c.estado === 'activo');

      setStats({
        totalCursos: coursesRes.data.length,
        totalUsuarios: usersRes.data.length,
        totalTareas: tasksRes.data.length,
        cursosActivos: activeCourses.length
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
          Panel de Administración
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Gestión Completa del Sistema SENA
        </Typography>

        {/* Estadísticas */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Box display="flex" alignItems="center">
                  <School sx={{ fontSize: 40, mr: 2 }} color="primary" />
                  <Box>
                    <Typography variant="h5">{stats.totalCursos}</Typography>
                    <Typography variant="body2">Total Cursos</Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Box display="flex" alignItems="center">
                  <People sx={{ fontSize: 40, mr: 2 }} color="secondary" />
                  <Box>
                    <Typography variant="h5">{stats.totalUsuarios}</Typography>
                    <Typography variant="body2">Total Usuarios</Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Box display="flex" alignItems="center">
                  <Assignment sx={{ fontSize: 40, mr: 2 }} color="success" />
                  <Box>
                    <Typography variant="h5">{stats.totalTareas}</Typography>
                    <Typography variant="body2">Total Tareas</Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Box display="flex" alignItems="center">
                  <Grade sx={{ fontSize: 40, mr: 2 }} color="warning" />
                  <Box>
                    <Typography variant="h5">{stats.cursosActivos}</Typography>
                    <Typography variant="body2">Cursos Activos</Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Sección de gestión */}
        <Typography variant="h5" gutterBottom>
          Gestión del Sistema
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <Card
              sx={{ cursor: 'pointer' }}
              onClick={() => (window.location.href = '/admin/courses')}
            >
              <CardContent>
                <Typography variant="h6">Gestionar Cursos</Typography>
                <Typography variant="body2">
                  Crear, editar y administrar cursos
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Card
              sx={{ cursor: 'pointer' }}
              onClick={() => (window.location.href = '/admin/users')}
            >
              <CardContent>
                <Typography variant="h6">Gestionar Usuarios</Typography>
                <Typography variant="body2">
                  Administrar estudiantes y profesores
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Card
              sx={{ cursor: 'pointer' }}
              onClick={() => (window.location.href = '/admin/reports')}
            >
              <CardContent>
                <Typography variant="h6">Reportes</Typography>
                <Typography variant="body2">
                  Generar reportes y estadísticas
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default AdminDashboard;

