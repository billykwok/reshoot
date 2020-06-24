import { MacroError } from 'babel-plugin-macros';
import type { NodePath } from '@babel/core';

import inspect from './inspect';

function evalSecondArgument(argPath: NodePath): Record<string, unknown> {
  const { confident, value } = argPath.evaluate() as {
    confident: boolean;
    value: Record<string, unknown>;
  };

  if (!confident) {
    throw new MacroError(
      `Failed to evaluate the second argument ${inspect(value)}.`
    );
  }

  return value;
}

export default evalSecondArgument;
