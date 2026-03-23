import { Request, Response } from 'express';
import { regionService } from '../services/region.service';
import { asyncHandler } from '../utils/asyncHandler';
import { AppError } from '../utils/AppError';

export const getAllRegions = asyncHandler(async (req: Request, res: Response) => {
  const regions = await regionService.getAllRegions();
  res.status(200).json({ status: 'success', data: regions });
});

export const getRegion = asyncHandler(async (req: Request, res: Response) => {
  const region = await regionService.getRegionById(req.params.id as string);
  if (!region) throw new AppError('Region not found', 404);
  res.status(200).json({ status: 'success', data: region });
});

export const createRegion = asyncHandler(async (req: Request, res: Response) => {
  const newRegion = await regionService.createRegion(req.body);
  res.status(201).json({ status: 'success', data: newRegion });
});

export const updateRegion = asyncHandler(async (req: Request, res: Response) => {
  const updatedRegion = await regionService.updateRegion(req.params.id as string, req.body);
  res.status(200).json({ status: 'success', data: updatedRegion });
});

export const deleteRegion = asyncHandler(async (req: Request, res: Response) => {
  await regionService.deleteRegion(req.params.id as string);
  res.status(204).json({ status: 'success', data: null });
});
