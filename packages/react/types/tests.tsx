import React from 'react';
import { render } from 'react-dom';
import Img from '@reshoot/react';

import type { ReactElement } from 'react';

render(
  <Img src="../img/abc.png" alt="abc" aspectRatio={1.6} />,
  document.getElementById('root')
);

export function Page(): ReactElement {
  return (
    <Img
      src="../img/abc.png"
      alt="abc"
      aspectRatio={1.6}
      blur={5}
      color="#fff"
      className="123"
      placeholder="../img/placeholder.jpg"
      srcSet=""
      target="_blank"
      href="https://example.com"
      messages={{ MANUAL: '', OFFLINE: '', ERROR: '' }}
      onClick={() => {
        console.log('Clicked');
      }}
    />
  );
}
