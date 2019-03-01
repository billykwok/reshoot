// @flow
import * as React from 'react';

import defaultStyle from './defaultStyles';
import { INITIAL, LOADED } from './state';

import type { State } from './state';

function scale3d(scale: number) {
  return `scale3d(${scale},${scale},${scale})`;
}

type Props = {
  src: string,
  blur: number,
  state: State,
  placeholder: ?string,
  srcSet: ?string
};

function AdvancedImage({
  placeholder,
  src,
  srcSet,
  state,
  blur,
  ...props
}: Props) {
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
      {...props}
    />
  );
}

export default React.memo<Props>(AdvancedImage);
