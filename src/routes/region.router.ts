import { Router } from 'express';
import * as regionController from '../controllers/region.controller';

export const regionRouter = Router();

regionRouter
  .route('/')
  .get(regionController.getAllRegions)
  .post(regionController.createRegion);

regionRouter
  .route('/:id')
  .get(regionController.getRegion)
  .patch(regionController.updateRegion)
  .delete(regionController.deleteRegion);
