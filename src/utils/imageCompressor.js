/**
 * Image Compression Utility
 * Compresses images to a target size (default 200KB) while maintaining quality
 */

/**
 * Compress an image file to target size
 * @param {File} file - The image file to compress
 * @param {number} maxSizeKB - Maximum size in KB (default: 200)
 * @param {number} maxWidth - Maximum width (default: 1200)
 * @param {number} maxHeight - Maximum height (default: 1200)
 * @returns {Promise<string>} - Base64 encoded compressed image
 */
export const compressImage = (file, maxSizeKB = 200, maxWidth = 1200, maxHeight = 1200) => {
    return new Promise((resolve, reject) => {
        // Check if file is an image
        if (!file.type.startsWith('image/')) {
            reject(new Error('File is not an image'));
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                // Calculate new dimensions while maintaining aspect ratio
                let { width, height } = img;

                if (width > maxWidth || height > maxHeight) {
                    const ratio = Math.min(maxWidth / width, maxHeight / height);
                    width = Math.round(width * ratio);
                    height = Math.round(height * ratio);
                }

                // Create canvas for compression
                const canvas = document.createElement('canvas');
                canvas.width = width;
                canvas.height = height;

                const ctx = canvas.getContext('2d');

                // Enable image smoothing for better quality
                ctx.imageSmoothingEnabled = true;
                ctx.imageSmoothingQuality = 'high';

                // Draw image on canvas
                ctx.drawImage(img, 0, 0, width, height);

                // Start with high quality and reduce until size is under limit
                let quality = 0.92;
                const minQuality = 0.3;
                const targetSize = maxSizeKB * 1024; // Convert to bytes

                const compressWithQuality = (q) => {
                    const dataUrl = canvas.toDataURL('image/jpeg', q);
                    // Calculate size: base64 is roughly 4/3 of actual size
                    const sizeInBytes = (dataUrl.length * 3) / 4;

                    if (sizeInBytes <= targetSize || q <= minQuality) {
                        console.log(`Image compressed: ${Math.round(sizeInBytes / 1024)}KB at quality ${Math.round(q * 100)}%`);
                        resolve(dataUrl);
                    } else {
                        // Reduce quality and try again
                        const newQuality = q - 0.05;
                        setTimeout(() => compressWithQuality(newQuality), 0);
                    }
                };

                // Try WebP format first (better compression), fall back to JPEG
                if (canvas.toDataURL('image/webp').startsWith('data:image/webp')) {
                    const compressWebP = (q) => {
                        const dataUrl = canvas.toDataURL('image/webp', q);
                        const sizeInBytes = (dataUrl.length * 3) / 4;

                        if (sizeInBytes <= targetSize || q <= minQuality) {
                            console.log(`Image compressed (WebP): ${Math.round(sizeInBytes / 1024)}KB at quality ${Math.round(q * 100)}%`);
                            resolve(dataUrl);
                        } else {
                            const newQuality = q - 0.05;
                            setTimeout(() => compressWebP(newQuality), 0);
                        }
                    };
                    compressWebP(quality);
                } else {
                    compressWithQuality(quality);
                }
            };

            img.onerror = () => {
                reject(new Error('Failed to load image'));
            };

            img.src = e.target.result;
        };

        reader.onerror = () => {
            reject(new Error('Failed to read file'));
        };

        reader.readAsDataURL(file);
    });
};

/**
 * Check if image needs compression (larger than threshold)
 * @param {File} file - The image file to check
 * @param {number} thresholdKB - Size threshold in KB (default: 200)
 * @returns {boolean}
 */
export const needsCompression = (file, thresholdKB = 200) => {
    return file.size > thresholdKB * 1024;
};

/**
 * Get file size in KB
 * @param {File} file 
 * @returns {number}
 */
export const getFileSizeKB = (file) => {
    return Math.round(file.size / 1024);
};

/**
 * Compress image only if needed (larger than threshold)
 * @param {File} file - The image file
 * @param {number} maxSizeKB - Target max size in KB
 * @returns {Promise<string>} - Base64 encoded image (compressed if needed)
 */
export const compressImageIfNeeded = async (file, maxSizeKB = 200) => {
    if (needsCompression(file, maxSizeKB)) {
        console.log(`Compressing image from ${getFileSizeKB(file)}KB to ~${maxSizeKB}KB...`);
        return await compressImage(file, maxSizeKB);
    } else {
        // If already small enough, just return as base64
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => resolve(e.target.result);
            reader.onerror = () => reject(new Error('Failed to read file'));
            reader.readAsDataURL(file);
        });
    }
};

export default compressImage;
