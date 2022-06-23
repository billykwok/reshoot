import { compile } from '@mdx-js/mdx';
import { describe, expect, test } from '@jest/globals';
import { format } from 'prettier';

import reshootRemarkMdxImage from '../src';

expect.addSnapshotSerializer({
  serialize: (value: string) => format(value, { parser: 'babel' }),
  test: () => true,
});

describe('MDX with @reshoot/remark-mdx-image', () => {
  test('should correctly transform when default settings', async () => {
    const result = await compile(
      `
        ## Hellow World

        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

        ![](https://example.com/image.png){{color:'#f4f4f4'}}
        ![Image alt text 1](assets/image.png "Image title 1")

        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        
        <div id="abc">
          ![](../assets/image.png)
          ![](../assets/image.png "Image title 2"){{color:'#f4f4f4'}}
          ![Image alt text 2](../assets/image.png){{color:'#f4f4f4'}}
        </div>

        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.

        [![Image alt text 3](../assets/image.png?reshoot "Image title 3"){{color:'#f4f4f4'}}](https://example.com "Link title")

        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      `,
      {
        jsx: true,
        remarkPlugins: [reshootRemarkMdxImage],
      }
    );
    expect(result.toString()).toMatchSnapshot();
  });

  test('should correctly transform when relativeToDocument is disabled', async () => {
    const result = await compile(
      `
        ## Hellow World

        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

        ![](https://example.com/image.png){{color:'#f4f4f4'}}
        ![Image alt text 1](assets/image.png "Image title 1")

        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        
        <div id="abc">
          ![](../assets/image.png)
          ![](../assets/image.png "Image title 2"){{color:'#f4f4f4'}}
          ![Image alt text 2](../assets/image.png){{color:'#f4f4f4'}}
        </div>

        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.

        [![Image alt text 3](../assets/image.png?reshoot "Image title 3"){{color:'#f4f4f4'}}](https://example.com "Link title")

        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      `,
      {
        jsx: true,
        remarkPlugins: [[reshootRemarkMdxImage, { relativeToDocument: false }]],
      }
    );
    expect(result.value).toMatchSnapshot();
  });

  test('should correctly transform when removeTrailingLineBreak is disabled', async () => {
    const result = await compile(
      `
        ## Hellow World

        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

        ![](https://example.com/image.png){{color:'#f4f4f4'}}
        ![Image alt text 1](assets/image.png "Image title 1")

        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        
        <div id="abc">
          ![](../assets/image.png)
          ![](../assets/image.png "Image title 2"){{color:'#f4f4f4'}}
          ![Image alt text 2](../assets/image.png){{color:'#f4f4f4'}}
        </div>

        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.

        [![Image alt text 3](../assets/image.png?reshoot "Image title 3"){{color:'#f4f4f4'}}](https://example.com "Link title")

        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      `,
      {
        jsx: true,
        remarkPlugins: [
          [reshootRemarkMdxImage, { removeTrailingLineBreak: false }],
        ],
      }
    );
    expect(result.value).toMatchSnapshot();
  });
});
