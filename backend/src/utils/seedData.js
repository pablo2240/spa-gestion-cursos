import dotenv from 'dotenv';
import connectDB from '../config/database.js';
import User from '../models/User.js';
import Course from '../models/Course.js';

dotenv.config();

const seedData = async () => {
  try {
    await connectDB();

    // Limpiar datos existentes
    await User.deleteMany({});
    await Course.deleteMany({});

    console.log('🗑️  Datos anteriores eliminados');

    // Crear usuarios
    const admin = await User.create({
      nombre: 'Admin',
      apellido: 'Sistema',
      cedula: '1000000001',
      email: 'admin@sena.edu.co',
      password: 'admin123',
      role: 'administrador',
      telefono: '3001234567'
    });

    const profesor1 = await User.create({
      nombre: 'Carlos',
      apellido: 'Rodríguez',
      cedula: '1000000002',
      email: 'carlos.rodriguez@sena.edu.co',
      password: 'profesor123',
      role: 'profesor',
      telefono: '3007654321'
    });

    const estudiante1 = await User.create({
      nombre: 'María',
      apellido: 'García',
      cedula: '1000000003',
      email: 'maria.garcia@sena.edu.co',
      password: 'estudiante123',
      role: 'estudiante',
      telefono: '3009876543'
    });

    console.log('✅ Usuarios creados');

    // Crear cursos
    await Course.create({
      nombre: 'Programación Web con JavaScript',
      descripcion: 'Curso completo de desarrollo web frontend y backend',
      categoria: 'Programación',
      objetivos: 'Dominar JavaScript, React y Node.js para desarrollo full-stack',
      horarios: [
        { dia: 'Lunes', horaInicio: '08:00', horaFin: '12:00' },
        { dia: 'Miércoles', horaInicio: '08:00', horaFin: '12:00' }
      ],
      profesor: profesor1._id,
      estado: 'activo',
      cupoMaximo: 30
    });

    await Course.create({
      nombre: 'Diseño UX/UI Avanzado',
      descripcion: 'Diseño de experiencias digitales centradas en el usuario',
      categoria: 'Diseño',
      objetivos: 'Crear interfaces intuitivas y atractivas usando Figma',
      horarios: [
        { dia: 'Martes', horaInicio: '14:00', horaFin: '18:00' },
        { dia: 'Jueves', horaInicio: '14:00', horaFin: '18:00' }
      ],
      profesor: profesor1._id,
      estado: 'activo',
      cupoMaximo: 25
    });

    console.log('✅ Cursos creados');
    console.log('\n📋 Credenciales de prueba:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('Administrador:');
    console.log('  Email: admin@sena.edu.co');
    console.log('  Password: admin123');
    console.log('\nProfesor:');
    console.log('  Email: carlos.rodriguez@sena.edu.co');
    console.log('  Password: profesor123');
    console.log('\nEstudiante:');
    console.log('  Email: maria.garcia@sena.edu.co');
    console.log('  Password: estudiante123');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
};

seedData();