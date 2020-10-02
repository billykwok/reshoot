import { useRef, useImperativeHandle, useEffect } from 'react';
import { subscribe, unsubscribe } from '../utils/intersection';
import { useCallback } from '../utils/mini';
import SUPPORT_LAZY_LOADING from '../utils/supportLazyLoading';
import SUPPORT_INTERSECTION_OBSERVER from '../utils/supportIntersectionObserver';

import type { Ref, MutableRefObject, RefCallback } from 'react';

export const useIntersection = (
  ref: MutableRefObject<HTMLElement>,
  showImage: () => void
): Ref<HTMLElement> => {
  /* eslint-disable react-hooks/rules-of-hooks */
  if (!SUPPORT_LAZY_LOADING && SUPPORT_INTERSECTION_OBSERVER) {
    const innerRef = useRef<HTMLElement>(null);
    useImperativeHandle(ref, () => innerRef.current);
    return useCallback<RefCallback<HTMLElement>>((newRef: HTMLElement) => {
      const oldRef = innerRef.current;
      if (oldRef) {
        unsubscribe(oldRef);
      }
      if (newRef) {
        subscribe(
          newRef,
          (entry: IntersectionObserverEntry) =>
            entry.intersectionRatio > 0 && showImage()
        );
      }
      innerRef.current = newRef;
    }, []);
  }
  useEffect(showImage, []);
  return ref;
  /* eslint-enable react-hooks/rules-of-hooks */
};
