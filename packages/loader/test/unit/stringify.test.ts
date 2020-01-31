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
    color: JSON.stringify('#666666')
  };

  test('all options', () => {
    const shape = {
      ...defaultOptions.shape,
      color: 'background'
    };
    expect(stringify(shape, object)).toEqual(oneLineTrim`module.exports={
      "src":"abc.jpg",
      "aspectRatio":3.14,
      "srcSet":"abc-100.jpg 100w, abc-200.jpg 100w, abc-300.jpg 100w",
      "placeholder":"data:image/jpeg;base64,/2jfjiaoshfsahgjhsgakjhgjsak",
      "background":"#666666"
    }`);
  });

  test('customized options', () => {
    const shape = {
      ...defaultOptions.shape,
      src: 'r',
      srcSet: 's',
      placeholder: 'p',
      aspectRatio: 'a',
      color: 'c'
    };
    expect(stringify(shape, object)).toEqual(oneLineTrim`module.exports={
      "r":"abc.jpg",
      "a":3.14,
      "s":"abc-100.jpg 100w, abc-200.jpg 100w, abc-300.jpg 100w",
      "p":"data:image/jpeg;base64,/2jfjiaoshfsahgjhsgakjhgjsak",
      "c":"#666666"
    }`);
  });

  test('default options', () => {
    const shape = defaultOptions.shape;
    expect(stringify(shape, object)).toEqual(oneLineTrim`module.exports={
      "src":"abc.jpg",
      "aspectRatio":3.14,
      "srcSet":"abc-100.jpg 100w, abc-200.jpg 100w, abc-300.jpg 100w",
      "placeholder":"data:image/jpeg;base64,/2jfjiaoshfsahgjhsgakjhgjsak",
      "color":"#666666"
    }`);
  });
});
