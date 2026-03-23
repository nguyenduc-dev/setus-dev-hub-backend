import { Router } from 'express';
import * as taskController from '../controllers/task.controller';

const router = Router();

router.get('/', taskController.getAllTasks);
router.post('/', taskController.createTask);
router.patch('/reorder', taskController.reorderTasks);
router.patch('/:id', taskController.updateTask);
router.delete('/:id', taskController.deleteTask);

export default router;
