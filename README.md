# <img src="https://raw.githubusercontent.com/billykwok/reshoot/master/logo.png" width="200" />

[![Babel Macro](https://img.shields.io/badge/babel--macro-%F0%9F%8E%A3-f5da55.svg?style=flat-square)](https://github.com/kentcdodds/babel-plugin-macros)
[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org)
[![codecov](https://codecov.io/gh/billykwok/reshoot/branch/master/graph/badge.svg)](https://codecov.io/gh/billykwok/reshoot)
[![CircleCI](https://circleci.com/gh/billykwok/reshoot/tree/master.svg?style=svg)](https://circleci.com/gh/billykwok/reshoot/tree/master)

This library has a single mission - to make rendering responsive and lazy-loaded images effortless and without overhead. People have been trying to solve this problem thousands times with different libraries. This tries to be the last one by helping you to:

- generate low-quality image preview ([`lqip`](https://github.com/zouhir/lqip)) and [HTML5 image srcset](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images)
- minify image asset for different screen resolutions and DPIs
- render responsive, smart and lazy-loaded images in React project effortlessly and without overhead

By the way, this library is shipped with sensable default options so it can be considered as a zero-config library. Plus, it is powered by [`hook`](https://reactjs.org/docs/hooks-overview.html) (if it matters to you).

## What is in the box

- A [`webpack-loader`](https://webpack.js.org/loaders) that emits low-quality image preview ([`lqip`](https://github.com/zouhir/lqip)) and responsive images, and returns meta info of the images.
- A [`babel-macro`](https://github.com/kentcdodds/babel-plugin-macros) that transpile `reshoot('image.jpg', { a: 1, b: 2 })` into `require('image.jpg!@reshoot/loader?a=1&b=2')`.
- A [`React`](https://reactjs.org) component that is even faster and sleeker than the legendary [`react-ideal-image`](https://github.com/stereobooster/react-ideal-image).

## Usage

Add the following loader config to Webpack config.

```javascript
{
  loader: '@reshoot/loader',
  options: {
    name: '[contenthash:8].[ext]',
    shape: { mime: false }
  }
}
```

Import `@reshoot/macro` and `@reshoot/react`.

```jsx
import React from 'react';
import { render } from 'react-dom';

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
      </div>
    </React.Fragment>
  );
}

render(
  <Example title="Client-side Rendered" />,
  document.getElementById('root')
);
```

## Support

This library has been continuously used in many of my personal projects, and is regarded as production-ready. In the foreseeable future, I will continuously maintain and support this library.

## Issues and Feedback

Please voice your opinion and report bugs in the [issues](https://github.com/billykwok/reshoot/issues) sections of this GitHub project.

## Contributing

You are more than welcome to add more functionalities, improve documentation, fix bugs, and anything you think is needed. The build step is pretty self-explanatory. Please refer to [`package.json`](https://github.com/billykwok/reshoot/blob/master/package.json).

## License

MIT
