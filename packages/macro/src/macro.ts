import { default as BabelPluginMacros } from 'babel-plugin-macros';
import type { ImageMeta, InlineOptions } from '@reshoot/types';

import handle from './handle';

export default BabelPluginMacros.createMacro(handle) as <
  T extends ImageMeta = ImageMeta
>(
  path: string,
  options?: InlineOptions
) => T;
