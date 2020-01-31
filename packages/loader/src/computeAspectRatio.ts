import { AspectRatio, AspectRatioFormat, AspectRatioType } from './type';

export default function computeAspectRatio(
  meta: { width: number; height: number },
  options: AspectRatio
): number {
  if (typeof options.decimal !== 'number' || options.decimal > 10) {
    throw new Error(
      `Option "decimal" for aspect ratio must be a number not larger than 10, but got ${options.decimal}`
    );
  }
  const rounder = 10 ** options.decimal;
  if (
    options.format !== AspectRatioFormat.Percent &&
    options.format !== AspectRatioFormat.Ratio
  ) {
    throw new Error(
      `Option "format" for aspect ratio must be either ${AspectRatioFormat.Percent} or ${AspectRatioFormat.Ratio} but got ${options.format}`
    );
  }
  const scale = options.format === AspectRatioFormat.Percent ? 100 : 1;
  switch (options.type) {
    case AspectRatioType.WidthByHeight:
      return Math.floor((meta.width / meta.height) * scale * rounder) / rounder;
    case AspectRatioType.HeightByWidth:
      return Math.floor((meta.height / meta.width) * scale * rounder) / rounder;
    default:
      throw new Error(
        `Option "type" for aspect ratio must be either ${AspectRatioType.WidthByHeight} or ${AspectRatioType.HeightByWidth} but got "${options.type}"`
      );
  }
}
