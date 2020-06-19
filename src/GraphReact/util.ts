import { ImxCell } from '../mxGraph';

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

export const getCellType = (cell: ImxCell) => {
  if (!cell) return 'unknown';
  if (cell.port) {
    return 'Port';
  } else if (cell.vertex) {
    return 'Vertex';
  } else if (cell.edge) {
    return 'Edge';
  } else {
    return 'unknown';
  }
};
