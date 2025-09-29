import { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Chip,
  Grid
} from '@mui/material';
import { gradeService } from '../../services/gradeService';
import { useNotification } from '../../context/NotificationContext';
import Navbar from '../../components/common/Navbar';
import Loading from '../../components/common/Loading';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

const MyGrades = () => {
  const { showNotification } = useNotification();
  const [grades, setGrades] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadGrades();
  }, []);

  const loadGrades = async () => {
    try {
      const response = await gradeService.getGrades();
      setGrades(response.data);
    } catch (error) {
      showNotification('Error al cargar notas', 'error');
    } finally {
      setLoading(false);
    }
  };

  const getGradeColor = (nota) => {
    if (nota >= 90) return 'success';
    if (nota >= 70) return 'primary';
    if (nota >= 60) return 'warning';
    return 'error';
  };

  const calculateAverage = () => {
    if (grades.length === 0) return 0;
    const sum = grades.reduce((acc, grade) => acc + grade.nota, 0);
    return (sum / grades.length).toFixed(2);
  };

  if (loading) return <Loading />;

  return (
    <>
      <Navbar />
      <Container sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Mis Calificaciones
        </Typography>

        {/* Estadísticas rápidas */}
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={6}>
            <Paper sx={{ p: 2, textAlign: 'center' }}>
              <Typography variant="subtitle1">Promedio General</Typography>
              <Typography variant="h5" fontWeight="bold">
                {calculateAverage()}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper sx={{ p: 2, textAlign: 'center' }}>
              <Typography variant="subtitle1">Total Evaluaciones</Typography>
              <Typography variant="h5" fontWeight="bold">
                {grades.length}
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        {/* Tabla de calificaciones */}
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Curso</TableCell>
                <TableCell>Descripción</TableCell>
                <TableCell>Nota</TableCell>
                <TableCell>Fecha</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {grades.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    No tienes calificaciones registradas
                  </TableCell>
                </TableRow>
              ) : (
                grades.map((grade) => (
                  <TableRow key={grade._id}>
                    <TableCell>{grade.curso?.nombre || 'N/A'}</TableCell>
                    <TableCell>{grade.descripcion || 'N/A'}</TableCell>
                    <TableCell>
                      <Chip
                        label={grade.nota}
                        color={getGradeColor(grade.nota)}
                      />
                    </TableCell>
                    <TableCell>
                      {format(new Date(grade.fecha), 'dd/MM/yyyy', { locale: es })}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
};

export default MyGrades;
