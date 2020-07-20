import { describe, beforeEach, afterEach, test, expect } from '@jest/globals';
import { intersectionObserver } from '@shopify/jest-dom-mocks';
import noop from '../../../src/utils/noop';

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
    jest.doMock(
      '../../../src/utils/supportIntersectionObserver',
      () => ({ __esModule: true, default: false } as { __esModule: true })
    );
    const { subscribe, unsubscribe } = await import(
      '../../../src/utils/intersection'
    );
    expect(subscribe).toBe(noop);
    expect(unsubscribe).toBe(noop);
    expect(intersectionObserver.observers).toHaveLength(0);
  });

  test('should handle multiple elements subscription correctly', async () => {
    jest.doMock(
      '../../../src/utils/supportIntersectionObserver',
      () => ({ __esModule: true, default: true } as { __esModule: true })
    );
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
    expect(observer1.options).toEqual({ rootMargin: '-5% 0%' });
    expect(observer1.target).toEqual(element1);
    expect(observer2.options).toEqual({ rootMargin: '-5% 0%' });
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

  test('should be noop if callback is called with unregistered element', async () => {
    jest.doMock(
      '../../../src/utils/supportIntersectionObserver',
      () => ({ __esModule: true, default: true } as { __esModule: true })
    );
    const { subscribe, unsubscribe } = await import(
      '../../../src/utils/intersection'
    );
    expect(intersectionObserver.observers).toHaveLength(0);

    const [element, handler] = [document.createElement('div'), jest.fn()];
    subscribe(element, handler);
    const [observer] = intersectionObserver.observers;
    intersectionObserver.simulate({ ...baseEntry, target: element });
    expect(handler).toHaveBeenCalledTimes(1);

    unsubscribe(element);
    intersectionObserver.simulate(baseEntry);
    expect(intersectionObserver.observers).toHaveLength(0);
    expect(handler).toHaveBeenCalledTimes(1);

    observer.callback([{ ...baseEntry, target: element }], null);
    expect(handler).toHaveBeenCalledTimes(1);
  });
});
