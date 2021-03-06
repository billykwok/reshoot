import { useState } from 'react';
import { MANUAL, OFFLINE, ERROR, LOADING, LOADED } from '../state';
import notUndefined from '../utils/notUndefined';
import { hasLoaded, hasFailed } from '../utils/cache';

import type { Dispatch, SetStateAction } from 'react';
import type { State } from '../state';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
declare global {
  interface Navigator {
    connection: { effectiveType: string };
  }
}

export const useLoadingState = (
  key: string,
  overriddenState: State
): [State, Dispatch<SetStateAction<State>>] => {
  const [_state, setState] = useState<State>(() => {
    if (hasLoaded(key)) {
      return LOADED;
    } else if (hasFailed(key)) {
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
