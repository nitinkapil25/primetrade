import { Router } from 'express';
import { authMiddleware } from '../middleware/authMiddleware.js';
import {
  create,
  getAll,
  getOne,
  remove,
  update
} from '../controllers/taskController.js';

const router = Router();

router.use(authMiddleware);

router.post('/', create);
router.get('/', getAll);
router.get('/:id', getOne);
router.put('/:id', update);
router.delete('/:id', remove);

export default router;
