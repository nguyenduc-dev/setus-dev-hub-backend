import { Request, Response } from 'express';
import { mechanicService } from '../services/mechanic.service';
import { asyncHandler } from '../utils/asyncHandler';

export const getAllMechanics = asyncHandler(async (req: Request, res: Response) => {
  const category = req.query.category as any;
  const mechanics = category
    ? await mechanicService.getMechanicsByCategory(category)
    : await mechanicService.getAllMechanics();
  res.status(200).json({ status: 'success', data: mechanics });
});

export const createMechanic = asyncHandler(async (req: Request, res: Response) => {
  const newMechanic = await mechanicService.createMechanic(req.body);
  res.status(201).json({ status: 'success', data: newMechanic });
});

export const updateMechanic = asyncHandler(async (req: Request, res: Response) => {
  const updatedMechanic = await mechanicService.updateMechanic(req.params.id as string, req.body);
  res.status(200).json({ status: 'success', data: updatedMechanic });
});

export const deleteMechanic = asyncHandler(async (req: Request, res: Response) => {
  await mechanicService.deleteMechanic(req.params.id as string);
  res.status(204).json({ status: 'success', data: null });
});
