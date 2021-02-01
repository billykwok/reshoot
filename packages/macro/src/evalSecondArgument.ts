import { MacroError } from 'babel-plugin-macros';
import { inspect } from 'util';

import type { ParsedUrlQueryInput } from 'querystring';
import type { NodePath } from '@babel/core';

function evalSecondArgument(argPath: NodePath): ParsedUrlQueryInput {
  const { confident, value } = argPath.evaluate() as {
    confident: boolean;
    value: ParsedUrlQueryInput;
  };

  if (!confident) {
    throw new MacroError(
      `Failed to evaluate the second argument ${inspect(
        value,
        false,
        null,
        true
      )}`
    );
  }

  return value;
}

export default evalSecondArgument;
