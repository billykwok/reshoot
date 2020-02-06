import { MacroError } from 'babel-plugin-macros';
import { NodePath } from '@babel/core';

import inspect from './inspect';

function evalFirstArgument(argPath: NodePath): string {
  const evaluation = argPath.evaluate();
  if (!evaluation.confident) {
    throw new MacroError(
      `Failed to evaluate the first argument ${inspect(argPath.node)}.`
    );
  }

  if (typeof evaluation.value !== 'string') {
    throw new MacroError(
      `The first argument must be evaluated into a string, but got ${inspect(
        evaluation.value
      )}.`
    );
  }

  console.info(`Received argument ${evaluation.value}.`);
  return evaluation.value;
}

export default evalFirstArgument;
