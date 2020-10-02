import { useMemo } from 'react';

export const useKey = (
  src: string,
  srcSet: string,
  sources: { srcSet: string }[]
): string =>
  useMemo(
    () => src + ',' + srcSet + ',' + sources.map(({ srcSet }) => srcSet).join(),
    [src, srcSet, sources]
  );
