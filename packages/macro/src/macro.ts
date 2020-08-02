import { createMacro } from 'babel-plugin-macros';

import handle from './handle';

export default createMacro(handle) as (
  path: string,
  options: Readonly<
    Partial<{
      name: string;
      outputPath: string | ((filename: string) => string);
      publicPath: string | ((filename: string) => string);
      shape: {
        mime: string | boolean;
        src: string | boolean;
        width: string | boolean;
        height: string | boolean;
        srcSet: string | boolean;
        aspectRatio: string | boolean;
        placeholder: string | boolean;
        color: string | boolean;
      };
      srcSet: number[];
      quality: number;
      background: string;
      color: string;
      enforceFormat: string | false;
      placeholder: { size: number; trimDataUrl: boolean };
      aspectRatio: {
        type: 'widthByHeight' | 'heightByWidth';
        format: 'ratio' | 'percent';
        decimal: number;
      };
      disable: boolean;
      cache: boolean;
      emitFile: boolean;
      esModule: boolean;
      [key: string]: unknown;
    }>
  >
) => Readonly<
  Partial<{
    src: string;
    width: number;
    height: number;
    aspectRatio: number;
    srcSet: string;
    alt: string;
    color: string;
    placeholder: string;
    [key: string]: unknown;
  }>
>;
