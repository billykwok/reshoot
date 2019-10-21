import React from 'react';
import { render } from 'react-dom'; // eslint-disable-line import/no-extraneous-dependencies
import Img from '@reshoot/react';

render(
  <Img src="../img/abc.png" alt="abc" aspectRatio={1.6} />,
  document.getElementById('root')
);

export function Page(): JSX.Element {
  return (
    <Img
      src="../img/abc.png"
      alt="abc"
      aspectRatio={1.6}
      blur={5}
      color="#fff"
      placeholder="../img/placeholder.jpg"
      srcSet=""
      target="_blank"
      href="https://example.com"
      messages={{ MANUAL: '', OFFLINE: '', ERROR: '' }}
      onClick={() => {}}
    />
  );
}
