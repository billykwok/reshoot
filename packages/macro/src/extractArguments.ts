import util from 'util';
import { isExpression, isCallExpression } from '@babel/types';
import { MacroError } from 'babel-plugin-macros';
import type { NodePath } from '@babel/core';

function inspect(obj: any) {
  return util.inspect(obj, false, null, true);
}

function extractArguments(referencePath: NodePath): NodePath[] {
  if (!isCallExpression(referencePath.parentPath)) {
    throw new MacroError('Please use it as a function.');
  }

  const argumentPaths = referencePath.parentPath.get('arguments') as NodePath[];
  const numberOfArguments = argumentPaths.length;
  if (numberOfArguments < 1 || numberOfArguments > 2) {
    throw new MacroError(
      `Expect 1 or 2 arguments, but got ${numberOfArguments}.`
    );
  }

  if (!isExpression(argumentPaths[0].node)) {
    throw new MacroError(
      `The first argument must be an expression, but got ${inspect(
        argumentPaths[0].node
      )}.`
    );
  }

  if (numberOfArguments > 1 && !isExpression(argumentPaths[1].node)) {
    throw new MacroError(
      `The second argument must be an expression, but got ${inspect(
        argumentPaths[1].node
      )}.`
    );
  }

  return argumentPaths;
}

export default extractArguments;
