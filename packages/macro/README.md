# <img src="https://raw.githubusercontent.com/billykwok/reshoot/main/logo.png" width="200" alt="Reshoot logo" /><br/>`@reshoot/macro`

A [`babel-macro`](https://github.com/kentcdodds/babel-plugin-macros) transpiling `reshoot('image.png', { color: '#eee' })` into `import meta from 'image.png?color=%23eee';`.

More about [`reshoot`](https://github.com/billykwok/reshoot).

## Installation

```sh
# PNPM
pnpm add -D @reshoot/macro

# NPM
npm install -D @reshoot/macro

# yarn
yarn add -D @reshoot/macro
```

## Setup

```js
// babel.config.js
module.exports = {
  // ...
  plugins: ['babel-plugin-macros'],
};
```

## API

```js
import reshoot from '@reshoot/macro';

const meta = reshoot(
  './image.png',
  { color: '#eee' } // Optional inline config overriding the loader options
);
```

## Support

This library has been continuously used in many of my personal projects, and is regarded as production-ready. In the foreseeable future, I will continuously maintain and support this library.

## Issues and Feedback

Please voice your opinion and report bugs in the [issues](https://github.com/billykwok/reshoot/issues) sections of this GitHub project.

## Contributing

You are more than welcome to add more functionalities, improve documentation, fix bugs, and anything you think is needed. The build step is pretty self-explanatory. Please refer to [`package.json`](https://github.com/billykwok/reshoot/blob/main/package.json).

## License

MIT
