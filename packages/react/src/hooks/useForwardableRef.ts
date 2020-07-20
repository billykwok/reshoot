import { useRef, useImperativeHandle } from 'react';

import type { RefObject } from 'react';

const useForwardableRef = <T>(ref: RefObject<T>): RefObject<T> => {
  const innerRef = useRef<T>(null);
  useImperativeHandle(ref, () => innerRef.current, [innerRef]);
  return innerRef;
};

export default useForwardableRef;
