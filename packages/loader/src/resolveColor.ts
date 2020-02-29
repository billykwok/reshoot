import { SharpImage } from './createSharp';

async function resolveColor(
  image: SharpImage,
  color: string,
  disable: boolean
) {
  if (color) return color;
  if (disable) return 'transparent';
  return await image.color();
}

export default resolveColor;
