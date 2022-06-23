# <img src="https://raw.githubusercontent.com/billykwok/reshoot/main/logo.png" width="200" alt="Reshoot logo" /><br/>`@reshoot/remark-mdx-image`

An [`mdx`](https://mdxjs.com) / [`remark-plugin`](https://github.com/remarkjs/remark) transpiling `![alt text](image.jpg "title"){{color=#eee}}` into the following.<pre lang="mdx">import meta from 'image.jpg?color=%23eee';<br/>&lt;img meta={meta} alt=&quot;alt text&quot; title=&quot;title&quot; /&gt;</pre>

More about [`reshoot`](https://github.com/billykwok/reshoot).

## Installation

```sh
# PNPM
pnpm add -D @reshoot/remark-mdx-image

# NPM
npm install -D @reshoot/remark-mdx-image

# yarn
yarn add -D @reshoot/remark-mdx-image
```

## Setup

```js
import reshootRemarkMdxImage from '@reshoot/remark-mdx-image';

// MDX options
const mdxOptions = {
  remarkPlugins: [reshootRemarkMdxImage],
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
