# <img src="https://raw.githubusercontent.com/billykwok/reshoot/main/logo.png" width="200" alt="Reshoot logo" /><br/>`@reshoot/core`

A backend library for extracting meta data and generating low-quality iamge placeholder from a given image.

You should rarely need to use it directly.

More about [`reshoot`](https://github.com/billykwok/reshoot).

## Installation

```sh
# PNPM
pnpm add @reshoot/core

# NPM
npm install @reshoot/core

# yarn
yarn add @reshoot/core
```

## API

```js
// webpack.config.js
import { readfile } from 'node:fs/promises';
import { extractMeta } from '@reshoot/core';

const buffer = await readfile('./image.png');
const meta = await extractMeta(buffer, {
  // The color of placeholder image while loading. It is the dominant color of the image if this option is set to null
  // Type: '#abc' | '#abcdef' | 'transparent' | null
  color: null,
  // The size of placeholder image
  // Type: number
  placeholderSize: 8,
  // The quality of placeholder image
  // Type: number (1 - 10)
  placeholderQuality: 10,
  // The type of the aspect ratio in the output meta data
  // Type: 'heightByWidth' | 'widthByHeight'
  aspectRatioType: 'heightByWidth',
  // The format of the aspect ratio in the output meta data
  // Type: 'percent' | 'ratio'
  aspectRatioFormat: 'precent',
  // The number of decimals of the aspect ratio in the output meta data
  // Type: number
  aspectRatioDecimal: 4,
});
// Output:
// {
//   hash: string;
//   placeholder: string;
//   width: number;
//   height: number;
//   aspectRatio: number;
//   color: string;
// }
```

## Support

This library has been continuously used in many of my personal projects, and is regarded as production-ready. In the foreseeable future, I will continuously maintain and support this library.

## Issues and Feedback

Please voice your opinion and report bugs in the [issues](https://github.com/billykwok/reshoot/issues) sections of this GitHub project.

## Contributing

You are more than welcome to add more functionalities, improve documentation, fix bugs, and anything you think is needed. The build step is pretty self-explanatory. Please refer to [`package.json`](https://github.com/billykwok/reshoot/blob/main/package.json).

## License

MIT
