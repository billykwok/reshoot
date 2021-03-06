import { createMacro } from 'babel-plugin-macros';

import handle from './handle';

type ImageData = Readonly<{
  id: string;
  type: string;
  src: string;
  srcSet: string;
  sources: Readonly<{ type: string; srcSet: string }>[];
  width: number;
  height: number;
  aspectRatio: number;
  color: string;
  placeholder: string;
  [key: string]: unknown;
}>;

export default createMacro(handle) as <T = ImageData>(
  path: string,
  options?: Readonly<
    Partial<{
      name: string;
      outputPath: string | ((filename: string) => string);
      publicPath: string | ((filename: string) => string);
      alternativeFormats: 'image/webp'[];
      alternativeWidths: number[];
      defaultFormat: 'image/jpeg' | 'image/png' | 'image/webp';
      defaultWidth: number;
      quality: number;
      background: string;
      color: string;
      placeholderSize: number;
      placeholderQuality: number;
      placeholderTrimDataUrl: boolean;
      aspectRatioType: 'widthByHeight' | 'heightByWidth';
      aspectRatioFormat: 'ratio' | 'percent';
      aspectRatioDecimal: number;
      fastMode: boolean;
      cache: boolean;
      emitFile: boolean;
      esModule: boolean;
      [key: string]: unknown;
    }>
  >
) => T;
