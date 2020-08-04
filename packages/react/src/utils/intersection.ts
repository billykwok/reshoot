import noop from './noop';
import SUPPORT_INTERSECTION_OBSERVER from './supportIntersectionObserver';

type Handler = (entry: IntersectionObserverEntry) => void;

type Subscribe = (el: Element, handler: Handler) => () => void;

const subscribe = ((): Subscribe => {
  if (SUPPORT_INTERSECTION_OBSERVER) {
    const handlers = new WeakMap<Element, Handler>();
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => handlers.get(e.target)(e)),
      { rootMargin: '25% 0% 60%' }
    );
    return (element: Element, handler: Handler) => {
      if (element && !handlers.has(element)) {
        handlers.set(element, handler);
        observer.observe(element);
        return () => handlers.delete(element) && observer.unobserve(element);
      }
      return noop;
    };
  }
  return () => noop;
})();

export default subscribe;
