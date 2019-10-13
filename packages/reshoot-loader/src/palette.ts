import Vibrant from 'node-vibrant';

import Mimes from './mimes';

enum PalettePreset {
  Vibrant = 'Vibrant',
  Muted = 'Muted',
  DarkVibrant = 'DarkVibrant',
  DarkMuted = 'DarkMuted',
  LightVibrant = 'LightVibrant',
  LightMuted = 'LightMuted'
}

const validPalettePresets = Object.keys(PalettePreset);

const supportedMimes: Mimes[] = [Mimes.JPG, Mimes.JPEG, Mimes.PNG];

export default async function palette(
  mime: Mimes,
  color: PalettePreset | string,
  imagePath: string,
  disable: boolean
) {
  if (disable) {
    if (validPalettePresets.indexOf(color) < 0) return color;
    return 'transparent';
  } else if (!color) {
    return '#fff';
  } else if (
    supportedMimes.indexOf(mime) > -1 &&
    validPalettePresets.indexOf(color) > -1
  ) {
    return await Vibrant.from(imagePath)
      .getPalette()
      .then(palette => palette[color].hex);
  }
  return color;
}
