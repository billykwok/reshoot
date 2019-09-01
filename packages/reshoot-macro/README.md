# @reshoot/macro

[![npm version](https://badgen.net/npm/v/@reshoot/macro)](https://badgen.net/npm/v/@reshoot/macro)
[![download](https://badgen.net/npm/dm/@reshoot/macro)](https://badgen.net/npm/dm/@reshoot/macro)
[![Babel Macro](https://img.shields.io/badge/babel--macro-%F0%9F%8E%A3-f5da55.svg?style=flat-square)](https://github.com/kentcdodds/babel-plugin-macros)
[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lernajs.io)
[![Greenkeeper badge](https://badges.greenkeeper.io/billykwok/reshoot.svg)](https://greenkeeper.io/)
[![CircleCI](https://badgen.net/npm/license/@reshoot/react)](https://badgen.net/npm/license/@reshoot/react)
[![CircleCI](https://circleci.com/gh/billykwok/reshoot/tree/master.svg?style=svg)](https://circleci.com/gh/billykwok/reshoot/tree/master)

A Babel macro serving as a shortcut for [`@reshoot/loader`](https://www.npmjs.com/package/@reshoot/loader).

This loader is meant to be used with [`@reshoot/loader`](https://www.npmjs.com/package/@reshoot/loader) and [`@reshoot/react`](https://www.npmjs.com/package/@reshoot/react) as an all-in-one responsive image solution. Please read the main [README.md](https://github.com/billykwok/reshoot) of the Reshoot project to understand how it works before using this package.

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

Import [`@reshoot/macro`](https://www.npmjs.com/package/@reshoot/macro) and [`@reshoot/react`](https://www.npmjs.com/package/@reshoot/react).

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

You are more than welcome to add more functionalities, improve documentation, fix bugs, and anything you think is needed. The build step is pretty self-explanatory. Please refer to [`package.json`](https://github.com/billykwok/reshoot/blob/master/packages/reshoot-macro/package.json).

## License

MIT
