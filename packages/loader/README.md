# <img src="https://raw.githubusercontent.com/billykwok/reshoot/main/logo.png" width="200" alt="Reshoot logo" /><br/>`@reshoot/loader`

A Webpack [`loader`](https://webpack.js.org/loaders) that returns low-quality image placeholder ([`lqip`](https://github.com/zouhir/lqip)) and meta data of the images.

More about [`reshoot`](https://github.com/billykwok/reshoot).

## Installation

```sh
# PNPM
pnpm add -D @reshoot/loader

# NPM
npm install -D @reshoot/loader

# yarn
yarn add -D @reshoot/loader
```

## API

```js
// webpack.config.js
export default {
  // ...
  module: {
    rules: [
      {
        test: /\.(jpe?g|png|webp|gif|svg)$/i,
        use: [
          {
            loader: '@reshoot/loader',
            options: {
              meta: {
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
              },
              // The shape of the output meta data
              // Type: (output: object, resourcePath: string) => Field
              shape: ({
                hash,
                src,
                width,
                height,
                aspectRatio,
                placeholder,
                color,
              }) => ({
                hash,
                src,
                width,
                height,
                aspectRatio,
                placeholder,
                color,
              }),
              // File name pattern of the output image
              // Type: string
              filename: '[contenthash:16].[ext]', // default to '[path][name].[ext]' in development mode
              // Output path of the output images
              // Type: string | ((path: string) => string)| null
              outputPath: null,
              // Public path
              // Type: string | ((filename: string) => string)
              publicPath: '/',
              // Whether to emit the image the file system (useful for static site generation using both client-side and server-side builds)
              // Type: boolean
              emitFile: true,
              // Whether to export meta data in the ES module syntax
              // Type: boolean
              esModule: false,
            },
          },
        ],
      },
    ],
  },
};
```

## Support

This library has been continuously used in many of my personal projects, and is regarded as production-ready. In the foreseeable future, I will continuously maintain and support this library.

## Issues and Feedback

Please voice your opinion and report bugs in the [issues](https://github.com/billykwok/reshoot/issues) sections of this GitHub project.

## Contributing

You are more than welcome to add more functionalities, improve documentation, fix bugs, and anything you think is needed. The build step is pretty self-explanatory. Please refer to [`package.json`](https://github.com/billykwok/reshoot/blob/main/package.json).

## License

MIT
