import { type CoreImageMeta, type CoreOptions } from '@reshoot/types';

export type Field =
  | string
  | number
  | boolean
  | ((...args: unknown[]) => unknown)
  | { [key: string]: Field }
  | Field[];

export type LoaderImageMeta = CoreImageMeta & { src: string };

export type LoaderOptions = {
  meta: CoreOptions;
  shape: (output: LoaderImageMeta, resourcePath: string) => Field;
  maxWidth: number;
  filename: string;
  outputPath: string | ((path: string) => string);
  publicPath: string | ((filename: string) => string);
  emitFile: boolean;
  esModule: boolean;
};
