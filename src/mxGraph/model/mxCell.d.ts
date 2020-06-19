import { ImxGeometry } from './mxGeometry';

/**
 * github: https://github.com/jgraph/mxgraph/blob/master/javascript/src/js/model/mxCell.js
 */
export class ImxCell {
  id: null | string;
  value: null | string;
  geometry: null | ImxGeometry;
  style: null | string; //  [(stylename|key=value);]
  vertex: boolean;
  edge: boolean;
  connectable: boolean;
  visible: boolean;
  collapsed: boolean;
  parent: null | ImxCell;
  source: null | ImxCell;
  target: null | ImxCell;
  children: null | ImxCell[];
  edges: null | ImxCell[];
  mxTransient: string[]; // 不会被 mxUtils.clone() 复制的节点
  getId(): string | null;
  setId(id: string): void;
  getValue(): string | null;
  setValue(value: string): void;
  valueChanged(newValue: string): string;
  getGeometry(): ImxGeometry;
  setGeometry(geometry: ImxGeometry): void;
  getStyle(): string;
  setStyle(style: string): void;
  isVertex(): boolean;
  setVertex(vertex: boolean): void;
  isEdge(): boolean;
  setEdge(edge: boolean): void;
  isConnectable(): boolean;
  setConnectable(connectable: boolean): void;
  isVisible(): boolean;
  setVisible(visible: boolean): void;
  isCollapsed(): void;
  setCollapsed(collapsed: boolean): void;
  getParent(): ImxCell;
  setParent(parent: ImxCell): void;
  getTerminal(source?: boolean): ImxCell; // returns the source or targe terminal
  setTerminal(terminal: ImxCell, isSource?: boolean): ImxCell;
  getChildCount(): number;
  getIndex(child: ImxCell): number;
  getChildAt(index: number): ImxCell | null;
  insert(child: ImxCell, index?: number): ImxCell;
  remove(index: number): ImxCell | null;
  removeFromParent(): void;
  getEdgeCount(): number;
  getEdgeIndex(edge: ImxCell): number;
  getEdgeAt(index: number): ImxCell | null;
  insertEdge(edge: ImxCell, isOutgoing?: boolean): ImxCell;
  removeEdge(edge: ImxCell, isOutgoing?: boolean): ImxCell;
  removeFromTerminal(isSource?: boolean): void;
  hasAttribute(name: string): any;
  getAttribute(name: string, defaultValue?: any): any;
  setAttribute(name: string, value: any): void;
  clone(): ImxCell;
  cloneValue(): string | null;

  [key: string]: any;
}
