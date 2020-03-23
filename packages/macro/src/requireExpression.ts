import { callExpression, identifier, stringLiteral } from '@babel/types';

function requireExpression(path: string, ...options: { [key: string]: any }[]) {
  const mergedOptions = Object.assign({}, ...options);
  const queryString = Object.keys(mergedOptions).length
    ? `?${JSON.stringify(mergedOptions)}`
    : '';
  return callExpression(identifier('require'), [
    stringLiteral(`${path}${queryString}`),
  ]);
}

export default requireExpression;
