export function mockMetroHash(
  hash: string
): () => { __esModule: true; [key: string]: unknown } {
  class Hasher {
    update(): Hasher {
      return this;
    }
    digest(): string {
      return hash;
    }
  }

  return () => ({
    __esModule: true,
    MetroHash64: Hasher,
    MetroHash128: Hasher,
  });
}

export function mockBase64(
  value: string
): () => { __esModule: true; [key: string]: unknown } {
  return () => ({ __esModule: true, default: () => value });
}
