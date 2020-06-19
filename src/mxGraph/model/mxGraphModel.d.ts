import { ImxCell } from './mxCell';
import { ImxEventSource } from '../util/mxEventSource';
import { ImxClient } from '..';
import { ImxPoint } from '../util/mxPoint';

/**
 * github: https://github.com/jgraph/mxgraph/blob/master/javascript/src/js/model/mxGraphModel.js
 */
export class ImxGraphModel extends ImxEventSource {
  constructor(root: ImxCell);
  root: null | ImxCell;
  cells: null | Map<number, ImxCell>;
  maintainEdgeParent: boolean;
  ignoreRelativeEdgeParent: boolean;
  createIds: boolean;
  prefix: string;
  postfix: string;
  nextId: number;
  currentEdit: null;
  updateLevel: number;
  endingUpdate: boolean;
  clear(): void;
  isCreateIds(): boolean;
  setCreateIds(value: boolean): void;
  createRoot(): ImxCell;
  getCell(id: number): ImxCell;
  filterCells(
    cells: ImxCell[],
    filter: (arg: ImxCell) => boolean,
  ): null | ImxCell;
  getDescendants(parent: ImxCell): ImxCell[];
  filterDescendants(
    filter?: (arg: ImxCell) => boolean,
    parent?: ImxCell,
  ): ImxCell[];
  getRoot(cell?: ImxCell): ImxCell;
  setRoot(root: ImxCell): ImxCell;
  rootChanged(root: ImxCell): null | ImxCell;
  isRoot(cell?: ImxCell): boolean;
  isLayer(cell: ImxCell): boolean;
  isAncestor(parent: ImxCell, child: ImxCell): boolean;
  contains(cell: ImxCell): boolean;
  getParent(cell?: ImxCell): null | ImxCell;
  add(parent: ImxCell, child: ImxCell, index?: number): ImxCell;
  cellAdded(cell?: ImxCell): void;
  createId(cell: ImxCell): number;
  updateEdgeParents(cell: ImxCell, root?: ImxCell): void;
  updateEdgeParent(edge: ImxCell, root: ImxCell): void;
  getOrigin(cell: ImxCell): ImxPoint;
  getNearestCommonAncestor(cell1?: ImxCell, cell2?: ImxCell): null | ImxCell;
  remove(cell: ImxCell): ImxCell;
  cellRemoved(cell: ImxCell): void;
  // TODO
}
