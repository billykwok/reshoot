// @flow
import * as React from 'react';

type Props = { color: string, aspectRatio: number };

function Placeholder({ color, aspectRatio }: Props) {
  return (
    <div
      style={{
        width: '100%',
        height: 0,
        background: color,
        paddingBottom: aspectRatio ? aspectRatio + '%' : 0
      }}
    />
  );
}

export default React.memo<Props>(Placeholder, () => true);
