const defaultExpected = {
  publicPath: '__webpack_public_path__/',
  mime: 'image/jpeg',
  aspectRatio: 63.34,
  hashLength: 16,
  sizes: [480, 640, 840, 1080],
  color: '#1c2c34',
  keys: ['mime', 'aspectRatio', 'placeholder', 'src', 'srcSet', 'color']
};

export function matchOutputAsObject(expected, actual) {
  const {
    publicPath,
    mime,
    aspectRatio,
    hashLength,
    sizes,
    color,
    keys
  } = Object.assign({}, defaultExpected, expected);
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
      new RegExp(`^${publicPath}[0-9a-f]{${hashLength}}-4774.jpg`)
    );
  }
  if (keys.includes('srcSet')) {
    expect(actual.srcSet).toMatch(
      new RegExp(
        `^${sizes
          .map(
            (size: number) =>
              `${publicPath}[0-9a-f]{${hashLength}}-${size}.jpg ${size}w`
          )
          .join(',')}$`
      )
    );
  }
  if (keys.includes('color')) {
    expect(actual.color).toEqual(color);
  }
}

export function matchOutputAsString(expected, actual) {
  const object = JSON.parse(
    actual
      .replace(/^export default {/g, '{')
      .replace(/^module\.exports={/g, '{')
      .replace(/__webpack_public_path__\+"/g, '"__webpack_public_path__/')
      .replace(/"\+","\+"/g, ',')
  );
  matchOutputAsObject(expected, object);
}