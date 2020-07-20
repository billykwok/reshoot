import { afterEach } from '@jest/globals';
import { installMockStorage, ensureMocksReset } from '@shopify/jest-dom-mocks';

installMockStorage();

afterEach(() => {
  ensureMocksReset();
});
