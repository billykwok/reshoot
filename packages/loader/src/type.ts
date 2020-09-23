export enum Mime {
  JPG = 'image/jpeg',
  JPEG = 'image/jpeg',
  PNG = 'image/png',
  GIF = 'image/gif',
  WEBP = 'image/webp',
  SVG = 'image/svg+xml',
}

export enum Extension {
  'image/jpeg' = 'jpg',
  'image/png' = 'png',
  'image/gif' = 'gif',
  'image/webp' = 'webp',
  'image/svg+xml' = 'svg',
}

export enum AspectRatioType {
  WidthByHeight = 'widthByHeight',
  HeightByWidth = 'heightByWidth',
}

export enum AspectRatioFormat {
  Percent = 'percent',
  Ratio = 'ratio',
}

export interface AspectRatio {
  type: AspectRatioType;
  format: AspectRatioFormat;
  decimal: number;
}

export interface Placeholder {
  size: number;
  quality: number;
  trimDataUrl: boolean;
}

export type Stringifiable<T> = T & { stringify: () => string };

export type Field =
  | string
  | number
  | boolean
  | ((...args: unknown[]) => unknown)
  | Stringifiable<unknown>
  | { [key: string]: Field }
  | Field[];

export interface Result {
  type: string;
  src: string;
  width: number;
  height: number;
  srcSet: [string, number][];
  aspectRatio: number;
  placeholder: string;
  color: string;
  sources: {
    type: string;
    src: string;
    srcSet: [string, number][];
  }[];
}

export type ShapeArgument = {
  type: string;
  src: string;
  width: number;
  height: number;
  srcSet: Stringifiable<[string, number][]>;
  aspectRatio: number;
  placeholder: string;
  color: string;
  sources: {
    type: string;
    src: string;
    srcSet: Stringifiable<[string, number][]>;
  }[];
};

export interface CacheEntry {
  output: string;
  filenames: string[];
}

interface BaseOptions {
  name: string;
  fastMode: boolean;
  cache: boolean;
  emitFile: boolean;
  esModule: boolean;
  shape: (output: ShapeArgument) => Field;
  quality: number;
  srcSet: number[];
  sources: Mime[];
  background: string;
  color: string;
  enforceFormat: Mime;
  placeholder: Placeholder;
  aspectRatio: AspectRatio;
}

export interface Options extends BaseOptions {
  outputPath: string | ((path: string) => string);
  publicPath: string | ((filename: string) => string);
}

export interface ResolvedOptions extends BaseOptions {
  mode: string;
  outputPath: (path: string) => string;
  publicPath: (filename: string) => string;
}
