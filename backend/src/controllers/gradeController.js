import Grade from '../models/Grade.js';
import Course from '../models/Course.js';

export const getGrades = async (req, res, next) => {
  try {
    const { estudianteId, cursoId } = req.query;
    const filter = {};

    if (req.user.role === 'estudiante') {
      filter.estudiante = req.user.id;
    } else if (estudianteId) {
      filter.estudiante = estudianteId;
    }

    if (cursoId) filter.curso = cursoId;

    const grades = await Grade.find(filter)
      .populate('estudiante', 'nombre apellido email cedula')
      .populate('curso', 'nombre')
      .populate('profesor', 'nombre apellido')
      .populate('tarea', 'titulo')
      .sort({ fecha: -1 });

    res.json({
      success: true,
      count: grades.length,
      data: grades
    });
  } catch (error) {
    next(error);
  }
};

export const createGrade = async (req, res, next) => {
  try {
    const course = await Course.findById(req.body.curso);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Curso no encontrado'
      });
    }

    if (course.profesor.toString() !== req.user.id && req.user.role !== 'administrador') {
      return res.status(403).json({
        success: false,
        message: 'No tienes permiso para asignar notas en este curso'
      });
    }

    const grade = await Grade.create({
      ...req.body,
      profesor: req.user.id
    });

    res.status(201).json({
      success: true,
      message: 'Nota registrada exitosamente',
      data: grade
    });
  } catch (error) {
    next(error);
  }
};

export const getStudentGrades = async (req, res, next) => {
  try {
    const grades = await Grade.find({ estudiante: req.params.estudianteId })
      .populate('curso', 'nombre')
      .populate('tarea', 'titulo')
      .sort({ fecha: -1 });

    const promedioPorCurso = await Grade.aggregate([
      { $match: { estudiante: mongoose.Types.ObjectId(req.params.estudianteId) } },
      {
        $group: {
          _id: '$curso',
          promedio: { $avg: '$nota' },
          totalNotas: { $sum: 1 }
        }
      }
    ]);

    res.json({
      success: true,
      data: {
        grades,
        promedioPorCurso
      }
    });
  } catch (error) {
    next(error);
  }
};