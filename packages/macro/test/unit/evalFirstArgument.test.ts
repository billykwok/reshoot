import { describe, test, expect } from '@jest/globals';
import util from 'util';
import { stringLiteral, objectExpression } from '@babel/types';
import { MacroError } from 'babel-plugin-macros';
import type { NodePath } from '@babel/core';

import evalFirstArgument from '../../src/evalFirstArgument';

describe('arguments', () => {
  test('parse valid first argument', () => {
    const path = 'image.jpg';
    const nodePath = {
      node: stringLiteral(path),
      evaluate: () => ({ confident: true, value: path }),
    } as NodePath;
    expect(evalFirstArgument(nodePath)).toEqual(path);
  });

  test('parse first argument of wrong type', () => {
    const options = {};
    const nodePath = {
      node: objectExpression([]),
      evaluate: () => ({ confident: true, value: options }),
    } as NodePath;
    expect(() => evalFirstArgument(nodePath)).toThrow(
      new MacroError(
        `The first argument must be evaluated into a string, but got {}.`
      )
    );
  });

  test('parse first argument that cannot be evaluated', () => {
    const path = 'image.jpeg';
    const stringPath = stringLiteral(path);
    const nodePath = {
      node: stringPath,
      evaluate: () => ({ confident: false, value: path }),
    } as NodePath;
    expect(() => evalFirstArgument(nodePath)).toThrow(
      new MacroError(
        `Failed to evaluate the first argument ${util.inspect(
          stringPath,
          false,
          null,
          true
        )}.`
      )
    );
  });
});
