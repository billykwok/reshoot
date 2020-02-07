// TypeScript Version: 2.8
export interface ImageMeta {
  readonly src: string;
  readonly alt: string;
  readonly aspectRatio: number;
  readonly blur: number;
  readonly color: string;
  readonly placeholder: string;
  readonly srcSet: string;
  readonly [key: string | number | symbol]: any;
}

export default function reshoot<
  T extends Partial<ImageMeta> = Partial<ImageMeta>
>(path: string, options?: T): T & T[];
