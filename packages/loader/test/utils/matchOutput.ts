import type { OutputShape } from '../../src/type';

const defaultExpected = {
  publicPath: '__webpack_public_path__/',
  mime: 'image/jpeg',
  aspectRatio: 63.34,
  hashLength: 16,
  sizes: [480, 640, 840, 1080],
  color: '#fff',
  keys: ['mime', 'aspectRatio', 'placeholder', 'src', 'srcSet', 'color'],
};

export function matchOutputAsObject(
  expected: OutputShape,
  actual: OutputShape
): void {
  const { mime, aspectRatio, hashLength, sizes, color, keys } = Object.assign(
    {},
    defaultExpected,
    expected
  );
  const actualKeys = Object.keys(actual);
  expect(actualKeys).toHaveLength(keys.length);
  expect(actualKeys).toEqual(expect.arrayContaining(keys));
  if (keys.includes('mime')) {
    expect(actual.mime).toEqual(mime);
  }
  if (keys.includes('aspectRatio')) {
    expect(actual.aspectRatio).toEqual(aspectRatio);
  }
  if (keys.includes('placeholder')) {
    expect(actual.placeholder).toMatch(new RegExp(`^data:${mime};base64,`));
  }
  if (keys.includes('src')) {
    expect(actual.src).toMatch(
      new RegExp(`^__webpack_public_path__/[0-9a-f]{${hashLength}}-4774.jpg`)
    );
  }
  if (keys.includes('srcSet')) {
    expect(actual.srcSet).toMatch(
      new RegExp(
        `^${sizes
          .map(
            (size: number) =>
              `__webpack_public_path__/[0-9a-f]{${hashLength}}-${size}.jpg ${size}w`
          )
          .join(',')}$`
      )
    );
  }
  if (keys.includes('color')) {
    expect(actual.color).toEqual(color);
  }
}

export function matchOutputAsString(
  expected: OutputShape,
  actual: string
): void {
  const object = JSON.parse(
    actual
      .replace(/^export default {/gi, '{')
      .replace(/^module\.exports={/gi, '{')
      .replace(/(,|{)([a-zA-Z][a-zA-Z]*):/gi, '$1"$2":')
      .replace(/__webpack_public_path__\+"/gi, '"__webpack_public_path__/')
      .replace(/"\+","\+"/gi, ',')
      .replace(/"\+"/gi, '')
  ) as OutputShape;
  matchOutputAsObject(expected, object);
}
