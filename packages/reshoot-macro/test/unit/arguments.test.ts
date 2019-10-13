import { MacroError } from 'babel-plugin-macros';

import extractArgumentPaths from '../../src/arguments';

function createReferencePath(argumentNodes) {
  return {
    parentPath: {
      type: 'CallExpression',
      get(property) {
        if (property === 'arguments') {
          return argumentNodes;
        }
      }
    }
  };
}

describe('arguments', () => {
  test('parse valid input', () => {
    const path = 'image.jpeg';
    const options = {};
    const referencePath = createReferencePath([
      {
        node: { type: 'StringLiteral' },
        evaluate: () => ({ confident: true, value: path })
      },
      {
        node: { type: 'ObjectExpression' },
        evaluate: () => ({ confident: true, value: options })
      }
    ]);
    const result = extractArgumentPaths(referencePath);
    expect(result.length).toEqual(2);
    expect(result[0]).toEqual(path);
    expect(result[1]).toEqual(options);
  });

  test('parse input that is not a function call', () => {
    const referencePath = { parentPath: { type: 'Expression' } };
    expect(() => extractArgumentPaths(referencePath)).toThrow(
      new MacroError('Please use it as a function.')
    );
  });

  test('parse first argument of wrong type', () => {
    const options = {};
    const referencePath = createReferencePath([
      {
        node: { type: 'ObjectExpression' },
        evaluate: () => ({ confident: true, value: options })
      }
    ]);
    expect(() => extractArgumentPaths(referencePath)).toThrow(
      new MacroError('The first argument must be a string literal.')
    );
  });

  test('parse first argument that cannot be evaluated', () => {
    const path = 'image.jpeg';
    const referencePath = createReferencePath([
      {
        node: { type: 'StringLiteral' },
        evaluate: () => ({ confident: false, value: path })
      }
    ]);
    expect(() => extractArgumentPaths(referencePath)).toThrow(
      new MacroError('Failed to evaluate path.')
    );
  });

  test('parse second argument of wrong type', () => {
    const path = 'image.jpeg';
    const referencePath = createReferencePath([
      {
        node: { type: 'StringLiteral' },
        evaluate: () => ({ confident: true, value: path })
      },
      {
        node: { type: 'StringLiteral' },
        evaluate: () => ({ confident: true, value: path })
      }
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
        node: { type: 'StringLiteral' },
        evaluate: () => ({ confident: true, value: path })
      },
      {
        node: { type: 'ObjectExpression' },
        evaluate: () => ({ confident: false, value: options })
      }
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
        node: { type: 'StringLiteral' },
        evaluate: () => ({ confident: true, value: path })
      },
      {
        node: { type: 'ObjectExpression' },
        evaluate: () => ({ confident: true, value: options })
      },
      {
        node: { type: 'ObjectExpression' },
        evaluate: () => ({ confident: true, value: options })
      }
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
