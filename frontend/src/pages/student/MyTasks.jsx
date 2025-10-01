import { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Grid,
  Box
} from '@mui/material';
import { taskService } from '../../services/taskService';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';
import Navbar from '../../components/common/Navbar';
import TaskCard from '../../components/tasks/TaskCard';
import TaskSubmission from '../../components/tasks/TaskSubmission';
import Loading from '../../components/common/Loading';

const MyTasks = () => {
  const { user } = useAuth();
  const { showNotification } = useNotification();
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [submissionOpen, setSubmissionOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const response = await taskService.getTasks();
      setTasks(response.data);
    } catch (error) {
      showNotification('Error al cargar tareas', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (task) => {
    setSelectedTask(task);
    setSubmissionOpen(true);
  };

  const handleSubmitTask = async (formData) => {
    try {
      await taskService.submitTask(selectedTask._id, formData);
      showNotification('Tarea entregada exitosamente', 'success');
      setSubmissionOpen(false);
      loadTasks();
    } catch (error) {
      showNotification(error.response?.data?.message || 'Error al entregar tarea', 'error');
    }
  };

  const activeTasks = tasks.filter(
    (t) => t.estado === 'activa' && new Date(t.fechaEntrega) > new Date()
  );
  const expiredTasks = tasks.filter((t) => new Date(t.fechaEntrega) <= new Date());

  if (loading) return <Loading />;

  return (
    <>
      <Navbar />
      <Container sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Mis Tareas
        </Typography>

        {/* Tareas Activas */}
        <Box sx={{ mt: 3 }}>
          <Typography variant="h6" gutterBottom>
            Tareas Activas
          </Typography>
          {activeTasks.length === 0 ? (
            <Typography variant="body1">No tienes tareas activas</Typography>
          ) : (
            <Grid container spacing={2}>
              {activeTasks.map((task) => (
                <Grid item xs={12} sm={6} md={4} key={task._id}>
                  <TaskCard
                    task={task}
                    onSubmit={handleSubmit}
                    onView={() => {}}
                  />
                </Grid>
              ))}
            </Grid>
          )}
        </Box>

        {/* Tareas Vencidas */}
        <Box sx={{ mt: 5 }}>
          <Typography variant="h6" gutterBottom>
            Tareas Vencidas
          </Typography>
          {expiredTasks.length === 0 ? (
            <Typography variant="body1">No tienes tareas vencidas</Typography>
          ) : (
            <Grid container spacing={2}>
              {expiredTasks.map((task) => (
                <Grid item xs={12} sm={6} md={4} key={task._id}>
                  <TaskCard task={task} onView={() => {}} />
                </Grid>
              ))}
            </Grid>
          )}
        </Box>

        {/* Modal de Entrega */}
        <TaskSubmission
          open={submissionOpen}
          onClose={() => setSubmissionOpen(false)}
          onSubmit={handleSubmitTask}
          task={selectedTask}
        />
      </Container>
    </>
  );
};

export default MyTasks;
