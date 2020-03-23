import { useRef, memo } from 'react';
import { css } from 'linaria';
import assign from 'object-assign';
import type { SyntheticEvent } from 'react';

import h from './h';
import Placeholder from './Placeholder';
import Img from './Img';
import Message from './Message';
import State from './state';
import useImage from './useImage';
import useCx from './useCx';

type Props = {
  src: string;
  alt: string;
  aspectRatio: number;
  className?: string;
  blur?: number;
  color?: string;
  placeholder?: string;
  srcSet?: string;
  target?: string;
  href?: string;
  messages?: {
    [State.MANUAL]: string;
    [State.OFFLINE]: string;
    [State.ERROR]: string;
  };
  onClick?: (e: SyntheticEvent<Element, MouseEvent>) => void;
};

const asContainer = css`
  overflow: hidden;
  position: relative;
  text-decoration: none;
  padding: 0;
  border: none;
  outline: none;
`;

const asButtonContainer = css`
  cursor: pointer;
`;

const Reshoot = ({
  src,
  className,
  alt,
  aspectRatio,
  blur = 20,
  color = 'transparent',
  placeholder = null,
  srcSet = null,
  target = '_self',
  href = null,
  messages = {
    MANUAL: 'Not autoloaded in slow network',
    OFFLINE: 'Browser is offline',
    ERROR: 'Fail to load',
  },
  onClick,
  ...rest
}: Props) => {
  const ref = useRef(null);
  const [state, setState, download] = useImage(ref, src, srcSet);
  const cx = useCx(className);

  const children = [
    h(Placeholder, { color, aspectRatio }),
    h(Img, { color, placeholder, src, srcSet, alt, state, blur }),
    h(Message, { state, text: messages[state] }),
  ];

  if (state !== State.INITIAL && state !== State.LOADED) {
    return h(
      'button',
      assign(
        {
          ref,
          className: cx(asContainer, asButtonContainer),
          onClick: (e: SyntheticEvent<Element, MouseEvent>) => {
            e.stopPropagation();
            e.preventDefault();
            setState(() => State.INITIAL);
            download();
          },
        },
        rest
      ),
      ...children
    );
  }
  if (href) {
    return h(
      'a',
      assign({ ref, className: cx(asContainer), target, href, onClick }, rest),
      ...children
    );
  }
  return h(
    'div',
    assign({ ref, className: cx(asContainer) }, rest),
    ...children
  );
};

export default memo(Reshoot);
