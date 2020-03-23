import type { Metadata } from 'sharp';

import Mimes from './mimes';
import type { Options } from './type';
import type { SharpImage, ResizeResult } from './createSharp';

function resize(
  image: SharpImage,
  meta: Metadata,
  placeholder: { size: number },
  mime: string,
  options: Options
): [Promise<ResizeResult>[], Map<number, number>] {
  const sizeToWidthMap = new Map<number, number>();
  if (mime === Mimes.SVG) return [[], sizeToWidthMap];

  const widthSet = new Set<number>([placeholder.size]);
  const promises = [image.resize(placeholder.size, Mimes.JPG, options)];

  if (options.shape.srcSet) {
    options.srcSet.forEach((size) => {
      const width = Math.min(meta.width, size);
      sizeToWidthMap.set(size, width);
      if (width === meta.width) return;
      if (!widthSet.has(width)) {
        widthSet.add(width);
        if (options.emitFile) {
          promises.push(image.resize(width, mime, options));
        } else {
          promises.push(Promise.resolve({ width, content: null }));
        }
      }
    });
  }

  return [promises, sizeToWidthMap];
}

export default resize;
