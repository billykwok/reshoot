import state from '../../src/state';

describe('state', () => {
  test('correct underlying value and equality for INITIAL', () => {
    expect(state.INITIAL).toEqual(state.INITIAL);
    expect(state.INITIAL).toEqual('INITIAL');
  });

  test('correct underlying value and equality for LOADED', () => {
    expect(state.LOADED).toEqual(state.LOADED);
    expect(state.LOADED).toEqual('LOADED');
  });

  test('correct underlying value and equality for MANUAL', () => {
    expect(state.MANUAL).toEqual(state.MANUAL);
    expect(state.MANUAL).toEqual('MANUAL');
  });

  test('correct underlying value and equality for OFFLINE', () => {
    expect(state.OFFLINE).toEqual(state.OFFLINE);
    expect(state.OFFLINE).toEqual('OFFLINE');
  });

  test('correct underlying value and equality for ERROR', () => {
    expect(state.ERROR).toEqual(state.ERROR);
    expect(state.ERROR).toEqual('ERROR');
  });
});
