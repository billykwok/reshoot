import { MacroError } from 'babel-plugin-macros';

export default function extractArgumentPaths(referencePath: any) {
  if (referencePath.parentPath.type !== 'CallExpression') {
    throw new MacroError('Please use it as a function.');
  }

  const argumentPaths = referencePath.parentPath.get('arguments');
  const numberOfArguments = argumentPaths.length;

  if (numberOfArguments === 0 || numberOfArguments > 2) {
    throw new MacroError(
      'Invalid number of arguments: ' + numberOfArguments + '. Expected: 1 to 2'
    );
  }

  if (argumentPaths[0].node.type !== 'StringLiteral') {
    throw new MacroError('The first argument must be a string literal.');
  }

  const pathEvaluation = argumentPaths[0].evaluate();

  if (!pathEvaluation.confident) {
    throw new MacroError('Failed to evaluate path.');
  }

  if (numberOfArguments === 1) {
    return [pathEvaluation.value, {}];
  }

  if (argumentPaths[1].node.type !== 'ObjectExpression') {
    throw new MacroError('The second argument must be an object expression.');
  }

  const optionsEvaluation = argumentPaths[1].evaluate();

  if (!optionsEvaluation.confident) {
    throw new MacroError('Failed to evaluate options.');
  }

  return [pathEvaluation.value, optionsEvaluation.value];
}
