import { ImxPoint } from '../util/mxPoint';
import { ImxRectangle } from '../util/mxRectangle';

/**
 * github: https://github.com/jgraph/mxgraph/blob/master/javascript/src/js/model/mxGeometry.js
 */
export class ImxGeometry extends ImxRectangle {
  TRANSLATE_CONTROL_POINTS: boolean;
  alternateBounds: null | ImxRectangle;
  sourcePoint: null | ImxPoint;
  targetPoint: null | ImxPoint;
  points: null | ImxPoint[];
  offset: null | number;
  relative: boolean;
  swap(): void;
  getTerminalPoint(isSource?: boolean): ImxPoint | null;
  setTerminalPoint(point: ImxPoint, isSource?: boolean): ImxPoint;
  rotate(angle: number, cx: ImxPoint): void;
  translate(dx: number, dy: number): void;
  scale(sx: number, sy: number, fixedAspect?: boolean): void;
  equals(obj: ImxGeometry): boolean;
}
