import express from 'express';
import {
  getTasks,
  createTask,
  submitTask,
  getTaskSubmissions,
  gradeSubmission
} from '../controllers/taskController.js';
import { authenticate } from '../middlewares/authMiddleware.js';
import { authorize } from '../middlewares/roleMiddleware.js';
import { upload } from '../config/multer.js';

const router = express.Router();

router.get('/', authenticate, getTasks);
router.post('/', authenticate, authorize('profesor'), createTask);
router.post('/:id/submit', authenticate, authorize('estudiante'), upload.single('archivo'), submitTask);
router.get('/:id/submissions', authenticate, authorize('profesor', 'administrador'), getTaskSubmissions);
router.put('/submissions/:submissionId/grade', authenticate, authorize('profesor'), gradeSubmission);

export default router;