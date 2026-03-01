import { Router } from 'express';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { validate } from '../middleware/validationMiddleware.js';
import {
  create,
  getAll,
  getOne,
  remove,
  update
} from '../controllers/taskController.js';
import { createTaskSchema, updateTaskSchema } from '../utils/zodSchemas.js';

const router = Router();

router.use(authMiddleware);

router.post('/', validate(createTaskSchema), create);
router.get('/', getAll);
router.get('/:id', getOne);
router.put('/:id', validate(updateTaskSchema), update);
router.delete('/:id', remove);

export default router;
