import { useState, useCallback, memo, useRef, Ref } from 'react';
import { css } from 'linaria';

import h from './h';
import Placeholder from './Placeholder';
import Img from './Img';
import Message from './Message';
import State from './state';
import useIntersection from './useIntersection';

type Props = {
  src: string;
  alt: string;
  aspectRatio: number;
  blur?: number;
  color?: string;
  placeholder?: string;
  srcSet?: string;
  target?: string;
  href?: string;
  messages?: {
    [State.MANUAL]: string;
    [State.OFFLINE]: string;
    [State.ERROR]: string;
  };
  onClick?: () => void;
};

type ContainerProps = {
  className?: string;
  ref?: Ref<HTMLElement>;
  onClick?: (event: MouseEvent) => void;
  target?: string;
  href?: string;
};

const IS_SERVER = typeof window === 'undefined';

function setCache(src: string) {
  try {
    sessionStorage.setItem(src, 'y');
  } catch (e) {
    console.log('Failed to set cache');
  }
}

function deriveInitialState(src: string): State {
  if (IS_SERVER || sessionStorage.getItem(src)) return State.LOADED;
  const support = typeof window.navigator !== 'undefined';
  const connection = support && window.navigator['connection'];
  if (connection && connection.effectiveType.indexOf('2g') > -1) {
    return State.MANUAL;
  }
  if (support && 'onLine' in navigator && !navigator.onLine) {
    return State.OFFLINE;
  }
  return State.INITIAL;
}

const asContainerStyle = css`
  overflow: hidden;
  position: relative;
  text-decoration: none;
  padding: 0;
  border: none;
  outline: none;
`;

const asButtonContainerStyle = css`
  cursor: pointer;
`;

function Reshoot({
  src,
  alt,
  aspectRatio,
  blur = 20,
  color = 'transparent',
  placeholder = null,
  srcSet = null,
  target = '_self',
  href = null,
  messages = {
    [State.MANUAL]: 'Not autoloaded in slow network',
    [State.OFFLINE]: 'Browser is offline',
    [State.ERROR]: 'Fail to load'
  },
  onClick,
  ...rest
}: Props) {
  const ref = useRef(null);
  const [state, setState] = useState(() => deriveInitialState(src));
  const download = useCallback(() => {
    const image = new Image();
    image.onload = () => {
      setCache(src);
      setState(() => State.LOADED);
    };
    image.onerror = () => {
      console.error('Failed to download ' + src);
      setState(() => State.ERROR);
    };
    if (srcSet) {
      image.srcset = srcSet;
    }
    image.src = src;
  }, []);
  const onIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) =>
      (entries[0] && !entries[0].isIntersecting) ||
      IS_SERVER ||
      state === State.LOADED ||
      state === State.MANUAL ||
      download(),
    [state]
  );
  useIntersection(ref, onIntersection);

  let Container = 'div';
  let containerProps: ContainerProps = {
    className: asContainerStyle,
    ref,
    ...rest
  };
  const isButton = state !== State.INITIAL && state !== State.LOADED;
  if (isButton) {
    Container = 'button';
    containerProps = {
      ...containerProps,
      className: asContainerStyle + ' ' + asButtonContainerStyle,
      onClick: (e: MouseEvent) => {
        e.preventDefault();
        if (state === State.LOADED) return;
        setState(() => State.INITIAL);
        download();
      }
    };
  } else if (href) {
    Container = 'a';
    containerProps = {
      ...containerProps,
      className: asContainerStyle,
      target,
      href,
      onClick
    };
  }

  return h(
    Container,
    containerProps,
    h(Placeholder, { color, aspectRatio }),
    h(Img, { color, placeholder, src, srcSet, alt, state, blur }),
    h(Message, { state, text: messages[state] })
  );
}

export default memo(Reshoot);
