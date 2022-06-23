import { inspect } from 'node:util';
import { default as BabelPluginMacros } from 'babel-plugin-macros';
import { type NodePath } from '@babel/core';
import { type InlineOptions } from '@reshoot/types';

const HTTP_PATTERN = /^https?:\/\//;

export function evalPath(argumentPath: NodePath): string {
  const { confident, value } = argumentPath.evaluate() as {
    confident: boolean;
    value: string;
  };
  if (!confident) {
    throw new BabelPluginMacros.MacroError(
      `Failed to evaluate Reshoot path ${inspect(
        argumentPath.node,
        false,
        null,
        true
      )}`
    );
  }
  if (typeof value !== 'string') {
    throw new BabelPluginMacros.MacroError(
      `Reshoot path must be evaluated into a string, but got ${inspect(
        value,
        false,
        null,
        true
      )}`
    );
  }

  if (HTTP_PATTERN.test(value)) {
    throw new BabelPluginMacros.MacroError(
      `Only local path is supported, but got ${value}`
    );
  }

  return value;
}

export function evalOptions(argumentPath: NodePath): Partial<InlineOptions> {
  if (!argumentPath) {
    return {};
  }
  const { confident, value } = argumentPath.evaluate() as {
    confident: boolean;
    value: InlineOptions;
  };
  if (!confident) {
    throw new BabelPluginMacros.MacroError(
      `Failed to evaluate Reshoot options ${inspect(
        argumentPath.node,
        false,
        null,
        true
      )}`
    );
  }
  if (typeof value !== 'object') {
    throw new BabelPluginMacros.MacroError(
      `Reshoot options must be evaluated into a string, but got ${inspect(
        value,
        false,
        null,
        true
      )}`
    );
  }

  const unknownOptions = Object.keys(value).filter(
    (k) => !['color', 'maxWidth'].includes(k)
  );
  if (unknownOptions.length) {
    throw new BabelPluginMacros.MacroError(
      `Unknown options ${unknownOptions.toString()}`
    );
  }

  return value;
}
