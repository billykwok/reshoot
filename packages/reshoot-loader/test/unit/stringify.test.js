// @flow
import { oneLineTrim } from 'common-tags';

import defaultOptions from '../../src/defaultOptions';
import stringify from '../../src/stringify';

describe('stringify', () => {
  const object = {
    src: JSON.stringify('abc.jpg'),
    aspectRatio: JSON.stringify(3.14),
    srcSet: JSON.stringify(
      'abc-100.jpg 100w, abc-200.jpg 100w, abc-300.jpg 100w'
    ),
    placeholder: JSON.stringify(
      'data:image/jpeg;base64,/2jfjiaoshfsahgjhsgakjhgjsak'
    ),
    background: JSON.stringify('#666666'),
    palette: JSON.stringify([
      '#111111',
      '#222222',
      '#333333',
      '#444444',
      '#555555'
    ])
  };

  test('all options', () => {
    const shape = {
      ...defaultOptions.shape,
      background: 'background',
      palette: 'palette'
    };
    expect(stringify(shape, object)).toEqual(oneLineTrim`module.exports={
      "src":"abc.jpg",
      "aspectRatio":3.14,
      "srcSet":"abc-100.jpg 100w, abc-200.jpg 100w, abc-300.jpg 100w",
      "placeholder":"data:image/jpeg;base64,/2jfjiaoshfsahgjhsgakjhgjsak",
      "background":"#666666",
      "palette":["#111111","#222222","#333333","#444444","#555555"]
    }`);
  });

  test('customized options', () => {
    const shape = {
      ...defaultOptions.shape,
      src: 'r',
      srcSet: 's',
      placeholder: 'p',
      aspectRatio: 'a'
    };
    expect(stringify(shape, object)).toEqual(oneLineTrim`module.exports={
      "r":"abc.jpg",
      "a":3.14,
      "s":"abc-100.jpg 100w, abc-200.jpg 100w, abc-300.jpg 100w",
      "p":"data:image/jpeg;base64,/2jfjiaoshfsahgjhsgakjhgjsak"
    }`);
  });

  test('default options', () => {
    const shape = defaultOptions.shape;
    expect(stringify(shape, object)).toEqual(oneLineTrim`module.exports={
      "src":"abc.jpg",
      "aspectRatio":3.14,
      "srcSet":"abc-100.jpg 100w, abc-200.jpg 100w, abc-300.jpg 100w",
      "placeholder":"data:image/jpeg;base64,/2jfjiaoshfsahgjhsgakjhgjsak"
    }`);
  });
});
