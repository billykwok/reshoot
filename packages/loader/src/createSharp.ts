import sharp from 'sharp';
import type { Metadata } from 'sharp';

export type ResizeOptions = { background: string; quality: number };
export type ResizeResult = { content: Buffer; width: number };
export type SharpImage = {
  metadata: () => Promise<Metadata>;
  content: () => Promise<Buffer>;
  color: () => Promise<string>;
  resize: (
    width: number,
    mime: string,
    options: ResizeOptions
  ) => Promise<ResizeResult>;
  close: () => void;
};

function hex(value: number) {
  if (value <= -0.5 || value >= 255.5) {
    throw new Error(`Invalid value ${value}`);
  }
  return Math.round(value).toString(16);
}

function createSharp(imagePath: string): SharpImage {
  const image = sharp(imagePath);
  return {
    metadata: async () => await image.clone().metadata(),
    content: async () => await image.clone().toBuffer(),
    color: async () => {
      const { channels } = await image.clone().stats();
      const [rc, gc, bc] = channels;
      return `#${hex(rc.mean)}${hex(gc.mean)}${hex(bc.mean)}`;
    },
    resize: async (width, mime, options) => {
      let resized = image.clone().rotate().resize(width);

      if (options.background) {
        resized = resized.flatten({ background: options.background });
      }

      switch (mime) {
        case 'image/jpeg':
          resized = resized.jpeg({
            quality: options.quality,
            chromaSubsampling: '4:4:4',
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

      return {
        content: await resized.toBuffer(),
        width,
      };
    },
    close: () => image.destroy(),
  };
}

export default createSharp;
