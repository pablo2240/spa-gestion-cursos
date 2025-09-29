import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  MenuItem,
  Box,
  Typography,
  IconButton
} from '@mui/material';
import { Add, Delete } from '@mui/icons-material';

const CourseForm = ({ open, onClose, onSubmit, course = null, profesores = [] }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    categoria: '',
    objetivos: '',
    profesor: '',
    cupoMaximo: 30,
    estado: 'activo',
    horarios: [{ dia: '', horaInicio: '', horaFin: '' }]
  });

  useEffect(() => {
    if (course) {
      setFormData(course);
    }
  }, [course]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleHorarioChange = (index, field, value) => {
    const newHorarios = [...formData.horarios];
    newHorarios[index][field] = value;
    setFormData({ ...formData, horarios: newHorarios });
  };

  const addHorario = () => {
    setFormData({
      ...formData,
      horarios: [...formData.horarios, { dia: '', horaInicio: '', horaFin: '' }]
    });
  };

  const removeHorario = (index) => {
    const newHorarios = formData.horarios.filter((_, i) => i !== index);
    setFormData({ ...formData, horarios: newHorarios });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const categorias = ['Programación', 'Diseño', 'Gestión', 'Electrónica', 'Mecánica', 'Otros'];
  const dias = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>{course ? 'Editar Curso' : 'Crear Curso'}</DialogTitle>

      <DialogContent dividers>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <Grid container spacing={2}>
            {/* Nombre */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
              />
            </Grid>

            {/* Descripción */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Descripción"
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
                multiline
                rows={3}
              />
            </Grid>

            {/* Categoría */}
            <Grid item xs={12} sm={6}>
              <TextField
                select
                fullWidth
                label="Categoría"
                name="categoria"
                value={formData.categoria}
                onChange={handleChange}
                required
              >
                {categorias.map((cat) => (
                  <MenuItem key={cat} value={cat}>
                    {cat}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            {/* Profesor */}
            <Grid item xs={12} sm={6}>
              <TextField
                select
                fullWidth
                label="Profesor"
                name="profesor"
                value={formData.profesor}
                onChange={handleChange}
                required
              >
                {profesores.map((prof) => (
                  <MenuItem key={prof.id} value={prof.id}>
                    {prof.nombre} {prof.apellido}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            {/* Objetivos */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Objetivos"
                name="objetivos"
                value={formData.objetivos}
                onChange={handleChange}
                multiline
                rows={2}
              />
            </Grid>

            {/* Cupo máximo */}
            <Grid item xs={12} sm={6}>
              <TextField
                type="number"
                fullWidth
                label="Cupo Máximo"
                name="cupoMaximo"
                value={formData.cupoMaximo}
                onChange={handleChange}
              />
            </Grid>

            {/* Estado */}
            <Grid item xs={12} sm={6}>
              <TextField
                select
                fullWidth
                label="Estado"
                name="estado"
                value={formData.estado}
                onChange={handleChange}
              >
                <MenuItem value="activo">Activo</MenuItem>
                <MenuItem value="inactivo">Inactivo</MenuItem>
              </TextField>
            </Grid>

            {/* Horarios */}
            <Grid item xs={12}>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                <Typography variant="subtitle1">Horarios</Typography>
                <Button
                  variant="outlined"
                  startIcon={<Add />}
                  onClick={addHorario}
                >
                  Agregar Horario
                </Button>
              </Box>

              {formData.horarios.map((horario, index) => (
                <Grid container spacing={2} key={index} alignItems="center" mb={1}>
                  <Grid item xs={12} sm={3}>
                    <TextField
                      fullWidth
                      select
                      label="Día"
                      value={horario.dia}
                      onChange={(e) => handleHorarioChange(index, 'dia', e.target.value)}
                      required
                    >
                      {dias.map((dia) => (
                        <MenuItem key={dia} value={dia}>
                          {dia}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>

                  <Grid item xs={12} sm={3}>
                    <TextField
                      fullWidth
                      type="time"
                      label="Hora Inicio"
                      value={horario.horaInicio}
                      onChange={(e) => handleHorarioChange(index, 'horaInicio', e.target.value)}
                      InputLabelProps={{ shrink: true }}
                      required
                    />
                  </Grid>

                  <Grid item xs={12} sm={3}>
                    <TextField
                      fullWidth
                      type="time"
                      label="Hora Fin"
                      value={horario.horaFin}
                      onChange={(e) => handleHorarioChange(index, 'horaFin', e.target.value)}
                      InputLabelProps={{ shrink: true }}
                      required
                    />
                  </Grid>

                  <Grid item xs={12} sm={3}>
                    <IconButton
                      color="error"
                      onClick={() => removeHorario(index)}
                      disabled={formData.horarios.length === 1}
                    >
                      <Delete />
                    </IconButton>
                  </Grid>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} color="secondary">Cancelar</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          {course ? 'Actualizar' : 'Crear'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CourseForm;
