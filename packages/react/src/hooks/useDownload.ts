import useCallback from './useCallback';

import type { SyntheticEvent } from 'react';

const useDownload = (
  src: string,
  srcSet: string | false,
  onLoad: () => void,
  onError: (event: Event | SyntheticEvent | string) => void
): (() => Promise<void>) =>
  useCallback(() => {
    const image = new Image();
    if (!image.decode) {
      image.onload = onLoad;
      image.onerror = onError;
    }
    if (srcSet) {
      image.srcset = srcSet;
    }
    image.src = src;
    if (image.decode) {
      return image.decode().then(onLoad).catch(onError);
    }
  }, []);

export default useDownload;
