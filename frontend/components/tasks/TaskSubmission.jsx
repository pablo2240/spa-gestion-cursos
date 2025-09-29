import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Typography,
  Alert
} from '@mui/material';
import { CloudUpload } from '@mui/icons-material';

const TaskSubmission = ({ open, onClose, onSubmit, task }) => {
  const [file, setFile] = useState(null);
  const [comentario, setComentario] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file) {
      alert('Por favor selecciona un archivo');
      return;
    }

    const formData = new FormData();
    formData.append('archivo', file);
    formData.append('comentario', comentario);

    onSubmit(formData);
    setFile(null);
    setComentario('');
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Entregar Tarea: {task?.titulo}</DialogTitle>
      <DialogContent dividers>
        <Box mb={2}>
          <Alert severity="info">
            Tipos de archivo permitidos: <b>PDF, DOC, DOCX, TXT, ZIP, RAR, JPG, JPEG, PNG</b> <br />
            Tamaño máximo: <b>5MB</b>
          </Alert>
        </Box>

        <Box display="flex" alignItems="center" gap={2} mb={2}>
          <Button
            variant="outlined"
            component="label"
            startIcon={<CloudUpload />}
            fullWidth
          >
            Seleccionar Archivo
            <input type="file" hidden onChange={handleFileChange} />
          </Button>
        </Box>

        {file && (
          <Typography variant="body2" color="text.secondary" mb={2}>
            Archivo seleccionado: {file.name}
          </Typography>
        )}

        <TextField
          fullWidth
          multiline
          rows={4}
          label="Comentario (opcional)"
          value={comentario}
          onChange={(e) => setComentario(e.target.value)}
          placeholder="Agrega un comentario sobre tu entrega..."
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancelar
        </Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Entregar Tarea
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TaskSubmission;
