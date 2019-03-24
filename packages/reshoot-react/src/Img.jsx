// @flow
import * as React from 'react';

import defaultStyle from './defaultStyles';
import { INITIAL, LOADED } from './state';

import type { State } from './state';

function scale3d(scale: number) {
  return `scale3d(${scale},${scale},1)`;
}

type Props = {
  placeholder: ?string,
  src: string,
  srcSet: ?string,
  alt: string,
  state: State,
  blur: number
};

function Img({ placeholder, src, srcSet, alt, state, blur }: Props) {
  const finalState = !placeholder || state === LOADED;

  let resolvedSrc = null;
  let resolvedSrcSet = null;
  if (finalState) {
    resolvedSrc = src;
    resolvedSrcSet = srcSet;
  } else {
    resolvedSrc = placeholder;
  }

  return (
    (!placeholder && state !== INITIAL && state !== LOADED) || (
      <img
        style={{
          ...defaultStyle,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          filter: `blur(${finalState ? 0 : blur}px)`,
          transition:
            state === LOADED
              ? 'filter 0.5s ease, transform 0.5s ease'
              : 'initial',
          transform: scale3d(finalState ? 1 : 1.05)
        }}
        src={resolvedSrc}
        srcSet={resolvedSrcSet}
        alt={alt}
      />
    )
  );
}

export default React.memo<Props>(Img);
