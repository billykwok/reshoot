import { css } from 'linaria';

import type { ReactElement } from 'react';

import h from './h';

const asPlaceholder = css`
  width: 100%;
  height: 0;
`;

type Props = { color: string; aspectRatio: number };

const Placeholder = ({ color, aspectRatio }: Props): ReactElement =>
  h('div', {
    className: asPlaceholder,
    style: {
      color,
      background: color,
      paddingBottom: aspectRatio ? `${aspectRatio}%` : 0,
    },
  });

export default Placeholder;
