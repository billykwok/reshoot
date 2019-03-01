// @flow
export type OutputShape = {
  src: string | false,
  aspectRatio: string | false,
  srcSet: string | false,
  placeholder: string | false,
  background: string | false,
  palette: string | false
};

export type AspectRatio = {
  type: 'widthByHeight' | 'heightByWidth',
  format: 'percent' | 'ratio',
  decimal: number
};

export type Placeholder = {
  size: number,
  trimDataUrl: boolean
};

export type Output = {
  src?: string,
  aspectRatio?: string,
  srcSet?: string,
  placeholder?: string,
  background?: string,
  palette?: string
};

export type Options = {
  name: string,
  outputPath: string | (() => string) | null,
  publicPath: string | (() => string) | null,
  context: string | (() => string) | null,
  shape: OutputShape,
  srcSet: Array<number>,
  quality: number,
  background: string,
  color:
    | 'Vibrant'
    | 'Muted'
    | 'DarkVibrant'
    | 'DarkMuted'
    | 'LightVibrant'
    | 'LightMuted'
    | string,
  forceFormat: string | false,
  placeholder: Placeholder,
  aspectRatio: AspectRatio,
  disable: boolean,
  emitFile: boolean
};
