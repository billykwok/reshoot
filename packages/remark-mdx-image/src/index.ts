import JSON5 from 'json5';
import type { Image } from 'mdast';
import type { MdxjsEsm } from 'mdast-util-mdxjs-esm';
import type { Node, Parent } from 'unist';
import { SKIP, visitParents } from 'unist-util-visit-parents';
import type { Transformer } from 'unified';
import { type InlineOptions } from '@reshoot/types';

import {
  expressionStatement,
  identifier,
  importDeclaration,
  importDefaultSpecifier,
  mdxJsxAttribute,
  mdxJsxAttributeValueExpression,
  mdxJsxImgElement,
  mdxjsEsm,
  program,
  simpleLiteral,
} from './ast';

const HTTP_PATTERN = /^https?:\/\//;
const RELATIVE_PATTERN = /^\.\.?\//;

export interface ReshootRemarkMdxImageOptions {
  importHttp?: boolean;
  relativeToDocument?: boolean;
  removeTrailingLineBreak?: boolean;
}

export default function reshootRemarkMdxImage({
  importHttp = false,
  relativeToDocument = true,
  removeTrailingLineBreak = true,
}: ReshootRemarkMdxImageOptions = {}): Transformer {
  return (ast: Node): void => {
    const imports: MdxjsEsm[] = [];
    const imported = new Map<string, string>();

    visitParents(
      ast,
      (node: Node & { children?: Node[] }) =>
        Array.isArray(node.children) &&
        node.children.some((child) => child.type === 'image'),
      (node: Parent<Node & { value?: string }>, parents: Parent[]) => {
        const { type, children } = node;
        let i = 0;
        while (i < children.length) {
          const child = children[i];
          if (child.type === 'image') {
            const [childPlusOne, childPlusTwo] = children.slice(i + 1, i + 3);
            let inlineOptions: Partial<InlineOptions> = {};
            let numberOfChildrenToReplace = 1;
            if (childPlusOne) {
              if (childPlusOne.type === 'mdxTextExpression') {
                childPlusOne.data.estree;
                inlineOptions = JSON5.parse(childPlusOne.value);
                ++numberOfChildrenToReplace;
                if (
                  removeTrailingLineBreak &&
                  childPlusTwo &&
                  childPlusTwo.type === 'text' &&
                  /\s/i.test(childPlusTwo.value)
                ) {
                  ++numberOfChildrenToReplace;
                }
              } else if (
                removeTrailingLineBreak &&
                childPlusOne.type === 'text' &&
                /\s/i.test(childPlusOne.value)
              ) {
                ++numberOfChildrenToReplace;
              }
            }

            const { alt, title, url: rawUrl } = child as Image;
            const [, existingSearchParams] = rawUrl.trim().split('?');
            const isLocal = !HTTP_PATTERN.test(rawUrl);

            let url = rawUrl;
            if (
              relativeToDocument &&
              isLocal &&
              !RELATIVE_PATTERN.test(rawUrl)
            ) {
              url = `./${rawUrl}`;
            }
            const serializedOptions = new URLSearchParams(
              inlineOptions as Record<string, string>
            ).toString();
            if (serializedOptions) {
              url += `${existingSearchParams ? '&' : '?'}${serializedOptions}`;
            }

            const urlString = JSON5.stringify(url);
            const urlLiteral = simpleLiteral(url, urlString);
            const imgElement = mdxJsxImgElement(mdxJsxAttribute('alt', alt));

            if (isLocal || importHttp) {
              let name = imported.get(url);
              if (!name) {
                name = `__${imported.size}_${url.replace(/\W/g, '_')}__`;
                imports.push(
                  mdxjsEsm(`import ${name} from ${urlString};`, {
                    estree: program(
                      importDeclaration(
                        urlLiteral,
                        importDefaultSpecifier(identifier(name))
                      )
                    ),
                  })
                );
                imported.set(url, name);
              }
              imgElement.attributes.push(
                mdxJsxAttribute(
                  'meta',
                  mdxJsxAttributeValueExpression(name, {
                    estree: program(expressionStatement(identifier(name))),
                  })
                )
              );
            } else {
              imgElement.attributes.unshift(
                mdxJsxAttribute(
                  'src',
                  mdxJsxAttributeValueExpression(urlString, {
                    estree: program(expressionStatement(urlLiteral)),
                  })
                )
              );
            }

            if (title) {
              imgElement.attributes.push(mdxJsxAttribute('title', title));
            }

            children.splice(i, numberOfChildrenToReplace, imgElement);
          }
          ++i;
        }

        if (type === 'paragraph') {
          const silbings = parents[parents.length - 1].children;
          silbings.splice(silbings.indexOf(node), 1, ...children);
        }

        return SKIP;
      }
    );

    (ast as Parent).children.unshift(...imports);
  };
}
