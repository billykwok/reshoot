import { describe, beforeEach, afterEach, test, expect } from '@jest/globals';
import { intersectionObserver } from '@shopify/jest-dom-mocks';

describe('intersection', () => {
  const baseDomRect: DOMRectReadOnly = {
    bottom: 0,
    height: 0,
    left: 0,
    right: 0,
    top: 0,
    width: 0,
    x: 0,
    y: 0,
    toJSON: jest.fn(),
  };
  const baseEntry: IntersectionObserverEntry = {
    boundingClientRect: baseDomRect,
    intersectionRatio: 1,
    intersectionRect: baseDomRect,
    isIntersecting: true,
    rootBounds: null,
    target: null,
    time: 0,
  };

  beforeEach(() => {
    intersectionObserver.mock();
  });

  afterEach(() => {
    intersectionObserver.restore();
    jest.resetModules();
  });

  test('should return noop if IntersectionObserver is not supported', async () => {
    jest.doMock('../../../src/utils/supportIntersectionObserver', () => ({
      __esModule: true,
      default: false,
    }));
    const { subscribe } = await import('../../../src/utils/intersection');
    subscribe(null, null);
    expect(intersectionObserver.observers).toHaveLength(0);
  });

  test('should handle multiple elements subscription and unsubscription correctly', async () => {
    jest.doMock('../../../src/utils/supportIntersectionObserver', () => ({
      __esModule: true,
      default: true,
    }));
    const { subscribe, unsubscribe } = await import(
      '../../../src/utils/intersection'
    );
    expect(intersectionObserver.observers).toHaveLength(0);

    const [element1, handler1] = [document.createElement('div'), jest.fn()];
    const [element2, handler2] = [document.createElement('div'), jest.fn()];
    subscribe(element1, handler1);
    expect(intersectionObserver.observers).toHaveLength(1);
    subscribe(element2, handler2);
    expect(intersectionObserver.observers).toHaveLength(2);
    const [observer1, observer2] = intersectionObserver.observers;
    expect(observer1.options).toEqual({ rootMargin: '25% 0% 60%' });
    expect(observer1.target).toEqual(element1);
    expect(observer2.options).toEqual({ rootMargin: '25% 0% 60%' });
    expect(observer2.target).toEqual(element2);

    intersectionObserver.simulate({ ...baseEntry, target: element1 });
    expect(handler1).toHaveBeenCalledTimes(1);
    expect(handler2).toHaveBeenCalledTimes(0);

    intersectionObserver.simulate(baseEntry);
    expect(handler1).toHaveBeenCalledTimes(2);
    expect(handler2).toHaveBeenCalledTimes(1);

    unsubscribe(element1);
    intersectionObserver.simulate(baseEntry);
    expect(intersectionObserver.observers).toHaveLength(1);
    expect(handler1).toHaveBeenCalledTimes(2);
    expect(handler2).toHaveBeenCalledTimes(2);

    unsubscribe(element2);
    intersectionObserver.simulate(baseEntry);
    expect(intersectionObserver.observers).toHaveLength(0);
    expect(handler1).toHaveBeenCalledTimes(2);
    expect(handler2).toHaveBeenCalledTimes(2);
  });

  test('should return noop unsubscribe if subscribe is called with null arguments', async () => {
    jest.doMock('../../../src/utils/supportIntersectionObserver', () => ({
      __esModule: true,
      default: true,
    }));
    const { subscribe, unsubscribe } = await import(
      '../../../src/utils/intersection'
    );
    expect(intersectionObserver.observers).toHaveLength(0);

    subscribe(null, jest.fn());
    expect(intersectionObserver.observers).toHaveLength(0);

    unsubscribe(null);
    expect(intersectionObserver.observers).toHaveLength(0);
  });
});
