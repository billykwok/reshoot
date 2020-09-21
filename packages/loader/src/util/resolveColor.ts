import color from 'color';

import type { Sharp } from 'sharp';
import { ResolvedOptions } from '../type';

async function resolveColor(
  image: Sharp,
  options: Pick<ResolvedOptions, 'background'>
): Promise<string> {
  const { dominant } = await image
    .flatten(options.background ? { background: options.background } : false)
    .stats();
  return color(dominant).hex();
}

export default resolveColor;
