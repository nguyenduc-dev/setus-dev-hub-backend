import { Request, Response } from 'express';
import { miniBossService } from '../services/miniboss.service';
import { asyncHandler } from '../utils/asyncHandler';
import { AppError } from '../utils/AppError';

export const getAllMiniBosses = asyncHandler(async (req: Request, res: Response) => {
  const bosses = await miniBossService.getAllMiniBosses();
  res.status(200).json({
    status: 'success',
    data: bosses,
  });
});

export const getMiniBoss = asyncHandler(async (req: Request, res: Response) => {
  const boss = await miniBossService.getMiniBossById(req.params.id as string);
  if (!boss) {
    throw new AppError('Mini Boss not found', 404);
  }
  res.status(200).json({
    status: 'success',
    data: boss,
  });
});

export const createMiniBoss = asyncHandler(async (req: Request, res: Response) => {
  const newBoss = await miniBossService.createMiniBoss(req.body);
  res.status(201).json({
    status: 'success',
    data: newBoss,
  });
});

export const updateMiniBoss = asyncHandler(async (req: Request, res: Response) => {
  const updatedBoss = await miniBossService.updateMiniBoss(req.params.id as string, req.body);
  res.status(200).json({
    status: 'success',
    data: updatedBoss,
  });
});

export const deleteMiniBoss = asyncHandler(async (req: Request, res: Response) => {
  await miniBossService.deleteMiniBoss(req.params.id as string);
  res.status(204).json({
    status: 'success',
    data: null,
  });
});
