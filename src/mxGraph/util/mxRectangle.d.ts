import { mxPoint } from './mxPoint';

/**
 * github: https://github.com/jgraph/mxgraph/blob/master/javascript/src/js/util/mxRectangle.js
 */
export class mxRectangle extends mxPoint {
  width: null | number;
  height: null | number;
  setRect(x: number, y: number, w: number, h: number): void;
  getCenterX(): number;
  getCenterY(): number;
  add(rect: mxRectangle): void;
  intersect(rect: mxRectangle): void;
  grow(amount: number): void;
  getPoint(): mxPoint;
  rotate90(): void;
  equals(obj: mxRectangle): boolean;
  fromRectangle(rect: mxRectangle): mxRectangle;
}
