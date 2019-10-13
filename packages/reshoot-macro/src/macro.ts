import { createMacro, MacroParams } from 'babel-plugin-macros';

import extractArgumentPaths from './arguments';

type ReshootMacro = (
  path: string,
  options: {
    src?: string;
    alt?: string;
    aspectRatio?: number;
    blur?: number;
    color?: string;
    placeholder?: string;
    srcSet?: string;
  }
) => {
  src: string;
  alt: string;
  aspectRatio: number;
  blur: number;
  color: string;
  placeholder: string;
  srcSet: string;
};

function reshootMacro({ references }: MacroParams<ReshootMacro>) {
  references.default.forEach(referencePath => {
    const [path, options] = extractArgumentPaths(referencePath);
    const queryString = Object.keys(options).length
      ? `?${JSON.stringify(options)}`
      : '';
    referencePath.parentPath.replaceWithSourceString(
      `require('${path}${queryString}')`
    );
  });
}

export default createMacro(reshootMacro);
