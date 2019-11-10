import React from 'react';
import { jsx } from '@emotion/core';

import defaultStyle from './defaultStyle';
import State from './state';

function scale3d(scale: number) {
  return `scale3d(${scale},${scale},1)`;
}

type Props = {
  placeholder: string;
  src: string;
  srcSet: string;
  alt: string;
  state: State;
  blur: number;
};

function Img({ color, placeholder, src, srcSet, alt, state, blur }: Props) {
  const finalState = !placeholder || state === State.LOADED;

  let resolvedSrc = null;
  let resolvedSrcSet = null;
  if (finalState) {
    resolvedSrc = src;
    resolvedSrcSet = srcSet;
  } else {
    resolvedSrc = placeholder;
  }

  return !placeholder && state !== State.INITIAL && state !== State.LOADED
    ? null
    : jsx('img', {
        css: [
          defaultStyle,
          {
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            color,
            background: color,
            filter: finalState ? 'initial' : `blur(${blur}px)`,
            transition:
              state === State.LOADED
                ? 'filter 0.5s ease, transform 0.5s ease'
                : 'initial',
            transform: finalState ? 'initial' : scale3d(1.05)
          }
        ],
        src: resolvedSrc,
        srcSet: resolvedSrcSet,
        alt
      });
}

export default React.memo<Props>(Img);
