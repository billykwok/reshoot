import util from 'util';
import { NodePath } from '@babel/core';
import { stringLiteral, objectExpression } from '@babel/types';
import { MacroError } from 'babel-plugin-macros';

import extractArgumentPaths from '../../src/arguments';

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
    const options = {};
    const referencePath = createReferencePath([
      {
        node: stringLiteral(path),
        evaluate: () => ({ confident: true, value: path })
      } as NodePath,
      {
        node: objectExpression([]),
        evaluate: () => ({ confident: true, value: options })
      } as NodePath
    ]);
    const result = extractArgumentPaths(referencePath);
    expect(result.length).toEqual(2);
    expect(result[0]).toEqual(path);
    expect(result[1]).toEqual(options);
  });

  test('parse input that is not a function call', () => {
    const referencePath = { parentPath: { type: 'Expression' } } as NodePath;
    expect(() => extractArgumentPaths(referencePath)).toThrow(
      new MacroError('Please use it as a function.')
    );
  });

  test('parse first argument of wrong type', () => {
    const options = {};
    const nodePath = {
      node: objectExpression([]),
      evaluate: () => ({ confident: true, value: options })
    } as NodePath;
    const referencePath = createReferencePath([nodePath]);
    expect(() => extractArgumentPaths(referencePath)).toThrow(
      new MacroError(
        `Failed to evaluate argument ${util.inspect(
          nodePath,
          false,
          null,
          true
        )}.`
      )
    );
  });

  test('parse first argument that cannot be evaluated', () => {
    const path = 'image.jpeg';
    const nodePath = {
      node: stringLiteral(path),
      evaluate: () => ({ confident: false, value: path })
    } as NodePath;
    const referencePath = createReferencePath([nodePath]);
    expect(() => extractArgumentPaths(referencePath)).toThrow(
      new MacroError(
        `Failed to evaluate argument ${util.inspect(
          nodePath,
          false,
          null,
          true
        )}.`
      )
    );
  });

  test('parse second argument of wrong type', () => {
    const path = 'image.jpeg';
    const referencePath = createReferencePath([
      {
        node: stringLiteral(path),
        evaluate: () => ({ confident: true, value: path })
      } as NodePath,
      {
        node: stringLiteral(path),
        evaluate: () => ({ confident: true, value: path })
      } as NodePath
    ]);
    expect(() => extractArgumentPaths(referencePath)).toThrow(
      new MacroError('The second argument must be an object expression.')
    );
  });

  test('parse second argument that cannot be evaluated', () => {
    const path = 'image.jpeg';
    const options = {};
    const referencePath = createReferencePath([
      {
        node: stringLiteral(path),
        evaluate: () => ({ confident: true, value: path })
      } as NodePath,
      {
        node: objectExpression([]),
        evaluate: () => ({ confident: false, value: options })
      } as NodePath
    ]);
    expect(() => extractArgumentPaths(referencePath)).toThrow(
      new MacroError('Failed to evaluate options.')
    );
  });

  test('parse extra arguments', () => {
    const path = 'image.jpeg';
    const options = {};
    const referencePath = createReferencePath([
      {
        node: stringLiteral(path),
        evaluate: () => ({ confident: true, value: path })
      } as NodePath,
      {
        node: objectExpression([]),
        evaluate: () => ({ confident: true, value: options })
      } as NodePath,
      {
        node: objectExpression([]),
        evaluate: () => ({ confident: true, value: options })
      } as NodePath
    ]);
    expect(() => extractArgumentPaths(referencePath)).toThrow(
      new MacroError('Invalid number of arguments: 3. Expected: 1 to 2')
    );
  });

  test('parse zero arguments', () => {
    const referencePath = createReferencePath([]);
    expect(() => extractArgumentPaths(referencePath)).toThrow(
      new MacroError('Invalid number of arguments: 0. Expected: 1 to 2')
    );
  });
});
