import { useCallback } from 'react';

const useCx = (className: string) =>
  useCallback(
    (...cls: string[]) => (className ? cls.concat(className) : cls).join(' '),
    [className]
  );

export default useCx;
