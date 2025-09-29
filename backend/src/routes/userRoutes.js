import express from 'express';
import {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  updateProfile
} from '../controllers/userController.js';
import { authenticate } from '../middlewares/authMiddleware.js';
import { authorize } from '../middlewares/roleMiddleware.js';

const router = express.Router();

router.get('/', authenticate, authorize('administrador'), getUsers);
router.get('/:id', authenticate, getUser);
router.post('/', authenticate, authorize('administrador'), createUser);
router.put('/:id', authenticate, authorize('administrador'), updateUser);
router.delete('/:id', authenticate, authorize('administrador'), deleteUser);
router.put('/profile/me', authenticate, updateProfile);

export default router;