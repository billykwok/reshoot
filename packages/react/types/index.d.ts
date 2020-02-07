// TypeScript Version: 2.8
import React = require('react');

export default class Img extends React.Component<{
  readonly src: string;
  readonly alt: string;
  readonly aspectRatio: number;
  readonly blur?: number;
  readonly color?: string;
  readonly className?: string;
  readonly placeholder?: string;
  readonly srcSet?: string;
  readonly target?: string;
  readonly href?: string;
  readonly messages?: { MANUAL: string; OFFLINE: string; ERROR: string };
  readonly onClick?: (e?: React.SyntheticEvent) => void;
  readonly [props: string]: any;
}> {}
