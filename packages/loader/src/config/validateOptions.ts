import Ajv from 'ajv';
import addKeywordPresets from 'ajv-keywords';
import { AspectRatioType, AspectRatioFormat, Mime } from '../type';

import type { ErrorObject } from 'ajv';
import type { ResolvedOptions } from '../type';

const ajv = addKeywordPresets(
  new Ajv({ allErrors: true, verbose: true, $data: true })
);

const validate = ajv.compile({
  title: '@reshoot/loader options',
  type: 'object',
  properties: {
    mode: { type: 'string', description: 'Mode' },
    name: {
      type: 'string',
      description: 'Name pattern of the output image files',
    },
    outputPath: {
      anyOf: [{ type: 'null' }, { instanceof: ['String', 'Function'] }],
      description: 'The directory where output images should be emitted to',
    },
    publicPath: {
      anyOf: [{ type: 'null' }, { instanceof: ['String', 'Function'] }],
      description:
        'The path where the output images are accessed on the webpage',
    },
    shape: {
      instanceof: 'Function',
      description:
        'A function returning the shape of the exported object returned from import or require',
    },
    alternativeFormats: {
      type: 'array',
      description: 'Alternative more efficient images for supported browsers',
      items: { type: 'string', enum: [Mime.AVIF, Mime.WEBP] },
      uniqueItems: true,
    },
    alternativeWidths: {
      type: 'array',
      description: 'Widths of responsive images',
      items: { type: 'number' },
      uniqueItems: true,
    },
    defaultFormat: {
      type: ['string', 'null'],
      description: 'Enforce the output for all images to be in specific format',
    },
    defaultWidth: {
      type: ['number', 'null'],
      description: 'Max width of the fallback image',
    },
    quality: {
      type: 'number',
      description: 'The quality of output image',
      range: [1, 100],
    },
    background: {
      type: ['string', 'null'],
      description:
        'The color used to fill transparent background when input image is converted into a format that does not support transparency',
    },
    color: {
      type: ['string', 'boolean', 'null'],
      description:
        'The color used as the background of aspect ratio box before placeholder or final image is loaded',
    },
    placeholderSize: {
      type: ['number', 'null'],
      description: 'The wide of placeholder',
      exclusiveMinimum: 1,
    },
    placeholderQuality: {
      type: ['number', 'null'],
      description: 'The quality of placeholder',
      range: [1, 100],
    },
    placeholderTrimDataUrl: {
      type: ['boolean', 'null'],
      description: 'Whether to trim the initial prefix of data-url',
    },
    aspectRatioType: {
      type: ['string', 'null'],
      description: 'Express aspect ratio as width / height or height / width',
      enum: [
        AspectRatioType.HeightByWidth,
        AspectRatioType.WidthByHeight,
        null,
      ],
    },
    aspectRatioFormat: {
      type: ['string', 'null'],
      description: 'Express aspect ratio as ratio or percentage',
      enum: [AspectRatioFormat.Ratio, AspectRatioFormat.Percent, null],
    },
    aspectRatioDecimal: {
      type: ['number', 'null'],
      description: 'Number of digits preserved after decimal point',
      range: [1, 10],
    },
    fastMode: {
      type: 'boolean',
      description: 'Whether the loader should act as a pass-through loader',
    },
    cache: {
      type: 'boolean',
      description: 'Whether image output should be cached',
    },
    emitFile: { type: 'boolean', description: 'Whether to actually emit file' },
    esModule: {
      type: 'boolean',
      description: 'Whether module export uses ES module or CommonJS syntax',
    },
  },
  allRequired: true,
  additionalProperties: false,
});

function validateOptions(options: ResolvedOptions): ErrorObject[] {
  const result = validate(options);
  return result ? [] : validate.errors;
}

export default validateOptions;
