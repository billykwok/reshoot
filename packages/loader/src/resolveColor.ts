import { SharpImage } from './createSharp';

async function resolveColor(
  image: SharpImage,
  color: string,
  disable: boolean
) {
  if (/^#(?:[0-9a-f]{3}){1,2}$/i.test(color)) return color;
  if (disable) return 'transparent';
  if (!color) return '#fff';
  return await image.color();
}

export default resolveColor;
