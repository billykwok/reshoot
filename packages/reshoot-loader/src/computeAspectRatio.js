// @flow
import type { AspectRatio } from './type';

export default function computeAspectRatio(
  meta: { width: number, height: number },
  options: AspectRatio
): number {
  const rounder = 10 ** options.decimal;
  const scale = options.format === 'percent' ? 100 : 1;
  switch (options.type) {
    case 'widthByHeight':
      return Math.floor((meta.width / meta.height) * scale * rounder) / rounder;
    case 'heightByWidth':
      return Math.floor((meta.height / meta.width) * scale * rounder) / rounder;
    default:
      throw new Error(`Unsupported aspect ratio type "${options.type}"`);
  }
}
