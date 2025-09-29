import Task from '../models/Task.js';
import TaskSubmission from '../models/TaskSubmission.js';
import Course from '../models/Course.js';

export const getTasks = async (req, res, next) => {
  try {
    const { cursoId } = req.query;
    const filter = {};

    if (cursoId) filter.curso = cursoId;
    
    if (req.user.role === 'profesor') {
      filter.profesor = req.user.id;
    }

    const tasks = await Task.find(filter)
      .populate('curso', 'nombre')
      .populate('profesor', 'nombre apellido')
      .sort({ fechaEntrega: -1 });

    res.json({
      success: true,
      count: tasks.length,
      data: tasks
    });
  } catch (error) {
    next(error);
  }
};

export const createTask = async (req, res, next) => {
  try {
    const course = await Course.findById(req.body.curso);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Curso no encontrado'
      });
    }

    if (course.profesor.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'No tienes permiso para crear tareas en este curso'
      });
    }

    const task = await Task.create({
      ...req.body,
      profesor: req.user.id
    });

    res.status(201).json({
      success: true,
      message: 'Tarea creada exitosamente',
      data: task
    });
  } catch (error) {
    next(error);
  }
};

export const submitTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Tarea no encontrada'
      });
    }

    if (task.estado === 'cerrada') {
      return res.status(400).json({
        success: false,
        message: 'Esta tarea ya está cerrada'
      });
    }

    if (new Date() > task.fechaEntrega) {
      return res.status(400).json({
        success: false,
        message: 'La fecha de entrega ha expirado'
      });
    }

    const existingSubmission = await TaskSubmission.findOne({
      tarea: task._id,
      estudiante: req.user.id
    });

    if (existingSubmission) {
      return res.status(400).json({
        success: false,
        message: 'Ya has entregado esta tarea'
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Archivo requerido'
      });
    }

    const submission = await TaskSubmission.create({
      tarea: task._id,
      estudiante: req.user.id,
      curso: task.curso,
      archivoUrl: req.file.path,
      comentario: req.body.comentario
    });

    res.status(201).json({
      success: true,
      message: 'Tarea entregada exitosamente',
      data: submission
    });
  } catch (error) {
    next(error);
  }
};

export const getTaskSubmissions = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Tarea no encontrada'
      });
    }

    const submissions = await TaskSubmission.find({ tarea: task._id })
      .populate('estudiante', 'nombre apellido email cedula')
      .sort({ fechaEntrega: -1 });

    res.json({
      success: true,
      count: submissions.length,
      data: submissions
    });
  } catch (error) {
    next(error);
  }
};

export const gradeSubmission = async (req, res, next) => {
  try {
    const { calificacion, feedback } = req.body;

    const submission = await TaskSubmission.findById(req.params.submissionId);

    if (!submission) {
      return res.status(404).json({
        success: false,
        message: 'Entrega no encontrada'
      });
    }

    const task = await Task.findById(submission.tarea);

    if (task.profesor.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'No tienes permiso para calificar esta tarea'
      });
    }

    submission.calificacion = calificacion;
    submission.feedback = feedback;
    submission.estado = calificacion >= 60 ? 'aprobada' : 'rechazada';
    submission.fechaRevision = Date.now();

    await submission.save();

    res.json({
      success: true,
      message: 'Tarea calificada exitosamente',
      data: submission
    });
  } catch (error) {
    next(error);
  }
};