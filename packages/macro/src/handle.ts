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
import { requireExpression } from './requireExpression';

import type { ParsedUrlQueryInput } from 'querystring';
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

    const images = require(path.join(
      path.dirname(filename),
      firstArg
    )) as (ParsedUrlQueryInput & { src: string })[];
    referencePath.parentPath.replaceWith(
      arrayExpression(
        images.map((image) => {
          const {
            src,
            /* eslint-disable @typescript-eslint/no-unused-vars */
            name,
            alternativeFormats,
            alternativeWidths,
            defaultFormat,
            defaultWidth,
            quality,
            background,
            color,
            placeholder,
            aspectRatio,
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
          } = image;
          const options: ParsedUrlQueryInput = {};
          if ('name' in image) {
            options.name = image.name;
          }
          if ('alternativeFormats' in image) {
            options.alternativeFormats = image.alternativeFormats;
          }
          if ('alternativeWidths' in image) {
            options.alternativeWidths = image.alternativeWidths;
          }
          if ('defaultFormat' in image) {
            options.defaultFormat = image.defaultFormat;
          }
          if ('defaultWidth' in image) {
            options.defaultWidth = image.defaultWidth;
          }
          if ('quality' in image) {
            options.quality = image.quality;
          }
          if ('background' in image) {
            options.background = image.background;
          }
          if ('color' in image) {
            options.color = image.color;
          }
          if ('placeholder' in image) {
            options.placeholder = image.placeholder;
          }
          if ('aspectRatio' in image) {
            options.aspectRatio = image.aspectRatio;
          }
          const requireCall = requireExpression(
            path.join(path.dirname(firstArg), src),
            options
          );
          return objectExpression(
            (!rest || Object.keys(rest).length
              ? (parseExpression(JSON.stringify(rest)) as ObjectExpression)
                  .properties
              : []
            ).concat(objectProperty(stringLiteral('data'), requireCall))
          );
        })
      )
    );
  });
}

export default handle;
