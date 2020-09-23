import { describe, test, expect } from '@jest/globals';
import createError from '../../../src/util/createError';

describe('createError', () => {
  const baseErrorObject = {
    keyword: 'someKeyword',
    schemaPath: 'someSchemaPath',
    params: [],
  };

  test('should generate error message correctly', () => {
    expect(
      createError([
        {
          ...baseErrorObject,
          dataPath: null,
          message: 'something wrong happened',
        },
        {
          ...baseErrorObject,
          dataPath: '.property1',
          message: 'something wrong happened',
          data: 'actualData1',
        },
        {
          ...baseErrorObject,
          dataPath: '.property2',
          message: 'something wrong happened',
          data: 'actualData2',
        },
      ])
    ).toEqual(
      '@reshoot/loader options are not valid:\n1. options: something wrong happened, but got undefined\n2. property1: something wrong happened, but got "actualData1"\n3. property2: something wrong happened, but got "actualData2"'
    );
  });
});
