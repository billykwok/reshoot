import {
  type CSSProperties,
  type ForwardedRef,
  type MutableRefObject,
  type MouseEvent,
  type ReactNode,
  type Ref,
  type RefCallback,
  forwardRef,
  useCallback,
  useRef,
  useState,
} from 'react';
import { css } from '@linaria/core';
import useLifecycleRef from 'use-lifecycle-ref';
import type { ImageMeta } from '@reshoot/types';

import useLazyImage from './useLazyImage';

declare module 'react' {
  interface CSSProperties {
    [index: `--${string}`]: any;
  }
}

const enum State {
  INITIAL,
  FADING,
  LOADED,
  ERROR,
}

const container = css`
  position: relative;
  overflow: hidden;
  background: var(--c);
  &:before {
    content: '';
    display: block;
    width: 100%;
    height: 0;
    padding: 0 0 var(--r);
  }
  > * {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  > div[aria-hidden='true'] {
    background: var(--c);
    > img {
      width: 100%;
      height: 100%;
      filter: blur(2rem);
    }
  }
`;

const error = css`
  display: flex;
  backdrop-filter: blur(0.5rem);
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: #f7f7f7;
  text-shadow: #000 0 0 1rem;
  background: rgba(0, 0, 0, 0.5);
  > p {
    margin: 0 0 0.5rem;
  }
  > p:first-child {
    font-size: 1.125rem;
  }
`;

const fadeOut = css`
  animation: fadeOut 0.75s 1 forwards;
  @keyframes fadeOut {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
`;

export type Props = {
  meta: ImageMeta;
  container?:
    | string
    | ((props: {
        ref: Ref<HTMLElement>;
        className: string;
        children: ReactNode;
        style: CSSProperties;
      }) => ReactNode);
  ref?: RefCallback<HTMLElement> | MutableRefObject<HTMLElement>;
  imgRef?: RefCallback<HTMLImageElement> | MutableRefObject<HTMLImageElement>;
  alt?: string;
  className?: string;
  style?: Record<string, any>;
  onClick?: (e: MouseEvent<HTMLElement>) => void;
  [key: string]: any;
};

const Img = forwardRef(function RefReceivingImg(
  {
    meta,
    container: Container = 'div',
    imgRef,
    alt,
    className,
    style,
    ...props
  }: Props,
  ref: ForwardedRef<HTMLElement>
): JSX.Element {
  const { src, srcSet, sizes, aspectRatio, placeholder, color } = meta;
  const [state, setState] = useState(State.INITIAL);
  const instantFade = useRef(false);
  const onLoad = useCallback(
    () => setState(instantFade.current ? State.LOADED : State.FADING),
    []
  );
  const onError = useCallback(() => setState(State.ERROR), []);
  useLazyImage(src, srcSet, sizes, onLoad, onError);
  const _imgRef = useLifecycleRef<HTMLImageElement>({
    onAttach: (element) => {
      if (element.complete) {
        instantFade.current = true;
      }
    },
    ref: imgRef,
  });
  return (
    <Container
      ref={ref}
      className={container + (className ? ' ' + className : '')}
      style={{ '--c': color, '--r': `${aspectRatio}%`, ...style }}
      {...props}
    >
      <img
        ref={_imgRef}
        src={src}
        srcSet={srcSet}
        sizes={sizes}
        alt={alt}
        crossOrigin=""
        aria-busy={State.LOADED !== state && State.ERROR !== state}
      />
      {State.LOADED !== state && (
        <div
          className={
            'js-only' +
            (State.FADING === state && !instantFade.current
              ? ' ' + fadeOut
              : '')
          }
          onAnimationEnd={
            State.FADING === state ? () => setState(State.LOADED) : null
          }
          aria-hidden="true"
        >
          <img src={placeholder} alt="" />
        </div>
      )}
      {State.ERROR === state && (
        <div className={error}>
          <p>Failed to load image</p>
          <p>Please try refreshing the page</p>
        </div>
      )}
    </Container>
  );
});

export { type ImageMeta } from '@reshoot/types';

export default Img;
