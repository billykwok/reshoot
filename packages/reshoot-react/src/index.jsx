// @flow
import React, { useState, useCallback } from 'react';
import { jsx } from '@emotion/core';
import { Waypoint } from 'react-waypoint';
import assign from 'object-assign';

import Placeholder from './Placeholder';
import Img from './Img';
import Message from './Message';
import { INITIAL, LOADED, MANUAL, OFFLINE, ERROR } from './state';
import staticProps from './staticProps';

import type { State } from './state';

type Props = {
  src: string,
  alt: string,
  aspectRatio: number,
  blur?: number,
  color?: string,
  placeholder?: ?string,
  srcSet?: ?string,
  target?: string,
  href?: ?string,
  messages?: { MANUAL: string, OFFLINE: string, ERROR: string }
};

type ContainerProps = { onClick?: () => void, target?: string, href?: ?string };

const IS_SERVER = typeof window === 'undefined';

function setCache(hashId, onError) {
  try {
    sessionStorage.setItem(hashId, 'y');
  } catch (e) {
    console.log('Failed to set cache');
  }
}

function deriveInitialState(src): State {
  if (IS_SERVER || sessionStorage.getItem(src)) return LOADED;
  const support = typeof navigator !== 'undefined';
  const connection = support && navigator.connection;
  if (connection && connection.effectiveType.indexOf('2g') > -1) return MANUAL;
  if (support && 'onLine' in navigator && !navigator.onLine) return OFFLINE;
  return INITIAL;
}

const containerStyle = {
  overflow: 'hidden',
  position: 'relative',
  textDecoration: 'none',
  padding: 0,
  border: 'none',
  outline: 'none'
};

const buttonContainerStyle = { cursor: 'pointer' };

const whilelist = [
  'src',
  'alt',
  'aspectRatio',
  'blur',
  'color',
  'placeholder',
  'srcSet',
  'target',
  'href',
  'messages'
];

function filterProps(p) {
  const r = {};
  Object.keys(p).map(k => whilelist.indexOf(k) < 0 && (r[k] = p[k]));
  return r;
}

function Reshoot(props: Props) {
  const useStateResult = useState(() => deriveInitialState(props.src));
  const state = useStateResult[0];
  const setState = useStateResult[1];

  const rest = filterProps(props);

  const download = useCallback(() => {
    const image = new Image();
    image.onload = () => {
      setCache(props.src);
      setState(LOADED);
    };
    image.onerror = () => {
      console.error('Failed to download ' + props.src);
      setState(ERROR);
    };
    if (props.srcSet) {
      image.srcset = props.srcSet;
    }
    image.src = props.src;
  }, []);
  const onEnter = useCallback(
    () => IS_SERVER || state === LOADED || state === MANUAL || download(),
    [state]
  );
  const onClick = useCallback(() => {
    if (state === LOADED) return;
    setState(INITIAL);
    download();
  }, [state]);

  let Container: string = 'div';
  let containerProps: ContainerProps;
  const asButton = state !== INITIAL && state !== LOADED;
  if (asButton) {
    Container = 'button';
    containerProps = { onClick };
  } else if (props.href) {
    Container = 'a';
    containerProps = {
      target: props.target,
      href: props.href,
      onClick: props.onClick
    };
  }

  return jsx(
    Waypoint,
    { onEnter },
    jsx(
      Container,
      assign(
        { css: [containerStyle, asButton && buttonContainerStyle] },
        containerProps,
        rest
      ),
      jsx(Placeholder, { color: props.color, aspectRatio: props.aspectRatio }),
      jsx(Img, {
        placeholder: props.placeholder,
        src: props.src,
        srcSet: props.srcSet,
        alt: props.alt,
        state: state,
        blur: props.blur
      }),
      jsx(Message, { state, text: props.messages[state] })
    )
  );
}

Reshoot.defaultProps = {
  blur: 20,
  color: 'transparent',
  placeholder: null,
  srcSet: null,
  target: '_self',
  href: null,
  messages: {
    MANUAL: 'Not autoloaded in slow network',
    OFFLINE: 'Browser is offline',
    ERROR: 'Fail to load'
  }
};

export default React.memo<Props>(Reshoot, staticProps);
