import { inspect } from 'util';
import { isExpression, isCallExpression } from '@babel/types';
import { MacroError } from 'babel-plugin-macros';

import type { NodePath } from '@babel/core';

function extractArguments(referencePath: NodePath): NodePath[] {
  if (!isCallExpression(referencePath.parentPath)) {
    throw new MacroError('Please use it as a function');
  }

  const argumentPaths = referencePath.parentPath.get('arguments') as NodePath[];
  const numberOfArguments = argumentPaths.length;
  if (numberOfArguments < 1 || numberOfArguments > 2) {
    throw new MacroError(
      `Expect 1 or 2 arguments, but got ${numberOfArguments}`
    );
  }

  if (!isExpression(argumentPaths[0].node)) {
    throw new MacroError(
      `The first argument must be an expression, but got ${inspect(
        argumentPaths[0].node,
        false,
        null,
        true
      )}`
    );
  }

  if (numberOfArguments > 1 && !isExpression(argumentPaths[1].node)) {
    throw new MacroError(
      `The second argument must be an expression, but got ${inspect(
        argumentPaths[1].node,
        false,
        null,
        true
      )}`
    );
  }

  return argumentPaths;
}

export default extractArguments;
