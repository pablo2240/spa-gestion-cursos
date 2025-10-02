# 🎓 SPA Gestión de Cursos - SENA

Sistema web completo para la gestión académica de cursos, estudiantes, profesores, tareas y notas en instituciones educativas del SENA.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)
![MongoDB](https://img.shields.io/badge/mongodb-%3E%3D6.0.0-green.svg)
![React](https://img.shields.io/badge/react-18.2.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-orange.svg)

## 📋 Tabla de Contenidos

- [Descripción](#-descripción)
- [Características](#-características)
- [Tecnologías](#-tecnologías)
- [Requisitos Previos](#-requisitos-previos)
- [Instalación](#-instalación)
- [Configuración](#-configuración)
- [Uso](#-uso)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [API Endpoints](#-api-endpoints)
- [Roles y Permisos](#-roles-y-permisos)
- [Scripts Disponibles](#-scripts-disponibles)
- [Credenciales de Prueba](#-credenciales-de-prueba)
- [Capturas de Pantalla](#-capturas-de-pantalla)
- [Contribución](#-contribución)
- [Licencia](#-licencia)

## 📖 Descripción

Plataforma web tipo SPA (Single Page Application) que permite administrar de manera integral los cursos educativos, gestión de estudiantes, asignación de profesores, sistema de tareas y evaluación de notas. El sistema está diseñado específicamente para instituciones del SENA que requieren un control detallado sobre la oferta académica, seguimiento del rendimiento estudiantil y gestión completa de tareas académicas.

## ✨ Características

### 🎯 Funcionalidades Principales

#### Para Estudiantes
- ✅ Registro e inicio de sesión
- 📚 Explorar cursos disponibles
- 📝 Inscripción en cursos
- 📋 Entrega de tareas con archivos adjuntos
- 📊 Consulta de calificaciones
- 👤 Gestión de perfil personal

#### Para Profesores
- 👨‍🏫 Gestión de cursos asignados
- 📝 Creación y asignación de tareas
- ✍️ Calificación de entregas
- 📊 Registro de notas
- 👥 Visualización de estudiantes inscritos
- 📈 Reportes de progreso

#### Para Administradores
- 🎓 Creación y gestión de cursos
- 👥 Administración de usuarios
- 🔄 Asignación de profesores a cursos
- 📊 Vista global del sistema
- 🔍 Búsqueda y filtrado avanzado
- 📈 Generación de reportes institucionales

#### 📋 Credenciales de prueba:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

*Administrador:*
  **Email:** 
  - admin@sena.edu.co
  **Password:**
  - admin123

*Profesor:*
  **Email:** 
  - carlos.rodriguez@sena.edu.co
  **Password:**
  - profesor123

*Estudiante:*
  **Email:** 
  - maria.garcia@sena.edu.co
  **Password:**
  - estudiante123


### 🔐 Sistema de Seguridad
- Autenticación JWT
- Encriptación de contraseñas con bcrypt
- Protección de rutas por rol
- Rate limiting
- Validación de datos

### 📱 Características Técnicas
- Diseño responsivo (Mobile First)
- Single Page Application (SPA)
- API RESTful
- Almacenamiento de archivos
- Sistema de notificaciones en tiempo real

## 🛠 Tecnologías

### Backend
- **Node.js** - Entorno de ejecución JavaScript
- **Express.js** - Framework web
- **MongoDB** - Base de datos NoSQL
- **Mongoose** - ODM para MongoDB
- **JWT** - Autenticación
- **Bcrypt** - Encriptación
- **Multer** - Manejo de archivos
- **Helmet** - Seguridad HTTP

### Frontend
- **React 18** - Librería de UI
- **Vite** - Build tool
- **Material-UI v5** - Sistema de diseño
- **React Router DOM** - Navegación
- **Axios** - Cliente HTTP
- **Context API** - Gestión de estado
- **date-fns** - Manejo de fechas

## 📦 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** >= 18.0.0 ([Descargar](https://nodejs.org/))
- **MongoDB** >= 6.0.0 ([Descargar](https://www.mongodb.com/try/download/community))
- **npm** >= 9.0.0 (incluido con Node.js)
- **Git** ([Descargar](https://git-scm.com/))

## 🚀 Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/spa-gestion-cursos-sena.git
cd spa-gestion-cursos-sena
```

### 2. Instalar dependencias del Backend

```bash
cd backend
npm install
```

### 3. Instalar dependencias del Frontend

```bash
cd ../frontend
npm install
```

## ⚙️ Configuración

### Backend

1. Crea el archivo `.env` en la carpeta `backend`:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/sena_cursos
# Para MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/sena_cursos

# JWT Configuration
JWT_SECRET=tu_super_secreto_seguro_cambiar_en_produccion_12345
JWT_EXPIRE=7d

# Frontend URL
FRONTEND_URL=http://localhost:5175

# File Upload
MAX_FILE_SIZE=5242880
UPLOAD_PATH=./uploads
```

2. Inicia MongoDB (si está instalado localmente):

```bash
# Windows
net start MongoDB

# macOS/Linux
sudo systemctl start mongod
```

3. Ejecuta el script de seed para crear datos de prueba:

```bash
cd backend
node src/utils/seedData.js
```

### Frontend

1. Crea el archivo `.env` en la carpeta `frontend`:

```env
VITE_API_URL=http://localhost:5000/api
```

## 🎮 Uso

### Iniciar el Backend

```bash
cd backend
npm run dev
```

El servidor estará disponible en: `http://localhost:5000`

### Iniciar el Frontend

```bash
cd frontend
npm run dev
```

La aplicación estará disponible en: `http://localhost:5175`

### Acceso a la Aplicación

Abre tu navegador y visita: **http://localhost:5175**

## 📁 Estructura del Proyecto

```
spa-gestion-cursos/
│
├── backend/                          # API Node.js/Express
│   ├── src/
│   │   ├── config/                   # Configuraciones
│   │   │   ├── database.js
│   │   │   ├── jwt.js
│   │   │   └── multer.js
│   │   ├── controllers/              # Controladores
│   │   │   ├── authController.js
│   │   │   ├── courseController.js
│   │   │   ├── taskController.js
│   │   │   ├── gradeController.js
│   │   │   └── userController.js
│   │   ├── models/                   # Modelos MongoDB
│   │   │   ├── User.js
│   │   │   ├── Course.js
│   │   │   ├── Task.js
│   │   │   ├── TaskSubmission.js
│   │   │   └── Grade.js
│   │   ├── routes/                   # Rutas API
│   │   │   ├── authRoutes.js
│   │   │   ├── courseRoutes.js
│   │   │   ├── taskRoutes.js
│   │   │   ├── gradeRoutes.js
│   │   │   └── userRoutes.js
│   │   ├── middlewares/              # Middlewares
│   │   │   ├── authMiddleware.js
│   │   │   ├── roleMiddleware.js
│   │   │   └── errorHandler.js
│   │   ├── utils/                    # Utilidades
│   │   │   └── seedData.js
│   │   ├── app.js                    # Configuración Express
│   │   └── server.js                 # Inicio del servidor
│   ├── uploads/                      # Archivos subidos
│   ├── .env
│   ├── .gitignore
│   ├── package.json
│   └── README.md
│
├── frontend/                         # Aplicación React
│   ├── public/
│   ├── src/
│   │   ├── components/               # Componentes reutilizables
│   │   │   ├── common/
│   │   │   ├── courses/
│   │   │   ├── tasks/
│   │   │   └── users/
│   │   ├── context/                  # Context API
│   │   │   ├── AuthContext.jsx
│   │   │   └── NotificationContext.jsx
│   │   ├── pages/                    # Páginas
│   │   │   ├── auth/
│   │   │   ├── student/
│   │   │   ├── teacher/
│   │   │   └── admin/
│   │   ├── services/                 # Servicios API
│   │   │   ├── api.js
│   │   │   ├── authService.js
│   │   │   ├── courseService.js
│   │   │   ├── taskService.js
│   │   │   ├── gradeService.js
│   │   │   └── userService.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   ├── router.jsx
│   │   └── index.css
│   ├── .env
│   ├── .gitignore
│   ├── package.json
│   ├── vite.config.js
│   └── README.md
│
├── docs/                             # Documentación
├── .gitignore
└── README.md                         # Este archivo
```

## 🌐 API Endpoints

### Autenticación
```http
POST   /api/auth/register      # Registro de usuario
POST   /api/auth/login         # Inicio de sesión
GET    /api/auth/profile       # Obtener perfil
```

### Cursos
```http
GET    /api/courses            # Listar cursos
GET    /api/courses/:id        # Obtener curso específico
POST   /api/courses            # Crear curso (admin)
PUT    /api/courses/:id        # Actualizar curso (admin/profesor)
DELETE /api/courses/:id        # Eliminar curso (admin)
POST   /api/courses/:id/enroll # Inscribir estudiante
```

### Tareas
```http
GET    /api/tasks              # Listar tareas
POST   /api/tasks              # Crear tarea (profesor)
POST   /api/tasks/:id/submit   # Entregar tarea (estudiante)
GET    /api/tasks/:id/submissions # Ver entregas (profesor)
PUT    /api/tasks/submissions/:id/grade # Calificar (profesor)
```

### Notas
```http
GET    /api/grades             # Listar notas
POST   /api/grades             # Registrar nota (profesor)
GET    /api/grades/student/:id # Notas de estudiante
```

### Usuarios
```http
GET    /api/users              # Listar usuarios (admin)
GET    /api/users/:id          # Obtener usuario
POST   /api/users              # Crear usuario (admin)
PUT    /api/users/:id          # Actualizar usuario (admin)
DELETE /api/users/:id          # Desactivar usuario (admin)
PUT    /api/users/profile/me   # Actualizar perfil propio
```

## 👥 Roles y Permisos

### 👨‍🎓 Estudiante
- Ver cursos disponibles
- Inscribirse en cursos
- Ver cursos inscritos
- Entregar tareas
- Consultar calificaciones
- Actualizar perfil

### 👨‍🏫 Profesor
- Ver cursos asignados
- Crear tareas
- Revisar entregas
- Calificar tareas
- Registrar notas
- Ver estudiantes

### 👨‍💼 Administrador
- **Todo lo anterior, más:**
- Crear/editar/eliminar cursos
- Asignar profesores
- Gestionar usuarios (crear, editar, desactivar)
- Ver reportes globales
- Supervisión completa del sistema

## 📜 Scripts Disponibles

### Backend

```bash
npm run dev      # Inicia el servidor en modo desarrollo
npm start        # Inicia el servidor en modo producción
```

### Frontend

```bash
npm run dev      # Inicia la app en modo desarrollo
npm run build    # Construye la app para producción
npm run preview  # Vista previa de la build de producción
```

## 🔑 Credenciales de Prueba

Después de ejecutar el seed (`node src/utils/seedData.js`):

### 👨‍💼 Administrador
```
Email: admin@sena.edu.co
Password: admin123
```

### 👨‍🏫 Profesores
```
Email: carlos.rodriguez@sena.edu.co
Password: profesor123

Email: ana.martinez@sena.edu.co
Password: profesor123
```

### 👨‍🎓 Estudiantes
```
Email: maria.garcia@sena.edu.co
Password: estudiante123

Email: juan.perez@sena.edu.co
Password: estudiante123
```

## 📸 Capturas de Pantalla

### Dashboard de Estudiante
Vista principal del estudiante con estadísticas de cursos, tareas y calificaciones.

### Dashboard de Profesor
Panel de control para gestionar cursos, tareas y calificaciones.

### Dashboard de Administrador
Gestión completa del sistema con estadísticas generales.

### Gestión de Cursos
Interfaz para crear y administrar cursos con horarios múltiples.

## 🔒 Seguridad

El proyecto implementa varias medidas de seguridad:

- ✅ Autenticación JWT con tokens de corta duración
- ✅ Contraseñas hasheadas con bcrypt (10 rounds)
- ✅ Rate limiting (100 requests/15 min por IP)
- ✅ Helmet para headers de seguridad
- ✅ CORS configurado
- ✅ Validación de datos en backend
- ✅ Protección de rutas por rol
- ✅ Variables de entorno para datos sensibles
- ✅ Sanitización de inputs

## 🐛 Solución de Problemas

### Error: Cannot connect to MongoDB
```bash
# Verifica que MongoDB esté corriendo
mongod --version

# Windows
net start MongoDB

# macOS/Linux
sudo systemctl start mongod
```

### Error: Port 5000 already in use
```bash
# Cambia el puerto en backend/.env
PORT=5001
```

### Error: 429 Too Many Requests
```bash
# Reinicia el servidor backend o espera 15 minutos
# O ajusta el rate limiter en backend/src/app.js
```

## 🤝 Contribución

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Próximas Características

- [ ] Sistema de chat en tiempo real
- [ ] Notificaciones push
- [ ] Generación de certificados
- [ ] Sistema de videollamadas
- [ ] Dashboard con gráficas avanzadas
- [ ] Exportación de reportes a PDF/Excel
- [ ] Aplicación móvil (React Native)
- [ ] Sistema de foros por curso

## 👨‍💻 Autores

- **Tu Nombre** - *Desarrollo Full Stack* - [Tu GitHub](https://github.com/tu-usuario)

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## 🙏 Agradecimientos

- SENA por la oportunidad de desarrollar este sistema
- Comunidad de React y Node.js
- Material-UI por los componentes
- Todos los contribuidores del proyecto

---

⭐ Si este proyecto te fue útil, no olvides darle una estrella en GitHub
