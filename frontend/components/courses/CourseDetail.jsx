import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import { Schedule, Person, CalendarToday } from '@mui/icons-material';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

const CourseDetail = ({ course, open, onClose }) => {
  if (!course) return null;

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant="h6">{course.nombre}</Typography>
          <Chip
            label={course.estado}
            color={course.estado === 'activo' ? 'success' : 'default'}
          />
        </Box>
      </DialogTitle>

      <DialogContent dividers>
        <Box mb={2}>
          <Typography variant="subtitle1" fontWeight="bold">
            Categoría
          </Typography>
          <Typography>{course.categoria}</Typography>
        </Box>

        <Divider />

        <Box mt={2} mb={2}>
          <Typography variant="subtitle1" fontWeight="bold">
            Descripción
          </Typography>
          <Typography>{course.descripcion}</Typography>
        </Box>

        <Divider />

        <Box mt={2} mb={2}>
          <Typography variant="subtitle1" fontWeight="bold">
            Objetivos
          </Typography>
          <Typography>{course.objetivos}</Typography>
        </Box>

        <Divider />

        <Box mt={2} mb={2}>
          <Typography variant="subtitle1" fontWeight="bold">
            Profesor
          </Typography>
          <Box display="flex" alignItems="center" gap={1}>
            <Person fontSize="small" />
            <Typography>
              {course.profesor?.nombre} {course.profesor?.apellido}
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary">
            {course.profesor?.email}
          </Typography>
        </Box>

        <Divider />

        <Box mt={2} mb={2}>
          <Typography variant="subtitle1" fontWeight="bold">
            Horarios
          </Typography>
          <List dense>
            {course.horarios?.map((horario, index) => (
              <ListItem key={index}>
                <Schedule fontSize="small" sx={{ mr: 1 }} />
                <ListItemText
                  primary={`${horario.dia}: ${horario.horaInicio} - ${horario.horaFin}`}
                />
              </ListItem>
            ))}
          </List>
        </Box>

        <Divider />

        <Box mt={2}>
          <Typography variant="subtitle1" fontWeight="bold">
            Información General
          </Typography>
          <Typography>Cupo máximo: {course.cupoMaximo}</Typography>
          <Typography>
            Estudiantes inscritos: {course.estudiantes?.length || 0}
          </Typography>
          {course.fechaInicio && (
            <Box display="flex" alignItems="center" gap={1} mt={1}>
              <CalendarToday fontSize="small" />
              <Typography>
                Fecha de inicio:{' '}
                {format(new Date(course.fechaInicio), 'dd/MM/yyyy', {
                  locale: es,
                })}
              </Typography>
            </Box>
          )}
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CourseDetail;
