import { MetroHash64 } from 'metrohash';
import { version } from '../../package.json';

import type { AspectRatio, ResolvedOptions } from '../type';

const DELIMITER_1 = ',';
const DELIMITER_2 = '|';
const NULL = '2';
const TRUE = '1';
const FALSE = '0';

function makeBooleanHashable(value: boolean): string {
  return value ? TRUE : FALSE;
}

function makeNumberHashable(value: number): string {
  return value.toString(10);
}

function makeAspectRatioHashable(value: AspectRatio): string {
  return (
    value.type +
    DELIMITER_2 +
    value.format +
    DELIMITER_2 +
    makeNumberHashable(value.decimal)
  );
}

type SerializableOptions = Omit<ResolvedOptions, 'publicPath' | 'outputPath'>;

function makeOptionsHashable(options: SerializableOptions) {
  return (
    options.mode +
    DELIMITER_1 +
    options.name +
    DELIMITER_1 +
    options.alternativeFormats.join() +
    DELIMITER_1 +
    options.alternativeWidths.join() +
    DELIMITER_1 +
    (options.defaultFormat ? options.defaultFormat.toString() : NULL) +
    DELIMITER_1 +
    (options.defaultWidth ? makeNumberHashable(options.defaultWidth) : NULL) +
    DELIMITER_1 +
    makeNumberHashable(options.quality) +
    DELIMITER_1 +
    (options.background ? options.background : NULL) +
    DELIMITER_1 +
    (options.color ? options.color : NULL) +
    DELIMITER_1 +
    (options.placeholder
      ? makeNumberHashable(options.placeholder.size) +
        DELIMITER_2 +
        options.placeholder.trimDataUrl.toString()
      : NULL) +
    DELIMITER_1 +
    (options.aspectRatio
      ? makeAspectRatioHashable(options.aspectRatio)
      : NULL) +
    DELIMITER_1 +
    makeBooleanHashable(options.fastMode) +
    DELIMITER_1 +
    makeBooleanHashable(options.esModule)
  );
}

function computeHash(
  content: Buffer | string,
  options: SerializableOptions
): string {
  return new MetroHash64()
    .update(version + makeOptionsHashable(options))
    .update(content)
    .digest();
}

export default computeHash;
