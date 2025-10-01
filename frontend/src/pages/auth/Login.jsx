import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Alert
} from '@mui/material';
import { useAuth } from '../../context/AuthContext'
import { useNotification } from '../../context/NotificationContext';

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const { showNotification } = useNotification();

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await login(credentials);
      showNotification('Inicio de sesión exitoso', 'success');

      const user = response.data.user;
      switch (user.role) {
        case 'administrador':
          navigate('/admin/dashboard');
          break;
        case 'profesor':
          navigate('/teacher/dashboard');
          break;
        case 'estudiante':
          navigate('/student/dashboard');
          break;
        default:
          navigate('/');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 8 }}>
        <Typography variant="h4" align="center" gutterBottom>
          SPA - Gestión de Cursos
        </Typography>
        <Typography variant="h6" align="center" gutterBottom>
          Iniciar Sesión
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            label="Correo electrónico"
            name="email"
            type="email"
            value={credentials.email}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
          />
          <TextField
            label="Contraseña"
            name="password"
            type="password"
            value={credentials.password}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={loading}
            sx={{ mt: 2 }}
          >
            {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </Button>
        </Box>

        <Typography variant="body2" align="center" sx={{ mt: 2 }}>
          ¿No tienes cuenta?{' '}
          <Link to="/register" style={{ textDecoration: 'none' }}>
            Regístrate aquí
          </Link>
        </Typography>
      </Paper>
    </Container>
  );
};

export default Login;
