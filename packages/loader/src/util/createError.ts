import type { ErrorObject } from 'ajv';

function createError(errors: ErrorObject[]): string {
  return (
    '@reshoot/loader options are not valid:\n' +
    errors
      .map(({ dataPath, message, data }, i) => {
        if (!dataPath) {
          return `${i + 1}. options: ${message}, but got ${JSON.stringify(
            data
          )}`;
        }
        const regexResult = /^\.(.*)/gi.exec(dataPath);
        if (!regexResult) {
          return `${i + 1}. options: ${message}, but got ${JSON.stringify(
            data
          )}`;
        }
        const property = regexResult[1];
        return `${i + 1}. ${property}: ${message}, but got ${JSON.stringify(
          data
        )}`;
      })
      .join('\n')
  );
}

export default createError;
