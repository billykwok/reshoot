import { MetroHash64 } from 'metrohash';
import version from './version';

import type { ResolvedOptions } from '../type';

const DELIMITER_1 = ',';
const NULL = '2';
const TRUE = '1';
const FALSE = '0';

function makeBooleanHashable(value: boolean): string {
  if (value === null) return NULL;
  return value ? TRUE : FALSE;
}

function makeNumberHashable(value: number): string {
  if (value === null) return NULL;
  return value.toString(10);
}

function makeStringHashable(value: string): string {
  if (value === null) return NULL;
  return value;
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
    makeStringHashable(options.defaultFormat) +
    DELIMITER_1 +
    makeNumberHashable(options.defaultWidth) +
    DELIMITER_1 +
    makeNumberHashable(options.quality) +
    DELIMITER_1 +
    makeStringHashable(options.background) +
    DELIMITER_1 +
    (typeof options.color === 'boolean'
      ? makeBooleanHashable(true)
      : options.color
      ? options.color
      : NULL) +
    DELIMITER_1 +
    makeNumberHashable(options.placeholderSize) +
    DELIMITER_1 +
    makeBooleanHashable(options.placeholderTrimDataUrl) +
    DELIMITER_1 +
    makeNumberHashable(options.placeholderQuality) +
    DELIMITER_1 +
    makeStringHashable(options.aspectRatioType) +
    DELIMITER_1 +
    makeStringHashable(options.aspectRatioFormat) +
    DELIMITER_1 +
    makeNumberHashable(options.aspectRatioDecimal) +
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
