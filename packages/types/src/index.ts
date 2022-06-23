export enum AspectRatioType {
  WidthByHeight = 'widthByHeight',
  HeightByWidth = 'heightByWidth',
}

export enum AspectRatioFormat {
  Percent = 'percent',
  Ratio = 'ratio',
}

export type CoreOptions = {
  color: string;
  placeholderSize: number;
  placeholderQuality: number;
  aspectRatioType: AspectRatioType;
  aspectRatioFormat: AspectRatioFormat;
  aspectRatioDecimal: number;
  [key: string]: any;
};

export type InlineOptions = {
  color: string;
  maxWidth: number;
};

export type CoreImageMeta = {
  hash: string;
  placeholder: string;
  width: number;
  height: number;
  aspectRatio: number;
  color: string;
};

export type ImageMeta = {
  placeholder?: string;
  srcSet?: string;
  sizes?: string;
  aspectRatio: number;
  color: string;
  src: string;
};
