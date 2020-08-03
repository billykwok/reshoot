import notUndefined from './notUndefined';

export const [cacheLoaded, cacheFailed, hasLoaded, hasFailed] = ((): [
  (value: string) => void,
  (value: string) => void,
  (value: string) => boolean,
  (value: string) => boolean
] => {
  const failed = new Set<string>();
  const cacheMemory = (cache: Set<string>, value: string): void => {
    if (cache.size > 99) {
      cache.delete(cache.values().next().value);
    }
    cache.add(value);
  };
  const deleteFailed = (value: string) => failed.delete(value);
  const isFailed = (value: string): boolean => failed.has(value);
  if (notUndefined(typeof sessionStorage)) {
    const ss = sessionStorage;
    return [
      (value: string) => {
        deleteFailed(value);
        try {
          ss.setItem(value, '1');
        } catch (e) {
          console.debug(e);
        }
      },
      (value: string) => {
        ss.removeItem(value);
        cacheMemory(failed, value);
      },
      (value: string) => ss.getItem(value) === '1',
      isFailed,
    ];
  }
  const loaded = new Set<string>();
  return [
    (value: string) => {
      deleteFailed(value);
      cacheMemory(loaded, value);
    },
    (value: string) => {
      loaded.delete(value);
      cacheMemory(failed, value);
    },
    (value: string) => loaded.has(value),
    isFailed,
  ];
})();
