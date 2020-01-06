// TypeScript Version: 2.8
import React = require('react');

export default class Img extends React.Component<{
  src: string;
  alt: string;
  aspectRatio: number;
  blur?: number;
  color?: string;
  className?: string;
  placeholder?: string;
  srcSet?: string;
  target?: string;
  href?: string;
  messages?: { MANUAL: string; OFFLINE: string; ERROR: string };
  onClick?: (e: MouseEvent) => void;
}> {}
