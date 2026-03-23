import { Request, Response } from 'express';
import { characterService } from '../services/character.service';
import { asyncHandler } from '../utils/asyncHandler';
import { AppError } from '../utils/AppError';

export const getAllCharacters = asyncHandler(async (req: Request, res: Response) => {
  const characters = await characterService.getAllCharacters();
  res.status(200).json({
    status: 'success',
    data: characters,
  });
});

export const getCharacter = asyncHandler(async (req: Request, res: Response) => {
  const character = await characterService.getCharacterById(req.params.id as string);
  if (!character) {
    throw new AppError('Character not found', 404);
  }
  res.status(200).json({
    status: 'success',
    data: character,
  });
});

export const createCharacter = asyncHandler(async (req: Request, res: Response) => {
  const newCharacter = await characterService.createCharacter(req.body);
  res.status(201).json({
    status: 'success',
    data: newCharacter,
  });
});

export const updateCharacter = asyncHandler(async (req: Request, res: Response) => {
  const updatedCharacter = await characterService.updateCharacter(req.params.id as string, req.body);
  res.status(200).json({
    status: 'success',
    data: updatedCharacter,
  });
});

export const deleteCharacter = asyncHandler(async (req: Request, res: Response) => {
  await characterService.deleteCharacter(req.params.id as string);
  res.status(204).json({
    status: 'success',
    data: null,
  });
});
