import { RefObject, useEffect } from 'react';

const useIntersection = (
  ref: RefObject<HTMLElement>,
  handler: (entries: IntersectionObserverEntry[]) => void,
  options: IntersectionObserverInit
) =>
  useEffect(() => {
    if (ref.current) {
      const observer = new IntersectionObserver(handler, options);
      observer.observe(ref.current);
      return () => ref.current && observer.disconnect();
    }
  }, [ref, options.threshold, options.root, options.rootMargin]);

export default useIntersection;
