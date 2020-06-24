const handlers: WeakMap<
  Element,
  (entry: IntersectionObserverEntry) => void
> = new WeakMap();

const f = () => 0;

const observer =
  typeof IntersectionObserver !== 'undefined' &&
  new IntersectionObserver(
    (entries) => entries.forEach((e) => (handlers.get(e.target) || f)(e)),
    { rootMargin: '-5% 0%' }
  );

export const subscribe = (
  el: Element,
  handler: (entry: IntersectionObserverEntry) => void
): void => {
  if (el && !handlers.has(el)) {
    handlers.set(el, handler);
    observer.observe(el);
  }
};

export const unsubscribe = (el: Element): void =>
  el && handlers.delete(el) && observer.unobserve(el);
