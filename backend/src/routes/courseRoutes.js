import express from 'express';
import {
  getCourses,
  getCourse,
  createCourse,
  updateCourse,
  deleteCourse,
  enrollStudent
} from '../controllers/courseController.js';
import { authenticate } from '../middlewares/authMiddleware.js';
import { authorize } from '../middlewares/roleMiddleware.js';

const router = express.Router();

router.get('/', authenticate, getCourses);
router.get('/:id', authenticate, getCourse);
router.post('/', authenticate, authorize('administrador'), createCourse);
router.put('/:id', authenticate, authorize('administrador', 'profesor'), updateCourse);
router.delete('/:id', authenticate, authorize('administrador'), deleteCourse);
router.post('/:id/enroll', authenticate, enrollStudent);

export default router;