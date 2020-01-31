import defaultOptions from './defaultOptions';

const supportedKeys = Object.keys(defaultOptions);

export default function extractRest<T>(options: T): { [key: string]: string } {
  return Object.fromEntries(
    Object.entries(options)
      .filter(entry => supportedKeys.indexOf(entry[0]) < 0)
      .map<[string, string]>(entry => [entry[0], JSON.stringify(entry[1])])
  );
}
