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
