import { useRef, useImperativeHandle, useCallback, useEffect } from 'react';
import { subscribe, unsubscribe } from '../utils/intersection';
import SUPPORT_INTERSECTION_OBSERVER from '../utils/supportIntersectionObserver';

import type { Ref, MutableRefObject, RefCallback } from 'react';

export const useIntersection = (
  ref: MutableRefObject<HTMLElement>,
  loadImage: () => void
): Ref<HTMLElement> => {
  /* eslint-disable react-hooks/rules-of-hooks */
  if (SUPPORT_INTERSECTION_OBSERVER) {
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
            entry.intersectionRatio > 0 && loadImage()
        );
      }
      innerRef.current = newRef;
    }, []);
  }
  useEffect(loadImage, []);
  return ref;
  /* eslint-enable react-hooks/rules-of-hooks */
};
