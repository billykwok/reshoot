import React from 'react';
import { action } from '@storybook/addon-actions';
import { select } from '@storybook/addon-knobs';
import Reshoot from '@reshoot/react';
import describe from './describe';
import images from './images';

import './grid.css';

const Gallery = (): JSX.Element => {
  const state = select(
    'State',
    { AUTO: null, MANUAL: 1, OFFLINE: 2, ERROR: 3, INITIAL: 4, LOADED: 5 },
    null
  );
  return (
    <div className="container">
      {images.map((config, i) => (
        <Reshoot
          key={`${config.src}_${i}`}
          className="item"
          config={{ ...config, alt: `Test image #${i}` }}
          onLoad={describe(
            action('Image loaded'),
            '() => {} /* omitted as created by @storybook-addons/action */'
          )}
          onError={describe(
            action('Loading error'),
            '() => {} /* omitted as created by @storybook-addons/action */'
          )}
          onClick={describe(
            action(`Clicked #${i}`),
            '() => {} /* omitted as created by @storybook-addons/action */'
          )}
          _s={state}
        />
      ))}
    </div>
  );
};

export default Gallery;
