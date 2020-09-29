export const MANUAL = 0;

export const OFFLINE = 1;

export const ERROR = 2;

export const LOADING = 3;

export const FADING = 4;

export const LOADED = 5;

export type State =
  | typeof MANUAL
  | typeof OFFLINE
  | typeof ERROR
  | typeof LOADING
  | typeof FADING
  | typeof LOADED;
