import isServer from './isServer';
import { getCache } from './cache';
import State from './state';

declare global {
  interface Navigator {
    connection: { effectiveType: string };
  }
}

const deriveInitialState = (src: string): State => {
  if (isServer || getCache(src)) return State.LOADED;
  const n = navigator;
  const support = typeof n !== 'undefined';
  const connection = support && n.connection;
  if (connection && connection.effectiveType.indexOf('2g') > -1) {
    return State.MANUAL;
  }
  if (support && 'onLine' in n && !n.onLine) {
    return State.OFFLINE;
  }
  return State.INITIAL;
};

export default deriveInitialState;
