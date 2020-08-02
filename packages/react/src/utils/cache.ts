const srcs = new Set<string>();

export const cache = (value: string): void => {
  if (srcs.size > 99) {
    srcs.delete(srcs.values().next().value);
  }
  srcs.add(value);
};

export const isCached = (value: string): boolean => srcs.has(value);
