import { addons } from '@storybook/addons';
import { create } from '@storybook/theming/create';

addons.setConfig({
  panelPosition: 'right',
  theme: create({
    base: 'light',
    brandTitle: 'Reshoot',
    brandUrl: 'https://reshootjs.github.io',
    brandImage:
      'https://raw.githubusercontent.com/billykwok/reshoot/master/logo.png',
  }),
});
