import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';


// Auth Pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

// Student Pages
import StudentDashboard from './pages/student/StudentDashboard';
import MyCourses from './pages/student/MyCourses';
import MyTasks from './pages/student/MyTasks';
import MyGrades from './pages/student/MyGrades';

// Teacher Pages
import TeacherDashboard from './pages/teacher/TeacherDashboard';
import TaskManagement from './pages/teacher/TaskManagement';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import CourseManagement from './pages/admin/CourseManagement';
import UserManagement from './pages/admin/UserManagement';

const AppRouter = () => {
  const { user } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Redirect based on role */}
        <Route
          path="/"
          element={
            user ? (
              user.role === 'administrador' ? (
                <Navigate to="/admin/dashboard" replace />
              ) : user.role === 'profesor' ? (
                <Navigate to="/teacher/dashboard" replace />
              ) : (
                <Navigate to="/student/dashboard" replace />
              )
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Student Routes */}
        <Route
          path="/student/dashboard"
          element={
            <ProtectedRoute allowedRoles={['estudiante']}>
              <StudentDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/my-courses"
          element={
            <ProtectedRoute allowedRoles={['estudiante']}>
              <MyCourses />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/tasks"
          element={
            <ProtectedRoute allowedRoles={['estudiante']}>
              <MyTasks />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/grades"
          element={
            <ProtectedRoute allowedRoles={['estudiante']}>
              <MyGrades />
            </ProtectedRoute>
          }
        />

        {/* Teacher Routes */}
        <Route
          path="/teacher/dashboard"
          element={
            <ProtectedRoute allowedRoles={['profesor']}>
              <TeacherDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/teacher/tasks"
          element={
            <ProtectedRoute allowedRoles={['profesor']}>
              <TaskManagement />
            </ProtectedRoute>
          }
        />

        {/* Admin Routes */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute allowedRoles={['administrador']}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/courses"
          element={
            <ProtectedRoute allowedRoles={['administrador']}>
              <CourseManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute allowedRoles={['administrador']}>
              <UserManagement />
            </ProtectedRoute>
          }
        />

        {/* 404 */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;

