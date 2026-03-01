import { Router } from 'express';
import { getMe, login, register } from '../controllers/authController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { validate } from '../middleware/validationMiddleware.js';
import { loginSchema, registerSchema } from '../utils/zodSchemas.js';

const router = Router();

router.post('/register', validate(registerSchema), register);
router.post('/login', validate(loginSchema), login);
router.get('/me', authMiddleware, getMe);

export default router;
