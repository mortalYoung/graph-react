import { mxPoint } from '../util/mxPoint';
import { mxRectangle } from '../util/mxRectangle';

/**
 * github: https://github.com/jgraph/mxgraph/blob/master/javascript/src/js/model/mxGeometry.js
 */
export class mxGeometry extends mxRectangle {
  TRANSLATE_CONTROL_POINTS: boolean;
  alternateBounds: null | mxRectangle;
  sourcePoint: null | mxPoint;
  targetPoint: null | mxPoint;
  points: null | mxPoint[];
  offset: null | number;
  relative: boolean;
  swap(): void;
  getTerminalPoint(isSource?: boolean): mxPoint | null;
  setTerminalPoint(point: mxPoint, isSource?: boolean): mxPoint;
  rotate(angle: number, cx: mxPoint): void;
  translate(dx: number, dy: number): void;
  scale(sx: number, sy: number, fixedAspect?: boolean): void;
  equals(obj: mxGeometry): boolean;
}
