import createElement from '../utils/createElement';

import type { ReactElement } from 'react';
import type { State } from '../state';

const messages = [
  'Not autoloaded in slow network',
  'Browser is offline',
  'Fail to load',
];

type Props = Readonly<{ state: State; [key: string]: unknown }>;

const Message = ({ state }: Props): ReactElement =>
  createElement(
    'div',
    {},
    createElement(
      'svg',
      { viewBox: '0 0 100 100' },
      createElement('path', { d: 'M79.4 56a30 30 0 1 1-1.7-17.5m2-19v20h-20' })
    ),
    createElement('div', {}, messages[state])
  );

export default Message;
