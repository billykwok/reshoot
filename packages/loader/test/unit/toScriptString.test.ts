import { oneLineTrim } from 'common-tags';

import defaultOptions from '../../src/defaultOptions';
import toScriptString from '../../src/toScriptString';

describe('toScriptString', () => {
  const object = {
    src: 'abc.jpg',
    aspectRatio: 3.14,
    srcSet: ['abc-100.jpg 100w', 'abc-200.jpg 100w', 'abc-300.jpg 100w'],
    placeholder: 'data:image/jpeg;base64,/2jfjiaoshfsahgjhsgakjhgjsak',
    color: '#666666',
    extra: 123
  };

  test('all options', () => {
    const shape = { ...defaultOptions.shape, color: 'background', extra: 'e' };
    expect(toScriptString(shape, object)).toEqual(oneLineTrim`module.exports={
      src:__webpack_public_path__+"abc.jpg",
      aspectRatio:3.14,
      srcSet:__webpack_public_path__+"abc-100.jpg 100w,"+__webpack_public_path__+"abc-200.jpg 100w,"+__webpack_public_path__+"abc-300.jpg 100w",
      placeholder:"data:image/jpeg;base64,/2jfjiaoshfsahgjhsgakjhgjsak",
      background:"#666666",
      e:123
    }`);
  });

  test('customized options', () => {
    const shape = {
      ...defaultOptions.shape,
      src: 'r',
      srcSet: 's',
      placeholder: 'p',
      aspectRatio: 'a',
      color: 'c',
      extra: 'e'
    };
    expect(toScriptString(shape, object)).toEqual(oneLineTrim`module.exports={
      r:__webpack_public_path__+"abc.jpg",
      a:3.14,
      s:__webpack_public_path__+"abc-100.jpg 100w,"+__webpack_public_path__+"abc-200.jpg 100w,"+__webpack_public_path__+"abc-300.jpg 100w",
      p:"data:image/jpeg;base64,/2jfjiaoshfsahgjhsgakjhgjsak",
      c:"#666666",
      e:123
    }`);
  });

  test('default options', () => {
    const shape = defaultOptions.shape;
    expect(toScriptString(shape, object)).toEqual(oneLineTrim`module.exports={
      src:__webpack_public_path__+"abc.jpg",
      aspectRatio:3.14,
      srcSet:__webpack_public_path__+"abc-100.jpg 100w,"+__webpack_public_path__+"abc-200.jpg 100w,"+__webpack_public_path__+"abc-300.jpg 100w",
      placeholder:"data:image/jpeg;base64,/2jfjiaoshfsahgjhsgakjhgjsak",
      color:"#666666",
      extra:123
    }`);
  });
});
