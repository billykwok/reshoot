// @flow
import * as Vibrant from 'node-vibrant';

import mimes from './mimes';

const palettePresets = [
  'Vibrant',
  'Muted',
  'DarkVibrant',
  'DarkMuted',
  'LightVibrant',
  'LightMuted'
];

const supportedMimes = [mimes.jpg, mimes.png];

export default async function palette(
  mime: string,
  color: string,
  imagePath: string,
  disable: boolean
) {
  if (disable) {
    return 'transparent';
  }
  if (!color) {
    return '#fff';
  }
  if (supportedMimes.indexOf(mime) > -1 && palettePresets.indexOf(color) > -1) {
    return await Vibrant.from(imagePath)
      .getPalette()
      .then(palette => palette[color].hex);
  }
  return color;
}
