import resize from './resize';
import { createDataUrl } from './dataUrl';
import { Mime } from '../type';

import type { Sharp } from 'sharp';
import type { ResolvedOptions } from '../type';

async function resolvePlaceholder(
  image: Sharp,
  resolvedColor: string,
  {
    background,
    placeholderSize,
    placeholderQuality,
    placeholderTrimDataUrl,
  }: Pick<
    ResolvedOptions,
    | 'background'
    | 'placeholderSize'
    | 'placeholderQuality'
    | 'placeholderTrimDataUrl'
  >
): Promise<string> {
  return createDataUrl(
    await resize(image, placeholderSize, Mime.JPEG, {
      background: resolvedColor === 'transparent' ? background : resolvedColor,
      quality: placeholderQuality,
    }),
    placeholderTrimDataUrl
  );
}

export default resolvePlaceholder;
