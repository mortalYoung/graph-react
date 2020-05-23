import { CSSProperties } from 'react';
export type mxCell = any;
export type portNum = 2 | 4 | 6;
export interface VertexProp {
  name: string;
  parent?: mxCell;
  id?: string;
  value?: string;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  style?: CSSProperties;
  relative?: boolean;
  isConnected?: portNum | boolean;
}
export interface EdgeProp {
  parent?: mxCell;
  id?: string;
  value?: string;
  source: string;
  target: string;
  style?: CSSProperties;
}
export interface SVRStyleProps {
  align?: string;
  fillColor?: string;
  fontColor?: string;
  shape?: string;
  strokeColor?: string;
  strokeWidth?: string | number;
  verticalAlign?: string;
  fontSize?: string | number;
  rounded?: boolean;
  arcSize?: number;
}
