import Ajv from 'ajv';
import addKeywordPresets from 'ajv-keywords';

import type { ErrorObject } from 'ajv';
import {
  AspectRatioType,
  AspectRatioFormat,
  Mime,
  ResolvedOptions,
} from '../type';

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
      instanceof: ['String', 'Function'],
      description: 'The directory where output images should be emitted to',
    },
    publicPath: {
      instanceof: ['String', 'Function'],
      description:
        'The path where the output images are accessed on the webpage',
    },
    shape: {
      instanceof: 'Function',
      description:
        'A function returning the shape of the exported object returned from import or require',
    },
    sources: {
      type: 'array',
      description: 'Alternative more efficient images for supported browsers',
      items: { type: 'string', enum: [Mime.WEBP] },
      uniqueItems: true,
    },
    enforceFormat: {
      type: ['string', 'null'],
      description: 'Enforce the output for all images to be in specific format',
    },
    srcSet: {
      type: 'array',
      description: 'Widths of responsive images',
      items: { type: 'number' },
      uniqueItems: true,
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
      type: ['string', 'null'],
      description:
        'The color used as the background of aspect ratio box before placeholder or final image is loaded',
    },
    placeholder: {
      type: ['object', 'null'],
      description: 'LQIP placeholder setting',
      properties: {
        size: {
          type: 'number',
          description: 'The wide of placeholder',
          exclusiveMinimum: 1,
        },
        quality: {
          type: 'number',
          description: 'The quality of placeholder',
          range: [1, 100],
        },
        trimDataUrl: {
          type: 'boolean',
          description: 'Whether to trim the initial prefix of data-url',
        },
      },
      allRequired: true,
      additionalProperties: false,
    },
    aspectRatio: {
      type: ['object', 'null'],
      description: 'Aspect ratio value setting in module export object',
      properties: {
        type: {
          type: 'string',
          description:
            'Express aspect ratio as width / height or height / width',
          enum: [AspectRatioType.HeightByWidth, AspectRatioType.WidthByHeight],
        },
        format: {
          type: 'string',
          description: 'Express aspect ratio as ratio or percentage',
          enum: [AspectRatioFormat.Ratio, AspectRatioFormat.Percent],
        },
        decimal: {
          type: 'number',
          description: 'Number of digits preserved after decimal point',
          range: [1, 10],
        },
      },
      allRequired: true,
      additionalProperties: false,
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
