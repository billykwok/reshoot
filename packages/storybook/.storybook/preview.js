import { addParameters } from '@storybook/react';
import { create } from '@storybook/theming/create';
import '@storybook/addon-console';
import { DocsPage, DocsContainer } from '@storybook/addon-docs/blocks';

const sortChapters = [
  'documentation',
  'overview',
  'installation',
  'tutorial',
  'how it works',
  'faqs',
  'live demo',
];

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

  docs: { container: DocsContainer, page: DocsPage, inlineStories: true },
  backgrounds: {
    default: null,
    values: [
      { name: 'light', value: '#f5f5f5' },
      { name: 'dark', value: '#050505' },
    ],
  },
});
