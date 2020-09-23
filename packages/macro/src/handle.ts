import path from 'path';
import { MacroError } from 'babel-plugin-macros';
import { parseExpression } from '@babel/parser';
import {
  arrayExpression,
  objectExpression,
  objectProperty,
  stringLiteral,
} from '@babel/types';
import extractArguments from './extractArguments';
import evalFirstArgument from './evalFirstArgument';
import evalSecondArgument from './evalSecondArgument';
import requireExpression from './requireExpression';

import type { ObjectExpression } from '@babel/types';
import type { MacroParams } from 'babel-plugin-macros';

function handle({ references, state }: MacroParams): void {
  const filename = state?.file?.opts?.filename;
  if (!filename) {
    throw new MacroError('Failed to retrieve filename');
  }

  references.default.forEach((referencePath) => {
    const [argPath1, argPath2 = false] = extractArguments(referencePath);
    const firstArg = evalFirstArgument(argPath1);
    const options = argPath2 ? evalSecondArgument(argPath2) : {};
    const [isJson] = /\.json$/gi.exec(firstArg) ?? [false];

    if (!isJson) {
      return referencePath.parentPath.replaceWith(
        requireExpression(firstArg, options)
      );
    }

    const images = require(path.join(path.dirname(filename), firstArg)) as {
      src: string;
      [key: string]: unknown;
    }[];
    referencePath.parentPath.replaceWith(
      arrayExpression(
        images.map(
          ({
            src,
            name,
            sources,
            enforceFormat,
            srcSet,
            quality,
            background,
            color,
            placeholder,
            aspectRatio,
            /* eslint-disable @typescript-eslint/no-unused-vars */
            outputPath,
            publicPath,
            shape,
            fastMode,
            cache,
            emitFile,
            esModule,
            data,
            /* eslint-enable @typescript-eslint/no-unused-vars */
            ...rest
          }) => {
            const requireCall = requireExpression(
              path.join(path.dirname(firstArg), src),
              {
                name,
                sources,
                enforceFormat,
                srcSet,
                quality,
                background,
                color,
                placeholder,
                aspectRatio,
              }
            );
            return objectExpression(
              (!rest || Object.keys(rest).length
                ? (parseExpression(JSON.stringify(rest)) as ObjectExpression)
                    .properties
                : []
              ).concat(objectProperty(stringLiteral('data'), requireCall))
            );
          }
        )
      )
    );
  });
}

export default handle;
