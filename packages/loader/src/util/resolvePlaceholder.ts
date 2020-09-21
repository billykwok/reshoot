import resize from './resize';
import { createDataUrl } from './dataUrl';
import { Mime } from '../type';

import type { Sharp } from 'sharp';
import type { ResolvedOptions } from '../type';

type Options = Pick<ResolvedOptions, 'background' | 'placeholder'>;

async function resolvePlaceholder(
  image: Sharp,
  resolvedColor: string,
  { background, placeholder }: Options
): Promise<string> {
  return createDataUrl(
    await resize(image, placeholder.size, Mime.JPEG, {
      background: resolvedColor === 'transparent' ? background : resolvedColor,
      quality: placeholder.quality,
    }),
    placeholder.trimDataUrl
  );
}

export default resolvePlaceholder;
