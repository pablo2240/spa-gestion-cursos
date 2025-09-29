import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Chip,
  Box
} from '@mui/material';
import { Assignment, CalendarToday } from '@mui/icons-material';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

const TaskCard = ({ task, onSubmit, onView }) => {
  const isExpired = new Date(task.fechaEntrega) < new Date();

  return (
    <Card sx={{ maxWidth: 400, mb: 2 }}>
      <CardContent>
        {/* Estado */}
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Chip
            label={task.estado}
            color={task.estado === 'activa' ? 'success' : 'default'}
            size="small"
          />
          {isExpired && (
            <Chip
              label="Expirada"
              color="error"
              size="small"
            />
          )}
        </Box>

        {/* Título */}
        <Typography variant="h6" gutterBottom>
          {task.titulo}
        </Typography>

        {/* Descripción */}
        <Typography variant="body2" color="text.secondary" paragraph>
          {task.descripcion}
        </Typography>

        {/* Fecha entrega */}
        <Box display="flex" alignItems="center" mb={1}>
          <CalendarToday fontSize="small" sx={{ mr: 1 }} />
          <Typography variant="body2" color="text.secondary">
            Entrega: {format(new Date(task.fechaEntrega), "dd 'de' MMMM, yyyy", { locale: es })}
          </Typography>
        </Box>

        {/* Puntaje */}
        <Typography variant="body2">
          Puntaje máximo: {task.puntajeMaximo}
        </Typography>
      </CardContent>

      <CardActions>
        <Button size="small" onClick={() => onView(task)}>
          Ver Detalles
        </Button>
        {onSubmit && !isExpired && task.estado === 'activa' && (
          <Button
            size="small"
            color="primary"
            variant="contained"
            onClick={() => onSubmit(task)}
          >
            Entregar
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default TaskCard;
