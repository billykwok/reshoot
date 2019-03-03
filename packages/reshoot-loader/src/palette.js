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
  imagePath: string
) {
  if (!color) {
    return Promise.resolve('#fff');
  }
  if (supportedMimes.indexOf(mime) > -1 && palettePresets.indexOf(color) > -1) {
    return Vibrant.from(imagePath)
      .getPalette()
      .then(palette => palette[color].hex);
  }
  return Promise.resolve(color);
}
