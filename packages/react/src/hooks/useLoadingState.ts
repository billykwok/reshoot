import { useState } from 'react';
import { MANUAL, OFFLINE, LOADING, LOADED } from '../state';
import notUndefined from '../utils/notUndefined';
import { isCached } from '../utils/cache';

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
    if (isCached(src)) {
      return LOADED;
    }
    if (notUndefined(typeof navigator)) {
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
