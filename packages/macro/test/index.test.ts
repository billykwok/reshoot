import { describe, expect, test } from '@jest/globals';
import { format } from 'prettier';
import { transformAsync, type TransformOptions } from '@babel/core';

expect.addSnapshotSerializer({
  serialize: (value: string) => format(value, { parser: 'babel' }),
  test: (value: string) => typeof value === 'string',
});

const BABEL_TRANSFORM_OPTIONS: TransformOptions = {
  rootMode: 'root',
  babelrc: false,
  presets: [
    [
      '@babel/preset-env',
      {
        targets: { node: 'current', esmodules: false },
        exclude: ['transform-async-to-generator', 'transform-regenerator'],
        modules: false,
      },
    ],
  ],
  plugins: ['babel-plugin-macros'],
};

describe('Babel with @reshoot/macro', () => {
  test('should export the same function from `index.ts` and `macro.ts`', async () => {
    const [index, macro] = await Promise.all([
      import('../src'),
      import('../src/macro'),
    ]);
    expect(index).toStrictEqual(macro);
  });

  test('should do nothing when macro is unused', async () => {
    const result = await transformAsync(
      `
        import { createElement } from 'react';
        import imageMeta from './macro/src/macro';

        export default function ExampleImg(props) {
          return createElement(img, props);
        };
      `,
      BABEL_TRANSFORM_OPTIONS
    );
    expect(result.code).toMatchSnapshot();
  });

  test('should correctly transform', async () => {
    const result = await transformAsync(
      `
        import Img from '@reshoot/react';
        import { createElement } from 'react';
        import imageMeta from './macro/src/macro';

        const meta = imageMeta('../asset/image.png?color=#f4f4f4');
        export default function ExampleImg(props) {
          return createElement(Img, { meta, ...props });
        };
      `,
      BABEL_TRANSFORM_OPTIONS
    );
    expect(result.code).toMatchSnapshot();
  });

  test('should correctly transform with two identical sources', async () => {
    const result = await transformAsync(
      `
        import Img from '@reshoot/react';
        import { createElement } from 'react';
        import imageMeta from './macro/src/macro';

        const meta = imageMeta('../asset/image.png', { color: '#f4f4f4' });
        export default function ExampleImg(props) {
          return createElement(Img, { meta, ...props });
        };

        export const meta2 = imageMeta('../asset/image.png?color=%23f4f4f4');
      `,
      BABEL_TRANSFORM_OPTIONS
    );
    expect(result.code).toMatchSnapshot();
  });

  test('should correctly transform with options', async () => {
    const result = await transformAsync(
      `
        import Img from '@reshoot/react';
        import { createElement } from 'react';
        import imageMeta from './macro/src/macro';

        const meta = imageMeta('../asset/image.png', { color: '#f4f4f4' });
        export default function ExampleImg(props) {
          return createElement(Img, { meta, ...props });
        };
      `,
      BABEL_TRANSFORM_OPTIONS
    );
    expect(result.code).toMatchSnapshot();
  });

  test('should correctly transform with options and existing search params', async () => {
    const result = await transformAsync(
      `
        import Img from '@reshoot/react';
        import { createElement } from 'react';
        import imageMeta from './macro/src/macro';

        const meta = imageMeta('../asset/image.png?reshoot', { color: '#f4f4f4' });
        export default function ExampleImg(props) {
          return createElement(Img, { meta, ...props });
        };
      `,
      BABEL_TRANSFORM_OPTIONS
    );
    expect(result.code).toMatchSnapshot();
  });

  test('should throw if there are no arguments', async () => {
    expect.assertions(1);
    try {
      await transformAsync(
        `
          import Img from '@reshoot/react';
          import { createElement } from 'react';
          import imageMeta from './macro/src/macro';

          const meta = imageMeta();
          export default function ExampleImg(props) {
            return createElement(Img, { meta, ...props });
          };
        `,
        BABEL_TRANSFORM_OPTIONS
      );
    } catch (e) {
      // eslint-disable-next-line jest/no-conditional-expect
      expect(e).toMatchSnapshot();
    }
  });

  test('should throw if there are more than two arguments', async () => {
    expect.assertions(1);
    try {
      await transformAsync(
        `
          import Img from '@reshoot/react';
          import { createElement } from 'react';
          import imageMeta from './macro/src/macro';

          const meta = imageMeta('../asset/image.png', { color: '#f4f4f4' }, 1);
          export default function ExampleImg(props) {
            return createElement(Img, { meta, ...props });
          };
        `,
        BABEL_TRANSFORM_OPTIONS
      );
    } catch (e) {
      // eslint-disable-next-line jest/no-conditional-expect
      expect(e).toMatchSnapshot();
    }
  });

  test('should throw if not used as a function', async () => {
    expect.assertions(1);
    try {
      await transformAsync(
        `
          import Img from '@reshoot/react';
          import { createElement } from 'react';
          import imageMeta from './macro/src/macro';

          const meta = imageMeta;
          export default function ExampleImg(props) {
            return createElement(Img, { meta, ...props });
          };
        `,
        BABEL_TRANSFORM_OPTIONS
      );
    } catch (e) {
      // eslint-disable-next-line jest/no-conditional-expect
      expect(e).toMatchSnapshot();
    }
  });

  test('should throw if path cannot be evaluated', async () => {
    expect.assertions(1);
    try {
      await transformAsync(
        `
          import Img from '@reshoot/react';
          import { createElement } from 'react';
          import imageMeta from './macro/src/macro';

          const meta = imageMeta('../asset/image.png' + new Date().toString());
          export default function ExampleImg(props) {
            return createElement(Img, { meta, ...props });
          };
        `,
        BABEL_TRANSFORM_OPTIONS
      );
    } catch (e) {
      // eslint-disable-next-line jest/no-conditional-expect
      expect(e).toMatchSnapshot();
    }
  });

  test('should throw if path is not evaluated into a string', async () => {
    expect.assertions(1);
    try {
      await transformAsync(
        `
          import Img from '@reshoot/react';
          import { createElement } from 'react';
          import imageMeta from './macro/src/macro';

          const meta = imageMeta(1 + 2 + 3);
          export default function ExampleImg(props) {
            return createElement(Img, { meta, ...props });
          };
        `,
        BABEL_TRANSFORM_OPTIONS
      );
    } catch (e) {
      // eslint-disable-next-line jest/no-conditional-expect
      expect(e).toMatchSnapshot();
    }
  });

  test('should throw if path is a HTTP url', async () => {
    expect.assertions(1);
    try {
      await transformAsync(
        `
          import Img from '@reshoot/react';
          import { createElement } from 'react';
          import imageMeta from './macro/src/macro';

          const meta = imageMeta('https://example.com/image.png');
          export default function ExampleImg(props) {
            return createElement(Img, { meta, ...props });
          };
        `,
        BABEL_TRANSFORM_OPTIONS
      );
    } catch (e) {
      // eslint-disable-next-line jest/no-conditional-expect
      expect(e).toMatchSnapshot();
    }
  });

  test('should throw if options cannot be evaluated', async () => {
    expect.assertions(1);
    try {
      await transformAsync(
        `
          import Img from '@reshoot/react';
          import { createElement } from 'react';
          import imageMeta from './macro/src/macro';

          const meta = imageMeta('../asset/image.png', { color: new Date().toString() });
          export default function ExampleImg(props) {
            return createElement(Img, { meta, ...props });
          };
        `,
        BABEL_TRANSFORM_OPTIONS
      );
    } catch (e) {
      // eslint-disable-next-line jest/no-conditional-expect
      expect(e).toMatchSnapshot();
    }
  });

  test('should throw if options is not evaluated into an object', async () => {
    expect.assertions(1);
    try {
      await transformAsync(
        `
          import Img from '@reshoot/react';
          import { createElement } from 'react';
          import imageMeta from './macro/src/macro';

          const meta = imageMeta('../asset/image.png', 1);
          export default function ExampleImg(props) {
            return createElement(Img, { meta, ...props });
          };
        `,
        BABEL_TRANSFORM_OPTIONS
      );
    } catch (e) {
      // eslint-disable-next-line jest/no-conditional-expect
      expect(e).toMatchSnapshot();
    }
  });

  test('should throw if there is unknown options', async () => {
    expect.assertions(1);
    try {
      await transformAsync(
        `
          import Img from '@reshoot/react';
          import { createElement } from 'react';
          import imageMeta from './macro/src/macro';

          const meta = imageMeta('../asset/image.png', { foo: 'bar' });;
          export default function ExampleImg(props) {
            return createElement(Img, { meta, ...props });
          };
        `,
        BABEL_TRANSFORM_OPTIONS
      );
    } catch (e) {
      // eslint-disable-next-line jest/no-conditional-expect
      expect(e).toMatchSnapshot();
    }
  });
});
