import { AspectRatioFormat, AspectRatioType } from '../type';

import type { ResolvedOptions } from '../type';

function resolveAspectRatio(
  { width, height }: { width?: number; height?: number },
  {
    aspectRatioType,
    aspectRatioFormat,
    aspectRatioDecimal,
  }: Pick<
    ResolvedOptions,
    'aspectRatioType' | 'aspectRatioFormat' | 'aspectRatioDecimal'
  >
): number {
  const scale = aspectRatioFormat === AspectRatioFormat.Percent ? 100 : 1;
  const rounder = 10 ** aspectRatioDecimal;
  switch (aspectRatioType) {
    case AspectRatioType.WidthByHeight:
      return Math.floor((width / height) * scale * rounder) / rounder;
    case AspectRatioType.HeightByWidth:
      return Math.floor((height / width) * scale * rounder) / rounder;
  }
}

export default resolveAspectRatio;
