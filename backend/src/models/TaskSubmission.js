import mongoose from 'mongoose';

const taskSubmissionSchema = new mongoose.Schema({
  tarea: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Task',
    required: true
  },
  estudiante: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  curso: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  archivoUrl: {
    type: String,
    required: true
  },
  comentario: {
    type: String
  },
  fechaEntrega: {
    type: Date,
    default: Date.now
  },
  calificacion: {
    type: Number,
    min: 0,
    max: 100
  },
  feedback: {
    type: String
  },
  estado: {
    type: String,
    enum: ['pendiente', 'revisada', 'aprobada', 'rechazada'],
    default: 'pendiente'
  },
  fechaRevision: {
    type: Date
  }
}, {
  timestamps: true
});

export default mongoose.model('TaskSubmission', taskSubmissionSchema);