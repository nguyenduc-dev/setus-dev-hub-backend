import { v2 as cloudinary } from 'cloudinary';

// Cloudinary configuration is picked up automatically from CLOUDINARY_URL in .env
cloudinary.config({
  secure: true
});

/**
 * Extracts the public_id from a Cloudinary URL
 * Example: https://res.cloudinary.com/dkdnx9slg/image/upload/v123456789/setus-game-hub/unique-id.jpg
 * returns: "setus-game-hub/unique-id"
 */
export const getPublicIdFromUrl = (url: string): string | null => {
  try {
    const parts = url.split('/');
    const uploadIndex = parts.indexOf('upload');
    if (uploadIndex === -1) return null;
    
    // Cloudinary URLs typically have "v1234567" after "upload"
    // We want the part after the version (or directly after /upload/ if no version)
    const afterUpload = parts.slice(uploadIndex + 1);
    
    // Remove the version part if it exists (starts with 'v')
    if (afterUpload[0].startsWith('v') && !isNaN(Number(afterUpload[0].substring(1)))) {
      afterUpload.shift();
    }
    
    // The public_id is everything remaining minus the extension
    const fullPublicIdWithExt = afterUpload.join('/');
    const lastDotIndex = fullPublicIdWithExt.lastIndexOf('.');
    return lastDotIndex === -1 ? fullPublicIdWithExt : fullPublicIdWithExt.substring(0, lastDotIndex);
  } catch (err) {
    console.error('Error parsing Cloudinary URL:', err);
    return null;
  }
};

/**
 * Deletes an image from Cloudinary using its URL
 */
export const deleteImage = async (url: string) => {
  const publicId = getPublicIdFromUrl(url);
  if (!publicId) return;

  try {
    console.log(`🗑️ Deleting cloud asset: ${publicId}`);
    return await cloudinary.uploader.destroy(publicId);
  } catch (err) {
    console.error(`Failed to delete Cloudinary asset: ${publicId}`, err);
  }
};

export default cloudinary;
