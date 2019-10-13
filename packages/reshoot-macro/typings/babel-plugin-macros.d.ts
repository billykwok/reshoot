declare module 'babel-plugin-macros' {
  type References = import('@babel/core').NodePath[];
  export type MacroParams<S> = {
    references: { default: References } & References;
    state: S;
    babel: import('@babel/core');
  };
  export type MacroHandler = (params: MacroParams<S>) => void;
  export type MacroError = Error;
  export type createMacro<M = {}, S = {}> = (handler: Handler) => M;
  export = { MacroParams, MacroHandler, MacroError, createMacro };
}
