import { useState } from 'react';
import { LOADED, MANUAL, OFFLINE, INITIAL } from '../state';
import notUndefined from '../utils/notUndefined';
import SUPPORT_SESSION_STORAGE from '../utils/supportSessionStorage';

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
    if (SUPPORT_SESSION_STORAGE && sessionStorage.getItem(src)) {
      return LOADED;
    }
    const n = navigator;
    const support = notUndefined(typeof n);
    const connection = support && n.connection;
    if (
      connection &&
      connection.effectiveType &&
      connection.effectiveType.indexOf('2g') > -1
    ) {
      return MANUAL;
    }
    if (support && 'onLine' in n && !n.onLine) {
      return OFFLINE;
    }
    return INITIAL;
  });
  return [overriddenState === null ? _state : overriddenState, setState];
};

export default useLoadingState;
