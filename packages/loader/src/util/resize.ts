import { Mime } from '../type';

import type { Sharp } from 'sharp';
import type { ResolvedOptions } from '../type';

type Options = Pick<ResolvedOptions, 'background' | 'quality'>;

function resize(
  image: Sharp,
  width: number,
  mime: Mime,
  { background, quality }: Options
): Promise<Buffer> {
  const resized = width ? image.clone().resize({ width }) : image.clone();
  switch (mime) {
    case Mime.JPG:
    case Mime.JPEG:
      return resized
        .flatten(background ? { background } : false)
        .jpeg({ quality })
        .toBuffer();
    case Mime.PNG:
      return resized.png({ quality }).toBuffer();
    case Mime.WEBP:
      return resized.webp({ quality, reductionEffort: 6 }).toBuffer();
  }
  return Promise.reject(new Error(`Unsupported MIME type "${mime}"`));
}

export default resize;
