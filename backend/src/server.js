import dotenv from 'dotenv';
import app from './app.js';
import connectDB from './config/database.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Cargar variables de entorno
dotenv.config();

const PORT = process.env.PORT || 5000;

// Crear directorios necesarios
const uploadDirs = [
  path.join(__dirname, '../uploads'),
  path.join(__dirname, '../uploads/tasks'),
  path.join(__dirname, '../uploads/profiles')
];

uploadDirs.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`📁 Directorio creado: ${dir}`);
  }
});

// Conectar a la base de datos y arrancar servidor
const startServer = async () => {
  try {
    await connectDB();
    
    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
      console.log(`📊 Entorno: ${process.env.NODE_ENV}`);
      console.log(`🔗 Frontend URL: ${process.env.FRONTEND_URL}`);
      console.log(`\n📋 Endpoints disponibles:`);
      console.log(`   - GET  /api/health`);
      console.log(`   - POST /api/auth/login`);
      console.log(`   - POST /api/auth/register`);
      console.log(`   - GET  /api/courses`);
      console.log(`   - POST /api/courses`);
      console.log(`   - GET  /api/tasks`);
      console.log(`   - POST /api/tasks`);
      console.log(`   - GET  /api/grades`);
      console.log(`   - GET  /api/users`);
    });
  } catch (error) {
    console.error('❌ Error al iniciar el servidor:', error);
    process.exit(1);
  }
};

// Manejo de errores no capturados
process.on('unhandledRejection', (err) => {
  console.error('❌ Error no manejado:', err);
  process.exit(1);
});

process.on('SIGTERM', () => {
  console.log('👋 SIGTERM recibido. Cerrando servidor...');
  process.exit(0);
});

startServer();