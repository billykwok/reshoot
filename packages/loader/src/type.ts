export enum Mime {
  JPG = 'image/jpeg',
  JPEG = 'image/jpeg',
  PNG = 'image/png',
  GIF = 'image/gif',
  WEBP = 'image/webp',
  AVIF = 'image/avif',
  SVG = 'image/svg+xml',
}

export enum Extension {
  'image/jpeg' = 'jpg',
  'image/png' = 'png',
  'image/gif' = 'gif',
  'image/webp' = 'webp',
  'image/avif' = 'avif',
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

export type Stringifiable<T> = T & { stringify: () => string };

export type Field =
  | string
  | number
  | boolean
  | ((...args: unknown[]) => unknown)
  | Stringifiable<unknown>
  | { [key: string]: Field }
  | Field[];

export interface LoaderContext {
  rootContext: string;
  mode: string;
  resourcePath: string;
  resourceQuery: string;
  cacheable: (value: boolean) => void;
  async: () => (error: Error, output?: any) => void;
  emitFile: (
    filename: string,
    content: string | Buffer,
    sourceMap?: string
  ) => void;
  emitWarning: (error: string | Error) => void;
}

export interface Result {
  id: string;
  type: string;
  src: string;
  width: number;
  height: number;
  srcSet: [string, number][];
  aspectRatio: number;
  placeholder: string;
  color: string;
  sources: { type: string; srcSet: [string, number][] }[];
}

export type ShapeArgument = {
  id: string;
  type: string;
  src: string;
  width: number;
  height: number;
  srcSet: Stringifiable<[string, number][]>;
  aspectRatio: number;
  placeholder: string;
  color: string;
  sources: { type: string; srcSet: Stringifiable<[string, number][]> }[];
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
  alternativeFormats: Mime[];
  alternativeWidths: number[];
  defaultFormat: Mime;
  defaultWidth: number;
  background: string;
  color: string | boolean;
  placeholderSize: number;
  placeholderQuality: number;
  placeholderTrimDataUrl: boolean;
  aspectRatioType: AspectRatioType;
  aspectRatioFormat: AspectRatioFormat;
  aspectRatioDecimal: number;
}

export interface QueryOptions {
  name?: string;
  fastMode?: string;
  cache?: string;
  emitFile?: string;
  esModule?: string;
  quality?: string;
  alternativeFormats?: Mime[];
  alternativeWidths?: string[];
  defaultFormat?: Mime;
  defaultWidth?: string;
  background?: string;
  color?: string;
  placeholderSize?: string;
  placeholderQuality?: string;
  placeholderTrimDataUrl?: string;
  aspectRatioType?: AspectRatioType;
  aspectRatioFormat?: AspectRatioFormat;
  aspectRatioDecimal?: string;
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
