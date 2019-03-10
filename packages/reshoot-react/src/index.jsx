// @flow
import React, { useState, useCallback } from 'react';
import { Waypoint } from 'react-waypoint';

import Placeholder from './Placeholder';
import Img from './Img';
import Message from './Message';
import { INITIAL, LOADED, MANUAL, OFFLINE, ERROR } from './state';

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

type ContainerProps = {
  onClick?: () => void,
  target?: string,
  href?: ?string,
  style: any
};

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
  const connection =
    typeof navigator !== 'undefined' &&
    (navigator?.connection ||
      navigator?.webkitConnection ||
      navigator?.mozConnection);
  if (connection && ['slow-2g', '2g'].indexOf(connection.effectiveType) > -1)
    return MANUAL;
  if (typeof navigator !== 'undefined' && !navigator?.onLine) return OFFLINE;
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

const buttonContainerStyle = { ...containerStyle, cursor: 'pointer' };

function Reshoot({
  src,
  alt,
  aspectRatio,
  blur,
  color,
  placeholder,
  srcSet,
  target,
  href,
  messages,
  ...rest
}: Props) {
  const [state, setState] = useState(() => deriveInitialState(src));
  const download = useCallback(function() {
    const image = new Image();
    image.onload = () => {
      setCache(src);
      setState(LOADED);
    };
    image.onerror = () => setState(ERROR);
    if (srcSet) {
      image.srcset = srcSet;
    }
    image.src = src;
  }, []);
  const onEnter = useCallback(
    function() {
      return IS_SERVER || state === LOADED || state === MANUAL || download();
    },
    [state]
  );
  const onClick = useCallback(
    function() {
      if (state === LOADED) return;
      setState(INITIAL);
      download();
    },
    [state]
  );

  let Container: string = 'div';
  const containerProps: ContainerProps = { style: containerStyle };
  if (state !== INITIAL && state !== LOADED) {
    Container = 'button';
    containerProps.style = buttonContainerStyle;
    containerProps.onClick = onClick;
  } else if (href) {
    Container = 'a';
    containerProps.target = target;
    containerProps.href = href;
    containerProps.onClick = onClick;
  }

  return (
    <Waypoint onEnter={onEnter}>
      <Container {...containerProps} {...rest}>
        <Placeholder color={color} aspectRatio={aspectRatio} />
        <Img
          placeholder={placeholder}
          src={src}
          srcSet={srcSet}
          alt={alt}
          state={state}
          blur={blur}
        />
        <Message state={state} text={messages[state]} />
      </Container>
    </Waypoint>
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

export default React.memo<Props>(Reshoot, () => true);
