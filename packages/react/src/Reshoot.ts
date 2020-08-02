import { forwardRef } from 'react';
import { css } from 'linaria';
import assign from 'object-assign';
import { HIDDEN, LOADING, FADING, LOADED } from './state';
import useLoadingState from './hooks/useLoadingState';
import useForwardableRef from './hooks/useForwardableRef';
import useDownload from './hooks/useDownload';
import useIntersection from './hooks/useIntersection';
import cx from './utils/cx';
import createElement from './utils/createElement';
import { isCached } from './utils/cache';
import IS_BROWSER from './utils/isBrowser';

import type { SyntheticEvent, RefObject } from 'react';
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
      transform: scale3d(1.05, 1.05, 1);
      opacity: 1;
    }
    100% {
      transform: none;
      opacity: 0;
    }
  }
`;

const MESSAGES: [string, string, string] = [
  'Not autoloaded in slow network',
  'Browser is offline',
  'Fail to load',
];

export type ImageData = Readonly<{
  src: string;
  width: number;
  height: number;
  aspectRatio?: number;
  srcSet?: string;
  alt?: string;
  color?: string;
  placeholder?: string | false | null;
  [key: string]: unknown;
}>;

type Props = Readonly<{
  className?: string;
  data: ImageData;
  messages: Readonly<[string, string, string]>;
  imgProps: Readonly<Record<string, unknown>>;
  onLoad?: () => void;
  onError?: (event: Event | SyntheticEvent | string) => void;
  _s?: State;
  [key: string]: Readonly<unknown>;
}>;

const Reshoot = (
  {
    className,
    style,
    data: {
      src,
      width,
      height,
      aspectRatio,
      srcSet,
      alt,
      color,
      placeholder,
      ...extraData
    },
    messages = MESSAGES,
    imgProps,
    onLoad,
    onError,
    _s = null,
    ...extraProps
  }: Props,
  ref: RefObject<HTMLElement>
) => {
  const [state, setState] = useLoadingState(_s, src);
  const _ref = useForwardableRef<HTMLElement>(ref);
  const download = useDownload(setState, src, srcSet, onLoad, onError);
  useIntersection(_ref, setState, src, download);
  const dimensions = { width, height };

  return createElement(
    extraProps.href ? 'a' : 'div',
    assign(
      {
        ref: _ref,
        className: cx(asContainer, className),
        style: assign(
          { color, '--r': aspectRatio ? 1 / aspectRatio : height / width },
          style
        ),
      },
      extraProps
    ),
    state !== HIDDEN &&
      createElement(
        'img',
        assign(
          { alt },
          (!IS_BROWSER || state > LOADING) && { src, srcSet },
          dimensions,
          extraData,
          imgProps
        )
      ),
    IS_BROWSER &&
      placeholder &&
      state !== HIDDEN &&
      state !== LOADED &&
      createElement(
        'div',
        assign(
          { onAnimationEnd: () => setState(() => LOADED) },
          state === FADING && { className: asFadeout }
        ),
        createElement(
          'img',
          assign({ src: placeholder, alt: '', loading: 'lazy' }, dimensions)
        )
      ),
    IS_BROWSER &&
      state < HIDDEN &&
      createElement(
        'button',
        {
          onClick: () => {
            isCached(src) || download();
            setState(() => LOADING);
          },
        },
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
};

export default forwardRef(Reshoot);
