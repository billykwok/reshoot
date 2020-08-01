import { useEffect } from 'react';
import { FADING } from '../state';
import { subscribe } from '../utils/intersection';
import SUPPORT_INTERSECTION_OBSERVER from '../utils/supportIntersectionObserver';

import type { RefObject } from 'react';
import type { State } from '../state';

const useIntersection = (
  ref: RefObject<Element>,
  state: State,
  download: () => void
): void =>
  useEffect(
    () =>
      SUPPORT_INTERSECTION_OBSERVER
        ? subscribe(ref.current, (entry: IntersectionObserverEntry) => {
            if (entry.isIntersecting && state < FADING && state) {
              download();
            }
          })
        : download(),
    [ref]
  );

export default useIntersection;
