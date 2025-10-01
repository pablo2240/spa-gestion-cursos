import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  Grid
} from '@mui/material';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';

const Register = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    cedula: '',
    email: '',
    password: '',
    confirmPassword: '',
    telefono: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();
  const { showNotification } = useNotification();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    if (formData.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    setLoading(true);

    try {
      const { confirmPassword, ...dataToSend } = formData;
      await register(dataToSend);
      showNotification('Registro exitoso', 'success');
      navigate('/student/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Error al registrarse');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 6 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Registro de Estudiante
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Apellido"
                name="apellido"
                value={formData.apellido}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Cédula"
                name="cedula"
                value={formData.cedula}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Correo electrónico"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Contraseña"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Confirmar Contraseña"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Teléfono"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
          </Grid>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={loading}
            sx={{ mt: 3 }}
          >
            {loading ? 'Registrando...' : 'Registrarse'}
          </Button>
        </Box>

        <Typography variant="body2" align="center" sx={{ mt: 2 }}>
          ¿Ya tienes cuenta?{' '}
          <Link to="/login" style={{ textDecoration: 'none' }}>
            Inicia sesión aquí
          </Link>
        </Typography>
      </Paper>
    </Container>
  );
};

export default Register;
