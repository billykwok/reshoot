# <img src="https://raw.githubusercontent.com/billykwok/reshoot/main/logo.png" width="200" alt="Reshoot logo" /><br/>`@reshoot/react`

A [`React`](https://reactjs.org) component rendering responsive images, designed to accept the output meta data of [`@reshoot/loader`](https://www.npmjs.com/package/@reshoot/loader).

More about [`reshoot`](https://github.com/billykwok/reshoot).

## Installation

```sh
# PNPM
pnpm add @reshoot/react

# NPM
npm install @reshoot/react

# yarn
yarn add @reshoot/react
```

## Setup

The library should work out of the box. The only required setup is to include the styles in your website.

```jsx
// entry-point.js
import '@reshoot/react/styles.css';
```

However, if you would like to the image to be shown even when JavaScript is disabled (for privacy, accessibility or SEO purposes), you need to render the website on the server side and add the following HTML to the end of `<head />` to hide the overlaying placeholder image.

```html
<noscript>
  <style>
    .js-only {
      display: none;
    }
  </style>
</noscript>
```

## API

```jsx
import imageMeta from '@reshoot/macro';
import Img from '@reshoot/react';

export default function Example() {
  return (
    <Img
      // Meta data of the image. Could be generated and typed automatically using @reshoot/loader and @reshoot/macro
      // Type: {
      //   placeholder?: string;
      //   srcSet?: string;
      //   sizes?: string;
      //   aspectRatio: number;
      //   color: string;
      //   src: string;
      // }
      meta={imageMeta('./image.png')}
      // Container wrapping the image
      // Type: string | ReactComponent
      container="div"
      // Reference to the container, work the same as normal ref
      // Type: RefCallback<HTMLElement> | MutableRefObject<HTMLElement>
      ref={undefined}
      // Reference to the inner image element, work the same as normal ref
      // Type: RefCallback<HTMLImageElement> | MutableRefObject<HTMLImageElement>
      imgRef={undefined}
      // The same as the native `alt` property of <img />
      // Type: string
      alt=""
      // The blur radius CSS value of image preview
      // Type: string
      blur="1rem"
    />
  );
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
