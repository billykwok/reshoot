export const MANUAL = 0;

export const OFFLINE = 1;

export const ERROR = 2;

export const HIDDEN = 3;

export const LOADING = 4;

export const FADING = 5;

export const LOADED = 6;

export type State =
  | typeof MANUAL
  | typeof OFFLINE
  | typeof ERROR
  | typeof HIDDEN
  | typeof LOADING
  | typeof FADING
  | typeof LOADED;
