import { useState, useCallback, memo, useRef, SyntheticEvent } from 'react';
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
  className?: string;
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
  onClick?: (e: SyntheticEvent<Element, MouseEvent>) => void;
};

const IS_SERVER = typeof window === 'undefined';

const setCache = (src: string) => {
  try {
    sessionStorage.setItem(src, 'y');
  } catch (e) {
    console.log('Failed to set cache');
  }
};

const deriveInitialState = (src: string): State => {
  if (IS_SERVER || sessionStorage.getItem(src)) return State.LOADED;
  const support = typeof navigator !== 'undefined';
  const connection = support && navigator['connection'];
  if (connection && connection.effectiveType.indexOf('2g') > -1) {
    return State.MANUAL;
  }
  if (support && 'onLine' in navigator && !navigator.onLine) {
    return State.OFFLINE;
  }
  return State.INITIAL;
};

const asContainer = css`
  overflow: hidden;
  position: relative;
  text-decoration: none;
  padding: 0;
  border: none;
  outline: none;
`;

const asButtonContainer = css`
  cursor: pointer;
`;

const Reshoot = ({
  src,
  className,
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
}: Props) => {
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
    srcSet && (image.srcset = srcSet);
    image.src = src;
  }, []);
  const onIntersection = useCallback(
    (entry: IntersectionObserverEntry) =>
      (entry && !entry.isIntersecting) ||
      IS_SERVER ||
      state === State.LOADED ||
      state === State.MANUAL ||
      download(),
    [state]
  );
  useIntersection(ref, onIntersection);

  const cx = (...cls: string[]) =>
    (className ? cls.concat(className) : cls).join(' ');

  const children = [
    h(Placeholder, { color, aspectRatio }),
    h(Img, { color, placeholder, src, srcSet, alt, state, blur }),
    h(Message, { state, text: messages[state] })
  ];

  if (state !== State.INITIAL && state !== State.LOADED) {
    return h(
      'button',
      {
        ref,
        className: cx(asContainer, asButtonContainer),
        onClick: (e: SyntheticEvent<Element, MouseEvent>) => {
          e.preventDefault();
          setState(() => State.INITIAL);
          download();
        },
        ...rest
      },
      ...children
    );
  }
  if (href) {
    return h(
      'a',
      { ref, className: cx(asContainer), target, href, onClick, ...rest },
      ...children
    );
  }
  return h('div', { ref, className: cx(asContainer), ...rest }, ...children);
};

export default memo(Reshoot);
