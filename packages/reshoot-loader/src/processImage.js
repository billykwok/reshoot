// @flow
import sharp from 'sharp';

export default function processImage(imagePath: string) {
  const image = sharp(imagePath);

  return {
    metadata: () => image.metadata(),
    resize: async (
      width: number,
      mime: string,
      options: { background: string, quality: number }
    ): Promise<{ data: Buffer, width: number }> => {
      let resized = image
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
