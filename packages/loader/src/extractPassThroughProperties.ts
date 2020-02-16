import defaultOptions from './defaultOptions';
import { InternalOutput } from './type';

const supportedKeys = Object.keys(defaultOptions);

function extractPassThroughProperties<T>(options: T): Partial<InternalOutput> {
  return Object.fromEntries(
    Object.entries(options).filter(entry => supportedKeys.indexOf(entry[0]) < 0)
  );
}

export default extractPassThroughProperties;
