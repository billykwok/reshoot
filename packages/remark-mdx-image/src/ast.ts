import type {
  ExpressionStatement,
  Identifier,
  ImportDeclaration,
  ImportDefaultSpecifier,
  Program,
  SimpleLiteral,
} from 'estree';
import type {
  MdxJsxAttribute,
  MdxJsxAttributeValueExpression,
  MdxJsxTextElement,
} from 'mdast-util-mdx-jsx';
import type { MdxjsEsm } from 'mdast-util-mdxjs-esm';

export function mdxJsxAttribute(
  name: MdxJsxAttribute['name'],
  value: MdxJsxAttribute['value']
): MdxJsxAttribute {
  return { type: 'mdxJsxAttribute', name, value };
}

export function mdxJsxAttributeValueExpression(
  value: MdxJsxAttributeValueExpression['value'],
  data: MdxJsxAttributeValueExpression['data']
): MdxJsxAttributeValueExpression {
  return { type: 'mdxJsxAttributeValueExpression', value, data };
}

export function mdxJsxImgElement(
  ...attributes: MdxJsxTextElement['attributes']
): MdxJsxTextElement {
  return { type: 'mdxJsxTextElement', name: 'img', children: [], attributes };
}

export function mdxjsEsm(
  value: MdxjsEsm['value'],
  data: MdxjsEsm['data']
): MdxjsEsm {
  return { type: 'mdxjsEsm', value, data };
}

export function identifier(name: Identifier['name']): Identifier {
  return { type: 'Identifier', name };
}

export function simpleLiteral(
  value: SimpleLiteral['value'],
  raw: SimpleLiteral['raw']
): SimpleLiteral {
  return { type: 'Literal', value, raw };
}

export function expressionStatement(
  expression: ExpressionStatement['expression']
): ExpressionStatement {
  return { type: 'ExpressionStatement', expression };
}

export function importDefaultSpecifier(
  local: ImportDefaultSpecifier['local']
): ImportDefaultSpecifier {
  return { type: 'ImportDefaultSpecifier', local };
}

export function importDeclaration(
  source: ImportDeclaration['source'],
  ...specifiers: ImportDeclaration['specifiers']
): ImportDeclaration {
  return { type: 'ImportDeclaration', source, specifiers };
}

export function program(...body: Program['body']): Program {
  return {
    type: 'Program',
    sourceType: 'module',
    comments: [],
    body,
  };
}
