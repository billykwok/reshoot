import { useState } from 'react';
import { MANUAL, OFFLINE, ERROR, LOADING, LOADED } from '../state';
import notUndefined from '../utils/notUndefined';
import { hasLoaded, hasFailed } from '../utils/cache';

import type { Dispatch, SetStateAction } from 'react';
import type { State } from '../state';

declare global {
  interface Navigator {
    connection: { effectiveType: string };
  }
}

const useLoadingState = (
  overriddenState: State,
  src: string
): Readonly<[State, Dispatch<SetStateAction<State>>]> => {
  const [_state, setState] = useState<State>(() => {
    if (hasLoaded(src)) {
      return LOADED;
    } else if (hasFailed(src)) {
      return ERROR;
    } else if (notUndefined(typeof navigator)) {
      const n = navigator;
      const c = n.connection;
      if (notUndefined(typeof c)) {
        const et = c.effectiveType;
        if (notUndefined(typeof et) && et.indexOf('2g') > -1) {
          return MANUAL;
        }
      }
      const onLine = n.onLine;
      if (notUndefined(typeof onLine) && !onLine) {
        return OFFLINE;
      }
    }
    return LOADING;
  });
  return [overriddenState === null ? _state : overriddenState, setState];
};

export default useLoadingState;
