import { css } from 'linaria';
import assign from 'object-assign';
import { LOADED, INITIAL } from '../state';
import cx from '../utils/cx';
import createElement from '../utils/createElement';

import type { ReactElement, SyntheticEvent } from 'react';
import type { State } from '../state';

const asInitial = css`
  transform: scale3d(1.05, 1.05, 1);
  filter: blur(1.25rem);
`;

const asFinal = css`
  transform: initial;
  filter: initial;
`;

type Props = Readonly<{
  className?: string;
  style?: Readonly<Record<string, string | number>>;
  src: string;
  srcSet?: string;
  color?: string;
  placeholder?: string;
  alt?: string;
  __options: Readonly<
    [() => void, (e: Event | SyntheticEvent | string) => void, State, boolean]
  >;
  __imgProps: Readonly<Record<string, unknown>>;
}>;

const Img = ({
  className,
  style,
  src,
  srcSet,
  color,
  placeholder,
  __options,
  __imgProps,
}: Props): ReactElement => {
  const [onLoad, onError, state, nativeLazyLoading] = __options;
  const isInEndingState = !placeholder || state === LOADED;
  return createElement(
    'img',
    assign(
      {
        className: cx(isInEndingState ? asFinal : asInitial, className),
        style: assign(
          { color },
          nativeLazyLoading &&
            !isInEndingState && { backgroundImage: `url(${placeholder})` },
          style
        ),
        loading: 'lazy',
        decoding: 'async',
      },
      nativeLazyLoading || isInEndingState
        ? { src, srcSet }
        : { src: placeholder },
      nativeLazyLoading && state === INITIAL && { onLoad, onError },
      __imgProps
    )
  );
};

export default Img;
