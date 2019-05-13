// @flow
import React from 'react';
import { jsx } from '@emotion/core';

import staticProps from './staticProps';

type Props = { color: string, aspectRatio: number };

function Placeholder({ color, aspectRatio }: Props) {
  return jsx('div', {
    css: [
      { width: '100%', height: 0 },
      { background: color, paddingBottom: aspectRatio ? aspectRatio + '%' : 0 }
    ]
  });
}

export default React.memo<Props>(Placeholder, staticProps);
