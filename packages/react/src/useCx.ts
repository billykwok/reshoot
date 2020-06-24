import { useCallback } from 'react';

const useCx = (className: string): ((...cls: string[]) => string) =>
  useCallback(
    (...cls: string[]) => (className ? cls.concat(className) : cls).join(' '),
    [className]
  );

export default useCx;
