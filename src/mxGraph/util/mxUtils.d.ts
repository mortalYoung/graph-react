import { parse } from 'path';

/**
 * github: https://github.com/jgraph/mxgraph/blob/master/javascript/src/js/util/mxUtils.js
 */
export class ImxUtils {
  errorResource: 'error' | '';
  closeResource: 'close' | '';
  errorImage: string;
  removeCursors: (element: Element) => void;
  getCurrentStyle: (element?: Element) => null | CSSStyleDeclaration;
  parseCssNumber: (value: 'thin' | 'medium' | 'thick' | number) => number;
  setPrefixedStyle: (
    style: CSSStyleDeclaration,
    name: string,
    value: any,
  ) => void;
  hasScrollbars: (node: Element) => boolean;
  bind: (scope: any, funct: Function) => Function;
  eval: (expr: string) => any;
  findNode: (node: Element, attr: string, value: any) => null | Element;
  getFunctionName: (f: Object) => null | string;
  indexOf: <T>(array: Array<T>, obj: T) => number;
  forEach: <T>(array: Array<T>, fn: Function) => Array<T>;
  remove: <T>(obj: T, array: Array<T> | Record<string, T>) => null;
  isNode: (
    value: Object,
    nodeName: null | string,
    attributeName: null | string,
    attributeValue?: string,
  ) => boolean;
  isAncestorNode: (ancestor: Element, child: Element) => boolean;
  getChildNodes: (node: Element, nodeType?: string) => Element[];
  importNode: (
    doc: Document,
    node: Element,
    allChildren: boolean,
  ) => Text | Element;
  importNodeImplementation: (
    doc: Document,
    node: Element,
    allChildren: boolean,
  ) => Text | Element;
  createXmlDocument: () => null | Document | ActiveXObject;
  createMsXmlDocument: () => ActiveXObject;
  parseXml: (xml: string) => XMLDocument | ActiveXObject;
  clearSelection: () => void;
  removeWhitespace: (node: HTMLElement, before?: boolean) => void;
  // TODO
}
