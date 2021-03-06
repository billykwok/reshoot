import { MacroError } from 'babel-plugin-macros';
import { inspect } from 'util';

import type { NodePath } from '@babel/core';

function evalFirstArgument(argPath: NodePath): string {
  const evaluation = argPath.evaluate();
  if (!evaluation.confident) {
    throw new MacroError(
      `Failed to evaluate the first argument ${inspect(
        argPath.node,
        false,
        null,
        true
      )}`
    );
  }

  if (typeof evaluation.value !== 'string') {
    throw new MacroError(
      `The first argument must be evaluated into a string, but got ${inspect(
        evaluation.value,
        false,
        null,
        true
      )}`
    );
  }

  return evaluation.value;
}

export default evalFirstArgument;
