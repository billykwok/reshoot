import sharp from 'sharp';
import { promisify } from 'util';

const sizeOf = promisify(require('image-size'));

export type MetaData = { width: number, height: number };
export type ResizeOptions = { background: string, quality: number };
export type ResizeResult = { content: Buffer, width: number };
export type ImageProcessor = {
  metadata: () => Promise<MetaData>,
  resize: (
    width: number,
    mime: string,
    options: ResizeOptions
  ) => Promise<ResizeResult>
};

export default function processImage(imagePath: string): ImageProcessor {
  return {
    metadata: () => sizeOf(imagePath),
    resize: async (width, mime, options) => {
      let resized = sharp(imagePath)
        .clone()
        .rotate()
        .resize(width);

      if (options.background) {
        resized = resized.flatten({ background: options.background });
      }

      switch (mime) {
        case 'image/jpeg':
          resized = resized.jpeg({
            quality: options.quality,
            chromaSubsampling: '4:4:4'
          });
          break;
        case 'image/png':
          resized = resized.png({ adaptiveFiltering: true });
          break;
        case 'image/webp':
          resized = resized.webp({ quality: options.quality });
          break;
        default:
          throw new Error(`Unsupported MIME type "${mime}"`);
      }

      const content = await resized.toBuffer();
      return { content, width };
    }
  };
}
