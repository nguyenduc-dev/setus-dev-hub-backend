import { Request, Response } from 'express';
import { cardService } from '../services/card.service';
import { asyncHandler } from '../utils/asyncHandler';
import { AppError } from '../utils/AppError';

export const getAllCards = asyncHandler(async (req: Request, res: Response) => {
  const cards = await cardService.getAllCards();
  res.status(200).json({ status: 'success', data: cards });
});

export const getCard = asyncHandler(async (req: Request, res: Response) => {
  const card = await cardService.getCardById(req.params.id as string);
  if (!card) throw new AppError('Card not found', 404);
  res.status(200).json({ status: 'success', data: card });
});

export const createCard = asyncHandler(async (req: Request, res: Response) => {
  const newCard = await cardService.createCard(req.body);
  res.status(201).json({ status: 'success', data: newCard });
});

export const updateCard = asyncHandler(async (req: Request, res: Response) => {
  const updatedCard = await cardService.updateCard(req.params.id as string, req.body);
  res.status(200).json({ status: 'success', data: updatedCard });
});

export const deleteCard = asyncHandler(async (req: Request, res: Response) => {
  await cardService.deleteCard(req.params.id as string);
  res.status(204).json({ status: 'success', data: null });
});
