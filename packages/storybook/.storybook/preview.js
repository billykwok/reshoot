import { addParameters, addDecorator } from '@storybook/react';
import { create } from '@storybook/theming/create';
import { DocsPage, DocsContainer } from '@storybook/addon-docs/blocks';

const sortChapters = ['documentation', 'overview', 'getting started'];

addParameters({
  options: {
    showRoots: true,
    storySort: (a, b) => {
      const x = a[1].kind.toLowerCase();
      const y = b[1].kind.toLowerCase();
      for (let chapter of sortChapters) {
        const matchedA = x.indexOf(chapter) > -1;
        const matchedB = y.indexOf(chapter) > -1;
        if (matchedA && !matchedB) {
          return -1;
        } else if (!matchedA && matchedB) {
          return 1;
        }
      }
      return a[1].kind === b[1].kind
        ? 0
        : a[1].id.localeCompare(b[1].id, undefined, { numeric: true });
    },
  },
  darkMode: {
    current: 'dark',
    darkClass: 'dark',
    lightClass: 'light',
    stylePreview: true,
    dark: create({
      base: 'dark',
      colorPrimary: 'red',
      colorSecondary: '#007aff',
      appBg: '#000',
      appContentBg: '#111',
      appBorderColor: '#222',
      // appBorderRadius: 4,
      // fontBase: '"Open Sans", sans-serif',
      // fontCode: 'monospace',
      textColor: '#eee',
      textInverseColor: '#111',
      barTextColor: '#ccc',
      barSelectedColor: '#007aff',
      barBg: '#111',
      inputBg: '#000',
      inputBorder: '#000',
      inputTextColor: '#eee',
      // inputBorderRadius: 4,
      brandTitle: 'Reshoot',
      brandUrl: 'https://reshootjs.github.io',
      // brandImage: 'https://placehold.it/350x150',
    }),
    // Override the default light theme
    light: create({ base: 'light' }),
  },

  docs: { container: DocsContainer, page: DocsPage },
});
