import { Mime } from '../type';

import type { Sharp } from 'sharp';
import type { ResolvedOptions } from '../type';

function resize(
  image: Sharp,
  width: number,
  mime: Mime,
  { background, quality }: Pick<ResolvedOptions, 'background' | 'quality'>
): Promise<Buffer> {
  const resized = width
    ? image.clone().resize({
        fit: 'outside',
        width: Math.max(16, width),
        height: 16,
        withoutEnlargement: true,
      })
    : image.clone();
  switch (mime) {
    case Mime.JPG:
    case Mime.JPEG:
      return resized
        .flatten(background ? { background } : false)
        .jpeg(quality ? { quality } : {})
        .toBuffer();
    case Mime.PNG:
      return resized.png(quality ? { quality } : {}).toBuffer();
    case Mime.WEBP:
      return resized
        .webp(
          quality ? { quality, reductionEffort: 6 } : { reductionEffort: 6 }
        )
        .toBuffer();
    case Mime.AVIF:
      return resized.avif(quality ? { quality } : {}).toBuffer();
  }
  return Promise.reject(new Error(`Unsupported MIME type "${mime}"`));
}

export default resize;
