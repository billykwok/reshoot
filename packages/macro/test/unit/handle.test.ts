import { describe, beforeAll, afterEach, test, expect } from '@jest/globals';
import {
  callExpression,
  objectExpression,
  stringLiteral,
  objectProperty,
  identifier,
} from '@babel/types';
import { MacroError } from 'babel-plugin-macros';
import handle from '../../src/handle';

import type { NodePath, PluginPass } from '@babel/core';

describe('arguments', () => {
  const mockFirstArg = {
    node: stringLiteral('image.jpg'),
    evaluate: () => ({ confident: true, value: 'image.jpg' }),
  } as NodePath;
  const mockFirstArgJson = {
    node: stringLiteral('./images.json'),
    evaluate: () => ({ confident: true, value: './images.json' }),
  } as NodePath;
  const mockSecondArg = {
    node: objectExpression([
      objectProperty(stringLiteral('color'), stringLiteral('#eeff99')),
    ]),
    evaluate: () => ({ confident: true, value: { color: '#eeff99' } }),
  } as NodePath;
  const mockGetArguments = jest.fn(() => [mockFirstArg, mockSecondArg]);
  const mockReplaceWith = jest.fn();
  const referencePath = {
    parentPath: {
      ...callExpression(objectExpression([]), []),
      get: mockGetArguments,
      replaceWith: mockReplaceWith,
    } as Partial<NodePath>,
  } as NodePath;
  const references = { default: [referencePath] };
  const extractArguments = jest.fn(() => [mockFirstArg, mockSecondArg]);
  const evalFirstArgument = jest.fn(() => 'image.jpg');
  const evalSecondArgument = jest.fn(() => ({ color: '#eeff99' }));

  beforeAll(() => {
    jest.doMock('../../src/extractArguments.ts', () => ({
      __esModule: true,
      default: extractArguments,
    }));
    jest.doMock('../../src/evalFirstArgument.ts', () => ({
      __esModule: true,
      default: evalFirstArgument,
    }));
    jest.doMock('../../src/evalSecondArgument.ts', () => ({
      __esModule: true,
      default: evalSecondArgument,
    }));
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  test('parse invalid filename 1', () => {
    expect(() => handle({ references, state: null, babel: null })).toThrow(
      new MacroError('Failed to retrieve filename')
    );
  });

  test('parse invalid filename 2', () => {
    expect(() =>
      handle({ references, state: {} as PluginPass, babel: null })
    ).toThrow(new MacroError('Failed to retrieve filename'));
  });

  test('parse invalid filename 3', () => {
    const state = { file: null } as PluginPass;
    const params = { references, state, babel: null };
    expect(() => handle(params)).toThrow(
      new MacroError('Failed to retrieve filename')
    );
  });

  test('parse invalid filename 4', () => {
    const state = { file: { opts: null } } as PluginPass;
    const params = { references, state, babel: null };
    expect(() => handle(params)).toThrow(
      new MacroError('Failed to retrieve filename')
    );
  });

  test('parse invalid filename 5', () => {
    const state = { file: { opts: { filename: null } } } as PluginPass;
    const params = { references, state, babel: null };
    expect(() => handle(params)).toThrow(
      new MacroError('Failed to retrieve filename')
    );
  });

  test('parse valid image input with both arguments', () => {
    const state = {
      file: { opts: { filename: '../../../__fixtures__/stub.js' } },
    } as PluginPass;
    const params = { references, state, babel: null };
    handle(params);
    expect(mockReplaceWith).toHaveBeenNthCalledWith(
      1,
      callExpression(identifier('require'), [
        stringLiteral('image.jpg?color=%23eeff99'),
      ])
    );
  });

  test('parse valid image input with only one argument', () => {
    extractArguments.mockReturnValue([mockFirstArg]);
    const state = {
      file: { opts: { filename: '../../../__fixtures__/stub.js' } },
    } as PluginPass;
    const params = { references, state, babel: null };
    handle(params);
    expect(mockReplaceWith).toHaveBeenNthCalledWith(
      1,
      callExpression(identifier('require'), [
        stringLiteral('image.jpg?color=%23eeff99'),
      ])
    );
  });

  test('parse valid json input with both arguments', () => {
    extractArguments.mockReturnValue([mockFirstArgJson, mockSecondArg]);
    evalFirstArgument.mockReturnValue('images.json');
    mockGetArguments.mockReturnValue([mockFirstArgJson, mockSecondArg]);
    const state = {
      file: { opts: { filename: '../../../__fixtures__/stub.js' } },
    } as PluginPass;
    const params = { references, state, babel: null };
    handle(params);
    expect(mockReplaceWith.mock.calls).toHaveLength(1);
    expect(mockReplaceWith.mock.calls[0]).toMatchSnapshot();
  });

  test('parse valid json input with only one argument', () => {
    extractArguments.mockReturnValue([mockFirstArgJson]);
    evalFirstArgument.mockReturnValue('images.json');
    mockGetArguments.mockReturnValue([mockFirstArgJson]);
    const state = {
      file: { opts: { filename: '../../../__fixtures__/stub.js' } },
    } as PluginPass;
    const params = { references, state, babel: null };
    handle(params);
    expect(mockReplaceWith.mock.calls).toHaveLength(1);
    expect(mockReplaceWith.mock.calls[0]).toMatchSnapshot();
  });
});
