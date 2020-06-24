import type { SharpImage } from './createSharp';

async function resolveColor(
  image: SharpImage,
  color: string,
  disable: boolean
): Promise<string> {
  if (color) return color;
  if (disable) return 'transparent';
  return await image.color();
}

export default resolveColor;
