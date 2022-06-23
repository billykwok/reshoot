import {
  default as BabelPluginMacros,
  type MacroParams,
} from 'babel-plugin-macros';
import { type NodePath } from '@babel/core';
import { statement } from '@babel/template';
import {
  type Program,
  type Statement,
  identifier,
  isCallExpression,
  stringLiteral,
} from '@babel/types';

import { evalOptions, evalPath } from './eval';

const importDeclaration = statement('import %%name%% from %%url%%;', {
  syntacticPlaceholders: true,
});

export default function handle({ references }: Partial<MacroParams>): void {
  if (references.default.length) {
    const imports: Statement[] = [];
    const imported = new Map<string, string>();

    references.default.forEach((referencePath) => {
      if (!isCallExpression(referencePath.parentPath)) {
        throw new BabelPluginMacros.MacroError('Please use it as a function');
      }

      const argumentPaths = referencePath.parentPath.get(
        'arguments'
      ) as NodePath[];
      const numberOfArguments = argumentPaths.length;
      if (numberOfArguments < 1 || numberOfArguments > 2) {
        throw new BabelPluginMacros.MacroError(
          `Expect 1 - 2 argument(s), but got ${numberOfArguments}`
        );
      }
      const [firstArgumentPath, secondArgumentPath] = argumentPaths;
      let url = evalPath(firstArgumentPath);
      const inlineOptions = evalOptions(secondArgumentPath);

      const [, existingSearchParams] = url.split('?');
      const serializedOptions = new URLSearchParams(
        inlineOptions as Record<string, string>
      ).toString();
      if (serializedOptions) {
        url += `${existingSearchParams ? '&' : '?'}${serializedOptions}`;
      }

      let name = imported.get(url);
      if (!name) {
        name = `__${imported.size}_${url.replace(/\W/g, '_')}__`;
        imports.push(
          importDeclaration({
            name: identifier(name),
            url: stringLiteral(url),
          })
        );
        imported.set(url, name);
      }
      referencePath.parentPath.replaceWith(identifier(name));
    });

    const programPath = references.default[0].findParent(
      (path) => !path.parentPath
    ) as NodePath<Program>;
    programPath.unshiftContainer('body', imports);
  }
}
