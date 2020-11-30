import { forwardRef } from 'react';
import { css } from 'linaria';
import { LOADING, FADING, LOADED, ERROR } from './state';
import { useLoadingState } from './hooks/useLoadingState';
import { useShowImage } from './hooks/useShowImage';
import { useIntersection } from './hooks/useIntersection';
import { cx } from './utils/cx';
import { createElement, useCallback, assign } from './utils/mini';
import { cacheFailed, cacheLoaded } from './utils/cache';
import noop from './utils/noop';
import IS_BROWSER from './utils/isBrowser';

import type {
  HTMLAttributes,
  AnchorHTMLAttributes,
  SyntheticEvent,
  RefObject,
} from 'react';
import type { State } from './state';

const asContainer = css`
  display: inline-block;
  position: relative;
  overflow: hidden;
  text-decoration: none;
  color: transparent;
  background: currentColor;
  &::before {
    content: '';
    display: block;
    width: 100%;
    height: 0;
    padding-bottom: calc(var(--r, 0) * 100%);
  }
  img {
    display: block;
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  > div {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    background: currentColor;
    transform: scale3d(1.05, 1.05, 1);
    > img {
      filter: blur(0.5rem);
    }
  }
  > button {
    cursor: pointer;
    border: none;
    outline: none;
    display: block;
    width: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
      'Helvetica Neue', Arial, sans-serif;
    text-align: center;
    color: #fff;
    padding: 1rem 1.25rem;
    background: rgba(0, 0, 0, 0.5);
    border-radius: 0.25rem;
    max-width: 11rem;
    > svg {
      width: 4rem;
      height: 4rem;
      > path {
        stroke: #fff;
        stroke-width: 4;
        fill: none;
      }
    }
    > h6 {
      font-size: 1rem;
      margin: 0 0 0.25rem;
    }
    > p {
      font-size: 0.875rem;
      margin: 0;
    }
  }
`;

const asFadeout = css`
  animation: f 0.75s 1;
  @keyframes f {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
`;

const MESSAGES: [string, string, string] = [
  'Not autoloaded in slow network',
  'Browser is offline',
  'Fail to load',
];

export type ImageData = {
  id?: string;
  sources?: { type: string; srcSet: string }[];
  src: string;
  srcSet?: string;
  width: number;
  height: number;
  type?: string;
  aspectRatio?: number;
  color?: string;
  placeholder?: string;
};

type Props = {
  className?: string;
  data: ImageData;
  messages?: [string, string, string];
  imgProps?: Record<string, unknown>;
  sizes?: string;
  alt?: string;
  onLoad?: () => void;
  onError?: (event: SyntheticEvent) => void;
  _s?: State;
} & (HTMLAttributes<HTMLDivElement> | AnchorHTMLAttributes<HTMLAnchorElement>);

export const Reshoot = forwardRef<HTMLElement, Props>(function Reshoot(
  {
    className,
    style,
    data: {
      id,
      sources = [],
      src,
      srcSet,
      width,
      height,
      aspectRatio,
      color,
      placeholder,
    },
    sizes,
    alt,
    messages = MESSAGES,
    imgProps,
    onLoad: _onLoad = noop,
    onError: _onError = noop,
    _s = null,
    ...extraProps
  }: Props,
  ref: RefObject<HTMLElement>
) {
  const [state, setState] = useLoadingState(id, _s);
  const loadImage = useShowImage(id, setState);
  const innerRef = useIntersection(ref, loadImage);
  const onLoad = useCallback(() => {
    cacheLoaded(id);
    setState((state) => (state < LOADED ? FADING : LOADED));
    _onLoad();
  }, [id]);
  const onError = useCallback(
    (event: SyntheticEvent) => {
      cacheFailed(id);
      setState(() => ERROR);
      _onError(event);
    },
    [id]
  );

  return createElement(
    'href' in extraProps && extraProps.href ? 'a' : 'div',
    assign(
      {
        ref: innerRef,
        className: cx(asContainer, className),
        style: assign({ color, '--r': aspectRatio || height / width }, style),
      },
      extraProps
    ),
    !IS_BROWSER || state > ERROR
      ? createElement(
          'picture',
          {},
          sources.map((source) =>
            createElement('source', assign({ key: source.type, sizes }, source))
          ),
          createElement(
            'img',
            assign(
              {
                src,
                srcSet,
                sizes,
                alt,
                width,
                height,
                crossOrigin: '',
                onLoad,
                onError,
              },
              imgProps
            )
          )
        )
      : null,
    IS_BROWSER &&
      placeholder &&
      state < LOADED &&
      createElement(
        'div',
        state > ERROR && {
          className: asFadeout,
          onAnimationEnd: () => setState(() => LOADED),
        },
        createElement('img', {
          src: placeholder,
          alt: '',
          width,
          height,
        })
      ),
    IS_BROWSER &&
      state < LOADING &&
      createElement(
        'button',
        { onClick: () => setState(() => LOADING) },
        createElement(
          'svg',
          { viewBox: '0 0 100 100' },
          createElement('path', {
            d: 'M79.4 56a30 30 0 1 1-1.7-17.5m2-19v20h-20',
          })
        ),
        createElement('h6', {}, messages[state as 0 | 1 | 2]),
        createElement('p', {}, 'Click to reload')
      )
  );
});
