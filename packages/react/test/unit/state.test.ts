import { describe, test, expect } from '@jest/globals';
import {
  MANUAL,
  OFFLINE,
  ERROR,
  HIDDEN,
  LOADING,
  FADING,
  LOADED,
} from '../../src/state';

describe('State', () => {
  test('correct underlying value and equality for MANUAL', () => {
    expect(MANUAL).toEqual(0);
  });

  test('correct underlying value and equality for OFFLINE', () => {
    expect(OFFLINE).toEqual(1);
  });

  test('correct underlying value and equality for ERROR', () => {
    expect(ERROR).toEqual(2);
  });

  test('correct underlying value and equality for HIDDEN', () => {
    expect(HIDDEN).toEqual(3);
  });

  test('correct underlying value and equality for LOADING', () => {
    expect(LOADING).toEqual(4);
  });

  test('correct underlying value and equality for FADING', () => {
    expect(FADING).toEqual(5);
  });

  test('correct underlying value and equality for LOADED', () => {
    expect(LOADED).toEqual(6);
  });
});
