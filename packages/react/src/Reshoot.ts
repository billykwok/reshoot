import { forwardRef } from 'react';
import { css } from 'linaria';
import assign from 'object-assign';
import { INITIAL, LOADED } from './state';
import useLoadingState from './hooks/useLoadingState';
import useForwardableRef from './hooks/useForwardableRef';
import useImgCallback from './hooks/useImgCallback';
import useDownload from './hooks/useDownload';
import useIntersection from './hooks/useIntersection';
import Img from './components/Img';
import Message from './components/Message';
import cx from './utils/cx';
import createElement from './utils/createElement';
import SUPPORT_NATIVE_LAZY_LOADING from './utils/supportNativeLazyLoading';

import type {
  SyntheticEvent,
  RefObject,
  ForwardRefExoticComponent,
  RefAttributes,
} from 'react';
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
  &::before {
    content: '';
    display: block;
    width: 100%;
    height: 0;
    padding-bottom: calc(var(--r, 0) * 100%);
  }
  > img {
    display: block;
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: currentColor;
    background-repeat: no-repeat;
    background-size: cover;
    object-fit: cover;
    transition: filter 0.5s ease, transform 0.5s ease;
  }
  > div {
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
    transition: opacity 0.5s ease;
    > svg {
      width: 4rem;
      height: 4rem;
      > path {
        stroke: #fff;
        stroke-width: 4;
        fill: none;
      }
    }
    > div {
      font-size: 1rem;
      margin-bottom: 0.25rem;
    }
    &::after {
      display: block;
      font-size: 0.875rem;
      content: 'Click to reload';
    }
  }
`;

type Props = Readonly<{
  config: Readonly<{
    src: string;
    width: number;
    height: number;
    aspectRatio?: number;
    srcSet?: string;
    alt?: string;
    color?: string;
    placeholder?: string;
  }>;
  className?: string;
  imgProps?: Readonly<{ className?: string; [key: string]: unknown }>;
  onLoad?: () => void;
  onError?: (event: Event | SyntheticEvent | string) => void;
  _s?: State;
  _n?: boolean;
  [key: string]: Readonly<unknown>;
}>;

const Reshoot = forwardRef(
  (
    {
      className,
      style,
      config,
      imgProps,
      onLoad,
      onError,
      _s: overriddenState = null,
      _n: nativeLazyLoading = SUPPORT_NATIVE_LAZY_LOADING,
      ...extraProps
    }: Props,
    ref: RefObject<HTMLElement>
  ) => {
    const {
      src,
      width,
      height,
      aspectRatio,
      srcSet,
      alt,
      color,
      placeholder,
    } = config;

    const [state, setState] = useLoadingState(overriddenState, src);
    const _ref = useForwardableRef<HTMLElement>(ref);
    const [_onLoad, _onError] = useImgCallback(
      _ref,
      src,
      state,
      setState,
      onLoad,
      onError
    );
    const download = useDownload(src, srcSet, _onLoad, _onError);
    useIntersection(_ref, state, nativeLazyLoading, download);

    const isInitialOrLoaded = state === INITIAL || state === LOADED;
    return createElement(
      isInitialOrLoaded ? (extraProps.href ? 'a' : 'div') : 'button',
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
        isInitialOrLoaded || {
          onClick: () => {
            setState(() => INITIAL);
            download();
          },
        }
      ),
      (isInitialOrLoaded || placeholder) &&
        createElement(
          Img,
          assign(
            {
              __options: [_onLoad, _onError, state, nativeLazyLoading] as [
                () => void,
                (e: Event | SyntheticEvent | string) => void,
                State,
                boolean
              ],
              __imgProps: assign({ width, height, alt }, imgProps),
            },
            config
          )
        ),
      isInitialOrLoaded || createElement(Message, { state: state })
    );
  }
) as ForwardRefExoticComponent<Props & RefAttributes<HTMLElement>>;

export default Reshoot;
