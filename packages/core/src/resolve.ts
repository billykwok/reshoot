import color from 'color';
import {
  AspectRatioFormat,
  AspectRatioType,
  type CoreOptions,
} from '@reshoot/types';
import { type Sharp } from 'sharp';

export function resolveAspectRatio(
  { width, height }: { width?: number; height?: number },
  {
    aspectRatioType,
    aspectRatioFormat,
    aspectRatioDecimal,
  }: Pick<
    CoreOptions,
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

export async function resolvePlaceholder(
  image: Sharp,
  {
    placeholderSize,
    placeholderQuality,
  }: Pick<CoreOptions, 'placeholderSize' | 'placeholderQuality'>
): Promise<string> {
  return (
    'data:image/png;base64,' +
    (
      await image
        .resize({
          fit: 'inside',
          width: placeholderSize,
          height: placeholderSize,
          withoutEnlargement: true,
        })
        .png({
          compressionLevel: 9,
          quality: placeholderQuality,
          palette: true,
          colors: 16,
        })
        .toBuffer()
    ).toString('base64')
  );
}

export async function resolveColor(
  image: Sharp,
  colorOptions: string
): Promise<string> {
  return colorOptions
    ? colorOptions === 'transparent'
      ? colorOptions
      : colorOptions.toLowerCase()
    : color((await image.stats()).dominant)
        .hex()
        .toLocaleLowerCase();
}
