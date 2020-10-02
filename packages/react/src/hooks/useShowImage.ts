import { useCallback } from '../utils/mini';
import { hasLoaded, hasFailed } from '../utils/cache';
import { ERROR, LOADING, LOADED } from '../state';

import type { Dispatch, SetStateAction } from 'react';
import type { State } from '../state';

export const useShowImage = (
  key: string,
  setState: Dispatch<SetStateAction<State>>
): (() => void) =>
  useCallback(
    () =>
      setState(() =>
        hasLoaded(key) ? LOADED : hasFailed(key) ? ERROR : LOADING
      ),
    [key]
  );
