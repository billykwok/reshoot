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

  const serialized = JSON.stringify(mergedOptions);
  const queryString = serialized === '{}' ? '' : `?${serialized}`;
  return callExpression(identifier('require'), [
    stringLiteral(`${path}${queryString}`),
  ]);
}

export default requireExpression;
