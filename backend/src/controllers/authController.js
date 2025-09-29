import User from '../models/User.js';
import { generateToken } from '../config/jwt.js';

export const register = async (req, res, next) => {
  try {
    const { nombre, apellido, cedula, email, password, telefono } = req.body;

    const existingUser = await User.findOne({ $or: [{ email }, { cedula }] });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'Email o cédula ya registrados'
      });
    }

    const user = await User.create({
      nombre,
      apellido,
      cedula,
      email,
      password,
      telefono,
      role: 'estudiante'
    });

    const token = generateToken(user._id, user.role);

    res.status(201).json({
      success: true,
      message: 'Usuario registrado exitosamente',
      data: {
        user: {
          id: user._id,
          nombre: user.nombre,
          apellido: user.apellido,
          email: user.email,
          role: user.role
        },
        token
      }
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email y contraseña son requeridos'
      });
    }

    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({
        success: false,
        message: 'Credenciales inválidas'
      });
    }

    if (!user.active) {
      return res.status(401).json({
        success: false,
        message: 'Usuario inactivo'
      });
    }

    const token = generateToken(user._id, user.role);

    res.json({
      success: true,
      message: 'Inicio de sesión exitoso',
      data: {
        user: {
          id: user._id,
          nombre: user.nombre,
          apellido: user.apellido,
          email: user.email,
          role: user.role,
          cedula: user.cedula
        },
        token
      }
    });
  } catch (error) {
    next(error);
  }
};

export const getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id)
      .populate('cursosInscritos', 'nombre descripcion categoria');

    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    next(error);
  }
};