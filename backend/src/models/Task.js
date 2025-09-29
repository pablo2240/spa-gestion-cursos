import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: [true, 'El título es requerido'],
    trim: true
  },
  descripcion: {
    type: String,
    required: [true, 'La descripción es requerida']
  },
  curso: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  profesor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  fechaCreacion: {
    type: Date,
    default: Date.now
  },
  fechaEntrega: {
    type: Date,
    required: [true, 'La fecha de entrega es requerida']
  },
  puntajeMaximo: {
    type: Number,
    default: 100
  },
  estado: {
    type: String,
    enum: ['activa', 'cerrada'],
    default: 'activa'
  }
}, {
  timestamps: true
});

export default mongoose.model('Task', taskSchema);