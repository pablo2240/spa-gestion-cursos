import { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Button,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Chip,
  TextField,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid
} from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';
import { userService } from '../../services/userService';
import { useNotification } from '../../context/NotificationContext';
import Navbar from '../../components/common/Navbar';
import Loading from '../../components/common/Loading';

const UserManagement = () => {
  const { showNotification } = useNotification();
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [formOpen, setFormOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    cedula: '',
    email: '',
    password: '',
    telefono: '',
    role: 'estudiante',
    active: true
  });

  useEffect(() => {
    loadUsers();
  }, []);

  useEffect(() => {
    filterUsers();
  }, [users, filter]);

  const loadUsers = async () => {
    try {
      const response = await userService.getUsers();
      setUsers(response.data);
    } catch (error) {
      showNotification('Error al cargar usuarios', 'error');
    } finally {
      setLoading(false);
    }
  };

  const filterUsers = () => {
    if (filter === 'all') {
      setFilteredUsers(users);
    } else {
      setFilteredUsers(users.filter(user => user.role === filter));
    }
  };

  const handleCreate = () => {
    setSelectedUser(null);
    setFormData({
      nombre: '',
      apellido: '',
      cedula: '',
      email: '',
      password: '',
      telefono: '',
      role: 'estudiante',
      active: true
    });
    setFormOpen(true);
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setFormData({
      nombre: user.nombre,
      apellido: user.apellido,
      cedula: user.cedula,
      email: user.email,
      password: '',
      telefono: user.telefono || '',
      role: user.role,
      active: user.active
    });
    setFormOpen(true);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataToSend = { ...formData };
      if (selectedUser && !dataToSend.password) {
        delete dataToSend.password;
      }

      if (selectedUser) {
        await userService.updateUser(selectedUser._id, dataToSend);
        showNotification('Usuario actualizado exitosamente', 'success');
      } else {
        await userService.createUser(dataToSend);
        showNotification('Usuario creado exitosamente', 'success');
      }
      setFormOpen(false);
      loadUsers();
    } catch (error) {
      showNotification(
        error.response?.data?.message || 'Error al guardar usuario',
        'error'
      );
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de desactivar este usuario?')) {
      try {
        await userService.deleteUser(id);
        showNotification('Usuario desactivado exitosamente', 'success');
        loadUsers();
      } catch (error) {
        showNotification('Error al desactivar usuario', 'error');
      }
    }
  };

  if (loading) return <Loading />;

  return (
    <>
      <Navbar />
      <Container sx={{ mt: 4 }}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Typography variant="h4">Gestión de Usuarios</Typography>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={handleCreate}
          >
            Nuevo Usuario
          </Button>
        </Box>

        <TextField
          select
          label="Filtrar por rol"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          sx={{ minWidth: 200, mb: 2 }}
        >
          <MenuItem value="all">Todos</MenuItem>
          <MenuItem value="estudiante">Estudiantes</MenuItem>
          <MenuItem value="profesor">Profesores</MenuItem>
          <MenuItem value="admin">Administradores</MenuItem>
        </TextField>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nombre</TableCell>
                <TableCell>Cédula</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Rol</TableCell>
                <TableCell>Estado</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredUsers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    No hay usuarios disponibles
                  </TableCell>
                </TableRow>
              ) : (
                filteredUsers.map((user) => (
                  <TableRow key={user._id}>
                    <TableCell>
                      {user.nombre} {user.apellido}
                    </TableCell>
                    <TableCell>{user.cedula}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>
                      <Chip
                        label={user.active ? 'Activo' : 'Inactivo'}
                        color={user.active ? 'success' : 'default'}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <IconButton
                        color="primary"
                        onClick={() => handleEdit(user)}
                      >
                        <Edit />
                      </IconButton>
                      <IconButton
                        color="error"
                        onClick={() => handleDelete(user._id)}
                      >
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>

      {/* Formulario en modal */}
      <Dialog
        open={formOpen}
        onClose={() => setFormOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {selectedUser ? 'Editar Usuario' : 'Crear Usuario'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Apellido"
                name="apellido"
                value={formData.apellido}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Cédula"
                name="cedula"
                value={formData.cedula}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="password"
                label="Contraseña"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Teléfono"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                select
                fullWidth
                label="Rol"
                name="role"
                value={formData.role}
                onChange={handleChange}
              >
                <MenuItem value="estudiante">Estudiante</MenuItem>
                <MenuItem value="profesor">Profesor</MenuItem>
                <MenuItem value="admin">Administrador</MenuItem>
              </TextField>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setFormOpen(false)}>Cancelar</Button>
          <Button variant="contained" onClick={handleSubmit}>
            {selectedUser ? 'Actualizar' : 'Crear'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default UserManagement;
