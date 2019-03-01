// @flow
import React, { useState, useCallback } from 'react';
import { Waypoint } from 'react-waypoint';

import Container from './Container';
import Placeholder from './Placeholder';
import AdvancedImage from './AdvancedImage';
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
  href?: ?string,
  messages?: { MANUAL: string, OFFLINE: string, ERROR: string }
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

function Reshoot({
  src,
  alt,
  aspectRatio,
  blur,
  color,
  placeholder,
  srcSet,
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

  const hasMessage = state !== INITIAL && state !== LOADED;
  return (
    <Waypoint onEnter={onEnter}>
      <Container state={state} onClick={onClick} {...rest}>
        <Placeholder color={color} aspectRatio={aspectRatio} />
        {(!placeholder && hasMessage) || (
          <AdvancedImage
            placeholder={placeholder}
            src={src}
            srcSet={srcSet}
            alt={alt}
            state={state}
            blur={blur}
          />
        )}
        {hasMessage && <Message text={messages[state]} />}
      </Container>
    </Waypoint>
  );
}

Reshoot.defaultProps = {
  blur: 20,
  color: 'transparent',
  placeholder: null,
  srcSet: null,
  href: null,
  messages: {
    MANUAL: 'Not autoloaded in slow network',
    OFFLINE: 'Browser is offline',
    ERROR: 'Fail to load'
  }
};

export default React.memo<Props>(Reshoot, () => true);
