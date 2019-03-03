// @flow
import mimes from './mimes';
import type { Options } from './type';
import type { ImageProcessor } from './processImage';

export default function resize(
  image: ImageProcessor,
  meta: { width: number, height: number },
  placeholder: { size: number },
  mime: string,
  options: Options
) {
  const sizeToWidthMap = new Map<number, number>();
  if (mime === mimes.svg) return [[], sizeToWidthMap];

  const widthSet = new Set([placeholder.size]);
  const promises = [image.resize(placeholder.size, mime, options)];

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
