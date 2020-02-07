import { useState, useEffect, useCallback, RefObject } from 'react';
import deriveInitialState from './deriveInitialState';

import { setCache } from './cache';
import { subscribe, unsubscribe } from './intersection';
import State from './state';
import isServer from './isServer';

const useImage = (
  ref: RefObject<HTMLElement>,
  src: string,
  srcSet?: string
): [State, (arg: State | ((state: State) => State)) => void, () => void] => {
  const [state, setState] = useState(() => deriveInitialState(src));
  const download = useCallback(() => {
    const image = new Image();
    image.onload = () => {
      setCache(src);
      setState(() => State.LOADED);
      unsubscribe(ref.current);
    };
    image.onerror = () => {
      console.error('Failed to download ' + src);
      setState(() => State.ERROR);
      unsubscribe(ref.current);
    };
    srcSet && (image.srcset = srcSet);
    image.src = src;
  }, []);
  useEffect(() => {
    subscribe(
      ref.current,
      (entry: IntersectionObserverEntry) =>
        isServer ||
        (entry && !entry.isIntersecting) ||
        state === State.LOADED ||
        state === State.MANUAL ||
        download()
    );
    return () => unsubscribe(ref.current);
  }, [ref]);
  return [state, setState, download];
};

export default useImage;
