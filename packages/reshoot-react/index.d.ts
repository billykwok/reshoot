import React from 'react';

declare type Img = React.NamedExoticComponent<{
  src: string;
  alt: string;
  aspectRatio: number;
  blur?: number;
  color?: string;
  placeholder?: string;
  srcSet?: string;
  target?: string;
  href?: string;
  messages?: { MANUAL: string; OFFLINE: string; ERROR: string };
  onClick?: () => void;
}>;

export default Img;
