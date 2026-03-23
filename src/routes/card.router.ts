import { Router } from 'express';
import * as cardController from '../controllers/card.controller';

export const cardRouter = Router();

cardRouter
  .route('/')
  .get(cardController.getAllCards)
  .post(cardController.createCard);

cardRouter
  .route('/:id')
  .get(cardController.getCard)
  .patch(cardController.updateCard)
  .delete(cardController.deleteCard);
