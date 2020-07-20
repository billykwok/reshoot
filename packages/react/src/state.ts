export const MANUAL = 1;

export const OFFLINE = 2;

export const ERROR = 3;

export const INITIAL = 4;

export const LOADED = 5;

export type State =
  | typeof MANUAL
  | typeof OFFLINE
  | typeof ERROR
  | typeof INITIAL
  | typeof LOADED;
