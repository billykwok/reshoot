import { addons } from '@storybook/addons';
import { create } from '@storybook/theming/create';

addons.setConfig({
  showRoots: true,
  panelPosition: 'right',
  theme: create({
    base: 'light',
    brandTitle: 'Reshoot',
    brandUrl: 'https://reshootjs.github.io',
    brandImage:
      'https://raw.githubusercontent.com/billykwok/reshoot/main/logo.png',
  }),
});
