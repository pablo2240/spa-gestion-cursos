import mongoose from 'mongoose';

const scheduleSchema = new mongoose.Schema({
  dia: {
    type: String,
    enum: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
    required: true
  },
  horaInicio: {
    type: String,
    required: true
  },
  horaFin: {
    type: String,
    required: true
  }
}, { _id: false });

const courseSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre del curso es requerido'],
    trim: true
  },
  descripcion: {
    type: String,
    required: [true, 'La descripción es requerida'],
    trim: true
  },
  categoria: {
    type: String,
    required: [true, 'La categoría es requerida'],
    enum: ['Programación', 'Diseño', 'Gestión', 'Electrónica', 'Mecánica', 'Otros']
  },
  objetivos: {
    type: String,
    required: true
  },
  horarios: [scheduleSchema],
  profesor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  estudiantes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  fechaInicio: {
    type: Date,
    default: Date.now
  },
  fechaFin: {
    type: Date
  },
  estado: {
    type: String,
    enum: ['activo', 'inactivo', 'finalizado'],
    default: 'activo'
  },
  cupoMaximo: {
    type: Number,
    default: 30
  }
}, {
  timestamps: true
});

export default mongoose.model('Course', courseSchema);