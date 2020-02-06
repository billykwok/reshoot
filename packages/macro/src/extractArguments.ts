import { NodePath } from '@babel/core';
import {
  isExpression,
  isCallExpression,
  isObjectExpression
} from '@babel/types';
import { MacroError } from 'babel-plugin-macros';
import util from 'util';

function inspect(obj: any) {
  return util.inspect(obj, false, null, true);
}

function extractArguments(referencePath: NodePath) {
  if (!isCallExpression(referencePath.parentPath)) {
    throw new MacroError('Please use it as a function.');
  }

  const argumentPaths = referencePath.parentPath.get('arguments');
  if (!Array.isArray(argumentPaths)) {
    throw new Error('Expect an array of arguments');
  }
  const numberOfArguments = argumentPaths.length;
  if (numberOfArguments < 1 || numberOfArguments > 2) {
    throw new MacroError(
      'Expect 1 or 2 arguments, but got ' + numberOfArguments + '.'
    );
  }

  if (!isExpression(argumentPaths[0].node)) {
    throw new MacroError(
      `The first argument must be an expression, but got ${inspect(
        argumentPaths[0].node
      )}.`
    );
  }

  if (numberOfArguments > 1 && !isObjectExpression(argumentPaths[1].node)) {
    throw new MacroError(
      `The second argument must be an expression, but got ${inspect(
        argumentPaths[1].node
      )}.`
    );
  }

  return argumentPaths;
}

export default extractArguments;
