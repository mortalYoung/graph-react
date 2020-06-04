---
title: 设置项
order: 1
---

## options

通过简单的设置, 可以对 graph 进行一些操作上的修改

```jsx
import react, { useEffect } from 'react';
import GraphReact from 'graph-react';

export default () => {
  useEffect(() => {
    const graph = new GraphReact('helloworld', {
      movable: false,
      resizable: false,
      editable: true,
    });
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
          source: 'v1.5',
          target: 'v2.2',
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
| `options` | 设置 `graph` 的属性 | `IOptionsProps` | `null` |
<!-- prettier-ignore-end -->

### Interface

<!-- prettier-ignore-start -->

```typescript
interface IOptionsProps {
  thumbnail?: string;             // 是否开启缩略图, 参数为 div 的 id, 默认不开启
  movable?: boolean;              // cell 是否可以移动, 默认为 true`
  resizable?: boolean;            // cell 是否可以放大缩小, 默认为 true
  editable?: boolean;             // cell 是否可以编辑, 默认为 false
  height?: number;                // graph 的高度, 默认值为 300
}
``` 
<!-- prettier-ignore-end -->
