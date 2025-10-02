import { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Grid,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip
} from '@mui/material';
import { courseService } from '../../services/courseService';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';
import Navbar from '../../components/common/Navbar';
import Loading from '../../components/common/Loading';

const ManagedCourses = () => {
  const { user } = useAuth();
  const { showNotification } = useNotification();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    try {
      const response = await courseService.getCourses();
      const myCourses = response.data.filter(
        course => course.profesor?._id === user.id
      );
      setCourses(myCourses);
    } catch (error) {
      showNotification('Error al cargar cursos', 'error');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading />;

  return (
    <>
      <Navbar />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Mis Cursos Asignados
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Cursos que estás impartiendo
        </Typography>

        {courses.length === 0 ? (
          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Typography variant="h6" color="text.secondary">
              No tienes cursos asignados
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Contacta al administrador para que te asigne cursos
            </Typography>
          </Box>
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><strong>Curso</strong></TableCell>
                  <TableCell><strong>Categoría</strong></TableCell>
                  <TableCell><strong>Estudiantes</strong></TableCell>
                  <TableCell><strong>Horarios</strong></TableCell>
                  <TableCell><strong>Estado</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {courses.map((course) => (
                  <TableRow key={course._id}>
                    <TableCell>{course.nombre}</TableCell>
                    <TableCell>
                      <Chip label={course.categoria} size="small" />
                    </TableCell>
                    <TableCell>
                      {course.estudiantes?.length || 0} / {course.cupoMaximo}
                    </TableCell>
                    <TableCell>
                      {course.horarios?.length || 0} horarios
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={course.estado}
                        color={course.estado === 'activo' ? 'success' : 'default'}
                        size="small"
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {courses.length > 0 && (
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6" gutterBottom>
              Resumen
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <Paper sx={{ p: 2 }}>
                  <Typography variant="h4" color="primary">
                    {courses.length}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Cursos Asignados
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Paper sx={{ p: 2 }}>
                  <Typography variant="h4" color="success.main">
                    {courses.reduce((sum, c) => sum + (c.estudiantes?.length || 0), 0)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total Estudiantes
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Paper sx={{ p: 2 }}>
                  <Typography variant="h4" color="warning.main">
                    {courses.filter(c => c.estado === 'activo').length}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Cursos Activos
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </Box>
        )}
      </Container>
    </>
  );
};

export default ManagedCourses;