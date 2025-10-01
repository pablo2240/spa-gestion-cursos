import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid
} from '@mui/material';

const TaskForm = ({ open, onClose, onSubmit, cursoId }) => {
  const [formData, setFormData] = useState({
    titulo: '',
    descripcion: '',
    fechaEntrega: '',
    puntajeMaximo: 100,
    curso: cursoId
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      titulo: '',
      descripcion: '',
      fechaEntrega: '',
      puntajeMaximo: 100,
      curso: cursoId
    });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <form onSubmit={handleSubmit}>
        <DialogTitle>Crear Nueva Tarea</DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Título"
                name="titulo"
                value={formData.titulo}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Descripción"
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                fullWidth
                type="date"
                label="Fecha de Entrega"
                name="fechaEntrega"
                value={formData.fechaEntrega}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                required
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                fullWidth
                type="number"
                label="Puntaje Máximo"
                name="puntajeMaximo"
                value={formData.puntajeMaximo}
                onChange={handleChange}
                inputProps={{ min: 1 }}
                required
              />
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose}>Cancelar</Button>
          <Button type="submit" variant="contained" color="primary">
            Crear Tarea
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default TaskForm;
