import { BlockquoteHTMLAttributes } from 'react';

/**
 * github: https://github.com/jgraph/mxgraph/blob/master/javascript/src/js/util/mxEventObject.js
 */
export class ImxEventObject {
  constructor(name: string);
  name: null | string;
  properties: null | Map<string, any>;
  consumed: boolean;
  getName(): null | string;
  getProperties(): null | Map<string, any>;
  getProperty(key: string): any;
  isConsumed(): boolean;
  consume(): void;
}
