import { Request, Response } from 'express';
import { TaskService } from '../services/task.service';
import { asyncHandler } from '../utils/asyncHandler';
import { AppError } from '../utils/AppError';

export const getAllTasks = asyncHandler(async (req: Request, res: Response) => {
  const tasks = await TaskService.getAll();
  res.status(200).json({
    status: 'success',
    data: tasks,
  });
});

export const createTask = asyncHandler(async (req: Request, res: Response) => {
  const task = await TaskService.create(req.body);
  res.status(201).json({
    status: 'success',
    data: task,
  });
});

export const updateTask = asyncHandler(async (req: Request, res: Response) => {
  const task = await TaskService.update(req.params.id as string, req.body);
  if (!task) {
    throw new AppError('No task found with that ID', 404);
  }
  res.status(200).json({
    status: 'success',
    data: task,
  });
});

export const deleteTask = asyncHandler(async (req: Request, res: Response) => {
  await TaskService.delete(req.params.id as string);
  res.status(204).json({
    status: 'success',
    data: null,
  });
});

export const reorderTasks = asyncHandler(async (req: Request, res: Response) => {
  const tasks = await TaskService.reorder(req.body.tasks);
  res.status(200).json({
    status: 'success',
    data: tasks,
  });
});
