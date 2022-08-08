# <img src="https://raw.githubusercontent.com/billykwok/reshoot/main/logo.png" width="200" alt="Reshoot logo" />

Reshoot is a JavaScript / Typescript image framework that makes the processing and rendering of responsive images as easy and efficient as possible.

## What is in the box

Reshoot currently consists of the following packages.

### User packages

Packages you will likely use directly, as they interface with the libraries and tools in your projects.

| Package                                                                                | Description                                                                                                                                                                                                                                                                                                         |
| -------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`@reshoot/react`](https://www.npmjs.com/package/@reshoot/react)                       | A [`React`](https://reactjs.org) component rendering responsive images, designed to accept the output meta data of [`@reshoot/loader`](https://www.npmjs.com/package/@reshoot/loader).                                                                                                                              |
| [`@reshoot/loader`](https://www.npmjs.com/package/@reshoot/loader)                     | A Webpack [`loader`](https://webpack.js.org/loaders) that returns low-quality image placeholder ([`lqip`](https://github.com/zouhir/lqip)) and meta data of the images.                                                                                                                                             |
| [`@reshoot/macro`](https://www.npmjs.com/package/@reshoot/macro)                       | A [`babel-macro`](https://github.com/kentcdodds/babel-plugin-macros) transpiling `reshoot('image.png', { color: '#eee' })` into `import meta from 'image.png?color=#eee';`.                                                                                                                                         |
| [`@reshoot/remark-mdx-image`](https://www.npmjs.com/package/@reshoot/remark-mdx-image) | An [`mdx`](https://mdxjs.com) / [`remark-plugin`](https://github.com/remarkjs/remark) transpiling `![alt text](image.png "title"){{color='#eee'}}` into the following.<pre lang="mdx">import meta from 'image.png?color=#eee';<br/>&lt;img meta={meta} alt=&quot;alt text&quot; title=&quot;title&quot; /&gt;</pre> |

> These packages can be used selectively to fit your specific use cases. For example, you can ignore `@reshoot/remark-mdx-image` if you are not using `mdx`. Or you can use `@reshoot/loader` to generate responsive images, but build your own `<Img />` component to render the images. Or you can just use `@reshoot/react` for images that you prepared yourself.
>
> Currently Reshoot assumes that you use Webpack, Babel and React. Support for other frameworks/libraries will be considered in the future.

### Core packages

Packages that you will rarely need to use, as they are the underlying logics and infrastructural components of Reshoot.

| Package                                                          | Description                                                                                                 |
| ---------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| [`@reshoot/core`](https://www.npmjs.com/package/@reshoot/core)   | A backend library for extracting meta data and generating low-quality iamge placeholder from a given image. |
| [`@reshoot/types`](https://www.npmjs.com/package/@reshoot/types) | Enums and types shared across the above libraries.                                                          |

## Documentation via Example Usage

Here is a simple demonstration on how to use all four Reshoot user packages.

### Installation

```sh
# PNPM
pnpm add @reshoot/react
pnpm add -D @reshoot/loader @reshoot/macro @reshoot/remark-mdx-image

# NPM
npm install @reshoot/react
npm install -D @reshoot/loader @reshoot/macro @reshoot/remark-mdx-image

# yarn
yarn add @reshoot/react
yarn add -D @reshoot/loader @reshoot/macro @reshoot/remark-mdx-image
```

### Setup

```js
// babel.config.js
module.exports = {
  // ...
  plugins: ['babel-plugin-macros'],
};
```

```js
// webpack.config.js
import reshootRemarkMdxImage from '@reshoot/remark-mdx-image';

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
      {
        test: /\.mdx$/i,
        use: [
          {
            loader: '@mdx-js/loader',
            options: { remarkPlugins: [reshootRemarkMdxImage] },
          },
        ],
      },
    ],
  },
};
```

### UI Component

```jsx
// entry-point.js
import '@reshoot/react/styles.css';
```

```jsx
// Example.jsx
import imageMetaOf from '@reshoot/macro';
import Img from '@reshoot/react';

export default function Example() {
  return <Img meta={imageMetaOf('./image.png')} />;
}
```

## Support

This library has been continuously used in many of my personal projects, and is regarded as production-ready. In the foreseeable future, I will continuously maintain and support this library.

## Issues and Feedback

Please voice your opinion and report bugs in the [issues](https://github.com/billykwok/reshoot/issues) sections of this GitHub project.

## Contributing

You are more than welcome to add more functionalities, improve documentation, fix bugs, and anything you think is needed. The build step is pretty self-explanatory. Please refer to [`package.json`](https://github.com/billykwok/reshoot/blob/main/package.json).

## License

MIT
