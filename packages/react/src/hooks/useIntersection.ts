import { useEffect } from 'react';
import { LOADED, MANUAL } from '../state';
import { subscribe } from '../utils/intersection';
import noop from '../utils/noop';
import SUPPORT_INTERSECTION_OBSERVER from '../utils/supportIntersectionObserver';

import type { RefObject } from 'react';
import type { State } from '../state';

const useIntersection = (
  ref: RefObject<Element>,
  state: State,
  nativeLazyLoading: boolean,
  download: () => Promise<void>
): void =>
  useEffect(
    nativeLazyLoading
      ? noop
      : () =>
          subscribe(ref.current, (entry: IntersectionObserverEntry) => {
            if (entry.isIntersecting && state !== LOADED && state !== MANUAL) {
              download();
            }
          }),
    [ref]
  );

export default SUPPORT_INTERSECTION_OBSERVER ? useIntersection : noop;
