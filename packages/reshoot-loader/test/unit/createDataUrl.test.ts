import createDataUrl from '../../src/createDataUrl';

describe('createDataUrl', () => {
  test('convert buffer as JPG without trimming', () => {
    expect(createDataUrl('image/jpeg', Buffer.from('abcdefg'), false)).toEqual(
      'data:image/jpeg;base64,YWJjZGVmZw=='
    );
  });

  test('convert buffer as JPG with trimming', () => {
    expect(createDataUrl('image/jpeg', Buffer.from('abcdefg'), true)).toEqual(
      'YWJjZGVmZw=='
    );
  });
});
