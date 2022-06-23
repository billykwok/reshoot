import sharp from 'sharp';
import {
  AspectRatioFormat,
  AspectRatioType,
  type CoreOptions,
  type CoreImageMeta,
} from '@reshoot/types';
import { generateHash } from './hash';
import {
  resolveAspectRatio,
  resolveColor,
  resolvePlaceholder,
} from './resolve';

export const DEFAULT_OPTIONS: CoreOptions = Object.freeze({
  color: null,
  maxWidth: Infinity,
  placeholderSize: 8,
  placeholderQuality: 10,
  aspectRatioType: AspectRatioType.HeightByWidth,
  aspectRatioFormat: AspectRatioFormat.Percent,
  aspectRatioDecimal: 4,
});

export async function extractMeta(
  content: Buffer,
  options: Partial<CoreOptions> & Record<string, any> = {}
): Promise<CoreImageMeta> {
  const mergedOptions: CoreOptions = { ...DEFAULT_OPTIONS, ...options };

  const image = sharp(content);
  const [metadata, placeholder, color] = await Promise.all([
    image.metadata(),
    resolvePlaceholder(image, mergedOptions),
    resolveColor(image, options.color),
  ]);

  return {
    hash: generateHash(content, mergedOptions),
    width: metadata.width,
    height: metadata.height,
    aspectRatio: resolveAspectRatio(metadata, mergedOptions),
    placeholder,
    color,
  };
}

export {
  AspectRatioFormat,
  AspectRatioType,
  type CoreImageMeta,
  type CoreOptions,
} from '@reshoot/types';
