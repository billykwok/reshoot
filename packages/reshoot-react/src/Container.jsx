// @flow
import * as React from 'react';

import { INITIAL, LOADED } from './state';

import type { State } from './state';

const style = {
  overflow: 'hidden',
  position: 'relative',
  textDecoration: 'none',
  padding: 0,
  border: 'none',
  outline: 'none'
};

const buttonStyle = { ...style, cursor: 'pointer' };

type Ref = { current: null | HTMLElement } | ((null | HTMLElement) => mixed);
type Props = { href?: ?string, state: State };
type InnerProps = { ref: Ref, target?: ?string, href?: ?string, style: any };

type Config = { href?: ?string, state: State };

export default React.forwardRef<Props, HTMLElement>(function container(
  { target, href, state, ...rest }: Props,
  ref: Ref
) {
  let Element: string = 'div';
  const props: InnerProps = { ref, style };
  if (state !== INITIAL && state !== LOADED) {
    Element = 'button';
    props.style = buttonStyle;
  } else if (href) {
    Element = 'a';
    props.target = '_self';
    props.href = href;
  }
  return <Element {...props} {...rest} />;
});
