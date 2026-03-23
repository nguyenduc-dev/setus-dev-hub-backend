import express, { Request, Response } from 'express';
import multer from 'multer';
import path from 'path';
import { asyncHandler } from '../utils/asyncHandler';
import { AppError } from '../utils/AppError';
import cloudinary from '../utils/cloudinary';
import { Readable } from 'stream';

const router = express.Router();

// Configure Multer for Memory Storage
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb(new Error('Only images (jpg, png, webp) are allowed') as any);
    }
  }
});

router.post('/', upload.single('image'), asyncHandler(async (req: Request, res: Response) => {
  if (!req.file) {
    throw new AppError('No file uploaded', 400);
  }

  try {
    const streamUpload = (req: Request) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: 'setus-game-hub',
          },
          (error, result) => {
            if (result) {
              resolve(result);
            } else {
              reject(error);
            }
          }
        );

        Readable.from(req.file!.buffer).pipe(stream);
      });
    };

    const result = (await streamUpload(req)) as any;

    res.status(200).json({
      status: 'success',
      data: { url: result.secure_url }
    });
  } catch (error: any) {
    console.error('Cloudinary Upload Error:', error);
    throw new AppError(`Failed to upload to Cloudinary: ${error.message || 'Unknown error'}`, 500);
  }
}));

export default router;
