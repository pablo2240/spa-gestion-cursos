import mongoose from 'mongoose';

const gradeSchema = new mongoose.Schema({
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
  profesor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  tarea: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Task'
  },
  tipoEvaluacion: {
    type: String,
    enum: ['tarea', 'examen', 'proyecto', 'participacion'],
    required: true
  },
  nota: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  descripcion: {
    type: String
  },
  fecha: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

export default mongoose.model('Grade', gradeSchema);