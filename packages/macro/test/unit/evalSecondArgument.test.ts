import { describe, test, expect } from '@jest/globals';
import { objectExpression } from '@babel/types';
import { MacroError } from 'babel-plugin-macros';
import evalSecondArgument from '../../src/evalSecondArgument';

import type { NodePath } from '@babel/core';

describe('arguments', () => {
  test('parse valid second argument', () => {
    const nodePath = {
      node: objectExpression([]),
      evaluate: () => ({ confident: true, value: {} }),
    } as NodePath;
    expect(evalSecondArgument(nodePath)).toEqual({});
  });

  test('parse second argument that cannot be evaluated', () => {
    const nodePath = {
      node: objectExpression([]),
      evaluate: () => ({ confident: false, value: {} }),
    } as NodePath;
    expect(() => evalSecondArgument(nodePath)).toThrow(
      new MacroError('Failed to evaluate the second argument {}')
    );
  });
});
