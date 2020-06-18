import { ImxPoint } from './mxPoint';

/**
 * github: https://github.com/jgraph/mxgraph/blob/master/javascript/src/js/util/mxRectangle.js
 */
export class ImxRectangle extends ImxPoint {
  width: null | number;
  height: null | number;
  setRect(x: number, y: number, w: number, h: number): void;
  getCenterX(): number;
  getCenterY(): number;
  add(rect: ImxRectangle): void;
  intersect(rect: ImxRectangle): void;
  grow(amount: number): void;
  getPoint(): ImxPoint;
  rotate90(): void;
  equals(obj: ImxRectangle): boolean;
  fromRectangle(rect: ImxRectangle): ImxRectangle;
}
