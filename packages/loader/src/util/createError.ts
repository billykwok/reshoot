import type { ErrorObject } from 'ajv';

function createError(errors: ErrorObject[]): string {
  return (
    '@reshoot/loader options are not valid:\n' +
    errors
      .map(({ dataPath, message, data }, i) => {
        const property = dataPath ? /^\.(.*)/gi.exec(dataPath)[1] : 'options';
        return `${i + 1}. ${property}: ${message}${
          dataPath ? `, but got ${JSON.stringify(data)}` : ''
        }`;
      })
      .join('\n')
  );
}

export default createError;
