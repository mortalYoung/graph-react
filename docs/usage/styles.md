---
title: 样式
order: 4
---

## styles

通过设置 `setVertexStyles, setPortStyles, setEdgeStyles` 可以分别对 `vertex, port, edge` 修改样式

```jsx
import react, { useEffect } from 'react';
import GraphReact from 'graph-react';

export default () => {
  useEffect(() => {
    const graph = new GraphReact('helloworld');
    const data = {
      vertexs: [
        {
          name: 'v1',
          value: 'hello',
          x: 20,
          y: 20,
          height: 30,
          width: 100,
        },
        {
          name: 'v2',
          value: 'world',
          x: 20,
          y: 150,
          height: 30,
          width: 100,
        },
      ],
      edges: [
        {
          source: 'v1',
          target: 'v2',
        },
      ],
    };
    const styles = {
      default: {
        fillColor: '#fff',
        strokeColor: '#289de9',
        rounded: true,
        arcSize: 30,
      },
      hover: {},
    };
    const portStyles = {
      default: {
        fillColor: '#fff',
        strokeColor: '#999',
        rounded: true,
        arcSize: 100,
      },
      hover: {},
    };
    const edgeStyles = {
      default: {
        strokeColor: '#999',
      },
      hover: {
        strokeColor: '#ddd',
      },
    };
    graph.setVertexStyles(styles);
    graph.setPortStyles(portStyles);
    graph.setEdgeStyles(edgeStyles);
    graph.data(data);
    graph.render();
  }, []);
  return <div id="helloworld"></div>;
};
```

## API

### Function

<!-- prettier-ignore-start -->
| 函数名 | 说明 | 类型 | 默认值 |
| ----- | ---- | ---- | ----- |
| setVertexStyles | 设置 `vertex` 全局样式 | `(styles: styleProps) => void` | `Function` |
| setPortStyles | 设置 `port` 全局样式 | `(styles: styleProps) => void` | `Function` |
| setEdgeStyles | 设置 `edge` 全局样式 | `(styles: styleProps) => void` | `Function` |
<!-- prettier-ignore-end -->

### Interface

<!-- prettier-ignore-start -->

```typescript
interface styleProps {
  default: SVRStyleProps;       // 默认状态样式
  hover?: SVRStyleProps;        // hover 状态样式
}
```

------

```typescript
interface SVRStyleProps extends Partial<CSSProperties> {
  align?: string;                // 水平对齐方式
  fillColor?: string;            // 填充颜色
  fontColor?: string;            // 字体颜色
  shape?: string;                // 形状
  strokeColor?: string;          // 边框颜色
  strokeWidth?: string | number; // 边框宽度
  verticalAlign?: string;        // 垂直对齐方式
  fontSize?: string | number;    // 字体大小
  rounded?: boolean;             // 是否为圆角
  arcSize?: number;              // 圆角比例，取值范围 0-100
}
```
<!-- prettier-ignore-end -->
