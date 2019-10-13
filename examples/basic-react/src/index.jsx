import React from 'react';
import { render } from 'react-dom';
import { renderToString } from 'react-dom/server';

import Reshoot from '@reshoot/react';
import reshoot from '@reshoot/macro';

sessionStorage.clear();

const color = '#FDDFB0';

function Example({ title }) {
  return (
    <React.Fragment>
      <h2 style={{ paddingLeft: 10 }}>{title}</h2>
      <div className="grid-container">
        <Reshoot {...reshoot('./image.jpg', { color })} />
        <Reshoot
          {...reshoot('./image.jpg', { color })}
          src="image.jpg"
          srcSet={null}
        />
        <Reshoot {...reshoot('./image.jpg', { color })} placeholder={false} />
        <Reshoot {...reshoot('./image.jpg', { color })} />
        <Reshoot {...reshoot('./image.jpg', { color })} />
        <Reshoot {...reshoot('./image.jpg', { color })} />
      </div>
    </React.Fragment>
  );
}

render(
  <Example title="Client-side Rendered" />,
  document.getElementById('root')
);

const ssr = document.createElement('div');
ssr.innerHTML = renderToString(<Example title="Server-side Rendered" />);
document.body.appendChild(ssr);
