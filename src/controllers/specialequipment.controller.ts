import { Request, Response } from 'express';
import { specialEquipmentService } from '../services/specialequipment.service';
import { asyncHandler } from '../utils/asyncHandler';
import { AppError } from '../utils/AppError';

export const getAllSpecialEquipment = asyncHandler(async (req: Request, res: Response) => {
  const equip = await specialEquipmentService.getAllSpecialEquipment();
  res.status(200).json({
    status: 'success',
    data: equip,
  });
});

export const getSpecialEquipment = asyncHandler(async (req: Request, res: Response) => {
  const equip = await specialEquipmentService.getSpecialEquipmentById(req.params.id as string);
  if (!equip) {
    throw new AppError('Special Equipment not found', 404);
  }
  res.status(200).json({
    status: 'success',
    data: equip,
  });
});

export const createSpecialEquipment = asyncHandler(async (req: Request, res: Response) => {
  const newEquip = await specialEquipmentService.createSpecialEquipment(req.body);
  res.status(201).json({
    status: 'success',
    data: newEquip,
  });
});

export const updateSpecialEquipment = asyncHandler(async (req: Request, res: Response) => {
  const updatedEquip = await specialEquipmentService.updateSpecialEquipment(req.params.id as string, req.body);
  res.status(200).json({
    status: 'success',
    data: updatedEquip,
  });
});

export const deleteSpecialEquipment = asyncHandler(async (req: Request, res: Response) => {
  await specialEquipmentService.deleteSpecialEquipment(req.params.id as string);
  res.status(204).json({
    status: 'success',
    data: null,
  });
});
