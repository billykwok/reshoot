import { useEffect } from 'react';
import { ERROR, HIDDEN, LOADING, LOADED } from '../state';
import subscribe from '../utils/intersection';
import { hasLoaded, hasFailed } from '../utils/cache';
import SUPPORT_INTERSECTION_OBSERVER from '../utils/supportIntersectionObserver';

import type { RefObject, Dispatch, SetStateAction } from 'react';
import type { State } from '../state';

const useIntersection = (
  ref: RefObject<Element>,
  setState: Dispatch<SetStateAction<State>>,
  src: string,
  download: () => void
): void =>
  useEffect(
    () =>
      SUPPORT_INTERSECTION_OBSERVER
        ? subscribe(ref.current, (entry: IntersectionObserverEntry) => {
            if (entry.intersectionRatio > 0) {
              if (hasLoaded(src)) {
                setState(() => LOADED);
              } else if (hasFailed(src)) {
                setState(() => ERROR);
              } else {
                setState(() => LOADING);
                download();
              }
            } else {
              setState(() => HIDDEN);
            }
          })
        : download(),
    [ref]
  );

export default useIntersection;
