import React from 'react';
import { action } from '@storybook/addon-actions';
import { Reshoot } from '@reshoot/react';
import describe from './describe';
import images from './images';

import './grid.css';

const Gallery = ({
  disablePlaceholder,
  ...props
}: {
  disablePlaceholder: boolean;
  [key: string]: unknown;
}): JSX.Element => {
  return (
    <div className="container">
      {images.map((data, i) => (
        <Reshoot
          key={`${data.src}_${i}`}
          className="item"
          data={{
            ...data,
            placeholder: disablePlaceholder ? null : data.placeholder,
          }}
          alt={`Test image #${i}`}
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
          {...props}
        />
      ))}
    </div>
  );
};

export default Gallery;
