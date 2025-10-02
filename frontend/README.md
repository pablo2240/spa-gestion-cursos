# 🎨 Frontend - Sistema de Gestión de Cursos SENA

Aplicación SPA (Single Page Application) desarrollada con React 18, Material-UI v5 y Vite para la gestión académica del SENA.

![React](https://img.shields.io/badge/react-18.2.0-blue.svg)
![Vite](https://img.shields.io/badge/vite-5.0.8-purple.svg)
![Material-UI](https://img.shields.io/badge/MUI-5.15.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-orange.svg)

## 📋 Tabla de Contenidos

- [Descripción](#-descripción)
- [Características](#-características)
- [Tecnologías](#-tecnologías)
- [Requisitos Previos](#-requisitos-previos)
- [Instalación](#-instalación)
- [Configuración](#-configuración)
- [Scripts Disponibles](#-scripts-disponibles)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Componentes Principales](#-componentes-principales)
- [Rutas de la Aplicación](#-rutas-de-la-aplicación)
- [Gestión de Estado](#-gestión-de-estado)
- [Estilos y Tema](#-estilos-y-tema)
- [Guía de Desarrollo](#-guía-de-desarrollo)
- [Build y Despliegue](#-build-y-despliegue)

## 📖 Descripción

Frontend moderno y responsivo construido con React 18 que proporciona una interfaz intuitiva para la gestión de cursos, tareas, calificaciones y usuarios del sistema SENA. Utiliza Material-UI para un diseño profesional y consistente.

## ✨ Características

### 🎯 Funcionalidades por Rol

#### Estudiante
- ✅ Dashboard con estadísticas personales
- 📚 Explorar cursos disponibles con filtros
- 📝 Inscripción a cursos
- 📋 Gestión de tareas (entrega de archivos)
- 📊 Visualización de calificaciones
- 👤 Perfil editable

#### Profesor
- 👨‍🏫 Dashboard con cursos asignados
- 📝 Creación de tareas para sus cursos
- ✍️ Revisión y calificación de entregas
- 📊 Registro de notas
- 📈 Estadísticas de progreso

#### Administrador
- 🎓 CRUD completo de cursos
- 👥 Gestión de usuarios (crear, editar, desactivar)
- 🔄 Asignación de profesores a cursos
- 📊 Vista global del sistema
- 📈 Reportes institucionales

### 🎨 Características de UI/UX
- Diseño responsivo (Mobile First)
- Tema personalizable con Material-UI
- Notificaciones toast en tiempo real
- Loading states y feedback visual
- Navegación intuitiva
- Formularios con validación
- Tablas con filtrado y paginación

## 🛠 Tecnologías

### Core
- **React 18.2.0** - Librería de interfaz de usuario
- **Vite 5.0.8** - Build tool y dev server
- **React Router DOM 6.20.1** - Navegación SPA

### UI Framework
- **Material-UI 5.15.0** - Sistema de diseño
- **@mui/icons-material** - Iconos
- **@emotion/react** - CSS-in-JS
- **@emotion/styled** - Styled components

### Utilidades
- **Axios 1.6.2** - Cliente HTTP
- **date-fns 3.0.6** - Manipulación de fechas
- **Context API** - Gestión de estado global

## 📦 Requisitos Previos

- **Node.js** >= 18.0.0
- **npm** >= 9.0.0
- **Backend** corriendo en `http://localhost:5000`

## 🚀 Instalación

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/spa-gestion-cursos-sena.git

# Navegar al directorio frontend
cd spa-gestion-cursos-sena/frontend

# Instalar dependencias
npm install
```

## ⚙️ Configuración

### 1. Variables de Entorno

Crea un archivo `.env` en la raíz del frontend:

```env
VITE_API_URL=http://localhost:5000/api
```

### 2. Configuración de Vite

El archivo `vite.config.js` ya está configurado:

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5175,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true
      }
    }
  }
})
```

## 📜 Scripts Disponibles

### Desarrollo

```bash
npm run dev
```
Inicia el servidor de desarrollo en `http://localhost:5175`
- Hot Module Replacement (HMR)
- Fast Refresh
- Error overlay

### Build de Producción

```bash
npm run build
```
Genera una build optimizada en la carpeta `dist/`
- Minificación de código
- Tree shaking
- Code splitting
- Optimización de assets

### Preview de Producción

```bash
npm run preview
```
Previsualiza la build de producción localmente

### Linting

```bash
npm run lint
```
Ejecuta ESLint para detectar problemas en el código

## 📁 Estructura del Proyecto

```
frontend/
├── public/
│   ├── vite.svg
│   └── favicon.ico
│
├── src/
│   ├── components/                    # Componentes reutilizables
│   │   ├── common/                    # Componentes comunes
│   │   │   ├── Navbar.jsx            # Barra de navegación
│   │   │   ├── Footer.jsx            # Pie de página
│   │   │   ├── Loading.jsx           # Indicador de carga
│   │   │   └── ProtectedRoute.jsx    # Rutas protegidas
│   │   │
│   │   ├── courses/                   # Componentes de cursos
│   │   │   ├── CourseCard.jsx        # Tarjeta de curso
│   │   │   ├── CourseDetail.jsx      # Detalle de curso
│   │   │   ├── CourseForm.jsx        # Formulario de curso
│   │   │   └── CourseTable.jsx       # Tabla de cursos
│   │   │
│   │   ├── tasks/                     # Componentes de tareas
│   │   │   ├── TaskCard.jsx          # Tarjeta de tarea
│   │   │   ├── TaskForm.jsx          # Formulario de tarea
│   │   │   ├── TaskSubmission.jsx    # Entrega de tarea
│   │   │   └── TaskReview.jsx        # Revisión de tarea
│   │   │
│   │   └── users/                     # Componentes de usuarios
│   │       ├── UserTable.jsx         # Tabla de usuarios
│   │       ├── UserForm.jsx          # Formulario de usuario
│   │       └── ProfileCard.jsx       # Tarjeta de perfil
│   │
│   ├── context/                       # Context API
│   │   ├── AuthContext.jsx           # Contexto de autenticación
│   │   └── NotificationContext.jsx   # Contexto de notificaciones
│   │
│   ├── pages/                         # Páginas de la aplicación
│   │   ├── auth/                      # Páginas de autenticación
│   │   │   ├── Login.jsx             # Inicio de sesión
│   │   │   └── Register.jsx          # Registro
│   │   │
│   │   ├── student/                   # Páginas de estudiante
│   │   │   ├── StudentDashboard.jsx  # Dashboard
│   │   │   ├── ExploreCourses.jsx    # Explorar cursos
│   │   │   ├── MyCourses.jsx         # Mis cursos
│   │   │   ├── MyTasks.jsx           # Mis tareas
│   │   │   └── MyGrades.jsx          # Mis calificaciones
│   │   │
│   │   ├── teacher/                   # Páginas de profesor
│   │   │   ├── TeacherDashboard.jsx  # Dashboard
│   │   │   ├── ManagedCourses.jsx    # Cursos asignados
│   │   │   ├── TaskManagement.jsx    # Gestión de tareas
│   │   │   └── GradeManagement.jsx   # Gestión de notas
│   │   │
│   │   └── admin/                     # Páginas de administrador
│   │       ├── AdminDashboard.jsx    # Dashboard
│   │       ├── CourseManagement.jsx  # Gestión de cursos
│   │       ├── UserManagement.jsx    # Gestión de usuarios
│   │       └── Reports.jsx           # Reportes
│   │
│   ├── services/                      # Servicios API
│   │   ├── api.js                    # Configuración Axios
│   │   ├── authService.js            # Autenticación
│   │   ├── courseService.js          # Cursos
│   │   ├── taskService.js            # Tareas
│   │   ├── gradeService.js           # Calificaciones
│   │   └── userService.js            # Usuarios
│   │
│   ├── utils/                         # Utilidades
│   │   ├── constants.js              # Constantes
│   │   ├── validators.js             # Validaciones
│   │   └── formatters.js             # Formateadores
│   │
│   ├── App.jsx                        # Componente raíz
│   ├── main.jsx                       # Punto de entrada
│   ├── router.jsx                     # Configuración de rutas
│   └── index.css                      # Estilos globales
│
├── .env                               # Variables de entorno
├── .gitignore
├── index.html                         # HTML principal
├── package.json
├── vite.config.js                     # Configuración Vite
└── README.md                          # Este archivo
```

## 🧩 Componentes Principales

### AuthContext
Gestiona el estado global de autenticación:
```javascript
const { user, login, logout, loading, isAuthenticated } = useAuth();
```

### NotificationContext
Sistema de notificaciones toast:
```javascript
const { showNotification } = useNotification();
showNotification('Mensaje de éxito', 'success');
```

### ProtectedRoute
Protege rutas según el rol del usuario:
```jsx
<ProtectedRoute allowedRoles={['estudiante']}>
  <StudentDashboard />
</ProtectedRoute>
```

## 🛣 Rutas de la Aplicación

### Públicas
```
/login          # Inicio de sesión
/register       # Registro de estudiante
```

### Estudiante
```
/student/dashboard        # Dashboard principal
/student/courses          # Explorar cursos
/student/my-courses       # Mis cursos inscritos
/student/tasks            # Mis tareas
/student/grades           # Mis calificaciones
```

### Profesor
```
/teacher/dashboard        # Dashboard principal
/teacher/courses          # Cursos asignados
/teacher/tasks            # Gestión de tareas
/teacher/grades           # Gestión de calificaciones
```

### Administrador
```
/admin/dashboard          # Dashboard principal
/admin/courses            # Gestión de cursos
/admin/users              # Gestión de usuarios
/admin/reports            # Reportes del sistema
```

## 🎨 Estilos y Tema

### Tema de Material-UI

```javascript
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
});
```

### Colores de Estado
- **Primary:** `#1976d2` - Azul (acciones principales)
- **Secondary:** `#dc004e`