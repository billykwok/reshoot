import { describe, test, expect } from '@jest/globals';
import * as State from '../../src/state';

describe('State', () => {
  test('correct underlying value and equality for MANUAL', () => {
    expect(State.MANUAL).toEqual(1);
  });

  test('correct underlying value and equality for OFFLINE', () => {
    expect(State.OFFLINE).toEqual(2);
  });

  test('correct underlying value and equality for ERROR', () => {
    expect(State.ERROR).toEqual(3);
  });

  test('correct underlying value and equality for INITIAL', () => {
    expect(State.INITIAL).toEqual(4);
  });

  test('correct underlying value and equality for LOADED', () => {
    expect(State.LOADED).toEqual(5);
  });
});
