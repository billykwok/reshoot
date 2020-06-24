import { callExpression, identifier, stringLiteral } from '@babel/types';

import type { CallExpression } from '@babel/types';

function requireExpression(
  path: string,
  ...options: Array<Record<string, unknown>>
): CallExpression {
  const mergedOptions = Object.assign({}, ...options) as Record<
    string,
    unknown
  >;
  const queryString = Object.keys(mergedOptions).length
    ? `?${JSON.stringify(mergedOptions)}`
    : '';
  return callExpression(identifier('require'), [
    stringLiteral(`${path}${queryString}`),
  ]);
}

export default requireExpression;
