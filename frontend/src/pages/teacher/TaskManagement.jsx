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
  Chip
} from '@mui/material';
import { Add, Visibility } from '@mui/icons-material';
import { taskService } from '../../services/taskService';
import { courseService } from '../../services/courseService';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';
import Navbar from '../../components/common/Navbar';
import TaskForm from '../../components/tasks/TaskForm';
import TaskReview from '../../components/tasks/TaskReview';
import Loading from '../../components/common/Loading';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

const TaskManagement = () => {
  const { user } = useAuth();
  const { showNotification } = useNotification();
  const [tasks, setTasks] = useState([]);
  const [courses, setCourses] = useState([]);
  const [formOpen, setFormOpen] = useState(false);
  const [reviewOpen, setReviewOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [tasksRes, coursesRes] = await Promise.all([
        taskService.getTasks(),
        courseService.getCourses()
      ]);

      setTasks(tasksRes.data);
      const myCourses = coursesRes.data.filter(
        course => course.profesor?._id === user.id
      );
      setCourses(myCourses);
    } catch (error) {
      showNotification('Error al cargar datos', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async (taskData) => {
    try {
      await taskService.createTask(taskData);
      showNotification('Tarea creada exitosamente', 'success');
      setFormOpen(false);
      loadData();
    } catch (error) {
      showNotification(error.response?.data?.message || 'Error al crear tarea', 'error');
    }
  };

  const handleViewSubmissions = async (task) => {
    try {
      const response = await taskService.getTaskSubmissions(task._id);
      setSubmissions(response.data);
      setSelectedTask(task);
    } catch (error) {
      showNotification('Error al cargar entregas', 'error');
    }
  };

  const handleGradeSubmission = async (gradeData) => {
    try {
      await taskService.gradeSubmission(selectedSubmission._id, gradeData);
      showNotification('Tarea calificada exitosamente', 'success');
      setReviewOpen(false);
      handleViewSubmissions(selectedTask);
    } catch (error) {
      showNotification('Error al calificar tarea', 'error');
    }
  };

  const openReview = (submission) => {
    setSelectedSubmission(submission);
    setReviewOpen(true);
  };

  if (loading) return <Loading />;

  return (
    <>
      <Navbar />
      <Container sx={{ mt: 4 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h5">Gestión de Tareas</Typography>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => setFormOpen(true)}
            disabled={courses.length === 0}
          >
            Nueva Tarea
          </Button>
        </Box>

        {courses.length === 0 && (
          <Typography color="error" mb={2}>
            No tienes cursos asignados. Contacta al administrador.
          </Typography>
        )}

        {/* Tabla de Tareas */}
        <TableContainer component={Paper} sx={{ mb: 4 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Título</TableCell>
                <TableCell>Curso</TableCell>
                <TableCell>Fecha Entrega</TableCell>
                <TableCell>Estado</TableCell>
                <TableCell>Entregas</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tasks.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    No has creado tareas aún
                  </TableCell>
                </TableRow>
              ) : (
                tasks.map((task) => (
                  <TableRow key={task._id}>
                    <TableCell>{task.titulo}</TableCell>
                    <TableCell>{task.curso?.nombre}</TableCell>
                    <TableCell>
                      {format(new Date(task.fechaEntrega), 'dd/MM/yyyy HH:mm', { locale: es })}
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={task.estado}
                        color={task.estado === 'activa' ? 'success' : 'default'}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      {submissions.filter((s) => s.tarea === task._id).length}
                    </TableCell>
                    <TableCell>
                      <IconButton
                        color="primary"
                        onClick={() => handleViewSubmissions(task)}
                      >
                        <Visibility />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Entregas de la tarea seleccionada */}
        {selectedTask && submissions.length > 0 && (
          <Box>
            <Typography variant="h6" gutterBottom>
              Entregas de: {selectedTask.titulo}
            </Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Estudiante</TableCell>
                    <TableCell>Fecha Entrega</TableCell>
                    <TableCell>Estado</TableCell>
                    <TableCell>Calificación</TableCell>
                    <TableCell>Acciones</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {submissions.map((submission) => (
                    <TableRow key={submission._id}>
                      <TableCell>
                        {submission.estudiante?.nombre} {submission.estudiante?.apellido}
                      </TableCell>
                      <TableCell>
                        {format(new Date(submission.fechaEntrega), 'dd/MM/yyyy HH:mm', { locale: es })}
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={submission.estado}
                          color={submission.estado === 'entregado' ? 'info' : 'default'}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        {submission.calificacion ? submission.calificacion : 'Sin calificar'}
                      </TableCell>
                      <TableCell>
                        <Button
                          size="small"
                          variant="outlined"
                          onClick={() => openReview(submission)}
                        >
                          Calificar
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )}

        {/* Formularios y modales */}
        <TaskForm
          open={formOpen}
          onClose={() => setFormOpen(false)}
          onSubmit={handleCreateTask}
          cursoId={courses[0]?._id}
        />

        <TaskReview
          open={reviewOpen}
          onClose={() => setReviewOpen(false)}
          onGrade={handleGradeSubmission}
          submission={selectedSubmission}
        />
      </Container>
    </>
  );
};

export default TaskManagement;
