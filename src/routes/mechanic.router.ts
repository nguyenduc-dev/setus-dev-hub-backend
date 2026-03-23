import { Router } from 'express';
import * as mechanicController from '../controllers/mechanic.controller';

export const mechanicRouter = Router();

mechanicRouter
  .route('/')
  .get(mechanicController.getAllMechanics)
  .post(mechanicController.createMechanic);

mechanicRouter
  .route('/:id')
  .patch(mechanicController.updateMechanic)
  .delete(mechanicController.deleteMechanic);
