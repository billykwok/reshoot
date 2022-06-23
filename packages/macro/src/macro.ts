import { default as BabelPluginMacros } from 'babel-plugin-macros';
import type { ImageMeta } from '@reshoot/types';

import handle from './handle';

export default BabelPluginMacros.createMacro(handle) as <T = ImageMeta>(
  path: string
) => T;
