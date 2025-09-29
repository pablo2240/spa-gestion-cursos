import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Chip,
  Box
} from '@mui/material';
import { Schedule, Person } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const CourseCard = ({ course, onEnroll }) => {
  const navigate = useNavigate();

  return (
    <Card sx={{ maxWidth: 345, m: 2 }}>
      <CardContent>
        {/* Estado del curso */}
        <Chip
          label={course.estado}
          color={course.estado === 'activo' ? 'success' : 'default'}
          size="small"
          sx={{ mb: 1 }}
        />

        {/* Nombre */}
        <Typography variant="h6" gutterBottom>
          {course.nombre}
        </Typography>

        {/* Descripción */}
        <Typography variant="body2" color="text.secondary">
          {course.descripcion?.substring(0, 100)}...
        </Typography>

        {/* Profesor */}
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
          <Person fontSize="small" sx={{ mr: 1 }} />
          <Typography variant="body2">
            {course.profesor?.nombre} {course.profesor?.apellido}
          </Typography>
        </Box>

        {/* Horarios */}
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
          <Schedule fontSize="small" sx={{ mr: 1 }} />
          <Typography variant="body2">
            {course.horarios?.length || 0} horarios
          </Typography>
        </Box>
      </CardContent>

      {/* Botones */}
      <CardActions>
        <Button size="small" onClick={() => navigate(`/courses/${course._id}`)}>
          Ver Detalles
        </Button>
        {onEnroll && course.estado === 'activo' && (
          <Button
            size="small"
            color="primary"
            onClick={() => onEnroll(course._id)}
          >
            Inscribirse
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default CourseCard;
