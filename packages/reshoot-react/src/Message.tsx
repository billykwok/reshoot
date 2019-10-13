import React, { useState, useEffect } from 'react';
import { jsx } from '@emotion/core';

import defaultStyle from './defaultStyle';
import State from './state';

const style = {
  color: '#fff',
  fontFamily: 'Arial',
  textAlign: 'center',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  padding: '15px 20px',
  background: 'rgba(0, 0, 0, 0.5)',
  borderRadius: 5,
  width: '100%',
  maxWidth: 120,
  transition: 'opacity 0.5s ease'
};

type Props = { state: State; text: string };

function Message({ state, text }: Props) {
  const useStateResult = useState(false);
  const loaded = useStateResult[0];
  const setLoaded = useStateResult[1];
  useEffect(() => setLoaded(true), []);
  return (
    state !== State.INITIAL &&
    state !== State.LOADED &&
    jsx(
      'div',
      { css: [{ opacity: loaded ? 1 : 0 }, defaultStyle, style] },
      jsx(
        'svg',
        { css: { width: 48, height: 48 }, viewBox: '0 0 24 24' },
        jsx('path', {
          d:
            'M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46A7.93 7.93 0 0 0 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74A7.93 7.93 0 0 0 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z',
          fill: '#fff'
        }),
        jsx('path', { d: 'M0 0h24v24H0z', fill: 'none' })
      ),
      jsx('div', { css: { fontSize: 14, marginBottom: 5 } }, text),
      jsx('div', { css: { fontSize: 12 } }, 'Click to reload')
    )
  );
}

export default React.memo<Props>(Message);
