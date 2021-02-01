import querystring from 'querystring';
import { callExpression, identifier, stringLiteral } from '@babel/types';

import type { ParsedUrlQueryInput } from 'querystring';
import type { CallExpression } from '@babel/types';

export function requireExpression(
  path: string,
  ...options: ParsedUrlQueryInput[]
): CallExpression {
  const mergedOptions = Object.assign({}, ...options) as ParsedUrlQueryInput;
  const serialized = querystring.stringify(mergedOptions);
  const queryString = serialized === '' ? '' : `?${serialized}`;
  return callExpression(identifier('require'), [
    stringLiteral(`${path}${queryString}`),
  ]);
}
