import { RefObject, useEffect } from 'react';

const handlers: WeakMap<
  Element,
  (entry: IntersectionObserverEntry) => void
> = new WeakMap();

const observer =
  typeof IntersectionObserver !== 'undefined' &&
  new IntersectionObserver(
    entries => entries.forEach(entry => handlers.get(entry.target)(entry)),
    { root: null, rootMargin: '-5% 0%' }
  );

const useIntersection = (
  ref: RefObject<Element>,
  handler: (entry: IntersectionObserverEntry) => void
) =>
  useEffect(() => {
    const el = ref.current;
    if (el && !handlers.has(el)) {
      handlers.set(el, entry => handler(entry));
      observer.observe(el);
    }
    return () => el && handlers.delete(el) && observer.unobserve(el);
  }, [ref]);

export default useIntersection;
