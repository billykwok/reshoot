// TypeScript Version: 2.8
export default function reshoot(
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
): {
  src: string;
  alt: string;
  aspectRatio: number;
  blur: number;
  color: string;
  placeholder: string;
  srcSet: string;
};
