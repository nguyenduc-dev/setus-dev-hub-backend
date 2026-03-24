import { Router } from 'express';
import * as specialEquipmentController from '../controllers/specialequipment.controller';

export const specialEquipmentRouter = Router();

specialEquipmentRouter
  .route('/')
  .get(specialEquipmentController.getAllSpecialEquipment)
  .post(specialEquipmentController.createSpecialEquipment);

specialEquipmentRouter
  .route('/:id')
  .get(specialEquipmentController.getSpecialEquipment)
  .patch(specialEquipmentController.updateSpecialEquipment)
  .delete(specialEquipmentController.deleteSpecialEquipment);
