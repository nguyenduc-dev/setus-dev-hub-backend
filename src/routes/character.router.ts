import { Router } from 'express';
import * as characterController from '../controllers/character.controller';

export const characterRouter = Router();

characterRouter
  .route('/')
  .get(characterController.getAllCharacters)
  .post(characterController.createCharacter);

characterRouter
  .route('/:id')
  .get(characterController.getCharacter)
  .patch(characterController.updateCharacter)
  .delete(characterController.deleteCharacter);
