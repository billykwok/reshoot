import { forwardRef } from 'react';
import { css } from 'linaria';
import assign from 'object-assign';
import { INITIAL, FADING, LOADED } from './state';
import useLoadingState from './hooks/useLoadingState';
import useForwardableRef from './hooks/useForwardableRef';
import useImgCallback from './hooks/useImgCallback';
import useDownload from './hooks/useDownload';
import useIntersection from './hooks/useIntersection';
import cx from './utils/cx';
import createElement from './utils/createElement';
import IS_BROWSER from './utils/isBrowser';

import type { SyntheticEvent, RefObject } from 'react';
import type { State } from './state';

const asContainer = css`
  display: inline-block;
  position: relative;
  padding: 0;
  overflow: hidden;
  border: none;
  outline: none;
  text-decoration: none;
  color: transparent;
  background: currentColor;
  button& {
    cursor: pointer;
  }
  img {
    display: block;
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  &::before {
    content: '';
    display: block;
    width: 100%;
    height: 0;
    padding-bottom: calc(var(--r, 0) * 100%);
  }
`;

const asPlaceholder = css`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  background: currentColor;
  transform: scale3d(1.05, 1.05, 1);
  > img {
    filter: blur(0.5rem);
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

const asMessage = css`
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
  max-width: 8rem;
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
`;

const MESSAGES: [string, string, string] = [
  'Not autoloaded in slow network',
  'Browser is offline',
  'Fail to load',
];

type Props = Readonly<{
  className?: string;
  config: Readonly<{
    src: string;
    width: number;
    height: number;
    aspectRatio?: number;
    srcSet?: string;
    alt?: string;
    color?: string;
    placeholder?: string | false | null;
  }>;
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
    config: {
      src,
      width,
      height,
      aspectRatio,
      srcSet,
      alt,
      color,
      placeholder,
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
  const callbacks = useImgCallback(_ref, src, state, setState, onLoad, onError);
  const download = useDownload(src, srcSet, callbacks);
  useIntersection(_ref, state, download);
  const dimensions = { width, height };
  const hasError = IS_BROWSER && state < INITIAL;

  return createElement(
    hasError ? 'button' : extraProps.href ? 'a' : 'div',
    assign(
      {
        ref: _ref,
        className: cx(asContainer, className),
        style: assign(
          { color, '--r': aspectRatio ? 1 / aspectRatio : height / width },
          style
        ),
      },
      extraProps,
      hasError && {
        onClick: () => {
          setState(() => INITIAL);
          download();
        },
      }
    ),
    createElement(
      'img',
      assign(
        { alt },
        (!IS_BROWSER || state > INITIAL) && { src, srcSet },
        dimensions,
        imgProps
      )
    ),
    IS_BROWSER &&
      placeholder &&
      state !== LOADED &&
      createElement(
        'div',
        {
          className: cx(asPlaceholder, state === FADING && asFadeout),
          onAnimationEnd: () => setState(() => LOADED),
        },
        createElement(
          'img',
          assign({ src: placeholder, alt: '', loading: 'lazy' }, dimensions)
        )
      ),
    hasError &&
      createElement(
        'div',
        { className: asMessage },
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
