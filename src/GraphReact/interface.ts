import { CSSProperties } from 'react';
export type mxCell = any;
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
  ports?: PortProp[];
}
export interface EdgeProp {
  parent?: mxCell;
  id?: string;
  value?: string;
  source: string;
  target: string;
  style?: CSSProperties;
}
export interface PortProp {
  name: string;
  width?: number;
  height?: number;
  offsetX?: number;
  offsetY?: number;
}
export interface SVRStyleProps extends Partial<CSSProperties> {
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
export interface styleProps {
  default: SVRStyleProps;
  hover?: SVRStyleProps;
}
export interface ListenProps {
  mouseDown: Function;
  mouseUp: Function;
  mouseMove: Function;
}
