import { createMacro } from 'babel-plugin-macros';

import extractArgumentPaths from './arguments';

export default createMacro(function reshootMacro({ references }) {
  references.default.forEach(referencePath => {
    const [path, options] = extractArgumentPaths(referencePath);
    const queryString = Object.keys(options).length
      ? `?${JSON.stringify(options)}`
      : '';
    referencePath.parentPath.replaceWithSourceString(
      `require('${path}${queryString}')`
    );
  });
});
