import { FADING, ERROR } from '../state';
import useCallback from './useCallback';
import { unsubscribe } from '../utils/intersection';
import noop from '../utils/noop';
import SUPPORT_SESSION_STORAGE from '../utils/supportSessionStorage';

import type {
  RefObject,
  Dispatch,
  SetStateAction,
  SyntheticEvent,
} from 'react';
import type { State } from '../state';

const useImageCallback = (
  ref: RefObject<HTMLElement>,
  src: string,
  state: State,
  setState: Dispatch<SetStateAction<State>>,
  onLoad: () => void = noop,
  onError: (event: Event | SyntheticEvent | string) => void = noop
): Readonly<[() => void, (event: Event | SyntheticEvent | string) => void]> => [
  useCallback(() => {
    if (state < FADING) {
      try {
        SUPPORT_SESSION_STORAGE && sessionStorage.setItem(src, 'y');
      } catch (e) {
        // continue regardless of error
      }
      setState(() => FADING);
      unsubscribe(ref.current);
      onLoad();
    }
  }, []),
  useCallback((event: Event | SyntheticEvent | string) => {
    if (state !== ERROR) {
      setState(() => ERROR);
      unsubscribe(ref.current);
      onError(event);
    }
  }, []),
];

export default useImageCallback;
