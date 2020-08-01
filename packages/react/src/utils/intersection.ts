import noop from './noop';
import SUPPORT_INTERSECTION_OBSERVER from './supportIntersectionObserver';

type Handler = (entry: IntersectionObserverEntry) => void;

type Subscribe = (el: Element, handler: Handler) => () => void;

type Unsubscribe = (el: Element) => void;

export const [subscribe, unsubscribe] = ((): [Subscribe, Unsubscribe] => {
  if (SUPPORT_INTERSECTION_OBSERVER) {
    const handlers = new WeakMap<Element, Handler>();
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => handlers.get(e.target)(e)),
      { rootMargin: '-5% 0%' }
    );
    const unsubscribe = (el: Element): void =>
      el && handlers.delete(el) && observer.unobserve(el);
    return [
      (el: Element, handler: Handler) => {
        if (el && !handlers.has(el)) {
          handlers.set(el, handler);
          observer.observe(el);
          return () => unsubscribe(el);
        }
        return noop;
      },
      unsubscribe,
    ];
  }
  return [() => noop, noop];
})();
