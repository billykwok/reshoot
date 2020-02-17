import { InternalOutput, Options } from './type';

function extractPassThroughProperties(
  options: Partial<Options> & { [extra: string]: any },
  defaultOptions: Options
): Partial<InternalOutput> {
  const supportedKeys = Object.keys(defaultOptions);
  return Object.fromEntries(
    Object.entries(options).filter(entry => supportedKeys.indexOf(entry[0]) < 0)
  );
}

export default extractPassThroughProperties;
