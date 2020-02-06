import { NodePath } from '@babel/core';
import { MacroError } from 'babel-plugin-macros';

import inspect from './inspect';

function evalSecondArgument(argPath: NodePath) {
  const evaluation = argPath.evaluate();

  if (!evaluation.confident) {
    throw new MacroError(
      `Failed to evaluate the second argument ${inspect(evaluation.value)}.`
    );
  }

  return evaluation.value;
}

export default evalSecondArgument;
