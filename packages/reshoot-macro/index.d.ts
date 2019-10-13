declare type reshoot = (
  path: string,
  options?: {
    src?: string;
    alt?: string;
    aspectRatio?: number;
    blur?: number;
    color?: string;
    placeholder?: string;
    srcSet?: string;
  }
) => {
  src: string;
  alt: string;
  aspectRatio: number;
  blur: number;
  color: string;
  placeholder: string;
  srcSet: string;
};

export default reshoot;
