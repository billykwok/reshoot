// @flow
import React from 'react';
import { jsx } from '@emotion/core';
import assign from 'object-assign';

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

const btnStyle = { cursor: 'pointer' };

type Ref = { current: null | HTMLElement } | ((null | HTMLElement) => mixed);
type Props = { target?: string, href?: ?string, state: State };
type InnerProps = { ref: Ref, target?: string, href?: ?string, style: any };
type Config = { href?: ?string, state: State };

function createElement(tag, props, ref, css) {
  delete cloned.state;
  delete cloned.mime;
  return jsx(tag, assign(props, { ref, css }));
}

function Container(props: Props, ref: Ref) {
  const cloned = props;
  if (state !== INITIAL && state !== LOADED) {
    return createElement('button', cloned, ref, [style, btnStyle]);
  } else if (props.href) {
    return createElement('a', cloned, ref, [style, btnStyle]);
  }
  return createElement('div', cloned, ref, style);
}

export default React.forwardRef<Props, HTMLElement>(Container);
