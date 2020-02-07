import {
  callExpression,
  objectExpression,
  stringLiteral,
  objectProperty,
  identifier,
  arrayExpression
} from '@babel/types';
import { NodePath } from '@babel/core';

import handle from '../../src/handle';

import extractArguments from '../../src/extractArguments';
import evalFirstArgument from '../../src/evalFirstArgument';
import evalSecondArgument from '../../src/evalSecondArgument';
import { MacroError } from 'babel-plugin-macros';

const mockFirstArg: NodePath = {
  node: stringLiteral('image.jpg'),
  evaluate: () => ({ confident: true, value: 'image.jpg' })
} as any;
const mockFirstArgJson: NodePath = {
  node: stringLiteral('./images.json'),
  evaluate: () => ({ confident: true, value: './images.json' })
} as any;
const mockSecondArg: NodePath = {
  node: objectExpression([
    objectProperty(stringLiteral('color'), stringLiteral('#eeff99'))
  ]),
  evaluate: () => ({ confident: true, value: { color: '#eeff99' } })
} as any;
const mockGetArguments = jest.fn(() => [mockFirstArg, mockSecondArg]);
const mockReplaceWith = jest.fn();
const referencePath: NodePath = {
  parentPath: {
    ...callExpression(objectExpression([]), []),
    get: mockGetArguments,
    replaceWith: mockReplaceWith
  }
} as any;
const references = { default: [referencePath] };

jest.mock('../../src/extractArguments.ts', () => ({
  __esModule: true,
  default: jest.fn(() => [mockFirstArg, mockSecondArg])
}));
jest.mock('../../src/evalFirstArgument.ts', () => ({
  __esModule: true,
  default: jest.fn(() => 'image.jpg')
}));
jest.mock('../../src/evalSecondArgument.ts', () => ({
  __esModule: true,
  default: jest.fn(() => ({ color: '#eeff99' }))
}));

describe('arguments', () => {
  beforeEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  test('parse invalid filename 1', () => {
    expect(() => handle({ references, state: null, babel: null })).toThrow(
      new MacroError('Failed to retrieve filename.')
    );
  });

  test('parse invalid filename 2', () => {
    const state = {};
    const params = { references, state, babel: null };
    expect(() => handle(params)).toThrow(
      new MacroError('Failed to retrieve filename.')
    );
  });

  test('parse invalid filename 3', () => {
    const state = { file: null };
    const params = { references, state, babel: null };
    expect(() => handle(params)).toThrow(
      new MacroError('Failed to retrieve filename.')
    );
  });

  test('parse invalid filename 4', () => {
    const state = { file: { opts: null } };
    const params = { references, state, babel: null };
    expect(() => handle(params)).toThrow(
      new MacroError('Failed to retrieve filename.')
    );
  });

  test('parse invalid filename 5', () => {
    const state = { file: { opts: { filename: null } } };
    const params = { references, state, babel: null };
    expect(() => handle(params)).toThrow(
      new MacroError('Failed to retrieve filename.')
    );
  });

  test('parse valid image input with both arguments', () => {
    const state = {
      file: { opts: { filename: '../../../__fixtures__/stub.js' } }
    };
    const params = { references, state, babel: null };
    handle(params);
    expect(extractArguments).toHaveBeenNthCalledWith(1, referencePath);
    expect(evalFirstArgument).toHaveBeenNthCalledWith(1, mockFirstArg);
    expect(evalSecondArgument).toHaveBeenNthCalledWith(1, mockSecondArg);
    expect(mockReplaceWith).toHaveBeenNthCalledWith(
      1,
      callExpression(identifier('require'), [
        stringLiteral('image.jpg?{"color":"#eeff99"}')
      ])
    );
  });

  test('parse valid image input with only one argument', () => {
    (extractArguments as jest.Mock<
      ReturnType<typeof extractArguments>
    >).mockReturnValue([mockFirstArg]);
    const state = {
      file: { opts: { filename: '../../../__fixtures__/stub.js' } }
    };
    const params = { references, state, babel: null };
    handle(params);
    expect(extractArguments).toHaveBeenNthCalledWith(1, referencePath);
    expect(evalFirstArgument).toHaveBeenNthCalledWith(1, mockFirstArg);
    expect(evalSecondArgument).not.toBeCalled();
    expect(mockReplaceWith).toHaveBeenNthCalledWith(
      1,
      callExpression(identifier('require'), [stringLiteral('image.jpg')])
    );
  });

  test('parse valid json input with both arguments', () => {
    (extractArguments as jest.Mock<
      ReturnType<typeof extractArguments>
    >).mockReturnValue([mockFirstArgJson, mockSecondArg]);
    (evalFirstArgument as jest.Mock<
      ReturnType<typeof evalFirstArgument>
    >).mockReturnValue('images.json');
    mockGetArguments.mockReturnValue([mockFirstArgJson, mockSecondArg]);
    const state = {
      file: { opts: { filename: '../../../__fixtures__/stub.js' } }
    };
    const params = { references, state, babel: null };
    handle(params);
    expect(extractArguments).toHaveBeenNthCalledWith(1, referencePath);
    expect(evalFirstArgument).toHaveBeenNthCalledWith(1, mockFirstArgJson);
    expect(evalSecondArgument).toHaveBeenNthCalledWith(1, mockSecondArg);
    expect(mockReplaceWith).toHaveBeenNthCalledWith(
      1,
      arrayExpression([
        callExpression(identifier('require'), [
          stringLiteral('image-1.jpg?{"color":"red","others":1}')
        ]),
        callExpression(identifier('require'), [
          stringLiteral('image-2.png?{"color":"blue","others":2}')
        ]),
        callExpression(identifier('require'), [
          stringLiteral('image-3.webp?{"color":"yellow","others":3}')
        ]),
        callExpression(identifier('require'), [
          stringLiteral('image-4.gif?{"color":"#ddeeaa","others":4}')
        ]),
        callExpression(identifier('require'), [
          stringLiteral('image-5.svg?{"color":"#eeff99","others":5}')
        ])
      ])
    );
  });

  test('parse valid json input with only one argument', () => {
    (extractArguments as jest.Mock<
      ReturnType<typeof extractArguments>
    >).mockReturnValue([mockFirstArgJson]);
    (evalFirstArgument as jest.Mock<
      ReturnType<typeof evalFirstArgument>
    >).mockReturnValue('images.json');
    mockGetArguments.mockReturnValue([mockFirstArgJson]);
    const state = {
      file: { opts: { filename: '../../../__fixtures__/stub.js' } }
    };
    const params = { references, state, babel: null };
    handle(params);
    expect(extractArguments).toHaveBeenNthCalledWith(1, referencePath);
    expect(evalFirstArgument).toHaveBeenNthCalledWith(1, mockFirstArgJson);
    expect(evalSecondArgument).not.toBeCalled();
    expect(mockReplaceWith).toHaveBeenNthCalledWith(
      1,
      arrayExpression([
        callExpression(identifier('require'), [
          stringLiteral('image-1.jpg?{"color":"red","others":1}')
        ]),
        callExpression(identifier('require'), [
          stringLiteral('image-2.png?{"color":"blue","others":2}')
        ]),
        callExpression(identifier('require'), [
          stringLiteral('image-3.webp?{"color":"yellow","others":3}')
        ]),
        callExpression(identifier('require'), [
          stringLiteral('image-4.gif?{"color":"#ddeeaa","others":4}')
        ]),
        callExpression(identifier('require'), [
          stringLiteral('image-5.svg?{"others":5}')
        ])
      ])
    );
  });
});
