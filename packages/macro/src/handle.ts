import path from 'path';
import { MacroParams, MacroError } from 'babel-plugin-macros';
import { arrayExpression } from '@babel/types';

import extractArguments from './extractArguments';
import evalFirstArgument from './evalFirstArgument';
import evalSecondArgument from './evalSecondArgument';
import requireExpression from './requireExpression';

function handle({ references, state }: MacroParams) {
  const filename = state?.file?.opts?.filename;
  if (!filename) {
    throw new MacroError('Failed to retrieve filename.');
  }

  references.default.forEach(referencePath => {
    const [argPath1, argPath2 = false] = extractArguments(referencePath);
    const firstArg = evalFirstArgument(argPath1);
    const options = argPath2 ? evalSecondArgument(argPath2) : {};
    const [isJson] = /\.json$/gi.exec(firstArg) ?? [false];

    if (!isJson) {
      return referencePath.parentPath.replaceWith(
        requireExpression(firstArg, options)
      );
    }

    const images = require(path.join(path.dirname(filename), firstArg));
    referencePath.parentPath.replaceWith(
      arrayExpression(
        images.map(({ src, ...rest }) =>
          requireExpression(src, { ...options, ...rest })
        )
      )
    );
  });
}

export default handle;
