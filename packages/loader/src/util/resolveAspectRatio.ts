import { AspectRatioFormat, AspectRatioType } from '../type';

import type { AspectRatio } from '../type';

function resolveAspectRatio(
  { width, height }: { width?: number; height?: number },
  { type, format, decimal }: AspectRatio
): number {
  const scale = format === AspectRatioFormat.Percent ? 100 : 1;
  const rounder = 10 ** decimal;
  switch (type) {
    case AspectRatioType.WidthByHeight:
      return Math.floor((width / height) * scale * rounder) / rounder;
    case AspectRatioType.HeightByWidth:
      return Math.floor((height / width) * scale * rounder) / rounder;
  }
}

export default resolveAspectRatio;
