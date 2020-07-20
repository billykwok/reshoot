import { describe, test, expect } from '@jest/globals';
import cx from '../../../src/utils/cx';

describe('cx', () => {
  test('should concat truthy value', () => {
    const className = cx('class1', false, null, undefined, '', 'class2');
    expect(className).toEqual('class1 class2');
  });
});
