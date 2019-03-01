// @flow
import * as Vibrant from 'node-vibrant';

const palettePresets = [
  'Vibrant',
  'Muted',
  'DarkVibrant',
  'DarkMuted',
  'LightVibrant',
  'LightMuted'
];

export default async function palette(color: string, imagePath: string) {
  if (!color) return Promise.reject(new Error('Invalid color: ' + color));
  if (color.match(/^#([0-9a-f]{3}){1,2}$/i)) return Promise.resolve(color);
  if (!palettePresets.includes(color)) return Promise.resolve(null);
  return Vibrant.from(imagePath)
    .getPalette()
    .then(palette => palette[color].hex);
}
