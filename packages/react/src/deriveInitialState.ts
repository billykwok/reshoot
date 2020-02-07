import isServer from './isServer';
import { getCache } from './cache';
import State from './state';

const deriveInitialState = (src: string): State => {
  if (isServer || getCache(src)) return State.LOADED;
  const support = typeof navigator !== 'undefined';
  const connection = support && navigator['connection'];
  if (connection && connection.effectiveType.indexOf('2g') > -1) {
    return State.MANUAL;
  }
  if (support && 'onLine' in navigator && !navigator.onLine) {
    return State.OFFLINE;
  }
  return State.INITIAL;
};

export default deriveInitialState;
