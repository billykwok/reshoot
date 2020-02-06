import util from 'util';
import { NodePath } from '@babel/core';
import { stringLiteral, objectExpression } from '@babel/types';
import { MacroError } from 'babel-plugin-macros';

import extractArgumentPaths from '../../src/extractArguments';

function createReferencePath(argumentNodes: NodePath[]): NodePath {
  return {
    parentPath: {
      type: 'CallExpression',
      get(property: string) {
        if (property === 'arguments') return argumentNodes;
      }
    }
  } as NodePath;
}

describe('arguments', () => {
  test('parse valid input', () => {
    const path = 'image.jpeg';
    const firstArgPath = { node: stringLiteral(path) } as NodePath;
    const secondArgPath = { node: objectExpression([]) } as NodePath;
    const referencePath = createReferencePath([firstArgPath, secondArgPath]);
    const result = extractArgumentPaths(referencePath);
    expect(result.length).toEqual(2);
    expect(result[0]).toEqual(firstArgPath);
    expect(result[1]).toEqual(secondArgPath);
  });

  test('parse input that is not a function call', () => {
    const referencePath = { parentPath: { type: 'Expression' } } as NodePath;
    expect(() => extractArgumentPaths(referencePath)).toThrow(
      new MacroError('Please use it as a function.')
    );
  });

  test('parse second argument of wrong type', () => {
    const path = 'image.jpeg';
    const stringPath = stringLiteral(path);
    const referencePath = createReferencePath([
      { node: stringPath } as NodePath,
      { node: stringPath } as NodePath
    ]);
    expect(() => extractArgumentPaths(referencePath)).toThrow(
      new MacroError(
        `The second argument must be an expression, but got ${util.inspect(
          stringPath,
          false,
          null,
          true
        )}.`
      )
    );
  });

  test('parse extra arguments', () => {
    const path = 'image.jpeg';
    const referencePath = createReferencePath([
      { node: stringLiteral(path) } as NodePath,
      { node: objectExpression([]) } as NodePath,
      { node: objectExpression([]) } as NodePath
    ]);
    expect(() => extractArgumentPaths(referencePath)).toThrow(
      new MacroError('Expect 1 or 2 arguments, but got 3.')
    );
  });

  test('parse zero arguments', () => {
    const referencePath = createReferencePath([]);
    expect(() => extractArgumentPaths(referencePath)).toThrow(
      new MacroError('Expect 1 or 2 arguments, but got 0.')
    );
  });
});
