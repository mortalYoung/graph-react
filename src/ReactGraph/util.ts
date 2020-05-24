import { mxCell } from './interface';

export const transformStyle = (style?: Record<string, any>) => {
  let result = '';
  for (const key in style) {
    if (style.hasOwnProperty(key)) {
      const value = style[key];
      if (typeof value === 'function') continue;
      result += `${key}=${value.toString()};`;
    }
  }
  return result;
};

export const getCellType = (cell: mxCell) => {
  if (!cell) return 'unknown';
  if (cell.port) {
    return 'port';
  } else if (cell.vertex) {
    return 'vertex';
  } else if (cell.edge) {
    return 'edge';
  } else {
    return 'unknown';
  }
};
