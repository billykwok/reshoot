import { describe, test, expect } from '@jest/globals';
import notUndefined from '../../../src/utils/notUndefined';

describe('notUndefined', () => {
  test('should return true when the given value is not undefined', () => {
    expect(notUndefined('UNDEFINED')).toEqual(true);
  });

  test('should return false when the given value is undefined', () => {
    expect(notUndefined('undefined')).toEqual(false);
  });
});
