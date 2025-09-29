# Backend - Sistema de Gestión de Cursos SENA

API REST desarrollada con Node.js, Express y MongoDB.

## Requisitos Previos

- Node.js 18+
- MongoDB 6+ (local o Atlas)
- npm o yarn

## Instalación

```bash
npm install
```

## Configuración

Crear archivo `.env` en la raíz:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/sena_cursos
JWT_SECRET=tu_secreto_jwt_muy_seguro
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:5175
MAX_FILE_SIZE=5242880
```

## Ejecución

```bash
# Desarrollo
npm run dev

# Producción
npm start

# Seed datos
node src/utils/seedData.js
```

## Endpoints Principales

### Autenticación
- `POST /api/auth/register` - Registro
- `POST /api/auth/login` - Login
- `GET /api/auth/profile` - Perfil

### Cursos
- `GET /api/courses` - Listar
- `POST /api/courses` - Crear
- `PUT /api/courses/:id` - Actualizar
- `DELETE /api/courses/:id` - Eliminar

### Tareas
- `GET /api/tasks` - Listar
- `POST /api/tasks` - Crear
- `POST /api/tasks/:id/submit` - Entregar

### Notas
- `GET /api/grades` - Consultar
- `POST /api/grades` - Registrar

## Estructura

```
backend/
├── src/
│   ├── config/       # Configuraciones
│   ├── controllers/  # Lógica de negocio
│   ├── models/       # Modelos MongoDB
│   ├── routes/       # Rutas API
│   ├── middlewares/  # Middlewares
│   ├── utils/        # Utilidades
│   ├── app.js        # Configuración Express
│   └── server.js     # Inicio servidor
└── uploads/          # Archivos subidos
```

## Seguridad

- Autenticación JWT
- Encriptación bcrypt
- Rate limiting
- Helmet security headers
- CORS configurado
- Validación de datos

## Licencia

MIT
```

---

🎉 **Backend completo creado**! 

Este backend incluye:
- ✅ Autenticación JWT completa
- ✅ 5 modelos MongoDB (User, Course, Task, TaskSubmission, Grade)
- ✅ CRUD completo para todas las entidades
- ✅ Sistema de roles (estudiante, profesor, administrador)
- ✅ Upload de archivos con Multer
- ✅ Middlewares de seguridad
- ✅ Manejo de errores robusto
- ✅ Seed de datos de prueba
- ✅ Documentación completa
