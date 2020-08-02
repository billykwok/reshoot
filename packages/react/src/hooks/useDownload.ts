import { useCallback } from 'react';
import { FADING, ERROR } from '../state';
import { cache } from '../utils/cache';
import noop from '../utils/noop';

import type { SyntheticEvent, Dispatch, SetStateAction } from 'react';
import type { State } from '../state';

const useDownload = (
  setState: Dispatch<SetStateAction<State>>,
  src: string,
  srcSet: string | false,
  onLoad: () => void = noop,
  onError: (event: Event | SyntheticEvent | string) => void = noop
): (() => void) =>
  useCallback(() => {
    const image = new Image();
    image.onload = () => {
      cache(src);
      setState(() => FADING);
      onLoad();
    };
    image.onerror = (event: Event | string) => {
      setState(() => ERROR);
      onError(event);
    };
    if (srcSet) {
      image.srcset = srcSet;
    }
    image.src = src;
  }, []);

export default useDownload;
