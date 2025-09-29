import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
  Box,
  Divider
} from '@mui/material';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

const TaskReview = ({ open, onClose, onGrade, submission }) => {
  const [calificacion, setCalificacion] = useState('');
  const [feedback, setFeedback] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onGrade({
      calificacion: parseFloat(calificacion),
      feedback
    });
    setCalificacion('');
    setFeedback('');
    onClose();
  };

  if (!submission) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Calificar Entrega</DialogTitle>
      <DialogContent dividers>
        <Box mb={2}>
          <Typography variant="subtitle2">Estudiante</Typography>
          <Typography>
            {submission.estudiante?.nombre} {submission.estudiante?.apellido}
          </Typography>
          <Typography color="text.secondary">{submission.estudiante?.email}</Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        <Box mb={2}>
          <Typography variant="subtitle2">Fecha de Entrega</Typography>
          <Typography>
            {format(new Date(submission.fechaEntrega), "dd 'de' MMMM, yyyy 'a las' HH:mm", {
              locale: es
            })}
          </Typography>
        </Box>

        {submission.comentario && (
          <Box mb={2}>
            <Typography variant="subtitle2">Comentario del Estudiante</Typography>
            <Typography>{submission.comentario}</Typography>
          </Box>
        )}

        <Box mb={2}>
          <Typography variant="subtitle2">Archivo Entregado</Typography>
          <Button variant="outlined" component="a" href={submission.archivoUrl} target="_blank">
            Descargar Archivo
          </Button>
        </Box>

        <TextField
          fullWidth
          type="number"
          label="Calificación"
          value={calificacion}
          onChange={(e) => setCalificacion(e.target.value)}
          inputProps={{ min: 0, max: 100, step: 0.1 }}
          required
          sx={{ mb: 2 }}
        />

        <TextField
          fullWidth
          multiline
          rows={4}
          label="Retroalimentación"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="Proporciona retroalimentación al estudiante..."
          required
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancelar
        </Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Guardar Calificación
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TaskReview;
