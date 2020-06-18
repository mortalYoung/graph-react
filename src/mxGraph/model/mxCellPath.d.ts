import { ImxCell } from './mxCell';

/**
 * github: https://github.com/jgraph/mxgraph/blob/master/javascript/src/js/model/mxCellPath.js
 */
export class ImxCellPath {
  PATH_SEPARATOR: string;
  create: (cell?: ImxCell) => string;
  getParentPath: (path?: string) => null | string;
  resolve: (root: ImxCell, path?: string) => ImxCell;
  compare: (p1: string, p2: string) => -1 | 0 | 1;
}
