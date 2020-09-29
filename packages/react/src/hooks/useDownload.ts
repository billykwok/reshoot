import { useCallback } from 'react';
import { FADING, ERROR } from '../state';
import { cacheLoaded, cacheFailed } from '../utils/cache';
import noop from '../utils/noop';

import type { SyntheticEvent, Dispatch, SetStateAction } from 'react';
import type { State } from '../state';

export const useDownload = (
  setState: Dispatch<SetStateAction<State>>,
  src: string,
  srcSet: string | false,
  onLoad: () => void = noop,
  onError: (event: Event | SyntheticEvent | string) => void = noop
): (() => void) =>
  useCallback(() => {
    const image = new Image();
    image.onload = () => {
      cacheLoaded(src);
      setState(() => FADING);
      onLoad();
    };
    image.onerror = (event: Event | string) => {
      cacheFailed(src);
      setState(() => ERROR);
      onError(event);
    };
    if (srcSet) {
      image.srcset = srcSet;
    }
    image.src = src;
  }, []);
