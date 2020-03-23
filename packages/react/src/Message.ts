import { useState, useEffect } from 'react';
import { css } from 'linaria';

import h from './h';
import defaultStyle from './defaultStyle';
import State from './state';

const style = css`
  color: #fff;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    'Helvetica Neue', Arial, sans-serif;
  text-align: center;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 15px 20px;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 5px;
  max-width: 120px;
  transition: opacity 0.5s ease;
`;

const asContainer = defaultStyle + ' ' + style;

const asSvg = css`
  width: 48px;
  height: 48px;
`;

const asMessage = css`
  font-size: 14px;
  margin-bottom: 5px;
`;

const icons = h(
  'svg',
  { viewBox: '0 0 24 24', className: asSvg },
  h('path', {
    d:
      'M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46A7.93 7.93 0 0 0 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74A7.93 7.93 0 0 0 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z',
    fill: '#fff',
  }),
  h('path', { d: 'M0 0h24v24H0z', fill: 'none' })
);

const clickToReload = h(
  'div',
  {
    className: css`
      font-size: 12px;
    `,
  },
  'Click to reload'
);

type Props = { state: State; text: string };

const Message = ({ state, text }: Props) => {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => setLoaded(() => true), []);
  return (
    state !== State.INITIAL &&
    state !== State.LOADED &&
    h(
      'div',
      { className: asContainer, style: { opacity: loaded ? 1 : 0 } },
      icons,
      h('div', { className: asMessage }, text),
      clickToReload
    )
  );
};

export default Message;
