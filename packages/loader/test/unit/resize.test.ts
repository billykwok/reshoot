import resize from '../../src/resize';
import Mimes from '../../src/mimes';
import { SharpImage } from '../../src/createSharp';
import defaultOptions from '../../src/defaultOptions';
import { Options } from '../../src/type';

const size = { width: 16, height: 9 };
const color = '#fff';
const image: SharpImage = {
  size: jest.fn(() => Promise.resolve(size)),
  color: jest.fn(() => Promise.resolve(color)),
  resize: jest.fn(() =>
    Promise.resolve({ content: Buffer.from('123'), width: 16 })
  ),
  close: jest.fn()
};
const placeholder = { size: 7 };
const mime = Mimes.JPG;
const options: Options = {
  ...defaultOptions,
  shape: { ...defaultOptions.shape, srcSet: 'srcSet' },
  srcSet: [512, 840, 1024]
};

describe('resize', () => {
  beforeEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  test('with config', () => {
    const [promises, map] = resize(image, size, placeholder, mime, options);
    expect(promises).toHaveLength(1);
    expect([...map.values()]).toHaveLength(3);
    expect(map.get(512)).toEqual(16);
    expect(map.get(840)).toEqual(16);
    expect(map.get(1024)).toEqual(16);
  });
});
