import { memo } from 'react';
import { css } from 'linaria';

import h from './h';
import defaultStyle from './defaultStyle';
import State from './state';

const scale3d = (scale: number) => `scale3d(${scale},${scale},1)`;

const asImg = css`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

type Props = {
  color: string;
  placeholder: string;
  src: string;
  srcSet: string;
  alt: string;
  state: State;
  blur: number;
};

const Img = ({ color, placeholder, src, srcSet, alt, state, blur }: Props) => {
  const finalState = !placeholder || state === State.LOADED;
  const resolvedSrc = finalState ? src : placeholder;
  const resolvedSrcSet = finalState ? srcSet : null;
  return !placeholder && state !== State.INITIAL && state !== State.LOADED
    ? null
    : h('img', {
        className: defaultStyle + ' ' + asImg,
        style: {
          color,
          background: color,
          filter: finalState ? 'initial' : `blur(${blur}px)`,
          transition:
            state === State.LOADED
              ? 'filter 0.5s ease, transform 0.5s ease'
              : 'initial',
          transform: finalState ? 'initial' : scale3d(1.05)
        },
        src: resolvedSrc,
        srcSet: resolvedSrcSet,
        alt
      });
};

export default memo(Img);
