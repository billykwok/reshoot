export type OutputShape = {
  mime: string | false;
  src: string | false;
  aspectRatio: string | false;
  srcSet: string | false;
  placeholder: string | false;
  color: string | false;
  [key: string]: any;
};

export enum AspectRatioType {
  WidthByHeight = 'widthByHeight',
  HeightByWidth = 'heightByWidth',
}

export enum AspectRatioFormat {
  Percent = 'percent',
  Ratio = 'ratio',
}

export type AspectRatio =
  | number
  | {
      type: AspectRatioType;
      format: AspectRatioFormat;
      decimal: number;
    };

export type Placeholder = {
  size: number;
  trimDataUrl: boolean;
};

export type InternalOutput = {
  mime: string;
  src?: string;
  width?: number;
  height?: number;
  srcSet?: string[];
  aspectRatio?: number;
  placeholder?: string;
  color?: string;
};

export type Output = Partial<{
  mime: string;
  src: string;
  width: number;
  height: number;
  srcSet: string;
  aspectRatio: number;
  placeholder: string;
  color: string;
}>;

export type Options = {
  name: string;
  outputPath: string | ((path: string) => string) | null;
  publicPath: string | ((path: string) => string) | null;
  shape: OutputShape;
  srcSet: Array<number>;
  quality: number;
  background: string;
  color: string;
  enforceFormat: string | false;
  placeholder: Placeholder;
  aspectRatio: AspectRatio;
  disable: boolean;
  cache: boolean;
  emitFile: boolean;
  esModule: boolean;
};
