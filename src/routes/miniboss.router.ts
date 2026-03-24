import { Router } from 'express';
import * as miniBossController from '../controllers/miniboss.controller';

export const miniBossRouter = Router();

miniBossRouter
  .route('/')
  .get(miniBossController.getAllMiniBosses)
  .post(miniBossController.createMiniBoss);

miniBossRouter
  .route('/:id')
  .get(miniBossController.getMiniBoss)
  .patch(miniBossController.updateMiniBoss)
  .delete(miniBossController.deleteMiniBoss);
