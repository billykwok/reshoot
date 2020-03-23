const handlers: WeakMap<
  Element,
  (entry: IntersectionObserverEntry) => void
> = new WeakMap();

const observer =
  typeof IntersectionObserver !== 'undefined' &&
  new IntersectionObserver(
    (entries) => entries.forEach((entry) => handlers.get(entry.target)(entry)),
    { rootMargin: '-5% 0%' }
  );

export const subscribe = (
  el: Element,
  handler: (entry: IntersectionObserverEntry) => void
) => {
  if (el && !handlers.has(el)) {
    handlers.set(el, handler);
    observer.observe(el);
  }
};

export const unsubscribe = (el: Element) =>
  el && handlers.delete(el) && observer.unobserve(el);
