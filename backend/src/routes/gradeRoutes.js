import express from 'express';
import {
  getGrades,
  createGrade,
  getStudentGrades
} from '../controllers/gradeController.js';
import { authenticate } from '../middlewares/authMiddleware.js';
import { authorize } from '../middlewares/roleMiddleware.js';

const router = express.Router();

router.get('/', authenticate, getGrades);
router.post('/', authenticate, authorize('profesor', 'administrador'), createGrade);
router.get('/student/:estudianteId', authenticate, getStudentGrades);

export default router;