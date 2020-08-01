import useCallback from './useCallback';

import type { SyntheticEvent } from 'react';

const useDownload = (
  src: string,
  srcSet: string | false,
  [onLoad, onError]: Readonly<
    [() => void, (event: Event | SyntheticEvent | string) => void]
  >
): (() => void) =>
  useCallback(() => {
    const image = new Image();
    image.onload = onLoad;
    image.onerror = onError;
    if (srcSet) {
      image.srcset = srcSet;
    }
    image.src = src;
  }, []);

export default useDownload;
