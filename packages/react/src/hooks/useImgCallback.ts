import { LOADED, ERROR } from '../state';
import useCallback from './useCallback';
import { unsubscribe } from '../utils/intersection';
import noop from '../utils/noop';

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
    if (state !== LOADED) {
      try {
        sessionStorage.setItem(src, 'y');
      } catch (e) {
        // continue regardless of error
      }
      setState(() => LOADED);
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
