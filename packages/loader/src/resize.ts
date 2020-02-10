import Mimes from './mimes';
import { Options } from './type';
import { ImageProcessor, ResizeResult } from './processImage';

function resize(
  image: ImageProcessor,
  meta: { width: number; height: number },
  placeholder: { size: number },
  mime: string,
  options: Options
): [Promise<ResizeResult>[], Map<number, number>] {
  const sizeToWidthMap = new Map<number, number>();
  if (mime === Mimes.SVG) return [[], sizeToWidthMap];

  const widthSet = new Set<number>([placeholder.size]);
  const promises = [image.resize(placeholder.size, Mimes.JPG, options)];

  if (options.shape.srcSet) {
    options.srcSet.forEach(size => {
      const width = Math.min(meta.width, size);
      sizeToWidthMap.set(size, width);
      if (width === meta.width) return;
      if (!widthSet.has(width)) {
        widthSet.add(width);
        promises.push(image.resize(width, mime, options));
      }
    });
  }

  return [promises, sizeToWidthMap];
}

export default resize;
