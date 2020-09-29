import { useCallback } from 'react';
import { hasLoaded, hasFailed } from '../utils/cache';
import { ERROR, LOADING, LOADED } from '../state';

import type { Dispatch, SetStateAction } from 'react';
import type { State } from '../state';

export const useLoadImage = (
  setState: Dispatch<SetStateAction<State>>,
  src: string,
  download: () => void
): (() => void) =>
  useCallback(() => {
    if (hasLoaded(src)) {
      setState(() => LOADED);
    } else if (hasFailed(src)) {
      setState(() => ERROR);
    } else {
      setState(() => LOADING);
      download();
    }
  }, []);
