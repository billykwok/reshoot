import { useEffect } from 'react';

const useLazyImage = (
  src: string,
  srcSet: string,
  sizes: string,
  onLoad: (e: Event) => any,
  onError: (e: Event) => any
): void =>
  useEffect(() => {
    const image = new Image();
    image.onerror = onError;
    image.onload = onLoad;
    image.crossOrigin = '';
    if (sizes) {
      image.sizes = sizes;
    }
    if (srcSet) {
      image.srcset = srcSet;
    }
    image.src = src;
  }, []);

export default useLazyImage;
