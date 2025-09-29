import Course from '../models/Course.js';
import User from '../models/User.js';

export const getCourses = async (req, res, next) => {
  try {
    const { categoria, estado } = req.query;
    const filter = {};

    if (categoria) filter.categoria = categoria;
    if (estado) filter.estado = estado;

    const courses = await Course.find(filter)
      .populate('profesor', 'nombre apellido email')
      .populate('estudiantes', 'nombre apellido email')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: courses.length,
      data: courses
    });
  } catch (error) {
    next(error);
  }
};

export const getCourse = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id)
      .populate('profesor', 'nombre apellido email telefono')
      .populate('estudiantes', 'nombre apellido email cedula');

    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Curso no encontrado'
      });
    }

    res.json({
      success: true,
      data: course
    });
  } catch (error) {
    next(error);
  }
};

export const createCourse = async (req, res, next) => {
  try {
    const profesor = await User.findById(req.body.profesor);
    
    if (!profesor || profesor.role !== 'profesor') {
      return res.status(400).json({
        success: false,
        message: 'Profesor inválido'
      });
    }

    const course = await Course.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Curso creado exitosamente',
      data: course
    });
  } catch (error) {
    next(error);
  }
};

export const updateCourse = async (req, res, next) => {
  try {
    const course = await Course.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Curso no encontrado'
      });
    }

    res.json({
      success: true,
      message: 'Curso actualizado exitosamente',
      data: course
    });
  } catch (error) {
    next(error);
  }
};

export const deleteCourse = async (req, res, next) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Curso no encontrado'
      });
    }

    res.json({
      success: true,
      message: 'Curso eliminado exitosamente'
    });
  } catch (error) {
    next(error);
  }
};

export const enrollStudent = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id);
    const student = await User.findById(req.body.estudianteId);

    if (!course || !student) {
      return res.status(404).json({
        success: false,
        message: 'Curso o estudiante no encontrado'
      });
    }

    if (student.role !== 'estudiante') {
      return res.status(400).json({
        success: false,
        message: 'El usuario no es un estudiante'
      });
    }

    if (course.estudiantes.includes(student._id)) {
      return res.status(400).json({
        success: false,
        message: 'El estudiante ya está inscrito en este curso'
      });
    }

    if (course.estudiantes.length >= course.cupoMaximo) {
      return res.status(400).json({
        success: false,
        message: 'Curso lleno. No hay cupos disponibles'
      });
    }

    course.estudiantes.push(student._id);
    student.cursosInscritos.push(course._id);

    await course.save();
    await student.save();

    res.json({
      success: true,
      message: 'Estudiante inscrito exitosamente',
      data: course
    });
  } catch (error) {
    next(error);
  }
};