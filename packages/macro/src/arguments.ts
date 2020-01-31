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

export default function extractArgumentPaths(referencePath: NodePath) {
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
      'Invalid number of arguments: ' + numberOfArguments + '. Expected: 1 to 2'
    );
  }

  if (!isExpression(argumentPaths[0].node)) {
    throw new MacroError(
      `The first argument must be an expression, got ${inspect(
        argumentPaths[0]
      )}.`
    );
  }
  const pathEvaluation = argumentPaths[0].evaluate();

  if (!pathEvaluation.confident || typeof pathEvaluation.value !== 'string') {
    throw new MacroError(
      `Failed to evaluate argument ${inspect(argumentPaths[0])}.`
    );
  }
  console.info(`Received argument ${pathEvaluation.value}.`);

  if (numberOfArguments === 1) {
    return [pathEvaluation.value, {}];
  }

  if (!isObjectExpression(argumentPaths[1].node)) {
    throw new MacroError('The second argument must be an object expression.');
  }

  const optionsEvaluation = argumentPaths[1].evaluate();

  if (!optionsEvaluation.confident) {
    throw new MacroError('Failed to evaluate options.');
  }

  return [pathEvaluation.value, optionsEvaluation.value];
}
