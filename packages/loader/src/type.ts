export type OutputShape = {
  mime: string;
  src: string | false;
  aspectRatio: string | false;
  srcSet: string | false;
  placeholder: string | false;
  color: string | false;
};

export enum AspectRatioType {
  WidthByHeight = 'widthByHeight',
  HeightByWidth = 'heightByWidth'
}

export enum AspectRatioFormat {
  Percent = 'percent',
  Ratio = 'ratio'
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
  aspectRatio?: number;
  srcSet?: string[];
  placeholder?: string;
  color?: string;
};

export type Output = {
  mime: string;
  src?: string;
  aspectRatio?: number;
  srcSet?: string;
  placeholder?: string;
  color?: string;
};

export type Options = {
  name: string;
  outputPath: string | ((path: string) => string) | null;
  publicPath: string | ((path: string) => string) | null;
  context: string;
  shape: OutputShape;
  srcSet: Array<number>;
  quality: number;
  background: string;
  color:
    | 'Vibrant'
    | 'Muted'
    | 'DarkVibrant'
    | 'DarkMuted'
    | 'LightVibrant'
    | 'LightMuted'
    | string;
  forceFormat: string | false;
  placeholder: Placeholder;
  aspectRatio: AspectRatio;
  disable: boolean;
  emitFile: boolean;
};
